import fs from 'fs'
import path from 'path'

const root = process.cwd()
const batch = [
  'student-loan-refinance-calculator','estate-probate-calculator','income-tax-calculator',
  'netherlands-aow-vs-private-pension-calculator','prenup-asset-protection-calculator',
  'scholarship-financial-aid-calculator','social-security-wep-calculator',
  'spain-pension-vs-etf-calculator','state-estate-tax-calculator','student-loan-calculator'
]
const checks = []
const contentFiles = [
  'lib/content/finance-batch-04.ts','lib/content/finance-batch-07.ts','lib/content/finance-batch-09.ts',
  'lib/content/finance-batch-10.ts','lib/content/finance-batch-13.ts','lib/content/finance-batch-14.ts','lib/content/finance-batch-15.ts'
]
const content = contentFiles.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n')
for(const slug of batch){
  const status = new RegExp(`slug\\s*[:=]\\s*['"]${slug}['"][\\s\\S]{0,120}?status\\s*[:=]\\s*['"]([^'"]+)['"]`).exec(content)?.[1]
  const page = fs.readFileSync(path.join(root,'app/calculators/finance',slug,'CalculatorClient.tsx'),'utf8')
  const hasMethodology = /SEOContent|How to use|About This Calculator|methodology/i.test(page)
  const hasLimitations = /not a|does not|limitations|assumption|scenario/i.test(page)
  checks.push({slug,status,hasMethodology,hasLimitations})
}
const calc = fs.readFileSync(path.join(root,'lib/calculations/finance.ts'),'utf8')
const requiredFns=['calculateStudentLoanRefinance','calculateEstateProbate','calculateIncomeTax','calculatePrenupAssetProtection','calculateScholarship','calculateSocialSecurityWEP','calculateEstateTaxByState','calculateStudentLoan']
for(const fn of requiredFns) checks.push({function:fn,present:new RegExp(`export function ${fn}\\b`).test(calc)})

const failed = checks.filter(x=>x.status && x.status!=='reviewed' || x.hasMethodology===false || x.hasLimitations===false || x.present===false)
console.log(`Batch 03 review audit: ${batch.length} routes`)
console.log(`Profiles/pages: ${batch.filter(s=>checks.find(x=>x.slug===s)?.status==='reviewed').length}/${batch.length}`)
console.log(`Required calculation exports: ${requiredFns.filter(fn=>checks.find(x=>x.function===fn)?.present).length}/${requiredFns.length}`)
if(failed.length){ console.error(JSON.stringify(failed,null,2)); process.exit(1) }
console.log('Batch 03 review audit PASSED.')
