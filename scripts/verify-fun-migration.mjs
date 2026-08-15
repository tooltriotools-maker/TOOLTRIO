#!/usr/bin/env node
/**
 * Verify the fun URL migration after deployment.
 *
 * Usage:
 *   node scripts/verify-fun-migration.mjs
 *   BASE_URL=https://staging.tooltrio.com node scripts/verify-fun-migration.mjs
 */
const BASE_URL = (process.env.BASE_URL || 'https://tooltrio.com').replace(/\/$/, '')

const funSlugs = [
  'age-in-days', 'birthday-countdown', 'calories-in-beer', 'coffee-calculator',
  'compliment-generator', 'emoji-translator', 'fantasy-name-generator',
  'fortune-cookie', 'how-rich-am-i', 'life-expectancy-fun', 'love-compatibility',
  'lucky-number', 'personality-quiz', 'pig-latin-converter', 'pizza-calculator',
  'procrastination-score', 'random-fact-generator', 'random-name-generator',
  'screen-time-calculator', 'shakespeare-insult-generator', 'sleep-debt-calculator',
  'social-media-addiction', 'superhero-name', 'text-to-morse', 'trivia-quiz',
  'uwu-text-generator', 'villain-name', 'workout-excuse-generator',
  'would-you-rather', 'zodiac-calculator',
]

let failed = 0

async function checkRedirect(slug) {
  const oldUrl = `${BASE_URL}/calculators/fun/${slug}`
  const expected = slug === 'shakespeare-insult-generator'
    ? `${BASE_URL}/fun/insult-generator/shakespeare-insult-generator`
    : `${BASE_URL}/fun/${slug}`

  const response = await fetch(oldUrl, { redirect: 'manual' })
  const location = response.headers.get('location')
  const ok = response.status === 301 && location === expected
  console.log(`${ok ? 'PASS' : 'FAIL'} ${response.status} ${oldUrl} -> ${location || '(no location)'}`)
  if (!ok) failed++
}

async function checkCanonical(url) {
  const response = await fetch(url, { redirect: 'manual' })
  const ok = response.status >= 200 && response.status < 300
  console.log(`${ok ? 'PASS' : 'FAIL'} ${response.status} ${url}`)
  if (!ok) failed++
}

for (const slug of funSlugs) await checkRedirect(slug)

await checkCanonical(`${BASE_URL}/fun`)
await checkCanonical(`${BASE_URL}/fun/insult-generator`)
for (const slug of [
  'medieval-insult-generator', 'pirate-insult-generator', 'victorian-insult-generator',
  'roast-generator', 'savage-insult-generator', 'funny-insult-generator',
  'friendly-insult-generator', 'fantasy-insult-generator', 'wizard-insult-generator',
  'pirate-roast-generator', 'cowboy-insult-generator', 'royal-insult-generator',
  'schoolyard-insult-generator', 'office-roast-generator', 'best-friend-roast-generator',
  'comeback-generator', 'sarcastic-comeback-generator', 'villain-insult-generator',
  'shakespeare-insult-generator',
]) {
  await checkCanonical(`${BASE_URL}/fun/insult-generator/${slug}`)
}

if (failed) {
  console.error(`\n${failed} migration checks failed.`)
  process.exit(1)
}
console.log('\nAll fun migration and insult-generator checks passed.')
