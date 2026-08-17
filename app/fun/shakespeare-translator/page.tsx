import type { Metadata } from 'next'
import { generateFunToolMetadata, generateFAQStructuredData } from '@/lib/seo/metadata'
import { generateFunToolStructuredDataFromSlug } from '@/lib/seo/structured-data'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Shakespeare English Translator | ToolTrio',
  description: 'Translate any sentence between modern English and Shakespearean English, both directions, with a full glossary explaining every word. Free, instant, no login.',
  slug: 'shakespeare-translator',
  keywords: [
    'shakespeare translator',
    'shakespeare english translator',
    'english to shakespearean translator',
    'shakespearean to english translator',
    'translate to old english',
    'elizabethan english translator',
    'shakespeare language converter',
    'shakespearean words and meanings',
    'thou thee thy translator',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'How does the Shakespeare translator actually work?',
    answer: 'It uses a dynamic dictionary of modern words, Shakespearean/Elizabethan equivalents, and plain-English meanings. When you type a sentence, the tool first checks for known multi-word phrases (like "wherefore art thou"), then translates any remaining recognized words individually, and leaves anything it doesn\u2019t recognize unchanged so your sentence stays readable.',
  },
  {
    question: 'Does it translate in both directions?',
    answer: 'Yes. Use the swap button to switch between Modern → Shakespearean and Shakespearean → Modern. Both directions pull from the exact same word library, so a round-trip translation stays consistent.',
  },
  {
    question: 'What is the Word-by-Word Meanings panel?',
    answer: 'After you translate a sentence, the tool scans it for every dictionary word or phrase it used and shows you the plain-English meaning of each one — so you understand why "wherefore" became "why" or why "thou" is used instead of "you," not just that it did.',
  },
  {
    question: 'Is there a full list of every word in the dictionary?',
    answer: 'Yes — switch to the Full Word Glossary tab to browse or search every entry in the library, filterable by category (pronouns, verbs, insults, exclamations, and more). It is the same dictionary the translator and every insult generator on the site draw from.',
  },
  {
    question: 'Why do "thou," "thee," and "thy" mean different things?',
    answer: '"Thou" is the subject form ("thou art"), "thee" is the object form ("I see thee"), and "thy"/"thine" are possessive forms ("thy sword," "thine eyes") — roughly matching "you," "you," and "your" in modern English. The glossary explains each one individually.',
  },
  {
    question: 'Can I use this to understand Shakespeare\u2019s plays better?',
    answer: 'Yes — paste a line of unfamiliar Shakespearean dialogue into the Shakespearean → Modern direction to get a plain-English approximation, then check the meanings panel for word-level detail. It won\u2019t replace a full annotated edition, but it\u2019s a fast way to get unstuck on vocabulary.',
  },
  {
    question: 'Does this connect to the Shakespeare Insult Generator?',
    answer: 'Yes — both the Shakespeare Insult Generator and every generator in the Insult Generator hub link back to this same dictionary, so you can look up the meaning of any Shakespearean insult word they produce.',
  },
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('shakespeare-translator')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
