import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { viteEnvs } from 'vite-envs'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      tsconfigPaths({
        projects: [
          './tsconfig.json', // To avoid tsconfigPaths read website tsconfig path
        ],
      }),
      viteEnvs({
        computedEnv: () => ({
          APP_VERSION: process.env.npm_package_version,
          LUNATIC_VERSION:
            process.env.npm_package_dependencies__inseefr_lunatic,
        }),
      }),
    ],
  }
})
