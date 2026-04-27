import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'SVG Optimizer — Reduce SVG File Size Free Online',
  description: 'Optimize SVG files by removing unnecessary metadata, comments, and redundant attributes. Typically 40-70% size reduction. Runs entirely in your browser.',
  slug: 'svg-optimizer',
  keywords: ['svg optimizer online free','svgo browser tool','optimize svg code free','minify svg online','svg size reducer browser'],
})

const faqs = [
  { question: "What does SVG optimization actually remove?", answer: `SVG optimizer tools (based on SVGO) remove: editor metadata (Inkscape, Illustrator, Sketch layer info embedded in the SVG), XML comments, empty groups and elements, redundant style declarations, unnecessary namespace declarations, default attribute values (explicit fill='none' when none is already the default), and whitespace between elements. They also apply transformations: converting long path commands to shorter equivalents, merging paths, converting shapes to path notation, and removing hidden elements. A typical Illustrator-exported SVG has 40-60% unnecessary data.` },
  { question: "Why is SVG optimization important for web performance?", answer: `SVG files exported from design tools (Figma, Illustrator, Sketch, Adobe XD) include substantial metadata that the browser ignores during rendering but still must download and parse. A logo exported from Illustrator as 8KB SVG may optimize to 2KB — a 75% reduction that directly cuts page weight. For SVGs used as icons (loaded as background-image or img src), every byte counts. For inline SVGs in HTML, optimization also removes editor-specific attributes that can conflict with CSS. Optimized SVGs also parse faster, slightly improving rendering time for complex graphics.` },
  { question: "Is it safe to optimize production SVGs without checking the output?", answer: `Always review optimized output before using in production, especially for: complex animated SVGs (animations may reference element IDs that SVGO renames or removes), SVGs with embedded JavaScript (may be stripped or broken), SVGs used with JavaScript that queries specific elements by ID or class (SVGO may alter or remove these), and decorative patterns where subtle rendering differences may appear. For simple icons and logos, optimization is safe and the output is visually identical. Use a visual diff tool to compare before and after for anything complex.` },
  { question: "What is the difference between lossless and lossy SVG optimization?", answer: `Lossless optimization removes provably unnecessary data without affecting rendering: metadata, comments, whitespace, default values. Lossy optimization applies transformations that may change the SVG imperceptibly but technically alter it: rounding path coordinates (0.123456 becomes 0.12), merging paths, converting shapes to equivalent path notation, applying transforms to path coordinates. Most tools default to lossless-only. Enabling lossy options (coordinate precision reduction) typically adds another 10-20% size reduction with no visible quality difference at typical web sizes.` },
  { question: "How do I optimize SVGs as part of a build pipeline?", answer: `For Node.js projects: npm install -D svgo, then add to package.json scripts: 'optimize-svg': 'svgo -f ./src/icons -o ./dist/icons'. For webpack: use svgo-loader or @svgr/webpack. For Vite: vite-plugin-svgo. For Next.js with SVG imports: @svgr/webpack handles optimization automatically. For automated CI optimization: add svgo to your CI pipeline to enforce size limits on committed SVGs. The svgo configuration file (svgo.config.js) lets you enable/disable specific plugins and configure lossy settings.` },
  { question: "What is the difference between an SVG sprite and individual optimized SVGs?", answer: `Individual SVGs: separate files, each HTTP request cached independently, easy to swap colors with CSS currentColor. SVG sprite: all icons combined in one <svg> with <symbol> definitions, referenced with <use href='#icon-name'>. Sprite advantages: one HTTP request, browser caches all icons together. Sprite disadvantages: entire sprite must load before any icon renders, less cache granularity. Modern recommendation: use inline SVGs or individual SVG imports via bundlers (which inline them) rather than traditional sprites. HTTP/2 makes individual file requests fast, eliminating most sprite advantages.` },
  { question: "What other image and asset tools are on this site?", answer: `The Image to Base64 tool converts optimized SVGs to data URIs for inline embedding. The Favicon Generator creates favicons from SVG source files. The CSS Gradient Generator creates gradient backgrounds as an SVG alternative for simple gradient shapes. The Color Converter translates colors in SVG fill and stroke attributes between formats. All are in the Dev Tools section.` },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'SVG Optimizer — Reduce SVG File Size Free Online',
    description: 'Optimize SVG files by removing unnecessary metadata, comments, and redundant attributes. Typically 40-70% size reduction. Runs entirely in your browser.',
    slug: 'svg-optimizer',
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
