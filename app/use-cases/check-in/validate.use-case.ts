/* eslint-disable no-unused-vars */
import type { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';

import { ApplicationException } from '@exceptions/application.exception';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';
import type { GymRepository } from '@repositories/interfaces/gym.repository';

export class CheckInValidateUseCase {
	constructor(
		private checkInRepository: CheckInRepository,
		private gymRepository: GymRepository,
	) {}
	async execute({
		checkInId,
	}: {
		checkInId: string;
	}): Promise<{ checkIn: CheckIn }> {
		const checkIn = await this.checkInRepository.findById(checkInId);

		if (!checkIn) throw ApplicationException.NotFound('Check-in not found');

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes',
		);

		if (distanceInMinutesFromCheckInCreation > 20)
			throw ApplicationException.BadRequest('Check-in is too old to validate');

		checkIn.validated_at = new Date();
		await this.checkInRepository.save(checkIn);
		return { checkIn };
	}
}
