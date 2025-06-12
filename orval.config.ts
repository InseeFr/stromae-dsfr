import { defineConfig } from 'orval'

export default defineConfig({
  openapi: {
    output: {
      mode: 'tags',
      target: 'src/api/',
      schemas: 'src/model/api',
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
