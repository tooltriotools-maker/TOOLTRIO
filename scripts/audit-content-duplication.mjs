import fs from 'node:fs'
import path from 'node:path'

const ROOTS = ['app/calculators']
const files = []

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(tsx|ts)$/.test(entry.name)) files.push(full)
  }
}
ROOTS.forEach(walk)

const all = files.map(file => ({ file, text: fs.readFileSync(file, 'utf8') }))

const forbiddenPatterns = [
  /Complete Privacy\s*(?:—|-)?\s*No Data Stored/i,
  /Complete Privacy\s*-\s*Your Data Stays on Your Device/i,
  /Is my financial data stored or shared\?/i,
  /Is my health data stored or shared\?/i,
  /The scientific and professional community in the United States has developed the methodologies underlying this/i,
  /free, evidence-based health assessment tool using the method and reference data described for this specific calculator/i,
  /All calculations use formulas recognized by US financial institutions, the CFP Board, and IRS guidelines/i,
]

const hits = []
for (const { file, text } of all) {
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(text)) hits.push(`${file}: ${pattern}`)
  }
}

// Detect exact repeated long paragraphs still embedded across calculator pages.
const paragraphMap = new Map()
for (const { file, text } of all) {
  for (const raw of text.split(/\n\s*\n/)) {
    const normalized = raw.replace(/\s+/g, ' ').trim()
    if (normalized.length < 180) continue
    if (/^(import |'use client'|const relatedCalculators|`?,?\s*(?:benefits|useCases|scienceSection):)/.test(normalized)) continue
    if (!paragraphMap.has(normalized)) paragraphMap.set(normalized, [])
    paragraphMap.get(normalized).push(file)
  }
}
const repeated = [...paragraphMap.entries()]
  .filter(([, paths]) => new Set(paths).size >= 8)
  .map(([paragraph, paths]) => ({ paragraph: paragraph.slice(0, 220), count: new Set(paths).size, paths: [...new Set(paths)].slice(0, 8) }))
  .sort((a, b) => b.count - a.count)

console.log(JSON.stringify({
  filesScanned: files.length,
  forbiddenPatternHits: hits.length,
  repeatedLongParagraphsAcross8PlusFiles: repeated.length,
  topRepeatedParagraphs: repeated.slice(0, 10),
}, null, 2))

if (hits.length) {
  console.error('\nContent duplication/legacy claim audit failed:')
  hits.slice(0, 30).forEach(h => console.error(`- ${h}`))
  process.exit(1)
}
