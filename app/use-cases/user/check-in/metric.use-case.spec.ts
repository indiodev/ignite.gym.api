import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInRepository } from '@repositories/in-memory/check-in-repository';

import { UserCheckInMetricUseCase } from './metric.use-case';

let checkInRepository: InMemoryCheckInRepository;
let sut: UserCheckInMetricUseCase;

describe('User Check In Metric Use Case', () => {
	beforeEach(async () => {
		checkInRepository = new InMemoryCheckInRepository();
		sut = new UserCheckInMetricUseCase(checkInRepository);
	});

	it('should be able to get user check in metric', async () => {
		await checkInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		await checkInRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});

		const { check_ins_count } = await sut.execute({
			user_id: 'user-01',
		});

		expect(check_ins_count).toEqual(2);
	});
});
