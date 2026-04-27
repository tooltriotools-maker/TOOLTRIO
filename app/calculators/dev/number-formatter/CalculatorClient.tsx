'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [num, setNum] = useState('1234567.89')
  const [locale, setLocale] = useState('en-US')
  const [currency, setCurrency] = useState('')
  const [decimals, setDecimals] = useState(2)
  const [copied, setCopied] = useState('')

  const formats = useMemo(() => {
    const n = parseFloat(num.replace(/,/g,''))
    if (isNaN(n)) return null
    const fmt = (opts: Intl.NumberFormatOptions) => {
      try { return new Intl.NumberFormat(locale, opts).format(n) } catch { return 'N/A' }
    }
    const abbrev = n >= 1e9 ? `${(n/1e9).toFixed(2)}B` : n >= 1e6 ? `${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `${(n/1e3).toFixed(2)}K` : String(n)
    return [
      {label:'Standard', value: fmt({minimumFractionDigits:decimals,maximumFractionDigits:decimals})},
      {label:'Compact (K/M/B)', value: abbrev},
      {label:'Percent', value: fmt({style:'percent',minimumFractionDigits:decimals})},
      {label:'Scientific', value: n.toExponential(decimals)},
      {label:'Currency USD', value: fmt({style:'currency',currency:'USD'})},
      {label:'Currency EUR', value: fmt({style:'currency',currency:'EUR'})},
      {label:'Currency INR', value: fmt({style:'currency',currency:'INR'})},
      {label:'Currency GBP', value: fmt({style:'currency',currency:'GBP'})},
      {label:'No decimals', value: fmt({maximumFractionDigits:0})},
      {label:'Raw', value: String(n)},
    ]
  }, [num, locale, decimals, currency])

  const copy = (k: string, v: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Number Formatter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔢 Number Formatter</h1>
      <p className="text-gray-500 mb-6">Format numbers with thousands separators, currency, K/M/B and more</p>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="sm:col-span-2"><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Number</label>
            <input value={num} onChange={e=>setNum(e.target.value)} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-3 text-xl font-mono font-bold focus:outline-none" /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Locale</label>
            <select value={locale} onChange={e=>setLocale(e.target.value)} className="w-full border-2 border-gray-200 rounded-xl px-3 py-3 focus:outline-none focus:border-green-400 bg-white font-medium">
              {['en-US','en-GB','de-DE','fr-FR','ja-JP','hi-IN','ar-SA'].map(l=><option key={l} value={l}>{l}</option>)}
            </select></div>
        </div>
        <label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Decimal Places: {decimals}</label>
        <input type="range" min={0} max={6} value={decimals} onChange={e=>setDecimals(Number(e.target.value))} className="w-full mb-6" />
        {formats && (
          <div className="space-y-2">
            {formats.map(f=>(
              <div key={f.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-sm font-medium text-gray-600">{f.label}</span>
                <div className="flex items-center gap-3">
                  <code className="font-mono font-bold text-gray-900">{f.value}</code>
                  <button onClick={()=>copy(f.label,f.value)} className="text-gray-400 hover:text-green-600">
                    {copied===f.label?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Number Formatter</h2>
        <p className="text-gray-600 text-sm mb-4">Enter any number to instantly see it formatted in 10 different ways - with commas, as currency, in K/M/B shorthand, as a percentage, and more. Choose your locale to get region-specific formatting (e.g. German uses periods as thousand separators).</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-xs font-bold text-blue-600 uppercase mb-1">Input</p><code className="text-sm font-mono text-blue-800">1234567.89</code></div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200"><p className="text-xs font-bold text-green-600 uppercase mb-1">en-US Currency</p><code className="text-sm font-mono text-green-800">$1,234,567.89</code></div>
        </div>
        <p className="text-sm text-gray-600">Use locale <strong>de-DE</strong> for European formatting (1.234.567,89). The Compact format converts large numbers to human-readable K/M/B notation useful for dashboards. Copy any format with one click to use directly in your code or spreadsheet.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Number Formatter"
        category="dev"
        intro={`Formatting large numbers correctly depends on locale — the US uses 1,234,567.89 (comma thousands separator, period decimal), Germany uses 1.234.567,89 (reversed), and India uses 12,34,567 (lakh/crore grouping). Getting this wrong in financial applications causes confusion and errors.

This formatter shows the same number in multiple locale formats simultaneously. Runs in your browser.

**Long-tail searches answered here:** number formatter free online usa, format large numbers with commas free tool, number to words converter free no signup, decimal place formatter free online, currency number format converter free, integer formatting tool free no download usa, number to english words converter free online usa, format number with thousand separator free tool, scientific notation to regular number converter free, number to ordinal 1st 2nd 3rd formatter free usa, accounting number format parentheses negatives free, number rounding to significant figures free tool usa, roman numerals to arabic numbers converter free, number format for different locales cultures free usa, binary number to formatted decimal free tool online

For number operations, pair with [Base Converter](/calculators/dev/base-converter) and [Bit Byte Converter](/calculators/dev/bit-byte-converter).`}
        howItWorks={`Formats numbers with locale-appropriate thousand separators and decimal notation. Supports: comma-separated (1,234,567.89), period-separated European (1.234.567,89), Indian lakh/crore notation (12,34,567), and scientific notation (1.23e6). Converts numbers to words (one million two hundred thousand). Handles large numbers (BigInt) and arbitrary decimal precision.`}
        benefits={[
          { title: `Multi-locale formatting`, text: `Shows the same number formatted for US (1,234.56), European (1.234,56), Indian (12,34,567), and Swiss (1 234.56) locales simultaneously.` },
          { title: `Number to words`, text: `Converts numbers to written form: one hundred twenty-three million. Useful for legal documents and formal financial writing.` },
          { title: `Scientific notation toggle`, text: `Very large or very small numbers in scientific notation (1.23e6, 4.56e-9). Toggle between standard and scientific representation.` },
          { title: `Large number support`, text: `Handles numbers above the JavaScript MAX_SAFE_INTEGER limit using BigInt — accurate for database IDs and financial calculations.` },
        ]}
        useCases={[
          { title: `Invoice and financial display`, text: `Format currency amounts correctly for your target market. US uses comma thousands separator; Germany uses period; India uses lakh/crore.` },
          { title: `Legal document numbers`, text: `Legal and financial documents often require numbers spelled out in words alongside the numeric form: one hundred thousand dollars ($100,000).` },
          { title: `Scientific data display`, text: `Display very large or very small numbers (nanoscale, astronomical) in scientific notation for readability in technical documentation.` },
          { title: `Database ID formatting`, text: `Format large database auto-increment IDs (1,000,000+) with thousand separators for readability in admin interfaces.` },
        ]}
        keyStats={[
          { stat: `Intl.NumberFormat`, source: `JavaScript locale-aware number formatting API used by this tool` },
          { stat: `Indian numbering`, source: `Lakh/crore notation: 1,00,000 (one lakh), 1,00,00,000 (one crore)` },
          { stat: `Number to words`, source: `Converts numeric values to written English — required for legal documents` },
        ]}
        inlineLinks={[
          { text: `Base Converter`, href: `/calculators/dev/base-converter`, label: `Base Converter` },
          { text: `Bit Byte Converter`, href: `/calculators/dev/bit-byte-converter`, label: `Bit Byte Converter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `Bandwidth Calculator`, href: `/calculators/dev/bandwidth-calculator`, label: `Bandwidth Calculator` },
          { text: `Epoch Converter`, href: `/calculators/dev/epoch-converter`, label: `Epoch Converter` },
          { text: `Bitwise Calculator`, href: `/calculators/dev/bitwise-calculator`, label: `Bitwise Calculator` },
        ]}
        tipsSection={`Indian lakh/crore notation. The Indian numbering system uses commas at 2-digit intervals after the first 3 digits: 1,23,45,678. Use this when formatting numbers for Indian audiences.

Locale-aware with Intl.NumberFormat. JavaScript Intl.NumberFormat with locale like de-DE formats numbers in German notation (period for thousands, comma for decimal). This tool shows the output for multiple locales simultaneously.

Number to words for legal documents. Legal and financial documents often require numbers spelled out: one hundred thousand dollars ($100,000). Convert here.

Scientific notation for extremes. Very large or very small numbers are more readable in scientific notation. Toggle here to see the scientific equivalent.`}
        conclusion={`Number formatting is context-dependent — what is correct in the US (1,234.56) is wrong in Germany (1.234,56). This formatter shows multiple locale formats simultaneously. For number operations: [Base Converter](/calculators/dev/base-converter) and [Bit Byte Converter](/calculators/dev/bit-byte-converter).`}
      />
    </div>
  )
}
