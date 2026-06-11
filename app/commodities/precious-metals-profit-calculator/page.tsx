import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Precious Metals P&L Calculator – Gold Silver Profit | ToolTrio',
  description: 'Calculate profit and loss on gold, silver, platinum, and palladium trades. Enter buy price, sell price, fees and get net P&L instantly. Free, no signup.',
  keywords: [
    'precious metals profit calculator',
    'gold profit calculator',
    'silver profit calculator',
    'metals p&l calculator',
    'gold trade profit',
    'metal investment calculator',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/precious-metals-profit-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/precious-metals-profit-calculator',
    siteName: 'ToolTrio',
    title: 'Precious Metals P&L Calculator – Gold Silver Profit | ToolTrio',
    description: 'Calculate profit and loss on gold, silver, platinum, and palladium trades. Enter buy price, sell price, fees and get net P&L instantly. Free, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Precious Metals P&L Calculator – Gold Silver Profit | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Precious Metals P&L Calculator – Gold Silver Profit | ToolTrio',
    description: 'Calculate profit and loss on gold, silver, platinum, and palladium trades. Enter buy price, sell price, fees and get net P&L instantly. Free, no signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Precious Metals P&L Calculator \u2013 Gold Silver Profit", "item": "https://tooltrio.com/commodities/precious-metals-profit-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Precious Metals P&L Calculator \u2013 Gold Silver Profit", "description": "Calculate profit and loss on gold, silver, platinum, and palladium trades. Enter buy price, sell price, fees and get net P&L instantly. Free, no signup.", "url": "https://tooltrio.com/commodities/precious-metals-profit-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
