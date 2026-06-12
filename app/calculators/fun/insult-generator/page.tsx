import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Shakespeare Insult Generator (468M+ Unique Insults) | ToolTrio',
  description:
    'Free Shakespeare Insult Generator. Create funny Shakespearean insults, Shakespeare roasts, Elizabethan insults, and old English comebacks instantly. Generate over 468 million unique Shakespeare-style insults.',

  slug: 'insult-generator',

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
    'tooltrio'
  ]
})
const faqs = [
  {
  question: 'Why is this Shakespeare insult generator different?',
  answer: 'Unlike many Shakespeare insult generators that recycle a small set of phrases, this tool can generate more than 468 million unique Shakespeare-style insults using multiple adjective, noun, and ending combinations.'
},
{
  question: 'What is a Shakespeare insult generator?',
  answer: 'A Shakespeare insult generator creates funny Shakespearean insults inspired by the language, vocabulary, and theatrical style used by William Shakespeare.'
},
{
  question: 'How many insults can this generator create?',
  answer: 'This tool can generate more than 468 million unique Shakespearean insult combinations, making repeated results extremely rare.'
},
{
  question: 'What is an Elizabethan insult?',
  answer: 'An Elizabethan insult is a humorous or dramatic insult written in the style of the Elizabethan era, the period when William Shakespeare lived and wrote.'
},
{
  question: 'Can I use these Shakespeare roasts for free?',
  answer: 'Yes. You can generate unlimited Shakespearean roasts and insults completely free without creating an account.'
},
{
  question: 'Are these real Shakespeare insults?',
  answer: 'Many of the words come directly from Shakespeare\'s plays, while the generator combines them into new Shakespeare-style insults.'
},

  {
    question: 'What makes Shakespearean insults so satisfying?',
    answer: 'The theatrical language makes them feel dramatic without being genuinely cruel. Calling someone "a villainous, clay-brained moldwarp" hits differently than a modern insult — it is absurd enough that both parties know it is playful. Shakespeare\'s actual insults from plays like King Lear and A Midsummer Night\'s Dream were shockingly creative, and this generator draws on that tradition.'
  },
  {
    question: 'Are these insults appropriate for all ages?',
    answer: 'Yes — the Shakespearean style keeps everything theatrical and old-fashioned rather than crude. There is no profanity. The insults sound pompous and dramatic, which is exactly what makes them funny. They work for school projects, family game nights, or just sending your friend a "thou art a weedy, toad-spotted measle" for no reason on a Tuesday.'
  },
  {
    question: 'Where do the insults come from?',
    answer: 'The generator combines authentic Elizabethan adjectives and nouns from Shakespeare\'s actual plays with a pattern-based system for constructing new multi-part insults. Real Shakespearean insults often stack three descriptors ("thou artless, rump-fed, moldwarp"), and the generator follows this pattern. The results are new constructions built from historically authentic vocabulary.'
  },
  {
    question: 'Can I use this for a school project or English class?',
    answer: 'Absolutely — and teachers often love it. Exploring Shakespearean insults is a genuine way to understand Elizabethan vocabulary, social hierarchy, and the theatrical tradition of competitive wit. Many English teachers use insult generators as a fun intro to studying Shakespeare because it gets students actually interested in the language.'
  },
  {
    question: 'What are the best occasions to use a Shakespearean insult?',
    answer: 'Game nights, group chats, office banter (carefully judged), fantasy sports leagues, responding to someone who cut you off in traffic (from inside your car, alone), and sending unprompted dramatic roasts to your closest friends who will appreciate the effort. The key is that everyone involved knows it is theatrical, not mean-spirited.'
  },
  {
    question: 'Can I generate insults in bulk for a game or party?',
    answer: 'Yes — generate as many as you want in rapid succession. A popular party game format: print out a stack of Shakespearean insults and have players pick one at random to deliver dramatically to another player, who must respond in kind. It gets chaotic and entertaining very quickly.'
  },
  {
    question: 'Is this free and does it require an account?',
    answer: 'Free and account-free. Generate infinite insults. Thou needst not register, thou loggerheaded, folly-fallen miscreant.'
  },
  {
    question: 'Can I share my insult on social media?',
    answer: 'Yes — each result has a copy button and share options. Posting a dramatic Shakespearean insult to a friend\'s timeline tends to get strong engagement because it is so unexpected. "Thou art a boil, a plague sore" reads very differently than a modern put-down, and people stop scrolling to read it twice.'
  },
  
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
