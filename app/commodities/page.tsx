import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { })

export const metadata: Metadata = {
  title: 'Commodity Price Calculators – Gold, Silver & Oil | ToolTrio',
  description: 'Free live commodity calculators: gold price per gram, silver, platinum, palladium, WTI crude oil, Brent crude, natural gas. Multi-currency. No signup.',
  keywords: [
    'commodity price calculator', 'gold price calculator', 'silver price calculator',
    'crude oil calculator', 'commodity calculator', 'live commodity prices',
    'gold price today', 'oil price calculator', 'precious metals calculator',
    'tooltrio', 'free calculator',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities',
    siteName: 'ToolTrio',
    title: 'Commodity Price Calculators – Gold, Silver & Oil | ToolTrio',
    description: 'Free live commodity calculators: gold price per gram, silver, platinum, crude oil, Brent crude, natural gas. Multi-currency. No signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio Commodity Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commodity Price Calculators – Gold, Silver, Oil | ToolTrio',
    description: 'Free live commodity calculators: gold, silver, platinum, crude oil and more. Multi-currency. No signup.',
    images: ['https://tooltrio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

export default function Page() {
  return <Client />
}
