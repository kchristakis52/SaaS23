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

app.post('/parse-csv', upload.single('csv'), (req, res) => {
  try {
    let chartname = req.file.originalname
    chartname = chartname.slice(0, chartname.length - 4)
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
        res.status(200).json({ [chartname]: results });
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