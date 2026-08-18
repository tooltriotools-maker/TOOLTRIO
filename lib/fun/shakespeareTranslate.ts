/**
 * TOOLTRIO — Shakespearean English translation engine
 *
 * Dynamic, dictionary-driven translation in both directions:
 *   modern English  ->  Shakespearean / Elizabethan English
 *   Shakespearean   ->  plain modern English
 *
 * Also powers `getMeanings()`, which any insult/roast generator can call on
 * its generated line to surface plain-English meanings for every dictionary
 * word it contains — this is the "shared library" the translator and every
 * insult generator both draw from.
 */

import {
  ALL_SHAKESPEARE_ENTRIES,
  SHAKESPEARE_PHRASES,
  SHAKESPEARE_WORDS,
  type ShakespeareWord,
} from './shakespeareDictionary'

export type Direction = 'toShakespeare' | 'toModern'

// ─── Lookup indexes (built once) ───────────────────────────────────────
const modernIndex = new Map<string, ShakespeareWord>()
const shakespeareIndex = new Map<string, ShakespeareWord>()

for (const entry of SHAKESPEARE_WORDS) {
  // First entry for a given modern word wins as the "canonical" forward mapping
  if (!modernIndex.has(entry.modern)) modernIndex.set(entry.modern, entry)
  if (!shakespeareIndex.has(entry.shakespearean)) shakespeareIndex.set(entry.shakespearean, entry)
}

// Phrase lists, longest-first, for greedy multi-word matching
const phrasesByModern = [...SHAKESPEARE_PHRASES].sort((a, b) => b.modern.length - a.modern.length)
const phrasesByShakespearean = [...SHAKESPEARE_PHRASES].sort((a, b) => b.shakespearean.length - a.shakespearean.length)

function matchCase(source: string, target: string): string {
  if (source.length === 0) return target
  if (source === source.toUpperCase() && source !== source.toLowerCase()) {
    return target.toUpperCase()
  }
  if (source[0] === source[0].toUpperCase()) {
    return target.charAt(0).toUpperCase() + target.slice(1)
  }
  return target
}

function replacePhrases(text: string, phrases: ShakespeareWord[], from: 'modern' | 'shakespearean', to: 'modern' | 'shakespearean'): string {
  let result = text
  for (const phrase of phrases) {
    const pattern = new RegExp(`\\b${phrase[from].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    result = result.replace(pattern, (match) => matchCase(match, phrase[to]))
  }
  return result
}

/**
 * Dynamic fallback meaning generator.
 *
 * The Shakespeare Insult Generator libraries contain ~700 hyphenated
 * compound words (e.g. "fig-faced", "clay-brained", "worm-eaten") that will
 * never all fit in a hand-written dictionary. Rather than silently dropping
 * them from the meanings panel, this decomposes the compound using known
 * Elizabethan insult-suffix patterns and produces a real, sensible gloss —
 * so no keyword from the shared library is ever left unexplained.
 */
const SUFFIX_MEANINGS: Record<string, string> = {
  headed: 'a mocking way of saying someone is dim-witted',
  pated: 'an old word for "headed" — implies foolishness',
  brained: 'describes someone as lacking sense or intelligence',
  witted: 'describes someone\u2019s (usually poor) level of cleverness',
  skulled: 'a jab at someone\u2019s intelligence, literally about their skull',
  minded: 'describes the way someone thinks',
  hearted: 'describes someone\u2019s courage or temperament',
  livered: 'from old medical belief that courage lived in the liver — describes bravery or cowardice',
  bellied: 'mocks someone\u2019s belly or gluttony',
  faced: 'mocks someone\u2019s facial appearance',
  eyed: 'mocks the look or expression in someone\u2019s eyes',
  nosed: 'mocks the shape or size of someone\u2019s nose',
  eared: 'mocks the shape or size of someone\u2019s ears',
  footed: 'mocks someone\u2019s clumsiness or gait',
  fingered: 'mocks someone\u2019s hands, often implying clumsiness or thievery',
  handed: 'mocks the skill (or lack of it) in someone\u2019s hands',
  jointed: 'mocks someone\u2019s posture or movement',
  limbed: 'mocks the shape of someone\u2019s arms or legs',
  boned: 'mocks someone\u2019s build or posture',
  necked: 'mocks the shape of someone\u2019s neck',
  voiced: 'mocks the sound of someone\u2019s voice',
  tongued: 'mocks the way someone talks, often implying rudeness or gossip',
  mouthed: 'mocks the way someone speaks or what comes out of their mouth',
  breathed: 'mocks someone\u2019s (usually bad) breath',
  bitten: 'implies someone is worn down or afflicted, as if bitten by something unpleasant',
  gaited: 'mocks the way someone walks',
  fallen: 'implies someone has declined from a better state',
  born: 'describes where or how someone was raised, often dismissively',
  bred: 'describes someone\u2019s upbringing, often dismissively',
  raised: 'describes someone\u2019s dismissively humble upbringing',
  dwelling: 'describes someone as belonging to a lowly place',
  fed: 'implies someone was raised on something unflattering',
  soaked: 'implies someone is thoroughly steeped in something unflattering',
  washed: 'implies someone is soaked or worn down by something unflattering',
  stained: 'implies someone is marked or tainted by something unflattering',
  crowned: 'a mocking, exaggerated way of describing someone\u2019s head or manner',
  spotted: 'implies someone is blemished or marked, often by disease',
  marked: 'implies someone is visibly blemished',
  sored: 'implies someone is covered in sores or blemishes',
  eaten: 'implies someone is decayed or worn away, like rotten wood',
  grown: 'implies someone is overrun or overgrown with something unpleasant',
  encrusted: 'implies someone is caked in filth',
  soured: 'implies someone has gone rotten or unpleasant',
  dried: 'implies someone is withered or worn out',
  baked: 'a mocking, exaggerated description, often about the head',
  cracked: 'implies someone is damaged or not quite right',
  rotted: 'implies someone is decayed or worthless',
  riddled: 'implies someone is thoroughly afflicted by something unpleasant',
}

const PREFIX_HINTS: Record<string, string> = {
  clay: 'clay (dull, heavy, shapeless material)', mud: 'mud (filth)', bog: 'a bog (filthy, stagnant place)',
  swine: 'a pig (filth, gluttony)', hog: 'a hog (gluttony)', goat: 'a goat (lechery)', ass: 'a donkey (stupidity, stubbornness)',
  dog: 'a dog (used as an insult for baseness)', rat: 'a rat (vermin, treachery)', toad: 'a toad (something repulsive)',
  worm: 'a worm (something low and repulsive)', maggot: 'a maggot (decay, filth)', flea: 'a flea (something small and parasitic)',
  louse: 'lice (filth, infestation)', lice: 'lice (filth, infestation)', pig: 'a pig (filth, gluttony)',
  turd: 'excrement (crude, filthy)', dung: 'dung (filth)', muck: 'muck (filth)', filth: 'filth',
  onion: 'an onion (something that makes you tear up — often implies fake sentiment)',
  cheese: 'cheese (smelliness)', garlic: 'garlic (bad breath)', fish: 'fish (a bad smell)',
  cabbage: 'cabbage (dullness)', turnip: 'a turnip (a plain, dull vegetable)', pumpkin: 'a pumpkin (a big, hollow head)',
  potato: 'a potato (a dull, plain thing)', gourd: 'a gourd (a hollow-headed vegetable)', melon: 'a melon (a big, round head)',
  egg: 'an egg (a smooth, empty head)', pea: 'a pea (something tiny and insignificant)', nut: 'a nut (a small, hard head)',
  wart: 'a wart (a blemish)', pox: 'pox (a disfiguring disease)', plague: 'plague (disease and misfortune)',
  scab: 'a scab (a diseased blemish)', mold: 'mold (rot and decay)', rust: 'rust (decay)',
  moth: 'a moth (something that eats away at things)', bat: 'a bat (associated with darkness and strangeness)',
  crow: 'a crow (a scavenger bird, associated with death)', owl: 'an owl (associated with strangeness at night)',
  crab: 'a crab (a sour, crabby temperament)', snail: 'a snail (slowness)', slug: 'a slug (sluggishness, slime)',
  weed: 'a weed (something unwanted that grows uncontrolled)', straw: 'straw (something flimsy and worthless)',
  hay: 'hay (dry, plain, unremarkable)', gravel: 'gravel (roughness)', mildew: 'mildew (decay and rot)',
  cobweb: 'a cobweb (neglect, dustiness)', tar: 'tar (grime)', soot: 'soot (grime)', ash: 'ash (paleness, remains)',
  fen: 'a fen (a filthy swamp)', bilge: 'bilge (the filthy water at the bottom of a ship)', spittle: 'spittle (crude bodily fluid)',
  drivel: 'drivel (nonsense, drool)', gruel: 'gruel (thin, bland porridge — poverty food)', offal: 'offal (animal innards — waste)',
  cork: 'cork (something light and empty)', splinter: 'a splinter (something sharp and irritating)',
  sponge: 'a sponge (absorbing everything, giving nothing back)', jelly: 'jelly (a lack of firmness or backbone)',
}

function inferFallbackMeaning(word: string): string | null {
  const w = word.toLowerCase()
  const parts = w.split('-')
  if (parts.length === 2) {
    const [prefix, suffix] = parts
    const suffixMeaning = SUFFIX_MEANINGS[suffix]
    if (suffixMeaning) {
      const prefixHint = PREFIX_HINTS[prefix]
      return prefixHint
        ? `A Shakespearean-style compound insult combining ${prefixHint} with a word meaning "${suffix}" — ${suffixMeaning}.`
        : `A Shakespearean-style compound insult: the "${suffix}" ending ${suffixMeaning}.`
    }
  }
  return null
}

/** Translate modern English text into Shakespearean / Elizabethan English. */
export function translateToShakespeare(text: string): string {
  if (!text.trim()) return ''
  let result = replacePhrases(text, phrasesByModern, 'modern', 'shakespearean')
  result = result.replace(/[A-Za-z']+/g, (word) => {
    const entry = modernIndex.get(word.toLowerCase())
    return entry ? matchCase(word, entry.shakespearean) : word
  })
  return result
}

/** Translate Shakespearean / Elizabethan text into plain modern English. */
export function translateToModern(text: string): string {
  if (!text.trim()) return ''
  let result = replacePhrases(text, phrasesByShakespearean, 'shakespearean', 'modern')
  result = result.replace(/[A-Za-z']+/g, (word) => {
    const entry = shakespeareIndex.get(word.toLowerCase())
    return entry ? matchCase(word, entry.modern) : word
  })
  return result
}

export function translate(text: string, direction: Direction): string {
  return direction === 'toShakespeare' ? translateToShakespeare(text) : translateToModern(text)
}

/**
 * Scan a piece of text (e.g. a generated insult line) and return every
 * dictionary entry it matches, in order of first appearance, deduplicated.
 * Works regardless of whether the text is modern or Shakespearean — it
 * checks both indexes, since insult-generator output mixes real Shakespearean
 * vocabulary (thou, varlet, knave...) that isn't always in a single direction.
 */
export function getMeanings(text: string): ShakespeareWord[] {
  if (!text) return []
  const found: ShakespeareWord[] = []
  const seen = new Set<string>()

  // Phrases first (longest match wins, checked in both directions)
  for (const phrase of [...phrasesByModern, ...phrasesByShakespearean]) {
    const re = new RegExp(`\\b${phrase.shakespearean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    const reModern = new RegExp(`\\b${phrase.modern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    if ((re.test(text) || reModern.test(text)) && !seen.has(phrase.shakespearean)) {
      seen.add(phrase.shakespearean)
      found.push(phrase)
    }
  }

  const tokens = text.match(/[A-Za-z'-]+/g) || []
  for (const raw of tokens) {
    const word = raw.toLowerCase()
    const entry = shakespeareIndex.get(word) || modernIndex.get(word)
    if (entry && !seen.has(entry.shakespearean + '|' + entry.modern)) {
      seen.add(entry.shakespearean + '|' + entry.modern)
      found.push(entry)
      continue
    }
    // Not in the hand-written dictionary — try the dynamic compound-word
    // fallback so hyphenated insult vocabulary is never left unexplained.
    if (!entry && word.includes('-') && !seen.has(word)) {
      const inferred = inferFallbackMeaning(word)
      if (inferred) {
        seen.add(word)
        found.push({ modern: '', shakespearean: word, meaning: inferred, category: 'insult-adjective' })
      }
    }
  }
  return found
}

/** Total dictionary size, used on the tool page for the "N words & phrases" stat. */
export function dictionarySize(): number {
  return ALL_SHAKESPEARE_ENTRIES.length
}
