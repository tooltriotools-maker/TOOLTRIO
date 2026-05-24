import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Heart, Target, Globe, Shield, Zap, BookOpen } from 'lucide-react'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'About ToolTrio — Free Online Calculators, Finance Tools & Health Tools',
  description:
    'About ToolTrio: free online calculators and tools for finance, health, SIP, EMI, BMI, TDEE, mortgage, 401k, ZIP codes, developer utilities and more. No signup, no ads, instant results.',
  keywords: [
    'ToolTrio',
    'Tool Trio',
    'Trio Tools',
    'Tools Trio',
    'Toolstrio',
    'tooltrio.com',
    'free online calculators',
    'finance calculators',
    'health calculators',
    'SIP calculator',
    'EMI calculator',
    'BMI calculator',
    'TDEE calculator',
    'mortgage calculator',
    '401k calculator',
    'ZIP code tools',
    'developer tools',
  ],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: 'About ToolTrio — Free Online Calculators & Tools',
    description:
      'ToolTrio provides free finance calculators, health calculators, ZIP tools, developer utilities and everyday calculators with no signup.',
    url: `${siteUrl}/about`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ToolTrio — Free Online Calculators & Tools',
    description:
      'Free finance, health, ZIP code and developer tools. No signup. Instant results.',
    images: [`${siteUrl}/og-image.png`],
  },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ToolTrio',
  url: `${siteUrl}/about`,
  description:
    'ToolTrio is a free online calculator and tools website for finance, health, ZIP codes, developer utilities and everyday calculations.',
  mainEntity: {
    '@type': 'Organization',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio'],
    url: siteUrl,
    email: contactEmail,
    logo: `${siteUrl}/logo.png`,
    foundingDate: '2026',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio is a free online tools website offering finance calculators, health calculators, ZIP code tools, developer utilities and everyday calculators.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ToolTrio free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ToolTrio is free to use with no signup, no ads and instant results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ToolTrio also searched as Tool Trio or Trio Tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Some users search ToolTrio as Tool Trio, Trio Tools, Tools Trio or Toolstrio.',
      },
    },
  ],
}

const stats = [
  { value: '400+', label: 'Free Calculators', icon: Zap },
  { value: '157+', label: 'Expert Guides', icon: BookOpen },
  { value: '4', label: 'Currencies Supported', icon: Globe },
  { value: '0', label: 'Ads or Signups', icon: Shield },
]

const values = [
  { icon: Target, title: 'Accuracy First', desc: 'Every formula is research-backed and verified against standard finance and health calculations.', color: 'bg-green-100 text-green-700' },
  { icon: Shield, title: 'Privacy by Design', desc: 'No account required. Your calculator inputs stay private and are not stored.', color: 'bg-blue-100 text-blue-700' },
  { icon: Zap, title: 'Instant & Free', desc: 'All calculators work instantly with no paywalls, no signup and no premium lock.', color: 'bg-amber-100 text-amber-700' },
  { icon: Globe, title: 'Works Globally', desc: 'Supports USD, GBP, INR and EUR for users in the US, UK, India and Europe.', color: 'bg-violet-100 text-violet-700' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">About ToolTrio</span>
        </nav>

        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 shadow-xl mb-5">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            About <span className="text-green-600">ToolTrio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            ToolTrio is a free online calculator and tools platform for finance, health,
            ZIP codes, developer utilities, commodities and everyday calculations.
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
          <h2 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Financial and health calculators should be <strong>free, fast, private and easy to understand</strong>.
            ToolTrio was created to help users calculate important numbers without signup, ads or confusing pages.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you are calculating SIP returns in India, mortgage payments in the US,
            401k retirement savings, BMI, TDEE, calorie needs, ZIP code details or developer utilities,
            <strong> ToolTrio.com</strong> gives instant and simple results.
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
          <h2 className="text-2xl font-black mb-4">What ToolTrio Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Finance Calculators
              </h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>- SIP, EMI, FD, RD, Compound Interest</li>
                <li>- Mortgage, 401k, Roth IRA, Retirement</li>
                <li>- CAGR, XIRR, SWP, Step-Up SIP</li>
                <li>- Loan, Debt Payoff, Net Worth</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-200 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" /> Health Calculators
              </h3>
              <ul className="text-sm text-green-100 space-y-1">
                <li>- BMI, BMR, TDEE, Calorie Calculator</li>
                <li>- Body Fat, Ideal Weight, Water Intake</li>
                <li>- Protein Intake, Sleep Cycle</li>
                <li>- Pregnancy Due Date, Ovulation</li>
              </ul>
            </div>
          </div>
          <p className="mt-5 text-green-200 text-sm">
            Also includes ZIP code tools, commodity calculators, developer tools and expert guides.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              { q: 'What is ToolTrio?', a: 'ToolTrio is a free online tools website with finance calculators, health calculators, ZIP code tools, developer utilities and everyday calculators.' },
              { q: 'Is ToolTrio free?', a: 'Yes. ToolTrio is free to use with no signup, no ads and instant results.' },
              { q: 'Is ToolTrio also called Tool Trio or Trio Tools?', a: 'Yes. Some users search ToolTrio as Tool Trio, Trio Tools, Tools Trio or Toolstrio.' },
              { q: 'Do you collect personal data?', a: 'No. ToolTrio is designed for privacy. Calculator inputs are not stored.' },
              { q: 'What currencies are supported?', a: 'ToolTrio supports USD, GBP, INR and EUR for many calculators.' },
              { q: 'Who can I contact for questions or feedback?', a: `Email us at ${contactEmail}.` },
            ].map(faq => (
              <div key={faq.q} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-gray-900 mb-1.5">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
