/* eslint-disable no-unused-vars */
import type { CheckIn, Prisma } from '@prisma/client';

import type { CheckInFindSameDate } from '@dto/check-in.dto';
import type { UserCheckInHistoryDTO } from '@dto/user.dto';

export abstract class CheckInRepository {
	abstract create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
	abstract findByUserIdOnSameDate(
		payload: CheckInFindSameDate,
	): Promise<CheckIn | null>;
	abstract findManyByUserId(payload: UserCheckInHistoryDTO): Promise<CheckIn[]>;
	abstract countByUserId(user_id: string): Promise<number>;
	abstract findById(id: string): Promise<CheckIn | null>;
	abstract save(checkIn: CheckIn): Promise<CheckIn>;
}
