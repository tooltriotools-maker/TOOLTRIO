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
    default: 'ToolTrio (Tool Trio) — Free Online Tools & Calculators',
    template: '%s | ToolTrio',
  },

  description:
    'ToolTrio (also searched as Tool Trio, Trio Tools and Tools Trio) offers free online tools across ZIP code tools, fun generators and quizzes. No signup required.',

  keywords: [
    'tooltrio', 'tool trio', 'tooltrio.com', 'trio tools', 'tools trio', 'toolstrio',
    'online tools', 'free online tools', 'ZIP code tools',
    'JSON formatter', 'regex tester', 'ZIP code lookup',
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
    title: 'ToolTrio (Tool Trio) — Free Online Tools & Calculators',
    description:
      'Free online tools across ZIP code tools, fun generators and more. No signup required. Instant results.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolTrio (Tool Trio) — Free Online Tools & Calculators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@tooltrio',
    creator: '@tooltrio',
    title: 'ToolTrio (Tool Trio) — Free Online Tools & Calculators',
    description:
      'Free online tools across ZIP code tools, fun generators and more. No signup.',
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

// ── Global site-level schemas only (NOT page-level) ──────────────────────────
// Rule: Organization + WebSite ONLY here. All calculator-level schemas go in pages.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ToolTrio',
  alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio', 'tooltrio.com'],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    'ToolTrio is a free online tools website offering ZIP code tools, fun generators and other practical tools.',
  email: 'tooltrio.tools@gmail.com',
  foundingDate: '2026',
  // Keep one hostname everywhere. www.tooltrio.com permanently redirects to tooltrio.com.
  sameAs: [
    'https://tooltrio.com',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'tooltrio.tools@gmail.com',
    availableLanguage: ['English'],
  },
  knowsAbout: [
    'ZIP Code Tools', 'Fun Generators', 'Online Utilities',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ToolTrio',
  alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio'],
  url: siteUrl,
  description:
    'Free online tools across ZIP tools, fun generators and other practical categories. No signup required.',
  inLanguage: 'en-US',
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

        <meta name="language" content="English" />
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
