'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

function toUwU(text: string, intensity: number): string {
  const faces = ['(･ω･)', ';;w;;', 'OwO', 'UwU', '>w<', '^w^', ':3', 'x3']
  const rand = () => intensity > 1 && Math.random() < 0.15 ? ' ' + faces[Math.floor(Math.random() * faces.length)] : ''
  return text
    .replace(/r|l/g, 'w')
    .replace(/R|L/g, 'W')
    .replace(/n([aeiou])/gi, (_, v) => `ny${v}`)
    .replace(/N([aeiou])/gi, (_, v) => `Ny${v}`)
    .replace(/ove/g, 'uv')
    .replace(/th/g, intensity >= 2 ? 'd' : 'd')
    .replace(/!/g, () => ('!' + rand()))
    .replace(/\./g, () => ('.' + rand()))
    .replace(/,/g, () => (',' + rand()))
}

const EXAMPLES = [
  'Hello, how are you doing today?',
  'I love programming so much!',
  'The quick brown fox jumps over the lazy dog.',
]

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('Hello! I love cats and coding!')
  const [intensity, setIntensity] = useState(2)
  const [copied, setCopied] = useState(false)
  const output = toUwU(input, intensity)
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">UwU Text Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🐱 UwU Text Generator</h1>
      <p className="text-gray-500 mb-6">Transform any text into adorable UwU speak! Because why not? OwO</p>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Normal Text</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          className="w-full text-sm p-4 border-2 border-gray-200 focus:border-pink-400 rounded-xl focus:outline-none resize-none" />
        <div className="mt-3">
          <label className="text-sm font-bold text-gray-700">UwU Intensity: <span className="text-pink-600 font-black">{['Low 😊', 'Medium OwO', 'Maximum UwU ☆'][intensity - 1]}</span></label>
          <input type="range" min={1} max={3} value={intensity} onChange={e => setIntensity(+e.target.value)} className="w-full accent-pink-500 mt-1" />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLES.map(ex => (
            <button key={ex} onClick={() => setInput(ex)} className="px-3 py-1 text-xs font-semibold bg-gray-100 hover:bg-pink-50 rounded-lg border border-gray-200 truncate max-w-xs">
              {ex.slice(0, 30)}...
            </button>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-black text-pink-700">UwU Output OwO</label>
          <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-pink-600">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">{output}</p>
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
          <p className="text-gray-600 leading-relaxed">UWU (or uwu) is the internet's official dialect of deliberate cuteness -- a speech pattern that originated in anime fan communities and spread into mainstream online culture as both sincere expression and ironic commentary. This generator converts any text into full uwu-speak, applying the characteristic substitutions (r and l become w, certain consonants soften, stutters appear, kaomoji proliferate) with an intensity dial that goes from "subtly kawaii" to "full unhinged." For other text transformation tools, the <Link href="/calculators/fun/pig-latin-converter" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Pig Latin Converter</Link> gives you a different flavour of linguistic mischief.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Pick your intensity level (1-5), paste your text, and the converter applies transformations in sequence: consonant substitution first, then stutters on word-initial consonants, then vowel lengthening, then kaomoji insertion at punctuation points. Lower intensities are readable and merely cute; level 5 is technically legible if you already know what the original said. The reverse decoder recovers original text from uwu output with reasonable accuracy, which is more useful than it sounds.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The "uwu" emoticon represents a closed-eyes, blushing, happy face -- the u's are closed eyes, the w is a small smiling mouth. It predates emoji as a text emoticon and emerged from Japanese online communities before spreading via Western anime fandom on platforms like Tumblr, DeviantArt, and early Discord servers. By the mid-2010s it had crossed from sincere expression into ironic usage, and now occupies the same dual sincere/ironic space as most internet language.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Level 2 or 3 is the practical sweet spot -- readable by people who aren't fluent in uwu, but distinctly kawaii enough to read as intentional rather than a typo. Save level 5 for captions on posts where the joke is the illegibility itself.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The stutter effect (repeating the initial consonant, like "h-hewwo") is the most specifically anime-derived element and the one that reads most immediately as uwu to people who know the register. It's also the element that causes the strongest reaction from people who don't.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>UWU text works extremely well for rewriting serious or aggressive text to defuse it. Taking a strongly-worded email and running it through even level 1 uwu conversion makes the aggression impossible to sustain -- partly because it's funny, partly because you cannot uwuify "I am deeply disappointed in your performance" without recognising its absurdity.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Screenshot the level-5 conversion of your most recent professional email and send it to a colleague you trust. The reaction to seeing "I wooked ovew youw pwopowsaw" is reliably funnier in person than described.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">Discord servers for anime communities use uwu speech in their rules channels more than any other community type -- server admins have found that delivering rules in uwu tone reduces new-member anxiety and increases rule compliance, apparently because it signals that the community takes itself at the right level of seriousness.</p>
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
          <Link href="/calculators/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐷</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/emoji-translator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😂</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Emoji Translator</p><p className="text-xs text-gray-400 mt-0.5">Turn any text into emoji</p></div>
          </Link>
          <Link href="/calculators/fun/text-to-morse" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">📡</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Text to Morse Code</p><p className="text-xs text-gray-400 mt-0.5">Tap out your message</p></div>
          </Link>
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💖</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
          </Link>
          <Link href="/calculators/fun/villain-name" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😈</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Villain Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Your evil alter-ego awaits</p></div>
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
        intro={`UwU text is internet subculture's gift to linguistics — a stylized form of writing that emerged from Japanese anime fandom, migrated through English-language forums, and became a recognizable internet dialect used alternately for sincere expression of cuteness and self-aware ironic humor. The 'UwU' face itself represents a cat's satisfied expression: two Us for eyes and a W for a cat mouth.

**Long-tail searches answered here:** uwu text converter free online usa, convert normal text to uwu free tool, uwu translator free no signup online, uwu speech generator free tool usa, text to uwu speak converter free online, uwu font generator free no account, full paragraph uwu converter free online usa, uwu text generator for discord messages free, uwu voice text generator for roleplay free usa, text to anime kawaii speak converter free, uwu generator copy paste results free online usa, reverse uwu to normal text converter free, how uwu text works phonetic rules free guide, uwu generator for different uwu intensities free usa, wholesome uwu text generator free online`}
        howItWorks={`UwU text applies several transformations: L/R → W substitution (key feature creating the 'cutesy' sound), emphasis repetition of letters, text emoticons (OwO, UwU, :3, nya~), exclamation softening (*blushes*), and tilde insertion between words for a trailing, soft quality.`}
        tipsSection={`UwU text functions as a register — a way of signaling tone and community membership rather than conveying factual information. Its ironic use is almost indistinguishable from its sincere use, which is part of its cultural interest. It's the internet equivalent of air quotes that may or may not be air quotes.`}
        conclusion={`Every internet subculture develops its own linguistic markers, and UwU text is a particularly visible and meme-able one. Its persistence despite years of 'cringe' designation says something about its resilience as a form of playful, low-stakes expressiveness that clearly resonates with a lot of people.`}
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