import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Hydration Calculator — Sport & Exercise Hydration Planning by Sweat Rate 2026',
  description: 'Free Hydration Calculator 2026 — Calculate your daily water intake needs based on weight, activity, and climate. Real examples for athletes and sedentary adults. Evidence-based hydration targets. No signup.',
  slug: 'hydration-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'hydration calculator 2026',
    'free hydration calculator',
    'hydration calculator usa 2026',
    'hydration calculator free 2026',
    'hydration calculator for athletes',
    'sport hydration planning',
    'exercise hydration needs',
    'pre workout hydration calculator',
    'during exercise fluid calculator',
    'post exercise rehydration',
    'sweat rate based hydration',
    'electrolyte needs exercise calculator',
    'marathon hydration plan',
    'hot weather exercise hydration',
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
  {question:'How much water should I drink per day by body weight?',answer:`The most evidence-based approach: 30-35 mL per kilogram of body weight per day for sedentary adults in moderate temperatures. For a 70 kg (154 lb) person, that's 2.1-2.45 liters (71-83 oz). For a 90 kg (198 lb) person, that's 2.7-3.15 liters (91-107 oz). These amounts cover basal fluid needs from urine output, breathing, and skin evaporation but don't account for exercise sweat losses, hot climates, or fever. The popular '8 glasses of 8 oz = 64 oz' rule is a reasonable minimum for small adults but inadequate for larger individuals. The National Academies of Sciences recommends 3.7 liters total water intake for adult men and 2.7 liters for adult women — these figures include water from food, which accounts for roughly 20% of daily intake.`},
  {question:'What color should my urine actually be for good hydration?',answer:`Pale yellow — roughly the color of lemonade or dilute apple juice — indicates adequate hydration. This corresponds to urine specific gravity of 1.005-1.015. Clear or nearly colorless urine suggests possible overhydration (though this is only a concern with very large water intake). Dark yellow like apple juice or amber indicates mild to moderate dehydration and a need to increase fluid intake. Orange or brown urine indicates significant dehydration and potentially other issues requiring evaluation. Some factors confound urine color: B vitamins (especially B2/riboflavin) turn urine bright yellow regardless of hydration status; beet consumption can cause pink or red urine (benign); asparagus affects urine odor in people with a specific genetic variation; some medications affect color. Morning urine is normally darker than daytime urine due to overnight concentration.`},
  {question:'Does the \'drink 8 glasses of water a day\' rule have any scientific basis?',answer:`The 8x8 rule has almost no scientific basis as a precise prescription. It appears to derive from a 1945 Food and Nutrition Board recommendation that stated '2.5 liters of water per day' — which was immediately followed by 'most of this quantity is contained in prepared foods,' a context that was universally ignored. It was popularized further by a 2002 review article that debunked it but inadvertently spread it. Actual optimal intake depends on body size (larger people need more), physical activity (exercise can require 500-1000 mL/hour extra), climate (hot humid environments increase needs dramatically), diet (high fruit and vegetable intake reduces beverage needs), and health conditions. The most important practical guideline is urine color monitoring — far more personalized and accurate than any fixed number.`},
  {question:'Does coffee, tea, and other caffeinated beverages count toward hydration?',answer:`Yes — despite the widespread belief that caffeinated beverages are dehydrating, the evidence is clear that coffee and tea count toward hydration goals. A cup of coffee causes you to excrete roughly 30-40 mL more urine than the 250 mL consumed, so the net hydration contribution is still approximately 210-220 mL. Research by Killer et al. (2014) directly compared coffee to water as hydration sources and found no significant differences in hydration markers. Alcohol is genuinely diuretic — it suppresses antidiuretic hormone (ADH), causing urine output to significantly exceed fluid intake. Sports drinks, milk, juice, and tea all contribute to hydration. The practical rule: if a beverage is non-alcoholic and not extremely salty or concentrated with sugar, it contributes meaningfully to your daily fluid intake.`},
  {question:'How much extra water do I need during and after exercise?',answer:`Sweat rates during moderate exercise typically range 0.5-1.5 liters per hour, with trained athletes in hot conditions producing up to 2-3 liters per hour. The American College of Sports Medicine recommends drinking 400-600 mL (14-20 oz) in the 2-4 hours before exercise. During exercise lasting under 60 minutes, drinking to thirst is generally adequate. For exercise over 60 minutes, 150-250 mL every 15-20 minutes is a practical target. For post-exercise rehydration, replace approximately 125-150% of the fluid lost (measured by weighing before and after exercise — 1 kg weight loss ≈ approximately 1 liter of sweat). Plain water is adequate for most exercise. For events lasting over 90 minutes or in very hot conditions, electrolyte replacement (particularly sodium) is important to prevent hyponatremia.`},
  {question:'Can I drink too much water? What is water intoxication?',answer:`Yes — drinking excessive amounts of plain water can dilute blood sodium to dangerously low levels (hyponatremia, defined as sodium below 135 mEq/L). The kidneys can excrete a maximum of approximately 800-1000 mL of free water per hour — exceeding this intake rate over sustained periods dilutes the body's sodium content. Symptoms of mild hyponatremia: nausea, headache, confusion. Severe hyponatremia (sodium below 120 mEq/L): seizures, brain herniation, death. This occurs primarily in endurance athletes who drink large quantities of plain water without electrolytes (the advice to 'drink ahead of thirst' in marathon running has contributed to multiple deaths). It also occurs in psychogenic polydipsia (a mental health condition involving compulsive water drinking) and rarely in infants given water instead of formula. For most people, drinking to thirst makes water intoxication essentially impossible.`},
  {question:'How does hydration affect athletic and cognitive performance?',answer:`Dehydration has measurable performance effects at relatively small deficits. Aerobic exercise performance declines measurably at 2% body weight dehydration and significantly at 3%. A 70 kg athlete losing 1.4 kg (3 lb) in sweat during exercise will show approximately 7-8% reduced VO2 max and impaired thermoregulation. Strength and power are less sensitive than endurance, showing significant declines only above 3-4% dehydration. Cognitive performance shows measurable impairment at 1-2% dehydration in multiple domains: reaction time, vigilance, working memory, and executive function. A 2011 study in the Journal of Nutrition found that women at 1.36% dehydration had increased perception of task difficulty and reduced ability to concentrate on cognitively demanding tasks, even at rest. The practical implication: adequate hydration before cognitively demanding work (exams, important meetings) is a legitimate evidence-based performance strategy.`},
  {question:'Why do elderly people often not drink enough water?',answer:`Older adults are at substantially higher risk of dehydration than younger people for multiple physiological reasons. Thirst sensation diminishes with age — elderly individuals experience lower thirst at identical dehydration levels compared to younger adults. Total body water decreases with age as muscle mass (which contains more water than fat) declines, reducing the reserve capacity. Kidney function declines approximately 1% per year after age 40, reducing the ability to concentrate urine and conserve water during mild dehydration. Many elderly people take diuretic medications for hypertension or heart failure. Mobility limitations may discourage drinking to avoid bathroom trips. Mild cognitive impairment reduces awareness of thirst. The consequences are serious: dehydration is the most common cause of hospitalization in adults over 65, and contributes to falls (orthostatic hypotension from dehydration), confusion (cerebral dehydration affects cognition acutely), and constipation.`},
]

const seoContent = {
  title: 'Hydration Calculator',
  category: 'health' as const,
  intro: `Proper hydration is one of those health fundamentals that's simultaneously obvious and chronically underachieved. Most adults are mildly dehydrated at some point every day — not dangerously, but enough to measurably impair cognitive performance, physical endurance, and mood. Research from the University of Connecticut found that mild dehydration of just 1.5% body weight loss reduced concentration, increased task difficulty perception, and worsened headache scores in young adults.

Individual fluid needs vary much more than the 8 glasses a day rule suggests. A sedentary 130-pound woman in a temperate climate needs far less than an active 200-pound man in summer heat. Sweat rate during exercise varies by up to 3x between individuals at the same intensity. Altitude, certain medications, hot foods, and high-sodium diets all increase fluid requirements.

Urine color remains one of the most practical real-time hydration indicators: pale yellow is the target; dark yellow or amber suggests underhydration; colorless can indicate overhydration (a concern in endurance athletes). Timing matters too — waking up with dark urine is normal; staying dark all morning suggests inadequate baseline intake.

This calculator estimates your personalized daily fluid target from body weight, activity level, sweat rate, climate, and diet patterns.

**Long-tail searches answered here:** daily hydration calculator free online usa, how much water should i drink today calculator, hydration needs by weight and activity calculator free, am i drinking enough water calculator no signup, water intake calculator for athletes usa free, optimal daily fluid intake calculator free tool online, hydration needs for hot climate workers calculator usa, hydration calculator for marathon runners free online, how does alcohol affect hydration needs calculator free, hydration requirements by sweat rate calculator usa, electrolyte hydration calculator for endurance sports free, daily fluid goal calculator from body weight in pounds, coffee tea dehydration impact on hydration calculator free, hydration for kidney stone prevention calculator usa free, fluid intake calculator for elderly adults usa free online`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate hydration from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Front-loading your hydration — drinking 500-600ml of water within the first hour of waking — replenishes the 200-300ml of fluid your body uses overnight through breathing and skin evaporation, and starts your circadian alertness curve with adequate hydration.

During exercise, aim to start hydrated rather than trying to catch up during the session. Pre-exercise urine should be pale yellow. If you're starting a workout with dark urine, you're already mildly dehydrated and performance will be compromised before you finish your warm-up.

For exercise lasting more than 90 minutes, plain water becomes insufficient — electrolytes lost in sweat (particularly sodium) need replacement. Use [our Sweat Rate Calculator](/calculators/health/sweat-rate-calculator) to quantify your individual fluid loss during specific workouts.`,
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
        generateWebAppStructuredData({ name: 'Hydration Calculator', description: 'Calculate pre-, during-, and post-exercise hydration needs based on body weight, exercise duration, intensity, and environmental conditions. Designed ', url: 'https://tooltrio.com/calculators/health/hydration-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Hydration Calculator', description: 'Calculate pre-, during-, and post-exercise hydration needs based on body weight, exercise duration, intensity, and environmental conditions. Designed ', url: 'https://tooltrio.com/calculators/health/hydration-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Hydration Calculator', url: '/calculators/health/hydration-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
