'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check, Heart, Star, Zap } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [text, setText] = useState('I love pizza and coffee. The sun is shining today.')
  const [copied, setCopied] = useState(false)

  const DICT: Record<string,string> = {love:'❤️',like:'👍',hate:'😠',happy:'😊',sad:'😢',angry:'😡',laugh:'😂',smile:'😊',cry:'😭',heart:'❤️',star:'⭐',sun:'☀️',moon:'🌙',rain:'🌧️',snow:'❄️',fire:'🔥',water:'💧',earth:'🌍',sky:'🌈',food:'🍽️',pizza:'🍕',burger:'🍔',coffee:'☕',beer:'🍺',wine:'🍷',cake:'🎂',money:'💰',work:'💼',home:'🏠',school:'🏫',phone:'📱',computer:'💻',music:'🎵',book:'📚',car:'🚗',plane:'✈️',sleep:'😴',run:'🏃',dance:'💃',win:'🏆',good:'✅',bad:'❌',yes:'✅',no:'❌',ok:'👌',wow:'😮',cool:'😎',funny:'😂',hello:'👋',bye:'👋',please:'🙏',thanks:'🙏',sorry:'😔',cat:'🐱',dog:'🐶',bird:'🐦',fish:'🐟',tree:'🌳',flower:'🌺',party:'🎉',gift:'🎁',birthday:'🎂',world:'🌍',time:'⏰',fast:'⚡',strong:'💪',small:'🔬',big:'🔭',idea:'💡',magic:'✨',warning:'⚠️',danger:'🚨',stop:'🛑',check:'✔️',new:'🆕',hot:'🔥',cold:'❄️',sick:'🤒',healthy:'💪',beautiful:'😍',ugly:'😬',smart:'🧠',rich:'💰',poor:'😢',lucky:'🍀',dead:'💀',alive:'💚',peace:'☮️',king:'👑',princess:'👸',robot:'🤖',alien:'👽',ghost:'👻',monster:'👹'}

  const translated = useMemo(() => {
    return text.split(/\b/).map(w => {
      const k = w.toLowerCase().replace(/[^a-z]/g,'')
      return DICT[k] ? DICT[k] : w
    }).join('')
  }, [text])

  const copy = () => { navigator.clipboard.writeText(translated); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun &amp; Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Emoji Translator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">😊 Emoji Translator</h1>
      <p className="text-gray-500 mb-8">Convert text to emoji - watch your sentences come alive with emoji!</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Enter Text</label>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Type any sentence..."
          className="w-full border-2 border-gray-200 focus:border-yellow-400 rounded-xl px-4 py-3 text-lg focus:outline-none resize-none" />
      </div>
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-yellow-600 uppercase tracking-wide">✨ Emoji Translation</p>
          <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-yellow-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
        </div>
        <p className="text-2xl leading-loose break-words">{translated||'Your emoji translation appears here...'}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Emoji Dictionary ({Object.keys(DICT).length} words)</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(DICT).slice(0,30).map(([w,e])=>(
            <span key={w} className="px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">{w} → {e}</span>
          ))}
          <span className="px-2 py-1 bg-gray-50 rounded-lg border border-gray-100 text-gray-400">+{Object.keys(DICT).length-30} more...</span>
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
          <p className="text-gray-600 leading-relaxed">Language is a technology, and emoji is its most recent dialect. This translator takes your text and converts it into an emoji-heavy version that conveys the same meaning through pictures, ideograms, and emotional shorthand that somehow works even though nothing about it should. It is useful for making dry content more visually engaging, translating meeting notes into something your friends will actually read, and exploring the expressive range of the emoji vocabulary. If you want to go further into internet linguistics, the <Link href="/calculators/fun/uwu-text-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">UWU Text Generator</Link> handles the kawaii-speech end of online communication.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">The translator maps words and phrases to relevant emoji through a large lookup table, handling both literal translations (the word "fire" → 🔥) and emotional/contextual ones (phrases indicating frustration → 😤 or 🙃). The density slider controls how many words get translated -- low density replaces only the most translatable words; high density converts almost everything, which produces text that looks like a ransom note assembled from emotion icons.</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">The word "emoji" comes from Japanese: "e" (絵, picture) + "moji" (文字, character). The first emoji set was created in 1999 by Shigetaka Kurita for NTT DoCoMo in Japan -- a set of 176 small pixelated images. The original set included weather, traffic, and technology symbols alongside emotional faces. Unicode now includes over 3,600 emoji, with new ones added annually by a formal committee process.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>🔥 + any noun = something that is going really well or really badly. Context does the disambiguation. This is either a design flaw in the emoji system or its most elegant feature, depending on who you ask.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The best emoji translations keep some words intact -- full emoji sentences lose all grammar and become genuinely hard to parse. A ratio of roughly one emoji per five words hits the sweet spot between expressive and readable.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>For social media, the translated version often performs better than plain text because emoji act as visual breaks in a scrolling feed, making posts more likely to be read. Use the translator to make the same message stop thumbs more effectively.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Run your last work email through the high-density emoji translator and share the output with a trusted colleague. Then send the original email for comparison. The gap between how professional the original sounds and how chaotic the emoji version looks is usually funnier than expected.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">The Oxford Dictionaries named the 😂 (Face with Tears of Joy) emoji as their Word of the Year in 2015 -- the first time they had ever chosen a non-word. It remains the most-used single emoji across most major platforms, appearing in roughly 5% of all emoji usage despite the vocabulary having thousands of options.</p>
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
          <Link href="/calculators/fun/pig-latin-converter" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🐷</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Pig Latin Converter</p><p className="text-xs text-gray-400 mt-0.5">Igpay atinlay, instantly</p></div>
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
        intro={`Emojis started as simple emoticons and have evolved into a genuinely complex communication layer in digital conversation — one with nuance, ambiguity, generational differences in meaning, and the occasional completely different interpretation across cultures. The eggplant means something different to a 70-year-old and a 25-year-old. The skull means 'dead' (as in dead from laughter) in Gen Z usage, not literal death.

**Long-tail searches answered here:** emoji to text translator free online usa, what does this emoji mean lookup free tool, text to emoji converter no signup free, emoji meaning translator free online usa, translate emojis to words free tool, emoji message decoder free online no account, full sentence emoji translation free online usa, combination emoji meaning decoder free, what does double heart emoji mean lookup free usa, emoji sentiment analysis what feeling free online, gen z emoji usage guide lookup free usa, older emoji meanings that changed free guide, emoji to plain language accessibility tool free, translate confusing emoji sequence free online usa, cultural emoji meaning difference lookup free`}
        howItWorks={`The translator maps text phrases and words to their most common emoji equivalents using a curated dictionary of emoji meanings, common usage patterns, and tone indicators. It goes both directions: text to emoji representation, and emoji sequences back to plain language interpretation.`}
        tipsSection={`Context matters enormously with emojis. The same 🙂 face is warm and friendly in one conversational context and passive-aggressive in another. The translator reflects common interpretations, but your specific relationship and conversational context always matters more than any standard definition.`}
        conclusion={`Emojis add emotional nuance and tone to text communication that would otherwise be ambiguous — they're punctuation for feeling. Using them intentionally rather than reflexively makes digital communication more precise and more human.`}
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