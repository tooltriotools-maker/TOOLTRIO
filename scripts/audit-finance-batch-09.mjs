import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slugs = [
  'mutual-fund-vs-fd-calculator','nanny-tax-calculator','net-investment-income-tax-calculator','net-operating-loss-calculator','net-salary-calculator','net-unrealized-appreciation-calculator','net-worth-calculator','net-worth-tracker','netherlands-aow-vs-private-pension-calculator','nps-calculator','nsc-vs-fd-calculator','nsc-vs-ppf-calculator','offset-mortgage-vs-savings-uk-calculator','opportunity-zone-calculator','options-greeks-calculator','options-pricing-calculator','passive-income-portfolio-calculator','pay-off-mortgage-vs-invest-calculator','paycheck-calculator','payoff-date-calculator','payroll-tax-calculator','pe-ratio-calculator','peer-to-peer-lending-calculator','pension-vs-lump-sum-calculator'
]
const missing = []
for (const slug of slugs) {
  const candidates = [
    path.join(root,'app','calculators','finance',slug,'page.tsx'),
  ]
  if (slug === 'net-worth-tracker') candidates.push(path.join(root,'app','calculators','finance','net-worth-tracker','page.tsx'))
  if (!candidates.some(fs.existsSync)) missing.push(slug)
}
if (missing.length) throw new Error(`Missing canonical finance routes: ${missing.join(', ')}`)
const calc = fs.readFileSync(path.join(root,'lib','calculations','finance.ts'),'utf8')
if (!calc.includes('184500 / periodsPerYear') || !calc.includes('single: 16100')) throw new Error('2026 paycheck constants are not synchronized')
const nps = fs.readFileSync(path.join(root,'app','calculators','finance','nps-calculator','CalculatorClient.tsx'),'utf8')
if (/NPS Calculator Example \(USA 2026\)|401\(k\) pension/.test(nps)) throw new Error('NPS page still contains US/401(k) contamination')
console.log(`Finance Batch 09 audit passed: ${slugs.length} routes.`)
