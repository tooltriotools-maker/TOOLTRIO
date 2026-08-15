import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const required = [
  "medieval-insult-generator",
  "pirate-insult-generator",
  "victorian-insult-generator",
  "roast-generator",
  "savage-insult-generator",
  "funny-insult-generator",
  "friendly-insult-generator",
  "fantasy-insult-generator",
  "wizard-insult-generator",
  "pirate-roast-generator",
  "cowboy-insult-generator",
  "royal-insult-generator",
  "schoolyard-insult-generator",
  "office-roast-generator",
  "best-friend-roast-generator",
  "comeback-generator",
  "sarcastic-comeback-generator",
  "villain-insult-generator"
]

const canonical = path.join(root, 'app', 'fun', 'insult-generator', '[slug]', 'page.tsx')
if (!fs.existsSync(canonical)) throw new Error(`Missing dynamic insult generator route: ${canonical}`)

const legacyShakespeare = path.join(root, 'app', 'calculators', 'fun', 'shakespeare-insult-generator')
if (fs.existsSync(legacyShakespeare)) {
  throw new Error('Legacy Shakespeare page still exists. Remove it so next.config.mjs owns the direct 301.')
}

const dataPath = path.join(root, 'app', 'fun', 'insult-generator', 'data.ts')
const data = fs.readFileSync(dataPath, 'utf8')
const missing = required.filter((slug) => !data.includes(`slug: '${slug}'`))
if (missing.length) throw new Error(`Missing insult generator slugs: ${missing.join(', ')}`)

const nextConfig = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8')
if (!nextConfig.includes("source: '/calculators/fun/shakespeare-insult-generator', destination: '/fun/insult-generator/shakespeare-insult-generator', permanent: true")) {
  throw new Error('Missing direct Shakespeare 301 rule.')
}

console.log(`Verified ${required.length} new insult generator routes.`)
console.log('Verified legacy Shakespeare filesystem route is removed.')
console.log('Verified direct legacy Shakespeare 301 is configured.')
