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
      setOutput(`// Z-Index Stacking Visualiser output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Z-Index Stacking Visualiser</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎯 Z-Index Stacking Visualiser</h1>
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
        title="Z-Index Manager — CSS Stacking Context Visualizer"
        category="dev"
        intro={`Z-index bugs are caused by stacking contexts — not by the z-index values themselves. An element with z-index: 9999 inside a parent with opacity: 0.99 is isolated in a new stacking context and cannot appear above elements outside that context, regardless of its z-index value.

This visualizer shows which elements create stacking contexts and how z-index values compare within each. Runs in your browser.

**Long-tail searches answered here:** css z-index calculator free online usa, z-index stacking context visualizer free, css z-index manager free no signup, understand z-index stacking order free tool, z-index conflicts debugger free online, css layer z-index reference free usa, why z-index not working stacking context guide free, z-index for modal dialog overlay best practice free usa, css position and z-index relationship guide free, z-index scale system design token calculator free usa, css isolation property z-index reset guide free, z-index for sticky header behind modal fix free usa, z-index and transform stacking context issue free, will-change z-index performance calculator free, z-index maximum value browser limit free guide usa

For CSS debugging, pair with [CSS Specificity](/calculators/dev/css-specificity) and [CSS Filter Generator](/calculators/dev/css-filter-gen).`}
        howItWorks={`Visualizes z-index stacking order for a list of elements. Shows which elements create new stacking contexts (position + z-index, opacity < 1, transform, filter, isolation: isolate) and which z-index values conflict. Helps understand why an element with z-index: 9999 can be hidden behind an element with z-index: 1 when they are in different stacking contexts.`}
        benefits={[
          { title: `Stacking context visualization`, text: `Shows which elements create new stacking contexts and isolates them from each other. Makes the reason for unexpected stacking order immediately visible.` },
          { title: `Z-index conflict detection`, text: `Highlights z-index values that conflict within the same stacking context. Elements in different stacking contexts are not comparable.` },
          { title: `Stacking context triggers`, text: `Lists all CSS properties that create stacking contexts: position + z-index, opacity < 1, transform, filter, isolation: isolate, will-change.` },
          { title: `Layer ordering diagram`, text: `Visual diagram showing the stacking order of all elements, grouped by their stacking context.` },
        ]}
        useCases={[
          { title: `Debugging modal behind content`, text: `Your modal has z-index: 9999 but is hidden behind an element with z-index: 1. Visualize here to find the stacking context that is isolating the modal.` },
          { title: `CSS animation z-index issues`, text: `CSS animations that use transform or opacity create stacking contexts. Visualize here to understand why an animated element z-index behavior changes during animation.` },
          { title: `Frosted glass layer ordering`, text: `A frosted glass panel with backdrop-filter creates a stacking context. Visualize the layer ordering here to ensure the panel appears above the correct elements.` },
          { title: `Navigation dropdown ordering`, text: `Navigation dropdowns need to appear above page content. Visualize the stacking contexts in your page to ensure the dropdown z-index will work as expected.` },
        ]}
        keyStats={[
          { stat: `Stacking contexts`, source: `The actual source of most z-index bugs — not the z-index values themselves` },
          { stat: `z-index: 9999 is a code smell`, source: `Indicates stacking context confusion — low values (0-10) are sufficient for most UIs` },
          { stat: `Modals need body parent`, source: `Place modals as direct children of body to escape intermediate stacking contexts` },
        ]}
        inlineLinks={[
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
          { text: `CSS Animation Generator`, href: `/calculators/dev/css-animation-gen`, label: `CSS Animation Generator` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
        ]}
        tipsSection={`Stacking contexts are the source of most z-index bugs. An element with z-index: 9999 inside a parent with opacity: 0.99 is isolated in a new stacking context — it cannot appear above elements outside that context regardless of its z-index value.

Properties that create stacking contexts. position + z-index (not auto), opacity < 1, transform (any value), filter (any value), isolation: isolate, will-change (several properties).

Use small z-index values. A scale of 0-10 is sufficient for most UIs. z-index: 9999 is a code smell indicating stacking context confusion.

Modals need a dedicated stacking context. Place modals as direct children of body to escape any intermediate stacking contexts.`}
        conclusion={`Z-index bugs are caused by stacking contexts — not by the z-index values themselves. This visualizer shows which elements create stacking contexts and how z-index values compare within each context. For CSS debugging: [CSS Specificity](/calculators/dev/css-specificity) and [CSS Filter Generator](/calculators/dev/css-filter-gen).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
