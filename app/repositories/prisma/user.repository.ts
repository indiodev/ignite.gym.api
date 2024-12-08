import type { Prisma, User } from '@prisma/client';

import { prisma } from '@config/database';
import type { UserRepository } from '@repositories/interfaces/user.repository';

export class PrismaUserRepository implements UserRepository {
	async create(data: Prisma.UserCreateInput): Promise<User> {
		return await prisma.user.create({
			data,
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { email },
		});
	}

	findById(id: string): Promise<User | null> {
		return prisma.user.findUnique({
			where: { id },
		});
	}
}
