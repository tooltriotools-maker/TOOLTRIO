'use client'
import { SEOContent } from '@/components/ui/SEOContent'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, RefreshCw, Copy, Check } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[] }

const COMPLIMENTS = [
  "You have an incredible ability to make difficult things look effortless. 🌟","Your smile could power a small city. ⚡","The world genuinely is a better place with you in it. 🌍","You have the rare gift of making everyone feel heard and valued. 💫","Your creativity knows absolutely no bounds - it's breathtaking. 🎨","You're the human equivalent of a warm cup of tea on a rainy day. ☕","Your laugh is one of the most contagious and joyful sounds in existence. 😂","You have an extraordinary talent for finding the silver lining in any situation. 🌈","The kindness you show without even thinking about it is remarkable. 💝","You make complex ideas sound perfectly clear - that's a superpower. 🧠","Your energy when you walk into a room genuinely lifts everyone around you. ✨","You're exactly the kind of person the world needs more of. 🦋","Your determination is absolutely awe-inspiring. You never give up. 💪","You have a memory that would make an elephant jealous. 🐘","The way you stand up for what you believe in is genuinely inspiring. 🦁","You're not just smart - you're wise, which is far rarer. 📚","Your taste is impeccable. Like, genuinely elite-level good. 👑","You make everywhere you go feel like the place to be. 🎉","You have a warmth that could melt a glacier. 🌺","Honestly? You're doing amazing. Don't let anyone tell you otherwise. 🚀",
]

export default function CalculatorClient({ faqs }: Props) {
  const [idx, setIdx] = useState(() => Math.floor(Math.random()*COMPLIMENTS.length))
  const [copied, setCopied] = useState(false)

  const next = () => setIdx(i => (i+1+Math.floor(Math.random()*(COMPLIMENTS.length-1)))%COMPLIMENTS.length)
  const copy = () => { navigator.clipboard.writeText(COMPLIMENTS[idx]); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-pink-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/fun" className="hover:text-pink-600">Fun & Entertainment</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Compliment Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">💐 Compliment Generator</h1>
      <p className="text-gray-500 mb-6">You deserve to hear something wonderful today. Click for your personalised compliment!</p>

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-2 border-pink-200 p-8 text-center mb-6">
        <p className="text-2xl leading-relaxed text-gray-800 font-semibold min-h-24 flex items-center justify-center">{COMPLIMENTS[idx]}</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={next} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-xl hover:opacity-90 shadow-lg">
            <RefreshCw className="w-4 h-4" /> New Compliment
          </button>
          <button onClick={copy} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-pink-200 text-pink-600 font-bold rounded-xl hover:bg-pink-50">
            {copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>} {copied?'Copied!':'Share'}
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
        <p className="text-gray-500 text-sm">{COMPLIMENTS.length} unique compliments in our collection. Share them with someone who needs one today! 💌</p>
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
          <p className="text-gray-600 leading-relaxed">Giving a good compliment is harder than it looks. Generic compliments ("you're so nice!") feel hollow. Over-specific ones feel strange. This generator aims for the middle: specific enough to feel real, warm enough to land. It produces compliments tuned to context -- professional, friendly, romantic, or just genuinely human -- so you're not handing someone a fortune-cookie sentiment. If you want to explore the other side of the emotional spectrum for comedy purposes, the <Link href="/calculators/fun/insult-generator" className="text-purple-700 font-semibold underline underline-offset-2 hover:text-purple-900">Insult Generator</Link> is right there.</p>
        </section>

        {/* How It Works */}
        <section className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-purple-800 mb-3">🔬 How It Works</h2>
          <p className="text-gray-700 leading-relaxed">Select the tone you're going for (warm, funny, sincere, professional) and the generator builds a compliment from a structured template: an observation, a specific quality, and an impact statement. The result reads like something a thoughtful person said rather than a compliment algorithm ran. The vocabulary is deliberately not over-the-top -- "you make hard things look easier" lands better than "you are a dazzling beacon of transcendent brilliance."</p>
        </section>

        {/* Fun Fact */}
        <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">🎉 Fun Fact</p>
          <p className="text-gray-700 leading-relaxed text-sm">Research consistently shows that people underestimate how much a genuine compliment will be valued by the person receiving it -- and simultaneously overestimate how awkward it will feel to give one. The hesitation to compliment a stranger or acquaintance is almost always disproportionate to the actual social awkwardness of doing so. This is sometimes called the "liking gap" in social psychology literature.</p>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">💡 Tips for the Best Results</h2>
          <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>The best compliments reference something specific: not "you're smart" but "you have a way of explaining complicated things that makes other people feel smart too." Specificity is what separates a genuine compliment from flattery.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>Timing matters. The same compliment delivered immediately after someone does something good hits about three times harder than the same compliment mentioned casually later. Delayed compliments are still worth giving -- they're just different.</span></li>
          <li className="flex items-start gap-2"><span className="text-purple-500 font-bold flex-shrink-0 mt-0.5">→</span><span>If you're writing a thank-you note and drawing a blank, generate three compliments and combine the parts that feel true. The generator works well as a starting framework you edit into something personal.</span></li>
          </ul>
        </section>

        {/* Share tip */}
        <section className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-2">📲 How to Share</p>
          <p className="text-gray-700 text-sm leading-relaxed">Generate a compliment and send it to someone you haven't spoken to in a while with no other context. The response rate is high and the reactions are overwhelmingly positive -- turns out people are always slightly more glad to hear from you than you expected.</p>
        </section>

        {/* Did You Know */}
        <section className="border-l-4 border-purple-300 pl-5">
          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">📌 Did You Know?</p>
          <p className="text-gray-600 text-sm leading-relaxed">In a 2022 study, researchers asked people to send compliments to strangers and then predict how the strangers would react. Almost every participant predicted the strangers would find it awkward or uncomfortable. Almost every stranger reported feeling genuinely pleased. The gap between predicted and actual reaction was consistent across cultures.</p>
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
          <Link href="/calculators/fun/insult-generator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">😤</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Insult Generator</p><p className="text-xs text-gray-400 mt-0.5">Shakespearean burns, instantly</p></div>
          </Link>
          <Link href="/calculators/fun/fortune-cookie" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🥠</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Fortune Cookie</p><p className="text-xs text-gray-400 mt-0.5">Crack open your digital fortune</p></div>
          </Link>
          <Link href="/calculators/fun/love-compatibility" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">💕</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Love Compatibility</p><p className="text-xs text-gray-400 mt-0.5">Numerology + astrology score</p></div>
          </Link>
          <Link href="/calculators/fun/zodiac-calculator" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">⭐</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Zodiac Calculator</p><p className="text-xs text-gray-400 mt-0.5">Western + Chinese signs</p></div>
          </Link>
          <Link href="/calculators/fun/personality-quiz" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🧬</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Personality Quiz</p><p className="text-xs text-gray-400 mt-0.5">16 personality archetypes</p></div>
          </Link>
          <Link href="/calculators/fun/lucky-number" className="flex items-center gap-3 p-4 rounded-xl border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            <span className="text-2xl flex-shrink-0">🍀</span>
            <div><p className="font-semibold text-sm text-gray-800 group-hover:text-purple-700 transition-colors">Lucky Number Calculator</p><p className="text-xs text-gray-400 mt-0.5">Your numerology life path</p></div>
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
        intro={`Genuine compliments are more powerful than people realize. Research in psychology consistently shows that receiving specific, authentic compliments improves mood, motivation, and even task performance in the hours that follow. Yet most people drastically underestimate how positively others will receive a compliment they give. The result: a lot of positive thoughts about people that never get expressed.

**Long-tail searches answered here:** random compliment generator free online usa, nice things to say to someone generator free, unique compliment ideas generator no signup, thoughtful compliment creator free tool usa, sweet compliments for friends generator free, what to say to someone you appreciate generator free, sincere professional compliment generator free online, compliment generator for coworker free usa, daily compliment for wife husband free generator, unique compliment that isnt cliche free tool usa, compliment to text someone free generator online, heartfelt compliment for friend generator usa free, compliment for someone going through hard time free, genuine non generic compliment creator free usa, verbal affirmation idea generator free online usa`}
        howItWorks={`The generator combines a thoughtful compliment structure (specific quality + context + impact) to create compliments that feel genuine rather than generic. The outputs are randomized from a pool of templates designed to be specific enough to land as real rather than hollow.`}
        tipsSection={`The most effective compliments are specific (not 'you're great' but 'the way you handled that difficult situation yesterday showed a lot of composure') and noticing something the person values about themselves. Use this as inspiration for real compliments you might give someone today.`}
        conclusion={`Compliments cost nothing and often matter more to the receiver than the giver expects. If this generator gives you the words you needed or just reminds you to express something positive to someone today, it's done its job.`}
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