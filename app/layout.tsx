import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import './globals.css'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

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
    template: '%s | ToolTrio',
  },

  description:
    'ToolTrio offers free finance and health calculators — mortgage, 401k, compound interest, BMI, calorie, TDEE and 200+ more. No signup required. Instant results.',

  keywords: [
    'tooltrio', 'tool trio', 'tooltrio.com',
    'finance calculator', 'financial calculator', 'free financial calculator',
    'mortgage calculator', '401k calculator', 'compound interest calculator',
    'retirement calculator', 'Roth IRA calculator', 'auto loan calculator',
    'BMI calculator', 'calorie calculator', 'TDEE calculator', 'BMR calculator',
    'macro calculator', 'body fat calculator', 'ideal weight calculator',
    'free finance and health calculator', 'finance and health calculator',
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
    site: '@tooltrio',
    creator: '@tooltrio',
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

// ── Global site-level schemas only (NOT page-level) ──────────────────────────
// Rule: Organization + WebSite ONLY here. All calculator-level schemas go in pages.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ToolTrio',
  alternateName: ['Tool Trio', 'ToolTrio Finance Calculator', 'ToolTrio Health Calculator', 'tooltrio.com'],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    'ToolTrio is a free finance and health calculator website offering mortgage calculators, 401k planners, BMI calculators, calorie trackers and 200+ more tools.',
  email: 'tooltrio.tools@gmail.com',
  foundingDate: '2026',
  sameAs: [
    'https://tooltrio.com',
    'https://www.tooltrio.com',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'tooltrio.tools@gmail.com',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'Finance Calculators', 'Health Calculators', 'Mortgage Calculator',
    'BMI Calculator', 'Investment Calculator', 'Retirement Planning',
    'Calorie Calculator', 'Tax Calculator',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolTrio',
  url: siteUrl,
  description:
    'Free finance and health calculators including mortgage, 401k, compound interest, BMI, calorie, TDEE and 200+ more. No signup required.',
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
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

        {/* Site-level schemas only — no WebApplication/SoftwareApplication/FAQPage here */}
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
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
          </div>
        </CurrencyProvider>
      </body>
    </html>
  )
}
