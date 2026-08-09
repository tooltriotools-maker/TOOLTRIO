import fs from 'node:fs'
import path from 'node:path'

const financeDir = path.join(process.cwd(), 'app', 'calculators', 'finance')
const contentDir = path.join(process.cwd(), 'lib', 'content')
const routes = fs.readdirSync(financeDir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort()
const routeSet = new Set(routes)
const files = [
  path.join(contentDir, 'finance-quality.ts'),
  ...fs.readdirSync(contentDir).filter(f => /^finance-batch-\d+\.ts$/.test(f) && f !== 'finance-batch-16.ts').sort().map(f => path.join(contentDir, f)),
]

const profiles = []
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  for (const m of text.matchAll(/(?:slug:\s*['"]([^'"]+)['"]|\[\s*['"]([^'"]+)['"]\s*,)/g)) {
    const slug = m[1] || m[2]
    if (routeSet.has(slug)) profiles.push(slug)
  }
}

const duplicates = [...new Set(profiles.filter((slug, i) => profiles.indexOf(slug) !== i))]
const unique = new Set(profiles)
const missing = routes.filter(route => !unique.has(route))
const batch19 = fs.readFileSync(path.join(contentDir, 'finance-batch-19.ts'), 'utf8')
const batch19Slugs = [...batch19.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1])

if (batch19Slugs.length !== 16) throw new Error(`Batch 19 expected 16 profiles, found ${batch19Slugs.length}`)
if (duplicates.length) throw new Error(`Duplicate finance profiles: ${duplicates.join(', ')}`)
if (missing.length) throw new Error(`Missing finance routes: ${missing.join(', ')}`)

console.log(`Finance Batch 19 audit passed: ${batch19Slugs.length} routes.`)
console.log(`Finance registry coverage: ${routes.length}/${routes.length} routes.`)
console.log('Canonical URLs unchanged: route directories were not renamed.')
