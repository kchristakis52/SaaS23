const amqp = require("amqplib");
const path = require("path");
//require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function connectToQueue() {
  try {
    const connection = await amqp.connect("amqp://guest:guest@messaging:5672/");
    const channel = await connection.createChannel();

    const exchangeName = "task_exchange";
    await channel.assertExchange(exchangeName, "direct", { durable: true });

    const queues = ["task1_queue", "task2_queue", "task3_queue", "task4_queue"];
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

async function produceToQueue1(message) {
  try {
    const { connection, channel } = await connectToQueue();

    let queueName = "task1_queue";

    await sendToQueue(channel, queueName, message);

    await closeConnection(channel, connection);
  } catch (error) {
    console.log(error);
  }
}

async function produceToQueue2(message) {
  try {
    const { connection, channel } = await connectToQueue();

    let queueName = "task2_queue";

    await sendToQueue(channel, queueName, message);

    await closeConnection(channel, connection);
  } catch (error) {
    console.log(error);
  }
}
async function produceToQueue3(message) {
  try {
    const { connection, channel } = await connectToQueue();

    let queueName = "task3_queue";

    await sendToQueue(channel, queueName, message);

    await closeConnection(channel, connection);
  } catch (error) {
    console.log(error);
  }
}
async function produceToQueue4(message) {
  try {
    const { connection, channel } = await connectToQueue();

    let queueName = "task4_queue";

    await sendToQueue(channel, queueName, message);

    await closeConnection(channel, connection);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  produceToQueue1,
  produceToQueue2,
  produceToQueue3,
  produceToQueue4,
};