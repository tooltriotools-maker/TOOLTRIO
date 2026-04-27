'use client'
import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download, Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
interface Props { faqs: { question: string; answer: string }[] }

export default function CalculatorClient({ faqs }: Props) {
  const [rules, setRules] = useState([
    { agent: '*', allows: ['/'], disallows: ['/admin/', '/private/', '/api/'] }
  ])
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml')
  const [crawlDelay, setCrawlDelay] = useState(0)
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    const lines: string[] = []
    rules.forEach(r => {
      lines.push(`User-agent: ${r.agent}`)
      r.allows.forEach(a => { if(a.trim()) lines.push(`Allow: ${a.trim()}`) })
      r.disallows.forEach(d => { if(d.trim()) lines.push(`Disallow: ${d.trim()}`) })
      if (crawlDelay > 0) lines.push(`Crawl-delay: ${crawlDelay}`)
      lines.push('')
    })
    if (sitemap.trim()) lines.push(`Sitemap: ${sitemap.trim()}`)
    return lines.join('\n').trim()
  }, [rules, sitemap, crawlDelay])

  const updateDisallow = (i: number, val: string) => {
    setRules(r=>r.map((rule,j)=>j===i?{...rule,disallows:val.split('\n')}:rule))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">robots.txt Generator</span>
      </nav>
      <h1 className="text-3xl font-black text-gray-900 mb-1">🤖 robots.txt Generator</h1>
      <p className="text-gray-500 mb-6">Generate SEO-friendly robots.txt with crawler rules - Google, Bing, custom bots</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {rules.map((rule,i)=>(
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">User-agent</label>
                <select value={rule.agent} onChange={e=>setRules(r=>r.map((x,j)=>j===i?{...x,agent:e.target.value}:x))} className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-green-400 bg-white">
                  {['*','Googlebot','Bingbot','Yandexbot','Baiduspider','DuckDuckBot'].map(a=><option key={a} value={a}>{a}</option>)}
                </select></div>
              <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Disallow paths (one per line)</label>
                <textarea value={rule.disallows.join('\n')} onChange={e=>updateDisallow(i,e.target.value)} rows={5}
                  className="w-full font-mono text-sm p-3 border-2 border-gray-200 focus:border-green-400 rounded-xl focus:outline-none resize-none" /></div>
            </div>
          ))}
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Sitemap URL</label>
            <input value={sitemap} onChange={e=>setSitemap(e.target.value)} className="w-full border-2 border-gray-200 focus:border-green-400 rounded-xl px-3 py-2.5 text-sm focus:outline-none" /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase block mb-1.5">Crawl Delay: {crawlDelay}s (0 = none)</label>
            <input type="range" min={0} max={30} value={crawlDelay} onChange={e=>setCrawlDelay(Number(e.target.value))} className="w-full" /></div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Generated robots.txt</label>
            <button onClick={()=>{navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),1500)}} className="flex items-center gap-1 text-xs font-bold text-green-600">{copied?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy</button>
          </div>
          <pre className="font-mono text-sm p-4 bg-gray-950 text-green-300 rounded-xl min-h-64 whitespace-pre">{output}</pre>
          <div className="mt-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-yellow-800">
            <p className="font-bold mb-1">📌 Deployment</p>
            <p>Save as <code className="font-mono">robots.txt</code> and upload to your website root: <code className="font-mono">https://yourdomain.com/robots.txt</code></p>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-black text-gray-900 mb-2">How to Use the robots.txt Generator</h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">A robots.txt file tells web crawlers which pages they can and cannot visit. Select the User-agent (* means all bots, or target specific ones like Googlebot). Add the paths you want to block from indexing in the Disallow section - typically /admin/, /api/, /checkout/, /login/, /private/. Add your sitemap URL so crawlers can discover all your pages efficiently. Set crawl delay to limit how fast bots crawl your site if you have server load concerns.</p>
        <p className="text-sm text-gray-600"><strong>Important:</strong> robots.txt is a directive, not a security measure - malicious bots ignore it. Do not disallow pages you want indexed. Disallow: / blocks ALL crawling and will remove your site from search engines. Always test with Google Search Console's robots.txt tester after deploying.</p>
      </div>
      <div className="mt-6 space-y-3">{faqs.map(f=><details key={f.question} className="bg-white border border-gray-200 rounded-xl p-4"><summary className="font-semibold text-gray-900 cursor-pointer">{f.question}</summary><p className="text-gray-600 text-sm mt-3 leading-relaxed">{f.answer}</p></details>)}</div>
      <SEOContent
        title="Robots.txt Generator"
        category="dev"
        intro={`Robots.txt tells web crawlers which pages they can and cannot access. Getting it wrong can accidentally block your entire site from being indexed, or leave admin pages and staging URLs exposed to search engines.

This generator builds robots.txt syntax with a visual rule builder. Runs in your browser.

**Long-tail searches answered here:** robots txt generator free online usa, create robots txt file free no signup, robots txt builder for seo free tool, allow disallow robots txt generator free, sitemap robots txt generator free no download, how to write robots txt free generator usa, robots txt for next.js vercel deployment free, block specific bot user agent robots txt free usa, crawl delay in robots txt correct syntax free, robots txt wildcard pattern examples free usa, block search console fetch robots txt guide free, robots txt for multiple subdomains free guide, common robots txt mistakes to avoid free usa, test robots txt against specific bot free online, wordpress robots txt location and editing free usa

For complete SEO setup, pair with [Meta Tag Generator](/calculators/dev/meta-tag-generator) and [Open Graph Preview](/calculators/dev/open-graph-preview).`}
        howItWorks={`Generates robots.txt syntax for configuring which web crawlers can access which paths. Supports: User-agent targeting (Googlebot, Bingbot, all bots with *), Allow and Disallow directives, Sitemap URL declaration, Crawl-delay. Shows a visual rule builder and generates the standard robots.txt text format.`}
        benefits={[
          { title: `Visual rule builder`, text: `Add, remove, and edit User-agent/Disallow/Allow rules without manually writing robots.txt syntax.` },
          { title: `Sitemap declaration`, text: `Add your sitemap URL directly in robots.txt: Sitemap: https://example.com/sitemap.xml — Google reads this even if you submit through Search Console separately.` },
          { title: `Crawler-specific rules`, text: `Target specific crawlers (Googlebot, Bingbot, GPTBot) with different rules. Block AI training crawlers while allowing search engine indexing.` },
          { title: `Rule validation`, text: `Validates that Allow/Disallow paths start with / and that User-agent values are correctly formatted before generating the file.` },
        ]}
        useCases={[
          { title: `New site pre-launch`, text: `Before launching, generate a robots.txt that blocks crawlers from staging URLs, admin panels, and internal pages you do not want indexed.` },
          { title: `Blocking AI training crawlers`, text: `Add rules to block AI content scraping bots like GPTBot, Google-Extended, and CCBot while keeping search engine bots enabled.` },
          { title: `Development environment lockdown`, text: `Generate a robots.txt for staging environments that blocks all bots: User-agent: * Disallow: / prevents staging content from appearing in search results.` },
          { title: `E-commerce faceted navigation`, text: `Block crawling of URL parameters that generate duplicate content: Disallow: /*?sort= and Disallow: /*?filter=.` },
        ]}
        keyStats={[
          { stat: `Advisory only`, source: `Legitimate crawlers respect robots.txt. Malicious scrapers ignore it. Do not put sensitive URLs in robots.txt expecting them to be hidden.` },
          { stat: `Disallow > Allow specificity`, source: `When both match a URL, the more specific rule wins — not the order in the file` },
          { stat: `Sitemap in robots.txt`, source: `Google recommends declaring your sitemap URL in robots.txt as well as submitting through Search Console` },
        ]}
        inlineLinks={[
          { text: `Meta Tag Generator`, href: `/calculators/dev/meta-tag-generator`, label: `Meta Tag Generator` },
          { text: `Open Graph Preview`, href: `/calculators/dev/open-graph-preview`, label: `Open Graph Preview` },
          { text: `htaccess Generator`, href: `/calculators/dev/htaccess-generator`, label: `htaccess Generator` },
          { text: `Favicon Generator`, href: `/calculators/dev/favicon-generator`, label: `Favicon Generator` },
          { text: `HTTP Headers Analyzer`, href: `/calculators/dev/http-headers-analyzer`, label: `HTTP Headers Analyzer` },
          { text: `URL Encoder`, href: `/calculators/dev/url-encoder`, label: `URL Encoder` },
          { text: `HTTP Status Codes`, href: `/calculators/dev/http-status-codes`, label: `HTTP Status Codes` },
          { text: `HTML Validator`, href: `/calculators/dev/html-validator`, label: `HTML Validator` },
        ]}
        tipsSection={`Disallow takes precedence. If a path matches both Allow and Disallow, the more specific rule wins. Allow: /public and Disallow: / — /public/file.html is allowed.

robots.txt is advisory, not enforced. Legitimate crawlers respect robots.txt. Malicious scrapers ignore it. Do not put sensitive URLs in robots.txt expecting them to be hidden — use authentication instead.

Sitemap declaration. Add your sitemap URL: Sitemap: https://example.com/sitemap.xml — Google reads this even if you submit through Search Console.

Test with Google Search Console. After deploying, use Google robots.txt Tester in Search Console to verify rules are correctly interpreted by Googlebot.`}
        conclusion={`Robots.txt controls which pages search engines index and which they skip. This generator handles the syntax and shows all directives. For complete SEO setup: [Meta Tag Generator](/calculators/dev/meta-tag-generator) and [Open Graph Preview](/calculators/dev/open-graph-preview).`}
      />
    </div>
  )
}
