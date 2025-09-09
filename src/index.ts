import { AuthRequest } from './middleware/authMiddleware';
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const server = fastify();
const prisma = new PrismaClient();

// Basic route to test server
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

// Protected route to test middleware
server.get(
  '/protected',
  { preHandler: authMiddleware },
  async (request: AuthRequest, reply) => {
    const user = request.user;
    return { message: 'Protected route', userId: user?.userId };
  },
);

server.register(authRoutes);

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
