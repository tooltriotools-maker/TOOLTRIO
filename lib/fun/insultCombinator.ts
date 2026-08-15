/**
 * TOOLTRIO — Insult Generator combinator
 *
 * Shared engine that turns an InsultBankSet (see insultBanks.ts) into fresh,
 * grammatically-natural lines on demand. Same pattern the Shakespeare
 * generator pioneered: pick a template, fill each {placeholder} from its
 * word bank, track what's already been shown this session so nothing
 * repeats until the (very large) pool is exhausted.
 */

import { INSULT_BANKS, estimateCombinations, type InsultBankSet } from './insultBanks'

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Fill one random template from a bank set. Capitalizes the first letter for clean sentence casing. */
export function fillTemplate(set: InsultBankSet): string {
  const template = pick(set.templates)
  const filled = template.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const pool = set.banks[key]
    return pool && pool.length > 0 ? pick(pool) : ''
  })
  return filled.charAt(0).toUpperCase() + filled.slice(1)
}

/**
 * Generate a line that hasn't appeared yet in `seen` this session. Falls back
 * to allowing a repeat only if the (huge) combination space is somehow
 * exhausted, which in practice never happens.
 */
export function generateUnique(slug: string, seen: Set<string>): string {
  const set = INSULT_BANKS[slug]
  if (!set) return ''
  const total = estimateCombinations(slug)
  let result = ''
  let attempts = 0
  do {
    result = fillTemplate(set)
    attempts++
  } while (seen.has(result) && attempts < 200 && seen.size < total)
  seen.add(result)
  return result
}

/** Whether a given insult-generator slug has a combinatorial library (i.e. isn't Shakespeare, which has its own). */
export function hasBankLibrary(slug: string): boolean {
  return Boolean(INSULT_BANKS[slug])
}

export { estimateCombinations }
