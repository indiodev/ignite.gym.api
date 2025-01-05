/* eslint-disable no-unused-vars */
import type { Gym } from '@prisma/client';

import type { GymRepository } from '@repositories/interfaces/gym.repository';
import type { Coordinate } from '@utils/get-distance-between-coordinates.util';

export class GymNearbyUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute(payload: { user: Coordinate }): Promise<{ gyms: Gym[] }> {
		const gyms = await this.gymRepository.findManyNearby(payload.user);
		return { gyms };
	}
}
