import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'app', 'calculators', 'health')
const canonical = [
  'mental-fatigue-calculator','mental-health-score-calculator','metabolic-age-calculator','migraine-risk-calculator','mold-exposure-calculator',
  'muscle-gain-calculator','muscle-recovery-time-calculator','nicotine-withdrawal-calculator','night-shift-health-calculator','nutrition-timing-calculator',
  'nutritional-deficiency-risk-calculator','obesity-comorbidity-calculator','omega3-calculator','one-rep-max-calculator','oral-health-risk-calculator',
  'ovulation-calculator','pace-calculator','pain-score-calculator','pcos-risk-calculator','plank-time-calculator','posture-assessment-calculator',
  'posture-calculator','pregnancy-calculator','pregnancy-conception-calculator'
]
const redirectOnly = 'pregnancy-due-date-calculator'
const problems = []
for (const slug of canonical) {
  const dir = path.join(root, slug)
  if (!fs.existsSync(path.join(dir, 'page.tsx'))) problems.push(`${slug}: missing page.tsx`)
}
if (!fs.existsSync(path.join(root, redirectOnly, 'page.tsx'))) problems.push(`${redirectOnly}: missing legacy route`)
const source = fs.readFileSync(path.join(process.cwd(), 'next.config.mjs'), 'utf8')
if (!source.includes("source: '/calculators/health/pregnancy-due-date-calculator'")) problems.push('pregnancy-due-date-calculator: redirect missing')
if (problems.length) { console.error(problems.join('\n')); process.exit(1) }
console.log(`Health Batch 05 audit passed: ${canonical.length} canonical routes + 1 redirect-only legacy route.`)
