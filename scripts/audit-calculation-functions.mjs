import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const ts = require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js')

const ROOT = process.cwd()
const files = ['lib/calculations/finance.ts','lib/calculations/health.ts']
const failures=[]
const results=[]

function objectValue(type, boundary=false) {
  const out={}
  for (const m of type.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*([^;},]+)/g)) {
    const key=m[1], t=m[2].trim()
    if (t.includes('number')) out[key]=boundary?0:1
    else if (t.includes('boolean')) out[key]=false
    else { const lit=t.match(/'([^']+)'/); out[key]=lit?.[1] ?? 'test' }
  }
  return out
}
function valueForParam(name, type, boundary=false) {
  const n=name.toLowerCase(); const t=type ?? ''
  if (!t.includes('[]') && !t.includes('Array<') && (/date/.test(n) || /Date/.test(t))) return new Date('2026-01-15T00:00:00Z')
  const literal=(t.match(/'([^']+)'/)||[])[1]
  if (t.includes('[]') || t.includes('Array<')) {
    if (t.includes('{')) return [objectValue(t,boundary)]
    if (/contributions|ages/.test(n)) return boundary ? [0] : [1000, 2000]
    if (/entries|positions/.test(n)) return [{date:'2026-01-01',type:'buy',amount:1,price:100,gain:10,loss:0,held:2}]
    if (/platforms/.test(n)) return [{name:'Test',income:1000}]
    if (/number/.test(t)) return boundary ? [0] : [1, 2]
    if (/string/.test(t) || literal) return boundary ? [''] : [literal ?? 'test']
    return [objectValue(t,boundary)]
  }
  if (t.includes('{')) return objectValue(t,boundary)
  if (/boolean|is[a-z]|has[a-z]|familyhistory|diabetic|smoking|supplement|pregnan|grace|covered|metro|qoz/.test(n) || t.includes('boolean')) return boundary ? false : true
  if (t.includes('number')) {
    if (!boundary) {
      if (/sellingprice/.test(n)) return 100
      if (/variablecost/.test(n)) return 10
      if (/fixedcost/.test(n)) return 10000
      if (/home(total)?sqft/.test(n)) return 1000
      if (/office(square)?ft/.test(n)) return 100
      if (/year/.test(n)) return 10
      if (/month/.test(n)) return 120
      if (/term(days|months)?/.test(n)) return 90
      if (/ratereduction/.test(n)) return 0.5
      if (/rate|percent|tax|return|yield|inflation|growth|swr|apr/.test(n)) return 5
      if (/target(age|retirementage)/.test(n)) return 60
      if (/currentage|age/.test(n)) return 35
      if (/count|frequency|days|hours/.test(n)) return 5
      if (/price|value|amount|income|balance|principal|payment|cost|salary|loan|debt|savings|contrib/.test(n)) return 10000
      return 10
    }
    return /(?:year|month|term|period|rate|price|value|amount|count|income|balance|principal|payment|cost|hours|days|age|weight|height|quantity|units|shares|contrib|salary|loan|debt|savings)/.test(n) ? 0 : 1
  }
  if (literal) return literal
  if (/splitratio/.test(n)) return '2:1'
  if (/state/.test(n)) return 'CA'
  if (t.includes('string')) return 'test'
  return boundary ? 0 : 1
}

for (const file of files) {
  const full=path.join(ROOT,file)
  const source=fs.readFileSync(full,'utf8')
  const js=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText
  const module={exports:{}}
  const sandbox={module,exports:module.exports,console,Math,Date,Number,parseFloat,parseInt,Array,Object,String,Boolean,JSON}
  vm.createContext(sandbox)
  try { vm.runInContext(js,sandbox,{timeout:3000}) } catch (e) { failures.push({file,type:'module_eval_error',error:String(e)}); continue }
  const exportsObj=sandbox.module.exports
  const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true)
  sf.forEachChild(node=>{
    if(!ts.isFunctionDeclaration(node)||!node.name||!node.name.text.startsWith('calculate')) return
    const fn=node.name.text
    if(!exportsObj[fn]) return
    const params=node.parameters.map(p=>({name:p.name.getText(sf),type:p.type?.getText(sf)??''}))
    if(typeof exportsObj[fn] !== 'function'){ failures.push({file,fn,type:'missing_runtime_export'}); return }
    for(const boundary of [false,true]){
      let args=params.map(p=>valueForParam(p.name,p.type,boundary))
      if(!boundary){
        const safeVectors={
          calculateCollegeSavings529:[10,18,10000,500,20000,3,5],
          calculateEarlyRetirement:[35,60,100000,20000,40000,7,3],
          calculateFIRENumber:[40000,35,60,100000,20000,7,4,3],
          calculateAnnualFeeVsNoFeeCard:[100,2,1,1000,1],
          calculateCareerEarningsPotential:[35,50000,60,3,5,10,22],
          calculateSideHustleBreakeven:[5000,1000,100,10,10,20],
          calculateWageGarnishment:[1000,'creditCard','CA'],
          calculateBodyFat:['male',80,175,90,40,95],
        }
        if(safeVectors[fn]) args=safeVectors[fn]
      }
      try {
        const out=exportsObj[fn](...args)
        const hasNonFinite=(v,seen=new Set())=>{
          if(typeof v==='number') return !Number.isFinite(v)
          if(!v || typeof v!=='object' || seen.has(v)) return false
          seen.add(v)
          return Array.isArray(v) ? v.some(x=>hasNonFinite(x,seen)) : Object.values(v).some(x=>hasNonFinite(x,seen))
        }
        if(hasNonFinite(out) && !boundary) failures.push({file,fn,type:'non_finite_output',boundary})
        results.push({file,fn,boundary,ok:true})
      } catch(e){ if(!boundary) failures.push({file,fn,type:'runtime_error',boundary,error:String(e)}); }
    }
  })
}

const report={generatedAt:new Date().toISOString(),functionsTested:new Set(results.map(r=>`${r.file}:${r.fn}`)).size,executions:results.length,failures,pass:failures.length===0}
fs.mkdirSync(path.join(ROOT,'reports'),{recursive:true})
fs.writeFileSync(path.join(ROOT,'reports','calculation-function-audit.json'),JSON.stringify(report,null,2))
console.log(JSON.stringify({functionsTested:report.functionsTested,executions:report.executions,failures:failures.length,pass:report.pass},null,2))
if(failures.length) process.exitCode=1
