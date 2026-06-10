import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

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

export default function Page() {
  return <Client />
}
