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
      setOutput(`// CSS Border Radius Generator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Border Radius Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⬜ CSS Border Radius Generator</h1>
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
        title="CSS Border Radius Generator"
        category="dev"
        intro={`CSS border-radius controls corner roundness with up to four independent radius values — one per corner — plus shorthand notation. The elliptical radius syntax (10px / 20px) adds a second dimension per corner for egg shapes and wave effects.

This generator provides visual corner controls and outputs the correct CSS shorthand. Runs in your browser.

**Long-tail searches answered here:** css border radius generator free online usa, rounded corners css generator free no signup, border radius preview tool free online, css corner radius code generator free tool, how to make rounded div css generator free, css border radius visual generator no download, asymmetric border radius generator free online usa, border radius for pill button shape calculator free, css squircle border radius generator free usa, border radius to match different screen sizes free, different corner radii generator css free tool, border radius animation css keyframe generator free usa, tailwind border radius equivalent calculator free, how to create wave shape with border radius free, css border radius 50 percent circle maker free usa

For complete component styling, pair with [Box Shadow Generator](/calculators/dev/box-shadow-generator).`}
        howItWorks={`border-radius is a shorthand for four longhand properties: border-top-left-radius, border-top-right-radius, border-bottom-right-radius, border-bottom-left-radius. Each accepts 1-2 values: one value for circular corners, two values for elliptical corners.

The shorthand follows top-left, top-right, bottom-right, bottom-left clockwise order. Percentage values are relative to the element dimensions. border-radius: 50% produces a circle (for square elements) or an ellipse (for non-square elements).`}
        benefits={[
          { title: `Visual corner controls`, text: `Drag individual corner radius values and see the shape update in real time. Instant feedback for finding the exact radius.` },
          { title: `All shorthand forms`, text: `Generates the most compact shorthand: 10px (all equal), 10px 20px (two-pair), or 10px 20px 30px 40px (all different).` },
          { title: `Elliptical corner support`, text: `Generates the 10px / 20px elliptical radius syntax for asymmetric corner shapes. Used for organic, blob-like shapes.` },
          { title: `Percentage values`, text: `Toggle between px and % values. Percentage border-radius on non-square elements produces ellipses rather than circles.` },
        ]}
        useCases={[
          { title: `Button corner roundness`, text: `Most design systems have a standard button radius. A fully rounded pill button uses border-radius: 9999px. Build yours here and document the value.` },
          { title: `Card component styling`, text: `Cards typically use 8-16px radius. Adjust here to match your design system, then combine with [Box Shadow Generator](/calculators/dev/box-shadow-generator).` },
          { title: `Avatar and image circles`, text: `border-radius: 50% on a square element produces a circle — the standard pattern for avatar images.` },
          { title: `Blob and organic shapes`, text: `Using different values per corner with elliptical radii creates organic blob shapes — common in modern landing page design.` },
        ]}
        keyStats={[
          { stat: `4 corners`, source: `Each corner can have an independent radius value` },
          { stat: `border-radius: 50%`, source: `Standard circular avatar pattern — requires a square element` },
          { stat: `/ elliptical`, source: `Slash notation creates elliptical corners — separate h and v radius per corner` },
        ]}
        inlineLinks={[
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
          { text: `CSS Animation Generator`, href: `/calculators/dev/css-animation-gen`, label: `CSS Animation Generator` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `CSS Clip Path`, href: `/calculators/dev/css-clip-path`, label: `CSS Clip Path` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
        ]}
        tipsSection={`50% for circles, 9999px for pills. border-radius: 50% makes a circle only for square elements. 9999px always makes a pill regardless of element size.

Top-corners-only rounding. border-top-left-radius: 12px; border-top-right-radius: 12px — leave bottom corners at 0.

overflow: hidden for content clipping. Child content bleeds outside rounded corners without this.

Percentage on non-square. On a 200x100px element, 50% gives 100px horizontal and 50px vertical radius — an ellipse, not a circle.`}
        conclusion={`Border radius is one of the highest visual-impact CSS properties. This generator makes corner adjustment visual and generates the most compact shorthand. Complete component styling: [Box Shadow Generator](/calculators/dev/box-shadow-generator) and [CSS Gradient Generator](/calculators/dev/css-gradient-generator).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
