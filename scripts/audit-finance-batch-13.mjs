import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalog = fs.readFileSync(path.join(root, 'lib/catalog/tools.ts'), 'utf8')
const batch = fs.readFileSync(path.join(root, 'lib/content/finance-batch-13.ts'), 'utf8')
const slugs = [...batch.matchAll(/slug:'([^']+)'/g)].map(m => m[1])
const missing = slugs.filter(slug => !catalog.includes(`/calculators/finance/${slug}`))
if (slugs.length !== 25) throw new Error(`Expected 25 routes, found ${slugs.length}`)
if (missing.length) throw new Error(`Missing catalog routes: ${missing.join(', ')}`)
for (const slug of slugs) {
  const dir = path.join(root, 'app/calculators/finance', slug)
  if (!fs.existsSync(dir)) throw new Error(`Missing route directory: ${slug}`)
}
console.log(`Finance Batch 13 audit passed: ${slugs.length} routes.`)
