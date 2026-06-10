import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Silver Price Calculator – Live 999/925/800 per Gram | ToolTrio',
  description: 'Calculate live silver price for 999 Fine, 925 Sterling, 900 Coin, 800 European per gram, troy oz, and kilogram. Free silver price calculator, no signup.',
  keywords: [
    'silver price calculator',
    'silver price per gram',
    '999 silver price',
    '925 silver price',
    'sterling silver price',
    'live silver price',
    'silver price today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/silver-price-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/silver-price-calculator',
    siteName: 'ToolTrio',
    title: 'Silver Price Calculator – Live 999/925/800 per Gram | ToolTrio',
    description: 'Calculate live silver price for 999 Fine, 925 Sterling, 900 Coin, 800 European per gram, troy oz, and kilogram. Free silver price calculator, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Silver Price Calculator – Live 999/925/800 per Gram | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Price Calculator – Live 999/925/800 per Gram | ToolTrio',
    description: 'Calculate live silver price for 999 Fine, 925 Sterling, 900 Coin, 800 European per gram, troy oz, and kilogram. Free silver price calculator, no signup.',
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
