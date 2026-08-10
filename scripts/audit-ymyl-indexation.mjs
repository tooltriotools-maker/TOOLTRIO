import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const report = { finance: {}, health: {}, pass: true, failures: [] }

function financeProfiles() {
  const registry = fs.readFileSync(path.join(root, 'lib/content/finance-quality-registry.ts'), 'utf8')
  const imports = [...registry.matchAll(/import \{ (FINANCE_[A-Z0-9_]+) \} from '\.\/([^']+)'/g)]
  const seen = new Map()
  for (const [, , file] of imports) {
    const p = path.join(root, 'lib/content', `${file}.ts`)
    const text = fs.readFileSync(p, 'utf8')
    const matches = [...text.matchAll(/\{\s*slug:\s*'([^']+)'/g)]
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index
      const end = i + 1 < matches.length ? matches[i + 1].index : text.length
      const obj = text.slice(start, end)
      const slug = matches[i][1]
      if (seen.has(slug)) continue
      const status = obj.match(/status:\s*'([^']+)'/)?.[1] ?? 'unknown'
      const sources = obj.match(/sources:\s*\[([^\]]*)\]/s)?.[1]?.trim()
      const methodology = obj.match(/methodology:\s*([^,]+),/s)?.[1]?.trim()
      const limitations = obj.match(/limitations:\s*\[([^\]]*)\]/s)?.[1]?.trim()
      seen.set(slug, { status, hasSource: Boolean(sources), hasMethodology: Boolean(methodology), hasLimitations: Boolean(limitations) })
    }
  }
  return seen
}

function healthProfiles() {
  const quality = fs.readFileSync(path.join(root, 'lib/content/health-quality.ts'), 'utf8')
  const source = fs.readFileSync(path.join(root, 'lib/content/health-sources.ts'), 'utf8')
  const q = new Map([...quality.matchAll(/^\s*'([^']+)': \{ slug: '[^']+', status: '([^']+)'/gm)].map(m => [m[1], { status: m[2] }]))
  const sourceEntries = [...source.matchAll(/^\s*'([^']+)': \{/gm)]
  for (let i = 0; i < sourceEntries.length; i++) {
    const start = sourceEntries[i].index
    const end = i + 1 < sourceEntries.length ? sourceEntries[i + 1].index : source.length
    const obj = source.slice(start, end)
    const slug = sourceEntries[i][1]
    if (q.has(slug)) q.get(slug).hasSourceProfile = true
  }
  return q
}

function strictHealthGateSlugs() {
  const text = fs.readFileSync(path.join(root, 'lib/content/health-ymyl-publication.ts'), 'utf8')
  return [...text.matchAll(/^  '([^']+)': \{ slug: '[^']+', formulaAudit: '([^']+)', sourceAudit: '([^']+)', claimsAudit: '([^']+)', safetyAudit: '([^']+)', uxAudit: '([^']+)', testVectors: '([^']+)'/gm)]
    .map(m => ({ slug: m[1], ready: [m[2],m[3],m[4],m[5],m[6],m[7]].every(v => v === 'passed') }))
}

function summarize(map, blocked) {
  const counts = {}
  let indexable = 0
  let redirectOnly = 0
  for (const { status, hasSource = false, hasSourceProfile = false, hasMethodology = false, hasLimitations = false } of map.values()) {
    counts[status] = (counts[status] ?? 0) + 1
    if (status === 'redirect_only') { redirectOnly++; continue }
    if (!blocked.has(status) && (hasSource || hasSourceProfile || (hasMethodology && hasLimitations))) indexable++
  }
  return { total: map.size, counts, indexable, redirectOnly, noindex: map.size - indexable - redirectOnly }
}

const finance = summarize(financeProfiles(), new Set())
const health = summarize(healthProfiles(), new Set(['critical_logic_issue', 'redirect_only']))
const strictGates = strictHealthGateSlugs()
const strictGateFailures = strictGates.filter(g => !g.ready).map(g => g.slug)
report.finance = finance
report.health = health
report.healthStrictGate = { total: strictGates.length, ready: strictGates.filter(g => g.ready).length, failures: strictGateFailures }

if (finance.total !== 389) report.failures.push(`Expected 389 finance quality profiles, found ${finance.total}`)
if (health.total !== 173) report.failures.push(`Expected 173 health quality profiles, found ${health.total}`)
if (strictGates.length !== 11) report.failures.push(`Expected 11 strict health publication gates, found ${strictGates.length}`)
for (const slug of strictGateFailures) report.failures.push(`Strict YMYL publication gate not passed: ${slug}`)
report.pass = report.failures.length === 0

fs.mkdirSync(path.join(root, 'reports'), { recursive: true })
fs.writeFileSync(path.join(root, 'reports/ymyl-indexation-audit.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exit(1)
