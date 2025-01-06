import type { FastifyInstance } from 'fastify';

import { UserCheckInHistoryController } from '@controllers/user/check-in/history.controller';
import { UserCheckInMetricController } from '@controllers/user/check-in/metric.controller';
import { VerifyJwtMiddleware } from '@middlewares/verify-jwt.middleware';

export async function UserCheckInRouter(
	context: FastifyInstance,
): Promise<void> {
	context.addHook('onRequest', VerifyJwtMiddleware);
	context.get('/history', UserCheckInHistoryController);
	context.get('/metric', UserCheckInMetricController);
}
