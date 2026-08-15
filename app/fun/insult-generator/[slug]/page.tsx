import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredData } from '@/lib/seo/structured-data'
import { INSULT_GENERATORS, getInsultGeneratorBySlug } from '@/lib/fun/insult-generators'
import { estimateCombinations } from '@/lib/fun/insultCombinator'
import { INSULT_FAQ_EXTRAS } from '@/lib/fun/insultFaqs'
import InsultGeneratorClient from '@/components/fun/InsultGeneratorClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  // Shakespeare has its own dedicated, upgraded page at /fun/shakespeare-insult-generator
  // (full combinatorial engine, richer content) — it's excluded here so this generic
  // template doesn't also build a duplicate, lower-quality version of it. The old URL
  // permanently redirects to the real page (see next.config.js).
  return INSULT_GENERATORS.filter(g => g.slug !== 'shakespeare-insult-generator').map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const generator = getInsultGeneratorBySlug(slug)
  if (!generator) return {}

  return generateFunToolMetadata({
    title: `${generator.name} | ToolTrio`,
    description: generator.metaDescription,
    slug: `insult-generator/${generator.slug}`,
    keywords: generator.keywords,
  })
}

function buildFaqs(generator: NonNullable<ReturnType<typeof getInsultGeneratorBySlug>>) {
  const shortName = generator.name.replace(' Generator', '')
  const combos = estimateCombinations(generator.slug)
  const combosLabel = combos >= 1000 ? `${Math.round(combos / 100) / 10}K+` : `${combos}+`

  // Theme-specific questions unique to this generator (see lib/fun/insultFaqs.ts) come
  // first, since they're the most useful and the least generic. A small set of genuinely
  // functional questions (pricing, mobile, sharing) follows — these are legitimately the
  // same mechanic across every generator, so they're worded plainly rather than padded out.
  const themed = INSULT_FAQ_EXTRAS[generator.slug] ?? []

  const functional = [
    {
      question: `Is the ${generator.name} free to use?`,
      answer: `Yes — the ${generator.name} is completely free, with no signup and no limit on how many lines you generate.`,
    },
    {
      question: `How many different ${shortName.toLowerCase()} lines can it make?`,
      answer: `This generator draws from themed word banks and sentence templates built specifically for the ${shortName} voice, giving it roughly ${combosLabel} unique combinations — far more than a short fixed list, and the library is built to keep growing.`,
    },
    {
      question: `Does the ${generator.name} repeat lines, and does it work on mobile?`,
      answer: `Every line generated this session is tracked, so you won't see the same one twice in a row. It also works the same on phone, tablet, or desktop — no app or download needed, just tap generate. Use the Share button to send a result directly, or Copy to paste it anywhere.`,
    },
  ]

  return [...themed, ...functional]
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  // Belt-and-suspenders alongside the next.config.js redirect: anyone who lands on this
  // slug directly (old bookmark, stale search index, etc.) still lands on the real,
  // fully-upgraded Shakespeare generator instead of this template's fallback version.
  if (slug === 'shakespeare-insult-generator') redirect('/fun/shakespeare-insult-generator')

  const generator = getInsultGeneratorBySlug(slug)
  if (!generator) notFound()

  const faqs = buildFaqs(generator)

  // Full library, every other generator — cross-linking every insult/roast/comeback
  // generator from every individual generator page (not just a random sample).
  const related = INSULT_GENERATORS
    .filter(g => g.slug !== generator.slug)
    .map(g => ({ slug: g.slug, name: g.name, icon: g.icon }))

  const structuredData = generateFunToolStructuredData({
    name: generator.name,
    description: generator.metaDescription,
    slug: `insult-generator/${generator.slug}`,
  })
  const faqStructuredData = generateFAQStructuredData(faqs)

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
      <InsultGeneratorClient generator={generator} related={related} faqs={faqs} />
    </>
  )
}
