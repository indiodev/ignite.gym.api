import { RootAuthenticationRouter } from '@routes/authentication.route';

import { kernel } from './kernel';

kernel.register(RootAuthenticationRouter, { prefix: 'authentication' });

export { kernel as app };
