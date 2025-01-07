import type { FastifyInstance } from 'fastify';

import { CheckInCreateController } from '@controllers/check-in/create.controller';
import { CheckInValidateController } from '@controllers/check-in/validate.controller';
import { VerifyJwtMiddleware } from '@middlewares/verify-jwt.middleware';
import { VerifyUserRoleMiddleware } from '@middlewares/verify-user-role.middleware';

export async function CheckInRouter(context: FastifyInstance): Promise<void> {
	context.addHook('onRequest', VerifyJwtMiddleware);

	context.post('/:gym_id/create', CheckInCreateController);
	context.patch(
		'/:id/validate',
		{ onRequest: [VerifyUserRoleMiddleware('ADMIN')] },
		CheckInValidateController,
	);
}
