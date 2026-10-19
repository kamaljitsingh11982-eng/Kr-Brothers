import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const playwrightCli = path.join(root, 'node_modules', 'playwright', 'cli.js')

if (process.platform === 'linux') {
	console.log('Using the bundled Chromium runtime on Linux')
	process.exit(0)
}

const result = spawnSync(process.execPath, [playwrightCli, 'install', 'chromium'], { stdio: 'inherit' })
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)