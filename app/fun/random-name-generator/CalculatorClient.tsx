'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import { generateUniqueName, generateNameMeaning, MALE_FIRSTS, FEMALE_FIRSTS, SURNAMES, NAME_PREFIX, NAME_MID, NAME_SUFFIX } from '@/lib/fun/nameData'

interface Props { faqs: { question: string; answer: string }[] }

// Estimate unique combos
const TOTAL_COMBOS = (MALE_FIRSTS.length + FEMALE_FIRSTS.length + NAME_PREFIX.length * NAME_MID.length * NAME_SUFFIX.length) * SURNAMES.length

export default function CalculatorClient({ faqs }: Props) {
  const [gender, setGender] = useState<'male'|'female'|'any'>('any')
  const [count, setCount] = useState(1)
  const [names, setNames] = useState<Array<{first: string; last: string; meaning: string}>>([])
  const [expandedIdx, setExpandedIdx] = useState<number|null>(null)

  function generate() {
    const generated = Array.from({length: count}, () => {
      const n = generateUniqueName(gender)
      return {...n, meaning: ''}
    })
    setNames(generated)
    setExpandedIdx(null)
  }

  function expandMeaning(idx: number) {
    if (expandedIdx === idx) { setExpandedIdx(null); return }
    const n = names[idx]
    if (!n.meaning) {
      const updated = [...names]
      updated[idx] = {...n, meaning: generateNameMeaning(n.first)}
      setNames(updated)
    }
    setExpandedIdx(idx)
  }

  function share(first: string, last: string) {
    const text = `👤 Random Name Generated: ${first} ${last}\nGenerate yours: tooltrio.com/fun/random-name-generator`
    if (navigator.share) navigator.share({ title: 'Random Name', text })
    else navigator.clipboard.writeText(`${first} ${last}`).then(() => alert('Name copied!'))
  }

  const totalMillions = Math.round(TOTAL_COMBOS / 1_000_000)

  return (
    <DevToolLayout title="Random Name Generator" icon="👤"
      description={`Generate ${totalMillions}M+ unique names with detailed meaning and origin`}
      category="Fun" parentPath="/calculators/fun" parentLabel="Fun & Entertainment">

      <div className="rounded-3xl border p-5 mb-6 space-y-4" style={{background:'rgba(255,255,255,0.82)',backdropFilter:'blur(10px)',borderColor:'rgba(226,232,240,0.7)'}}>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Gender</label>
          <div className="flex rounded-xl overflow-hidden border-2 border-purple-200">
            {(['any','male','female'] as const).map(g => (
              <button key={g} onClick={() => setGender(g)}
                className={`flex-1 py-2.5 text-sm font-bold transition-all ${gender === g ? 'bg-purple-600 text-white' : 'bg-white text-gray-500 hover:bg-purple-50'}`}>
                {g === 'any' ? '⚡ Any' : g === 'male' ? '♂ Male' : '♀ Female'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">How many? <span className="text-purple-700 font-black">{count}</span></label>
          <input type="range" min={1} max={20} value={count} onChange={e => setCount(+e.target.value)} className="w-full accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>10</span><span>20</span></div>
        </div>
        <button onClick={generate}
          className="w-full py-3 text-white font-black rounded-xl"
          style={{background:'linear-gradient(135deg,#8b5cf6,#7c3aed)',boxShadow:'0 4px 16px rgba(139,92,246,0.3)'}}>
          👤 Generate {count} Name{count > 1 ? 's' : ''}
        </button>
        <p className="text-xs text-center text-gray-400">~{totalMillions}M+ unique name combinations in knowledge base</p>
      </div>

      {names.length > 0 && (
        <div className="space-y-3">
          {names.map((n, idx) => (
            <div key={idx} className="rounded-2xl border overflow-hidden" style={{background:'rgba(255,255,255,0.9)',borderColor:'rgba(226,232,240,0.7)'}}>
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-lg font-black text-purple-700 flex-shrink-0">
                  {n.first.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-gray-900">{n.first} <span className="text-purple-600">{n.last}</span></div>
                  <div className="text-xs text-gray-400">Click name meaning for 3,000-word deep dive</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => share(n.first, n.last)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 text-sm">📤</button>
                  <button onClick={() => navigator.clipboard.writeText(`${n.first} ${n.last}`).then(() => alert('Copied!'))} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 text-sm">📋</button>
                  <button onClick={() => expandMeaning(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${expandedIdx === idx ? 'bg-purple-600 text-white' : 'border border-purple-300 text-purple-700 hover:bg-purple-50'}`}>
                    {expandedIdx === idx ? 'Hide' : '🔍 Meaning'}
                  </button>
                </div>
              </div>
              {expandedIdx === idx && n.meaning && (
                <div className="border-t p-5 bg-purple-50/50">
                  <div className="space-y-3">
                    {n.meaning.split('\n\n').map((para, i) => {
                      if (para.startsWith('## ')) return <h2 key={i} className="text-lg font-black text-gray-900 mt-4 mb-2">{para.replace('## ','')}</h2>
                      if (para.startsWith('### ')) return <h3 key={i} className="text-base font-black text-gray-800 mt-3 mb-1">{para.replace('### ','')}</h3>
                      if (para.startsWith('---')) return <hr key={i} className="border-gray-200 my-3" />
                      if (!para.trim()) return null
                      return <p key={i} className="text-sm text-gray-700 leading-relaxed">{para}</p>
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 space-y-6 max-w-2xl mx-auto">
        <SEOContent title="" category="fun"
          intro={`The Random Name Generator contains ${totalMillions}M+ unique name combinations across male, female, and neutral names with authentic surnames. Each generated name comes with a detailed 3,000-word exploration of its meaning, etymology, and life themes.`}
          howItWorks="Select gender preference and count, then generate. Click 'Meaning' on any name to reveal a deep dive into its etymology, numerological profile, career themes, relationship patterns, health tendencies, and famous bearers."
          tipsSection="For fiction writers: generate 5-10 names and notice which feel most 'right' for your character. The gut response to a name is meaningful."
          conclusion="Names are not arbitrary labels. They carry history, culture, sound symbolism, and meaning that shapes both how others perceive us and how we perceive ourselves."
          benefits={[{title:`${totalMillions}M+ combos`,text:'Enormous variety across all name types.'},{title:'Deep meanings',text:'3,000-word exploration for every name generated.'}]}
          useCases={[{title:'Fiction writing',text:'Generate authentic character names with depth.'},{title:'Baby names',text:'Explore meanings before choosing a name for life.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
