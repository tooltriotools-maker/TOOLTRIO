import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const gates = [
  'ckd-progression-calculator','creatinine-clearance-calculator','dietary-inflammatory-index-calculator',
  'infant-weight-percentile-calculator','mental-health-score-calculator','pcos-risk-calculator',
  'stroke-risk-calculator','testosterone-age-calculator','thyroid-calculator','vitamin-d-status-calculator','wound-healing-calculator'
]
const failures=[]
const forbidden = [
  /clinically validated/i,
  /validated psychological assessment/i,
  /validated 10-year (?:stroke )?risk/i,
  /years to dialysis/i,
  /estimated testosterone.*nmol\/l/i,
  /(?:^|[^n])CRP Estimate/i,
  /(?:^not )Disease Risk/i,
  /recommended dose.*vitamin d/i,
  /blood testosterone.*estimated/i,
  /(?<!not a )diagnostic probability/i,
]
const required = [
  /limitations/i,
  /methodology|how it is calculated|how to interpret|reference/i,
  /educational|informational|not a diagnosis|not a validated/i,
]
for (const slug of gates) {
  const page = path.join(root,'app','calculators','health',slug,'page.tsx')
  const client = path.join(root,'app','calculators','health',slug,'CalculatorClient.tsx')
  for (const file of [page,client]) if (!fs.existsSync(file)) failures.push(`${slug}: missing ${path.relative(root,file)}`)
  const text=[page,client].filter(fs.existsSync).map(f=>fs.readFileSync(f,'utf8')).join('\n')
  for (const re of forbidden) if (re.test(text)) failures.push(`${slug}: forbidden YMYL claim/content pattern ${re}`)
  for (const re of required) if (!re.test(text)) failures.push(`${slug}: missing required trust/safety content ${re}`)
  const source=fs.readFileSync(path.join(root,'lib/content/health-sources.ts'),'utf8')
  const start=source.indexOf(`'${slug}': {`)
  const end=source.indexOf("\n  '", start+5)
  const block=source.slice(start, end>0?end:source.length)
  if (!/status: 'reviewed'/.test(block)) failures.push(`${slug}: source profile is not reviewed`)
  if (!/methodology:/.test(block) || !/limitations:/.test(block) || !/sources: \[/.test(block)) failures.push(`${slug}: incomplete source profile`)
}
const report={generatedAt:new Date().toISOString(),routes:gates.length,failures,pass:failures.length===0}
fs.mkdirSync(path.join(root,'reports'),{recursive:true})
fs.writeFileSync(path.join(root,'reports/ymyl-publication-audit.json'),JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))
if(failures.length) process.exit(1)
