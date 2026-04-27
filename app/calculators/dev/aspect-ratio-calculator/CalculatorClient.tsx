'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }

export default function CalculatorClient({ faqs }: Props) {
  const [width, setWidth] = useState(1920)
  const [height, setHeight] = useState(1080)
  const [targetW, setTargetW] = useState(1280)

  const g = gcd(width, height)
  const ratioW = width / g
  const ratioH = height / g
  const decimal = (width / height).toFixed(4)
  const targetH = Math.round(targetW * height / width)

  const COMMON = [{w:16,h:9},{w:4,h:3},{w:21,h:9},{w:1,h:1},{w:9,h:16},{w:3,h:2},{w:5,h:4}]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Aspect Ratio Calculator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">📐 Aspect Ratio Calculator</h1>
      <p className="text-gray-500 mb-6">Calculate aspect ratios, find missing dimensions, and convert between common screen ratios.</p>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Width (px)</label>
            <input type="number" value={width} onChange={e=>setWidth(+e.target.value)} className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Height (px)</label>
            <input type="number" value={height} onChange={e=>setHeight(+e.target.value)} className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Aspect Ratio</p>
            <p className="font-black text-green-800 text-lg">{ratioW}:{ratioH}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Decimal</p>
            <p className="font-black text-blue-800 text-lg">{decimal}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 mb-1">Megapixels</p>
            <p className="font-black text-purple-800 text-lg">{(width*height/1e6).toFixed(2)}MP</p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-bold text-gray-700 mb-3">Scale to target width</p>
          <div className="flex items-center gap-3">
            <input type="number" value={targetW} onChange={e=>setTargetW(+e.target.value)} className="w-32 px-3 py-2 border-2 border-gray-200 rounded-xl font-bold focus:border-green-400 focus:outline-none" />
            <span className="text-gray-400">x target width →</span>
            <span className="font-black text-green-700 text-lg">{targetW} x {targetH}px</span>
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-3">Common Ratios - click to load</h2>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {COMMON.map(r => {
            const mult = Math.round(r.w * 1920 / Math.max(r.w, r.h) / r.w)
            return (
              <button key={`${r.w}:${r.h}`} onClick={()=>{ setWidth(r.w*mult*10); setHeight(r.h*mult*10) }}
                className="p-2 text-center bg-gray-50 hover:bg-green-50 rounded-xl border border-gray-100 hover:border-green-300 transition-all">
                <p className="text-xs font-black text-gray-900">{r.w}:{r.h}</p>
              </button>
            )
          })}
        </div>
      </div>

      <SEOContent
        title="Aspect Ratio Calculator"
        category="dev"
        intro={`Aspect ratio defines the proportional relationship between width and height. 16:9 for widescreen video, 4:3 for traditional displays, 1:1 for social media squares. Calculating one dimension from another — or finding the ratio for an arbitrary resolution — is a constant task in responsive design.

This calculator converts between ratio and dimensions. Runs in your browser.

**Long-tail searches answered here:** aspect ratio calculator free online tool for developers, image aspect ratio converter 16 9 4 3 free, video aspect ratio calculator no signup, responsive design aspect ratio free calculator, how to calculate aspect ratio for web free tool, aspect ratio to pixels calculator online free usa, maintain aspect ratio while resizing image calculator free, 16 9 vs 4 3 vs 1 1 aspect ratio comparison free, social media image aspect ratio requirements calculator, youtube thumbnail aspect ratio calculator usa free, cinema vs tv aspect ratio difference calculator free, widescreen 21 9 aspect ratio resolution calculator, mobile vs desktop aspect ratio guide calculator usa free, how to crop image to specific aspect ratio calculator, letterbox vs pillarbox aspect ratio calculator free

For CSS layout, pair with [CSS Grid Generator](/calculators/dev/grid-generator) and [Responsive Breakpoints](/calculators/dev/responsive-breakpoints).`}
        howItWorks={`Given width and height, the calculator finds the GCD (Greatest Common Divisor) and divides both dimensions by it to get the simplest ratio. 1920x1080, GCD is 120, gives 16:9.

Given a ratio and one dimension, the calculator solves for the missing one: at 16:9 with width 800px, height = 800 * (9/16) = 450px.

CSS aspect-ratio property: the modern native CSS way to maintain proportions. The calculator outputs the correct aspect-ratio: 16 / 9 CSS value. For legacy browsers, it also shows the padding-top percentage hack (padding-top: 56.25% for 16:9).`}
        benefits={[
          { title: `Width/height to ratio`, text: `Enter any two dimensions and get the simplest whole-number ratio: 1280x800 gives 8:5. Instantly understand what ratio your design uses.` },
          { title: `Ratio to missing dimension`, text: `Know the ratio and one dimension — calculate the other. At 4:3 ratio with height 600px, width = 800px. Essential for responsive image sizing.` },
          { title: `CSS aspect-ratio output`, text: `Outputs the native CSS aspect-ratio property value and the legacy padding-top % hack for browsers that need it.` },
          { title: `Common ratio reference`, text: `Reference table of standard ratios (16:9, 4:3, 1:1, 21:9, 9:16 for vertical video) with their common use cases.` },
        ]}
        useCases={[
          { title: `Responsive video embeds`, text: `YouTube and video embeds need to maintain 16:9 ratio. Use the CSS aspect-ratio property value or padding-top hack generated here to prevent layout shift.` },
          { title: `Image placeholder sizing`, text: `Design a card with an image that maintains 3:2 ratio at all widths. The CSS aspect-ratio value keeps the height proportional to the width.` },
          { title: `Social media image sizing`, text: `Instagram square: 1:1, Instagram portrait: 4:5, Twitter header: 3:1, LinkedIn cover: 4:1. Calculate pixel dimensions from these ratios for your target display sizes.` },
          { title: `Cropping existing images`, text: `You have a 1920x1200 image. That is 8:5 ratio. What dimensions give 16:9 while using the full width? 1920x1080 — crop 120px from height.` },
        ]}
        keyStats={[
          { stat: `16:9`, source: `Most common video aspect ratio — 1920x1080, 1280x720, 3840x2160 all use 16:9` },
          { stat: `aspect-ratio CSS`, source: `Native CSS property since 2021 — Safari 15+, Chrome 88+, Firefox 89+` },
          { stat: `56.25%`, source: `padding-top percentage for 16:9 ratio — the legacy CSS aspect ratio hack` },
        ]}
        inlineLinks={[
          { text: `CSS Grid Generator`, href: `/calculators/dev/grid-generator`, label: `CSS Grid Generator` },
          { text: `Responsive Breakpoints`, href: `/calculators/dev/responsive-breakpoints`, label: `Responsive Breakpoints` },
          { text: `CSS Unit Converter`, href: `/calculators/dev/css-unit-converter`, label: `CSS Unit Converter` },
          { text: `Image to Base64`, href: `/calculators/dev/image-base64`, label: `Image to Base64` },
          { text: `SVG Optimizer`, href: `/calculators/dev/svg-optimizer`, label: `SVG Optimizer` },
          { text: `Flexbox Generator`, href: `/calculators/dev/flex-generator`, label: `Flexbox Generator` },
          { text: `Favicon Generator`, href: `/calculators/dev/favicon-generator`, label: `Favicon Generator` },
          { text: `Font Size Calculator`, href: `/calculators/dev/font-size-calculator`, label: `Font Size Calculator` },
        ]}
        tipsSection={`Native CSS aspect-ratio for modern browsers. aspect-ratio: 16/9 works in Chrome 88+, Firefox 89+, Safari 15+. Padding-top hack only needed for IE11/legacy.

9:16 for vertical video. TikTok, Reels, Shorts use portrait 9:16 (1080x1920).

aspect-ratio + object-fit for images. img { aspect-ratio: 16/9; width: 100%; object-fit: cover } maintains ratio, fills container, crops rather than distorts.

Square != circle. border-radius: 50% on a 200x100px element produces an ellipse. Always verify the element is square for true circles.`}
        conclusion={`Aspect ratios appear throughout responsive design — video embeds, image cards, social assets. This calculator handles arithmetic in both directions. For layout: [CSS Grid Generator](/calculators/dev/grid-generator) and [Responsive Breakpoints](/calculators/dev/responsive-breakpoints).`}
      />
      <div className="mt-8 space-y-3">
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
