import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Would You Rather Generator – Hilarious Impossible Dilemmas Online',
  description: 'Generate wild, funny, and impossible Would You Rather questions. Perfect for parties, road trips, dates, and group chats. Free online Would You Rather generator, no login.',
  slug: 'would-you-rather',
  keywords: [
    'would you rather generator',
    'would you rather questions online',
    'random would you rather generator',
    'funny would you rather questions',
    'would you rather for adults',
    'would you rather for kids',
    'hard would you rather questions',
    'would you rather party game',
    'would you rather road trip',
    'would you rather date night',
    'would you rather questions for couples',
    'would you rather online free',
    'would you rather generator no signup',
    'best would you rather questions 2026',
    'impossible would you rather',
    'weird would you rather questions',
    'would you rather clean questions',
    'would you rather gross questions',
    'would you rather deep questions',
    'would you rather for friends',
    'would you rather game online',
    'would you rather generator share',
    'would you rather icebreaker',
    'would you rather team building',
    'would you rather trivia',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What makes a good Would You Rather question?',
    answer: 'The best ones are genuinely balanced — both options should be equally appealing or equally terrible, not one clearly better choice. The question should also force you to reveal something about your values or priorities without feeling like an interrogation. "Would you rather always say what you are thinking or never speak again?" works because both options have real costs and the answer tells you a lot about a person.'
  },
  {
    question: 'What categories of questions does the generator cover?',
    answer: 'The generator draws from several categories you can filter: Funny & Silly (absurd scenarios, usually safe for all ages), Hard & Philosophical (genuinely difficult moral trade-offs), Gross & Disgusting (for those who enjoy that genre), Romantic & Relationship-focused (good for date nights), Career & Ambition (revealing about work values), and Superpowers & Fantasy. You can mix categories freely or pick one that fits your situation.'
  },
  {
    question: 'Is this good for dates?',
    answer: 'Excellent — Would You Rather is one of the better conversation games for early dates because it creates natural disclosure without the pressure of direct personal questions. When someone picks an option and explains why, you learn more about their values, sense of humor, and priorities than almost any direct question would reveal. The key is asking follow-up questions about the reasoning, not just recording the answer.'
  },
  {
    question: 'Can I use this for kids\' parties or family game nights?',
    answer: 'Yes — the generator has a Family-Friendly filter that keeps all scenarios clean, age-appropriate, and genuinely funny without relying on gross or adult content. Kids aged 6 and up can engage with the simpler questions, while the more complex dilemmas work better for 10+. It is genuinely one of the best no-equipment games for a mixed-age group.'
  },
  {
    question: 'What is the most effective way to play Would You Rather in a group?',
    answer: 'Generate a question, have everyone write down or hold up their answer simultaneously (so no one is influenced by others), then go around and have each person explain their reasoning. The explanations are where the real entertainment and insight come from. Variations: majority vote only counts if more than 60% agree; anyone in the minority has to explain themselves. The minority defence usually produces the best conversations.'
  },
  {
    question: 'Can I submit my own Would You Rather questions?',
    answer: 'The generator draws from a curated pool, and we periodically add new questions. For custom questions, the tool lets you type your own scenario and share the link with friends — useful for creating a personalised question set for a specific group where you know shared references will land better than generic ones.'
  },
  {
    question: 'What is the hardest type of Would You Rather question?',
    answer: 'Questions that pit two things you genuinely value against each other tend to be the most difficult — "Would you rather be extremely successful in your career but have a mediocre personal life, or have an extraordinary personal life but a completely average career?" The hardest ones are not the gross ones. They are the ones that make you actually examine what you want your life to look like.'
  },
  {
    question: 'Is this free?',
    answer: 'Completely free, no account needed. Generate as many dilemmas as you want. Would you rather pay for this or get it free? We made the easy choice for you.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
