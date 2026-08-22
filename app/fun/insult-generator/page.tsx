import type { Metadata } from 'next'
import Link from 'next/link'
import { generateCollectionStructuredData } from '@/lib/seo/structured-data'
import { generateFAQStructuredData } from '@/lib/seo/metadata'
import { INSULT_GENERATORS } from '@/lib/fun/insult-generators'
import { estimateCombinations, hasBankLibrary } from '@/lib/fun/insultCombinator'

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M+`
  if (n >= 1_000) return `${Math.round(n / 100) / 10}K+`
  return `${n}+`
}

const BASE_URL = 'https://tooltrio.com'
const COUNT = INSULT_GENERATORS.length
const POPULAR_SLUGS = [
  'shakespeare-insult-generator',
  'pirate-insult-generator',
  'victorian-insult-generator',
  'royal-insult-generator',
] as const

const HUB_FAQS = [
  {
    q: 'Which insult generators are the most popular?',
    a: 'The featured Most Popular section highlights the Shakespeare, Pirate, Victorian and Royal Insult Generators. Each has a distinct voice, so you can pick theatrical, nautical, polished or regal humor.',
  },
  {
    q: 'What is the Shakespeare Insult Generator?',
    a: 'It creates playful Shakespearean-style insults using Elizabethan vocabulary and theatrical phrasing. It is the best choice when you want a dramatic, old-English-style roast rather than a modern comeback.',
  },
  {
    q: 'What is the difference between the Pirate, Victorian and Royal insult generators?',
    a: 'Pirate insults use salty nautical language, Victorian insults lean into formal drawing-room politeness and refined condescension, while Royal insults use courtly and regal language. The theme changes the voice while keeping the experience playful.',
  },
  {
    q: 'Are these insult generators free?',
    a: `Yes. All ${COUNT} generators are free to use, require no account, and run directly in your browser. You can generate, copy and share lines without signing up.`,
  },
  {
    q: 'Can I use these generators for parties, group chats or writing?',
    a: 'Yes. They work well for friendly roast games, themed parties, character dialogue, creative-writing prompts and group chats. Use your judgment and choose lines that fit the people and setting.',
  },
]

export const metadata: Metadata = {
  title: `${COUNT} Free Insult Generators — Roasts, Comebacks & Burns | ToolTrio`,
  description: `Pick from ${COUNT} free insult generators — with Shakespeare, pirate, Victorian and royal favorites, plus medieval, savage, office roasts, comebacks and more. Instant, shareable, no signup.`, 
  keywords: [
    'insult generator',
    'roast generator',
    'comeback generator',
    'shakespeare insult generator',
    'pirate insult generator',
    'savage insult generator',
    'funny insults',
  ],
  alternates: { canonical: `${BASE_URL}/fun/insult-generator` },
  openGraph: {
    title: `${COUNT} Free Insult Generators — Roasts, Comebacks & Burns | ToolTrio`,
    description: `Shakespeare, pirate, Victorian and royal insult generators plus medieval, savage, office roasts and comebacks — ${COUNT} free generators in one place.`,
    url: `${BASE_URL}/fun/insult-generator`,
    type: 'website',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ToolTrio' }],
  },
}

export default function InsultGeneratorHubPage() {
  const faqStructuredData = generateFAQStructuredData(HUB_FAQS.map(({ q, a }) => ({ question: q, answer: a })))
  const structuredData = generateCollectionStructuredData({
    name: `${COUNT} Free Insult Generators`,
    description: `A directory of ${COUNT} themed insult, roast, and comeback generators.`,
    url: `${BASE_URL}/fun/insult-generator`,
    categoryName: 'Fun & Entertainment',
    categoryUrl: `${BASE_URL}/fun`,
    items: INSULT_GENERATORS.map(g => ({ name: g.name, url: `${BASE_URL}/fun/insult-generator/${g.slug}` })),
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/fun" className="hover:text-gray-600 transition-colors">Fun &amp; Entertainment</Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">Insult Generators</span>
        </nav>

        <h1 className="page-title text-3xl sm:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          🎭 {COUNT} Free Insult Generators
        </h1>
        <div className="prose prose-gray max-w-3xl mb-10 text-gray-600 leading-relaxed">
          <p className="text-lg">
            Every flavor of playful put-down in one place — with Shakespeare, pirate, Victorian and royal
            favorites alongside medieval insults, office roasts and sarcastic comebacks. Pick a theme,
            hit generate, and get a fresh line every time.
          </p>
          <p className="mt-3">
            Every generator runs entirely in your browser — <strong>no account, no email, nothing stored</strong>.
            Each one is built on its own themed word-bank library — descriptors and targets combined through
            sentence templates — so most generators here serve up thousands of unique lines instead of a short
            fixed list, and none of them read like a generic mad-lib.
          </p>
        </div>

        <section className="mb-10" aria-label="Most popular insult generators">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="text-pink-500">⭐</span> Most Popular
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {POPULAR_SLUGS.map(slug => {
              const tool = INSULT_GENERATORS.find(g => g.slug === slug)
              if (!tool) return null
              const href = slug === 'shakespeare-insult-generator'
                ? '/fun/insult-generator/shakespeare-insult-generator'
                : `/fun/insult-generator/${slug}`
              return (
                <Link key={slug} href={href}
                  className="group p-4 rounded-2xl bg-white border-2 border-purple-100 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <span className="text-2xl mb-2 block">{tool.icon}</span>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-purple-700 leading-tight">{tool.name}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{tool.cardDescription}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INSULT_GENERATORS.map(g => {
            const href = g.slug === 'shakespeare-insult-generator' ? '/fun/insult-generator/shakespeare-insult-generator' : `/fun/insult-generator/${g.slug}`
            const combos = hasBankLibrary(g.slug) ? estimateCombinations(g.slug) : (g.slug === 'shakespeare-insult-generator' ? 20_000_000_000_000 : g.lines.length)
            return (
              <Link key={g.slug} href={href}
                className="group flex flex-col gap-2 p-5 rounded-2xl bg-white border-2 border-purple-100 hover:border-purple-300 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <span className="text-3xl">{g.icon}</span>
                <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">{g.name}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{g.cardDescription}</p>
                <p className="text-[11px] font-bold text-purple-600 mt-auto pt-1">{formatCount(combos)} unique lines</p>
              </Link>
            )
          })}
        </div>

        <section className="mt-12 mb-8" aria-label="Frequently asked questions">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl">
            {HUB_FAQS.map(({ q, a }) => (
              <details key={q} className="bg-white border-2 border-gray-100 rounded-2xl p-5">
                <summary className="font-bold text-gray-900 cursor-pointer">{q}</summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
