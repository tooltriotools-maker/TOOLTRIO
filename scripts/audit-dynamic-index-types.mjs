/**
 * Guard against a recurring Vercel TypeScript failure:
 *   Element implicitly has an 'any' type because expression of type 'any'
 *   can't be used to index type 'SomeTypedObject'.
 *
 * We specifically reject callback variables explicitly typed as `any` when
 * they are subsequently used as an object index in the same source file.
 * This is a targeted guard, not a replacement for `tsc --noEmit`.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOTS = ['app', 'components', 'hooks', 'lib']
const EXTENSIONS = new Set(['.ts', '.tsx'])
const failures = []
let filesChecked = 0

function walk(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (EXTENSIONS.has(path.extname(entry.name))) inspect(full)
  }
}

function inspect(file) {
  filesChecked++
  const source = fs.readFileSync(file, 'utf8')
  const anyVars = new Set()

  // Covers common callback forms such as map((item: any) => ...)
  for (const match of source.matchAll(/(?:map|forEach|filter|find|some|every|reduce)\(\s*\(\s*([A-Za-z_$][\w$]*)\s*:\s*any\b/g)) {
    anyVars.add(match[1])
  }

  for (const variable of anyVars) {
    const indexPattern = new RegExp(String.raw`\b[A-Za-z_$][\w$]*\[${variable}\]`, 'g')
    for (const match of source.matchAll(indexPattern)) {
      const line = source.slice(0, match.index).split('\n').length
      failures.push({ file, line, expression: match[0], variable })
    }
  }
}

for (const root of ROOTS) walk(root)

const report = { filesChecked, failures, pass: failures.length === 0 }
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exit(1)
