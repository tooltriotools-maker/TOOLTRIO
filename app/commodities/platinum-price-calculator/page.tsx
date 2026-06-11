import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio',
  description: 'Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.',
  keywords: [
    'platinum price calculator',
    'platinum price per gram',
    'platinum spot price',
    'platinum price today',
    'live platinum price',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/platinum-price-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/platinum-price-calculator',
    siteName: 'ToolTrio',
    title: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio',
    description: 'Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio',
    description: 'Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Platinum Price Calculator \u2013 Live per Gram & Troy Oz", "item": "https://tooltrio.com/commodities/platinum-price-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Platinum Price Calculator \u2013 Live per Gram & Troy Oz", "description": "Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.", "url": "https://tooltrio.com/commodities/platinum-price-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
