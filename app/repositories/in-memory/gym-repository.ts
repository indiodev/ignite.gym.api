import type { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

import type { GymSearchDTO } from '@dto/gym.dto';
import type { GymRepository } from '@repositories/interfaces/gym.repository';
import type { Coordinate } from '@utils/get-distance-between-coordinates.util';
import { getDistanceBetweenCoordinates } from '@utils/get-distance-between-coordinates.util';

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

	async searchMany(payload: GymSearchDTO): Promise<Gym[]> {
		const gyms = this.items
			.filter((gym) => gym.title.includes(payload.query))
			.slice((payload.page - 1) * 20, payload.page * 20);
		return gyms;
	}

	async findManyNearby(payload: Coordinate): Promise<Gym[]> {
		function nearby(gym: Gym): boolean {
			const from: Coordinate = {
				latitude: payload.latitude,
				longitude: payload.longitude,
			};
			const to: Coordinate = {
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			};
			const distance = getDistanceBetweenCoordinates(from, to);
			return distance < 10;
		}

		const gyms = this.items.filter(nearby);

		return gyms;
	}
}
