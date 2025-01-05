/* eslint-disable no-unused-vars */
import type { Gym } from '@prisma/client';

import type { GymSearchDTO } from '@dto/gym.dto';
import type { GymRepository } from '@repositories/interfaces/gym.repository';

export class GymSearchUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute(payload: GymSearchDTO): Promise<{ gyms: Gym[] }> {
		const gyms = await this.gymRepository.searchMany(payload);
		return { gyms };
	}
}
