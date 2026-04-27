import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Sleep Debt Calculator – How Sleep Deprived Are You Really?',
  description: 'Calculate your accumulated sleep debt. Find out how many hours of sleep you owe your body, how long it takes to recover, and whether your weekend sleep-ins are actually helping.',
  slug: 'sleep-debt-calculator',
  keywords: [
    'sleep debt calculator',
    'how much sleep debt do I have',
    'am I sleep deprived calculator',
    'sleep deprivation calculator',
    'how many hours of sleep do I owe',
    'sleep deficit calculator',
    'sleep debt recovery calculator',
    'how to calculate sleep debt',
    'sleep debt buildup calculator',
    'weekly sleep debt calculator',
    'can you repay sleep debt calculator',
    'sleep deprivation effects calculator',
    'sleep hours needed calculator',
    'how much sleep do I need calculator',
    'sleep debt vs sleep need',
    'chronic sleep deprivation calculator',
    'sleep debt reset calculator',
    'weekend sleep catch up calculator',
    'sleep debt 2026',
    'sleep debt calculator no signup',
    'sleep quality calculator',
    'is sleeping in on weekends helping',
    'how tired am I calculator',
    'sleep debt share result',
    'sleep debt health impact calculator',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'What exactly is sleep debt?',
    answer: 'Sleep debt is the cumulative deficit between the sleep you need and the sleep you are actually getting. If you need 8 hours and get 6, you add 2 hours of sleep debt per night. After a five-day work week, that is 10 hours of debt — the equivalent of skipping an entire night of sleep. The calculator tracks this against your stated sleep need and sleep history.'
  },
  {
    question: 'How much sleep do adults actually need?',
    answer: 'The research consensus: most adults need 7–9 hours per night. About 1–3% of people are genuine "short sleepers" who function well on 6 or fewer hours — this is a rare genetic trait, not something you develop through practice. If you feel fine on 6 hours, you are either in that rare group or you have been sleep deprived long enough that your sense of normal has shifted. The calculator helps distinguish between the two.'
  },
  {
    question: 'Can you actually repay sleep debt by sleeping in on weekends?',
    answer: 'Partially, but not completely. Research from the University of Colorado found that weekend recovery sleep reduces some cognitive performance deficits from weekday sleep restriction. However, other impairments — including metabolic effects and emotional reactivity — do not fully recover. There is also a circadian cost: sleeping late on weekends shifts your internal clock, making Monday morning harder. The calculator shows how much debt your current pattern leaves unresolved.'
  },
  {
    question: 'What are the real effects of chronic sleep debt?',
    answer: 'The list is extensive and well-documented: impaired memory consolidation, reduced decision-making quality, increased emotional reactivity, suppressed immune function, elevated cortisol, higher cardiovascular disease risk, increased appetite (particularly for high-calorie foods), and reduced testosterone. Cognitive impairment from sustained sleep restriction is comparable to mild alcohol intoxication — and unlike alcohol, sleep-deprived people are often unaware of how impaired they are.'
  },
  {
    question: 'How long does it take to fully recover from sleep debt?',
    answer: 'For short-term debt (a few nights of poor sleep), one or two full recovery nights largely restores performance. For chronic debt accumulated over weeks or months, research suggests it can take two to three weeks of adequate sleep to fully restore baseline cognitive function and hormonal balance. The calculator estimates your personal recovery timeline based on the debt you have accumulated.'
  },
  {
    question: 'Does the quality of sleep matter as much as quantity?',
    answer: 'Significantly. Eight hours of interrupted or shallow sleep does not provide the same restoration as seven hours of uninterrupted, deep sleep. The calculator has an optional sleep quality input — if you frequently wake up, have poor sleep hygiene, or suspect a sleep disorder, you can adjust your effective sleep hours downward. This gives a more accurate debt estimate than raw hours alone.'
  },
  {
    question: 'Should I be worried if my sleep debt is high?',
    answer: 'High sleep debt is common and addressable, not a cause for panic. The calculator is designed to create awareness, not anxiety. If you are carrying significant chronic debt, the practical steps are consistent: protect a regular sleep schedule, limit alcohol (which fragments sleep despite feeling sedating), and create a dark, cool sleep environment. If you implement these and still struggle, talking to a doctor about a potential sleep disorder is worthwhile.'
  },
  {
    question: 'Is the calculator free?',
    answer: 'Yes — free, no account, no email. The irony of losing sleep time to use a sleep debt calculator is not lost on us. We made it fast. Go to bed.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
