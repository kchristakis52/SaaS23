const express = require("express");
const multer = require("multer");
const { MongoClient } = require("mongodb");
const csv = require("csv-parser");
const fs = require("fs");

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Destination folder for storing uploaded CSVs

// MongoDB connection
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

app.use(express.json());
//localhost:3000/parse-csv?chtype=line&user=kwstas
app.post("/parse-csv", upload.single("csv"), (req, res) => {
  try {
    let user = req.query.user;
    let chtype = req.query.chtype;
    //console.log(user);
    //console.log(chtype)
    let chartname = req.file.originalname;
    chartname = chartname.slice(0, chartname.length - 4);
    //console.log(chartname)
    console.log(req.file.buffer.toString("utf-8"));
    res.status(200).json({ [chartname]: req.file.buffer.toString("utf-8") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to parse CSV" });
  }
});

// API route to handle user login
app.post("/userloggedin", async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    //console.log('Connected to MongoDB');

    const db = client.db("mycharts");
    const collection = db.collection("users");
    let mail = req.query.mail;
    let timestamp = req.query.timestamp;
    let useralreadyexists = await collection.findOne({ email: mail });
    if (useralreadyexists !== null) {
      await collection.updateOne(
        { email: mail },
        { $set: { timestamp: timestamp } }
      );
    } else {
      // Create a new document
      const user = {
        email: mail,
        timestamp: timestamp,
        charts: 0,
        quotas: 10,
      };

      // Insert the document into the collection
      const result = await collection.insertOne(user);
    }

    res.status(200).json({ message: "User uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload User" });
  } finally {
    // Close the MongoDB connection
    await client.close();
    //console.log('Disconnected from MongoDB');
  }
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
