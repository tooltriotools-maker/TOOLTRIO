import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalog = fs.readFileSync(path.join(root, 'lib/catalog/tools.ts'), 'utf8')
const hrefs = [...catalog.matchAll(/href: '([^']+)'/g)].map(m => m[1])
const seen = new Set()
const errors = []
const redirectOnly = new Set(['/calculators/fun/insult-generator', '/calculators/health/pregnancy-due-date-calculator'])
for (const href of hrefs) {
  if (seen.has(href)) errors.push(`Duplicate catalog href: ${href}`)
  seen.add(href)
}
const routeDirs = [
  ['finance', path.join(root, 'app/calculators/finance')],
  ['health', path.join(root, 'app/calculators/health')],
  ['dev', path.join(root, 'app/calculators/dev')],
  ['fun', path.join(root, 'app/calculators/fun')],
  ['zip', path.join(root, 'app/zip')],
  ['commodities', path.join(root, 'app/commodities')],
]
for (const [cat, dir] of routeDirs) {
  if (!fs.existsSync(dir)) continue
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const page = path.join(dir, entry.name, 'page.tsx')
    if (!fs.existsSync(page)) continue
    const href = cat === 'zip' || cat === 'commodities' ? `/${cat}/${entry.name}` : `/calculators/${cat}/${entry.name}`
    if (!redirectOnly.has(href) && !seen.has(href)) errors.push(`Route missing from catalog: ${href}`)
  }
}
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Catalog check passed: ${seen.size} unique tools.`)
