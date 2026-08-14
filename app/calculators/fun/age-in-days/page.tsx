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
  title: 'Age in Days Calculator – How Old Am I? | ToolTrio',
  description: 'Find out exactly how many days, hours, minutes, and seconds you have been alive. Plus heartbeats, breaths taken, and wild life stats. Free, instant, no signup.',
  slug: 'age-in-days',
  keywords: [
    'how many days old am i',
    'age in days calculator',
    'how old am i in days',
    'calculate age in days',
    'age calculator days hours minutes seconds',
    'how many days have i been alive',
    'exact age calculator',
    'age in days from birthday',
    'tooltrio.com',
  ],
})

const faqs = [
  {
    question: 'How many days old is the average person?',
    answer: 'A 30-year-old is roughly 10,950 days old (accounting for leap years). Many people celebrate hitting 10,000 days as a personal milestone — it happens when you are about 27 years and 4 months old. Age in days gives you a surprisingly fresh way to think about how much time you have lived and appreciated.'
  },
  {
    question: 'How does the Age in Days Calculator count leap years?',
    answer: 'The calculator accounts for every leap year between your birth date and today. A leap year adds an extra day every 4 years (with century exceptions). Without this, calculations would be off by 6–7 days for most adults. Our tool gets it right to the exact calendar day.'
  },
  {
    question: 'Can I find out how many heartbeats I have had?',
    answer: 'Yes! The calculator estimates your lifetime heartbeats based on an average resting heart rate of around 70 beats per minute. By your 30th birthday you have pumped roughly 1.1 billion times without missing a single beat. It is a number that tends to make people appreciate their hearts a little more.'
  },
  {
    question: 'What other life stats does this show?',
    answer: 'Beyond total days, the tool shows approximate hours, minutes, seconds alive, estimated breaths taken (around 16 per minute while resting), and heartbeats. Think of it as a personal odometer for your body. It is designed to be mind-bending and shareable — great for birthday posts.'
  },
  {
    question: 'Is it accurate if I was born before midnight or in a different timezone?',
    answer: 'The calculator works from calendar date only, not exact birth time. If precision down to the hour matters to you, add the remaining hours mentally. For the vast majority of people, the date is more than accurate enough for this kind of fun life-stats exploration.'
  },
  {
    question: 'Can I use this for my pet or a historical figure?',
    answer: 'Absolutely — just enter any birth date. Whether you want to know how old your dog is in days, how long Abraham Lincoln lived in seconds, or how many days your favorite band has existed, the calculator handles any date from the 1800s onward.'
  },
  {
    question: 'How can I share my age in days on social media?',
    answer: 'Copy your result text and paste it into Instagram, Twitter/X, TikTok captions, or WhatsApp. A caption like "I am 11,203 days old today 🎂 how about you?" typically gets strong engagement. Many people screenshot the full stats card and post it as their birthday story.'
  },
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('age-in-days')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
