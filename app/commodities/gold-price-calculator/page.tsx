import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Gold Price Calculator – Live 24K/22K/18K per Gram | ToolTrio',
  description: 'Calculate live gold price in 24K, 22K, 20K, 18K, 14K, 10K per gram, tola and troy oz. USD, INR, GBP and EUR supported. Free, no signup.',
  keywords: [
    'gold price calculator',
    'gold price per gram',
    '24k gold price',
    '22k gold price',
    'gold price india',
    'live gold price',
    'gold price today',
    'gold karat calculator',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/gold-price-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/gold-price-calculator',
    siteName: 'ToolTrio',
    title: 'Gold Price Calculator – Live 24K/22K/18K per Gram | ToolTrio',
    description: 'Calculate live gold price in 24K, 22K, 20K, 18K, 14K, 10K per gram, tola and troy oz. USD, INR, GBP and EUR supported. Free, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Gold Price Calculator – Live 24K/22K/18K per Gram | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Calculator – Live 24K/22K/18K per Gram | ToolTrio',
    description: 'Calculate live gold price in 24K, 22K, 20K, 18K, 14K, 10K per gram, tola and troy oz. USD, INR, GBP and EUR supported. Free, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Gold Price Calculator \u2013 Live 24K/22K/18K per Gram", "item": "https://tooltrio.com/commodities/gold-price-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Gold Price Calculator \u2013 Live 24K/22K/18K per Gram", "description": "Calculate live gold price in 24K, 22K, 20K, 18K, 14K, 10K per gram, tola and troy oz. USD, INR, GBP and EUR supported. Free, no signup.", "url": "https://tooltrio.com/commodities/gold-price-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
