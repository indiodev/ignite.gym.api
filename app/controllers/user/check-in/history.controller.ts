import type { FastifyReply, FastifyRequest } from 'fastify';

import { UserCheckInHistoryQuerySchemaValidator } from '@dto/user.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { UserCheckInHistoryUseCaseFactory } from '@factories/user/check-in/history.factory';

export async function UserCheckInHistoryController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	try {
		const query = UserCheckInHistoryQuerySchemaValidator.parse(request.query);
		const useCase = UserCheckInHistoryUseCaseFactory();
		const { check_ins } = await useCase.execute({
			...query,
			user_id: request.user.sub,
		});
		return response.status(200).send({ check_ins });
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
