import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const registry = path.join(root, 'lib/content/finance-batch-05.ts')
const source = fs.readFileSync(registry, 'utf8')
const slugs = [...source.matchAll(/slug: '([^']+)'/g)].map(m => m[1])
const expected = [
'estate-tax-calculator','euro-auto-loan-calculator','euro-bonds-vs-etf-calculator','europe-etf-vs-property-calculator','europe-growth-vs-value-etf-calculator','europe-msci-world-vs-sp500-calculator','europe-property-vs-reit-calculator','european-mortgage-calculator','family-budget-planner-calculator','fd-calculator','fd-comparison-calculator','federal-contractor-tax-calculator','fha-vs-conventional-calculator','fica-tax-calculator','fire-calculator','fire-europe-calculator','fire-number-calculator','forbearance-cost-calculator','france-pea-vs-assurance-vie-calculator','freelance-income-tax-calculator','freelancer-quarterly-tax-calculator','fsa-calculator','germany-etf-vs-tagesgeld-calculator','gift-tax-calculator','gig-economy-tax-calculator']
const missing = expected.filter(s => !slugs.includes(s))
const extra = slugs.filter(s => !expected.includes(s))
if (missing.length || extra.length || slugs.length !== new Set(slugs).size) {
 console.error({missing, extra, count: slugs.length}); process.exit(1)
}
for (const slug of slugs) {
 const p = path.join(root, 'app/calculators/finance', slug, 'page.tsx')
 if (!fs.existsSync(p)) { console.error(`Missing route: ${slug}`); process.exit(1) }
}
const files = [
 'app/calculators/finance/fica-tax-calculator/page.tsx',
 'app/calculators/finance/freelance-income-tax-calculator/page.tsx',
 'app/calculators/finance/freelancer-quarterly-tax-calculator/page.tsx',
 'app/calculators/finance/gift-tax-calculator/page.tsx'
]
for (const file of files) {
 const s = fs.readFileSync(path.join(root,file),'utf8')
 if (s.includes('up to $176,100') || s.includes('June 16')) { console.error(`Stale 2026 fact in ${file}`); process.exit(1) }
}
console.log(`Finance Batch 05 audit passed: ${slugs.length} routes.`)
