import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const registry = fs.readFileSync(path.join(root, 'lib/content/finance-batch-18.ts'), 'utf8')
const slugs = registry.split('\n').filter(line => line.startsWith("  ['")).map(line => line.match(/^  \['([^']+)'/)[1])
const missing = slugs.filter(slug => !fs.existsSync(path.join(root, 'app/calculators/finance', slug)))
if (slugs.length !== 25) throw new Error(`Expected 25 Batch 18 profiles, found ${slugs.length}`)
if (missing.length) throw new Error(`Missing routes: ${missing.join(', ')}`)
console.log(`Finance Batch 18 audit passed: ${slugs.length} routes.`)
