import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const ts = require('typescript')
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const calcPath = path.join(root, 'lib', 'calculations', 'finance.ts')
const calcSource = fs.readFileSync(calcPath, 'utf8')
const calcFile = ts.createSourceFile(calcPath, calcSource, ts.ScriptTarget.Latest, true)
const returnKeys = new Map()

function collectReturns(node) {
  if (ts.isFunctionDeclaration(node) && node.name?.text?.startsWith('calculate')) {
    const keys = new Set()
    function collectReturn(n) {
      if (ts.isReturnStatement(n) && n.expression && ts.isObjectLiteralExpression(n.expression)) {
        for (const property of n.expression.properties) {
          if (ts.isPropertyAssignment(property) && property.name) keys.add(property.name.getText(calcFile))
          else if (ts.isShorthandPropertyAssignment(property)) keys.add(property.name.text)
        }
      }
      ts.forEachChild(n, collectReturn)
    }
    collectReturn(node.body)
    if (keys.size) returnKeys.set(node.name.text, keys)
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
          if (returnKeys.has(element.name.text)) importedCalculators.add(element.name.text)
        }
      }
    }
    ts.forEachChild(node, findImports)
  }
  findImports(sf)
  if (!importedCalculators.size) continue

  const expected = new Set()
  for (const fn of importedCalculators) for (const key of returnKeys.get(fn) || []) expected.add(key)
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
}

if (issues.length) {
  console.error(`Calculator result-property audit failed: ${issues.length} issue(s)`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('Calculator result-property audit passed: no result.* properties are missing from their calculation return objects.')
