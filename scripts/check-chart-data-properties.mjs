import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.join(process.cwd(), 'app', 'calculators')
const extensions = new Set(['.tsx', '.ts'])
const files = []
const offenders = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (extensions.has(path.extname(entry.name))) files.push(full)
  }
}

walk(ROOT)

const existencePattern = /([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])+)?\?\.(age|day|month|goal|year)\s*!==\s*undefined/g
const yearDataPropertyPattern = /result\.yearData\[0\]\?\.(age|day|month|goal|year)/g

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  for (const match of source.matchAll(existencePattern)) {
    offenders.push(`${path.relative(process.cwd(), file)}:${match.index + 1}: ${match[0]}`)
  }
  for (const match of source.matchAll(yearDataPropertyPattern)) {
    offenders.push(`${path.relative(process.cwd(), file)}:${match.index + 1}: ${match[0]}`)
  }
}

if (offenders.length) {
  console.error(`Chart data property audit failed: ${offenders.length} unsafe optional property checks found.`)
  for (const offender of offenders) console.error(offender)
  process.exit(1)
}

console.log(`Chart data property audit passed: ${files.length} calculator source files checked; no unsafe optional chart-data property checks found.`)
