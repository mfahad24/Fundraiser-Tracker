import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-ignore
  test: {
    globals: true, // Enable global test functions like `test`, `expect`, `describe`
    environment: 'jsdom', // Use jsdom to simulate the browser environment
    coverage: {
      provider: 'c8', // Use c8 for code coverage (alternative: 'istanbul')
      reporter: ['text', 'html', 'lcov'], // Output coverage in multiple formats
      threshold: {
        global: 80, // Set a global coverage threshold (e.g., 80%)
      },
    },
    setupFiles: './src/setupTests.ts'
  },
});