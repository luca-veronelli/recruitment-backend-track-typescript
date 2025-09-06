import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const server = fastify();
const prisma = new PrismaClient();

server.get('/', async (request, reply) => {
  return { message: 'Hello World' };
});

// Test endpoint to verify database connection
server.get('/test-db', async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    return { message: 'Database connection successful', users };
  } catch (error) {
    reply.status(500).send({ error: 'Database connection failed' });
  }
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
