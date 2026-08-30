import type { Metadata } from 'next'
import {  generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredData } from '@/lib/seo/structured-data'
import { getInsultGeneratorBySlug, INSULT_GENERATORS } from '@/lib/fun/insult-generators'

import InsultGeneratorClient from './InsultGeneratorClient'

const SLUG = 'pirate-insult-generator'
const generator = getInsultGeneratorBySlug(SLUG)!



export const metadata: Metadata = {
  title: 'Pirate Insult Generator – Funny Pirate Insults | ToolTrio',
  description:
    'Generate funny pirate insults, pirate roasts, and salty sea-dog comebacks. Create original pirate-style insults with nautical language, pirate slang, and swashbuckling attitude.',
  keywords: [
    'pirate insult generator',
    'pirate insults',
    'funny pirate insults',
    'pirate roast generator',
    'pirate comebacks',
    'pirate insults generator',
    'pirate slang insults',
    'pirate jokes',
    'pirate roast',
    'nautical insults',
    'funny pirate comebacks',
  ],
  alternates: {
    canonical: 'https://tooltrio.com/fun/insult-generator/pirate-insult-generator',
  },
  openGraph: {
    title: 'Pirate Insult Generator – Funny Pirate Insults',
    description:
      'Create funny pirate insults, salty roasts, and pirate-style comebacks with nautical language and swashbuckling attitude.',
    url: 'https://tooltrio.com/fun/insult-generator/pirate-insult-generator',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'What is a pirate insult generator?',
    answer:
      'A pirate insult generator creates playful insults written in the exaggerated style of a pirate. Instead of using ordinary modern insults, it combines pirate vocabulary, nautical imagery, treasure references, ships, storms, seas, and swashbuckling expressions into humorous lines.',
  },
  {
    question: 'How do I generate a pirate insult?',
    answer:
      'Click the Generate Pirate Insult button to create a random pirate-style insult. Generate another whenever you want a different line. The generator uses themed pirate language rather than simply replacing modern words with “arrr.”',
  },
  {
    question: 'Are these real historical pirate insults?',
    answer:
      'No. The generated lines are modern humorous creations inspired by popular pirate language and nautical storytelling. They should not be treated as documented quotations from historical pirates.',
  },
  {
    question: 'What makes a good pirate insult?',
    answer:
      'A good pirate insult usually combines exaggerated confidence, nautical imagery, pirate vocabulary, and an unexpected comparison. References to ships, storms, treasure, barnacles, gulls, decks, sails, and the sea can make a line feel more convincingly pirate-like.',
  },
  {
    question: 'Can I use these pirate insults in a roast battle?',
    answer:
      'Yes. The generator is designed for playful entertainment, including friendly roast battles, parties, gaming chats, pirate-themed events, captions, and jokes between friends. Use the lines in situations where everyone understands that the insult is meant humorously.',
  },
  {
    question: 'Can I use pirate insults for a pirate-themed party?',
    answer:
      'Absolutely. Pirate insults can work well for costume parties, pirate-themed games, classroom activities, treasure hunts, social posts, and other playful events where pirate language fits the theme.',
  },
  {
    question: 'What kind of pirate language does the generator use?',
    answer:
      'The generator draws on familiar pirate and nautical imagery such as ships, decks, sails, storms, treasure, anchors, cannons, barnacles, gulls, and the open sea. The goal is to create a recognizable pirate voice while keeping the insults understandable.',
  },
  
  {
    question: 'Is the pirate insult generator free?',
    answer:
      'Yes. You can generate pirate insults online without installing software or creating an account.',
  },
]

// Full library, every other generator — cross-linking every insult/roast/comeback
// generator from every individual generator page (not just a random sample).
const related = INSULT_GENERATORS
  .filter(g => g.slug !== generator.slug)
  .map(g => ({ slug: g.slug, name: g.name, icon: g.icon }))

const structuredData = generateFunToolStructuredData({
  name: 'Pirate Insult Generator',
  description:
    'A free online pirate insult generator that creates funny pirate-style insults, roasts, and nautical comebacks.',
  slug: 'insult-generator/pirate-insult-generator',
})

const faqStructuredData = generateFAQStructuredData(faqs)

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
      <InsultGeneratorClient generator={generator} related={related} faqs={faqs} />
    </>
  )
}
