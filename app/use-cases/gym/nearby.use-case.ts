/* eslint-disable no-unused-vars */
import type { Gym } from '@prisma/client';

import type { CoordinateDTO } from '@dto/coordinate.dto';
import type { GymRepository } from '@repositories/interfaces/gym.repository';

export class GymNearbyUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute(payload: CoordinateDTO): Promise<{ gyms: Gym[] }> {
		const gyms = await this.gymRepository.findManyNearby(payload);
		return { gyms };
	}
}
