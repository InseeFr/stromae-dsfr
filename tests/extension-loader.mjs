import { statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const extensions = ['.js', '.mjs', '.cjs']

function isFile(path) {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

function isDirectory(path) {
  try {
    return statSync(path).isDirectory()
  } catch {
    return false
  }
}

async function tryResolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch {
    return undefined
  }
}

export async function resolve(specifier, context, nextResolve) {
  // Native Node.js modules
  if (specifier.startsWith('node:')) {
    return nextResolve(specifier, context)
  }

  // URL or path that already has an extension
  if (extname(specifier)) {
    return nextResolve(specifier, context)
  }

  /*
   * 1. Standard attempt
   *
   * This notably preserves the resolution behavior
   * of npm packages and their exports.
   */
  const standardResult = await tryResolve(specifier, context, nextResolve)

  if (standardResult) {
    return standardResult
  }

  /*
   * 2. Attempt with extensions:
   *
   * ./foo       -> ./foo.js
   * package/foo -> package/foo.js
   */
  for (const extension of extensions) {
    const result = await tryResolve(
      `${specifier}${extension}`,
      context,
      nextResolve,
    )

    if (result) {
      return result
    }
  }

  /*
   * 3. Attempt with index:
   *
   * ./foo       -> ./foo/index.js
   * package/foo -> package/foo/index.js
   *
   * Let nextResolve resolve the package in order to preserve support
   * for node_modules, scopes, and npm exports.
   */
  for (const extension of extensions) {
    const result = await tryResolve(
      `${specifier}/index${extension}`,
      context,
      nextResolve,
    )

    if (result) {
      return result
    }
  }

  /*
   * 4. Local filesystem resolution.
   *
   * This is useful for relative imports. On Windows,
   * fileURLToPath() correctly converts file:///C:/... to C:\...
   */
  if (context.parentURL?.startsWith('file:')) {
    const parentPath = fileURLToPath(context.parentURL)
    const parentDir = dirname(parentPath)

    const resolvedPath = join(parentDir, specifier)

    for (const extension of extensions) {
      const filePath = `${resolvedPath}${extension}`

      if (isFile(filePath)) {
        return {
          url: pathToFileURL(filePath).href,
          shortCircuit: true,
        }
      }
    }

    if (isDirectory(resolvedPath)) {
      for (const extension of extensions) {
        const indexPath = join(resolvedPath, `index${extension}`)

        if (isFile(indexPath)) {
          return {
            url: pathToFileURL(indexPath).href,
            shortCircuit: true,
          }
        }
      }
    }
  }

  /*
   * 5. Last resort: let Node generate its original error.
   */
  return nextResolve(specifier, context)
}
