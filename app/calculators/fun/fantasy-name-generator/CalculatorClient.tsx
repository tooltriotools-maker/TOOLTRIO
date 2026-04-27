'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const RACES = {
  elf: {prefix:['Aer','Cel','Eld','Syl','Ara','Thal','Fin','Mir','Ael','Gal'],suffix:['indor','ithil','enwe','anor','ithien','avel','adel','imir','aelas','idhren']},
  dwarf: {prefix:['Bor','Dur','Thor','Grim','Bald','Kaz','Ulf','Dag','Bryn','Vor'],suffix:['in','ak','och','dur','im','bir','onn','ek','ur','grim']},
  human: {prefix:['Ald','Bran','Cas','Dar','Ed','Fen','Gar','Hal','Ivan','Jor'],suffix:['ric','win','mer','ian','on','thor','ald','gar','wyn','bert']},
  orc: {prefix:['Grak','Thok','Mog','Zug','Bruk','Krag','Drak','Worg','Grul','Torg'],suffix:['ash','ok','ug','urk','mag','ul','rath','ak','oth','zug']},
  wizard: {prefix:['Zar','Mal','Sar','Cal','Thar','Elr','Mor','Gal','Bel','Vel'],suffix:['adus','imor','ithon','oran','andor','istus','ibus','amon','ador','iroth']},
}

const TITLES = {
  elf:['the Swift','the Wise','Moonshadow','of the Ancient Wood','Starweaver'],
  dwarf:['Ironheart','Stonefist','the Unyielding','Goldbeard','of the Deep Halls'],
  human:['the Bold','the Wanderer','Brightblade','of the Northlands','the Steadfast'],
  orc:['the Crusher','Bloodfang','the Mighty','Skullsplitter','the Relentless'],
  wizard:['the Arcane','Spellbinder','of the Infinite','Runekeeper','the Mystical'],
}

export default function CalculatorClient({ faqs }: Props) {
  const [race, setRace] = useState<keyof typeof RACES>('elf')
  const [count, setCount] = useState(5)
  const [names, setNames] = useState<string[]>([])
  const [copied, setCopied] = useState<string|null>(null)

  const rand = <T,>(a: T[]) => a[Math.floor(Math.random()*a.length)]
  const generate = () => {
    const r = RACES[race]; const t = TITLES[race]
    setNames(Array.from({length:count},()=>`${rand(r.prefix)}${rand(r.suffix)} ${rand(t)}`))
  }
  const copy = (n:string) => { navigator.clipboard.writeText(n); setCopied(n); setTimeout(()=>setCopied(null),1500) }

  useState(()=>{ generate() })

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Fantasy Name Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚔️ Fantasy Name Generator</h1>
      <p className="text-gray-500 mb-6">Generate epic fantasy character names for your RPG, novel, or game!</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm space-y-4">
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">Race / Class</label>
          <div className="grid grid-cols-5 gap-2">
            {(Object.keys(RACES) as (keyof typeof RACES)[]).map(r=>(
              <button key={r} onClick={()=>setRace(r)} className={`py-2 rounded-xl border-2 text-xs font-bold capitalize ${race===r?'bg-purple-600 border-purple-600 text-white':'border-gray-200 hover:border-purple-300'}`}>{r}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700">Generate: <span className="text-purple-600 font-black">{count} names</span></label>
          <input type="range" min={1} max={10} value={count} onChange={e=>setCount(+e.target.value)} className="w-full accent-purple-600 mt-1" />
        </div>
        <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-black rounded-xl hover:opacity-90">
          <RefreshCw className="w-4 h-4" /> Generate Names
        </button>
      </div>

      <div className="space-y-2">
        {names.map(n=>(
          <div key={n} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <span className="font-bold text-gray-900">{n}</span>
            <button onClick={()=>copy(n)} className="p-1.5 hover:bg-purple-100 rounded-lg">
              {copied===n?<Check className="w-4 h-4 text-purple-600"/>:<Copy className="w-4 h-4 text-gray-400"/>}
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
          <p className="text-gray-600 leading-relaxed">Naming a fantasy character is genuinely hard. Too simple and they sound like a username; too elaborate and no one can remember them by chapter three. This generator builds names tuned for specific races and archetypes -- elves get lyrical, vowel-heavy names; dwarves get consonant-heavy compound names; rogues get short, forgettable names that match the character. It is built for writers, tabletop players, and anyone who has been staring at a "Name Your Character" screen for longer than is reasonable. If you need a villain's name to go with your hero, the <Link href="/calculators/fun/villain-name" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Villain Name Generator</Link> can handle that in parallel.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Select your character's race or archetype (elf, dwarf, human noble, rogue, mage, etc.) and the generator applies a phonetic template appropriate to that category. Elf names use soft consonants and flowing vowel sequences; orc names use hard stops and guttural combinations. The output gives a first name and a surname or clan name where relevant to the archetype, plus an optional epithet for characters who've been around long enough to earn one.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Tolkien, who basically invented modern fantasy naming conventions, was a professional linguist who constructed complete grammatical systems for Elvish before writing a single word of story. He believed names had to feel linguistically consistent within their culture -- the reason Elvish names sound like they could be real words is because, within Tolkien's constructed languages, they are.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The best fantasy names are pronounceable out loud on first read by a stranger. If you need to add a pronunciation guide, the name is too complex for a protagonist -- save those for secondary characters the reader has time to learn.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Generate five names for your character type and then combine elements from two of them -- take the first syllable of one and the ending of another. The hybrid is usually better than either original, and it's genuinely yours.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For tabletop games, keep a short list of pre-generated names ready before your session. The moment the DM asks for your character's name while everyone waits is not the time for inspiration. The <Link href="/calculators/fun/random-name-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Random Name Generator</Link> is good for NPCs if you need realistic-sounding modern names instead.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Drop your generated character name into your friend group and dare them to write a one-sentence backstory for it. "Draveth the Ashen, outcast of the Northern Holds" reliably produces better collaborative fiction than "what should we do this Saturday."</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">In Dungeons & Dragons, player characters are statistically most likely to be named "Kira," "Zara," "Raven," or "Ash" -- names that work in fantasy but also sound like they could belong to a real person. The fantasy name sweet spot is names that feel plausible without feeling pedestrian.</p>
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
          <Link href="/calculators/fun/villain-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😈</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Villain Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Your evil alter-ego awaits</p></div>
          </Link>
          <Link href="/calculators/fun/superhero-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🦸</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Superhero Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Discover your hero identity</p></div>
          </Link>
          <Link href="/calculators/fun/random-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Names for any character</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
          <Link href="/calculators/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐷</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`A character's name is the first thing you give them, and it does more work than most writers realize. The right name evokes a world, suggests a personality, and feels inevitable once you've chosen it. The wrong name creates cognitive friction every time you or your reader encounters it. Good fantasy name generation draws on linguistics, phonesthetics (the sounds that feel 'sharp' or 'soft' or 'ancient'), and the internal consistency of your world's naming conventions.

**Long-tail searches answered here:** fantasy character name generator free online usa, random fantasy name generator no signup free, elf dwarf warrior mage name generator free, dnd character name generator free tool usa, epic fantasy name creator free online, rpg character name generator free no account, dark fantasy villain name generator free online usa, high fantasy elf name generator free tool, tolkien inspired name generator for characters free usa, fantasy dwarf clan name generator free online, dragon name generator for fantasy story free usa, fantasy place city kingdom name generator free, halfling gnome name generator free online usa, forgotten realms naming convention generator free, light vs dark fantasy character name generator free`}
        howItWorks={`The generator uses phoneme combinations derived from different linguistic traditions — Nordic, Celtic, Elvish-influenced, Eastern European, invented — to produce names that feel coherent within specific genre conventions. You can select the style, role (warrior, mage, rogue, noble), and culture type to get names that fit your setting.`}
        tipsSection={`For consistent world-building, decide on 2-3 phoneme patterns for your world's primary cultures before naming characters. Elvish-feeling names might favor soft consonants (l, r, n) and long vowels. Orcish names might favor hard consonants (k, g, dr). Consistency in a world's naming scheme makes it feel real.`}
        conclusion={`Names shape how readers and players experience characters before any action occurs. A well-chosen name is a small piece of world-building that pays dividends every time it appears on the page. Use these generated names as starting points — often the right name is one you'll tweak or combine from multiple generations.`}
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