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
  title: 'Emoji Translator – Text to Emoji | ToolTrio',
  description: 'Translate any sentence into emoji representations instantly. Also decode emoji back to text. Fun text-to-emoji converter for captions, chats, and social.',
  slug: 'emoji-translator',
  keywords: [
    'text to emoji translator',
    'emoji translator online free',
    'convert text to emoji',
    'emoji text generator',
    'sentence to emoji translator',
    'emoji decoder online',
    'emoji to text translator',
    'turn words into emoji',
    'gen z emoji translator',
    'emoji slang meaning',
    'millennial emoji meanings',
    'no cap emoji',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'How does the emoji translator work?',
    answer: 'The tool maps common English words and concepts to their most relevant emoji equivalents. Type a sentence and it replaces key nouns, verbs, and adjectives with matching emoji while preserving the readability of the surrounding text. The result is something that reads like a charades clue — interpretable but with some delightful ambiguity.'
  },
  {
    question: 'Can it translate emoji back to regular text?',
    answer: 'Yes — paste a string of emoji and the translator attempts to decode it into plain English. This is useful for deciphering whatever your younger relatives sent you on WhatsApp, or just for playing emoji riddle games with friends.'
  },
  {
    question: 'What is the most popular use for this tool?',
    answer: 'Instagram captions, by a huge margin. People use it to create emoji-only captions for travel photos, food posts, or gym selfies. The second biggest use is creating emoji riddles for friends — translate a movie title or song name into emoji and see who can guess it first.'
  },
  {
    question: 'Does it work in multiple languages?',
    answer: 'Currently optimized for English input — the word-to-emoji mapping is built around English vocabulary. That said, because emoji are universal symbols, the output tends to be globally understandable regardless of language. "🚀🌙" means the same thing in every country.'
  },
  {
    question: 'What are some creative ways people use this translator?',
    answer: 'Movie title guessing games ("🦁👑" = The Lion King), emoji-only love notes, rewriting famous quotes in emoji, writing your job title in emoji for your bio ("📊💰🔍" = Financial Analyst), or sending meeting agendas in emoji just to see colleagues\' faces. The tool is genuinely more versatile than it looks at first glance.'
  },
  {
    question: 'Can I use this to make emoji art?',
    answer: 'The translator creates inline emoji sentences rather than 2D emoji pixel art. For full emoji art grids, you would need a different tool. But for emoji-heavy captions and creative text posts, this nails it.'
  },
  {
    question: 'Does it understand Gen Z or Millennial slang, not just literal meanings?',
    answer: 'Yes — flip on Slang Mode. It decodes emoji the way people actually use them online (💀 = "I\'m dead," 🚩 = a relationship red flag, 💅 = sassy/unbothered) instead of the literal Unicode name, and translates slang phrases like "no cap," "bet," "mid," and "touch grass" into the right emoji.'
  },
  {
    question: 'How many emoji and words does the translator actually cover?',
    answer: 'The dictionary is built from the complete official Unicode emoji list — 1,900+ emoji across every category, including all national flags — matched against roughly 6,000 words and short phrases. Each word always maps to the same emoji, so results stay consistent between visits.'
  },
  {
    question: 'Can it translate a whole phrase like "thumbs up" as one emoji?',
    answer: 'Yes. The translator checks for multi-word phrases (like "thumbs up" or "ice cream") before falling back to single words, so common two- and three-word concepts translate to one accurate emoji instead of being split apart.'
  },
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('emoji-translator')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
