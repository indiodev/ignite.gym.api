import type { FastifyReply, FastifyRequest } from 'fastify';

import { AuthenticationSignInSchemaValidator } from '@dto/authentication.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { SignInUseCaseFactory } from '@factories/authentication/sign-in.factory';

export async function AuthenticationSignInController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const payload = AuthenticationSignInSchemaValidator.parse(request.body);

	try {
		const useCase = SignInUseCaseFactory();
		await useCase.execute(payload);
	} catch (error) {
		if (error instanceof ApplicationException) {
			return response.status(error.code).send({
				message: error.message,
				cause: error.cause,
				code: error.code,
			});
		}

		throw error;
	}

	return response.status(201).send();
}
