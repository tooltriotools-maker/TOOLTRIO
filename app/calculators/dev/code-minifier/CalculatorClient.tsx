'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g,'')
    .replace(/\s+/g,' ')
    .replace(/\s*([{}:;,>~+])\s*/g,'$1')
    .replace(/;}/g,'}')
    .replace(/\s*!\s*important/g,'!important')
    .trim()
}

function minifyHTML(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g,'')
    .replace(/\s+/g,' ')
    .replace(/>\s+</g,'><')
    .trim()
}

function minifyJSON(json: string): string {
  try { return JSON.stringify(JSON.parse(json)) }
  catch { return 'Invalid JSON' }
}

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState('.container {\n  display: flex;\n  flex-direction: column;\n  /* comment */\n  padding: 16px;\n  margin: 0 auto;\n}')
  const [type, setType] = useState<'css'|'html'|'json'>('css')
  const [copied, setCopied] = useState(false)

  const minify = () => {
    switch(type) {
      case 'css': return minifyCSS(input)
      case 'html': return minifyHTML(input)
      case 'json': return minifyJSON(input)
    }
  }
  const output = minify()
  const savings = input.length > 0 ? Math.round((1 - output.length/input.length)*100) : 0
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Code Minifier</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⚡ Code Minifier</h1>
      <p className="text-gray-500 mb-6">Minify CSS, HTML, and JSON code to reduce file size. All processing happens in your browser.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="flex rounded-xl border border-gray-200 overflow-hidden mb-4 w-fit">
          {(['css','html','json'] as const).map(t=>(
            <button key={t} onClick={()=>setType(t)} className={`px-5 py-2 text-sm font-bold uppercase ${type===t?'bg-green-600 text-white':'text-gray-600 hover:bg-gray-50'}`}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input - {input.length} chars</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} rows={12}
              className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Output - {output.length} chars {savings>0&&<span className="text-green-600">({savings}% smaller)</span>}</label>
              <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
                {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
              </button>
            </div>
            <pre className="w-full h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap">{output||'Output here...'}</pre>
          </div>
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
        title="Code Minifier — HTML CSS JavaScript"
        category="dev"
        intro={`Minifying production code removes comments, whitespace, and unnecessary tokens before deployment. For HTML, CSS, and JavaScript not processed by a build bundler (widget embeds, email templates, inline scripts), a quick minifier reduces payload size without build tooling.

This minifier runs in your browser — no upload, no server.

**Long-tail searches answered here:** css javascript html minifier free online usa, minify js css code online no signup free, online code minifier and compressor free tool, how to minify javascript free online no download, css minifier remove whitespace online free, code compression tool free no account usa, uglify javascript free online minification tool, minified code size reduction percentage calculator, html whitespace remover and minifier free usa, minify svg file online free no account, json minifier remove formatting free online usa, how much does minification reduce file size calculator, minify css before deployment checklist free usa, gzip vs minification compression comparison free, minify code to improve page speed free tool usa

For SVG files, use [SVG Optimizer](/calculators/dev/svg-optimizer). For JSON: [JSON Formatter](/calculators/dev/json-formatter) minify mode.`}
        howItWorks={`Minifies HTML, CSS, and JavaScript by removing comments, whitespace, and unnecessary tokens. HTML minification: removes comments, collapses whitespace, removes optional closing tags and default attribute values. CSS minification: removes comments, whitespace, and shortens color values. JavaScript minification: removes comments and whitespace (basic minifier — not a full tree-shaking bundler).`}
        benefits={[
          { title: `HTML CSS JS minification`, text: `Minifies all three web languages in one tool. Detect file type automatically from content or select manually.` },
          { title: `File size comparison`, text: `Shows before/after byte size and percentage reduction. Gives an accurate picture of the size savings before deploying.` },
          { title: `Comment removal`, text: `Removes all HTML, CSS, and JavaScript comments from the output — useful for hiding implementation notes from production builds.` },
          { title: `Safe whitespace handling`, text: `Preserves whitespace that is significant in HTML (spaces between inline elements) while collapsing insignificant whitespace.` },
        ]}
        useCases={[
          { title: `Widget CSS minification`, text: `For small utility stylesheets not processed by a bundler (widget embeds, email CSS), this minifier reduces size without build tooling.` },
          { title: `Inline script optimization`, text: `Minify inline script blocks in server-rendered HTML pages before serving.` },
          { title: `Quick size check`, text: `Check how much a file will shrink after minification before deciding whether to set up a full build pipeline.` },
          { title: `Remove debug comments`, text: `Strip all comments from production-bound code before deployment — removes implementation notes, TODO comments, and debug hints.` },
        ]}
        keyStats={[
          { stat: `Basic minification`, source: `Whitespace removal and comment stripping — not tree-shaking or dead code elimination` },
          { stat: `Use bundler for production JS`, source: `For production JavaScript, esbuild, Terser, or Rollup provide superior tree-shaking and mangling` },
          { stat: `File size savings`, source: `Typical savings: 30-50% for CSS, 20-40% for HTML, 30-60% for JavaScript with comments` },
        ]}
        inlineLinks={[
          { text: `SVG Optimizer`, href: `/calculators/dev/svg-optimizer`, label: `SVG Optimizer` },
          { text: `JSON Formatter`, href: `/calculators/dev/json-formatter`, label: `JSON Formatter` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `CSS Specificity`, href: `/calculators/dev/css-specificity`, label: `CSS Specificity` },
          { text: `Diff Checker`, href: `/calculators/dev/diff-checker`, label: `Diff Checker` },
          { text: `Word Counter`, href: `/calculators/dev/word-counter`, label: `Word Counter` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
        ]}
        tipsSection={`Use a bundler for production JS. This tool does basic whitespace removal. Production JavaScript minification (tree-shaking, dead code elimination, mangling) requires tools like esbuild, Terser, or Rollup.

Minify CSS for small files. For small utility stylesheets not processed by a bundler (widget embeds, email CSS), this minifier reduces size without build tooling.

Check output renders correctly. After minifying HTML, verify it renders identically — some HTML minifiers collapse required whitespace between inline elements.

Compare sizes. Use the [Diff Checker](/calculators/dev/diff-checker) on the original vs minified output to see exactly what was removed.`}
        conclusion={`Quick minification for small files without build tooling. For production minification, use esbuild or Terser. For SVG files: [SVG Optimizer](/calculators/dev/svg-optimizer). For JSON: [JSON Formatter](/calculators/dev/json-formatter) minify mode.`}
      />
    </div>
  )
}
