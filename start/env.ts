import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
	PORT: z.coerce.number().default(3333),

	DB_HOST: z.string().default('127.0.0.1'),
	DB_PORT: z.coerce.number().default(5432),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.string(),
	DB_DATABASE: z.string(),

	JWT_SECRET: z.string(),
});

// console.log(process.env);

const validation = schema.safeParse(process.env);

if (!validation.success) {
	console.error('Invalid environment variables', validation.error.format());
	throw new Error('Invalid environment variables');
}

export const Env = validation.data;
