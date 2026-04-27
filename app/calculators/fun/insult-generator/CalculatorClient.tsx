'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const ADJ1 = ['lily-livered','codfish','pernicious','bootless','churlish','impertinent','lumpish','fusty','loggerheaded','dankish']
const ADJ2 = ['idle-headed','beef-witted','elf-skinned','dog-hearted','earth-vexing','fly-bitten','onion-eyed','milk-livered','beetle-headed','motley-minded']
const NOUNS = ['canker-blossom!','foot-licker!','malt-worm!','flap-mouthed clod!','pigeon-egg!','moldwarp!','hedge-pig!','mumble-news!','skainsmate!','puttock!']

export default function CalculatorClient({ faqs }: Props) {
  const [insult, setInsult] = useState('')
  const [copied, setCopied] = useState(false)

  const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random()*arr.length)]
  const generate = () => setInsult(`Thou ${rand(ADJ1)}, ${rand(ADJ2)} ${rand(NOUNS)}`)
  const copy = () => { navigator.clipboard.writeText(insult); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Shakespearean Insult Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🎭 Shakespearean Insult Generator</h1>
      <p className="text-gray-500 mb-2">Generate gloriously old-fashioned insults straight from the Bard himself!</p>
      <p className="text-xs text-amber-600 font-semibold mb-6">⚠️ For laughs only - never use to genuinely hurt anyone.</p>

      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 p-8 text-center mb-6">
        {insult ? (
          <>
            <p className="text-6xl mb-4">😤</p>
            <p className="text-xl leading-relaxed text-gray-800 font-bold italic min-h-16">{insult}</p>
            <button onClick={copy} className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-white border-2 border-purple-200 text-purple-600 font-bold rounded-xl hover:bg-purple-50">
              {copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>} {copied?'Copied!':'Share this insult'}
            </button>
          </>
        ) : (
          <p className="text-gray-400 text-lg py-8">Click the button below to generate thine insult!</p>
        )}
      </div>

      <button onClick={generate} className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-black text-lg rounded-2xl hover:opacity-90 shadow-lg">
        <RefreshCw className="w-5 h-5" /> {insult ? 'Generate Another!' : 'Generate Insult!'}
      </button>



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
          <p className="text-gray-600 leading-relaxed">Sometimes you want to express displeasure but the word you're reaching for is either too mild or too crude. Enter the Shakespearean insult -- an art form that communicates genuine contempt through baroque, poetic language that sounds more impressive than it is venomous. This generator produces multi-layered insults built from Elizabethan English vocabulary -- the kind of thing you can say in polite company because most people won't know what you're calling them. A good companion piece to the <Link href="/calculators/fun/compliment-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Compliment Generator</Link> for people who like to cover all emotional registers.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">The generator combines an article, an adjective, a body-or-character-related insult noun, and optionally a dramatic closing phrase. The vocabulary pulls from documented Shakespearean and early modern English insults -- words that appeared in actual plays. The combinations are random but filtered to avoid truly offensive modern connotations, keeping the output theatrical rather than genuinely harmful. The more times you generate, the weirder and funnier the combinations get.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Shakespeare was, statistically, the most creative insulter in English literature. His works contain over 10,000 unique words, many of which he invented, and a significant number of those words were insults. "Nut-hook," "moldwarp," "skainsmate," and "flap-dragon" are all real Shakespearean insults, and all of them are better than most modern alternatives.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Delivery is everything with baroque insults. A Shakespearean insult said rapidly in frustration has one-tenth the impact of the same insult delivered slowly with deliberate eye contact. Pace it like a monologue, not an outburst.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The best use of this generator is preparing one good insult before a meeting where you expect someone to be difficult. Having it ready means you can release it at precisely the right moment with full composure.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you need something on the positive end of the spectrum instead, the <Link href="/calculators/fun/compliment-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Compliment Generator</Link> uses similarly heightened language to say genuinely nice things -- good for balancing your interpersonal karma after a productive insult session.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Post your best generated insult as your "out of office" message. "Thou puny, motley-minded maggot-pie" communicates unavailability just as clearly as "I am currently on leave" and is considerably more memorable.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The insult "you blocks, you stones, you worse than senseless things" (Julius Caesar, Act 1) was used by Shakespeare to address a crowd of Roman commoners, making it technically a group insult rated for crowds of two or more. Useful to know.</p>
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
          <Link href="/calculators/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💖</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p></div>
          </Link>
          <Link href="/calculators/fun/villain-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😈</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Villain Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Your evil alter-ego awaits</p></div>
          </Link>
          <Link href="/calculators/fun/uwu-text-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐾</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">UWU Text Generator</p><p className="text-xs text-gray-400 mt-0.5">Kawaii-ify any text</p></div>
          </Link>
          <Link href="/calculators/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐷</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/emoji-translator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😂</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Emoji Translator</p><p className="text-xs text-gray-400 mt-0.5">Turn any text into emoji</p></div>
          </Link>
          <Link href="/calculators/fun/would-you-rather" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🤔</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Would You Rather</p><p className="text-xs text-gray-400 mt-0.5">Impossible dilemmas generator</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`The art of the Shakespearean insult is a lost cultural treasure. When the Bard wrote 'Thou art as loathsome as a toad,' he was participating in a tradition of elaborate, creative verbal sparring that has been replaced by the one-word vulgarity. This generator celebrates the creativity of insults that require genuine linguistic effort — the kind that would land in a 16th century tavern debate rather than a Twitter comment section.

**Long-tail searches answered here:** shakespearean insult generator free online usa, funny fake insult generator free tool, creative insult maker no signup free, shakespeare insult creator free online usa, theatrical insult generator for fun free, old english insult generator free tool, elizabethan era insult vocabulary generator free, shakespeare play insult reference generator usa free, victorian era proper insult generator free online, pirate insult generator for costume event free usa, medieval court insult creator free tool online, how shakespeare constructed insults guide free usa, funny mock debate insult generator free online, comeback generator for argument practice free usa, dramatic villain monologue insult creator free`}
        howItWorks={`The generator combines three-part Shakespearean insult construction: an adjective of character (villainous, lily-livered, tickle-brained), a noun modifier (canker-blossom, hedge-pig, flap-dragon), and a base insult (knave, lout, miscreant). The combinations produce technically correct Shakespearean-style invective.`}
        tipsSection={`These are purely for entertainment and theatrical fun — NOT for actual use against real people. The Shakespearean insult is best deployed in jest with willing participants who appreciate the form. It's the verbal equivalent of a foam sword fight.`}
        conclusion={`Creativity in language — even antagonistic language — is a form of wit. Shakespeare's insults have survived 400 years precisely because they're inventive rather than merely vulgar. Enjoy them in the spirit of linguistic playfulness they represent.`}
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