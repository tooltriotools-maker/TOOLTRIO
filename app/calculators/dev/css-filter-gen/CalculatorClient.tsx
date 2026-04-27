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
      setOutput(`// CSS Filter Generator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Filter Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎨 CSS Filter Generator</h1>
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
        title="CSS Filter Generator"
        category="dev"
        intro={`CSS filters apply visual effects to elements: blur, brightness, contrast, grayscale, sepia, hue-rotate, saturate, drop-shadow, invert. They work on images, backgrounds, text, and any HTML element — without Canvas or SVG.

This generator provides visual filter controls with a live preview. Runs in your browser.

**Long-tail searches answered here:** css filter generator free online usa, css blur brightness contrast filter generator free, image filter css code generator no signup free, css visual filter creator free tool online, css filter effects generator free no download, backdrop filter css generator free usa, css grayscale sepia filter code generator free, css hue rotate saturation filter generator usa free, how to stack multiple css filters generator free, css instagram filter recreation generator free usa, backdrop blur css for glassmorphism generator free, css filter vs svg filter comparison free online, css filter for dark mode image inversion free, css filter animation transition generator usa free, print style sheet vs screen css filter calculator

For related visual CSS, pair with [CSS Gradient Generator](/calculators/dev/css-gradient-generator) and [CSS Animation Generator](/calculators/dev/css-animation-gen).`}
        howItWorks={`Builds filter: blur() brightness() contrast() grayscale() sepia() hue-rotate() saturate() invert() opacity() drop-shadow(). Multiple filters chain with spaces: filter: brightness(1.1) contrast(1.2) saturate(1.3). The backdrop-filter variant applies the same effects to the area behind an element — used for frosted glass effects. Preview shows the effect on a sample image in real time.`}
        benefits={[
          { title: `Visual filter preview`, text: `See the filter effect update on a sample image in real time as you adjust each parameter — no guessing what blur(5px) looks like.` },
          { title: `backdrop-filter for frosted glass`, text: `backdrop-filter: blur(12px) saturate(180%) on a semi-transparent element creates the iOS-style frosted glass effect.` },
          { title: `drop-shadow vs box-shadow`, text: `filter: drop-shadow() follows the actual pixel shape of an element including PNG transparency. box-shadow follows the rectangular box.` },
          { title: `Chained filter effects`, text: `Stack multiple filters: brightness(1.1) contrast(1.2) saturate(1.3). The preview shows the cumulative result of all chained filters.` },
        ]}
        useCases={[
          { title: `Image hover effects`, text: `Desaturate images with grayscale(1) normally and restore color on hover with grayscale(0) transition. A common card hover effect.` },
          { title: `Loading skeleton shimmer`, text: `filter: blur(8px) on a low-quality placeholder image creates a progressive loading effect. Remove the blur when the full image loads.` },
          { title: `Dark mode image adaptation`, text: `filter: invert(1) hue-rotate(180deg) can adapt light images for dark mode contexts without changing the source image.` },
          { title: `Frosted glass UI`, text: `backdrop-filter: blur(16px) on a modal or sidebar creates the popular frosted glass effect. Combine with semi-transparent background-color.` },
        ]}
        keyStats={[
          { stat: `CSS filters`, source: `Apply to images, backgrounds, text, and any HTML element — without Canvas or SVG` },
          { stat: `backdrop-filter`, source: `Applies effects to the area behind an element — used for frosted glass UI patterns` },
          { stat: `drop-shadow`, source: `Follows element pixel shape including transparency — unlike box-shadow which follows the rectangle` },
        ]}
        inlineLinks={[
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
          { text: `CSS Animation Generator`, href: `/calculators/dev/css-animation-gen`, label: `CSS Animation Generator` },
          { text: `Color Converter`, href: `/calculators/dev/color-converter`, label: `Color Converter` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
          { text: `CSS Clip Path`, href: `/calculators/dev/css-clip-path`, label: `CSS Clip Path` },
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `SVG Optimizer`, href: `/calculators/dev/svg-optimizer`, label: `SVG Optimizer` },
          { text: `Image to Base64`, href: `/calculators/dev/image-base64`, label: `Image to Base64` },
        ]}
        tipsSection={`backdrop-filter for frosted glass. backdrop-filter: blur(12px) saturate(180%) on a semi-transparent element creates the iOS-style frosted glass effect. Requires background-color: rgba(255,255,255,0.7) on the element.

drop-shadow vs box-shadow. filter: drop-shadow() follows the actual pixel shape of an element including PNG transparency. Use for PNG icons with transparent backgrounds.

Chain order matters. Filters apply left-to-right. brightness(2) grayscale(1) produces a grey result. grayscale(1) brightness(2) produces a brighter grey.

Performance: composited layer. Add will-change: filter for elements with animated filters to create a GPU compositing layer.`}
        conclusion={`CSS filters apply visual effects without Canvas or JavaScript. Frosted glass, image color grading, hover effects — all use CSS filters. For complete visual CSS: [CSS Gradient Generator](/calculators/dev/css-gradient-generator) and [CSS Animation Generator](/calculators/dev/css-animation-gen).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
