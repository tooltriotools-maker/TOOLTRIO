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
    default: 'ToolTrio - Free Online Tools, Calculators & Utilities',
    template: '%s | ToolTrio',
  },

  description:
    'ToolTrio is a free online tools website with finance calculators, health calculators, ZIP code tools, developer utilities and daily tools. Fast, simple, no signup.',

  keywords: [
    // Brand keywords
    'tooltrio',
    'tool trio',
    'tooltrio.com',
    'tooltrio tools',
    'tool trio tools',
    'trio tools',
    'tools trio',
    'trio tool',
    'toolstrio',
    'tooltrio calculator',
    'tooltrio free tools',
    'tooltrio online tools',
    'tooltrio utilities',

    // Main category keywords
    'free online tools',
    'online calculators',
    'free calculators',
    'finance calculators',
    'health calculators',
    'developer tools',
    'zip code tools',
    'utility tools',

    // Finance keywords
    'mortgage calculator',
    '401k calculator',
    'Roth IRA calculator',
    'compound interest calculator',
    'loan calculator',
    'investment calculator',
    'retirement calculator',
    'tax calculator',
    'budget calculator',

    // Health keywords
    'BMI calculator',
    'calorie calculator',
    'TDEE calculator',
    'macro calculator',
    'steps to calories calculator',

    // Developer/tools keywords
    'json formatter',
    'uuid generator',
    'password generator',
    'random password generator',
    'zip code lookup',
  ],

  authors: [{ name: 'ToolTrio Team', url: siteUrl }],
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
    title: 'ToolTrio - Free Online Tools, Calculators & Utilities',
    description:
      'Use ToolTrio for free finance calculators, health calculators, ZIP code tools, developer utilities and more. No signup required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolTrio - Free Online Tools and Calculators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ToolTrio - Free Online Tools, Calculators & Utilities',
    description:
      'Free online calculators, finance tools, health tools, ZIP code tools and developer utilities. Fast, simple, no signup.',
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
  category: 'utilities',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ToolTrio',
  alternateName: [
    'Tool Trio',
    'ToolTrio Tools',
    'Trio Tools',
    'Tools Trio',
    'Trio Tool',
    'Toolstrio',
    'tooltrio.com',
  ],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    'ToolTrio is a free online tools platform for calculators, finance tools, health tools, ZIP code tools, developer utilities and daily-use tools.',
  email: 'tooltrio.tools@gmail.com',
  foundingDate: '2026',
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolTrio',
  alternateName: [
    'Tool Trio',
    'ToolTrio Tools',
    'Trio Tools',
    'Tools Trio',
    'Trio Tool',
    'Toolstrio',
    'tooltrio.com',
  ],
  url: siteUrl,
  description:
    'ToolTrio provides free online calculators, finance tools, health calculators, ZIP code tools, developer tools and simple utilities.',
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
  name: 'ToolTrio - Free Online Tools and Calculators',
  alternateName: [
    'Tool Trio',
    'Trio Tools',
    'Tools Trio',
    'Toolstrio',
  ],
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'ToolTrio offers free online calculators and utilities including finance calculators, health calculators, ZIP code tools, developer tools and daily-use tools.',
  featureList: [
    'Free online calculators',
    'Finance calculators',
    'Health calculators',
    'ZIP code lookup tools',
    'Developer utilities',
    'Password generator',
    'JSON formatter',
    'UUID generator',
    'No signup required',
    'Instant results',
    'Mobile-friendly tools',
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
        text: 'ToolTrio is a free online tools website that provides calculators, finance tools, health calculators, ZIP code tools, developer utilities and daily-use tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ToolTrio free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, ToolTrio is free to use and does not require signup for most tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ToolTrio also searched as Tool Trio or Trio Tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Some users search ToolTrio as Tool Trio, Trio Tools, Tools Trio, Trio Tool or Toolstrio.',
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
          </div>
        </CurrencyProvider>
      </body>
    </html>
  )
}
