const { timeLog } = require("console");
const fs = require("fs");
const chartExporter = require("highcharts-export-server");
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

const csvdata = `Titlos
"Brazil";"Portugal";5
"Brazil";"France";1
"Brazil";"Spain";1
"Brazil";"England";1
"Canada";"Portugal";1
"Canada";"France";5
"Canada";"England";1
"Mexico";"Portugal";1
"Mexico";"France";1
"Mexico";"Spain";5
"Mexico";"England";1
"USA";"Portugal";1
"USA";"France";1
"USA";"Spain";1
"USA";"England";5
"Portugal";"Angola";2
"Portugal";"Senegal";1
"Portugal";"Morocco";1
"Portugal";"South Africa";3
"France";"Angola";1
"France";"Senegal";3
"France";"Mali";3
"France";"Morocco";3
"France";"South Africa";1
"Spain";"Senegal";1
"Spain";"Morocco";3
"Spain";"South Africa";1
"England";"Angola";1
"England";"Senegal";1
"England";"Morocco";2
"England";"South Africa";7
"South Africa";"China";5
"South Africa";"India";1
"South Africa";"Japan";3
"Angola";"China";5
"Angola";"India";1
"Angola";"Japan";3
"Senegal";"China";5
"Senegal";"India";1
"Senegal";"Japan";3
"Mali";"China";5
"Mali";"India";1
"Mali";"Japan";3
"Morocco";"China";5
"Morocco";"India";1
"Morocco";"Japan";3
"Japan";"Brazil";1`

const lines = csvdata.split(/\r?\n/);
const title = lines[0];

lines.splice(0, 1);
const chartdata=[];

for (let i=0; i<lines.length; i++){
    const objdata = lines[i].split(";");
    objdata[2]=parseInt(objdata[2])
    chartdata.push(objdata);    
}
console.log(chartdata)
const chartDetails = {
    type: "png",
    options: {
        chart: {
            type: 'dependencywheel'
          },
          title: {
            text: 'Dependency Graph'
          },
          series: [{
            keys: ['from', 'to', 'weight'],
            data: chartdata
          }]
        
        

       
    }
};

chartExporter.export(chartDetails, (err, res) => {
    // Get the image data (base64)
    let imageb64 = res.data;

    // Filename of the output
    let outputFile = "line.png";

    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("Saved image!");
    chartExporter.killPool();
});