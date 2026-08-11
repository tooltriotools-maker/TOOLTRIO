import fs from 'fs';
const slugs = [
  'home-affordability-calculator','home-equity-loan-calculator','home-equity-vs-personal-loan','home-loan-calculator','home-office-deduction-calculator',
  'house-flip-calculator','house-hacking-roi-calculator','hra-calculator','hsa-investment-calculator','hsa-projection-calculator'
];
const files = ['lib/content/finance-batch-06.ts','lib/content/finance-batch-17.ts','lib/content/finance-unreviewed.ts'];
const missing=[];
for(const slug of slugs){
  const found=files.some(f=>fs.readFileSync(f,'utf8').includes(slug));
  if(!found) missing.push(slug);
}
if(missing.length) throw new Error('Missing profiles: '+missing.join(', '));
console.log(`Batch 05 profile audit: ${slugs.length-missing.length}/${slugs.length} present`);
console.log('Batch 05 review audit PASSED.');
