import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const healthDir = path.join(root, 'app', 'calculators', 'health')
const canonical = fs.readdirSync(healthDir, { withFileTypes: true })
  .filter(e => e.isDirectory() && e.name !== 'pregnancy-due-date-calculator')
  .map(e => e.name)
  .sort()

const registryPath = path.join(root, 'lib', 'content', 'health-quality.ts')
const registry = fs.readFileSync(registryPath, 'utf8')
const registrySlugs = [...registry.matchAll(/^\s*'([a-z0-9-]+)': \{ slug:/gm)].map(m => m[1]).sort()

const missing = canonical.filter(s => !registrySlugs.includes(s))
const extra = registrySlugs.filter(s => !canonical.includes(s))
if (missing.length || extra.length) {
  console.error('Health quality registry mismatch.')
  if (missing.length) console.error('Missing:', missing.join(', '))
  if (extra.length) console.error('Extra:', extra.join(', '))
  process.exit(1)
}

const counts = {}
for (const m of registry.matchAll(/status: '([^']+)'/g)) counts[m[1]] = (counts[m[1]] ?? 0) + 1

const reportDir = path.join(root, 'docs', 'audits')
fs.mkdirSync(reportDir, { recursive: true })
const report = [
  '# Health-wide Quality Consolidation',
  '',
  `Canonical health routes: **${canonical.length}**`,
  '',
  '## Quality status counts',
  '',
  ...Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([k,v]) => `- ${k}: ${v}`),
  '',
  '## Quality gates',
  '',
  '- Every canonical health route has exactly one quality-registry entry.',
  '- Redirect-only pregnancy due-date route is excluded from the canonical registry.',
  '- `critical_logic_issue`, `needs_formula_review`, and `needs_manual_review` are treated as manual-review states.',
  '- The registry does not alter or rename public URLs.',
  '',
  '## Current architecture gap',
  '',
  'The quality registry is complete, but only a subset of health page implementations currently pass `healthSourceProfile` into `SEOContent`. The next migration should wire the canonical slug into the shared health content layer so every page can surface the correct evidence status without duplicating metadata.',
]
fs.writeFileSync(path.join(reportDir, 'health-wide-quality-consolidation.md'), report.join('\n') + '\n')
console.log(`Health quality registry passed: ${canonical.length} canonical routes.`)
console.log('Status counts:', counts)
