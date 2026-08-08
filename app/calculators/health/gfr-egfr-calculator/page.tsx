import { CalculatorBatch45DeepDive } from '@/components/ui/CalculatorBatch45DeepDive'
import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'eGFR Calculator — Kidney Function & CKD Stage 2026 | ToolTrio',
  description: 'Free eGFR (estimated GFR) kidney function calculator 2026. Uses CKD-EPI 2021 equation. Enter creatinine, age, and gender to get your eGFR, CKD stage, and kidney health guidance.',
  slug: 'gfr-egfr-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['eGFR calculator', 'kidney function calculator', 'CKD stage calculator', 'creatinine clearance calculator', 'estimated glomerular filtration rate calculator'],
})

const relatedCalculators = [{'name': 'Kidney Function (Cockcroft)', 'href': '/calculators/health/creatinine-clearance-calculator', 'icon': '🫘', 'desc': 'Creatinine clearance'}, {'name': 'Blood Pressure', 'href': '/calculators/health/blood-pressure-calculator', 'icon': '🩺', 'desc': 'AHA categories'}, {'name': 'Diabetes Risk', 'href': '/calculators/health/diabetes-risk-calculator', 'icon': '🩸', 'desc': 'Type 2 diabetes risk'}, {'name': 'Hydration', 'href': '/calculators/health/hydration-calculator', 'icon': '💧', 'desc': 'Daily fluid needs'}]

const faqs = [
  {"question": "What is eGFR and what does it measure?", "answer": "eGFR (estimated Glomerular Filtration Rate) measures how well your kidneys filter waste from your blood, expressed in mL/min/1.73m². This calculator uses the CKD-EPI 2021 equation, the current standard recommended by kidney disease guidelines worldwide. A normal eGFR is 90 or above. The test estimates GFR from serum creatinine level, age, and sex — without the 24-hour urine collection required for true measured GFR. It is the primary test used to diagnose and stage chronic kidney disease (CKD)."},
  {"question": "What are the 5 stages of chronic kidney disease by eGFR?", "answer": "CKD is staged by eGFR: G1 (≥90) = normal function with kidney damage markers; G2 (60-89) = mildly decreased; G3a (45-59) = mild-moderately decreased; G3b (30-44) = moderately-severely decreased; G4 (15-29) = severely decreased; G5 (<15) = kidney failure requiring dialysis or transplant. Early stages (G1-G2) often have no symptoms — routine creatinine testing is the only way to detect them. Management focuses on slowing progression through blood pressure control, blood sugar management (in diabetics), and limiting nephrotoxic medications."},
  {"question": "What factors cause eGFR to decrease?", "answer": "The most common causes of declining eGFR are diabetes (accounts for ~44% of new kidney failure cases), hypertension (28%), and glomerulonephritis. Other causes include repeated urinary tract infections, kidney stones, NSAID overuse, contrast dye from imaging, and certain antibiotics. Dehydration can temporarily lower eGFR. Creatinine-based eGFR is also affected by muscle mass — very muscular or very thin individuals may have misleadingly high or low creatinine readings, which is why cystatin-C is used as an alternative in ambiguous cases."}
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
          generateWebAppStructuredData({ name: 'eGFR Kidney Function Calculator', description: 'Free eGFR (estimated GFR) kidney function calculator 2026. Uses CKD-EPI 2021 equation. Enter creatin', url: 'https://tooltrio.com/calculators/health/gfr-egfr-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
          <CalculatorBatch45DeepDive slug="gfr-egfr-calculator" />
</>
  )
}
