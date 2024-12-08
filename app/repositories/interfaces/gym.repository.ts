/* eslint-disable no-unused-vars */
import type { Gym, Prisma } from '@prisma/client';

export interface GymRepository {
	create(data: Prisma.GymCreateInput): Promise<Gym>;
	findById(id: string): Promise<Gym | null>;
}
