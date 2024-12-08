import type { FastifyInstance } from 'fastify';

import { AuthenticationSignInController } from '@controllers/authentication/sign-in.controller';
import { AuthenticationSignUpController } from '@controllers/authentication/sign-up.controller';

export async function RootAuthenticationRouter(
	context: FastifyInstance,
): Promise<void> {
	context.post('/sign-up', AuthenticationSignUpController);
	context.post('/sign-in', AuthenticationSignInController);
}
