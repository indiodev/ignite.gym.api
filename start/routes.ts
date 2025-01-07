import { AuthenticationRouter } from '@routes/authentication.route';
import { CheckInRouter } from '@routes/check-in.route';
import { GymRouter } from '@routes/gym.route';
import { UserRouter } from '@routes/user/user.route';

import { kernel } from './kernel';

kernel.register(AuthenticationRouter, { prefix: 'authentication' });
kernel.register(UserRouter, { prefix: 'user' });
kernel.register(GymRouter, { prefix: 'gym' });
kernel.register(CheckInRouter, { prefix: 'check-in' });

export { kernel as app };
