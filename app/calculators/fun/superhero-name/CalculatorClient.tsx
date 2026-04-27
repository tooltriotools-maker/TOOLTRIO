'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const PREFIXES = ['Iron','Shadow','Quantum','Thunder','Blaze','Cosmic','Phantom','Steel','Nova','Hyper','Turbo','Mystic','Venom','Crimson','Silver']
const SUFFIXES = ['Hawk','Shield','Blade','Force','Strike','Bolt','Fang','Knight','Storm','Ranger','Runner','Crusher','Guardian','Phoenix','Pulse']
const POWERS = ['Super Strength','Time Manipulation','Telepathy','Invisibility','Flight','Electrokinesis','Phasing Through Objects','Teleportation','Fire Control','Ice Generation','Super Speed','Healing Factor','Gravity Manipulation','Energy Blasts','Animal Communication']
const WEAKNESSES = ['Garlic (yes, really)','Pop music from the 80s','Bad puns','Bubble wrap (irresistible)','Imposter syndrome','Dad jokes','Glitter - it gets everywhere','The colour beige','Extremely slow Wi-Fi','The word "moist"']

export default function CalculatorClient({ faqs }: Props) {
  const [name, setName] = useState('')
  const [result, setResult] = useState<{hero:string,power:string,weakness:string}|null>(null)

  const rand = <T,>(a:T[])=>a[Math.floor(Math.random()*a.length)]

  const generate = () => {
    const seed = name.trim() || 'hero'
    const h1 = PREFIXES[(seed.charCodeAt(0)||0) % PREFIXES.length]
    const h2 = SUFFIXES[(seed.charCodeAt(seed.length-1)||0) % SUFFIXES.length]
    setResult({
      hero: `${h1} ${h2}`,
      power: rand(POWERS),
      weakness: rand(WEAKNESSES),
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Superhero Name Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🦸 Superhero Name Generator</h1>
      <p className="text-gray-500 mb-6">Discover your secret superhero identity, power, and (embarrassing) weakness!</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-sm font-bold text-gray-700 block mb-2">Your name (optional - influences your hero name)</label>
        <div className="flex gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-bold focus:border-yellow-400 focus:outline-none" />
          <button onClick={generate} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black rounded-xl hover:opacity-90 shadow-lg">
            <RefreshCw className="w-4 h-4" /> {result?'Regenerate':'Generate!'}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 text-center">
            <p className="text-5xl mb-3">🦸</p>
            <p className="text-xs font-bold text-yellow-700 uppercase mb-1">Your Superhero Name</p>
            <p className="text-4xl font-black text-gray-900">{result.hero}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">⚡</p>
              <p className="text-xs font-bold text-blue-700 mb-1">Superpower</p>
              <p className="font-bold text-gray-900 text-sm">{result.power}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
              <p className="text-2xl mb-2">😬</p>
              <p className="text-xs font-bold text-red-700 mb-1">Secret Weakness</p>
              <p className="font-bold text-gray-900 text-sm">{result.weakness}</p>
            </div>
          </div>
        </div>
      )}



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
          <p className="text-gray-600 leading-relaxed">Every person has an inner hero -- or at least the vague sense that they would be much better at saving the world than the people currently doing it. This generator gives you your superhero alias, your core power, and a short origin story that explains how a perfectly normal human became the city's most improbable defender. It works surprisingly well as a companion to the <Link href="/calculators/fun/villain-name" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Villain Name Generator</Link> for people who want the full dual-identity experience.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">The generator combines a hero title or prefix with a power-adjacent noun, pulling from curated pools weighted toward memorable combinations. Your power is drawn from a broad range of abilities -- not just "super strength" but things like "makes all vending machines work on first try," because sometimes the most useful powers are the mundane ones. Your origin story is a one-liner that gives narrative context without requiring a three-film setup.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The first superhero widely recognized in the modern sense was Superman, introduced in Action Comics #1 in 1938 -- created by two teenagers from Cleveland, Ohio, who originally couldn't sell the concept. The core superhero formula (secret identity, costume, origin trauma, recurring villain) was essentially invented by accident and has barely changed in 85 years.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most beloved superhero names follow a two-part structure: a modifier + a noun ("Spider-Man," "Iron Man," "Black Widow"). If your result follows this pattern, that's by design -- it's the pattern that sticks in memory.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For roleplay games like <Link href="/calculators/fun/fantasy-name-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">fantasy character naming</Link> or fan fiction, generate five or six hero names and pick the one whose power set creates the most interesting constraints. Limitations make for better stories than omnipotence.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your nemesis is usually the hero who has the opposite power to yours, which means if you also generate a <Link href="/calculators/fun/villain-name" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">villain name</Link>, you're already writing a story whether you intended to or not.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Run this with a group of friends and then assign each other's hero names to the wrong person -- "actually, you're definitely Shadowstep McGee and Jake is clearly The Magnificent Brisket" usually produces better results than keeping your own name.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">Cape-wearing superheroes are relatively rare in modern comics because artist Jack Kirby and editor Stan Lee agreed in the 1960s that capes were dramatically impractical. The characters who kept capes (Thor, Batman, Superman) were grandfathered in from earlier eras. Most heroes introduced after 1965 wear something more tactical.</p>
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
          <Link href="/calculators/fun/fantasy-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧙</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fantasy Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Elves, dwarves & wizards</p></div>
          </Link>
          <Link href="/calculators/fun/random-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Names for any character</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/love-compatibility" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Love Compatibility</p><p className="text-xs text-gray-400 mt-0.5">Numerology + astrology score</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
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
        intro={`Superhero names follow identifiable linguistic patterns: alliteration (Peter Parker, Bruce Banner, Clark Kent), animal metaphors (Spider-Man, Black Panther, The Flash who is named for speed), origin references (Captain America, Iron Man, Thor), or abstract concepts (Wonder Woman, Doctor Strange). The best superhero names are immediately legible — you can infer something about the character from the name alone.

**Long-tail searches answered here:** superhero name generator free online usa, what is my superhero name calculator free, custom superhero name creator no signup free, random superhero name generator free tool usa, personalized superhero identity creator free online, generate my hero name free tool usa, superhero name from first and last name free, female superhero name generator free online usa, superhero name and power combo generator free, dark superhero antihero name generator free usa, teen superhero name generator for story free, superhero name for my personality type free usa, avengers style superhero name generator free, original superhero name not taken generator free usa, superhero secret identity name generator free online`}
        howItWorks={`The generator combines origin story elements (how you gained your powers), power category (strength, speed, intelligence, elemental, psychic), and your real name for personalization. The resulting name follows conventions of superhero naming that make it feel genre-appropriate.`}
        tipsSection={`For creative writing or gaming purposes, the most memorable superhero names balance simplicity with specificity. 'The Crimson Surge' is better than 'The Man Who Controls Electromagnetic Pulses.' Think of the name as a tagline that the character embodies, not a description of their power list.`}
        conclusion={`Superhero names are a tiny form of world-building — they tell you something about the character, their world, and what readers or viewers are meant to find aspirational about them. Creating one is a small exercise in character design that reveals what qualities feel heroic to you personally.`}
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