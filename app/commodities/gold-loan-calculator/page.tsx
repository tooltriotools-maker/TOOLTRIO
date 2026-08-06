import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { })

export const metadata: Metadata = {
  title: 'Gold Loan Calculator – LTV, EMI & Interest | ToolTrio',
  description: 'Calculate gold loan amount at live spot price with LTV ratios, EMI breakdown, and total interest. India and international gold loan calculator. Free.',
  keywords: [
    'gold loan calculator',
    'gold loan emi calculator',
    'gold loan ltv calculator',
    'loan against gold',
    'gold loan interest calculator',
    'gold loan india',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/gold-loan-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/gold-loan-calculator',
    siteName: 'ToolTrio',
    title: 'Gold Loan Calculator – LTV, EMI & Interest | ToolTrio',
    description: 'Calculate gold loan amount at live spot price with LTV ratios, EMI breakdown, and total interest. India and international gold loan calculator. Free.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Gold Loan Calculator – LTV, EMI & Interest | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Loan Calculator – LTV, EMI & Interest | ToolTrio',
    description: 'Calculate gold loan amount at live spot price with LTV ratios, EMI breakdown, and total interest. India and international gold loan calculator. Free.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}


const breadcrumbSchema = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://tooltrio.com"}, {"@type": "ListItem", "position": 2, "name": "Commodities", "item": "https://tooltrio.com/commodities"}, {"@type": "ListItem", "position": 3, "name": "Gold Loan Calculator \u2013 LTV, EMI & Interest", "item": "https://tooltrio.com/commodities/gold-loan-calculator"}]}
const webAppSchema = {"@context": "https://schema.org", "@type": "WebApplication", "name": "Gold Loan Calculator \u2013 LTV, EMI & Interest", "description": "Calculate gold loan amount at live spot price with LTV ratios, EMI breakdown, and total interest. India and international gold loan calculator. Free.", "url": "https://tooltrio.com/commodities/gold-loan-calculator", "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "browserRequirements": "Requires JavaScript", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock"}, "isAccessibleForFree": true, "inLanguage": "en-US", "author": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}, "publisher": {"@type": "Organization", "name": "ToolTrio", "url": "https://tooltrio.com"}}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <Client />
    </>
  )
}
