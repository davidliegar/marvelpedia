import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    globals: true,
    env: {
      VITE_ENVIRONMENT: 'development',
      VITE_API_URL: '',
      VITE_ANALYTICS_SERVICE: 'debug',
      VITE_DEV_MODE: 'true',
      VITE_API_KEY: ''
    }
  }
})