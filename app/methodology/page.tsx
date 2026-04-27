import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Methodology -- How We Build Accurate Free Finance Calculators | tooltrio.com',
  description:
    'Every calculator on tooltrio.com follows IRS guidelines, CDC standards, NIH research, CFPB rules, and SEC-validated formulas. Learn exactly how we source and verify every number.',
  keywords: [
    'finance calculator methodology', 'accurate mortgage calculator formula', 'IRS 401k formula',
    'CDC BMI formula', 'NIH calorie calculation', 'compound interest formula SEC',
    'how is BMI calculated', 'how is 401k calculated', 'financial calculator accuracy',
    'trusted financial tools USA', 'evidence based finance calculator',
  ],
  alternates: { canonical: 'https://tooltrio.com/methodology' },
  openGraph: {
    title: 'Our Methodology -- How We Build Accurate Finance Calculators',
    description: 'All formulas follow IRS, CDC, NIH, CFPB, and SEC standards. Verified and peer-reviewed.',
    url: 'https://tooltrio.com/methodology',
    type: 'article',
  },
}

const methodologySchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How tooltrio.com Builds Accurate, Trustworthy Calculators',
  description: 'Our methodology for building finance, health, and investment calculators -- all sourced from IRS, CDC, NIH, CFPB, and SEC.',
  author: { '@type': 'Organization', name: 'tooltrio.com', url: 'https://tooltrio.com' },
  publisher: { '@type': 'Organization', name: 'tooltrio.com', url: 'https://tooltrio.com' },
  datePublished: '2026-01-01',
  dateModified: '2026-03-01',
  mainEntityOfPage: 'https://tooltrio.com/methodology',
}

const sources = [
  {
    category: 'Retirement & Investment (401k, Roth IRA, FIRE)',
    icon: '🏛️',
    bg: 'bg-green-50 border-green-200',
    header: 'bg-green-700',
    formula: 'FV = PV x (1 + r)^n + PMT x [((1 + r)^n - 1) / r]',
    formulaDesc: 'Future Value with contributions. PV = present value, r = periodic rate, n = periods, PMT = regular payment.',
    tools: ['401k Calculator', 'Roth IRA Calculator', 'Retirement Calculator', 'FIRE Calculator'],
    refs: [
      { name: 'IRS Publication 590-A (IRA Limits 2026)', url: 'https://www.irs.gov/publications/p590a', desc: '2026 IRA limits: $7,000 under 50, $8,000 age 50+. Income phase-out ranges and deductibility rules.' },
      { name: 'IRS 401k Resource Guide (2026)', url: 'https://www.irs.gov/retirement-plans/401k-resource-guide-plan-participants-401k-plan-overview', desc: '2026 limits: $23,500 employee (<50), $31,000 age 50+, $70,000 total (employee + employer).' },
      { name: 'SEC Investor.gov -- Compound Interest', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator', desc: 'A = P(1 + r/n)^(nt) formula -- validated against SEC official investor calculator.' },
      { name: 'FINRA Retirement Methodology', url: 'https://www.finra.org/investors/tools-calculators', desc: '4% withdrawal rate modeling, sequence-of-returns risk, Monte Carlo probability basis.' },
    ],
  },
  {
    category: 'Mortgage & Home Loan',
    icon: '🏠',
    bg: 'bg-blue-50 border-blue-200',
    header: 'bg-blue-700',
    formula: 'M = P x [r(1+r)^n] / [(1+r)^n - 1]',
    formulaDesc: 'Monthly payment M. P = principal, r = monthly interest rate (annual / 12), n = total payments (years x 12).',
    tools: ['Mortgage Calculator', 'Home Affordability', 'Refinance Calculator', 'Rent vs Buy'],
    refs: [
      { name: 'CFPB -- Mortgage Payment Standards', url: 'https://www.consumerfinance.gov/owning-a-home/', desc: 'Monthly payment calculation, PMI threshold (< 20% down), PITI breakdown, amortization methodology.' },
      { name: 'Freddie Mac -- Affordability Guidelines', url: 'https://www.freddiemac.com/', desc: 'DTI limits: 28% front-end (housing), 36% back-end (total debt). Standard for conventional loans.' },
      { name: 'HUD -- FHA Loan Limits 2026', url: 'https://www.hud.gov/', desc: 'FHA county loan limits, MIP rates and cancellation rules.' },
    ],
  },
  {
    category: 'Health -- BMI, Calories, Macros, Body Fat',
    icon: '❤️',
    bg: 'bg-rose-50 border-rose-200',
    header: 'bg-rose-600',
    formula: 'BMR = 10W + 6.25H - 5A + 5 (men) | TDEE = BMR x Activity Factor',
    formulaDesc: 'Mifflin-St Jeor (1990, peer-reviewed). W = kg, H = cm, A = years. TDEE uses ACSM activity multipliers (1.2-1.9).',
    tools: ['BMI Calculator', 'Calorie / TDEE Calculator', 'Macro Calculator', 'Body Fat Calculator'],
    refs: [
      { name: 'CDC Adult BMI Calculator', url: 'https://www.cdc.gov/bmi/', desc: 'BMI = (weight_lbs x 703) / height_in2. Categories: Underweight < 18.5, Normal 18.5-24.9, Overweight 25-29.9, Obese 30+.' },
      { name: 'NIH Body Weight Planner', url: 'https://www.niddk.nih.gov/bwp', desc: 'TDEE and calorie deficit calculations validated by NIDDK. NIH-validated formula for weight management.' },
      { name: 'USDA Dietary Guidelines 2020-2026', url: 'https://www.dietaryguidelines.gov/', desc: 'Macro ratios: Protein 10-35%, Carbs 45-65%, Fat 20-35% of total daily calories.' },
      { name: 'Mifflin-St Jeor 1990 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/', desc: 'Peer-reviewed BMR equation, American Dietetic Association. Most accurate for adults vs Harris-Benedict.' },
      { name: 'US Navy Body Fat Formula', url: 'https://www.navy.mil/', desc: 'Men: 86.010 x log10(abdomen - neck) - 70.041 x log10(height) + 36.76. Official military standard.' },
    ],
  },
  {
    category: 'US Federal Tax Calculators',
    icon: '🧾',
    bg: 'bg-amber-50 border-amber-200',
    header: 'bg-amber-600',
    formula: 'Tax = Sigma(Bracket Rate x Income in Bracket) - Credits',
    formulaDesc: 'Progressive marginal rate calculation per IRS Publication 505. Each dollar taxed at the rate of its bracket only.',
    tools: ['Income Tax Calculator', 'Capital Gains Tax', 'Paycheck Calculator', 'Self-Employment Tax'],
    refs: [
      { name: 'IRS Tax Brackets 2026', url: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026', desc: '2026 brackets and standard deduction: $15,000 single, $30,000 married filing jointly.' },
      { name: 'IRS Self-Employment Tax', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes', desc: 'SE rate: 15.3% (12.4% SS + 2.9% Medicare) on net self-employment income.' },
      { name: 'SSA FICA Rates', url: 'https://www.ssa.gov/oact/cola/taxrates.html', desc: '6.2% SS (wage base $176,100 in 2026) + 1.45% Medicare per employee and employer.' },
    ],
  },
]

export default function MethodologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchema) }} />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-14 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-gray-200">Our Methodology</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-green-400 mb-5">
              v Evidence-Based . IRS . CDC . NIH . USDA . CFPB . SEC
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-5 leading-tight">Our Methodology</h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              Every calculator on tooltrio.com follows published government standards and peer-reviewed research. We never guess -- every number has a source you can verify.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <section className="mb-14">
            <h2 className="text-2xl font-black text-gray-900 mb-4">Our 4-Stage Accuracy Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { n: '1', title: 'Formula Verification', desc: 'Every formula is independently verified against 2+ official sources before deployment. We cross-check against IRS, CDC, and SEC official calculators.' },
                { n: '2', title: 'Annual Updates', desc: 'Tax brackets, contribution limits, and rate tables are reviewed every January for new IRS, SSA, and government announcements.' },
                { n: '3', title: 'No Rounding Errors', desc: 'All intermediate calculations use full floating-point precision. Rounding occurs only at display -- preventing compounding errors in multi-step calculations.' },
                { n: '4', title: 'Edge Case Testing', desc: 'We test extreme values (zero income, maximum contributions, age 0-120) to ensure no calculation breaks or returns incorrect results.' },
              ].map(s => (
                <div key={s.n} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-black flex-shrink-0">{s.n}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {sources.map(cat => (
            <section key={cat.category} className="mb-12">
              <div className={`border rounded-2xl overflow-hidden ${cat.bg}`}>
                <div className={`${cat.header} text-white px-6 py-4`}>
                  <h2 className="text-xl font-black flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>{cat.category}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cat.tools.map(t => (
                      <span key={t} className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-900 text-green-400 rounded-xl p-4 mb-5 font-mono text-sm">
                    <div className="text-gray-500 text-xs mb-1">Core Formula</div>
                    <div className="font-bold">{cat.formula}</div>
                    <div className="text-gray-400 text-xs mt-2">{cat.formulaDesc}</div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Official Sources</h3>
                  <div className="space-y-3">
                    {cat.refs.map((ref, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0 mt-0.5">{i + 1}</div>
                        <div>
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 hover:underline text-sm">{ref.name} ↗</a>
                          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{ref.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10">
            <h2 className="font-bold text-amber-900 mb-3">⚠️ Important Limitations</h2>
            <div className="text-sm text-amber-800 leading-relaxed space-y-2">
              <p>Our calculators provide <strong>estimates for educational purposes only</strong> -- not financial, tax, legal, or medical advice.</p>
              <p>Tax brackets, contribution limits, and rate tables change annually. Always verify with IRS.gov or a licensed professional for real money decisions.</p>
              <p>Health calculations (BMI, TDEE, body fat) use population-based averages and may not apply to your individual circumstances.</p>
            </div>
          </section>

          <section className="text-center py-8 border-t border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-3">Ready to Calculate?</h2>
            <p className="text-gray-600 mb-6">400+ calculators built on this methodology. Free, instant, no signup.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/calculators/finance/home-loan-calculator" className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">Mortgage Calculator</Link>
              <Link href="/calculators/finance/401k-calculator" className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors">401k Calculator</Link>
              <Link href="/calculators/health/bmi-calculator" className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">BMI Calculator</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
