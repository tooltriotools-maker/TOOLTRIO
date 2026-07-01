import Link from 'next/link'
import { GlobalSearch } from '@/components/ui/GlobalSearch'
import type { Metadata } from 'next'

function Heart({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> }
function TrendingUp({size=16,className=""}: {size?:number;className?:string}) { const w=size,h=size,cls=className; return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> }

export const metadata: Metadata = {
  title: {
    absolute: 'ToolTrio — 560+ Free Finance, Health, Dev, ZIP & Commodity Calculators',
  },
  description:
    'ToolTrio offers 560+ free tools and calculators across finance, health, developer tools, ZIP codes, commodities and fun — mortgage, 401k, BMI, JSON formatter, ZIP lookup, gold price and more. No signup. Instant results.',
  keywords: [
    'finance calculator',
    'free financial calculator',
    'mortgage calculator',
    '401k calculator',
    'compound interest calculator',
    'retirement calculator',
    'Roth IRA calculator',
    'BMI calculator',
    'developer tools online',
    'zip code lookup',
    'gold price calculator',
    'tooltrio',
    'tool trio',
  ],
  alternates: { canonical: 'https://tooltrio.com' },
  openGraph: {
    title: 'ToolTrio — 560+ Free Finance, Health, Dev, ZIP & Commodity Calculators',
    description:
      'Mortgage, 401k, BMI, JSON tools, ZIP lookup, gold price and 560+ free calculators across 6 categories. No signup. Instant results.',
    url: 'https://tooltrio.com',
    siteName: 'ToolTrio',
    images: [{ url: 'https://tooltrio.com/og-image.png', width: 1200, height: 630, alt: 'ToolTrio — 560+ Free Calculators & Tools' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolTrio — 560+ Free Finance, Health, Dev, ZIP & Commodity Calculators',
    description: 'Mortgage, 401k, BMI, ZIP lookup, gold price and 560+ free calculators. No signup required.',
    images: ['/og-image.png'],
  },
}


// Homepage FAQ schema — site-level FAQ only on homepage (not on calculator pages)
const homepageFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ToolTrio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio is a free tools and calculators website with 560+ tools across six categories: finance, health, developer tools, ZIP codes, commodities and fun. It offers mortgage calculators, 401k planners, BMI calculators, JSON formatters, ZIP code lookups, gold price calculators and more — all with no signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are ToolTrio tools and calculators free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every tool and calculator on ToolTrio — finance, health, developer, ZIP code, commodity and fun — is completely free to use with no registration, no subscription and no hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What finance calculators does ToolTrio offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio offers 270+ finance calculators including mortgage calculator, 401k calculator, compound interest calculator, Roth IRA calculator, auto loan calculator, budget planner, FIRE calculator and debt payoff calculator.',
      },
    },
    {
      '@type': 'Question',
      name: 'What health calculators does ToolTrio offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ToolTrio offers 120+ health calculators including BMI calculator, calorie calculator, TDEE calculator, BMR calculator, macro calculator, body fat calculator, ideal weight calculator and water intake calculator.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ToolTrio have developer tools, ZIP code tools and commodity calculators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ToolTrio includes 90+ developer tools (JSON formatter, regex tester, Base64 encoder, UUID generator, hash generator), 35+ US ZIP code tools (ZIP lookup, ZIP distance, ZIP to city), and 10+ commodity calculators (gold price, silver price, crude oil) — in addition to finance, health and fun calculators.',
      },
    },
  ],
}

const financeCalcs = [
  { name: 'Mortgage Calculator', desc: 'Full PITI payment', href: '/calculators/finance/mortgage-calculator', icon: '🏡', badge: 'Popular' },
  { name: '401k Calculator', desc: 'US retirement + match', href: '/calculators/finance/401k-calculator', icon: '🏛️', badge: 'USA' },
  { name: 'Compound Interest', desc: 'Power of compounding', href: '/calculators/finance/compound-interest-calculator', icon: '💰', badge: null },
  { name: 'Auto Loan Calculator', desc: 'Car loan with tax & fees', href: '/calculators/finance/auto-loan-calculator', icon: '🚗', badge: 'NEW' },
  { name: 'Roth IRA Calculator', desc: 'Tax-free retirement', href: '/calculators/finance/roth-ira-calculator', icon: '🛡️', badge: 'USA' },
  { name: 'Budget Planner', desc: '50/30/20 rule', href: '/calculators/finance/budget-planner-calculator', icon: '📊', badge: 'NEW' },
  { name: 'FIRE Calculator', desc: 'Financial independence', href: '/calculators/finance/fire-calculator', icon: '🔥', badge: null },
  { name: 'Wealth Calculator', desc: 'Net worth + projection', href: '/calculators/finance/wealth-calculator', icon: '💎', badge: 'NEW' },
  { name: 'Down Payment Calc', desc: 'Compare 5–20% down', href: '/calculators/finance/down-payment-calculator', icon: '💵', badge: 'NEW' },
  { name: 'Savings Rate Calc', desc: 'Years to FIRE', href: '/calculators/finance/savings-rate-calculator', icon: '📈', badge: 'NEW' },
  { name: 'Payoff Date Calc', desc: 'When debt-free?', href: '/calculators/finance/payoff-date-calculator', icon: '📅', badge: 'NEW' },
  { name: 'UK Income Tax', desc: 'PAYE & take-home pay', href: '/calculators/finance/uk-income-tax-calculator', icon: '🏴', badge: 'UK' },
  { name: 'SIP Calculator', desc: 'Monthly SIP returns', href: '/calculators/finance/sip-calculator', icon: '📈', badge: 'India' },
  { name: 'Debt Payoff', desc: 'Avalanche & snowball', href: '/calculators/finance/debt-payoff-calculator', icon: '🔓', badge: null },
  { name: 'Annual Income Calc', desc: 'Hourly → annual salary', href: '/calculators/finance/annual-income-calculator', icon: '💵', badge: 'NEW' },
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

const devTools = [
  { name: 'JSON Formatter', desc: 'Format & validate JSON', href: '/calculators/dev/json-formatter', icon: '🧩', badge: 'Popular' },
  { name: 'Regex Tester', desc: 'Test regex patterns live', href: '/calculators/dev/regex-tester', icon: '🔍', badge: 'Popular' },
  { name: 'Base64 Encoder', desc: 'Encode & decode Base64', href: '/calculators/dev/base64-encoder', icon: '🔐', badge: null },
  { name: 'UUID Generator', desc: 'Generate v4 UUID & ULID', href: '/calculators/dev/uuid-generator', icon: '🆔', badge: null },
  { name: 'Hash Generator', desc: 'MD5, SHA-256, SHA-512', href: '/calculators/dev/hash-generator', icon: '#️⃣', badge: null },
  { name: 'JWT Decoder', desc: 'Decode & verify JWT tokens', href: '/calculators/dev/jwt-decoder', icon: '🎫', badge: null },
  { name: 'CSS Gradient Gen', desc: 'Linear, radial, conic', href: '/calculators/dev/css-gradient-generator', icon: '🌈', badge: 'NEW' },
  { name: 'Cron Expression', desc: 'Build & explain cron jobs', href: '/calculators/dev/cron-expression', icon: '⏱️', badge: null },
  { name: 'Diff Checker', desc: 'Compare two texts', href: '/calculators/dev/diff-checker', icon: '📊', badge: null },
  { name: 'Color Converter', desc: 'HEX, RGB, HSL, CMYK', href: '/calculators/dev/color-converter', icon: '🎨', badge: null },
]

const zipTools = [
  { name: 'ZIP Code Lookup', desc: 'Find city, state & county', href: '/zip/zip-code-lookup', icon: '📮', badge: 'Popular' },
  { name: 'ZIP Code Distance', desc: 'Distance between ZIPs', href: '/zip/zip-code-distance', icon: '📏', badge: 'Popular' },
  { name: 'ZIP to City', desc: 'Reverse ZIP lookup', href: '/zip/zip-to-city', icon: '🏙️', badge: null },
  { name: 'City to ZIP', desc: 'Find ZIP codes by city', href: '/zip/city-to-zip', icon: '🗺️', badge: null },
  { name: 'ZIPs in Radius', desc: 'All ZIPs within miles', href: '/zip/zips-within-radius', icon: '🎯', badge: 'NEW' },
  { name: 'ZIP Code Map', desc: 'Visualize ZIP boundaries', href: '/zip/zip-code-map', icon: '🗾', badge: null },
  { name: 'ZIP Code Validator', desc: 'Check valid US ZIP', href: '/zip/zip-code-validator', icon: '✅', badge: null },
  { name: 'ZIP+4 Lookup', desc: 'Find ZIP+4 extension', href: '/zip/zip-plus-4-lookup', icon: '➕', badge: null },
  { name: 'ZIP to Timezone', desc: 'Find timezone by ZIP', href: '/zip/zip-to-timezone', icon: '🕐', badge: null },
  { name: 'USPS Address Format', desc: 'Format addresses correctly', href: '/zip/usps-address-format', icon: '✉️', badge: null },
]

const commodityTools = [
  { name: 'Gold Price Calculator', desc: 'Live gold price, all karats', href: '/commodities/gold-price-calculator', icon: '🥇', badge: 'Popular' },
  { name: 'Silver Price Calculator', desc: 'Live silver price per gram', href: '/commodities/silver-price-calculator', icon: '🥈', badge: 'Popular' },
  { name: 'Platinum Calculator', desc: 'Live platinum price', href: '/commodities/platinum-price-calculator', icon: '💍', badge: null },
  { name: 'Crude Oil Calculator', desc: 'WTI crude oil pricing', href: '/commodities/crude-oil-calculator', icon: '🛢️', badge: null },
  { name: 'Brent Crude Calculator', desc: 'Brent crude oil pricing', href: '/commodities/brent-crude-calculator', icon: '⛽', badge: null },
  { name: 'Natural Gas Calculator', desc: 'Live natural gas pricing', href: '/commodities/natural-gas-calculator', icon: '🔥', badge: null },
  { name: 'Gold Loan Calculator', desc: 'Loan-to-value & EMI', href: '/commodities/gold-loan-calculator', icon: '🏦', badge: null },
  { name: 'Metals P&L Calculator', desc: 'Profit/loss on metals', href: '/commodities/precious-metals-profit-calculator', icon: '📈', badge: null },
  { name: 'Portfolio Tracker', desc: 'Track commodity holdings', href: '/commodities/commodity-portfolio-tracker', icon: '💼', badge: 'NEW' },
  { name: 'Palladium Calculator', desc: 'Live palladium price', href: '/commodities/palladium-price-calculator', icon: '⚙️', badge: null },
]

const funTools = [
  { name: 'Pizza Calculator', desc: 'How many pizzas to order', href: '/calculators/fun/pizza-calculator', icon: '🍕', badge: 'Popular' },
  { name: 'Trivia Quiz', desc: 'Random trivia questions', href: '/calculators/fun/trivia-quiz', icon: '🧠', badge: 'Popular' },
  { name: 'Love Compatibility', desc: 'Fun name-based score', href: '/calculators/fun/love-compatibility', icon: '💘', badge: null },
  { name: 'Zodiac Calculator', desc: 'Find your star sign', href: '/calculators/fun/zodiac-calculator', icon: '♈', badge: null },
  { name: 'Birthday Countdown', desc: 'Days until your birthday', href: '/calculators/fun/birthday-countdown', icon: '🎂', badge: null },
  { name: 'Fortune Cookie', desc: 'Random fortune generator', href: '/calculators/fun/fortune-cookie', icon: '🥠', badge: null },
  { name: 'Personality Quiz', desc: 'Quick personality test', href: '/calculators/fun/personality-quiz', icon: '🎭', badge: null },
  { name: 'Coffee Calculator', desc: 'Perfect coffee ratio', href: '/calculators/fun/coffee-calculator', icon: '☕', badge: null },
  { name: 'How Rich Am I', desc: 'Global wealth percentile', href: '/calculators/fun/how-rich-am-i', icon: '💸', badge: null },
  { name: 'Would You Rather', desc: 'Random would-you-rather', href: '/calculators/fun/would-you-rather', icon: '🤔', badge: null },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFAQSchema) }}
      />
      <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="hero-glow" style={{ top: '-80px', left: '-60px' }} />
        <div className="hero-glow" style={{ bottom: '-80px', right: '-60px', background: 'rgba(16,185,129,0.1)' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }} />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderColor: '#d1fae5', color: '#15803d', boxShadow: '0 4px 16px rgba(22,163,74,0.1)' }}>
            <span>💰 Finance</span>
            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span>❤️ Health</span>
            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span>⚡ Dev Tools</span>
            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span>📮 ZIP Tools</span>
            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span>🥇 Commodities</span>
            <span className="w-px h-3" style={{ background: '#bbf7d0' }} />
            <span>🔒 Free · No Signup</span>
          </div>

          <h1 className="font-black mb-4 leading-tight" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', color: '#0f172a', fontFamily: "'Inter', system-ui, sans-serif" }}>
            ToolTrio —{' '}
            <span style={{ color: '#16a34a' }}>560+ Free Tools & Calculators</span>
          </h1>

          <p className="text-lg md:text-xl mb-3 max-w-2xl mx-auto" style={{ color: '#475569' }}>
            Free mortgage, 401k, BMI, calorie, JSON, ZIP code and gold price calculators across 6 categories. Make smarter financial, health and everyday decisions — instant results, no signup.
          </p>

          <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: '#94a3b8' }}>
            Trusted finance, health, developer, ZIP code and commodity tools built for everyday decisions. Plan your retirement, calculate your BMI, format JSON, look up a ZIP code or check today's gold price — all in one place.
            <br />
            <span>Also searched as Tool Trio, Trio Tools, Tools Trio and Toolstrio.</span>
          </p>

          <div className="max-w-2xl mx-auto">
            <GlobalSearch />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { label: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator' },
              { label: '401k Calculator', href: '/calculators/finance/401k-calculator' },
              { label: 'BMI Calculator', href: '/calculators/health/bmi-calculator' },
              { label: 'Calorie Calculator', href: '/calculators/health/calorie-calculator' },
              { label: 'JSON Formatter', href: '/calculators/dev/json-formatter' },
              { label: 'ZIP Code Lookup', href: '/zip/zip-code-lookup' },
              { label: 'Gold Price Calculator', href: '/commodities/gold-price-calculator' },
            ].map(t => (
              <Link key={t.label} href={t.href} className="tag-pill text-xs" style={{ padding: '8px 16px' }}>
                {t.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { val: '270+', label: 'Finance Calculators' },
              { val: '120+', label: 'Health Calculators' },
              { val: '90+', label: 'Developer Tools' },
              { val: '35+', label: 'ZIP Code Tools' },
              { val: '10+', label: 'Commodity Calculators' },
              { val: '30+', label: 'Fun Tools' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black" style={{ color: '#16a34a' }}>{s.val}</div>
                <div className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular strip */}
      <section className="border-b py-4 px-4" style={{ background: '#F0F7F0', borderColor: '#d1fae5' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-500 text-center mb-3 font-semibold uppercase tracking-wider">
            Most Popular Tools & Calculators
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator' },
              { name: '401k Calculator', href: '/calculators/finance/401k-calculator' },
              { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator' },
              { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator' },
              { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator' },
              { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator' },
              { name: 'JSON Formatter', href: '/calculators/dev/json-formatter' },
              { name: 'ZIP Code Lookup', href: '/zip/zip-code-lookup' },
              { name: 'Gold Price Calculator', href: '/commodities/gold-price-calculator' },
              { name: 'Pizza Calculator', href: '/calculators/fun/pizza-calculator' },
            ].map(c => (
              <Link key={c.href} href={c.href} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-green-700 hover:bg-green-50 hover:border-green-300 font-medium transition-all">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Category overview grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-gray-900 mb-5" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Browse All Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'Finance', count: '270+ tools', href: '/calculators/finance', icon: '💰', color: '#16a34a' },
              { name: 'Health', count: '120+ tools', href: '/calculators/health', icon: '❤️', color: '#e11d48' },
              { name: 'Dev Tools', count: '90+ tools', href: '/calculators/dev', icon: '⚡', color: '#2563eb' },
              { name: 'ZIP Tools', count: '35+ tools', href: '/zip', icon: '📮', color: '#7c3aed' },
              { name: 'Commodities', count: '10+ tools', href: '/commodities', icon: '🥇', color: '#d97706' },
              { name: 'Fun', count: '30+ tools', href: '/calculators/fun', icon: '😄', color: '#db2777' },
            ].map(c => (
              <Link key={c.href} href={c.href} className="group p-4 border rounded-2xl text-center hover:-translate-y-1 hover:shadow-lg transition-all" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)' }}>
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="text-sm font-bold text-gray-900">{c.name}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{c.count}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Finance Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <TrendingUp size={24} className="text-green-600" />
              Finance Calculators
            </h2>
            <Link href="/calculators/finance" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all finance calculators →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {financeCalcs.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-green-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-green-700 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Health Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <Heart size={24} className="text-rose-500" />
              Health Calculators
            </h2>
            <Link href="/calculators/health" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all health calculators →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {healthCalcs.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-rose-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-rose-600 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Dev Tools Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>⚡</span> Developer Tools
            </h2>
            <Link href="/calculators/dev" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all developer tools →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {devTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-blue-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ZIP Tools Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>📮</span> ZIP Code Tools
            </h2>
            <Link href="/zip" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all ZIP code tools →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {zipTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-purple-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-purple-700 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Commodities Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>🥇</span> Commodity Calculators
            </h2>
            <Link href="/commodities" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all commodity calculators →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {commodityTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-amber-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-amber-700 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Fun Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
              <span>😄</span> Fun Tools
            </h2>
            <Link href="/calculators/fun" className="text-sm font-semibold text-green-600 hover:text-green-700">
              View all fun tools →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {funTools.map(c => (
              <Link key={c.href} href={c.href} className="group p-3 border rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-pink-200/50" style={{ background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}>
                <span className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                      {c.badge}
                    </span>
                  )}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-pink-600 transition-all leading-tight">
                  {c.name}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 leading-tight">{c.desc}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Content Block */}
        <section className="mt-8 rounded-3xl p-8 border" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.5)', boxShadow: '0 8px 30px rgba(15,23,42,0.05)' }}>
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Free Finance & Health Calculators — Built for Real Decisions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🏠</span> Mortgage & Home Loan Calculators
                </h3>
                <p>
                  Buying a home is one of the biggest financial decisions you will make. Our free{' '}
                  <Link href="/calculators/finance/mortgage-calculator" className="text-green-600 hover:underline font-medium">
                    mortgage calculator
                  </Link>{' '}
                  breaks down your monthly payment into principal, interest, taxes and insurance (PITI) so you know exactly what to expect before you sign.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🏛️</span> Retirement Calculators — 401k, Roth IRA, FIRE
                </h3>
                <p>
                  Whether you are just starting out or closing in on retirement, our free{' '}
                  <Link href="/calculators/finance/401k-calculator" className="text-green-600 hover:underline font-medium">
                    401k calculator
                  </Link>
                  ,{' '}
                  <Link href="/calculators/finance/roth-ira-calculator" className="text-green-600 hover:underline">
                    Roth IRA calculator
                  </Link>
                  {' '}and{' '}
                  <Link href="/calculators/finance/fire-calculator" className="text-green-600 hover:underline">
                    FIRE calculator
                  </Link>{' '}
                  help you model your retirement savings and reach financial independence faster.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>💰</span> Compound Interest & Investment Calculators
                </h3>
                <p>
                  Time in the market beats timing the market. See exactly how your money grows with our{' '}
                  <Link href="/calculators/finance/compound-interest-calculator" className="text-green-600 hover:underline font-medium">
                    compound interest calculator
                  </Link>
                  , which supports monthly contributions, variable rates and both annual and monthly compounding.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>⚖️</span> BMI & Body Composition Calculators
                </h3>
                <p>
                  Know your numbers with our free{' '}
                  <Link href="/calculators/health/bmi-calculator" className="text-green-600 hover:underline font-medium">
                    BMI calculator
                  </Link>
                  ,{' '}
                  <Link href="/calculators/health/body-fat-calculator" className="text-green-600 hover:underline">
                    body fat calculator
                  </Link>
                  {' '}and{' '}
                  <Link href="/calculators/health/ideal-weight-calculator" className="text-green-600 hover:underline">
                    ideal weight calculator
                  </Link>
                  . Each uses clinically referenced formulas so you get results you can actually trust.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>🔥</span> Calorie, TDEE & Macro Calculators
                </h3>
                <p>
                  Reach your weight goals with a plan built around your body. Our{' '}
                  <Link href="/calculators/health/calorie-calculator" className="text-green-600 hover:underline font-medium">
                    calorie calculator
                  </Link>
                  ,{' '}
                  <Link href="/calculators/health/tdee-calculator" className="text-green-600 hover:underline">
                    TDEE calculator
                  </Link>
                  {' '}and{' '}
                  <Link href="/calculators/health/macro-calculator" className="text-green-600 hover:underline">
                    macro calculator
                  </Link>{' '}
                  give you a personalised daily target for calories, protein, carbs and fat.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>📊</span> Popular Finance Comparisons
                </h3>
                <p>
                  <Link href="/calculators/finance/roth-ira-vs-traditional-ira-calculator" className="text-green-600 hover:underline">Roth IRA vs Traditional IRA</Link>
                  {' · '}
                  <Link href="/calculators/finance/rent-vs-buy-calculator" className="text-green-600 hover:underline">Rent vs Buy</Link>
                  {' · '}
                  <Link href="/calculators/finance/pay-off-mortgage-vs-invest-calculator" className="text-green-600 hover:underline">Pay Off Mortgage vs Invest</Link>
                  {' · '}
                  <Link href="/calculators/finance/cd-vs-hysa-calculator" className="text-green-600 hover:underline">CD vs HYSA</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🆓', title: '100% Free Forever', desc: 'No signup, no credit card' },
            { icon: '🔒', title: 'Privacy-Friendly', desc: 'Calculations stay in your browser' },
            { icon: '⚡', title: 'Instant Results', desc: 'Real-time as you type' },
            { icon: '📱', title: 'Works Everywhere', desc: 'Mobile, tablet & desktop' },
          ].map(f => (
            <div key={f.title} className="text-center p-4 rounded-2xl border" style={{ background: 'rgba(240,253,244,0.8)', borderColor: 'rgba(187,247,208,0.6)', backdropFilter: 'blur(6px)' }}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-bold text-gray-900 text-sm">{f.title}</p>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: 'What is ToolTrio?',
                a: 'ToolTrio is a free tools and calculators website with 560+ tools across finance, health, developer tools, ZIP codes, commodities and fun. It offers mortgage calculators, retirement planners, BMI calculators, JSON formatters, ZIP code lookups and gold price calculators — no signup required.',
              },
              {
                q: 'What is the best free mortgage calculator?',
                a: 'Our free mortgage calculator shows your full monthly payment including principal, interest, property taxes and homeowner insurance. No signup, instant results.',
              },
              {
                q: 'How do I use the 401k calculator?',
                a: 'Enter your current age, retirement age, current balance, monthly contribution and employer match. The calculator projects your balance at retirement using compound growth.',
              },
              {
                q: 'How accurate is the BMI calculator?',
                a: 'Our BMI calculator uses the standard formula: BMI = (weight in lbs × 703) ÷ (height in inches)². It gives a quick reference for adults and is consistent with CDC guidelines.',
              },
              {
                q: 'What is TDEE and why does it matter?',
                a: 'TDEE (Total Daily Energy Expenditure) is the total number of calories your body burns in a day. Knowing your TDEE helps you set accurate calorie targets for weight loss, maintenance or muscle gain.',
              },
              {
                q: 'What is compound interest and how is it calculated?',
                a: 'Compound interest is interest earned on both your principal and previously accumulated interest. The formula is A = P(1 + r/n)^(nt). Over time, compounding turns small regular investments into significant wealth.',
              },
              {
                q: 'Are ToolTrio calculators really free?',
                a: 'Yes. Every tool and calculator on ToolTrio — finance, health, developer, ZIP code, commodity and fun — is completely free to use with no registration, no subscription and no hidden fees.',
              },
              {
                q: 'Does ToolTrio have anything besides finance and health calculators?',
                a: 'Yes. ToolTrio also includes 90+ developer tools (JSON formatter, regex tester, UUID generator), 35+ US ZIP code tools (ZIP lookup, ZIP distance, ZIP to city) and 10+ commodity calculators (gold, silver, crude oil price) — plus a Fun category with 30+ tools.',
              },
              {
                q: 'Is ToolTrio also called Tool Trio or Trio Tools?',
                a: 'Yes. ToolTrio is also searched as Tool Trio, Trio Tools, Tools Trio, Trio Tool and Toolstrio. All of these refer to ToolTrio.com.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border p-5" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', borderColor: 'rgba(226,232,240,0.8)', boxShadow: '0 4px 16px rgba(15,23,42,0.05)' }}>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  )
}