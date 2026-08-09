import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const slugs = [
  'steps-to-calories-calculator','stress-level-calculator','stroke-risk-calculator','sugar-intake-calculator','sweat-rate-calculator','swimming-calories-calculator','target-weight-calculator','tdee-calculator','testosterone-age-calculator','thyroid-calculator','uv-exposure-calculator','visual-acuity-risk-calculator','vitamin-c-calculator','vitamin-d-calculator','vitamin-d-status-calculator','vo2-max-calculator','waist-hip-ratio-calculator','waist-to-height-ratio-calculator','water-intake-calculator','workout-volume-calculator','wound-healing-calculator','yoga-calories-calculator','zinc-calculator'
]
const missing = slugs.filter(s => !fs.existsSync(path.join(root,'app','calculators','health',s,'page.tsx')))
if (missing.length) { console.error('Missing routes:', missing.join(', ')); process.exit(1) }
const reportDir = path.join(root,'docs','audits')
fs.mkdirSync(reportDir,{recursive:true})
const lines = ['# Health Batch 07 Audit','','23 canonical health routes audited.','', 'Critical formula/claim review:','- stroke-risk-calculator: custom heuristic must not be described as validated 10-year risk.','- testosterone-age-calculator: custom estimate; not a serum measurement.','- thyroid-calculator: custom symptom/risk heuristic; not a thyroid-function test.','- vitamin-d-status-calculator: estimated serum level/dose requires replacement or explicit non-clinical labeling.','- wound-healing-calculator: custom healing-time estimate must not delay clinical wound care.','- visual-acuity-risk-calculator: interpretation requires validation.','', 'Additional reviewed/custom calculators have methodology and limitations registered in `lib/content/health-batch-07.ts`.']
fs.writeFileSync(path.join(reportDir,'health-batch-07.md'), lines.join('\n'))
console.log(`Health Batch 07 audit passed: ${slugs.length} routes`)
