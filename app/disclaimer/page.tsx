import type { Metadata } from 'next'
import Link from 'next/link'

// Inline SVG icons — no external package needed in server components
function AlertTriangle({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> }
function Calculator({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="14" y1="18" x2="16" y2="18"/></svg> }
function Heart({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> }
function Info({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> }
function Scale({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> }
function TrendingUp({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }


const siteUrl = 'https://tooltrio.com'
const contactEmail = 'tooltrio.tools@gmail.com'

export const metadata: Metadata = {
  title: 'Disclaimer | ToolTrio Calculator Results Are Estimates Only',
  description:
    'ToolTrio calculator results are mathematical estimates for informational purposes. They are not financial advice, medical advice, or legal advice. Read the full disclaimer before making decisions.',
  keywords: [
    'tooltrio disclaimer','tooltrio calculator disclaimer','tool trio disclaimer',
    'are tooltrio results accurate','tooltrio not financial advice',
    'tooltrio not medical advice','tooltrio estimates only',
    'calculator website disclaimer','online calculator disclaimer',
  ],
  alternates: { canonical: `${siteUrl}/disclaimer` },
  openGraph: {
    title: 'Disclaimer | ToolTrio Calculator Results Are Estimates Only',
    description: 'ToolTrio results are mathematical estimates. Not financial, medical, or legal advice. Read our full disclaimer.',
    url: `${siteUrl}/disclaimer`,
    siteName: 'ToolTrio',
    type: 'website',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'ToolTrio Disclaimer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer | ToolTrio Calculator Results Are Estimates Only',
    description: 'ToolTrio results are estimates. Not financial or medical advice.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
}

const disclaimerSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'ToolTrio Disclaimer',
  url: `${siteUrl}/disclaimer`,
  description: 'Disclaimer for ToolTrio calculators: results are estimates for informational purposes and do not constitute professional financial, medical, or legal advice.',
  publisher: {
    '@type': 'Organization',
    name: 'ToolTrio',
    alternateName: ['Tool Trio', 'Trio Tools', 'Toolstrio'],
    url: siteUrl,
    email: contactEmail,
  },
}

const sections = [
  {
    icon: TrendingUp, color: 'bg-green-100 text-green-700',
    title: 'Finance Calculator Disclaimer',
    items: [
      'All finance calculations — including SIP, EMI, mortgage, 401k, Roth IRA, compound interest, CAGR, and loan calculators — are mathematical estimates based on inputs you provide.',
      'Results assume fixed rates and idealized conditions. Real-world returns, tax rules, fees, and market fluctuations will differ.',
      'Past investment performance does not predict future returns. Mutual fund, stock, and real estate results shown are illustrative only.',
      'ToolTrio is not a registered financial advisor, broker, tax advisor, or lender. Nothing on this site constitutes personalized financial advice.',
      'Before making investment, loan, retirement, or tax decisions, consult a licensed Certified Financial Planner (CFP) or qualified financial professional.',
    ],
  },
  {
    icon: Heart, color: 'bg-rose-100 text-rose-700',
    title: 'Health Calculator Disclaimer',
    items: [
      'All health calculations — BMI, BMR, TDEE, calories, body fat, protein, sleep, pregnancy, ovulation — are estimates based on population-level formulas.',
      'Individual results vary significantly based on genetics, medications, medical conditions, and personal factors not captured in a calculator.',
      'BMI is a screening tool, not a diagnostic instrument. It does not measure body composition, muscle mass, or fat distribution.',
      'Nothing on ToolTrio constitutes medical advice or replaces guidance from a licensed doctor, dietitian, or healthcare provider.',
      'For any health concern or before making dietary, exercise, or medical decisions, consult a qualified healthcare professional.',
    ],
  },
  {
    icon: Info, color: 'bg-blue-100 text-blue-700',
    title: 'General Information Disclaimer',
    items: [
      'ToolTrio makes reasonable efforts to provide accurate calculators, but cannot guarantee all results are free from error.',
      'Blog articles, guides, and educational content are for informational purposes only and should not replace professional advice.',
      'Tax rules, financial regulations, health guidelines, and legal requirements vary by country, state, and individual situation.',
      'We may update, modify, or remove any calculator or content at any time without prior notice.',
      'ToolTrio is not responsible for decisions made or losses incurred based on calculator results.',
    ],
  },
  {
    icon: Scale, color: 'bg-violet-100 text-violet-700',
    title: 'Limitation of Liability',
    items: [
      'To the maximum extent permitted by law, ToolTrio and its operators are not liable for direct, indirect, or consequential damages arising from use of the site.',
      'By using ToolTrio.com, you agree that all calculators and tools are used at your own risk.',
      'ToolTrio is provided "as is" without warranties of any kind, express or implied.',
    ],
  },
]

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(disclaimerSchema) }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="flex items-center gap-2 mb-8 text-sm" aria-label="Breadcrumb">
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
              <h1 className="text-3xl font-black text-gray-900">ToolTrio Disclaimer</h1>
              <p className="text-gray-500 text-sm">Please read before using ToolTrio calculators and tools</p>
            </div>
          </div>
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
            <p className="font-black text-amber-800 text-lg mb-2">⚠️ Important</p>
            <p className="text-amber-700 leading-relaxed">
              ToolTrio calculators provide <strong>mathematical estimates for informational purposes only</strong>.
              Results are not financial advice, medical advice, legal advice, or professional recommendations.
              Always consult a qualified professional before making financial, health, or legal decisions.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {sections.map(section => {
            const Icon = section.icon
            return (
              <div key={section.title} className="rounded-3xl border p-6 md:p-8 bg-white shadow-sm" style={{ borderColor: 'rgba(226,232,240,0.7)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-black text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className="text-amber-500 font-black mt-0.5 flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
            <h2 className="text-xl font-black mb-3">✅ How to Use ToolTrio Responsibly</h2>
            <ul className="space-y-2 text-sm text-green-100">
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Use results as a starting point for understanding, not as final decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Verify outputs with a Certified Financial Planner for investment decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> Consult a licensed loan officer for mortgage or loan decisions</li>
              <li className="flex items-start gap-2"><span className="text-green-300 font-black">→</span> See a registered dietitian or physician for health and nutrition guidance</li>
            </ul>
          </div>

          <div className="text-center text-sm text-gray-400 pt-4">
            <p>Questions? <a href={`mailto:${contactEmail}`} className="text-green-600 font-semibold hover:underline">{contactEmail}</a></p>
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
