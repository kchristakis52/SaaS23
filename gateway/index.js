const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const fs = require("fs");
const cors = require("cors");
const PDFDocument = require("pdfkit");

const app = express();

const { produceToQueue } = require("./producer");

const upload = multer({ storage: multer.memoryStorage() }); // Destination folder for storing uploaded CSVs

// MySQL Connection
const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "SaaSDB",
});

app.use(express.json());
// Enable CORS for all routes
app.use(cors());
//localhost:3000/parse-csv?chtype=line&user=kwstas
app.post("/parse-csv", upload.single("csv"), async (req, res) => {
  try {
    let user = req.query.user;
    let chtype = req.query.chtype;
    // console.log(chtype);
    let chartname = req.file.originalname;
    chartname = chartname.slice(0, chartname.length - 4);
    // console.log(chartname);
    // console.log(req.file.buffer.toString("utf-8"));
    //To be done: Send to correct queue depening on chtype

    const message = {
      data: req.file.buffer.toString("utf-8"),
      chartname: chartname,
      user: user,
    };

    await produceToQueue(message, chtype);

    res.status(200).json({
      status: "success",
      data: req.file.buffer.toString("utf-8"),
      filename: chartname,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: "Failed to parse CSV" });
  }
});

// API route to handle user login
app.post("/userloggedin", async (req, res) => {
  let email = req.query.mail;
  let first_name = req.query.first_name;
  let last_name = req.query.last_name;
  let last_login = req.query.last_login;

  // Check if the user already exists in the database
  const query = "SELECT * FROM Users WHERE email = ?";
  pool.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      return res
        .status(500)
        .json({ error: "Error retrieving user from database" });
    }

    if (results.length === 0) {
      // User doesn't exist, add them to the database
      const insertQuery = "INSERT INTO Users VALUES (?, ?, ?, ?, ?)";
      pool.query(
        insertQuery,
        [email, first_name, last_name, last_login, 10],
        (insertError) => {
          if (insertError) {
            console.error("Error executing MySQL query:", insertError);
            return res
              .status(500)
              .json({ error: "Error adding user to database" });
          }

          // User added successfully
          return res.json({ message: "User added successfully" });
        }
      );
    } else {
      pool.query(
        "UPDATE Users SET last_login = ? WHERE email = ?",
        [last_login, email],
        (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating the user:", updateError);
            res.status(500).json({ error: "Failed to upload User" });
          } else {
            res.status(200).json({ message: "User updated successfully" });
          }
        }
      );
    }
  });
});

app.get("/users", (req, res) => {
  pool.query("SELECT * FROM Users", (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      res.status(500).json({ error: "Error executing the query" });
    } else {
      res.json(results);
    }
  });
});
//localhost:3001/userpay?mail=kxrist@&amount=10
app.post("/userpay", async (req, res) => {
  let email = req.query.mail;
  let amount = req.query.amount;

  pool.query(
    "UPDATE Users SET diagram_Limit = diagram_Limit + ? WHERE email = ?",
    [amount, email],
    (updateError, updateResults) => {
      if (updateError) {
        console.error("Error updating the user:", updateError);
        res.status(500).json({ error: "Failed to upload User" });
      } else {
        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

app.get("/getdiagrams", (req, res) => {
  const userEmail = req.query.mail;

  const query = "SELECT * FROM Diagrams WHERE email = ?";
  const values = [userEmail];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error("Error retrieving diagrams: " + err.stack);
      res.status(500).send("Error retrieving diagrams");
      return;
    }

    res.status(200).json(results);
  });
});

app.get("/getuserinfo", (req, res) => {
  const userEmail = req.query.mail;

  const query = `
    SELECT Users.*, COUNT(Diagrams.diagram_id) AS diagram_count
    FROM Users
    LEFT JOIN Diagrams ON Users.email = Diagrams.email
    WHERE Users.email = ?
  `;
  const values = [userEmail];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error("Error retrieving user stats: " + err.stack);
      res.status(500).send("Error retrieving user stats");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    const user = results[0];
    const userInfo = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      last_login: user.last_login,
      diagram_count: user.diagram_count,
      diagram_Limit: user.diagram_Limit,
    };
    res.status(200).json(userInfo);
  });
});

app.get("/getimage", (req, res) => {
  const imageName = req.query.filename;
  const chtype = req.query.chtype;
  const imagePath = `../${chtype}-shared-data/${imageName}.png`;
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.contentType("image/png");
    res.send(data);
  });
});

app.get("/downloadimage", (req, res) => {
  const imageName = req.query.filename;
  const chtype = req.query.chtype;
  const imagePath = `../${chtype}-shared-data/${imageName}.png`;
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Set the appropriate headers for file download
    res.setHeader("Content-Disposition", 'attachment; filename="image.png"');
    res.setHeader("Content-Type", "image/png");

    // Send the image file as the response
    res.send(data);
  });
});

app.get("/imagetohtml", (req, res) => {
  const imageName = req.query.filename;
  const chtype = req.query.chtype;
  const imagePath = `../${chtype}-shared-data/${imageName}.png`;

  // Read the PNG file asynchronously
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Convert the PNG data to a Base64 encoded string
    const base64Image = data.toString("base64");

    // Generate the HTML string with an <img> tag referencing the Base64 image
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Image to HTML</title>
        </head>
        <body>
          <img src="data:image/png;base64,${base64Image}" alt="Converted Image">
        </body>
      </html>
    `;

    // Set the appropriate headers for file download
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="converted_image.html"'
    );
    res.setHeader("Content-Type", "text/html");

    // Send the HTML file as the response
    res.send(html);
  });
});

app.get("/imagetopdf", (req, res) => {
  const imageName = req.query.filename;
  const chtype = req.query.chtype;
  const imagePath = `../${chtype}-shared-data/${imageName}.png`;

  // Read the PNG file asynchronously
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the appropriate headers for file download
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="converted_image.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Embed the PNG image into the PDF document and fit it to the page
    doc.image(data);

    // Finalize the PDF document
    doc.end();
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
