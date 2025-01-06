import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@start/routes';
import { CreateAndAuthenticatedUser } from '@utils/test/create-and-authenticated-user';

describe('User Profile (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get user profile', async () => {
		const { token } = await CreateAndAuthenticatedUser(app);

		const response = await request(app.server)
			.get('/user/profile')
			.set('Authorization', `Bearer ${token}`);

		expect(response.statusCode).toEqual(200);
		expect(response.body.user).toEqual(
			expect.objectContaining({ email: 'johndoe@example.com' }),
		);
	});
});
