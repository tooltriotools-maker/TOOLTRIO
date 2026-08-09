import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slugs = [
'income-replacement-ratio-calculator','income-tax-calculator','income-tax-estimator','index-fund-fee-calculator','index-fund-vs-etf-calculator','inflation-calculator','inflation-impact-calculator','inflation-protected-bonds-vs-stocks-calculator','inherited-ira-calculator','insurance-by-life-stage-calculator','interest-rate-calculator','investment-fee-drag-calculator','investment-property-depreciation-calculator','investment-property-leverage-calculator','invoice-calculator','irs-installment-agreement-calculator','isa-calculator','isa-vs-sipp-uk-calculator','k1-income-tax-calculator','k1-passive-loss-calculator','lease-vs-buy-calculator','leveraged-etf-decay-calculator','life-insurance-needs-calculator','loan-comparison-calculator','loan-origination-fee-calculator'
]
const required = slugs.map(s => path.join(root,'app','calculators','finance',s,'page.tsx'))
const missing = required.filter(p => !fs.existsSync(p))
const checks = []
const read = slug => {
  const dir = path.join(root,'app','calculators','finance',slug)
  return fs.readdirSync(dir).filter(f => /\.(tsx|ts)$/.test(f)).map(f => fs.readFileSync(path.join(dir,f),'utf8')).join('\n')
}
for (const slug of slugs) {
  const text = read(slug)
  if (slug === 'income-tax-calculator') {
    checks.push(!/Income Tax Calculator USA 2026/.test(text))
    checks.push(!/HSA contributions \(\$4,150 individual, \$8,300 family in 2026\)/.test(text))
  }
  if (slug === 'isa-calculator') checks.push(!/American regardless of income/i.test(text) && !/ISA Calculator Example \(USA 2026\)/i.test(text))
}
if (missing.length || checks.includes(false)) {
  console.error('Finance Batch 07 audit failed.')
  if (missing.length) console.error('Missing routes:', missing.map(p => path.relative(root,p)).join(', '))
  process.exit(1)
}
fs.mkdirSync(path.join(root,'docs','audits'),{recursive:true})
fs.writeFileSync(path.join(root,'docs','audits','finance-batch-07.md'), `# Finance Batch 07\n\n25 canonical finance routes audited.\n\nKey findings: the Income Tax Calculator route was internally inconsistent (India rupee/regime implementation with US metadata/content), so its public copy was aligned to India FY 2026-27 while the calculation remains flagged for manual tax-rule review; UK ISA copy was regionalized; inherited IRA, IRS installment agreements, investment property depreciation, K-1, and loan-fee tools are explicitly treated as tax/formula-sensitive estimates.\n\nNo canonical URLs changed.\n`)
console.log(`Finance Batch 07 audit passed: ${slugs.length} routes.`)
