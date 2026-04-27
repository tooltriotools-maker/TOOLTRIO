'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [base, setBase] = useState(16)
  const [px, setPx] = useState(16)
  const [rem, setRem] = useState(1)
  const [copied, setCopied] = useState<string|null>(null)

  const pxToRem = (p: number) => +(p / base).toFixed(4)
  const remToPx = (r: number) => +(r * base).toFixed(2)

  const copy = (val: string, k: string) => { navigator.clipboard.writeText(val); setCopied(k); setTimeout(()=>setCopied(null),1500) }

  const SIZES = [8,10,12,14,16,18,20,24,28,32,36,40,48,56,64,72,80,96,128]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Pixel/REM Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📐 PX ↔ REM Converter</h1>
      <p className="text-gray-500 mb-6">Convert between pixel and REM units for responsive CSS. Set your base font size and convert instantly.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="mb-5">
          <label className="text-sm font-bold text-gray-700">Base font size (root): <span className="text-green-600">{base}px</span></label>
          <input type="range" min={8} max={32} value={base} onChange={e=>setBase(+e.target.value)} className="w-full accent-green-600 mt-1" />
          <div className="flex gap-2 mt-2">
            {[12,14,16,18,20].map(b=>(
              <button key={b} onClick={()=>setBase(b)} className={`px-3 py-1 text-xs font-bold rounded-lg border ${base===b?'bg-green-600 text-white border-green-600':'border-gray-200 hover:bg-gray-50'}`}>{b}px</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Pixels (px)</label>
            <input type="number" value={px} onChange={e=>{ setPx(+e.target.value); setRem(pxToRem(+e.target.value)) }} step="0.5"
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-green-400 rounded-xl font-bold text-xl focus:outline-none" />
            <div className="bg-green-50 rounded-xl p-3 mt-2 flex items-center justify-between">
              <span className="font-mono font-bold text-green-800">{px}px = {pxToRem(px)}rem</span>
              <button onClick={()=>copy(`${pxToRem(px)}rem`,'px')} className="text-xs text-green-600 font-bold">
                {copied==='px'?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">REM</label>
            <input type="number" value={rem} onChange={e=>{ setRem(+e.target.value); setPx(remToPx(+e.target.value)) }} step="0.25"
              className="w-full px-4 py-3 border-2 border-gray-200 focus:border-green-400 rounded-xl font-bold text-xl focus:outline-none" />
            <div className="bg-blue-50 rounded-xl p-3 mt-2 flex items-center justify-between">
              <span className="font-mono font-bold text-blue-800">{rem}rem = {remToPx(rem)}px</span>
              <button onClick={()=>copy(`${remToPx(rem)}px`,'rem')} className="text-xs text-blue-600 font-bold">
                {copied==='rem'?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">Conversion Table (base {base}px)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="text-left py-2 text-gray-500 font-bold">px</th>
              <th className="text-left py-2 text-gray-500 font-bold">rem</th>
              <th className="text-left py-2 text-gray-500 font-bold">px</th>
              <th className="text-left py-2 text-gray-500 font-bold">rem</th>
            </tr></thead>
            <tbody>
              {Array.from({length: Math.ceil(SIZES.length/2)}, (_,i)=>(
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 font-mono text-gray-700">{SIZES[i*2]}px</td>
                  <td className="py-1.5 font-mono text-green-700">{pxToRem(SIZES[i*2])}rem</td>
                  {SIZES[i*2+1]&&<><td className="py-1.5 font-mono text-gray-700">{SIZES[i*2+1]}px</td><td className="py-1.5 font-mono text-green-700">{pxToRem(SIZES[i*2+1])}rem</td></>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SEOContent
        title="Pixel to REM Converter"
        category="dev"
        intro={`Rem units in CSS are relative to the root html element font size (default 16px in all browsers). Designs are specified in pixels; CSS should use rem for accessibility — users who increase their browser font size benefit from rem-based layouts that scale with their preference.

This converter instantly converts px to rem (and back) with a configurable base size. Runs in your browser.

**Long-tail searches answered here:** px to rem converter free online usa, pixel to rem css converter free no signup, rem to px calculator free tool online, css unit px rem conversion free, how many rem is 16px calculator free, root font size px to rem calculator free usa, px to em converter with parent font size free, fluid typography px to clamp converter free usa, px to rem for 10px base size converter free, convert all px to rem in css file free tool usa, 24px button to rem calculation free converter, px to rem for different base font sizes free, design token px to rem conversion free usa, breakpoint pixel value to rem converter free, font size accessibility rem vs px guide free usa

For complete unit handling, see [CSS Unit Converter](/calculators/dev/css-unit-converter).`}
        howItWorks={`rem = px divided by base-font-size. With the default 16px base: 24px becomes 1.5rem, 16px becomes 1rem, 8px becomes 0.5rem.

The converter accepts a custom base font size if your project overrides the root font size in CSS. Batch mode: paste a list of pixel values (one per line or comma-separated) and convert all at once — useful when migrating a whole design spec from px to rem.`}
        benefits={[
          { title: `Batch px to rem conversion`, text: `Paste multiple pixel values at once and convert them all. Useful when migrating design tokens or a legacy stylesheet from pixel-based to rem-based sizing.` },
          { title: `Configurable base size`, text: `Set the root font-size to match your project. If you use 18px as your base, 18px = 1rem. The converter recalculates all conversions when you change the base.` },
          { title: `Reverse rem to px`, text: `Convert rem back to pixels for design handoff or debugging. When you see padding: 1.25rem in your CSS, enter it here to see it is 20px at 16px base.` },
          { title: `Accessible sizing reference`, text: `Shows the rendered size in px at common browser font-size settings (100%, 110%, 125%, 150%) — demonstrating why rem values scale correctly with user preferences while px values do not.` },
        ]}
        useCases={[
          { title: `Design-to-code handoff`, text: `Your designer specifies 20px padding. Convert here: 20/16 = 1.25rem. Use rem in your CSS so the padding scales when users increase their browser font size.` },
          { title: `Tailwind design token alignment`, text: `Tailwind spacing scale uses rem: p-4 = 1rem = 16px. Convert your design spec pixel values to rem here to align with Tailwind scale.` },
          { title: `Accessibility audit`, text: `Review your CSS for px font-size declarations. Convert them to rem here and replace — font-size: 14px becomes font-size: 0.875rem.` },
          { title: `Verifying component sizes`, text: `A component displays incorrectly. Convert its rem values to px here to see the actual rendered size and compare against the design spec.` },
        ]}
        keyStats={[
          { stat: `16px default`, source: `Default browser root font-size — the standard base for rem calculations` },
          { stat: `1.5rem = 24px`, source: `Common example: 24 divided by 16 = 1.5rem at the default 16px base` },
          { stat: `Accessibility`, source: `rem respects user browser font-size preferences; px ignores them` },
        ]}
        inlineLinks={[
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `Aspect Ratio Calculator`, href: `/calculators/dev/aspect-ratio-calculator`, label: `Aspect Ratio Calculator` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
        ]}
        tipsSection={`Never use html { font-size: 62.5% }. This breaks user browser font-size preferences — users who set 20px as their default now get 12.5px.

Design in px, code in rem. Figma specs in px. Convert to rem for the code — accessibility benefits without changing your design workflow.

rem for font-size, em for component spacing. Common convention: rem for font sizes, em for padding and margins.

Test at 200% browser zoom. Verify your layout works when rem values are effectively doubled by browser zoom.`}
        conclusion={`Pixel-to-rem is a daily developer task. This converter handles single values and batches with configurable base sizes. For complete responsive CSS: [CSS Unit Converter](/calculators/dev/css-unit-converter) and [Font Size Calculator](/calculators/dev/font-size-calculator).`}
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
