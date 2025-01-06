/* eslint-disable no-unused-vars */
import type { Gym, Prisma } from '@prisma/client';

import type { CoordinateDTO } from '@dto/coordinate.dto';
import type { GymSearchDTO } from '@dto/gym.dto';

export abstract class GymRepository {
	abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
	abstract findById(id: string): Promise<Gym | null>;
	abstract searchMany(payload: GymSearchDTO): Promise<Gym[]>;
	abstract findManyNearby(payload: CoordinateDTO): Promise<Gym[]>;
}
