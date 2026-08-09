import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('app/calculators/health')
const sourceFile = path.resolve('lib/content/health-sources.ts')
const auditFile = path.resolve('lib/content/health-calculation-audits.ts')
const slugs = fs.readdirSync(root, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort()
  .slice(25, 50)

const sourceText = fs.readFileSync(sourceFile, 'utf8')
const auditText = fs.readFileSync(auditFile, 'utf8')

const criticalTerms = [
  'CDC & NIH validated',
  'same accuracy used in clinical settings',
  'clinically validated',
  'official FINDRISC',
  'WHO guidelines',
  'healthy range',
]

const rows = slugs.map(slug => {
  const files = fs.readdirSync(path.join(root, slug))
  const client = files.find(f => f.endsWith('Client.tsx'))
  const pagePath = path.join(root, slug, 'page.tsx')
  const clientPath = client ? path.join(root, slug, client) : null
  const page = fs.readFileSync(pagePath, 'utf8')
  const clientText = clientPath ? fs.readFileSync(clientPath, 'utf8') : ''
  const combined = page + '\n' + clientText
  return {
    slug,
    hasSourceProfile: sourceText.includes(`'${slug}': {`),
    hasCalculationAudit: auditText.includes(`'${slug}': {`),
    clientFile: client ?? null,
    staleClaimHits: criticalTerms.filter(term => combined.toLowerCase().includes(term.toLowerCase())),
    routeMismatch: slug === 'creatinine-clearance-calculator' && !/Cockcroft.?Gault|serumCreatinine/i.test(combined),
    usesCustomRiskLanguage: /riskPct|riskLabel|riskLevel|score/.test(clientText),
  }
})

const missingProfiles = rows.filter(r => !r.hasSourceProfile)
const missingAudits = rows.filter(r => !r.hasCalculationAudit)
const mismatches = rows.filter(r => r.routeMismatch)

const outDir = path.resolve('docs/audits')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'health-batch-02.json'), JSON.stringify(rows, null, 2))
fs.writeFileSync(path.join(outDir, 'health-batch-02.md'), [
  '# Health Batch 02 — calculation and claim audit',
  '',
  `Routes audited: ${rows.length}`,
  `Source profiles: ${rows.filter(r => r.hasSourceProfile).length}/${rows.length}`,
  `Calculation audits: ${rows.filter(r => r.hasCalculationAudit).length}/${rows.length}`,
  `Route/function mismatches: ${mismatches.length}`,
  '',
  '## Status',
  ...rows.map(r => `- ${r.slug}: ${r.staleClaimHits.length ? `claim-review (${r.staleClaimHits.join(', ')})` : 'no flagged blanket claim'}`),
  '',
  '## Critical implementation findings',
  '- cardiac-output-calculator: cardiac index currently uses fixed sex-specific body-surface-area assumptions and SVR omits right-atrial pressure.',
  '- ckd-progression-calculator: years-to-dialysis is a linear extrapolation and must not be presented as a validated prognosis.',
  '- creatinine-clearance-calculator: replaced the previous BMI/wellness-score mismatch with Cockcroft–Gault inputs and calculation.',
  '- diabetes-risk-calculator: current score is not the official CDC test/FINDRISC implementation.',
  '- dietary-inflammatory-index-calculator: simplified score is not the published DII methodology.',
  '- emf-exposure-calculator: relative score is not RF dosimetry or a WHO/ICNIRP risk score.',
  '',
  '## Missing source profiles',
  ...(missingProfiles.length ? missingProfiles.map(r => `- ${r.slug}`) : ['- None']),
  '',
  '## Missing calculation audits',
  ...(missingAudits.length ? missingAudits.map(r => `- ${r.slug}`) : ['- None']),
].join('\n'))

if (missingProfiles.length || missingAudits.length || mismatches.length) {
  console.error(`Health Batch 02 audit found ${missingProfiles.length} missing source profiles, ${missingAudits.length} missing calculation audits, and ${mismatches.length} route mismatches.`)
  process.exitCode = 1
} else {
  console.log(`Health Batch 02 audit passed: ${rows.length} routes have source and calculation audit profiles.`)
}
