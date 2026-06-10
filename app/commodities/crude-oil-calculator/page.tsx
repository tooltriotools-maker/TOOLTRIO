import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio',
  description: 'Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.',
  keywords: [
    'crude oil calculator',
    'oil price per barrel',
    'wti crude oil price',
    'oil price calculator',
    'barrel price calculator',
    'crude oil price today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/crude-oil-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/crude-oil-calculator',
    siteName: 'ToolTrio',
    title: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio',
    description: 'Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crude Oil Calculator – WTI Price per Barrel & Gallon | ToolTrio',
    description: 'Calculate WTI crude oil cost per barrel, gallon, litre, and metric ton at live spot prices. US benchmark oil price calculator. Free, no signup.',
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
