import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://tooltrio.com'

export const metadata: Metadata = {
  title: 'ToolTrio Methodology | How Our US ZIP Code Tools Work',
  description: 'Learn how ToolTrio designs US ZIP code lookup, distance, timezone, coordinate, ZIP+4 and nearby-ZIP tools, including inputs, transformations, assumptions and limitations.',
  keywords: ['ToolTrio methodology', 'ZIP code methodology', 'ZIP code lookup methodology', 'ZIP code distance formula', 'ZIP timezone methodology', 'ZIP coordinates', 'ZIP+4 methodology'],
  alternates: { canonical: `${siteUrl}/methodology` },
  openGraph: { title: 'ToolTrio Methodology | US ZIP Code Tools', description: 'How ToolTrio structures, explains and validates its US ZIP code utilities.', url: `${siteUrl}/methodology`, siteName: 'ToolTrio', type: 'website' },
  robots: { index: true, follow: true },
}

const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'ToolTrio Methodology', url: `${siteUrl}/methodology`, description: 'Methodology for ToolTrio US ZIP code tools.', about: { '@type': 'Thing', name: 'US ZIP code tools' }, publisher: { '@type': 'Organization', name: 'ToolTrio', url: siteUrl } }

const methods = [
  { title: 'ZIP Code Lookup', href: '/zip/zip-code-lookup', points: ['Accept a five-digit US ZIP input.', 'Resolve the ZIP to the location attributes available to the tool.', 'Present city, state, county and other available fields separately so each result is readable.', 'Do not treat a ZIP centroid as the exact location of every address in the ZIP.'] },
  { title: 'ZIP Code Distance', href: '/zip/zip-code-distance', points: ['Resolve both ZIP inputs to representative coordinates.', 'Calculate the geographic distance between those coordinates.', 'Show miles and kilometers where supported.', 'Treat the result as a ZIP-to-ZIP geographic estimate rather than driving distance unless a route tool is explicitly used.'] },
  { title: 'ZIP Timezone', href: '/zip/zip-to-timezone', points: ['Map the supplied ZIP to its associated timezone information.', 'Keep timezone names and offsets distinct from the local clock time.', 'Account for the fact that ZIP boundaries and timezone boundaries are not identical in every location.', 'Use the result as a ZIP-level lookup, not a street-address geolocation guarantee.'] },
  { title: 'ZIP to Coordinates', href: '/zip/zip-to-coordinates', points: ['Resolve the ZIP to representative latitude and longitude data.', 'Display coordinates in a consistent decimal format.', 'Explain that ZIP-level coordinates represent a geographic area or centroid rather than a precise property location.', 'Link the result to other ZIP tools when the user needs distance or map context.'] },
  { title: 'ZIP+4', href: '/zip/zip-plus-4-lookup', points: ['Keep the five-digit ZIP and four-digit extension concept separate.', 'Explain that ZIP+4 can identify a smaller delivery segment than a five-digit ZIP.', 'Use clear formatting so users can distinguish ZIP+4 from an ordinary five-digit ZIP.', 'Point users to the official USPS lookup when an exact street-address delivery suffix is required.'] },
  { title: 'Nearby ZIPs & Radius', href: '/zip/zips-within-radius', points: ['Start from a selected ZIP and its representative location.', 'Compare nearby ZIP locations against the requested radius.', 'Clearly label the result as a geographic-radius result.', 'Avoid implying that a radius result is the same as driving time or road distance.'] },
]

export default function MethodologyPage() {
  return <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="max-w-5xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb"><Link href="/" className="text-gray-500 hover:text-green-600">Home</Link><span className="text-gray-300">/</span><span className="font-semibold text-gray-900">Methodology</span></nav>
      <header className="mb-12"><p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-3">How ToolTrio works</p><h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">US ZIP Code Tool Methodology</h1><p className="text-xl text-gray-600 max-w-3xl leading-relaxed">ToolTrio breaks common ZIP code questions into focused utilities. Each tool starts with a clearly defined input, applies a documented location relationship or calculation, and explains the limits of the result.</p></header>
      <section className="grid md:grid-cols-3 gap-4 mb-10">{[['1','Normalize','We validate and normalize the ZIP input before using it.'],['2','Resolve','We connect the ZIP to the location data needed by the specific tool.'],['3','Explain','We present the result with the assumptions that matter.']].map(([n,t,d]) => <div key={t} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-black flex items-center justify-center mb-4">{n}</div><h2 className="font-black text-gray-900 mb-2">{t}</h2><p className="text-sm text-gray-600 leading-relaxed">{d}</p></div>)}</section>
      <div className="space-y-5">{methods.map(m => <section key={m.title} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7 md:p-8"><div className="flex items-start justify-between gap-4 mb-4"><h2 className="text-2xl font-black text-gray-900">{m.title}</h2><Link href={m.href} className="text-sm font-bold text-green-700 hover:underline whitespace-nowrap">Open tool →</Link></div><ul className="space-y-2 text-gray-600 leading-relaxed text-sm md:text-base">{m.points.map(point => <li key={point} className="flex gap-2"><span className="text-green-600 font-black">✓</span><span>{point}</span></li>)}</ul></section>)}</div>
      <section className="mt-8 bg-amber-50 border border-amber-200 rounded-3xl p-7"><h2 className="text-xl font-black text-gray-900 mb-2">Important ZIP-level limitation</h2><p className="text-sm text-gray-700 leading-relaxed">A US ZIP code generally describes a geographic or postal delivery area. It is not a guarantee of an exact street location, property boundary, driving route, or address-level timezone. When precision matters, use the appropriate address-level or official postal source.</p></section>
    </div>
  </main>
}
