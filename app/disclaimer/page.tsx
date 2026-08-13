import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Disclaimer | ToolTrio US ZIP Code Results & Tools',
  description: 'ToolTrio disclaimer for US ZIP code lookup, distance, timezone, ZIP+4, coordinate, radius and fun tools. Understand estimates, source limitations and responsible use.',
  keywords: ['ToolTrio disclaimer', 'Tool Trio disclaimer', 'ZIP code tool disclaimer', 'ZIP distance disclaimer', 'ZIP timezone disclaimer', 'ZIP lookup limitations'],
  alternates: { canonical: `${siteUrl}/disclaimer` },
  openGraph: { title: 'Disclaimer | ToolTrio US ZIP Code Tools', description: 'Important limitations and responsible-use guidance for ToolTrio ZIP code tools.', url: `${siteUrl}/disclaimer`, siteName: 'ToolTrio', type: 'website' },
  robots: { index: true, follow: true },
}

const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'ToolTrio Disclaimer', url: `${siteUrl}/disclaimer`, description: 'Disclaimer and limitations for ToolTrio US ZIP code and fun tools.', publisher: { '@type': 'Organization', name: 'ToolTrio', url: siteUrl, email: contactEmail } }

const sections = [
  ['ZIP-level results are not address-level guarantees', 'A ZIP code can represent a broad delivery area or geographic region. A ZIP lookup result, coordinate, timezone, county or boundary should not automatically be interpreted as the exact location of a specific street address or property.'],
  ['Distance results are geographic estimates', 'ZIP Code Distance and radius tools use representative ZIP locations. A straight-line geographic distance is not the same as driving distance, travel time or an actual road route. Weather, traffic, roads and route restrictions are outside a ZIP-level distance calculation.'],
  ['Timezone results have geographic limits', 'A ZIP can be associated with a timezone, but postal boundaries and timezone boundaries do not always align perfectly. Use ZIP timezone results as a location-level reference rather than an address-level legal or scheduling determination.'],
  ['ZIP+4 and postal information', 'ZIP+4 information describes a finer postal delivery segment than a five-digit ZIP. When an exact mailing address or current delivery ZIP+4 is required, verify it with the United States Postal Service or another authoritative address service.'],
  ['Coordinates and maps', 'ZIP-to-coordinate results generally represent a ZIP area or representative point. They are not a survey coordinate, property boundary, emergency dispatch location or guarantee of the position of an individual address.'],
  ['Fun tools', 'ToolTrio fun generators and quizzes are provided for entertainment and general informational use. Their outputs are not psychological, professional, diagnostic or predictive assessments.'],
  ['Accuracy and availability', 'ToolTrio aims to keep its tools useful and understandable, but no public web service can guarantee that every data point is complete, current or error-free. Data sources and geographic definitions can change, and a tool may be updated or temporarily unavailable.'],
  ['Responsible use', 'Use ToolTrio as a convenient starting point. For official mailing decisions, address verification, legal boundaries, emergency services, regulated decisions or other high-precision needs, confirm the result with the relevant authoritative source.'],
]

export default function DisclaimerPage() {
  return <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb"><Link href="/" className="text-gray-500 hover:text-green-600">Home</Link><span className="text-gray-300">/</span><span className="font-semibold text-gray-900">Disclaimer</span></nav>
      <header className="mb-10"><p className="text-amber-700 font-bold text-sm uppercase tracking-wider mb-3">Before using a ZIP result</p><h1 className="text-4xl font-black text-gray-900 mb-4">ToolTrio Disclaimer</h1><p className="text-lg text-gray-600 leading-relaxed">ToolTrio provides practical US ZIP code and fun tools. Results are designed to help with everyday lookups and exploration, but they should be interpreted according to the limits of the underlying ZIP-level data.</p></header>
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-7 mb-7"><h2 className="text-xl font-black text-amber-900 mb-2">Important</h2><p className="text-amber-800 leading-relaxed">A five-digit ZIP code is not an exact street address. ZIP distance, timezone, coordinates, radius and related results are useful geographic references, not guarantees of an exact property location, road route or official postal determination.</p></div>
      <div className="space-y-5">{sections.map(([title,body]) => <section key={title} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7"><h2 className="text-lg font-black text-gray-900 mb-3">{title}</h2><p className="text-gray-600 leading-relaxed text-sm md:text-base">{body}</p></section>)}</div>
      <div className="mt-8 text-center text-sm text-gray-500"><p>Questions or corrections? <a href={`mailto:${contactEmail}`} className="text-green-700 font-bold hover:underline">{contactEmail}</a></p><div className="flex justify-center gap-4 mt-3"><Link href="/methodology" className="hover:underline">Methodology</Link><Link href="/privacy-policy" className="hover:underline">Privacy</Link><Link href="/contact" className="hover:underline">Contact</Link></div></div>
    </div>
  </main>
}
