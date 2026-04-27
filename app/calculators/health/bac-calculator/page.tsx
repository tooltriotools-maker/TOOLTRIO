import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BAC Calculator — Blood Alcohol Concentration by Drinks, Weight & Time 2026',
  description: 'Calculate your estimated Blood Alcohol Concentration (BAC) from the number of drinks, drink type, body weight, sex, and time since drinking. See how BAC changes over time and when you reach legal driving limits. Free online bac calculator 2026. No signup required.',
  slug: 'bac-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'bac calculator 2026',
    'free bac calculator',
    'bac calculator usa 2026',
    'bac calculator free 2026',
    'bac calculator by weight',
    'blood alcohol content calculator',
    'how many drinks to reach 0.08 bac',
    'bac calculator male female difference',
    'widmark formula bac calculator',
    'estimated bac by time calculator',
    'standard drink bac calculator',
    'legal driving limit bac by state',
    'bac breathalyzer estimate',
    'sobering up bac calculator',
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
  {question:'What BAC level is considered legally impaired for driving in the US?',answer:`In all 50 US states and DC, the legal limit for driving while intoxicated is 0.08% BAC for adults 21 and over. At this level, research shows significant impairment in divided attention, tracking ability, and information processing speed. However, measurable impairment in reaction time and judgment begins at 0.02% — long before the legal limit. For commercial drivers (CDL holders), the federal limit is 0.04%. For drivers under 21, most states enforce a zero-tolerance policy at 0.02% or even 0.00%. Utah lowered its legal limit to 0.05% in 2018, the most restrictive in the nation.`},
  {question:'How does body weight affect how drunk you get?',answer:`Body weight is one of the most significant factors in BAC because alcohol distributes throughout total body water. A 120-pound person and a 200-pound person who each drink 3 beers in one hour will have dramatically different BAC levels — roughly 0.09% vs 0.05%, respectively. This is because the 200-pound person has substantially more body water to dilute the same amount of alcohol. The calculation isn't perfectly linear because body composition matters: muscle tissue contains more water than fat, so two people of the same weight but different body composition will have different BAC levels from identical alcohol consumption.`},
  {question:'Why do women get drunk faster than men at the same bodyweight?',answer:`Women have higher BAC than men after the same amount of alcohol per pound of body weight for two reasons. First, women have proportionally less body water — roughly 52% vs 61% — because women have higher body fat percentages on average, and fat contains almost no water. Second, women produce less alcohol dehydrogenase (ADH), the stomach enzyme that begins breaking down alcohol before it enters the bloodstream. Less ADH means more alcohol reaches the blood intact. The combined effect means a woman drinking identically to a man of equal weight will typically have a BAC 20-30% higher.`},
  {question:'How long does it actually take for alcohol to leave your system?',answer:`The liver processes alcohol at a fixed rate of approximately 0.015-0.017% BAC per hour for most adults — equivalent to roughly one standard drink per hour. This rate cannot be meaningfully accelerated by coffee, cold showers, food (after drinking), or exercise. Starting from a BAC of 0.08%, full sobriety takes approximately 5-6 hours of abstinence. Starting from 0.15% (heavily intoxicated), full clearance takes 9-10 hours. The only exceptions are people with unusually high ADH activity (genetic variation) who process slightly faster, and people with liver disease who process significantly slower.`},
  {question:'Can you calculate BAC accurately from the number of drinks consumed?',answer:`BAC calculators provide estimates, not precise measurements — the only accurate measurement is a breathalyzer or blood test. The main sources of error: actual alcohol content varies (a craft IPA may be 8% ABV vs a light beer at 4.2%), absorption rate varies with food consumption and gastric emptying speed, individual metabolism varies by genetics and tolerance, and the time spacing of drinks significantly affects peak BAC. A calculator assuming 1 standard drink = 14g of pure alcohol and using the Widmark formula is reasonably accurate (within 15-20%) for most adults under typical conditions.`},
  {question:'What is the \'absorption phase\' and why does it matter for safe drinking?',answer:`Alcohol is absorbed primarily in the small intestine, and the absorption phase typically takes 30-90 minutes after your last drink. During this phase, your BAC is still rising even if you've stopped drinking. This is why drinking quickly then 'waiting to sober up' before driving can be dangerous — you may feel less impaired when you stop drinking, but your BAC may continue rising for another 45 minutes before it peaks. Food in the stomach slows gastric emptying and delays absorption, which is why drinking on an empty stomach causes faster and higher BAC peaks than drinking with food.`},
  {question:'What BAC level causes blackout versus loss of consciousness?',answer:`Memory blackouts typically begin around 0.15-0.20% BAC — at this level, the hippocampus struggles to consolidate short-term memories into long-term storage, which is why people can seem functional while having no memory of events. Fragmentary blackouts (patchy memory) begin as low as 0.08-0.12%. Complete loss of consciousness typically occurs above 0.25-0.30% BAC. Fatal alcohol poisoning can occur above 0.30-0.40% BAC, with respiratory depression and aspiration risk. These thresholds vary significantly by tolerance — people with alcohol dependence may remain conscious at levels that would incapacitate a non-drinker.`},
  {question:'Does drinking coffee help you sober up faster?',answer:`No — this is one of the most persistent myths about alcohol. Coffee contains caffeine, which is a stimulant that can reduce the feeling of sedation associated with alcohol, but it does not affect the rate at which your liver metabolizes alcohol. A caffeinated, intoxicated person is simply a more alert drunk — their BAC is identical to what it would be without the coffee. In fact, the combination can be counterproductive: caffeine masks the sedation that often stops people from drinking more, and can increase the likelihood of additional alcohol consumption. The only thing that sobers you up is time.`},
]

const seoContent = {
  title: 'BAC Calculator',
  category: 'health' as const,
  intro: `Blood alcohol concentration isn't just a legal concept — it's a direct measure of how impaired your judgment, reaction time, and motor coordination are at any given moment. At 0.02-0.04 g/dL, most people experience mild relaxation and slightly impaired judgment. At 0.05-0.07, reaction time and coordination begin to measurably decline. At 0.08, the legal driving limit in most US states, most people show significant impairment even if they don't feel impaired. This gap between subjective feeling and objective impairment is why BAC matters.

Estimating BAC isn't straightforward because multiple variables interact: the number of standard drinks consumed, how quickly you drank, your body weight, your sex (women have lower body water percentage, meaning the same drinks produce higher BAC), and whether you've eaten recently (food slows absorption, reducing peak BAC but not total clearance time).

This calculator applies the Widmark formula — the same pharmacokinetic model used in toxicology and DUI forensics — to give you an estimated BAC based on your inputs. The result includes your current estimated BAC, how long until your BAC drops to zero, and the 0.04 and 0.02 thresholds.

The number is an estimate, not a measurement. Breathalyzers and blood tests are the only way to know your actual BAC.

**Long-tail searches answered here:** blood alcohol content calculator free online usa, bac calculator by weight and drinks free tool, am i over the legal limit to drive calculator, blood alcohol level estimator by gender weight, how many drinks to reach 0.08 bac calculator, free bac calculator no app no download, bac calculator beer wine shots mixed free usa, how long until i reach zero bac calculator free, bac by body weight 130 lb woman 3 drinks calculator, legal driving limit bac by state calculator usa free, bac calculator for 180 pound man 2 beers free, bac impact on driving ability calculator usa free, blood alcohol rising vs falling phase calculator free, bac hour by hour after stopping drinking calculator, how accurate are home breathalyzers vs bac calculator`,
  howItWorks: `The Widmark formula calculates estimated BAC: BAC = [alcohol consumed (g)] ÷ [body weight (g) × Vd] − [elimination rate × hours]. Standard drink is 14g ethanol. Vd (volume of distribution): 0.68 for men, 0.55 for women — reflecting lower average total body water percentage in women. Elimination rate: 0.015 g/dL/hour (range 0.010-0.035 depending on metabolism).

The calculator shows BAC at time of drinking, peak BAC (accounting for absorption time: 30-60 minutes for empty stomach, 60-90 minutes with food), and current estimated BAC accounting for elapsed time and ongoing elimination.`,
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
  tipsSection: `The calculator gives estimates — never decisions about driving safety. Breathalyzers used by law enforcement are calibrated to a specific partition ratio (2,100:1 between breath and blood alcohol); individual variation means actual BAC may differ 15-20% from any estimated value.

Pace yourself: one standard drink per hour keeps most average-weight adults under 0.04 g/dL — well below the legal limit. Two drinks in the first hour produces meaningfully higher peak BAC than spreading two drinks over two hours.

Beware the dose-response curve on judgment impairment: research consistently shows that BAC around 0.04-0.06 g/dL produces overconfidence about one's own impairment level — people feel less drunk than they are at these intermediate BAC values.`,
  scienceSection: `Widmark published his foundational alcohol pharmacokinetics research in 1932, establishing the mathematical relationship between alcohol dose, body weight, and BAC that remains standard in forensic medicine. The legal BAC limit of 0.08 g/dL was established in all 50 US states by 2004 (following federal encouragement through highway funding incentives). NHTSA research shows relative crash risk at 0.08 g/dL is approximately 11× higher than at 0.00 g/dL.`,
  conclusion: `A BAC calculator should inform decisions, not justify them. If this tool shows your estimated BAC at 0.06 and you're thinking about driving, the correct response is to wait — not to conclude you're "technically under the limit." Individual variation means your real BAC could be 0.02 higher or lower than the estimate. On a highway at 70 mph, that margin matters enormously.

At 0.08 g/dL, brake reaction time increases by roughly 12%, and the ability to divide attention between the road and hazards is significantly compromised. Those changes don't feel as dramatic as they test, which is why impaired driving kills tens of thousands of people a year.

Use this tool to understand how your body processes alcohol, to plan your drinking timing relative to driving or other obligations, and to make more informed choices — not as clearance to do things you shouldn't.`,
  comparisonTable: [{label:"0.02-0.03 g/dL",value:"Mild mood enhancement; some reaction time impairment begins",note:""},
{label:"0.05-0.08 g/dL",value:"Reduced inhibition; coordination impairment; judgment affected",note:""},
{label:"0.08 g/dL",value:"US legal driving limit — significant impairment for all drivers",note:""},
{label:"0.10-0.15 g/dL",value:"Slurred speech; impaired balance; significant reaction time deficit",note:""},
{label:"0.15-0.20 g/dL",value:"Major cognitive impairment; blackout risk; vomiting risk",note:""},
{label:"≥0.30 g/dL",value:"Severe intoxication; respiratory depression; medical emergency",note:""},],
  didYouKnow: ['A 150-pound man who drinks 4 beers in 2 hours reaches approximately BAC 0.07-0.08 g/dL — close to the legal limit. Adding one more drink pushes well over it while he may still feel \'fine.\'',
'The legal limit of 0.08 g/dL was chosen partly because virtually all drivers show measurable reaction time impairment at this level, even those who feel subjectively unaffected.',],
  keyStats: [{stat:"0.08 g/dL",source:"US legal driving BAC limit"},
{stat:"11×",source:"Elevated crash risk at 0.08 g/dL vs sober (NHTSA)"},
{stat:"0.015 g/dL/hr",source:"Average alcohol elimination rate"},],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'BAC Calculator', description: 'Calculate your estimated Blood Alcohol Concentration (BAC) from the number of drinks, drink type, body weight, sex, and time since drinking. See how B', url: 'https://tooltrio.com/calculators/health/bac-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'BAC Calculator', description: 'Calculate your estimated Blood Alcohol Concentration (BAC) from the number of drinks, drink type, body weight, sex, and time since drinking. See how B', url: 'https://tooltrio.com/calculators/health/bac-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'BAC Calculator', url: '/calculators/health/bac-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
