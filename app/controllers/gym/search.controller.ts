import type { FastifyReply, FastifyRequest } from 'fastify';

import { GymSearchSchemaValidator } from '@dto/gym.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { GymSearchUseCaseFactory } from '@factories/gym/search.factory';

export async function GymSearchController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const query = GymSearchSchemaValidator.parse(request.query);
	try {
		const useCase = GymSearchUseCaseFactory();
		const { gyms } = await useCase.execute(query);
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
