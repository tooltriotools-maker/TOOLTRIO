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
   default: 'TOOLTRIO — Free Finance & Health Calculators | 400+ Tools',
    template: '%s',
  },

  description:
    'Free online finance calculators trusted by Americans. Mortgage calculator, 401k calculator, compound interest, BMI, calorie calculator and 400+ more. No signup. Instant results.',
  keywords: [
    // Brand keywords
    'tooltrio',
    'tool trio',
    'trio tools',
    'tools trio',
    'trio tool',
    'toolstrio',
    'home loan calculator',
   'retirement calculator USA',
    // Main category keywords
    'free online tools',
    'online calculators',
    'free calculators',
    'finance calculators',
    'health calculators',
    'developer tools',
    'zip code tools',
    'utility tools',

   'income tax calculator USA',
    'best free financial calculator USA 2026',
    'online financial tools no registration',

    'finance calculator USA',
    'free financial calculator USA',
    'online calculator free',

    'free mortgage calculator USA with taxes',
    '401k calculator with employer match USA',
    'compound interest calculator monthly contribution',
    'loan payoff calculator USA early payment',
    'debt payoff calculator snowball vs avalanche',
    'budget planner calculator USA',
    'income tax calculator USA 2026',
    'fixed deposit calculator usa',
    'random password generator free online',
    'uuid generator free online',
    'json formatter online free',
    'finanace calculator',
    'tax bracket calculator',
    'steps to calories',


  ],

  authors: [{ name: 'ToolTrio Team', url: siteUrl }],
  creator: 'ToolTrio',
  publisher: 'ToolTrio',



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
    title: 'TOOLTRIO — Free Finance & Health Calculators | 400+ Tools',
    description:
       'Free online finance calculators trusted by Americans. Mortgage, 401k, compound interest, BMI, calorie and 400+ calculators. No signup required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolTrio -  Free Online Finance & Health Calculators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TOOLTRIO — Free Finance & Health Calculators | 400+ Tools',
    description:
      'Free mortgage, 401k, BMI, compound interest calculators. 400+ tools. No signup. Instant results.',
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
  category: 'finance',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'tooltrio.com',
  alternateName: [
    'Tool Trio',
    
    'Trio Tools',
    'Tools Trio',
    'Trio Tool',
    'Toolstrio',
    'TOOLTRIO',
  ],
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
      'TOOLTRIO (Tool Trio / ToolTrio / Trio Tools) — Free online finance, health, ZIP code, and developer tools. 400+ free calculators and utilities. No signup required. tooltrio.com',
  email: 'tooltrio.tools@gmail.com',
  foundingDate: '2026',
  sameAs: [],
   address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
 name: 'tooltrio.com',
  alternateName: ['TOOLTRIO', 'Tool Trio', 'ToolTrio', 'Trio Tools', 'tooltrio.com', 'Free Online Calculator', 'ZIP Code Lookup Tool'],
  url: siteUrl,
  description:
   'Free online finance calculators -- mortgage, 401k, compound interest, BMI, calorie and 400+ calculators.',
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
  name: 'TOOLTRIO (tooltrio.com) — Free Online Calculators & ZIP Code Tools',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  url: siteUrl,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'TOOLTRIO (also Tool Trio, ToolTrio, Trio Tools) — Free finance, health, ZIP code, and developer tools. 400+ utilities at tooltrio.com. No signup required.',
  featureList: [
   'Mortgage Calculator with taxes and insurance',
    '401k and Roth IRA retirement calculators',
    'Compound interest calculator with monthly contributions',
    'BMI, TDEE, calorie and macro health calculators',
    'No signup or registration required',
    'Instant real-time results',
    'Mobile-friendly on all devices',
    'Complete privacy - no data stored',
    'ZIP code lookup and US postal tools',
    'Developer tools and utilities',
    'Also known as Tool Trio, ToolTrio, Trio Tools',
  ],
}

const howToSchema  = {
  '@context': 'https://schema.org',
   '@type': 'HowTo',

  name: 'How to Use Our Free Online Finance Calculators',

  description:
    'Step-by-step guide to using tooltrio.com free online calculators for mortgage, retirement, and more.',

  step: [

    {
      '@type': 'HowToStep',
      name: 'Choose a Calculator',
      text: 'Browse our 400+ free calculators by category: Finance, Health, Dev Tools, or Fun. Use the search bar to find a specific calculator instantly.',
    },
    {
      '@type': 'HowToStep',
      name: 'Enter Your Numbers',
      text: 'Input your personal figures -- such as loan amount, interest rate, income, or body measurements. All fields have clear labels and helpful tooltips.',
    },
    {
       '@type': 'HowToStep',
      name: 'Get Instant Results',
      text: 'Results update in real time as you type. See charts, amortization tables, and detailed breakdowns -- all for free with no signup required.',
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

         <meta name="revisit-after" content="3 days" />
        
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
            __html: JSON.stringify(howToSchema),
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
