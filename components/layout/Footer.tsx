import Link from 'next/link'
import { TrendingUp, Heart, Mail, Shield, FileText, Info, BookOpen } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()
  const contactEmail = 'tooltrio.tools@gmail.com'

  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/tooltrio-logo.png"
                alt="ToolTrio - Free Online Calculators and Tools"
                style={{ height: '40px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              ToolTrio is a free online tools website for finance calculators, health calculators,
              ZIP code tools, commodity calculators and developer utilities. Also searched as
              Tool Trio, Trio Tools, Tools Trio and Toolstrio.
            </p>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
              <a href={`mailto:${contactEmail}`} className="hover:text-white transition-all text-green-400 font-semibold">
                {contactEmail}
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {['$ USD', '₹ INR', '€ EUR'].map(c => (
                <span key={c} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 font-semibold">{c}</span>
              ))}
            </div>
          </div>

          {/* Finance */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-green-500" /> Finance
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['SIP Calculator', '/calculators/finance/sip-calculator'],
                ['EMI Calculator', '/calculators/finance/emi-calculator'],
                ['FD Calculator', '/calculators/finance/fd-calculator'],
                ['RD Calculator', '/calculators/finance/rd-calculator'],
                ['Compound Interest', '/calculators/finance/compound-interest-calculator'],
                ['CAGR Calculator', '/calculators/finance/cagr-calculator'],
                ['XIRR Calculator', '/calculators/finance/xirr-calculator'],
                ['Retirement Calculator', '/calculators/finance/retirement-calculator'],
                ['Home Loan Calculator', '/calculators/finance/home-loan-calculator'],
                ['Car Loan Calculator', '/calculators/finance/car-loan-calculator'],
                ['SWP Calculator', '/calculators/finance/swp-calculator'],
                ['View All 20 →', '/calculators/finance'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-green-400 transition-all">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Health */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" /> Health
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['BMI Calculator', '/calculators/health/bmi-calculator'],
                ['Calorie Calculator', '/calculators/health/calorie-calculator'],
                ['BMR Calculator', '/calculators/health/bmr-calculator'],
                ['Body Fat Calculator', '/calculators/health/body-fat-calculator'],
                ['Ideal Weight', '/calculators/health/ideal-weight-calculator'],
                ['Water Intake', '/calculators/health/water-intake-calculator'],
                ['Protein Intake', '/calculators/health/protein-intake-calculator'],
                ['Sleep Cycle', '/calculators/health/sleep-cycle-calculator'],
                ['Pregnancy Calculator', '/calculators/health/pregnancy-calculator'],
                ['Ovulation Calculator', '/calculators/health/ovulation-calculator'],
                ['View All 10 →', '/calculators/health'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-rose-400 transition-all">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* ZIP Tools */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              📮 ZIP Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['ZIP Code Lookup', '/zip/zip-code-lookup'],
                ['ZIP Distance', '/zip/zip-code-distance'],
                ['ZIP to City', '/zip/zip-to-city'],
                ['City to ZIP', '/zip/city-to-zip'],
                ['ZIPs in Radius', '/zip/zips-within-radius'],
                ['ZIP Timezone', '/zip/zip-to-timezone'],
                ['ZIP Code Map', '/zip/zip-code-map'],
                ['Drive Time by ZIP', '/zip/drive-time-by-zip'],
                ['ZIP Validator', '/zip/zip-code-validator'],
                ['USPS Address Format', '/zip/usps-address-format'],
                ['All 35+ ZIP Tools →', '/zip'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-teal-400 transition-all">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Commodities */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              🏅 Commodities
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['All Commodity Prices', '/commodities'],
                ['Gold Price Calculator', '/commodities/gold-price-calculator'],
                ['Silver Price Calculator', '/commodities/silver-price-calculator'],
                ['Platinum Price Calculator', '/commodities/platinum-price-calculator'],
                ['Crude Oil Calculator', '/commodities/crude-oil-calculator'],
                ['Brent Crude Calculator', '/commodities/brent-crude-calculator'],
                ['Natural Gas Calculator', '/commodities/natural-gas-calculator'],
                ['Gold Loan Calculator', '/commodities/gold-loan-calculator'],
                ['Metals P&L Calculator', '/commodities/precious-metals-profit-calculator'],
                ['Portfolio Tracker', '/commodities/commodity-portfolio-tracker'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-yellow-400 transition-all">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Blog + Company */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" /> Blog & Company
            </h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {[
                ['Blog Home', '/blog'],
                ['Investment Guides', '/blog/category/investment'],
                ['Loan & EMI Tips', '/blog/category/loans'],
                ['Retirement Planning', '/blog/category/retirement'],
                ['Health & Fitness', '/blog/category/health'],
                ['Personal Finance', '/blog/category/personal-finance'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-all">{name}</Link></li>
              ))}
            </ul>

            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gray-400" /> Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ['About ToolTrio', '/about'],
                ['Our Methodology', '/methodology'],
                ['Contact ToolTrio', '/contact'],
                ['Privacy Policy', '/privacy-policy'],
                ['Disclaimer', '/disclaimer'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-all">{name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO keyword-rich text block */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-xs text-gray-600 leading-relaxed max-w-5xl">
            <strong className="text-gray-500">ToolTrio.com</strong>, also searched as Tool Trio, Trio Tools,
            Tools Trio and Toolstrio, provides free online calculators and tools for finance, health, ZIP codes,
            commodities and developers. Calculate{' '}
            <Link href="/calculators/finance/sip-calculator" className="text-gray-500 hover:text-gray-400">SIP returns</Link>,{' '}
            <Link href="/calculators/finance/emi-calculator" className="text-gray-500 hover:text-gray-400">EMI</Link>,{' '}
            <Link href="/calculators/finance/compound-interest-calculator" className="text-gray-500 hover:text-gray-400">compound interest</Link>,{' '}
            <Link href="/calculators/finance/retirement-calculator" className="text-gray-500 hover:text-gray-400">retirement savings</Link>,{' '}
            <Link href="/calculators/health/bmi-calculator" className="text-gray-500 hover:text-gray-400">BMI</Link>,{' '}
            <Link href="/calculators/health/calorie-calculator" className="text-gray-500 hover:text-gray-400">calories</Link>,{' '}
            <Link href="/zip/zip-code-lookup" className="text-gray-500 hover:text-gray-400">ZIP code details</Link>,{' '}
            <Link href="/commodities/gold-price-calculator" className="text-gray-500 hover:text-gray-400">gold price</Link>{' '}
            and more. ToolTrio tools are fast, simple, mobile-friendly and free to use.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} ToolTrio.com - All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/methodology" className="hover:text-white flex items-center gap-1"><BookOpen className="w-3 h-3" /> Methodology</Link>
            <Link href="/privacy-policy" className="hover:text-white flex items-center gap-1"><Shield className="w-3 h-3" /> Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white flex items-center gap-1"><FileText className="w-3 h-3" /> Disclaimer</Link>
            <Link href="/about" className="hover:text-white flex items-center gap-1"><Info className="w-3 h-3" /> About</Link>
            <Link href="/contact" className="hover:text-white flex items-center gap-1"><Mail className="w-3 h-3" /> Contact</Link>
          </div>

          <p className="text-gray-700">For informational use only. Not financial or medical advice.</p>
        </div>
      </div>
    </footer>
  )
}
