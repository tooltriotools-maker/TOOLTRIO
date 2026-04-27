import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Lucky Number Calculator – Find Your Life Path & Lucky Numbers',
  description: 'Calculate your life path number, expression number, and personal lucky numbers from your name and birthday using numerology. Free, instant, no signup needed.',
  slug: 'lucky-number',
  keywords: [
    'lucky number calculator',
    'life path number calculator',
    'numerology calculator free',
    'what is my lucky number',
    'life path number meaning',
    'how to find my lucky number',
    'lucky number by birthday',
    'lucky number by name',
    'numerology life path calculator',
    'expression number calculator',
    'soul urge number calculator',
    'birth number calculator',
    'personality number numerology',
    'master number 11 22 33 calculator',
    'numerology reading free online',
    'lucky number for lottery',
    'lucky number 2026',
    'my lucky number today',
    'what does my life path number mean',
    'life path 1 2 3 4 5 6 7 8 9 meaning',
    'numerology calculator no signup',
    'best numerology calculator 2026',
    'free lucky number online',
    'lucky number generator name birthday',
    'numerology compatibility',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What is a life path number and how is it calculated?',
    answer: 'Your life path number is the single most important number in numerology — calculated by reducing your full birth date to a single digit (or master number). For example, if you were born on July 14, 1992: 7 + 1 + 4 + 1 + 9 + 9 + 2 = 33, which reduces to 6. The exceptions are master numbers 11, 22, and 33, which are not reduced further because they carry special significance in numerological tradition.'
  },
  {
    question: 'What is the difference between a lucky number and a life path number?',
    answer: 'Your life path number describes your core personality traits and life purpose according to numerology. Lucky numbers are specific numbers believed to bring favorable outcomes in day-to-day decisions — lottery picks, choosing dates, or even house numbers. The calculator generates both: your foundational life path number and several lucky numbers derived from the numerological breakdown of your full name and birth date.'
  },
  {
    question: 'Are master numbers (11, 22, 33) actually different from regular numbers?',
    answer: 'In numerology, yes — master numbers are not reduced to a single digit because they are considered to carry amplified energy. Life path 11 is associated with intuition and spiritual insight, 22 with master building and large-scale ambitions, and 33 with teaching, healing, and compassion. Only about 8–10% of people have master numbers, which adds to their perceived significance in numerological circles.'
  },
  {
    question: 'Should I use this to pick lottery numbers?',
    answer: 'You can — plenty of people do. But to be straight with you: lottery draws are random, and no numerological system has been shown to influence random outcomes. The lucky numbers generated here are meaningful in the entertainment and symbolic sense, not the statistical sense. Use them for fun or as a starting point for your own picks, but do not bet the rent on them.'
  },
  {
    question: 'Can the same person have multiple lucky numbers?',
    answer: 'Yes — the calculator typically produces 5–7 lucky numbers based on different numerological inputs: your birth day number, your name expression number, your birth month number, and others. Different numbers may be more relevant for different situations. Some numerologists suggest specific numbers for financial decisions, relationships, or travel. The calculator explains each number\'s traditional association.'
  },
  {
    question: 'Does my lucky number change over time?',
    answer: 'Your life path and expression numbers are fixed, derived from your birth date and birth name. But numerology also includes "personal year numbers" that cycle annually, giving you a different energetic theme each year. The calculator focuses on your core fixed numbers, but mentions your current personal year number as a bonus.'
  },
  {
    question: 'Is numerology a real science?',
    answer: 'No — numerology is a metaphysical tradition with ancient roots in Pythagorean philosophy, Babylonian mathematics, and various mystical traditions. There is no scientific evidence supporting numerological predictions. That said, many people find value in it as a framework for self-reflection, much like personality type systems. Use it as a lens, not a rulebook.'
  },
  {
    question: 'Is the calculator free and does it store my name or birthday?',
    answer: 'Completely free, no account needed. Your name and birthday are processed entirely in your browser — nothing is sent to any server or stored anywhere. The calculation happens locally and your data disappears when you close the tab.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
