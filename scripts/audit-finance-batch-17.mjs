import fs from 'node:fs'
import path from 'node:path'

const root = 'app/calculators/finance'
const file = 'lib/content/finance-batch-17.ts'
const text = fs.readFileSync(file, 'utf8')
const slugs = [...text.matchAll(/^  \['([^']+)'/gm)].map(m => m[1])
if (slugs.length !== 25) throw new Error(`Expected 25 profiles, found ${slugs.length}`)
for (const slug of slugs) {
  const route = path.join(root, slug, 'page.tsx')
  if (!fs.existsSync(route)) throw new Error(`Missing finance route: ${slug}`)
}
if (new Set(slugs).size !== slugs.length) throw new Error('Duplicate batch-17 slug')
console.log('Finance Batch 17 audit passed: 25 routes.')
