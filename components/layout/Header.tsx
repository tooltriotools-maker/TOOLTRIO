'use client'
import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useCurrency, CURRENCIES, type CurrencyCode } from '@/context/CurrencyContext'
import { GlobalSearch } from '@/components/ui/GlobalSearch'

// -- Nav data ------------------------------------------------------------------
const NAV = [
  {
    key: 'finance', label: '💰 Finance', color: 'green',
    href: '/calculators/finance', viewAll: 'All 167 Finance Tools ->',
    items: [
      { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator' },
      { name: '401k Calculator', href: '/calculators/finance/401k-calculator' },
      { name: 'Compound Interest', href: '/calculators/finance/compound-interest-calculator' },
      { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator' },
      { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator' },
      { name: 'Tax Bracket 2026', href: '/calculators/finance/tax-bracket-calculator' },
      { name: 'Wealth Calculator', href: '/calculators/finance/wealth-calculator' },
      { name: 'Roth Conversion', href: '/calculators/finance/roth-conversion-calculator' },
      { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator' },
      { name: 'UK Income Tax', href: '/calculators/finance/uk-income-tax-calculator' },
    ],
  },
  {
    key: 'health', label: '❤️ Health', color: 'red',
    href: '/calculators/health', viewAll: 'All 124 Health Tools ->',
    items: [
      { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator' },
      { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator' },
      { name: 'Calories Burned Walking', href: '/calculators/health/calorie-burned-walking-calculator' },
      { name: 'Steps Calculator', href: '/calculators/health/steps-calculator' },
      { name: 'Pace Calculator', href: '/calculators/health/pace-calculator' },
      { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator' },
      { name: 'TDEE Calculator', href: '/calculators/health/tdee-calculator' },
      { name: 'Macro Calculator', href: '/calculators/health/macro-calculator' },
      { name: 'Sleep Cycle', href: '/calculators/health/sleep-cycle-calculator' },
      { name: 'Pregnancy Calculator', href: '/calculators/health/pregnancy-calculator' },
    ],
  },
  {
    key: 'dev', label: '⚡ Dev Tools', color: 'blue',
    href: '/calculators/dev', viewAll: 'All 90 Dev Tools ->',
    items: [
      { name: 'JSON Formatter', href: '/calculators/dev/json-formatter' },
      { name: 'Regex Tester', href: '/calculators/dev/regex-tester' },
      { name: 'Color Converter', href: '/calculators/dev/color-converter' },
      { name: 'Base64 Encoder', href: '/calculators/dev/base64-encoder' },
      { name: 'UUID Generator', href: '/calculators/dev/uuid-generator' },
      { name: 'Password Generator', href: '/calculators/dev/password-generator' },
      { name: 'Unix Timestamp', href: '/calculators/dev/unix-timestamp' },
      { name: 'JWT Decoder', href: '/calculators/dev/jwt-decoder' },
      { name: 'Hash Generator', href: '/calculators/dev/hash-generator' },
      { name: 'SQL Formatter', href: '/calculators/dev/sql-formatter' },
    ],
  },
  {
    key: 'fun', label: '😄 Fun', color: 'purple',
    href: '/calculators/fun', viewAll: 'All 30 Fun Tools ->',
    items: [
      { name: 'Zodiac Calculator', href: '/calculators/fun/zodiac-calculator' },
      { name: 'Love Compatibility', href: '/calculators/fun/love-compatibility' },
      { name: 'Lucky Number', href: '/calculators/fun/lucky-number' },
      { name: 'Trivia Quiz', href: '/calculators/fun/trivia-quiz' },
      { name: 'Superhero Name', href: '/calculators/fun/superhero-name' },
      { name: 'Morse Code', href: '/calculators/fun/text-to-morse' },
      { name: 'Fortune Cookie', href: '/calculators/fun/fortune-cookie' },
      { name: 'Age in Days', href: '/calculators/fun/age-in-days' },
      { name: 'Pizza Calculator', href: '/calculators/fun/pizza-calculator' },
      { name: 'Personality Quiz', href: '/calculators/fun/personality-quiz' },
    ],
  },
  {
    key: 'commodities', label: '🥇 Commodities', color: 'yellow',
    href: '/commodities', viewAll: 'All Commodities ->',
    items: [
      { name: 'Gold Price Calculator', href: '/commodities/gold-price-calculator' },
      { name: 'Silver Price Calculator', href: '/commodities/silver-price-calculator' },
      { name: 'Crude Oil WTI', href: '/commodities/crude-oil-calculator' },
      { name: 'Natural Gas', href: '/commodities/natural-gas-calculator' },
      { name: 'Gold Loan Calculator', href: '/commodities/gold-loan-calculator' },
      { name: 'Metals Portfolio', href: '/commodities/commodity-portfolio-tracker' },
    ],
  },
  {
    key: 'blog', label: '📚 Blog', color: 'green',
    href: '/blog', viewAll: 'All Blog Posts ->',
    items: [
      { name: 'Investment Guides', href: '/blog/category/investment' },
      { name: 'Loan and EMI Tips', href: '/blog/category/loans' },
      { name: 'Retirement Planning', href: '/blog/category/retirement' },
      { name: 'Health and Fitness', href: '/blog/category/health' },
      { name: 'Personal Finance 101', href: '/blog/category/personal-finance' },
    ],
  },
]

const COLOR_MAP: Record<string, { text: string; hover: string; header: string }> = {
  green:  { text: 'text-green-700',  hover: 'hover:bg-green-50',  header: 'bg-green-50'  },
  red:    { text: 'text-red-600',    hover: 'hover:bg-red-50',    header: 'bg-red-50'    },
  blue:   { text: 'text-blue-600',   hover: 'hover:bg-blue-50',   header: 'bg-blue-50'   },
  purple: { text: 'text-purple-600', hover: 'hover:bg-purple-50', header: 'bg-purple-50' },
  yellow: { text: 'text-yellow-700', hover: 'hover:bg-yellow-50', header: 'bg-yellow-50' },
}

// -- Dropdown ------------------------------------------------------------------
function Dropdown({ nav, onClose }: { nav: typeof NAV[0]; onClose: () => void }) {
  const c = COLOR_MAP[nav.color] || COLOR_MAP.green
  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-[9999]">
      <p className={`text-[11px] font-bold ${c.text} uppercase tracking-wider px-3 py-2 ${c.header} rounded-xl mb-1`}>
        {nav.label}
      </p>
      {nav.items.map(item => (
        <Link key={item.href} href={item.href} onClick={onClose}
          className={`block px-3 py-2 rounded-xl text-sm text-gray-700 hover:text-gray-900 ${c.hover} transition-colors font-medium truncate`}>
          {item.name}
        </Link>
      ))}
      <Link href={nav.href} onClick={onClose}
        className={`flex items-center justify-center mt-1 px-3 py-2 rounded-xl text-xs font-bold ${c.text} border border-current/30 ${c.hover} transition-colors`}>
        {nav.viewAll}
      </Link>
    </div>
  )
}

// -- Header --------------------------------------------------------------------
export function Header() {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const { currency, setCurrency } = useCurrency()
  const [currencyOpen, setCurrencyOpen] = useState(false)

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenKey(null)
        setCurrencyOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-[9990] border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center h-16 gap-2 overflow-visible">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
            <img src="/tooltrio-logo.png" alt="TOOLTRIO" style={{height:"36px",width:"auto"}} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 overflow-visible">
            {NAV.map(nav => (
              <div key={nav.key} className="relative">
                <button
                  onClick={() => setOpenKey(openKey === nav.key ? null : nav.key)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
                    openKey === nav.key
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {nav.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openKey === nav.key ? 'rotate-180' : ''}`} />
                </button>
                {openKey === nav.key && (
                  <Dropdown nav={nav} onClose={() => setOpenKey(null)} />
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-shrink-0 w-56 xl:w-72">
            <GlobalSearch />
          </div>

          {/* Currency + Mobile toggle */}
          <div className="flex items-center gap-2 ml-auto lg:ml-2">
            {/* Currency selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-all text-sm font-bold"
              >
                <span>{currency.flag}</span>
                <span className="text-green-700 font-mono">{currency.symbol}</span>
                <span className="text-gray-600 hidden sm:inline text-xs">{currency.code}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-2 z-[9999] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden w-48">
                  <div className="p-3 border-b border-gray-100 bg-green-50">
                    <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Currency</p>
                  </div>
                  {(Object.values(CURRENCIES) as typeof CURRENCIES[CurrencyCode][]).map(cur => (
                    <button key={cur.code}
                      onClick={() => { setCurrency(cur.code as CurrencyCode); setCurrencyOpen(false) }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-green-50 transition-colors ${currency.code === cur.code ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-700'}`}
                    >
                      <span className="text-xl">{cur.flag}</span>
                      <span className="font-mono font-bold">{cur.symbol}</span>
                      <span>{cur.code}</span>
                      {currency.code === cur.code && <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => { setMobileOpen(o => !o); setMobileSection(null) }}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-2 max-h-[75vh] overflow-y-auto">
            {/* Mobile Search */}
            <div className="px-3 py-2 border-b border-gray-100 mb-2">
              <GlobalSearch className="w-full" />
            </div>
            {NAV.map(nav => {
              const c = COLOR_MAP[nav.color] || COLOR_MAP.green
              return (
                <div key={nav.key}>
                  <button
                    onClick={() => setMobileSection(mobileSection === nav.key ? null : nav.key)}
                    className="w-full flex items-center justify-between px-3 py-3 font-bold text-sm text-gray-800 hover:bg-gray-50 rounded-xl"
                  >
                    <span>{nav.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === nav.key ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSection === nav.key && (
                    <div className="ml-3 pb-2">
                      {nav.items.map(item => (
                        <Link key={item.href} href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-gray-900 ${c.hover} font-medium transition-colors`}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <Link href={nav.href} onClick={() => setMobileOpen(false)}
                        className={`block text-center px-3 py-2 rounded-xl text-xs font-bold ${c.text} border border-current/30 mt-1`}
                      >
                        {nav.viewAll}
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}
