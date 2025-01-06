import type { FastifyReply, FastifyRequest } from 'fastify';

import { GymCreateSchemaValidator } from '@dto/gym.dto';
import { ApplicationException } from '@exceptions/application.exception';
import { GymCreateUseCaseFactory } from '@factories/gym/create.factory';

export async function GymCreateController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	const payload = GymCreateSchemaValidator.parse(request.body);
	try {
		const useCase = GymCreateUseCaseFactory();
		const { gym } = await useCase.execute(payload);
		return response.status(201).send({ gym });
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
