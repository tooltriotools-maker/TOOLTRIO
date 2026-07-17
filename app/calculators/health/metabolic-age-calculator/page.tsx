import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Metabolic Age Calculator — Is Your Body Older Than You Think? | ToolTrio',
  description: 'Free metabolic age calculator 2026. Calculate your metabolic age vs chronological age based on BMI, resting heart rate, fitness level, and waist-to-height ratio. Discover how your lifestyle affects biological aging.',
  slug: 'metabolic-age-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['metabolic age calculator', 'biological age calculator', 'metabolic age vs chronological age', 'body age calculator', 'how to calculate metabolic age free'],
})

const relatedCalculators = [{'name': 'Body Age Calculator', 'href': '/calculators/health/body-age-calculator', 'icon': '🧬', 'desc': 'Biological age'}, {'name': 'BMR Calculator', 'href': '/calculators/health/bmr-calculator', 'icon': '❤️', 'desc': 'Resting metabolism'}, {'name': 'Longevity Calculator', 'href': '/calculators/health/longevity-calculator', 'icon': '♾️', 'desc': 'Life expectancy'}, {'name': 'Waist-to-Height Ratio', 'href': '/calculators/health/waist-to-height-ratio-calculator', 'icon': '📏', 'desc': 'Abdominal obesity'}]

const faqs = [('What is metabolic age?', 'Metabolic age compares your Basal Metabolic Rate (BMR) to the average BMR of people at various chronological ages. If your BMR matches what is typical for a 35-year-old but you are 45, your metabolic age is 35. A younger metabolic age indicates a healthier, more efficient metabolism — typically reflecting greater lean muscle mass, better cardiovascular fitness, lower body fat percentage, and better metabolic health markers. Unlike biological age (which measures cellular aging), metabolic age specifically captures cardiometabolic fitness.'), ('What factors increase metabolic age?', 'The main drivers of elevated metabolic age are: excess body fat (especially visceral/abdominal fat), muscle loss from inactivity (sarcopenia), high resting heart rate from poor cardiovascular fitness, sedentary lifestyle, poor sleep quality, chronic stress (elevates cortisol which promotes fat storage and muscle breakdown), and high sugar intake (drives insulin resistance and glycation). The encouraging finding from research is that most of these factors are highly responsive to lifestyle changes — metabolic age can measurably improve within 8-12 weeks of consistent exercise and dietary improvement.'), ('How can I lower my metabolic age?', 'The most effective strategies to reduce metabolic age are: (1) Resistance training 3-4×/week to preserve and build lean muscle mass (muscle is the primary driver of a high BMR); (2) Consistent cardiovascular exercise to lower resting heart rate and improve cardiorespiratory fitness; (3) Reducing processed carbohydrates and added sugar to improve insulin sensitivity; (4) High protein intake (1.6+ g/kg/day) to support muscle synthesis; (5) Prioritizing 7-9 hours of sleep (poor sleep acutely increases cortisol, causing fat storage and muscle breakdown); (6) Reducing waist circumference through diet — central fat is the most metabolically harmful depot.')]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Metabolic Age Calculator', description: 'Free metabolic age calculator 2026. Calculate your metabolic age vs chronological age based on BMI, ', url: 'https://tooltrio.com/calculators/health/metabolic-age-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
