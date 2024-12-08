import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ApplicationException } from '@exceptions/application.exception';
import { InMemoryCheckInRepository } from '@repositories/in-memory/check-in-repository';
import { InMemoryGymRepository } from '@repositories/in-memory/gym-repository';

import { CheckInCreateUseCase } from './create.use-case';

let checkInRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInCreateUseCase;

describe('Create Check In Use Case', () => {
	beforeEach(async () => {
		checkInRepository = new InMemoryCheckInRepository();
		gymRepository = new InMemoryGymRepository();
		sut = new CheckInCreateUseCase(checkInRepository, gymRepository);

		await gymRepository.create({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -27.2092052,
			longitude: -49.6401091,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to create check in', async () => {
		const { checkIn } = await sut.execute({
			gym_id: 'gym-01',
			user_id: 'user-01',
			user_latitude: -27.2092052,
			user_longitude: -49.6401091,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to create check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

		await sut.execute({
			gym_id: 'gym-01',
			user_id: 'user-01',
			user_latitude: -27.2092052,
			user_longitude: -49.6401091,
		});

		await expect(() =>
			sut.execute({
				gym_id: 'gym-01',
				user_id: 'user-01',
				user_latitude: -27.2092052,
				user_longitude: -49.6401091,
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});

	it('should be able to create check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

		await sut.execute({
			gym_id: 'gym-01',
			user_id: 'user-01',
			user_latitude: -27.2092052,
			user_longitude: -49.6401091,
		});

		vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

		const { checkIn } = await sut.execute({
			gym_id: 'gym-01',
			user_id: 'user-01',
			user_latitude: -27.2092052,
			user_longitude: -49.6401091,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should noy be able to create check in on distant gym', async () => {
		await gymRepository.create({
			id: 'gym-02',
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -27.0610928,
			longitude: -49.5229501,
		});

		await expect(() =>
			sut.execute({
				gym_id: 'gym-02',
				user_id: 'user-01',
				user_latitude: -27.2092052,
				user_longitude: -49.6401091,
			}),
		).rejects.toBeInstanceOf(ApplicationException);
	});
});
