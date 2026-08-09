import fs from 'node:fs'
import path from 'node:path'
import { inferRegion, forbiddenTermsFor, pageMetadataFromSource } from './regional-policy.mjs'

const root = process.cwd()
const financeDir = path.join(root, 'app', 'calculators', 'finance')
const rows = []

for (const entry of fs.readdirSync(financeDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const file = path.join(financeDir, entry.name, 'page.tsx')
  if (!fs.existsSync(file)) continue
  const source = fs.readFileSync(file, 'utf8')
  const meta = pageMetadataFromSource(source)
  const inferred = inferRegion({ slug: entry.name, ...meta, content: source })
  const contentOnly = source.split('const relatedCalculators =', 1)[0]
  const forbidden = forbiddenTermsFor(inferred.region)
    .flatMap(re => contentOnly.match(re) ? [re.source] : [])
  rows.push({ slug: entry.name, explicitRegion: meta.explicitRegion ?? null, inferredRegion: inferred.region, confidence: inferred.confidence, forbidden })
}

const mismatches = rows.filter(r => r.explicitRegion && r.explicitRegion !== r.inferredRegion && r.confidence === 'override-global')
const missing = rows.filter(r => !r.explicitRegion)
const forbidden = rows.filter(r => r.forbidden.length)

const counts = Object.fromEntries(['usa','uk','europe','india','global'].map(r => [r, rows.filter(x => x.inferredRegion === r).length]))
console.log(JSON.stringify({ routes: rows.length, counts, missingExplicitRegion: missing.length, globalOverrides: mismatches.length, forbiddenContentHits: forbidden.length }, null, 2))

if (mismatches.length) {
  console.log('\nGlobal-region overrides:')
  for (const r of mismatches) console.log(`- ${r.slug}: ${r.explicitRegion} -> ${r.inferredRegion}`)
}
if (forbidden.length) {
  console.log('\nPotential regional contamination:')
  for (const r of forbidden.slice(0, 80)) console.log(`- ${r.slug} [${r.inferredRegion}]: ${r.forbidden.join(', ')}`)
}

fs.writeFileSync(path.join(root, 'docs', 'regional-audit.json'), JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2))
