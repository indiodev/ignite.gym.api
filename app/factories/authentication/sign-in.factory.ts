import { PrismaUserRepository } from '@repositories/prisma/user.repository';
import { AuthenticationSignInUseCase } from '@useCases/authentication/sign-in.use-case';

export function SignInUseCaseFactory(): AuthenticationSignInUseCase {
	const userRepository = new PrismaUserRepository();
	return new AuthenticationSignInUseCase(userRepository);
}
