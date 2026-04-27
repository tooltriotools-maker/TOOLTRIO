import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Cycling Calorie Calculator — Outdoor, Indoor & Stationary Bike Calorie Burn 2026',
  description: 'Free Cycling Calories Calculator 2026 — Find your daily calorie needs using the Mifflin-St Jeor equation. TDEE, weight loss, and muscle gain targets. Real examples for men and women of all ages. No signup.',
  slug: 'cycling-calories-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'cycling calories calculator 2026',
    'free cycling calories calculator',
    'cycling calories calculator usa 2026',
    'calorie calculator 2026',
    'daily calorie calculator 2026',
    'calorie needs calculator usa 2026',
    'cycling calorie calculator',
    'calories burned cycling by speed',
    'calories burned stationary bike',
    'indoor cycling calorie calculator',
    'calories burned mountain biking',
    'cycling watts to calories calculator',
    'peloton calorie calculator',
    'how many calories cycling 1 hour',
    'cycling for weight loss calorie burn',
    'cycling power output calories',
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
  {question:'How many calories does cycling burn per hour?',answer:'Cycling calorie burn depends on intensity (typically estimated from speed or power output) and body weight. For a 150 lb (68 kg) rider: casual cycling at 10-12 mph burns approximately 400-500 kcal/hour; moderate pace at 12-14 mph burns approximately 500-600 kcal/hour; vigorous cycling at 14-16 mph burns approximately 600-700 kcal/hour; racing pace at 16-19 mph burns approximately 700-850 kcal/hour. Power output (watts) gives more accurate estimates — every 100W produces approximately 360 kcal/hour at 100% mechanical efficiency, adjusted to approximately 450-500 kcal/hour accounting for metabolic inefficiency (~75%).',},
  {question:'Is indoor cycling (Peloton, spin) as effective as outdoor cycling?',answer:'Indoor cycling at the same intensity and duration burns very similar calories as outdoor cycling — both use the same primary muscle groups at the same metabolic cost. Peloton and other smart trainers measure power output directly, providing more accurate calorie estimates than GPS-based outdoor calculations. Outdoor cycling typically burns slightly more total calories due to variable terrain requiring more frequent accelerations and energy absorption from road vibration. The calorie estimates from Peloton and similar apps are reasonably accurate when power data is used, though they often overestimate slightly by including resting metabolic rate in the calculation.',},
  {question:'What is the most efficient way to burn calories cycling?',answer:'For maximum calorie burn per hour: higher intensity cycling burns more calories per hour up to physical limits. For maximum total calorie burn in a session: longer moderate-intensity rides (Zone 2, 65-75% max heart rate) allow longer durations and high total volume. For the best calorie-to-time ratio: HIIT cycling (alternating 30-second to 4-minute hard efforts with recovery) achieves higher average power output over 30-45 minutes than steady-state riding, burning more calories in less time. Research shows that HIIT cycling also produces greater EPOC (post-exercise calorie burn) than steady-state riding of the same total duration.',},
  {question:'How accurate is the calorie counter on my bike or cycling app?',answer:'Accuracy varies by data source: power meter data (the most accurate input) produces calorie estimates within 5-10% of actual expenditure when combined with accurate rider weight. Heart rate-based algorithms (no power meter) have errors of 15-30% depending on fitness level and individual cardiac efficiency. Speed-based calculations without power or heart rate data can be off by 20-40% because speed on a bike is heavily influenced by aerodynamics, grade, road surface, and drafting — factors unrelated to metabolic effort. GPS cycling computers (Garmin, Wahoo) are typically accurate when using a power meter and reasonably accurate with heart rate.',},
  {question:'How many calories should I eat before and during a long cycling ride?',answer:'Fueling guidelines for endurance cycling: before rides under 60 minutes at moderate intensity, no special fueling is needed if you have eaten normally. For rides 60-90 minutes at higher intensity: 30-60g of carbohydrate per hour during the ride. For rides 90+ minutes: 60-90g of carbohydrates per hour (requires mixed carbohydrate sources — glucose and fructose — for absorption above 60g/hour). Approximately 500-800 mL of fluid per hour in moderate temperature. Post-ride within 30 minutes: 1-1.2g/kg body weight of carbohydrates plus 20-30g of protein for glycogen replenishment and muscle repair.',},
  {question:'Does e-bike cycling count as real exercise?',answer:'E-bike cycling provides less vigorous exercise than regular cycling at the same speed (motor assistance reduces required pedaling effort) but provides more activity than the same trip by car or public transit. A 2019 study in Medicine & Science in Sports & Exercise found e-bike riders still achieved moderate-intensity exercise (approximately 64% of max heart rate) and significantly increased weekly physical activity compared to their pre-e-bike baseline. Most e-bike users log more miles per week than conventional cyclists, partly offsetting the lower intensity per mile. E-bikes are particularly valuable for people returning to exercise, older adults, or those with joint limitations for whom high-intensity cycling is not possible.',},
  {question:'How does hill climbing affect cycling calorie burn?',answer:'Climbing significantly increases calorie burn because the rider must do work against gravity in addition to forward momentum. The additional power required for climbing can be calculated as: extra power = grade (%) × speed (m/s) × total weight (rider + bike) × 9.81. A 75 kg rider on a 10 kg bike climbing a 5% grade at 15 km/h requires approximately 90W more than flat cycling at the same speed — increasing calorie burn by approximately 30%. This is why mountain cycling stages in professional races require consuming 6,000-8,000+ calories, compared to perhaps 4,000-5,000 for a flat stage.',},
]

const seoContent = {
  title: 'Cycling Calorie Calculator',
  category: 'health' as const,
  intro: `Cycling burns more calories per hour than most people think — and far fewer than most cycling apps claim. A 155-pound cyclist riding at moderate intensity (12-14 mph on flat terrain) burns roughly 500-600 calories per hour. That number climbs dramatically with speed and grade: riding hard at 16-19 mph can reach 800-1,000+ calories per hour, and any significant climbing multiplies the caloric cost substantially.

The challenge with cycling calorie estimates is that the same 30-minute ride can represent wildly different energy expenditure depending on actual speed maintained, terrain, rider weight, and whether the ride involved any sustained effort or was mostly coasting. Heart rate data improves accuracy significantly — calorie estimates tied to heart rate are more reliable than speed-based estimates because heart rate more directly reflects actual metabolic demand.

This calculator uses MET values calibrated for cycling intensity and your specific body weight to estimate calorie expenditure. It accounts for indoor vs. outdoor cycling (indoor cycling at equivalent power has a higher caloric cost because there's no wind resistance benefit at speed), terrain grade, and average speed.

The result here is honest about a 10-15% margin of error inherent in MET-based calculations. If you want precise measurements, a power meter combined with efficiency data is the only route to real accuracy.

**Long-tail searches answered here:** cycling calorie burn calculator free online usa, calories burned biking calculator by weight and speed, how many calories burned cycling 10 miles free calculator, stationary bike calorie calculator no signup, road cycling calorie burn estimator by watts, calories burned cycling 30 minutes free tool usa, calories burned spinning class 45 minutes calculator free, cycling uphill vs flat calorie burn calculator usa, mountain biking calorie burn calculator free online, calories burned commuting by bike daily calculator free, indoor cycling calorie burn vs outdoor calculator free, heart rate based cycling calorie calculator usa free, e bike vs regular bike calorie burn difference free, cycling calorie burn at different speeds calculator free, weight loss from cycling 30 days calculator usa free`,
  howItWorks: `Cycling calorie burn is calculated from MET values: road cycling at 10-12 mph = MET 8.0; 12-14 mph = MET 10.0; 14-16 mph = MET 12.0; 16-19 mph = MET 14.0; >19 mph = MET 16.0. Mountain biking = MET 10.0-14.0 depending on terrain. Stationary cycling, moderate = MET 5.5; vigorous = MET 8.5; spinning class = MET 8.5-12.0.

For cyclists with power meters, a more accurate calculation uses: calories = (power output in watts × duration in seconds) / 4.18 × 0.24 (accounting for ~24% mechanical efficiency of human cycling). A 60-minute ride at 200W = (200 × 3600) / 4.18 × 0.24 = approximately 825 kcal.`,
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
  tipsSection: `Use power output if available — a power meter produces significantly more accurate calorie estimates than speed-based calculations because speed varies with grade, wind, and drafting while power directly measures mechanical work output.

Account for the 'afterburn' (EPOC) effect from intense cycling: a hard 60-minute ride can elevate metabolism by 5-15% for 2-6 hours post-exercise, adding 50-150 kcal to the total energy expenditure beyond the ride itself.

Cycling calorie burn increases substantially with hills — a 5% grade at the same speed increases power output and thus calorie burn by approximately 40-60%. Hilly routes produce meaningfully different calorie burns than flat routes at the same average speed.`,
  scienceSection: `The mechanical efficiency of cycling (approximately 22-26%) is remarkably consistent across cyclists of different fitness levels — meaning the relationship between power output (watts) and calorie burn is reliable for energy expenditure calculation. Research by Jeukendrup and Wallis established power-to-energy relationships across cycling intensity levels, enabling the watt-based calorie calculation used by cycling computers and training platforms. The physiological basis is that ATP synthesis from glucose oxidation is approximately 38% efficient, and muscle mechanical efficiency converting ATP to mechanical work is approximately 65% — giving an overall gross mechanical efficiency of roughly 25%.`,
  conclusion: `Cycling is one of the most efficient forms of exercise for high calorie burn at moderate impact — your body weight is supported, reducing joint stress compared to running, which allows longer durations and more total energy expenditure for many people. This makes cycling particularly valuable for weight management in people with knee or hip issues that limit running.

For calorie-conscious cyclists, the relationship between effort and calorie burn is non-linear. Riding 20% harder doesn't burn 20% more calories — the gains compound. Incorporating hill climbs, intervals, or even increasing average speed by 1-2 mph produces meaningfully larger calorie burn over the same duration.

Use [our TDEE Calculator](/calculators/health/tdee-calculator) to factor your cycling activity into your daily energy expenditure calculation, or [our Running Pace Calculator](/calculators/health/running-pace-calculator) if you cross-train and want to compare calorie burn across disciplines.`,
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
        generateWebAppStructuredData({ name: 'Cycling Calorie Calculator', description: 'Calculate calories burned cycling based on your weight, cycling speed or power output, duration, and terrain. Covers road cycling, mountain biking, st', url: 'https://tooltrio.com/calculators/health/cycling-calories-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Cycling Calorie Calculator', description: 'Calculate calories burned cycling based on your weight, cycling speed or power output, duration, and terrain. Covers road cycling, mountain biking, st', url: 'https://tooltrio.com/calculators/health/cycling-calories-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Cycling Calorie Calculator', url: '/calculators/health/cycling-calories-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
