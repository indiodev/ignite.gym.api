import { beforeAll, describe, expect, it, vi } from 'vitest';

import { ApplicationException } from '@exceptions/application.exception';
import { InMemoryCheckInRepository } from '@repositories/in-memory/check-in-repository';
import { InMemoryGymRepository } from '@repositories/in-memory/gym-repository';

import { CheckInValidateUseCase } from './validate.use-case';

let checkInRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInValidateUseCase;

describe('Check In Validate Use Case', () => {
	beforeAll(() => {
		checkInRepository = new InMemoryCheckInRepository();
		gymRepository = new InMemoryGymRepository();
		sut = new CheckInValidateUseCase(checkInRepository, gymRepository);
		vi.useFakeTimers();
	});

	// afterEach(() => {
	// 	vi.useRealTimers();
	// });

	it('should be able to validate check in', async () => {
		const createdCheckIn = await checkInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id });

		expect(checkIn.validated_at).toEqual(expect.any(Date));
		expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
	});

	it('should not be able to validate an inexistent check in', async () => {
		await expect(() =>
			sut.execute({
				checkInId: 'inexistent-check-in-id',
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});

	it('should not be able to validate the check in after 20 minutes of creation', async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const createdCheckIn = await checkInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});
		const twentyOneMinutesInMs = 1000 * 60 * 21;

		vi.advanceTimersByTime(twentyOneMinutesInMs);

		await expect(() =>
			sut.execute({
				checkInId: createdCheckIn.id,
			}),
		).rejects.toBeInstanceOf(ApplicationException);

		vi.useRealTimers();
	});
});
