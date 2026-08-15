import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { INSULT_TOOLS } from './data'

const SHAKESPEARE_TOOL = {
  title: 'Shakespeare Insult Generator',
  shortDescription: 'Use the existing Shakespeare generator to create theatrical Elizabethan-style insults with its original functionality and library.',
  icon: '🎭',
  slug: 'shakespeare-insult-generator',
}
const ALL_INSULT_TOOLS = [...INSULT_TOOLS, SHAKESPEARE_TOOL]
import { generateCollectionStructuredData } from '@/lib/seo/structured-data'

const BASE = 'https://tooltrio.com'

export const metadata: Metadata = {
  title: '19 Insult Generators & Roast Tools | ToolTrio',
  description: 'Explore 19 free insult and roast generators for medieval, pirate, Victorian, fantasy, office, best-friend and other playful themes.',
  keywords: [
    'insult generators',
    'insult generator',
    'roast generator',
    'funny insult generator',
    'comeback generator',
    'pirate insult generator',
    'fantasy insult generator',
  ],
  alternates: { canonical: `${BASE}/fun/insult-generator` },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: `${BASE}/fun/insult-generator`,
    title: '19 Insult Generators & Roast Tools | ToolTrio',
    description: 'A themed directory of free, playful insult and roast generators.',
    images: [{ url: `${BASE}/og-image.png`, width: 1200, height: 630, alt: 'ToolTrio Insult Generators' }],
  },
}

export default function InsultGeneratorHub() {
  const structuredData = generateCollectionStructuredData({
    name: '19 Insult Generators',
    description: 'A directory of 19 free, playful, themed insult and roast generators.',
    url: `${BASE}/fun/insult-generator`,
    categoryName: 'Fun Tools',
    categoryUrl: `${BASE}/fun`,
    items: ALL_INSULT_TOOLS.map(tool => ({
      name: tool.title,
      url: `${BASE}/fun/insult-generator/${tool.slug}`,
    })),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fdf2f8,_white_38%,_#f5f3ff)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/fun" className="hover:text-gray-900">Fun Tools</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Insult Generators</span>
          </nav>

          <header className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gray-950 text-4xl shadow-2xl">🎭</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-pink-700">
              <Sparkles className="h-4 w-4" /> 19 themed generators
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Insult Generators
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Pick a style and generate a playful line in seconds. From medieval taverns and pirate ships to office banter,
              fantasy quests, office banter, and friendly roasts, each tool has its own vocabulary and voice.
            </p>
          </header>

          <section aria-labelledby="directory-heading" className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-gray-500">Choose your style</p>
                <h2 id="directory-heading" className="mt-1 text-2xl font-black text-gray-950 sm:text-3xl">Find the right roast</h2>
              </div>
              <Link href="/fun" className="hidden text-sm font-extrabold text-gray-600 hover:text-gray-950 sm:block">← All fun tools</Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_INSULT_TOOLS.map(tool => (
                <Link
                  key={tool.slug}
                  href={tool.slug === 'shakespeare-insult-generator' ? '/fun/insult-generator/shakespeare-insult-generator' : `/fun/insult-generator/${tool.slug}`}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-2xl"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-100 opacity-60 blur-2xl transition group-hover:scale-125" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-3xl shadow-sm">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-purple-700">{tool.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{tool.shortDescription}</p>
                    </div>
                  </div>
                  <div className="relative mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-black uppercase tracking-wider text-gray-500 group-hover:text-purple-700">
                    <span>Generate now</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-14 max-w-4xl rounded-[2rem] border border-gray-200 bg-white p-7 shadow-xl shadow-gray-200/30 sm:p-10">
            <h2 className="text-3xl font-black tracking-tight text-gray-950">Playful humor, not personal attacks</h2>
            <p className="mt-4 leading-8 text-gray-700">
              These generators are designed for creative entertainment. They use fictional roles, exaggerated habits,
              objects, settings, and absurd comparisons rather than protected characteristics or sensitive personal details.
              Use the lines where playful teasing is welcome, and adapt or skip anything that does not fit the audience.
            </p>
            <p className="mt-4 leading-8 text-gray-700">
              You can also use the tools as writing prompts. Generate a few lines, choose the strongest rhythm, then
              rewrite it for a character, party game, role-playing scene, birthday message, or comedy sketch.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
