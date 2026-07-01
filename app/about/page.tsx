import type { Metadata } from 'next'
import Link from 'next/link'

// Inline SVG icons — no external package needed in server components
function BookOpen({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> }
function Check({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="20 6 9 17 4 12"/></svg> }
function CheckCircle({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> }
function Globe({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
function Heart({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> }
function Shield({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
function Target({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> }
function TrendingUp({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }
function Zap({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> }


const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'About ToolTrio | Who We Are & What We Build',
  description:
    'ToolTrio is a free finance and health calculator website. We offer 200+ mortgage, 401k, BMI, calorie and health calculators. No signup, no ads, instant results.',
  keywords: [
    'about tooltrio','tooltrio mission','who built tooltrio','tooltrio team',
    'free calculator website','finance calculator platform','health calculator platform',
    'tooltrio about us','tool trio about ','tooltrio story',
  ],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'About ToolTrio | Who We Are & What We Build',
    description: 'ToolTrio offers free finance and health calculators — mortgage, 401k, BMI, calorie, TDEE and 200+ more. No signup, no ads, instant results.',
    url: `${siteUrl}/about`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'About ToolTrio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ToolTrio | Who We Are & What We Build',
    description: '200+ free finance and health calculators. No signup, no ads, instant results.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ToolTrio',
  url: `${siteUrl}/about`,
  description: 'ToolTrio is a free online calculator platform for finance, health, ZIP codes, developer utilities and everyday calculations.',
  mainEntity: {
    '@type': 'Organization',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio'],
    url: siteUrl,
    email: contactEmail,
    logo: `${siteUrl}/logo.png`,
    foundingDate: '2026',
    description: 'ToolTrio provides free online calculators — no signup, no ads, instant results — across finance, health, developer tools, ZIP code utilities, and more.',
  },
}

const stats = [
  { value: '560+', label: 'Free Tools & Calculators', icon: Zap },
  { value: '157+', label: 'Expert Guides', icon: BookOpen },
  { value: '4', label: 'Currencies', icon: Globe },
  { value: '0', label: 'Ads or Paywalls', icon: Shield },
]

const values = [
  { icon: Target, title: 'Accuracy First', desc: 'Every formula is verified against standard finance and health calculations used by professionals.', color: 'bg-green-100 text-green-700' },
  { icon: Shield, title: 'Privacy by Design', desc: 'No account required. Your inputs are processed in-browser and never stored on our servers.', color: 'bg-blue-100 text-blue-700' },
  { icon: Zap, title: 'Instant & Free', desc: 'Every calculator works immediately — no paywalls, no premium tiers, no upsells.', color: 'bg-amber-100 text-amber-700' },
  { icon: Globe, title: 'Built for Everyone', desc: 'Supports USD, GBP, INR and EUR. Tools cover US, UK, India, and Europe use cases.', color: 'bg-violet-100 text-violet-700' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">About</span>
        </nav>

        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 shadow-xl mb-5">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            About <span className="text-green-600">ToolTrio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We build free, fast, private calculators so anyone can get accurate answers
            to their finance, health, and everyday questions — instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                <Icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-black text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 font-semibold mt-1">{s.label}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Why We Built ToolTrio</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Most calculator websites are cluttered with ads, locked behind email signups, or show outdated formulas.
            ToolTrio was built to fix that — a clean, fast, accurate tool platform that respects your time and your privacy.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you're calculating SIP returns, working out your mortgage payment, checking your BMI,
            looking up a ZIP code, or formatting JSON — <strong>ToolTrio.com</strong> gives you the answer in seconds.
            No account. No ads. No noise.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map(v => {
              const Icon = v.icon
              return (
                <div key={v.title} className="rounded-3xl border p-6 bg-white shadow-sm">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${v.color} mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 md:p-10 text-white mb-10">
          <h2 className="text-2xl font-black mb-4">What ToolTrio Covers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Finance</h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>— SIP, EMI, FD, RD, Compound Interest</li>
                <li>— Mortgage, 401k, Roth IRA, Retirement</li>
                <li>— CAGR, XIRR, SWP, Step-Up SIP</li>
                <li>— Loan, Debt Payoff, Net Worth, Budget</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2"><Heart className="w-4 h-4" /> Health</h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>— BMI, BMR, TDEE, Calorie Calculator</li>
                <li>— Body Fat, Ideal Weight, Water Intake</li>
                <li>— Protein Intake, Sleep Cycle, Heart Rate</li>
                <li>— Pregnancy, Ovulation, Age Calculator</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <div>
              <h3 className="font-bold text-green-200 mb-2">📮 ZIP Code Tools</h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>— ZIP Lookup, City/State, Distance</li>
                <li>— Timezone, Radius, Nearest ZIP</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-200 mb-2">⚙️ Developer Tools</h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>— JSON, Regex, Base64, UUID, Hash</li>
                <li>— Color, CSS, Password, Markdown</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
          <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900 mb-3">Have a Question or Suggestion?</h2>
          <p className="text-gray-500 mb-5 text-sm">We respond to all emails and take every calculator request seriously.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all">Contact Us</Link>
            <Link href="/calculators/finance" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:border-green-400 transition-all">Browse Finance Tools</Link>
            <Link href="/calculators/health" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:border-green-400 transition-all">Browse Health Tools</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
