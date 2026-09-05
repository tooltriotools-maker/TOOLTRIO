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
  title:
  'Shakespeare Insult Generator – Funny Shakespearean Insults & Roasts | ToolTrio',

description:
  'Free Shakespeare Insult Generator for funny Shakespearean insults, random roasts, Elizabethan-style comebacks, and theatrical old-English insults. Generate and copy instantly.',
  slug: `insult-generator/${SLUG}`,

  keywords: [
    'shakespeare insult generator',
    'shakespearean insult generator',
    'shakespeare insult generator free',
    'shakespearean insult generator free',
    'shakespeare insult',
    'shakespearean insults',
    'shakespeare insult generator online',
    'shakespearean insult generator online',
    'random shakespeare insult generator',
    'shakespeare insults',
    'funny shakespeare insults',
    'shakespeare roast',
    'shakespeare roasts',
    'shakespeare roast generator',
    'shakespeare roast battle',
    'shakespearean roasts',
    'shakespeare insult list',
    'shakespearean insult words',
    'shakespeare insult words',
    'shakespeare insult quotes',
    '100 shakespeare insults',
    'shakespeare insults and compliments',
    'shakespeare insults macbeth',
    'shakespeare insult generator translation',
    'old english insult generator',
    'elizabethan insult generator',
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
  answer:
    'This generator builds Shakespeare-inspired insults dynamically from several vocabulary pools instead of relying only on a fixed list of sentences. Short mode has 83,931 possible vocabulary combinations, while Full mode has 16,185,875,129,400 theoretical combinations.',
},
  {
    question: 'What is a Shakespeare insult generator?',
    answer: 'A Shakespeare insult generator creates funny Shakespearean insults inspired by the language, vocabulary, and theatrical style used by William Shakespeare.',
  },
{
  question: 'How many combinations can this Shakespeare insult generator create?',
  answer:
    'Short mode has 83,931 theoretical combinations. Full mode has 16,185,875,129,400 theoretical combinations, or about 16.19 trillion. These figures describe possible vocabulary combinations, not 16.19 trillion historically documented Shakespeare quotations.',
},
  {
    question: 'What is an Elizabethan insult?',
    answer: 'An Elizabethan insult is a humorous or dramatic insult written in the style of the Elizabethan era, the period when William Shakespeare lived and wrote.',
  },
{
  question: 'Are these real Shakespeare insults?',
  answer:
    'The generated sentences are original combinations created by this tool and should not be treated as quotations written by Shakespeare. The generator uses Shakespearean, Elizabethan, and Shakespeare-inspired vocabulary to create theatrical insults.',
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
  answer:
    'The generator selects words from several curated vocabulary pools and combines them using predefined sentence patterns. The resulting lines are Shakespeare-inspired rather than historical Shakespeare quotations.',
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
    question: 'Can I use this as a Shakespeare insult generator online?',
    answer:
      'Yes. The generator runs online in your browser and creates Shakespeare-inspired insults without requiring a download or account.',
  },
  {
    question: 'Is this a Shakespearean insult generator free to use?',
    answer:
      'Yes. ToolTrio provides the generator for free and does not require an account to generate a result.',
  },
  {
    question: 'Can this generate a random Shakespeare insult?',
    answer:
      'Yes. Click Generate Insult to randomly combine words from the generator vocabulary pools.',
  },
  {
    question: 'Can I find 100 Shakespeare insults here?',
    answer:
      'The generator does not use a fixed list of only 100 insults. It creates combinations dynamically, allowing you to generate many different Shakespeare-inspired lines.',
  },
  {
    question: 'Does this provide a Shakespeare insult generator PDF?',
    answer:
      'No. This is an online interactive generator rather than a downloadable PDF. You can generate and copy lines directly from the page.',
  },
  {
    question: 'Does this provide a Shakespearean insult generator worksheet?',
    answer:
      'The tool itself is interactive rather than a printable worksheet, but it can be used as part of a classroom exercise involving Shakespearean vocabulary and creative writing.',
  },
  {
    question: 'Is this a Shakespeare insult generator book?',
    answer:
      'No. This page is an interactive generator rather than a book. It creates new combinations from its vocabulary pools.',
  },
  {
    question: 'Can I use this for Shakespeare insults and compliments?',
    answer:
      'Yes. Use this page for playful Shakespeare-inspired insults and visit the ToolTrio Compliment Generator when you want a positive alternative.',
  },
  {
    question: 'Can I use Shakespeare insults from Macbeth?',
    answer:
      'This generator creates new Shakespeare-inspired combinations and should not be treated as a quotation database. For exact Macbeth quotations, verify the wording in the original play.',
  },
  {
    question: 'What are Shakespearean insult words?',
    answer:
      'Shakespearean insult words are unusual or colorful words associated with the insults, mockery, and wordplay found in Shakespearean drama. Examples include terms such as knave, coxcomb, jackanapes, and moldwarp.',
  },
  {
    question: 'What is the difference between a Shakespeare insult and a Shakespearean insult?',
    answer:
      'The phrases generally refer to the same broad topic. “Shakespearean insult” emphasizes the style or language associated with Shakespeare, while “Shakespeare insult” is a shorter search phrase.',
  },
  {
    question: 'Can I translate a Shakespeare insult into modern English?',
    answer:
      'Yes. Generated lines can be opened in the ToolTrio Shakespeare English Translator to help explain unfamiliar Shakespearean-style vocabulary in modern English.',
  },
  {
    question: 'What are some Shakespearean insults?',
    answer:
      'Shakespearean insults often use vivid descriptors and unusual nouns rather than modern profanity. This generator creates new playful combinations inspired by that theatrical vocabulary.',
  },
  {
    question: 'What is Shakespeare slang?',
    answer:
      'Shakespeare slang is a broad phrase that can refer to informal, unusual, or period-specific vocabulary associated with Shakespeare and Elizabethan English. Not every unusual Shakespearean word is technically slang.',
  },
  {
    question: 'What are rare insult words?',
    answer:
      'Rare insult words are unusual terms that modern speakers do not commonly use. Shakespearean vocabulary is particularly rich in colorful and unfamiliar words that can make playful insults sound theatrical.',
  },
  {
    question: 'Can I share my insult on social media?',
    answer: 'Yes — each result has copy and sharing options so you can send a dramatic Shakespearean insult to friends or post it elsewhere.',
  },
]

const structuredData = generateFunToolStructuredData({
  name: 'Shakespeare Insult Generator',
  description:
    'Free Shakespeare Insult Generator for funny Shakespearean insults, Elizabethan roasts, old-English-style comebacks, random insults, and playful Shakespeare-style word combinations.',
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
