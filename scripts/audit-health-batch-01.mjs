import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('app/calculators/health')
const sourceFile = path.resolve('lib/content/health-sources.ts')
const first25 = fs.readdirSync(root, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort()
  .slice(0, 25)

const sourceText = fs.readFileSync(sourceFile, 'utf8')
const rows = first25.map(slug => {
  const file = path.join(root, slug, 'page.tsx')
  const text = fs.readFileSync(file, 'utf8')
  return {
    slug,
    hasProfile: sourceText.includes(`'${slug}': {`),
    rendersProfile: text.includes(`healthSourceProfile: '${slug}'`),
    hasSeoContent: text.includes('seoContent') || text.includes('<SEOContent'),
    staleAuthorityClaim: /(CDC & NIH standards|CDC & NIH validated|evidence-based tool used by health professionals|official AR 600-9 tape test)/i.test(text),
  }
})

const missingProfiles = rows.filter(r => !r.hasProfile)
const missingRender = rows.filter(r => r.hasSeoContent && !r.rendersProfile)
const stale = rows.filter(r => r.staleAuthorityClaim)

const outDir = path.resolve('docs/audits')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'health-batch-01.json'), JSON.stringify(rows, null, 2))
fs.writeFileSync(path.join(outDir, 'health-batch-01.md'), [
  '# Health Batch 01 audit',
  '',
  `Routes audited: ${rows.length}`,
  `Profiles present: ${rows.filter(r => r.hasProfile).length}/${rows.length}`,
  `Rendered source profile on SEOContent routes: ${rows.length - missingRender.length}/${rows.length}`,
  `Stale authority claims remaining: ${stale.length}`,
  '',
  '## Manual-review routes',
  ...rows.filter(r => r.hasProfile && sourceText.includes(`'${r.slug}': {\n    status: 'needs_manual_review'`)).map(r => `- ${r.slug}`),
  '',
  '## Routes needing source-profile rendering',
  ...missingRender.map(r => `- ${r.slug}`),
  '',
  '## Routes with stale authority claims',
  ...(stale.length ? stale.map(r => `- ${r.slug}`) : ['- None']),
].join('\n'))

if (missingProfiles.length || stale.length) process.exitCode = 1
else console.log(`Health Batch 01 audit passed: ${rows.length} routes, no stale authority claims.`)
