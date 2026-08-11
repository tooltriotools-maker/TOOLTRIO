import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const targets = ['.next', '.turbo']

for (const target of targets) {
  const full = path.join(root, target)
  try {
    fs.rmSync(full, { recursive: true, force: true })
    console.log(`[clean-next-cache] removed ${target}`)
  } catch (error) {
    console.warn(`[clean-next-cache] could not remove ${target}: ${error?.message ?? error}`)
  }
}
