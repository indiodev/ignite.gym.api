import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@start/routes';

describe('Sign in (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to sign in', async () => {
		await request(app.server).post('/authentication/sign-up').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const response = await request(app.server)
			.post('/authentication/sign-in')
			.send({
				email: 'johndoe@example.com',
				password: '123456',
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
