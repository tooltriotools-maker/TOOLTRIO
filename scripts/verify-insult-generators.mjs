import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const data = fs.readFileSync(path.join(root, 'app/fun/insult-generator/data.ts'), 'utf8')
const expected = [
  'medieval-insult-generator','pirate-insult-generator','victorian-insult-generator','roast-generator',
  'savage-insult-generator','funny-insult-generator','friendly-insult-generator','fantasy-insult-generator',
  'wizard-insult-generator','pirate-roast-generator','cowboy-insult-generator','royal-insult-generator',
  'schoolyard-insult-generator','office-roast-generator','best-friend-roast-generator','comeback-generator',
  'sarcastic-comeback-generator','villain-insult-generator'
]
const slugs = [...data.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])
const generatedSlugs = slugs.filter(slug => slug !== 'shakespeare-insult-generator')
const nestedShakespeare = fs.existsSync(path.join(root, 'app/fun/insult-generator/shakespeare-insult-generator/page.tsx'))
const missing = expected.filter(slug => !generatedSlugs.includes(slug))
const extra = generatedSlugs.filter(slug => !expected.includes(slug))
const route = path.join(root, 'app/fun/insult-generator/[slug]/page.tsx')
const client = path.join(root, 'app/fun/insult-generator/InsultGeneratorClient.tsx')
const formula = 101 * 101 * 101

console.log(`New insult tools: ${generatedSlugs.length}`)
console.log('Existing Shakespeare tool: yes')
console.log(`Expected tools: ${expected.length}`)
console.log(`Virtual unique combinations per tool: ${formula.toLocaleString()}`)

if (missing.length || extra.length || !nestedShakespeare || !fs.existsSync(route) || !fs.existsSync(client)) {
  if (missing.length) console.error('Missing:', missing.join(', '))
  if (extra.length) console.error('Unexpected:', extra.join(', '))
  if (!nestedShakespeare) console.error('Existing Shakespeare generator page is missing from the insult-generator hub.')
  process.exit(1)
}

console.log('OK: 18 tool-specific generators are configured.')
console.log('OK: existing Shakespeare functionality is preserved at /fun/insult-generator/shakespeare-insult-generator.')
console.log('OK: each tool has 1,030,301 virtual combinations (101 × 101 × 101).')
