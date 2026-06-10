import type { Metadata } from 'next'
import Link from 'next/link'

// Inline SVG icons — no external package needed in server components
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function Cookie({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/></svg> }
function Database({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> }
function Eye({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> }
function Mail({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function RefreshCw({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> }
function Shield({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }


const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'
const lastUpdated = 'January 1, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy | ToolTrio — How We Handle Your Data',
  description:
    'ToolTrio\'s privacy policy explains exactly what data we collect, what we don\'t collect, how analytics work, and how to contact us with privacy questions.',
  keywords: [
    'tooltrio privacy policy','tooltrio data policy','tooltrio calculator privacy',
    'tool trio privacy','does tooltrio store my data','tooltrio no signup privacy',
    'tooltrio analytics policy','tooltrio cookie policy',
  ],
  alternates: { canonical: `${siteUrl/privacy-policy` },
  openGraph: {
    title: 'Privacy Policy | ToolTrio — How We Handle Your Data',
    description: 'ToolTrio does not require signup. Calculator inputs stay in your browser. Read our full privacy policy.',
    url: `${siteUrl}/privacy-policy`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'ToolTrio Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ToolTrio' },
    description: 'No signup, no stored inputs. Learn how ToolTrio handles privacy.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
}

const privacySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'ToolTrio Privacy Policy',
  url: `${siteUrl}/privacy-policy`,
  dateModified: '2026-01-01',
  description: 'The privacy policy for ToolTrio.com explaining data collection, analytics, cookies, and user rights.',
  publisher: {
    '@type': 'Organization',
    name: 'ToolTrio',
    url: siteUrl,
    email: contactEmail,
  },
}

const sections = [
  {
    icon: Database, color: 'bg-blue-100 text-blue-700',
    title: '1. What Data We Collect',
    content: `ToolTrio does not require account creation to use its calculators and tools.\n\nWe do not collect:\n— Your name, phone number, or contact details to use calculators\n— Financial account numbers or bank credentials\n— Payment information (all tools are free)\n\nCalculator inputs — such as loan amounts, body measurements, ZIP codes, or developer inputs — are processed locally in your browser to generate results. We do not receive or store those input values on our servers.`,
  },
  {
    icon: Cookie, color: 'bg-amber-100 text-amber-700',
    title: '2. Cookies & Analytics',
    content: `ToolTrio may use browser storage (localStorage) to save basic preferences such as currency settings or recent tool history.\n\nWe use analytics tools to understand website performance — such as which pages are visited, general geographic regions, and technical metrics. Analytics data is aggregated and not used to identify individual users.\n\nToolTrio does not sell user data to third parties for advertising.`,
  },
  {
    icon: Eye, color: 'bg-rose-100 text-rose-700',
    title: '3. How We Use Information',
    content: `Any data ToolTrio collects is used solely to operate, maintain, secure, and improve the website.\n\nIf you email us at ${contactEmail}, we use your email address only to respond to your specific inquiry. We never add you to a mailing list without your explicit consent, and we never sell or share your email address.`,
  },
  {
    icon: Shield, color: 'bg-green-100 text-green-700',
    title: '4. Third-Party Services',
    content: `ToolTrio uses third-party services for hosting, CDN delivery, analytics measurement, and security. These services are bound by their own privacy policies.\n\nCalculator inputs are not intentionally shared with advertising networks. ToolTrio does not run display ads and does not have advertising partners.`,
  },
  {
    icon: RefreshCw, color: 'bg-violet-100 text-violet-700',
    title: "5. Children's Privacy",
    content: `ToolTrio is a general-audience platform. We do not knowingly collect personal information from children under 13. If you believe a child has submitted personal information, contact us at ${contactEmail} and we will address it promptly.`,
  },
  {
    icon: Mail, color: 'bg-indigo-100 text-indigo-700',
    title: '6. Privacy Requests & Contact',
    content: `To ask questions about this policy, request deletion of any data, or report a privacy concern:\n\nEmail: ${contactEmail}\n\nWe will respond to reasonable privacy requests in accordance with applicable law and aim to reply within 5 business days.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900">ToolTrio Privacy Policy</h1>
              <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <p className="font-black text-green-800 text-lg mb-2">🔒 The Short Version</p>
            <p className="text-green-700 leading-relaxed">
              ToolTrio does not require an account. Your calculator inputs are processed in your browser and
              are not stored on our servers. We do not sell data. If you email us, we only use your email to reply.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map(section => {
            const Icon = section.icon
            return (
              <div key={section.title} className="rounded-3xl border p-6 md:p-8 bg-white shadow-sm" style={{ borderColor: 'rgba(226,232,240,0.7)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">{section.title}</h2>
                </div>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            )
          })}

          <div className="rounded-3xl border p-6 md:p-8 bg-white shadow-sm" style={{ borderColor: 'rgba(226,232,240,0.7)' }}>
            <h2 className="text-lg font-black text-gray-900 mb-3">7. Changes to This Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy periodically. The "Last updated" date at the top reflects the most recent revision.
              Continued use of ToolTrio after any changes constitutes your acceptance of the updated policy.
              We recommend reviewing this page occasionally.
            </p>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>Questions? <a href={`mailto:${contactEmail}`} className="text-green-600 font-semibold hover:underline">{contactEmail}</a></p>
            <div className="flex justify-center gap-4 mt-3">
              <Link href="/about" className="hover:text-gray-600 hover:underline">About</Link>
              <Link href="/disclaimer" className="hover:text-gray-600 hover:underline">Disclaimer</Link>
              <Link href="/contact" className="hover:text-gray-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
