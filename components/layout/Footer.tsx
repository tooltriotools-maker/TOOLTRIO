import Link from 'next/link'
import { CheckCircle2, Mail, MapPin, Sparkles } from 'lucide-react'

const ZIP = [
  ['ZIP Code Lookup', '/zip/zip-code-lookup'],
  ['ZIP+4 Lookup', '/zip/zip-plus-4-lookup'],
  ['ZIP Distance', '/zip/zip-code-distance'],
  ['ZIP Timezone', '/zip/zip-to-timezone'],
  ['ZIP Coordinates', '/zip/zip-to-coordinates'],
]
const FUN = [
  ['Shakespeare Insult', '/fun/shakespeare-insult-generator'],
  ['Insult Generator', '/fun/insult-generator'],
  ['Trivia Quiz', '/fun/trivia-quiz'],
  ['Zodiac Calculator', '/fun/zodiac-calculator'],
]
const GUIDES = [
  ['ZIP Code Guides', '/blog/category/zip-codes'],
  ['ZIP+4 Guide', '/blog/what-is-a-zip-plus-4-code'],
  ['ZIP Lookup Guide', '/blog/how-to-find-a-zip-code-from-an-address'],
  ['ZIP Distance Guide', '/blog/how-far-apart-are-two-zip-codes'],
]
const COMPANY = [
  ['About', '/about'], ['Methodology', '/methodology'], ['Contact', '/contact'], ['Privacy', '/privacy-policy'], ['Disclaimer', '/disclaimer'],
]

function FooterLinks({ title, items }: { title: string; items: string[][] }) {
  return <div><h2 className="text-xs font-semibold text-zinc-950">{title}</h2><ul className="mt-4 space-y-2.5">{items.map(([name, href]) => <li key={href}><Link href={href} className="text-xs text-zinc-500 transition-colors hover:text-zinc-950">{name}</Link></li>)}</ul></div>
}

export function Footer() {
  return <footer className="border-t border-zinc-200/70 bg-white">
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div>
          <Link href="/" className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"><img src="/tooltrio-footer-logo.png" alt="ToolTrio" className="h-12 w-auto object-contain" /></Link>
          <p className="mt-4 max-w-xs text-xs leading-5 text-zinc-500">Fast, focused utilities for US ZIP lookups and lightweight generators. Free to use, no account required.</p>
          <a href="mailto:tooltrio.tools@gmail.com" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-indigo-600"><Mail className="h-3.5 w-3.5" /> tooltrio.tools@gmail.com</a>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-medium text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5" /> All systems operational</div>
        </div>
        <FooterLinks title="ZIP Tools" items={ZIP} />
        <FooterLinks title="Generators" items={FUN} />
        <FooterLinks title="Guides" items={GUIDES} />
        <FooterLinks title="Company" items={COMPANY} />
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-zinc-200/70 pt-6 text-[11px] text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 ToolTrio.com. All rights reserved.</p>
        <div className="flex items-center gap-4"><span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> US ZIP utilities</span><span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Fun generators</span></div>
      </div>
    </div>
  </footer>
}
