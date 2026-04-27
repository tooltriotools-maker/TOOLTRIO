import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'MIME Type Lookup — File Extension to Content-Type Free',
  description: 'Look up MIME types by file extension or Content-Type header. Covers 900+ file types. Essential for Content-Type headers and server configuration.',
  slug: 'mime-type-lookup',
  keywords: ['mime type lookup online free','file extension mime type finder','content-type header lookup browser','mime types reference free','what is the mime type of file'],
})

const faqs = [
  { question: "What is a MIME type and where is it used?", answer: `MIME (Multipurpose Internet Mail Extensions) types identify file or data stream formats: text/html, application/json, image/png, video/mp4. They appear in: HTTP Content-Type headers (server tells browser what format the response is), Accept headers (browser tells server what it can handle), HTML type attributes, and email attachment headers. Using the wrong Content-Type causes browsers to mishandle content — a text/plain JSON response is displayed as text rather than parsed as JSON.` },
  { question: "What MIME type should I use for JSON API responses?", answer: `application/json is correct. Content-Type: application/json; charset=UTF-8. Avoid: text/json (non-standard), text/plain (incorrect — displays raw in browser). For JSON:API spec: application/vnd.api+json. For GeoJSON: application/geo+json. For JSON-LD: application/ld+json. The application/ type indicates structured binary/non-human data; text/ indicates human-readable content.` },
  { question: "What is application/octet-stream and when do I use it?", answer: `application/octet-stream is the generic binary type — use when you do not know the specific format, or when forcing a download. When a browser receives application/octet-stream, it prompts for download rather than displaying inline. Set Content-Disposition: attachment; filename='file.ext' alongside it to provide a filename. Specific types allow inline display: image/png shows inline, application/pdf opens in PDF viewer. Use octet-stream for generic file download endpoints.` },
  { question: "What MIME type does WebAssembly (.wasm) use?", answer: `WebAssembly uses application/wasm. This matters: browsers require application/wasm to enable streaming compilation (WebAssembly.instantiateStreaming), which is significantly faster than buffered compilation from application/octet-stream. Configure in Nginx: types { application/wasm wasm; }. In Apache .htaccess: AddType application/wasm .wasm. Without the correct MIME type, WebAssembly loads and compiles but more slowly.` },
  { question: "Should I trust the MIME type for file upload security validation?", answer: `Never trust MIME type alone. The browser sends the type it detects from the file extension — a malicious user can rename a PHP script to image.png and the browser sends image/png. Server-side: check file extension AND verify actual file format by reading magic bytes (first bytes unique to each format). Python: python-magic library. Node.js: file-type package. For image uploads: always re-process through an image library (Sharp, Pillow) which rejects invalid images automatically.` },
  { question: "What MIME types do video and audio formats use?", answer: `Video: video/mp4 (.mp4), video/webm (.webm), video/ogg (.ogv), video/quicktime (.mov). Audio: audio/mpeg (.mp3), audio/ogg (.ogg), audio/wav (.wav), audio/aac (.aac), audio/flac (.flac). Streaming: application/x-mpegURL (.m3u8 HLS playlists), application/dash+xml (.mpd DASH manifests). For media source extensions, the codec string matters: video/mp4; codecs='avc1.42E01E, mp4a.40.2' specifies H.264 video and AAC audio.` },
  { question: "What other HTTP tools are on this site?", answer: `The HTTP Headers Analyzer decodes Content-Type and Accept headers in HTTP responses. The .htaccess Generator creates Apache AddType directives for correct MIME type serving. The HTTP Status Codes reference covers 415 Unsupported Media Type. The curl Builder generates requests with specific Content-Type headers. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'MIME Type Lookup — File Extension to Content-Type Free',
    description: 'Look up MIME types by file extension or Content-Type header. Covers 900+ file types. Essential for Content-Type headers and server configuration.',
    slug: 'mime-type-lookup',
    faqs,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.webApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
      {jsonLd.faqPage && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqPage) }} />
      )}
      <CalculatorClient faqs={faqs} />
    </>
  )
}
