import { GENERATED_TOOL_PAGE_METADATA } from '@/lib/catalog/generated-tool-metadata'

const BASE_URL = 'https://tooltrio.com'

const ORGANIZATION = {
  '@type': 'Organization',
  name: 'ToolTrio',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
}

export function generateWebApplicationStructuredData(params: {
  name: string
  description: string
  url: string
  applicationCategory?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.applicationCategory ?? 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: ORGANIZATION,
    isAccessibleForFree: true,
  }
}

function generateBreadcrumbNode(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    ...generateBreadcrumbNode(items),
  }
}

export function generateFunToolStructuredDataFromSlug(slug: string) {
  const key = `/calculators/fun/${slug}`
  const metadata = GENERATED_TOOL_PAGE_METADATA[key]

  if (!metadata?.title || !metadata.description) {
    throw new Error(`Missing generated metadata for fun tool slug: ${slug}`)
  }

  return generateFunToolStructuredData({
    name: metadata.title,
    description: metadata.description,
    slug,
  })
}

export function generateFunToolStructuredData(params: {
  name: string
  description: string
  slug: string
}) {
  const url = `${BASE_URL}/calculators/fun/${params.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebApplicationStructuredData({
        name: params.name,
        description: params.description,
        url,
        applicationCategory: 'EntertainmentApplication',
      }),
      generateBreadcrumbNode([
        { name: 'Home', url: BASE_URL },
        { name: 'Fun & Entertainment', url: `${BASE_URL}/calculators/fun` },
        { name: params.name, url },
      ]),
    ],
  }
}

export function generateZipToolStructuredData(params: {
  name: string
  description: string
  slug: string
}) {
  const url = `${BASE_URL}/zip/${params.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateWebApplicationStructuredData({
        name: params.name,
        description: params.description,
        url,
        applicationCategory: 'UtilitiesApplication',
      }),
      generateBreadcrumbNode([
        { name: 'Home', url: BASE_URL },
        { name: 'ZIP Tools', url: `${BASE_URL}/zip` },
        { name: params.name, url },
      ]),
    ],
  }
}

export function generateCollectionStructuredData(params: {
  name: string
  description: string
  url: string
  categoryName: string
  categoryUrl: string
  items: Array<{ name: string; url: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: params.name,
        description: params.description,
        url: params.url,
      },
      generateBreadcrumbNode([
        { name: 'Home', url: BASE_URL },
        { name: params.categoryName, url: params.categoryUrl },
      ]),
      {
        '@type': 'ItemList',
        name: params.name,
        itemListElement: params.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          url: item.url,
        })),
      },
    ],
  }
}

export const TOOLTRIO_ORGANIZATION = ORGANIZATION
