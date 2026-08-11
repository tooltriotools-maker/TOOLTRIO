import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slugs = [
  'alternative-minimum-tax-calculator','annual-bonus-tax-calculator','backdoor-roth-ira-calculator',
  'bonds-vs-cds-usa-calculator','bonus-depreciation-calculator','epf-vs-nps-calculator',
  'income-tax-estimator','inherited-ira-calculator','investment-property-depreciation-calculator',
  'irs-installment-agreement-calculator'
]
const files = []
for (const slug of slugs) {
  const file = path.join(root, 'app', 'calculators', 'finance', slug, 'CalculatorClient.tsx')
  if (!fs.existsSync(file)) throw new Error(`Missing page: ${slug}`)
  files.push(file)
}
const registryFiles = [
  'lib/content/finance-quality.ts','lib/content/finance-batch-04.ts','lib/content/finance-batch-07.ts'
]
const statuses = new Map()
for (const file of registryFiles) {
  const text = fs.readFileSync(path.join(root, file), 'utf8')
  for (const slug of slugs) {
    const re = new RegExp(`slug\\s*:\\s*['"]${slug}['"]\\s*,\\s*status\\s*:\\s*['"]([^'"]+)['"]`)
    const m = text.match(re)
    if (m && !statuses.has(slug)) statuses.set(slug, m[1])
  }
}
const failures = slugs.filter(s => statuses.get(s) !== 'reviewed')
if (failures.length) throw new Error(`Not reviewed: ${failures.join(', ')}`)
console.log(`Batch 15 YMYL review audit: ${slugs.length}/10 routes present; ${slugs.length}/10 reviewed; PASS.`)
