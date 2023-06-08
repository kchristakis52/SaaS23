const amqp = require("amqplib");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./env/rabbitmq.env"),
});

const axios = require("axios");

const baseUrl = "http://guest:guest@messaging:15672/api"; // RabbitMQ Management API URL
const exchangeName = process.env.EXCHANGE_NAME;
const queueName = process.env.QUEUE_NAME;
const routingKey = process.env.ROUTING_KEY;

async function setupRabbitMQ() {
  try {
    await waitRabbitMQReady(); // Wait for RabbitMQ to be ready

    const auth = {
      username: "guest",
      password: "guest",
    };

    // Create the exchange
    await axios.put(
      `${baseUrl}/exchanges/%2f/${exchangeName}`,
      {
        type: "direct",
        durable: true,
      },
      { auth }
    );

    const queues = ["task1_queue", "task2_queue", "task3_queue", "task4_queue"];
    const routingKeys = queues;

    for (let i = 0; i < queues.length; i++) {
      const queueName = queues[i];
      const routingKey = routingKeys[i];

      // Create the queue
      await axios.put(
        `${baseUrl}/queues/%2f/${queueName}`,
        {
          durable: true,
        },
        { auth }
      );

      // Bind the queue to the exchange
      await axios.post(
        `${baseUrl}/bindings/%2f/e/${exchangeName}/q/${queueName}`,
        {
          routing_key: routingKey,
        },
        { auth }
      );
    }

    console.log("RabbitMQ setup completed successfully!");
  } catch (error) {
    console.error("RabbitMQ setup failed:", error);
  }
}

async function waitRabbitMQReady() {
  let connected = false;
  while (!connected) {
    try {
      await amqp.connect("amqp://guest:guest@messaging:5672");
      connected = true;
    } catch (error) {
      console.log("Waiting for RabbitMQ to be ready...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

<<<<<<< Updated upstream
setupRabbitMQ();
=======
setupRabbitMQ();
>>>>>>> Stashed changes
