import { PrismaGymRepository } from '@repositories/prisma/gym.repository';
import { GymNearbyUseCase } from '@useCases/gym/nearby.use-case';

export function GymNearbyUseCaseFactory(): GymNearbyUseCase {
	const gymRepository = new PrismaGymRepository();
	return new GymNearbyUseCase(gymRepository);
}
