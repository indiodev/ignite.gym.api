import { PrismaCheckInRepository } from '@repositories/prisma/check-in-repository';
import { PrismaGymRepository } from '@repositories/prisma/gym.repository';
import { CheckInValidateUseCase } from '@useCases/check-in/validate.use-case';

export function CheckInValidateUseCaseFactory(): CheckInValidateUseCase {
	const checkInRepository = new PrismaCheckInRepository();
	const gymRepository = new PrismaGymRepository();
	return new CheckInValidateUseCase(checkInRepository, gymRepository);
}
