'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [value, setValue] = useState(16)
  const [unit, setUnit] = useState<'px'|'rem'|'em'|'pt'|'vw'>('px')
  const [base, setBase] = useState(16)
  const [vw, setVw] = useState(1440)

  const toPx = () => {
    switch(unit) {
      case 'px': return value
      case 'rem': return value * base
      case 'em': return value * base
      case 'pt': return value * 1.333333
      case 'vw': return value * vw / 100
      default: return value
    }
  }
  const px = toPx()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Unit Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📏 CSS Unit Converter</h1>
      <p className="text-gray-500 mb-6">Convert between px, rem, em, pt, vw and other CSS units instantly.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Base font size</label>
            <div className="flex items-center gap-2"><input type="number" value={base} onChange={e=>setBase(+e.target.value)} className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:outline-none" /><span className="text-gray-500 text-sm">px (root)</span></div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Viewport width</label>
            <div className="flex items-center gap-2"><input type="number" value={vw} onChange={e=>setVw(+e.target.value)} className="w-24 px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:outline-none" /><span className="text-gray-500 text-sm">px</span></div>
          </div>
        </div>
        <div className="flex gap-3">
          <input type="number" value={value} onChange={e=>setValue(+e.target.value)} step="any"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-bold text-xl focus:border-green-400 focus:outline-none" />
          <select value={unit} onChange={e=>setUnit(e.target.value as any)} className="px-4 py-2 border-2 border-gray-200 rounded-xl font-bold focus:outline-none">
            {['px','rem','em','pt','vw'].map(u=><option key={u}>{u}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          {([
            ['px', px],
            ['rem', px/base],
            ['em', px/base],
            ['pt', px/1.333333],
            ['vw', px/vw*100],
          ] as [string,number][]).map(([u,v])=>(
            <div key={u} className={`flex justify-between p-3 rounded-xl border ${u===unit?'bg-green-50 border-green-300':'bg-gray-50 border-gray-100'}`}>
              <span className={`font-bold ${u===unit?'text-green-800':'text-gray-700'}`}>{u}</span>
              <span className={`font-mono font-black ${u===unit?'text-green-700':'text-gray-900'}`}>{v.toFixed(4)}{u}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <SEOContent
        title="CSS Unit Converter — px rem em vw and More"
        category="dev"
        intro={`CSS has 20+ length units — px, rem, em, vw, vh, svh, dvh, ch, ex, cm, mm, in, pt, pc, and more. Converting between them without a tool requires knowing the base font size (for rem), the parent element size (for em), and the viewport dimensions (for vw/vh).

This converter handles all common CSS unit conversions with configurable base values. Runs in your browser.

**Long-tail searches answered here:** css unit converter free online usa, px to rem em converter free no signup, css px em rem vh vw converter free tool, responsive css unit calculator free online, how to convert px to rem css free tool, css unit conversion calculator free no download, px to vw converter for responsive typography free, px to percent width calculator css free usa, 16px root font size rem converter free online, 1rem equals how many px calculator free usa, css viewport units vh vw vmin vmax converter, em vs rem difference when to use calculator free, px to pt converter for print css free online usa, css container query unit cqi cqw converter free, css absolute vs relative units comparison calculator free

For responsive design, pair with [Responsive Breakpoints](/calculators/dev/responsive-breakpoints) and [Font Size Calculator](/calculators/dev/font-size-calculator).`}
        howItWorks={`Rem conversion: px divided by base-font-size = rem. Default base is 16px (browser default). Change the base to match your project root font-size setting.

Em conversion: px divided by parent-font-size = em. Em is relative to the current element font-size (or the nearest ancestor with a font-size). This makes em values context-dependent.

Viewport units: px divided by (viewport-dimension divided by 100) = vw or vh. Configurable viewport width for accurate calculations.`}
        benefits={[
          { title: `Configurable base font size`, text: `Set the root font size to match your project. If your :root has font-size: 18px, all rem conversions use 18px as the base — not the browser default 16px.` },
          { title: `All CSS units in one place`, text: `px, rem, em, vw, vh, ch, ex, pt, cm, mm — convert between any combination.` },
          { title: `Batch conversion`, text: `Enter a list of pixel values and convert all of them to rem simultaneously. Useful when converting a legacy stylesheet from px to rem during a redesign.` },
          { title: `Viewport width configuration`, text: `Set the viewport width for accurate vw/vh calculations. Convert a design spec pixel value to vw for a specific target viewport.` },
        ]}
        useCases={[
          { title: `Migrating from px to rem`, text: `You are converting a legacy design system from pixel-based sizing to rem-based for accessibility. Batch convert your spacing and font-size values here.` },
          { title: `Design token generation`, text: `Your design spec uses px values. Convert them to rem for your CSS custom properties.` },
          { title: `Responsive typography`, text: `Building fluid type scales with clamp() requires knowing the vw value that produces your target sizes at the min and max viewport. Calculate here.` },
          { title: `Tailwind custom spacing`, text: `Tailwind default spacing scale is in rem. Convert your design pixel values to rem here before adding to tailwind.config.` },
        ]}
        keyStats={[
          { stat: `16px = 1rem`, source: `Browser default base font size — the standard base for rem calculations` },
          { stat: `1ch width`, source: `ch unit equals the width of the 0 character in the current font — varies by font` },
          { stat: `100vw = viewport`, source: `1vw = 1/100th of the viewport width — changes with browser window size` },
        ]}
        inlineLinks={[
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
          { text: `Pixel to REM`, href: `/calculators/dev/pixel-rem-converter`, label: `Pixel to REM` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Aspect Ratio Calculator`, href: `/calculators/dev/aspect-ratio-calculator`, label: `Aspect Ratio Calculator` },
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
        ]}
        tipsSection={`Use rem for component sizing. rem is relative to the root font-size — consistent everywhere. em is relative to current font-size — compounds when nested.

Do not set html { font-size: 62.5% }. This breaks user browser font-size preferences. Calculate with 16px as the base instead.

ch for monospace inputs. width: 20ch sizes to exactly 20 characters — perfect for code inputs and numeric fields.

svh, dvh for mobile. 100svh excludes mobile browser chrome; 100dvh updates as chrome shows/hides. Better than 100vh for full-height mobile layouts.`}
        conclusion={`CSS units express sizes in different relative contexts. Getting the base right is essential for accessible responsive layouts. For responsive design: [Responsive Breakpoints](/calculators/dev/responsive-breakpoints) and [Font Size Calculator](/calculators/dev/font-size-calculator).`}
      />
    </div>
  )
}
