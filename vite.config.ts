/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      all: true,
      provider: 'v8',
    },
    setupFiles: './src/tests/setup-tests.ts',
    watch: false,
  },
});
