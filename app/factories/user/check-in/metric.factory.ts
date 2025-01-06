import { PrismaCheckInRepository } from '@repositories/prisma/check-in-repository';
import { UserCheckInMetricUseCase } from '@useCases/user/check-in/metric.use-case';

export function UserCheckInMetricUseCaseFactory(): UserCheckInMetricUseCase {
	const checkInRepository = new PrismaCheckInRepository();
	return new UserCheckInMetricUseCase(checkInRepository);
}
