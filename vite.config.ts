import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		environmentMatchGlobs: [['app/controllers/**', 'prisma']],
		alias: {
			'@config': resolve(__dirname, './config'),
			'@database': resolve(__dirname, './database'),
			'@start': resolve(__dirname, './start'),
			'@routes': resolve(__dirname, './app/routes'),
			'@dto': resolve(__dirname, './app/data-transfer-objects'),
			'@validators': resolve(__dirname, './app/validators'),
			'@middlewares': resolve(__dirname, './app/middlewares'),
			'@controllers': resolve(__dirname, './app/controllers'),
			'@useCases': resolve(__dirname, './app/use-cases'),
			'@repositories': resolve(__dirname, './app/repositories'),
			'@exceptions': resolve(__dirname, './app/exceptions'),
			'@factories': resolve(__dirname, './app/factories'),
			'@utils': resolve(__dirname, './app/utils'),
		},
	},
});
