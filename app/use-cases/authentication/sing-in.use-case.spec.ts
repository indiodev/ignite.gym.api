import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { ApplicationException } from '@exceptions/application.exception';
import { InMemoryUserRepository } from '@repositories/in-memory/user.repository';

import { AuthenticationSignInUseCase } from './sign-in.use-case';
let userRepository: InMemoryUserRepository;
let sut: AuthenticationSignInUseCase;

describe('Sign In Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		sut = new AuthenticationSignInUseCase(userRepository);
	});
	it('should be able to sign in', async () => {
		const password_hash = await hash('123456', 6);

		await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash,
		});

		const { user } = await sut.execute({
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to sign in with wrong email', async () => {
		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});

	it('should not be able to sign in with wrong password', async () => {
		const password_hash = await hash('123456', 6);

		await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash,
		});

		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '654321',
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});
});
