import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import type { AuthenticationSignUpDTO } from '@dto/authentication.dto';
import { ApplicationException } from '@exceptions/application.exception';
import type { UserRepository } from '@repositories/interfaces/user.repository';

export class AuthenticationSignUpUseCase {
	// eslint-disable-next-line no-unused-vars
	constructor(private userRepository: UserRepository) {}
	async execute({
		password,
		...payload
	}: AuthenticationSignUpDTO): Promise<{ user: User }> {
		const password_hash = await hash(password, 6);

		const userWithSameEmail = await this.userRepository.findByEmail(
			payload.email,
		);

		if (userWithSameEmail) {
			throw ApplicationException.Conflict('Email already in use');
		}

		const user = await this.userRepository.create({
			...payload,
			password_hash,
		});
		return { user };
	}
}
