import type { Metadata } from 'next'
import { generateFunToolMetadata } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateFunToolMetadata({
  title: 'Calories in Beer Calculator – How Many Calories in a Beer?',
  description: 'Calculate calories in any beer by type, ABV, and serving size. Find out how long it takes to burn off those pints. Free, instant, no login needed.',
  slug: 'calories-in-beer',
  keywords: [
    'calories in beer calculator',
    'how many calories in a beer',
    'beer calories by ABV',
    'lager calories calculator',
    'IPA calories calculator',
    'beer calorie counter',
    'pint of beer calories',
    'alcohol calorie calculator',
    'beer vs wine calories',
    'beer calories and carbs',
    'how to burn off beer calories',
    'craft beer calorie calculator',
    'calories in a pint of beer UK',
    'beer calorie calculator oz',
    'light beer calories vs regular',
    'calories in beer 2026',
    'low calorie beer comparison',
    'how much exercise to burn a beer',
    'beer gut calculator',
    'alcohol calories tool online',
    'free beer calories calculator',
    'calories in beer no signup',
    'drink calorie tracker free online',
    'beer calorie comparison tool',
    'beer and weight calculator',
    'fun drink calculator',
    'tooltrio.com',
    'free calculator no signup',
    'instant calculator results',
    'fun calculator online free'
  ],
})

const faqs = [
  {
    question: 'How many calories are in a typical beer?',
    answer: 'A standard 12 oz (355 ml) regular lager sits around 150 calories. Light beers drop to about 100 calories. IPAs and craft ales can hit 200–250+ calories per pint because of higher ABV and residual sugars. The calculator uses your specific beer type and ABV to give you a more accurate number than a generic estimate.'
  },
  {
    question: 'Where do the calories in beer actually come from?',
    answer: 'Alcohol itself is the biggest culprit — at 7 calories per gram, it is almost as calorie-dense as fat. Residual carbohydrates (from unfermented malt sugars) add the rest. Light beers reduce calories by fermenting more of those sugars and often using lower-ABV recipes.'
  },
  {
    question: 'How long does it take to burn off a pint of beer?',
    answer: 'That depends on your weight and how you work out. A 160 lb person burns roughly one pint of lager in about 25–35 minutes of running or 45–60 minutes of walking. The calculator estimates burn time for several activity types so you can decide if that second round is worth it.'
  },
  {
    question: 'Does beer have more calories than wine or spirits?',
    answer: 'Not always. A standard 5 oz glass of wine is around 120–130 calories — comparable to a light beer. However, craft beers and stouts often pack far more than wine. Spirits are low calorie on their own (~65 cal per shot) but cocktail mixers can triple that. This calculator focuses on beer specifically.'
  },
  {
    question: 'Are the calories different for UK pints vs US pints?',
    answer: 'Yes — a UK pint is 568 ml versus a US pint at 473 ml. That difference adds roughly 30–50 extra calories per pint. The calculator lets you select your serving size so results are accurate whether you are drinking in a London pub or a New York bar.'
  },
  {
    question: 'Can I use this for cider, hard seltzer, or craft ales?',
    answer: 'Yes. The calculator lets you input ABV manually so it works for any alcoholic drink, not just mainstream lagers. Hard seltzers (around 4.5% ABV) typically land around 100 calories per 12 oz. Imperial stouts at 10% ABV can hit 300 calories per pint.'
  },
  {
    question: 'Is this tool medically accurate enough to use for dieting?',
    answer: 'It gives solid ballpark estimates useful for general awareness. For clinical diet tracking, consult a registered dietitian. But honestly, most people find this eye-opening enough to make smarter drink choices without needing clinical precision. Knowing your Saturday night pints equal a full meal is usually enough motivation.'
  },
  {
    question: 'Is it free and private?',
    answer: 'Yes, completely free. No account needed. Nothing you enter is stored or sent anywhere — all calculations run locally in your browser. Drink up your privacy.'
  },
]

export default function Page() { return <CalculatorClient faqs={faqs} /> }
