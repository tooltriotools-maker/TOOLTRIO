import type { Metadata } from 'next'
import { generateDevToolMetadata, generateDevToolJsonLd } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateDevToolMetadata({
  title: 'CSS Animation Generator — Keyframe Builder with Preview Free',
  description: 'Build CSS keyframe animations visually. Configure timing functions, duration, iteration, and keyframe steps. Live preview with copy-ready CSS. Runs in your browser.',
  slug: 'css-animation-gen',
  keywords: ['css animation generator online free','css keyframe builder browser','css transition maker free','animate css tool online','css animation code generator'],
})

const faqs = [
  { question: 'What is the difference between CSS transitions and CSS animations?', answer: "CSS transitions are the simpler form: they interpolate a property from one value to another when the property changes (triggered by :hover, class toggle, or JavaScript). You define start and end states. CSS animations (@keyframes) are more powerful: they define multiple intermediate states (keyframes), can loop, can alternate direction, can be paused, and can run independently without a trigger. Use transitions for simple two-state changes (hover effects, open/close). Use animations for anything with more than two states, auto-playing motion, or complex sequencing." },
  { question: 'What timing functions are available and how do they differ?', answer: "CSS timing functions control the acceleration curve: linear (constant speed — mechanical, robotic feel), ease (starts fast, slows — the browser default), ease-in (slow start, fast end — good for exits), ease-out (fast start, slow end — good for entrances), ease-in-out (slow start and end, fast middle — natural feel). cubic-bezier(x1,y1,x2,y2) defines custom curves. steps(n) creates discrete jumps instead of smooth interpolation — used for sprite sheet animations and typewriter effects. The spring() function (not yet CSS standard but in Motion One and Framer Motion) creates physically realistic spring-based motion." },
  { question: 'How do I make an animation only run once vs loop forever?', answer: "The animation-iteration-count property controls this: 1 (run once), 2 (twice), infinite (loop forever), or any number including decimals (2.5 = two and a half cycles). animation-fill-mode: forwards keeps the animation in its final keyframe state after it ends — without this, the element snaps back to its initial state. animation-fill-mode: both applies the initial keyframe state before the animation starts (useful when animation-delay is set). For a once-on-load entrance animation: animation-iteration-count: 1; animation-fill-mode: forwards." },
  { question: 'How do I animate transform properties for better performance?', answer: "Only animate transform and opacity with CSS animations — these properties are composited by the browser GPU without triggering layout or paint. Animating width, height, top, left, background-color, or box-shadow triggers layout recalculation on every frame, causing jank (frame drops). For movement: use transform: translateX() translateY() instead of animating left/top. For size changes: transform: scale() instead of width/height. For fade: opacity. For rotation: transform: rotate(). The will-change: transform hint pre-promotes the element to its own GPU layer for smoother animation." },
  { question: 'What is the animation-fill-mode and when do I need it?', answer: "animation-fill-mode defines what happens before and after an animation runs. none (default): element is at its natural style before and after. forwards: element holds the final keyframe style after the animation completes. backwards: element starts at the first keyframe style during the animation-delay period. both: combines forwards and backwards. Most practical use: forwards prevents an animated element from snapping back to its original position after a one-shot entrance animation. Without fill-mode: forwards, a fading-in element (from opacity: 0 to opacity: 1) would jump back to opacity: 0 when the animation ends." },
  { question: 'How do I stagger animations across multiple elements?', answer: "Use animation-delay with incrementing values per element. In CSS with :nth-child: .item:nth-child(1) { animation-delay: 0s; } .item:nth-child(2) { animation-delay: 0.1s; } .item:nth-child(3) { animation-delay: 0.2s; }. In JavaScript, set the delay programmatically: elements.forEach((el, i) => el.style.animationDelay = `${i * 0.1}s`). Using CSS custom properties: .item { animation-delay: calc(var(--i) * 100ms); } with the --i variable set inline per element. Stagger creates the cascade/wave effect common in list and grid reveals." },
  { question: 'What other CSS tools are on this site?', answer: "The CSS Gradient Generator creates animated gradient backgrounds when combined with background-position animation. The Flexbox Generator and Grid Generator help position the elements you are animating. The CSS clip-path Generator creates shape animations using clip-path morphing. The Box Shadow Generator styles elements at rest before your animation begins. The Responsive Breakpoints tool helps set different animation durations for reduced-motion preferences (@media (prefers-reduced-motion: reduce)). All are in the Dev Tools CSS section." },
]

export default function Page() {
  const jsonLd = generateDevToolJsonLd({
    name: 'CSS Animation Generator — Keyframe Builder with Preview Free',
    description: 'Build CSS keyframe animations visually. Configure timing functions, duration, iteration, and keyframe steps. Live preview with copy-ready CSS. Runs in your browser.',
    slug: 'css-animation-gen',
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
