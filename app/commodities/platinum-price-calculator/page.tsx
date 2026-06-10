import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

export const metadata: Metadata = {
  title: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio',
  description: 'Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.',
  keywords: [
    'platinum price calculator',
    'platinum price per gram',
    'platinum spot price',
    'platinum price today',
    'live platinum price',
    'tooltrio', 'free calculator', 'no signup',
  ],
  alternates: { canonical: 'https://tooltrio.com/commodities/platinum-price-calculator' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/commodities/platinum-price-calculator',
    siteName: 'ToolTrio',
    title: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio',
    description: 'Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Platinum Price Calculator – Live per Gram & Troy Oz | ToolTrio',
    description: 'Calculate live platinum spot price per gram, pennyweight, and troy oz. Multi-currency: USD, INR, EUR, GBP. Free platinum price calculator, no signup.',
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
