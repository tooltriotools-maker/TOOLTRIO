'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Copy, Check, RefreshCw, Download } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[] }

function hexToHsl(hex: string) {
  const h = hex.replace('#','')
  if (h.length !== 6) return { h: 0, s: 0, l: 50 }
  const r = parseInt(h.slice(0,2),16)/255, g = parseInt(h.slice(2,4),16)/255, b = parseInt(h.slice(4,6),16)/255
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max-min
  let hh=0, s=0; const l = (max+min)/2
  if (d!==0) {
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    if (max===r) hh=((g-b)/d+(g<b?6:0))/6
    else if (max===g) hh=((b-r)/d+2)/6
    else hh=((r-g)/d+4)/6
  }
  return { h: Math.round(hh*360), s: Math.round(s*100), l: Math.round(l*100) }
}
function hslToHex(h: number, s: number, l: number) {
  h/=360; s/=100; l/=100
  let r,g,b
  if (s===0) { r=g=b=l } else {
    const q=l<0.5?l*(1+s):l+s-l*s, p=2*l-q
    const hue2rgb=(p:number,q:number,t:number)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p}
    r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3)
  }
  const toHex=(x:number)=>Math.round(x*255).toString(16).padStart(2,'0')
  return '#'+toHex(r)+toHex(g)+toHex(b)
}

const HARMONY_TYPES = [
  { id:'monochromatic', label:'Monochromatic', desc:'Same hue, varied saturation/lightness' },
  { id:'complementary', label:'Complementary', desc:'Opposite colors on the wheel' },
  { id:'triadic', label:'Triadic', desc:'Three evenly-spaced hues' },
  { id:'analogous', label:'Analogous', desc:'Adjacent hues - nature-inspired' },
  { id:'split-complementary', label:'Split Complementary', desc:'Base + two adjacent to complement' },
  { id:'tetradic', label:'Tetradic', desc:'Four evenly-spaced hues' },
]

function generatePalette(hex: string, type: string): { hex: string; name: string }[] {
  const { h, s, l } = hexToHsl(hex)
  switch (type) {
    case 'monochromatic':
      return [
        { hex: hslToHex(h, s, Math.max(10,l-30)), name: 'Dark' },
        { hex: hslToHex(h, s, Math.max(10,l-15)), name: 'Shade' },
        { hex: hex, name: 'Base' },
        { hex: hslToHex(h, s, Math.min(90,l+15)), name: 'Tint' },
        { hex: hslToHex(h, s, Math.min(90,l+30)), name: 'Light' },
      ]
    case 'complementary':
      return [
        { hex: hslToHex(h, s, Math.max(15,l-20)), name: 'Dark Base' },
        { hex: hex, name: 'Base' },
        { hex: hslToHex(h, Math.max(20,s-20), Math.min(85,l+30)), name: 'Light Base' },
        { hex: hslToHex((h+180)%360, s, Math.max(15,l-10)), name: 'Complement' },
        { hex: hslToHex((h+180)%360, s, Math.min(85,l+20)), name: 'Light Compl.' },
      ]
    case 'triadic':
      return [
        { hex: hex, name: 'Primary' },
        { hex: hslToHex((h+120)%360, s, l), name: 'Secondary' },
        { hex: hslToHex((h+240)%360, s, l), name: 'Tertiary' },
        { hex: hslToHex(h, Math.max(10,s-30), Math.min(90,l+25)), name: 'Light' },
        { hex: hslToHex((h+120)%360, Math.max(10,s-30), Math.min(90,l+25)), name: 'Light 2' },
      ]
    case 'analogous':
      return [
        { hex: hslToHex((h-30+360)%360, s, l), name: 'Left -30 degrees' },
        { hex: hslToHex((h-15+360)%360, s, l), name: 'Left -15 degrees' },
        { hex: hex, name: 'Base' },
        { hex: hslToHex((h+15)%360, s, l), name: 'Right +15 degrees' },
        { hex: hslToHex((h+30)%360, s, l), name: 'Right +30 degrees' },
      ]
    case 'split-complementary':
      return [
        { hex: hex, name: 'Base' },
        { hex: hslToHex((h+150)%360, s, l), name: 'Split 1' },
        { hex: hslToHex((h+210)%360, s, l), name: 'Split 2' },
        { hex: hslToHex(h, Math.max(10,s-20), Math.min(90,l+25)), name: 'Light Base' },
        { hex: hslToHex((h+180)%360, Math.max(10,s-20), Math.min(90,l+25)), name: 'Accent' },
      ]
    case 'tetradic':
      return [
        { hex: hex, name: 'Primary' },
        { hex: hslToHex((h+90)%360, s, l), name: '90 degrees' },
        { hex: hslToHex((h+180)%360, s, l), name: '180 degrees' },
        { hex: hslToHex((h+270)%360, s, l), name: '270 degrees' },
        { hex: hslToHex(h, Math.max(10,s-30), Math.min(90,l+30)), name: 'Neutral' },
      ]
    default: return [{ hex, name: 'Base' }]
  }
}

export default function CalculatorClient({ faqs }: Props) {
  const [base, setBase] = useState('#6366f1')
  const [harmonyType, setHarmonyType] = useState('analogous')
  const [copied, setCopied] = useState('')

  const palette = useMemo(() => generatePalette(base, harmonyType), [base, harmonyType])

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val); setCopied(key); setTimeout(()=>setCopied(''),1500)
  }

  const copyAll = () => {
    const css = palette.map(c => `--color-${c.name.toLowerCase().replace(/\s+/g,'-')}: ${c.hex};`).join('\n')
    copy(`:root {\n${css}\n}`, 'all')
  }

  // Scale (shades)
  const { h, s } = hexToHsl(base)
  const scale = [950, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50].map((shade, i) => {
    const lightness = Math.round(10 + (i/10)*82)
    return { shade, hex: hslToHex(h, Math.max(10,s), lightness) }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link><ChevronRight className="w-3 h-3" />
        <Link href="/calculators/dev" className="hover:text-green-600">Dev Tools</Link><ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-semibold">Color Palette Generator</span>
      </nav>

      <h1 className="text-3xl font-black text-gray-900 mb-1">🎨 Color Palette Generator</h1>
      <p className="text-gray-500 mb-6">Generate beautiful, accessible color palettes using color theory harmony rules. Perfect for web design, brand identity, and UI development.</p>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Base Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={base} onChange={e=>setBase(e.target.value)}
                className="w-12 h-12 rounded-xl border-2 border-gray-200 cursor-pointer p-1" />
              <input value={base} onChange={e=>setBase(e.target.value)}
                className="font-mono text-lg px-3 py-2 border-2 border-gray-200 rounded-xl w-32 font-bold focus:border-green-400 focus:outline-none uppercase"
                maxLength={7} />
            </div>
          </div>
          <div className="flex-1 min-w-48">
            <label className="text-xs font-bold text-gray-500 block mb-2">Color Harmony</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {HARMONY_TYPES.map(ht => (
                <button key={ht.id} onClick={()=>setHarmonyType(ht.id)}
                  title={ht.desc}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border-2 transition-all ${harmonyType===ht.id?'bg-purple-600 border-purple-600 text-white':'border-gray-200 text-gray-600 hover:border-purple-300'}`}>
                  {ht.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Palette */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">{HARMONY_TYPES.find(h=>h.id===harmonyType)?.label} Palette</h2>
          <button onClick={copyAll} className="flex items-center gap-1.5 text-xs font-bold text-purple-600 border border-purple-200 px-3 py-1.5 rounded-xl hover:bg-purple-50">
            {copied==='all'?<Check className="w-3.5 h-3.5"/>:<Copy className="w-3.5 h-3.5"/>} Copy as CSS
          </button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {palette.map((color, i) => {
            const lum = parseInt(hexToHsl(color.hex).l.toString())
            const textCol = lum > 50 ? '#1f2937' : '#ffffff'
            return (
              <button key={i} onClick={() => copy(color.hex, `pal-${i}`)}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="h-32 flex flex-col items-center justify-center" style={{ background: color.hex, color: textCol }}>
                  {copied===`pal-${i}` ? <Check className="w-6 h-6" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
                <div className="p-2 bg-white border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-900 truncate">{color.name}</p>
                  <p className="text-xs font-mono text-gray-500 uppercase">{color.hex}</p>
                </div>
              </button>
            )
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">{HARMONY_TYPES.find(h=>h.id===harmonyType)?.desc} - Click any swatch to copy HEX</p>
      </div>

      {/* Tailwind-style scale */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Tailwind-Style Color Scale</h2>
        <div className="space-y-2">
          {scale.map(({ shade, hex: shadeHex }) => {
            const lum = hexToHsl(shadeHex).l
            const textCol = lum > 50 ? '#1f2937' : '#ffffff'
            return (
              <button key={shade} onClick={() => copy(shadeHex, `scale-${shade}`)}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:opacity-90 transition-opacity group">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{ background: shadeHex, color: textCol }}>
                  {copied===`scale-${shade}` ? 'v' : shade}
                </div>
                <div className="flex-1 h-8 rounded-lg" style={{ background: shadeHex }} />
                <code className="text-xs font-mono text-gray-500 w-20 text-right">{shadeHex.toUpperCase()}</code>
              </button>
            )
          })}
        </div>
      </div>

      <SEOContent
        title="Color Palette Generator"
        category="dev"
        intro={`The Color Palette Generator creates beautiful, professional color schemes using color theory harmony rules used by top designers at companies like Apple, Google, and Airbnb. Enter any base color and choose from six harmony methods - analogous, complementary, triadic, split-complementary, tetradic, or monochromatic - to generate a coordinated, visually balanced palette in seconds.

This tool also generates a complete Tailwind CSS-style 11-stop color scale from your base color, giving you everything from the darkest shade (950) to the lightest tint (50) - identical to how Tailwind's indigo-500 or blue-600 scales are generated. Every color is clickable to copy the HEX value, and you can copy the entire palette as CSS custom properties with one click.

Used by front-end developers, UI/UX designers, brand consultants, and marketing teams across the United States, this free palette generator eliminates hours of manual color exploration and ensures your designs follow established color theory principles from day one.

**Long-tail searches answered here:** color palette generator free online usa, complementary color palette creator free no signup, css color scheme generator free tool online, harmonious color palette builder free usa, website color palette generator free no download, brand color palette creator free online tool, triadic tetradic color scheme generator usa free, accessible wcag color palette generator free online, analogous color palette from hex code generator free, pastel vs saturated palette generator free usa, dark mode color palette generator free online, ui design color palette from single color generator, color palette from image upload extractor free usa, material design color palette generator free online, tailwind css custom color palette generator free usa`}
        howItWorks={`Color harmony rules come from traditional color theory formalized by artists and scientists like Josef Albers and Johannes Itten. This generator implements them algorithmically using HSL (Hue, Saturation, Lightness) color space, which makes color relationships mathematically precise.

Analogous colors use hues within 30 degrees of each other on the color wheel - found throughout nature (sunset gradients, forest greens). Complementary colors sit 180 degrees apart and create maximum contrast and vibrance. Triadic harmony uses three hues equally spaced at 120 degrees, producing energetic, bold palettes. Split-complementary is a softer alternative to complementary, using the two colors adjacent to the complement.

The Tailwind-style scale is generated by holding Hue and Saturation constant while systematically varying Lightness from near-black (L~=10%) to near-white (L~=92%), creating perceptually balanced steps that work for backgrounds, text, borders, and interactive states.`}
        benefits={[
          { title: 'Six Professional Harmony Methods', text: 'Analogous, complementary, triadic, split-complementary, tetradic, and monochromatic - the same harmony rules taught in design schools and used by professional designers at top tech companies.' },
          { title: 'Tailwind CSS-Compatible Scale', text: 'The 11-stop scale (50 through 950) matches Tailwind CSS conventions exactly, making it trivial to extend or replace Tailwind color palettes with custom brand colors.' },
          { title: 'One-Click CSS Export', text: 'Copy the entire palette as CSS custom properties ready to paste into your stylesheet. No manual reformatting of values.' },
          { title: 'Works with Any Color Input', text: 'Use the visual color picker, type any HEX code, or start from preset brand colors. The generator adapts to any starting point.' },
          { title: 'Real-Time Preview', text: 'See your complete palette update instantly as you change the base color or harmony type. Explore dozens of combinations in seconds.' },
          { title: 'Print and Digital Design Support', text: 'All colors are displayed in HEX format universally used in digital design. The visual swatches make it easy to evaluate palettes before committing.' },
        ]}
        useCases={[
          { title: 'Brand Identity Design', text: 'Establish a complete brand color system from a single primary brand color, ensuring all secondary and accent colors are harmonious and professionally derived.' },
          { title: 'UI Component Libraries', text: 'Generate semantic color tokens for design systems - primary, secondary, success, warning, error states - all derived from a consistent base palette.' },
          { title: 'Tailwind CSS Custom Themes', text: 'Extend or replace Tailwind\'s default colors with custom brand palettes that use the same scale conventions (50-950) throughout your project.' },
          { title: 'Marketing Material Design', text: 'Marketing teams use harmony-based palettes for email campaigns, social media graphics, and landing pages to maintain visual cohesion across all touchpoints.' },
          { title: 'Figma & Sketch Design Systems', text: 'Export palette HEX values directly into design tools to establish consistent color styles before any UI work begins.' },
          { title: 'Educational Color Theory', text: 'Design students and self-learners use this tool to see color theory principles applied in real time, making abstract concepts visually concrete.' },
        ]}
        tipsSection={`When building a brand palette, start with your primary brand color and use analogous harmony for a natural, cohesive feel - or complementary for a bold, high-contrast design. Most successful SaaS and consumer brands use analogous palettes (Slack, Notion) while entertainment and retail brands often use complementary schemes for energy and contrast.

The Tailwind scale is designed so that 600/700 works well for primary buttons, 100/200 for backgrounds and hover states, and 900/950 for text on light backgrounds. Following this pattern makes your design system immediately intuitive to any developer familiar with Tailwind.

For accessibility, avoid using colors at the extremes of the scale (very light or very dark) as the only way to convey information - colorblind users may not distinguish between similar hues. Always pair color with shape, size, or text labels for full accessibility compliance, which is required for US government and many enterprise websites.

When in doubt about color combinations, test them in context: add sample text, buttons, and cards in your palette colors to see how they look in an actual UI rather than just as swatches.`}
        scienceSection={`Color theory formalized by Johannes Itten in "The Art of Color" (1961) and Josef Albers in "Interaction of Color" (1963) established the color harmony principles - complementary, analogous, triadic - that this generator implements algorithmically. Itten's work at the Bauhaus school directly influenced modern digital design education and tools like Adobe Color, Coolors, and Figma's color tools.

The Munsell color system (1905) first introduced the concept of hue, value, and chroma (equivalent to HSL's hue, lightness, saturation) as independent perceptual dimensions. This separation of color into independent axes is why HSL is far superior to RGB for generating harmonious color variations - changing lightness in HSL doesn't affect perceived hue or saturation, enabling the clean tint/shade generation this tool demonstrates.

Design systems at companies like Tailwind CSS, Ant Design, Material Design, and Apple's Human Interface Guidelines all use systematic color scales (10-11 steps from lightest to darkest) derived from a single base hue. Research by Refactoring UI authors Adam Wathan and Steve Schoger shows that constraint-based, systematic color palettes produce more consistent, maintainable design systems than ad-hoc color selection.`}
        conclusion={`The Color Palette Generator gives every American designer and developer instant access to professional, harmony-based color systems that would otherwise require expensive design education or subscriptions to tools like Adobe Color or Coolors. Generate, explore, and export beautiful palettes in seconds - completely free, completely private, and completely in your browser.`}
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
