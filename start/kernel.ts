import fastifyCookie from '@fastify/cookie';
import fastify from 'fastify';

const kernel = fastify();

kernel.register(fastifyCookie);

export { kernel };
