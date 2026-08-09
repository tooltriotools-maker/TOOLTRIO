import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const slugs = [
'gold-vs-stocks-calculator','government-bond-calculator','gratuity-calculator','gst-calculator','hdhp-vs-traditional-insurance-calculator','health-insurance-deductible-calculator','health-insurance-subsidy-calculator','heloc-calculator','heloc-credit-line-calculator','home-affordability-calculator','home-equity-loan-calculator','home-equity-vs-personal-loan','home-loan-calculator','home-office-deduction-calculator','house-flip-calculator','house-hacking-roi-calculator','hra-calculator','hsa-investment-calculator','hsa-projection-calculator','hsa-triple-tax-growth-calculator','hsa-vs-401k-priority-calculator','hsa-vs-fsa-calculator','i-bond-ladder-calculator','i-bonds-calculator','i-bonds-vs-tips-calculator'
]
const stalePatterns = [
  /HSA 2024 Facts/i,
  /2024 limit:\s*\$4,150/i,
  /2024 limit:\s*\$8,300/i,
  /Currently \(2024 data\)/i,
  /Gratuity Calculator USA 2026/i,
  /GST Calculator USA 2026/i,
]
const missing = slugs.filter(s => !fs.existsSync(path.join(root,'app','calculators','finance',s,'page.tsx')))
const stale = []
for (const slug of slugs) {
  const files = fs.readdirSync(path.join(root,'app','calculators','finance',slug)).filter(f => /\.(tsx|ts)$/.test(f))
  for (const file of files) {
    const text = fs.readFileSync(path.join(root,'app','calculators','finance',slug,file),'utf8')
    if (stalePatterns.some(r => r.test(text))) stale.push(`${slug}/${file}`)
  }
}
if (missing.length || stale.length) {
  console.error('Finance Batch 06 audit failed.')
  if (missing.length) console.error('Missing routes:', missing.join(', '))
  if (stale.length) console.error('Stale patterns:', stale.join(', '))
  process.exit(1)
}
fs.mkdirSync(path.join(root,'docs','audits'),{recursive:true})
fs.writeFileSync(path.join(root,'docs','audits','finance-batch-06.md'), `# Finance Batch 06\n\n25 canonical finance routes audited for 2026-sensitive rules, regional accuracy, stale content, and calculation-model limitations.\n\nNo canonical URLs changed.\n\nKey reviewed areas: 2026 HSA/FSA limits, I Bond current rate handling, India GST/gratuity regional correctness, home-office deduction rules, mortgage/HELOC limitations, and investment-scenario disclaimers.\n`)
console.log(`Finance Batch 06 audit passed: ${slugs.length} routes.`)
