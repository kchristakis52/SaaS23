const fs = require("fs");
const chartExporter = require("highcharts-export-server");
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

const csvdata = `Titlos
Subtitlos
"Category";"Tokyo";"New York";"London";"Berlin"
"Jan";49,9;83,6;48,9;42,4
"Feb";71,5;78,8;38,8;33,2
"Mar";106,4;98,5;39,3;34,5
"Apr";129,2;93,4;41,4;39,7
"May";144;106;47;52,6
"Jun";176;84,5;48,3;75,5
"Jul";135,6;105;59;57,4
"Aug";148,5;104,3;59,6;60,4
"Sep";216,4;91,2;52,4;47,6
"Oct";194,1;83,5;65,2;39,1
"Nov";95,6;106,6;59,3;46,8
"Dec";54,4;92,3;51,2;51,1`

const lines = csvdata.split(/\r?\n/);
const title = lines[0];
const subtitle = lines[1];

lines.splice(0, 2);
const chartdata = lines.join('\n');
const chartDetails = {
    type: "png",
    options: {
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        
        subtitle: {
            text: subtitle
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
    let outputFile = "column.png";

    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("Saved image!");
    chartExporter.killPool();
});