import fs from 'node:fs'
import path from 'node:path'

export const REGIONS = ['usa', 'uk', 'europe', 'india', 'global']

const INDIA = [
  /\bindia\b/i, /\binr\b/i, /₹/, /\bsip\b/i, /\bppf\b/i, /\bnps\b/i, /\bepf\b/i,
  /\bscss\b/i, /\bnsc\b/i, /\brd\b/i, /\bgst\b/i, /\bhra\b/i, /\bgratuity\b/i,
  /\bsukanya\b/i, /\belss\b/i, /\bulip\b/i, /\b80c\b/i, /\b80ccd\b/i,
  /\bsenior citizen savings\b/i, /\bnational savings certificate\b/i, /\bpublic provident fund\b/i,
  /\brecurring deposit\b/i, /\bfixed deposit\b/i, /\bmutual fund\b/i,
]
const UK = [
  /\buk\b/i, /\bunited kingdom\b/i, /£/, /\bgbp\b/i, /\bisa\b/i, /\bsipp\b/i,
  /\blisa\b/i, /\bnational insurance\b/i, /\bstamp duty\b/i, /\bbuy-to-let\b/i,
  /\bremortgage\b/i, /\bhelp to buy\b/i, /\buk pension\b/i, /\buk income tax\b/i,
]
const EUROPE = [
  /\beurope\b/i, /\beuropean union\b/i, /\beu\b/i, /\beur\b/i, /€/,
  /\bfrance\b/i, /\bspain\b/i, /\bgermany\b/i, /\bitaly\b/i, /\bpea\b/i,
  /\bassurance vie\b/i, /\bvat\b/i,
]
const USA = [
  /\busa\b/i, /\bunited states\b/i, /\bus\b/i, /\busd\b/i, /\$/,
  /\birs\b/i, /\b401\(k\)\b/i, /\broth? ira\b/i, /\bhsa\b/i, /\bmedicare\b/i,
  /\bsocial security\b/i, /\bssdi\b/i, /\bform w-?4\b/i, /\bSBA\b/i,
  /\bfederal income tax\b/i,
]

function score(text, patterns) {
  return patterns.reduce((n, re) => n + (re.test(text) ? 1 : 0), 0)
}

export function inferRegion({ slug, title = '', description = '', content = '', explicitRegion }) {
  const text = `${slug} ${title} ${description} ${content}`
  const titleText = title || slug
  const metadataText = `${slug} ${title} ${description}`
  const scores = {
    india: score(text, INDIA),
    uk: score(text, UK),
    europe: score(text, EUROPE),
    usa: score(text, USA),
    global: 0,
  }

  // Strong jurisdiction labels in the page metadata outrank generic product words.
  const strong = [
    ['india', /\b(?:india|indian)\b|₹|\binr\b/i],
    ['uk', /\b(?:uk|united kingdom|britain|england)\b|£|\bgbp\b/i],
    ['europe', /\beurope(?:an)?\b|€|\beur\b/i],
    ['usa', /\b(?:usa|u\.s\.?|united states|american)\b|\busd\b/i],
  ].map(([region, re]) => [region, re.test(titleText)])
  const strongMatches = strong.filter(([, hit]) => hit).map(([region]) => region)
  if (strongMatches.length === 1) return { region: strongMatches[0], confidence: 'metadata-label', scores }
  if (strongMatches.includes('india') && /\b(?:sip|ppf|nps|epf|gst|hra|gratuity|elss|ulip|sukanya|nsc|rd)\b/i.test(metadataText)) {
    return { region: 'india', confidence: 'metadata-product', scores }
  }

  // Explicit region wins unless the page metadata contains a single strong jurisdiction label.
  if (explicitRegion && strongMatches.length === 1 && strongMatches[0] !== explicitRegion) {
    return { region: strongMatches[0], confidence: 'override-explicit', scores }
  }
  const ranked = Object.entries(scores).filter(([k]) => k !== 'global').sort((a, b) => b[1] - a[1])
  const [best, bestScore] = ranked[0] ?? ['global', 0]
  const secondScore = ranked[1]?.[1] ?? 0

  if (explicitRegion && explicitRegion !== 'global') return { region: explicitRegion, confidence: 'explicit', scores }
  if (bestScore >= 2 && bestScore > secondScore) return { region: best, confidence: 'inferred', scores }
  if (explicitRegion === 'global' && bestScore >= 2) return { region: best, confidence: 'override-global', scores }
  return { region: explicitRegion ?? 'global', confidence: explicitRegion ? 'explicit-global' : 'default-global', scores }
}

export function forbiddenTermsFor(region) {
  if (region === 'india') return [
    /\bIRS\b/i, /\b401\(k\)\b/i, /\bHSA\b/i, /\bMedicare\b/i, /\bSocial Security\b/i,
    /\bUS tax brackets?\b/i, /\bAmerican tax\b/i, /\bUS tax law\b/i,
  ]
  if (region === 'uk') return [
    /\bIRS\b/i, /\b401\(k\)\b/i, /\bHSA\b/i, /\bUS tax law\b/i, /\bUS tax brackets?\b/i,
  ]
  if (region === 'usa') return [
    /\bPPF\b/i, /\bNPS\b/i, /\bEPF\b/i, /\bSukanya Samriddhi\b/i, /\b80C\b/i,
    /\bNational Savings Certificate\b/i, /\bIndian tax/i,
  ]
  return []
}

export function pageMetadataFromSource(source) {
  const title = source.match(/title:\s*['\"]([^'\"]+)/)?.[1] ?? ''
  const description = source.match(/description:\s*['\"]([^'\"]+)/)?.[1] ?? ''
  const explicitRegion = source.match(/region:\s*['\"](usa|uk|europe|india|global)['\"]/)?.[1]
  return { title, description, explicitRegion }
}
