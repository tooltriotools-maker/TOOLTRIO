'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {

  const [input, setInput] = useState('255')
  const [fromBase, setFromBase] = useState('10')
  const [copiedKey, setCopiedKey] = useState('')

  const copyVal = (key: string, val: string) => {
    navigator.clipboard.writeText(val)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(''), 1500)
  }

  const result = useMemo(() => {
    try {
      const n = parseInt(input.trim().replace(/\s/g, ''), parseInt(fromBase))
      if (isNaN(n)) return null
      const bin = Math.abs(n).toString(2)
      const oct = n.toString(8)
      const dec = n.toString(10)
      const hex = n.toString(16).toUpperCase()
      const grouped = bin.padStart(Math.ceil(bin.length / 4) * 4, '0').match(/.{4}/g)?.join(' ') || bin
      const ascii = n >= 32 && n <= 126 ? String.fromCharCode(n) : n >= 0 && n <= 31 ? `Control` : '-'
      return { bin, oct, dec, hex, grouped, ascii, n }
    } catch { return null }
  }, [input, fromBase])

  const outputs = result ? [
    { label: 'Binary (Base 2)',     prefix: '0b', value: result.bin, color: 'bg-blue-50 border-blue-200 text-blue-900' },
    { label: 'Octal (Base 8)',      prefix: '0o', value: result.oct, color: 'bg-purple-50 border-purple-200 text-purple-900' },
    { label: 'Decimal (Base 10)',   prefix: '',   value: result.dec, color: 'bg-green-50 border-green-200 text-green-900' },
    { label: 'Hexadecimal (Base 16)', prefix: '0x', value: result.hex, color: 'bg-orange-50 border-orange-200 text-orange-900' },
  ] : []

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Base Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚡ Number Base Converter</h1>
      <p className="text-gray-500 mb-8">Binary - Octal - Decimal - Hex - instant conversion</p>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Input Value</label>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter number..."
              className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 text-xl font-mono font-bold focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">From Base</label>
            <select value={fromBase} onChange={e => setFromBase(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-3 py-3 font-bold text-gray-700 focus:outline-none focus:border-green-400 bg-white h-full">
              <option value="2">Binary (2)</option>
              <option value="8">Octal (8)</option>
              <option value="10">Decimal (10)</option>
              <option value="16">Hex (16)</option>
            </select>
          </div>
        </div>

        {result ? (
          <div className="space-y-3">
            {outputs.map(r => (
              <div key={r.label} className={`flex items-center justify-between p-4 rounded-xl border-2 ${r.color}`}>
                <div>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-wide">{r.label}</p>
                  <p className="text-2xl font-black font-mono mt-0.5">{r.prefix}{r.value}</p>
                </div>
                <button onClick={() => copyVal(r.label, r.prefix + r.value)} className="p-2 rounded-lg hover:bg-white/50">
                  {copiedKey === r.label ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 opacity-40" />}
                </button>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">Binary (grouped)</p>
                <p className="font-mono font-bold text-gray-800 mt-1">{result.grouped}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">ASCII char (decimal {result.dec})</p>
                <p className="font-mono font-bold text-gray-800 mt-1 text-xl">{result.ascii}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl">Enter a valid number above</div>
        )}
      </div>


      <SEOContent
        title="Number Base Converter — Binary Hex Decimal Octal"
        category="dev"
        intro={`Binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16) are the four number bases that every developer needs regularly — for hex color codes, binary flags, file permissions, and IP addresses. Converting between them manually is error-prone.

This converter shows all bases simultaneously as you type. Runs in your browser.

**Long-tail searches answered here:** number base converter free online usa, binary decimal hex octal converter free no signup, convert binary to decimal online free tool, hexadecimal to decimal converter free instant, base 2 to base 10 converter free tool online, number system converter no download free usa, base 16 to base 10 hex to decimal converter free, octal to binary converter and back free online usa, how to convert number systems by hand free guide, two complement representation calculator free usa, base 8 octal to hexadecimal converter free, programming number base conversion tool free, base 64 encoded to base 10 number calculator free, floating point binary representation calculator usa free, signed vs unsigned integer base conversion calculator

For bitwise operations, pair with [Bitwise Calculator](/calculators/dev/bitwise-calculator).`}
        howItWorks={`Converts between decimal (base 10), binary (base 2), octal (base 8), hexadecimal (base 16), and any custom base (2-36). All bases update simultaneously as you type in any field. Supports negative numbers and fractional values. Shows the full working for the conversion (division/multiplication steps) as an educational reference.`}
        benefits={[
          { title: `All bases update simultaneously`, text: `Type in any base and all others update instantly. Enter hex FF and see decimal 255, binary 11111111, and octal 377 at the same time.` },
          { title: `Custom base support`, text: `Convert to any base from 2 to 36. Base 32 (Crockford encoding), base 36 (URL-safe IDs), and other non-standard bases are all supported.` },
          { title: `Conversion steps shown`, text: `Shows the division and multiplication steps for the conversion — useful for learning and verifying the arithmetic manually.` },
          { title: `Fractional value support`, text: `Convert fractional numbers (3.14159...) between bases — not just integers.` },
        ]}
        useCases={[
          { title: `CSS color debugging`, text: `CSS color #FF0000 is three 8-bit hex numbers: R=255, G=0, B=0. Convert each channel here to understand the decimal values.` },
          { title: `chmod octal verification`, text: `File permissions use octal: chmod 755 means owner=7 (rwx), group=5 (r-x), others=5 (r-x). Verify the decimal equivalent here.` },
          { title: `Network protocol bit fields`, text: `Network protocols use bit fields encoded as hex values. Convert to binary to see the individual flag bits.` },
          { title: `Database ID encoding`, text: `Convert between decimal database IDs and hex encoded versions for URL-safe compact representations.` },
        ]}
        keyStats={[
          { stat: `0x prefix for hex`, source: `Hexadecimal numbers in code use the 0x prefix: 0xFF = 255. Binary uses 0b: 0b1111 = 15` },
          { stat: `All bases simultaneous`, source: `Type in one base and all others update — no need to specify the conversion direction` },
          { stat: `Base 2-36`, source: `Covers standard bases (2, 8, 10, 16) and custom bases up to 36 (using A-Z for digits 10-35)` },
        ]}
        inlineLinks={[
          { text: `Bitwise Calculator`, href: `/calculators/dev/bitwise-calculator`, label: `Bitwise Calculator` },
          { text: `Bit Byte Converter`, href: `/calculators/dev/bit-byte-converter`, label: `Bit Byte Converter` },
          { text: `Binary Text Converter`, href: `/calculators/dev/binary-text-converter`, label: `Binary Text Converter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
          { text: `Character Encoder`, href: `/calculators/dev/character-encoder`, label: `Character Encoder` },
          { text: `chmod Calculator`, href: `/calculators/dev/chmod-calculator`, label: `chmod Calculator` },
          { text: `CIDR Calculator`, href: `/calculators/dev/cidr-calculator`, label: `CIDR Calculator` },
        ]}
        tipsSection={`Hex prefix 0x. Hexadecimal numbers in code use the 0x prefix: 0xFF = 255. Binary uses 0b: 0b1111 = 15. The converter accepts both prefixed and unprefixed input.

Bitwise operations in hex. Bitwise operations (AND, OR, XOR) are most readable in hex. Use [Bitwise Calculator](/calculators/dev/bitwise-calculator) alongside this converter for bitmasking work.

Color codes are hex. CSS color #FF0000 is three 8-bit hex numbers: R=255, G=0, B=0. Convert each channel here.

chmod octal. File permissions use octal: chmod 755 means owner=7 (rwx), group=5 (r-x), others=5 (r-x). Use this with [chmod Calculator](/calculators/dev/chmod-calculator).`}
        conclusion={`Base conversion is a constant need when working with hex color codes, binary protocols, file permissions, and IP addresses. This converter handles all common bases simultaneously. For bitwise operations: [Bitwise Calculator](/calculators/dev/bitwise-calculator).`}
      />
      <div className="space-y-3">
        {faqs.map(f => (
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )

}
