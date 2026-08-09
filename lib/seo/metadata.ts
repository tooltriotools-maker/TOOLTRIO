import type { Metadata } from 'next'
import { filterCalculatorFAQs } from '@/lib/content/faq-policy'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'ToolTrio'
const OG_IMAGE = `${BASE_URL}/og-image.png`

// ─────────────────────────────────────────────────────────────────────────────
// BRAND keywords — injected on every page (keep lean — 10 terms max)
// Google ignores <meta keywords> for ranking; these are purely for GSC identity
// ─────────────────────────────────────────────────────────────────────────────
const CORE_KEYWORDS = [
  'tooltrio', 'tool trio', 'tooltrio.com',
  'free calculator', 'online calculator', 'free online calculator',
  'calculator no signup', 'calculator instant results',
  'finance and health calculator', 'tooltrio calculator',
]

// Category core keywords — only 10-15 per category
const FINANCE_CORE_KW = [
  'free financial calculator', 'finance calculator',
  'mortgage calculator', '401k calculator', 'compound interest calculator',
  'retirement calculator', 'Roth IRA calculator', 'auto loan calculator',
  'FIRE calculator', 'debt payoff calculator', 'investment calculator',
]

const HEALTH_CORE_KW = [
  'free health calculator', 'BMI calculator', 'calorie calculator',
  'TDEE calculator', 'BMR calculator', 'macro calculator',
  'body fat calculator', 'ideal weight calculator',
  'water intake calculator', 'sleep calculator', 'heart rate calculator',
]

const DEV_CORE_KW = [
  'free developer tools online', 'online dev tools no install',
  'JSON formatter', 'regex tester', 'base64 encoder',
  'UUID generator', 'hash generator', 'password generator',
  'color converter', 'unix timestamp converter',
]

const FUN_CORE_KW = [
  'fun calculators online', 'zodiac calculator', 'love compatibility calculator',
  'personality quiz free', 'lucky number calculator', 'age in days calculator',
]

// ─────────────────────────────────────────────────────────────────────────────
export function generateCalculatorMetadata(params: {
  title: string
  description: string
  slug: string
  category: 'finance' | 'health' | 'dev' | 'fun'
  keywords: string[]
  region?: 'usa' | 'uk' | 'europe' | 'india' | 'global'
}): Metadata {
  const { title, description, slug, category, keywords, region = 'global' } = params
  const url = `${BASE_URL}/calculators/${category}/${slug}`

  const catKW = category === 'health' ? HEALTH_CORE_KW
    : category === 'finance' ? FINANCE_CORE_KW
    : category === 'dev' ? DEV_CORE_KW
    : FUN_CORE_KW

  // Deduplicate — page-specific keywords first, then brand + category
  const allKeywords = Array.from(new Set([
    ...keywords,
    ...CORE_KEYWORDS,
    ...catKW,
  ]))

  // Keep description within 150-160 chars and end with a clear value prop
  const rawEnriched = category === 'health'
    ? (description.endsWith('.') ? description : `${description}. Free, no signup.`)
    : category === 'dev'
    ? (description.endsWith('.') ? description : `${description}. Runs in browser — no install, no signup.`)
    : (description.endsWith('.') ? description : `${description}. Free, no signup, instant results.`)
  // Hard-cap at 155 chars (word boundary) to prevent SERP truncation
  const enrichedDescription = rawEnriched.length <= 155
    ? rawEnriched
    : (() => {
        const cut = rawEnriched.slice(0, 155)
        const lastSpace = cut.lastIndexOf(' ')
        const trimmed = lastSpace > 120 ? cut.slice(0, lastSpace) : cut
        return trimmed.replace(/[,;:—–\s]+$/, '') + '.'
      })()

  const regionalMeta = {
    usa: { region: 'US', place: 'United States', language: 'en-US', locale: 'en_US' },
    uk: { region: 'GB', place: 'United Kingdom', language: 'en-GB', locale: 'en_GB' },
    europe: { region: 'EU', place: 'Europe', language: 'en-GB', locale: 'en_GB' },
    india: { region: 'IN', place: 'India', language: 'en-IN', locale: 'en_IN' },
    global: { region: undefined, place: undefined, language: 'en', locale: 'en_US' },
  }[region]

  return {
    title: { absolute: title },
    description: enrichedDescription,
    keywords: allKeywords,
    authors: [{ name: 'ToolTrio', url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description: enrichedDescription,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
      locale: regionalMeta.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: enrichedDescription,
      images: [OG_IMAGE],
    },
    other: {
      ...(regionalMeta.region ? { 'geo.region': regionalMeta.region, 'geo.placename': regionalMeta.place } : {}),
      'language': 'English',
      'content-language': regionalMeta.language,
    },
  }
}

export function generateDevToolMetadata(params: {
  title: string; description: string; slug: string; keywords: string[]
}): Metadata {
  return generateCalculatorMetadata({ ...params, category: 'dev', region: 'global' })
}

export function generateFunToolMetadata(params: {
  title: string; description: string; slug: string; keywords: string[]
}): Metadata {
  return generateCalculatorMetadata({ ...params, category: 'fun', region: 'global' })
}

export function generateDevToolJsonLd(params: {
  name: string
  description: string
  slug: string
  faqs: { question: string; answer: string }[]
}) {
  const url = `${BASE_URL}/calculators/dev/${params.slug}`
  return {
    webApp: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: params.name,
      description: params.description,
      url,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      featureList: 'Runs entirely in browser, No server upload, No signup required, No data stored',
      author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: `${BASE_URL}/calculators/dev` },
        { '@type': 'ListItem', position: 3, name: params.name, item: url },
      ],
    },
    faqPage: params.faqs.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: params.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    } : null,
  }
}

export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filterCalculatorFAQs(faqs).map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

// Health-specific: MedicalWebPage schema — used on health calculator pages
// Note: CalculatorLayout auto-adds this for Health category pages.
// Only call this manually if you need it outside CalculatorLayout.
export function generateMedicalWebPageSchema(params: {
  name: string; description: string; url: string; medicalAudience?: string; lastReviewed?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: params.name,
    description: params.description,
    url: params.url,
    audience: {
      '@type': 'MedicalAudience',
      audienceType: params.medicalAudience || 'Patient',
    },
    about: { '@type': 'MedicalCondition', name: params.name.replace(' Calculator', '') },
    author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    isAccessibleForFree: 'True',
    inLanguage: 'en-US',
    specialty: { '@type': 'MedicalSpecialty', name: 'Preventive Medicine' },
    ...(params.lastReviewed ? { lastReviewed: params.lastReviewed } : {}),
  }
}

export function generateWebAppStructuredData(params: {
  name: string; description: string; url: string; category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.category,
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
  }
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  // Auto-prefix relative URLs with BASE_URL to satisfy Google's absolute URL requirement
  const toAbsolute = (url: string) =>
    url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? url : `/${url}`}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: toAbsolute(item.url),
    })),
  }
}

/**
 * ItemList schema — helps Google understand a collection of tools.
 * Use on category pages (Finance Calculators, Health Calculators, etc.)
 */
export function generateItemListStructuredData(params: {
  name: string
  description: string
  url: string
  items: { name: string; url: string; description?: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    description: params.description,
    url: params.url,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  }
}

/**
 * WebApplication schema for individual calculator pages.
 * NOTE: Do NOT include AggregateRating unless you have real, verifiable reviews.
 * Fake review counts trigger Google's quality rater guidelines and can cause
 * manual penalties. Use this for the app identity only.
 */
export function generateCalculatorRatingSchema(params: {
  name: string
  description: string
  url: string
  ratingValue?: string
  ratingCount?: string
}) {
  // Derive correct applicationCategory from URL segment
  const appCategory = params.url.includes('/health/')
    ? 'HealthApplication'
    : params.url.includes('/dev/')
    ? 'DeveloperApplication'
    : params.url.includes('/fun/')
    ? 'EntertainmentApplication'
    : params.url.includes('/commodities/')
    ? 'FinanceApplication'
    : 'FinancialApplication'

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: appCategory,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
  }
  // Only add aggregateRating if real/verified counts are provided
  // Remove or keep commented until you have actual review data from a review platform
  // if (params.ratingValue && params.ratingCount) {
  //   schema.aggregateRating = {
  //     '@type': 'AggregateRating',
  //     ratingValue: params.ratingValue,
  //     ratingCount: params.ratingCount,
  //     bestRating: '5',
  //     worstRating: '1',
  //   }
  // }
  return schema
}

/**
 * generateCalculatorPageSchemas — server-side schema generator for page.tsx
 * Generates BreadcrumbList, HowTo, and (for health) MedicalWebPage schemas.
 * Call this in page.tsx and render alongside FAQPage/WebApplication schemas.
 *
 * Usage in page.tsx:
 *   const schemas = [
 *     ...generateCalculatorPageSchemas({ title, description, slug, category }),
 *     generateFAQStructuredData(faqs),
 *     generateCalculatorRatingSchema({ name, description, url }),
 *   ]
 *   // Then render: {schemas.map((s, i) => <script key={i} type="application/ld+json" ... />)}
 */
export function generateCalculatorPageSchemas(params: {
  title: string
  description: string
  slug: string
  category: 'finance' | 'health' | 'dev' | 'fun'
}) {
  const { title, description, slug, category } = params
  const catPath = category
  const pageUrl = `${BASE_URL}/calculators/${catPath}/${slug}`
  const catLabel = category === 'finance' ? 'Finance'
    : category === 'health' ? 'Health'
    : category === 'dev' ? 'Dev'
    : 'Fun'

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: `${catLabel} Calculators`, item: `${BASE_URL}/calculators/${catPath}` },
        { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to use the ${title}`,
      description,
      url: pageUrl,
      isAccessibleForFree: true,
      totalTime: 'PT2M',
      step: category === 'health' ? [
        { '@type': 'HowToStep', position: 1, name: 'Select your unit system', text: 'Choose US Standard (lbs/ft-in) or Metric (kg/cm) using the toggle at the top.' },
        { '@type': 'HowToStep', position: 2, name: 'Enter your measurements', text: 'Type your age, weight, height, and other values into the input fields.' },
        { '@type': 'HowToStep', position: 3, name: 'View instant results', text: 'Results calculate automatically as you type.' },
        { '@type': 'HowToStep', position: 4, name: 'Compare against healthy ranges', text: 'Check where your result falls against CDC, NIH, and AHA reference ranges.' },
        { '@type': 'HowToStep', position: 5, name: 'Read personalized guidance', text: 'Scroll down for evidence-based recommendations, FAQ answers, and related calculators.' },
      ] : [
        { '@type': 'HowToStep', position: 1, name: 'Enter your values', text: 'Enter your values in the input fields or use the sliders.' },
        { '@type': 'HowToStep', position: 2, name: 'Get instant results', text: 'Results update instantly as you type — no button to click.' },
        { '@type': 'HowToStep', position: 3, name: 'View the chart', text: 'View the interactive chart for a visual breakdown of your results.' },
        { '@type': 'HowToStep', position: 4, name: 'Review the detail table', text: 'Check the year-by-year table for detailed annual figures.' },
        { '@type': 'HowToStep', position: 5, name: 'Read the FAQ', text: 'Scroll down for worked examples and expert guidance in the FAQ section.' },
      ],
    },
  ]

  if (category === 'health') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: title,
      description,
      url: pageUrl,
      audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
      author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
      isAccessibleForFree: 'True',
      inLanguage: 'en-US',
      specialty: { '@type': 'MedicalSpecialty', name: 'Preventive Medicine' },
    })
  }

  return schemas
}
