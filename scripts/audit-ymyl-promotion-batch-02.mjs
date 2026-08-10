import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const report = JSON.parse(fs.readFileSync(path.join(root, 'reports/ymyl-indexation-audit.json'), 'utf8'))

const protectedRoutes = report.finance.noindex + report.health.noindex
const expectedProtected = report.health.counts.critical_logic_issue
const expectedRedirects = report.health.counts.redirect_only ?? 0

const output = {
  batch: '02',
  goal: 'Promote methodology-backed YMYL routes without forcing indexation of critical health logic.',
  financeIndexable: report.finance.indexable,
  healthIndexable: report.health.indexable,
  financeNoindex: report.finance.noindex,
  healthNoindex: report.health.noindex,
  protectedRoutes,
  expectedProtected,
  expectedRedirects,
  pass: report.pass && report.finance.indexable === report.finance.total && report.health.noindex === expectedProtected && report.health.redirectOnly === expectedRedirects,
}

fs.writeFileSync(path.join(root, 'reports/ymyl-promotion-batch-02.json'), JSON.stringify(output, null, 2))
console.log(JSON.stringify(output, null, 2))
if (!output.pass) process.exit(1)
