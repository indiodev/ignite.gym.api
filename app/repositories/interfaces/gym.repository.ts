/* eslint-disable no-unused-vars */
import type { Gym, Prisma } from '@prisma/client';

import type { GymSearchDTO } from '@dto/gym.dto';
import type { Coordinate } from '@utils/get-distance-between-coordinates.util';

export abstract class GymRepository {
	abstract create(data: Prisma.GymCreateInput): Promise<Gym>;
	abstract findById(id: string): Promise<Gym | null>;
	abstract searchMany(payload: GymSearchDTO): Promise<Gym[]>;
	abstract findManyNearby(payload: Coordinate): Promise<Gym[]>;
}
