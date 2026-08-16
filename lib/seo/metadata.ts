import type { Metadata } from 'next'
import { filterCalculatorFAQs } from '@/lib/content/faq-policy'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'ToolTrio'
const OG_IMAGE = `${BASE_URL}/og-image.png`

const FUN_CORE_KW = [
  'fun calculators online',
  'lucky number calculator',
  'age in days calculator',
  'fun generators',
]

export function generateFunToolMetadata(params: {
  title: string
  description: string
  slug: string
  keywords: string[]
}): Metadata {
  const { title: rawTitle, description, slug, keywords } = params
  const title = rawTitle.replace(/\s*\|\s*ToolTrio\s*$/i, '') + ' | ToolTrio'
  const url = `${BASE_URL}/fun/${slug}`
  const allKeywords = Array.from(new Set([...keywords, 'tooltrio', 'tool trio', ...FUN_CORE_KW]))

  return {
    title: { absolute: title },
    description,
    keywords: allKeywords,
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
    alternates: { canonical: url },
    openGraph: {
      type: 'website', url, siteName: SITE_NAME, title, description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }], locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
  }
}

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
