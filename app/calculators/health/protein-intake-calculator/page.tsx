import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Protein Intake Calculator — Daily Protein by Goal, Weight & Activity Level 2026',
  description: 'Free Protein Intake Calculator 2026 — Calculate daily protein needs for muscle gain, fat loss, or maintenance. Based on body weight and activity level. Real examples for 150–250 lb individuals. No signup required.',
  slug: 'protein-intake-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'protein intake calculator 2026',
    'free protein intake calculator',
    'protein intake calculator usa 2026',
    'protein intake calculator 2026',
    'daily protein needs 2026',
    'protein calculator for muscle gain 2026',
    'how much protein per day to build muscle',
    'protein intake calculator by body weight',
    'protein for fat loss while preserving muscle',
    'daily protein needs for women over 40',
    'protein per meal calculator',
    'high protein diet how much is too much',
    'protein intake for endurance athletes',
    'protein needs for older adults sarcopenia',
    '0.8 g per kg protein recommendation',
    'best protein sources complete amino acids',
  ],
})

const relatedCalculators = [
  {name:"Macro Calculator",href:"/calculators/health/macro-calculator",icon:"🥗",desc:"Full macronutrient split by goal"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Total calories with protein included"},
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total daily calorie needs"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition for protein target"},
  {name:"Lean Body Mass Calculator",href:"/calculators/health/lean-body-mass-calculator",icon:"💉",desc:"LBM-based protein calculation"},
  {name:"Muscle Gain Calculator",href:"/calculators/health/muscle-gain-calculator",icon:"🏋️",desc:"Calorie and protein surplus for mass"},
  {name:"Creatine Dosage Calculator",href:"/calculators/health/creatine-dosage-calculator",icon:"💊",desc:"Creatine loading and maintenance dose"},
  {name:"Keto Macro Calculator",href:"/calculators/health/keto-macro-calculator",icon:"🥑",desc:"Protein on ketogenic diet"}
]

const faqs = [
  {question:'How much protein do I need per day to build muscle?',answer:'Research from the International Society of Sports Nutrition (ISSN) and multiple meta-analyses indicates that 1.6-2.2 grams of protein per kilogram of body weight per day maximizes muscle protein synthesis in most adults engaged in resistance training. Going above 2.2 g/kg/day provides no additional muscle building benefit for most people, though it will not cause harm. For a 175 lb (79 kg) man, this translates to 126-174 grams of protein per day — substantially more than the RDA of 0.8 g/kg, which is designed to prevent deficiency, not optimize performance.',},
  {question:'What is the minimum protein needed to prevent muscle loss while dieting?',answer:'During a caloric deficit, protein needs actually increase compared to maintenance because amino acids are at greater risk of being oxidized for fuel. Research consistently shows that 1.8-2.4 g/kg of body weight (some studies suggest up to 3.1 g/kg for very lean athletes in aggressive deficits) is needed to preserve lean mass during weight loss. The extra protein serves two protective functions: it provides substrate for maintaining muscle protein synthesis despite the energy shortage, and it is highly satiating, making it easier to maintain the calorie deficit without excessive hunger.',},
  {question:'Does protein intake need to be spread across multiple meals?',answer:'Muscle protein synthesis is maximized by consuming 0.4 g/kg of protein per meal rather than eating the same total protein in fewer larger doses. For most people this means 3-5 meals containing 25-50 grams of protein each, depending on body size and total daily target. Research shows that protein synthesis is \'muscle full\' response — muscle can only synthesize protein at a finite rate regardless of how much is consumed at once. Spreading protein intake maintains elevated amino acid availability throughout the day, keeping muscle protein synthesis elevated longer than a single large protein meal would.',},
  {question:'Are plant proteins as effective as animal proteins for muscle building?',answer:'Plant proteins are generally less effective per gram than animal proteins for muscle building due to two factors: lower leucine content (leucine is the key amino acid that triggers muscle protein synthesis) and lower digestibility and amino acid bioavailability. However this difference can be offset by eating 20-40% more plant protein than animal protein would require. Soy protein is the highest-quality plant protein and most comparable to whey. Combining different plant proteins (rice + pea, beans + grains) improves the amino acid profile. Vegans and vegetarians need slightly higher total protein targets — approximately 1.8-2.5 g/kg — to achieve equivalent muscle building effects.',},
  {question:'Is it true that excess protein is bad for your kidneys?',answer:'For healthy adults with normal kidney function, there is no evidence that high protein intake (even at 2-3 g/kg/day) causes kidney damage. This concern stems from studies in patients with pre-existing chronic kidney disease (CKD), for whom high protein intake can accelerate progression — but this does not apply to healthy kidneys. The International Society of Nephrology and multiple systematic reviews confirm that high protein diets do not cause kidney disease in healthy individuals. If you have existing kidney disease, your nephrologist should set your protein targets; otherwise the kidneys adapt efficiently to varying protein intakes.',},
  {question:'How does aging affect protein needs?',answer:'Older adults (65+) experience \'anabolic resistance\' — their muscles are less responsive to the muscle-building signal from protein and exercise. Research shows older adults need 1.2-1.6 g/kg/day even to maintain existing muscle mass, compared to 0.8 g/kg for younger sedentary adults. Per-meal protein needs also increase: older adults require approximately 35-40 grams of protein per meal (vs 20-25 g for younger adults) to achieve the same muscle protein synthesis response. This higher protein threshold in aging is one of the key reasons maintaining or building muscle after 50 requires both adequate protein AND consistent resistance training.',},
  {question:'What foods have the highest protein per calorie?',answer:'Top protein sources by protein density: cooked chicken breast (31g/100g, 165 kcal), canned tuna (29g/100g, 130 kcal), egg whites (11g/100g, 52 kcal), Greek yogurt 0% fat (17g/170g serving, 100 kcal), cottage cheese low-fat (28g/cup, 163 kcal), shrimp (24g/100g, 99 kcal), tofu firm (17g/100g, 144 kcal), and whey protein powder (25g/30g scoop, ~120 kcal). These sources also provide complete amino acid profiles — all essential amino acids at adequate amounts.',},
  {question:'Can eating too much protein cause weight gain?',answer:'Protein has a caloric value of 4 kcal/gram — identical to carbohydrates. However it has a significantly higher thermic effect (20-30% of protein calories are burned during digestion versus 5-10% for carbohydrates and 0-3% for fat) and is the most satiating macronutrient per calorie. In practice, substituting protein for an equal calorie amount of carbohydrates or fat consistently produces better body composition outcomes in studies, primarily because satiety from protein naturally reduces total calorie intake. Consuming protein calories in excess of total TDEE will cause fat gain — but protein itself is no more fattening than any other macronutrient per calorie.',},
]

const seoContent = {
  title: 'Protein Intake Calculator',
  category: 'health' as const,
  intro: `Protein is arguably the most important macronutrient to get right, regardless of your health goal. Whether you are trying to lose fat, build muscle, perform better in sport, or simply maintain your health as you age, protein plays a central role — and the right amount is almost certainly different from what general dietary guidelines suggest.

The standard RDA of 0.8 grams of protein per kilogram of body weight was set to prevent deficiency in sedentary adults, not to optimize body composition or athletic performance. Research over the past two decades has consistently shown that physically active adults, people dieting to lose fat, and older adults all need significantly more — typically 1.6-2.2 g/kg/day for most active adults, with needs running higher during aggressive caloric deficits.

This calculator gives you a personalized daily protein target based on your body weight, activity level, and specific goal — fat loss, muscle building, athletic performance, or healthy maintenance. It also breaks your target down into per-meal targets, making it practical to actually hit the number consistently.

Use your protein target alongside [our Macro Calculator](/calculators/health/macro-calculator) to allocate the remaining calories between carbohydrates and fat based on your dietary preferences.

**Long-tail searches answered here:** daily protein intake calculator free online usa, how much protein should i eat per day calculator, protein calculator for weight loss and muscle gain free, protein grams per pound body weight calculator, how many grams of protein per day calculator no signup, protein needs calculator by activity level and weight usa, protein calculator for women trying to lose weight free, how much protein per day to build muscle calculator usa, protein intake for 150 pound woman calculator free, optimal protein intake for seniors over 60 calculator, protein calculator for endurance athletes usa free online, high protein diet calculator for fat loss free online, daily protein needs during pregnancy calculator free, how much protein does a vegetarian need calculator usa, protein per meal vs total daily protein calculator free`,
  howItWorks: `Daily protein targets are calculated based on your body weight using evidence-based ranges from the International Society of Sports Nutrition (ISSN) position stands, which represent the scientific consensus from hundreds of controlled studies on protein and muscle metabolism.

For most active adults the calculation uses lean body mass rather than total body weight when body fat percentage is known — this is more accurate for people with higher body fat because fat tissue does not require protein for maintenance. The formula scales protein intake per kilogram of lean mass or body weight based on goal: 1.6 g/kg for general fitness maintenance, 1.8-2.0 g/kg for fat loss with muscle preservation, 2.0-2.2 g/kg for muscle building, and 1.2-1.6 g/kg for older adults focused on preventing sarcopenia.

Per-meal targets are calculated by dividing total daily protein by 3-5 meals, with the minimum per-meal threshold set at 0.4 g/kg (approximately 25-40 grams for most adults) — the minimum shown to maximally stimulate muscle protein synthesis in a single meal.`,
  benefits: [
        {title:"Goal-specific protein targets",text:"Separate calculations for fat loss (higher to preserve muscle), muscle building, athletic performance, and healthy aging. Each target reflects the current scientific evidence for that specific context rather than a one-size-fits-all recommendation.",},
        {title:"Per-meal protein breakdown",text:"Daily protein divided into optimal per-meal doses based on the 0.4 g/kg per meal research threshold. Makes protein targets immediately actionable when planning meals rather than just tracking a daily total.",},
        {title:"Protein quality context",text:"Results include guidance on protein quality — the difference between complete (animal) and incomplete (plant) proteins — and adjusted recommendations for vegan and vegetarian users who need slightly higher total protein to compensate for lower bioavailability.",},
        {title:"Food source equivalents",text:"Your protein target is shown in common food equivalent terms — grams of chicken breast, number of eggs, cups of Greek yogurt — so you can immediately visualize what hitting your target looks like in real meals.",},
        {title:"Body weight vs lean mass option",text:"Toggle between total body weight protein calculation and lean mass-based calculation (if you know your body fat percentage) for a more precise target for those with higher body fat percentages.",},
        {title:"Age-adjusted recommendations",text:"Users over 60 automatically receive the higher protein recommendations appropriate for anabolic resistance in aging adults, reflecting the distinct protein metabolism research in older populations.",},
  ],
  useCases: [
        {title:"Starting a resistance training program",text:"Anyone beginning strength training should immediately increase protein intake to 1.6+ g/kg to support muscle protein synthesis. Many beginners see their best results in the first 3-6 months — starting with adequate protein from day one maximizes the muscle building opportunity of this beginner gain period.",},
        {title:"Cutting body fat while preserving muscle",text:"During a caloric deficit, inadequate protein is the primary cause of muscle loss. Set your protein target first (1.8-2.2 g/kg), subtract protein calories from your total calorie budget, and distribute remaining calories across carbohydrates and fat based on personal preference and workout timing.",},
        {title:"Managing hunger during a diet",text:"Protein is the most satiating macronutrient — research shows that replacing carbohydrate or fat calories with protein significantly reduces appetite and spontaneous calorie intake. If hunger is derailing your diet, the first intervention should be increasing protein, not just willpower.",},
        {title:"Recovery from injury or surgery",text:"Protein requirements increase during healing from musculoskeletal injury, surgery, or illness. The body's demand for amino acids for tissue repair, immune function, and inflammatory regulation is elevated, and inadequate protein intake demonstrably slows recovery.",},
  ],
  tipsSection: `Distribute protein evenly across 3-5 meals rather than concentrating it in one or two large servings. Research on 'muscle full' effect shows that muscle protein synthesis is capped per meal — consuming 60g in one meal stimulates synthesis no more than 35-40g. Spreading protein maintains elevated amino acid availability throughout the day.

Consume 25-40g of protein within 2 hours after resistance training. While the 'anabolic window' is not as narrow as once thought, post-workout protein definitely accelerates muscle repair and glycogen replenishment. A combination of fast-digesting (whey, eggs) and slower proteins (casein, Greek yogurt) provides sustained amino acid delivery.

Use tracking for at least 2-4 weeks when starting a high-protein diet. Most people significantly underestimate their actual protein intake before tracking. A food scale and tracking app reveal real intake patterns and help identify which meals are consistently low in protein — usually breakfast.`,
  scienceSection: `The RDA for protein (0.8 g/kg) was established using nitrogen balance methodology measuring the minimum intake preventing deficiency — a much lower bar than optimizing body composition or performance. A landmark 2018 meta-analysis by Morton et al. in British Journal of Sports Medicine analyzed 49 studies with 1,800 participants and found that protein supplementation beyond 1.62 g/kg produced no additional gains in muscle mass or strength in resistance training adults — establishing the upper effective limit for most people.

The International Society of Sports Nutrition's 2017 position stand synthesized the body of evidence and concluded that protein intakes of 1.4-2.0 g/kg/day are sufficient for most exercising individuals and higher intakes up to 3.1 g/kg/day may be beneficial during very aggressive caloric restriction in lean athletes. These findings inform the goal-specific recommendations in this calculator.`,
  conclusion: `Protein is the one macronutrient where most active adults are consistently underconsuming relative to their actual needs. The gap between the standard dietary recommendation (0.8 g/kg) and the evidence-based performance and body composition recommendation (1.6-2.2 g/kg) is enormous — doubling or even tripling the minimum guidance.

Hit your protein target consistently for 4-8 weeks, especially during any fat loss or muscle building phase, and you are likely to see improvements in body composition, recovery, and energy levels that you might otherwise attribute to other variables in your program.

Build your complete nutrition foundation with [our Macro Calculator](/calculators/health/macro-calculator), [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator), and [our TDEE Calculator](/calculators/health/tdee-calculator).`,
  comparisonTable: [
        {label:"Sedentary (no training)",value:"0.8-1.0 g/kg/day",note:"RDA minimum — deficiency prevention only",},
        {label:"Active adult (general fitness)",value:"1.2-1.6 g/kg/day",note:"Health maintenance with moderate activity",},
        {label:"Fat loss phase (resistance training)",value:"1.8-2.2 g/kg/day",note:"Muscle preservation during caloric deficit",},
        {label:"Muscle building",value:"1.6-2.2 g/kg/day",note:"Optimize muscle protein synthesis",},
        {label:"Endurance athlete",value:"1.4-1.7 g/kg/day",note:"Support for aerobic training adaptation",},
        {label:"Older adults (65+)",value:"1.2-1.6 g/kg/day",note:"Counter anabolic resistance of aging",},
        {label:"Aggressive cut (lean athlete)",value:"2.3-3.1 g/kg lean mass",note:"Extreme deficit muscle preservation",},
        {label:"Per-meal minimum",value:"0.4 g/kg or ~25-40g",note:"Threshold to maximize muscle protein synthesis",},
  ],
  didYouKnow: [
        'Leucine — found in highest concentrations in whey protein, eggs, and chicken breast — is the key amino acid that triggers muscle protein synthesis. Research shows approximately 2.5-3g of leucine per meal is needed to maximally stimulate the muscle-building response.',
        'A 2020 study found that protein consumed before sleep (30-40g casein) significantly increased overnight muscle protein synthesis and improved next-morning strength performance compared to no protein — establishing pre-sleep protein as a legitimate strategy for maximizing muscle building.',
  ],
  keyStats: [
        {stat:"1.6-2.2 g/kg/day",source:"Evidence-based protein for resistance training adults (ISSN 2017)",},
        {stat:"0.4 g/kg per meal",source:"Minimum per-meal protein to maximize muscle protein synthesis",},
        {stat:"~10-20%",source:"Higher protein needs of older adults vs younger adults same activity level",},
        {stat:"20-30%",source:"Thermic effect of protein vs 5-10% for carbs and 0-3% for fat",},
  ],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Protein Intake Calculator', description: 'Calculate your optimal daily protein intake for muscle building, fat loss, athletic performance, or healthy aging. Based on body weight and goal. Get ', url: 'https://tooltrio.com/calculators/health/protein-intake-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Protein Intake Calculator', description: 'Calculate your optimal daily protein intake for muscle building, fat loss, athletic performance, or healthy aging. Based on body weight and goal. Get ', url: 'https://tooltrio.com/calculators/health/protein-intake-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Protein Intake Calculator', url: '/calculators/health/protein-intake-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
