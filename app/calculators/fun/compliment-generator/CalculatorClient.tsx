'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useRef } from 'react'
import { COMPLIMENTS, generateComplimentDescription } from '@/lib/fun/complimentData'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [compliment, setCompliment] = useState('')
  const [description, setDescription] = useState('')
  const usedRef = useRef(new Set<number>())

  function generate() {
    if (usedRef.current.size >= COMPLIMENTS.length) usedRef.current.clear()
    let idx: number
    do { idx = Math.floor(Math.random() * COMPLIMENTS.length) } while (usedRef.current.has(idx))
    usedRef.current.add(idx)
    setCompliment(COMPLIMENTS[idx])
    setDescription(generateComplimentDescription(COMPLIMENTS[idx]))
  }

  function share() {
    const text = `💖 "${compliment}"\n\nGenerate yours: tooltrio.com/fun/compliment-generator`
    if (navigator.share) navigator.share({ title: 'Your Compliment', text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
  }

  return (
    <DevToolLayout title="Compliment Generator" icon="💖"
      description="Generate a genuine, thoughtful compliment — then explore what it really means"
      category="Fun" parentPath="/fun" parentLabel="Fun & Entertainment">

      <div className="text-center mb-6">
        <button onClick={generate}
          className="w-full py-5 text-white font-black text-xl rounded-2xl mb-2 transition-all hover:-translate-y-1"
          style={{background:'linear-gradient(135deg,#ec4899,#db2777)',boxShadow:'0 8px 24px rgba(236,72,153,0.35)'}}>
          💖 {compliment ? 'Generate Another' : 'Generate My Compliment'}
        </button>
        <p className="text-xs text-gray-400">{COMPLIMENTS.length}+ unique compliments · Each with a deep explanation</p>
      </div>

      {compliment && (
        <div>
          <div className="rounded-3xl border-2 p-8 text-center mb-6" style={{background:'linear-gradient(135deg,rgba(253,242,248,0.9),rgba(252,231,243,0.6))',borderColor:'rgba(249,168,212,0.5)'}}>
            <div className="text-5xl mb-4">💖</div>
            <p className="text-xl font-black text-pink-900 leading-relaxed italic mb-4">"{compliment}"</p>
            <div className="flex gap-2 justify-center">
              <button onClick={share} className="px-4 py-2 text-sm font-bold rounded-xl bg-pink-600 text-white hover:bg-pink-700">📤 Share</button>
              <button onClick={() => navigator.clipboard.writeText(compliment).then(() => alert('Copied!'))} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-pink-300 text-pink-700 hover:bg-pink-50">📋 Copy</button>
            </div>
          </div>

          <div className="rounded-2xl border p-5 bg-white mb-4">
            <h2 className="text-lg font-black text-gray-900 mb-4">✨ Why This Compliment Is True — A Deep Exploration</h2>
            <div className="space-y-3">
              {description.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-gray-900 mt-6 mb-2">{para.replace('## ','')}</h2>
                if (para.startsWith('### ')) return <h3 key={i} className="text-base font-black text-gray-800 mt-5 mb-2">{para.replace('### ','')}</h3>
                if (para.startsWith('---')) return <hr key={i} className="border-gray-100 my-4" />
                if (!para.trim()) return null
                return <p key={i} className="text-sm text-gray-700 leading-relaxed">{para}</p>
              })}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`The Compliment Generator contains ${COMPLIMENTS.length}+ genuine, thoughtful compliments — not flattery, but real observations about human qualities that deserve to be named. Each comes with thousands of words exploring the quality in depth.`}
          howItWorks="Click generate and receive a specific, meaningful compliment. Below it, explore a detailed philosophical and psychological examination of the quality it describes."
          tipsSection="The most powerful compliments are the ones you share. When you find a compliment that feels true for someone in your life, send it to them directly."
          conclusion="Good things deserve to be said. A genuine compliment is an act of witness — it says 'I see you, and what I see has value.'"
          benefits={[{title:'100+ compliments',text:'New and genuine every time.'},{title:'Deep meaning',text:'Each compliment comes with thousands of words of exploration.'}]}
          useCases={[{title:'Self-appreciation',text:'Receive a compliment you might need to hear.'},{title:'Sharing',text:'Send a meaningful compliment to someone who deserves it.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
