import { connect } from "amqplib";

const connection = await connect('amqp://localhost');
const channel = await connection.createChannel();
const queue = 'messages';
await channel.assertQueue(queue, { durable: false });

console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

channel.consume(queue, (msg) => {
    if (msg !== null) {
        console.log(`[x] Consumer 2 received ${msg.content.toString()}`);
        channel.ack(msg);
    }
});
