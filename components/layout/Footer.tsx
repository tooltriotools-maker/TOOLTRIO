'use client'
import Link from 'next/link'
import { TrendingUp, Heart, Mail, Shield, FileText, Info, BookOpen } from 'lucide-react'

const contactEmail = 'tooltrio.tools@gmail.com'

const financeLinks = [
  ['SIP Calculator', '/calculators/finance/sip-calculator'],
  ['EMI Calculator', '/calculators/finance/emi-calculator'],
  ['FD Calculator', '/calculators/finance/fd-calculator'],
  ['RD Calculator', '/calculators/finance/rd-calculator'],
  ['Compound Interest', '/calculators/finance/compound-interest-calculator'],
  ['CAGR Calculator', '/calculators/finance/cagr-calculator'],
  ['Retirement Calculator', '/calculators/finance/retirement-calculator'],
  ['Mortgage Calculator', '/calculators/finance/mortgage-calculator'],
  ['401k Calculator', '/calculators/finance/401k-calculator'],
  ['Budget Planner', '/calculators/finance/budget-planner-calculator'],
  ['View All Finance →', '/calculators/finance'],
]

const healthLinks = [
  ['BMI Calculator', '/calculators/health/bmi-calculator'],
  ['Calorie Calculator', '/calculators/health/calorie-calculator'],
  ['BMR Calculator', '/calculators/health/bmr-calculator'],
  ['TDEE Calculator', '/calculators/health/tdee-calculator'],
  ['Body Fat Calculator', '/calculators/health/body-fat-calculator'],
  ['Ideal Weight', '/calculators/health/ideal-weight-calculator'],
  ['Water Intake', '/calculators/health/water-intake-calculator'],
  ['Protein Intake', '/calculators/health/protein-intake-calculator'],
  ['Sleep Cycle', '/calculators/health/sleep-cycle-calculator'],
  ['Pregnancy Calculator', '/calculators/health/pregnancy-calculator'],
  ['View All Health →', '/calculators/health'],
]

const zipLinks = [
  ['ZIP Code Lookup', '/zip/zip-code-lookup'],
  ['ZIP Distance', '/zip/zip-code-distance'],
  ['ZIP to City', '/zip/zip-to-city'],
  ['City to ZIP', '/zip/city-to-zip'],
  ['ZIPs in Radius', '/zip/zips-within-radius'],
  ['ZIP Timezone', '/zip/zip-to-timezone'],
  ['ZIP Code Map', '/zip/zip-code-map'],
  ['ZIP Validator', '/zip/zip-code-validator'],
  ['USPS Address Format', '/zip/usps-address-format'],
  ['All ZIP Tools →', '/zip'],
]

const commodityLinks = [
  ['Gold Price Calculator', '/commodities/gold-price-calculator'],
  ['Silver Price Calculator', '/commodities/silver-price-calculator'],
  ['Platinum Calculator', '/commodities/platinum-price-calculator'],
  ['Crude Oil Calculator', '/commodities/crude-oil-calculator'],
  ['Brent Crude Calculator', '/commodities/brent-crude-calculator'],
  ['Natural Gas Calculator', '/commodities/natural-gas-calculator'],
  ['Gold Loan Calculator', '/commodities/gold-loan-calculator'],
  ['Metals P&L Calculator', '/commodities/precious-metals-profit-calculator'],
  ['Portfolio Tracker', '/commodities/commodity-portfolio-tracker'],
  ['All Commodities →', '/commodities'],
]

const blogLinks = [
  ['Blog Home', '/blog'],
  ['Investment Guides', '/blog/category/investment'],
  ['Loan & EMI Tips', '/blog/category/loans'],
  ['Retirement Planning', '/blog/category/retirement'],
  ['Health & Fitness', '/blog/category/health'],
  ['Personal Finance', '/blog/category/personal-finance'],
]

const companyLinks = [
  ['About ToolTrio', '/about'],
  ['Our Methodology', '/methodology'],
  ['Contact ToolTrio', '/contact'],
  ['Privacy Policy', '/privacy-policy'],
  ['Disclaimer', '/disclaimer'],
]

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/tooltrio-logo.png"
                alt="ToolTrio — Free Online Calculators and Tools"
                style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Free online calculators and tools for finance, health, ZIP codes,
              commodities and developers. No signup. No ads. Instant results.
              Also known as Tool Trio, Trio Tools and Toolstrio.
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 text-sm hover:text-white transition-all text-green-400 font-semibold"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              {contactEmail}
            </a>
            <div className="flex flex-wrap gap-2 mt-4">
              {['$ USD', '£ GBP', '₹ INR', '€ EUR'].map(c => (
                <span key={c} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 font-semibold">{c}</span>
              ))}
            </div>
          </div>

          {/* Finance */}
          <div>
            <h2 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-green-500" /> Finance
            </h2>
            <ul className="space-y-2.5 text-sm">
              {financeLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-green-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Health */}
          <div>
            <h2 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" /> Health
            </h2>
            <ul className="space-y-2.5 text-sm">
              {healthLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-rose-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ZIP Tools */}
          <div>
            <h2 className="font-bold text-white text-sm mb-4">📮 ZIP Tools</h2>
            <ul className="space-y-2.5 text-sm">
              {zipLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-teal-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commodities + Blog + Company */}
          <div>
            <h2 className="font-bold text-white text-sm mb-4">🏅 Commodities</h2>
            <ul className="space-y-2.5 text-sm mb-6">
              {commodityLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-yellow-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>

            <h2 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" /> Blog
            </h2>
            <ul className="space-y-2.5 text-sm mb-6">
              {blogLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-400 transition-all">{name}</Link>
                </li>
              ))}
            </ul>

            <h2 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gray-400" /> Company
            </h2>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map(([name, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-all">{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO text block — natural, not spammy */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-xs text-gray-600 leading-relaxed max-w-5xl">
            <strong className="text-gray-500">ToolTrio.com</strong> provides free online calculators across
            finance, health, ZIP codes, commodities and developer tools. Popular tools include{' '}
            <Link href="/calculators/finance/sip-calculator" className="text-gray-500 hover:text-gray-400">SIP calculator</Link>,{' '}
            <Link href="/calculators/finance/emi-calculator" className="text-gray-500 hover:text-gray-400">EMI calculator</Link>,{' '}
            <Link href="/calculators/finance/compound-interest-calculator" className="text-gray-500 hover:text-gray-400">compound interest calculator</Link>,{' '}
            <Link href="/calculators/health/bmi-calculator" className="text-gray-500 hover:text-gray-400">BMI calculator</Link>,{' '}
            <Link href="/calculators/health/calorie-calculator" className="text-gray-500 hover:text-gray-400">calorie calculator</Link>,{' '}
            <Link href="/zip/zip-code-lookup" className="text-gray-500 hover:text-gray-400">ZIP code lookup</Link>, and{' '}
            <Link href="/commodities/gold-price-calculator" className="text-gray-500 hover:text-gray-400">gold price calculator</Link>.
            All tools are free, private, and require no account.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 ToolTrio.com — All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/methodology" className="hover:text-white flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Methodology
            </Link>
            <Link href="/privacy-policy" className="hover:text-white flex items-center gap-1">
              <Shield className="w-3 h-3" /> Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-white flex items-center gap-1">
              <FileText className="w-3 h-3" /> Disclaimer
            </Link>
            <Link href="/about" className="hover:text-white flex items-center gap-1">
              <Info className="w-3 h-3" /> About
            </Link>
            <Link href="/contact" className="hover:text-white flex items-center gap-1">
              <Mail className="w-3 h-3" /> Contact
            </Link>
          </div>
          <p className="text-gray-700">For informational use only. Not financial or medical advice.</p>
        </div>

      </div>
    </footer>
  )
}
