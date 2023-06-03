const fs = require("fs");
const chartExporter = require("highcharts-export-server");
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

const csvdata = `Titlos
Subtitlos
Xaksonas
"Category","Year 1990","Year 2000","Year 2010","Year 2018"
"Africa",631,814,1044,1276
"America",727,841,944,1007
"Asia",3202,3714,4170,4561
"Europe",721,726,735,746
"Oceania",26,31,40,42`

const lines = csvdata.split(/\r?\n/);
const title = lines[0];
const subtitle = lines[1];
const yAxis = lines[2];
lines.splice(0, 3);
const chartdata = lines.join('\n');
const chartDetails = {
    type: "png",
    options: {
        chart: {
            type: 'bar'
        },
        title: {
            text: title
        },
        legend: {
            enabled: false
        },
        subtitle: {
            text: subtitle
        },
        data: {
            csv: chartdata,

        },

        xAxis: {
            type: 'category',

        },
        yAxis: {
            title: yAxis
        }
    }
};

chartExporter.export(chartDetails, (err, res) => {
    // Get the image data (base64)
    let imageb64 = res.data;

    // Filename of the output
    let outputFile = "bar.png";

    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("Saved image!");
    chartExporter.killPool();
});