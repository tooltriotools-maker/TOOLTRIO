import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { })

export const metadata: Metadata = {
  title: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio',
  description: 'Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.',
  keywords: [
    'crude oil calculator',
    'oil price per barrel',
    'wti crude oil price',
    'oil price calculator',
    'barrel price calculator',
    'crude oil price today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/crude-oil-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/crude-oil-calculator',
    siteName: 'ToolTrio',
    title: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio',
    description: 'Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio',
    description: 'Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Crude Oil Calculator \u2013 WTI Price per Barrel & Gallon", "item": "https://tooltrio.com/commodities/crude-oil-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Crude Oil Calculator \u2013 WTI Price per Barrel & Gallon", "description": "Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.", "url": "https://tooltrio.com/commodities/crude-oil-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
