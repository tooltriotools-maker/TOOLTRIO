import type { Metadata } from 'next'
import Link from 'next/link'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Privacy Policy | ToolTrio US ZIP Code Tools',
  description: 'Read the ToolTrio privacy policy for US ZIP code lookup, distance, timezone, ZIP+4, coordinates, radius and fun tools.',
  keywords: ['ToolTrio privacy policy', 'Tool Trio privacy', 'ZIP code tool privacy', 'ToolTrio data policy', 'ToolTrio no signup'],
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  openGraph: { title: 'Privacy Policy | ToolTrio', description: 'How ToolTrio handles information when you use its US ZIP code and fun tools.', url: `${siteUrl}/privacy-policy`, siteName: 'ToolTrio', type: 'website' },
  robots: { index: true, follow: true },
}

const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'ToolTrio Privacy Policy', url: `${siteUrl}/privacy-policy`, description: 'Privacy information for ToolTrio US ZIP code and fun tools.', publisher: { '@type': 'Organization', name: 'ToolTrio', url: siteUrl, email: contactEmail } }

const sections = [
  ['1. Using ToolTrio without an account', 'ToolTrio does not require an account to use its public ZIP code or fun tools. You can use ZIP Code Lookup, ZIP Code Distance, ZIP to Timezone, ZIP+4, coordinate and nearby-ZIP tools without creating a profile.'],
  ['2. Tool inputs', 'ZIP codes and other values entered into a public tool are used to produce the requested result. ToolTrio is designed so ordinary calculator-style inputs can be processed in the browser or through the specific service required by that tool. Do not enter information that you do not want processed by a web service.'],
  ['3. ZIP code information', 'A ZIP code is public geographic and postal information. Results may include location attributes such as city, state, county, timezone, coordinates or related ZIP information. These results should not be treated as a record of a particular person or household.'],
  ['4. Website analytics and technical data', 'Like most websites, ToolTrio may receive ordinary technical information needed to deliver and secure pages, such as browser, device, request and performance information. If analytics are enabled, they are used to understand aggregate site usage and improve the service.'],
  ['5. Cookies and local storage', 'The site may use essential browser storage or cookies for preferences, performance and site functionality. Browser storage can remain on your device until you clear it. ToolTrio does not require a login-based profile to use the public ZIP tools.'],
  ['6. Email and support requests', `If you contact ToolTrio at ${contactEmail}, we use the information in your message to respond to your request, investigate a reported ZIP tool issue or consider a product suggestion. We do not use support emails as a public ZIP database.`],
  ['7. Third-party services', 'Some site infrastructure may rely on hosting, content delivery, security, analytics or data services operated by third parties. Those providers may process technical request information under their own policies.'],
  ['8. Data choices', `For privacy questions or a request concerning information you supplied directly to ToolTrio, email ${contactEmail}. We will review reasonable requests under applicable law.`],
  ['9. Policy updates', 'ToolTrio may update this policy when the site, tools or applicable requirements change. The published version on this page is the version that applies to current use of the site.'],
]

export default function PrivacyPolicyPage() {
  return <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb"><Link href="/" className="text-gray-500 hover:text-green-600">Home</Link><span className="text-gray-300">/</span><span className="font-semibold text-gray-900">Privacy Policy</span></nav>
      <header className="mb-10"><p className="text-green-700 font-bold text-sm uppercase tracking-wider mb-3">ToolTrio privacy</p><h1 className="text-4xl font-black text-gray-900 mb-4">Privacy Policy for ToolTrio</h1><p className="text-lg text-gray-600 leading-relaxed">This policy explains how information is handled when you use ToolTrio's US ZIP code lookup, distance, timezone, ZIP+4, coordinates, radius and fun tools.</p></header>
      <div className="space-y-5">{sections.map(([title,body]) => <section key={title} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7"><h2 className="text-lg font-black text-gray-900 mb-3">{title}</h2><p className="text-gray-600 leading-relaxed text-sm md:text-base">{body}</p></section>)}</div>
      <div className="mt-8 rounded-3xl bg-green-700 p-7 text-white"><h2 className="font-black text-xl mb-2">Privacy questions?</h2><p className="text-green-50 text-sm mb-4">For questions about this policy or information you submitted directly to ToolTrio, contact {contactEmail}.</p><a href={`mailto:${contactEmail}`} className="inline-block rounded-xl bg-white px-5 py-2.5 text-green-700 font-bold">Email ToolTrio</a></div>
    </div>
  </main>
}
