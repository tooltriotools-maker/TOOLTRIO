import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const categories = ['finance', 'health']
const failures = []
const results = []

function routeFiles(category) {
  const dir = path.join(root, 'app', 'calculators', category)
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => path.join(dir, e.name, 'page.tsx'))
    .filter(fs.existsSync)
}

const healthQualityText = fs.readFileSync(path.join(root, 'lib/content/health-quality.ts'), 'utf8')
const healthSlugs = new Set([...healthQualityText.matchAll(/^\s*'([^']+)':\s*\{/gm)].map(m => m[1]))
const financeFiles = fs.readdirSync(path.join(root, 'lib/content')).filter(f => /^finance-(batch-\d+|quality|unreviewed)\.ts$/.test(f))
const financeSlugs = new Set()
for (const file of financeFiles) {
  const text = fs.readFileSync(path.join(root, 'lib/content', file), 'utf8')
  for (const m of text.matchAll(/slug:\s*'([^']+)'/g)) financeSlugs.add(m[1])
}

for (const category of categories) {
  for (const file of routeFiles(category)) {
    const slug = path.basename(path.dirname(file))
    const source = fs.readFileSync(file, 'utf8')
    const hasMetadata = source.includes('generateCalculatorMetadata')
    if (!hasMetadata) failures.push(`${category}/${slug}: missing generateCalculatorMetadata`)
    const registry = category === 'health' ? healthSlugs : financeSlugs
    if (!registry.has(slug)) failures.push(`${category}/${slug}: missing quality-registry entry`)
    results.push({ category, slug, hasMetadata, hasQualityProfile: registry.has(slug) })
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  totalRoutes: results.length,
  financeRoutes: results.filter(r => r.category === 'finance').length,
  healthRoutes: results.filter(r => r.category === 'health').length,
  failures,
  pass: failures.length === 0,
}
fs.writeFileSync(path.join(root, 'reports/ymyl-page-audit.json'), JSON.stringify(output, null, 2))
console.log(JSON.stringify(output, null, 2))
if (failures.length) process.exit(1)
