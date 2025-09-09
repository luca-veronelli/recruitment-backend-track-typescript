import { FastifyRequest, FastifyReply } from 'fastify';
import { createUser, verifyUser } from '../services/userService';
import { generateToken } from '../services/authService';

interface RegisterBody {
  email: string;
  name: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export async function register(request: FastifyRequest<{ Body: RegisterBody }>, reply: FastifyReply) {
  const { email, name, password } = request.body;
  try {
    const user = await createUser(email, name, password);
    const token = generateToken(user.id);
    reply.status(201).send({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    reply.status(400).send({ error: 'Registration failed' });
  }
}

export async function login(request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) {
  const { email, password } = request.body;
  try {
    const user = await verifyUser(email, password);
    const token = generateToken(user.id);
    reply.send({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    reply.status(401).send({ error: 'Invalid credentials' });
  }
}