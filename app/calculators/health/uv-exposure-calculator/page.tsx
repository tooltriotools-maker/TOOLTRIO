import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'UV Exposure Calculator — Daily UV Dose, Vitamin D Production & Skin Cancer Risk 2026',
  description: 'Calculate your daily UV radiation dose based on UV index, time of day, skin type, and exposure duration. Balance vitamin D production from sun exposure against cumulative skin cancer risk. Free online uv exposure calculator 2026. No signup required.',
  slug: 'uv-exposure-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'uv exposure calculator 2026',
    'free uv exposure calculator',
    'uv exposure calculator usa 2026',
    'uv exposure calculator free 2026',
    'uv exposure calculator',
    'uv index skin damage calculator',
    'vitamin d production sun exposure',
    'uv dose skin cancer risk',
    'safe sun exposure time calculator',
    'uv index to vitamin d',
    'sunburn risk calculator',
    'cumulative uv damage score',
    'spf protection calculator',
    'uv exposure by latitude and season',
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
  {question:'What UV index level is actually dangerous?',answer:`The World Health Organization UV index scale: 0-2 (low, minimal protection needed for typical exposure), 3-5 (moderate, sun protection recommended for prolonged outdoor time), 6-7 (high, protection essential), 8-10 (very high, protection required, avoid sun at midday), 11+ (extreme, take all precautions). At UV index 6, fair-skinned people can burn in under 15 minutes at midday without protection. At UV index 11+, burning can occur in under 10 minutes for light skin types. These thresholds assume direct midday exposure — shade, clothing, and clouds significantly modify actual exposure. Geographic location, altitude (UV intensity increases approximately 10% per 1,000m altitude), and season determine baseline UV index. In most of the continental US, UV index 8-10 occurs regularly in summer months, even in northern states.`},
  {question:'What is the difference between UV-A and UV-B radiation?',answer:`UV-A (315-400 nm): penetrates deeper into the dermis, causes DNA damage through oxidative stress rather than direct photon absorption, drives photoaging (wrinkles, age spots, loss of elasticity), penetrates cloud cover and glass more effectively than UV-B, and contributes to melanoma risk. UV-A intensity is relatively constant throughout the day and year. UV-B (280-315 nm): causes direct DNA damage (pyrimidine dimer formation), is the primary cause of sunburn, drives vitamin D synthesis in the skin, is largely blocked by glass, and varies significantly with time of day and season (nearly absent at dawn/dusk, peaks at solar noon). UV-B causes more acute damage per unit but UV-A represents 95% of total UV reaching the earth's surface. Broad-spectrum sunscreens are required to address both — SPF ratings measure only UV-B protection; look for PA+ ratings (Asian markets) or 'broad-spectrum' labeling (US) for UV-A protection.`},
  {question:'How does skin type affect UV risk and safe exposure time?',answer:`The Fitzpatrick skin type scale classifies skin UV sensitivity from Type I (very fair, always burns, never tans) to Type VI (very dark, never burns). Safe exposure times at UV index 6 without sunscreen: Type I (5-10 minutes), Type II (10-20 minutes), Type III (20-30 minutes), Type IV (30-50 minutes), Type V-VI (60+ minutes). These are approximate starting points — cloud cover, reflective surfaces (snow, sand, water), and altitude significantly modify actual UV dose. Skin type does not eliminate UV risk — people with darker skin types have lower absolute skin cancer risk but can still develop it with chronic excessive exposure, and UV-induced immunosuppression and aging effects occur across all skin types. Darker skin types also have reduced natural vitamin D synthesis, requiring attention to dietary/supplemental vitamin D in low-sun climates.`},
  {question:'Is any sun exposure healthy?',answer:`Moderate sun exposure has genuine health benefits, primarily through vitamin D synthesis. UV-B radiation converts 7-dehydrocholesterol in the skin to previtamin D3, which is then converted to active vitamin D in the liver and kidneys. Approximately 10-30 minutes of midday sun exposure on arms and legs 2-3 times weekly is sufficient for adequate vitamin D synthesis in most people with lighter skin types in summer at temperate latitudes. Beyond vitamin D, sunlight exposure suppresses melatonin and advances circadian phase — morning light exposure for 10-30 minutes is one of the most effective circadian rhythm regulators. Moderate sun exposure is associated in epidemiological studies with lower multiple sclerosis risk, improved mood (beyond vitamin D through serotonin pathways), and lower all-cause mortality compared to sun avoidance — suggesting the harm of extreme sun avoidance may also be real.`},
  {question:'What SPF should I actually use?',answer:`SPF 30 broad-spectrum is the minimum recommendation for everyday use by the American Academy of Dermatology — it blocks approximately 97% of UV-B. SPF 50 blocks 98%, SPF 100 blocks 99%. The practical differences between SPF 30 and higher are small, but the critical application factor is amount: most people apply only 25-50% of the recommended 2 mg/cm2 (about 1 teaspoon for the face and 1 oz for the body). At half application, SPF 30 performs like SPF 5-7. Applying generously and reapplying every 2 hours during outdoor exposure, or after swimming and sweating, is more important than chasing high SPF numbers. For daily incidental exposure (commuting, brief outdoor time), SPF 30 applied once in the morning is adequate. For extended outdoor activity, SPF 50+ with proper reapplication is recommended.`},
  {question:'How much of lifetime UV damage occurs in childhood?',answer:`The concept that 80% of lifetime UV damage occurs before age 18 was a popular claim but overstates the reality. While significant UV exposure does occur in childhood, more recent research suggests cumulative lifetime UV exposure is more evenly distributed across decades than originally believed. The 80% figure originated from older models; epidemiological data now suggests adults accumulate substantial ongoing UV damage through occupational and recreational exposure throughout their 20s, 30s, and beyond. What is true: skin cancer risk from UV has a long latency — melanomas and squamous cell carcinomas appearing in adults at 40-60 often reflect UV damage from early adulthood. Severe sunburns in childhood specifically increase melanoma risk. However, UV protection at any age meaningfully reduces skin cancer risk — it's never too late to start protecting your skin.`},
  {question:'Can you get UV exposure through glass?',answer:`Standard window glass (soda-lime glass) blocks virtually all UV-B (the sunburning and vitamin D-producing wavelength) but transmits approximately 50-80% of UV-A. This means you can accumulate UV-A exposure while driving, sitting near windows, or working in glass-walled offices without burning or making vitamin D. UV-A drives photoaging and contributes to melanoma risk — this explains why left-sided facial aging is more pronounced in US drivers (driver's side window exposure), and why truck drivers and office workers near windows may develop asymmetric photoaging. Laminated glass (found in car windshields) blocks more UV-A than tempered side windows. Window films with UV blocking (applied to side windows) can significantly reduce UV-A exposure. Sunscreen applied daily provides protection from indoor window UV-A exposure for people with significant window-adjacent work.`},
  {question:'What are the signs of UV skin damage?',answer:`UV damage manifests acutely and chronically. Acute sunburn: erythema (redness) appearing 3-5 hours after exposure, peaking at 12-24 hours; pain, heat, and occasionally blistering with severe burns. Each blistering sunburn doubles melanoma risk. Chronic photoaging: mottled pigmentation (age spots, solar lentigines), loss of skin elasticity and sagging, leathery texture with coarse wrinkles (actinic cutis rhomboidalis nuchae on the neck in chronically sun-exposed individuals), telangectasias (broken capillaries), and actinic keratoses (rough, scaly patches that are precancerous). Skin cancer warning signs (ABCDE criteria for melanoma): Asymmetry, Border irregularity, Color variation (multiple shades within a lesion), Diameter over 6mm, and Evolution (changing over time). Actinic keratoses and squamous cell carcinomas often present as persistent rough scaly patches or non-healing sores. Annual full-body skin exams with a dermatologist are recommended for people with significant sun exposure history.`},
]

const seoContent = {
  title: 'UV Exposure Calculator',
  category: 'health' as const,
  intro: `Ultraviolet radiation from sunlight is the primary environmental cause of skin cancer — responsible for roughly 90% of non-melanoma skin cancers and 86% of melanomas — yet it's also the primary driver of vitamin D synthesis, and moderate sun exposure has independent benefits for mood, circadian rhythm, and potentially immune function beyond just vitamin D production. Getting the balance right requires understanding how UV exposure works.

UV radiation comes in two main wavelengths of concern: UVB (280-315nm), which causes sunburn and drives vitamin D synthesis; and UVA (315-400nm), which penetrates year-round regardless of cloud cover, penetrates glass, causes photoaging (wrinkles, age spots), and also contributes to cancer risk.

The UV Index — a standardized scale from 0-11+ — quantifies daily UV intensity at ground level. At UV Index 6 (high), an unprotected fair-skinned person can burn in 15-25 minutes. At UV Index 11+ (extreme), burns can occur in under 10 minutes. The relationship between UV exposure and skin cancer is cumulative over a lifetime.

This calculator estimates your UV exposure risk based on your skin type, sun habits, and protection practices, and gives you a personalized safe exposure guideline for vitamin D synthesis versus skin damage risk.

**Long-tail searches answered here:** uv exposure risk calculator free online usa, how much uv exposure is safe calculator free tool, sunburn risk calculator by skin type and uv index, daily uv dose calculator by location and time free, skin cancer risk from uv exposure calculator usa, safe sun exposure time calculator by skin tone free, uv index 7 vs uv index 10 exposure risk calculator, cumulative uv lifetime skin cancer risk calculator usa free, uv exposure for vitamin d without burning calculator free, cloud cover uv reduction effect calculator usa, reflective surfaces uv exposure increase calculator free, shade vs direct sun uv exposure comparison calculator, annual uv damage score by geographic location calculator usa, sunscreen spf vs time in sun calculator free, uv exposure monitoring for outdoor workers calculator usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate uv exposure from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

Results are calibrated against population reference data from major US health surveys including NHANES (National Health and Nutrition Examination Survey), giving your result meaningful context relative to real Americans of your age and sex.

All calculations run locally in your browser. No data is transmitted anywhere. Results appear instantly as you adjust inputs.`,
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
  tipsSection: `Take measurements consistently under the same conditions for meaningful trend comparisons. Use the same time of day, same equipment, and same protocol each time you recalculate to minimize measurement variability.

Track trends over months rather than reacting to any single measurement. Health metrics fluctuate naturally based on hydration, food intake, sleep, and stress — patterns over 3-6 months are far more meaningful than individual data points.

Bring your results to your healthcare provider for professional interpretation in the context of your full health history, especially if results fall significantly outside the healthy reference ranges shown.`,
  scienceSection: `The formulas underlying this calculator are derived from peer-reviewed research published in major medical and scientific journals. Reference ranges are drawn from NHANES population survey data — the CDC's nationally representative survey of American adults — ensuring your result is compared against real, current population data.

As with all health calculations, individual results differ from population-average predictions based on genetic factors, medications, health conditions, and lifestyle variables. These calculations are educational tools, not diagnostic instruments. Always consult qualified healthcare professionals for medical decisions.`,
  conclusion: `SPF rating tells you how much UVB protection a sunscreen provides, but not UVA. For broad-spectrum protection, look for mineral sunscreens (zinc oxide, titanium dioxide) or chemical sunscreens labeled broad spectrum. SPF 30 blocks about 97% of UVB; SPF 50 blocks about 98%. The bigger issue is applying enough and reapplying every 2 hours when outdoors.

Vitamin D synthesis requires UVB, which is blocked by SPF 15+ sunscreen and doesn't penetrate glass. For most people in northern latitudes (above 35°N) from October to March, sun exposure produces essentially no vitamin D regardless of exposure duration. Supplementation (1,000-2,000 IU daily) is the practical solution for maintaining vitamin D status during low-UV months.

Use [our Skin Health Calculator](/calculators/health/skin-health-calculator) for a broader assessment of your skin health practices and photoaging risk.`,
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
        generateWebAppStructuredData({ name: 'UV Exposure Calculator', description: 'Calculate your daily UV radiation dose based on UV index, time of day, skin type, and exposure duration. Balance vitamin D production from sun exposur', url: 'https://tooltrio.com/calculators/health/uv-exposure-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'UV Exposure Calculator', description: 'Calculate your daily UV radiation dose based on UV index, time of day, skin type, and exposure duration. Balance vitamin D production from sun exposur', url: 'https://tooltrio.com/calculators/health/uv-exposure-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'UV Exposure Calculator', url: '/calculators/health/uv-exposure-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
