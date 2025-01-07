import type { FastifyReply, FastifyRequest } from 'fastify';

import { ApplicationException } from '@exceptions/application.exception';

export async function AuthenticationRefreshTokenController(
	request: FastifyRequest,
	response: FastifyReply,
): Promise<void> {
	await request.jwtVerify({ onlyCookie: true });

	const { role } = request.user;

	try {
		const token = await response.jwtSign(
			{ role },
			{
				sub: request.user.sub,
			},
		);
		const refreshToken = await response.jwtSign(
			{ role },
			{
				sub: request.user.sub,
				expiresIn: '7d',
			},
		);
		return response
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
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
