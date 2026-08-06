import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Waist-to-Hip Ratio Calculator — WHR & Cardiovascular Risk 2026 | ToolTrio',
  description: 'Free waist-to-hip ratio (WHR) calculator 2026. Calculate your WHR and cardiovascular disease risk using WHO thresholds. Includes ideal waist target and metabolic syndrome indicator.',
  slug: 'waist-hip-ratio-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['waist hip ratio calculator', 'WHR calculator cardiovascular risk', 'waist to hip ratio health risk', 'apple vs pear body shape calculator', 'abdominal obesity calculator WHR'],
})

const relatedCalculators = [{'name': 'Waist-to-Height Ratio', 'href': '/calculators/health/waist-to-height-ratio-calculator', 'icon': '📐', 'desc': 'WHtR health predictor'}, {'name': 'Body Fat', 'href': '/calculators/health/body-fat-calculator', 'icon': '💪', 'desc': 'Body fat %'}, {'name': 'BMI Calculator', 'href': '/calculators/health/bmi-calculator', 'icon': '⚖️', 'desc': 'Body mass index'}, {'name': 'Metabolic Age', 'href': '/calculators/health/metabolic-age-calculator', 'icon': '⚡', 'desc': 'Metabolic age'}]

const faqs = [
  {"question": "What does WHR actually predict?", "answer": "The WHR is a measure of central adiposity — the distribution of body fat between the waist and hips. A high WHR (apple shape) indicates excess visceral fat — the metabolically active fat stored around organs in the abdominal cavity. Visceral fat secretes inflammatory cytokines and free fatty acids that directly contribute to insulin resistance, dyslipidemia, hypertension, and cardiovascular disease. Research consistently shows WHR predicts cardiovascular disease, metabolic syndrome, and all-cause mortality independently of BMI — two people with identical BMIs but different WHRs have very different cardiometabolic risk profiles."},
  {"question": "What is a healthy waist-to-hip ratio?", "answer": "The World Health Organization (WHO) thresholds for cardiometabolic risk: Men — low risk: ≤ 0.85; high risk: > 0.90. Women — low risk: ≤ 0.80; high risk: > 0.85. In the INTERHEART study of 27,000 people in 52 countries, WHR was a better predictor of myocardial infarction risk than BMI, waist circumference alone, or waist-height ratio. People in the highest WHR quintile had a 2.5× higher heart attack risk than the lowest quintile. The most risk-predictive WHR thresholds are population-specific — Asian populations may have significant visceral fat at lower absolute WHR values."},
  {"question": "Is it possible to spot-reduce abdominal fat?", "answer": "No — spot reduction is a persistent fitness myth unsupported by research. You cannot selectively burn fat from the waist through core exercises. However, visceral (abdominal) fat is preferentially mobilized during overall fat loss compared to subcutaneous fat, meaning it responds faster to caloric restriction and exercise than fat in other areas. Studies show that 10% total body weight loss reduces visceral fat by approximately 30%. High-intensity interval training (HIIT) and moderate-intensity cardio both reduce visceral fat effectively, with HIIT showing slightly superior results per time unit."}
]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Waist-to-Hip Ratio Calculator', description: 'Free waist-to-hip ratio (WHR) calculator 2026. Calculate your WHR and cardiovascular disease risk us', url: 'https://tooltrio.com/calculators/health/waist-hip-ratio-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
