import RefParser from '@apidevtools/json-schema-ref-parser'
import { execSync } from 'child_process'
import dotenvFlow from 'dotenv-flow'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, extname, join, resolve } from 'path'

// Load environment variables from .env file
dotenvFlow.config()

// Constants
const PROJECT_ROOT = process.cwd()
const BASE_URL = `${process.env.VITE_API_URL}/v3`
const OPENAPI_SPEC_URL = `${BASE_URL}/api-docs`
const ORIGINAL_ORVAL_CONFIG_PATH = join(PROJECT_ROOT, 'orval.config.ts')
const CACHE_DIR = join(PROJECT_ROOT, 'node_modules', '.cache', 'scripts')

// Main function to orchestrate the workflow
async function main() {
  try {
    const mainOpenApiFilePath = await fetchAndCacheOpenApiSpec(OPENAPI_SPEC_URL)
    const cachedOrvalConfigPath = join(CACHE_DIR, 'orval.config.ts')

    const updatedConfigContent = createModifiedOrvalConfigContent(
      ORIGINAL_ORVAL_CONFIG_PATH,
      mainOpenApiFilePath,
    )

    writeOrvalConfig(cachedOrvalConfigPath, updatedConfigContent)
    runOrval(cachedOrvalConfigPath)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Fetch and cache the OpenAPI specification
async function fetchAndCacheOpenApiSpec(url: string): Promise<string> {
  console.log('Fetching and caching OpenAPI specification...')
  const $refs = await RefParser.resolve(url)
  const filePaths = $refs.paths()

  ensureDirectoryExists(CACHE_DIR)

  const mainOpenApiFilePath = filePaths.reduce((acc, filePath) => {
    const relativePath = getRelativeJsonFilePath(filePath, BASE_URL)
    const outputPath = join(CACHE_DIR, relativePath)

    ensureDirectoryExists(dirname(outputPath))

    const content = $refs.get(filePath)
    if (content) {
      writeJsonFile(outputPath, content)
      return acc || outputPath
    }
    return acc
  }, '')

  console.log('OpenAPI spec has been cached.')
  return mainOpenApiFilePath
}

// Create modified orval.config.ts content
function createModifiedOrvalConfigContent(
  originalConfigPath: string,
  openApiFilePath: string,
): string {
  console.log('Creating modified orval.config.ts content...')
  const configContent = readFileSync(originalConfigPath, 'utf-8')

  return configContent
    .replace(/openapi: {/, `openapi: {\n    input: '${openApiFilePath}',`)
    .replace(/path: '(.*?)'/g, (_, relativePath) => {
      const absolutePath = resolve(PROJECT_ROOT, relativePath)
      return `path: '${absolutePath}'`
    })
    .replace(/target: '(.*?)'/, (_, targetPath) => {
      const absolutePath = resolve(PROJECT_ROOT, targetPath)
      return `target: '${absolutePath}'`
    })
    .replace(/schemas: '(.*?)'/, (_, schemasPath) => {
      const absolutePath = resolve(PROJECT_ROOT, schemasPath)
      return `schemas: '${absolutePath}'`
    })
}

// Write the modified orval.config.ts to the cache directory
function writeOrvalConfig(configPath: string, content: string) {
  writeFileSync(configPath, content, 'utf-8')
  console.log(`Modified orval.config.ts has been written to ${configPath}`)
}

// Run the Orval CLI with the modified config
function runOrval(configPath: string) {
  console.log(`Running Orval with config: ${configPath}`)
  runCommand(`npx orval --config ${configPath}`)
}

// Utility functions
function ensureDirectoryExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }
}

function getRelativeJsonFilePath(filePath: string, baseUrl: string): string {
  const relativePath = filePath.replace(baseUrl, '').replace(/^\//, '')
  return extname(relativePath) === '.json'
    ? relativePath
    : `${relativePath}.json`
}

function writeJsonFile(filePath: string, content: any) {
  writeFileSync(filePath, JSON.stringify(content, null, 2))
}

function runCommand(command: string) {
  console.log(`$ ${command}`)
  execSync(command, { stdio: 'inherit' })
}

// Run the main function
main()
