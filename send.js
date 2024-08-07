import { connect } from "amqplib";

const connection = await connect('amqp://localhost');
const channel = await connection.createChannel();

const queue = 'messages';
const message = 'Teste';

await channel.assertQueue(queue, { durable: false });

for (let i = 0; i < 10; i++) {
  const msg = `Mensagem ${i}`;
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(`Sent: ${msg}`);
}

await channel.assertExchange('logs', 'fanout', { durable: false });

await channel.bindQueue(queue, 'logs', '');

channel.publish('logs', '', Buffer.from('Ola'));

await channel.close();
await connection.close();
