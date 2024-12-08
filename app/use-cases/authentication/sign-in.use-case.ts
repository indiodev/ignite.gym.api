import type { User } from '@prisma/client';
import { compare } from 'bcryptjs';

import type { AuthenticationSignInDTO } from '@dto/authentication.dto';
import { ApplicationException } from '@exceptions/application.exception';
import type { UserRepository } from '@repositories/interfaces/user.repository';

export class AuthenticationSignInUseCase {
	// eslint-disable-next-line no-unused-vars
	constructor(private userRepository: UserRepository) {}

	async execute(payload: AuthenticationSignInDTO): Promise<{ user: User }> {
		const user = await this.userRepository.findByEmail(payload.email);

		if (!user) throw ApplicationException.Unauthorized('Invalid credentials');

		const doesPasswordMatch = await compare(
			payload.password,
			user.password_hash,
		);

		if (!doesPasswordMatch)
			throw ApplicationException.Unauthorized('Invalid credentials');

		return { user };
	}
}
