import type { FastifyInstance } from 'fastify';

import { GymCreateController } from '@controllers/gym/create.controller';
import { GymNearbyController } from '@controllers/gym/nearby.controller';
import { GymSearchController } from '@controllers/gym/search.controller';
import { VerifyJwtMiddleware } from '@middlewares/verify-jwt.middleware';

export async function GymRouter(context: FastifyInstance): Promise<void> {
	context.addHook('onRequest', VerifyJwtMiddleware);

	context.post('/create', GymCreateController);
	context.get('/nearby', GymNearbyController);
	context.get('/search', GymSearchController);
}
