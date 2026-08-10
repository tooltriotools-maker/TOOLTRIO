import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const ROOT_DIR = path.join(ROOT, 'app', 'calculators')
const required = ['title', 'category', 'intro', 'howItWorks', 'benefits', 'conclusion']
const optional = ['useCases', 'tipsSection']
const failures = []
const optionalGaps = []

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name === 'page.tsx' || entry.name === 'CalculatorClient.tsx') out.push(full)
  }
  return out
}

function findMatchingBrace(source, start) {
  let depth = 0, quote = null, escape = false, line = false, block = false
  for (let i = start; i < source.length; i++) {
    const c = source[i], n = source[i + 1]
    if (line) { if (c === '\n') line = false; continue }
    if (block) { if (c === '*' && n === '/') { block = false; i++ } continue }
    if (quote) {
      if (escape) escape = false
      else if (c === '\\') escape = true
      else if (c === quote) quote = null
      continue
    }
    if (c === '/' && n === '/') { line = true; i++; continue }
    if (c === '/' && n === '*') { block = true; i++; continue }
    if (c === "'" || c === '"' || c === '`') { quote = c; continue }
    if (c === '{') depth++
    else if (c === '}') { depth--; if (depth === 0) return i }
  }
  return -1
}

let objects = 0
for (const file of walk(ROOT_DIR)) {
  const source = fs.readFileSync(file, 'utf8')
  let cursor = 0
  while (true) {
    const m = /const\s+seoContent\s*=\s*\{/.exec(source.slice(cursor))
    if (!m) break
    const start = cursor + m.index + m[0].lastIndexOf('{')
    const end = findMatchingBrace(source, start)
    if (end < 0) break
    const body = source.slice(start + 1, end)
    objects++
    const keys = new Set([...body.matchAll(/(^|\n)\s*([A-Za-z_$][\w$]*)\s*:/g)].map(x => x[2]))
    const missing = required.filter(k => !keys.has(k))
    if (missing.length) failures.push({ file: path.relative(ROOT, file), missing })
    const gaps = optional.filter(k => !keys.has(k))
    if (gaps.length) optionalGaps.push({ file: path.relative(ROOT, file), missing: gaps })
    cursor = end + 1
  }
}

const report = { objects, requiredFailures: failures, optionalGaps, pass: failures.length === 0 }
fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'reports', 'seo-content-shape-audit.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ objects, requiredFailures: failures.length, optionalGaps: optionalGaps.length, pass: report.pass }, null, 2))
if (failures.length) process.exitCode = 1
