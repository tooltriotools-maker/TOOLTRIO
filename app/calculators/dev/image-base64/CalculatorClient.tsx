'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, Upload, X } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [dataUri, setDataUri] = useState('')
  const [mimeType, setMimeType] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [fileName, setFileName] = useState('')
  const [b64Only, setB64Only] = useState('')
  const [copied, setCopied] = useState('')
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [decodeInput, setDecodeInput] = useState('')
  const [decodedImg, setDecodedImg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const copy = (v: string, k: string) => { navigator.clipboard.writeText(v); setCopied(k); setTimeout(()=>setCopied(''),1500) }

  const handleFile = (file: File) => {
    setFileName(file.name)
    setMimeType(file.type)
    setFileSize(file.size)
    const reader = new FileReader()
    reader.onload = e => {
      const result = e.target?.result as string
      setDataUri(result)
      setB64Only(result.split(',')[1] || '')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer?.files[0]
    if (file) handleFile(file)
  }

  const handleDecode = () => {
    const input = decodeInput.trim()
    if (!input) return
    const src = input.startsWith('data:') ? input : `data:image/png;base64,${input}`
    setDecodedImg(src)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes/1024).toFixed(1)} KB`
    return `${(bytes/1048576).toFixed(2)} MB`
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-blue-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Image to Base64</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🖼️ Image to Base64 Converter</h1>
      <p className="text-gray-500 mb-6">Convert images to Base64 Data URIs for CSS backgrounds, HTML img tags, and JSON APIs. Also decode Base64 back to images.</p>

      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        {(['encode','decode'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`px-5 py-2.5 rounded-xl font-bold text-sm capitalize transition-all ${mode===m?'bg-blue-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {m === 'encode' ? '📷 Image -> Base64' : '🔓 Base64 -> Image'}
          </button>
        ))}
      </div>

      {mode === 'encode' ? (
        <>
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all mb-5"
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="font-bold text-gray-700">Drop image here or click to upload</p>
            <p className="text-sm text-gray-400 mt-1">PNG, JPG, SVG, GIF, WebP - any image format</p>
          </div>

          {dataUri && (
            <div className="space-y-4">
              {/* Preview + info */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex gap-4 items-start">
                <img src={dataUri} alt="Preview" className="w-24 h-24 object-contain rounded-xl border border-gray-100 bg-gray-50 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{fileName}</p>
                  <p className="text-sm text-gray-500">{mimeType} - Original: {formatSize(fileSize)} - Base64: {formatSize(b64Only.length)}</p>
                  <p className="text-xs text-gray-400 mt-1">Size increase: ~{Math.round((b64Only.length / fileSize - 1) * 100)}% (expected - Base64 is ~33% larger)</p>
                </div>
              </div>

              {/* Output formats */}
              {[
                { label: 'Data URI (for CSS / HTML src)', val: dataUri, key: 'datauri' },
                { label: 'Base64 only (no prefix)', val: b64Only, key: 'b64only' },
                { label: 'HTML img tag', val: `<img src="${dataUri}" alt="image" />`, key: 'htmltag' },
                { label: 'CSS background-image', val: `background-image: url('${dataUri}');`, key: 'css' },
                { label: 'JSON value', val: `"image": "${dataUri}"`, key: 'json' },
              ].map(item => (
                <div key={item.key} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-600 uppercase">{item.label}</span>
                    <button onClick={() => copy(item.val, item.key)} className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
                      {copied===item.key ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy</>}
                    </button>
                  </div>
                  <code className="text-xs font-mono text-gray-700 break-all line-clamp-2">{item.val.substring(0, 200)}{item.val.length > 200 ? '...' : ''}</code>
                </div>
              ))}

              <button onClick={() => { setDataUri(''); setB64Only(''); setFileName('') }} className="flex items-center gap-2 text-sm text-red-500 font-bold hover:text-red-600">
                <X className="w-4 h-4" /> Clear
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Paste Base64 or Data URI</label>
            <textarea
              value={decodeInput}
              onChange={e => setDecodeInput(e.target.value)}
              rows={5}
              className="w-full border-2 border-gray-200 rounded-xl p-3 font-mono text-xs focus:border-blue-400 focus:outline-none resize-y"
              placeholder="Paste data:image/png;base64,... or just the base64 string..."
            />
            <button onClick={handleDecode} className="mt-3 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
              Decode &amp; Preview →
            </button>
          </div>
          {decodedImg && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
              <img src={decodedImg} alt="Decoded" className="max-w-full max-h-64 object-contain mx-auto rounded-xl border border-gray-100" onError={() => setDecodedImg('')} />
              <p className="text-xs text-green-600 font-bold mt-2">✅ Successfully decoded!</p>
            </div>
          )}
        </div>
      )}

      <SEOContent title="Image to Base64 Converter" category="dev"
        intro="The Image to Base64 Converter transforms any image file into a Base64-encoded Data URI for embedding directly in HTML, CSS, JavaScript, or JSON - eliminating external HTTP requests for small icons and critical UI assets. This free browser-based tool handles PNG, JPG, SVG, GIF, WebP, and any other image format, generating ready-to-paste code in multiple formats with one click.\n\nAll encoding happens entirely client-side - your images never leave your browser. For privacy-sensitive assets, this is critical: logos, icons, and UI graphics are converted locally with zero server transmission. The tool also decodes Base64 strings back to viewable images for debugging and inspection.

**Long-tail searches answered here:** image to base64 converter free online usa, convert png jpg to base64 free no signup, base64 encode image online free tool, image base64 data uri generator free, how to embed image as base64 free tool, base64 image converter free no download usa, inline svg to base64 data uri converter free usa, base64 for css background image embedding free, convert webp image to base64 free online usa, base64 encoded image size estimator free, how to use base64 image in html email free usa, gif animation to base64 converter free online, base64 image vs external image performance comparison, canvas drawing to base64 export free tool usa, base64 image decode back to file download free"
        howItWorks="The conversion uses JavaScript's FileReader API with readAsDataURL(), which reads the image file as a Base64-encoded string prefixed with the data URI scheme (data:image/png;base64,...). The Base64 encoding maps every 3 bytes of binary data to 4 ASCII characters, causing a ~33% size increase - this tool shows you the exact size difference so you can make informed decisions about embedding vs linking.\n\nBase64 images are best used for small assets under 5KB where the HTTP request overhead exceeds the size penalty. For larger images, linking externally is almost always more performant."
        benefits={[
          { title: 'Drag & Drop Upload', text: 'Simply drag an image onto the tool or click to browse. Supports all image formats including SVG, WebP, and animated GIFs.' },
          { title: '5 Output Formats', text: 'Get your image as a Data URI, raw Base64, HTML img tag, CSS background-image, and JSON value - copy any format with one click.' },
          { title: 'Bidirectional Conversion', text: 'Encode images to Base64 or decode Base64 strings back to viewable images. Essential for debugging embedded images in APIs and databases.' },
          { title: 'Size Analysis', text: 'See original file size vs Base64 output size with the percentage increase - helps you decide whether embedding or external linking is better for performance.' },
          { title: 'Complete Privacy', text: 'All processing happens in your browser. Images never leave your device - critical for sensitive logos, user avatars, and proprietary design assets.' },
          { title: 'Zero Dependencies', text: 'No server upload required, no file size limits from upload restrictions. Works with multi-megabyte images entirely in-browser.' },
        ]}
        useCases={[
          { title: 'Email Template Development', text: 'Email clients block external images by default. Embed logos and icons as Base64 Data URIs to ensure images display without requiring the recipient to "enable images".' },
          { title: 'CSS Sprite Elimination', text: 'Small icons, arrows, and decorative elements embedded as Base64 in CSS eliminate HTTP requests, improving page load performance for critical above-the-fold assets.' },
          { title: 'API & JSON Payloads', text: 'When building mobile apps or APIs that need to transmit images in JSON responses, Base64 encoding is the standard approach - generate the correct format here.' },
          { title: 'Offline Web Apps (PWA)', text: 'Progressive Web Apps that must work offline embed critical assets as Base64 so the app shell renders correctly without a network connection.' },
          { title: 'Debugging Base64 Images', text: 'When a Base64 image in your database or API response looks broken, paste it here to decode and preview it - instantly diagnose encoding or truncation issues.' },
          { title: 'HTML-only Projects', text: 'Single-file HTML documents (documentation, portable reports) use Base64 images to keep everything in one file without external dependencies.' },
        ]}
        tipsSection={`Only embed images as Base64 if they are small (under 5-10KB) and used on almost every page. Larger images cost more in Base64 overhead than they save in HTTP request reduction - the browser can\'t cache Base64 embedded images separately.\n\nSVG icons are the ideal use case for Base64 embedding - they\'re small, scalable, and critical for UI rendering. A 1-2KB SVG icon embedded as Base64 loads instantly and is cached with the CSS file.\n\nFor email templates, always test embedded Base64 images in actual email clients (Gmail, Outlook, Apple Mail) - Base64 support varies and some clients have data URI size limits.

For optimizing SVG in CSS, instead of Base64 encoding, use URL-encoded SVG directly in CSS. The url() function accepts SVG text directly when properly encoded: background-image: url("data:image/svg+xml,<svg ...>"). This avoids the 33% Base64 overhead for SVG files. Special characters must be percent-encoded: # becomes %23, < becomes %3C, > becomes %3E, and spaces become %20.

For React applications, inline SVGs as React components (SVGr pattern) are preferable to Base64 embedded SVGs for icons. Webpack and Vite both support @svgr/webpack and @svgr/rollup plugins that transform SVG files into React components at build time: import ArrowIcon from './arrow.svg'. This approach enables CSS fill color control via currentColor, tree-shaking of unused icons, and semantic SVG accessibility.

When Base64 encoding images for email templates, be aware that many email security gateways scan Base64 encoded content for malware and may strip or flag data URIs. Test your email templates in actual email clients and through security scanning tools like Mail Tester before sending campaign emails. Some corporate email firewalls block all data URIs regardless of content.`}
        scienceSection={`Base64 encoding was defined in RFC 4648 (2006), superseding RFC 2045 (MIME encoding, 1996). The encoding maps each 3-byte binary sequence to 4 ASCII characters using a 64-character alphabet (A-Z, a-z, 0-9, +, /), producing exactly 4/3 the original size - a ~33.3% overhead that is the fundamental tradeoff of Base64 embedding.

Modern browser support for data URIs (Data URLs) was standardized in RFC 2397. All major browsers support data URIs without size limits in CSS, HTML attributes, and JavaScript. However, browsers cannot cache data URI images separately from the stylesheet or document - this is the primary performance disadvantage versus external image files which benefit from browser caching, CDN edge caching, and HTTP/2 multiplexing.

For SVG files, Base64 encoding is often unnecessary - SVG can be embedded directly as URL-encoded text in CSS: background-image: url("data:image/svg+xml,%3Csvg..."). This avoids the 33% size overhead while still achieving inline embedding.`}
        conclusion="The Image to Base64 Converter streamlines one of the most repetitive tasks in front-end development. Embed images directly in code, eliminate HTTP requests for small assets, and debug Base64 images in APIs - all in one free, private, browser-based tool."
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
