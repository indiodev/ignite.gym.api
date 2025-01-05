import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymRepository } from '@repositories/in-memory/gym-repository';

import { GymCreateUseCase } from './create.use-case';

let gymRepository: InMemoryGymRepository;
let sut: GymCreateUseCase;

describe('Gym Create Use Case', () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymRepository();
		sut = new GymCreateUseCase(gymRepository);
	});

	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -27.2092052,
			longitude: -49.6401091,
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
