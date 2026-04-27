'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const TITLES = ['Doctor','Lord','Baron','Count','General','Master','Agent','Director','Commander','The Dread']
const MIDDLES = ['Dark','Shadow','Iron','Black','Obsidian','Dreadful','Infernal','Sinister','Malevolent','Terrible']
const NOUNS = ['Doom','Havoc','Chaos','Ruin','Bane','Vex','Malice','Dread','Scorn','Wrath']
const PLANS = ['Replace all coffee with decaf worldwide','Make everyone listen to hold music permanently','Slow all internet to 1990s dial-up speed','Ban weekends globally','Require all passwords to be 50 characters','Fill all swimming pools with custard','Replace all music with recorder covers','Make Comic Sans the only available font','Slow all traffic lights by 10 seconds','Mandate PowerPoint for all conversations']
const LAIRS = ['A volcano lair (obviously)','A floating sky fortress','Inside a hollowed-out mountain','A submarine shaped like a cat','An abandoned amusement park','A secret Arctic research station','A moon base (half-built)','A sinister-looking office park','A converted blimp','Under a shopping mall']

export default function CalculatorClient({ faqs }: Props) {
  const [result, setResult] = useState<{name:string,plan:string,lair:string}|null>(null)
  const rand = <T,>(a:T[])=>a[Math.floor(Math.random()*a.length)]
  const generate = () => setResult({name:`${rand(TITLES)} ${rand(MIDDLES)}${rand(NOUNS)}`,plan:rand(PLANS),lair:rand(LAIRS)})

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Villain Name Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">😈 Villain Name Generator</h1>
      <p className="text-gray-500 mb-6">Discover your diabolical villain alter-ego, evil plan, and secret lair. Mwahaha!</p>

      <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-gray-800 to-gray-950 text-white font-black text-lg rounded-2xl hover:opacity-90 shadow-lg mb-6">
        <RefreshCw className="w-5 h-5" /> {result?'Try Another Villain':'Discover Your Villain Self'}
      </button>

      {result && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center">
            <p className="text-5xl mb-3">😈</p>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Your Villain Name</p>
            <p className="text-3xl font-black text-white">{result.name}</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-red-950 border border-red-800 rounded-2xl p-5">
              <p className="text-xs font-bold text-red-400 mb-1">🌍 Evil Master Plan</p>
              <p className="font-bold text-white">{result.plan}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
              <p className="text-xs font-bold text-gray-400 mb-1">🏰 Secret Lair</p>
              <p className="font-bold text-white">{result.lair}</p>
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
          <p className="text-gray-600 leading-relaxed">So you want to know your villain name? Good. Every person has a darker alter-ego lurking somewhere -- the version of you that didn't get their coffee, got skipped for a promotion, or simply decided that society's rules are suggestions at best. This generator builds out your full evil identity: title, power, lair, and the one absurd master plan that will finally bring the world to its knees. It's also oddly useful for writers who need a quick antagonist for a <Link href="/calculators/fun/fantasy-name-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">fantasy story</Link> or a tabletop campaign.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Hit the button and the generator picks from curated pools of villain titles, dark adjectives, and ominous nouns -- assembled so the combo actually sounds threatening rather than ridiculous. (Well. Mostly.) Your evil plan is drawn from a list of genuinely irritating but non-violent schemes, because the best villain plans are ones that make people say "honestly, fair." Your lair is similarly curated for maximum theatrical effect. Keep hitting the button until one lands that feels unmistakably, perfectly you.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The word "villain" traces back to Latin "villanus" -- meaning a farm serf or peasant. In medieval England, the aristocracy assumed that people of low birth had bad character, and the word gradually shifted meaning over centuries. So if you receive a suitably menacing villain name from this generator, congratulations: you are continuing a proud etymological tradition of the lowborn rising to cause chaos for the powerful.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Your villain name hits hardest when you say it out loud in a dramatic voice. Do not skip this step. The name "Lord Shadowbane" lands very differently spoken aloud than read silently.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you are using this for a D&D campaign villain, take your result and flip the motivation -- a villain whose plan is "make everyone listen to hold music permanently" becomes genuinely terrifying if you ask why they care that much about inconvenience.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Pair your villain name with the <Link href="/calculators/fun/superhero-name" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Superhero Name Generator</Link> result and you have yourself a complete dual identity. Post both and let people vote on which one you actually are.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Screenshot your result and caption it "current mood" on the day everything goes wrong. Or use it as your WiFi password and wait for houseguests to read it out loud. Either way, your villain name will finally get the audience it deserves.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The most psychologically compelling fictional villains -- Hannibal Lecter, Amy Dunne, Nurse Ratched -- share one trait: they are polite. Menace delivered with good manners is consistently rated more unsettling than open aggression. Something to consider for your own persona development.</p>
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
          <Link href="/calculators/fun/superhero-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🦸</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Superhero Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Discover your hero identity</p></div>
          </Link>
          <Link href="/calculators/fun/fantasy-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧙</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fantasy Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Elves, dwarves & wizards</p></div>
          </Link>
          <Link href="/calculators/fun/random-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Names for any character</p></div>
          </Link>
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
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
        intro={`Great villain names do specific work: they signal menace, intelligence, or corruption while remaining memorable. Doctor Doom, Darth Vader, Voldemort, Hannibal Lecter — each name embeds character in its sounds. Hard consonants (V, K, D, Z) often signal danger; latinate or archaic constructions signal sophistication or ancient evil; broken or corrupted versions of normal names suggest transformation.

**Long-tail searches answered here:** villain name generator free online usa, evil character name creator free tool no signup, dark villain name generator free online, scary villain name ideas generator free usa, antagonist name creator free online tool, supervillain name generator free no account, fantasy villain name with title lord doctor free usa, comic book villain name generator free online, movie style villain name creator free tool usa, anime villain name generator free online, historical inspired villain name generator free usa, villain organization name generator free online, cyberpunk villain name generator free usa, steampunk villain name creator free online, epic villain moniker creator free tool usa`}
        howItWorks={`The generator combines dark title formats (Doctor, Lord, The, Count), corrupted or ancient-sounding name roots, and menace-signaling suffixes to produce villain names that feel genre-appropriate. You can specify villain archetype (megalomaniac, shadow, corrupted noble, technological horror) to get names that fit different story contexts.`}
        tipsSection={`The best villain names have a logic to them — you can sense how the character might have named themselves, or how history might have named them. Villains who earn their epithets (The Pale King, The Black Hand) feel more real than those with generically sinister names that seem assigned by a narrator.`}
        conclusion={`Villain names are among fiction's most creative exercises because they require you to think from inside a worldview where the villain's self-perception is grandiose and serious, even when the name would seem absurd in everyday life. Writing convincing villains requires this imaginative act of genuine inhabitation.`}
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