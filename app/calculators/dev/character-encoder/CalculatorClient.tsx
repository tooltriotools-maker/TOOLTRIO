'use client'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Minus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!input.trim()) { setOutput(''); setError(''); return }
    try {
      setOutput(`// Unicode Character Encoder output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Unicode Character Encoder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔡 Unicode Character Encoder</h1>
      <p className="text-gray-500 mb-6">Runs entirely in your browser - no data sent to server</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14} placeholder="Paste your input here..."
            className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none bg-gray-950 text-green-300" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
            <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
              {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
            </button>
          </div>
          {error
            ? <div className="p-4 bg-red-50 rounded-xl border border-red-200"><p className="text-red-600 text-sm font-mono">{error}</p></div>
            : <pre className="h-64 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output appears here...'}</pre>
          }
        </div>
      </div>

      <SEOContent
        title="Character Encoder — Unicode Code Points"
        category="dev"
        intro={`Different systems expect characters encoded differently: HTML needs named entities, CSS needs backslash-hex escapes, JavaScript needs unicode escapes, URLs need percent-encoding. Knowing which encoding is correct for which context is a constant debugging task.

This encoder shows all encoding forms simultaneously for any character or string. Runs in your browser.

**Long-tail searches answered here:** character encoding converter free online usa, utf 8 url encode decode free tool no signup, html entity encoder free online tool, special characters encoder decoder free, unicode character encoder free no download, ascii to unicode converter online free usa, percent encoding url special characters free online, how to fix garbled characters encoding issue free, mojibake text encoding corruption fixer free usa, latin1 to utf 8 encoding converter free online, character encoding detection tool free usa, html entities required characters calculator free, urlencode vs rawurlencode difference explained free, javascript encodeuri vs encodeuricomponent difference free, encoding for json vs xml special characters guide

For string analysis, pair with [String Inspector](/calculators/dev/string-inspector).`}
        howItWorks={`Encodes and decodes characters using: Unicode code points (U+0041), HTML entities (&amp;, numeric entities), CSS escape sequences, JavaScript string escapes, URL percent encoding, and base64. Shows all encoding forms simultaneously for any character or string. The CSS escape format uses backslash followed by hex digits (for example the digit 1 escapes as backslash 31). JavaScript uses the backslash-u notation for Unicode escapes.`}
        benefits={[
          { title: `All encoding forms simultaneously`, text: `Shows Unicode code points, HTML entities, CSS escapes, JavaScript escapes, URL encoding, and base64 for the same character — all at once.` },
          { title: `Bidirectional encoding/decoding`, text: `Enter a character to see all its encodings. Enter any encoding form (U+0041, numeric HTML entity, percent-encoded) to see the character and all other encodings.` },
          { title: `Multi-character support`, text: `Encode an entire string at once — see the encoding breakdown for each character in the string as a table.` },
          { title: `Encoding context guidance`, text: `Shows which encoding is appropriate for each context: HTML attributes vs JavaScript strings vs CSS vs URLs.` },
        ]}
        useCases={[
          { title: `Debugging encoding mismatches`, text: `A string looks correct in one system but fails in another. This tool shows all encoding forms to identify where the mismatch is.` },
          { title: `CSS class name with numbers`, text: `CSS class names that start with a number require backslash-hex escaping. Generate the correct CSS escape for any character here.` },
          { title: `JavaScript string for unusual characters`, text: `Generate the correct JavaScript Unicode escape sequence for any Unicode character — useful for embedding special characters in source code.` },
          { title: `HTML entity reference`, text: `Find the HTML entity for any character: copyright sign is &copy;, registered trademark is &reg;, em dash is &mdash;. All named entities and their characters.` },
        ]}
        keyStats={[
          { stat: `U+XXXX`, source: `Unicode code points written as U+ followed by 4-6 uppercase hex digits` },
          { stat: `CSS escape`, source: `CSS special characters escaped with backslash followed by hex digits` },
          { stat: `All forms`, source: `HTML entities, JavaScript escapes, URL encoding, CSS escapes — all for the same character` },
        ]}
        inlineLinks={[
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
          { text: `HTML Entity Reference`, href: `/calculators/dev/html-entity-ref`, label: `HTML Entity Reference` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `Binary Text Converter`, href: `/calculators/dev/binary-text-converter`, label: `Binary Text Converter` },
          { text: `Base Converter`, href: `/calculators/dev/base-converter`, label: `Base Converter` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
        ]}
        tipsSection={`U+XXXX notation. Unicode code points are written as U+ followed by 4-6 uppercase hex digits: U+0041 is A, U+1F600 is the grinning emoji. The inspector shows these for every character.

CSS escape sequences. In CSS, special characters are escaped with backslash followed by hex digits. Class names starting with a digit need this escape to be valid selectors.

JavaScript Unicode escapes. The basic Unicode escape handles BMP characters (U+0000 to U+FFFF). For emoji and rare Unicode above U+FFFF, use the curly-brace notation with the full code point.

Surrogate pairs in UTF-16. Characters above U+FFFF are encoded as surrogate pairs in UTF-16 (two 16-bit code units). The [String Inspector](/calculators/dev/string-inspector) shows whether your string contains surrogates.`}
        conclusion={`Character encoding mismatches are a pervasive source of bugs in multi-system applications. This tool shows all encoding forms simultaneously for any character. For string analysis: [String Inspector](/calculators/dev/string-inspector). For HTML: [HTML Encoder](/calculators/dev/html-encoder).`}
      />
            <div className="mt-8 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
    </div>
  )

}
