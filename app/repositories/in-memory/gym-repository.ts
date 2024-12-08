import type { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

import type { GymRepository } from '@repositories/interfaces/gym.repository';

export class InMemoryGymRepository implements GymRepository {
	public items: Gym[] = [];

	async findById(id: string): Promise<Gym | null> {
		const gym = this.items.find((item) => item.id === id);
		if (!gym) return null;
		return gym;
	}

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym: Gym = {
			id: randomUUID(),
			...data,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Decimal(data.latitude.toString() ?? 0),
			longitude: new Decimal(data.longitude.toString() ?? 0),
		};
		this.items.push(gym);
		return gym;
	}
}
