import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { })

export const metadata: Metadata = {
  title: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio',
  description: 'Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.',
  keywords: [
    'commodity portfolio tracker',
    'gold portfolio tracker',
    'precious metals portfolio',
    'commodity tracker',
    'gold silver portfolio',
    'commodity investment tracker',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/commodity-portfolio-tracker' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/commodity-portfolio-tracker',
    siteName: 'ToolTrio',
    title: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio',
    description: 'Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio',
    description: 'Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Commodity Portfolio Tracker \u2013 Live Gold Silver Prices", "item": "https://tooltrio.com/commodities/commodity-portfolio-tracker"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Commodity Portfolio Tracker \u2013 Live Gold Silver Prices", "description": "Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.", "url": "https://tooltrio.com/commodities/commodity-portfolio-tracker", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
