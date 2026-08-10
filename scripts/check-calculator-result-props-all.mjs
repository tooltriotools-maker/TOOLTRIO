import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const ts = require('typescript')

const ROOT = process.cwd()
const calculationDir = path.join(ROOT, 'lib', 'calculations')
const returnKeySets = new Map()
const failures = []

function collectCalculationReturns(file) {
  const source = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name?.text?.startsWith('calculate')) {
      const sets = []
      function collect(node2) {
        if (node2 !== node && ts.isFunctionLike(node2)) return
        if (ts.isReturnStatement(node2) && node2.expression && ts.isObjectLiteralExpression(node2.expression)) {
          const keys = new Set()
          for (const prop of node2.expression.properties) {
            if (ts.isPropertyAssignment(prop) && prop.name) keys.add(prop.name.getText(sf))
            else if (ts.isShorthandPropertyAssignment(prop)) keys.add(prop.name.text)
          }
          sets.push(keys)
        }
        ts.forEachChild(node2, collect)
      }
      collect(node.body)
      if (sets.length) returnKeySets.set(node.name.text, sets)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
}

for (const entry of fs.readdirSync(calculationDir, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.ts')) collectCalculationReturns(path.join(calculationDir, entry.name))
}

function auditClient(file) {
  const source = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const imported = new Set()
  function imports(node) {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier.text.startsWith('@/lib/calculations')) {
      const bindings = node.importClause?.namedBindings
      if (bindings && ts.isNamedImports(bindings)) {
        for (const el of bindings.elements) if (returnKeySets.has(el.name.text)) imported.add(el.name.text)
      }
    }
    ts.forEachChild(node, imports)
  }
  imports(sf)
  if (!imported.size) return

  const expected = new Set()
  const unionOnly = new Set()
  for (const fn of imported) {
    const sets = returnKeySets.get(fn) ?? []
    for (const set of sets) for (const key of set) expected.add(key)
    if (sets.length > 1) {
      const common = new Set(sets[0])
      for (const set of sets.slice(1)) for (const key of [...common]) if (!set.has(key)) common.delete(key)
      for (const key of expected) if (!common.has(key) && sets.some(s => s.has(key))) unionOnly.add(key)
    }
  }

  const props = new Map()
  function visit(node) {
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'result') {
      const name = node.name.text
      const arr = props.get(name) ?? []
      arr.push(node)
      props.set(name, arr)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)

  for (const [prop, nodes] of props) {
    if (!expected.has(prop)) {
      for (const node of nodes) failures.push(`${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}: result.${prop} is not returned by the imported calculation function(s)`)
      continue
    }
    if (unionOnly.has(prop)) {
      const hasSafeFallback = nodes.some(node => {
        const parent = node.parent
        return ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken
      })
      if (!hasSafeFallback) {
        const text = source
        const guard = new RegExp(`["']${prop}["']\\s+in\\s+result`)
        if (!guard.test(text)) {
          for (const node of nodes) failures.push(`${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}: result.${prop} is union-only and must be safely narrowed or normalized`)
        } else {
          for (const node of nodes) {
            const lineStart = source.lastIndexOf('\n', node.getStart()) + 1
            const lineEnd = source.indexOf('\n', node.getEnd())
            const line = source.slice(lineStart, lineEnd === -1 ? source.length : lineEnd)
            if (!line.includes('??')) failures.push(`${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart()).line + 1}: result.${prop} remains potentially undefined after a union guard; use ?? 0 or normalize the return type`)
          }
        }
      }
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.tsx$/.test(entry.name) && full.includes(`${path.sep}app${path.sep}calculators${path.sep}`)) auditClient(full)
  }
}
walk(path.join(ROOT, 'app'))

const report = { generatedAt: new Date().toISOString(), calculationFunctions: returnKeySets.size, failures, pass: failures.length === 0 }
fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'reports', 'calculator-result-props-all-audit.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ calculationFunctions: returnKeySets.size, failures: failures.length, pass: report.pass }, null, 2))
if (failures.length) process.exitCode = 1
