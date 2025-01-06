import { z } from 'zod';

import { CoordinateSchemaValidator } from './coordinate.dto';

export const GymCreateSchemaValidator = z
	.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
	})
	.merge(CoordinateSchemaValidator);
// .extend(CoordinateSchemaValidator.shape);

export const GymSearchSchemaValidator = z.object({
	q: z.string(),
	page: z.coerce.number().min(1).default(1),
});

export type GymCreateDTO = z.infer<typeof GymCreateSchemaValidator>;

export type GymSearchDTO = z.infer<typeof GymSearchSchemaValidator>;
