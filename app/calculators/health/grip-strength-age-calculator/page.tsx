import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Grip Strength Calculator — Age Percentile & Mortality Risk | ToolTrio',
  description: 'Free grip strength calculator 2026. Find your grip strength percentile by age and gender. Grip strength is a validated predictor of all-cause mortality, disability, and longevity — discover where you rank.',
  slug: 'grip-strength-age-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['grip strength calculator', 'grip strength age percentile', 'grip strength mortality risk', 'dynamometer score calculator', 'handgrip strength norms by age'],
})

const relatedCalculators = [{'name': 'One-Rep Max', 'href': '/calculators/health/one-rep-max-calculator', 'icon': '🏋️', 'desc': 'Strength standards'}, {'name': 'Lean Body Mass', 'href': '/calculators/health/lean-body-mass-calculator', 'icon': '💪', 'desc': 'Fat-free mass'}, {'name': 'Body Age', 'href': '/calculators/health/body-age-calculator', 'icon': '🧬', 'desc': 'Biological age'}, {'name': 'Frailty Index', 'href': '/calculators/health/frailty-index-calculator', 'icon': '🧓', 'desc': 'Frailty assessment'}]

const faqs = [
  {"question": "Why is grip strength linked to longevity?", "answer": "Grip strength is one of the strongest single-measure predictors of all-cause mortality in research. A landmark Lancet study of 140,000 people in 17 countries found that a 5 kg decrease in grip strength was associated with a 16% higher risk of death from any cause, 17% higher cardiovascular death, and 9% higher stroke risk — stronger associations than blood pressure. Grip strength serves as a proxy for overall musculoskeletal health, nutritional status, and neurological function. It reflects the total-body lean mass that drives metabolic health."},
  {"question": "What is the clinical threshold for low grip strength?", "answer": "Clinical guidelines define low grip strength as below 26 kg for men and below 16 kg for women (using the dominant hand). These thresholds were established by the European Working Group on Sarcopenia (EWGSOP2) and are used to diagnose sarcopenia. Below these thresholds, research consistently shows approximately 2× higher mortality risk. The World Health Organization (WHO) now recognizes sarcopenia as a disease, emphasizing that preserving muscle mass and strength is a legitimate medical treatment goal."},
  {"question": "How can I improve grip strength?", "answer": "Grip strength responds well to targeted training. Dead hangs (hanging from a bar for 30-60 seconds) and farmer's carries (walking with heavy dumbbells at your sides) are the two most effective exercises. Heavy pulling movements — deadlifts, rows, pull-ups — significantly develop grip as a secondary benefit. For rehabilitation contexts, progressive resistance with a hand gripper (squeeze-hold-release, 3×15 daily) produces measurable gains in 6-8 weeks. Older adults should incorporate forearm and grip-specific work into strength training programs."}
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
          generateWebAppStructuredData({ name: 'Grip Strength Age Percentile Calculator', description: 'Free grip strength calculator 2026. Find your grip strength percentile by age and gender. Grip stren', url: 'https://tooltrio.com/calculators/health/grip-strength-age-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
