import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Image to Base64 Converter — Data URI Generator Free',
  description: 'Convert images to Base64 data URIs for inline embedding in HTML, CSS, and JavaScript. Supports PNG, JPEG, GIF, SVG, WebP. Runs entirely in your browser.',
  slug: 'image-base64',
  keywords: ['image to base64 online free','base64 image encoder browser','convert image to data uri free','image base64 string generator','inline image base64 tool'],
})

const faqs = [
  { question: 'When should I use a Base64 data URI instead of a regular image URL?', answer: "Data URIs are worth using for: small icons under 5KB where eliminating an HTTP request is beneficial, images that must be available without a network request (offline-first PWAs), images embedded in HTML emails where external URLs may be blocked by email clients, CSS sprite alternatives for very small repeated graphics, and placeholder images shown while the real image loads. Do not use data URIs for large images — a 100KB PNG becomes a 133KB data URI, inflating your HTML/CSS file, delaying parsing, and preventing the browser from loading images in parallel." },
  { question: 'Why does the Base64 size come out larger than the original image?', answer: "Base64 encoding converts every 3 bytes of binary data into 4 ASCII characters — a 33.3% size overhead. A 90KB PNG becomes 120KB as a data URI. Additionally, data URIs embedded in HTML or CSS are not separately cacheable by the browser — every page load that includes the HTML re-parses the base64 string, while a separate image file is cached and reused across pages. For small decorative images (spinner icons, spacers), the overhead is acceptable. For anything larger, use a proper image URL with correct caching headers." },
  { question: 'How do I use a Base64 image in CSS background-image?', answer: "background-image: url('data:image/png;base64,iVBORw0KGgo...'). The data URI format: data:[mediatype];base64,[data]. For SVG: data:image/svg+xml;base64,[base64encodedsvg] or for SVG you can skip base64 and use URL encoding: url('data:image/svg+xml,...'). SVG data URIs do not need Base64 encoding — the SVG XML can be URL-encoded directly, which is often more compact. Note: data URIs in CSS files are not separately cached, so inline them only for rarely-changing base styles." },
  { question: 'Can I convert SVG to a data URI without Base64 encoding?', answer: "Yes — SVG is text (XML) so it can be directly URL-encoded: url('data:image/svg+xml,%3Csvg xmlns...%3E...'). Use encodeURIComponent() on the SVG string, then embed it. This is often more efficient than Base64-encoding SVG because the encoded SVG compresses better (it remains text-like for gzip). Alternatively, for SVG icons in CSS, consider using the SVG directly in HTML and referencing it via CSS filter or clip-path, or using a sprite sheet. The SVG Optimizer on this site reduces SVG size before converting." },
  { question: 'How do I convert Base64 back to an image file?', answer: "In a browser: const link = document.createElement('a'); link.href = dataUri; link.download = 'image.png'; link.click(). In Node.js: const buffer = Buffer.from(base64String, 'base64'); fs.writeFileSync('image.png', buffer). In Python: import base64; open('image.png', 'wb').write(base64.b64decode(base64string)). On the command line: echo 'BASE64_STRING' | base64 -d > image.png (Linux/Mac). The key: strip the data URI prefix (data:image/png;base64,) before decoding if it is present." },
  { question: 'How do HTML email clients handle images — should I use Base64?', answer: "Yes — for HTML emails, embedding images as Base64 data URIs is one of the most reliable approaches. External image URLs are blocked by many email clients by default (Outlook, Gmail with tracking protection, corporate email servers). Data URIs bypass this since the image data is in the email itself. Caveat: some older email clients (particularly Outlook on Windows) have limited data URI support. A common compromise: use data URIs for the most critical images (logo, header) and use externally hosted images with a text fallback for others. Always test HTML emails across clients with Litmus or Email on Acid." },
  { question: 'What other image and encoding tools are on this site?', answer: "The SVG Optimizer reduces SVG file sizes before converting to data URI. The Base64 Encoder handles text and other data types beyond images. The Favicon Generator creates all required icon sizes from a source image. The Color Converter translates image color codes between formats. The Aspect Ratio Calculator ensures images maintain correct proportions after embedding. All are in the Dev Tools section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Image to Base64 Converter — Data URI Generator Free',
    description: 'Convert images to Base64 data URIs for inline embedding in HTML, CSS, and JavaScript. Supports PNG, JPEG, GIF, SVG, WebP. Runs entirely in your browser.',
    slug: 'image-base64',
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
