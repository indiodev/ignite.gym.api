import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@start/routes';

describe('Sign up (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to sign up', async () => {
		const response = await request(app.server)
			.post('/authentication/sign-up')
			.send({
				name: 'John Doe',
				email: 'johndoe@example.com',
				password: '123456',
			});

		expect(response.statusCode).toEqual(201);
	});
});
