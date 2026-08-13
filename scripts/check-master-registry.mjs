import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalogPath = path.join(root, 'lib', 'catalog', 'tools.ts')
const source = fs.readFileSync(catalogPath, 'utf8')
const records = [...source.matchAll(/\{ name: '((?:\\'|[^'])*)', href: '([^']+)', cat: '([^']+)'/g)]
  .map(m => ({ name: m[1].replaceAll("\\'", "'"), href: m[2], cat: m[3] }))

const redirects = new Set([
    '/calculators/fun/insult-generator',
])

const registry = records.filter(r => !redirects.has(r.href))
const errors = []
const seen = new Set()

for (const tool of registry) {
  if (seen.has(tool.href)) errors.push(`duplicate: ${tool.href}`)
  seen.add(tool.href)
}

const categories = [
  ['finance', path.join(root, 'app', 'calculators', 'finance')],
  ['health', path.join(root, 'app', 'calculators', 'health')],
  ['dev', path.join(root, 'app', 'calculators', 'dev')],
  ['fun', path.join(root, 'app', 'calculators', 'fun')],
  ['zip', path.join(root, 'app', 'zip')],
  ['commodities', path.join(root, 'app', 'commodities')],
]

const actual = new Set()
for (const [cat, dir] of categories) {
  if (!fs.existsSync(dir)) continue
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const page = path.join(dir, entry.name, 'page.tsx')
    if (!fs.existsSync(page)) continue
    const href = cat === 'zip' || cat === 'commodities'
      ? `/${cat}/${entry.name}`
      : `/calculators/${cat}/${entry.name}`
    if (!redirects.has(href)) actual.add(href)
  }
}

const registrySet = new Set(registry.map(r => r.href))
for (const href of actual) if (!registrySet.has(href)) errors.push(`missing from registry: ${href}`)
for (const href of registrySet) if (!actual.has(href)) errors.push(`registry points to missing route: ${href}`)

if (errors.length) {
  console.error(`Master registry check failed with ${errors.length} issue(s).`)
  for (const error of errors.slice(0, 100)) console.error(`- ${error}`)
  process.exit(1)
}

const counts = Object.fromEntries(categories.map(([cat]) => [cat, registry.filter(r => r.cat === cat).length]))
console.log(`Master registry check passed: ${registry.length} active routes.`)
console.log(`Category counts: ${Object.entries(counts).map(([k,v]) => `${k}=${v}`).join(', ')}`)
