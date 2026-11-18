import react from '@vitejs/plugin-react'
import { oidcSpa } from 'oidc-spa/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import { viteEnvs } from 'vite-envs'
import csp from 'vite-plugin-csp-guard'

import { type CspPolicy, createCspPolicy } from './scripts/csp-policy.cjs'

function serializeCspPolicy(policy: CspPolicy): string {
  const directives = Object.keys(policy) as (keyof CspPolicy)[]

  return directives
    .map((directive) => `${directive} ${policy[directive].join(' ')}`)
    .join('; ')
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isStorybook = process.env.STORYBOOK === 'true'
  const cspPolicy = createCspPolicy(env, 5173, command === 'serve')

  return {
    base: env.VITE_BASE_PATH || '/',
    server: {
      headers: {
        'Content-Security-Policy': serializeCspPolicy(cspPolicy),
      },
    },
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      react(),
      // disable oidc-spa for Storybook, else it can't build storybook due to oidc-spa issue
      !isStorybook && oidcSpa(),
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
      csp({
        dev: {
          run: false,
        },
        build: {
          override: true,
        },
        policy: cspPolicy,
        transformPolicy: (_policy, { command }) =>
          command === 'build' ? null : undefined,
      }),
    ],
  }
})
