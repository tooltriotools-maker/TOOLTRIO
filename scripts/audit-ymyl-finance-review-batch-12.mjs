import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd(), 'TOOLTRIO-main')
const quality = fs.readFileSync(path.join(root, 'lib/content/finance-quality.ts'), 'utf8')
const slugs = [
  '401k-calculator',
  '401k-early-withdrawal-vs-loan-calculator',
  '401k-vs-pension-calculator',
  '401k-vs-roth-ira-calculator',
  '529-to-roth-rollover-calculator',
  '529-vs-roth-ira-education-calculator',
  '529-vs-utma-calculator',
  '72t-sepp-calculator',
  'alimony-calculator',
  'alimony-tax-calculator',
]

const failures = []
for (const slug of slugs) {
  const route = path.join(root, 'app/calculators/finance', slug)
  if (!fs.existsSync(route)) failures.push(`${slug}: missing route`)
  const re = new RegExp(`slug: ['"]${slug}['"][\\s\\S]{0,180}?status: ['"](\\w+)['"]`)
  const m = quality.match(re)
  if (!m || m[1] !== 'reviewed') failures.push(`${slug}: registry status is not reviewed`)
}

const early = fs.readFileSync(path.join(root, 'app/calculators/finance/401k-early-withdrawal-vs-loan-calculator/CalculatorClient.tsx'), 'utf8')
for (const term of ['Amount Needed', 'Federal Income-Tax Assumption', 'Early-Distribution Penalty Assumption', '401(k) Loan Rate']) {
  if (!early.includes(term)) failures.push(`401k-early-withdrawal-vs-loan-calculator: missing explicit input ${term}`)
}

const finance = fs.readFileSync(path.join(root, 'lib/calculations/finance.ts'), 'utf8')
if (!finance.includes('export function calculate72TSEPP')) failures.push('72t: calculation function missing')
if (!finance.includes('safeLifetimeLimit')) failures.push('529 rollover: lifetime cap guard missing')
if (!finance.includes('marriageDurationYears = Math.max')) failures.push('alimony support: input guard missing')

if (failures.length) {
  console.error('Batch 12 audit FAILED')
  failures.forEach(f => console.error(`- ${f}`))
  process.exit(1)
}
console.log('Batch 12 YMYL review audit PASSED: 10/10 routes reviewed and validated.')
