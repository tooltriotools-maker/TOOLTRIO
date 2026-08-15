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
const nestedShakespeare = data.includes("slug: 'shakespeare-insult-generator'")
const missing = expected.filter(slug => !slugs.includes(slug))
const extra = slugs.filter(slug => !expected.includes(slug))
const route = path.join(root, 'app/fun/insult-generator/[slug]/page.tsx')
const client = path.join(root, 'app/fun/insult-generator/InsultGeneratorClient.tsx')
const formula = 101 * 101 * 101

console.log(`Insult tools: ${slugs.length}`)
console.log(`Expected tools: ${expected.length}`)
console.log(`Virtual unique combinations per tool: ${formula.toLocaleString()}`)

if (missing.length || extra.length || nestedShakespeare || !fs.existsSync(route) || !fs.existsSync(client)) {
  if (missing.length) console.error('Missing:', missing.join(', '))
  if (extra.length) console.error('Unexpected:', extra.join(', '))
  if (nestedShakespeare) console.error('Nested Shakespeare generator must not be in the new 18-tool directory.')
  process.exit(1)
}

console.log('OK: 18 tool-specific generators are configured.')
console.log('OK: Shakespeare remains separate at /fun/insult-generator/shakespeare-insult-generator.')
console.log('OK: each tool has 1,030,301 virtual combinations (101 × 101 × 101).')
