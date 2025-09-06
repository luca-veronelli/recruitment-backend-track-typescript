import fastify from 'fastify';

const server = fastify();

server.get('/', async () => {
  return { message: 'Hello World' };
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
