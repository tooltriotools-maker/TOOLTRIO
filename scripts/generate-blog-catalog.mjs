import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const blogDir = path.join(root, 'lib/blog')
const posts = new Map()

function extractPostStarts(source) {
  const matches = [...source.matchAll(/^(\s*)slug:\s*(['"])(.*?)\2,\s*\n\s*title:\s*(['"])(.*?)\4/mg)]
  if (!matches.length) return []

  const byIndent = new Map()
  for (const match of matches) {
    const indent = match[1].length
    if (!byIndent.has(indent)) byIndent.set(indent, [])
    byIndent.get(indent).push(match)
  }
  return [...byIndent.values()].sort((a, b) => b.length - a.length)[0] ?? []
}

for (const file of fs.readdirSync(blogDir).filter(name => name.endsWith('.ts') && !name.endsWith('.bak'))) {
  const source = fs.readFileSync(path.join(blogDir, file), 'utf8')
  for (const match of extractPostStarts(source)) {
    const slug = match[3]
    const title = match[5]
    if (posts.has(slug)) throw new Error(`Duplicate blog slug while generating catalog: ${slug}`)
    posts.set(slug, title)
  }
}

const entries = [...posts.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, title]) =>
    `  { name: ${JSON.stringify(title)}, href: '/blog/${slug}', cat: 'Blog', kw: ${JSON.stringify(slug.replaceAll('-', ' '))} },`,
  )

const output = `// GENERATED LIGHTWEIGHT BLOG DISCOVERY CATALOG\n// Source: actual BlogPost object literals from lib/blog/*.ts.\n\nexport type BlogCatalogItem = { name: string; href: string; cat: 'Blog'; kw: string }\n\nexport const BLOG_CATALOG: readonly BlogCatalogItem[] = [\n${entries.join('\n')}\n]\n`
fs.writeFileSync(path.join(root, 'lib/catalog/blog.ts'), output)
console.log(`Blog catalog generated: ${posts.size} actual blog posts.`)
