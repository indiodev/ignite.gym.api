import { hash } from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import request from 'supertest';

import { prisma } from '@config/database';

export async function CreateAndAuthenticatedUser(
	context: FastifyInstance,
	isAdmin = false,
): Promise<{ token: string }> {
	await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
			role: isAdmin ? 'ADMIN' : 'MEMBER',
		},
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
