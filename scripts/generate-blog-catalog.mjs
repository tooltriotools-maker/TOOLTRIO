import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dir = path.join(root, 'lib/blog')
const posts = new Map()
const titleize = slug => slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.ts') || file.endsWith('.bak')) continue
  const source = fs.readFileSync(path.join(dir, file), 'utf8')
  for (const match of source.matchAll(/slug:\s*['"]([^'"]+)['"]\s*,\s*\n\s*title:\s*['"]([^'"]+)['"]/g)) {
    posts.set(match[1], match[2])
  }
  for (const match of source.matchAll(/slug:\s*['"]([^'"]+)['"]/g)) {
    if (!posts.has(match[1])) posts.set(match[1], titleize(match[1]))
  }
}

const entries = [...posts.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([slug, title]) =>
  `  { name: '${title.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}', href: '/blog/${slug}', cat: 'Blog', kw: '${slug.replaceAll('-', ' ')}' },`
)
const output = `// GENERATED LIGHTWEIGHT BLOG DISCOVERY CATALOG\n// Keeps client-side search independent from full blog article content.\n\nexport type BlogCatalogItem = { name: string; href: string; cat: 'Blog'; kw: string }\n\nexport const BLOG_CATALOG: readonly BlogCatalogItem[] = [\n${entries.join('\n')}\n]\n`
fs.writeFileSync(path.join(root, 'lib/catalog/blog.ts'), output)
console.log(`Blog catalog generated: ${posts.size} posts.`)
