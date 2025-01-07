import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymRepository } from '@repositories/in-memory/gym-repository';

import { GymSearchUseCase } from './search.use-case';

let gymRepository: InMemoryGymRepository;
let sut: GymSearchUseCase;

describe('Gym Search Use Case', () => {
	beforeEach(() => {
		gymRepository = new InMemoryGymRepository();
		sut = new GymSearchUseCase(gymRepository);
	});

	it('should be able to search gyms', async () => {
		await gymRepository.create({
			id: 'gym-01',
			title: 'JavaScript Gym',
			description: null,
			phone: null,
			latitude: -27.2092052,
			longitude: -49.6401091,
		});

		await gymRepository.create({
			id: 'gym-02',
			title: 'TypeScript Gym',
			description: null,
			phone: null,
			latitude: -27.2092052,
			longitude: -49.6401091,
		});

		const { gyms } = await sut.execute({
			q: 'JavaScript',
			page: 1,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym' }),
		]);
	});

	it('should be able to get gyms search paginate', async () => {
		for (let index = 1; index <= 22; index++) {
			await gymRepository.create({
				title: `JavaScript Gym ${index}`,
				description: null,
				phone: null,
				latitude: -27.2092052,
				longitude: -49.6401091,
			});
		}

		const { gyms } = await sut.execute({
			q: 'JavaScript',
			page: 2,
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym 21' }),
			expect.objectContaining({ title: 'JavaScript Gym 22' }),
		]);
	});
});
