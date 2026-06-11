import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio',
  description: 'Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.',
  keywords: [
    'brent crude calculator',
    'brent oil price',
    'brent crude price per barrel',
    'brent oil calculator',
    'oil price calculator',
    'brent crude today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/brent-crude-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/brent-crude-calculator',
    siteName: 'ToolTrio',
    title: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio',
    description: 'Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio',
    description: 'Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Brent Crude Calculator \u2013 Live Oil Price per Barrel", "item": "https://tooltrio.com/commodities/brent-crude-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Brent Crude Calculator \u2013 Live Oil Price per Barrel", "description": "Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.", "url": "https://tooltrio.com/commodities/brent-crude-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
