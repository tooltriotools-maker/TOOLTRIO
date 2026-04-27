import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Love Compatibility Calculator – Name & Birthday Match Score',
  description: 'Calculate your love compatibility score using names and birthdays. Find out how compatible you are with your partner, crush, or soulmate. Fun, free, and instant.',
  slug: 'love-compatibility',
  keywords: [
    'love compatibility calculator',
    'name compatibility calculator',
    'birthday compatibility calculator',
    'am I compatible with my partner',
    'love match calculator free',
    'compatibility score calculator',
    'zodiac compatibility calculator',
    'relationship compatibility test online',
    'how compatible are we calculator',
    'love percentage calculator by name',
    'crush compatibility calculator',
    'soulmate calculator free',
    'love calculator names free online',
    'partner compatibility quiz',
    'love match by birthday',
    'numerology love compatibility',
    'compatibility test for couples',
    'how well do we match calculator',
    'love compatibility 2026',
    'best love calculator online',
    'love compatibility no signup',
    'are we meant to be calculator',
    'love compatibility viral tool',
    'share love compatibility result',
    'celebrity compatibility calculator',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How does the love compatibility calculator work?',
    answer: 'The tool combines numerological analysis of your names (each letter maps to a number, the sum reveals personality traits) with birthday-based compatibility patterns drawn from astrology and numerology traditions. The output is an entertainment score, not a relationship assessment — but the categories it shows (communication style, emotional connection, long-term compatibility) are framed to prompt interesting conversations between couples.'
  },
  {
    question: 'Can I use this for a celebrity crush or historical couple?',
    answer: 'Absolutely. This is one of the most popular uses — people test their compatibility with celebrities, historical figures, fictional characters, or even two famous people they are curious about. "What is the compatibility score between Taylor Swift and [name]" has been entered into tools like this more times than anyone wants to admit.'
  },
  {
    question: 'Is this scientifically accurate?',
    answer: 'No — and we say this upfront because it is important. There is no scientific evidence that name numerology or birth date compatibility predict relationship success. What research does show is that genuine compatibility involves shared values, communication patterns, attachment styles, and emotional maturity — things no calculator can measure from two names. Use this for fun, use therapy for the real work.'
  },
  {
    question: 'Why do couples get different scores when they swap the name order?',
    answer: 'The algorithm is slightly asymmetric by design — just as in real relationships, perspective matters. It is actually a fun feature to explore: you and your partner might each interpret the same relationship differently, and the swapped results give two slightly different compatibility profiles. Some couples find comparing both versions generates its own interesting conversation.'
  },
  {
    question: 'Can I use this for friendship or family compatibility?',
    answer: 'Yes — many people test compatibility with best friends, siblings, work partners, or roommates. The tool does not assume the relationship is romantic; it just generates compatibility insights based on the name and birth date inputs. "How compatible am I with my new roommate?" is a perfectly legitimate (and fun) use case.'
  },
  {
    question: 'What is a good compatibility score?',
    answer: 'The scoring runs from 0–100%, but do not panic at 60% or celebrate wildly at 95%. Real relationships thrive at all "scores" and fail at all "scores." The number is a starting point for playful discussion, not a verdict. Some of the most interesting results come from low-scoring pairs who find the mismatch areas surprisingly accurate.'
  },
  {
    question: 'Does it show compatibility by zodiac sign?',
    answer: 'Yes — based on your birth dates, the tool also shows your zodiac signs and their traditional compatibility rating alongside the numerology score. You get both systems\' takes in one result. Whether you lean more toward astrology or numerology, or neither, the combined view is genuinely entertaining.'
  },
  {
    question: 'Is the tool private?',
    answer: 'Completely. Names and dates you enter never leave your browser. No data is stored or shared anywhere. You can type in your actual name and partner\'s name or test fictional characters — either way, nothing is logged.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
