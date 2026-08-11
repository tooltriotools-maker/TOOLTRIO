import fs from 'fs'
import path from 'path'
const root=process.cwd()
const batch=['wage-garnishment-calculator','gold-vs-stocks-calculator','government-bond-calculator','gratuity-calculator','gst-calculator','hdhp-vs-traditional-insurance-calculator','health-insurance-deductible-calculator','health-insurance-subsidy-calculator','heloc-calculator','heloc-credit-line-calculator']
const files=fs.readdirSync(path.join(root,'lib/content')).filter(f=>f.startsWith('finance-')&&f.endsWith('.ts'))
const content=files.map(f=>fs.readFileSync(path.join(root,'lib/content',f),'utf8')).join('\n')
const checks=[]
for(const slug of batch){
 const m=new RegExp(`slug\\s*[:=]\\s*['"]${slug}['"][\\s\\S]{0,500}?status\\s*[:=]\\s*['"]([^'"]+)['"]`).exec(content)
 const page=fs.readFileSync(path.join(root,'app/calculators/finance',slug,'CalculatorClient.tsx'),'utf8')
 checks.push({slug,status:m?.[1],methodology:/SEOContent|How to use|About This Calculator|methodology/i.test(page),limitations:/not a|does not|limitations|assumption|scenario/i.test(page)})
}
const calc=fs.readFileSync(path.join(root,'lib/calculations/finance.ts'),'utf8')
const required=['calculateWageGarnishment','calculateGoldVsStocks','calculateGovernmentBond','calculateGratuity','calculateGST','calculateHealthSavingsAccountHDHP','calculateHELOC','calculateHELOCCreditLine','calculateHealthInsuranceSubsidy']
for(const fn of required) checks.push({function:fn,present:new RegExp(`export function ${fn}\\b`).test(calc)})
const failed=checks.filter(x=>x.slug ? x.status!=='reviewed'||!x.methodology||!x.limitations : !x.present)
console.log(`Batch 04 review audit: ${batch.length} routes`)
console.log(`Profiles reviewed: ${batch.filter(s=>checks.find(x=>x.slug===s)?.status==='reviewed').length}/${batch.length}`)
console.log(`Required calculation exports: ${required.filter(fn=>checks.find(x=>x.function===fn)?.present).length}/${required.length}`)
if(failed.length){console.error(JSON.stringify(failed,null,2));process.exit(1)}
console.log('Batch 04 review audit PASSED.')
