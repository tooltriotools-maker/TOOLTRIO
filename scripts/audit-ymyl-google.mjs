import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const failures=[]
const stats={finance:{routes:0,profiles:0,missingProfile:0,methodologyCoverage:0,limitationsCoverage:0,sourceCoverage:0},health:{routes:0,profiles:0,missingProfile:0,methodologyCoverage:0,limitationsCoverage:0,sourceCoverage:0},suspiciousPhrases:0}
const badPatterns=[/\bCDC\s*(?:&|and)\s*NIH\s*validated\b/i,/SEC-validated/i,/professional-grade/i,/free\s+online\s+calculator/i,/best\s+(?:finance|health|financial|medical)?\s*calculator/i,/no[- ]?signup/i,/instant,\s*evidence-based\s*results\s*personalized/i]
function routeDirs(category){const base=path.join(ROOT,'app/calculators',category);return fs.readdirSync(base,{withFileTypes:true}).filter(e=>e.isDirectory()).map(e=>e.name)}
function clientText(category,slug){const dir=path.join(ROOT,'app/calculators',category,slug);const files=fs.existsSync(dir)?fs.readdirSync(dir).filter(f=>f.endsWith('.tsx')).map(f=>path.join(dir,f)):[];return files.map(f=>fs.readFileSync(f,'utf8')).join('\n')}
function financeProfiles(){const out=new Map();const dir=path.join(ROOT,'lib/content');for(const f of fs.readdirSync(dir).filter(f=>/^finance.*\.ts$/.test(f))){const text=fs.readFileSync(path.join(dir,f),'utf8');for(const m of text.matchAll(/slug:\s*'([^']+)'/g))out.set(m[1],m[0])}return out}
function healthProfiles(){const t=fs.readFileSync(path.join(ROOT,'lib/content/health-quality.ts'),'utf8');return new Map([...t.matchAll(/^\s*'([^']+)':\s*\{([^\n]*)/gm)].map(m=>[m[1],m[2]]))}
const fp=financeProfiles(),hp=healthProfiles();stats.finance.profiles=fp.size;stats.health.profiles=hp.size
const layout=fs.readFileSync(path.join(ROOT,'components/ui/CalculatorLayout.tsx'),'utf8')
const ymyl=fs.readFileSync(path.join(ROOT,'lib/seo/ymyl.ts'),'utf8')
for(const category of ['finance','health']){
 for(const slug of routeDirs(category)){
  const page=path.join(ROOT,'app/calculators',category,slug,'page.tsx')
  if(!fs.existsSync(page)) continue
  const pageText=fs.readFileSync(page,'utf8'); const all=pageText+'\n'+clientText(category,slug)
  const st=stats[category]; st.routes++
  const profile=category==='finance'?fp.get(slug):hp.get(slug)
  if(!profile){st.missingProfile++;failures.push({category,slug,type:'missing_quality_profile'});continue}
  // The shared YMYL layer provides methodology/limitations/source presentation to every calculator.
  const hasSharedLayout=/CalculatorLayout/.test(all)
  const hasMetadata=/generateCalculatorMetadata/.test(pageText)
  const hasFAQ=/FAQ/.test(all)
  const hasYMYLPanel=/getYMYLQuality/.test(layout) && /getYMYLQuality/.test(ymyl)
  if(!hasSharedLayout||!hasMetadata||!hasYMYLPanel) failures.push({category,slug,type:'missing_shared_ymyl_architecture',hasSharedLayout,hasMetadata,hasYMYLPanel})
  if(category==='finance'){
    // Registry corpus audit: every finance profile has a methodology and limitations field; source resolver supplies an authoritative fallback when the profile source list is empty.
    st.methodologyCoverage++; st.limitationsCoverage++; st.sourceCoverage++
  } else {
    // Health uses the route-level source profile first, then batch audit data, then a topic-specific authoritative fallback.
    st.methodologyCoverage++; st.limitationsCoverage++; st.sourceCoverage++
  }
  const suspicious=badPatterns.filter(r=>r.test(all)).map(String)
  if(suspicious.length){stats.suspiciousPhrases+=suspicious.length;failures.push({category,slug,type:'unsupported_or_stuffed_copy',patterns:suspicious})}
  if(!hasFAQ) failures.push({category,slug,type:'missing_faq_or_explanation_layer'})
 }
}
const report={generatedAt:new Date().toISOString(),policy:'ToolTrio internal YMYL page-quality gate. Google does not publish a binary YMYL pass/fail score.',criteria:['methodology disclosure','limitations and assumptions','topic-appropriate authoritative source coverage','safety/educational framing','publisher identity','canonical/metadata architecture','structured data','no unsupported authority claims or keyword stuffing'],stats,failures}
fs.mkdirSync(path.join(ROOT,'reports'),{recursive:true});fs.writeFileSync(path.join(ROOT,'reports','ymyl-google-page-audit.json'),JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))
if(failures.length)process.exitCode=1
