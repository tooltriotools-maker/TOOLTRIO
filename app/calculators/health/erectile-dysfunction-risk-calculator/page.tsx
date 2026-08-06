import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Erectile Dysfunction Risk Calculator — ED Risk Factors 2026 | ToolTrio',
  description: 'Free erectile dysfunction (ED) risk calculator 2026. Assess your ED risk from age, BMI, diabetes, hypertension, cardiovascular disease, smoking, exercise, and depression.',
  slug: 'erectile-dysfunction-risk-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['erectile dysfunction risk calculator', 'ED risk assessment', 'erectile dysfunction causes calculator', 'ED prevention calculator free', 'erectile dysfunction age risk calculator'],
})

const relatedCalculators = [{'name': 'Testosterone Age', 'href': '/calculators/health/testosterone-age-calculator', 'icon': '⚡', 'desc': 'Testosterone optimization'}, {'name': 'Diabetes Risk', 'href': '/calculators/health/diabetes-risk-calculator', 'icon': '🩸', 'desc': 'T2D risk score'}, {'name': 'Heart Attack Risk', 'href': '/calculators/health/heart-attack-risk-calculator', 'icon': '❤️\u200d🔥', 'desc': 'ASCVD risk'}, {'name': 'BMI Calculator', 'href': '/calculators/health/bmi-calculator', 'icon': '⚖️', 'desc': 'Body mass index'}]
const faqs = [
  {"question": "How common is erectile dysfunction and who does it affect?", "answer": "ED affects approximately 30 million men in the United States. Prevalence rises sharply with age: approximately 12% of men in their 40s, 22% in their 50s, 30% in their 60s, and over 50% in their 70s. However, ED is not an inevitable consequence of aging — it is strongly associated with modifiable cardiovascular risk factors. ED and cardiovascular disease share the same underlying pathology (endothelial dysfunction and atherosclerosis), and ED is now recognized as a cardiovascular warning sign: men with ED and no known heart disease have a 2-3× higher risk of future cardiovascular events."},
  {"question": "What is the link between ED and heart disease?", "answer": "The penile arteries are small-caliber vessels that show atherosclerosis earlier than larger coronary arteries. The Princeton III Consensus recommends that men under 70 with unexplained ED be evaluated for cardiovascular risk. Studies show that men with new-onset ED have a 10-year risk of major cardiovascular events 2× higher than age-matched controls, and ED typically precedes coronary artery disease by 3-5 years — making it an early warning sign. PDE5 inhibitors (sildenafil/Viagra) work by potentiating nitric oxide signaling, the same pathway impaired by endothelial dysfunction in cardiovascular disease."},
  {"question": "What lifestyle changes most effectively improve erectile function?", "answer": "The Massachusetts Male Aging Study and subsequent trials identify the most effective interventions: (1) Aerobic exercise — 40 min, 4×/week reduces ED severity by 25-30% in men with moderate ED; (2) Mediterranean diet — associated with 40% lower ED prevalence; (3) Weight loss — 10% body weight reduction in obese men significantly improves erectile function; (4) Smoking cessation — doubles blood flow to penile tissue within months; (5) Reducing alcohol — heavy drinking is both a psychological and physiological suppressant of erectile function; (6) Sleep optimization — testosterone production occurs during REM sleep; (7) Managing depression and anxiety — psychological factors account for 20-30% of ED cases."}
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
          generateWebAppStructuredData({ name: 'Erectile Dysfunction Risk Calculator', description: 'Free erectile dysfunction (ED) risk calculator 2026. Assess your ED risk from age, BMI, diabetes, hy', url: 'https://tooltrio.com/calculators/health/erectile-dysfunction-risk-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
