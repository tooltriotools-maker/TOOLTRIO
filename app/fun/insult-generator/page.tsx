import type { Metadata } from 'next'
import Link from 'next/link'
import { generateCollectionStructuredData } from '@/lib/seo/structured-data'
import { INSULT_GENERATORS } from '@/lib/fun/insult-generators'
import { estimateCombinations, hasBankLibrary } from '@/lib/fun/insultCombinator'

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}M+`
  if (n >= 1_000) return `${Math.round(n / 100) / 10}K+`
  return `${n}+`
}

const BASE_URL = 'https://tooltrio.com'
const COUNT = INSULT_GENERATORS.length

export const metadata: Metadata = {
  title: `${COUNT} Free Insult Generators — Roasts, Comebacks & Burns | ToolTrio`,
  description: `Pick from ${COUNT} free insult generators — Shakespearean, pirate, medieval, savage, office roasts, comebacks and more, each with its own library of thousands of unique lines. Instant, shareable, no signup.`,
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
    title: `${COUNT} Free Insult Generators — Roasts, Comebacks & Burns`,
    description: `Shakespearean, pirate, medieval, savage, office roasts, comebacks and more — ${COUNT} free insult generators in one place.`,
    url: `${BASE_URL}/fun/insult-generator`,
    type: 'website',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'ToolTrio' }],
  },
}

export default function InsultGeneratorHubPage() {
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
      <div className="max-w-6xl mx-auto px-4 py-10">
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/fun" className="hover:text-gray-600 transition-colors">Fun &amp; Entertainment</Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">Insult Generators</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          🎭 {COUNT} Free Insult Generators
        </h1>
        <div className="prose prose-gray max-w-3xl mb-10 text-gray-600 leading-relaxed">
          <p className="text-lg">
            Every flavor of put-down in one place — from Shakespearean insults to office roasts to
            sarcastic comebacks. Pick a theme, hit generate, and get a fresh line every time.
          </p>
          <p className="mt-3">
            Every generator runs entirely in your browser — <strong>no account, no email, nothing stored</strong>.
            Each one is built on its own themed word-bank library — descriptors and targets combined through
            sentence templates — so most generators here serve up thousands of unique lines instead of a short
            fixed list, and none of them read like a generic mad-lib.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INSULT_GENERATORS.map(g => {
            const href = g.slug === 'shakespeare-insult-generator' ? '/fun/shakespeare-insult-generator' : `/fun/insult-generator/${g.slug}`
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
      </div>
    </>
  )
}
