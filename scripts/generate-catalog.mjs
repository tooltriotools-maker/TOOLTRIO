import fs from 'node:fs'
import path from 'node:path'
import { inferRegion, pageMetadataFromSource } from './regional-policy.mjs'

const root = process.cwd()
const oldPath = path.join(root, 'lib', 'catalog', 'tools.ts')
const old = fs.readFileSync(oldPath, 'utf8')

// This generator is intentionally simple: route folders are the authoritative
// existence check, while existing catalog names are retained when available.
// Run it after adding/removing calculator/tool routes.
const nameByHref = new Map()
for (const m of old.matchAll(/\{ name: '([^']+)', href: '([^']+)'/g)) nameByHref.set(m[2], m[1])

const categories = [
  ['fun', path.join(root, 'app', 'calculators', 'fun')],
  ['zip', path.join(root, 'app', 'zip')],
  ['commodities', path.join(root, 'app', 'commodities')],
]
const labels = { fun: 'Fun', zip: 'ZIP', commodities: 'Commodities' }
const records = new Map()
const redirectOnly = new Set(['/calculators/fun/insult-generator'])
const title = slug => slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

for (const [cat, dir] of categories) {
  if (!fs.existsSync(dir)) continue
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const page = path.join(dir, entry.name, 'page.tsx')
    if (!fs.existsSync(page)) continue
    const pageSource = fs.readFileSync(page, 'utf8')
    const pageMeta = pageMetadataFromSource(pageSource)
    const inferredRegion = inferRegion({ slug: entry.name, ...pageMeta, content: pageSource }).region
    const href = cat === 'zip' || cat === 'commodities'
      ? `/${cat}/${entry.name}`
      : `/calculators/${cat}/${entry.name}`
    if (!redirectOnly.has(href)) records.set(href, { name: nameByHref.get(href) ?? title(entry.name), cat, region: inferredRegion })
  }
}

const esc = value => value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")
const lines = [...records.entries()]
  .sort((a, b) => a[1].cat.localeCompare(b[1].cat) || a[0].localeCompare(b[0]))
  .map(([href, { name, cat, region }]) => {
    const slug = href.split('/').pop()
    return `  { name: '${esc(name)}', href: '${href}', cat: '${cat}', catLabel: '${labels[cat]}', kw: '${esc(slug.replaceAll('-', ' '))}', region: '${region}' },`
  })

const output = `// GENERATED CATALOG SOURCE OF TRUTH\n// Generated from route folders. Preserve names by keeping them in this file before regeneration.\n\nexport type ToolCategory = 'fun' | 'zip' | 'commodities'\nexport type ToolRegion = 'usa' | 'uk' | 'europe' | 'india' | 'global'\n\nexport type ToolRecord = {\n  name: string\n  href: string\n  cat: ToolCategory\n  catLabel: string\n  kw: string\n  region?: ToolRegion\n}\n\nexport const TOOL_CATALOG: readonly ToolRecord[] = [\n${lines.join('\n')}\n]\n`
fs.writeFileSync(oldPath, output)
console.log(`Catalog generated: ${records.size} tools.`)
