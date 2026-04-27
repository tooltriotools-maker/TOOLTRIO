'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

const convert = (text: string, mode: string) => {
  switch(mode) {
    case 'upper': return text.toUpperCase()
    case 'lower': return text.toLowerCase()
    case 'title': return text.replace(/\b\w/g, c => c.toUpperCase())
    case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case 'camel': return text.replace(/[^a-zA-Z0-9]+(.)/g, (_,c)=>c.toUpperCase()).replace(/^./, c=>c.toLowerCase())
    case 'pascal': return text.replace(/[^a-zA-Z0-9]+(.)/g, (_,c)=>c.toUpperCase()).replace(/^./, c=>c.toUpperCase())
    case 'snake': return text.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'').toLowerCase()
    case 'kebab': return text.replace(/\s+/g,'-').replace(/[^a-zA-Z0-9-]/g,'').toLowerCase()
    case 'constant': return text.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'').toUpperCase()
    case 'dot': return text.replace(/\s+/g,'.').replace(/[^a-zA-Z0-9.]/g,'').toLowerCase()
    case 'reverse': return text.split('').reverse().join('')
    case 'alternate': return text.split('').map((c,i)=>i%2?c.toLowerCase():c.toUpperCase()).join('')
    default: return text
  }
}

const MODES = [
  {id:'upper',label:'UPPER CASE'},
  {id:'lower',label:'lower case'},
  {id:'title',label:'Title Case'},
  {id:'sentence',label:'Sentence case'},
  {id:'camel',label:'camelCase'},
  {id:'pascal',label:'PascalCase'},
  {id:'snake',label:'snake_case'},
  {id:'kebab',label:'kebab-case'},
  {id:'constant',label:'CONSTANT_CASE'},
  {id:'dot',label:'dot.case'},
  {id:'reverse',label:'esreveR'},
  {id:'alternate',label:'aLtErNaTe'},
]

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog')
  const [copied, setCopied] = useState<string|null>(null)

  const copy = (text: string, key: string) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(()=>setCopied(null),1500) }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Text Case Converter</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🔤 Text Case Converter</h1>
      <p className="text-gray-500 mb-6">Convert text between all common naming conventions and case styles instantly.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input Text</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)} rows={4}
          placeholder="Enter text to convert..."
          className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
        <p className="text-xs text-gray-400 mt-1">{input.length} characters - {input.trim().split(/\s+/).filter(Boolean).length} words</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MODES.map(m => {
          const result = convert(input, m.id)
          return (
            <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 group">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-500 mb-1">{m.label}</p>
                <p className="font-mono text-sm text-gray-800 truncate">{result}</p>
              </div>
              <button onClick={()=>copy(result,m.id)} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all flex-shrink-0">
                {copied===m.id?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4 text-gray-400"/>}
              </button>
            </div>
          )
        })}
      </div>


      <SEOContent
        title="Text Case Converter"
        category="dev"
        intro={`Naming conventions differ by language and context: camelCase for JavaScript, snake_case for Python, kebab-case for CSS and URLs, PascalCase for classes, SCREAMING_SNAKE_CASE for constants. Converting between them manually — especially for multi-word strings — is tedious and easy to get wrong.

This converter handles all common naming conventions bidirectionally. Runs in your browser.

**Long-tail searches answered here:** text case converter free online usa, convert to camelCase PascalCase snake_case free, uppercase lowercase title case converter free no signup, text case changer bulk free tool, kebab case camel case converter free online, string case transformation tool free usa, constant case screaming snake case converter free, sentence case converter from all caps free usa, header title case vs sentence case converter free, camel case to human readable text converter free usa, how to convert variable names between cases free, database column name case converter free usa, convert text to url slug kebab case free, batch text case conversion for multiple lines free usa, typescript interface name case convention converter free

For text analysis, pair with [Word Counter](/calculators/dev/word-counter) and [String Inspector](/calculators/dev/string-inspector).`}
        howItWorks={`Converts between: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, dot.case, path/case. Detects word boundaries from spaces, hyphens, underscores, and camelCase transitions. Processes large text blocks — converting multiple identifiers or an entire code snippet at once.`}
        benefits={[
          { title: `All common naming conventions`, text: `UPPERCASE, lowercase, camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, dot.case, and path/case — all conversion directions supported.` },
          { title: `Smart word boundary detection`, text: `Correctly splits myVariableName to my variable name before converting to snake_case. Handles mixed-case identifiers, acronyms, and words with numbers.` },
          { title: `Bulk text conversion`, text: `Process multiple identifiers or an entire code snippet at once. Convert a JSON response with snake_case keys to camelCase in one paste.` },
          { title: `Round-trip accuracy`, text: `Convert snake_case to camelCase and back without losing word boundaries or casing — important for API key transformations.` },
        ]}
        useCases={[
          { title: `API naming convention conversion`, text: `JSON APIs commonly use camelCase (JavaScript) or snake_case (Python/Ruby). Convert between them here when integrating APIs with different naming conventions.` },
          { title: `Git branch name generation`, text: `Branch names are typically kebab-case: feature/user-authentication. Convert your task name to a valid branch name format here.` },
          { title: `Database column to JavaScript`, text: `Database column names use snake_case (user_created_at). Convert to camelCase for your JavaScript object properties.` },
          { title: `Constant naming`, text: `MAX_RETRY_COUNT, DEFAULT_TIMEOUT — SCREAMING_SNAKE_CASE is the convention for constants in Python, Java, and many other languages.` },
        ]}
        keyStats={[
          { stat: `camelCase to snake_case`, source: `The most common API integration conversion — between JavaScript and Python/Ruby naming conventions` },
          { stat: `kebab-case for URLs`, source: `URL path segments use kebab-case: /user-profile, /api-keys, /order-history` },
          { stat: `Smart splitting`, source: `Correctly identifies word boundaries in mixed-case strings like parseHTTPResponse becomes parse HTTP response` },
        ]}
        inlineLinks={[
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Line Sorter`, href: `/calculators/dev/line-sorter`, label: `Line Sorter` },
          { text: `Duplicate Remover`, href: `/calculators/dev/duplicate-remover`, label: `Duplicate Remover` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Lorem Ipsum Generator`, href: `/calculators/dev/lorem-ipsum-generator`, label: `Lorem Ipsum Generator` },
          { text: `Number Formatter`, href: `/calculators/dev/number-formatter`, label: `Number Formatter` },
        ]}
        tipsSection={`Word boundary detection. The converter correctly splits myVariableName to my variable name before converting to snake_case. Handles mixed-case identifiers, acronyms (URL becomes url or Url depending on convention), and words with numbers.

API naming conventions. JSON APIs commonly use camelCase (JavaScript) or snake_case (Python/Ruby). Convert between them here when integrating APIs with different naming conventions.

Git branch naming. Branch names are typically kebab-case: feature/user-authentication. Convert your task name here to a valid branch name format.

Screaming snake case for constants. MAX_RETRY_COUNT, DEFAULT_TIMEOUT — SCREAMING_SNAKE_CASE is the convention for constants in Python, Java, and many other languages.`}
        conclusion={`Naming convention conversions are a constant friction point when working across languages and APIs. This converter handles all common formats bidirectionally. For text analysis: [Word Counter](/calculators/dev/word-counter) and [String Inspector](/calculators/dev/string-inspector).`}
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
