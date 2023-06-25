const fs = require("fs");
const chartExporter = require("highcharts-export-server");
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot

const csvdata = `Titlos
Subtitlos
Chapter,1
Down,1
the,8
Rabbit-Hole,1
Alice,2
was,3
beginning,1
to,2
get,1
very,2
tired,1
of,5
sitting,1
by,2
her,5
sister,2
on,1
bank,1
and,4
having,1
nothing,1
do,1
once,1
or,3
twice,1
she,3
had,2
peeped,1
into,1
book,2
reading,1
but,1
it,2
no,1
pictures,2
conversations,1
in,2
what,1
is,1
use,1
a,3
thought,1
without,1
conversationSo,1
considering,1
own,1
mind,1
as,2
well,1
could,1
for,1
hot,1
day,1
made,1
feel,1
sleepy,1
stupid,1
whether,1
pleasure,1
making,1
daisy-chain,1
would,1
be,1
worth,1
trouble,1
getting,1
up,1
picking,1
daisies,1
when,1
suddenly,1
White,1
Rabbit,1
with,1
pink,1
eyes,1
ran,1
close,1`

const lines = csvdata.split(/\r?\n/);
const title = lines[0];
const subtitle = lines[1];

lines.splice(0, 2);
const chartdata=[];
for (let i=0; i<lines.length; i++){
    const objdata = lines[i].split(",")
    let obj;
    obj = {
        name: objdata[0],
        weight: objdata[1]
    };
    chartdata.push(obj);
}

const chartDetails = {
    type: "png",
    options: {
        chart: {type: "wordcloud"},
        series:[{
            data: chartdata
            
        }],
        title: {
            text: title
        },
        legend: {
            enabled: false
        },
        subtitle: {
            text: subtitle
        },
        

       
    }
};

chartExporter.export(chartDetails, (err, res) => {
    // Get the image data (base64)
    let imageb64 = res.data;

    // Filename of the output
    let outputFile = "wordcloud.png";

    // Save the image to file
    fs.writeFileSync(outputFile, imageb64, "base64", function (err) {
        if (err) console.log(err);
    });

    console.log("Saved image!");
    chartExporter.killPool();
});