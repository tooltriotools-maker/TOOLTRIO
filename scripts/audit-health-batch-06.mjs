import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'app', 'calculators', 'health')
const canonical = [
  'pregnancy-nutrition-calculator','pregnancy-weight-gain-calculator','protein-intake-calculator','protein-per-meal-calculator','protein-synthesis-calculator',
  'pull-up-calculator','pushup-calculator','respiratory-rate-calculator','resting-metabolic-rate-calculator','running-pace-calculator',
  'sauna-benefits-calculator','sauna-health-calculator','shift-work-health-calculator','sit-and-reach-calculator','skin-aging-calculator',
  'skin-health-calculator','sleep-cycle-calculator','sleep-debt-calculator','sleep-need-calculator','sodium-intake-calculator',
  'spo2-risk-calculator','sprint-calculator','squat-calculator','standing-desk-calculator','steps-calculator'
]
const problems = []
for (const slug of canonical) {
  const file = path.join(root, slug, 'page.tsx')
  if (!fs.existsSync(file)) problems.push(`${slug}: missing page.tsx`)
}
const registry = fs.readFileSync(path.join(process.cwd(), 'lib/content/health-batch-06.ts'), 'utf8')
for (const slug of canonical) {
  if (!registry.includes(`'${slug}':`)) problems.push(`${slug}: missing audit profile`)
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1) }
console.log(`Health Batch 06 audit passed: ${canonical.length} canonical routes + ${canonical.filter(s => !registry.includes(`status: 'reviewed'`)).length} non-default profiles.`)
