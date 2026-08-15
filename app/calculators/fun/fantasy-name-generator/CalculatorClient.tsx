'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import { generateFantasyName, generateCharacterProfile, FANTASY_PREFIXES, FANTASY_SUFFIXES } from '@/lib/fun/heroVillainData'

interface Props { faqs: { question: string; answer: string }[] }

const RACES = [
  { id: 'elf', label: '🧝 Elf', desc: 'Graceful, ancient, melodic names' },
  { id: 'dwarf', label: '⚒️ Dwarf', desc: 'Strong, guttural, clan-driven names' },
  { id: 'orc', label: '💪 Orc', desc: 'Fierce, harsh, battle-forged names' },
  { id: 'human', label: '🧑 Human', desc: 'Varied, relatable, culturally rich' },
  { id: 'mage', label: '🧙 Mage', desc: 'Arcane, flowing, mystical names' },
]

const totalCombos = Object.keys(FANTASY_PREFIXES).reduce((total, race) => {
  return total + (FANTASY_PREFIXES[race].length * (FANTASY_SUFFIXES[race]?.length || 30))
}, 0)

export default function CalculatorClient({ faqs }: Props) {
  const [race, setRace] = useState('elf')
  const [count, setCount] = useState(5)
  const [names, setNames] = useState<Array<{name: string; profile: string}>>([])
  const [expandedIdx, setExpandedIdx] = useState<number|null>(null)

  function generate() {
    const generated = Array.from({length: count}, () => ({
      name: generateFantasyName(race),
      profile: ''
    }))
    setNames(generated)
    setExpandedIdx(null)
  }

  function expandProfile(idx: number) {
    if (expandedIdx === idx) { setExpandedIdx(null); return }
    if (!names[idx].profile) {
      const updated = [...names]
      updated[idx] = { ...names[idx], profile: generateCharacterProfile(names[idx].name, 'fantasy', race) }
      setNames(updated)
    }
    setExpandedIdx(idx)
  }

  function share(name: string) {
    const raceInfo = RACES.find(r => r.id === race)
    const text = `⚔️ My Fantasy Name: ${name}\n🏰 Race: ${raceInfo?.label}\n\nGenerate yours: tooltrio.com/fun/fantasy-name-generator`
    if (navigator.share) navigator.share({ title: 'Fantasy Name', text })
    else navigator.clipboard.writeText(name).then(() => alert('Copied!'))
  }

  const raceColors: Record<string, string> = {
    elf: 'from-emerald-600 to-teal-600',
    dwarf: 'from-amber-700 to-orange-700',
    orc: 'from-green-800 to-lime-700',
    human: 'from-blue-600 to-indigo-600',
    mage: 'from-purple-600 to-violet-700',
  }
  const raceGlow: Record<string, string> = {
    elf: 'rgba(16,185,129,0.3)',
    dwarf: 'rgba(217,119,6,0.3)',
    orc: 'rgba(22,163,74,0.3)',
    human: 'rgba(37,99,235,0.3)',
    mage: 'rgba(124,58,237,0.3)',
  }

  return (
    <DevToolLayout title="Fantasy Name Generator" icon="⚔️"
      description={`Generate unique fantasy names across 5 races — ${Math.round(totalCombos / 1000)}K+ unique combinations`}
      category="Fun" parentPath="/fun" parentLabel="Fun & Entertainment">

      <div className="rounded-3xl border p-5 mb-6 space-y-4" style={{background:'rgba(255,255,255,0.82)',backdropFilter:'blur(10px)',borderColor:'rgba(226,232,240,0.7)'}}>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Race / Species</label>
          <div className="space-y-2">
            {RACES.map(r => (
              <button key={r.id} onClick={() => setRace(r.id)}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${race === r.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                <div className="font-bold text-sm text-gray-800">{r.label}</div>
                <div className="text-xs text-gray-500">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
            How many names? <span className="text-purple-700 font-black">{count}</span>
          </label>
          <input type="range" min={1} max={20} value={count} onChange={e => setCount(+e.target.value)} className="w-full accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>10</span><span>20</span></div>
        </div>

        <button onClick={generate}
          className={`w-full py-4 text-white font-black text-lg rounded-xl transition-all hover:-translate-y-1 bg-gradient-to-r ${raceColors[race]}`}
          style={{boxShadow:`0 6px 20px ${raceGlow[race]}`}}>
          ⚔️ Generate {count} {RACES.find(r => r.id === race)?.label.split(' ').slice(1).join(' ')} Name{count > 1 ? 's' : ''}
        </button>
        <p className="text-xs text-center text-gray-400">{Math.round(totalCombos/1000)}K+ unique fantasy name combinations</p>
      </div>

      {names.length > 0 && (
        <div className="space-y-3">
          {names.map((n, idx) => (
            <div key={idx} className="rounded-2xl border overflow-hidden" style={{background:'rgba(255,255,255,0.9)',borderColor:'rgba(226,232,240,0.7)'}}>
              <div className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${raceColors[race]} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                  {n.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-xl font-black text-gray-900">{n.name}</div>
                  <div className="text-xs text-gray-400">{RACES.find(r => r.id === race)?.label} · Click profile for 3k-word backstory</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => share(n.name)} className="p-2 rounded-lg hover:bg-gray-100 text-sm">📤</button>
                  <button onClick={() => navigator.clipboard.writeText(n.name).then(() => alert('Copied!'))} className="p-2 rounded-lg hover:bg-gray-100 text-sm">📋</button>
                  <button onClick={() => expandProfile(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${expandedIdx === idx ? 'bg-purple-600 text-white' : 'border border-purple-300 text-purple-700 hover:bg-purple-50'}`}>
                    {expandedIdx === idx ? 'Hide' : '📖 Profile'}
                  </button>
                </div>
              </div>
              {expandedIdx === idx && n.profile && (
                <div className="border-t p-5 bg-purple-50/30">
                  <div className="space-y-3">
                    {n.profile.split('\n\n').map((para, i) => {
                      if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-gray-900 mt-4 mb-2">{para.replace('## ','')}</h2>
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
          intro={`Generate authentic fantasy names across 5 races — Elf, Dwarf, Orc, Human, and Mage. Each name follows race-specific phonetic conventions and comes with a full 3,000-word character backstory.`}
          howItWorks="Select a race, choose how many names you want, and generate. Click 'Profile' on any name to reveal a complete character backstory including origin, powers, weaknesses, and place in the world."
          tipsSection="For worldbuilding: generate 20 names from the same race to establish the phonetic conventions of your world's culture. Patterns will emerge that make future naming feel authentic."
          conclusion="Great fantasy names aren't random — they follow linguistic rules specific to each culture. This generator uses those rules to produce names that feel real."
          benefits={[{title:'5 unique races',text:'Each with authentic phonetic conventions.'},{title:'3k profiles',text:'Full character backstories on demand.'}]}
          useCases={[{title:'D&D characters',text:'Generate authentic RPG character names.'},{title:'Novel writing',text:'Build a consistent fantasy naming system.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
