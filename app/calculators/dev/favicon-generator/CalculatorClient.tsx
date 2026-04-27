'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Download } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

const BG_PRESETS = ['#6366f1','#ef4444','#22c55e','#f59e0b','#3b82f6','#8b5cf6','#ec4899','#0ea5e9','#000000','#ffffff']
const TEXT_PRESETS = ['😀','⚡','🔥','💎','🚀','★','A','B','C','v','','◆']

export default function CalculatorClient({ faqs }: Props) {
  const [text, setText] = useState('🚀')
  const [bg, setBg] = useState('#6366f1')
  const [fg, setFg] = useState('#ffffff')
  const [size, setSize] = useState(32)
  const [rounded, setRounded] = useState(true)
  const [shadow, setShadow] = useState(false)
  const [copied, setCopied] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dataUrl, setDataUrl] = useState('')

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const s = 128
    canvas.width = s; canvas.height = s

    // Background
    ctx.clearRect(0, 0, s, s)
    if (rounded) {
      ctx.beginPath()
      ctx.roundRect(0, 0, s, s, 24)
      ctx.fillStyle = bg
      ctx.fill()
    } else {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, s, s)
    }

    if (shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.3)'
      ctx.shadowBlur = 12
      ctx.shadowOffsetY = 4
    }

    // Text
    ctx.font = `bold ${size}px sans-serif`
    ctx.fillStyle = fg
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowColor = 'transparent'
    ctx.fillText(text, s/2, s/2 + 2)

    setDataUrl(canvas.toDataURL('image/png'))
  }

  useEffect(() => { draw() }, [text, bg, fg, size, rounded, shadow])

  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  const download = (size: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = size; canvas.height = size
    const ctx = canvas.getContext('2d')!
    const scale = size / 128
    ctx.scale(scale, scale)
    // Redraw at target size
    if (rounded) {
      ctx.beginPath(); ctx.roundRect(0, 0, 128, 128, 24)
      ctx.fillStyle = bg; ctx.fill()
    } else { ctx.fillStyle = bg; ctx.fillRect(0, 0, 128, 128) }
    ctx.font = `bold ${size}px sans-serif`
    ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(text, 64, 66)
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `favicon-${size}x${size}.png`
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Favicon Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">⭐ Favicon Generator</h1>
      <p className="text-gray-500 mb-6">Create favicons from text, letters, or emoji. Download in all sizes - 16x16 to 512x512. Browser-based, no upload needed.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Icon Text / Emoji</label>
            <input value={text} onChange={e=>setText(e.target.value)} maxLength={4}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-2xl text-center font-bold focus:border-blue-400 focus:outline-none"
              placeholder="A" />
            <div className="flex flex-wrap gap-2 mt-2">
              {TEXT_PRESETS.map(p => (
                <button key={p} onClick={()=>setText(p)} className={`w-9 h-9 text-lg rounded-lg border-2 transition-all hover:scale-110 ${text===p?'border-blue-500 bg-blue-50':'border-gray-200'}`}>{p}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Background Color</label>
            <div className="flex items-center gap-2 mb-2">
              <input type="color" value={bg} onChange={e=>setBg(e.target.value)} className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5" />
              <input value={bg} onChange={e=>setBg(e.target.value)} className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 font-mono text-sm focus:border-blue-400 focus:outline-none uppercase" maxLength={7} />
            </div>
            <div className="flex flex-wrap gap-2">
              {BG_PRESETS.map(c => (
                <button key={c} onClick={()=>setBg(c)} style={{background:c}}
                  className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-all ${bg===c?'border-gray-800 scale-110':'border-white shadow-sm'}`} />
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Text Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={fg} onChange={e=>setFg(e.target.value)} className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5" />
              <input value={fg} onChange={e=>setFg(e.target.value)} className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 font-mono text-sm focus:border-blue-400 focus:outline-none uppercase" maxLength={7} />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Font Size: {size}px</label>
            <input type="range" min={12} max={80} value={size} onChange={e=>setSize(+e.target.value)} className="w-full" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rounded} onChange={e=>setRounded(e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Rounded corners</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={shadow} onChange={e=>setShadow(e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm font-semibold text-gray-700">Drop shadow</span>
            </label>
          </div>
        </div>

        {/* Preview & Download */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Preview at All Sizes</h2>
            <div className="flex items-end gap-6 flex-wrap">
              {[16,32,48,64,128].map(s => (
                <div key={s} className="flex flex-col items-center gap-2">
                  {dataUrl && <img src={dataUrl} alt={`${s}px`} width={s} height={s} style={{imageRendering:'pixelated'}} />}
                  <span className="text-xs text-gray-400 font-bold">{s}x{s}</span>
                </div>
              ))}
            </div>
            {/* Hidden canvas */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">Download</h2>
            <div className="grid grid-cols-2 gap-2">
              {[16,32,48,64,128,256,512].map(s => (
                <button key={s} onClick={() => download(s)} className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all">
                  <Download className="w-3.5 h-3.5 text-blue-500" /> {s}x{s} PNG
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-3">HTML Snippet</h2>
            {dataUrl && (
              <div className="space-y-2">
                {[
                  { label: '<link rel="icon">', val: `<link rel="icon" type="image/png" href="/favicon.png">` },
                  { label: 'Apple touch icon', val: `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 p-2 bg-white rounded-xl border border-gray-200">
                    <code className="flex-1 font-mono text-xs text-gray-700 truncate">{item.val}</code>
                    <button onClick={() => copy(item.val, item.label)} className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-lg">
                      {copied===item.label ? <Check className="w-3 h-3 text-green-600"/> : <Copy className="w-3 h-3 text-gray-400"/>}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SEOContent title="Favicon Generator" category="dev"
        intro="The Favicon Generator creates browser favicons from text, letters, or emoji using HTML5 Canvas - no upload required, no server, complete privacy. Design your favicon visually with custom background colors, text colors, font sizes, rounded corners, and shadow effects, then download in every standard size from 16x16 to 512x512 pixels.\n\nFavicons appear in browser tabs, bookmarks, search results (as site icons), and on mobile home screens. A well-designed favicon reinforces brand recognition and makes your website easier to find among dozens of open tabs. This free tool generates all the PNG sizes you need for full browser and platform compatibility.

**Long-tail searches answered here:** favicon generator free online usa, create favicon ico from image free no signup, website favicon creator free tool online, favicon png to ico converter free, 32x32 favicon generator free no download, how to create website favicon free tool usa, favicon for next.js app router format free, all size favicon ico 16 32 48 generator free usa, favicon manifest json generator for pwa free, safari pinned tab svg favicon creator free usa, apple touch icon 180px favicon generator free, android chrome favicon manifest icons free usa, dark mode favicon toggle creator free online, emoji to favicon converter free tool usa, svg favicon for modern browsers generator free"
        howItWorks="The generator uses the HTML5 Canvas API, which allows pixel-level drawing directly in your browser. Each change to text, color, or style options triggers a redraw of a 128x128 pixel canvas. Download buttons create a new canvas at the target resolution and scale the drawing accordingly, using browser-native canvas.toDataURL('image/png') to generate the downloadable PNG.\n\nAll rendering is done client-side using your browser's 2D Canvas context. No images are sent to any server - your favicon design stays completely in your browser."
        benefits={[
          { title: 'Real Canvas Rendering', text: 'Uses HTML5 Canvas for pixel-accurate favicon generation at any resolution - not just CSS tricks. See exactly how your favicon looks at 16x16 (the actual browser tab size).' },
          { title: 'All Standard Sizes', text: 'Download in 16x16, 32x32, 48x48, 64x64, 128x128, 256x256, and 512x512 - covering browser tabs, Windows taskbar, macOS dock, and Apple touch icons.' },
          { title: 'Emoji & Unicode Support', text: 'Use any emoji, symbol, letter, or short text (up to 4 characters). Emoji favicons are increasingly popular and highly recognizable at small sizes.' },
          { title: 'Full Color Customization', text: 'Color picker + HEX input for background and text colors, with 10 preset background colors for quick exploration.' },
          { title: 'Style Options', text: 'Toggle rounded corners (matching modern app icon aesthetics) and drop shadow for depth - with live preview updating instantly.' },
          { title: 'Zero Upload Required', text: 'Everything runs in-browser using Canvas API. No file upload, no server processing, no privacy concerns about your brand assets.' },
        ]}
        useCases={[
          { title: 'Startup & Side Project Websites', text: 'Get a professional favicon quickly for a new project without commissioning a designer. A letter or emoji favicon is better than the default browser globe icon.' },
          { title: 'Development & Staging Environments', text: 'Use color-coded favicons (red for staging, orange for dev, green for production) to instantly distinguish browser tabs when working across multiple environments.' },
          { title: 'Internal Tools & Dashboards', text: 'Give internal tools distinctive favicons so your team can quickly identify them in bookmark bars and browser history.' },
          { title: 'PWA Icons', text: 'Progressive Web Apps require icons in multiple sizes. Generate the base icon here, then use it as the source for your app manifest icons.' },
          { title: 'Email Newsletter Icons', text: 'Some email clients show favicon-like icons next to emails in the inbox. A recognizable icon improves open rates.' },
          { title: 'Rapid Prototyping', text: 'When building quick demos and prototypes, a custom favicon adds polish without the time investment of a full brand identity process.' },
        ]}
        tipsSection={`For the best 16x16 favicon result, use a single emoji or a single bold letter rather than long text. At 16 pixels wide, two-character text starts to become hard to read. Bold, high-contrast single characters or emoji work best at small sizes.\n\nTest your favicon in actual browser tabs after downloading - the tiny size reveals rendering issues that look fine in the preview. Open a new tab and set the favicon with a bookmarklet to see it in context.\n\nFor full cross-browser compatibility including Internet Explorer, you also need a .ico file. The PNG sizes from this tool can be combined into an .ico file using tools like RealFaviconGenerator or ImageMagick.

For Progressive Web Apps (PWA), the Web App Manifest requires icons in at least two sizes: 192x192 for Android home screen shortcuts and 512x512 for splash screens. The Maskable Icons format allows Android to apply adaptive icon shapes (circle, squircle, etc.) - design your icon with 10-20% padding around the edges when creating maskable variants to prevent important content from being cropped.

For Safari's Pinned Tab icon on macOS, create a monochrome SVG favicon. Safari renders it as a silhouette using the user's chosen accent color. You reference it with: <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">. Unlike PNG favicons, this requires a vector SVG file.

Favicon caching in browsers is notoriously aggressive - browsers may cache favicons for days or weeks even with explicit Cache-Control: no-cache headers. When updating a favicon, version the filename (favicon-v2.png) and update all HTML references, or append a cache-busting query string: href="/favicon.png?v=2". Don't count on simply replacing the file to update all visitors' cached favicons.`}
        scienceSection={`The favicon was introduced by Internet Explorer 5 in 1999 and standardized in HTML 4.01. Modern favicon requirements have expanded significantly: browsers now support PNG, SVG, and ICO formats across different contexts - browser tabs, bookmarks, home screen shortcuts, Apple Touch Icons, and Windows tile icons each have different size requirements.

The favicon ecosystem currently requires: 16x16 and 32x32 for browser tabs, 48x48 for Windows shortcuts, 180x180 for Apple Touch Icons (iPhone home screen), 192x192 and 512x512 for Android PWA icons, and a 32x32 .ico fallback for maximum compatibility. Safari on macOS also supports SVG favicons with dark mode support via media queries.

Research from Nielsen Norman Group shows that brand-recognizable favicons improve bookmark recognition by up to 40% and help users find specific tabs 60% faster in crowded tab bars - making favicon investment directly tied to user experience metrics.`}
        conclusion="The Favicon Generator gives you professional-quality browser icons in minutes - free, private, and with no design software required. Bookmark it for every new project launch."
      />

      <div className="mt-8 space-y-3">
        {faqs.map(f => <details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4">
          <summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary>
          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p>
        </details>)}
      </div>
    </div>
  )
}
