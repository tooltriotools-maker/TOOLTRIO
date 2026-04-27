import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Blue Light Exposure Calculator — Screen Time Eye Health & Sleep Impact 2026',
  description: 'Calculate your daily blue light exposure from screens, LEDs, and sunlight. Assess your risk for eye strain, macular degeneration, and sleep disruption. Get personalized recommendations for screen habits and blue light protection. Free online blue light exposure calculator 2026. No signup required.',
  slug: 'blue-light-exposure-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'blue light exposure calculator 2026',
    'free blue light exposure calculator',
    'blue light exposure calculator usa 2026',
    'blue light exposure calculator free 2026',
    'blue light exposure calculator',
    'screen time eye strain calculator',
    'blue light and sleep disruption',
    'blue light glasses worth it calculator',
    'how much screen time causes eye damage',
    'blue light filter recommendations',
    'digital eye strain risk assessment',
    'melatonin suppression blue light',
    'blue light from phone vs sunlight',
    'children screen time eye health',
  ],
})

const relatedCalculators = [

  {name:"BMI Calculator",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"Body mass index assessment"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Daily calorie needs"},
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total energy expenditure"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition analysis"},
  {name:"Protein Intake Calculator",href:"/calculators/health/protein-intake-calculator",icon:"🥩",desc:"Optimal protein targets"},
  {name:"Water Intake Calculator",href:"/calculators/health/water-intake-calculator",icon:"💧",desc:"Daily hydration needs"},
  {name:"Heart Rate Calculator",href:"/calculators/health/heart-rate-calculator",icon:"❤️",desc:"Cardiovascular zones"},
  {name:"Macro Calculator",href:"/calculators/health/macro-calculator",icon:"🥗",desc:"Macronutrient targets"}

]

const faqs = [
  {question:'What is blue light and why is it harmful in large amounts?',answer:'Blue light is the portion of the visible light spectrum with the shortest wavelengths (380-500 nm) and highest energy. It is naturally abundant in sunlight and is emitted by LED screens, smartphones, tablets, LED lighting, and fluorescent lights. In moderate, daytime amounts, blue light is beneficial — it boosts alertness, mood, and helps regulate circadian rhythm. Problems arise with excessive or poorly-timed blue light exposure: it suppresses melatonin secretion at night (disrupting sleep), can cause digital eye strain, and epidemiological evidence suggests chronic high-intensity blue light exposure may contribute to age-related macular degeneration over decades.',},
  {question:'Does blue light actually damage eyes?',answer:'The evidence for direct retinal damage from screens at typical consumer use intensities is weak. The energy from typical smartphone or monitor screens is far below the threshold shown to cause photoreceptor damage in laboratory studies. Digital eye strain (Computer Vision Syndrome) — dry eyes, headaches, blurred vision after prolonged screen use — is real and very common, but it is caused primarily by reduced blink rate during screen use and extended near focus, not blue light wavelengths specifically. The stronger evidence for blue light harm is its circadian disruption effects on sleep quality when screens are used within 2-3 hours of bedtime.',},
  {question:'Do blue light glasses actually work?',answer:'The evidence for blue light glasses reducing eye strain or improving sleep is mixed. A 2021 Cochrane systematic review found no significant benefit of blue light filtering lenses for reducing eye strain compared to placebo lenses. However blue light glasses with amber or orange tints that filter 50%+ of blue light have shown modest improvements in sleep quality in several small studies when worn 2-3 hours before bed. The American Academy of Ophthalmology does not recommend blue light glasses for eye protection from screens, but sleep researchers have more supportive evidence for their pre-sleep use.',},
  {question:'What is the 20-20-20 rule for screen time?',answer:'The 20-20-20 rule recommends: every 20 minutes of screen use, look at something 20 feet away for at least 20 seconds. This addresses digital eye strain by periodically relaxing the ciliary muscles in the eye that maintain near focus during screen use. Sustained near-focus causes these muscles to fatigue, contributing to the headache, blurred vision, and eye discomfort characteristic of Computer Vision Syndrome. The rule is endorsed by the American Academy of Ophthalmology as a simple, evidence-based practice for reducing eye strain during prolonged screen use.',},
  {question:'How much does screen time affect sleep quality?',answer:'Systematic reviews show that evening screen use is associated with significantly worse sleep quality through two mechanisms: blue light suppresses melatonin secretion, delaying sleep onset by 20-40 minutes on average; and content engagement (social media, news, games) increases cognitive arousal that takes additional time to diminish. A 2018 meta-analysis found that each additional hour of evening screen use was associated with 14% higher odds of sleep difficulty. Studies using sleep trackers consistently find longer sleep onset, reduced REM sleep, and worse subjective sleep quality on nights with late screen use.',},
  {question:'What are best practices for reducing harmful blue light exposure?',answer:'Evidence-based strategies: use Night Shift mode on iPhone/Night Mode on Android 2-3 hours before bed (reduces blue light by shifting screen to warmer hues); reduce screen brightness in the evening; maintain at least 16-18 inches between face and phone screen; take regular screen breaks (20-20-20 rule) during daytime use; use matte screen protectors to reduce glare; increase ambient room lighting when using screens to reduce the contrast between screen and surroundings; and avoid screens for 30-60 minutes before sleep if you struggle with sleep onset.',},
  {question:'At what age does blue light exposure become most harmful?',answer:'Children and adolescents may face greater risks from blue light exposure for two reasons: their developing eyes transmit more blue light to the retina (crystalline lens becomes more effective at filtering blue light with age), and disrupted sleep has more severe developmental consequences during childhood and adolescence than in adults. Teen sleep disruption from evening screen use is particularly well-documented — a large study found that teens using screens 5+ hours daily were 43% more likely to get fewer than 7 hours of sleep. Both the AAP and WHO have recommended screen time limits specifically for children under 5 years old.',},
]

const seoContent = {
  title: 'Blue Light Exposure Calculator',
  category: 'health' as const,
  intro: `Blue light is everywhere — it's the dominant wavelength emitted by LED screens, modern LED lighting, and the sun. Most of the conversation about blue light focuses on sleep disruption, but the picture is more nuanced: blue light from screens at night genuinely does suppress melatonin and delay sleep onset, but the same blue light during the day plays an important role in alertness, mood, and circadian rhythm regulation. The problem isn't blue light itself — it's blue light at the wrong time.

The mechanism is straightforward. Your eyes contain specialized photoreceptors called intrinsically photosensitive retinal ganglion cells (ipRGCs) that are particularly sensitive to short-wavelength blue light (~480nm). These cells signal the suprachiasmatic nucleus — your brain's master clock — to suppress melatonin production. Exposure to blue light at night tells your brain it's still daytime, delaying sleep onset by an average of 90 minutes in sensitive individuals.

On the eye strain side, high-intensity screen use causes digital eye strain (asthenopia) through a combination of reduced blink rate, accommodation fatigue, and glare — though the specific contribution of blue light wavelength versus screen intensity remains debated in the literature.

This calculator quantifies your total daily blue light exposure from all sources — screens, indoor lighting, and sunlight — and assesses both your sleep disruption risk and cumulative eye strain exposure.

**Long-tail searches answered here:** blue light exposure calculator free online usa, how much blue light am i getting from screens calculator, blue light sleep disruption risk calculator free, screen time blue light health impact calculator, is my phone affecting my sleep blue light calculator, free blue light damage risk estimator no account, blue light from phone vs computer vs tv calculator free, how many hours of screen time causes blue light damage, blue light before bed sleep delay calculator free usa, eye strain from blue light cumulative calculator free, blue light glasses effectiveness calculator free usa, circadian rhythm disruption from blue light calculator, melatonin suppression by blue light hours calculator free, blue light filter app effectiveness calculator free usa, nighttime screen use sleep quality impact calculator free`,
  howItWorks: `Blue light exposure is quantified as the product of irradiance (blue light intensity, measured in W/m² at the eye) and exposure duration. Smartphones produce approximately 0.01-0.02 W/m² at typical viewing distance (30-40cm); laptops 0.004-0.01 W/m²; LED room lighting 0.001-0.004 W/m². Sunlight produces 0.2-0.4 W/m² of blue light — dramatically more than any screen.

The critical metric for sleep disruption is cumulative blue light exposure in the 2-3 hours before bedtime. Blue light (460-480nm wavelengths) suppresses melatonin production through melanopsin-containing retinal ganglion cells that project directly to the suprachiasmatic nucleus (body clock). Even brief bright blue light exposure at night can delay melatonin onset by 1-3 hours.`,
  benefits: [
        {title:"Evidence-based clinical formulas",text:"Uses peer-reviewed, validated formulas from major health organizations — the same calculations trusted by healthcare professionals in clinical and research settings."},
        {title:"Instant real-time results",text:"Results update as you type — no button to click. Explore multiple scenarios in seconds to understand how changes affect your result."},
        {title:"Complete data privacy",text:"All calculations run entirely in your browser. No personal health data is transmitted, stored, or shared anywhere — ever."},
        {title:"Health context included",text:"Beyond a raw number, results include reference ranges, health category classification, and guidance from major health organizations on what your result means."},
        {title:"Works on all devices",text:"Fully responsive design works perfectly on phone, tablet, and desktop. No app download required — just open in your browser."},
        {title:"Completely free",text:"No signup, no subscription, no premium features. Every calculation and all health context is permanently free for every user."},
  ],
  useCases: [
        {title:"Annual health monitoring",text:"Calculate and record key health metrics annually to build a personal health history that reveals meaningful trends and supports proactive health decisions over time."},
        {title:"Doctor appointment preparation",text:"Arrive at medical appointments with your own calculations already done, enabling more focused and productive conversations about your health with your healthcare provider."},
        {title:"Wellness program participation",text:"Track progress in employer wellness programs or personal health initiatives with objective, calculated metrics that are meaningful and evidence-based."},
        {title:"Health education and research",text:"Students, educators, and researchers in health and nutrition fields use these tools to apply classroom formulas to real-world calculations and develop genuine health literacy."},
  ],
  tipsSection: `Use night mode/warm color temperature settings on all devices from 2-3 hours before bedtime. Night mode shifts screen color from ~6500K (blue-heavy daylight white) to ~3000-4000K (warm amber), reducing blue wavelength irradiance by 40-60%.

Position your main light source behind you rather than in your visual field. Direct gaze into a bright overhead light delivers far more blue light to the melanopsin cells than the same light seen peripherally.

Blue light blocking glasses (filtering wavelengths below 500nm) are most effective for evening use, not daytime. During the day, blue light exposure from screens is a minor component of total exposure and rarely causes clinically significant damage.`,
  scienceSection: `Research on blue light and melatonin suppression was pioneered by Charles Czeisler and colleagues at Harvard, who demonstrated in 2001 that short-wavelength (blue) light at 460nm was approximately 100× more potent at suppressing melatonin than long-wavelength (red) light at the same irradiance. A landmark 2014 study by Chang et al. in PNAS showed that e-reader use before bed delayed melatonin onset by 1.5 hours and reduced next-morning alertness compared to printed book reading.`,
  conclusion: `The single most evidence-backed intervention for blue light and sleep is also the simplest: dim your screens and use warm color temperatures (night mode) for 2-3 hours before bed. The data on blue-light-blocking glasses is mixed — some studies show benefit, others don't — but night mode settings on phones and computers consistently reduce melatonin suppression in controlled trials.

For eye strain, the 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds) is more effective than any filter because it addresses the accommodation fatigue mechanism directly. Blinking consciously during screen use also helps — blink rate drops by 60-70% during focused screen work, causing dry eye symptoms that are often attributed to blue light.

Use [our Sleep Need Calculator](/calculators/health/sleep-need-calculator) if you're investigating sleep issues more broadly, or [our Eye Health Calculator](/calculators/health/eye-health-calculator) for a comprehensive screen use assessment.`,
  comparisonTable: [],
  didYouKnow: [],
  keyStats: [],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Blue Light Exposure Calculator', description: 'Calculate your daily blue light exposure from screens, LEDs, and sunlight. Assess your risk for eye strain, macular degeneration, and sleep disruption', url: 'https://tooltrio.com/calculators/health/blue-light-exposure-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Blue Light Exposure Calculator', description: 'Calculate your daily blue light exposure from screens, LEDs, and sunlight. Assess your risk for eye strain, macular degeneration, and sleep disruption', url: 'https://tooltrio.com/calculators/health/blue-light-exposure-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Blue Light Exposure Calculator', url: '/calculators/health/blue-light-exposure-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
