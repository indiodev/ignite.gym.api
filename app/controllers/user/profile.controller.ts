import type { FastifyReply, FastifyRequest } from 'fastify';

import { ApplicationException } from '@exceptions/application.exception';
import { UserProfileUseCaseFactory } from '@factories/user/profile.factory';

export async function UserProfileController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	try {
		const useCase = UserProfileUseCaseFactory();
		const { user } = await useCase.execute({ id: request?.user?.sub });
		return response.status(200).send({
			user: {
				...user,
				password_hash: undefined,
			},
		});
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
}
