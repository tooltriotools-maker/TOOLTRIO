import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { })

export const metadata: Metadata = {
  title: 'Palladium Price Calculator – Live Spot per Gram | ToolTrio',
  description: 'Calculate live palladium spot price per gram and troy oz. Track auto-catalyst value in USD, INR, EUR and GBP. Free palladium calculator, no signup.',
  keywords: [
    'palladium price calculator',
    'palladium price per gram',
    'palladium spot price',
    'palladium price today',
    'live palladium price',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/palladium-price-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/palladium-price-calculator',
    siteName: 'ToolTrio',
    title: 'Palladium Price Calculator – Live Spot per Gram | ToolTrio',
    description: 'Calculate live palladium spot price per gram and troy oz. Track auto-catalyst value in USD, INR, EUR and GBP. Free palladium calculator, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Palladium Price Calculator – Live Spot per Gram | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palladium Price Calculator – Live Spot per Gram | ToolTrio',
    description: 'Calculate live palladium spot price per gram and troy oz. Track auto-catalyst value in USD, INR, EUR and GBP. Free palladium calculator, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Palladium Price Calculator \u2013 Live Spot per Gram", "item": "https://tooltrio.com/commodities/palladium-price-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Palladium Price Calculator \u2013 Live Spot per Gram", "description": "Calculate live palladium spot price per gram and troy oz. Track auto-catalyst value in USD, INR, EUR and GBP. Free palladium calculator, no signup.", "url": "https://tooltrio.com/commodities/palladium-price-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
