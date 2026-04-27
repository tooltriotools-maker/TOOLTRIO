import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Coffee Calculator – How Much Caffeine Have I Had in My Lifetime?',
  description: 'Calculate your lifetime coffee consumption, total caffeine intake, money spent on coffee, and how many cups you will drink before retirement. Free and instant.',
  slug: 'coffee-calculator',
  keywords: [
    'lifetime coffee calculator',
    'how much coffee have i drunk in my life',
    'lifetime caffeine intake calculator',
    'how much money have i spent on coffee',
    'coffee addiction calculator',
    'cups of coffee per year calculator',
    'caffeine consumption calculator',
    'coffee cost calculator lifetime',
    'how many cups of coffee in a lifetime',
    'coffee spending calculator',
    'daily caffeine calculator',
    'is my coffee habit expensive',
    'coffee vs sleep calculator',
    'how much caffeine is too much',
    'coffee calculator 2026',
    'coffee habit tracker online free',
    'fun coffee stats calculator',
    'how much do I spend on coffee a year',
    'coffee money wasted calculator',
    'coffee calorie calculator',
    'coffee withdrawal calculator',
    'how many espresso shots in a lifetime',
    'coffee addict quiz calculator',
    'caffeine half life calculator',
    'coffee savings calculator',
    'tooltrio.com',
    'free calculator no signup',
    'instant calculator results',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How many cups of coffee does the average person drink in a lifetime?',
    answer: 'Americans drink about 2.1 cups per day on average. Over a 60-year coffee-drinking career (roughly age 18 to 78), that is around 46,000 cups. At $4 per cup from a coffee shop, you are looking at $184,000 in a lifetime — which is why the results tend to make people reconsider their Starbucks habit.'
  },
  {
    question: 'How does the calculator estimate my lifetime caffeine intake?',
    answer: 'It uses your daily cup count, your preferred brew type (espresso, drip, cold brew, etc.), and your age to calculate cumulative caffeine. A typical 8 oz drip coffee has about 95 mg of caffeine. Cold brew concentrate can hit 200 mg per cup. The calculator picks the right average for your brew style.'
  },
  {
    question: 'Can I see how much money I have spent on coffee?',
    answer: 'Yes — enter whether you mainly brew at home or buy out, and the calculator estimates your spending over the years. Home brewing costs around $0.25–0.50 per cup. Café drinks average $4–6. The lifetime difference between those two habits runs into the tens of thousands of dollars. It is a fun number to see, even if slightly painful.'
  },
  {
    question: 'Does caffeine actually help with productivity or is it a myth?',
    answer: 'The science is real — caffeine blocks adenosine receptors in the brain that promote drowsiness, improving alertness and reaction time for about 4–6 hours. The calculator shows your caffeine half-life timing so you know when that morning coffee stops working and why you are crashing at 2 PM.'
  },
  {
    question: 'How many cups of coffee per day is too many?',
    answer: 'The FDA and most health organizations consider up to 400 mg of caffeine per day safe for healthy adults — roughly 4 standard cups of drip coffee. Beyond that, anxiety, heart palpitations, and sleep disruption become common. The calculator flags if your daily intake approaches the upper threshold.'
  },
  {
    question: 'Does the calculator count espresso shots differently?',
    answer: 'Yes. A single espresso shot (1 oz) has about 63 mg of caffeine — less per serving than drip coffee — but since most drinks use doubles (126 mg), and people often have 2–3 per day, it adds up fast. The tool accounts for serving size and drink type rather than just counting "cups."'
  },
  {
    question: 'Is this tool free?',
    answer: 'Completely free, no account needed. We run no ads on the tool itself. The irony of building a free coffee calculator while everyone in the team drinks $6 oat milk lattes is not lost on us.'
  },
  {
    question: 'Can I use this to calculate coffee for a group or office?',
    answer: 'Absolutely — just multiply. If your team of 10 each drinks 3 cups daily, that is 30 cups, roughly 2,850 mg of caffeine per day circulating through your office. That might explain the meeting energy. Enter combined numbers for a fun team stat.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
