import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

// https://vitest.dev/config/file.html
export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        setupFiles: 'tests/setup.ts',
        coverage: {
          reporter: ['text', 'lcov'],
        },
      },
    }),
  ),
)