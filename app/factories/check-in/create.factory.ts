import { PrismaCheckInRepository } from '@repositories/prisma/check-in-repository';
import { PrismaGymRepository } from '@repositories/prisma/gym.repository';
import { CheckInCreateUseCase } from '@useCases/check-in/create.use-case';

export function CheckInCreateUseCaseFactory(): CheckInCreateUseCase {
	const checkInRepository = new PrismaCheckInRepository();
	const gymRepository = new PrismaGymRepository();
	return new CheckInCreateUseCase(checkInRepository, gymRepository);
}
