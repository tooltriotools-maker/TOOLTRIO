'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

const FRAMEWORKS = {
  tailwind: [{name:'xs',px:0},{name:'sm',px:640},{name:'md',px:768},{name:'lg',px:1024},{name:'xl',px:1280},{name:'2xl',px:1536}],
  bootstrap: [{name:'xs',px:0},{name:'sm',px:576},{name:'md',px:768},{name:'lg',px:992},{name:'xl',px:1200},{name:'xxl',px:1400}],
  mui: [{name:'xs',px:0},{name:'sm',px:600},{name:'md',px:900},{name:'lg',px:1200},{name:'xl',px:1536}],
}

export default function CalculatorClient({ faqs }: Props) {
  const [width, setWidth] = useState(1024)
  const [framework, setFramework] = useState<'tailwind'|'bootstrap'|'mui'>('tailwind')

  const bps = FRAMEWORKS[framework]
  const active = [...bps].reverse().find(bp=>width>=bp.px)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Responsive Breakpoints</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📱 Responsive Breakpoint Calculator</h1>
      <p className="text-gray-500 mb-6">Find which responsive breakpoint is active for any viewport width across popular CSS frameworks.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            {(Object.keys(FRAMEWORKS) as (keyof typeof FRAMEWORKS)[]).map(f=>(
              <button key={f} onClick={()=>setFramework(f)} className={`px-4 py-2 text-sm font-bold capitalize ${framework===f?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-sm font-bold text-gray-700">Viewport Width: <span className="text-green-600">{width}px</span></label>
          <input type="range" min={0} max={1920} value={width} onChange={e=>setWidth(+e.target.value)} className="w-full accent-green-600 mt-1" />
          <input type="number" value={width} onChange={e=>setWidth(+e.target.value)} className="mt-2 w-28 px-3 py-2 border border-gray-200 rounded-xl font-bold text-sm focus:outline-none" />
        </div>
        <div className={`p-4 rounded-xl bg-green-50 border-2 border-green-300 text-center mb-4`}>
          <p className="text-xs font-bold text-green-700 mb-1">ACTIVE BREAKPOINT</p>
          <p className="text-4xl font-black text-green-800">{active?.name}</p>
          <p className="text-sm text-green-700">≥ {active?.px}px</p>
        </div>
        <div className="relative">
          <div className="flex h-10 rounded-xl overflow-hidden">
            {bps.map((bp,i)=>{
              const next = bps[i+1]
              const w = next ? (next.px-bp.px) : 384
              const isActive = active?.name === bp.name
              return (
                <div key={bp.name} className={`flex items-center justify-center text-xs font-black border-r border-white last:border-0 ${isActive?'bg-green-500 text-white':'bg-gray-100 text-gray-600'}`}
                  style={{flexBasis:`${w/1920*100}%`, minWidth:'40px'}}>
                  {bp.name}
                </div>
              )
            })}
          </div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none" style={{left:`${Math.min(width/1920*100,100)}%`}} />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">{framework.charAt(0).toUpperCase()+framework.slice(1)} Breakpoints</h2>
        <div className="space-y-2">
          {bps.map((bp,i)=>{
            const next = bps[i+1]
            const isActive = active?.name===bp.name
            return (
              <div key={bp.name} className={`flex items-center justify-between p-3 rounded-xl ${isActive?'bg-green-50 border-2 border-green-300':'bg-gray-50 border border-gray-100'}`}>
                <span className={`font-black text-sm ${isActive?'text-green-800':'text-gray-700'}`}>{bp.name}</span>
                <span className="font-mono text-sm text-gray-600">{bp.px}px {next?`-> ${next.px-1}px`:'and up'}</span>
                <button onClick={()=>setWidth(bp.px)} className="text-xs font-bold text-green-600 hover:underline">Load</button>
              </div>
            )
          })}
        </div>
      </div>


      <SEOContent
        title="Responsive Breakpoints Checker"
        category="dev"
        intro={`Responsive design works by applying different CSS at different viewport widths. But which breakpoints to use, whether to go mobile-first or desktop-first, and what the actual pixel values of common device viewports are — these are questions that come up every project.

This tool shows standard CSS breakpoint values from all major frameworks. Runs in your browser.

**Long-tail searches answered here:** responsive breakpoints reference free online usa, css media query breakpoints guide free, mobile tablet desktop breakpoints calculator free, bootstrap tailwind breakpoints reference free no signup, responsive design breakpoint guide free tool, css breakpoints cheat sheet free online usa, tailwind css default breakpoints reference free, bootstrap 5 breakpoints sm md lg xl xxl free usa, how to choose responsive breakpoints guide free, mobile first vs desktop first breakpoint strategy free usa, container query breakpoints vs media query comparison, css breakpoints for iphone android sizes free, common device screen sizes breakpoints reference free, next.js image responsive breakpoints configuration free usa, when to add custom breakpoints guide free usa

For sizing calculations, pair with [CSS Unit Converter](/calculators/dev/css-unit-converter) and [Font Size Calculator](/calculators/dev/font-size-calculator).`}
        howItWorks={`Shows the standard breakpoint values from major CSS frameworks: Tailwind CSS (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px), Bootstrap (sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px), and common device viewport widths for reference.

Mobile-first breakpoints use min-width media queries — styles apply from the breakpoint up. Desktop-first uses max-width — styles apply from the breakpoint down.`}
        benefits={[
          { title: `Framework breakpoint reference`, text: `Tailwind, Bootstrap, and Material UI breakpoint values in one place. No more googling tailwind sm breakpoint.` },
          { title: `Mobile-first vs desktop-first`, text: `Shows both min-width (mobile-first) and max-width (desktop-first) media query syntax for the same breakpoints. Helps understand which direction your CSS framework uses.` },
          { title: `Common device viewports`, text: `iPhone SE (375px), iPhone 14 (390px), iPad (768px), iPad Pro (1024px), MacBook (1280px), Full HD (1920px) — actual viewport widths for common devices.` },
          { title: `Breakpoint range visualization`, text: `Shows the pixel range each breakpoint covers: Tailwind md covers 768px to 1023px. Visualizing ranges prevents gap bugs where no breakpoint applies.` },
        ]}
        useCases={[
          { title: `Starting a new responsive design`, text: `Before writing media queries, review the standard breakpoint options here and pick the set that matches your expected device distribution.` },
          { title: `Debugging responsive layout gaps`, text: `Your layout breaks at 900px but your breakpoints are 768px and 1024px. Check the ranges here — 900px falls in the gap between breakpoints.` },
          { title: `Cross-framework project`, text: `You are using a Tailwind utility class alongside a Bootstrap component. Their breakpoints overlap in some cases but not others.` },
          { title: `Mobile viewport planning`, text: `Reference the actual viewport widths of target devices before designing. An iPhone SE viewport is 375px — narrower than many designers assume.` },
        ]}
        keyStats={[
          { stat: `375px`, source: `iPhone SE viewport width — the minimum mobile target to support` },
          { stat: `768px`, source: `iPad portrait viewport — the classic mobile/tablet breakpoint in most frameworks` },
          { stat: `Tailwind sm: 640px`, source: `Tailwind first breakpoint — lower than Bootstrap 576px` },
        ]}
        inlineLinks={[
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
          { text: `Pixel to REM`, href: `/calculators/dev/pixel-rem-converter`, label: `Pixel to REM` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
          { text: `Aspect Ratio Calculator`, href: `/calculators/dev/aspect-ratio-calculator`, label: `Aspect Ratio Calculator` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
        ]}
        tipsSection={`Mobile-first is better for performance. Base CSS applies to all screens; more is added at larger breakpoints. Desktop-first applies heavy styles by default and overrides for mobile — larger CSS on mobile.

Content breakpoints over device breakpoints. Add breakpoints where your content breaks — not at specific device sizes. Device-specific values become outdated as devices change.

Three to five breakpoints cover 95% of real devices. More breakpoints create more maintenance burden without proportional benefit.

Container queries for reusable components. CSS @container applies styles based on the container size, not the viewport. Better for components that appear in different layout contexts.`}
        conclusion={`Standard breakpoints ensure consistency and avoid the maintenance cost of custom values. For responsive CSS: [CSS Unit Converter](/calculators/dev/css-unit-converter) for unit conversions, [Font Size Calculator](/calculators/dev/font-size-calculator) for fluid typography.`}
      />
            <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
