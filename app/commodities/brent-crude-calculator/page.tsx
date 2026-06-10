import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio',
  description: 'Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.',
  keywords: [
    'brent crude calculator',
    'brent oil price',
    'brent crude price per barrel',
    'brent oil calculator',
    'oil price calculator',
    'brent crude today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/brent-crude-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/brent-crude-calculator',
    siteName: 'ToolTrio',
    title: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio',
    description: 'Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brent Crude Calculator – Live Oil Price per Barrel | ToolTrio',
    description: 'Calculate Brent crude oil price per barrel, gallon, and litre at live spot prices. Global oil benchmark calculator. Free, instant, no signup.',
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
