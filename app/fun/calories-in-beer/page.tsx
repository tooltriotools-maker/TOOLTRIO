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
  title: 'Calories in Beer Calculator | ToolTrio',
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
    'tooltrio.com',
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
]

export default function Page() {
  const _structuredData = generateFunToolStructuredDataFromSlug('calories-in-beer')
  const _faqSchema = generateFAQStructuredData(faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} />
    </>
  )
}
