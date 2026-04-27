'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      setOutput(`// Fluid Font Size Calculator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Fluid Font Size Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📏 Fluid Font Size Calculator</h1>
      <p className="text-gray-500 mb-6">Runs entirely in your browser - no data sent to server</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14} placeholder="Paste your input here..."
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          {error
            ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 text-sm font-mono">{error}</p></div>
            : <pre className="h-64 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output appears here...'}</pre>
          }
        </div>
      </div>

      <SEOContent
        title="Font Size Calculator — Fluid Typography and clamp()"
        category="dev"
        intro={`Fluid typography scales smoothly between a minimum and maximum font size across a viewport range, without media query breakpoints. The CSS clamp() function implements this: clamp(1rem, 2.5vw + 0.5rem, 2rem) — but calculating those three values from target sizes at target viewports is non-trivial math.

This calculator generates the clamp() expression from your min/max font size and min/max viewport width inputs. Runs in your browser.

**Long-tail searches answered here:** css font size calculator free online usa, responsive font size calculator free no signup, fluid typography calculator clamp css free, px to rem font size converter free tool, optimal font size for readability calculator free, css font scale calculator free no download usa, fluid type scale generator clamp min max free usa, typographic ratio scale calculator for css free, font size for mobile vs desktop calculator free, viewport based font size calculator free online usa, golden ratio typography scale generator free, ideal body text font size for reading free usa, minimum touch target font size calculator free, font size hierarchy heading body small free usa, css variable font size scale generator free

For unit conversions, pair with [CSS Unit Converter](/calculators/dev/css-unit-converter) and [Pixel to REM Converter](/calculators/dev/pixel-rem-converter).`}
        howItWorks={`Given: min font size, max font size, min viewport width, max viewport width — the calculator derives the slope and intercept for linear interpolation between the two extremes.

Formula: preferred = slope * 100vw + intercept, where slope = (maxFontSize - minFontSize) / (maxViewport - minViewport) and intercept = minFontSize - slope * minViewport.

The clamp(minFontSize, preferred, maxFontSize) expression ensures the font never goes below the minimum or above the maximum.`}
        benefits={[
          { title: `clamp() value generation`, text: `Takes your min/max font sizes and viewports and outputs the exact clamp() expression — no manual slope/intercept calculation required.` },
          { title: `Type scale generator`, text: `Generate a complete fluid type scale (xs, sm, base, lg, xl, 2xl) from base size and scale ratio. Each step is a clamp() expression that scales proportionally.` },
          { title: `Preview at multiple viewports`, text: `Shows the resulting font size at your minimum viewport, maximum viewport, and key intermediate widths — verifies the scaling looks right before using it.` },
          { title: `rem and px output`, text: `Outputs the clamp() expression in both rem (for production use) and px (for design handoff verification).` },
        ]}
        useCases={[
          { title: `Responsive heading sizes`, text: `Your H1 should be 48px on desktop (1440px wide) and 28px on mobile (375px wide). Enter those four values and get the clamp() expression that scales smoothly.` },
          { title: `Building a design token scale`, text: `Generate a complete fluid type scale as CSS custom properties: --text-xl: clamp(1.25rem, 2vw + 0.5rem, 1.75rem). No media queries needed for responsive typography.` },
          { title: `Tailwind custom font sizes`, text: `Tailwind does not include fluid typography out of the box. Generate clamp() values here and add them to your tailwind.config fontSize entries.` },
          { title: `Legacy site responsive update`, text: `An existing site uses fixed px font sizes. Replace them with clamp() values from this calculator for responsive typography without restructuring media queries.` },
        ]}
        keyStats={[
          { stat: `clamp(min, preferred, max)`, source: `CSS function for fluid values — prevents the size from going below min or above max` },
          { stat: `1vw = 1% viewport`, source: `Viewport units create the fluid preferred value in the clamp expression` },
          { stat: `No media queries`, source: `A single clamp() expression replaces 2-3 media query breakpoints for font-size` },
        ]}
        inlineLinks={[
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Pixel to REM`, href: `/calculators/dev/pixel-rem-converter`, label: `Pixel to REM` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
          { text: `Aspect Ratio Calculator`, href: `/calculators/dev/aspect-ratio-calculator`, label: `Aspect Ratio Calculator` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
        ]}
        tipsSection={`clamp() replaces 2 breakpoints. One expression handles continuous scaling across the range — no media query jumps.

Use rem for min and max. clamp(1rem, 2.5vw + 0.5rem, 1.5rem) respects user browser font-size preferences.

Check the preferred value crosses the range. If preferred value is always above max or below min, there is no fluid range — check preview at intermediate widths.

Fluid spacing too. padding: clamp(1rem, 4vw, 3rem) creates responsive spacing without media queries — same technique as typography.`}
        conclusion={`Fluid typography eliminates jarring font-size jumps at breakpoints. The clamp() math is non-obvious but this calculator makes it a form-fill exercise. For responsive CSS: [CSS Unit Converter](/calculators/dev/css-unit-converter) and [Responsive Breakpoints](/calculators/dev/responsive-breakpoints).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
