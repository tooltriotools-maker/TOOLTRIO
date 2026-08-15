'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import { generateVillainName, generateCharacterProfile, VILLAIN_PREFIX, VILLAIN_SUFFIX } from '@/lib/fun/heroVillainData'

interface Props { faqs: { question: string; answer: string }[] }

const TOTAL = VILLAIN_PREFIX.length * VILLAIN_SUFFIX.length

const VILLAIN_TYPES = [
  { id: 'mastermind', label: '🧠 Mastermind', desc: 'Brilliant, patient, playing chess while others play checkers' },
  { id: 'warlord', label: '⚔️ Warlord', desc: 'Brutal force, total domination, conquest above all' },
  { id: 'phantom', label: '👻 Phantom', desc: 'Shadow operative, unseen until too late' },
  { id: 'scientist', label: '🧪 Mad Scientist', desc: 'Brilliant beyond ethics, experiments with reality' },
  { id: 'revolutionary', label: '🔥 Revolutionary', desc: 'Believes the system must burn to be reborn' },
]

export default function CalculatorClient({ faqs }: Props) {
  const [villainType, setVillainType] = useState('mastermind')
  const [villainName, setVillainName] = useState('')
  const [profile, setProfile] = useState('')
  const [heroName, setHeroName] = useState('')

  function generate() {
    const name = generateVillainName()
    setVillainName(name)
    setProfile(generateCharacterProfile(name, 'villain'))
    // Generate their nemesis hero
    const { generateHeroName } = require('@/lib/fun/heroVillainData')
    setHeroName(generateHeroName())
  }

  function share() {
    const text = `🦹 My Villain Name: ${villainName}\n🦸 Hero Nemesis: ${heroName}\nVillain type: ${villainType}\n\nGenerate yours: tooltrio.com/fun/villain-name`
    if (navigator.share) navigator.share({ title: 'My Villain Name', text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
  }

  return (
    <DevToolLayout title="Villain Name Generator" icon="🦹"
      description={`Generate your villain identity — ${Math.round(TOTAL/1000)}K+ unique names with full dark backstory profiles`}
      category="Fun" parentPath="/calculators/fun" parentLabel="Fun & Entertainment">

      <div className="rounded-3xl border p-5 mb-6" style={{background:'rgba(255,255,255,0.82)',backdropFilter:'blur(10px)',borderColor:'rgba(226,232,240,0.7)'}}>
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Villain Archetype</label>
        <div className="space-y-2 mb-4">
          {VILLAIN_TYPES.map(t => (
            <button key={t.id} onClick={() => setVillainType(t.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${villainType === t.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
              <div className="font-bold text-sm text-gray-800">{t.label}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </button>
          ))}
        </div>
        <button onClick={generate}
          className="w-full py-4 text-white font-black text-lg rounded-xl transition-all hover:-translate-y-1"
          style={{background:'linear-gradient(135deg,#dc2626,#991b1b)',boxShadow:'0 6px 20px rgba(220,38,38,0.35)'}}>
          🦹 Generate My Villain
        </button>
        <p className="text-xs text-center text-gray-400 mt-2">{Math.round(TOTAL/1000)}K+ unique villain names</p>
      </div>

      {villainName && (
        <div className="space-y-4">
          <div className="rounded-3xl border-2 p-6 text-center" style={{background:'linear-gradient(135deg,rgba(254,242,242,0.9),rgba(254,226,226,0.6))',borderColor:'rgba(252,165,165,0.5)'}}>
            <div className="text-5xl mb-3">🦹</div>
            <div className="text-3xl font-black text-red-900 mb-2">{villainName}</div>
            <div className="text-sm text-red-600 mb-4">Your villain identity · {VILLAIN_TYPES.find(t => t.id === villainType)?.label}</div>
            {heroName && (
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 mb-4">
                <div className="text-xs text-blue-500 font-bold uppercase mb-1">🦸 Your Hero Nemesis</div>
                <div className="text-lg font-black text-blue-700">{heroName}</div>
              </div>
            )}
            <div className="flex gap-2 justify-center">
              <button onClick={share} className="px-4 py-2 text-sm font-bold rounded-xl bg-red-600 text-white hover:bg-red-700">📤 Share</button>
              <button onClick={() => navigator.clipboard.writeText(villainName).then(() => alert('Copied!'))} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-red-300 text-red-700 hover:bg-red-50">📋 Copy</button>
              <button onClick={generate} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-red-300 text-red-700 hover:bg-red-50">↺ New Villain</button>
            </div>
          </div>

          <div className="rounded-2xl border p-5 bg-white">
            <h2 className="text-lg font-black text-gray-900 mb-4">📖 Full Villain Profile</h2>
            <div className="space-y-3">
              {profile.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-red-900 mt-6 mb-2">{para.replace('## ','')}</h2>
                if (para.startsWith('### ')) return <h3 key={i} className="text-base font-black text-gray-800 mt-4 mb-2">{para.replace('### ','')}</h3>
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
          intro={`The Villain Name Generator creates ${Math.round(TOTAL/1000)}K+ unique villain identities across 5 archetypes, each with a complete dark backstory, motivations, powers, and the hero fated to oppose them.`}
          howItWorks="Choose your villain archetype, generate your name, and receive a 3,000-word character profile covering your origin, powers, motivations, and the hero who will try to stop you."
          tipsSection="The best villains believe they're the hero of their own story. Use the generated motivations to understand your villain's perspective — not to justify it, but to make it believable."
          conclusion="Every villain is a hero who made different choices. The profile reveals what those choices were."
          benefits={[{title:`${Math.round(TOTAL/1000)}K+ names`,text:'Massive variety of unique villain identities.'},{title:'5 archetypes',text:'Mastermind, Warlord, Phantom, Scientist, Revolutionary.'}]}
          useCases={[{title:'Fiction writing',text:'Generate compelling antagonists for stories and games.'},{title:'Fun identity',text:'Discover your dark alter ego.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
