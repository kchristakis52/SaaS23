const express = require("express");
const multer = require("multer");
const { MongoClient } = require("mongodb");
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

// MongoDB connection
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);

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
    await produceToQueue1(message);

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
        email: email,
        timestamp: timestamp,
        charts: 0,
        quotas: 10,
      };

      // Insert the document into the collection
      const result = await collection.insertOne(user);
    }

    res
      .status(200)
      .json({ status: "success", message: "User uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: "Failed to upload User" });
  } finally {
    // Close the MongoDB connection
    await client.close();
    //console.log('Disconnected from MongoDB');
  }
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
