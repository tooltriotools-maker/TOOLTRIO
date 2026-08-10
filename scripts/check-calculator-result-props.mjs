import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const ts = require('typescript')
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const calcPath = path.join(root, 'lib', 'calculations', 'finance.ts')
const calcSource = fs.readFileSync(calcPath, 'utf8')
const calcFile = ts.createSourceFile(calcPath, calcSource, ts.ScriptTarget.Latest, true)
const returnKeySets = new Map()

function collectReturns(node) {
  if (ts.isFunctionDeclaration(node) && node.name?.text?.startsWith('calculate')) {
    const keySets = []
    function collectDirectReturns(n) {
      if (n !== node && (ts.isFunctionLike(n) || ts.isArrowFunction(n))) return
      if (ts.isReturnStatement(n) && n.expression && ts.isObjectLiteralExpression(n.expression)) {
        const keys = new Set()
        for (const property of n.expression.properties) {
          if (ts.isPropertyAssignment(property) && property.name) keys.add(property.name.getText(calcFile))
          else if (ts.isShorthandPropertyAssignment(property)) keys.add(property.name.text)
        }
        keySets.push(keys)
        return
      }
      ts.forEachChild(n, collectDirectReturns)
    }
    collectDirectReturns(node.body)
    if (keySets.length) returnKeySets.set(node.name.text, keySets)
  }
  ts.forEachChild(node, collectReturns)
}
collectReturns(calcFile)

const issues = []
const financeDir = path.join(root, 'app', 'calculators', 'finance')
for (const entry of fs.readdirSync(financeDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const file = path.join(financeDir, entry.name, 'CalculatorClient.tsx')
  if (!fs.existsSync(file)) continue
  const source = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const importedCalculators = new Set()

  function findImports(node) {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier.text === '@/lib/calculations/finance') {
      const bindings = node.importClause?.namedBindings
      if (bindings && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          if (returnKeySets.has(element.name.text)) importedCalculators.add(element.name.text)
        }
      }
    }
    ts.forEachChild(node, findImports)
  }
  findImports(sf)
  if (!importedCalculators.size) continue

  const expected = new Set()
  const unionOnly = new Map()
  for (const fn of importedCalculators) {
    const sets = returnKeySets.get(fn) || []
    for (const key of new Set(sets.flatMap(set => [...set]))) expected.add(key)
    if (sets.length > 1) {
      const common = new Set(sets[0])
      for (const set of sets.slice(1)) for (const key of [...common]) if (!set.has(key)) common.delete(key)
      const all = new Set(sets.flatMap(set => [...set]))
      unionOnly.set(fn, new Set([...all].filter(key => !common.has(key))))
    }
  }
  const resultProps = new Set()

  function findResultProps(node) {
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'result') {
      resultProps.add(node.name.text)
    }
    ts.forEachChild(node, findResultProps)
  }
  findResultProps(sf)

  for (const prop of resultProps) {
    if (!expected.has(prop)) issues.push(`${path.relative(root, file)}: result.${prop}`)
  }
  for (const [fn, props] of unionOnly) {
    for (const prop of props) {
      if (!resultProps.has(prop)) continue
      if (new RegExp(`[\"']${prop}[\"']\\s+in\\s+result`).test(source)) continue
      issues.push(`${path.relative(root, file)}: result.${prop} is not present on every return shape of ${fn}; narrow with \'${prop}\' in result or normalize the function return type.`)
    }
  }
}

if (issues.length) {
  console.error(`Calculator result-property audit failed: ${issues.length} issue(s)`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('Calculator result-property audit passed: result.* properties exist on their calculation return shapes and union-only properties are safely narrowed or normalized.')
