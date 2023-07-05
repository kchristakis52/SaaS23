const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

const csvdata = `Titlos
"Category";"Brands"
"Chrome";70,67
"Edge";14,77
"Firefox";4,86
"Safari";2,63
"Internet Explorer";1,53
"Opera";1,4
"Sogou Explorer";0,84
"QQ";0,51
"Other";2,6`

const lines = csvdata.split(/\r?\n/);
const title = lines[0];


lines.splice(0, 1);
const chartdata = lines.join('\n');
const chartDetails = {
    type: "png",
    options: {
        chart: {
            type: 'pie'
        },
        title: {
            text: title
        },
        
        data: {
            csv: chartdata,

        },
    }
};

chartExporter.export(chartDetails, (err, res) => {
    // Get the image data (base64)
    let imageb64 = res.data;

    // Filename of the output
    let outputFile = "pie.png";

    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("Saved image!");
    chartExporter.killPool();
});