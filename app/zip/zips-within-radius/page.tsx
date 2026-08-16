import type { Metadata } from 'next'
import { ZipToolLayout } from '@/components/ui/ZipToolLayout'
import dynamic from 'next/dynamic'
const ZipToolClient = dynamic(() => import('./ZipToolClient'), {
  
  loading: () => (
    <div className="min-h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse m-4" />
  )
})

export const metadata: Metadata = {
  title: 'ZIP Code Radius — ZIP Codes Within a Radius | ToolTrio',
  description: 'Find all ZIP codes within any radius of a center ZIP. Enter miles and get every ZIP code nearby with population, county, and distance. Free radius search tool.',
  keywords: [
    'zip code radius',
    'zip codes within radius',
    'find zip codes near me',
    'zips within miles',
    'nearby zip codes',
    'zip code radius search',
    'zip codes by distance',
    'radius zip code finder',
    'tooltrio',
  ],
  alternates: { canonical: 'https://tooltrio.com/zip/zips-within-radius' },
  openGraph: {
    type: 'website',
    url: 'https://tooltrio.com/zip/zips-within-radius',
    siteName: 'ToolTrio',
    title: 'ZIP Code Radius — ZIP Codes Within a Radius | ToolTrio',
    description: 'Find all ZIP codes within any radius of a center ZIP code. Free tool with population data.',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ZIP Code Radius Search' }],
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: 'ZIP Code Radius — ZIP Codes Within a Radius | ToolTrio', description: 'Find all ZIP codes within any radius. Free.', images: ['https://tooltrio.com/og-image.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const relatedTools = [
  {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:'🔍'},
  {name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:'📏'},
  {name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:'🚗'},
  {name:'State ZIP Codes',href:'/zip/state-zip-codes',icon:'🗺️'},
  {name:'ZIP to City',href:'/zip/zip-to-city',icon:'🏙️'},
  {name:'Nearest ZIP Code',href:'/zip/nearest-zip-code',icon:'📍'},
]

const tips = [
  'Use 5–25 miles for local targeting; 50–100 miles for regional campaigns.',
  'The results include total population so you can estimate market size instantly.',
  'Combine with county ZIP codes for compliance and territory mapping.',
]

const seoContent = {
  verifiedDate: 'JAN 2026',
  featureCards: [
    { icon: '🎯', title: 'Radius Search', desc: 'Find every ZIP within 5–500 miles of any center ZIP code.', bullets: [] },
    { icon: '👥', title: 'Population Data', desc: 'Each result includes population so you can size your market instantly.', bullets: [] },
    { icon: '📊', title: 'Multi-State', desc: 'Results cross state lines automatically — no manual filtering needed.', bullets: [] },
  ],
  heading: 'ZIP Code Radius Search — Find All ZIP Codes Within Any Distance',
  populationChart: {
    title: 'Typical ZIP Count by Radius (Urban Area) | ToolTrio',
    subtitle: 'Number of ZIP codes within radius of a dense urban center',
    unit: 'ZIP codes',
    bars: [
      { label: '5 mi', value: 12 },
      { label: '10 mi', value: 38 },
      { label: '25 mi', value: 95 },
      { label: '50 mi', value: 210 },
      { label: '75 mi', value: 380 },
      { label: '100 mi', value: 560 },
    ],
  },
  statsTable: [
    { label: 'Max search radius', value: '500 miles' },
    { label: 'Results per search', value: 'Up to 500 ZIPs' },
    { label: 'Data included', value: 'Population, county, state, distance' },
    { label: 'Cross-state results', value: 'Yes — automatic' },
    { label: 'ZIP types included', value: 'Standard, PO Box, Unique' },
  ],
  body: `The ZIP code radius search tool finds every ZIP code within a specified mile radius of a center ZIP code. This is one of the most common geographic data tasks in business — used for delivery zone design, sales territory assignment, marketing targeting, service area definition, and logistics planning.\n\nResults include population totals so you can immediately estimate the number of people or households within your radius — critical for market sizing. Cross-state ZIP codes are included automatically, which matters for metros like New York, Kansas City, and Washington DC that span state lines.\n\nRadius searches are the foundation for hyperlocal marketing campaigns, last-mile delivery optimization, and store catchment analysis. Instead of manually identifying ZIP codes that fall within a territory, this tool returns them instantly with distances for ranking by proximity.`,
  faqs: [
    { q: 'How are ZIP codes within a radius calculated?', a: 'The tool uses the Haversine formula to calculate straight-line distance between the latitude/longitude center point of each ZIP code and the center ZIP you specify. ZIP codes whose center point falls within your radius are returned.' },
    { q: 'Does the radius search cross state lines?', a: 'Yes — results automatically include ZIP codes in neighboring states if they fall within the specified radius. This is essential for metros that span state lines.' },
    { q: 'What is the maximum search radius?', a: 'The tool supports up to 500 miles, returning up to 500 ZIP codes. For very large radii, use the filter to narrow by state or city.' },
    { q: 'Is this free?', a: 'Yes — completely free, no account needed.' },
  ],
}

export default function Page() {
  return (
    <ZipToolLayout
      slug="zips-within-radius" title="ZIP Code Radius" description="Find all ZIP codes within any mile radius of a center ZIP code." icon="🎯" relatedTools={relatedTools} tips={tips} seoContent={seoContent}>
      <ZipToolClient />
    </ZipToolLayout>
  )
}
