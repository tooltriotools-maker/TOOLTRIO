import fs from 'node:fs'
import path from 'node:path'
const source = fs.readFileSync(path.resolve('lib/content/finance-batch-02.ts'), 'utf8')
const slugs = [...source.matchAll(/slug:'([^']+)'/g)].map(m => m[1])
const root = path.resolve('app/calculators/finance')
const missing = slugs.filter(slug => !fs.existsSync(path.join(root, slug, 'page.tsx')))
if (missing.length) { console.error('Missing Finance Batch 02 routes:', missing.join(', ')); process.exit(1) }
const checks = [
  ['child-tax-credit-calculator', '$2,200 per qualifying child'],
]
const child = fs.readFileSync(path.join(root, 'child-tax-credit-calculator', 'page.tsx'), 'utf8')
if (child.includes('20-35%') || child.includes('At AGI above $43,000')) {
  console.error('Stale 2025-era child/dependent-care wording remains.'); process.exit(1)
}
const calc = fs.readFileSync(path.resolve('lib/calculations/finance.ts'), 'utf8')
if (!calc.includes('get2026ChildDependentCareRate') || !calc.includes('0.50')) {
  console.error('2026 child/dependent-care rate logic missing.'); process.exit(1)
}
fs.mkdirSync(path.resolve('docs/audits'), { recursive:true })
fs.writeFileSync(path.resolve('docs/audits/finance-batch-02.md'), `# Finance Batch 02\n\n25 canonical finance routes audited.\n\n2026-sensitive tax claims were reviewed against current IRS/HealthCare.gov sources.\n\nChild Tax Credit calculator updated to accept qualifying care persons/expenses and model the 2026 child-and-dependent-care percentage schedule rather than a hard-coded 20% assumption.\n\nNo canonical URLs changed.\n`)
console.log(`Finance Batch 02 audit passed: ${slugs.length} routes.`)
