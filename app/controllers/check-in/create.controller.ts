import type { FastifyReply, FastifyRequest } from 'fastify';

import {
	CheckInCreateBodySchemaValidator,
	CheckInCreateParamsSchemaValidator,
} from '@dto/check-in.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { CheckInCreateUseCaseFactory } from '@factories/check-in/create.factory';

export async function CheckInCreateController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const { gym_id } = CheckInCreateParamsSchemaValidator.parse(request.params);
	const payload = CheckInCreateBodySchemaValidator.parse(request.body);
	try {
		const useCase = CheckInCreateUseCaseFactory();
		const { checkIn } = await useCase.execute({
			gym_id,
			user: {
				id: request?.user?.sub,
				latitude: payload.latitude,
				longitude: payload.longitude,
			},
		});
		return response.status(201).send({ checkIn });
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
