import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = path.join(projectRoot, 'dist')

async function removeExcludedEntries(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    const excluded =
      entry.name === '.git' ||
      entry.name === '.vercel' ||
      entry.name.startsWith('.env') ||
      entry.name.toLowerCase().endsWith('.zip')

    if (excluded) {
      await rm(entryPath, { recursive: true, force: true })
    } else if (entry.isDirectory()) {
      await removeExcludedEntries(entryPath)
    }
  }
}

await removeExcludedEntries(distRoot)
