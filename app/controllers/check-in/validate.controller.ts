import type { FastifyReply, FastifyRequest } from 'fastify';

import { CheckInValidateParamsSchemaValidator } from '@dto/check-in.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { CheckInValidateUseCaseFactory } from '@factories/check-in/validate.factory';

export async function CheckInValidateController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const query = CheckInValidateParamsSchemaValidator.parse(request.params);
	try {
		const useCase = CheckInValidateUseCaseFactory();
		await useCase.execute({ checkInId: query.id });
		return response.status(204).send();
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
