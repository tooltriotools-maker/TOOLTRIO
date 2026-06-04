import type { Metadata } from 'next'
import Link from 'next/link'

// Inline SVG icons — no external package needed in server components
function Bug({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="8" y="6" width="8" height="14" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="m10 4 1 2"/><path d="m14 4-1 2"/></svg> }
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function Check({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="20 6 9 17 4 12"/></svg> }
function CheckCircle({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> }
function Clock({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> }
function Globe({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
function HelpCircle({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
function Lightbulb({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg> }
function Mail({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }


const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Contact ToolTrio | Get Help, Report Bugs & Request Calculators',
  description:
    'Get in touch with ToolTrio. Email us for support, bug reports, new calculator requests, or business inquiries. We respond within 24 hours.',
  keywords: [
    'contact tooltrio','tooltrio support email','tooltrio bug report',
    'request a calculator tooltrio','tooltrio help','tool trio contact',
    'tooltrio feedback','tooltrio business inquiry','tooltrio.tools@gmail.com',
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contact ToolTrio | Get Help, Report Bugs & Request Calculators',
    description: 'Email ToolTrio for support, bug reports, calculator requests and business inquiries. We respond within 24 hours.',
    url: `${siteUrl}/contact`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'Contact ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ToolTrio | Support & Feedback',
    description: 'Email us for calculator support, bug reports or new tool requests.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact ToolTrio',
  url: `${siteUrl}/contact`,
  description: 'Contact ToolTrio for support, feedback, bug reports, calculator requests and business inquiries.',
  mainEntity: {
    '@type': 'Organization',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Toolstrio'],
    url: siteUrl,
    email: contactEmail,
    contactPoint: {
      '@type': 'ContactPoint',
      email: contactEmail,
      contactType: 'customer support',
      availableLanguage: ['English'],
      responseTime: 'P1D',
    },
  },
}

const reasons = [
  { icon: HelpCircle, title: 'General Support', desc: 'Questions about how a calculator works, what a result means, or how to use a specific feature.', color: 'bg-blue-100 text-blue-700' },
  { icon: Bug, title: 'Bug Reports', desc: 'Found a wrong calculation, a broken page, or something behaving unexpectedly? Tell us.', color: 'bg-red-100 text-red-700' },
  { icon: Lightbulb, title: 'Calculator Requests', desc: 'Want a new finance, health, ZIP or developer tool added to ToolTrio? We build from requests.', color: 'bg-amber-100 text-amber-700' },
  { icon: Globe, title: 'Business & Partnerships', desc: 'Press, media, data partnerships, or collaboration opportunities with ToolTrio.', color: 'bg-green-100 text-green-700' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Contact</span>
        </nav>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 shadow-xl mb-5">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Contact ToolTrio</h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Found a bug? Want a new tool? Have a question? We read every email and reply promptly.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-5">
            <Mail className="w-7 h-7 text-green-700" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Email Us Directly</h2>
          <p className="text-gray-500 mb-5 text-sm">The fastest way to reach us for anything ToolTrio related.</p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl text-lg transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 10px 25px rgba(34,197,94,0.25)' }}
          >
            <Mail className="w-5 h-5" />
            {contactEmail}
          </a>
          <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>We typically reply within <strong>24 hours</strong></span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-5 text-center">What Can We Help With?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map(r => {
              const Icon = r.icon
              return (
                <div key={r.title} className="rounded-3xl border p-6 bg-white shadow-sm" style={{ borderColor: 'rgba(226,232,240,0.7)' }}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.color} mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mb-8">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Our Commitment to You
          </h2>
          <ul className="space-y-3 text-sm text-green-100">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Every email is read and replied to as quickly as possible</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Bug reports are investigated and fixed promptly</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Calculator requests are reviewed and added to our roadmap</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Your email is never sold, shared, or added to a list without consent</li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Looking for something else?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/about" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-all">About ToolTrio</Link>
            <Link href="/privacy-policy" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-all">Privacy Policy</Link>
            <Link href="/disclaimer" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-all">Disclaimer</Link>
            <Link href="/blog" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-green-400 transition-all">Blog & Guides</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
