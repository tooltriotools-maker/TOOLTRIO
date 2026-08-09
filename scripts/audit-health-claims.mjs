import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const healthDir = path.join(root, 'app', 'calculators', 'health')

const files = [...fs.globSync('app/calculators/health/**/page.tsx', { cwd: root })]
  .map(p => path.join(root, p))

const forbiddenGenericScience = /The formulas underlying this calculator are derived from peer-reviewed research published in major medical and scientific journals\. Reference ranges are drawn from NHANES population survey data/i
const genericUseCase = /Annual health monitoring|Doctor appointment preparation|Wellness program participation|Health education and research/i
const genericTips = /Take measurements consistently under the same conditions for meaningful trend comparisons/i
const wrongIronBlock = /An adult woman aged 19–50 needs <strong>18 mg of iron\/day<\/strong> \(NIH 2026 DRI\)/i
const redirectUrl = '/calculators/health/pregnancy-due-date-calculator'

const violations = []
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  if (forbiddenGenericScience.test(text)) violations.push(`${path.relative(root,file)} :: generic science/NHANES block`)
  if (genericUseCase.test(text)) violations.push(`${path.relative(root,file)} :: generic health use-case block`)
  if (genericTips.test(text)) violations.push(`${path.relative(root,file)} :: generic measurement tips block`)
  if (wrongIronBlock.test(text) && !file.includes('iron-intake-calculator')) violations.push(`${path.relative(root,file)} :: unrelated iron boilerplate`)
  if (!file.includes('pregnancy-due-date-calculator') && text.includes(redirectUrl)) violations.push(`${path.relative(root,file)} :: links to redirect-only pregnancy URL`)
}

if (violations.length) {
  console.error(`Health claim/content audit failed: ${violations.length} violation(s)`)
  console.error(violations.slice(0,100).join('\n'))
  process.exit(1)
}

console.log(`Health claim/content audit passed: ${files.length} health page files checked.`)
