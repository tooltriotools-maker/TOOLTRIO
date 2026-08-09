import fs from 'node:fs'
import path from 'node:path'

const routes = [
  'exercise-addiction-calculator','eye-health-calculator','fasting-window-calculator','fat-loss-rate-calculator','fiber-intake-calculator','flexibility-calculator','food-sensitivity-calculator','frailty-index-calculator','genetic-height-calculator','gfr-egfr-calculator','glycemic-load-calculator','gratitude-health-calculator','grip-strength-age-calculator','grip-strength-calculator','gut-health-calculator','hangover-recovery-calculator','hearing-age-calculator','heart-age-calculator','heart-attack-risk-calculator','heart-rate-calculator','heart-rate-variability-calculator','hiit-calculator','hydration-calculator','hydration-exercise-calculator','ideal-weight-calculator'
]
const root = process.cwd()
const audit = fs.readFileSync(path.join(root,'lib/content/health-batch-03.ts'),'utf8')
const failures=[]
for (const slug of routes) {
  if (!audit.includes(`'${slug}':`)) failures.push(`${slug}: missing audit profile`)
  const page = fs.readFileSync(path.join(root,'app/calculators/health',slug,'page.tsx'),'utf8')
  const client = fs.readFileSync(path.join(root,'app/calculators/health',slug,'CalculatorClient.tsx'),'utf8')
  if (slug==='gfr-egfr-calculator' && (client.includes('raceBlack') || client.includes('Black race') || client.includes('race coefficient'))) failures.push(`${slug}: obsolete race coefficient/toggle remains`)
  if (slug==='food-sensitivity-calculator' && client.includes('IgG food sensitivity panel')) failures.push(`${slug}: unsupported IgG recommendation remains`)
  if (slug==='exercise-addiction-calculator' && (page.includes('validated EAI') || client.includes('validated EAI'))) failures.push(`${slug}: unsupported validated EAI claim remains`)
  if (slug==='ideal-weight-calculator' && page.includes('5 different medical formulas')) failures.push(`${slug}: formula-count copy does not match implementation`)
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1) }
console.log(`Health Batch 03 audit passed: ${routes.length} routes, source/claim profiles present, critical stale claims checked.`)
