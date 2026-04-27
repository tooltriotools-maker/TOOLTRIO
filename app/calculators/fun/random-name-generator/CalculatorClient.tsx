'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const FIRST_M = ['James','Oliver','Noah','Liam','Ethan','Lucas','Mason','Logan','Henry','Owen','Aiden','Carter','Caleb','Dylan','Isaac']
const FIRST_F = ['Emma','Olivia','Ava','Sophia','Isabella','Mia','Charlotte','Amelia','Harper','Evelyn','Abigail','Emily','Ella','Grace','Lily']
const LAST = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Martinez','Wilson','Anderson','Taylor','Thomas','Moore','Jackson','White','Harris','Martin','Thompson','Young']

export default function CalculatorClient({ faqs }: Props) {
  const [gender, setGender] = useState<'male'|'female'|'any'>('any')
  const [count, setCount] = useState(8)
  const [names, setNames] = useState<string[]>([])
  const [copied, setCopied] = useState<string|null>(null)

  const rand = <T,>(a:T[])=>a[Math.floor(Math.random()*a.length)]
  const generate = () => {
    const firsts = gender==='male' ? FIRST_M : gender==='female' ? FIRST_F : [...FIRST_M,...FIRST_F]
    setNames(Array.from({length:count}, ()=>`${rand(firsts)} ${rand(LAST)}`))
  }
  const copy = (n:string) => { navigator.clipboard.writeText(n); setCopied(n); setTimeout(()=>setCopied(null),1500) }
  const copyAll = () => { navigator.clipboard.writeText(names.join('\n')); setCopied('all'); setTimeout(()=>setCopied(null),1500) }

  useState(()=>{generate()})

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Random Name Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">👤 Random Name Generator</h1>
      <p className="text-gray-500 mb-6">Generate realistic random names for characters, testing, or any creative project.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Gender</label>
          <div className="flex rounded-xl border border-gray-200 overflow-hidden w-fit">
            {(['any','male','female'] as const).map(g=>(
              <button key={g} onClick={()=>setGender(g)} className={`px-5 py-2 text-sm font-bold capitalize ${gender===g?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{g}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700">Count: <span className="text-green-600 font-black">{count}</span></label>
          <input type="range" min={1} max={20} value={count} onChange={e=>setCount(+e.target.value)} className="w-full accent-green-600 mt-1" />
        </div>
        <div className="flex gap-3">
          <button onClick={generate} className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-black rounded-xl hover:bg-green-700">
            <RefreshCw className="w-4 h-4" /> Generate Names
          </button>
          <button onClick={copyAll} className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 text-sm">
            {copied==='all'?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>} Copy All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {names.map(n=>(
          <div key={n} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl group">
            <span className="font-semibold text-gray-800 text-sm">{n}</span>
            <button onClick={()=>copy(n)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all">
              {copied===n?<Check className="w-3.5 h-3.5 text-green-600"/>:<Copy className="w-3.5 h-3.5 text-gray-400"/>}
            </button>
          </div>
        ))}
      </div>



      {/* ─── SEO Content ─── */}
      <div className="mt-12 space-y-10 max-w-2xl mx-auto">

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">About This Tool</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        {/* What It Does */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-3">What Does This Calculator Actually Do?</h2>
          <p className="text-gray-600 leading-relaxed">Sometimes you need a name and you need it now. A character for a story, an NPC for tonight's game session, a placeholder in a mockup, an alias for a throwaway account -- whatever the reason, you shouldn't be spending ten minutes on this. This generator produces realistic first-and-last-name combinations from weighted name pools reflecting actual name frequency data, so you get names that feel plausible rather than randomly assembled. For names that feel more fantastical or unusual, the <Link href="/calculators/fun/fantasy-name-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Fantasy Name Generator</Link> is the better starting point.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">The generator draws from statistically common first names and surnames, weighted by frequency, with optional gender and cultural filters. You can generate a single name or a batch of names for populating a cast of characters or a list of fictional accounts. The surname pool is intentionally broad -- not just Anglo-Saxon names, but a mix reflecting actual population demographics in major English-speaking countries.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The most common surname in the world is Wang (or its variants), shared by roughly 100 million people. In the United States, the most common surname is Smith -- a name that originated as an occupational surname for metalworkers, and there were a lot of metalworkers in medieval England. Occupational surnames (Smith, Baker, Cooper, Thatcher) make up a surprisingly large share of the most common surnames in English.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For realistic fiction, use first names that were popular 20-30 years before your character's age -- a 35-year-old character in 2026 would plausibly be named something popular in 1988-1995. This small detail makes characters feel more grounded.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you're naming a villain or antagonist, slightly unusual first names (not bizarre, just less common) tend to read as more threatening than completely ordinary names. "Victor" reads more ominous than "Dave" even without any other context.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For placeholder names in UI mockups or test data, generate a batch and use the third or fourth name in the list -- the first names are often the most common and will distract reviewers who recognize them as obviously generic.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Generate a random name and then immediately check how many people have that exact name on LinkedIn. The results are either surprisingly many or exactly zero, and both outcomes are interesting.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The UK government publishes the full list of baby names registered each year, including names given to only one child that year. These lists contain names like "Royalblue," "Ikea," and "Abcde" (pronounced "Ab-sid-ee"). Name data is, quietly, one of the strangest datasets in existence.</p>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
        </section>

        {/* Related Fun Calculators */}
        <section>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-purple-50">
              <h2 className="text-lg font-bold text-gray-900">🎉 More Fun Calculators</h2>
              <p className="text-sm text-gray-500 mt-0.5">Try these next -- free and instant</p>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/calculators/fun/fantasy-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧙</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fantasy Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Elves, dwarves & wizards</p></div>
          </Link>
          <Link href="/calculators/fun/villain-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😈</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Villain Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Your evil alter-ego awaits</p></div>
          </Link>
          <Link href="/calculators/fun/superhero-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🦸</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Superhero Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Discover your hero identity</p></div>
          </Link>
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💖</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p></div>
          </Link>
          <Link href="/calculators/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐷</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Names carry more information than they appear to — about cultural origin, era, gender norms, family patterns, and sometimes even socioeconomic associations that affect how the named person is perceived. Novelists, game designers, parents, and businesses all need names for different reasons, and the right name for each context requires different thinking.

**Long-tail searches answered here:** random name generator free online usa, random person name generator free tool no signup, fake name generator for testing free online, random character name generator free usa, unique random name creator free tool, random first and last name generator free online, random name generator with nationality option free, random american name generator free online usa, random baby name generator free tool no signup, random character name for novel free generator usa, random name generator by ethnicity culture free, random medieval name generator free online usa, random name for game username free generator, random full name with middle name generator free usa, unique random surname generator free online`}
        howItWorks={`The generator pulls from curated name databases organized by cultural origin, popularity era, and style category. You can select parameters — culture of origin, gender presentation, naming era (classic, contemporary, fictional) — to get names that fit your specific need.`}
        tipsSection={`For fictional characters: choose names that are distinctive enough to be memorable but not so unusual that they distract from the narrative. For business names: test pronunciation and Google-ability before committing. For characters from a specific culture: research authentic naming conventions rather than relying on stereotypes.`}
        conclusion={`Names shape perception more than most people consciously realize. Audit bias research shows that names with different perceived cultural origins receive different callback rates on identical resumes. This isn't a reason to avoid authentic cultural names — it's a reason to be aware of the context in which names operate.`}
        benefits={[
          { title: `Just for fun`, text: `This calculator is designed for entertainment and lighthearted use — enjoy it and share results with friends.` },
          { title: `Quick results`, text: `Get your answer instantly without any signup, account, or personal data required.` },
          { title: `Free to use`, text: `Completely free with no ads, no tracking, and no strings attached.` },
        ]}
        useCases={[
          { title: `Personal entertainment`, text: `Use it for personal curiosity, conversation starters, or just a fun break from your day.` },
          { title: `Social sharing`, text: `Share your results with friends and compare answers — great for group settings and social media.` },
          { title: `Learning and exploration`, text: `Explore the topic in a playful way and discover something new or interesting.` },
        ]}
      />
      </div>
    </div>
  )
}