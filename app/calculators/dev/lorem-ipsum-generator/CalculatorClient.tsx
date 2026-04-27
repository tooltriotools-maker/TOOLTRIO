'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

function sentence(wordCount = 8): string {
  const len = wordCount + Math.floor(Math.random()*4) - 2
  const words = Array.from({length: Math.max(3,len)}, () => WORDS[Math.floor(Math.random()*WORDS.length)])
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function paragraph(sentences = 5): string {
  return Array.from({length: sentences + Math.floor(Math.random()*3) - 1}, () => sentence()).join(' ')
}

export default function CalculatorClient({ faqs }: Props) {
  const [type, setType] = useState<'words'|'sentences'|'paragraphs'>('paragraphs')
  const [count, setCount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    let text = ''
    if (type === 'words') {
      const words = Array.from({length: count}, () => WORDS[Math.floor(Math.random()*WORDS.length)])
      if (startWithLorem && count >= 2) { words[0]='lorem'; words[1]='ipsum' }
      text = words.join(' ')
    } else if (type === 'sentences') {
      const sents = Array.from({length: count}, () => sentence())
      if (startWithLorem) sents[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      text = sents.join(' ')
    } else {
      const paras = Array.from({length: count}, () => paragraph())
      if (startWithLorem) paras[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      text = paras.join('\n\n')
    }
    setOutput(text)
  }, [type, count, startWithLorem])

  useState(() => { generate() })
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Lorem Ipsum Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📝 Lorem Ipsum Generator</h1>
      <p className="text-gray-500 mb-6">Generate placeholder text for your designs, mockups, and prototypes.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-4 mb-5">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Type</label>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              {(['words','sentences','paragraphs'] as const).map(t=>(
                <button key={t} onClick={()=>setType(t)} className={`px-4 py-2 text-sm font-bold capitalize ${type===t?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Count</label>
            <input type="number" min={1} max={type==='words'?1000:type==='sentences'?50:20} value={count} onChange={e=>setCount(+e.target.value)}
              className="w-24 px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer mb-0.5">
              <input type="checkbox" checked={startWithLorem} onChange={e=>setStartWithLorem(e.target.checked)} className="accent-green-600" />
              Start with "Lorem ipsum"
            </label>
          </div>
          <div className="flex items-end gap-2">
            <button onClick={generate} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700">
              <RefreshCw className="w-4 h-4" /> Generate
            </button>
            <button onClick={copy} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl font-bold hover:bg-gray-50">
              {copied?<Check className="w-4 h-4 text-green-600"/>:<Copy className="w-4 h-4"/>} {copied?'Copied!':'Copy'}
            </button>
          </div>
        </div>
        <div className="relative">
          <textarea readOnly value={output} rows={12}
            className="w-full font-serif text-sm p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none text-gray-700 leading-relaxed" />
          <p className="text-xs text-gray-400 mt-1">{output.split(/\s+/).filter(Boolean).length} words - {output.length} characters</p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <SEOContent
        title="Lorem Ipsum Generator — Placeholder Text"
        category="dev"
        intro={`Lorem Ipsum placeholder text fills layout spaces during design and development when real content is not yet available. The classic Cicero-derived text has been used since the 1500s. This generator lets you specify exactly how much placeholder text you need — by word count, sentence count, or paragraph count.

Runs in your browser.

**Long-tail searches answered here:** lorem ipsum generator free online usa, placeholder text generator free no signup, custom lorem ipsum paragraph generator free, how many words lorem ipsum generator free, lorem ipsum alternative text generator free, random placeholder content generator free usa, lorem ipsum in different languages generator free, lorem ipsum with html formatting tags free usa, lorem ipsum word count specific generator free, random latin placeholder text generator usa free, lorem ipsum for wireframe mockup free online, lorem ipsum starting with specific word generator free, lorem ipsum sentence paragraph structure free usa, lorem picsum image placeholder complement free guide, hipster ipsum alternative funny lorem ipsum usa free

For realistic placeholder data like names and emails, use [Fake Data Generator](/calculators/dev/fake-data-generator).`}
        howItWorks={`Generates classical Lorem Ipsum (derived from Cicero original de Finibus Bonorum et Malorum) or randomized placeholder text. Configurable: number of words, sentences, or paragraphs. HTML mode wraps output in p tags for direct use in markup. Markdown mode wraps in paragraph formatting.`}
        benefits={[
          { title: `Word, sentence, or paragraph count`, text: `Generate exactly the amount of text you need — specify by word count for precise length control, sentence count for natural text length, or paragraph count for document-scale content.` },
          { title: `Classical vs random Lorem Ipsum`, text: `Classical Lorem Ipsum uses the traditional Cicero-derived text. Random mode generates novel placeholder text that is not the overused Lorem ipsum dolor sit amet.` },
          { title: `HTML and Markdown output`, text: `Toggle output format to wrap text in p tags for HTML templates or plain paragraphs for Markdown documents.` },
          { title: `Copy-ready output`, text: `Single-click copy of the generated text — ready to paste into your template, design mockup, or documentation draft.` },
        ]}
        useCases={[
          { title: `UI layout prototyping`, text: `Fill a card or article layout with placeholder text to see how the design handles varying content lengths.` },
          { title: `Email template testing`, text: `Fill email template sections with Lorem Ipsum to preview the layout before replacing with real content.` },
          { title: `Documentation placeholder`, text: `Use as placeholder in documentation where the actual content is not yet written but the structure needs to be visible.` },
          { title: `Presentation slide filling`, text: `Fill presentation slides with placeholder text to preview the visual layout before writing the actual content.` },
        ]}
        keyStats={[
          { stat: `Classical text`, source: `Derived from Cicero de Finibus Bonorum et Malorum — the standard placeholder since the 1500s` },
          { stat: `200 WPM benchmark`, source: `At 200 WPM average reading speed, 1 paragraph of Lorem Ipsum takes about 15-20 seconds to read` },
          { stat: `For realistic data`, source: `For names, emails, and other realistic placeholder data, use Fake Data Generator instead of Lorem Ipsum` },
        ]}
        inlineLinks={[
          { text: `Fake Data Generator`, href: `/calculators/dev/fake-data-generator`, label: `Fake Data Generator` },
          { text: `Markdown Preview`, href: `/calculators/dev/markdown-preview`, label: `Markdown Preview` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `Table Generator`, href: `/calculators/dev/table-generator`, label: `Table Generator` },
          { text: `Markdown Table Generator`, href: `/calculators/dev/markdown-table-gen`, label: `Markdown Table Generator` },
          { text: `Text Case Converter`, href: `/calculators/dev/text-case-converter`, label: `Text Case Converter` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
        ]}
        tipsSection={`Specify by word count for precise needs. When a design needs exactly 150 words to fill a card without wrapping, specify word count rather than paragraph count.

Use real words for user testing. Lorem Ipsum tells you whether text fits; real-looking fake text tells you whether users can read and understand the UI. Use [Fake Data Generator](/calculators/dev/fake-data-generator) for more realistic placeholder content.

Translate for international UIs. Testing with English Lorem Ipsum misses internationalization issues — French and German text is 30-40% longer than English equivalent. Use actual translated placeholder text for i18n testing.

HTML output for direct embedding. The HTML mode generates p tags ready to paste into your template without an extra wrapping step.`}
        conclusion={`Lorem Ipsum is the universal placeholder for layouts under development. Specify by words, sentences, or paragraphs for precise filling. For realistic placeholder data: [Fake Data Generator](/calculators/dev/fake-data-generator). For Markdown: [Markdown Preview](/calculators/dev/markdown-preview).`}
      />
    </div>
  )
}
