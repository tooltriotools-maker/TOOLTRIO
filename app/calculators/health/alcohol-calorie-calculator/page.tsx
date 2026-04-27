import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Alcohol Calorie Calculator — Calories in Beer, Wine, Spirits & Cocktails 2026',
  description: 'Free Alcohol Calorie Calculator 2026 — Find your daily calorie needs using the Mifflin-St Jeor equation. TDEE, weight loss, and muscle gain targets. Real examples for men and women of all ages. No signup.',
  slug: 'alcohol-calorie-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'alcohol calorie calculator 2026',
    'free alcohol calorie calculator',
    'alcohol calorie calculator usa 2026',
    'calorie calculator 2026',
    'daily calorie calculator 2026',
    'calorie needs calculator usa 2026',
    'calories in beer by abv',
    'wine calorie calculator by glass size',
    'how many calories in a shot of vodka',
    'alcohol calorie calculator cocktails',
    'light beer vs regular beer calories',
    'calories in margarita',
    'low calorie alcohol options',
    'does alcohol calories count toward daily intake',
    'alcohol and weight gain',
    'calorie content of alcohol drinks',
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
  {question:'How many calories are in a standard drink?',answer:'A \'standard drink\' in the US contains 14 grams of pure alcohol and provides approximately 98 calories from the alcohol alone. However actual drink calories include additional calories from sugars, mixers, and other ingredients. A 12 oz regular beer (~5% ABV) averages 150 calories. A 5 oz glass of wine (~12% ABV) averages 120-125 calories. A 1.5 oz shot of 80-proof spirits averages 97 calories. Mixed drinks can range from 150 calories (vodka soda) to over 500 calories (Long Island Iced Tea).',},
  {question:'Why does alcohol contribute so many calories?',answer:'Alcohol (ethanol) provides 7 calories per gram — more than carbohydrates (4 kcal/g) or protein (4 kcal/g), and approaching fat (9 kcal/g). These are often called \'empty calories\' because they provide energy without vitamins, minerals, or other nutrients. Additionally, the body prioritizes metabolizing alcohol above other macronutrients, temporarily pausing fat oxidation while alcohol is being cleared — a key reason why alcohol consumption is associated with fat gain even when total calories appear moderate.',},
  {question:'Which alcoholic drinks are lowest in calories?',answer:'Lowest-calorie options (per standard serving): dry spirits (vodka, gin, rum, tequila, whiskey) at 97-105 calories per 1.5 oz; light beer at 85-110 calories per 12 oz; dry wine (brut champagne, dry white or red wine) at 100-130 calories per 5 oz. Highest-calorie options include craft IPAs (200-300+ calories per pint), sweet cocktails with juice and liqueur, dessert wines, and creamy drinks like White Russians or eggnog. Using soda water as a mixer instead of juice or soda cuts 100-150 calories per drink.',},
  {question:'Do \'low-carb\' or \'hard seltzer\' drinks have fewer calories?',answer:'Hard seltzers and low-carb beers do have fewer calories than regular beer — typically 90-110 calories and under 3g of carbs versus 150 calories and 13g of carbs for a regular beer. The calorie reduction comes from lower alcohol content (4-5% ABV vs 5-7% for craft beers) and fewer residual sugars. However the calorie difference between hard seltzer and regular beer is smaller than most people think, and pure spirits (vodka, gin) with zero-calorie mixers remain lower-calorie than most hard seltzers per serving.',},
  {question:'How does alcohol affect weight management beyond calories?',answer:'Beyond calorie content, alcohol affects weight management through several pathways: it acutely suppresses fat oxidation for 2-3 hours while being metabolized; it impairs sleep quality, which elevates hunger hormones (ghrelin) the next day; it reduces inhibition and decision-making around food, leading to higher-calorie late-night eating; it increases appetite independent of calories; and chronic heavy use impairs thyroid function and testosterone/estrogen balance. Research shows moderate drinkers tend to maintain weight better than heavy drinkers, but both do worse than non-drinkers for weight management.',},
  {question:'Are wine calories different from beer calories?',answer:'Wine and beer provide similar calories per standard drink, but differ in serving size considerations. A 5 oz pour of 12% wine is approximately 123 calories. A generous 6-7 oz pour (common in restaurants) is 148-171 calories. Beer calories range from 85 (light beer) to 200+ (strong craft IPA) per 12 oz. The key difference is that wine is typically sipped more slowly than beer, and people often drink fewer total standard drinks when drinking wine — which can reduce total calorie intake even if calories per serving are similar.',},
  {question:'How do mixers and cocktail ingredients affect drink calories?',answer:'Mixers and added ingredients often contribute more calories than the alcohol itself. A margarita\'s calorie breakdown: 1.5 oz tequila (97 kcal) + 1 oz triple sec (103 kcal) + 1 oz lime juice (8 kcal) + salted rim (negligible) = approximately 208 calories — with over half coming from the triple sec, not the tequila. A standard Piña Colada can reach 450-600 calories from coconut cream and pineapple juice. Substituting diet soda, soda water, or fresh citrus for sweet mixers typically reduces cocktail calories by 100-300 per drink.',},
]

const seoContent = {
  title: 'Alcohol Calorie Calculator',
  category: 'health' as const,
  intro: `Two glasses of wine with dinner. A beer at the game. A cocktail at happy hour. None of it feels like much in the moment, but alcohol is surprisingly calorie-dense — 7 calories per gram, almost as much as fat and nearly twice as much as carbohydrates. Unlike food calories, alcohol calories carry no nutritional value: no protein, no vitamins, no fiber. They go straight to your energy balance.

The tricky part is that most people genuinely don't know how many calories are in their usual drinks. A craft IPA can pack 250+ calories. A margarita with sugary mix can hit 400. A glass of wine ranges from 120 to 200 depending on pour size and alcohol content. Over a week of moderate drinking, those calories add up to a meaningful fraction of your total energy intake — often without being tracked or even noticed.

This calculator uses the Atwater factor for ethanol (7.1 kcal per gram of pure alcohol) to give you a precise calorie count based on your actual drink type, serving size, and ABV. You can enter a single drink or total up a full evening.

Pair this with [our TDEE Calculator](/calculators/health/tdee-calculator) to see what percentage of your daily energy budget alcohol is consuming, or use [our Calorie Calculator](/calculators/health/calorie-calculator) to fit drinking into a wider nutrition plan.

**Long-tail searches answered here:** how many calories in a beer vs wine calculator free, alcohol calorie counter by drink type usa, calories in mixed drinks calculator online free, beer wine spirits calorie comparison tool, how to count alcohol calories for weight loss, free drink calorie estimator no app required, calories in a glass of red wine 5oz calculator free usa, how many calories in a vodka soda calculator free, light beer vs regular beer calorie difference calculator, weekly alcohol calorie intake calculator free usa, alcohol calories per gram explained calculator free, lowest calorie alcoholic drink options calculator usa, calories in margarita vs beer vs wine free comparison, alcohol calorie impact on weight loss calculator free usa, how many calories in prosecco vs champagne calculator`,
  howItWorks: `Alcohol calories are calculated using the Atwater factor for ethanol: 7.1 kcal per gram of pure alcohol. For a standard drink: calories = (volume in mL × ABV%) × 0.789 (density of ethanol in g/mL) × 7.1 kcal/g. A 12 oz (355 mL) beer at 5% ABV contains: 355 × 0.05 × 0.789 × 7.1 = 99.6 alcohol calories, plus additional calories from carbohydrates in malt (typically 50-100 additional calories for regular beer). Wine calories include both alcohol and residual sugar. Spirits are primarily alcohol calories with minimal carbohydrates.`,
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
  tipsSection: `Track alcohol calories separately from food calories to understand their true contribution to your calorie budget. Many people are surprised to find that 2-3 drinks add 300-500 calories — equivalent to a full meal — on top of their food intake.

Lower ABV options meaningfully reduce calorie load. Switching from a 9% craft IPA to a 4% session lager cuts alcohol calories by more than half for the same volume. Light beers at 3.5-4.2% ABV have genuinely lower calorie counts.

Alcohol calories are especially problematic for weight management because ethanol is metabolized preferentially over fat — while your liver processes alcohol, fat burning essentially pauses.`,
  scienceSection: `Ethanol's caloric density of 7.1 kcal/gram places it between carbohydrates (4 kcal/g) and fat (9 kcal/g). However, alcohol's real metabolic impact exceeds its caloric value because it displaces fat oxidation. Research by Suter et al. (1992) demonstrated that alcohol infusion reduced whole-body fat oxidation by approximately 30% — meaning alcohol calories are additive to dietary intake rather than substituting for macronutrient calories.`,
  conclusion: `Knowing exactly how many calories are in your drinks doesn't mean you need to stop drinking — it means you can make informed trade-offs. A 300-calorie cocktail is a choice you can plan around. The same 300 calories consumed without awareness just silently undermines whatever else you're trying to do with your nutrition.

For most people, the most actionable insight is the weekly total. If you drink 4-5 nights per week at moderate levels, you may be consuming 1,500-2,500 extra calories per week from alcohol alone. That's a real number with real metabolic consequences — and a place where even modest reductions create meaningful change without requiring overhaul of your entire diet.

Use [our Calorie Calculator](/calculators/health/calorie-calculator) alongside this tool to see where alcohol fits in your complete energy picture.`,
  comparisonTable: [{label:"Regular beer (12oz, 5% ABV)",value:"~150 kcal",note:"Plus 10-15g carbohydrates"},
{label:"Light beer (12oz, 4.2% ABV)",value:"~100 kcal",note:"Standard light beer calories"},
{label:"Glass of wine (5oz, 13% ABV)",value:"~120 kcal",note:"Varies significantly with residual sugar"},
{label:"Spirit shot (1.5oz, 40% ABV)",value:"~97 kcal",note:"Minimal carbs; mixer adds more"},
{label:"Margarita (frozen, 8oz)",value:"~400-500 kcal",note:"Sugar in mixer dominates"},
{label:"Glass of champagne (4oz, 12% ABV)",value:"~85 kcal",note:"Lower sugar than most wines"},],
  didYouKnow: ['The liver can only metabolize approximately 1 standard drink per hour regardless of body size, sex, food intake, or coffee consumption — there is no way to speed up alcohol metabolism.',
'Alcohol increases appetite by activating NPY neurons in the hypothalamus — the same neurons involved in the stress response to food restriction — which is why drinking often leads to eating more food than planned (the \'drunchies\' effect).',],
  keyStats: [{stat:"7.1 kcal/g",source:"Caloric density of ethanol — between carbs (4) and fat (9)"},
{stat:"~150 kcal",source:"Typical calorie count of 12oz regular beer at 5% ABV"},
{stat:"30%",source:"Reduction in fat oxidation while liver processes alcohol (Suter et al., 1992)"},],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Alcohol Calorie Calculator', description: 'Calculate the exact calories in any alcoholic drink by type, alcohol percentage, and serving size. Compare drinks by calorie density and find lower-ca', url: 'https://tooltrio.com/calculators/health/alcohol-calorie-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Alcohol Calorie Calculator', description: 'Calculate the exact calories in any alcoholic drink by type, alcohol percentage, and serving size. Compare drinks by calorie density and find lower-ca', url: 'https://tooltrio.com/calculators/health/alcohol-calorie-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Alcohol Calorie Calculator', url: '/calculators/health/alcohol-calorie-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
