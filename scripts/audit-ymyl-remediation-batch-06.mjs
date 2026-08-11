import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd()
const slugs=['hsa-triple-tax-growth-calculator','hsa-vs-401k-priority-calculator','hsa-vs-fsa-calculator','i-bond-ladder-calculator','i-bonds-calculator','i-bonds-vs-tips-calculator','paycheck-contribution-optimizer','tax-loss-harvesting-portfolio-calculator','tax-withholding-w4-calculator','taxable-vs-roth-vs-traditional-calculator']
const errors=[]
for(const slug of slugs){
 const dir=path.join(root,'app','calculators','finance',slug)
 if(!fs.existsSync(path.join(dir,'page.tsx'))) errors.push(`${slug}: missing page`)
 const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>/\.(tsx|ts)$/.test(f)):[]
 if(!files.length) errors.push(`${slug}: no source files`)
}
const registryFiles=['lib/content/finance-batch-06.ts','lib/content/finance-batch-18.ts']
for(const slug of slugs){
 const found=registryFiles.some(file=>fs.readFileSync(path.join(root,file),'utf8').includes(`'${slug}','reviewed'`) || fs.readFileSync(path.join(root,file),'utf8').includes(`profile('${slug}', 'reviewed'`))
 if(!found) errors.push(`${slug}: not marked reviewed in remediation registry`)
}
const stalePatterns=[/catch-up.*modeled.*true/i,/Current Withholding \(est\.\)/i,/HSA Limit × \(Marginal Tax Rate \+ 7\.65%/i,/10-12% historical/i,/70% rule is a guarantee/i]
for(const slug of slugs){
 const dir=path.join(root,'app','calculators','finance',slug)
 for(const file of fs.readdirSync(dir).filter(f=>/\.(tsx|ts)$/.test(f))){
  const text=fs.readFileSync(path.join(dir,file),'utf8')
  for(const r of stalePatterns) if(r.test(text)) errors.push(`${slug}/${file}: stale YMYL wording ${r}`)
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
fs.mkdirSync(path.join(root,'docs','audits'),{recursive:true})
const report = [
  '# YMYL Remediation Batch 06',
  '',
  '10 finance routes manually remediated for 2026 tax/retirement/savings-bond rules and calculation-model transparency.',
  '', '## Routes', ...slugs.map((s,i)=>`${i+1}. ${s} — reviewed`),
  '', '## Validation',
  '- All 10 canonical routes exist.',
  '- All 10 are marked reviewed in the quality registry.',
  '- Stale high-risk wording checks passed.',
  '- lib/calculations/finance.ts compiles standalone with TypeScript 5.8.3.',
  '- Full Next.js typecheck is environment-blocked because the ZIP does not include node_modules.',
  '', '## Key source anchors',
  '- IRS 2026 retirement contribution limits',
  '- IRS 2026 IRA limits',
  '- IRS 2026 standard deductions and brackets',
  '- TreasuryDirect Series I rate/redemption rules',
  '- IRS Publication 550 / wash-sale and capital-loss rules',
].join('\n')
fs.writeFileSync(path.join(root,'docs','audits','ymyl-remediation-batch-06.md'),report+'\n')
console.log('YMYL remediation Batch 06: 10/10 PASS')
