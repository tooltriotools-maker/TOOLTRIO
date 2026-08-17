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

  const tokens = text.match(/[A-Za-z']+/g) || []
  for (const raw of tokens) {
    const word = raw.toLowerCase()
    const entry = shakespeareIndex.get(word) || modernIndex.get(word)
    if (entry && !seen.has(entry.shakespearean + '|' + entry.modern)) {
      seen.add(entry.shakespearean + '|' + entry.modern)
      found.push(entry)
    }
  }
  return found
}

/** Total dictionary size, used on the tool page for the "N words & phrases" stat. */
export function dictionarySize(): number {
  return ALL_SHAKESPEARE_ENTRIES.length
}
