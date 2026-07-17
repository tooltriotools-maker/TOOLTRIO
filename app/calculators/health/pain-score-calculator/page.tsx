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
  title: 'Pain Score Calculator — Chronic Pain Assessment 2026 | ToolTrio',
  description: 'Free pain score and chronic pain assessment calculator 2026. Evaluate pain intensity, frequency, sleep impact, activity limitation, and quality of life to get a composite pain burden score and management guidance.',
  slug: 'pain-score-calculator',
  category: 'health',
  region: 'usa',
  keywords: ['pain score calculator', 'chronic pain assessment tool', 'pain intensity calculator', 'NRS pain scale calculator', 'pain burden score calculator free'],
})

const relatedCalculators = [{'name': 'Injury Recovery', 'href': '/calculators/health/injury-recovery-calculator', 'icon': '🩹', 'desc': 'Recovery timeline'}, {'name': 'Stress Level', 'href': '/calculators/health/stress-level-calculator', 'icon': '🧘', 'desc': 'PSS-10 stress score'}, {'name': 'Mental Health Score', 'href': '/calculators/health/mental-health-score-calculator', 'icon': '💆', 'desc': 'PHQ-9 & GAD-7'}, {'name': 'Sleep Need', 'href': '/calculators/health/sleep-need-calculator', 'icon': '🌙', 'desc': 'Sleep requirements'}]

const faqs = [('What is the Numeric Rating Scale (NRS) for pain?', 'The Numeric Rating Scale (0-10) is the most widely used clinical pain assessment tool because of its simplicity and reliability. Score meanings: 0 = no pain; 1-3 = mild (does not interfere with activities); 4-6 = moderate (interferes with but does not stop most activities); 7-9 = severe (prevents many activities); 10 = worst imaginable pain. Research shows that a score of 4 or above consistently predicts functional impairment and is a common threshold for initiating or escalating treatment. This calculator uses a composite score combining NRS with frequency, sleep, and activity impact for a more complete picture.'), ('When does pain become chronic?', 'Pain is classified as chronic when it persists beyond the normal healing time — typically more than 3 months — or when it is associated with a chronic disease process. The International Association for the Study of Pain (IASP) 2019 classification distinguishes chronic primary pain (pain as a condition itself, like fibromyalgia or complex regional pain syndrome) from chronic secondary pain (pain due to an identifiable cause like arthritis, cancer, or nerve damage). Approximately 20% of US adults (50 million people) live with chronic pain, and 8% have high-impact chronic pain that limits daily life.'), ('What is multimodal pain management?', 'Multimodal pain management combines two or more treatments with different mechanisms to achieve better pain control with lower doses of any single agent. A comprehensive multimodal program typically includes: pharmacological (analgesics, anti-inflammatories, nerve medications), physical (physical therapy, TENS, exercise), psychological (CBT, acceptance-based therapy — reduces pain catastrophizing), interventional (nerve blocks, injections) for appropriate cases, and lifestyle (sleep optimization, anti-inflammatory diet, stress management). Research shows multimodal approaches outperform single-modality treatment, particularly for chronic pain.')]

export default function Page() {
  const _faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f: any) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqSchema) }} />
      <CalculatorClient
        faqs={faqs}
        structuredData={[
          generateFAQStructuredData(faqs),
          generateWebAppStructuredData({ name: 'Pain Score Analysis Calculator', description: 'Free pain score and chronic pain assessment calculator 2026. Evaluate pain intensity, frequency, sle', url: 'https://tooltrio.com/calculators/health/pain-score-calculator', category: 'HealthApplication' }),
        ]}
        relatedCalculators={relatedCalculators}
      />
    </>
  )
}
