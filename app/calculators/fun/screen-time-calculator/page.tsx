import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Screen Time Calculator – How Much of Your Life Is Spent on Screens?',
  description: 'Calculate your lifetime screen time — phone, TV, computer combined. See it in years, books you could have read, and miles you could have walked. Free, instant, no login.',
  slug: 'screen-time-calculator',
  keywords: [
    'screen time calculator',
    'lifetime screen time calculator',
    'how much time do I spend on my phone',
    'daily screen time calculator',
    'screen time life calculator',
    'phone addiction calculator',
    'how many hours on phone per year',
    'lifetime phone usage calculator',
    'screen time vs sleep comparison',
    'how much time wasted on phone',
    'social media screen time calculator',
    'years spent on phone calculator',
    'screen time reality check',
    'screen time calculator free online',
    'screen time calculator no signup',
    'how much of my life on screen',
    'screen time awareness tool',
    'reduce screen time calculator',
    'screen time vs life goals calculator',
    'screen time wake up call',
    'screen time addiction calculator',
    'average screen time per day calculator',
    'screen time 2026 statistics',
    'screen time calculator share result',
    'eye-opening screen time calculator',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How much screen time is the average person getting?',
    answer: 'Recent data puts average daily screen time at around 6–7 hours for adults in developed countries, when you combine phones, computers, and TV. That is roughly 42–49 hours per week — more than a full-time job. By age 70, that adds up to about 19–22 years of waking life spent looking at screens. The calculator visualizes your personal version of this number.'
  },
  {
    question: 'What does the calculator show besides total hours?',
    answer: 'It converts your lifetime screen time into vivid alternative comparisons: how many books you could have read at average reading pace, how many miles you could have walked, how many new skills you could have learned (at 20 minutes of practice per day), how many times you could have cooked a meal, and how many good friendships you could have invested in. The comparisons are designed to make the abstract number feel real.'
  },
  {
    question: 'Is screen time actually bad for you?',
    answer: 'It depends heavily on what you are doing and how much. Passive consumption (doomscrolling, binge watching) is associated with worse mental health outcomes, reduced attention span, and poorer sleep — especially before bed. Active screen use (creating, connecting, learning) has more mixed evidence. The calculator is not anti-screen; it is pro-awareness. Knowing your number helps you decide if you are happy with it.'
  },
  {
    question: 'Can I enter different screen types separately?',
    answer: 'Yes — the calculator lets you input your daily phone time, TV/streaming time, work computer time, and leisure computer time separately. Work screen time is treated differently from leisure time in the results because it is not really discretionary in the same way. The breakdown helps you see where the biggest opportunities for change actually are.'
  },
  {
    question: 'How does screen time affect sleep?',
    answer: 'Blue light from screens suppresses melatonin production — the hormone that signals your body to sleep. Research consistently shows that even one hour of phone use within 90 minutes of bedtime delays sleep onset, reduces deep sleep stages, and results in lower overall sleep quality. The calculator notes if your daily pattern likely overlaps with your sleep window.'
  },
  {
    question: 'What is a healthy amount of daily screen time for adults?',
    answer: 'No organization has set a hard adult limit, unlike the 2-hour guideline for children under 12. Most experts suggest a useful question is: does your screen time come at the cost of things that matter more to you — sleep, exercise, in-person relationships, focused work? If yes, that is more informative than any hourly number. The calculator frames results around your own stated priorities.'
  },
  {
    question: 'Can I use this to motivate myself to cut back?',
    answer: 'That is exactly what it is designed for. Seeing "I will spend 6 more years on my phone before I die if I keep this up" tends to be more motivating than generic advice. You can also use the interactive slider to see how much life you get back by cutting just 30 or 60 minutes per day — the lifetime impact of small daily changes is often surprisingly large.'
  },
  {
    question: 'Is this free?',
    answer: 'Yes, completely free. No account, no email, no data stored. The irony of building a screen time calculator that you have to use a screen to access is not lost on us. We kept it fast so you can get in and out quickly.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
