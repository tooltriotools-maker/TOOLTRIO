import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'lib/blog')

function cleanTitle(title) {
  let t = title
    .replace(/\s*\|\s*tooltrio\.com\s*$/i, '')
    .replace(/\s+--\s+/g, ' — ')

  t = t.replace(/\s*[-—]\s*(Complete|Step-by-Step|With Taxes.*|Formula, Examples.*|Monthly Payment.*|Car Payment.*|Emergency Fund.*|Healthy Body.*|SDLT First Time Buyer.*|UK, Germany.*|Stocks & Shares.*|Auto-Enrolment.*|Yield and How to Invest.*|Gross vs Net.*|PCP vs HP.*|Financial Independence Number.*|Financial Decision.*|True Cost.*|Rates, First-Time Buyer.*)$/i, '')

  if (t.length > 70 && t.includes(':')) {
    let candidate = t.split(':', 1)[0].trim()
    if (!/2026/.test(candidate) && candidate.length + 7 <= 70) candidate += ' 2026'
    t = candidate
  }

  if (t.length > 70) {
    t = t.replace(/\s*\([^)]*\)/g, '')
    t = t.replace(/\s+[—-]\s+.*$/, '')
  }

  if (t.length > 70) t = t.slice(0, 68).rsplit?.(' ', 1)?.[0] ?? t.slice(0, 68)
  if (t.length > 70) t = t.slice(0, 68).replace(/\s+\S*$/, '').replace(/[ ,:-—]+$/, '')
  return t.trim()
}

function compactDescription(description) {
  if (description.length <= 160) return description

  const sentences = description.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean)
  let result = ''

  // Prefer complete sentences so the metadata remains readable and factual.
  for (const sentence of sentences) {
    const candidate = result ? `${result} ${sentence}` : sentence
    if (candidate.length <= 160) result = candidate
    else break
  }
  if (result) return result

  // If the first sentence is too long, keep its highest-information clauses.
  const clauses = description
    .split(/[,;]|\s+--\s+|\s+—\s+/)
    .map(s => s.trim())
    .filter(Boolean)
  result = ''
  for (const clause of clauses) {
    const candidate = result ? `${result}, ${clause}` : clause
    if (candidate.length <= 157) result = candidate
    else break
  }
  if (result) return `${result.replace(/[,:;—-]+$/, '')}.`

  return description.slice(0, 157).replace(/\s+\S*$/, '').replace(/[,:;—-]+$/, '') + '.'
}

const changes = []
for (const file of fs.readdirSync(BLOG_DIR).filter(name => name.endsWith('.ts') && !name.endsWith('.bak'))) {
  const filePath = path.join(BLOG_DIR, file)
  let source = fs.readFileSync(filePath, 'utf8')

  source = source.replace(/(seoTitle:\s*')([^'\\]*(?:\\.[^'\\]*)*)(')/g, (full, prefix, value, suffix) => {
    const next = cleanTitle(value)
    if (next === value) return full
    changes.push({ file, field: 'seoTitle', before: value, after: next })
    return `${prefix}${next}${suffix}`
  })

  source = source.replace(/(seoDescription:\s*')([^'\\]*(?:\\.[^'\\]*)*)(')/g, (full, prefix, value, suffix) => {
    const next = compactDescription(value)
    if (next === value) return full
    changes.push({ file, field: 'seoDescription', before: value, after: next })
    return `${prefix}${next}${suffix}`
  })

  fs.writeFileSync(filePath, source)
}

const reportDir = path.join(ROOT, 'reports')
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'blog-metadata-normalization.json'), JSON.stringify({ generatedAt: new Date().toISOString(), changes }, null, 2))
console.log(`Metadata changes: ${changes.length}`)
console.log(`Titles changed: ${changes.filter(x => x.field === 'seoTitle').length}`)
console.log(`Descriptions changed: ${changes.filter(x => x.field === 'seoDescription').length}`)
