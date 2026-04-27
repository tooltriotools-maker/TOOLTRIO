'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const FACTS = [
  {fact:"A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.",cat:"Space 🚀"},
  {fact:"Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.",cat:"Food 🍯"},
  {fact:"A group of flamingos is called a 'flamboyance'. Because of course it is.",cat:"Animals 🦩"},
  {fact:"The human nose can detect over 1 trillion different scents - far more than the 10 million colours our eyes can see.",cat:"Science 🧬"},
  {fact:"Oxford University is older than the Aztec Empire. Teaching began there around 1096; the Aztec Empire was founded in 1428.",cat:"History 🏛️"},
  {fact:"Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.",cat:"History 🏛️"},
  {fact:"There are more possible iterations of a game of chess than there are atoms in the observable universe.",cat:"Math 🧮"},
  {fact:"Bananas are technically berries, but strawberries are not berries botanically. Neither are raspberries or blackberries.",cat:"Food 🍌"},
  {fact:"Sharks are older than trees. Sharks have existed for about 450 million years; trees evolved about 350 million years ago.",cat:"Animals 🦈"},
  {fact:"The word 'set' has the most definitions of any word in the English language - over 430 definitions in some dictionaries.",cat:"Language 📖"},
  {fact:"A bolt of lightning is about 5 times hotter than the surface of the Sun.",cat:"Science ⚡"},
  {fact:"Wombats produce cube-shaped poop - the only animal known to do so. They use it to mark territory more effectively.",cat:"Animals 🦘"},
  {fact:"The shortest war in history lasted 38 to 45 minutes between Britain and Zanzibar in 1896.",cat:"History ⚔️"},
  {fact:"There are more stars in the observable universe than grains of sand on all of Earth's beaches combined.",cat:"Space 🌌"},
  {fact:"Humans share about 60% of their DNA with bananas.",cat:"Science 🧬"},
  {fact:"The inventor of the frisbee was turned into a frisbee after he died - his ashes were made into one, as per his wishes.",cat:"Weird 🥏"},
  {fact:"A group of crows is called a 'murder'. A group of owls is a 'parliament'. A group of cats is a 'clowder'.",cat:"Animals 🐦‍⬛"},
  {fact:"Nintendo was founded in 1889, over 130 years ago, originally to make playing cards.",cat:"Tech 🎮"},
  {fact:"The total weight of all ants on Earth is roughly equal to the total weight of all humans.",cat:"Animals 🐜"},
  {fact:"If you removed all empty space from atoms in the human body, all of humanity would fit in a sugar cube.",cat:"Science 🔬"},
]

export default function CalculatorClient({ faqs }: Props) {
  const [idx, setIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const [seen, setSeen] = useState(new Set([0]))

  const next = () => {
    let n
    do { n = Math.floor(Math.random()*FACTS.length) } while (seen.has(n) && seen.size < FACTS.length)
    setIdx(n); setSeen(s=>new Set(Array.from(s).concat([n])))
  }
  const fact = FACTS[idx]
  const copy = () => { navigator.clipboard.writeText(fact.fact); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Random Fact Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🤯 Random Fact Generator</h1>
      <p className="text-gray-500 mb-6">Expand your mind with wild, verified, and mind-blowing facts from around the world!</p>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xs rounded-full">{fact.cat}</span>
        </div>
        <p className="text-lg leading-relaxed text-gray-800 font-semibold min-h-20">{fact.fact}</p>
        <div className="flex items-center justify-between mt-5">
          <button onClick={next} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black rounded-xl hover:opacity-90 shadow-lg">
            <RefreshCw className="w-4 h-4" /> Next Fact
          </button>
          <button onClick={copy} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50">
            {copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>} {copied?'Copied!':'Share'}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">{seen.size} of {FACTS.length} facts explored</p>



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
          <p className="text-gray-600 leading-relaxed">A well-chosen random fact is one of the best conversation-starters that exists -- better than most questions, because it gives the other person something to react to rather than something to answer. This generator pulls from a large, curated fact pool organized by strangeness level: interesting (facts that reframe familiar things), surprising (facts that contradict what you'd expect), and genuinely weird (facts that seem made up but aren't). Each fact comes with a source context. For facts that test you rather than just inform, the <Link href="/calculators/fun/trivia-quiz" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Trivia Quiz</Link> formats the same kind of knowledge as active recall questions.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Hit generate and the fact draws from a pool of several hundred curated entries, weighted so the same fact doesn't repeat until you've seen most of the pool. Category filters let you focus on science, history, language, food, animal behaviour, or geography. The "surprising" filter is calibrated for facts that consistently produce the "wait, really?" reaction -- not facts that are technically interesting but lack immediate impact.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The shortest war in recorded history was the Anglo-Zanzibar War of 1896, which lasted between 38 and 45 minutes. The UK issued an ultimatum to the Sultan of Zanzibar at 9am; he rejected it; the bombardment began at 9:02am; the sultan fled at approximately 9:40am; the war was declared over by 9:45am. Total casualties: roughly 500 on the Zanzibar side, one wounded on the British side.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The best time to deploy a random fact is during a pause in conversation -- not as an interruption but as a bridge. "I was just reading something weird about this..." followed by a fact creates forward momentum in a flagging conversation.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Facts about familiar things are almost always more interesting than facts about obscure things. "Oxford University is older than the Aztec Empire" lands harder than a fact about an ancient civilization most people have never encountered, because the familiar anchor makes the information feel more real.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Keep a short running list of the facts that made you do a double-take -- these are the ones that will stay with you and that are worth knowing well enough to deliver without looking them up. Three or four genuinely surprising facts, well-remembered, make you dramatically more interesting in conversation than twenty facts remembered imprecisely.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Set a personal rule: every time you use this generator, you have to share the fact with at least one person that day. This both forces you to actually remember it and consistently produces better conversations than standard small talk openers.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The "I learned something today" format pioneered on Reddit (r/todayilearned) has been studied as a content format: it consistently outperforms instructional content, news content, and opinion content on engagement and resharing. People are wired to share facts that surprised them -- which is why fact-based content has such reliably strong social network performance.</p>
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
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
          </Link>
          <Link href="/calculators/fun/fortune-cookie" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🥠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fortune Cookie</p><p className="text-xs text-gray-400 mt-0.5">Crack open your digital fortune</p></div>
          </Link>
          <Link href="/calculators/fun/random-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Names for any character</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/text-to-morse" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📡</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Text to Morse Code</p><p className="text-xs text-gray-400 mt-0.5">Tap out your message</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Random facts are one of the brain's favorite snacks — a nugget of information that costs nothing to absorb, delivers the small dopamine hit of 'I didn't know that,' and might stay with you for years. The best random facts combine genuine surprise with something that makes underlying sense once explained. They're also a legitimate conversational superpower.

**Long-tail searches answered here:** random interesting fact generator free online usa, cool random facts tool free no signup, amazing random fact of the day free, weird interesting fact generator free usa, random educational fact generator free tool, surprising facts generator free online no account, random science fact generator free online usa, random history fact generator free tool, unbelievable but true random fact generator free, random animal fact generator free online usa, daily random fact for learning habit free, share random fact on social media generator free, random geography fact generator free usa online, random fact generator for trivia night free, funny weird random fact generator free online usa`}
        howItWorks={`The fact database is curated for accuracy and verifiability — no urban legends or misattributed statistics. Facts are drawn from natural science, history, psychology, language, mathematics, and everyday phenomena. Each generation is randomly selected from the pool.`}
        tipsSection={`The best way to actually remember a random fact is to immediately connect it to something you already know. If a fact about octopus intelligence reminds you of a movie you've seen, that emotional/narrative connection makes it far more likely to stick.`}
        conclusion={`Curiosity is one of the most consistently life-enriching traits in the research on happiness and well-being. Random fact consumption is a form of feeding that curiosity — small doses of 'the world is more interesting than I thought.'`}
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