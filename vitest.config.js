import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/integration/**/*.test.{js,ts}'],
    exclude: ['tests/e2e/**', 'tests/mcp/**', 'tests/integration/**/*.spec.{js,ts}']
  }
})