import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = process.cwd()
const SKIP = new Set(['node_modules', '.next', '.git'])

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, files)
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full)
  }
  return files
}

const files = walk(ROOT)
const failures = []

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const source = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )

  // TS1117 is the compiler's exact diagnostic for duplicate object-literal keys.
  for (const diagnostic of source.parseDiagnostics) {
    if (diagnostic.code !== 1117) continue
    const { line, character } = source.getLineAndCharacterOfPosition(diagnostic.start ?? 0)
    failures.push(`${path.relative(ROOT, file)}:${line + 1}:${character + 1} ${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')}`)
  }

  // Duplicate object keys are semantic in TypeScript, so inspect object literals too.
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const seen = new Set()
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property) && !ts.isShorthandPropertyAssignment(property)) continue
        const name = property.name && ts.isIdentifier(property.name)
          ? property.name.text
          : property.name && ts.isStringLiteral(property.name)
            ? property.name.text
            : null
        if (!name) continue
        if (seen.has(name)) {
          const { line, character } = source.getLineAndCharacterOfPosition(property.getStart(source))
          failures.push(`${path.relative(ROOT, file)}:${line + 1}:${character + 1} duplicate object key "${name}"`)
        }
        seen.add(name)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
}

const unique = [...new Set(failures)]
console.log(`Checked ${files.length} TypeScript/TSX files.`)
if (unique.length) {
  console.error(`Found ${unique.length} duplicate object-property issue(s):`)
  for (const failure of unique) console.error(`- ${failure}`)
  process.exit(1)
}
console.log('No duplicate object-property issues found.')
