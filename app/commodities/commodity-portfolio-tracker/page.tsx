import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio',
  description: 'Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.',
  keywords: [
    'commodity portfolio tracker',
    'gold portfolio tracker',
    'precious metals portfolio',
    'commodity tracker',
    'gold silver portfolio',
    'commodity investment tracker',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/commodity-portfolio-tracker' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/commodity-portfolio-tracker',
    siteName: 'ToolTrio',
    title: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio',
    description: 'Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commodity Portfolio Tracker – Live Gold Silver Prices | ToolTrio',
    description: 'Track gold, silver, platinum, palladium, oil, and energy holdings at live prices with full P&L breakdown. Free commodity portfolio tracker, no signup.',
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
