'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [selectors, setSelectors] = useState(['#nav .menu-item a:hover','button.btn.primary','[data-active="true"]','h1 + p','div > .container'])
  const [newSel, setNewSel] = useState('')

  const parseSpec = (sel: string) => {
    let s = sel.trim()
    let a=0, b=0, c=0
    // Remove pseudo-elements (::before etc) - count as 0,0,1
    const pElements = (s.match(/::[a-z-]+/gi)||[]).length; c += pElements; s=s.replace(/::[a-z-]+/gi,'')
    // Count IDs
    const ids = (s.match(/#[a-z_-][a-z0-9_-]*/gi)||[]).length; b += ids; s=s.replace(/#[a-z_-][a-z0-9_-]*/gi,'')
    // Count attributes, pseudo-classes
    const attrs = (s.match(/\[[^\]]*\]/g)||[]).length; c += attrs; s=s.replace(/\[[^\]]*\]/g,'')
    const pseudoCls = (s.match(/:[a-z-]+(\([^)]*\))?/gi)||[]).length; c += pseudoCls; s=s.replace(/:[a-z-]+(\([^)]*\))?/gi,'')
    // Count classes
    const classes = (s.match(/\.[a-z_-][a-z0-9_-]*/gi)||[]).length; c += classes; s=s.replace(/\.[a-z_-][a-z0-9_-]*/gi,'')
    // Count elements
    const elements = (s.match(/[a-z][a-z0-9]*/gi)||[]).filter(e=>!['and','not','is','where','has'].includes(e)).length; c += elements
    const score = a*10000 + b*100 + c
    return { a, b, c, score }
  }

  const results = useMemo(() => selectors.map(sel => ({sel, ...parseSpec(sel)})).sort((x,y)=>y.score-x.score), [selectors])

  const add = () => { if (newSel.trim()) { setSelectors(s=>[...s, newSel.trim()]); setNewSel('') } }
  const remove = (i: number) => setSelectors(s=>s.filter((_,j)=>j!==i))

  const COLORS = ['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500','bg-blue-500']

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Specificity</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎯 CSS Specificity Calculator</h1>
      <p className="text-gray-500 mb-8">Calculate and compare CSS selector specificity scores - (A, B, C) breakdown</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <input value={newSel} onChange={e=>setNewSel(e.target.value)} onKeyDown={e=>e.key==='Enter'&&add()} placeholder="Add a CSS selector... e.g. .nav #link:hover"
            className="flex-1 border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-2.5 font-mono text-sm focus:outline-none" />
          <button onClick={add} className="px-4 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 text-sm">Add</button>
        </div>
  
      <SEOContent
        title="CSS Specificity Calculator"
        category="dev"
        intro={`CSS specificity determines which rule wins when multiple selectors target the same element. The specificity scoring system — IDs (0,1,0,0), classes/attributes/pseudo-classes (0,0,1,0), elements/pseudo-elements (0,0,0,1) — is not obvious, and unexpected specificity issues cause hours of debugging.

This calculator scores any CSS selector and ranks multiple selectors against each other. Runs in your browser.

**Long-tail searches answered here:** css specificity calculator free online usa, css selector specificity checker free no signup, how to calculate css specificity free tool, css selector weight calculator free online, css specificity score calculator free no download, which css rule wins specificity calculator free, css id vs class vs element specificity weight free, css specificity a b c d score calculator usa free, inline style vs id specificity comparison free, how not selector affects specificity calculator usa free, css cascade and specificity order explained free, css specificity for pseudo elements calculator free, specificity of css important override calculator usa, compound selector specificity calculator free online, css specificity debugging tool free online usa

For other CSS debugging tools, pair with [CSS Unit Converter](/calculators/dev/css-unit-converter).`}
        howItWorks={`Specificity is a 4-part score: (inline styles, IDs, classes/attributes/pseudo-classes, elements). The calculator parses each selector component and assigns the correct score: #id to (0,1,0,0), .class, [attr], :hover to (0,0,1,0), div, p, ::before to (0,0,0,1). The :not(), :is(), and :has() pseudo-classes carry the specificity of their argument. :where() has zero specificity.`}
        benefits={[
          { title: `Visual 4-part score breakdown`, text: `Shows the (0,0,0,0) score broken down by component — helps understand why .parent .child (0,0,2,0) beats .single-class (0,0,1,0).` },
          { title: `Multiple selector ranking`, text: `Enter multiple selectors and see them ranked by specificity. Essential for debugging why is my style not applying.` },
          { title: `:is() and :not() specificity`, text: `Modern pseudo-classes like :is(), :not(), :has(), and :where() have non-obvious specificity rules. :where() has zero specificity; :is() and :has() take the highest specificity of their argument.` },
          { title: `Specificity war prevention`, text: `Calculating before writing helps avoid specificity escalation — adding more IDs to override another rule which adds more IDs in response.` },
        ]}
        useCases={[
          { title: `Debugging style overrides`, text: `Your hover style is not applying. Enter your hover selector and the selector you are trying to override here. The higher specificity score wins.` },
          { title: `CSS architecture reviews`, text: `Paste component selectors from your stylesheet to verify no unintended high-specificity rules are present. High specificity in component CSS creates hard-to-override styles.` },
          { title: `Learning CSS specificity`, text: `Manually score a few selectors here to internalize the rule. After calculating .nav .link:hover (0,0,2,1) vs #main a:hover (0,1,1,1), the ID weight becomes concrete.` },
          { title: `Migrating from BEM to utility-first`, text: `Verify that utility classes will not be overridden by legacy BEM selectors with unexpectedly high specificity.` },
        ]}
        keyStats={[
          { stat: `(0,1,0,0)`, source: `ID selector specificity — beats any number of class selectors` },
          { stat: `:where() = 0`, source: `:where() has zero specificity — the safest way to apply default styles` },
          { stat: `Source order`, source: `Last rule wins when specificity is equal — source order only matters for ties` },
        ]}
        inlineLinks={[
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `CSS Clip Path`, href: `/calculators/dev/css-clip-path`, label: `CSS Clip Path` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
          { text: `Color Contrast`, href: `/calculators/dev/color-contrast`, label: `Color Contrast` },
        ]}
        tipsSection={`Avoid ID selectors in CSS. One ID beats 255 class selectors. Stick to class selectors (0,0,1,0) in component CSS to keep styles overridable.

Use :where() for zero-specificity defaults. :where(h1,h2,h3) { margin-top: 1em } — any class selector can override with no specificity escalation.

!important only escalates conflicts. The next override also needs !important. Use :where() or lower-specificity selectors instead.

Inline styles beat everything. style=color:red has specificity (1,0,0,0) — higher than any stylesheet selector. Avoid inline styles in component markup.`}
        conclusion={`CSS specificity bugs are among the hardest to debug. This calculator makes the winning rule explicit before you write a new selector. For CSS debugging: [CSS Unit Converter](/calculators/dev/css-unit-converter) and [Responsive Breakpoints](/calculators/dev/responsive-breakpoints).`}
      />
      <div className="space-y-3">
          {results.map((r, i) => (
            <div key={r.sel} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className={`text-xs font-black text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${COLORS[Math.min(i,4)]}`}>{i+1}</span>
              <code className="flex-1 font-mono text-sm text-gray-800 truncate">{r.sel}</code>
              <div className="flex gap-2 items-center flex-shrink-0">
                <span className="text-xs font-mono bg-gray-900 text-white px-2 py-1 rounded-lg">({r.a},{r.b},{r.c})</span>
                <span className="text-xs text-gray-500">={r.score}</span>
                <button onClick={()=>remove(selectors.indexOf(r.sel))} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-3 text-sm">Specificity Reference</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[['Inline styles','(1,0,0)','style="..."'],['ID selector','(0,1,0)','#main'],['Class selector','(0,0,1)','.active'],['Attribute selector','(0,0,1)','[type="text"]'],['Pseudo-class','(0,0,1)',':hover :focus'],['Element','(0,0,1)','div h1 p'],['Pseudo-element','(0,0,1)','::before'],['Universal','(0,0,0)','*']].map(([n,s,e])=>(
            <div key={n} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
              <code className="font-mono text-blue-600 w-16 text-[10px]">{s}</code>
              <div><p className="font-semibold text-gray-800">{n}</p><p className="text-gray-400">{e}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
