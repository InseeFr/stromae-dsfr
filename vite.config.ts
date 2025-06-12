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
        computedEnv: async () => {
          const path = await import('path')
          const fs = await import('fs/promises')

          const packageJson = JSON.parse(
            await fs.readFile(path.resolve(__dirname, 'package.json'), 'utf-8'),
          )

          // Here you can define any arbitrary values they will be available
          // in `import.meta.env` and it's type definitions.
          // You can also compute defaults for variable declared in `.env` files.
          return {
            APP_VERSION: packageJson.version,
            LUNATIC_VERSION: packageJson.dependencies['@inseefr/lunatic'],
          }
        },
      }),
    ],
  }
})
