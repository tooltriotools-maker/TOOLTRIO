'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function hexToRgb(hex: string) {
  const h = hex.replace('#','')
  if (h.length !== 6) return null
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) }
}
function getLuminance(r: number, g: number, b: number) {
  const c = [r,g,b].map(v => { v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4) })
  return 0.2126*c[0] + 0.7152*c[1] + 0.0722*c[2]
}
function getContrastRatio(hex1: string, hex2: string): number | null {
  const c1 = hexToRgb(hex1), c2 = hexToRgb(hex2)
  if (!c1 || !c2) return null
  const l1 = getLuminance(c1.r,c1.g,c1.b), l2 = getLuminance(c2.r,c2.g,c2.b)
  const lighter = Math.max(l1,l2), darker = Math.min(l1,l2)
  return (lighter+0.05)/(darker+0.05)
}

const SAMPLE_COMBOS = [
  { fg: '#ffffff', bg: '#000000', name: 'White on Black' },
  { fg: '#000000', bg: '#ffffff', name: 'Black on White' },
  { fg: '#ffffff', bg: '#1d4ed8', name: 'White on Blue' },
  { fg: '#ffffff', bg: '#16a34a', name: 'White on Green' },
  { fg: '#1f2937', bg: '#f9fafb', name: 'Dark on Light Gray' },
  { fg: '#dc2626', bg: '#fef2f2', name: 'Red on Light Red' },
  { fg: '#7c3aed', bg: '#ede9fe', name: 'Purple on Lavender' },
  { fg: '#78350f', bg: '#fef3c7', name: 'Brown on Yellow' },
]

export default function CalculatorClient({ faqs }: Props) {
  const [fg, setFg] = useState('#1f2937')
  const [bg, setBg] = useState('#f9fafb')
  const [copied, setCopied] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState<'normal'|'bold'>('normal')

  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }
  const swap = () => { const t=fg; setFg(bg); setBg(t) }

  const ratio = getContrastRatio(fg, bg)
  const ratioStr = ratio ? ratio.toFixed(2) : '-'

  const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight === 'bold')
  const aaNormal = (ratio||0) >= 4.5
  const aaLarge = (ratio||0) >= 3
  const aaaNormal = (ratio||0) >= 7
  const aaaLarge = (ratio||0) >= 4.5

  const level = (ratio||0) >= 7 ? { label: 'AAA', color: 'text-green-600', bg: 'bg-green-50 border-green-300' }
    : (ratio||0) >= 4.5 ? { label: 'AA', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-300' }
    : (ratio||0) >= 3 ? { label: 'AA Large', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-300' }
    : { label: 'Fail', color: 'text-red-600', bg: 'bg-red-50 border-red-300' }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Color Contrast Checker</span>
      </nav>

      <h1 className="text-3xl font-black text-gray-900 mb-1">♿ Color Contrast Checker (WCAG)</h1>
      <p className="text-gray-500 mb-6">Check color contrast ratios against WCAG 2.1 AA/AAA standards for accessible web design. Required for ADA compliance.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Text Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  <input value={fg} onChange={e=>setFg(e.target.value)} className="flex-1 font-mono text-sm px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none uppercase" maxLength={7} />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Background Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                  <input value={bg} onChange={e=>setBg(e.target.value)} className="flex-1 font-mono text-sm px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none uppercase" maxLength={7} />
                </div>
              </div>
            </div>
            <button onClick={swap} className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" /> Swap Colors
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <label className="text-xs font-bold text-gray-500 uppercase block mb-3">Font Size & Weight</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input type="range" min={8} max={72} value={fontSize} onChange={e=>setFontSize(+e.target.value)} className="w-full" />
                <p className="text-xs text-gray-500 mt-1">{fontSize}px {isLargeText ? '(Large text)' : '(Normal text)'}</p>
              </div>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden flex-shrink-0">
                {(['normal','bold'] as const).map(w => (
                  <button key={w} onClick={()=>setFontWeight(w)} className={`px-4 py-2 text-sm font-bold capitalize ${fontWeight===w?'bg-blue-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{w}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-4">
          <div className={`rounded-2xl p-6 border-2 text-center ${level.bg}`}>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-1">Contrast Ratio</p>
            <p className={`text-6xl font-black ${level.color}`}>{ratioStr}<span className="text-2xl">:1</span></p>
            <p className={`text-xl font-black mt-1 ${level.color}`}>{level.label}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">WCAG 2.1 Compliance</h3>
            <div className="space-y-2">
              {[
                { label: 'AA - Normal text (4.5:1)', pass: aaNormal },
                { label: 'AA - Large text (3:1)', pass: aaLarge },
                { label: 'AAA - Normal text (7:1)', pass: aaaNormal },
                { label: 'AAA - Large text (4.5:1)', pass: aaaLarge },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl ${item.pass?'bg-green-50':'bg-red-50'}`}>
                  <span className={`text-lg flex-shrink-0`}>{item.pass ? '✅' : '❌'}</span>
                  <span className={`text-sm font-semibold ${item.pass?'text-green-800':'text-red-800'}`}>{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Large text = 18px+ regular or 14px+ bold. {isLargeText?'v Your current size qualifies as large text.':'Your current size is normal text.'}</p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Live Preview</h2>
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <div className="p-8 space-y-3" style={{ background: bg }}>
            {[8,12,16,20,24,32,48].map(size => (
              <p key={size} style={{ color: fg, fontSize: size, fontWeight: size===fontSize?fontWeight:'normal', lineHeight:1.4 }}>
                {size === fontSize ? '-> ' : ''}The quick brown fox jumps over the lazy dog. ({size}px)
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Sample combinations */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Try Common Combinations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SAMPLE_COMBOS.map(combo => {
            const r = getContrastRatio(combo.fg, combo.bg)
            const pass = (r||0) >= 4.5
            return (
              <button key={combo.name} onClick={() => { setFg(combo.fg); setBg(combo.bg) }}
                className="p-3 rounded-xl text-center hover:scale-105 transition-transform border"
                style={{ background: combo.bg, borderColor: combo.bg === '#ffffff' ? '#e5e7eb' : combo.bg }}>
                <p className="font-bold text-sm" style={{ color: combo.fg }}>{combo.name}</p>
                <p className="text-xs mt-1" style={{ color: combo.fg, opacity: 0.7 }}>{r?.toFixed(1)}:1 {pass?'✅':'❌'}</p>
              </button>
            )
          })}
        </div>
      </div>

      <SEOContent
        title="Color Contrast Checker"
        category="dev"
        intro={`The Color Contrast Checker verifies your text and background color combinations against WCAG 2.1 accessibility standards - the global benchmark for web accessibility that is legally required under the Americans with Disabilities Act (ADA) for US websites, apps, and digital content.

The Web Content Accessibility Guidelines (WCAG) specify minimum contrast ratios to ensure text is readable for users with low vision or color blindness. Level AA (the legal minimum for most US government, healthcare, and enterprise websites) requires a 4.5:1 contrast ratio for normal text and 3:1 for large text. Level AAA (the highest standard, recommended for critical text) requires 7:1 for normal text.

Our free WCAG Color Contrast Checker instantly calculates the exact contrast ratio between any two colors, shows pass/fail status for all four WCAG 2.1 criteria, provides a live text preview at multiple font sizes, and includes common color combinations as starting points. No extensions, no plugins, no account - just open and start testing.

**Long-tail searches answered here:** color contrast checker free online usa wcag, accessibility color contrast ratio calculator free, wcag aa aaa contrast checker free no signup, text background color contrast checker online free, accessible color combination checker free tool, color contrast ratio calculator for web design free, wcag 2.1 contrast ratio requirements for text free usa, 4.5 to 1 vs 3 to 1 contrast requirement difference free, large text vs small text contrast requirement calculator, how to fix low contrast accessibility issue free usa, color blindness safe color combination checker free, foreground background contrast ratio calculator usa free, contrast checker for button states hover active free, dark mode contrast ratio checker free online usa, accessible chart color selection contrast calculator free`}
        howItWorks={`Contrast ratio is calculated using the WCAG 2.1 relative luminance formula specified by W3C. Each color is first converted to relative luminance using the sRGB color space: linearize each channel (reverse gamma correction), then combine using the standard luminance weights (0.2126 for red, 0.7152 for green, 0.0722 for blue). The contrast ratio is then (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color's luminance.

This is the exact formula used by browser developer tools, screen readers, and professional accessibility audit tools like axe, WAVE, and Lighthouse. All calculations are performed in your browser with zero data transmission.

The tool automatically detects whether your current font size qualifies as 'large text' under WCAG definitions: 18px+ regular weight, or 14px+ bold weight. Large text has lower contrast requirements (3:1 for AA, 4.5:1 for AAA) because it is inherently more readable.`}
        benefits={[
          { title: 'ADA & WCAG 2.1 Compliance Testing', text: 'Check all four WCAG 2.1 contrast requirements (AA/AAA for normal and large text) in one view. Essential for US websites required to comply with the Americans with Disabilities Act.' },
          { title: 'Real-Time Live Preview', text: 'See exactly how your color combination looks with actual text at multiple font sizes. No guessing - see the result before shipping.' },
          { title: 'Exact Ratio Calculation', text: 'Get the precise contrast ratio (e.g., 5.24:1) not just pass/fail. This helps you make informed design decisions about borderline colors.' },
          { title: 'Quick-Load Sample Combinations', text: 'One-click common color combinations to see their contrast performance. Great starting point for building an accessible color palette from scratch.' },
          { title: 'Font Size & Weight Aware', text: 'Automatically adjusts WCAG thresholds based on your font size and weight, since large text has different requirements than normal body text.' },
          { title: 'Zero Cost Accessibility Auditing', text: 'Professional accessibility audits can cost hundreds to thousands of dollars. This tool provides the core contrast check instantly, for free, on every page you build.' },
        ]}
        useCases={[
          { title: 'Government Website Developers', text: 'US federal and state government websites are legally required to meet WCAG 2.0 AA minimum standards under Section 508 of the Rehabilitation Act. Test every color combination during development.' },
          { title: 'Healthcare Web Development', text: 'Healthcare websites serving Medicare, Medicaid, and ADA-protected patients face particular accessibility scrutiny. Verify all text contrast before deployment.' },
          { title: 'Education Technology', text: 'EdTech platforms serving K-12 and higher education must meet accessibility standards under IDEA and ADA. Check contrast for all student-facing interfaces.' },
          { title: 'SaaS Product Teams', text: 'Enterprise SaaS products with institutional clients increasingly require WCAG 2.1 AA compliance as a contract condition. Build accessibility into your design system from day one.' },
          { title: 'Accessibility Auditors', text: 'Professional accessibility consultants use contrast checkers as part of comprehensive WCAG audits for clients facing ADA complaints or proactive compliance programs.' },
          { title: 'Brand Designers', text: 'Verify that brand colors work in digital contexts with sufficient contrast before finalizing brand guidelines that will govern years of design work.' },
        ]}
        tipsSection={`Always test contrast for every text-background combination in your design - not just body text. Check headings, buttons, labels, placeholder text, disabled states, and link colors. Each combination must independently meet WCAG standards.

The 4.5:1 AA ratio is a minimum, not a target. Whenever possible, aim for 7:1 (AAA level) for body text - this creates a more comfortable reading experience for all users, including those without visual impairments, and provides margin for rendering differences across devices.

Watch out for UI elements that are often overlooked: placeholder text in form fields, disabled button text, and text over image or gradient backgrounds. Placeholder text particularly often fails contrast requirements in popular design systems.

Test with real devices, not just tools. Some color combinations technically pass WCAG ratios but look poor on specific screen types or in bright ambient light. The combination of tool verification and real-device testing gives the highest confidence in accessibility compliance.

For the US market, remember that the Department of Justice has clarified that ADA Title III applies to websites - court precedents like Robles v. Domino's Pizza have established legal liability for inaccessible web content.`}
        scienceSection={`The WCAG contrast ratio algorithm is based on the relative luminance formula specified in IEC 61966-2-1 (sRGB standard). The formula first linearizes gamma-encoded RGB values (reversing the display gamma), then computes luminance using perceptual weights derived from human photoreceptor sensitivity: 0.2126R + 0.7152G + 0.0722B, where green receives the highest weight because human eyes are most sensitive to green wavelengths.

A landmark 2008 study by Gregg Vanderheiden and others for the W3C found that approximately 1 in 12 men (8%) and 1 in 200 women (0.5%) have some form of color vision deficiency in the United States - approximately 13 million Americans. For text contrast specifically, the 4.5:1 AA ratio was validated against subjects with moderate visual impairments as the minimum for readable text without assistive technology.

The proposed WCAG 3.0 introduces APCA (Advanced Perceptual Contrast Algorithm) which provides more nuanced contrast requirements based on actual typography research - accounting for font weight, size, and polarity (light vs. dark backgrounds). APCA corrects several known issues with the WCAG 2.x formula, particularly its poor performance for dark mode interfaces and large display text.`}
        conclusion={`The Color Contrast Checker makes WCAG accessibility testing fast, free, and accessible to every American web developer and designer. Build accessible websites from the start - not as an afterthought - and protect your organization from ADA liability while creating better experiences for all users.

Use this alongside our Color Converter and Color Palette Generator for a complete accessibility-first color workflow.`}
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
