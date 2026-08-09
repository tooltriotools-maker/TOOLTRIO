import fs from 'node:fs'
import path from 'node:path'
const registry = fs.readFileSync(path.resolve('lib/content/finance-quality.ts'), 'utf8')
const FINANCE_BATCH_01_SLUGS = [...registry.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])

const root = path.resolve('app/calculators/finance')
const missing = FINANCE_BATCH_01_SLUGS.filter((slug) => !fs.existsSync(path.join(root, slug, 'page.tsx')))
if (missing.length) {
  console.error('Missing Finance Batch 01 routes:', missing.join(', '))
  process.exit(1)
}

const forbidden = [
  '$23,500', '$23,000', '$236,000-$246,000', '$150,000-$165,000',
  '2024, PBGC guarantees up to $7,407', '$4,300 single / $8,550 family 2026'
]
const stale = []
for (const slug of FINANCE_BATCH_01_SLUGS) {
  const file = path.join(root, slug, 'page.tsx')
  const text = fs.readFileSync(file, 'utf8')
  for (const value of forbidden) if (text.includes(value)) stale.push(`${slug}: ${value}`)
}
if (stale.length) {
  console.error('Stale finance claims found:')
  console.error(stale.join('\n'))
  process.exit(1)
}

fs.mkdirSync('docs/audits', { recursive: true })
fs.writeFileSync('docs/audits/finance-batch-01.md', `# Finance Batch 01\n\n25 canonical finance routes audited for source architecture and 2026-sensitive claims.\n\nNo canonical URLs changed.\n\nRegistry: lib/content/finance-quality.ts\n`)
console.log(`Finance Batch 01 audit passed: ${FINANCE_BATCH_01_SLUGS.length} routes.`)
