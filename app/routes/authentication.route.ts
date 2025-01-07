import type { FastifyInstance } from 'fastify';

import { AuthenticationRefreshTokenController } from '@controllers/authentication/refresh-token.controller';
import { AuthenticationSignInController } from '@controllers/authentication/sign-in.controller';
import { AuthenticationSignUpController } from '@controllers/authentication/sign-up.controller';

export async function AuthenticationRouter(
	context: FastifyInstance,
): Promise<void> {
	context.post('/sign-up', AuthenticationSignUpController);
	context.post('/sign-in', AuthenticationSignInController);
	context.patch('/refresh-token', AuthenticationRefreshTokenController);
}
