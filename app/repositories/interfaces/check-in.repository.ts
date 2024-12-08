/* eslint-disable no-unused-vars */
import type { CheckIn, Prisma } from '@prisma/client';

export interface CheckInRepository {
	create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
	findByUserIdOnDate(payload: {
		user_id: string;
		date: Date;
	}): Promise<CheckIn | null>;
}
