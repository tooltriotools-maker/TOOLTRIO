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

export default function Page() {
  return <Client />
}
