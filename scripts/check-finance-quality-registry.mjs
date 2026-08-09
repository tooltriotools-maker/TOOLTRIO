import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dir = path.join(root, 'lib', 'content')
const files = fs.readdirSync(dir).filter((f) => /^finance(?:-batch-\d+|-unreviewed)?\.ts$/.test(f))
const occurrences = new Map()

for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8')
  const re = /slug:\s*['"]([^'"]+)['"]/g
  let match
  while ((match = re.exec(text))) {
    const slug = match[1]
    if (!occurrences.has(slug)) occurrences.set(slug, [])
    occurrences.get(slug).push(file)
  }
}

const duplicates = [...occurrences.entries()].filter(([, files]) => files.length > 1)
const uniqueSlugs = occurrences.size

console.log(`Finance quality source audit: ${uniqueSlugs} unique slugs, ${duplicates.length} duplicate slug(s).`)
if (duplicates.length) {
  console.log('Duplicates are tolerated by the runtime registry with first-definition precedence:')
  for (const [slug, files] of duplicates) console.log(`- ${slug}: ${files.join(', ')}`)
}

// Duplicates are a migration warning, not a runtime failure. The registry itself
// is responsible for producing one deterministic profile per slug.
process.exit(0)
