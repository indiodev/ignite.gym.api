import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInRepository } from '@repositories/in-memory/check-in-repository';

import { UserCheckInHistoryUseCase } from './history.use-case';

let checkInRepository: InMemoryCheckInRepository;
let sut: UserCheckInHistoryUseCase;

describe('User Check In History Use Case', () => {
	beforeEach(() => {
		checkInRepository = new InMemoryCheckInRepository();
		sut = new UserCheckInHistoryUseCase(checkInRepository);
	});

	it('should be able to get user check in history', async () => {
		await checkInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		});

		await checkInRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		});

		const { check_ins } = await sut.execute({
			user_id: 'user-01',
			page: 1,
		});

		expect(check_ins).toHaveLength(2);
		expect(check_ins).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		]);
	});

	it('should be able to get user check in paginate history', async () => {
		for (let index = 1; index <= 22; index++) {
			await checkInRepository.create({
				gym_id: `gym-${index?.toString().padStart(2, '0')}`,
				user_id: 'user-01',
			});
		}

		const { check_ins } = await sut.execute({
			user_id: 'user-01',
			page: 2,
		});

		expect(check_ins).toHaveLength(2);
		expect(check_ins).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' }),
		]);
	});
});
