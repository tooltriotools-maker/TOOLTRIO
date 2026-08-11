import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const slugs = [
  "college-debt-burden-calculator",
  "college-financial-aid-strategies-calculator",
  "college-savings-529-calculator",
  "conforming-loan-limit-calculator",
  "cost-segregation-study-calculator",
  "crypto-tax-calculator",
  "dependent-care-fsa-calculator",
  "donor-advised-fund-calculator",
  "elss-vs-nps-calculator",
  "elss-vs-ppf-calculator",
];
const files = slugs.flatMap((s) => [
  `app/calculators/finance/${s}/page.tsx`,
  `app/calculators/finance/${s}/CalculatorClient.tsx`,
]);
let failures = [];
for (const f of files) { if (!fs.existsSync(path.join(root,f))) failures.push(`missing: ${f}`); }
const finance = fs.readFileSync(path.join(root,"lib/calculations/finance.ts"),"utf8");
for (const s of slugs) {
  const exports = {
    "college-debt-burden-calculator":"calculateCollegeDebtBurden",
    "college-financial-aid-strategies-calculator":"calculateCollegeAidStrategies",
    "college-savings-529-calculator":"calculateCollegeSavings529",
    "conforming-loan-limit-calculator":"calculateFHLMCConformingLoan",
    "cost-segregation-study-calculator":"calculateCostSegregation",
    "crypto-tax-calculator":"calculateCryptoTax",
    "dependent-care-fsa-calculator":"calculateDCFSA",
    "donor-advised-fund-calculator":"calculateDonorAdvisedFund",
    "elss-vs-nps-calculator":"ELSS vs NPS scenario model",
    "elss-vs-ppf-calculator":"ELSS vs PPF scenario model"
  };
  if (!finance.includes(exports[s]) && !["elss-vs-nps-calculator","elss-vs-ppf-calculator"].includes(s)) failures.push(`missing calculation export: ${s}`);
}
const all = fs.readFileSync(path.join(root,"lib/content/finance-batch-03.ts"),"utf8") + fs.readFileSync(path.join(root,"lib/content/finance-batch-04.ts"),"utf8");
for (const s of slugs) { if (!new RegExp(`slug: '${s}', status: 'reviewed'`).test(all)) failures.push(`not reviewed in registry: ${s}`); }
const bad = ["stateDeductionEst", "historical return comparison favors ELSS significantly", "both qualify 80C"];
const text = files.map(f=>fs.readFileSync(path.join(root,f),"utf8")).join("\n");
for (const b of bad) if (text.includes(b)) failures.push(`stale pattern: ${b}`);
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`Batch 07 review audit: ${slugs.length}/${slugs.length} PASS`);
