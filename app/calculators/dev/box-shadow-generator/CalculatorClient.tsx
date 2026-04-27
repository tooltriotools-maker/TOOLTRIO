'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(4)
  const [blur, setBlur] = useState(16)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#00000040')
  const [inset, setInset] = useState(false)
  const [copied, setCopied] = useState(false)

  const css = `${inset?'inset ':' '}${x}px ${y}px ${blur}px ${spread}px ${color}`.trim()
  const fullCss = `box-shadow: ${css};`

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Box Shadow</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🌑 CSS Box Shadow Generator</h1>
      <p className="text-gray-500 mb-6">Build shadows visually - control every property and copy CSS instantly</p>
      <div className="flex items-center justify-center py-16 bg-gray-50 rounded-2xl border border-gray-200 mb-6">
        <div className="w-48 h-32 bg-white rounded-2xl" style={{boxShadow:css}} />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
        {[{l:'Horizontal (X)',v:x,s:setX,min:-50,max:50},{l:'Vertical (Y)',v:y,s:setY,min:-50,max:50},{l:'Blur',v:blur,s:setBlur,min:0,max:100},{l:'Spread',v:spread,s:setSpread,min:-50,max:50}].map(({l,v,s,min,max})=>(
          <div key={l} className="mb-4">
            <div className="flex justify-between text-xs mb-1"><span className="font-bold text-gray-600">{l}</span><span className="font-mono text-gray-500">{v}px</span></div>
            <input type="range" min={min} max={max} value={v} onChange={e=>s(Number(e.target.value))} className="w-full" />
          </div>
        ))}
        <div className="flex gap-4 mb-4">
          <div><label className="text-xs font-bold text-gray-600 block mb-1.5">Color</label>
            <input type="color" value={color.slice(0,7)} onChange={e=>setColor(e.target.value+'40')} className="w-12 h-10 rounded-xl cursor-pointer border border-gray-200 p-0.5" /></div>
          <div className="flex items-end"><label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
            <input type="checkbox" checked={inset} onChange={e=>setInset(e.target.checked)} className="rounded" />Inset shadow
          </label></div>
        </div>
        <div className="p-3 bg-gray-950 rounded-xl flex items-center justify-between">
          <code className="text-green-300 font-mono text-sm flex-1 mr-3">{fullCss}</code>
          <button onClick={()=>{navigator.clipboard.writeText(fullCss);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="text-green-400 hover:text-green-300">{copied?<Check className="w-5 h-5"/>:<Copy className="w-5 h-5"/>}</button>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Box Shadow Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Create realistic CSS box shadows without guessing values. Drag the sliders to see the shadow update live on the preview box. <strong>X/Y offsets</strong> control shadow direction, <strong>Blur</strong> controls softness, <strong>Spread</strong> expands/shrinks the shadow size, and <strong>Inset</strong> moves the shadow inside the element (useful for pressed/clicked states).</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-1">Soft card shadow</p><code className="text-xs font-mono text-blue-800">box-shadow: 0 4px 16px 0 rgba(0,0,0,0.25);</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-1">Inset inner glow</p><code className="text-xs font-mono text-green-800">box-shadow: inset 0 2px 8px 0 rgba(0,0,0,0.15);</code></div>
        </div>
        <p className="text-sm text-gray-600">Tip: Use near-zero X and Y with high Blur (20-30px) and light colour for modern card shadows. Use negative spread to create a shadow that is smaller than the element for a floating effect.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="CSS Box Shadow Generator"
        category="dev"
        intro={`Box shadows add depth and hierarchy to UI elements. The 5-parameter syntax (h-offset v-offset blur spread color) is difficult to visualize mentally, and stacking multiple shadows for realistic elevation requires careful layering.

This generator provides a visual builder with live preview for single and stacked shadows. Runs in your browser.

**Long-tail searches answered here:** css box shadow generator free online usa, css drop shadow code generator no signup free, visual box shadow creator free tool online, css box shadow with copy code free, card shadow css generator free online tool, how to add box shadow css generator free, css inner shadow vs outer shadow generator free, soft ui neumorphism box shadow generator usa free, material design box shadow values generator free, layered multiple box shadows css generator free, box shadow opacity calculator css free online usa, colored box shadow hex generator free tool, box shadow blur vs spread radius calculator free, box shadow for dark mode and light mode generator, responsive box shadow scale calculator css free usa

Pair with [CSS Gradient Generator](/calculators/dev/css-gradient-generator) and [Border Radius Generator](/calculators/dev/border-radius-gen).`}
        howItWorks={`Maintains a list of shadow layers. Each layer independently controls h-offset, v-offset, blur radius, spread radius, color (with opacity), and inset toggle. Multiple shadows stack with commas: box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06). The preview element updates in real time. Negative spread with large blur creates soft shadows that do not extend beyond element bounds.`}
        benefits={[
          { title: `Multiple shadow layers`, text: `Stack shadows for realistic depth effects. Most design system elevations use 2-3 layered shadows at different opacities rather than a single large shadow.` },
          { title: `Inset shadow support`, text: `Toggle inset for inner shadows — pressed button states, depth on input fields, and inset text effects.` },
          { title: `Opacity-aware color`, text: `Shadow color uses rgba() to control opacity independently from the hue. Semi-transparent shadows look far more realistic than solid-color shadows.` },
          { title: `Copy-ready CSS`, text: `Output is the complete box-shadow property declaration — paste directly into your stylesheet.` },
        ]}
        useCases={[
          { title: `Design system elevation levels`, text: `Build your sm, md, lg, xl elevation shadows here and document them as CSS custom properties for your design system.` },
          { title: `Card component styling`, text: `Typical card shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24) — adjust until the depth looks right.` },
          { title: `Focus ring for inputs`, text: `Input focus rings: 0 0 0 3px rgba(59,130,246,0.5) — zero offsets, zero blur, 3px spread. Build the focus ring color to match your brand.` },
          { title: `Button press states`, text: `Inset shadow on active buttons: inset 0 2px 4px rgba(0,0,0,0.2) creates a pressed appearance.` },
        ]}
        keyStats={[
          { stat: `5 parameters`, source: `h-offset, v-offset, blur, spread, color — each independently adjustable` },
          { stat: `inset keyword`, source: `Inner shadows for pressed states and depth effects` },
          { stat: `Comma-stacked`, source: `Multiple shadows separated by commas for realistic multi-layer depth` },
        ]}
        inlineLinks={[
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
          { text: `Border Radius Generator`, href: `/calculators/dev/border-radius-gen`, label: `Border Radius Generator` },
          { text: `CSS Animation Generator`, href: `/calculators/dev/css-animation-gen`, label: `CSS Animation Generator` },
          { text: `Color Converter`, href: `/calculators/dev/color-converter`, label: `Color Converter` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
        ]}
        tipsSection={`Two shadows for realistic depth. One small dark shadow (nearby) + one large light shadow (ambient): 0 1px 3px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.08).

Negative spread to contain blur. 0 4px 16px -4px rgba(0,0,0,0.2) — large blur but negative spread keeps the shadow tight to the element.

Focus rings use zero blur. 0 0 0 3px rgba(59,130,246,0.5) — zero h/v offset, zero blur, 3px spread. Creates an even outline that follows the element border-radius.

Opacity matters more than blur. Decreasing shadow opacity looks more realistic. Real shadows have 10-20% opacity for soft, 30-40% for stronger depth.`}
        conclusion={`The difference between flat and elevated design is often two well-chosen shadow layers. This generator makes the 5-parameter syntax visual. For complete component styling: add gradients with [CSS Gradient Generator](/calculators/dev/css-gradient-generator) and round corners with [Border Radius Generator](/calculators/dev/border-radius-gen).`}
      />
    </div>
  )
}
