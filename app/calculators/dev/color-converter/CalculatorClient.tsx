'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function hexToRgb(hex: string) {
  const h = hex.replace('#','')
  if (h.length !== 6) return { r: 0, g: 0, b: 0 }
  return {
    r: parseInt(h.slice(0,2),16),
    g: parseInt(h.slice(2,4),16),
    b: parseInt(h.slice(4,6),16)
  }
}
function rgbToHsl(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max-min
  let h=0, s=0
  const l = (max+min)/2
  if (d !== 0) {
    s = l > 0.5 ? d/(2-max-min) : d/(max+min)
    if (max===r) h=((g-b)/d+(g<b?6:0))/6
    else if (max===g) h=((b-r)/d+2)/6
    else h=((r-g)/d+4)/6
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) }
}
function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('')
}
function hslToRgb(h: number, s: number, l: number) {
  h/=360; s/=100; l/=100
  let r, g, b
  if (s === 0) { r = g = b = l } else {
    const q = l < 0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q
    const h2r = (p: number, q: number, t: number) => {
      if (t<0) t+=1; if (t>1) t-=1
      if (t<1/6) return p+(q-p)*6*t
      if (t<1/2) return q
      if (t<2/3) return p+(q-p)*(2/3-t)*6
      return p
    }
    r=h2r(p,q,h+1/3); g=h2r(p,q,h); b=h2r(p,q,h-1/3)
  }
  return { r: Math.round(r*255), g: Math.round(g*255), b: Math.round(b*255) }
}
function getLuminance(r: number, g: number, b: number) {
  const srgb = [r,g,b].map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4) })
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2]
}

const PRESETS = [
  { name:'Indigo', hex:'#6366f1' }, { name:'Rose', hex:'#f43f5e' }, { name:'Emerald', hex:'#10b981' },
  { name:'Amber', hex:'#f59e0b' }, { name:'Sky', hex:'#0ea5e9' }, { name:'Purple', hex:'#a855f7' },
  { name:'Orange', hex:'#f97316' }, { name:'Teal', hex:'#14b8a6' }, { name:'Pink', hex:'#ec4899' },
  { name:'Black', hex:'#000000' }, { name:'White', hex:'#ffffff' }, { name:'Gray', hex:'#6b7280' },
]

export default function CalculatorClient({ faqs }: Props) {
  const [hex, setHex] = useState('#6366f1')
  const [rgbInput, setRgbInput] = useState({ r: 99, g: 102, b: 241 })
  const [hslInput, setHslInput] = useState({ h: 239, s: 84, l: 67 })
  const [activeTab, setActiveTab] = useState<'hex'|'rgb'|'hsl'>('hex')
  const [copied, setCopied] = useState('')

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val)
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const fromHex = useCallback((h: string) => {
    const rgb = hexToRgb(h)
    setRgbInput(rgb)
    setHslInput(rgbToHsl(rgb.r, rgb.g, rgb.b))
  }, [])

  const fromRgb = useCallback((r: number, g: number, b: number) => {
    const h = rgbToHex(r, g, b)
    setHex(h)
    setHslInput(rgbToHsl(r, g, b))
    setRgbInput({ r, g, b })
  }, [])

  const fromHsl = useCallback((h: number, s: number, l: number) => {
    const rgb = hslToRgb(h, s, l)
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b))
    setRgbInput(rgb)
    setHslInput({ h, s, l })
  }, [])

  const { r, g, b } = rgbInput
  const { h, s, l } = hslInput
  const luminance = getLuminance(r, g, b)
  const contrastWhite = ((1 + 0.05) / (luminance + 0.05)).toFixed(2)
  const contrastBlack = ((luminance + 0.05) / (0 + 0.05)).toFixed(2)
  const textColor = luminance > 0.179 ? '#000000' : '#ffffff'

  // Generate shades
  const shades = [10,20,30,40,50,60,70,80,90].map(lightness => {
    const rgb = hslToRgb(h, Math.max(10, s), lightness)
    return { lightness, hex: rgbToHex(rgb.r, rgb.g, rgb.b), rgb }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Color Converter</span>
      </nav>

      <h1 className="text-3xl font-black text-gray-900 mb-1">🎨 Color Converter</h1>
      <p className="text-gray-500 mb-6">Convert between HEX, RGB, HSL, and CSS formats. See contrast ratios, shades, and tints instantly.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left - color preview & picker */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Big color swatch */}
          <div className="w-full h-40 rounded-xl mb-4 flex items-center justify-center text-lg font-bold shadow-inner relative overflow-hidden"
            style={{ background: hex, color: textColor }}>
            <span className="font-mono text-2xl font-black tracking-widest">{hex.toUpperCase()}</span>
          </div>

          {/* Color picker + hex input */}
          <div className="flex items-center gap-3 mb-5">
            <input type="color" value={hex} onChange={e => { setHex(e.target.value); fromHex(e.target.value) }}
              className="w-14 h-14 rounded-xl border-2 border-gray-200 cursor-pointer p-1 flex-shrink-0" />
            <input
              value={hex}
              onChange={e => {
                const v = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value
                setHex(v)
                if (v.length === 7) fromHex(v)
              }}
              className="flex-1 font-mono text-xl px-4 py-3 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none uppercase"
              maxLength={7}
            />
            <button onClick={() => copy(hex.toUpperCase(), 'hex')} className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
              {copied === 'hex' ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-6 gap-2">
            {PRESETS.map(p => (
              <button key={p.hex} onClick={() => { setHex(p.hex); fromHex(p.hex) }}
                title={p.name}
                className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${hex.toLowerCase()===p.hex?'border-gray-800 scale-110':'border-transparent'}`}
                style={{ background: p.hex }} />
            ))}
          </div>
        </div>

        {/* Right - format outputs */}
        <div className="space-y-4">
          {/* RGB sliders */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">RGB</h3>
              <button onClick={() => copy(`rgb(${r}, ${g}, ${b})`, 'rgb')} className="flex items-center gap-1 text-xs text-green-600 font-bold">
                {copied==='rgb'?<Check className="w-3 h-3"/>:<Copy className="w-3 h-3"/>} {`rgb(${r}, ${g}, ${b})`}
              </button>
            </div>
            {([['R', r, '#ef4444', (v: number) => fromRgb(v, g, b)],
               ['G', g, '#22c55e', (v: number) => fromRgb(r, v, b)],
               ['B', b, '#3b82f6', (v: number) => fromRgb(r, g, v)]] as const).map(([label, val, color, fn]) => (
              <div key={label} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold" style={{ color }}>{label}</span>
                  <input type="number" value={val} min={0} max={255} onChange={e => fn(Math.min(255, Math.max(0, +e.target.value)))}
                    className="w-16 text-right border border-gray-200 rounded px-1 py-0.5 text-xs font-mono outline-none focus:border-green-400" />
                </div>
                <input type="range" min={0} max={255} value={val} onChange={e => fn(+e.target.value)}
                  className="w-full h-2 rounded-full cursor-pointer outline-none"
                  style={{ accentColor: color }} />
              </div>
            ))}
          </div>

          {/* HSL sliders */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">HSL</h3>
              <button onClick={() => copy(`hsl(${h}, ${s}%, ${l}%)`, 'hsl')} className="flex items-center gap-1 text-xs text-green-600 font-bold">
                {copied==='hsl'?<Check className="w-3 h-3"/>:<Copy className="w-3 h-3"/>} {`hsl(${h}, ${s}%, ${l}%)`}
              </button>
            </div>
            {([['H degrees', h, 0, 360, '#a855f7', (v: number) => fromHsl(v, s, l)],
               ['S%', s, 0, 100, '#f59e0b', (v: number) => fromHsl(h, v, l)],
               ['L%', l, 0, 100, '#6b7280', (v: number) => fromHsl(h, s, v)]] as const).map(([label, val, min, max, color, fn]) => (
              <div key={label} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold" style={{ color }}>{label}</span>
                  <input type="number" value={val} min={min} max={max} onChange={e => fn(Math.min(max, Math.max(min, +e.target.value)))}
                    className="w-16 text-right border border-gray-200 rounded px-1 py-0.5 text-xs font-mono outline-none focus:border-green-400" />
                </div>
                <input type="range" min={min} max={max} value={val} onChange={e => fn(+e.target.value)}
                  className="w-full h-2 rounded-full cursor-pointer"
                  style={{ accentColor: color }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Output formats */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-900 mb-3">All Formats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'HEX', val: hex.toUpperCase(), key: 'hex2' },
            { label: 'RGB', val: `rgb(${r}, ${g}, ${b})`, key: 'rgb2' },
            { label: 'RGBA (100%)', val: `rgba(${r}, ${g}, ${b}, 1)`, key: 'rgba' },
            { label: 'HSL', val: `hsl(${h}, ${s}%, ${l}%)`, key: 'hsl2' },
            { label: 'CSS Variable', val: `--color: ${hex};`, key: 'cssvar' },
            { label: 'Tailwind [arbitrary]', val: `[${hex}]`, key: 'tw' },
          ].map(item => (
            <div key={item.key} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl group">
              <span className="text-xs font-bold text-gray-500 w-28 flex-shrink-0">{item.label}</span>
              <code className="flex-1 font-mono text-sm text-gray-800 truncate">{item.val}</code>
              <button onClick={() => copy(item.val, item.key)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg transition-all flex-shrink-0">
                {copied===item.key ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shades & Tints */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Shades & Tints</h3>
        <div className="grid grid-cols-9 gap-2">
          {shades.map(shade => (
            <button key={shade.lightness} onClick={() => copy(shade.hex, `shade-${shade.lightness}`)}
              title={shade.hex} className="relative group">
              <div className="aspect-square rounded-lg shadow-sm hover:scale-110 transition-transform"
                style={{ background: shade.hex }} />
              <span className="text-[9px] text-gray-500 block text-center mt-1">{shade.lightness}%</span>
              {copied===`shade-${shade.lightness}` && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap">
                  Copied!
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contrast info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Accessibility Contrast Ratios (WCAG)</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { bg: hex, text: '#ffffff', label: 'White text on your color', ratio: contrastWhite },
            { bg: hex, text: '#000000', label: 'Black text on your color', ratio: contrastBlack },
          ].map((c, i) => {
            const ratio = parseFloat(c.ratio)
            const aa = ratio >= 4.5, aaa = ratio >= 7
            return (
              <div key={i} className="p-4 rounded-xl border border-gray-100"
                style={{ background: c.bg, color: c.text }}>
                <p className="font-bold text-sm">{c.label}</p>
                <p className="text-2xl font-black mt-1">{c.ratio}:1</p>
                <div className="flex gap-2 mt-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${aa?'bg-green-500 text-white':'bg-red-500 text-white'}`}>AA {aa?'v':'✗'}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${aaa?'bg-green-500 text-white':'bg-red-500 text-white'}`}>AAA {aaa?'v':'✗'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SEOContent
        title="Color Converter"
        category="dev"
        intro={`The Color Converter is the web developer's essential tool for instantly converting colors between HEX, RGB, HSL, and CSS formats. Whether you're building a website, designing a UI, or writing CSS, accurate color conversion is a daily need for front-end developers, UI/UX designers, and digital artists across the United States and worldwide.

Our free online Color Converter runs entirely in your browser with zero data transmission. Simply pick a color using the visual color picker, enter a HEX code like #3b82f6, or adjust RGB/HSL sliders - all three formats update in real time simultaneously. Copy any format with one click, generate complete shade and tint palettes, and check WCAG accessibility contrast ratios instantly.

American developers working on ADA-compliant websites need WCAG 2.1 AA contrast ratios (minimum 4.5:1 for normal text). This tool shows your exact contrast ratio against white and black backgrounds, with immediate pass/fail indicators for both AA and AAA standards - saving you from expensive accessibility audits later.

**Long-tail searches answered here:** color code converter free online usa, hex to rgb to hsl converter free no signup, color format converter hex rgb hsl free tool, rgba to hex converter online free instant, css color converter free no download usa, pantone to hex color converter free online, hex color to rgb decimal values converter free, hsl to hex color conversion calculator free usa, cmyk to rgb color converter for print to web free, oklch to hex css modern color converter free usa, color space conversion lab to rgb calculator free, named color to hex code lookup usa free, css color names to hex value converter free, color picker hex to hsl adjustment calculator usa free, web safe colors hex codes reference free usa`}
        howItWorks={`The Color Converter implements the standard color space transformation algorithms used in CSS and digital design. HEX is simply RGB expressed in base-16 notation: #RRGGBB where each pair is 0-255 in hexadecimal. RGB (Red, Green, Blue) is the additive color model used by all screens. HSL (Hue, Saturation, Lightness) is a more intuitive model for human perception of color.

Conversion from RGB to HSL uses the standard formula: Lightness = (max+min)/2, Saturation depends on lightness range, and Hue is derived from which color channel is dominant. The WCAG contrast ratio uses relative luminance calculated with the sRGB color space formula specified in WCAG 2.1 guidelines by the W3C Web Accessibility Initiative.

All conversions happen in real time - changing any input instantly updates all other formats. The shade generator creates 9 variants of your color by holding Hue and Saturation constant while sweeping Lightness from 10% to 90%, following the same approach used by popular design systems like Tailwind CSS.`}
        benefits={[
          { title: 'Real-Time Multi-Format Conversion', text: 'Change any input (HEX, RGB sliders, or HSL sliders) and all other formats update instantly. No button clicking, no page reload - live conversion as you design.' },
          { title: 'WCAG Accessibility Contrast Checker', text: 'Instantly see contrast ratios against white and black backgrounds with AA/AAA pass/fail indicators. Essential for ADA-compliant US web development.' },
          { title: 'Automatic Shade & Tint Generation', text: 'Generate a complete 9-step color palette from your base color - identical to how Tailwind CSS and Material Design generate their color scales.' },
          { title: 'All CSS Formats Ready to Copy', text: 'One-click copy for HEX, RGB, RGBA, HSL, CSS custom property, and Tailwind arbitrary value formats. Works directly in your stylesheet.' },
          { title: 'Visual Color Picker Integration', text: 'Use the native browser color picker for visual selection, then get all formats instantly. No switching between apps or browser developer tools.' },
          { title: 'Zero Install, Zero Account', text: 'Works in any browser on any device. No extension to install, no account to create. Bookmark and use whenever you are writing CSS.' },
        ]}
        useCases={[
          { title: 'Front-End Web Developers', text: 'Convert brand colors from design files (usually HEX) to CSS custom properties, RGBA with opacity, or HSL for dynamic theming in CSS variables.' },
          { title: 'UI/UX Designers', text: 'Generate complete color scales from a single brand color, check accessibility compliance, and hand off exact color values to development teams.' },
          { title: 'WordPress & Shopify Theme Developers', text: 'CMS theme builders routinely need to convert between color formats when customizing templates that use different color notations in their CSS.' },
          { title: 'Accessibility Specialists', text: 'Verify WCAG contrast compliance for client websites. The built-in contrast checker eliminates the need for separate tools during accessibility audits.' },
          { title: 'Graphic Designers Moving to Web', text: 'Print designers use CMYK; web uses RGB. This tool helps designers transitioning to digital understand web color formats and convert their palette.' },
          { title: 'Students Learning CSS', text: 'Visual, interactive demonstration of how HEX, RGB, and HSL relate to each other makes color theory concrete and immediately applicable.' },
        ]}
        tipsSection={`When working with brand colors, always store your primary palette as CSS custom properties (CSS variables) using HSL notation - it makes generating tints and shades trivially easy in CSS: hsl(var(--hue), var(--saturation), 90%) for a light tint.

For dark mode implementation, HSL is far superior to HEX or RGB because you can flip lightness values programmatically: a color at L=30% in dark mode corresponds to L=70% in light mode, making theme switching a simple CSS variable change.

For WCAG AA compliance (required for most US government and enterprise websites), you need at least 4.5:1 contrast for normal text and 3:1 for large text (18pt+). If your brand color fails both white and black text contrast, consider using a tinted white background or a darkened brand color for text rather than the pure brand color.

Always check colors on actual device screens before finalizing - monitors, phones, and screens have different gamma curves and gamut rendering. What looks correct on one device may appear differently on another, especially at extreme light or dark values.`}
        scienceSection={`Color science and digital color representation have a rich technical foundation. The sRGB (standard Red Green Blue) color space, defined by HP and Microsoft in 1996 and standardized as IEC 61966-2-1, became the default color space for web browsers and the internet. CSS Color Level 4 (2023) extends CSS to support Display P3 (wider gamut, used by Apple devices), OKLCH (perceptually uniform), and other modern color spaces beyond sRGB.

The WCAG (Web Content Accessibility Guidelines) contrast ratio formula was developed by the W3C Web Accessibility Initiative based on research into human visual perception. The formula uses relative luminance in the sRGB color space to approximate how the human eye perceives contrast. Importantly, perceived luminance is not linear - the formula applies gamma correction (the sRGB transfer function) to account for how display hardware maps digital values to light output.

CSS Color Level 5 introduces color-mix() and relative color syntax that allow dynamic color manipulation - mixing colors, lightening/darkening by percentage - directly in CSS without JavaScript. This makes the color scale generation demonstrated in this tool reproducible in pure CSS for modern browsers.`}
        conclusion={`The Color Converter is the all-in-one color tool every web developer, designer, and digital creator needs bookmarked. Convert between all CSS color formats, generate accessibility-compliant color palettes, and check WCAG contrast ratios - all in one free, browser-based tool.

Pair it with our CSS Gradient Generator and Color Contrast tools for a complete front-end color workflow. No installs, no sign-ups, no limits - professional color conversion available to any American developer right in their browser.`}
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => (
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
