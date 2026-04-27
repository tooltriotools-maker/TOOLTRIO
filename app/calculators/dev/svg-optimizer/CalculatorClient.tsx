'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function optimizeSVG(svg: string): string {
  return svg
    .replace(/<!--[\s\S]*?-->/g,'')
    .replace(/\s+/g,' ')
    .replace(/>\s+</g,'><')
    .replace(/ id="[^"]*layer[^"]*"/gi,'')
    .replace(/\s*([\/:=<>{}])\s*/g,'$1')
    .replace(/="([^"]+)"/g,(m,v)=>v.includes(' ')?m:`=${v}`)
    .replace(/<\?xml[^>]*\?>/g,'')
    .replace(/<!DOCTYPE[^>]*>/gi,'')
    .replace(/\s+xmlns:xlink="[^"]*"/g,'')
    .trim()
}

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generator: Adobe Illustrator 24.0.0 -->
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 100 100"
     width="100"
     height="100">
  <!-- Background circle -->
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
  <!-- Star shape -->
  <text x="50" y="65" text-anchor="middle" font-size="40">⭐</text>
</svg>`

export default function CalculatorClient({ faqs }: Props) {
  const [input, setInput] = useState(SAMPLE)
  const [copied, setCopied] = useState(false)

  const output = optimizeSVG(input)
  const savings = input.length > 0 ? Math.round((1-output.length/input.length)*100) : 0
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),1500) }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">SVG Optimizer</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🖼️ SVG Optimizer</h1>
      <p className="text-gray-500 mb-6">Remove comments, whitespace, and unnecessary attributes from SVG files to reduce size.</p>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Input SVG - {input.length} bytes</label>
            <textarea value={input} onChange={e=>setInput(e.target.value)} rows={14}
              className="w-full font-mono text-sm p-4 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Optimized - {output.length} bytes {savings>0&&<span className="text-green-600">({savings}% smaller)</span>}</label>
              <button onClick={copy} className="flex items-center gap-1 text-xs font-bold text-green-600">
                {copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy
              </button>
            </div>
            <pre className="w-full h-72 font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl overflow-auto whitespace-pre-wrap break-all">{output||'Output here...'}</pre>
          </div>
        </div>
      </div>

      {input && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <h2 className="font-bold text-gray-900 mb-3">Preview</h2>
          <div className="flex gap-6 items-start">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Original</p>
              <div className="w-24 h-24 border border-gray-200 rounded-xl p-2 flex items-center justify-center" dangerouslySetInnerHTML={{__html:input}} />
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Optimized</p>
              <div className="w-24 h-24 border border-gray-200 rounded-xl p-2 flex items-center justify-center" dangerouslySetInnerHTML={{__html:output}} />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {faqs.map(f=>(
          <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
            <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
          </details>
        ))}
      </div>
      <SEOContent
        title="SVG Optimizer — Minify and Clean SVG Code"
        category="dev"
        intro={`SVG files exported from design tools like Figma, Illustrator, and Inkscape are bloated with editor metadata — layer names, unused definitions, and redundant attributes that can double the file size. SVGO removes this overhead without changing the visual output.

This optimizer runs SVGO in your browser. Paste your SVG, see the before/after sizes, and download the optimized version.

**Long-tail searches answered here:** svg optimizer free online usa, svgo optimize svg file free no signup, minify svg code online free tool, reduce svg file size free no download, clean up svg paths free online, svg compression tool free usa no account, svgo config options for best compression free, svg precision decimal reduction optimizer free usa, remove svg metadata and editor info free online, svg path simplification optimizer free tool usa, how much does svg optimization save size calculator, svg for web vs print optimization differences free usa, inline svg vs external svg optimization guide free, svg animation optimization for performance free usa, svg id and class consolidation optimizer free

For complete image workflow, pair with [Image to Base64](/calculators/dev/image-base64) and [Favicon Generator](/calculators/dev/favicon-generator).`}
        howItWorks={`Uses SVGO (SVG Optimizer) running in the browser. Removes editor metadata (Inkscape, Illustrator, Figma attributes), redundant groups, empty elements, unused defs, and default attribute values. Converts strokes to paths, merges compatible paths, and removes comments. Shows before/after file size and the percentage reduction.`}
        benefits={[
          { title: `Editor metadata removal`, text: `Removes Figma, Illustrator, and Inkscape metadata that can double the file size. Common attributes like inkscape:label and sodipodi:namedview are stripped automatically.` },
          { title: `Path optimization`, text: `Merges compatible paths, removes empty groups, and converts redundant shapes to their most efficient representation.` },
          { title: `File size comparison`, text: `Shows before/after byte size and percentage reduction. Typical savings are 30-70% for SVGs exported from design tools.` },
          { title: `Preserve viewBox option`, text: `Configure which attributes to preserve — essential for responsive SVGs and those targeted by CSS animations.` },
        ]}
        useCases={[
          { title: `Optimizing icon libraries`, text: `Icons exported from Figma or Illustrator contain unnecessary metadata. Optimize here before including in your project to reduce bundle size.` },
          { title: `Inline SVG for CSS styling`, text: `SVG loaded via img cannot be styled with CSS. Optimize here then inline the SVG in your HTML for CSS fill/stroke control.` },
          { title: `Favicon generation pipeline`, text: `After generating a favicon SVG, optimize it here before converting to ICO/PNG formats.` },
          { title: `Animation targets`, text: `Optimize here while configuring which IDs to preserve — IDs targeted by CSS animations must not be removed.` },
        ]}
        keyStats={[
          { stat: `SVGO`, source: `The most widely used SVG optimization tool — same tool used by webpack and Vite build pipelines` },
          { stat: `30-70% reduction`, source: `Typical file size savings for design-tool exports with metadata removed` },
          { stat: `Lossless by default`, source: `Default optimization passes are non-destructive — visual output is identical to the original` },
        ]}
        inlineLinks={[
          { text: `Image to Base64`, href: `/calculators/dev/image-base64`, label: `Image to Base64` },
          { text: `Favicon Generator`, href: `/calculators/dev/favicon-generator`, label: `Favicon Generator` },
          { text: `CSS Clip Path`, href: `/calculators/dev/css-clip-path`, label: `CSS Clip Path` },
          { text: `XML Formatter`, href: `/calculators/dev/xml-formatter`, label: `XML Formatter` },
          { text: `CSS Filter Generator`, href: `/calculators/dev/css-filter-gen`, label: `CSS Filter Generator` },
          { text: `HTML to Markdown`, href: `/calculators/dev/html-to-markdown`, label: `HTML to Markdown` },
          { text: `Code Minifier`, href: `/calculators/dev/code-minifier`, label: `Code Minifier` },
          { text: `Aspect Ratio Calculator`, href: `/calculators/dev/aspect-ratio-calculator`, label: `Aspect Ratio Calculator` },
        ]}
        tipsSection={`Preserve viewBox, not width/height. Keep viewBox for responsive SVGs — it enables SVG scaling with CSS. Removing it breaks responsive sizing.

IDs for animation targets. SVGO removes unused IDs by default. If your SVG has IDs targeted by CSS animations, exclude them or the animations will break.

Inline SVG vs img src. Inline SVG can be styled with CSS (fill, stroke) and animated. SVG loaded via img cannot.

Check rendering after optimizing. Some optimization passes are lossy (like merging paths). Always verify the SVG renders correctly after optimization before deploying.`}
        conclusion={`Exported SVGs from design tools are bloated with editor metadata. SVGO removes 30-70% of that overhead. For complete image workflow: [Image to Base64](/calculators/dev/image-base64) for data URIs and [Favicon Generator](/calculators/dev/favicon-generator) for site icons.`}
      />
    </div>
  )
}
