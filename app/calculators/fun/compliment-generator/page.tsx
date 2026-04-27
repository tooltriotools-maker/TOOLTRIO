import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Compliment Generator – Random Genuine Compliments Online',
  description: 'Generate heartfelt, funny, or creative compliments for anyone — friends, colleagues, partners, or strangers. Free random compliment generator with no login.',
  slug: 'compliment-generator',
  keywords: [
    'random compliment generator',
    'free compliment generator online',
    'genuine compliment generator',
    'compliment someone online free',
    'nice things to say generator',
    'compliment for friend generator',
    'funny compliment generator',
    'heartfelt compliment generator',
    'compliment generator for coworker',
    'sweet compliment ideas generator',
    'random nice words generator',
    'compliment generator for crush',
    'compliment ideas online',
    'daily compliment generator',
    'personalized compliment generator',
    'positive affirmation generator',
    'compliment generator no signup',
    'best compliment generator 2026',
    'compliment generator for social media',
    'motivational compliment generator',
    'how to compliment someone',
    'unique compliment generator',
    'creative compliment ideas free',
    'what to say to someone to make them feel good',
    'compliment generator for kids',
    'tooltrio.com',
    'free calculator no signup',
    'instant calculator results',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'Are these compliments actually genuine or just generic?',
    answer: 'The generator is built around specific, non-generic compliments — the kind that feel real rather than like a Hallmark card. Instead of "you are great," it surfaces things like "your ability to make everyone feel included in a conversation is a rare and underrated gift." Specificity is what makes a compliment land.'
  },
  {
    question: 'Can I filter compliments by type — funny, sincere, professional?',
    answer: 'Yes — the tool has categories so you get the right tone. Workplace compliments are professional and appropriate ("your attention to detail has saved this team more times than anyone realizes"). Friend compliments can be warmer and funnier. Romantic ones are sweet without being cringe. Pick what fits your situation.'
  },
  {
    question: 'Is this good for boosting someone\'s confidence?',
    answer: 'Research in positive psychology consistently shows that genuine, specific compliments meaningfully boost recipient mood and self-esteem — more than vague praise. Use the generator to find a starting point, personalize it to the real person, and deliver it. The effect is real even from a kind stranger online.'
  },
  {
    question: 'Can I use this to write compliments for Instagram captions or birthday cards?',
    answer: 'That is one of the most popular uses. Generate a batch, find one that resonates, and adapt it. "Happy birthday to someone who somehow manages to be both the life of the party AND the one everyone calls at 2am when things go wrong" hits harder than "Happy Birthday, have a great day!"'
  },
  {
    question: 'What makes a compliment go from okay to actually memorable?',
    answer: 'Three things: specificity (reference something real about them), unexpectedness (say something they have not heard before), and timing (compliments land better unprompted than as responses to fishing). The generator is designed around all three principles — it avoids the obvious to find something more surprising.'
  },
  {
    question: 'Is there a daily compliment feature?',
    answer: 'Yes — you can use it as a daily pick-me-up to send to someone or keep for yourself as a positive affirmation. Some people use it every morning to send one compliment to a different person in their life. Apparently it becomes a habit that people enjoy being on the receiving end of.'
  },
  {
    question: 'Is it free and does it require login?',
    answer: 'Completely free, no account, no email. Generate as many compliments as you want. We do not store who you send them to or what you generate. The world needs more compliments — we are not going to put them behind a paywall.'
  },
  {
    question: 'Can I share my generated compliment on social media?',
    answer: 'Yes — each compliment has a share button. Posting a compliment publicly to a friend on Twitter or Instagram is a powerful public display of appreciation that the person genuinely remembers. It also makes you look like a thoughtful human being, which is a nice side effect.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
