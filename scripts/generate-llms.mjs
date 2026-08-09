import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalog = fs.readFileSync(path.join(root, 'lib/catalog/tools.ts'), 'utf8')
const tools = [...catalog.matchAll(/\{ name: '((?:\\'|[^'])*)', href: '([^']+)', cat: '([^']+)'/g)]
  .map(m => ({ name: m[1].replaceAll("\\'", "'"), href: m[2], cat: m[3] }))

const active = tools.filter(t => ![
  '/calculators/health/pregnancy-due-date-calculator',
  '/calculators/fun/insult-generator',
].includes(t.href))
const count = category => active.filter(t => t.cat === category).length
const base = 'https://tooltrio.com'

const top = active
const lines = [
  '# tooltrio.com — Free Online Tools & Calculators',
  `# ${base}`,
  '# Generated from the ToolTrio Master Tool Registry',
  '',
  '## About',
  `${active.length}+ active tools: ${count('finance')} Finance, ${count('health')} Health, ${count('dev')} Developer, ${count('fun')} Fun, ${count('zip')} ZIP and ${count('commodities')} Commodity tools.`,
  'Free to use. No signup required.',
  '',
  '## Categories',
  `- Finance: ${base}/calculators/finance`,
  `- Health: ${base}/calculators/health`,
  `- Developer: ${base}/calculators/dev`,
  `- Fun: ${base}/calculators/fun`,
  `- ZIP: ${base}/zip`,
  `- Commodities: ${base}/commodities`,
  '',
  '## Tools',
  ...top.map(t => `- ${t.name}: ${base}${t.href}`),
  '',
  '## Key Pages',
  `- Home: ${base}`,
  `- Blog: ${base}/blog`,
  `- Methodology: ${base}/methodology`,
  `- About: ${base}/about`,
  `- Disclaimer: ${base}/disclaimer`,
  `- Privacy Policy: ${base}/privacy-policy`,
  '',
  '## Content Policy',
  'Calculator formulas, sources, review status and regional assumptions are maintained per tool. Review dates are only published when explicitly evidenced; the system never invents a current review date. The Master Tool Registry is the canonical list of active tools used by sitemap, search, TrioBot, counts and this file.',
  '',
]
fs.writeFileSync(path.join(root, 'public/llms.txt'), lines.join('\n'))
console.log(`llms.txt generated from ${active.length} active tools.`)
