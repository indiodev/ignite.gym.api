/* eslint-disable no-unused-vars */
import type { CheckIn } from '@prisma/client';

import type { UserCheckInHistoryDTO } from '@dto/user.dto';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';

export class UserCheckInHistoryUseCase {
	constructor(private checkInRepository: CheckInRepository) {}
	async execute(
		payload: UserCheckInHistoryDTO,
	): Promise<{ check_ins: CheckIn[] }> {
		const check_ins = await this.checkInRepository.findManyByUserId(payload);
		return { check_ins };
	}
}
