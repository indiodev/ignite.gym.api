import { z } from 'zod';

export const UserCheckInHistoryQuerySchemaValidator = z.object({
	page: z.coerce.number().min(1).default(1),
});

export const UserCheckInHistorySchemaValidator = z
	.object({
		user_id: z.string().uuid(),
	})
	.merge(UserCheckInHistoryQuerySchemaValidator);

export type UserCheckInHistoryDTO = z.infer<
	typeof UserCheckInHistorySchemaValidator
>;

export type UserCheckInMetricDTO = {
	user_id: string;
};
