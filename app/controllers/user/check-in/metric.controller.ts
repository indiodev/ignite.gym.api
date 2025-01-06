import type { FastifyReply, FastifyRequest } from 'fastify';

import { ApplicationException } from '@exceptions/application.exception';
import { UserCheckInMetricUseCaseFactory } from '@factories/user/check-in/metric.factory';

export async function UserCheckInMetricController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	try {
		const useCase = UserCheckInMetricUseCaseFactory();
		const { check_ins_count } = await useCase.execute({
			user_id: request?.user?.sub,
		});

		return response.status(200).send({ check_ins_count });
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
