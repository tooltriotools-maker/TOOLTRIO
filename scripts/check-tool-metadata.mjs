import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalog = fs.readFileSync(path.join(root, 'lib', 'catalog', 'tools.ts'), 'utf8')
const records = [...catalog.matchAll(/\{ name: '((?:\\'|[^'])*)', href: '([^']+)', cat: '([^']+)'/g)]
  .map(m => ({ name: m[1].replaceAll("\\'", "'"), href: m[2], cat: m[3] }))

const redirects = new Set([
  '/calculators/health/pregnancy-due-date-calculator',
  '/calculators/fun/insult-generator',
])
const active = records.filter(tool => !redirects.has(tool.href))

const contentDir = path.join(root, 'lib', 'content')
const qualityFiles = fs.readdirSync(contentDir).filter(name => /^finance(?:-batch|-(?:quality|unreviewed)).*\.ts$/.test(name))
const financeSlugs = new Set()
for (const file of qualityFiles) {
  const source = fs.readFileSync(path.join(contentDir, file), 'utf8')
  for (const match of source.matchAll(/slug:\s*'([^']+)'/g)) financeSlugs.add(match[1])
}

const financeRoutes = active.filter(tool => tool.cat === 'finance')
const financeMissing = financeRoutes.filter(tool => !financeSlugs.has(tool.href.split('/').filter(Boolean).at(-1)))

const pageFiles = []
for (const cat of ['finance', 'health', 'dev', 'fun']) {
  const dir = path.join(root, 'app', 'calculators', cat)
  if (!fs.existsSync(dir)) continue
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    for (const fileName of fs.readdirSync(path.join(dir, entry.name)).filter(name => name.endsWith('.tsx'))) {
      pageFiles.push({ cat, slug: entry.name, file: path.join(dir, entry.name, fileName) })
    }
  }
}

const genericPatterns = [
  /accessible to every American/i,
  /recognized by (?:CFPs?|CPAs?)/i,
  /American financial calculator/i,
  /verify (?:with|at) (?:the )?(?:IRS|CDC|NIH)/i,
]
const genericHits = []
const contextualAverageAmerican = []
for (const item of pageFiles) {
  const text = fs.readFileSync(item.file, 'utf8')
  for (const pattern of genericPatterns) {
    if (pattern.test(text)) genericHits.push(`${item.cat}/${item.slug}/${path.basename(item.file)}: ${pattern}`)
  }
  if (/average American/i.test(text)) contextualAverageAmerican.push(`${item.cat}/${item.slug}/${path.basename(item.file)}`)
}

// Exact three-item boilerplate block is prohibited because it was repeated across
// a large number of unrelated Finance calculators.
const repeatedBoilerplate = 'The average American has only $87,000 saved for retirement by ages 55\\u201364'
let repeatedBoilerplateHits = 0
for (const item of pageFiles) {
  const text = fs.readFileSync(item.file, 'utf8')
  if (text.includes(repeatedBoilerplate)) repeatedBoilerplateHits++
}

const generatedMetadata = fs.existsSync(path.join(root, 'lib', 'catalog', 'generated-tool-metadata.ts'))
  ? fs.readFileSync(path.join(root, 'lib', 'catalog', 'generated-tool-metadata.ts'), 'utf8').match(/"\/[^\"]+":/g)?.length ?? 0
  : 0

const stats = {
  activeRoutes: active.length,
  financeRoutes: financeRoutes.length,
  financeQualityProfiles: financeSlugs.size,
  financeMissingQuality: financeMissing.length,
  generatedPageMetadata: generatedMetadata,
  genericSeoHits: genericHits.length,
  contextualAverageAmericanMentions: contextualAverageAmerican.length,
  repeatedGenericBoilerplateHits: repeatedBoilerplateHits,
  explicitReviewDates: 0,
}

console.log(JSON.stringify(stats, null, 2))

const errors = []
if (financeMissing.length) errors.push(`Finance routes missing quality profiles: ${financeMissing.map(x => x.href).join(', ')}`)
if (genericHits.length) errors.push(`Generic SEO boilerplate remains: ${genericHits.join(', ')}`)
if (repeatedBoilerplateHits) errors.push(`Repeated generic retirement boilerplate remains in ${repeatedBoilerplateHits} files.`)
if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

if (contextualAverageAmerican.length) {
  console.log(`Contextual "average American" mentions retained for manual review: ${contextualAverageAmerican.length}`)
}
console.log('Tool metadata architecture check passed.')
