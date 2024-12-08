import { z } from 'zod';

export const AuthenticationSignUpSchemaValidator = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

export const AuthenticationSignInSchemaValidator = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});
export type AuthenticationSignUpDTO = z.infer<
	typeof AuthenticationSignUpSchemaValidator
>;
export type AuthenticationSignInDTO = z.infer<
	typeof AuthenticationSignInSchemaValidator
>;
