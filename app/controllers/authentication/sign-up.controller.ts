import type { FastifyReply, FastifyRequest } from 'fastify';

import { AuthenticationSignUpSchemaValidator } from '@dto/authentication.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { SignUpUseCaseFactory } from '@factories/authentication/sign-up.factory';

export async function AuthenticationSignUpController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const payload = AuthenticationSignUpSchemaValidator.parse(request.body);
	try {
		const useCase = SignUpUseCaseFactory();
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
