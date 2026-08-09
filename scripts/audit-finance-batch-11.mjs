import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const slugs = [
'relocation-mortgage-calculator','rent-increase-calculator','rent-vs-buy-calculator','rental-property-depreciation-calculator','rental-property-investment-calculator','rental-property-tax-strategy-calculator','rental-yield-calculator','renters-insurance-calculator','required-minimum-distribution-calculator','retirement-bucket-strategy-calculator','retirement-calculator','retirement-healthcare-bridge-calculator','retirement-healthcare-cost-calculator','retirement-withdrawal-calculator','reverse-mortgage-calculator','roi-calculator','roth-conversion-calculator','roth-conversion-ladder-calculator','roth-conversion-tax-calculator','roth-ira-calculator','roth-ira-vs-401k-employer-match-calculator','roth-ira-vs-hsa-calculator','roth-ira-vs-traditional-ira-calculator','roth-vs-traditional-401k-calculator'
]
const missing = slugs.filter(s => !existsSync(join(root,'app','calculators','finance',s,'page.tsx')))
if (missing.length) { console.error(`Missing Finance Batch 11 routes: ${missing.join(', ')}`); process.exit(1) }
const roth = readFileSync(join(root,'app','calculators','finance','roth-ira-calculator','page.tsx'),'utf8')
for (const stale of ['$7,000 for individuals under 50', '$8,000 for those 50 and older', '$150,000-$165,000', '$236,000-$246,000']) {
  if (roth.includes(stale)) { console.error(`Stale Roth IRA 2026 value remains: ${stale}`); process.exit(1) }
}
console.log(`Finance Batch 11 audit passed: ${slugs.length} routes.`)
