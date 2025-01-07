import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import fastify from 'fastify';

import { Env } from './env';

const kernel = fastify();

kernel.register(fastifyCookie);
kernel.register(fastifyJwt, {
	secret: Env.JWT_SECRET,
	sign: { expiresIn: '10m' },
	cookie: { signed: false, cookieName: 'refreshToken' },
});

export { kernel };
