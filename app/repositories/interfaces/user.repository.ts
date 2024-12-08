/* eslint-disable no-unused-vars */
import type { Prisma, User } from '@prisma/client';

export interface UserRepository {
	create(data: Prisma.UserCreateInput): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
}
