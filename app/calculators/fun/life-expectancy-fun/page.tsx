import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Fun Life Expectancy Calculator – Estimate How Long You Will Live',
  description: 'Get a quirky, lifestyle-based estimate of your life expectancy. Answer fun questions about sleep, diet, exercise, stress, and habits. Purely for entertainment. Free, no login.',
  slug: 'life-expectancy-fun',
  keywords: [
    'fun life expectancy calculator',
    'how long will I live calculator',
    'life expectancy calculator lifestyle',
    'quirky life expectancy test',
    'how many years do I have left calculator',
    'life expectancy quiz fun',
    'estimated life expectancy calculator free',
    'life expectancy based on habits',
    'life expectancy calculator sleep diet exercise',
    'how long will I live based on lifestyle',
    'life span calculator online free',
    'life expectancy test for fun',
    'will I live to 100 calculator',
    'life expectancy calculator no signup',
    'how long will I live quiz',
    'fun death calculator',
    'longevity quiz online',
    'years left to live calculator',
    'life expectancy calculator 2026',
    'how healthy am I calculator',
    'lifestyle longevity calculator',
    'life expectancy calculator viral',
    'share life expectancy result',
    'life expectancy factors calculator',
    'healthy habits life calculator',
    'tooltrio.com',
    'free calculator no signup',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'Is this a medically accurate life expectancy calculator?',
    answer: 'No — and that is intentional. This is a fun, lifestyle-based entertainment tool, not a clinical assessment. Actual life expectancy predictions require actuarial science, genetic data, and medical history. What this calculator does is reflect back some evidence-based lifestyle science in a lighthearted way, so you get a number with a fun personality rather than a morbid prognosis.'
  },
  {
    question: 'What lifestyle factors actually affect life expectancy most?',
    answer: 'The research is fairly consistent: not smoking adds roughly 7–10 years, regular physical activity adds 3–7 years, maintaining a healthy weight contributes 2–4 years, and strong social connections genuinely extend life by 5+ years. Poor sleep, chronic stress, and heavy alcohol use each shave years off. The calculator uses these factors in a simplified, entertainment-focused way.'
  },
  {
    question: 'Why does the calculator ask about my social life?',
    answer: 'Because loneliness is legitimately dangerous. Research from Brigham Young University found that social isolation increases mortality risk by about 29% — comparable to smoking 15 cigarettes a day. Strong social connections are one of the most consistently predictive factors in longevity studies. If the calculator asks about friendships, it is not being nosy; it is reflecting real science.'
  },
  {
    question: 'Can I add years by changing my habits?',
    answer: 'The calculator shows you a baseline result and then lets you toggle lifestyle changes to see the projected impact. Quitting smoking, adding 30 minutes of daily walking, or improving sleep quality each show their estimated year-adding effect. Think of it less as a prediction and more as a fun way to visualize how habits compound over a lifetime.'
  },
  {
    question: 'Does where I live affect my life expectancy?',
    answer: 'Significantly. Average life expectancy varies by more than 30 years between the longest-lived countries (Japan, Switzerland, Singapore at ~85) and the shortest-lived (some sub-Saharan African nations at ~55). Even within the US, zip code is a shockingly strong predictor — residents in some wealthy areas outlive those in poorer ones by 15+ years. The calculator factors in country of residence.'
  },
  {
    question: 'Is this appropriate to share with elderly relatives?',
    answer: 'Use judgment here. The tone is lighthearted, not morbid, and results are framed as fun estimates. For most people it is an entertaining conversation starter. For someone dealing with a terminal illness or serious health anxiety, a "how long will I live" tool is probably not the right choice. Context matters.'
  },
  {
    question: 'Is my health data stored anywhere?',
    answer: 'No. Every question you answer stays in your browser only. Nothing is sent to any server, stored in any database, or shared with anyone. Close the page and your data is gone. We take privacy seriously even for fun tools.'
  },
  {
    question: 'Can kids or teenagers use this calculator?',
    answer: 'The content is age-appropriate and framed positively — it emphasizes healthy habits rather than dwelling on mortality. That said, very young children may not have the emotional context to interpret "how long will I live" questions lightly. We would suggest it as a tool for teenagers and adults, ideally as a jumping-off point for conversations about healthy habits rather than a standalone activity.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
