import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Emoji Translator – Convert Text to Emoji Online Free',
  description: 'Translate any sentence into emoji representations instantly. Also decode emoji back to text. Fun text-to-emoji converter for captions, chats, and social media. No signup.',
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
    'emoji caption generator',
    'emojify text online',
    'emoji translator for Instagram',
    'text emoji art generator',
    'emoji translator no signup',
    'best emoji translator 2026',
    'emoji converter free online',
    'emoji translator for kids',
    'what emoji means calculator',
    'emoji translation tool',
    'emoji riddle generator',
    'emoji story converter',
    'copy paste emoji translator',
    'emoji chat translator',
    'emoji translator viral',
    'emoji translator share results',
    'whatsapp emoji translator',
    'tooltrio.com',
    'free calculator no signup',
    'instant calculator results',
    'fun calculator online free'
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
    question: 'Is the emoji translator free to use?',
    answer: 'Yes — 100% free with no account required. Translate as much text as you want. We do not store your inputs or track what you type. Close the page and it is gone.'
  },
  {
    question: 'Why does the same word sometimes get different emoji?',
    answer: 'Some words map to multiple reasonable emoji, and the tool deliberately introduces some variety to make repeated use more interesting. "Happy" might get 😊 once and 🎉 another time depending on context. This keeps the output feeling a bit alive rather than rigidly mechanical.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
