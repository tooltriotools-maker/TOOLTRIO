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
  title: 'Bone Density Risk Calculator — Osteoporosis Risk | ToolTrio',
  description: 'Free osteoporosis and bone density risk calculator 2026. Estimate your risk of low bone density based on age, gender, BMI, smoking, alcohol, family history, calcium intake, and corticosteroid use.',
  slug: 'bone-density-risk-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['bone density risk calculator', 'osteoporosis risk calculator', 'FRAX calculator alternative', 'low bone density risk assessment', 'calcium intake bone health calculator'],
})

const relatedCalculators = [{'name': 'Calcium Calculator', 'href': '/calculators/health/calcium-calculator', 'icon': '🦷', 'desc': 'Daily calcium needs'}, {'name': 'Vitamin D Status', 'href': '/calculators/health/vitamin-d-status-calculator', 'icon': '☀️', 'desc': 'Vitamin D level estimate'}, {'name': 'BMI Calculator', 'href': '/calculators/health/bmi-calculator', 'icon': '⚖️', 'desc': 'Body mass index'}, {'name': 'Longevity Calculator', 'href': '/calculators/health/longevity-calculator', 'icon': '♾️', 'desc': 'Life expectancy'}]

const faqs = [('What are the main risk factors for osteoporosis?', 'The strongest risk factors for osteoporosis are female sex (especially post-menopausal), advanced age (risk doubles each decade after 50), low body weight (BMI < 18.5), family history of hip fracture, long-term corticosteroid use (> 3 months), and smoking. Secondary causes include low calcium intake, vitamin D deficiency, excessive alcohol, low physical activity, and certain medications (proton pump inhibitors, anticonvulsants, some chemotherapy drugs). The good news is most of these risk factors are modifiable or can prompt early DEXA scan screening.'), ('At what age should I get a DEXA bone density scan?', 'The US Preventive Services Task Force (USPSTF) recommends routine DEXA screening for all women aged 65 and older, and for younger postmenopausal women with elevated fracture risk based on tools like FRAX or this calculator. For men, routine screening is less standardized but is generally recommended after age 70 or at any age with multiple risk factors. If you are taking long-term corticosteroids, DEXA scanning is recommended regardless of age after 3+ months of use.'), ('How much calcium and vitamin D do I need for bone health?', 'The National Osteoporosis Foundation recommends 1,000 mg/day of calcium for adults under 50, and 1,200 mg/day for women over 50 and men over 70. Vitamin D recommendations are 800-1,000 IU/day for most adults, and up to 2,000 IU/day for those at risk of deficiency. Calcium from food is preferred over supplements — good sources include dairy, fortified foods, sardines, and leafy greens. Vitamin D3 (cholecalciferol) is the preferred supplement form.')]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Bone Density Risk Calculator', description: 'Free osteoporosis and bone density risk calculator 2026. Estimate your risk of low bone density base', url: 'https://tooltrio.com/calculators/health/bone-density-risk-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
