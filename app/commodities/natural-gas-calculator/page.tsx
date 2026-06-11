import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio',
  description: 'Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.',
  keywords: [
    'natural gas calculator',
    'natural gas price per mmbtu',
    'natural gas price',
    'gas price calculator',
    'natural gas price today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/natural-gas-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/natural-gas-calculator',
    siteName: 'ToolTrio',
    title: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio',
    description: 'Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio',
    description: 'Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Natural Gas Calculator \u2013 Live Price per MMBtu", "item": "https://tooltrio.com/commodities/natural-gas-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Natural Gas Calculator \u2013 Live Price per MMBtu", "description": "Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.", "url": "https://tooltrio.com/commodities/natural-gas-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
