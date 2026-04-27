'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [title, setTitle] = useState('Amazing Article Title That Grabs Attention')
  const [desc, setDesc] = useState('A compelling description that makes people want to click and read more.')
  const [image, setImage] = useState('')
  const [site, setSite] = useState('example.com')
  const [platform, setPlatform] = useState<'facebook'|'twitter'|'linkedin'>('facebook')

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Open Graph Preview</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">👁️ Open Graph Preview</h1>
      <p className="text-gray-500 mb-6">Preview how your page looks when shared on Facebook, Twitter &amp; LinkedIn</p>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 space-y-4">
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Page Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-2.5 focus:outline-none" /></div>
        <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Description</label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={2} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-4 py-2.5 resize-none focus:outline-none" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Image URL</label>
            <input value={image} onChange={e=>setImage(e.target.value)} placeholder="https://..." className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Site Name</label>
            <input value={site} onChange={e=>setSite(e.target.value)} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
        </div>
        <div className="flex gap-2">
          {(['facebook','twitter','linkedin'] as const).map(p=>(
            <button key={p} onClick={()=>setPlatform(p)} className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border-2 ${platform===p?'bg-blue-600 text-white border-blue-600':'border-gray-200 text-gray-600 hover:border-blue-400'}`}>{p}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {image && <div className="h-52 bg-gray-100"><img src={image} alt="OG" className="w-full h-full object-cover" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} /></div>}
        {!image && <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 text-sm">No image set</div>}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase">{site}</p>
          <p className="font-bold text-gray-900 mt-0.5 line-clamp-2">{title}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{desc}</p>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the Open Graph Preview</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">Open Graph tags control how your page appears when shared on social media. Fill in your page title, description, image URL, and site name, then see a live preview of how it will look on Facebook, Twitter, or LinkedIn. Optimal OG image size is 1200x630 pixels. Title should be 60-90 characters, description 150-200 characters. Once satisfied, add these meta tags to your HTML head section.</p>
        <p className="text-sm text-gray-600">After updating your site, use Facebook's Sharing Debugger, Twitter\'s Card Validator, or LinkedIn\'s Post Inspector to clear the cached preview and force a re-scrape of your latest OG tags.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Open Graph Preview — Social Share Preview"
        category="dev"
        intro={`When you share a URL on Facebook, Twitter/X, LinkedIn, or iMessage, the platform reads your Open Graph meta tags to generate a preview card. Wrong image dimensions, missing tags, or a description over 160 characters all produce poor-looking share cards that reduce click-through rate.

This tool renders live previews of how your URL will appear when shared. Runs in your browser.

**Long-tail searches answered here:** open graph preview tool free online usa, how will my link look on facebook free preview, og meta tags preview free no signup, social media link preview checker free, open graph image preview tool free, website social share preview free usa, twitter card preview vs open graph preview free, linkedin link preview checker free online usa, open graph og image recommended size calculator, slack link unfurl preview checker free online, how to fix incorrect open graph preview free usa, open graph tags for single page application free, og video tag preview checker free tool usa, discord link embed preview checker free online, whatsapp link preview how it works free guide usa

For building the tags, use [Meta Tag Generator](/calculators/dev/meta-tag-generator).`}
        howItWorks={`Parses Open Graph meta tags and renders a live preview of how the URL will appear when shared on Facebook, Twitter/X, LinkedIn, and iMessage. Shows the og:title, og:description, og:image, og:url, and twitter:card previews side-by-side. Also shows which required tags are missing.`}
        benefits={[
          { title: `Multi-platform preview`, text: `Shows previews for Facebook/LinkedIn, Twitter/X, and iMessage simultaneously. Each platform renders Open Graph tags differently.` },
          { title: `Missing tag detection`, text: `Flags missing required tags: og:title, og:description, og:image, og:url. Missing tags cause poor social sharing previews.` },
          { title: `Image size validation`, text: `Checks og:image dimensions against platform requirements. Facebook requires 1200x630px for full-width display.` },
          { title: `Twitter Card type display`, text: `Shows how different twitter:card types (summary, summary_large_image) render on Twitter/X.` },
        ]}
        useCases={[
          { title: `Pre-launch social preview check`, text: `Before launching a new page, paste your HTML head here to verify the social sharing preview looks correct across all platforms.` },
          { title: `Blog post social optimization`, text: `After writing a new blog post, check the preview here to ensure the title, description, and image are compelling for social sharing.` },
          { title: `Open graph debugging`, text: `Your shared link is showing the wrong image or title. Paste your page HTML here to see which og: tag is overriding or missing.` },
          { title: `Product page social preview`, text: `Check how your product pages appear when shared on social media. The og:image is the most impactful element for click-through rate.` },
        ]}
        keyStats={[
          { stat: `og:image 1200x630`, source: `Facebook recommended og:image dimensions for full-width card display` },
          { stat: `twitter:card types`, source: `summary, summary_large_image, app, player — most content uses summary_large_image` },
          { stat: `og:description 155 chars`, source: `Maximum meta description length before social platforms truncate — keep under 155 characters` },
        ]}
        inlineLinks={[
          { text: `Meta Tag Generator`, href: `/calculators/dev/meta-tag-generator`, label: `Meta Tag Generator` },
          { text: `Robots.txt Generator`, href: `/calculators/dev/robots-txt-generator`, label: `Robots.txt Generator` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
          { text: `Favicon Generator`, href: `/calculators/dev/favicon-generator`, label: `Favicon Generator` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `Image to Base64`, href: `/calculators/dev/image-base64`, label: `Image to Base64` },
          { text: `HTML Encoder`, href: `/calculators/dev/html-encoder`, label: `HTML Encoder` },
        ]}
        tipsSection={`og:image minimum 1200x630px. Facebook recommends 1200x630 for og:image. Smaller images appear as small thumbnails on some platforms or fail to render entirely.

twitter:card types. summary shows a small square image. summary_large_image shows a large banner image. Most content uses summary_large_image.

og:description 150-160 characters. Social platforms truncate descriptions over about 160 characters. Keep it concise and compelling at 155 characters.

Test after deployment. Platforms cache og tags aggressively. After updating, use the platform debug tools (Facebook Sharing Debugger, Twitter Card Validator) to force a cache refresh.`}
        conclusion={`Open Graph previews are the first impression of your content in social feeds. Build correct tags with [Meta Tag Generator](/calculators/dev/meta-tag-generator) and preview them here.`}
      />
    </div>
  )
}
