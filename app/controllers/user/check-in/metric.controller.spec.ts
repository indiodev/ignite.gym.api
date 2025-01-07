import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { prisma } from '@config/database';
import { app } from '@start/routes';
import { CreateAndAuthenticatedUser } from '@utils/test/create-and-authenticated-user';

describe('User Check In Metric (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to user check in metric', async () => {
		const { token } = await CreateAndAuthenticatedUser(app);

		const user = await prisma.user.findFirstOrThrow();

		const gym = await prisma.gym.create({
			data: {
				title: 'Gym 01',
				latitude: -27.2092052,
				longitude: -49.6401091,
			},
		});

		await prisma.checkIn.createMany({
			data: [
				{
					gym_id: gym.id,
					user_id: user.id,
				},
				{
					gym_id: gym.id,
					user_id: user.id,
				},
			],
		});

		const response = await request(app.server)
			.get(`/user/check-in/metric`)
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.check_ins_count).toEqual(2);
	});
});
