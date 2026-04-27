import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BMR Calculator — Basal Metabolic Rate Using Mifflin-St Jeor & Harris-Benedict 2026',
  description: 'Free BMR Calculator 2026 — Calculate your Basal Metabolic Rate at complete rest. Uses Mifflin-St Jeor and Harris-Benedict equations. Real examples for men and women. Instant results, no signup.',
  slug: 'bmr-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'bmr calculator 2026',
    'free bmr calculator',
    'bmr calculator usa 2026',
    'bmr calculator free 2026',
    'bmr calculator mifflin st jeor',
    'basal metabolic rate calculator by age',
    'what is a normal bmr for my height and weight',
    'harris benedict bmr calculator',
    'how to increase basal metabolic rate',
    'bmr vs tdee difference explained',
    'bmr calculator metric and imperial',
    'bmr calculator for weight loss',
    'does muscle increase bmr',
    'bmr decline with age',
  ],
})

const relatedCalculators = [
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Total daily energy with activity"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Daily calories for your goal"},
  {name:"Macro Calculator",href:"/calculators/health/macro-calculator",icon:"🥗",desc:"Protein, carbs, fat targets"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Body composition analysis"},
  {name:"Lean Body Mass Calculator",href:"/calculators/health/lean-body-mass-calculator",icon:"💉",desc:"Fat-free mass for Katch-McArdle"},
  {name:"Calorie Deficit Calculator",href:"/calculators/health/calorie-deficit-calculator",icon:"📉",desc:"Safe deficit for fat loss"},
  {name:"Muscle Gain Calculator",href:"/calculators/health/muscle-gain-calculator",icon:"🏋️",desc:"Calorie surplus for muscle building"},
  {name:"Resting Metabolic Rate Calculator",href:"/calculators/health/resting-metabolic-rate-calculator",icon:"🔥",desc:"Clinical RMR measurement context"}
]

const faqs = [
  {question:'What is BMR and what does it represent?',answer:'BMR is the number of calories your body burns at complete physical and digestive rest — the energy cost of breathing, pumping blood, maintaining body temperature, repairing cells, and running every organ system while you lie perfectly still and have not eaten for 12+ hours. It represents 60-75% of total daily energy expenditure for most sedentary people. BMR does NOT include the calories burned through physical activity, exercise, or digesting food — those are added via activity multipliers to get TDEE.',},
  {question:'Which BMR formula is most accurate — Mifflin-St Jeor or Harris-Benedict?',answer:'The Mifflin-St Jeor equation (1990) consistently outperforms the original Harris-Benedict equation (1919) in studies comparing predicted versus measured BMR using indirect calorimetry. A validation study of 498 adults found Mifflin-St Jeor accurate within 10% for 82% of subjects versus 59% for Harris-Benedict. For athletes and very lean individuals who know their body fat percentage, the Katch-McArdle formula — which uses lean body mass directly — is even more accurate because it is not confounded by body fat.',},
  {question:'How much does BMR decline with age?',answer:'BMR decreases approximately 1-2% per decade after age 20, primarily because muscle mass declines (a process called sarcopenia) and spontaneous physical activity tends to decrease. Between ages 20 and 70, BMR can decrease by 15-20% for the same body weight. However a 2021 study in Science found that BMR is actually relatively stable between ages 20-60, with the more dramatic decline occurring after 60. The practical implication is that building and maintaining muscle through resistance training is the most effective strategy for preserving metabolic rate throughout adulthood.',},
  {question:'Does having more muscle really increase BMR?',answer:'Yes — skeletal muscle is metabolically active tissue that burns approximately 6-10 kcal per pound per day at rest, compared to 1-2 kcal per pound per day for fat tissue. A person who gains 10 lbs of muscle through resistance training increases their resting BMR by approximately 60-100 kcal/day — equivalent to a 30-minute brisk walk. Over a year, this metabolic boost burns an additional 22,000-36,000 calories, making muscle building one of the most powerful long-term weight management strategies available.',},
  {question:'Why is BMR different from RMR?',answer:'BMR (Basal Metabolic Rate) technically requires a 12-hour fast, 8+ hours of sleep, and complete physical rest in a thermoneutral environment — conditions rarely achievable outside a laboratory. RMR (Resting Metabolic Rate) is measured under less strict conditions (usually 4-6 hour fast, lying quietly for 30 minutes) and is typically 10-20% higher than true BMR. In practice, most online \'BMR calculators\' actually calculate RMR, and the terms are often used interchangeably in fitness contexts. For practical purposes the difference is minor.',},
  {question:'How does body weight affect BMR?',answer:'BMR is directly proportional to body mass — heavier people have higher BMRs because they have more metabolic tissue to maintain. However the relationship is not perfectly linear because fat tissue contributes less to BMR than lean tissue. This means two people of the same total weight but different body compositions will have different BMRs — the leaner person will have a higher BMR. When you lose weight through dieting, BMR decreases both because you weigh less AND because the body down-regulates metabolic rate (metabolic adaptation) beyond what simple weight loss predicts.',},
  {question:'Can diet or lifestyle meaningfully change BMR?',answer:'BMR is influenced by several controllable factors. Resistance training increases lean mass and thus BMR over months of consistent training. Eating adequate protein (1.6-2.2 g/kg/day) prevents muscle loss during a caloric deficit, preserving BMR. Chronic caloric restriction suppresses BMR through metabolic adaptation — reducing thyroid hormones and sympathetic nervous system activity. Extreme caloric restriction or crash dieting causes the most severe BMR suppression. Cold exposure mildly increases BMR due to thermogenesis but the effect is modest (~5-10%) and not a practical weight loss tool.',},
  {question:'What should I do with my BMR number?',answer:'BMR alone has limited practical value — it tells you the minimum calories your body needs if you were completely immobile and fasting all day. The useful number is TDEE, which adds your activity-related calorie burn to BMR. Use your BMR as a baseline understanding of your metabolism, then multiply it by the appropriate activity factor to get TDEE, then subtract 300-500 kcal from TDEE to create a sustainable fat loss deficit. Never eat below your BMR for extended periods as this creates significant risk of muscle loss, nutrient deficiency, and severe metabolic adaptation.',},
]

const seoContent = {
  title: 'BMR Calculator',
  category: 'health' as const,
  intro: `Your BMR — Basal Metabolic Rate — is the foundation number that every calorie target, diet plan, and weight management strategy ultimately rests on. It represents the energy cost of simply existing: the calories your body burns to maintain every biological function at complete rest, every hour of every day, whether you're dieting, training hard, or doing nothing at all.

Understanding your BMR matters because it sets a hard floor on your calorie intake. Eating below your BMR is rarely justified and always has metabolic consequences — your body has non-negotiable energy requirements that cannot be bypassed through sheer willpower. Knowing your BMR also helps you understand why extreme diets backfire: when intake drops too far below BMR, the body slows metabolism, breaks down muscle tissue for fuel, and creates conditions that make long-term fat loss far harder.

This calculator provides three different BMR estimates: Mifflin-St Jeor (most accurate for average adults), Harris-Benedict (widely used historical formula), and Katch-McArdle (most accurate for athletes who know their body fat percentage). Seeing all three side-by-side helps you understand the range of uncertainty in any metabolic rate estimate and which formula best fits your situation.

Combine your BMR with [our TDEE Calculator](/calculators/health/tdee-calculator) to get your real maintenance calorie number, then use [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator) to build a sustainable fat loss plan.

**Long-tail searches answered here:** free bmr calculator for women usa pounds, basal metabolic rate calculator for men no signup, how many calories do i burn at rest free calculator, bmr calculator by age weight height activity level, mifflin st jeor bmr formula calculator online free, bmr calculator for weight loss 2026 no account needed, calories burned sleeping 8 hours bmr calculator free, bmr for sedentary lifestyle vs active person calculator, how many calories should i eat to maintain weight bmr, difference between bmr and tdee calculator usa free, bmr calculator for 200 pound woman free online, how does age affect basal metabolic rate calculator, bmr formula for kg vs pounds calculator free online, basal metabolic rate decline with age calculator free, bmr calculator for athletes vs non athletes free usa`,
  howItWorks: `The Mifflin-St Jeor BMR formula calculates resting energy expenditure from four variables: body weight (kg), height (cm), age (years), and sex. For men: BMR = (10 × weight) + (6.25 × height) − (5 × age) + 5. For women: BMR = (10 × weight) + (6.25 × height) − (5 × age) − 161. The sex constant reflects the average difference in body composition between men and women — men have proportionally more lean mass which burns more calories at rest.

The Katch-McArdle formula is simpler but requires knowing lean body mass: BMR = 370 + (21.6 × lean body mass in kg). It is more accurate for lean athletes because it completely bypasses the confounding effect of body fatness — a highly muscular 180 lb person and an obese 180 lb person will have identical Mifflin-St Jeor BMRs but meaningfully different Katch-McArdle BMRs reflecting their different lean mass.

Results are compared against age- and sex-specific population norms from NHANES (National Health and Nutrition Examination Survey) data, showing whether your metabolism falls below average, average, or above average relative to your demographic.`,
  benefits: [
        {title:"Three validated formula comparison",text:"See Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle estimates simultaneously. When all three agree closely, you can have high confidence in the result. When they diverge significantly, the explanation helps you understand which formula is more appropriate for your body composition.",},
        {title:"Age-adjusted metabolic context",text:"Your BMR is compared against NHANES population averages for your age and sex, showing whether your metabolism is faster or slower than typical for your demographic — important context for setting realistic weight management expectations.",},
        {title:"BMR to TDEE bridge",text:"The calculator automatically shows TDEE estimates at five activity levels based on your BMR, so you can immediately see how daily activity transforms your resting metabolism into a practical calorie target without needing a separate calculator.",},
        {title:"Lean mass input option",text:"If you know your body fat percentage from a DEXA scan or other method, entering it enables the more accurate Katch-McArdle calculation — a useful option for athletes and anyone who has had a body composition assessment.",},
        {title:"Metabolic rate trend over time",text:"An explanatory chart shows how BMR typically changes from age 20 to 80, helping you understand the role of age-related metabolic decline and why muscle preservation through resistance training becomes increasingly important after 30.",},
        {title:"Calorie floor warning",text:"If you set a goal calorie target below your calculated BMR, the calculator flags this with a warning explaining the metabolic and health risks of eating below basal metabolic requirements.",},
  ],
  useCases: [
        {title:"Setting a baseline before starting a diet",text:"Calculate and record your BMR before beginning any weight loss program. This number is your metabolic reference point — if you experience a plateau after 6-8 weeks, recalculating BMR at your new weight shows whether metabolic adaptation is occurring and by how much.",},
        {title:"Understanding why a previous diet stopped working",text:"Many people experience weight loss stalls not because they're eating more but because their BMR has decreased due to metabolic adaptation. Calculating BMR before, during, and after a diet phase quantifies this adaptation and informs whether a diet break or reverse dieting protocol is appropriate.",},
        {title:"Evaluating competing diet claims",text:"When a diet plan claims you can eat only 1,000 calories per day and lose weight without consequence, comparing that number against your personal BMR reveals immediately whether that intake level puts you below your metabolic floor — a red flag for crash dieting.",},
        {title:"Optimizing a lean bulk phase",text:"During a muscle-building phase, knowing your BMR helps set a ceiling on your calorie surplus. Eating more than 300-500 calories above TDEE adds mostly fat, not muscle. A precise BMR calculation ensures your surplus is appropriately sized for lean gains.",},
  ],
  tipsSection: `Calculate your BMR using consistent, accurate measurements. Use a calibrated digital scale for body weight — not a spring balance — and measure first thing in the morning after using the bathroom. For height, stand against a flat wall without shoes and use a tape measure rather than estimating.

If using the Katch-McArdle formula, use the most accurate body fat measurement available to you — a recent DEXA scan gives best results. Bioelectrical impedance (BIA) scale readings vary by ±3-5% based on hydration and should be taken under consistent conditions (same time of day, same hydration status).

Recalculate every 10-15 lbs of weight change. Your BMR changes significantly with meaningful weight loss or gain because both the total metabolic mass and composition of that mass change. A person who loses 30 lbs has a measurably different BMR at their new weight — continuing to use a BMR calculated at their starting weight will produce inaccurate TDEE and calorie target calculations.`,
  scienceSection: `BMR research began with respirometry experiments in the early 20th century. Harris and Benedict (1919) published their foundational equations based on measures of respiratory gas exchange in 136 men and 103 women. While groundbreaking for their time, Harris-Benedict equations have since been shown to systematically overestimate BMR by 5-15% in most adult populations.

Mifflin, St Jeor and colleagues (1990) published a new predictive equation using indirect calorimetry in a larger, more diverse sample of 498 adults. Their formula became the standard recommended by the Academy of Nutrition and Dietetics in 2005 and continues to be validated against measured BMR in subsequent research.

The most precise metabolic measurements come from whole-room indirect calorimetry — sealed chambers that measure the exact gases exchanged over 24+ hours. These measurements form the validation datasets against which all predictive formulas are benchmarked and regularly show that the best formulas predict within ±10% for most individuals, but with meaningful outliers at ±20% or more.`,
  conclusion: `Your BMR is the calorie foundation everything else builds on. Use it to set informed, non-arbitrary calorie targets that account for your actual metabolism rather than generic 1,200 or 1,500 calorie recommendations designed for a hypothetical average person who may have very different metabolic characteristics from you.

Most importantly, treat your BMR as a floor, not a target. Sustainable fat loss happens at TDEE minus 300-500 calories — meaningful enough to produce results, modest enough to preserve muscle mass and avoid severe metabolic adaptation. Going below BMR chronically is rarely justified outside carefully supervised clinical settings.

Complete your calorie picture with [our TDEE Calculator](/calculators/health/tdee-calculator), [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator), and [our Macro Calculator](/calculators/health/macro-calculator).`,
  comparisonTable: [
        {label:"Mifflin-St Jeor (Recommended)",value:"±10% for 82% of subjects",note:"Best general-purpose formula for non-athletic adults",},
        {label:"Harris-Benedict (Historical)",value:"±10% for 59% of subjects",note:"Tends to overestimate; still widely used",},
        {label:"Katch-McArdle (Athlete)",value:"Most accurate with known LBM",note:"Requires body fat % measurement",},
        {label:"BMR as % of TDEE",value:"60-75%",note:"Higher % for sedentary people, lower for very active",},
        {label:"BMR age-related decline",value:"~1-2% per decade",note:"From age 20-60; steeper after 60",},
        {label:"Muscle vs fat metabolic rate",value:"6-10 vs 1-2 kcal/lb/day",note:"Muscle burns 5-7× more calories per pound than fat at rest",},
  ],
  didYouKnow: [
        'Research shows that approximately 22% of the inter-individual variation in BMR is explained by genetic factors — meaning two identical-weight people eating the same diet can have BMRs differing by 200-400 calories purely due to genetics.',
        'Fever increases BMR by approximately 7% for each degree Fahrenheit above normal body temperature — this is why you lose weight rapidly when sick with a high fever, even without eating less.',
        'Brown adipose tissue (brown fat) is a metabolically active fat that generates heat rather than storing energy. Adults have small deposits around the neck and spine that activate in cold temperatures, modestly increasing BMR.',
  ],
  keyStats: [
        {stat:"60-75%",source:"BMR's share of total daily energy expenditure for sedentary adults",},
        {stat:"±10%",source:"Typical accuracy range of best BMR formulas vs. measured BMR",},
        {stat:"~1-2%",source:"BMR decline per decade from age 20-60 (primarily from muscle loss",},
        {stat:"6-10 kcal/lb/day",source:"Metabolic rate of skeletal muscle at rest",},
  ],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'BMR Calculator', description: 'Calculate your Basal Metabolic Rate (BMR) — the calories your body burns at complete rest. Uses Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle fo', url: 'https://tooltrio.com/calculators/health/bmr-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'BMR Calculator', description: 'Calculate your Basal Metabolic Rate (BMR) — the calories your body burns at complete rest. Uses Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle fo', url: 'https://tooltrio.com/calculators/health/bmr-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'BMR Calculator', url: '/calculators/health/bmr-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
