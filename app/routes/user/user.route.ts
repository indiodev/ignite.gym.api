import type { FastifyInstance } from 'fastify';

import { UserProfileController } from '@controllers/user/profile.controller';
import { VerifyJwtMiddleware } from '@middlewares/verify-jwt.middleware';

import { UserCheckInRouter } from './check-in.route';

export async function UserRouter(context: FastifyInstance): Promise<void> {
	context.addHook('onRequest', VerifyJwtMiddleware);
	context.get('/profile', UserProfileController);
	context.register(UserCheckInRouter, { prefix: 'check-in' });
}
