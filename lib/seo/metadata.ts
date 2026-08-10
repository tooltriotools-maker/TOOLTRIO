import type { Metadata } from 'next'
import { filterCalculatorFAQs } from '@/lib/content/faq-policy'
import { getYMYLQuality } from '@/lib/seo/ymyl'

const BASE_URL = 'https://tooltrio.com'
const SITE_NAME = 'ToolTrio'
const OG_IMAGE = `${BASE_URL}/og-image.png`

// ─────────────────────────────────────────────────────────────────────────────
// BRAND keywords — injected on every page (keep lean — 10 terms max)
// Keep topical terms for internal metadata generation only; do not emit meta keywords to HTML.
// ─────────────────────────────────────────────────────────────────────────────
const CORE_KEYWORDS = [
  'tooltrio', 'tool trio', 'tooltrio.com', 'calculator', 'finance and health tools', 'tooltrio calculator',
]

// Category core keywords — only 10-15 per category
const FINANCE_CORE_KW = [
  'finance calculator',
  'mortgage calculator', '401k calculator', 'compound interest calculator',
  'retirement calculator', 'Roth IRA calculator', 'auto loan calculator',
  'FIRE calculator', 'debt payoff calculator', 'investment calculator',
]

const HEALTH_CORE_KW = [
  'health calculator', 'BMI calculator', 'calorie calculator',
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
function sanitizeYMYLKeywords(values: string[], category: 'finance' | 'health' | 'dev' | 'fun') {
  const blocked = category === 'finance' || category === 'health'
    ? [/\bfree\b/i, /\bonline\b/i, /\bbest\b/i, /\bno[- ]?signup\b/i, /\binstant results\b/i, /\baccurate\b/i, /\bguaranteed\b/i]
    : []
  return Array.from(new Set(values.map(v => v.trim()).filter(Boolean).filter(v => !blocked.some(r => r.test(v)))))
}

export function generateCalculatorMetadata(params: {
  title: string
  description: string
  slug: string
  category: 'finance' | 'health' | 'dev' | 'fun'
  keywords: string[]
  region?: 'usa' | 'uk' | 'europe' | 'india' | 'global'
}): Metadata {
  const { title: rawTitle, description, slug, category, keywords, region = 'global' } = params
  const cleanedTitle = (category === 'finance' || category === 'health') ? rawTitle.replace(/^Free\s+/i, '') : rawTitle
  const title = (() => {
    if (cleanedTitle.length <= 70) return cleanedTitle
    const withoutBrand = cleanedTitle.replace(/\s*\|\s*ToolTrio\s*$/i, '')
    if (withoutBrand.length <= 70) return withoutBrand
    const withoutYear = withoutBrand.replace(/\s+2026\b/g, '')
    if (withoutYear.length <= 70) return withoutYear
    const cut = withoutYear.slice(0, 70)
    const lastSpace = cut.lastIndexOf(' ')
    return (lastSpace > 48 ? cut.slice(0, lastSpace) : cut).replace(/[\s—–,:;|-]+$/, '')
  })()
  const url = `${BASE_URL}/calculators/${category}/${slug}`
  const ymyl = category === 'finance' || category === 'health' ? getYMYLQuality(category, slug) : null

  const catKW = category === 'health' ? HEALTH_CORE_KW
    : category === 'finance' ? FINANCE_CORE_KW
    : category === 'dev' ? DEV_CORE_KW
    : FUN_CORE_KW

  // Deduplicate — page-specific keywords first, then brand + category
  const allKeywords = sanitizeYMYLKeywords([
    ...keywords,
    ...CORE_KEYWORDS,
    ...catKW,
  ], category)

  // Keep description within 150-160 chars and end with a clear value prop
  const rawEnriched = description.endsWith('.') ? description : `${description}.`
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
    // Do not emit the obsolete meta keywords tag. Google ignores it for Search ranking.
    authors: [{ name: 'ToolTrio', url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: ymyl ? ymyl.indexable : true,
      follow: true,
      googleBot: {
        index: ymyl ? ymyl.indexable : true,
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
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Enter the required inputs', text: 'Enter the values requested by this calculator and check the units before calculating.' },
        { '@type': 'HowToStep', position: 2, name: 'Review the calculated result', text: 'Review the result produced from the inputs and assumptions shown on the page.' },
        { '@type': 'HowToStep', position: 3, name: 'Read the methodology', text: 'Review how the result is calculated, including the formula or model described on the page.' },
        { '@type': 'HowToStep', position: 4, name: 'Check limitations', text: 'Read the assumptions and limitations before using the result for planning or decision-making.' },
        { '@type': 'HowToStep', position: 5, name: 'Review sources', text: 'Check the references and evidence status shown for the calculator before relying on the result.' },
      ],
    },
  ]

  if (category === 'health' || category === 'finance') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: pageUrl,
      isAccessibleForFree: true,
      inLanguage: 'en-US',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    })
  }

  return schemas
}
