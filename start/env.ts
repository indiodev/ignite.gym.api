import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development'),
	PORT: z.coerce.number().default(3333),
});

// console.log(process.env);

const validation = schema.safeParse(process.env);

if (!validation.success) {
	console.error('Invalid environment variables', validation.error.format());
	throw new Error('Invalid environment variables');
}

export const Env = validation.data;
