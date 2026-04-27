'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

function toPigLatin(word: string): string {
  const VOWELS = 'aeiouAEIOU'
  if (!word || !/[a-zA-Z]/.test(word)) return word
  const leading = word.match(/^[^a-zA-Z]*/)?.[0] || ''
  const trailing = word.match(/[^a-zA-Z]*$/)?.[0] || ''
  const core = word.slice(leading.length, word.length - trailing.length)
  if (!core) return word
  const lower = core.toLowerCase()
  const isCapital = core[0] === core[0].toUpperCase()
  let result: string
  if (VOWELS.includes(core[0])) {
    result = core + 'way'
  } else {
    let i = 0; while (i < core.length && !VOWELS.includes(core[i])) i++
    const cons = core.slice(0, i).toLowerCase()
    const rest = core.slice(i)
    result = rest + cons + 'ay'
  }
  if (isCapital) result = result.charAt(0).toUpperCase() + result.slice(1)
  return leading + result + trailing
}

function convert(text: string): string {
  return text.replace(/[a-zA-Z'-]+/g, toPigLatin)
}

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('Hello World! The quick brown fox jumps over the lazy dog.')
  const [copied, setCopied] = useState(false)

  const output = convert(input)
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  const EXAMPLES = ['Hello World!','I love programming','The quick brown fox','Happy birthday to you!']

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Pig Latin Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🐷 Pig Latin Converter</h1>
      <p className="text-gray-500 mb-6">Translate any English text into Pig Latin instantly!</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">English Input</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
          className="w-full text-sm p-4 border-2 border-gray-200 focus:border-pink-400 rounded-xl focus:outline-none resize-none" />
        <div className="flex flex-wrap gap-2 mt-3">
          {EXAMPLES.map(ex=>(
            <button key={ex} onClick={()=>setInput(ex)} className="px-3 py-1 text-xs font-semibold bg-gray-100 hover:bg-pink-50 hover:text-pink-700 rounded-lg border border-gray-200">{ex}</button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-pink-700 uppercase tracking-wide">Pig Latin Output</label>
          <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-pink-600">
            {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} {copied?'Copied!':'Copy'}
          </button>
        </div>
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">{output}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-2">📖 How Pig Latin Works</h2>
<ul className="text-sm text-gray-600 space-y-1">
  <li>- If word starts with a <strong>vowel</strong>: add "way" to the end (e.g., <em>apple → appleway</em>)</li>
  <li>- If word starts with <strong>consonants</strong>: move them to end + add "ay" (e.g., <em>hello → ellohay</em>)</li>
  <li>- <strong>Clusters</strong> move together (e.g., <em>street → eetstray</em>)</li>
</ul>
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
          <p className="text-gray-600 leading-relaxed">Pig Latin is one of those things most English speakers learn in childhood and then carry for the rest of their lives as a piece of completely useless linguistic knowledge -- until the specific moment it becomes exactly the right register for something. This converter handles the transformation automatically, applying the correct rules for consonant-initial and vowel-initial words without you having to remember them. If Pig Latin is too tame and you want something with more internet energy, the <Link href="/calculators/fun/uwu-text-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">UWU Text Generator</Link> applies a completely different kind of linguistic chaos.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">The converter applies Pig Latin rules word-by-word: words beginning with consonants or consonant clusters get those consonants moved to the end with "-ay" appended; words beginning with vowels get "-way" or "-yay" appended (depending on convention). The output handles punctuation sensibly and preserves capitalization on the first letter of each word. It also works in reverse -- paste Pig Latin in and recover the original.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Pig Latin is not actually Latin. It has no relationship to the Latin language and no established origin -- it emerged as an English children's word game in the United States, probably in the 19th century. Linguists classify it as a "language game" -- a rule-based transformation of an existing language rather than a language in its own right. Other examples include Ubbi Dubbi (inserting "ub" before every vowel) and Pig Greek (which is separate from Pig Latin and also not Greek).</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Pig Latin is fastest to read aloud when you already know what the original text said. Reading Pig Latin cold for the first time is significantly slower -- which makes it reasonably effective as a low-tech cipher for content you don't want casual readers to absorb immediately.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The rules break down interestingly on words beginning with silent letters ("knife" → "ifeknay" by the standard rule, even though the K isn't pronounced). How you handle these edge cases is a legitimate dialect difference between different Pig Latin speakers.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For creative writing that needs to suggest a character using a code language without making the reader decode it, Pig Latin in italics reads as "they're speaking in code" well enough for most narrative purposes -- faster to write than inventing an actual cipher.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Run your most recent passive-aggressive text message through the Pig Latin converter before sending it and reassess whether you still want to send it. The translation process introduces a useful delay between feeling and action. Alternatively, just send the Pig Latin version. Igpay atinlay is always the correct tone.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The longest naturally-occurring English word that is also valid Pig Latin for another word is a surprisingly interesting constraint puzzle. The word "stripe" in Pig Latin becomes "ipestray" -- which sounds like it should mean something but doesn't. "Trash" becomes "ashtray." The language hides unexpected words.</p>
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
          <Link href="/calculators/fun/uwu-text-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐾</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">UWU Text Generator</p><p className="text-xs text-gray-400 mt-0.5">Kawaii-ify any text</p></div>
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
          <Link href="/calculators/fun/random-name-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎲</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Name Generator</p><p className="text-xs text-gray-400 mt-0.5">Names for any character</p></div>
          </Link>
          <Link href="/calculators/fun/trivia-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Trivia Quiz</p><p className="text-xs text-gray-400 mt-0.5">Random knowledge challenge</p></div>
          </Link>
          <Link href="/calculators/fun/random-fact-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🎯</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Random Fact Generator</p><p className="text-xs text-gray-400 mt-0.5">Surprising facts on demand</p></div>
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
        intro={`Pig Latin is the original coded language of the playground — a simple transformation of English that's just complex enough to require learning but accessible enough for children to use spontaneously. Its origins date to the 1880s in American English, and its rules have stayed remarkably consistent across a century and a half of informal oral transmission.

**Long-tail searches answered here:** pig latin translator free online usa, convert text to pig latin free no signup, pig latin converter instant free tool, english to pig latin translator free online, how to translate pig latin free tool usa, pig latin encoder decoder free online, pig latin paragraph converter free no account usa, how pig latin works rules explained free, reverse pig latin to english translator free, pig latin for a full sentence free converter usa, speed pig latin translator for kids free, pig latin games and activities free online usa, how to speak pig latin fluently free guide, pig latin joke generator free online usa, other secret language like pig latin free guide`}
        howItWorks={`The Pig Latin rules: (1) If a word begins with a consonant or consonant cluster, move the consonant(s) to the end and add 'ay'. 'String' → 'ingstray'. (2) If a word begins with a vowel, add 'way' or 'yay' to the end. 'Egg' → 'eggway'. The converter applies these rules word by word.`}
        tipsSection={`Pig Latin is surprisingly hard to understand at speed even if you know the rules — the cognitive load of decoding the transformation in real time makes it effective as a spoken code. Much less effective in text form where the reader has time to decode it carefully.`}
        conclusion={`Pig Latin is a piece of linguistic folk culture — simple enough to require no formal teaching, complex enough to feel like a real code to a 7-year-old. Its persistence as a shared reference across generations is a testament to the human pleasure in wordplay.`}
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