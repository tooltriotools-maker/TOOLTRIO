'use client'
import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { GlobalSearch } from '@/components/ui/GlobalSearch'

// -- Nav data ------------------------------------------------------------------
const NAV = [
  {
    key: 'fun', label: '😄 Fun', color: 'purple',
    href: '/calculators/fun', viewAll: 'All 30 Fun Tools →',
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
    key: 'zip', label: '📮 ZIP Tools', color: 'teal',
    href: '/zip', viewAll: 'All 35 ZIP Tools →',
    items: [
      { name: 'ZIP Code Lookup', href: '/zip/zip-code-lookup' },
      { name: 'ZIP to City', href: '/zip/zip-to-city' },
      { name: 'ZIP to State', href: '/zip/zip-to-state' },
      { name: 'ZIP to County', href: '/zip/zip-to-county' },
      { name: 'ZIP Code Distance', href: '/zip/zip-code-distance' },
      { name: 'ZIPs Within Radius', href: '/zip/zips-within-radius' },
      { name: 'City to ZIP', href: '/zip/city-to-zip' },
      { name: 'ZIP Code Timezone', href: '/zip/zip-to-timezone' },
      { name: 'ZIP Code Map', href: '/zip/zip-code-map' },
      { name: 'ZIP Validator', href: '/zip/zip-code-validator' },
      { name: 'USPS Address Format', href: '/zip/usps-address-format' },
      { name: 'Drive Time by ZIP', href: '/zip/drive-time-by-zip' },
    ],
  },
  {
    key: 'blog', label: '📚 Blog', color: 'green',
    href: '/blog', viewAll: 'All Blog Posts ->',
    items: [
      { name: 'ZIP Code Guides', href: '/blog/category/zip-codes' },
      { name: 'ZIP Code Lookup Guide', href: '/blog/how-to-find-a-zip-code-from-an-address' },
      { name: 'ZIP Code Distance Guide', href: '/blog/how-far-apart-are-two-zip-codes' },
      { name: 'ZIP+4 Guide', href: '/blog/what-is-a-zip-plus-4-code' },
      { name: 'ZIP Timezone Guide', href: '/blog/how-to-find-a-time-zone-from-a-zip-code' },
      { name: 'ZIP Code vs Postal Code', href: '/blog/zip-code-vs-postal-code' },
    ],
  },
]

const COLOR_MAP: Record<string, { text: string; hover: string; header: string }> = {
  green:  { text: 'text-green-700',  hover: 'hover:bg-green-50',  header: 'bg-green-50'  },
  red:    { text: 'text-red-600',    hover: 'hover:bg-red-50',    header: 'bg-red-50'    },
  blue:   { text: 'text-blue-600',   hover: 'hover:bg-blue-50',   header: 'bg-blue-50'   },
  purple: { text: 'text-purple-600', hover: 'hover:bg-purple-50', header: 'bg-purple-50' },
  yellow: { text: 'text-yellow-700', hover: 'hover:bg-yellow-50', header: 'bg-yellow-50' },
  teal:   { text: 'text-teal-700',   hover: 'hover:bg-teal-50',   header: 'bg-teal-50'   },
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
          className={`block px-3 py-2 rounded-xl text-sm text-gray-700 hover:text-gray-900 ${c.hover} transition-all font-medium truncate`} style={{transition:'all 0.25s cubic-bezier(.4,0,.2,1)'}}>
          {item.name}
        </Link>
      ))}
      <Link href={nav.href} onClick={onClose}
        className={`flex items-center justify-center mt-1 px-3 py-2 rounded-xl text-xs font-bold ${c.text} border border-current/30 ${c.hover} transition-all`}>
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

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenKey(null)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <header ref={headerRef} className="sticky top-0 z-[9990] border-b border-white/50 bg-white/70 backdrop-blur-xl shadow-sm" style={{backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)'}}>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center h-16 gap-2 overflow-visible">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
            <img src="/tooltrio-logo.png" alt="TOOLTRIO" style={{height:"36px",width:"auto"}} />
            <span className="font-black text-xl tracking-tight text-gray-900 hidden sm:block">TOOLTRIO</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 overflow-visible">
            {NAV.map(nav => (
              <div key={nav.key} className="relative">
                <button
                  onClick={() => setOpenKey(openKey === nav.key ? null : nav.key)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap ${
                    openKey === nav.key
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`} style={{transition:'all 0.25s cubic-bezier(.4,0,.2,1)'}}
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

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 ml-auto lg:ml-2">
            {/* Mobile menu button */}
            <button
              onClick={() => { setMobileOpen(o => !o); setMobileSection(null) }}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
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
                          className={`block px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-gray-900 ${c.hover} font-medium transition-all`}
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
