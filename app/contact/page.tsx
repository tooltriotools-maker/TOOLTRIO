import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Contact ToolTrio | ZIP Code Tool Support & Corrections',
  description: 'Contact ToolTrio about US ZIP code lookup, distance, timezone, ZIP+4, coordinates, radius tools, bugs, data corrections and new ZIP tool ideas.',
  keywords: ['contact tooltrio', 'Tool Trio contact', 'ZIP code tool support', 'ZIP code correction', 'ZIP code lookup support', 'ZIP code data feedback'],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: { title: 'Contact ToolTrio | ZIP Code Tool Support', description: 'Get help with ToolTrio US ZIP code tools, report issues or suggest a useful ZIP-related tool.', url: `${siteUrl}/contact`, siteName: 'ToolTrio', type: 'website' },
  robots: { index: true, follow: true },
}

const schema = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact ToolTrio', url: `${siteUrl}/contact`, description: 'Contact ToolTrio for US ZIP code tool support, corrections and feedback.', mainEntity: { '@type': 'Organization', name: 'ToolTrio', url: siteUrl, email: contactEmail, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: contactEmail } } }

const topics = [
  ['📮 ZIP Lookup', 'Questions or issues with city, state, county and ZIP lookup results.'],
  ['📏 ZIP Distance', 'Report unexpected distance results or suggest a distance-related improvement.'],
  ['🕐 ZIP Timezone', 'Tell us about a timezone result that needs review or clarification.'],
  ['➕ ZIP+4', 'Ask about ZIP+4 explanations, formatting or lookup behavior.'],
  ['🌐 Coordinates', 'Report a coordinate issue or suggest a location-data improvement.'],
  ['🎯 Nearby ZIPs', 'Share feedback about radius, nearby ZIP or ZIP cluster tools.'],
]

export default function ContactPage() {
  return <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-sky-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb"><Link href="/" className="text-gray-500 hover:text-green-600">Home</Link><span className="text-gray-300">/</span><span className="font-semibold text-gray-900">Contact</span></nav>
      <header className="text-center mb-10"><p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-3">ToolTrio support</p><h1 className="page-title text-4xl md:text-5xl font-black text-gray-900 mb-4">Contact ToolTrio</h1><p className="text-lg text-gray-600 max-w-2xl mx-auto">Have a ZIP code result to report, a data correction to suggest, or an idea for a better US ZIP tool? Send us the details.</p></header>
      <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-8 text-center"><div className="text-5xl mb-4">✉️</div><h2 className="text-2xl font-black text-gray-900 mb-2">ZIP-focused support</h2><p className="text-gray-600 mb-6">Email us with the tool name, the ZIP code or inputs involved, what you expected, and what you saw. That makes an issue much easier to reproduce.</p><a href={`mailto:${contactEmail}?subject=ToolTrio%20ZIP%20Tool%20Feedback`} className="inline-flex px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700">{contactEmail}</a></section>
      <section className="mb-8"><h2 className="text-2xl font-black text-gray-900 mb-5">What you can contact us about</h2><div className="grid md:grid-cols-2 gap-4">{topics.map(([title,desc]) => <div key={title} className="bg-white border border-gray-200 rounded-2xl p-5"><h3 className="font-black text-gray-900 mb-1">{title}</h3><p className="text-sm text-gray-600 leading-relaxed">{desc}</p></div>)}</div></section>
      <section className="bg-gray-900 rounded-3xl p-8 text-white"><h2 className="text-xl font-black mb-3">For the fastest response</h2><ul className="space-y-2 text-gray-300 text-sm"><li>• Include the exact ToolTrio page you used.</li><li>• Include the ZIP code or ZIP codes involved when appropriate.</li><li>• Describe the expected result and the result you received.</li><li>• Do not send passwords, payment details or other private information.</li></ul></section>
    </div>
  </main>
}
