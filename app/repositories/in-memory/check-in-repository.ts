import type { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

import type { CheckInFindSameDate } from '@dto/check-in.dto';
import type { UserCheckInHistoryDTO } from '@dto/user.dto';
import type { CheckInRepository } from '@repositories/interfaces/check-in.repository';

export class InMemoryCheckInRepository implements CheckInRepository {
	public items: CheckIn[] = [];
	async create({
		validated_at,
		...data
	}: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn: CheckIn = {
			...data,
			id: randomUUID(),
			validated_at: validated_at ? new Date(validated_at) : null,
			created_at: new Date(),
		};
		this.items.push(checkIn);
		return checkIn;
	}

	async findByUserIdOnSameDate(
		payload: CheckInFindSameDate,
	): Promise<CheckIn | null> {
		const startOfTheDay = dayjs(payload.date).startOf('date');
		const endOfTheDay = dayjs(payload.date).endOf('date');

		const checkInOnSameDate = this.items.find((checkIn) => {
			const checkInDate = dayjs(checkIn.created_at);
			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
			return checkIn.user_id === payload.user_id && isOnSameDate;
		});

		if (!checkInOnSameDate) return null;

		return checkInOnSameDate;
	}

	async findManyByUserId(payload: UserCheckInHistoryDTO): Promise<CheckIn[]> {
		const check_ins = this.items
			.filter((checkIn) => checkIn.user_id === payload.user_id)
			.slice((payload.page - 1) * 20, payload.page * 20);
		return check_ins;
	}

	async countByUserId(user_id: string): Promise<number> {
		return this.items.filter((checkIn) => checkIn.user_id === user_id).length;
	}
	async findById(id: string): Promise<CheckIn | null> {
		const checkIn = this.items.find((item) => item.id === id);
		if (!checkIn) return null;
		return checkIn;
	}
	async save(checkIn: CheckIn): Promise<CheckIn> {
		const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);
		if (checkInIndex >= 0) {
			this.items[checkInIndex] = checkIn;
		}
		return checkIn;
	}
}
