import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // environment: 'node',
    alias: {
      "@config": resolve(__dirname, "./config"),
      "@database": resolve(__dirname, "./database"),
      "@start": resolve(__dirname, "./start"),
      "@routes": resolve(__dirname, "./app/routes"),
      "@dto": resolve(__dirname, "./app/data-transfer-objects"),
      "@validators": resolve(__dirname, "./app/validators"),
      "@middlewares": resolve(__dirname, "./app/middlewares"),
    },
  },
});
