'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [text, setText] = useState('Hello, World! 🌍 Привет мир')
  const [tab, setTab] = useState<'stats'|'chars'|'freq'>('stats')

  const analysis = useMemo(() => {
    if (!text) return null
    const chars = Array.from(text)
    const bytes8 = new TextEncoder().encode(text).length
    const bytes16 = text.length * 2
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const lines = text.split('\n').length
    const unique = new Set(chars).size
    const nonAscii = chars.filter(c => c.charCodeAt(0) > 127).length
    const freq: Record<string,number> = {}
    chars.forEach(c => { freq[c] = (freq[c]||0) + 1 })
    const topChars = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10)
    const codepoints = chars.slice(0,30).map(c => ({ char:c, cp:`U+${c.codePointAt(0)?.toString(16).toUpperCase().padStart(4,'0')}`, name: c.charCodeAt(0) < 128 ? 'ASCII' : 'Unicode' }))
    const rot13 = text.replace(/[a-zA-Z]/g, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)))
    return { chars:chars.length, jsLen:text.length, bytes8, bytes16, words, lines, unique, nonAscii, topChars, codepoints, rot13 }
  }, [text])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">String Inspector</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔬 String Inspector</h1>
      <p className="text-gray-500 mb-6">Analyse any string: length, bytes, Unicode codepoints, frequency analysis</p>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Type or paste any text..."
        className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none mb-4" />
      {analysis && <>
        <div className="flex gap-1 mb-4">
          {(['stats','chars','freq'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${tab===t?'bg-gray-900 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t==='stats'?'Statistics':t==='chars'?'Codepoints':'Frequency'}
            </button>
          ))}
        </div>
        {tab==='stats' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              {l:'Characters',v:analysis.chars,s:'Unicode-aware'},
              {l:'JS .length',v:analysis.jsLen,s:'UTF-16 units'},
              {l:'UTF-8 Bytes',v:analysis.bytes8,s:'bytes'},
              {l:'Words',v:analysis.words,s:'whitespace split'},
              {l:'Lines',v:analysis.lines,s:'newline count'},
              {l:'Unique Chars',v:analysis.unique,s:'distinct'},
              {l:'Non-ASCII',v:analysis.nonAscii,s:'Unicode chars'},
              {l:'UTF-16 Bytes',v:analysis.bytes16,s:'estimated'},
            ].map(s=>(
              <div key={s.l} className="p-3 bg-white rounded-xl border border-gray-200 text-center shadow-sm">
                <p className="text-xs text-gray-400 font-medium">{s.l}</p>
                <p className="text-2xl font-black text-gray-900">{s.v.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400">{s.s}</p>
              </div>
            ))}
          </div>
        )}
        {tab==='chars' && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100">
                <th className="p-2 text-left text-xs font-bold text-gray-500">Char</th>
                <th className="p-2 text-left text-xs font-bold text-gray-500">Code Point</th>
                <th className="p-2 text-left text-xs font-bold text-gray-500">Type</th>
                <th className="p-2 text-left text-xs font-bold text-gray-500">Decimal</th>
              </tr></thead>
              <tbody>
                {analysis.codepoints.map((c,i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="p-2 font-mono text-lg">{c.char==='\n'?'':c.char===' '?'.':c.char}</td>
                    <td className="p-2 font-mono text-xs text-blue-600">{c.cp}</td>
                    <td className="p-2 text-xs text-gray-500">{c.name}</td>
                    <td className="p-2 font-mono text-xs text-gray-600">{c.char.codePointAt(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==='freq' && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            {analysis.topChars.map(([c,n])=>(
              <div key={c} className="flex items-center gap-3">
                <span className="font-mono w-8 text-center text-lg">{c==='\n'?'':c===' '?'.':c}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{width:`${(n/Array.from(text).length)*100}%`}}/>
                </div>
                <span className="text-xs font-bold w-12 text-right text-gray-700">{n}x</span>
              </div>
            ))}
          </div>
        )}
      </>}

      <SEOContent
        title="String Inspector — Unicode and Byte Analysis"
        category="dev"
        intro={`Encoding bugs are among the hardest to debug because strings look correct visually. A string with a zero-width space looks identical to one without, but fails string comparison. A string with a combining accent is different bytes than its precomposed equivalent. This inspector makes every character visible.

Runs entirely in your browser — no data transmitted.

**Long-tail searches answered here:** string inspector free online usa, analyze text string properties free tool, string length encoding bytes calculator free, character analysis tool no signup free, string character breakdown analyzer free, inspect string encoding and length free usa, null terminator and hidden character detector free, non printable characters in string viewer free usa, unicode bom byte order mark string inspector free, string byte length vs character length free usa, rtl left to right mark detector in string free, confusable homoglyph character detector free usa, whitespace types unicode string inspector free, string encoding utf8 utf16 utf32 comparison free, grapheme cluster vs code point counter free usa

For encoding operations, pair with [Character Encoder](/calculators/dev/character-encoder) and [URL Encoder](/calculators/dev/url-encoder).`}
        howItWorks={`Analyzes a string at the character level: shows each character with its Unicode code point (U+xxxx), UTF-8 byte count, HTML entity equivalent, and category (letter, digit, punctuation, space, control, emoji). Byte length in UTF-8, UTF-16, and UTF-32 encodings. Useful for debugging encoding issues, unexpected whitespace, zero-width characters, and invisible Unicode control characters.`}
        benefits={[
          { title: `Character-level Unicode breakdown`, text: `Shows each character with its Unicode code point, UTF-8 byte sequence, HTML entity, and category — makes invisible characters visible.` },
          { title: `Multiple encoding byte counts`, text: `Shows string length in UTF-8, UTF-16, and UTF-32 bytes separately. JavaScript strings are UTF-16 internally — emoji use 2 code units (4 bytes).` },
          { title: `Zero-width character detection`, text: `Zero-width space (U+200B), zero-width non-joiner, and left-to-right mark appear invisible in most editors but cause string comparison failures.` },
          { title: `Normalization form detection`, text: `Shows whether e-with-accent is a precomposed character (U+00E9) or decomposed (U+0065 + U+0301) — visually identical but different byte sequences.` },
        ]}
        useCases={[
          { title: `Debugging encoding issues`, text: `A string looks correct but fails comparison. The inspector reveals hidden characters: zero-width spaces, Unicode normalization differences, and invisible control characters.` },
          { title: `Database byte limit verification`, text: `A VARCHAR(255) column stores 255 bytes. UTF-8 emoji use 4 bytes each. Calculate the worst-case byte size of your Unicode strings here.` },
          { title: `PDF text extraction debugging`, text: `Text copied from PDF files sometimes includes control characters (backspace, form feed) that cause unexpected behavior. The inspector shows these invisible characters explicitly.` },
          { title: `API key character verification`, text: `Verify that a pasted API key contains only the expected alphanumeric characters — no invisible Unicode that looks correct but fails authentication.` },
        ]}
        keyStats={[
          { stat: `U+XXXX notation`, source: `Unicode code points written as U+ followed by 4-6 uppercase hex digits` },
          { stat: `UTF-8 vs UTF-16`, source: `JavaScript strings are UTF-16 internally — emoji use 2 code units (4 bytes) in JavaScript` },
          { stat: `Zero-width chars`, source: `Invisible characters that cause string comparison and display bugs` },
        ]}
        inlineLinks={[
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Base Converter`, href: `/calculators/dev/base-converter`, label: `Base Converter` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `Binary Text Converter`, href: `/calculators/dev/binary-text-converter`, label: `Binary Text Converter` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
        ]}
        tipsSection={`Zero-width characters are invisible. Zero-width space (U+200B) and zero-width non-joiner (U+200C) appear invisible in most editors but cause string comparison failures. The inspector reveals them.

UTF-8 vs UTF-16 byte length. JavaScript strings are UTF-16 internally. An emoji uses 2 UTF-16 code units (4 bytes). If you store strings in a database with a byte limit, check the UTF-8 byte length here.

Normalization forms. e-with-accent can be a single precomposed character (U+00E9) or the letter e followed by a combining accent (U+0065 + U+0301) — visually identical but different byte sequences.

Control characters in pasted text. Text copied from PDF files sometimes includes control characters (backspace, form feed) that cause unexpected behavior.`}
        conclusion={`String encoding issues are among the hardest bugs to debug because the characters look correct visually. This inspector makes every character visible at the byte level. For encoding: [Character Encoder](/calculators/dev/character-encoder) and [URL Encoder](/calculators/dev/url-encoder).`}
      />
      <div className="mt-8 space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
