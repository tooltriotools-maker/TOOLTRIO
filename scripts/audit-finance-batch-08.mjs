import fs from 'node:fs'
import path from 'node:path'

const slugs = [
'loan-prepayment-calculator','long-term-care-insurance-calculator','lumpsum-calculator','lumpsum-vs-gold-calculator','lumpsum-vs-sip-calculator','margin-trading-calculator','medicare-part-d-calculator','medicare-premium-calculator','medicare-vs-private-insurance-calculator','mega-backdoor-roth-calculator','merit-raise-vs-job-change-calculator','mortgage-affordability-calculator','mortgage-calculator','mortgage-forbearance-impact-calculator','mortgage-points-calculator','mortgage-recast-calculator','mortgage-refinance-breakeven-calculator','mortgage-refinance-calculator','mortgage-vs-rent-calculator','mortgage-vs-renting-usa-calculator','municipal-bond-ladder-calculator','municipal-bond-tax-calculator','municipal-bonds-vs-corporate-bonds-calculator','mutual-fund-calculator','mutual-fund-return-calculator'
]
const root = path.join(process.cwd(), 'app', 'calculators', 'finance')
const missing = slugs.filter(s => !fs.existsSync(path.join(root, s, 'page.tsx')))
if (missing.length) { console.error('Missing routes:', missing.join(', ')); process.exit(1) }
const registry = fs.readFileSync(path.join(process.cwd(), 'lib/content/finance-batch-08.ts'), 'utf8')
const missingProfiles = slugs.filter(s => !registry.includes(`slug:'${s}'`))
if (missingProfiles.length) { console.error('Missing profiles:', missingProfiles.join(', ')); process.exit(1) }
console.log(`Finance Batch 08 audit passed: ${slugs.length} routes.`)
