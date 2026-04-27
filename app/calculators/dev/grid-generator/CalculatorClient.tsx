'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(2)
  const [colGap, setColGap] = useState(16)
  const [rowGap, setRowGap] = useState(16)
  const [colTemplate, setColTemplate] = useState('repeat(3, 1fr)')
  const [rowTemplate, setRowTemplate] = useState('repeat(2, 1fr)')
  const [copied, setCopied] = useState(false)

  useEffect(()=>{ setColTemplate(`repeat(${cols}, 1fr)`) },[cols])
  useEffect(()=>{ setRowTemplate(`repeat(${rows}, 1fr)`) },[rows])

  const css = `.grid-container {\n  display: grid;\n  grid-template-columns: ${colTemplate};\n  grid-template-rows: ${rowTemplate};\n  column-gap: ${colGap}px;\n  row-gap: ${rowGap}px;\n}`

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Grid Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⊞ CSS Grid Generator</h1>
      <p className="text-gray-500 mb-6">Design grid layouts visually - columns, rows, gaps and copy CSS</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            {[{l:'Columns',v:cols,s:setCols},{l:'Rows',v:rows,s:setRows}].map(({l,v,s})=>(
              <div key={l}>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">{l}: {v}</label>
                <input type="range" min={1} max={6} value={v} onChange={e=>s(Number(e.target.value))} className="w-full" />
              </div>
            ))}
            <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">column-template</label>
              <input value={colTemplate} onChange={e=>setColTemplate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 font-mono text-sm focus:outline-none" /></div>
            <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">row-template</label>
              <input value={rowTemplate} onChange={e=>setRowTemplate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 font-mono text-sm focus:outline-none" /></div>
            {[{l:'Column gap',v:colGap,s:setColGap},{l:'Row gap',v:rowGap,s:setRowGap}].map(({l,v,s})=>(
              <div key={l}><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">{l}: {v}px</label>
                <input type="range" min={0} max={48} value={v} onChange={e=>s(Number(e.target.value))} className="w-full" /></div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 h-64 p-4">
            <div className="w-full h-full" style={{display:'grid',gridTemplateColumns:colTemplate,gridTemplateRows:rowTemplate,columnGap:`${colGap}px`,rowGap:`${rowGap}px`}}>
              {Array.from({length:cols*rows},(_,i)=>(
                <div key={i} className="rounded-xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-black">{i+1}</div>
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
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the CSS Grid Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">CSS Grid is the most powerful layout system in CSS - use it for two-dimensional page layouts, card grids, dashboard panels, and photo galleries. Adjust columns and rows with the sliders, then fine-tune the template values manually (e.g. type "200px 1fr 300px" for a three-column layout with fixed sidebars). Column/row gaps control the whitespace between cells. The live preview updates instantly. Copy the CSS and apply it to your container. Each child element automatically fills a grid cell.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-1">Responsive card grid</p><code className="text-xs font-mono text-blue-800">grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-1">3-column layout</p><code className="text-xs font-mono text-green-800">grid-template-columns: 250px 1fr 250px;</code></div>
        </div>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="CSS Grid Generator — Visual 2D Layout Builder"
        category="dev"
        intro={`CSS Grid is the layout model for two-dimensional designs — rows AND columns simultaneously. grid-template-columns, grid-template-rows, grid-area, and fr units give unprecedented layout control, but the syntax is hard to visualize without a live preview.

This visual builder generates grid layouts with a live preview and complete CSS output. Runs in your browser.

**Long-tail searches answered here:** css grid generator free online usa, visual css grid layout builder free no signup, css grid code generator free tool online, responsive grid system generator free, how to create css grid free generator, css grid template generator free no download usa, css grid areas named layout generator free, css grid for masonry layout generator free usa, css grid fr unit calculator and generator free, css grid auto fit vs auto fill generator free online, responsive grid with minmax clamp free generator usa, css grid for holy grail layout generator free, asymmetric column grid layout generator free usa, css grid gap row column spacing generator free, css subgrid nested grid generator free online usa

For one-dimensional layouts, see [Flexbox Generator](/calculators/dev/flex-generator).`}
        howItWorks={`Builds grid-template-columns, grid-template-rows, gap, and optionally grid-template-areas definitions. The fr unit allocates fractional shares of remaining space — 1fr 2fr 1fr creates three columns where the middle is twice as wide as the others.

repeat() notation generates repeated track patterns: repeat(3, 1fr) creates three equal columns. minmax() sets size constraints: minmax(200px, 1fr) means each column is at least 200px but can grow.

The visual grid shows clickable cells. Drag to merge cells and generate grid-column and grid-row span values. The grid-template-areas syntax is generated automatically from the visual layout.`}
        benefits={[
          { title: `fr unit visualization`, text: `Toggle between 1fr 1fr 1fr (three equal columns) and 1fr 2fr 1fr (wider middle) and see the proportions live.` },
          { title: `Visual area naming`, text: `Click and drag cells to name grid areas and generate the grid-template-areas ASCII map syntax — the most powerful and readable way to define complex layouts.` },
          { title: `repeat() and minmax()`, text: `Toggle between explicit 200px 1fr 200px and repeat() notation. Configure minmax() constraints for responsive grids without media queries.` },
          { title: `Auto-placement vs explicit placement`, text: `See the difference between auto-placement (items fill in reading order) and explicit grid-area placement (items placed in named areas).` },
        ]}
        useCases={[
          { title: `Magazine-style page layouts`, text: `Multi-column, multi-row layouts with a header spanning all columns, a sidebar, main content, and footer. Build the named area layout here and export the CSS.` },
          { title: `Photo gallery grids`, text: `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) creates a responsive gallery that fills the available width with same-sized cards.` },
          { title: `Dashboard layouts`, text: `Analytics dashboards need different-sized widgets in a grid. Name areas and position items explicitly using the visual area builder.` },
          { title: `Responsive card grids`, text: `Define each grid state here and export the CSS for each breakpoint.` },
        ]}
        keyStats={[
          { stat: `fr unit`, source: `Fractional unit — allocates remaining space proportionally between tracks` },
          { stat: `grid-template-areas`, source: `Named area syntax — the most readable way to define complex 2D layouts` },
          { stat: `auto-fill vs auto-fit`, source: `repeat(auto-fill, minmax(200px,1fr)) creates responsive columns without media queries` },
        ]}
        inlineLinks={[
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `Pixel to REM`, href: `/calculators/dev/pixel-rem-converter`, label: `Pixel to REM` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
        ]}
        tipsSection={`fr vs auto. 1fr takes a fractional share of remaining space. auto takes as much as content needs. In auto 1fr auto, the middle column takes all remaining space.

auto-fill vs auto-fit. repeat(auto-fill, minmax(200px,1fr)) fills the row with as many columns as fit. auto-fit collapses empty tracks.

grid-template-areas for readable layout. Named areas make CSS self-documenting: header header then sidebar main then footer footer immediately communicates the intended layout.

Subgrid for alignment across components. CSS Subgrid lets children align to parent grid tracks — use for card grids where footers need to align across cards.`}
        conclusion={`CSS Grid enables layouts previously requiring complex positioning hacks. The visual builder makes the two-dimensional nature concrete. For component layouts: [Flexbox Generator](/calculators/dev/flex-generator). For responsive sizing: [Responsive Breakpoints](/calculators/dev/responsive-breakpoints).`}
      />
    </div>
  )
}
