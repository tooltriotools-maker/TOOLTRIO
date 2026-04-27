'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [type, setType] = useState<'linear'|'radial'|'conic'>('linear')
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState([{color:'#6366f1',pos:0},{color:'#a855f7',pos:50},{color:'#ec4899',pos:100}])
  const [copied, setCopied] = useState(false)

  const css = useMemo(() => {
    const s = stops.map(s=>`${s.color} ${s.pos}%`).join(', ')
    switch(type) {
      case 'linear': return `linear-gradient(${angle}deg, ${s})`
      case 'radial': return `radial-gradient(circle, ${s})`
      case 'conic': return `conic-gradient(from ${angle}deg, ${s})`
    }
  }, [type, angle, stops])

  const updateStop = (i:number, k:'color'|'pos', v:string|number) => setStops(s=>s.map((stop,j)=>j===i?{...stop,[k]:v}:stop))
  const addStop = () => setStops(s=>[...s,{color:'#22c55e',pos:75}])
  const removeStop = (i:number) => setStops(s=>s.filter((_,j)=>j!==i))

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Gradient</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎨 CSS Gradient Generator</h1>
      <p className="text-gray-500 mb-6">Build linear, radial &amp; conic gradients visually - copy CSS instantly</p>
      <div className="rounded-2xl mb-6 h-40 w-full" style={{background:css}} />
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
        <div className="flex gap-2 mb-5">
          {(['linear','radial','conic'] as const).map(t=>(
            <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${type===t?'bg-green-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
          ))}
        </div>
        {(type==='linear'||type==='conic') && (
          <div className="mb-5"><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Angle: {angle} degrees</label>
            <input type="range" min={0} max={360} value={angle} onChange={e=>setAngle(Number(e.target.value))} className="w-full" /></div>
        )}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between"><label className="text-xs font-bold text-gray-500 uppercase">Color Stops</label>
            <button onClick={addStop} className="flex items-center gap-1 text-xs font-bold text-green-600 hover:text-green-700"><Plus className="w-3.5 h-3.5"/>Add Stop</button></div>
          {stops.map((stop,i)=>(
            <div key={i} className="flex items-center gap-3">
              <input type="color" value={stop.color} onChange={e=>updateStop(i,'color',e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-gray-200 p-0.5" />
              <input value={stop.color} onChange={e=>updateStop(i,'color',e.target.value)} className="w-28 border border-gray-200 rounded-lg px-2 py-1.5 font-mono text-sm focus:outline-none" />
              <input type="range" min={0} max={100} value={stop.pos} onChange={e=>updateStop(i,'pos',Number(e.target.value))} className="flex-1" />
              <span className="text-xs font-mono w-10">{stop.pos}%</span>
              {stops.length>2&&<button onClick={()=>removeStop(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>}
            </div>
          ))}
        </div>
        <div className="p-3 bg-gray-950 rounded-xl flex items-center justify-between">
          <code className="text-green-300 font-mono text-sm flex-1 mr-3 break-all">background: {css};</code>
          <button onClick={()=>{navigator.clipboard.writeText(`background: ${css};`);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex-shrink-0 text-green-400 hover:text-green-300">{copied?<Check className="w-5 h-5"/>:<Copy className="w-5 h-5"/>}</button>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the CSS Gradient Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Create beautiful CSS gradients without memorising syntax. Pick gradient type (linear flows in a direction, radial radiates from a point, conic sweeps around a center), adjust the angle, add colour stops, and see the live preview instantly. Copy the ready-to-use CSS line with one click and paste it into your stylesheet.</p>
        <ol className="space-y-2 mb-4">
          {['Choose gradient type: Linear for directional fades, Radial for circular glows, Conic for pie-chart style sweeps.',
            'Set the angle (0 degrees = top, 90 degrees = right, 135 degrees = diagonal top-left to bottom-right).',
            'Click each colour swatch to change the colour, or type a hex code. Drag the slider to set the position.',
            'Add more colour stops with the + Add Stop button for multi-colour gradients.',
            'Click Copy to copy the background CSS line and paste it directly into your stylesheet.'
          ].map((s,i)=><li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-green-600 font-bold">{i+1}.</span>{s}</li>)}
        </ol>
        <div className="p-3 bg-gray-950 rounded-xl"><code className="text-green-300 font-mono text-xs">background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);</code></div>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="CSS Gradient Generator"
        category="dev"
        intro={`CSS gradients appear in hero backgrounds, buttons, cards, and decorative elements — but the syntax for direction, color stops, and color spaces is verbose and hard to visualize without a live preview.

This generator provides a visual gradient builder with real-time CSS output. Runs in your browser.

**Long-tail searches answered here:** css gradient generator free online usa, linear radial gradient code generator free, css background gradient creator no signup free, gradient color picker and code generator free, css gradient with copy code free online tool, conic gradient css generator free no download, css gradient direction calculator free online usa, mesh gradient css generator free tool, 3 color gradient transition css generator usa free, repeating gradient pattern css generator free, transparent gradient css fade to clear generator, css gradient text color generator free usa, dark to light gradient css calculator free online, css gradient border generator free online usa, animated gradient background css generator free

Pair with [Box Shadow Generator](/calculators/dev/box-shadow-generator) and [Color Converter](/calculators/dev/color-converter).`}
        howItWorks={`Builds linear-gradient(), radial-gradient(), and conic-gradient() CSS values. Linear gradients accept a direction (to right, 45deg) and color stops. Radial gradients add shape (circle vs ellipse) and position. Color stops support hex, rgb(), hsl(), oklch(), and named colors with optional explicit positions. Output includes vendor prefixes when legacy support is enabled.`}
        benefits={[
          { title: `Live preview as you edit`, text: `Gradient updates instantly as you adjust colors, direction, or stop positions — no button clicks.` },
          { title: `Linear, radial, and conic`, text: `All three CSS gradient types in one tool. Conic gradients for pie-chart backgrounds are especially difficult to hand-write.` },
          { title: `Multi-stop support`, text: `Add unlimited color stops with independent position control for precise multi-color transitions.` },
          { title: `Copy-ready CSS`, text: `Output is the complete background: linear-gradient(...) property — paste directly into your stylesheet.` },
        ]}
        useCases={[
          { title: `Hero section backgrounds`, text: `Most modern landing pages use linear gradients for hero backgrounds. Build and preview at full width here, then copy the CSS.` },
          { title: `Button hover states`, text: `Adjust color stops until the gradient looks right on your button design, then paste into your component CSS.` },
          { title: `Gradient borders`, text: `Gradient borders use background-clip: padding-box with a gradient background. Build the gradient here.` },
          { title: `CSS-only pie charts`, text: `Conic gradients produce pie chart backgrounds without SVG. Build percentage-based conic gradients here.` },
        ]}
        keyStats={[
          { stat: `3 gradient types`, source: `linear-gradient, radial-gradient, and conic-gradient` },
          { stat: `oklch support`, source: `Perceptually uniform color space — eliminates muddy grey in the middle of gradients` },
          { stat: `All CSS colors`, source: `Hex, rgb(), hsl(), oklch(), and named colors` },
        ]}
        inlineLinks={[
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `CSS Animation Generator`, href: `/calculators/dev/css-animation-gen`, label: `CSS Animation Generator` },
          { text: `Color Converter`, href: `/calculators/dev/color-converter`, label: `Color Converter` },
          { text: `Color Palette`, href: `/calculators/dev/color-palette`, label: `Color Palette` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `Border Radius Generator`, href: `/calculators/dev/border-radius-gen`, label: `Border Radius Generator` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
        ]}
        tipsSection={`Hard stops for sharp transitions. Two stops at the same position create a sharp line: linear-gradient(red 50%, blue 50%) with no smooth transition. Useful for split backgrounds and striped patterns.

Direction in degrees. 0deg points upward, 90deg rightward, 180deg downward.

oklch for clean gradients. RGB color space produces a muddy grey mid-zone in some gradients. The oklch color space produces perceptually uniform gradients without the muddiness.

Check contrast on text. If placing text over a gradient background, verify contrast at both ends with [Color Contrast](/calculators/dev/color-contrast).`}
        conclusion={`CSS gradients are versatile but verbose to hand-code. This generator handles the syntax while you focus on the visual result. For complete component visual styling: add shadows with [Box Shadow Generator](/calculators/dev/box-shadow-generator) and check accessibility with [Color Contrast](/calculators/dev/color-contrast).`}
      />
    </div>
  )
}
