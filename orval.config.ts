import { defineConfig } from 'orval'

export default defineConfig({
  openapi: {
    input: {
      target: 'generate-api-client/api-docs.json',
    },
    output: {
      mode: 'tags',
      target: 'src/api/',
      schemas: 'src/models/api',
      // Wipe both generated folders before each run to avoid orphan files
      // (e.g. tag files left over when a backend tag is renamed/removed).
      // The patterns below preserve the hand-written files living in src/api.
      clean: [
        '!axiosInstance.ts',
        '!axiosInstance.test.ts',
        '!visualizeQueryOptions.ts',
      ],
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/axiosInstance.ts',
          name: 'stromaeInstance',
        },
        operations: {
          generateDepositProof: {
            mutator: {
              path: './src/api/axiosInstance.ts',
              name: 'depositProofInstance',
            },
          },
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'pnpm run format',
    },
  },
})
