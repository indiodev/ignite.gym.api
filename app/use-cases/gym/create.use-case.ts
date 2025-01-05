/* eslint-disable no-unused-vars */
import type { Gym } from '@prisma/client';

import type { GymCreateDTO } from '@dto/gym.dto';
import type { GymRepository } from '@repositories/interfaces/gym.repository';

export class GymCreateUseCase {
	constructor(private gymRepository: GymRepository) {}

	async execute(payload: GymCreateDTO): Promise<{ gym: Gym }> {
		const gym = await this.gymRepository.create(payload);
		return { gym };
	}
}
