import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd()
const catalog=fs.readFileSync(path.join(root,'lib/catalog/tools.ts'),'utf8')
const reg=fs.readFileSync(path.join(root,'lib/content/finance-batch-16.ts'),'utf8')
const slugs=[...reg.matchAll(/slug:'([^']+)'/g)].map(m=>m[1])
if(slugs.length!==25) throw new Error(`Expected 25 profiles, found ${slugs.length}`)
for(const slug of slugs){
 const route=path.join(root,'app','calculators','finance',slug)
 if(!fs.existsSync(route)) throw new Error(`Missing route: ${slug}`)
 if(!catalog.includes(`/calculators/finance/${slug}`)) throw new Error(`Missing catalog route: ${slug}`)
}
console.log('Finance Batch 16 audit passed: 25 routes.')
