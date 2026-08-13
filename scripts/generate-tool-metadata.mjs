import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalogSource = fs.readFileSync(path.join(root, 'lib', 'catalog', 'tools.ts'), 'utf8')
const records = [...catalogSource.matchAll(/\{ name: '((?:\\'|[^'])*)', href: '([^']+)', cat: '([^']+)'/g)]
  .map(m => ({ name: m[1].replaceAll("\\'", "'"), href: m[2], cat: m[3] }))

const redirects = new Set([
  '/calculators/fun/insult-generator',
])

function pagePathFor(href) {
  if (href.startsWith('/calculators/')) {
    const [, , category, slug] = href.split('/')
    return path.join(root, 'app', 'calculators', category, slug, 'page.tsx')
  }
  const [, category, slug] = href.split('/')
  return path.join(root, 'app', category, slug, 'page.tsx')
}

function readString(source, pattern) {
  const m = source.match(pattern)
  return m?.[1]?.replace(/\\(['"`\\])/g, '$1')?.trim() || undefined
}

function readKeywords(source) {
  const block = source.match(/keywords:\s*\[([\s\S]*?)\]/m)?.[1]
  if (!block) return []
  return [...block.matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1].trim()).filter(Boolean)
}

function readCanonical(source) {
  return readString(source, /canonical:\s*['"]([^'"]+)['"]/) || undefined
}

const output = {}
const missing = []

for (const tool of records) {
  if (redirects.has(tool.href)) continue
  const file = pagePathFor(tool.href)
  if (!fs.existsSync(file)) {
    missing.push(tool.href)
    continue
  }
  const source = fs.readFileSync(file, 'utf8')
  const title = readString(source, /title:\s*['"`]([^'"`\n]+)['"`]/)
  const description = readString(source, /description:\s*['"`]([^'"`\n]+)['"`]/)
  const canonical = readCanonical(source)
  const keywords = readKeywords(source)
  output[tool.href] = {
    title,
    description,
    keywords: [...new Set(keywords)],
    canonical,
    source: path.relative(root, file).replaceAll('\\', '/'),
  }
}

if (missing.length) {
  console.error(`Missing page files for ${missing.length} catalog routes:`)
  console.error(missing.join('\n'))
  process.exit(1)
}

const target = path.join(root, 'lib', 'catalog', 'generated-tool-metadata.ts')
const header = `// GENERATED FILE — DO NOT EDIT BY HAND.\n// Source: canonical page metadata exported by each route.\n// Regenerate with: npm run metadata:generate\n\nexport type GeneratedToolPageMetadata = {\n  title?: string\n  description?: string\n  keywords: readonly string[]\n  canonical?: string\n  source: string\n}\n\nexport const GENERATED_TOOL_PAGE_METADATA: Readonly<Record<string, GeneratedToolPageMetadata>> = `
fs.writeFileSync(target, `${header}${JSON.stringify(output, null, 2)} as const\n`)
console.log(`Generated ${Object.keys(output).length} page metadata records.`)
