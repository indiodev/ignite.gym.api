import { PrismaUserRepository } from '@repositories/prisma/user.repository';
import { AuthenticationSignUpUseCase } from '@useCases/authentication/sign-up.use-case';

export function SignUpUseCaseFactory(): AuthenticationSignUpUseCase {
	const userRepository = new PrismaUserRepository();
	return new AuthenticationSignUpUseCase(userRepository);
}
