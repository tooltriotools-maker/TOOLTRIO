import type { Metadata } from 'next'
import { TOOL_COUNTS } from '@/lib/catalog'
import { HomePageClient } from '@/components/home/HomePageClient'

export const metadata: Metadata = {
  title: 'ToolTrio — Fast, Accurate ZIP & Everyday Utility Tools',
  description: 'Fast, accurate tools for everyday lookups: US ZIP code lookup, ZIP+4, distance, timezone, coordinates and fun generators. Free and no signup.',
  keywords: ['zip code lookup', 'zip code finder', 'zip+4 lookup', 'zip code distance', 'zip code timezone', 'zip code coordinates', 'fun generators', 'tooltrio'],
  alternates: { canonical: 'https://tooltrio.com' },
  openGraph: {
    title: 'ToolTrio — Fast, Accurate ZIP & Everyday Utility Tools',
    description: 'US ZIP lookup, ZIP+4, distance, timezone, coordinates and fun generators. Free and no signup.',
    url: 'https://tooltrio.com',
    siteName: 'ToolTrio',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio utility tools' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolTrio — Fast, Accurate ZIP & Everyday Utility Tools',
    description: 'US ZIP utilities and fun generators. Free and no signup.',
    images: ['/og-image.png'],
  },
}

const homepageFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['What is ToolTrio?', 'ToolTrio is a free utility site focused on fast US ZIP code lookups plus a secondary collection of fun generators. No signup is required.'],
    ['How do I find a city and state from a ZIP code?', 'Enter a 5-digit US ZIP code in ZIP Code Lookup to see available city, state, county and timezone information.'],
    ['Can I calculate the distance between two ZIP codes?', 'Yes. ZIP Code Distance compares two US ZIP codes and provides straight-line distance in miles and kilometers.'],
    ['How do I find my ZIP+4?', 'Use ZIP+4 Lookup for the 9-digit extension. For exact delivery-point information tied to a street address, use the official USPS lookup.'],
    ['Does ToolTrio have fun generators?', `Yes. ToolTrio has ${TOOL_COUNTS.fun} fun tools, including Shakespearean and general insult generators, quizzes and other lightweight entertainment tools.`],
    ['Are ToolTrio tools free?', 'Yes. Public ToolTrio tools are free to use without registration or a subscription.'],
  ].map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  })),
}

export default function HomePage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFAQSchema) }} />
    <HomePageClient zipCount={TOOL_COUNTS.zip} funCount={TOOL_COUNTS.fun} />
  </>
}
