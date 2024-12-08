import { ZodError } from 'zod';

import { Env } from '@start/env';
import { app } from '@start/routes';

app.setErrorHandler((error, _, response) => {
	if (error instanceof ZodError) {
		const errors = error.errors.map((issue) => ({
			message: issue.message,
		}));
		return response.status(400).send({ errors });
	}

	if (Env.NODE_ENV !== 'production') {
		console.error(JSON.stringify(error, null, 2));
	}

	return response.status(500).send({ message: 'Internal server error' });
});

app.listen({ port: Env.PORT, host: '0.0.0.0' }).then(() => {
	console.log('HTTP Server running on http://localhost:3333');
});
