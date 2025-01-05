/* eslint-disable no-unused-vars */
import type { UserCheckInMetricDTO } from '@dto/user.dto';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';

export class UserCheckInMetricUseCase {
	constructor(private checkInRepository: CheckInRepository) {}

	async execute(
		payload: UserCheckInMetricDTO,
	): Promise<{ check_ins_count: number }> {
		const check_ins_count = await this.checkInRepository.countByUserId(
			payload.user_id,
		);
		return { check_ins_count };
	}
}
