import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const indexation = JSON.parse(fs.readFileSync(path.join(root, 'reports/ymyl-indexation-audit.json'), 'utf8'))

const report = {
  batch: '01',
  policy: 'Index every YMYL route with a route-level methodology/source profile; retain noindex only for health critical_logic_issue or missing profiles.',
  finance: indexation.finance,
  health: indexation.health,
  promotedFinance: indexation.finance.indexable,
  promotedHealth: Math.min(indexation.health.indexable, indexation.health.total - indexation.health.counts.critical_logic_issue),
  remainingProtected: indexation.finance.noindex + indexation.health.noindex,
  pass: indexation.pass,
}

fs.mkdirSync(path.join(root, 'reports'), { recursive: true })
fs.writeFileSync(path.join(root, 'reports/ymyl-promotion-batch-01.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
if (!report.pass) process.exit(1)
