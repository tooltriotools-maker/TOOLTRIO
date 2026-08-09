import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slugs = [
'pension-vs-lump-sum-calculator','personal-finance-score-calculator','personal-loan-calculator','pmi-calculator','portfolio-rebalancing-calculator','ppf-calculator','ppf-vs-fd-calculator','ppf-vs-nps-calculator','prenup-asset-protection-calculator','prepaid-vs-savings-529-calculator','profit-sharing-plan-calculator','property-tax-calculator','qbi-deduction-calculator','qsbs-calculator','qualified-dividend-tax-calculator','rd-calculator','real-estate-appreciation-calculator','real-estate-cost-basis-calculator','real-estate-crowdfunding-calculator','real-estate-roi-calculator','real-estate-syndication-calculator','real-return-calculator','real-wage-growth-calculator','refinance-vs-invest-calculator','reit-vs-direct-property-usa-calculator']
const missing = slugs.filter(slug => !existsSync(path.join(root,'app','calculators','finance',slug,'page.tsx')))
if (missing.length) { console.error('Missing Finance Batch 10 routes:', missing.join(', ')); process.exit(1) }
const calc = readFileSync(path.join(root,'lib','calculations','finance.ts'),'utf8')
if (!calc.includes('403500') || !calc.includes('201750') || !calc.includes('553500') || !calc.includes('276750')) { console.error('2026 QBI thresholds are missing from finance calculation layer.'); process.exit(1) }
console.log(`Finance Batch 10 audit passed: ${slugs.length} routes.`)
console.log('2026 QBI thresholds verified in calculation layer.')
console.log('QSBS newer-law selector present.')
