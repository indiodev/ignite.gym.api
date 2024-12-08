import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { ApplicationException } from '@exceptions/application.exception';
import { InMemoryUserRepository } from '@repositories/in-memory/user.repository';

import { UserProfileUseCase } from './profile.use-case';
let userRepository: InMemoryUserRepository;
let sut: UserProfileUseCase;

describe('User Profile Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		sut = new UserProfileUseCase(userRepository);
	});
	it('should be able to get user profile', async () => {
		const password_hash = await hash('123456', 6);

		const { id } = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash,
		});

		const { user } = await sut.execute({
			id,
		});

		expect(user.name).toEqual('John Doe');
	});

	it('should not be able to get user profile with wrong id', async () => {
		await expect(() =>
			sut.execute({
				id: 'wrong-id',
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});
});
