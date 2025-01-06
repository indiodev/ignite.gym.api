import { PrismaGymRepository } from '@repositories/prisma/gym.repository';
import { GymCreateUseCase } from '@useCases/gym/create.use-case';

export function GymCreateUseCaseFactory(): GymCreateUseCase {
	const gymRepository = new PrismaGymRepository();
	return new GymCreateUseCase(gymRepository);
}
