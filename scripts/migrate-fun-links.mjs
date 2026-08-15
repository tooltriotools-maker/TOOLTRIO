#!/usr/bin/env node
/**
 * Migrate ToolTrio fun-tool internal links from /calculators/fun/* to /fun/*.
 *
 * Usage:
 *   node scripts/migrate-fun-links.mjs
 *
 * The migration is intentionally limited to source/content files and skips
 * next.config.mjs because redirect sources must keep the legacy path.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SKIP = new Set(['.git', 'node_modules', '.next', 'dist', 'build'])
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.txt', '.xml'])

let changed = 0
let replacements = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
      continue
    }
    if (entry.name === 'next.config.mjs') continue
    if (entry.name === 'migrate-fun-links.mjs') continue
    if (!EXTENSIONS.has(path.extname(entry.name))) continue

    const before = fs.readFileSync(full, 'utf8')
    const count = (before.match(/\/calculators\/fun\//g) || []).length
    if (!count) continue

    const after = before.replaceAll('/calculators/fun/', '/fun/')
    fs.writeFileSync(full, after)
    changed += 1
    replacements += count
    console.log(`updated ${path.relative(ROOT, full)} (${count} replacements)`)
  }
}

walk(ROOT)

console.log(`\nMigration complete: ${replacements} legacy fun links updated across ${changed} files.`)
console.log('Do not remove the legacy redirects from next.config.mjs until the migration has been deployed and verified.')
