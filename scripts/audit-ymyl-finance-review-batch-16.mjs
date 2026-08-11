import fs from 'fs'
import path from 'path'
const root=process.cwd()
const targets=['401k-vs-taxable-account-calculator','annuity-certain-vs-lifetime-calculator','annuity-income-calculator','annuity-vs-lumpsum-calculator','background-check-roi-calculator','barista-fire-calculator','bond-ladder-calculator','bridge-loan-calculator','budget-calculator','budget-planner-calculator']
const content=fs.readdirSync(path.join(root,'lib/content')).filter(f=>/^finance-.*\.ts$/.test(f)).map(f=>fs.readFileSync(path.join(root,'lib/content',f),'utf8')).join('\n')
const pages=targets.map(slug=>{const page=path.join(root,'app/calculators/finance',slug); const files=fs.existsSync(page)?fs.readdirSync(page).filter(f=>f.endsWith('.tsx')):[]; const occurrences=[...content.matchAll(new RegExp(`slug\\s*[:=]\\s*['"]${slug}['"]\\s*,\\s*status\\s*[:=]\\s*['"]([^'"]+)['"]`,'g'))].map(m=>m[1]); return {slug,statuses:[...new Set(occurrences)],page:files.length>0}})
const failures=pages.filter(x=>!x.page||!x.statuses.includes('reviewed'))
console.log(JSON.stringify({batch:16,targets:pages.length,reviewed:pages.filter(x=>x.statuses.includes('reviewed')).length,failures,pass:failures.length===0},null,2))
process.exit(failures.length?1:0)
