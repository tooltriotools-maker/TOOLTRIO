import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Birthday Countdown Calculator – Days Until My Next Birthday',
  description: 'See exactly how many days, hours, minutes, and seconds until your next birthday. Live real-time countdown. Free, no login, works on any device.',
  slug: 'birthday-countdown',
  keywords: [
    'days until my birthday',
    'birthday countdown calculator',
    'how many days until my birthday',
    'next birthday countdown',
    'birthday countdown timer',
    'days until birthday calculator free',
    'how long until my birthday',
    'birthday countdown clock',
    'countdown to my birthday',
    'days until birthday 2026',
    'birthday countdown online free',
    'how many days left until birthday',
    'birthday countdown no signup',
    'real time birthday countdown',
    'seconds until my birthday',
    'hours until birthday calculator',
    'birthday countdown share',
    'birthday countdown instagram',
    'birthday countdown for kids',
    'next birthday age calculator',
    'when is my birthday again calculator',
    'birthday weeks countdown',
    'birthday countdown app online',
    'days until birthday 2026',
    'fun birthday tool online',
    'tooltrio.com',
    'free calculator no signup',
    'instant calculator results',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'Does the birthday countdown update in real time?',
    answer: 'Yes — the counter ticks down live, showing hours, minutes, and seconds remaining. You can leave the tab open and watch the numbers drop. It auto-flips to next year\'s countdown the moment midnight hits on your birthday.'
  },
  {
    question: 'What if my birthday is today?',
    answer: 'The calculator detects that and switches to a happy birthday message instead of a countdown. It will also show you what milestone age you are hitting, and then immediately begin counting down to your next one. A fun moment to screenshot and post.'
  },
  {
    question: 'Can I use this to count down to someone else\'s birthday?',
    answer: 'Totally. Enter any birthday — your partner, child, best friend, or celebrity you are weirdly invested in. The tool does not know who the date belongs to. It is great for planning surprise parties so you know exactly how many weeks you have to pull it together.'
  },
  {
    question: 'Does it account for leap year birthdays?',
    answer: 'Yes. If you were born on February 29th, the calculator recognizes your actual leap day birthday when it falls on a leap year, and calculates to February 28th in non-leap years — the most common convention. Either way you get a correct countdown.'
  },
  {
    question: 'How far ahead does it count?',
    answer: 'The calculator always finds your next upcoming birthday from today and counts to that. So even if you just had your birthday yesterday, it immediately starts counting the 364 or 365 days until the next one. A great reminder of how fast time moves.'
  },
  {
    question: 'Can I share my countdown on social media?',
    answer: 'Yes — grab a screenshot or copy the countdown result and post it anywhere. "Only 47 days until I\'m officially a quarter-century old 😱" tends to do well on Instagram Stories and Twitter. People love birthday content.'
  },
  {
    question: 'Is it free and does it store my date of birth?',
    answer: 'Free, always. No account, no email, no personal data stored. The countdown runs in your browser and your birth date never hits any server. Close the tab and it is gone. We built it to be fast and private by design.'
  },
  {
    question: 'Does it show what day of the week my birthday falls on?',
    answer: 'Yes! The result includes the exact day of the week for your upcoming birthday, so you can start planning whether it lands on a weekend (lucky you) or a Monday (our condolences). Knowing months in advance helps with booking restaurants, venues, or travel.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
