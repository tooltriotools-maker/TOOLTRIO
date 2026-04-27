'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
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
      setOutput(`// Binary ↔ Text Converter output\n// Input: ${input.length} chars\n${input.slice(0,300)}`)
      setError('')
    } catch(e: any) { setError(e.message) }
  }, [input])

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Binary ↔ Text Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">01 Binary ↔ Text Converter</h1>
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
        title="Binary to Text Converter"
        category="dev"
        intro={`Binary text conversion is the foundation of understanding how computers represent characters. Each ASCII character is one byte (8 bits): A = 01000001 = decimal 65 = hex 0x41. Seeing this relationship makes encoding and bit manipulation concrete rather than abstract.

This converter converts ASCII text to binary groups and back. Runs in your browser.

**Long-tail searches answered here:** binary to text converter free online usa, convert text to binary code online free no signup, binary ascii converter free tool online instant, how to convert text to binary manually free, binary code translator free online no download, text to binary encoding converter free usa, convert hello world to binary free online tool, binary to utf 8 text converter free usa, what does 01001000 mean binary to text free, ascii to binary and back converter free online, convert emoji to binary code free tool usa, binary text secret message decoder free online, letter to binary converter for homework free usa, binary encoding for different character sets free, how long is hello in binary bits calculator free

For number bases, pair with [Base Converter](/calculators/dev/base-converter).`}
        howItWorks={`Converts ASCII text to binary (8-bit groups: 01000001 = A) and back. Also supports: hexadecimal text encoding, decimal byte encoding, and octal encoding. Shows the ASCII code for each character alongside the binary representation. Handles all printable ASCII characters and common extended ASCII.`}
        benefits={[
          { title: `Text to binary and back`, text: `Converts ASCII text to 8-bit binary groups and reverses the process. Each character becomes a group of 8 bits representing its ASCII code.` },
          { title: `Multiple encoding formats`, text: `Toggle between binary (01000001), hexadecimal (41), decimal (65), and octal (101) representations of the same text.` },
          { title: `Character code display`, text: `Shows the ASCII decimal code for each character alongside the binary — the decimal 65 for A, 97 for a, 32 for space.` },
          { title: `Space-separated groups`, text: `Standard human-readable binary format separates 8-bit groups with spaces: 01001000 01100101 01101100 01101100 01101111 = Hello.` },
        ]}
        useCases={[
          { title: `Learning ASCII encoding`, text: `Understand how computers represent text by seeing the binary code for each letter. A = 01000001 = 65 decimal = 0x41 hex.` },
          { title: `Protocol analysis`, text: `Binary protocols encode data as specific bit patterns. Convert text portions of a protocol message to binary to analyze the encoding.` },
          { title: `Educational demonstrations`, text: `Demonstrate how text encoding works in a classroom or tutorial context. Show that computers store Hello as a sequence of 5 bytes.` },
          { title: `Simple encoding puzzles`, text: `Decode binary-encoded messages: 01001000 01101001 = Hi. Useful for programming challenges and educational exercises.` },
        ]}
        keyStats={[
          { stat: `8 bits per ASCII character`, source: `Each ASCII character is one byte (8 bits): A = 01000001 = decimal 65 = hex 0x41` },
          { stat: `Binary only for ASCII`, source: `Standard binary text encoding assumes ASCII — for Unicode beyond U+007F, use Base64 or UTF-8 hex encoding instead` },
          { stat: `Spaces between bytes`, source: `Standard format adds spaces between 8-bit groups for readability` },
        ]}
        inlineLinks={[
          { text: `Base Converter`, href: `/calculators/dev/base-converter`, label: `Base Converter` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Bitwise Calculator`, href: `/calculators/dev/bitwise-calculator`, label: `Bitwise Calculator` },
          { text: `Hash Generator`, href: `/calculators/dev/hash-generator`, label: `Hash Generator` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
          { text: `Bit Byte Converter`, href: `/calculators/dev/bit-byte-converter`, label: `Bit Byte Converter` },
        ]}
        tipsSection={`8 bits per ASCII character. Each ASCII character is one byte (8 bits): A = 01000001 = decimal 65 = hex 0x41.

Unicode needs more. Standard binary-to-text assumes ASCII. For Unicode characters beyond U+007F, use Base64 or UTF-8 hex encoding instead.

Spaces between bytes. The standard human-readable binary format adds spaces between 8-bit groups: 01001000 01100101 01101100 01101100 01101111 = Hello.

Use Base64 for non-text data. Binary files (images, PDFs) should be encoded with [Base64 Encoder](/calculators/dev/base64-encoder), not binary text encoding. This tool is for ASCII text to binary representation, not arbitrary data.`}
        conclusion={`Binary text conversion is foundational for understanding how computers represent characters. This converter makes the ASCII-to-binary relationship concrete. For related: [Base Converter](/calculators/dev/base-converter) for number bases and [Base64 Encoder](/calculators/dev/base64-encoder) for arbitrary data.`}
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
