'use client'
import { DevToolLayout } from '@/components/ui/DevToolLayout'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import { generateHeroName, generateCharacterProfile, HERO_PREFIX, HERO_SUFFIX } from '@/lib/fun/heroVillainData'

interface Props { faqs: { question: string; answer: string }[] }

const TOTAL = HERO_PREFIX.length * HERO_SUFFIX.length

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('')
  const [heroName, setHeroName] = useState('')
  const [profile, setProfile] = useState('')
  const [villainName, setVillainName] = useState('')

  function generate() {
    const name = generateHeroName()
    setHeroName(name)
    setProfile(generateCharacterProfile(name, 'hero'))
    // Also generate their arch-nemesis villain
    const { generateVillainName } = require('@/lib/fun/heroVillainData')
    setVillainName(generateVillainName())
  }

  function share() {
    const text = `🦸 My Superhero Name: ${heroName}\n⚔️ Arch-nemesis: ${villainName}\n\nGenerate yours: tooltrio.com/fun/superhero-name`
    if (navigator.share) navigator.share({ title: 'My Superhero Name', text })
    else navigator.clipboard.writeText(text).then(() => alert('Copied!'))
  }

  return (
    <DevToolLayout title="Superhero Name Generator" icon="🦸"
      description={`Generate your superhero identity — ${Math.round(TOTAL/1000)}K+ unique names with full character profiles`}
      category="Fun" parentPath="/calculators/fun" parentLabel="Fun & Entertainment">

      <div className="rounded-3xl border p-5 mb-6" style={{background:'rgba(255,255,255,0.82)',backdropFilter:'blur(10px)',borderColor:'rgba(226,232,240,0.7)'}}>
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Your Name / Nickname (optional — influences your hero)</label>
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder="Enter your name for a personalized hero..."
          className="w-full border-2 border-gray-200 focus:border-blue-400 rounded-xl px-4 py-3 mb-4 focus:outline-none" />
        <button onClick={generate}
          className="w-full py-4 text-white font-black text-lg rounded-xl transition-all hover:-translate-y-1"
          style={{background:'linear-gradient(135deg,#3b82f6,#2563eb)',boxShadow:'0 6px 20px rgba(59,130,246,0.35)'}}>
          🦸 Generate My Superhero
        </button>
        <p className="text-xs text-center text-gray-400 mt-2">{Math.round(TOTAL/1000)}K+ unique superhero names</p>
      </div>

      {heroName && (
        <div className="space-y-4">
          <div className="rounded-3xl border-2 p-6 text-center" style={{background:'linear-gradient(135deg,rgba(239,246,255,0.9),rgba(219,234,254,0.6))',borderColor:'rgba(147,197,253,0.5)'}}>
            <div className="text-5xl mb-3">🦸</div>
            <div className="text-3xl font-black text-blue-800 mb-2">{heroName}</div>
            <div className="text-sm text-blue-600 mb-4">Your superhero identity</div>
            {villainName && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 mb-4">
                <div className="text-xs text-red-500 font-bold uppercase mb-1">⚔️ Your Arch-Nemesis</div>
                <div className="text-lg font-black text-red-700">{villainName}</div>
              </div>
            )}
            <div className="flex gap-2 justify-center">
              <button onClick={share} className="px-4 py-2 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700">📤 Share</button>
              <button onClick={() => navigator.clipboard.writeText(heroName).then(() => alert('Copied!'))} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-blue-300 text-blue-700 hover:bg-blue-50">📋 Copy</button>
              <button onClick={generate} className="px-4 py-2 text-sm font-bold rounded-xl border-2 border-blue-300 text-blue-700 hover:bg-blue-50">↺ New Hero</button>
            </div>
          </div>

          {/* Character profile */}
          <div className="rounded-2xl border p-5 bg-white">
            <h2 className="text-lg font-black text-gray-900 mb-4">📖 Full Character Profile</h2>
            <div className="space-y-3">
              {profile.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-blue-900 mt-6 mb-2">{para.replace('## ','')}</h2>
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
          intro={`The Superhero Name Generator creates ${Math.round(TOTAL/1000)}K+ unique hero identities, each with a complete character profile including origin story, powers, weaknesses, motivations, and arch-nemesis.`}
          howItWorks="Click generate to receive your superhero name and a detailed 3,000-word character profile covering your powers, origin, weaknesses, and the villain you're fated to oppose."
          tipsSection="For writers: use the generated profile as a story prompt. The best superhero stories come from the tension between a hero's powers and their vulnerabilities."
          conclusion="Every great hero has a great story behind the name. Now you have both."
          benefits={[{title:`${Math.round(TOTAL/1000)}K+ names`,text:'Enormous variety of unique superhero identities.'},{title:'Full profiles',text:'3,000-word character sheets for every hero generated.'}]}
          useCases={[{title:'Creative writing',text:'Generate heroes for your stories, comics, or games.'},{title:'Fun identity',text:'Discover your superhero alter ego.'}]} />
        <section><h2 className="text-xl font-black text-gray-900 mb-4">FAQ</h2>
          <div className="space-y-3">{faqs.map(f => <details key={f.question} className="rounded-2xl border p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3">{f.answer}</p></details>)}</div>
        </section>
      </div>
    </DevToolLayout>
  )
}
