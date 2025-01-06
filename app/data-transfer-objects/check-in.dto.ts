import { z } from 'zod';

import { CoordinateSchemaValidator } from './coordinate.dto';

export const CheckInCreateParamsSchemaValidator = z.object({
	gym_id: z.string().uuid(),
});

export const CheckInCreateBodySchemaValidator = z
	.object({})
	.merge(CoordinateSchemaValidator);

export const CheckInCreateSchemaValidator = z
	.object({
		user: z
			.object({
				id: z.string().uuid(),
			})
			.merge(CoordinateSchemaValidator),
	})
	.merge(CheckInCreateParamsSchemaValidator);

export const CheckInValidateParamsSchemaValidator = z.object({
	id: z.string().uuid(),
});

export type CheckInCreateDTO = z.infer<typeof CheckInCreateSchemaValidator>;

export type CheckInFindSameDate = {
	user_id: string;
	date: Date;
};
