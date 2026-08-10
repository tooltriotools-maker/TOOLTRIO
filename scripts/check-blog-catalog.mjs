import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const blogDir = path.join(root, 'lib/blog')
const catalogFile = path.join(root, 'lib/catalog/blog.ts')

function extractPostSlugs(source) {
  const matches = [...source.matchAll(/^(\s*)slug:\s*(['"])(.*?)\2,\s*\n\s*title:\s*(['"])(.*?)\4/mg)]
  if (!matches.length) return []
  const byIndent = new Map()
  for (const match of matches) {
    const indent = match[1].length
    if (!byIndent.has(indent)) byIndent.set(indent, [])
    byIndent.get(indent).push(match[3])
  }
  return [...byIndent.values()].sort((a, b) => b.length - a.length)[0] ?? []
}

const sourceSlugs = []
for (const file of fs.readdirSync(blogDir).filter(name => name.endsWith('.ts') && !name.endsWith('.bak'))) {
  sourceSlugs.push(...extractPostSlugs(fs.readFileSync(path.join(blogDir, file), 'utf8')))
}
const catalog = fs.readFileSync(catalogFile, 'utf8')
const catalogSlugs = [...catalog.matchAll(/href:\s*'\/blog\/([^']+)'/g)].map(m => m[1])

const sourceSet = new Set(sourceSlugs)
const catalogSet = new Set(catalogSlugs)
const missing = sourceSlugs.filter(slug => !catalogSet.has(slug))
const extra = catalogSlugs.filter(slug => !sourceSet.has(slug))
const duplicates = catalogSlugs.filter((slug, i) => catalogSlugs.indexOf(slug) !== i)

if (sourceSlugs.length !== sourceSet.size) throw new Error(`Duplicate source blog slugs: ${sourceSlugs.length - sourceSet.size}`)
if (missing.length || extra.length || duplicates.length || sourceSet.size !== catalogSet.size) {
  console.error(JSON.stringify({ sourceCount: sourceSet.size, catalogCount: catalogSet.size, missing, extra, duplicates }, null, 2))
  process.exit(1)
}
console.log(`Blog catalog check passed: ${sourceSet.size} slugs match.`)
