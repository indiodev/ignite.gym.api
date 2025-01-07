import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@start/routes';
import { CreateAndAuthenticatedUser } from '@utils/test/create-and-authenticated-user';

describe('Gym Nearby (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to gym nearby', async () => {
		const { token } = await CreateAndAuthenticatedUser(app, true);

		await request(app.server)
			.post('/gym/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 01',
				description: 'Description gym 01',
				phone: '11999999999',
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		await request(app.server)
			.post('/gym/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Gym 02',
				description: 'Description gym 02',
				phone: '11999999999',
				latitude: -27.0610928,
				longitude: -49.5229501,
			});

		const response = await request(app.server)
			.get('/gym/nearby')
			.query({
				latitude: -27.2092052,
				longitude: -49.6401091,
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'Gym 01',
			}),
		]);
	});
});
