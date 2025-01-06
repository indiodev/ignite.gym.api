import type { FastifyReply, FastifyRequest } from 'fastify';

export async function VerifyJwtMiddleware(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	try {
		await request.jwtVerify();
	} catch (error) {
		return response.status(401).send({ message: 'Unauthorized' });
	}
}
