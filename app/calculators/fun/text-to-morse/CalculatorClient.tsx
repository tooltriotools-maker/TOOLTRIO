'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [text, setText] = useState('HELLO WORLD')
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const MORSE: Record<string,string> = {
    A:'.-', B:'-...', C:'-.-.', D:'-..', E:'.', F:'..-.', G:'--.', H:'....', 
    I:'..', J:'.---', K:'-.-', L:'.-..', M:'--', N:'-.', O:'---', P:'.--.',
    Q:'--.-', R:'.-.', S:'...', T:'-', U:'..-', V:'...-', W:'.--', X:'-..-',
    Y:'-.--', Z:'--..', '0':'-----', '1':'.----', '2':'..---', '3':'...--',
    '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.',
    '.':'.-.-.-', ',':'--..--', '?':'..--..', '/':'-..-.', '-':'-....-',
    '(':'-.--.', ')':'-.--.-'
  }
  const REV = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]))

  const output = useMemo(() => {
    if (mode==='encode') {
      return text.toUpperCase().split('').map(c=>{
        if (c===' ') return '  '; return MORSE[c] ? MORSE[c]+' ' : '? '
      }).join('').trim()
    } else {
      return text.trim().split('   ').map(word=>
        word.split(' ').map(sym=>REV[sym.trim()]||'?').join('')
      ).join(' ')
    }
  }, [text, mode])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Morse Code</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📡 Text ↔ Morse Code Converter</h1>
      <p className="text-gray-500 mb-6">Convert text to Morse code and back - with dots and dashes</p>
      <div className="flex gap-2 mb-4">
        {(['encode','decode'] as const).map(m=>(
          <button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${mode===m?'bg-gray-900 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {m==='encode'?'Text -> Morse':'Morse -> Text'}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Input {mode==='encode'?'Text':'Morse Code (use spaces between symbols, 3 spaces between words)'}</label>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder={mode==='encode'?'Type text here...':'.- .-.. .-.  (3 spaces between words)'}
          className="w-full border-2 border-gray-200 focus:border-yellow-400 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none resize-none" />
      </div>
      <div className="bg-gray-900 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Output</label>
          <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300">
            {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
          </button>
        </div>
        <p className="font-mono text-xl text-yellow-300 leading-loose tracking-widest break-all">{output||'Output appears here...'}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Quick Reference</p>
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 text-xs font-mono">
          {Object.entries(MORSE).slice(0,26).map(([k,v])=>(
            <div key={k} className="text-center p-1 bg-gray-50 rounded"><p className="font-black text-gray-800">{k}</p><p className="text-gray-500">{v}</p></div>
          ))}
        </div>
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
          <p className="text-gray-600 leading-relaxed">Morse code is the original compressed digital language -- a binary encoding system (dots and dashes) that predates digital computing by a century and is still a required proficiency for amateur radio operators. This converter translates any text into Morse code instantly, and also decodes Morse back to text. Practically useful for radio enthusiasts, SOS situations you'd rather be prepared for, and anyone who wants to communicate through a series of taps that sounds implausibly cinematic in real life. For other text transformation tools, <Link href="/calculators/fun/pig-latin-converter" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Pig Latin</Link> and the <Link href="/calculators/fun/emoji-translator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Emoji Translator</Link> cover the less life-saving ends of the spectrum.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Each letter and number has a fixed Morse representation. The converter maps your input character by character, inserting standard spacing between letters (a short gap) and words (a longer gap). Output is shown in dots and dashes alongside the audio representation -- you can hear the code played back at adjustable speed. The decoder reverses the process: paste dots and dashes in the input and recover the original text.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The international distress signal SOS (··· --- ···) was not chosen because the letters S-O-S stood for anything. They were chosen because the Morse pattern -- three shorts, three longs, three shorts -- is extremely easy to tap, flash, or signal under duress. The backronym "Save Our Souls" came later and was never official. The signal was adopted internationally in 1906 and remains valid emergency protocol.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The most useful Morse patterns to memorise without a converter are E (·), T (−), and SOS (··· − − − ···). These three cover a disproportionate share of emergency communication needs.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Morse code can be transmitted through any binary medium -- light, sound, tapping, blinking. This is why it persists as a skill: it degrades gracefully. If all your communication technology is gone, you can still tap a message on a pipe.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For creative uses: Morse code embedded as texture in graphic design (a repeating pattern that actually spells something) is a well-established Easter egg format. Run your message through the converter and use the dot-dash pattern as a decorative element in visual work.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Encode a short message in Morse and set it as your phone lock screen or desktop wallpaper. See how long it takes anyone to notice, let alone decode it. The answer is usually "much longer than expected" and "only if they specifically look it up."</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The letter E in Morse code is a single dot (·) -- the shortest possible code. This is intentional: Morse code assigns shorter sequences to more frequently used letters, following the same logic as Huffman coding in modern data compression. E is the most common letter in English, so it gets the shortest code.</p>
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
          <Link href="/calculators/fun/uwu-text-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐾</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">UWU Text Generator</p><p className="text-xs text-gray-400 mt-0.5">Kawaii-ify any text</p></div>
          </Link>
          <Link href="/calculators/fun/emoji-translator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😂</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Emoji Translator</p><p className="text-xs text-gray-400 mt-0.5">Turn any text into emoji</p></div>
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
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/compliment-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💖</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Compliment Generator</p><p className="text-xs text-gray-400 mt-0.5">Generate heartfelt compliments</p></div>
          </Link>
            </div>
          </div>
        </section>

      <SEOContent
        title=""
        category="fun"
        intro={`Morse code is the original digital communication system — a binary encoding of letters and numbers into combinations of two signals (dots and dashes, or short and long pulses) that could be transmitted over telegraph wire. Developed by Samuel Morse and Alfred Vail in the 1830s-40s, it enabled global instantaneous communication for the first time in human history, transforming warfare, commerce, and news.

**Long-tail searches answered here:** text to morse code converter free online usa, morse code translator free no signup tool, convert message to morse code free online, english to morse code converter free usa, morse code encoder decoder free tool, morse code alphabet translator free online, convert full sentence to morse code free usa, morse code with audio playback free online, morse code chart alphabet reference free usa, how to decode morse code message free online, sos morse code signal explained free guide usa, morse code to text translation free online, morse code for emergency signaling guide free usa, learn morse code alphabet quiz free online, morse code dots dashes reference card free usa`}
        howItWorks={`International Morse Code maps each letter (A-Z), number (0-9), and common punctuation to a specific sequence of dots (·) and dashes (−). The converter maps each character in your input text to its Morse equivalent, separated by spaces. Words are separated by forward slashes or longer pauses in actual transmission.`}
        tipsSection={`Morse code is still in active use today, primarily in amateur radio. It's required knowledge for certain radio licenses, used in aviation for radio navigation beacons, and is the basis of assistive technology that allows communication by eye blink or other minimal movement for people with severe motor disabilities.`}
        conclusion={`Morse code has a direct line from 1840s telegraphy to modern digital communication and to accessible technology that gives voice to people who can't speak. A tool built from only two signals — dot and dash — created a global communication revolution and remains in active use 180 years later.`}
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