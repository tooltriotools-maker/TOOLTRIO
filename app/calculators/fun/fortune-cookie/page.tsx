import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Fortune Cookie Generator – Crack Open a Virtual Fortune Cookie',
  description: 'Get your virtual fortune cookie message instantly. Wisdom, humor, life advice, and lucky numbers — all the magic of a fortune cookie, none of the calories. Free online.',
  slug: 'fortune-cookie',
  keywords: [
    'fortune cookie generator',
    'virtual fortune cookie online',
    'random fortune cookie message',
    'online fortune cookie free',
    'fortune cookie wisdom',
    'fortune cookie quote generator',
    'daily fortune cookie online',
    'crack a fortune cookie online',
    'fortune cookie lucky numbers',
    'chinese fortune cookie online',
    'fortune cookie messages funny',
    'fortune cookie for today',
    'fortune cookie reading online free',
    'what does my fortune say',
    'fortune cookie generator no signup',
    'best fortune cookie generator 2026',
    'fortune generator free',
    'fortune of the day calculator',
    'random fortune generator',
    'fortune cookie affirmation',
    'fortune cookie for birthday',
    'fortune cookie share social media',
    'fortune cookie message ideas',
    'make your own fortune cookie online',
    'fortune cookie wisdom quotes',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'Where did fortune cookies actually come from?',
    answer: 'Despite being a staple of American Chinese restaurants, fortune cookies were actually invented in California — most likely in San Francisco or Los Angeles in the early 1900s, with roots in a Japanese tradition of temple crackers containing written fortunes. They only became mass-produced and associated with Chinese-American restaurants after WWII. The irony is that fortune cookies are largely unknown in China.'
  },
  {
    question: 'Are the fortunes in this generator actually wise or just generic?',
    answer: 'We put real effort into the content. The generator has categories: genuine wisdom ("The obstacle is the path"), playfully absurd ("Your future is bright. Bring sunglasses."), motivational, philosophical, and relationship-focused. Each session randomly pulls from a large curated pool so you rarely see the same message twice, and the fortunes are written to sound like something worth keeping.'
  },
  {
    question: 'Does the generator include lucky numbers like real fortune cookies?',
    answer: 'Yes — each fortune comes with a set of lucky numbers, just like the paper slips in real cookies. Whether you use them for a lottery ticket or just appreciate the full authentic experience is entirely up to you. The numbers are randomly generated fresh each time, so each fortune is genuinely unique.'
  },
  {
    question: 'Can I use this for a party, event, or game night?',
    answer: 'Great idea — people love a round of fortune cookie readings at the start of a dinner party or game night. One popular format: everyone opens their virtual cookie, reads it out loud, and the group decides if it fits the person. The "in bed" suffix tradition from real fortune cookies also works perfectly here.'
  },
  {
    question: 'Can I generate a fortune for someone else?',
    answer: 'Yes — just pass them the link or generate one on their behalf and share the screenshot. Many people use this to send a fortune as part of a birthday message, a pick-me-up text to a friend, or a WhatsApp morning greeting. "Cracking open a fortune cookie for you 🥠" is a surprisingly sweet thing to receive.'
  },
  {
    question: 'How many unique fortunes are in the generator?',
    answer: 'Several hundred curated fortunes across multiple tone categories, combined with the lucky number randomness means the chance of getting the exact same complete fortune twice is very low. Regular users who check in daily rarely see repeats for weeks.'
  },
  {
    question: 'Is there a daily fortune feature?',
    answer: 'The generator gives you a fresh fortune every time you click — use it as a daily ritual if you like. Some people open one each morning as a lighthearted prompt for the day. The fortunes are intentionally written to be open-ended enough that they feel personally relevant regardless of what you are going through.'
  },
  {
    question: 'Is this free and does it work on mobile?',
    answer: 'Completely free, no account needed, works perfectly on iPhone and Android without an app. The cracking animation works on mobile and is satisfying enough that most people tap it more than once just to see it again.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
