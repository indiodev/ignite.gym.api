import type { Prisma, User } from '@prisma/client';
import { randomUUID } from 'crypto';

import type { UserRepository } from '@repositories/interfaces/user.repository';

export class InMemoryUserRepository implements UserRepository {
	public items: User[] = [];
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user: User = {
			...data,
			id: randomUUID(),
			created_at: new Date(),
		};
		this.items.push(user);
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find((item) => item.email === email);
		if (!user) return null;
		return user;
	}
	async findById(id: string): Promise<User | null> {
		const user = this.items.find((item) => item.id === id);
		if (!user) return null;
		return user;
	}
}
