'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, TrendingUp, Heart, Code2, Smile, ChevronDown, ArrowRight, BookOpen } from 'lucide-react'
import { GlobalSearch } from './GlobalSearch'

const NAV = {
  finance: {
    label: 'Finance', icon: TrendingUp, color: '#22c55e', accent: 'rgba(34,197,94,0.15)',
    items: [
      { name:'SIP Calculator', slug:'sip-calculator', icon:'📈' },
      { name:'EMI Calculator', slug:'emi-calculator', icon:'🏦' },
      { name:'Compound Interest', slug:'compound-interest-calculator', icon:'💰' },
      { name:'Retirement Calculator', slug:'retirement-calculator', icon:'🌅' },
      { name:'Home Loan', slug:'home-loan-calculator', icon:'🏠' },
      { name:'401k Calculator', slug:'401k-calculator', icon:'🇺🇸' },
      { name:'Roth IRA Calculator', slug:'roth-ira-calculator', icon:'🛡️' },
      { name:'UK Income Tax', slug:'uk-income-tax-calculator', icon:'🇬🇧' },
      { name:'ISA Calculator', slug:'isa-calculator', icon:'💷' },
      { name:'FIRE Calculator', slug:'fire-calculator', icon:'🔥' },
      { name:'Debt Payoff', slug:'debt-payoff-calculator', icon:'🔓' },
      { name:'Inflation Calculator', slug:'inflation-calculator', icon:'📊' },
      { name:'Net Worth', slug:'net-worth-calculator', icon:'⚖️' },
      { name:'Car Loan', slug:'car-loan-calculator', icon:'🚗' },
      { name:'Budget Calculator', slug:'budget-calculator', icon:'📋' },
      { name:'Credit Card Payoff', slug:'credit-card-payoff-calculator', icon:'💳' },
      { name:'CAGR Calculator', slug:'cagr-calculator', icon:'📈' },
      { name:'Savings Goal', slug:'savings-goal-calculator', icon:'🎯' },
      { name:'FD Calculator', slug:'fd-calculator', icon:'🏛️' },
      { name:'Dividend Calculator', slug:'dividend-calculator', icon:'💵' },
    ],
    allHref: '/calculators/finance',
  },
  health: {
    label: 'Health', icon: Heart, color: '#f43f5e', accent: 'rgba(244,63,94,0.15)',
    items: [
      { name:'BMI Calculator', slug:'bmi-calculator', icon:'⚖️' },
      { name:'Calorie Calculator', slug:'calorie-calculator', icon:'🔥' },
      { name:'BMR Calculator', slug:'bmr-calculator', icon:'❤️' },
      { name:'TDEE Calculator', slug:'tdee-calculator', icon:'🌡️' },
      { name:'Body Fat Calculator', slug:'body-fat-calculator', icon:'💪' },
      { name:'Ideal Weight', slug:'ideal-weight-calculator', icon:'🏋️' },
      { name:'Macro Calculator', slug:'macro-calculator', icon:'🍽️' },
      { name:'Protein Intake', slug:'protein-intake-calculator', icon:'🥩' },
      { name:'Water Intake', slug:'water-intake-calculator', icon:'💧' },
      { name:'Sleep Cycle', slug:'sleep-cycle-calculator', icon:'😴' },
      { name:'Heart Attack Risk', slug:'heart-attack-risk-calculator', icon:'❤️' },
      { name:'Blood Pressure', slug:'blood-pressure-calculator', icon:'🩺' },
      { name:'HIIT Calculator', slug:'hiit-calculator', icon:'⚡' },
      { name:'Running Pace', slug:'running-pace-calculator', icon:'🏃' },
      { name:'Swimming Calories', slug:'swimming-calories-calculator', icon:'🏊' },
      { name:'Sugar Intake', slug:'sugar-intake-calculator', icon:'🍬' },
      { name:'Sodium Intake', slug:'sodium-intake-calculator', icon:'🧂' },
      { name:'Cholesterol', slug:'cholesterol-calculator', icon:'🩺' },
      { name:'1 Rep Max', slug:'one-rep-max-calculator', icon:'🏋️' },
      { name:'Pregnancy Calculator', slug:'pregnancy-calculator', icon:'🤰' },
    ],
    allHref: '/calculators/health',
  },
  dev: {
    label: 'Dev Tools', icon: Code2, color: '#3b82f6', accent: 'rgba(59,130,246,0.15)',
    items: [
      { name:'JSON Formatter', slug:'json-formatter', icon:'📋' },
      { name:'Base64 Encoder', slug:'base64-encoder', icon:'🔐' },
      { name:'UUID Generator', slug:'uuid-generator', icon:'🆔' },
      { name:'Hash Generator', slug:'hash-generator', icon:'#️⃣' },
      { name:'Color Converter', slug:'color-converter', icon:'🎨' },
      { name:'Unix Timestamp', slug:'unix-timestamp', icon:'⏱️' },
      { name:'Password Generator', slug:'password-generator', icon:'🔑' },
      { name:'URL Encoder', slug:'url-encoder', icon:'🔗' },
      { name:'JWT Decoder', slug:'jwt-decoder', icon:'🔍' },
      { name:'chmod Calculator', slug:'chmod-calculator', icon:'🔐' },
      { name:'Diff Checker', slug:'diff-checker', icon:'🔀' },
      { name:'Regex Tester', slug:'regex-tester', icon:'🔍' },
      { name:'Code Minifier', slug:'code-minifier', icon:'⚡' },
      { name:'Markdown Preview', slug:'markdown-preview', icon:'📝' },
      { name:'CSS Gradient Gen', slug:'css-gradient-generator', icon:'🌊' },
      { name:'IP Subnet Calc', slug:'ip-subnet-calculator', icon:'🌐' },
      { name:'Cron Expression', slug:'cron-expression', icon:'⏰' },
      { name:'Bit/Byte Converter', slug:'bit-byte-converter', icon:'💾' },
      { name:'Text Case Converter', slug:'text-case-converter', icon:'🔤' },
      { name:'SVG Optimizer', slug:'svg-optimizer', icon:'🖼️' },
    ],
    allHref: '/calculators/dev',
  },
  fun: {
    label: 'Fun', icon: Smile, color: '#a855f7', accent: 'rgba(168,85,247,0.15)',
    items: [
      { name:'Birthday Countdown', slug:'birthday-countdown', icon:'🎂' },
      { name:'Zodiac Calculator', slug:'zodiac-calculator', icon:'⭐' },
      { name:'Fortune Cookie', slug:'fortune-cookie', icon:'🥠' },
      { name:'Personality Quiz', slug:'personality-quiz', icon:'🧬' },
      { name:'Superhero Name', slug:'superhero-name', icon:'🦸' },
      { name:'Villain Name', slug:'villain-name', icon:'😈' },
      { name:'Fantasy Name Gen', slug:'fantasy-name-generator', icon:'⚔️' },
      { name:'Love Compatibility', slug:'love-compatibility', icon:'💕' },
      { name:'Pizza Calculator', slug:'pizza-calculator', icon:'🍕' },
      { name:'Random Facts', slug:'random-fact-generator', icon:'🤯' },
      { name:'Would You Rather', slug:'would-you-rather', icon:'🤔' },
      { name:'Coffee Calculator', slug:'coffee-calculator', icon:'☕' },
      { name:'Sleep Debt', slug:'sleep-debt-calculator', icon:'😴' },
      { name:'Screen Time', slug:'screen-time-calculator', icon:'📱' },
      { name:'Procrastination Score', slug:'procrastination-score', icon:'⏳' },
      { name:'Random Name Gen', slug:'random-name-generator', icon:'🎲' },
      { name:'Pig Latin', slug:'pig-latin-converter', icon:'🐷' },
      { name:'Insult Generator', slug:'insult-generator', icon:'💬' },
      { name:'Compliment Gen', slug:'compliment-generator', icon:'💐' },
      { name:'UwU Text', slug:'uwu-text-generator', icon:'🐱' },
    ],
    allHref: '/calculators/fun',
  },
}

const PREVIEW_COUNT = 10

function DropdownMenu({ items, allHref, color, accent, type }: { items: typeof NAV.finance.items, allHref: string, color: string, accent: string, type: string }) {
  const base = type === 'finance' ? '/calculators/finance' : type === 'health' ? '/calculators/health' : type === 'dev' ? '/calculators/dev' : '/calculators/fun'
  return (
    <div className="absolute top-full left-0 w-64 rounded-2xl py-2 shadow-2xl z-50"
      style={{ background:'#0d1425', border:`1px solid rgba(255,255,255,0.08)`, boxShadow:'0 24px 60px rgba(0,0,0,0.6)' }}>
      {items.slice(0, PREVIEW_COUNT).map(c => (
        <Link key={c.slug} href={`${base}/${c.slug}`}
          className="flex items-center gap-3 px-4 py-2 text-sm transition-colors group"
          style={{ color:'#94a3b8' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = color; (e.currentTarget as HTMLElement).style.background = accent }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
          <span className="text-base w-5">{c.icon}</span>
          <span>{c.name}</span>
        </Link>
      ))}
      <div className="mx-3 my-1 border-t" style={{ borderColor:'rgba(255,255,255,0.06)' }} />
      <Link href={allHref}
        className="flex items-center justify-between px-4 py-2 text-sm font-bold rounded-xl mx-2 transition-all"
        style={{ color, background: accent }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
        <span>View All {items.length}+ Tools</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openDrop = (key: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setActiveDropdown(key)
  }
  const closeDrop = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  useEffect(() => () => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current) }, [])

  return (
    <nav className="sticky top-0 z-50 border-b"
      style={{ background:'rgba(3,7,18,0.96)', backdropFilter:'blur(24px)', borderColor:'rgba(34,197,94,0.10)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <img src="/tooltrio-logo.png" alt="TOOLTRIO" style={{height:"36px",width:"auto",filter:"brightness(0) invert(1)"}} />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md">
            <GlobalSearch />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            {(Object.entries(NAV) as [string, typeof NAV.finance][]).map(([key, cfg]) => {
              const Icon = cfg.icon
              const isOpen = activeDropdown === key
              return (
                <div key={key} className="relative"
                  onMouseEnter={() => openDrop(key)}
                  onMouseLeave={closeDrop}>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{ color: isOpen ? cfg.color : '#94a3b8', background: isOpen ? cfg.accent : 'transparent' }}>
                    <Icon size={14} />
                    {cfg.label}
                    <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <DropdownMenu items={cfg.items} allHref={cfg.allHref} color={cfg.color} accent={cfg.accent} type={key} />
                  )}
                </div>
              )
            })}
            <Link href="/blog" className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
              style={{ color:'#94a3b8' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#f59e0b'; (e.currentTarget as HTMLElement).style.background='rgba(245,158,11,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='#94a3b8'; (e.currentTarget as HTMLElement).style.background='transparent' }}>
              <BookOpen size={14} />Blog
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg flex-shrink-0" style={{ color:'#94a3b8' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <GlobalSearch className="w-full" />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background:'#080d1a', borderColor:'rgba(34,197,94,0.1)' }}>
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {(Object.entries(NAV) as [string, typeof NAV.finance][]).map(([key, cfg]) => {
              const Icon = cfg.icon
              const isExpanded = expandedMobile === key
              const base = key === 'finance' ? '/calculators/finance' : key === 'health' ? '/calculators/health' : key === 'dev' ? '/calculators/dev' : '/calculators/fun'
              return (
                <div key={key}>
                  <button onClick={() => setExpandedMobile(isExpanded ? null : key)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-semibold"
                    style={{ color: isExpanded ? cfg.color : '#94a3b8', background: isExpanded ? cfg.accent : 'transparent' }}>
                    <span className="flex items-center gap-2"><Icon size={15} />{cfg.label}</span>
                    <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="mt-1 ml-3 space-y-0.5">
                      {cfg.items.slice(0, PREVIEW_COUNT).map(c => (
                        <Link key={c.slug} href={`${base}/${c.slug}`}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                          style={{ color:'#94a3b8' }}
                          onClick={() => setMobileOpen(false)}>
                          <span>{c.icon}</span>{c.name}
                        </Link>
                      ))}
                      <Link href={cfg.allHref} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold"
                        style={{ color: cfg.color }}>
                        <ArrowRight size={14} /> View All {cfg.items.length}+ Tools
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
            <Link href="/blog" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold"
              style={{ color:'#94a3b8' }} onClick={() => setMobileOpen(false)}>
              <BookOpen size={15} /> Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
