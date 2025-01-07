import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { prisma } from '@config/database';
import { app } from '@start/routes';
import { CreateAndAuthenticatedUser } from '@utils/test/create-and-authenticated-user';

describe('Check In Create (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to check in create', async () => {
		const { token } = await CreateAndAuthenticatedUser(app);

		const gym = await prisma.gym.create({
			data: {
				title: 'Gym 01',
				latitude: -27.2092052,
				longitude: -49.6401091,
			},
		});

		const response = await request(app.server)
			.post(`/check-in/${gym.id}/create`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -27.2092052,
				longitude: -49.6401091,
			});

		expect(response.statusCode).toEqual(201);
	});
});
