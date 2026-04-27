import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Macro Calculator — Protein, Carbs & Fat by Goal (Cutting, Bulking, Maintenance) 2026',
  description: 'Free Macro Calculator 2026 — Calculate your optimal macros (protein, carbs, fat) for your specific goals. Based on TDEE and goal type. Real examples for weight loss and muscle building. Instant results.',
  slug: 'macro-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'macro calculator 2026',
    'free macro calculator',
    'macro calculator usa 2026',
    'macro calculator 2026',
    'keto macro calculator 2026',
    'macronutrient calculator 2026',
    'macro calculator for weight loss',
    'how to calculate macros for muscle building',
    'macro split for cutting body fat',
    'carb protein fat ratio calculator',
    'macro calculator by body weight and goal',
    'best macros for fat loss and muscle gain',
    'keto macro calculator net carbs',
    'macro calculator for women',
    'endurance athlete macro split',
    'how to count macros for beginners',
  ],
})

const relatedCalculators = [
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total daily calorie baseline"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Calories with macro breakdown"},
  {name:"Protein Intake Calculator",href:"/calculators/health/protein-intake-calculator",icon:"🥩",desc:"Detailed protein targeting"},
  {name:"Keto Macro Calculator",href:"/calculators/health/keto-macro-calculator",icon:"🥑",desc:"Ketogenic-specific macros"},
  {name:"Calorie Deficit Calculator",href:"/calculators/health/calorie-deficit-calculator",icon:"📉",desc:"Safe deficit for fat loss"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition assessment"},
  {name:"Meal Timing Calculator",href:"/calculators/health/meal-timing-calculator",icon:"⏰",desc:"When to eat each macro"},
  {name:"Lean Body Mass Calculator",href:"/calculators/health/lean-body-mass-calculator",icon:"💉",desc:"LBM for accurate protein target"}
]

const faqs = [
  {question:'What is the ideal macro split for fat loss?',answer:'For fat loss, a common and evidence-supported starting macro split is 40% protein, 35% carbohydrates, 25% fat. The high protein (40%) preserves muscle during the calorie deficit, which is critical because muscle loss slows metabolism. The moderate carbohydrate allocation supports training energy, while fat is reduced but kept high enough to support hormone production. In practice: on a 1,800 calorie cut, that is 180g protein, 158g carbs, and 50g fat. The specific numbers matter less than hitting the protein target — once protein is set, carbs and fat can be adjusted based on personal preference and food tolerance.',},
  {question:'How do macros differ between cutting and bulking?',answer:'During a cut: protein stays high (1.8-2.2 g/kg) to preserve muscle, carbs are reduced to create a calorie deficit, fat is moderate. During a bulk: total calories are 200-300 above TDEE, protein remains at 1.6-2.0 g/kg for muscle synthesis, carbohydrates are increased significantly (higher carbs support intense training and glycogen stores), and fat is kept moderate. The practical difference is that during a bulk, carbohydrates do most of the extra calorie work since they fuel training better than additional protein or fat at the margin.',},
  {question:'What is a flexible dieting approach to macros?',answer:'Flexible dieting — sometimes called IIFYM (If It Fits Your Macros) — focuses on hitting daily macro targets regardless of specific food choices, rather than following a prescribed meal plan. Research consistently shows flexible dieting produces comparable body composition results to rigid meal plans but with far better long-term adherence and reduced psychological food restriction. The key requirements are: tracking food intake with a food scale and app, prioritizing protein and fiber targets, and fitting food choices within total macro allowances.',},
  {question:'How does carbohydrate timing work for gym performance?',answer:'Carbohydrates are the primary fuel for high-intensity exercise. Consuming 30-60g of carbohydrates 1-2 hours before training provides readily available glucose for the working muscles. During sessions over 60-90 minutes, 30-60g/hour of carbohydrates from gels or drinks maintains performance. After training, 1-1.2 g/kg of body weight of carbohydrates within 30-60 minutes replenishes muscle glycogen and — combined with protein — stimulates muscle repair. Total daily carbohydrate intake matters more than timing for most recreational athletes, but timing becomes more important during twice-daily training sessions.',},
  {question:'Is dietary fat important or should it be minimized?',answer:'Dietary fat is essential — not optional. Fat is required for absorption of fat-soluble vitamins (A, D, E, K), production of sex hormones (testosterone, estrogen), brain function (60% of the brain is fat), and cell membrane integrity. A minimum of 0.3-0.5 g/kg of body weight per day prevents hormonal dysfunction. Going much below 15-20% of total calories from fat is associated with hormonal disruption in women (menstrual irregularity) and men (low testosterone). The quality of fat matters: prioritize unsaturated fats from olive oil, nuts, avocado, and fatty fish over processed trans fats.',},
  {question:'How accurate do macros need to be to see results?',answer:'Research shows that hitting macros within ±10-15% of targets is sufficient for most people to achieve their goals. Perfect macro adherence every single day is neither necessary nor realistic long-term. Prioritize your protein target most strictly (within ±5-10%), as protein is most critical for muscle preservation and body composition. Carbs and fat can be more flexible — they are largely interchangeable for energy within your calorie budget. A weekly average that hits your targets is just as effective as hitting them perfectly every day, which reduces daily anxiety around eating.',},
  {question:'What macros should endurance athletes target?',answer:'Endurance athletes have fundamentally different macro needs than strength athletes. Carbohydrates are the primary fuel and should constitute 50-65% of total calories (or 5-7 g/kg/day for moderate training, up to 8-10 g/kg for elite competition). Protein needs are 1.4-1.7 g/kg for muscle repair and adaptation. Fat is 20-35% of calories. During heavy training blocks, many endurance athletes significantly underestimate carbohydrate needs, leading to chronic fatigue, poor recovery, and hormonal disruption — a condition called Relative Energy Deficiency in Sport (RED-S).',},
  {question:'Can I build muscle eating a high-carb, lower-fat diet versus low-carb, higher-fat?',answer:'Both high-carb and low-carb dietary approaches can support muscle building when total calories and protein are equated. A meta-analysis of 49 studies found that total protein intake — not carb or fat allocation — was the primary nutritional predictor of muscle gains from resistance training. However high-carbohydrate diets generally support higher training volume and intensity, which indirectly benefits muscle building by enabling harder and more frequent training sessions. Low-carb approaches may slightly limit peak training intensity but are viable for people who prefer that dietary pattern.',},
]

const seoContent = {
  title: 'Macro Calculator',
  category: 'health' as const,
  intro: `Macros — short for macronutrients — are the three major categories of nutrients your body uses for energy: protein, carbohydrates, and fat. Each plays distinct and essential roles in body composition, performance, and health, and the ratio between them shapes how your body responds to training and diet.

Unlike simple calorie counting, tracking macros gives you granular control over body composition outcomes. You can eat the same number of calories at completely different macro splits and get dramatically different results: a high-protein low-calorie diet preserves more muscle during fat loss than a low-protein low-calorie diet with the same total calories. A high-carbohydrate diet enables more intense training sessions than a high-fat low-carb diet at the same calories.

This calculator takes your TDEE (or you can enter calories manually), your body weight, and your primary goal, then calculates specific gram targets for protein, carbohydrates, and fat using evidence-based macro ratios validated in sports nutrition research.

Combine your macro targets with [our Meal Timing Calculator](/calculators/health/meal-timing-calculator) and [our Protein Intake Calculator](/calculators/health/protein-intake-calculator) for a complete nutritional strategy.

**Long-tail searches answered here:** macro calculator free online usa 2026, daily macros calculator for weight loss free, protein carbs fat calculator by goal and weight, iifym macro calculator free no account no signup, how many macros should i eat calculator free, flexible dieting macro calculator usa free online, macro calculator for women trying to lose fat free, macro split for building muscle while losing fat free, how to calculate macros for keto diet free usa, macro calculator for 1500 calorie diet plan free, protein fat carb percentage calculator by goal free, macros for cutting vs bulking calculator usa free, how to figure out my macros without an app free, daily macro needs for endurance runner calculator free, macros for body recomposition calculator free usa`,
  howItWorks: `Macro calculation starts with total daily calories — either your TDEE for maintenance or an adjusted target for fat loss or muscle gain. Protein is assigned first as the highest priority: 1.6-2.2 g/kg/day depending on goal, with each gram of protein providing 4 calories.

Remaining calories are then distributed between carbohydrates and fat according to goal-specific ratios. For fat loss: approximately 35-45% of remaining calories from carbohydrates, 55-65% from fat (ensuring minimum fat for hormonal function). For muscle building: 55-65% carbohydrates (to fuel intense training), 35-45% fat. For maintenance and general health: 45-55% carbohydrates, 45-55% fat based on personal preference.

Results are displayed in grams per day, grams per meal (assuming 4 meals), and visual proportion charts so you can understand both the absolute numbers and the relative proportions.`,
  benefits: [
        {title:"Goal-specific macro splits",text:"Distinct macro calculations for fat loss, lean bulking, maintenance, endurance sport, keto, and general health — each reflecting different metabolic priorities rather than one-size-fits-all ratios.",},
        {title:"Protein-first allocation method",text:"Protein is allocated first as the most important macro, then remaining calories are split between carbs and fat — the correct prioritization order for body composition optimization.",},
        {title:"Per-meal macro breakdown",text:"Daily targets divided into per-meal amounts for practical meal planning. Shows minimum protein per meal needed to maximize muscle protein synthesis.",},
        {title:"Flexible dieting guidance",text:"Includes ±10% tolerance ranges for each macro showing the 'acceptable zone' for flexible dieting — reducing the mental burden of perfect tracking while maintaining results.",},
        {title:"Food source examples",text:"Each macro target shown in common food equivalents — grams of chicken breast, cups of rice, tablespoons of olive oil — making abstract numbers immediately relatable.",},
        {title:"Weekly vs daily view",text:"Shows both daily macro targets and weekly totals, supporting the strategy of tracking macro averages over the week rather than stressing over daily perfection.",},
  ],
  useCases: [
        {title:"Starting structured nutrition tracking",text:"Calculate macros before starting a tracking app or meal prep protocol. Having specific gram targets makes tracking purposeful rather than just recording arbitrary numbers without context.",},
        {title:"Optimizing body recomposition",text:"Simultaneous fat loss and muscle gain requires careful macro management — high protein to support muscle synthesis, moderate calorie deficit to drive fat loss, sufficient carbs to fuel training. Use this calculator to set the precise targets this goal requires.",},
        {title:"Pre-competition prep",text:"Physique competitors, powerlifters cutting to weight class, and combat sport athletes use macro tracking during competition prep to precisely control body composition timeline.",},
        {title:"Adjusting for dietary pattern changes",text:"Switching to vegetarian, vegan, Mediterranean, or another dietary pattern often requires recalibrating macros since food protein density and fat types change significantly. Recalculate after any major dietary shift.",},
  ],
  tipsSection: `Weigh and measure food for at least the first 4-6 weeks of macro tracking. Research shows people who estimate portions rather than weighing them underestimate calorie intake by 20-40% consistently. A digital food scale removes this systematic error.

Track trends over a week, not a single day. One day significantly over on carbs while hitting protein is meaningless — the weekly average is what drives body composition outcomes. Many tracking apps show weekly macro averages which is the most useful view.

Adjust macros based on actual results every 4-6 weeks. If body weight or composition is not changing as expected, recalculate TDEE based on actual weight change data rather than assuming the formula is perfectly accurate.`,
  scienceSection: `Macronutrient research has established that total caloric balance and protein intake are the two dominant nutritional determinants of body composition, with carbohydrate-to-fat ratios playing a secondary role for most people. A landmark JAMA study by Sacks et al. (2009) compared four different dietary macro splits in 811 obese adults and found no significant differences in weight loss or body composition outcomes at 2 years when total calories were equated — confirming that the specific macro ratio matters less than adherence and total intake.

However sport nutrition research has demonstrated context-specific macro importance: carbohydrate availability meaningfully affects high-intensity exercise performance (Burke et al., multiple reviews in Sports Medicine) and protein timing and distribution affect muscle protein synthesis rates (Phillips, 2016). This explains why the optimal macro strategy differs between sedentary dieters and serious athletes.`,
  conclusion: `Your macro targets are the practical foundation of any nutritionally informed diet. Unlike generic dietary guidelines, your personal macro targets account for your specific body, activity level, and goal — making them a far more actionable guide than any population average recommendation.

Hit your protein target first. If you only track one number, track protein — it is the most impactful single nutritional variable for body composition. From there, manage total calories and allow carbs and fat to flex around your protein anchor based on how you feel, perform, and recover.

Combine your macro plan with [our Meal Timing Calculator](/calculators/health/meal-timing-calculator) and [our Protein Intake Calculator](/calculators/health/protein-intake-calculator) for a complete nutritional system.`,
  comparisonTable: [        {label:"Fat loss split",value:"40% protein / 35% carbs / 25% fat",note:"High protein preserves muscle in deficit",},
        {label:"Lean bulk split",value:"30% protein / 50% carbs / 20% fat",note:"Carbs fuel intense training for gains",},
        {label:"Maintenance split",value:"25% protein / 45% carbs / 30% fat",note:"Balanced for health and performance",},
        {label:"Endurance athlete",value:"15% protein / 65% carbs / 20% fat",note:"Carb-dominant for aerobic fuel",},
        {label:"Ketogenic",value:"25% protein / 5% carbs / 70% fat",note:"Very low carb induces ketosis",},
        {label:"Minimum fat",value:"0.3-0.5 g/kg/day",note:"Floor to prevent hormonal dysfunction",},
        {label:"Protein gram equivalence",value:"4 kcal/gram",note:"Same as carbs — protein is NOT uniquely fattening",},
        {label:"Carb gram equivalence",value:"4 kcal/gram",note:"Fat has 9 kcal/gram — more calorie-dense",},],
  didYouKnow: [        'Dietary fiber — a type of carbohydrate that humans cannot digest — is tracked separately from net carbs in many dieting approaches. Fiber contributes approximately 2 kcal/gram (vs 4 for digestible carbs) and is not counted in ketogenic macro calculations of net carbs.',
        'Research shows that replacing carbohydrate calories with equal protein calories at the same total intake reduces fat mass and preserves more lean mass — primarily because protein has a higher thermic effect and is more satiating per calorie.',],
  keyStats: [        {stat:"Protein",source:"4 kcal per gram — most satiating macronutrient",},
        {stat:"Carbohydrates",source:"4 kcal per gram — primary fuel for high-intensity exercise",},
        {stat:"Fat",source:"9 kcal per gram — essential for hormones and fat-soluble vitamins",},
        {stat:"Protein target",source:"1.6-2.2 g/kg/day for most active adults (ISSN 2017)",},],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Macro Calculator', description: 'Calculate your daily macronutrient targets — protein, carbohydrates, and fat — based on your TDEE and specific goal. Supports fat loss, muscle buildin', url: 'https://tooltrio.com/calculators/health/macro-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Macro Calculator', description: 'Calculate your daily macronutrient targets — protein, carbohydrates, and fat — based on your TDEE and specific goal. Supports fat loss, muscle buildin', url: 'https://tooltrio.com/calculators/health/macro-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Macro Calculator', url: '/calculators/health/macro-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
