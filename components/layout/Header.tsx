'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Smile, MapPin, BookOpen, Flame, Drama, Sparkles, Heart, Clover, Brain, Shield, Cookie, Search, Navigation, Building2, Ruler, Crosshair, Clock3, Map, BadgeCheck, Mail, Route, FileText } from 'lucide-react'
import { GlobalSearch } from '@/components/ui/GlobalSearch'
import { TOOL_COUNTS } from '@/lib/catalog'

// -- Nav data ------------------------------------------------------------------
const NAV = [
  { key:'fun', label:'Fun Tools', icon:Smile, color:'purple', href:'/fun', viewAll:`All ${TOOL_COUNTS.fun} Fun Tools →`, items:[
    {name:'Insult Generator',href:'/fun/insult-generator',icon:Flame},{name:'Shakespeare Insult Generator',href:'/fun/shakespeare-insult-generator',icon:Drama},{name:'Zodiac Calculator',href:'/fun/zodiac-calculator',icon:Sparkles},{name:'Love Compatibility',href:'/fun/love-compatibility',icon:Heart},{name:'Lucky Number',href:'/fun/lucky-number',icon:Clover},{name:'Trivia Quiz',href:'/fun/trivia-quiz',icon:Brain},{name:'Superhero Name',href:'/fun/superhero-name',icon:Shield},{name:'Fortune Cookie',href:'/fun/fortune-cookie',icon:Cookie}], },
  { key:'zip', label:'ZIP Tools', icon:MapPin, color:'teal', href:'/zip', viewAll:`All ${TOOL_COUNTS.zip} ZIP Tools →`, items:[
    {name:'ZIP Code Lookup',href:'/zip/zip-code-lookup',icon:Search},{name:'ZIP to City',href:'/zip/zip-to-city',icon:Building2},{name:'ZIP to State',href:'/zip/zip-to-state',icon:MapPin},{name:'ZIP to County',href:'/zip/zip-to-county',icon:Navigation},{name:'ZIP Code Distance',href:'/zip/zip-code-distance',icon:Ruler},{name:'ZIPs Within Radius',href:'/zip/zips-within-radius',icon:Crosshair},{name:'City to ZIP',href:'/zip/city-to-zip',icon:Map},{name:'ZIP Code Timezone',href:'/zip/zip-to-timezone',icon:Clock3},{name:'ZIP Code Map',href:'/zip/zip-code-map',icon:Map},{name:'ZIP Validator',href:'/zip/zip-code-validator',icon:BadgeCheck},{name:'USPS Address Format',href:'/zip/usps-address-format',icon:Mail},{name:'Drive Time by ZIP',href:'/zip/drive-time-by-zip',icon:Route}], },
  { key:'blog', label:'Blog', icon:BookOpen, color:'green', href:'/blog', viewAll:'All Blog Posts →', items:[
    {name:'ZIP Code Guides',href:'/blog/category/zip-codes',icon:BookOpen},{name:'ZIP Code Lookup Guide',href:'/blog/how-to-find-a-zip-code-from-an-address',icon:Search},{name:'ZIP Code Distance Guide',href:'/blog/how-far-apart-are-two-zip-codes',icon:Ruler},{name:'ZIP+4 Guide',href:'/blog/what-is-a-zip-plus-4-code',icon:FileText},{name:'ZIP Timezone Guide',href:'/blog/how-to-find-a-time-zone-from-a-zip-code',icon:Clock3},{name:'ZIP Radius Guide',href:'/blog/how-to-find-zip-codes-within-a-radius',icon:Crosshair},{name:'ZIP Validator Guide',href:'/blog/how-to-validate-a-zip-code',icon:BadgeCheck},{name:'ZIP Code vs Postal Code',href:'/blog/zip-code-vs-postal-code',icon:MapPin}], },
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
        <span className="flex items-center gap-2">
          <nav.icon className="w-3.5 h-3.5" />
          {nav.label}
        </span>
      </p>
      {nav.items.map(item => (
        <Link key={item.href} href={item.href} onClick={onClose}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:text-gray-900 ${c.hover} transition-all font-medium truncate`} style={{transition:'all 0.25s cubic-bezier(.4,0,.2,1)'}}>
          <item.icon className={`h-3.5 w-3.5 shrink-0 ${c.text}`} />
          <span className="truncate">{item.name}</span>
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
            <img src="/tooltrio-header.png" alt="ToolTrio" className="h-9 w-auto object-contain" />
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
                  <nav.icon className="w-4 h-4" />
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
                    <span className="flex items-center gap-2"><nav.icon className="w-4 h-4" />{nav.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === nav.key ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSection === nav.key && (
                    <div className="ml-3 pb-2">
                      {nav.items.map(item => (
                        <Link key={item.href} href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-gray-900 ${c.hover} font-medium transition-all`}
                        >
                          <item.icon className={`h-3.5 w-3.5 shrink-0 ${c.text}`} />
                          <span>{item.name}</span>
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
