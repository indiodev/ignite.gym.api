import type { User } from '@prisma/client';

import { ApplicationException } from '@exceptions/application.exception';
import type { UserRepository } from '@repositories/interfaces/user.repository';

export class UserProfileUseCase {
	// eslint-disable-next-line no-unused-vars
	constructor(private userRepository: UserRepository) {}
	async execute(query: { id: string }): Promise<{ user: User }> {
		const user = await this.userRepository.findById(query.id);

		if (!user) throw ApplicationException.NotFound('User not found');

		return { user };
	}
}
