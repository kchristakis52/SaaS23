const fs = require("fs");
const chartExporter = require("highcharts-export-server");
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

const csvdata = `Titlos
"Category","Column","Line","Area"
0,8,1,1
45,7,2,8
90,6,3,2
135,5,4,7
180,4,5,3
225,3,6,6
270,2,7,4
315,1,8,5`

const lines = csvdata.split(/\r?\n/);
const title = lines[0];


lines.splice(0, 1);
const chartdata = lines.join('\n');
const chartDetails = {
    type: "png",
    options: {
        chart: {
            polar: true
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
    let outputFile = "radar.png";

    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("Saved image!");
    chartExporter.killPool();
});