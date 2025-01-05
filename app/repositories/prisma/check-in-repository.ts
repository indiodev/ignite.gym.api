import type { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { prisma } from '@config/database';
import type { CheckInFindSameDate } from '@dto/check-in.dto';
import type { UserCheckInHistoryDTO } from '@dto/user.dto';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';

export class PrismaCheckInRepository implements CheckInRepository {
	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.create({
			data,
		});
		return checkIn;
	}

	async findByUserIdOnSameDate(
		payload: CheckInFindSameDate,
	): Promise<CheckIn | null> {
		const startOfTheDay = dayjs(payload.date).startOf('date');
		const endOfTheDay = dayjs(payload.date).endOf('date');
		const checkIn = await prisma.checkIn.findFirst({
			where: {
				user_id: payload.user_id,
				created_at: {
					gte: startOfTheDay.toDate(),
					lte: endOfTheDay.toDate(),
				},
			},
		});

		return checkIn;
	}

	async findManyByUserId(payload: UserCheckInHistoryDTO): Promise<CheckIn[]> {
		const check_ins = await prisma.checkIn.findMany({
			where: { user_id: payload.user_id },
			orderBy: { created_at: 'desc' },
			skip: (payload.page - 1) * 20,
			take: 20,
		});
		return check_ins;
	}

	async countByUserId(user_id: string): Promise<number> {
		const count = await prisma.checkIn.count({
			where: { user_id },
		});
		return count;
	}

	async findById(id: string): Promise<CheckIn | null> {
		const checkIn = await prisma.checkIn.findUnique({
			where: { id },
		});
		return checkIn;
	}

	async save(checkIn: CheckIn): Promise<CheckIn> {
		const checkInUpdated = await prisma.checkIn.update({
			where: { id: checkIn.id },
			data: checkIn,
		});
		return checkInUpdated;
	}
}
