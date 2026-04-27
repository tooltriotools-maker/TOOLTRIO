import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'Responsive Breakpoints — Standard CSS Breakpoints Reference',
  description: 'Reference standard CSS breakpoints for all frameworks. Shows Tailwind, Bootstrap, and Material UI breakpoints in px and rem. Plan media queries. Runs in your browser.',
  slug: 'responsive-breakpoints',
  keywords: ['responsive breakpoints checker online free','css media query generator','mobile tablet desktop breakpoints','viewport breakpoints tool free','responsive design checker browser'],
})

const faqs = [
  { question: "What are the standard CSS breakpoints in major frameworks?", answer: `Tailwind CSS (v3): sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px. Bootstrap 5: xs<576px, sm>=576px, md>=768px, lg>=992px, xl>=1200px, xxl>=1400px. Material UI v5: xs=0px, sm=600px, md=900px, lg=1200px, xl=1536px. Chakra UI: sm=480px, md=768px, lg=992px, xl=1280px, 2xl=1536px. These are mobile-first (min-width) breakpoints — styles apply from the breakpoint and up, overriding smaller breakpoint styles.` },
  { question: "Should I use px or rem for media queries?", answer: `Use rem. Browser zoom (Ctrl+) scales rendered content but media queries in px do not respond to the user's base font size preference. rem-based breakpoints react to font preferences: if the user sets 20px base font, an 48rem breakpoint triggers at 960px instead of 768px, giving a wider layout to users who need larger text. This is the correct accessible behavior. Convert px breakpoints to rem by dividing by 16: 768px = 48rem.` },
  { question: "What is mobile-first vs desktop-first media query approach?", answer: `Mobile-first: write base styles for mobile, use min-width media queries to add styles for larger screens. @media (min-width: 768px) { ... }. This is the modern standard — mobile styles are simpler and load first; larger-screen styles are additive. Desktop-first: write base styles for desktop, use max-width media queries to adapt for smaller screens. @media (max-width: 767px) { ... }. This was the older approach and leads to more CSS being downloaded on mobile than needed. Tailwind, Bootstrap, and Material UI all use mobile-first.` },
  { question: "What is the difference between layout breakpoints and component breakpoints?", answer: `Layout breakpoints change the macro page structure (sidebar collapses, grid columns change). Component breakpoints change a single component regardless of its container context. Container queries (@container) solve the component breakpoint problem: a card can respond to its container width rather than the viewport. @container (min-width: 400px) { .card { ... } }. Browser support: all major browsers as of 2023. Use layout breakpoints for page structure, container queries for component-level responsiveness.` },
  { question: "How do I choose breakpoints for my specific design?", answer: `Content-driven breakpoints: design the layout for mobile, then widen the viewport until the layout breaks — add a breakpoint there. Repeat. This produces breakpoints at exactly where they are needed, not arbitrary framework defaults. Common heuristic: one breakpoint at 768px (tablet portrait) and one at 1024px (desktop) covers most designs with three distinct layouts. For complex apps: add 480px (large phone landscape), 1280px (large desktop), and 1536px (ultrawide). Avoid breakpoints every 50px — each adds maintenance burden.` },
  { question: "What are common breakpoint patterns for specific UI components?", answer: `Navigation: stack vertically on mobile (<768px), horizontal on tablet+. Sidebar: hidden/drawer on mobile, visible inline on desktop (>1024px). Cards grid: 1 column on mobile, 2 on tablet, 3-4 on desktop. Images: full-width on mobile, float with text on desktop. Forms: single column on mobile, two-column on desktop for wider forms. Tables: horizontal scroll on mobile, fixed columns on desktop. Modal: full-screen on mobile, centered fixed-size on desktop.` },
  { question: "What other CSS layout tools are on this site?", answer: `The Flexbox Generator and Grid Generator build responsive layouts for these breakpoints. The px to REM Converter converts breakpoint values to rem. The CSS Unit Converter handles all CSS unit conversions. The Font Size Calculator creates fluid type that scales between breakpoints using CSS clamp(). The CSS Media Query documentation helps understand all media features beyond just width. All are in the Dev Tools CSS section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'Responsive Breakpoints — Standard CSS Breakpoints Reference',
    description: 'Reference standard CSS breakpoints for all frameworks. Shows Tailwind, Bootstrap, and Material UI breakpoints in px and rem. Plan media queries. Runs in your browser.',
    slug: 'responsive-breakpoints',
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
