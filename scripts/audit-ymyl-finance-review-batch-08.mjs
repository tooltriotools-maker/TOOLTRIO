import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const slugs=[
'federal-contractor-tax-calculator','fica-tax-calculator','france-pea-vs-assurance-vie-calculator','freelance-income-tax-calculator','freelancer-quarterly-tax-calculator','fsa-calculator','gift-tax-calculator','gig-economy-tax-calculator','vat-calculator-europe','w2-vs-1099-calculator'
];
const files=slugs.flatMap(s=>[`app/calculators/finance/${s}/page.tsx`,`app/calculators/finance/${s}/CalculatorClient.tsx`]);
let failures=[];
for(const f of files) if(!fs.existsSync(path.join(root,f))) failures.push(`missing: ${f}`);
const finance=fs.readFileSync(path.join(root,'lib/calculations/finance.ts'),'utf8');
const exportsMap={
'federal-contractor-tax-calculator':'calculateFederalContractorTax','fica-tax-calculator':'calculateFICA','freelance-income-tax-calculator':'calculateFreelanceIncome','freelancer-quarterly-tax-calculator':'calculateFreelancerQuarterlyTax','fsa-calculator':'calculateFSA','gift-tax-calculator':'calculateGiftTax','gig-economy-tax-calculator':'calculateGigEconomyTax','vat-calculator-europe':'calculateVAT','w2-vs-1099-calculator':'calculateW2vs1099'
};
for(const s of slugs) if(exportsMap[s] && !finance.includes(`export function ${exportsMap[s]}`)) failures.push(`missing calculation export: ${s}`);
const registries=['lib/content/finance-batch-05.ts','lib/content/finance-batch-19.ts'].map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
for(const s of slugs) if(!new RegExp(`slug: '${s}', status: 'reviewed'`).test(registries)) failures.push(`not reviewed in registry: ${s}`);
const text=files.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n');
for(const b of ['fixed at 45%','applies 76¢ to every mile','true take-home pay as a W-2 employee vs 1099 independent contractor after all taxes']) if(text.includes(b)) failures.push(`stale pattern: ${b}`);
if(!finance.includes('184500')) failures.push('2026 SS wage base missing');
if(!finance.includes('0.9235')) failures.push('92.35% SE earnings basis missing');
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log(`Batch 08 review audit: ${slugs.length}/${slugs.length} PASS`);
