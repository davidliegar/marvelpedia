import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.test.tsx'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/unit/setup.ts',
    coverage: {
      include: ['src']
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})