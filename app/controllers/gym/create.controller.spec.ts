import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@start/routes';
import { CreateAndAuthenticatedUser } from '@utils/test/create-and-authenticated-user';

describe('Gym Create (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to gym create', async () => {
		const { token } = await CreateAndAuthenticatedUser(app);

		const response = await request(app.server)
			.post('/gym/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 01',
				description: 'Description gym 01',
				phone: '11999999999',
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		expect(response.statusCode).toEqual(201);
	});
});
