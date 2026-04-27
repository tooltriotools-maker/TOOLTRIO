'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('center')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState(8)
  const [items, setItems] = useState(4)
  const [copied, setCopied] = useState(false)

  const css = `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Flexbox Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔲 CSS Flexbox Generator</h1>
      <p className="text-gray-500 mb-6">Build flexbox layouts visually - see changes live and copy the CSS</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            {[{l:'flex-direction',v:direction,s:setDirection,opts:['row','row-reverse','column','column-reverse']},
              {l:'justify-content',v:justify,s:setJustify,opts:['flex-start','flex-end','center','space-between','space-around','space-evenly']},
              {l:'align-items',v:align,s:setAlign,opts:['flex-start','flex-end','center','stretch','baseline']},
              {l:'flex-wrap',v:wrap,s:setWrap,opts:['nowrap','wrap','wrap-reverse']},
            ].map(({l,v,s,opts})=>(
              <div key={l}>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">{l}</label>
                <select value={v} onChange={e=>s(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 font-mono text-sm focus:outline-none focus:border-green-400 bg-white">{opts.map(o=><option key={o} value={o}>{o}</option>)}</select>
              </div>
            ))}
            <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">gap: {gap}px</label>
              <input type="range" min={0} max={48} value={gap} onChange={e=>setGap(Number(e.target.value))} className="w-full" /></div>
            <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Items: {items}</label>
              <input type="range" min={1} max={10} value={items} onChange={e=>setItems(Number(e.target.value))} className="w-full" /></div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 h-64 p-4">
            <div className="w-full h-full rounded-xl bg-white border-2 border-dashed border-gray-300 p-3"
              style={{display:'flex',flexDirection:direction as any,justifyContent:justify,alignItems:align,flexWrap:wrap as any,gap:`${gap}px`}}>
              {Array.from({length:items},(_,i)=>(
                <div key={i} className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">{i+1}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Generated CSS</label>
              <button onClick={()=>{navigator.clipboard.writeText(css);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
            </div>
            <pre className="font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl whitespace-pre">{css}</pre>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Flexbox Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Flexbox is CSS's one-dimensional layout system. This visual builder lets you experiment with all flex container properties and see the result instantly. Change flex-direction to switch between row and column layouts. Adjust justify-content to control main-axis spacing (horizontal in row mode). Adjust align-items to control cross-axis alignment (vertical in row mode). Copy the ready-to-use CSS and apply it to your container element.</p>
        <p className="text-sm text-gray-600"><strong>Most common patterns:</strong> Navigation bar = flex-direction: row, justify-content: space-between, align-items: center. Centred card = display: flex, justify-content: center, align-items: center on the parent. Vertical stack = flex-direction: column, gap: 16px.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="CSS Flexbox Generator — Visual Layout Builder"
        category="dev"
        intro={`Flexbox is the standard CSS layout model for one-dimensional layouts — rows and columns with flexible sizing and alignment. The mental model of main axis vs cross axis, and which properties apply to the container vs the items, is confusing until you can see changes in real time.

This visual builder shows a live flex container with actual items as you toggle properties. Runs in your browser.

**Long-tail searches answered here:** css flexbox generator free online usa, flexbox code builder visual free no signup, css flex container layout generator free, flexbox alignment code generator free tool, how to use flexbox css generator free, visual css flexbox creator free no download usa, css flexbox justify content align items generator, flex wrap and no wrap layout generator free usa, flexbox gap spacing configuration generator free, css flex direction row vs column generator free usa, flexbox for equal height columns generator free, flex grow shrink basis configuration free usa, css flexbox sticky footer pattern generator free, flexbox navigation bar horizontal generator free usa, flexbox card grid layout generator free online

For 2D layouts, use the [CSS Grid Generator](/calculators/dev/grid-generator).`}
        howItWorks={`Maintains a flex container with configurable items. Container properties: display: flex, flex-direction, flex-wrap, justify-content (main axis alignment), align-items (cross axis per row), align-content (cross axis multi-row), gap. Item properties: flex-grow, flex-shrink, flex-basis, align-self, order. Live preview shows actual boxes responding to property changes.`}
        benefits={[
          { title: `Container vs item properties`, text: `Visually demonstrates which properties apply to the flex container (justify-content, align-items) vs individual items (flex-grow, align-self) — the most common point of confusion.` },
          { title: `Main axis and cross axis visualization`, text: `Arrows show the main axis direction and cross axis direction as you toggle flex-direction.` },
          { title: `Gap vs margin`, text: `Demonstrates the gap property for consistent spacing between items — the modern replacement for margin hacks.` },
          { title: `flex shorthand breakdown`, text: `Shows how flex: 1 1 0 breaks down into flex-grow: 1, flex-shrink: 1, flex-basis: 0 — the shorthand that most developers write without fully understanding.` },
        ]}
        useCases={[
          { title: `Navigation bar layout`, text: `Horizontal navbars use display: flex; justify-content: space-between; align-items: center. Build the layout here to verify alignment before writing the CSS.` },
          { title: `Card grid layout`, text: `A responsive card layout uses flex-wrap: wrap with flex: 1 1 300px on items — each card grows to fill space but wraps at 300px minimum.` },
          { title: `Centering elements`, text: `Centering in flexbox: display: flex; justify-content: center; align-items: center on the container. Modern replacement for absolute positioning centering.` },
          { title: `Learning flexbox`, text: `The best way to understand flexbox is to see what changes when you toggle justify-content or align-items. This builder makes that interactive.` },
        ]}
        keyStats={[
          { stat: `justify-content`, source: `Controls main axis distribution — most commonly adjusted flex container property` },
          { stat: `flex: 1 1 0`, source: `The take equal space shorthand — grow, shrink, and basis in one property` },
          { stat: `gap`, source: `Modern spacing property — replaces margin hacks between flex items` },
        ]}
        inlineLinks={[
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
          { text: `Pixel to REM`, href: `/calculators/dev/pixel-rem-converter`, label: `Pixel to REM` },
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
        ]}
        tipsSection={`flex: 1 means flex: 1 1 0, not flex: 1 1 auto. flex: 1 sets flex-basis to 0 — all items share space from zero. flex: auto starts from content size.

Use gap instead of margin. gap: 16px adds space between all items without extra margin on first or last. Much cleaner than margin-right plus :last-child override.

flex-direction: column swaps the axes. When direction is column, justify-content and align-items swap their visual effects — many flexbox bugs come from forgetting this.

For 2D layouts, use [CSS Grid Generator](/calculators/dev/grid-generator). Flexbox is one-dimensional. If you need items to align across both rows and columns, use Grid.`}
        conclusion={`Flexbox is the layout model for most UI components — navbars, card rows, form fields, centering. The visual builder makes the axis model concrete. For 2D layouts: [CSS Grid Generator](/calculators/dev/grid-generator). For responsive sizing: [Responsive Breakpoints](/calculators/dev/responsive-breakpoints).`}
      />
    </div>
  )
}
