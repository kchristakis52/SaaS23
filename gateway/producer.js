const amqp = require("amqplib");
const path = require("path");
//require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function connectToQueue() {
  try {
    const connection = await amqp.connect("amqp://guest:guest@messaging:5672/");
    const channel = await connection.createChannel();

    const exchangeName = "task_exchange";
    await channel.assertExchange(exchangeName, "direct", { durable: true });

    const queues = ["columnq", "lineq", "radarq", "pieq", "wheelq", "wordq"];
    const routingKeys = queues;

    for (let i = 0; i < queues.length; i++) {
      const queueName = queues[i];
      const routingKey = routingKeys[i];

      await channel.assertQueue(queueName, { durable: true });
      await channel.bindQueue(queueName, exchangeName, routingKey);
    }

    return { connection, channel };
  } catch (error) {
    console.log(error);
  }
}

async function sendToQueue(channel, queueName, message) {
  try {
    const messageString = JSON.stringify(message);
    channel.sendToQueue(queueName, Buffer.from(messageString), {
      persistent: true,
    });

    console.log(`Message sent to queue '${queueName}': ${messageString}`);
  } catch (error) {
    console.log(error);
  }
}

async function closeConnection(channel, connection) {
  try {
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
}

async function produceToQueue(message, queueName) {
  try {
    const { connection, channel } = await connectToQueue();

    

    await sendToQueue(channel, queueName, message);

    await closeConnection(channel, connection);
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  produceToQueue,
};