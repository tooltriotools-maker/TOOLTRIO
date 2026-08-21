/**
 * Regenerates public/data/emoji-dictionary.json
 *
 * Source data:
 *  - unicode-emoji-json     → the full official Unicode emoji list (name, group, version)
 *  - emojilib                → community keyword/synonym list per emoji
 *  - scripts/emoji-overrides.json → curated word→emoji picks for everyday vocabulary,
 *                              always wins over the auto-derived map (guarantees "happy"
 *                              stays 😊 instead of drifting to an obscure alternative).
 *
 * Run:  npm install --no-save emojilib unicode-emoji-json && node scripts/generate-emoji-data.js
 *
 * Output shape:
 *  {
 *    entries: [{ e: "😀", n: "grinning face", g: "Smileys & Emotion", k: [...keywords] }, ...],
 *    keywordMap: { "happy": "😊", "thumbs up": "👍", ... },  // one canonical emoji per keyword/phrase
 *    maxPhraseWords: 8
 *  }
 */
const fs = require('fs')
const path = require('path')
const emojilib = require('emojilib')
const unicodeData = require('unicode-emoji-json')
const overrides = require('./emoji-overrides.json')

// Common English function words are never allowed to become a "meaning" on their
// own — a handful of joke/noise keywords in emojilib (e.g. "am"/"i" tagged on the
// eye-in-speech-bubble emoji, ISO country codes like "in"/"us"/"at" tagged on flag
// emoji) would otherwise hijack ordinary sentences.
const STOPWORDS = new Set(`
i me my we our you your he him his she her it its they them their
am is are was were be been being
the a an of to in on at for with and or but not no so do does did
has have had this that these those as by from up down out over under
again then once here there when where why how all any both each few
more most other some such than too very s t can will just should now
if into about who whom which what
`.trim().split(/\s+/))

function cleanKeyword(raw) {
  let k = raw.toLowerCase().replace(/_/g, ' ').trim()
  if (/[^a-z\s]/.test(k)) return null // drop emoticons/symbols like ":D", "+1"
  k = k.replace(/\s+/g, ' ').trim()
  if (k.length < 2) return null
  if (k.split(' ').every(w => STOPWORDS.has(w))) return null
  return k
}

const entries = Object.keys(unicodeData).map(emoji => {
  const meta = unicodeData[emoji]
  const raw = emojilib[emoji] || []
  const keywords = []
  const seen = new Set()
  const nameKw = cleanKeyword(meta.slug)
  if (nameKw) { keywords.push(nameKw); seen.add(nameKw) }
  for (const r of raw) {
    const kw = cleanKeyword(r)
    if (kw && !seen.has(kw)) { keywords.push(kw); seen.add(kw) }
  }
  return { emoji, name: meta.name, group: meta.group, version: parseFloat(meta.emoji_version) || 0, keywords }
})

// Resolve collisions (many emoji can share a loose keyword): prefer the emoji
// where the word is most central to its own meaning (low index in its own
// keyword list), then the more specific/iconic emoji (fewer total keywords),
// then the older Unicode version.
const claims = {}
for (const entry of entries) {
  entry.keywords.forEach((kw, idx) => {
    const candidate = { emoji: entry.emoji, idx, kwCount: entry.keywords.length, version: entry.version }
    const current = claims[kw]
    if (!current) { claims[kw] = candidate; return }
    if (candidate.idx < current.idx) { claims[kw] = candidate; return }
    if (candidate.idx > current.idx) return
    if (candidate.kwCount < current.kwCount) { claims[kw] = candidate; return }
    if (candidate.kwCount > current.kwCount) return
    if (candidate.version < current.version) { claims[kw] = candidate }
  })
}
const keywordMap = {}
for (const kw in claims) keywordMap[kw] = claims[kw].emoji

// Curated overrides for everyday vocabulary always win.
for (const kw in overrides) keywordMap[kw] = overrides[kw]

entries.sort((a, b) => a.version - b.version || a.name.localeCompare(b.name))
const maxPhraseWords = Math.max(...Object.keys(keywordMap).map(k => k.split(' ').length))

const out = {
  entries: entries.map(e => ({ e: e.emoji, n: e.name, g: e.group, k: e.keywords.slice(0, 5) })),
  keywordMap,
  maxPhraseWords,
}

const outPath = path.join(__dirname, '..', 'public', 'data', 'emoji-dictionary.json')
fs.writeFileSync(outPath, JSON.stringify(out))
console.log(`Wrote ${outPath}`)
console.log(`Emoji: ${entries.length} | Keywords: ${Object.keys(keywordMap).length} (incl. ${Object.keys(overrides).length} curated) | Max phrase length: ${maxPhraseWords} words`)
