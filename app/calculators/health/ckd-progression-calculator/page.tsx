import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'CKD Progression Calculator — Kidney Disease Timeline 2026 | ToolTrio',
  description: 'Free CKD progression calculator 2026. Estimate kidney disease progression rate, years to dialysis, and overall CKD risk from eGFR trend, proteinuria, blood pressure, and diabetes status.',
  slug: 'ckd-progression-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['CKD progression calculator', 'kidney disease progression rate', 'eGFR decline calculator', 'years to dialysis calculator', 'chronic kidney disease risk calculator'],
})

const relatedCalculators = [{'name': 'eGFR Kidney Function', 'href': '/calculators/health/gfr-egfr-calculator', 'icon': '🫘', 'desc': 'eGFR from creatinine'}, {'name': 'Blood Pressure', 'href': '/calculators/health/blood-pressure-calculator', 'icon': '🩺', 'desc': 'BP categories'}, {'name': 'Diabetes Risk', 'href': '/calculators/health/diabetes-risk-calculator', 'icon': '🩸', 'desc': 'T2D risk'}, {'name': 'Hydration', 'href': '/calculators/health/hydration-calculator', 'icon': '💧', 'desc': 'Daily fluid needs'}]
const faqs = [('What is a normal eGFR decline rate?', 'Normal age-related eGFR decline is approximately 0.5–1.0 mL/min/1.73m² per year after age 40. In people with CKD, annual decline ranges widely — from 1–2 mL/min/year (slow progressors who may never reach dialysis) to over 5–10 mL/min/year (rapid progressors). The CKD-REIN study found proteinuria, blood pressure, and diabetes status are the strongest predictors of progression rate. An eGFR decline of more than 5 mL/min/1.73m² in one year warrants urgent nephrology evaluation.'), ('How does proteinuria affect kidney disease progression?', 'Proteinuria (protein in urine) is both a marker and a cause of kidney damage. Even microalbuminuria (30–300 mg/day) doubles CKD progression risk. Overt proteinuria above 300 mg/day increases progression risk 5-10×. Mechanically, the protein itself is toxic to tubular cells as it passes through the filtration barrier. ACE inhibitors and ARBs reduce proteinuria by 40–50% and slow progression independently of their blood pressure effect — they are first-line therapy for any CKD with proteinuria, regardless of blood pressure.'), ('What lifestyle changes slow CKD progression?', 'The most evidence-backed interventions: (1) Blood pressure control to < 130/80 mmHg (especially with proteinuria) — slows progression 20–30%; (2) ACE inhibitor or ARB if proteinuria present — slows progression 25–35%; (3) SGLT2 inhibitors (dapagliflozin, empagliflozin) now have Level 1A evidence for CKD progression reduction regardless of diabetes; (4) Smoking cessation; (5) Protein restriction to 0.6–0.8 g/kg/day in stage 4–5; (6) NSAID avoidance; (7) Weight loss in obesity. The combination of optimal BP + ACE/ARB + SGLT2i can reduce progression by over 40%.')]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient faqs={faqs} structuredData={[generateFAQStructuredData(faqs), generateWebAppStructuredData({ name: 'CKD Progression Risk Calculator', description: 'Free CKD progression calculator 2026. Estimate kidney disease progression rate, years to dialysis, a', url: 'https://tooltrio.com/calculators/health/ckd-progression-calculator', category: 'HealthApplication' })]} relatedCalculators={relatedCalculators} />
    </>
  )
}
