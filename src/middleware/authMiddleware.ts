import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../services/authService';

export interface AuthRequest extends FastifyRequest {
  user?: { userId: number };
}

  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply.status(401).send({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = verifyToken(token);
    (request.raw as any).user = decoded; 
  } catch (error) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
}