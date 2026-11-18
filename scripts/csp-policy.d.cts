export type CspPolicy = Record<string, string[]>

export function createCspPolicy(
  env: Record<string, string>,
  hmrPort: number,
  isDev: boolean,
): CspPolicy
