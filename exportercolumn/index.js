const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const mysql = require('mysql');
// Initialize the exporter
chartExporter.initPool();
// Chart details object specifies chart type and data to plot


async function consumeFromQueue(queueName) {
    try {
        const connection = await amqp.connect("amqp://guest:guest@messaging:5672/");
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName, { durable: true });

        console.log(`Waiting for messages in queue '${queueName}'...`);

        channel.consume(queueName, async (message) => {
            if (message !== null) {
                const messageContent = message.content.toString();
                console.log(
                    `Received message from queue '${queueName}': ${messageContent}`
                );

                const jsonobj = JSON.parse(messageContent);
                const email = jsonobj.user;
                const diagram_name = jsonobj.chartname;
                
                // Process the received message and generate the chart image


                const lines = jsonobj.data.split(/\r?\n/);
                
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
                exportChartToImage(chartDetails, email, channel, connection, message, diagram_name);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function exportChartToImage(chartDetails, email, channel, connection, message, diagram_name) {
    try {
        const uniqueIdentifier = uuidv4();
        const fileName = `Sample_${uniqueIdentifier}`;
        const filePath = `../shared-data/${fileName}.png`;
        chartExporter.export(chartDetails, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            // Get the image data (base64)
            const imageb64 = res.data;
            // Save the image to file
            fs.writeFileSync(filePath, imageb64, "base64", (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            console.log(`Chart image saved to ${filePath}`);
            channel.ack(message); // Acknowledge the message to remove it from the queue
            chartExporter.killPool();
            // channel.close();
            // connection.close();
        });
        const pool = mysql.createPool({
            host: 'mysql',
            user: 'root',
            password: 'password',
            database: 'SaaSDB'
        });

        const sql = 'INSERT INTO Diagrams (diagram_type, filepath, email, diagram_name, diagram_creation) VALUES (?, ?, ?, ?, ?)';
        const values = ["column", fileName, email, diagram_name, new Date().toISOString().slice(0, 19).replace('T', ' ')];

        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error inserting diagram: ' + err.stack);

            }
            else {
                console.log("Saved Image")
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

// Example usage: Consume messages from a queue named "task1_queue"
consumeFromQueue("columnq");