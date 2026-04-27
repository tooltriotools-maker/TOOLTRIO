import Link from 'next/link'
import { GlobalSearch } from '@/components/ui/GlobalSearch'
import HomeCategorySection from '@/components/ui/HomeCategorySection'
import { TrendingUp, Heart, Code2, Smile, Star, Shield, Zap, Globe, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TOOLTRIO — Free Finance & Health Calculators | 400+ Tools',
  description:
    'Free online finance calculators trusted by Americans. Mortgage calculator, 401k calculator, compound interest calculator, BMI, calorie calculator and 400+ more. No signup. Instant results.',
  keywords: [
    // Top USA volume keywords first
    'finance calculator', 'financial calculator', 'free financial calculator USA',
    'mortgage calculator', 'mortgage calculator USA 2026',
    '401k calculator', '401k calculator 2026', 'Roth IRA calculator USA',
    'compound interest calculator', 'compound interest calculator USA',
    'retirement calculator USA', 'loan calculator USA',
    'bmi calculator', 'bmi calculator USA', 'calorie calculator', 'TDEE calculator',
    // Broad
    'calculator', 'calculators', 'online calculator', 'free calculator',
    'free online calculator', 'calculator no signup', 'instant calculator',
    // Long tail
    'best mortgage calculator USA 2026', 'free 401k calculator with employer match',
    'compound interest calculator with monthly contributions USA',
    'retirement savings calculator USA free', 'BMI calculator for adults USA',
    'free calorie calculator no signup', 'financial calculator online free USA',
    // Brand
    'tooltrio.com', 'finance calculator online',
  ],
  alternates: { canonical: 'https://tooltrio.com' },
  openGraph: {
    title: 'TOOLTRIO — Free Finance & Health Calculators | 400+ Tools',
    description:
      'Free online finance calculators trusted by Americans. Mortgage, 401k, compound interest, BMI, calorie and 400+ calculators. No signup required.',
    url: 'https://tooltrio.com',
    siteName: 'tooltrio.com',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
}

const financeCalcs = [
  { name: 'Mortgage Calculator', desc: 'Full PITI payment', href: '/calculators/finance/mortgage-calculator', icon: '🏡', badge: 'NEW' },
  { name: '401k Calculator', desc: 'US retirement + match', href: '/calculators/finance/401k-calculator', icon: '🏛️', badge: 'USA' },
  { name: 'Compound Interest', desc: 'Power of compounding', href: '/calculators/finance/compound-interest-calculator', icon: '💰', badge: null },
  { name: 'Auto Loan Calculator', desc: 'Car loan with tax & fees', href: '/calculators/finance/auto-loan-calculator', icon: '🚗', badge: 'NEW' },
  { name: 'Roth IRA Calculator', desc: 'Tax-free retirement', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', badge: 'USA' },
  { name: 'Budget Planner', desc: '50/30/20 rule', href: '/calculators/finance/budget-planner-calculator', icon: '📊', badge: 'NEW' },
  { name: 'FIRE Calculator', desc: 'Financial independence', href: '/calculators/finance/fire-calculator', icon: '🔥', badge: null },
  { name: 'Wealth Calculator', desc: 'Net worth + projection', href: '/calculators/finance/wealth-calculator', icon: '💎', badge: 'NEW' },
  { name: 'Down Payment Calc', desc: 'Compare 5-20% down', href: '/calculators/finance/down-payment-calculator', icon: '💵', badge: 'NEW' },
  { name: 'Savings Rate Calc', desc: 'Years to FIRE', href: '/calculators/finance/savings-rate-calculator', icon: '📈', badge: 'NEW' },
  { name: 'Payoff Date Calc', desc: 'When debt-free?', href: '/calculators/finance/payoff-date-calculator', icon: '📅', badge: 'NEW' },
  { name: 'UK Income Tax', desc: 'PAYE & take-home pay', href: '/calculators/finance/uk-income-tax-calculator', icon: '🏴', badge: 'UK' },
  { name: 'SIP Calculator', desc: 'Monthly SIP returns', href: '/calculators/finance/sip-calculator', icon: '📈', badge: 'India' },
  { name: 'Debt Payoff', desc: 'Avalanche & snowball', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', badge: null },
  { name: 'Annual Income Calc', desc: 'Hourly -> annual salary', href: '/calculators/finance/annual-income-calculator', icon: '💵', badge: 'NEW' },
]

const healthCalcs = [
  { name: 'BMI Calculator', desc: 'Body mass index', href: '/calculators/health/bmi-calculator', icon: '⚖️', badge: 'Popular' },
  { name: 'Calorie Calculator', desc: 'Daily TDEE & macros', href: '/calculators/health/calorie-calculator', icon: '🔥', badge: 'Popular' },
  { name: 'BMR Calculator', desc: 'Basal metabolic rate', href: '/calculators/health/bmr-calculator', icon: '❤️', badge: null },
  { name: 'Body Fat Calculator', desc: 'US Navy method', href: '/calculators/health/body-fat-calculator', icon: '💪', badge: null },
  { name: 'Ideal Weight', desc: '4 formula comparison', href: '/calculators/health/ideal-weight-calculator', icon: '🏋️', badge: null },
  { name: 'Water Intake', desc: 'Daily hydration needs', href: '/calculators/health/water-intake-calculator', icon: '💧', badge: null },
  { name: 'Sleep Cycle', desc: 'Best wake up times', href: '/calculators/health/sleep-cycle-calculator', icon: '😴', badge: null },
  { name: 'Pregnancy Calculator', desc: 'Due date & trimesters', href: '/calculators/health/pregnancy-calculator', icon: '🤰', badge: null },
  { name: 'Macro Calculator', desc: 'Protein, carbs & fat', href: '/calculators/health/macro-calculator', icon: '🥗', badge: null },
  { name: 'TDEE Calculator', desc: 'Total daily energy', href: '/calculators/health/tdee-calculator', icon: '📊', badge: null },
  { name: 'Heart Rate Zones', desc: 'Training HR zones', href: '/calculators/health/heart-rate-calculator', icon: '💓', badge: null },
  { name: 'Calories Burned', desc: 'Exercise calorie burn', href: '/calculators/health/calories-burned-calculator', icon: '🏃', badge: null },
  { name: 'Protein Intake', desc: 'Daily protein needs', href: '/calculators/health/protein-intake-calculator', icon: '🥩', badge: null },
  { name: 'Blood Pressure', desc: 'BP vs AHA categories', href: '/calculators/health/blood-pressure-calculator', icon: '🩺', badge: null },
  { name: 'Intermittent Fasting', desc: '16:8 eating windows', href: '/calculators/health/intermittent-fasting-calculator', icon: '⏰', badge: null },
]

const devCalcs = [
  { name: 'JSON Formatter', desc: 'Format & validate JSON', href: '/calculators/dev/json-formatter', icon: '📋', badge: null },
  { name: 'Regex Tester', desc: 'Live regex matcher', href: '/calculators/dev/regex-tester', icon: '🔍', badge: null },
  { name: 'Color Converter', desc: 'HEX, RGB, HSL, CMYK', href: '/calculators/dev/color-converter', icon: '🎨', badge: null },
  { name: 'Base64 Encoder', desc: 'Encode/decode Base64', href: '/calculators/dev/base64-encoder', icon: '🔐', badge: null },
  { name: 'UUID Generator', desc: 'v4, ULID, NanoID', href: '/calculators/dev/uuid-generator', icon: '🆔', badge: null },
  { name: 'Password Generator', desc: 'Strong passwords', href: '/calculators/dev/password-generator', icon: '🔒', badge: null },
  { name: 'Unix Timestamp', desc: 'Epoch converter', href: '/calculators/dev/unix-timestamp', icon: '⏱️', badge: null },
  { name: 'JWT Decoder', desc: 'Decode JWT tokens', href: '/calculators/dev/jwt-decoder', icon: '🎫', badge: null },
  { name: 'Hash Generator', desc: 'MD5, SHA-256, SHA-512', href: '/calculators/dev/hash-generator', icon: '🔑', badge: null },
  { name: 'SQL Formatter', desc: 'Format SQL queries', href: '/calculators/dev/sql-formatter', icon: '🗄️', badge: null },
  { name: 'YAML Formatter', desc: 'YAML to JSON', href: '/calculators/dev/yaml-formatter', icon: '📄', badge: null },
]

const categories = [
  { label: 'Finance', icon: TrendingUp, href: '/calculators/finance', cls: 'bg-green-50 border-green-200 text-green-700', calcs: financeCalcs },
  { label: 'Health', icon: Heart, href: '/calculators/health', cls: 'bg-rose-50 border-rose-200 text-rose-700', calcs: healthCalcs },
  { label: 'Dev Tools', icon: Code2, href: '/calculators/dev', cls: 'bg-blue-50 border-blue-200 text-blue-700', calcs: devCalcs },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - USA-focused, keyword-rich, trust-building */}
      <section className="bg-gradient-to-b from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold text-white/90 mb-4">
            <span>⭐ Trusted by 2M+ Americans</span>
            <span className="w-px h-3 bg-white/30" />
            <span>🔒 No Signup . No Ads . No Data Stored</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            TOOLTRIO — Calculate Everything
          </h1>
          <p className="text-green-100 text-lg md:text-xl mb-3 max-w-2xl mx-auto">
            Mortgage calculator, 401k calculator, compound interest calculator, BMI calculator and 400+ free online tools. Instant results, no signup.
          </p>
          <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
            The #1 free financial calculator for Americans -- accurate, fast, and completely private.
          </p>
          <div className="max-w-2xl mx-auto">
            <GlobalSearch />
          </div>
          {/* Popular calculator quick links - high CTR */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 text-sm">
            {[
              'Mortgage Calculator',
              '401k Calculator',
              'Compound Interest',
              'BMI Calculator',
              'Calorie Calculator',
              'Retirement Calculator',
            ].map(t => (
              <span
                key={t}
                className="bg-white/20 px-3 py-1 rounded-full text-white/90 text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick-access bar -- most searched calculators in USA */}
      <section className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-500 text-center mb-3 font-semibold uppercase tracking-wider">
            Most Popular in USA
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator' },
              { name: '401k Calculator', href: '/calculators/finance/401k-calculator' },
              { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator' },
              { name: 'Auto Loan Calculator', href: '/calculators/finance/auto-loan-calculator' },
              { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator' },
              { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator' },
              { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator' },
              { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator' },
              { name: 'Wealth Calculator', href: '/calculators/finance/wealth-calculator' },
              { name: 'Payoff Date Calculator', href: '/calculators/finance/payoff-date-calculator' },
            ].map(c => (
              <Link
                key={c.href}
                href={c.href}
                className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-green-700 hover:bg-green-50 hover:border-green-300 font-medium transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Categories */}
        {categories.map(cat => (
          <section key={cat.label} className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <cat.icon className="w-6 h-6 text-green-600" />
                {cat.label} Calculators
              </h2>
        <Link href={cat.href} className="text-sm font-semibold text-green-600 hover:text-green-700">
    View all {cat.label} calculators →
</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {cat.calcs.map(c => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{c.icon}</span>
                    {c.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                        {c.badge}
                      </span>
                    )}
                  </span>
                  <p className="text-xs font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* USA-focused SEO content block -- rich, helpful, unique */}
        <section className="mt-8 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Free Online Finance Calculators for Americans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🏠</span> Mortgage &amp; Home Loan Calculators
                </h3>
                <p>
                  Our free{' '}
                  <Link href="/calculators/finance/home-loan-calculator" className="text-green-600 hover:underline font-medium">
                    mortgage calculator
                  </Link>{' '}
                  shows your monthly payment including principal, interest, taxes, and insurance (PITI). Use it alongside our{' '}
                  <Link href="/calculators/finance/home-affordability-calculator" className="text-green-600 hover:underline">
                    home affordability calculator
                  </Link>{' '}
                  and{' '}
                  <Link href="/calculators/finance/rent-vs-buy-calculator" className="text-green-600 hover:underline">
                    rent vs buy calculator
                  </Link>{' '}
                  to make confident real estate decisions in 2026.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🏛️</span> Retirement Calculators -- 401k, Roth IRA, FIRE
                </h3>
                <p>
                  Plan your retirement with our free{' '}
                  <Link href="/calculators/finance/401k-calculator" className="text-green-600 hover:underline font-medium">
                    401k calculator
                  </Link>
                  {' '}(includes employer match),{' '}
                  <Link href="/calculators/finance/roth-ira-calculator" className="text-green-600 hover:underline">
                    Roth IRA calculator
                  </Link>
                  , and{' '}
                  <Link href="/calculators/finance/retirement-calculator" className="text-green-600 hover:underline">
                    retirement savings calculator
                  </Link>
                  . All updated for 2026 IRS contribution limits.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💰</span> Investment &amp; Compound Interest
                </h3>
                <p>
                  See the power of compounding with our{' '}
                  <Link href="/calculators/finance/compound-interest-calculator" className="text-green-600 hover:underline font-medium">
                    compound interest calculator
                  </Link>
                  . Supports monthly contributions, annual compounding, and shows you an interactive growth chart. Also try our{' '}
                  <Link href="/calculators/finance/fire-calculator" className="text-green-600 hover:underline">
                    FIRE calculator
                  </Link>{' '}
                  for financial independence planning.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>❤️</span> Health Calculators
                </h3>
                <p>
                  Track your health goals with our free{' '}
                  <Link href="/calculators/health/bmi-calculator" className="text-green-600 hover:underline font-medium">
                    BMI calculator
                  </Link>
                  {' '}(CDC standards),{' '}
                  <Link href="/calculators/health/calorie-calculator" className="text-green-600 hover:underline">
                    calorie calculator
                  </Link>
                  , and{' '}
                  <Link href="/calculators/health/tdee-calculator" className="text-green-600 hover:underline">
                    TDEE calculator
                  </Link>
                  . Also includes{' '}
                  <Link href="/calculators/health/macro-calculator" className="text-green-600 hover:underline">
                    macro calculator
                  </Link>{' '}
                  for protein, carbs &amp; fat -- all based on NIH and USDA guidelines.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>📊</span> Why Americans Trust Our Calculators
                </h3>
                <p>
                  All 400+ calculators are completely free, require no signup, and run entirely in your browser. No data is ever stored or shared. Formulas follow IRS guidelines, CDC standards, and peer-reviewed financial research. Works seamlessly on mobile, tablet, and desktop.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🔄</span> Popular Comparisons
                </h3>
                <p>
                  <Link href="/calculators/finance/roth-ira-vs-traditional-ira-calculator" className="text-green-600 hover:underline">
                    Roth IRA vs Traditional IRA
                  </Link>
                  {' . '}
                  <Link href="/calculators/finance/rent-vs-buy-calculator" className="text-green-600 hover:underline">
                    Rent vs Buy
                  </Link>
                  {' . '}
                  <Link href="/calculators/finance/pay-off-mortgage-vs-invest-calculator" className="text-green-600 hover:underline">
                    Pay Off Mortgage vs Invest
                  </Link>
                  {' . '}
                  <Link href="/calculators/finance/hsa-vs-fsa-calculator" className="text-green-600 hover:underline">
                    HSA vs FSA
                  </Link>
                  {' . '}
                  <Link href="/calculators/finance/cd-vs-hysa-calculator" className="text-green-600 hover:underline">
                    CD vs HYSA
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust signals with review schema signals */}
        <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🆓', title: '100% Free Forever', desc: 'No signup, no credit card' },
            { icon: '🔒', title: 'Private & Secure', desc: 'No data stored, ever' },
            { icon: '⚡', title: 'Instant Results', desc: 'Real-time calculations' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Mobile, tablet & desktop' },
          ].map(f => (
            <div key={f.title} className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="text-2xl mb-1">{f.icon}</span>
              <p className="font-bold text-gray-900 text-sm">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* FAQ section -- targets featured snippets & AI answers */}
        <section className="mt-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: 'What is the best free mortgage calculator?',
                a: 'Our free mortgage calculator is one of the most comprehensive available. It calculates your monthly payment including principal, interest, property taxes, and homeowner\'s insurance (PMI) -- no signup required, instant results.',
              },
              {
                q: 'How do I use a 401k calculator?',
                a: 'Enter your current age, retirement age, current balance, monthly contribution, and employer match percentage. Our free 401k calculator uses 2026 IRS contribution limits and shows your projected balance at retirement.',
              },
              {
                q: 'What is compound interest and how is it calculated?',
                a: 'Compound interest is interest earned on both your principal and previously accumulated interest. The formula is: A = P(1 + r/n)^(nt). Our compound interest calculator handles this automatically and shows monthly contribution growth.',
              },
              {
                q: 'How accurate is the BMI calculator?',
                a: 'Our BMI calculator uses the standard CDC formula: BMI = (weight in lbs x 703) / (height in inches)2. It follows CDC and NIH adult BMI categories (Underweight, Normal, Overweight, Obese) and is accurate for adults 20+.',
              },
              {
                q: 'Are these calculators free to use?',
                a: 'Yes, all 400+ calculators on tooltrio.com are 100% free with no signup, no registration, and no credit card required. We never store your data and there are no hidden fees.',
              },
              {
                q: 'What is the difference between Roth IRA and Traditional IRA?',
                a: 'Roth IRA contributions are made with after-tax dollars; withdrawals in retirement are tax-free. Traditional IRA contributions may be tax-deductible; withdrawals are taxed as ordinary income. Use our Roth vs Traditional IRA calculator to compare based on your tax situation.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
