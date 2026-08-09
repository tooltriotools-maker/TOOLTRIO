import fs from 'node:fs'
import path from 'node:path'

const registry = fs.readFileSync(path.join(process.cwd(), 'lib/content/finance-batch-03.ts'), 'utf8')
const slugs = [...registry.matchAll(/slug: '([^']+)'/g)].map((match) => match[1])
const root = path.join(process.cwd(), 'app', 'calculators', 'finance')
const dirs = new Set(fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name))
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index)
const missing = slugs.filter((slug) => !dirs.has(slug))
if (slugs.length !== 25 || duplicates.length || missing.length) {
  console.error(`Finance Batch 03 audit failed: ${slugs.length} profiles.`)
  if (duplicates.length) console.error('Duplicate profiles:', duplicates)
  if (missing.length) console.error('Missing routes:', missing)
  process.exit(1)
}
console.log(`Finance Batch 03 audit passed: ${slugs.length} routes.`)
