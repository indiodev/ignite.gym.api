import { PrismaCheckInRepository } from '@repositories/prisma/check-in-repository';
import { UserCheckInHistoryUseCase } from '@useCases/user/check-in/history.use-case';

export function UserCheckInHistoryUseCaseFactory(): UserCheckInHistoryUseCase {
	const checkInRepository = new PrismaCheckInRepository();
	return new UserCheckInHistoryUseCase(checkInRepository);
}
