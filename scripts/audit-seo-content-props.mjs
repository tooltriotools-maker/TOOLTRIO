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

function resolveClient(pageFile, source) {
  const dynamic = source.match(/import\(\s*['"]\.\/([^'"]+)['"]\s*\)/)
  const statik = source.match(/from\s+['"]\.\/([^'"]+)['"]/)
  const name = dynamic?.[1] ?? statik?.[1]
  if (!name) return null
  const file = path.join(path.dirname(pageFile), name.endsWith('.tsx') ? name : `${name}.tsx`)
  return fs.existsSync(file) ? file : null
}

for (const pageFile of walk(CALC_ROOT)) {
  const pageSource = fs.readFileSync(pageFile, 'utf8')
  if (!pageSource.includes('seoContent={seoContent}')) continue
  checked++
  const clientFile = resolveClient(pageFile, pageSource)
  if (!clientFile) {
    failures.push(`${path.relative(ROOT, pageFile)}: CalculatorClient file could not be resolved`)
    continue
  }
  const clientSource = fs.readFileSync(clientFile, 'utf8')
  const declaresSeoProp = /\bseoContent\s*\??\s*:\s*SEOContentProps\b/.test(clientSource) || /\bseoContent\s*\??\s*:\s*[^;\n}]*SEOContentProps/.test(clientSource)
  if (!declaresSeoProp) {
    failures.push(`${path.relative(ROOT, pageFile)} -> ${path.relative(ROOT, clientFile)}: page passes seoContent but CalculatorClient Props does not declare seoContent`)
  }
}

if (failures.length) {
  console.error(`SEO content prop audit FAILED: ${failures.length} issue(s) across ${checked} pages.`)
  failures.forEach(f => console.error(`- ${f}`))
  process.exit(1)
}

console.log(`SEO content prop audit PASS: ${checked} pages passing seoContent checked; all corresponding CalculatorClient Props declare seoContent.`)
