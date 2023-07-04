const fs = require("fs");
const chartExporter = require("highcharts-export-server");
const amqp = require("amqplib");

// Initialize the exporter
chartExporter.initPool();

async function consumeFromQueue(queueName) {
  try {
    const connection = await amqp.connect("amqp://guest:guest@messaging:5672/");
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });

    console.log(`Waiting for messages in queue '${queueName}'...`);

    channel.consume(queueName, async (message) => {
      if (message !== null) {
        const messageContent = message.content.toString();
        console.log(`Received message from queue '${queueName}': ${messageContent}`);

        // Process the received message and generate the chart image
        const lines = messageContent.split(/\r?\n/);
        const title = lines[0];
        const subtitle = lines[1];
        const xAxis = lines[2];
        const yAxis = lines[3];
        lines.splice(0, 4);
        const chartdata = lines.join('\n');
        const chartDetails = {
          type: "png",
          options: {
            chart: {
              type: "line"
            },
            legend: {
              enabled: true
            },
            title: {
              text: title
            },
            subtitle: {
              text: subtitle
            },
            yAxis: {
              title: {
                text: yAxis
              }
            },
            xAxis: {
              title: {
                text: xAxis
              }
            },
            data: {
              csv: chartdata
            }
          }
        };

        const outputFile = "line.png";
        exportChartToImage(chartDetails, outputFile, channel, connection, message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function exportChartToImage(chartDetails, outputFile, channel, connection, message) {
  try {
    chartExporter.export(chartDetails, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      // Get the image data (base64)
      const imageb64 = res.data;

      // Save the image to file
      fs.writeFileSync(outputFile, imageb64, "base64", (err) => {
        if (err) {
          console.log(err);
          return;
        }

        console.log(`Chart image saved to ${outputFile}`);
        channel.ack(message); // Acknowledge the message to remove it from the queue
        chartExporter.killPool();
        channel.close();
        connection.close();
      });
    });
  } catch (error) {
    console.log(error);
  }
}

// Example usage: Consume messages from a queue named "task1_queue"
consumeFromQueue("task1_queue");