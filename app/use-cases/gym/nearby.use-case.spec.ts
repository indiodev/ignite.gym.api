import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymRepository } from '@repositories/in-memory/gym-repository';

import { GymNearbyUseCase } from './nearby.use-case';

let gymRepository: InMemoryGymRepository;
let sut: GymNearbyUseCase;

describe('Gym Nearby Use Case', () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymRepository();
		sut = new GymNearbyUseCase(gymRepository);
	});

	it('should be able to nearby gyms', async () => {
		await gymRepository.create({
			id: 'gym-01',
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -27.2092052,
			longitude: -49.6401091,
		});

		await gymRepository.create({
			id: 'gym-02',
			title: 'Fear Gym',
			description: null,
			phone: null,
			latitude: -27.0610928,
			longitude: -49.5229501,
		});

		const { gyms } = await sut.execute({
			latitude: -27.2092052,
			longitude: -49.6401091,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
	});
});
