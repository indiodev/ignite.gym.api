import type { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function CreateAndAuthenticatedUser(
	context: FastifyInstance,
): Promise<{ token: string }> {
	await request(context.server).post('/authentication/sign-up').send({
		name: 'John Doe',
		email: 'johndoe@example.com',
		password: '123456',
	});

	const authentication = await request(context.server)
		.post('/authentication/sign-in')
		.send({
			email: 'johndoe@example.com',
			password: '123456',
		});

	const { token } = authentication.body;

	return { token };
}
