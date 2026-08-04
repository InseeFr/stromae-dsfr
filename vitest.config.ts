import path from 'node:path'
import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config'

// https://vitest.dev/config/file.html
export default defineConfig((configEnv) => {
  const baseConfig = viteConfig(configEnv)
  return {
    ...baseConfig,
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      setupFiles: 'tests/setup.ts',
      coverage: {
        reporter: ['text', 'lcov'],
      },
      execArgv: [
        '--import',
        path.resolve(import.meta.dirname, 'tests/register-loader.mjs'),
      ],
    },
  }
})
