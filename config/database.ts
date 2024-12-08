import { PrismaClient } from '@prisma/client';

import { Env } from '@start/env';

export const prisma = new PrismaClient({
	...(Env.NODE_ENV === 'development' && {
		log: ['query'],
	}),
});
