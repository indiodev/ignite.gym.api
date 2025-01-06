import { PrismaGymRepository } from '@repositories/prisma/gym.repository';
import { GymSearchUseCase } from '@useCases/gym/search.use-case';

export function GymSearchUseCaseFactory(): GymSearchUseCase {
	const gymRepository = new PrismaGymRepository();
	return new GymSearchUseCase(gymRepository);
}
