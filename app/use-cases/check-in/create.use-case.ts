/* eslint-disable no-unused-vars */
import type { CheckIn } from '@prisma/client';

import { ApplicationException } from '@exceptions/application.exception';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';
import type { GymRepository } from '@repositories/interfaces/gym.repository';
import { getDistanceBetweenCoordinates } from '@utils/get-distance-between-coordinates.util';

export class CheckInCreateUseCase {
	constructor(
		private checkInRepository: CheckInRepository,
		private gymRepository: GymRepository,
	) {}

	async execute(payload: {
		gym_id: string;
		user_id: string;
		user_latitude: number;
		user_longitude: number;
	}): Promise<{ checkIn: CheckIn }> {
		const gym = await this.gymRepository.findById(payload.gym_id);

		if (!gym) throw ApplicationException.NotFound('Gym not found');

		const distance = getDistanceBetweenCoordinates(
			{
				latitude: payload.user_latitude,
				longitude: payload.user_longitude,
			},
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		);

		const MAX_DISTANCE_IN_KM = 0.1;

		if (distance > MAX_DISTANCE_IN_KM)
			throw ApplicationException.BadRequest('Gym is too far');

		const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate({
			date: new Date(),
			user_id: payload.user_id,
		});

		if (checkInOnSameDate)
			throw ApplicationException.Conflict('User already checked in');

		const checkIn = await this.checkInRepository.create(payload);
		return { checkIn };
	}
}
