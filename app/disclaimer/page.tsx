import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Info, TrendingUp, Heart, Scale } from 'lucide-react'

const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Disclaimer | ToolTrio Calculators, Finance Tools & Health Tools',
  description:
    'Read the ToolTrio disclaimer for finance calculators, health calculators, SIP, EMI, mortgage, 401k, BMI, calorie, ZIP tools and developer utilities. ToolTrio results are estimates for informational purposes only.',
  keywords: [
    'ToolTrio disclaimer',
    'tooltrio calculator disclaimer',
    'Tool Trio disclaimer',
    'Trio Tools disclaimer',
    'Tools Trio disclaimer',
    'finance calculator disclaimer',
    'health calculator disclaimer',
    'SIP calculator disclaimer',
    'EMI calculator disclaimer',
    'mortgage calculator disclaimer',
    '401k calculator disclaimer',
    'BMI calculator disclaimer',
    'calorie calculator disclaimer',
    'online calculator disclaimer',
    'free online tools disclaimer',
  ],
  alternates: { canonical: `${siteUrl}/disclaimer` },
  openGraph: {
    title: 'Disclaimer | ToolTrio Calculators & Tools',
    description:
      'Important disclaimer for ToolTrio calculators and tools. Results are estimates and not financial, medical, legal or professional advice.',
    url: `${siteUrl}/disclaimer`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'ToolTrio Disclaimer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer | ToolTrio Calculators & Tools',
    description:
      'ToolTrio calculator results are estimates for informational purposes only.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const disclaimerSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'ToolTrio Disclaimer',
  url: `${siteUrl}/disclaimer`,
  description:
    'Disclaimer for ToolTrio calculators and tools. Results are estimates and do not constitute financial, medical, legal or professional advice.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'ToolTrio',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Tools Trio', 'Toolstrio'],
    url: siteUrl,
    email: contactEmail,
    logo: `${siteUrl}/logo.png`,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are ToolTrio calculator results financial advice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ToolTrio calculator results are estimates for informational and educational purposes only and do not constitute financial advice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are ToolTrio health calculator results medical advice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. ToolTrio health calculator results are estimates and do not replace advice from a qualified healthcare provider.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I contact ToolTrio about this disclaimer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `You can contact ToolTrio by email at ${contactEmail}.`,
      },
    },
  ],
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(disclaimerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">Disclaimer</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                ToolTrio Disclaimer
              </h1>
              <p className="text-gray-500 text-sm">Please read this carefully before using ToolTrio calculators and tools</p>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
            <p className="font-black text-amber-800 text-lg mb-2">⚠️ Important Notice</p>
            <p className="text-amber-700 leading-relaxed">
              The calculators, tools and information on ToolTrio.com are provided for <strong>informational and educational purposes only</strong>.
              They do not constitute financial advice, medical advice, legal advice, tax advice or professional recommendations.
              Always consult a qualified professional before making financial, health, legal or tax decisions.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              icon: TrendingUp, color: 'bg-green-100 text-green-700',
              title: 'Financial Calculator Disclaimer',
              content: [
                'All financial calculations on ToolTrio, including SIP, EMI, compound interest, CAGR, XIRR, retirement, mortgage, 401k, Roth IRA and loan calculators, are estimates based on the inputs you provide and standard mathematical formulas.',
                'Results assume rates, timelines and values entered by the user. Real-world investment returns, interest rates, taxes, fees and market conditions may vary.',
                'Past performance of mutual funds, stocks, real estate or any investment does not guarantee future results.',
                'Loan and mortgage calculations may assume fixed interest rates. Variable-rate loans, fees, taxes and insurance can produce different results.',
                'ToolTrio.com is not a registered financial advisor, broker, investment firm, tax advisor or lender. Nothing on this website constitutes personalized financial advice.',
                'Before making investment, loan, tax or retirement planning decisions, consult a qualified financial, tax or legal professional.',
              ],
            },
            {
              icon: Heart, color: 'bg-rose-100 text-rose-700',
              title: 'Health Calculator Disclaimer',
              content: [
                'All health calculations on ToolTrio, including BMI, BMR, TDEE, calorie needs, body fat, ideal weight, water intake, protein, sleep, pregnancy and ovulation calculators, are estimates based on general formulas and population-level research.',
                'Individual results can vary based on genetics, medical conditions, medications, age, activity level and other personal factors not captured by calculators.',
                'BMI is a screening estimate, not a diagnostic measure. It does not fully account for muscle mass, bone density, body composition or fat distribution.',
                'Calorie, protein and nutrition calculations are starting estimates only. Individual metabolism and health needs vary widely.',
                'Pregnancy and ovulation calculators provide estimates based on average cycle data. Actual dates may vary.',
                'Nothing on ToolTrio constitutes medical advice or replaces guidance from a qualified healthcare provider, doctor, dietitian or certified health professional.',
                'If you have a medical condition or health concern, consult your physician before making health, diet, exercise or lifestyle changes.',
              ],
            },
            {
              icon: Info, color: 'bg-blue-100 text-blue-700',
              title: 'General Information Disclaimer',
              content: [
                'ToolTrio.com makes reasonable efforts to provide useful and accurate calculators, but we cannot guarantee that all calculations, formulas, content or results are error-free.',
                'ToolTrio is not responsible for financial losses, health outcomes, legal consequences or decisions made based on the use of calculators, tools, guides or website content.',
                'Blog articles, guides and educational content on ToolTrio are for informational purposes only and should not be used as the sole basis for any decision.',
                'Tax rules, financial regulations, health guidance and legal requirements vary by country, state and personal situation. Consult a qualified professional for personalized advice.',
                'We may modify, update, improve or discontinue any calculator, tool or content without notice.',
              ],
            },
            {
              icon: Scale, color: 'bg-violet-100 text-violet-700',
              title: 'Limitation of Liability',
              content: [
                'To the maximum extent permitted by applicable law, ToolTrio.com and its operators shall not be liable for any direct, indirect, incidental, special, consequential or punitive damages arising from the use of our calculators, tools or website.',
                'By using ToolTrio.com, you agree that you are using the calculators and tools at your own risk.',
                'ToolTrio.com is provided "as is" and "as available" without warranties of any kind, express or implied.',
                'This disclaimer is governed by and construed in accordance with applicable laws.',
              ],
            },
          ].map(section => {
            const Icon = section.icon
            return (
              <div key={section.title} className="rounded-3xl border p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)', borderColor: 'rgba(226,232,240,0.7)', boxShadow: '0 8px 30px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="text-amber-500 font-black mt-0.5 flex-shrink-0">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
            <h2 className="text-xl font-black mb-3">✅ We Encourage You To:</h2>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Use ToolTrio calculators as a starting point for research and understanding</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Consult a Certified Financial Planner (CFP) or qualified advisor for investment decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Work with a licensed loan officer for mortgage and loan decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> See a registered dietitian or doctor for personalized health guidance</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Consult an OB-GYN for pregnancy and reproductive health matters</li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>
              Questions?{' '}
              <a href={`mailto:${contactEmail}`} className="text-green-600 font-semibold hover:underline">
                {contactEmail}
              </a>
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <Link href="/about" className="hover:text-gray-600 hover:underline">About</Link>
              <Link href="/privacy-policy" className="hover:text-gray-600 hover:underline">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-gray-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
