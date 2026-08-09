import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalog = fs.readFileSync(path.join(root, 'lib/catalog/tools.ts'), 'utf8')
const registry = fs.readFileSync(path.join(root, 'lib/content/finance-batch-14.ts'), 'utf8')
const slugs = [...registry.matchAll(/slug:'([^']+)'/g)].map(m => m[1])
const missing = slugs.filter(slug => !catalog.includes(`/calculators/finance/${slug}`))
const duplicate = slugs.filter((slug, i) => slugs.indexOf(slug) !== i)
if (slugs.length !== 25 || missing.length || duplicate.length) {
  console.error({ count: slugs.length, missing, duplicate })
  process.exit(1)
}
console.log(`Finance Batch 14 audit passed: ${slugs.length} routes.`)
