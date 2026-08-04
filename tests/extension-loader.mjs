import { existsSync } from 'node:fs'
import { dirname, extname, join, resolve as resolvePath } from 'node:path'

const extensions = ['.js', '.mjs', '.cjs']

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('node:')) {
    return nextResolve(specifier, context)
  }

  if (extname(specifier)) {
    return nextResolve(specifier, context)
  }

  const parentURL = context.parentURL

  for (const ext of extensions) {
    const withExt = specifier + ext
    try {
      return await nextResolve(withExt, context)
    } catch {
      // try next extension
    }
  }

  if (parentURL) {
    const parentPath = new URL(parentURL).pathname
    const parentDir = dirname(parentPath)
    const resolved = resolvePath(parentDir, specifier)

    for (const ext of extensions) {
      if (existsSync(resolved + ext)) {
        try {
          return await nextResolve(specifier + ext, context)
        } catch {
          // try next extension
        }
      }
    }

    const indexPath = join(resolved, 'index.js')
    if (existsSync(indexPath)) {
      try {
        return await nextResolve(specifier + '/index.js', context)
      } catch {
        // fall through
      }
    }
  }

  return nextResolve(specifier, context)
}
