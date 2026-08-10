import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const calculationDir = path.join(ROOT, 'lib', 'calculations')
const failures = []
const exported = new Map()

function splitTopLevelArgs(text) {
  const parts = []
  let start = 0, depth = 0, quote = null, escape = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quote) {
      if (escape) escape = false
      else if (c === '\\') escape = true
      else if (c === quote) quote = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue }
    if ('([{'.includes(c)) depth++
    else if (')]}'.includes(c)) depth--
    else if (c === ',' && depth === 0) { parts.push(text.slice(start, i)); start = i + 1 }
  }
  if (text.slice(start).trim()) parts.push(text.slice(start))
  return parts
}

function extractFunctions(source, file) {
  const re = /export\s+function\s+(calculate[A-Za-z0-9_$]*)\s*\(([^)]*)\)/g
  let m
  while ((m = re.exec(source))) {
    const params = splitTopLevelArgs(m[2])
    const required = params.filter(p => !p.includes('=')).length
    exported.set(m[1], { required, maximum: params.length, file })
  }
}

for (const entry of fs.readdirSync(calculationDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.ts')) continue
  const file = path.join(calculationDir, entry.name)
  extractFunctions(fs.readFileSync(file, 'utf8'), path.relative(ROOT, file))
}

function extractCall(source, name, start) {
  let i = start, depth = 1, quote = null, escape = false
  for (; i < source.length; i++) {
    const c = source[i]
    if (quote) {
      if (escape) escape = false
      else if (c === '\\') escape = true
      else if (c === quote) quote = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; continue }
    if (c === '(') depth++
    else if (c === ')') {
      depth--
      if (depth === 0) break
    }
  }
  if (depth !== 0) return null
  return source.slice(start, i)
}

function importedNames(source) {
  const names = new Set()
  const re = /import\s*\{([\s\S]*?)\}\s*from\s*['"]@\/lib\/calculations(?:\/[^'"]*)?['"]/g
  let m
  while ((m = re.exec(source))) {
    for (const item of m[1].split(',')) {
      const clean = item.trim().split(/\s+as\s+/).pop()
      if (clean?.startsWith('calculate')) names.add(clean)
    }
  }
  return names
}

function auditFile(file) {
  const source = fs.readFileSync(file, 'utf8')
  for (const name of importedNames(source)) {
    const signature = exported.get(name)
    if (!signature) continue
    const re = new RegExp(`\\b${name}\\s*\\(`, 'g')
    let m
    while ((m = re.exec(source))) {
      const args = extractCall(source, name, m.index + m[0].length)
      if (args == null) continue
      const count = splitTopLevelArgs(args).length
      if (count < signature.required || count > signature.maximum) {
        const line = source.slice(0, m.index).split('\n').length
        failures.push({
          file: path.relative(ROOT, file),
          line,
          function: name,
          expected: `${signature.required}-${signature.maximum}`,
          actual: count,
          definition: signature.file,
        })
      }
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.tsx?$/.test(entry.name) && !full.includes(`${path.sep}lib${path.sep}calculations${path.sep}`)) auditFile(full)
  }
}

walk(path.join(ROOT, 'app'))
walk(path.join(ROOT, 'components'))
walk(path.join(ROOT, 'lib'))

const report = { generatedAt: new Date().toISOString(), exportedCalculationFunctions: exported.size, failures, pass: failures.length === 0 }
fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'reports', 'calculation-signature-audit.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ exportedCalculationFunctions: exported.size, failures: failures.length, pass: report.pass }, null, 2))
if (failures.length) process.exitCode = 1
