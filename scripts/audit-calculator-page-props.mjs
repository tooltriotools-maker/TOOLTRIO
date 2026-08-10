#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
const ROOT = process.cwd()
const CALC_ROOT = path.join(ROOT, 'app', 'calculators')
const failures = []
let checked = 0
function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (entry.isFile() && entry.name === 'page.tsx') out.push(full)
  }
  return out
}
function extractClientFile(pageFile, source) {
  const match = source.match(/import\(\s*['"]\.\/([^'"]+)['"]\s*\)/)
  if (!match) return null
  const candidate = path.join(path.dirname(pageFile), match[1].endsWith('.tsx') ? match[1] : `${match[1]}.tsx`)
  return fs.existsSync(candidate) ? candidate : null
}
function extractProps(source) {
  const fields = new Set()
  for (const re of [/interface\s+Props\s*\{([\s\S]*?)\}/g, /type\s+Props\s*=\s*\{([\s\S]*?)\}/g]) {
    for (const block of source.matchAll(re)) {
      for (const match of block[1].matchAll(/\b([A-Za-z_$][\w$]*)\s*\??\s*:/g)) fields.add(match[1])
    }
  }
  for (const re of [/function\s+\w+\s*\(\s*\{([^}]*)\}\s*:\s*Props/g, /function\s+\w+\s*\(\s*\{([^}]*)\}\s*:/g]) {
    for (const m of source.matchAll(re)) {
      for (const x of m[1].matchAll(/\b([A-Za-z_$][\w$]*)\b/g)) fields.add(x[1])
    }
  }
  return fields
}
for (const pageFile of walk(CALC_ROOT)) {
  const pageSource = fs.readFileSync(pageFile, 'utf8')
  if (!pageSource.includes('<CalculatorClient')) continue
  const clientFile = extractClientFile(pageFile, pageSource)
  if (!clientFile) { failures.push(`${path.relative(ROOT, pageFile)}: unable to resolve CalculatorClient import`); continue }
  checked++
  const clientSource = fs.readFileSync(clientFile, 'utf8')
  const propsMatch = pageSource.match(/<CalculatorClient\b([\s\S]*?)\/>/)
  if (!propsMatch) continue
  const passed = new Set()
  for (const match of propsMatch[1].matchAll(/\b([A-Za-z_$][\w$]*)\s*=/g)) passed.add(match[1])
  const declared = extractProps(clientSource)
  for (const prop of passed) if (!declared.has(prop)) failures.push(`${path.relative(ROOT, pageFile)} -> ${path.relative(ROOT, clientFile)}: undeclared prop "${prop}"`)
}
if (failures.length) {
  console.error(`Calculator page-prop audit FAILED: ${failures.length} issue(s) across ${checked} pages.`)
  failures.forEach(x => console.error(`- ${x}`))
  process.exit(1)
}
console.log(`Calculator page-prop audit PASS: ${checked} pages checked; no undeclared CalculatorClient props.`)
