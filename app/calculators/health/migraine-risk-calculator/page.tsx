import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData } from '@/lib/seo/metadata'
import dynamic from 'next/dynamic'
const CalculatorClient = dynamic(() => import('./CalculatorClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Migraine Risk Calculator — Triggers & Prevention Score 2026 | ToolTrio',
  description: 'Free migraine risk and burden calculator 2026. Assess your migraine risk factors including frequency, sleep, stress, hormones, caffeine, and family history. Get a personalized prevention strategy.',
  slug: 'migraine-risk-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['migraine risk calculator', 'migraine trigger calculator', 'migraine prevention score', 'chronic migraine calculator', 'migraine burden assessment free'],
})

const relatedCalculators = [{'name': 'Stress Level', 'href': '/calculators/health/stress-level-calculator', 'icon': '🧘', 'desc': 'PSS-10 stress score'}, {'name': 'Sleep Cycle', 'href': '/calculators/health/sleep-cycle-calculator', 'icon': '😴', 'desc': 'Sleep timing'}, {'name': 'Caffeine Half-Life', 'href': '/calculators/health/caffeine-half-life-calculator', 'icon': '☕', 'desc': 'Caffeine clearance'}, {'name': 'Mental Fatigue', 'href': '/calculators/health/mental-fatigue-calculator', 'icon': '🧠', 'desc': 'Cognitive fatigue score'}]

const faqs = [
  {"question": "Who gets migraines and how common are they?", "answer": "Migraine is the third most prevalent disease worldwide, affecting approximately 1 billion people. In the US, about 39 million people experience migraines. Women are 3× more likely than men to have migraines due to hormonal influences — prevalence peaks in the reproductive years (25-55) and often improves after menopause. Migraine has a strong genetic component: if both parents have migraines, offspring have a 75% chance; if one parent, 50%. Despite its prevalence and disability burden, migraine is significantly underdiagnosed and undertreated."},
  {"question": "What are the most common migraine triggers?", "answer": "The most commonly reported triggers include: hormonal changes (menstruation, ovulation — in up to 60% of women with migraine), sleep disruption (too little or too much), alcohol (especially red wine and beer), caffeine (both excess consumption and withdrawal), stress and its resolution ('weekend migraine'), weather changes, strong sensory stimuli (bright lights, loud sounds, strong smells), skipping meals or dehydration, and MSG/nitrates in processed foods. However, research shows that triggers are highly individual — keeping a migraine diary for 3 months is the most reliable way to identify your personal triggers."},
  {"question": "When should migraines be treated preventively?", "answer": "Preventive (prophylactic) migraine medication is recommended when: you have 4 or more migraine days per month, acute medications are ineffective or overused, migraines cause significant disability, or you have hemiplegic migraines. First-line preventive options include beta-blockers (propranolol), topiramate, amitriptyline, and valproate. Newer CGRP monoclonal antibodies (erenumab/Aimovig, fremanezumab/Ajovy) are specifically designed for migraine prevention and reduce monthly migraine days by 50% in about half of patients with chronic migraine."}
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
          generateWebAppStructuredData({ name: 'Migraine Risk & Burden Calculator', description: 'Free migraine risk and burden calculator 2026. Assess your migraine risk factors including frequency', url: 'https://tooltrio.com/calculators/health/migraine-risk-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
