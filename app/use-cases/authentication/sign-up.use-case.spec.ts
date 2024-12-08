import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { ApplicationException } from '@exceptions/application.exception';
import { InMemoryUserRepository } from '@repositories/in-memory/user.repository';

import { AuthenticationSignUpUseCase } from './sign-up.use-case';
let userRepository: InMemoryUserRepository;
let sut: AuthenticationSignUpUseCase;

describe('Sign Up Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		sut = new AuthenticationSignUpUseCase(userRepository);
	});

	it('should be able to sign up', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should be able hash user password upon sign up', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should be able to sign up with same email twice', async () => {
		const email = 'johndoe@example.com';

		await sut.execute({
			name: 'John Doe',
			email,
			password: '123456',
		});

		await expect(() =>
			sut.execute({
				name: 'John Doe',
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});
});
