import type { FastifyReply, FastifyRequest } from 'fastify';

import { CoordinateSchemaValidator } from '@dto/coordinate.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { GymNearbyUseCaseFactory } from '@factories/gym/nearby.factory';

export async function GymNearbyController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const payload = CoordinateSchemaValidator.parse(request.query);
	try {
		const useCase = GymNearbyUseCaseFactory();
		const { gyms } = await useCase.execute(payload);
		return response.status(200).send({ gyms });
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
