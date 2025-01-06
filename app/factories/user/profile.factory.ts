import { PrismaUserRepository } from '@repositories/prisma/user.repository';
import { UserProfileUseCase } from '@useCases/user/profile.use-case';

export function UserProfileUseCaseFactory(): UserProfileUseCase {
	const userRepository = new PrismaUserRepository();
	return new UserProfileUseCase(userRepository);
}
