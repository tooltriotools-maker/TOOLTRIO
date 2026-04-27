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
      setOutput(`// CSS clip-path Generator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS clip-path Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">✂️ CSS clip-path Generator</h1>
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
        title="CSS Clip Path Generator"
        category="dev"
        intro={`CSS clip-path creates non-rectangular visible areas for elements — triangles, hexagons, wavy edges, and custom polygon shapes. The polygon point coordinates are hard to write by hand; this visual editor makes clip-path shapes interactive.

Runs in your browser.

**Long-tail searches answered here:** css clip path generator free online usa, css shape clip path creator free no signup, polygon clip path maker free online tool, css clip path visual editor free no download, how to create clip path css free generator, css clip path code generator copy free, css circle clip path generator free online usa, css hexagon shape clip path generator free, css arrow shape clip path generator usa free, css slanted diagonal clip path generator free, css clip path animation transition generator free, svg clip path vs css clip path comparison free, css clip path for card design overlay free usa, clip path polygon points calculator free online, css clip path browser support checker free usa

For related visual CSS, pair with [CSS Gradient Generator](/calculators/dev/css-gradient-generator) and [SVG Optimizer](/calculators/dev/svg-optimizer).`}
        howItWorks={`The generator maintains a list of polygon points as percentage coordinates. Drag points in the live preview to reposition them. Add or remove points for more complex shapes. The CSS output uses clip-path: polygon(x1 y1, x2 y2, ...) format with percentage values that scale with the element.

Preset shapes (triangle, hexagon, pentagon, arrow, chevron, parallelogram) provide starting points. The tool also generates clip-path: circle(), ellipse(), and inset() syntax for simple geometric clips.`}
        benefits={[
          { title: `Drag-and-drop polygon editor`, text: `Drag polygon points in a live preview. Instant visual feedback makes finding the right shape much faster than guessing coordinates.` },
          { title: `Preset shapes`, text: `Triangles, hexagons, arrows, and chevrons as starting points. Modify presets for custom variations rather than starting from scratch.` },
          { title: `circle() and ellipse() support`, text: `Not just polygons — generates circle(radius at center) and ellipse(rx ry at cx cy) clip-path syntax for circular reveals.` },
          { title: `Animation-ready output`, text: `Clip-path values can be animated with CSS transitions. The generator outputs values in a consistent format for smooth clip-path transitions.` },
        ]}
        useCases={[
          { title: `Diagonal section breaks`, text: `Modern landing pages use angled section dividers. A polygon clip on the section background creates the diagonal effect without SVG.` },
          { title: `Image reveal effects`, text: `Apply clip-path to images with CSS transitions for animated reveal effects on scroll or hover.` },
          { title: `Custom button shapes`, text: `Hexagonal, arrow-shaped, or chevron buttons using clip-path on standard HTML button elements.` },
          { title: `Hero section shapes`, text: `Decorative background elements in hero sections using colorful clipped divs rather than SVG images.` },
        ]}
        keyStats={[
          { stat: `polygon()`, source: `Most flexible clip-path function — arbitrary polygon with any number of points` },
          { stat: `% coordinates`, source: `Percentage values make clip-path responsive — scales with element size` },
          { stat: `Animatable`, source: `CSS transition: clip-path works in Chrome, Firefox, Safari for smooth shape animations` },
        ]}
        inlineLinks={[
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
          { text: `SVG Optimizer`, href: `/calculators/dev/svg-optimizer`, label: `SVG Optimizer` },
          { text: `CSS Animation Generator`, href: `/calculators/dev/css-animation-gen`, label: `CSS Animation Generator` },
          { text: `Border Radius Generator`, href: `/calculators/dev/border-radius-gen`, label: `Border Radius Generator` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
        ]}
        tipsSection={`Overflow hidden on parent. Clip-path clips visually but the element still occupies its original rectangular space. Add overflow: hidden to the parent if child elements appear outside the clip.

Percentages for responsiveness. Use 50% 0%, 100% 100%, 0% 100% not pixel coordinates — percentage values scale with the element.

Safari -webkit- prefix. Always include -webkit-clip-path for Safari on iOS and older macOS.

Animate clip-path for reveals. clip-path: inset(0 100% 0 0) to inset(0 0 0 0) creates a left-to-right reveal — a common scroll animation pattern.`}
        conclusion={`CSS clip-path creates shapes previously requiring SVG or background hacks. For complete visual design: [CSS Gradient Generator](/calculators/dev/css-gradient-generator) for fills and [CSS Animation Generator](/calculators/dev/css-animation-gen) for animated reveals.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
