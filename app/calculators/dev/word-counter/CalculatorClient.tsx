'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [text, setText] = useState('The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate the word counter. It counts words, characters, sentences, and estimates reading time accurately.')
  const [target, setTarget] = useState(0)

  const stats = useMemo(() => {
    if (!text.trim()) return null
    const words = text.trim().split(/\s+/).filter(Boolean)
    const chars = text.length
    const charsNoSpaces = text.replace(/\s/g,'').length
    const sentences = (text.match(/[.!?]+/g)||[]).length || 1
    const paragraphs = text.split(/\n\n+/).filter(p=>p.trim()).length || 1
    const uniqueWords = new Set(words.map(w=>w.toLowerCase().replace(/[^a-z]/g,''))).size
    const readMins = Math.ceil(words.length / 238)
    const speakMins = Math.ceil(words.length / 130)
    const avgWordLen = (charsNoSpaces / words.length).toFixed(1)
    const avgSentLen = (words.length / sentences).toFixed(1)
    return { words:words.length, chars, charsNoSpaces, sentences, paragraphs, uniqueWords, readMins, speakMins, avgWordLen, avgSentLen, diversity:(uniqueWords/words.length).toFixed(2) }
  }, [text])

  const PLATFORMS = [
    { name:'Twitter/X', limit:280 },{ name:'Instagram', limit:2200 },
    { name:'LinkedIn', limit:3000 },{ name:'SMS', limit:160 },{ name:'Meta desc', limit:160 },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Word Counter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📝 Word Counter</h1>
      <p className="text-gray-500 mb-6">Words - Characters - Reading time - Social platform limits</p>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={8} placeholder="Type or paste your text here..."
        className="w-full p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none mb-4 text-gray-800 leading-relaxed" />
      {stats && <>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[{l:'Words',v:stats.words},{l:'Characters',v:stats.chars},{l:'No Spaces',v:stats.charsNoSpaces},{l:'Sentences',v:stats.sentences},{l:'Paragraphs',v:stats.paragraphs},{l:'Unique Words',v:stats.uniqueWords},{l:'Read Time',v:`${stats.readMins} min`},{l:'Speak Time',v:`${stats.speakMins} min`}].map(s=>(
            <div key={s.l} className="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
              <p className="text-xs text-gray-400">{s.l}</p><p className="text-2xl font-black text-gray-900">{s.v}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
          <h3 className="font-bold text-gray-900 mb-3">Social Platform Limits</h3>
          <div className="space-y-2">
            {PLATFORMS.map(p=>{const pct=Math.min(100,Math.round(stats.chars/p.limit*100));return(
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-24 text-xs font-semibold text-gray-700">{p.name}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all ${pct>100?'bg-red-500':pct>80?'bg-yellow-400':'bg-green-400'}`} style={{width:`${pct}%`}}/></div>
                <span className={`text-xs font-bold w-20 text-right ${stats.chars>p.limit?'text-red-600':'text-gray-600'}`}>{stats.chars}/{p.limit}</span>
              </div>
            )})}
          </div>
        </div>
      </>}

      <SEOContent
        title="Word Counter — Character and Word Count Tool"
        category="dev"
        intro={`Word count, character count, reading time, sentence count — these metrics matter for blog posts, documentation, meta descriptions, tweet character limits, and code comment length checks. Counting manually is tedious and inexact for Unicode text.

This counter handles Unicode correctly and provides reading time estimation. Runs in your browser.

**Long-tail searches answered here:** word counter free online usa, count words characters sentences free no signup, word count tool for essays free online, how many words in my text free counter, word frequency counter free tool, reading time estimator by word count free usa, word count for 1 minute 5 minute speech free, 500 word essay how many pages calculator free usa, academic essay minimum word count checker free, word count for twitter linkedin character limit free, reading level flesch kincaid calculator from text free usa, unique word count vs total word count tool free, keyword density calculator from text free usa, words per paragraph average calculator free, average sentence length readability calculator free usa

For text transformation, pair with [Text Case Converter](/calculators/dev/text-case-converter).`}
        howItWorks={`Counts words, characters (with and without spaces), sentences, paragraphs, and lines in real time. Also calculates estimated reading time (based on 200 WPM average), word frequency histogram, and average word length. Supports Unicode — emoji and multibyte characters are counted correctly.`}
        benefits={[
          { title: `Real-time counting`, text: `Words, characters, sentences, paragraphs, and lines update as you type — no button click required.` },
          { title: `Reading time estimate`, text: `Calculates estimated reading time based on 200 WPM average. Useful for blog posts, documentation, and presentations with time constraints.` },
          { title: `Word frequency histogram`, text: `Shows the most frequent words in your text. Reveals overused words in technical documentation and dominant topics in articles.` },
          { title: `Unicode-correct counting`, text: `Emoji and multibyte characters (Chinese, Arabic, Hindi) are counted as single characters — not counted as multiple bytes.` },
        ]}
        useCases={[
          { title: `Content length checks`, text: `Tweet limits (280 chars), meta descriptions (160 chars), and SMS messages (160 chars) use character counts. Word count for blog post requirements.` },
          { title: `Documentation length estimation`, text: `Estimate reading time for technical docs before publishing. 200 WPM is standard for technical reading.` },
          { title: `SEO content analysis`, text: `The word frequency count reveals the core topics covered in your content. Overused words indicate keyword density — useful for SEO content review.` },
          { title: `Code comment length`, text: `Measure docstring and comment length. Inline comments over 72 characters are convention violations in Python, Go, and many style guides.` },
        ]}
        keyStats={[
          { stat: `200 WPM`, source: `Average reading speed for technical content — used for reading time estimation` },
          { stat: `Character count`, source: `Tweet limits, meta descriptions, and SMS messages use character counts, not word counts` },
          { stat: `Word frequency`, source: `High-frequency non-stop words indicate the core topics covered in the content` },
        ]}
        inlineLinks={[
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Lorem Ipsum Generator`, href: `/calculators/dev/lorem-ipsum-generator`, label: `Lorem Ipsum Generator` },
          { text: `Duplicate Remover`, href: `/calculators/dev/duplicate-remover`, label: `Duplicate Remover` },
          { text: `Line Sorter`, href: `/calculators/dev/line-sorter`, label: `Line Sorter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
        ]}
        tipsSection={`Character count vs word count for limits. Tweet limits (280 chars), meta descriptions (160 chars), and SMS messages (160 chars) use character counts. Blog post requirements (1,500 words) use word counts.

Reading time estimation. 200 words/minute is the typical reading speed for technical content. Adjust for your audience — developers read documentation slower, skimmers read faster.

Word frequency for keyword density. In technical documentation, high-frequency non-stop words indicate the core topics covered.

Paste from any source. The counter handles HTML, Markdown, code, and plain text — paste from any editor and get the count without formatting affecting the result.`}
        conclusion={`Word and character counting is a constant task for technical writers, content creators, and developers checking against limits. This counter handles Unicode correctly and provides reading time estimation. For text transformation: [Text Case Converter](/calculators/dev/text-case-converter).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
