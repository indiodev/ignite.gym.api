import type { FastifyReply, FastifyRequest } from 'fastify';
import type { FastifyReplyType } from 'fastify/types/type-provider';

export function VerifyUserRoleMiddleware(roleToVerify: 'ADMIN' | 'MEMBER') {
	return async (
		request: FastifyRequest,
		response: FastifyReply,
	): Promise<FastifyReplyType> => {
		const { role } = request.user;

		if (role !== roleToVerify) {
			return response.status(401).send({ message: 'Unauthorized' });
		}
	};
}
