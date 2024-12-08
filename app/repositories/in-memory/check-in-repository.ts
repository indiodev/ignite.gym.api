import type { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';

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

	async findByUserIdOnDate(payload: {
		user_id: string;
		date: Date;
	}): Promise<CheckIn | null> {
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
}
