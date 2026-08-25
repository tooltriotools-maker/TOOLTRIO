import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredData } from '@/lib/seo/structured-data'
import { INSULT_GENERATORS, getInsultGeneratorBySlug } from '@/lib/fun/insult-generators'
import { estimateCombinations } from '@/lib/fun/insultCombinator'
import { INSULT_FAQ_EXTRAS } from '@/lib/fun/insultFaqs'
import InsultGeneratorClient from '@/components/fun/InsultGeneratorClient'

const ShakespeareInsultGeneratorClient = dynamic(
  () => import('@/components/fun/ShakespeareInsultGeneratorClient'),
  {
    loading: () => (
      <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
    ),
  }
)

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return INSULT_GENERATORS.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const generator = getInsultGeneratorBySlug(slug)
  if (!generator) return {}

  if (slug === 'shakespeare-insult-generator') {
    return generateFunToolMetadata({
      title: 'Shakespeare Insult Generator (468M+ Unique Insults) | ToolTrio',
      description: 'Free Shakespeare Insult Generator. Create funny Shakespearean insults, roasts, Elizabethan comebacks and old-English-style insults instantly.',
      slug: 'insult-generator/shakespeare-insult-generator',
      keywords: [
        'shakespeare insult generator',
        'shakespearean insult generator',
        'shakespeare roast generator',
        'shakespearean roast generator',
        'shakespeare insults',
        'shakespearean insults',
        'random shakespeare insult',
        'funny shakespeare insults',
        'shakespeare comeback generator',
        'shakespearean comeback generator',
        'old english insult generator',
        'old english roast generator',
        'elizabethan insult generator',
        'elizabethan roast generator',
        'william shakespeare insults',
        'bard insult generator',
        'creative roast generator',
        'witty insult generator',
        'funny insult generator',
        'roast generator',
        'tooltrio',
      ],
    })
  }

  return generateFunToolMetadata({
    title: `${generator.name} | ToolTrio`,
    description: generator.metaDescription,
    slug: `insult-generator/${generator.slug}`,
    keywords: generator.keywords,
  })
}

const SHAKESPEARE_FAQS = [
  {
    question: 'Why is this Shakespeare insult generator different?',
    answer: 'Unlike many Shakespeare insult generators that recycle a small set of phrases, this tool can generate more than 468 million unique Shakespeare-style insults using multiple adjective, noun, and ending combinations.',
  },
  {
    question: 'What is a Shakespeare insult generator?',
    answer: 'A Shakespeare insult generator creates funny Shakespearean insults inspired by the language, vocabulary, and theatrical style used by William Shakespeare.',
  },
  {
    question: 'How many insults can this generator create?',
    answer: 'This tool can generate more than 468 million unique Shakespearean insult combinations, making repeated results extremely rare.',
  },
  {
    question: 'What is an Elizabethan insult?',
    answer: 'An Elizabethan insult is a humorous or dramatic insult written in the style of the Elizabethan era, the period when William Shakespeare lived and wrote.',
  },
  {
    question: 'Are these real Shakespeare insults?',
    answer: 'Many of the words come directly from Shakespeare\'s plays, while the generator combines them into new Shakespeare-style insults.',
  },
  {
    question: 'What makes Shakespearean insults so satisfying?',
    answer: 'The theatrical language makes them feel dramatic without being genuinely cruel. The generator draws on the tradition of creative, stacked Elizabethan put-downs.',
  },
  {
    question: 'Are these insults appropriate for all ages?',
    answer: 'Yes — the Shakespearean style keeps everything theatrical and old-fashioned rather than crude. There is no profanity.',
  },
  {
    question: 'Where do the insults come from?',
    answer: 'The generator combines authentic Elizabethan adjectives and nouns with a pattern-based system for constructing new multi-part insults.',
  },
  {
    question: 'Can I use this for a school project or English class?',
    answer: 'Yes. Exploring Shakespearean insults is a fun way to understand Elizabethan vocabulary, theatrical language, and the tradition of competitive wit.',
  },
  {
    question: 'What are the best occasions to use a Shakespearean insult?',
    answer: 'Game nights, group chats, fantasy leagues, office banter when appropriate, and playful exchanges with friends who understand the joke.',
  },
  {
    question: 'Can I generate insults in bulk for a game or party?',
    answer: 'Yes — generate as many as you want in rapid succession. You can use the results for party games, writing prompts, or playful challenges.',
  },
  {
    question: 'Is this free and does it require an account?',
    answer: 'It is free and does not require an account. Generate insults without signing up.',
  },
  {
    question: 'Can I share my insult on social media?',
    answer: 'Yes — each result has copy and sharing options so you can send a dramatic Shakespearean insult to friends or post it elsewhere.',
  },
]

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

  const generator = getInsultGeneratorBySlug(slug)
  if (!generator) notFound()

  const faqs = slug === 'shakespeare-insult-generator'
    ? SHAKESPEARE_FAQS
    : buildFaqs(generator)

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
      {slug === 'shakespeare-insult-generator' ? (
        <ShakespeareInsultGeneratorClient faqs={faqs} />
      ) : (
        <InsultGeneratorClient generator={generator} related={related} faqs={faqs} />
      )}
    </>
  )
}
