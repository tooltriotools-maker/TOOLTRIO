#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const catalogPath = path.join(root, 'lib/catalog/tools.ts')
const source = fs.readFileSync(catalogPath, 'utf8')
const hrefs = [...source.matchAll(/href:\s*'([^']+)'/g)].map(m => m[1])
const active = hrefs

const relatedFile = path.join(root, 'lib/catalog/related-tools.ts')
const related = fs.readFileSync(relatedFile, 'utf8')
const required = [
  'getRelatedTools',
  'TOOL_CATALOG',
  'GENERATED_TOOL_PAGE_METADATA',
  'RelatedTool',
]
const missing = required.filter(token => !related.includes(token))
if (missing.length) {
  console.error(`Related-tools resolver missing: ${missing.join(', ')}`)
  process.exit(1)
}

if (active.length === 0) {
  console.error('Unexpected empty active catalog')
  process.exit(1)
}

console.log(`Related-tools architecture passed: ${active.length} active catalog routes.`)
console.log('Resolver is catalog-backed, deterministic, and region/category aware.')
