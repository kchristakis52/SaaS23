const express = require("express");
const multer = require("multer");
const mysql = require('mysql');
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();

const {
  produceToQueue1,
  produceToQueue2,
  produceToQueue3,
  produceToQueue4,
} = require("./producer");

const upload = multer({ storage: multer.memoryStorage() }); // Destination folder for storing uploaded CSVs

// MySQL Connection
const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
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
      filename: chartname,
      user: user,
      chtype: chtype,
    };
    
    await produceToQueue2(message);

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
  // Code for handling the "/userloggedin" route
  // ...

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return res.status(500).json({ error: 'Error connecting to the database' });
    }

    console.log('Connected to MySQL database!');

    // Read the schema.sql file
    const schemaPath = 'database/schema.sql';
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema.sql file to create the tables and define the schema
    connection.query(schema, (error, results) => {
      if (error) {
        console.error('Error executing schema.sql:', error);
        return res.status(500).json({ error: 'Error executing schema.sql' });
      }

      console.log('Database schema created successfully!');

      // Additional logic for the "/userloggedin" route
      const { email, first_name, last_name } = req.body;

      // Check if the user already exists in the database
      const query = 'SELECT * FROM Users WHERE email = ?';
      connection.query(query, [email], (error, results) => {
        if (error) {
          console.error('Error executing MySQL query:', error);
          return res.status(500).json({ error: 'Error retrieving user from database' });
        }
    
        if (results.length === 0) {
          // User doesn't exist, add them to the database
          const insertQuery = 'INSERT INTO Users (email, first_name, last_name) VALUES (?, ?, ?)';
          connection.query(insertQuery, [email, first_name, last_name], (insertError) => {
            if (insertError) {
              console.error('Error executing MySQL query:', insertError);
              return res.status(500).json({ error: 'Error adding user to database' });
            }
    
            // User added successfully
            return res.json({ message: 'User added successfully' });
          });
        } else {
          // User already exists, handle login logic here
          // ...
          return res.json({ message: 'User logged in' });
        }
      });

      // Close the MySQL connection
      connection.end((err) => {
        if (err) {
          console.error('Error closing MySQL connection:', err);
        }
        console.log('MySQL connection closed.');
      });
    });
  });
});

app.get("/produce-task1", async (req, res) => {
  const message = { data: "Your message to task1_queue" };
  await produceToQueue1(message);
  res.send("Message produced to task1_queue");
});

// Example route to produce a message to task2_queue
app.get("/produce-task2", async (req, res) => {
  const message = { data: "Your message to task2_queue" };
  await produceToQueue2(message);
  res.send("Message produced to task2_queue");
});

// Example route to produce a message to task3_queue
app.get("/produce-task3", async (req, res) => {
  const message = { data: "Your message to task3_queue" };
  await produceToQueue3(message);
  res.send("Message produced to task3_queue");
});

// Example route to produce a message to task4_queue
app.get("/produce-task4", async (req, res) => {
  const message = { data: "Your message to task4_queue" };
  await produceToQueue4(message);
  res.send("Message produced to task4_queue");
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
