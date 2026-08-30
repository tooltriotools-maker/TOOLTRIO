import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredData } from '@/lib/seo/structured-data'

const ShakespeareInsultGeneratorClient = dynamic(
  () => import('./ShakespeareInsultGeneratorClient'),
  {
    loading: () => (
      <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
    ),
  }
)

const SLUG = 'shakespeare-insult-generator'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Shakespeare Insult Generator (468M+ Unique Insults) | ToolTrio',
  description: 'Free Shakespeare Insult Generator. Create funny Shakespearean insults, roasts, Elizabethan comebacks and old-English-style insults instantly.',
  slug: `insult-generator/${SLUG}`,
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

const structuredData = generateFunToolStructuredData({
  name: 'Shakespeare Insult Generator',
  description: 'Generate authentic Shakespearean insults and Elizabethan put-downs. Thou art about to be thoroughly roasted in old English. Free, instant, shareable.',
  slug: `insult-generator/${SLUG}`,
})
const faqStructuredData = generateFAQStructuredData(SHAKESPEARE_FAQS)

export default function Page() {
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
      <ShakespeareInsultGeneratorClient faqs={SHAKESPEARE_FAQS} />
    </>
  )
}
