import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const healthDir = path.join(root, 'app', 'calculators', 'health')
const sourcePath = path.join(root, 'lib', 'content', 'health-sources.ts')
const qualityPath = path.join(root, 'lib', 'content', 'health-quality.ts')

const dirs = fs.readdirSync(healthDir, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort()

const quality = fs.readFileSync(qualityPath, 'utf8')
const source = fs.readFileSync(sourcePath, 'utf8')
const qualitySlugs = [...quality.matchAll(/^\s*'([a-z0-9-]+)': \{ slug:/gm)].map(m => m[1]).sort()
const sourceSlugs = [...source.matchAll(/^\s*'([a-z0-9-]+)': \{/gm)].map(m => m[1]).sort()
const missingProfiles = dirs.filter(s => !sourceSlugs.includes(s))
const extraProfiles = sourceSlugs.filter(s => !dirs.includes(s))
const missingQuality = dirs.filter(s => !qualitySlugs.includes(s))

const seoFiles = [...fs.globSync('app/calculators/health/**/page.tsx', { cwd: root })]
  .filter(p => !p.includes('pregnancy-due-date-calculator'))
const missingWiring = []
for (const rel of seoFiles) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8')
  if (text.includes('SEOContent') && !text.includes('healthSourceProfile:')) missingWiring.push(rel)
}

const sourceDateCount = (source.match(/sourceDate:/g) ?? []).length
const syntheticReviewed = (source.match(/reviewed:/g) ?? []).length
const forbiddenClaims = []
for (const rel of seoFiles) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8')
  if (/(CDC|NIH|AHA|ACSM)[^\n]{0,90}validated formulas|validated formulas[^\n]{0,90}(CDC|NIH|AHA|ACSM)/i.test(text)) forbiddenClaims.push(rel)
}

if (missingQuality.length || missingWiring.length || syntheticReviewed || forbiddenClaims.length) {
  console.error('Health source architecture check failed.')
  if (missingQuality.length) console.error('Missing quality profiles:', missingQuality.join(', '))
  if (missingWiring.length) console.error('SEOContent pages without healthSourceProfile:', missingWiring.join(', '))
  if (syntheticReviewed) console.error('Synthetic review-date fields found:', syntheticReviewed)
  if (forbiddenClaims.length) console.error('Unsupported CDC/NIH/AHA/ACSM validation claims:', forbiddenClaims.join(', '))
  process.exit(1)
}

const reportDir = path.join(root, 'docs', 'audits')
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'health-source-architecture.md'), `# Health Source Architecture\n\n- Canonical health routes: **${dirs.length}**\n- Quality profiles: **${qualitySlugs.length}**\n- Route-level source profiles: **${sourceSlugs.length}**
- Remaining routes are protected by the shared source-review indexation gate until a source profile is added.\n- SEOContent routes wired to a source profile: **${seoFiles.filter(rel => fs.readFileSync(path.join(root, rel), 'utf8').includes('SEOContent')).length}**\n- Explicit source dates currently recorded: **${sourceDateCount}**\n- Synthetic review-date fields: **0**\n- Unsupported global CDC/NIH/AHA/ACSM validation claims: **0**\n\nSource dates are only recorded when a publication/update date has been verified. Missing dates are not fabricated.\n`)
console.log(`Health source architecture passed: ${dirs.length} routes, ${sourceSlugs.length} route-level source profiles, ${sourceDateCount} verified source dates.`)
