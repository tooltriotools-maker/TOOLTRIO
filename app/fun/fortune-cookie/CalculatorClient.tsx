'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useRef } from 'react'
import { FORTUNES, generateFortuneDescription } from '@/lib/fun/fortuneData'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [fortune, setFortune] = useState('')
  const [description, setDescription] = useState('')
  const [cracked, setCracked] = useState(false)
  const usedRef = useRef(new Set<number>())

  function crack() {
    let idx: number
    if (usedRef.current.size >= FORTUNES.length) usedRef.current.clear()
    do { idx = Math.floor(Math.random() * FORTUNES.length) } while (usedRef.current.has(idx))
    usedRef.current.add(idx)
    setFortune(FORTUNES[idx])
    setDescription(generateFortuneDescription(FORTUNES[idx]))
    setCracked(true)
  }

  function share() {
    const text = `🥠 My fortune: "${fortune}"\n\nGet yours: tooltrio.com/fun/fortune-cookie`
    if (navigator.share) navigator.share({ title: 'Fortune Cookie', text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'))
  }

  return (
    <DevToolLayout title="Fortune Cookie" icon="🥠"
      description="Crack open a digital fortune cookie and receive your wisdom for today"
      category="Fun" parentPath="/fun" parentLabel="Fun & Entertainment">

      <div className="text-center mb-6">
        <button onClick={crack}
          className="w-full py-5 text-white font-black text-xl rounded-2xl mb-4 transition-all hover:-translate-y-1"
          style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',boxShadow:'0 8px 24px rgba(245,158,11,0.35)'}}>
          🥠 {cracked ? 'Crack Another Cookie' : 'Crack Your Fortune Cookie'}
        </button>
        <p className="text-xs text-gray-400">{FORTUNES.length}+ unique fortunes · New wisdom every time</p>
      </div>

      {fortune && (
        <div>
          {/* Fortune display */}
          <div className="rounded-3xl border-2 p-8 text-center mb-6" style={{background:'linear-gradient(135deg,rgba(254,243,199,0.8),rgba(253,230,138,0.4))',borderColor:'rgba(251,191,36,0.5)'}}>
            <div className="text-5xl mb-4">🥠</div>
            <p className="text-xl font-black text-amber-900 leading-relaxed italic mb-4">&quot;{fortune}&quot;</p>
            <div className="flex gap-2 justify-center">
              <button onClick={share}
                className="px-4 py-2 text-sm font-bold rounded-xl bg-amber-600 text-white hover:bg-amber-700">
                📤 Share Fortune
              </button>
              <button onClick={() => navigator.clipboard.writeText(fortune).then(() => alert('Copied!'))}
                className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-amber-400 text-amber-700 hover:bg-amber-50">
                📋 Copy
              </button>
            </div>
          </div>

          {/* 3k word description */}
          <div className="rounded-2xl border p-5 bg-white mb-4">
            <h2 className="text-lg font-black text-gray-900 mb-4">🔍 Deep Dive: What This Fortune Really Means</h2>
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-3">
              {description.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-gray-900 mt-6 mb-2">{para.replace('## ','')}</h2>
                if (para.startsWith('### ')) return <h3 key={i} className="text-base font-black text-gray-800 mt-5 mb-2">{para.replace('### ','')}</h3>
                if (para.startsWith('---')) return <hr key={i} className="border-gray-100 my-4" />
                if (para.startsWith('**Practice')) return <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-4 my-3"><p className="text-sm font-semibold text-amber-800">{para}</p></div>
                if (!para.trim()) return null
                return <p key={i} className="text-sm text-gray-700 leading-relaxed">{para}</p>
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`Fortune cookies deliver wisdom in the most compact form available — a single sentence that expands the more you sit with it. This generator contains ${FORTUNES.length}+ original fortunes, each with a deep philosophical exploration.`}
          howItWorks="Click to crack a cookie and receive a fortune, followed by a 3,000-word exploration of its meaning across career, relationships, health, money, and daily practice."
          tipsSection="The most valuable use of a fortune is treating it as a meditation prompt for the day ahead. Ask yourself: where does this apply most directly in my current life?"
          conclusion="Fortune cookie wisdom has survived centuries because it points to universal truths. Each one is an invitation to look more carefully at something already in front of you."
          benefits={[{title:'100+ unique fortunes',text:'New wisdom every time with no repetition.'},{title:'Deep reflections',text:'Each fortune comes with thousands of words of philosophical exploration.'}]}
          useCases={[{title:'Morning reflection',text:'Start your day with a fortune and carry it as a theme.'},{title:'Sharing',text:'Share your fortune with friends and discuss its meaning.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
