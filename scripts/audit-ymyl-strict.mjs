import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const failures = []
const warnings = []
const categories = ['finance', 'health']
const highRisk = [
  { re: /\bCFPB-validated\b/i, id: 'unsupported_authority_claim' },
  { re: /\bSEC-validated\b/i, id: 'unsupported_authority_claim' },
  { re: /\bCDC\s*(?:&|and)\s*NIH\s*validated\b/i, id: 'unsupported_authority_claim' },
  { re: /\bexact\s+(?:tax|daily calorie|calorie)\b/i, id: 'overclaim_exactness' },
  { re: /\b(?:guaranteed|risk-free|risk free)\s+(?:return|investment)\b/i, id: 'financial_overclaim' },
  { re: /\bno adverse health effects\b/i, id: 'medical_absolute_claim' },
  { re: /\bclinically recommended\b/i, id: 'clinical_recommendation_claim' },
  { re: /\bsafe for long-term consumption\b/i, id: 'medical_absolute_safety_claim' },
  { re: /\bvalidated predictor of\b/i, id: 'medical_predictor_overclaim' },
]
const aiTerms = [/\bChatGPT\b/i,/\bOpenAI\b/i,/\bgenerative AI\b/i,/\bAI-generated\b/i,/\bAI generated\b/i,/\bLLM\b/i]
function effectiveTitle(title) {
  let v=title.replace(/^Free\s+/i,'')
  if(v.length<=70)return v
  v=v.replace(/\s*\|\s*ToolTrio\s*$/i,'')
  if(v.length<=70)return v
  v=v.replace(/\s+2026\b/g,'')
  if(v.length<=70)return v
  const cut=v.slice(0,70), i=cut.lastIndexOf(' ')
  return (i>48?cut.slice(0,i):cut).replace(/[\s—–,:;|-]+$/,'')
}
function effectiveDescription(description) {
  const v=description.endsWith('.')?description:`${description}.`
  if(v.length<=155)return v
  const cut=v.slice(0,155), i=cut.lastIndexOf(' ')
  const trimmed=i>120?cut.slice(0,i):cut
  return trimmed.replace(/[,;:—–\s]+$/,'')+'.'
}

for (const category of categories) {
  const base = path.join(ROOT, 'app', 'calculators', category)
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const slug = entry.name
    const files = fs.readdirSync(path.join(base, slug)).filter(f => /\.(tsx|ts|md)$/.test(f))
    const text = files.map(f => fs.readFileSync(path.join(base, slug, f), 'utf8')).join('\n')
    for (const rule of highRisk) if (rule.re.test(text)) failures.push({ category, slug, type: rule.id, pattern: rule.re.source })
    for (const re of aiTerms) if (re.test(text)) failures.push({ category, slug, type: 'ai_related_user_facing_term', pattern: re.source })
    const page = path.join(base, slug, 'page.tsx')
    const pageText = fs.existsSync(page) ? fs.readFileSync(page, 'utf8') : ''
    const titleMatch = pageText.match(/title:\s*['"`]([^'"`]+)['"`]/)
    const descMatch = pageText.match(/description:\s*['"`]([^'"`]+)['"`]/)
    if (titleMatch && effectiveTitle(titleMatch[1]).length > 70) warnings.push({ category, slug, type: 'long_effective_title', length: effectiveTitle(titleMatch[1]).length, title: effectiveTitle(titleMatch[1]) })
    if (descMatch && effectiveDescription(descMatch[1]).length > 155) warnings.push({ category, slug, type: 'long_effective_description', length: effectiveDescription(descMatch[1]).length })
  }
}

// Formula verification is handled by scripts/audit-calculation-functions.mjs.

const report = { generatedAt: new Date().toISOString(), financeHealthRoutes: 0, failures, warnings, pass: failures.length === 0 }
for (const category of categories) {
  const base = path.join(ROOT,'app','calculators',category)
  report.financeHealthRoutes += fs.readdirSync(base,{withFileTypes:true}).filter(e=>e.isDirectory()).length
}
fs.mkdirSync(path.join(ROOT,'reports'), {recursive:true})
fs.writeFileSync(path.join(ROOT,'reports','ymyl-strict-audit.json'), JSON.stringify(report,null,2))
console.log(JSON.stringify({financeHealthRoutes:report.financeHealthRoutes, failures:failures.length, warnings:warnings.length, pass:report.pass},null,2))
if (failures.length) process.exitCode=1
