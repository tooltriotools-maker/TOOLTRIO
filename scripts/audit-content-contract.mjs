import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const calculatorRoots = [
  path.join(root, 'app', 'calculators', 'health'),
  path.join(root, 'app', 'calculators', 'finance'),
  path.join(root, 'app', 'calculators', 'dev'),
  path.join(root, 'app', 'calculators', 'fun'),
]

const patterns = [
  /the average american has only/i,
  /trusted by healthcare professionals/i,
  /validated formulas from major health organizations/i,
  /complete data privacy/i,
  /works perfectly on all devices/i,
  /no signup, no subscription/i,
  /100% free/i,
  /best calculator for/i,
]

const genericHits = []
const suppressedGenericBlocks = []
const missingHealthWiring = []
const shortGuideFields = []
let pages = 0

function walk(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(p))
    else if (entry.name.endsWith('.tsx') && (entry.name === 'page.tsx' || entry.name === 'CalculatorClient.tsx')) out.push(p)
  }
  return out
}

for (const rootDir of calculatorRoots) {
  for (const file of walk(rootDir)) {
    const text = fs.readFileSync(file, 'utf8')
    if (!text.includes('SEOContent')) continue
    pages++
    for (const pattern of patterns) {
      if (pattern.test(text)) suppressedGenericBlocks.push(`${path.relative(root, file)} :: ${pattern.source}`)
    }
    if (file.includes(`${path.sep}health${path.sep}`) && !text.includes('healthSourceProfile:')) {
      const pageFile = path.join(path.dirname(file), 'page.tsx')
      const pageText = fs.existsSync(pageFile) ? fs.readFileSync(pageFile, 'utf8') : ''
      const receivesSeoContent = /seoContent\??\s*[:},]/.test(text) || /seoContent\??\s*[,}]/.test(text)
      if (!pageText.includes('healthSourceProfile:') && !receivesSeoContent) missingHealthWiring.push(path.relative(root, file))
    }
    for (const field of ['intro', 'howItWorks', 'tipsSection', 'conclusion']) {
      const match = text.match(new RegExp(`${field}\\s*:\\s*[\'\\\"]([\\s\\S]*?)[\'\\\"]\\s*,`))
      if (match && match[1].replace(/\\n/g, ' ').trim().length < (field === 'tipsSection' ? 60 : 80)) {
        shortGuideFields.push(`${path.relative(root, file)} :: ${field}`)
      }
    }
  }
}

const reportDir = path.join(root, 'docs', 'audits')
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'calculator-content-contract.md'), `# Calculator Content Contract\n\n- SEOContent pages scanned: **${pages}**\n- Generic marketing blocks suppressed by SEOContent: **${suppressedGenericBlocks.length}**\n- Health pages missing healthSourceProfile: **${missingHealthWiring.length}**\n- Short guide fields detected: **${shortGuideFields.length}**\n\nThis audit is intentionally conservative: it reports potential issues rather than deleting content automatically.\n`)

if (missingHealthWiring.length) {
  console.error(`Content contract audit failed: healthWiring=${missingHealthWiring.length}`)
  if (genericHits.length) console.error(genericHits.slice(0, 30).join('\n'))
  if (missingHealthWiring.length) console.error(missingHealthWiring.slice(0, 30).join('\n'))
  process.exit(1)
}

console.log(`Calculator content contract passed: ${pages} SEOContent files, ${suppressedGenericBlocks.length} generic marketing blocks suppressed at render time, 0 missing health source wiring.`)
