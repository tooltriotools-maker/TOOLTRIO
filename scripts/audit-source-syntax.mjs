import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = process.cwd()
const failures = []
let filesChecked = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (/\.(ts|tsx)$/.test(entry.name) && entry.name !== 'next-env.d.ts') {
      filesChecked++
      const source = fs.readFileSync(full, 'utf8')
      try {
        const result = ts.transpileModule(source, {
          compilerOptions: {
            jsx: ts.JsxEmit.ReactJSX,
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.ESNext,
          },
          reportDiagnostics: true,
          fileName: full,
        })
        for (const diagnostic of result.diagnostics ?? []) {
          failures.push({
            file: path.relative(ROOT, full),
            code: diagnostic.code,
            message: ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '),
          })
        }
      } catch (error) {
        failures.push({ file: path.relative(ROOT, full), code: 'TRANSPILE_EXCEPTION', message: String(error) })
      }
    }
  }
}

walk(ROOT)
const report = { generatedAt: new Date().toISOString(), filesChecked, syntaxFailures: failures.length, failures, pass: failures.length === 0 }
fs.mkdirSync(path.join(ROOT, 'reports'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'reports', 'source-syntax-audit.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify({ filesChecked, syntaxFailures: failures.length, pass: report.pass }, null, 2))
if (failures.length) process.exitCode = 1
