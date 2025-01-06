/* eslint-disable no-unused-vars */
import type { CheckIn } from '@prisma/client';

import type { CheckInCreateDTO } from '@dto/check-in.dto';
import { ApplicationException } from '@exceptions/application.exception';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';
import type { GymRepository } from '@repositories/interfaces/gym.repository';
import { getDistanceBetweenCoordinates } from '@utils/get-distance-between-coordinates.util';

export class CheckInCreateUseCase {
	constructor(
		private checkInRepository: CheckInRepository,
		private gymRepository: GymRepository,
	) {}

	async execute(payload: CheckInCreateDTO): Promise<{ checkIn: CheckIn }> {
		const gym = await this.gymRepository.findById(payload.gym_id);

		if (!gym) throw ApplicationException.NotFound('Gym not found');

		const distance = getDistanceBetweenCoordinates(
			{
				latitude: payload.user.latitude,
				longitude: payload.user.longitude,
			},
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		);

		const MAX_DISTANCE_IN_KM = 0.1;

		if (distance > MAX_DISTANCE_IN_KM)
			throw ApplicationException.BadRequest('Maximum distance exceeded');

		const checkInOnSameDate =
			await this.checkInRepository.findByUserIdOnSameDate({
				date: new Date(),
				user_id: payload.user.id,
			});

		if (checkInOnSameDate)
			throw ApplicationException.Conflict('Maximum check ins per day');

		const checkIn = await this.checkInRepository.create({
			gym_id: payload.gym_id,
			user_id: payload.user.id,
		});
		return { checkIn };
	}
}
