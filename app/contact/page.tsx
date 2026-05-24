import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Clock, CheckCircle, HelpCircle, Bug, Lightbulb, Globe } from 'lucide-react'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Contact ToolTrio — Support, Feedback, Bug Reports & Calculator Requests',
  description:
    'Contact ToolTrio for support, feedback, calculator requests, bug reports, business inquiries and media questions. Email ToolTrio at tooltrio.tools@gmail.com.',
  keywords: [
    'ToolTrio contact',
    'contact ToolTrio',
    'ToolTrio support',
    'ToolTrio email',
    'ToolTrio feedback',
    'ToolTrio bug report',
    'ToolTrio calculator request',
    'Tool Trio contact',
    'Trio Tools contact',
    'Tools Trio contact',
    'tooltrio.tools@gmail.com',
    'free online calculators support',
    'finance calculator support',
    'health calculator support',
    'developer tools support',
  ],
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contact ToolTrio — Support & Feedback',
    description:
      'Get in touch with ToolTrio for calculator requests, support, feedback, bug reports and business inquiries.',
    url: `${siteUrl}/contact`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Contact ToolTrio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ToolTrio — Support & Feedback',
    description:
      'Contact ToolTrio for support, calculator requests, feedback and bug reports.',
    images: [`${siteUrl}/og-image.png`],
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact ToolTrio',
  url: `${siteUrl}/contact`,
  description:
    'Contact ToolTrio for support, feedback, bug reports, calculator requests, business inquiries and media questions.',
  mainEntity: {
    '@type': 'Organization',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio'],
    url: siteUrl,
    email: contactEmail,
    contactPoint: {
      '@type': 'ContactPoint',
      email: contactEmail,
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can I contact ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `You can contact ToolTrio by email at ${contactEmail}.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Can I request a new calculator on ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can email ToolTrio with calculator ideas, feature requests and improvement suggestions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I report a bug or calculation issue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can report calculation errors, broken pages or technical bugs by emailing ToolTrio.',
      },
    },
  ],
}

const contactReasons = [
  { icon: HelpCircle, title: 'General Questions', desc: 'Questions about ToolTrio calculators, tools, results or how to use a feature.', color: 'bg-blue-100 text-blue-700' },
  { icon: Bug, title: 'Report a Bug', desc: 'Found a calculation error, broken page or something not working? Let us know.', color: 'bg-red-100 text-red-700' },
  { icon: Lightbulb, title: 'Feature Requests', desc: 'Want a new calculator, ZIP tool, developer utility or finance tool added?', color: 'bg-amber-100 text-amber-700' },
  { icon: Globe, title: 'Business / Media', desc: 'Press inquiries, partnerships, collaborations or business opportunities.', color: 'bg-green-100 text-green-700' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Contact ToolTrio</span>
        </nav>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600 shadow-xl mb-5">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Contact ToolTrio
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Have a question, found a bug, or want to suggest a new calculator or online tool?
            We would love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-5">
            <Mail className="w-7 h-7 text-green-700" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Email ToolTrio
          </h2>
          <p className="text-gray-500 mb-5">
            The fastest way to reach us for support, feedback, calculator requests and bug reports.
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl text-lg"
            style={{
              background: 'linear-gradient(135deg,#22c55e,#16a34a)',
              boxShadow: '0 10px 25px rgba(34,197,94,0.25)',
              transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
            }}
          >
            <Mail className="w-5 h-5" />
            {contactEmail}
          </a>
          <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>We typically respond within <strong>24 hours</strong></span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-5 text-center">
            What Can We Help With?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactReasons.map(r => {
              const Icon = r.icon
              return (
                <div
                  key={r.title}
                  className="rounded-3xl border p-6"
                  style={{
                    background: 'rgba(255,255,255,0.82)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(226,232,240,0.7)',
                    boxShadow: '0 8px 30px rgba(15,23,42,0.05)',
                  }}
                >
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

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Our Response Commitment
          </h2>
          <ul className="space-y-3 text-sm text-green-100">
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />We respond to all emails as soon as possible</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Bug reports are reviewed and fixed as quickly as possible</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />Feature requests are tracked and considered for future ToolTrio updates</li>
            <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" />We never sell your email address</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Before emailing, you might find your answer here:</p>
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
