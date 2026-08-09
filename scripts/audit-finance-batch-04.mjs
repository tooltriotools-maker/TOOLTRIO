import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const registry = path.join(root, 'lib/content/finance-batch-04.ts')
const text = fs.readFileSync(registry, 'utf8')
const slugs = [...text.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])
const unique = new Set(slugs)
const failures = []

if (slugs.length !== 25) failures.push(`Expected 25 profiles, found ${slugs.length}`)
if (unique.size !== slugs.length) failures.push('Duplicate slugs detected')

for (const slug of slugs) {
  const route = path.join(root, 'app/calculators/finance', slug, 'page.tsx')
  if (!fs.existsSync(route)) failures.push(`Missing route: ${slug}`)
}

if (failures.length) {
  console.error('Finance Batch 04 audit failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Finance Batch 04 audit passed: ${slugs.length} routes.`)
