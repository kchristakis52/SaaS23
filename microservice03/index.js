const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Destination folder for storing uploaded CSVs

// MongoDB connection
const uri = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(uri);

app.use(express.json());

// Define the API route to handle the CSV upload
app.post('/upload', upload.single('csv'), async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('uploads');
    const collection = db.collection('chartcsv');

    // Create a new document
    const newCSV = {
      filename: req.file.originalname
      
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newCSV);

    res.status(200).json({ message: 'CSV uploaded successfully', insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload CSV' });
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('Disconnected from MongoDB');
  }
});

app.post('/parse-csv', upload.single('csv'), (req, res) => {
  try {
    const results = [];

    // Read the CSV file using the csv-parser library
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Process each row of the CSV
        results.push(data);
      })
      .on('end', () => {
        // Send the parsed CSV data as the API response
        res.status(200).json({ data: results });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse CSV' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});