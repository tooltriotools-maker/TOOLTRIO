import type { Metadata } from 'next'
import { filterCalculatorFAQs } from '@/lib/content/faq-policy'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'ToolTrio'
const OG_IMAGE = `${BASE_URL}/og-image.png`
export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filterCalculatorFAQs(faqs).map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
