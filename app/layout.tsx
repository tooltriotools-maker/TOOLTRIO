import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import './globals.css'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ClientProviders } from '@/components/ui/ClientProviders'
import dynamic from 'next/dynamic'
const TrioBot = dynamic(() => import('@/components/ui/TrioBotWrapper'), {
  ssr: false,
  loading: () => null
})

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
}

const siteUrl = 'https://tooltrio.com'
const siteName = 'ToolTrio'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'ToolTrio — Free Finance & Health Calculators',
    template: 'TOOLTRIO | %s',
  },

  description:
    'ToolTrio is a free finance and health calculator website. Use mortgage calculators, 401k planners, BMI calculators, calorie trackers and 200+ more finance and health tools. No signup needed.',

  keywords: [
    // Brand
    'tooltrio',
    'tool trio',
    'tooltrio.com',
    'tooltrio finance calculator',
    'tooltrio health calculator',
    'tooltrio calculator',
    'finance and health calculator',
    // Finance
    'finance calculator',
    'financial calculator',
    'free financial calculator',
    'mortgage calculator',
    '401k calculator',
    'compound interest calculator',
    'retirement calculator',
    'Roth IRA calculator',
    'auto loan calculator',
    'budget planner calculator',
    'FIRE calculator',
    'debt payoff calculator',
    'net worth calculator',
    'savings rate calculator',
    'investment calculator',
    // Health
    'BMI calculator',
    'calorie calculator',
    'TDEE calculator',
    'BMR calculator',
    'macro calculator',
    'body fat calculator',
    'ideal weight calculator',
    'water intake calculator',
    'sleep calculator',
    'pregnancy calculator',
    'heart rate calculator',
    'protein intake calculator',
  ],

  authors: [{ name: 'ToolTrio', url: siteUrl }],
  creator: 'ToolTrio',
  publisher: 'ToolTrio',

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: 'ToolTrio — Free Finance & Health Calculators',
    description:
      'Mortgage, 401k, compound interest, BMI, calorie and 200+ free finance and health calculators. No signup required. Instant results.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolTrio — Free Finance & Health Calculators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ToolTrio — Free Finance & Health Calculators',
    description:
      'Free mortgage, 401k, BMI, calorie and 200+ finance and health calculators. No signup.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/site.webmanifest',
  category: 'finance, health',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ToolTrio',
  alternateName: [
    'Tool Trio',
    'ToolTrio Finance Calculator',
    'ToolTrio Health Calculator',
    'Trio Tools',
    'Tools Trio',
    'Trio Tool',
    'Toolstrio',
    'tooltrio.com',
  ],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    'ToolTrio is a free finance and health calculator website offering mortgage calculators, 401k planners, BMI calculators, calorie trackers and 200+ more tools.',
  email: 'tooltrio.tools@gmail.com',
  foundingDate: '2026',
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolTrio — Finance & Health Calculators',
  alternateName: [
    'Tool Trio',
    'Trio Tools',
    'Tools Trio',
    'Toolstrio',
    'tooltrio.com',
  ],
  url: siteUrl,
  description:
    'Free finance and health calculators including mortgage, 401k, compound interest, BMI, calorie, TDEE and 200+ more. No signup required.',
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ToolTrio — Finance & Health Calculators',
  alternateName: [
    'Tool Trio',
    'Trio Tools',
    'Toolstrio',
  ],
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'ToolTrio offers free finance and health calculators including mortgage, 401k, BMI, calorie, TDEE, compound interest and 200+ more tools. No signup required.',
  featureList: [
    'Free mortgage calculator',
    'Free 401k calculator',
    'Free compound interest calculator',
    'Free Roth IRA calculator',
    'Free retirement calculator',
    'Free BMI calculator',
    'Free calorie calculator',
    'Free TDEE calculator',
    'Free macro calculator',
    'No signup required',
    'Instant results',
    'Mobile-friendly calculators',
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio is a free finance and health calculator website. It offers mortgage calculators, 401k planners, BMI calculators, calorie trackers and 200+ finance and health tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are ToolTrio calculators free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every finance and health calculator on ToolTrio is completely free to use with no registration, no subscription and no hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ToolTrio also called Tool Trio or Trio Tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Some users search ToolTrio as Tool Trio, Trio Tools, Tools Trio, Trio Tool or Toolstrio. All these names refer to ToolTrio.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What finance calculators does ToolTrio offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio offers mortgage calculator, 401k calculator, compound interest calculator, Roth IRA calculator, auto loan calculator, budget planner, FIRE calculator, debt payoff calculator and more.',
      },
    },
    {
      '@type': 'Question',
      name: 'What health calculators does ToolTrio offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio offers BMI calculator, calorie calculator, TDEE calculator, BMR calculator, macro calculator, body fat calculator, ideal weight calculator, water intake calculator and more.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="content-language" content="en-US" />
        <meta name="rating" content="general" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XW8R1K19P7"
          strategy="afterInteractive"
        />

        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-XW8R1K19P7', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <CurrencyProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <TrioBot />
          </div>
        </CurrencyProvider>
        <ClientProviders />
      </body>
    </html>
  )
}
