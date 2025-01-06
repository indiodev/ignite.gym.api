import type { FastifyInstance } from 'fastify';

import { CheckInCreateController } from '@controllers/check-in/create.controller';
import { CheckInValidateController } from '@controllers/check-in/validate.controller';
import { VerifyJwtMiddleware } from '@middlewares/verify-jwt.middleware';

export async function CheckInRouter(context: FastifyInstance): Promise<void> {
	context.addHook('onRequest', VerifyJwtMiddleware);

	context.post('/:gym_id/create', CheckInCreateController);
	context.post('/:id/validate', CheckInValidateController);
}
