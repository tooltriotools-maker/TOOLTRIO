import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio',
  description: 'Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.',
  keywords: [
    'natural gas calculator',
    'natural gas price per mmbtu',
    'natural gas price',
    'gas price calculator',
    'natural gas price today',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/natural-gas-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/natural-gas-calculator',
    siteName: 'ToolTrio',
    title: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio',
    description: 'Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natural Gas Calculator – Live Price per MMBtu | ToolTrio',
    description: 'Calculate natural gas price per MMBtu, therm, cubic foot, and cubic meter at live spot prices. Free natural gas price calculator, no signup.',
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
