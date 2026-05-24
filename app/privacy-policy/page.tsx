import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Database, Cookie, Mail, RefreshCw } from 'lucide-react'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'
const lastUpdated = 'January 1, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy | ToolTrio',
  description:
    'Read the ToolTrio privacy policy. Learn how ToolTrio handles calculator inputs, cookies, analytics, contact emails and privacy for free online tools and calculators.',
  keywords: [
    'ToolTrio privacy policy',
    'tooltrio privacy',
    'tool trio privacy policy',
    'trio tools privacy',
    'tools trio privacy',
    'tooltrio data policy',
    'tooltrio calculator privacy',
    'free online tools privacy policy',
    'calculator website privacy policy',
  ],
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  openGraph: {
    title: 'Privacy Policy | ToolTrio',
    description:
      'ToolTrio privacy policy for free online calculators, finance tools, health tools, ZIP tools and developer utilities.',
    url: `${siteUrl}/privacy-policy`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'ToolTrio Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ToolTrio',
    description:
      'Learn how ToolTrio handles privacy for free online calculators and tools.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const privacyPolicySchema = {
  '@context': 'https://schema.org',
  '@type': 'PrivacyPolicy',
  name: 'ToolTrio Privacy Policy',
  url: `${siteUrl}/privacy-policy`,
  dateModified: '2026-01-01',
  publisher: {
    '@type': 'Organization',
    name: 'ToolTrio',
    url: siteUrl,
    email: contactEmail,
  },
  about: {
    '@type': 'WebSite',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio'],
    url: siteUrl,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyPolicySchema),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-green-600">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className="text-3xl font-black text-gray-900"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                ToolTrio Privacy Policy
              </h1>
              <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <p className="font-black text-green-800 text-lg mb-2">
              🔒 The Short Version
            </p>
            <p className="text-green-700 leading-relaxed">
              ToolTrio is designed to be simple and privacy-friendly. Most calculator
              inputs are processed in your browser, and ToolTrio does not require account
              creation to use its free online calculators and tools. If you contact us by
              email, we use your email address only to reply to your message.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {[
            {
              icon: Database,
              color: 'bg-blue-100 text-blue-700',
              title: '1. Information We Collect',
              content: `ToolTrio does not require you to create an account to use most calculators and tools.

We do not ask for:
- Your name, phone number, or contact information to use calculators
- Financial account information or bank details
- Payment information for free tools

The numbers you enter into calculators, such as investment amounts, loan values, body measurements, ZIP codes, or other inputs, are generally processed in your browser to provide instant results.`,
            },
            {
              icon: Cookie,
              color: 'bg-amber-100 text-amber-700',
              title: '2. Cookies, Preferences & Analytics',
              content: `ToolTrio may use limited browser storage or cookies to remember basic preferences, such as currency or display settings.

ToolTrio may also use privacy-conscious analytics to understand general website performance, page usage, and technical issues. Analytics data is used in aggregate and is not used to identify individual users.

We do not sell personal information.`,
            },
            {
              icon: Eye,
              color: 'bg-rose-100 text-rose-700',
              title: '3. How We Use Information',
              content: `ToolTrio uses information only to operate, improve, secure, and maintain the website.

If you contact us via email (${contactEmail}), we use your email address solely to respond to your inquiry. We do not add you to any mailing list without your consent, and we do not sell your email address.`,
            },
            {
              icon: Shield,
              color: 'bg-green-100 text-green-700',
              title: '4. Third-Party Services',
              content: `ToolTrio may use third-party services for:
- Website hosting
- Content delivery networks (CDN)
- Analytics and performance measurement
- Security and abuse prevention

These services help ToolTrio load quickly, remain secure, and improve user experience. Calculator inputs are not intentionally sold or shared for advertising purposes.`,
            },
            {
              icon: RefreshCw,
              color: 'bg-violet-100 text-violet-700',
              title: "5. Children's Privacy",
              content: `ToolTrio is intended for general audiences and is not directed to children under 13. We do not knowingly collect personal information from children under 13.

If you believe a child has provided personal information to ToolTrio, please contact us at ${contactEmail}.`,
            },
            {
              icon: Mail,
              color: 'bg-indigo-100 text-indigo-700',
              title: '6. Contact & Data Requests',
              content: `If you have questions about this Privacy Policy or wish to make a privacy-related request, contact us:

Email: ${contactEmail}

We will review and respond to reasonable privacy requests as required by applicable law.`,
            },
          ].map(section => {
            const Icon = section.icon

            return (
              <div
                key={section.title}
                className="rounded-3xl border p-6 md:p-8"
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(226,232,240,0.7)',
                  boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            )
          })}

          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(226,232,240,0.7)',
              boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
            }}
          >
            <h2 className="text-lg font-black text-gray-900 mb-3">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. The "Last updated"
              date at the top of this page will reflect any changes. We encourage you to
              review this policy periodically. Continued use of ToolTrio after any
              changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div
            className="rounded-3xl border p-6 md:p-8"
            style={{
              background: 'rgba(240,253,244,0.82)',
              backdropFilter: 'blur(12px)',
              borderColor: 'rgba(187,247,208,0.8)',
              boxShadow: '0 8px 30px rgba(15,23,42,0.06)',
            }}
          >
            <h2 className="text-lg font-black text-gray-900 mb-3">
              8. About ToolTrio Privacy
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              ToolTrio, also searched as Tool Trio, Trio Tools, Tools Trio and Toolstrio,
              provides free online calculators and utilities including finance calculators,
              health calculators, ZIP code tools and developer tools. This Privacy Policy
              explains how privacy works across ToolTrio.com.
            </p>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>
              Questions? Email us at{' '}
              <a
                href={`mailto:${contactEmail}`}
                className="text-green-600 font-semibold hover:underline"
              >
                {contactEmail}
              </a>
            </p>

            <div className="flex justify-center gap-4 mt-3">
              <Link href="/about" className="hover:text-gray-600 hover:underline">
                About
              </Link>
              <Link href="/disclaimer" className="hover:text-gray-600 hover:underline">
                Disclaimer
              </Link>
              <Link href="/contact" className="hover:text-gray-600 hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
