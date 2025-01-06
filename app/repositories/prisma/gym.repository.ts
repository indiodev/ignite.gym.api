import type { Gym, Prisma } from '@prisma/client';

import { prisma } from '@config/database';
import type { CoordinateDTO } from '@dto/coordinate.dto';
import type { GymSearchDTO } from '@dto/gym.dto';
import type { GymRepository } from '@repositories/interfaces/gym.repository';

export class PrismaGymRepository implements GymRepository {
	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = await prisma.gym.create({ data });
		return gym;
	}
	async findById(id: string): Promise<Gym | null> {
		const gym = await prisma.gym.findUnique({ where: { id } });
		return gym;
	}
	async searchMany(payload: GymSearchDTO): Promise<Gym[]> {
		const gyms = await prisma.gym.findMany({
			where: {
				title: {
					contains: payload.q,
				},
			},
			take: 20,
			skip: (payload.page - 1) * 20,
		});
		return gyms;
	}
	async findManyNearby(payload: CoordinateDTO): Promise<Gym[]> {
		const gyms = await prisma.$queryRaw<Gym[]>/*sql*/ `
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${payload.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${payload.longitude}) ) + sin( radians(${payload.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

		return gyms;
	}
}
