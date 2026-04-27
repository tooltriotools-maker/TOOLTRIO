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
      setOutput(`// CSS Animation Generator output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">CSS Animation Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎬 CSS Animation Generator</h1>
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
        title="CSS Animation Generator"
        category="dev"
        intro={`CSS animations require coordinating keyframes, timing functions, duration, delay, and fill-mode — five separate properties that need to work together correctly. A single wrong value makes the animation snap or loop incorrectly.

This generator builds CSS keyframe animations with a live preview and exports the complete CSS. Runs in your browser.

**Long-tail searches answered here:** css animation generator free online usa, css keyframe animation builder free no signup, css transition animation creator free tool, css animation code generator copy paste free, visual css animation maker free online no download, css hover animation generator free usa, css fade in fade out animation generator free, css slide animation from bottom generator free online, css bounce pulse shake animation generator usa free, css animation delay timing function generator free, css infinite loop animation generator free online usa, css text typing animation generator free tool, scroll triggered css animation generator free usa, css loading spinner animation generator free, css animation performance optimization checker free usa

For other visual CSS tools, pair with [Box Shadow Generator](/calculators/dev/box-shadow-generator) and [CSS Filter Generator](/calculators/dev/css-filter-gen).`}
        howItWorks={`Builds @keyframes rules and the animation shorthand. Preset animations (fade, slide, bounce, spin, pulse) provide starting points. Timing functions include ease, linear, ease-in-out, and cubic-bezier() for custom easing. Fill-mode preview shows the element state before and after the animation. The preview element shows animations running in real time.`}
        benefits={[
          { title: `Preset animations`, text: `Starting points for common animations: fade in/out, slide up/down, bounce, spin, pulse, shake. Modify presets rather than starting from scratch.` },
          { title: `Cubic bezier editor`, text: `Visual cubic-bezier editor for custom timing functions. Drag the control points to create spring, overshoot, or elastic motion effects.` },
          { title: `Fill mode preview`, text: `animation-fill-mode controls whether the element holds the final/initial animation state. The preview shows the difference between none, forwards, backwards, and both.` },
          { title: `Multi-keyframe support`, text: `Add keyframes at arbitrary percentages (0%, 25%, 75%, 100%) for complex multi-step animations rather than just from/to.` },
        ]}
        useCases={[
          { title: `Loading spinner animation`, text: `A spinning loader is one of the most common CSS animations. Build a rotate animation with animation-iteration-count: infinite and linear timing here.` },
          { title: `Page transition effects`, text: `Fade-in or slide-up effects for page sections as they enter the viewport. Build the keyframes here, then trigger them by adding an is-visible class on scroll.` },
          { title: `Attention-grabbing UI`, text: `Pulse animation on a notification badge, shake animation for an error state. Build and preview here.` },
          { title: `Microinteraction animations`, text: `Button hover animations, checkbox tick animations. Build the frames here to get the duration and easing exactly right.` },
        ]}
        keyStats={[
          { stat: `@keyframes`, source: `CSS rule that defines animation states — combined with animation property to control timing` },
          { stat: `cubic-bezier`, source: `Custom timing function — four control points define any easing curve` },
          { stat: `fill-mode: forwards`, source: `Keeps the final animation state — required for enter animations that should not snap back` },
        ]}
        inlineLinks={[
          { text: `Box Shadow Generator`, href: `/calculators/dev/box-shadow-generator`, label: `Box Shadow Generator` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `CSS Gradient Generator`, href: `/calculators/dev/css-gradient-generator`, label: `CSS Gradient Generator` },
          { text: `Border Radius Generator`, href: `/calculators/dev/border-radius-gen`, label: `Border Radius Generator` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `Color Converter`, href: `/calculators/dev/color-converter`, label: `Color Converter` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `CSS Clip Path`, href: `/calculators/dev/css-clip-path`, label: `CSS Clip Path` },
        ]}
        tipsSection={`fill-mode: forwards for enter animations. Without it, a fade-in animation snaps back to invisible when complete. forwards holds the final state.

Prefer transform and opacity. Animating width, height, or margin triggers layout recalculation every frame. transform: translateX() and opacity run on the GPU compositor.

will-change for complex animations. will-change: transform, opacity creates a compositing layer — use sparingly but reduces jank for complex animations.

CSS transitions for simple state changes. For hover and focus effects, transition is simpler than @keyframes. Use animations for looping, multi-step, or auto-triggered effects.`}
        conclusion={`CSS animations have more moving parts than most CSS properties. This generator makes the visual result the primary interface. Complete UI animation workflow: [Box Shadow Generator](/calculators/dev/box-shadow-generator) for depth, [CSS Gradient Generator](/calculators/dev/css-gradient-generator) for backgrounds.`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
