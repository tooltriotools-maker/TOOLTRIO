'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, ArrowLeftRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

const encode = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
const decode = (s: string) => s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/&([a-z]+);/gi,(m,e)=>{const t=document.createElement('textarea');t.innerHTML=m;return t.value})

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('<h1 class="title">Hello "World" & \'Friends\'!</h1>')
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const output = mode==='encode' ? encode(input) : decode(input)
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }
  const swap = () => { setInput(output); setMode(m=>m==='encode'?'decode':'encode') }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">HTML Encoder</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🏷️ HTML Encoder / Decoder</h1>
      <p className="text-gray-500 mb-6">Encode special characters to HTML entities or decode them back. Runs entirely in your browser.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            {(['encode','decode'] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} className={`px-5 py-2 text-sm font-bold capitalize ${mode===m?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{m}</button>
            ))}
          </div>
          <button onClick={swap} className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold border border-gray-200 rounded-xl hover:bg-gray-50">
            <ArrowLeftRight className="w-4 h-4" /> Swap
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} rows={10}
              className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output</label>
              <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
                {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} {copied?'Copied!':'Copy'}
              </button>
            </div>
            <pre className="w-full h-56 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output here...'}</pre>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
        <p className="text-sm font-bold text-gray-700 mb-3">Common HTML Entities Reference</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          {[['<','&lt;'],['>', '&gt;'],['&','&amp;'],['"','&quot;'],["'",'&#39;'],['(C)','&copy;'],['(R)','&reg;'],['(TM)','&trade;'],['->','&rarr;'],['€','&euro;'],['£','&pound;'],[' degrees','&deg;']].map(([ch,ent])=>(
            <div key={ent} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-bold text-gray-900 w-4 text-center">{ch}</span>
              <span className="text-gray-500">{ent}</span>
            </div>
          ))}
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
        title="HTML Encoder / Decoder"
        category="dev"
        intro={`Inserting user-provided text into HTML without encoding it first is the root cause of XSS vulnerabilities — the most common security issue on the web. Five characters require mandatory escaping before any text can be safely rendered in HTML.

This encoder runs entirely in your browser. Paste raw text to get HTML-safe entities, or paste encoded HTML to restore readable text.

**Long-tail searches answered here:** html encode decode free online usa, html entity encoder decoder free no signup, escape html characters online free tool, convert html to encoded entities free, html special characters encoder free no download, html escape unescape free online tool usa, how to encode less than greater than in html free, html encoding for ampersand in attributes free, encode html for javascript string safety free usa, html entity encoding vs url encoding difference free, encode html inside json value correctly free, html encoding required in attribute values guide free usa, xss prevention through html encoding free guide, double encoding html entities issue fixer free usa, html encode for email template safe content free

After encoding, validate your HTML structure with the [HTML Validator](/calculators/dev/html-validator).`}
        howItWorks={`The encoder performs the five mandatory HTML substitutions: & to &amp;, < to &lt;, > to &gt;, double-quote to &quot;, single-quote to &#39;. These five are mandatory because they have structural meaning in HTML.

The decoder reverses named entities (&amp;, &lt;, &gt;, &quot;, &apos;, &nbsp;) and numeric entities back to their literal characters.`}
        benefits={[
          { title: `XSS-safe HTML escaping`, text: `Encode user-submitted names, comments, or search terms before rendering in HTML. Prevents script injection by ensuring < becomes &lt; and & becomes &amp; before hitting the DOM.` },
          { title: `Attribute value escaping`, text: `Values inside HTML attributes need quotes encoded too. This tool encodes both double and single quotes so attribute values cannot be broken out of.` },
          { title: `Decode garbled HTML emails`, text: `Email clients sometimes double-encode text, leaving &amp;amp; instead of &amp;. Decode once or twice here to read the actual content.` },
          { title: `Template literal safety`, text: `When building HTML strings in JavaScript, encode dynamic values before interpolation. Prevents accidental tag injection even when you control the template.` },
        ]}
        useCases={[
          { title: `Sanitizing user input for display`, text: `A user submitted a comment containing a script tag. Without HTML encoding, that script executes. Run the input through this encoder before any DOM insertion.` },
          { title: `Debugging email template encoding`, text: `Your email template shows &amp;quot; instead of a double quote. Decode the HTML here to find where the double-encoding is happening in your email pipeline.` },
          { title: `Writing HTML documentation`, text: `Writing code examples in HTML and need to show actual < and > characters rather than having them parsed as tags. Encode your code snippets here first.` },
          { title: `CMS and rich text editors`, text: `Legacy CMS platforms output raw HTML entities as text. Decode the exported content here before processing it programmatically.` },
        ]}
        keyStats={[
          { stat: `5 mandatory`, source: `Characters that must always be HTML-encoded: & < > double-quote single-quote` },
          { stat: `XSS number 1`, source: `Cross-site scripting is the most common web vulnerability — caused by missing HTML encoding` },
          { stat: `OWASP A03`, source: `Injection attacks including XSS rank number 3 in the OWASP Top 10 2021` },
        ]}
        inlineLinks={[
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `HTML Entity Reference`, href: `/calculators/dev/html-entity-ref`, label: `HTML Entity Reference` },
          { text: `Meta Tag Generator`, href: `/calculators/dev/meta-tag-generator`, label: `Meta Tag Generator` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `Base64 Encoder`, href: `/calculators/dev/base64-encoder`, label: `Base64 Encoder` },
          { text: `String Inspector`, href: `/calculators/dev/string-inspector`, label: `String Inspector` },
          { text: `Open Graph Preview`, href: `/calculators/dev/open-graph-preview`, label: `Open Graph Preview` },
        ]}
        tipsSection={`Encode at the output, not the input. A common mistake is encoding HTML entities at input time and storing the encoded version in your database. This causes double-encoding when you later encode on output. Store raw text; encode at render time.

Context matters. HTML encoding is correct for element content and attribute values. For JavaScript strings, URL context, or JSON, each has its own escaping rules.

Ampersand must come first. When encoding manually, always encode & before the other characters to avoid double-encoding.

Test with a script tag. After encoding user input, try inputting a script tag and verify the output shows the literal text not an executing script.`}
        conclusion={`HTML encoding is non-negotiable for any application that renders user-provided content. The five mandatory characters are the entry points for XSS attacks when left unescaped. Pair this with the [HTML Validator](/calculators/dev/html-validator) and the [HTML Entity Reference](/calculators/dev/html-entity-ref).`}
      />
    </div>
  )
}
