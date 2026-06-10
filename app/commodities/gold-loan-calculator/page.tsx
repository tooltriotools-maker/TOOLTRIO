import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Client = dynamic(() => import('./ClientPage'), { ssr: false })

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

export default function Page() {
  return <Client />
}
