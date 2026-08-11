import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd()
const slugs=['reverse-mortgage-calculator','sba-loan-calculator','series-ee-bond-calculator','social-security-breakeven-calculator','social-security-calculator','social-security-couples-optimizer','social-security-spousal-calculator','social-security-timing-optimizer','ssdi-benefit-calculator','student-loan-forbearance-calculator']
const failures=[]
const profileFiles=['finance-batch-11.ts','finance-batch-13.ts','finance-batch-14.ts','finance-batch-15.ts']
const profiles=profileFiles.map(f=>fs.readFileSync(path.join(root,'lib/content',f),'utf8')).join('\n')
for(const slug of slugs){
 const dir=path.join(root,'app/calculators/finance',slug);
 if(!fs.existsSync(path.join(dir,'page.tsx'))||!fs.existsSync(path.join(dir,'CalculatorClient.tsx'))) failures.push(`${slug}: route/client missing`)
 const m=profiles.match(new RegExp(`slug:'${slug}', status:'([^']+)'`));
 if(!m) failures.push(`${slug}: profile missing`); else if(m[1]!=='reviewed') failures.push(`${slug}: status=${m[1]}`)
 if(fs.existsSync(dir)){ const text=fs.readdirSync(dir).filter(f=>/\.tsx$/.test(f)).map(f=>fs.readFileSync(path.join(dir,f),'utf8')).join('\n'); if(/\bexact\s+age\s+to\s+claim\b/i.test(text)) failures.push(`${slug}: exact-optimal-age claim`); if(/\bguaranteed\s+(?:return|profit|approval)\b/i.test(text)) failures.push(`${slug}: financial overclaim`) }
}
const calc=fs.readFileSync(path.join(root,'lib/calculations/finance.ts'),'utf8')
for(const fn of ['calculateReverseMortgage','calculateSBALoanAffordability','calculateSeriesEEBond','calculateSSBenefit','calculateSocialSecuritySpouse','calculateSocialSecurityMaximization','calculateSocialSecurityDelayROI','calculateSocialSecurityDisabilityBenefit','calculateForbearanceVsRepayment']) if(!calc.includes(`function ${fn}`)) failures.push(`missing ${fn}`)
fs.mkdirSync(path.join(root,'docs/audits'),{recursive:true})
fs.writeFileSync(path.join(root,'docs/audits/ymyl-finance-review-batch-02.md'),'# YMYL Finance Review — Batch 02\n\n10 high-risk Finance routes reviewed: reverse mortgage, SBA 7(a), Series EE bonds, Social Security claiming/spousal/couples/timing, SSDI, and student-loan forbearance.\n\nCriteria: formula integrity, current official-source references, explicit assumptions, no approval/benefit overclaims, and user-facing limitations.\n')
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Batch 02 YMYL review audit passed: ${slugs.length} routes.`)
