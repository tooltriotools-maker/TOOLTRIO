import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'app', 'calculators', 'health')
const slugs = [
  'immune-health-calculator','immune-strength-calculator','infant-weight-percentile-calculator','inflammation-risk-calculator','injury-recovery-calculator','intermittent-fasting-calculator','iron-intake-calculator','jet-lag-calculator','joint-mobility-calculator','keto-macro-calculator','kidney-function-calculator','lean-body-mass-calculator','liver-health-calculator','loneliness-health-calculator','longevity-calculator','longevity-risk-calculator','lung-capacity-calculator','macro-calculator','magnesium-calculator','marathon-training-calculator','meal-timing-calculator','meditation-benefits-calculator','menopause-symptom-calculator','menstrual-cycle-calculator','menstrual-health-calculator'
]
const required = ['CalculatorClient']
const problems = []
for (const slug of slugs) {
  const page = fs.readFileSync(path.join(root, slug, 'page.tsx'), 'utf8')
  const client = fs.readFileSync(path.join(root, slug, 'CalculatorClient.tsx'), 'utf8')
  for (const token of required) if (!page.includes(token)) problems.push(`${slug}: missing ${token} in page.tsx`)
  if (!client.includes('CalculatorLayout')) problems.push(`${slug}: missing CalculatorLayout`)
}
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log(`Health Batch 04 audit passed: ${slugs.length} routes structurally present.`)
