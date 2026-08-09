import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const registry = fs.readFileSync(path.join(root, 'lib', 'content', 'finance-quality-registry.ts'), 'utf8')
const batchAudit = fs.readFileSync(path.join(root, 'scripts', 'audit-finance-batch-19.mjs'), 'utf8')

const forbiddenRuntimeThrow = /throw\s+new\s+Error\(\s*[`'\"]Duplicate finance/

if (forbiddenRuntimeThrow.test(registry)) {
  console.error('Finance registry safety check failed: registry still throws on duplicate profiles.')
  process.exit(1)
}

if (forbiddenRuntimeThrow.test(batchAudit)) {
  console.error('Finance registry safety check failed: finance batch audit still throws on duplicate profiles.')
  process.exit(1)
}

if (!registry.includes('const seen = new Set<string>()') || !registry.includes('if (seen.has(profile.slug)) continue')) {
  console.error('Finance registry safety check failed: deterministic slug de-duplication is missing.')
  process.exit(1)
}

console.log('Finance registry safety check passed: duplicate profiles cannot crash runtime/build.')
