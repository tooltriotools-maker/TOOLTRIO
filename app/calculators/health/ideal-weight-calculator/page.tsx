import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Ideal Weight Calculator — Hamwi, Devine, Robinson & Miller Formulas 2026',
  description: 'Free Ideal Weight Calculator 2026 — Calculate your ideal weight using 5 different medical formulas (Hamwi, Devine, Robinson, Miller, BMI). Real examples for men and women at different heights. No signup.',
  slug: 'ideal-weight-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'ideal weight calculator 2026',
    'free ideal weight calculator',
    'ideal weight calculator usa 2026',
    'weight calculator 2026',
    'healthy weight calculator 2026',
    'weight loss calculator 2026',
    'ideal weight calculator by height and gender',
    'what is my ideal body weight',
    'ideal weight range by height chart',
    'hamwi formula ideal body weight',
    'devine formula ideal weight',
    'how much should I weigh for my height',
    'ideal weight vs healthy bmi weight',
    'ideal weight calculator metric',
    'target weight for my height male female',
    'what weight is healthy for 5 foot 7',
  ],
})

const relatedCalculators = [
  {name:"BMI Calculator",href:"/calculators/health/bmi-calculator",icon:"⚖️",desc:"BMI alongside ideal weight"},
  {name:"Body Fat Calculator",href:"/calculators/health/body-fat-calculator",icon:"💪",desc:"Actual body composition"},
  {name:"Calorie Deficit Calculator",href:"/calculators/health/calorie-deficit-calculator",icon:"📉",desc:"Calories to reach ideal weight"},
  {name:"TDEE Calculator",href:"/calculators/health/tdee-calculator",icon:"⚡",desc:"Maintenance calories at ideal weight"},
  {name:"Target Weight Calculator",href:"/calculators/health/target-weight-calculator",icon:"🎯",desc:"Set and track a weight goal"},
  {name:"Lean Body Mass Calculator",href:"/calculators/health/lean-body-mass-calculator",icon:"💉",desc:"Fat-free mass vs ideal weight"},
  {name:"Body Recomposition Calculator",href:"/calculators/health/body-recomposition-calculator",icon:"🔄",desc:"Body composition goals"},
  {name:"Calorie Calculator",href:"/calculators/health/calorie-calculator",icon:"🍎",desc:"Calories at your ideal weight"}
]

const faqs = [
  {question:'What is the most accurate ideal weight formula?',answer:'No single ideal weight formula is more \'accurate\' than others because they were developed for different clinical purposes — none were designed to predict health outcomes or aesthetic preferences. Hamwi (1964) was developed for insulin dosing in diabetic patients. Devine (1974) was created for drug dosing calculations in clinical medicine. Robinson (1983) and Miller (1983) were developed as refinements of Devine. All produce slightly different results and should be viewed as a range of clinical estimates rather than a definitive target. The most useful frame: your ideal weight is somewhere in the middle of the range these four formulas produce.',},
  {question:'How is ideal weight different from healthy BMI weight?',answer:'Healthy BMI weight refers to the range of weights that produce a BMI between 18.5 and 24.9 for a given height — a range of 20-30 lbs for most adults. Ideal weight formulas produce a single number rather than a range, and often produce values near the middle of the BMI-healthy-weight range. The practical difference: BMI-healthy weight is a range (more permissive), ideal weight is a point estimate (more prescriptive). Neither accounts for muscle mass — a muscular athlete who weighs above their calculated ideal weight may have a healthier body composition than someone exactly at their ideal weight.',},
  {question:'Should I aim to reach the \'ideal\' weight from these formulas?',answer:'These formulas produce mathematical approximations — not personalized health targets. Many active adults have excellent health at weights 10-20% above their calculated ideal weight because of muscle mass. The question is not whether you match a formula\'s output but whether your current weight is associated with good metabolic health (normal blood pressure, blood glucose, cholesterol, and waist circumference). Work with your doctor to set a personalized weight goal based on your complete health picture rather than targeting a formula\'s output.',},
  {question:'Why do the four formulas give different results?',answer:'Each formula uses a slightly different base weight and per-inch increment above 5 feet. Hamwi: men 106 lbs + 6 lbs per inch above 5 ft; women 100 lbs + 5 lbs per inch above 5 ft. Devine: men 50 kg + 2.3 kg per inch above 5 ft; women 45.5 kg + 2.3 kg per inch above 5 ft. Robinson and Miller are similar refinements. The differences in base weights and increment sizes were chosen to align with the clinical population each formula was designed to treat. For a 5\'10" male, results range from approximately 159-178 lbs — a 19-pound spread that illustrates why using the range, not a single number, is most meaningful.',},
  {question:'What if I am significantly shorter or taller than average?',answer:'Ideal weight formulas are linear — they scale weight proportionally with height — but the relationship between height and healthy body composition is not perfectly linear at extremes. Very tall individuals (above 6\'4") often find these formulas underestimate healthy weight because torso length does not scale proportionally with leg length, and muscle mass in larger frames requires more weight. Very short individuals (below 5\'0") may find formulas slightly overestimate healthy weight. For anyone outside the 5\'0" to 6\'4" range, using the BMI-healthy-weight range as a target may be more appropriate than ideal weight formulas.',},
  {question:'Can I use ideal weight to calculate how many calories I need at my goal weight?',answer:'Yes — this is one of the most practical applications of ideal weight calculations. Entering your goal weight (rather than current weight) into a TDEE calculator shows how many calories you would burn per day at your goal weight. This reveals the maintenance calorie level you are working toward — and importantly, shows that your TDEE decreases as you lose weight, which is why calorie targets must be recalculated periodically during a weight loss journey rather than remaining static.',},
  {question:'How much weight is safe to lose per week without losing muscle?',answer:'Safe fat loss rates without meaningful muscle loss are approximately 0.5-1% of body weight per week for most people. For a 180 lb person this is 0.9-1.8 lbs/week. Rates faster than this — especially above 2 lbs/week — progressively increase the proportion of weight lost from muscle tissue rather than fat, particularly without aggressive protein intake and resistance training. Total weekly deficit determines weekly fat loss: each pound of fat requires roughly a 3,500 calorie weekly deficit, though the precise conversion varies based on metabolic adaptation.',},
  {question:'Is ideal weight the same for men and women of the same height?',answer:'No — ideal weight formulas give women a lower target than men at every height. For example, the Hamwi formula gives a 5\'7" man 169 lbs and a 5\'7" woman 135 lbs — a 34-pound difference. This reflects average differences in bone density, muscle mass, and fat distribution between the sexes. Women naturally carry a higher percentage of essential fat than men (10-13% vs 2-5%) and have lower average bone density and muscle mass relative to height, justifying the lower weight targets in formulas.',},
]

const seoContent = {
  title: 'Ideal Weight Calculator',
  category: 'health' as const,
  intro: `Ideal weight is one of the most searched health numbers yet one of the most misunderstood. Every formula that produces an 'ideal' number is a clinical approximation designed for a specific purpose — often drug dosing or clinical triage — not a personal health prescription. Understanding this context transforms how you use the result: as one data point in a wider picture rather than an absolute target.

This calculator runs all four major clinical ideal weight formulas simultaneously — Hamwi, Devine, Robinson, and Miller — and shows you the range they produce. For most adults, the spread is 5-20 pounds. Your healthiest target weight is likely somewhere in this range, modified upward if you carry significant muscle mass and potentially modified by your doctor based on your individual health markers.

The most practically useful output of this calculator is using your ideal weight as a TDEE input to understand your goal-state calorie needs — a key step in setting a realistic and appropriate calorie deficit for a weight loss journey.

Combine this with [our Body Fat Calculator](/calculators/health/body-fat-calculator) for a body composition perspective and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator) to plan your path from current to ideal weight.

**Long-tail searches answered here:** ideal weight calculator free online usa by height, healthy weight range for my height calculator, what should i weigh for my height and age calculator free, ideal body weight calculator bmi based free online, target weight calculator by height and gender usa, how much should a 5 foot 6 woman weigh calculator, ideal weight for 6 foot male calculator free usa, healthy weight for 5 foot 4 female calculator free, am i at my ideal weight calculator by height free, ideal weight ranges for different body frames free, petite frame vs large frame ideal weight calculator usa, ideal weight for teenage girls calculator by height free, how much should a 175 cm man weigh calculator free, healthy weight range not just bmi calculator free usa, insurance ideal weight vs medical ideal weight calculator`,
  howItWorks: `Four formulas run in parallel. Hamwi uses 106 lbs for men (100 for women) as the base for 5 feet, adding 6 lbs/inch (women: 5 lbs/inch) above 5 feet, with a ±10% adjustment range for frame size. Devine uses 50 kg (men) or 45.5 kg (women) as the 5-foot base, adding 2.3 kg per inch above 5 feet. Robinson uses 52 kg (men) or 49 kg (women) as base with 1.9 kg (men) or 1.7 kg (women) per inch. Miller uses 56.2 kg (men) or 53.1 kg (women) as base with 1.41 kg per inch above 5 feet for both sexes.

All four formulas were originally derived from observations of body weight versus height distributions in clinical patient populations in the mid-20th century — not from health outcome studies. This is why none should be used as a rigid health target without professional context.`,
  benefits: [
        {title:"Four formulas simultaneously",text:"See Hamwi, Devine, Robinson, and Miller results side by side, with the range they produce highlighted. The spread of results illustrates the inherent uncertainty in any single ideal weight estimate.",},
        {title:"Frame size adjustment",text:"Hamwi's ±10% adjustment for small, medium, and large body frames is included — recognizing that skeletal frame size legitimately shifts ideal weight within the formula's output.",},
        {title:"BMI healthy weight comparison",text:"Your ideal weight from formulas is shown alongside the BMI 18.5-24.9 healthy weight range for your height — allowing direct comparison of formula-based and BMI-based targets.",},
        {title:"Calories at goal weight",text:"Enter your ideal weight to see estimated TDEE at that weight — giving you the maintenance calorie level you are working toward and how it differs from your current maintenance.",},
        {title:"Progress visualization",text:"Shows the weight difference from current to ideal weight and estimated time to reach it at safe weight loss rates (0.5-1 lb/week) — making the journey feel concrete and achievable.",},
        {title:"Muscle mass context",text:"Includes an explanation of why muscular individuals legitimately exceed formula-based ideal weights without any health concern — preventing inappropriate targets for athletes.",},
  ],
  useCases: [
        {title:"Setting a weight loss goal",text:"Use the range from all four formulas to identify a realistic goal weight within the range — not at the absolute minimum of any single formula — that accounts for your body frame and muscle mass.",},
        {title:"Calculating a calorie deficit duration",text:"Knowing how many pounds separate your current and ideal weight, combined with a safe loss rate of 0.5-1 lb/week, gives you a realistic program duration — setting expectations that prevent premature discouragement.",},
        {title:"Discussing weight goals with a healthcare provider",text:"Bringing specific calculated ideal weight estimates to a doctor's appointment gives a concrete starting point for discussing personalized weight goals rather than having a vague conversation about 'losing some weight.'",},
        {title:"Understanding weight gain context",text:"A person who gained 20 lbs after a sedentary period can use ideal weight formulas to contextualize whether their current weight represents a minor deviation or significant health concern.",},
  ],
  tipsSection: `Use the range from all four formulas rather than fixating on any single number. If Hamwi gives 165 lbs and Miller gives 178 lbs for the same person, the realistic target is somewhere in that 13-pound range depending on body composition and frame.

Adjust upward if you are significantly more muscular than average. The Devine formula assumes average muscle mass — a person who strength trains consistently may have 10-20 lbs more lean mass than the formula assumed, making a weight 10-20 lbs above the formula entirely appropriate.

Focus on body composition trends (body fat percentage, waist circumference) rather than scale weight alone during a weight loss journey. It is entirely possible to reach or exceed your ideal weight while having an unhealthy body composition, or to weigh above your ideal weight while having excellent metabolic health.`,
  scienceSection: `Ideal weight formulas originated in the 1960s-1980s in pharmacology and clinical medicine — environments where quick, repeatable body weight estimates were needed for drug dosing and fluid management. Hamwi's formula (1964) was published in Diabetes journal for calculating caloric needs in diabetic patients. Devine's formula (1974) appeared in a clinical pharmacology paper on loading doses. Neither formula was based on statistical analysis of what weight produces optimal health outcomes.

Subsequent research has found that these formulas generally align with weights in the mid-range of BMI 18.5-24.9 for most heights, which is why they remain clinically useful despite their historical origins. However they were never validated against mortality or morbidity data, which means they should not be interpreted as 'the weight at which you will be healthiest' — only as approximations with historical clinical precedent.`,
  conclusion: `Your ideal weight is a useful reference point, not a biological destiny. The more meaningful targets are your cardiometabolic health markers — blood pressure, blood glucose, waist circumference, and lipid profile — all of which improve meaningfully with even 5-10% body weight reduction in overweight individuals, long before reaching a formula-calculated ideal.

Use the calculated range to set a realistic, achievable goal weight that represents meaningful health improvement for your individual starting point. Then use [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator) and [our TDEE Calculator](/calculators/health/tdee-calculator) to build the nutritional plan to get there.`,
  comparisonTable: [        {label:"Hamwi (men)",value:"106 lbs + 6 lbs/inch >5ft",note:"Originally for insulin dosing in diabetics",},
        {label:"Hamwi (women)",value:"100 lbs + 5 lbs/inch >5ft",note:"Same origin, adjusted for sex differences",},
        {label:"Devine (men)",value:"50 kg + 2.3 kg/inch >5ft",note:"Published for pharmacokinetic drug dosing",},
        {label:"Devine (women)",value:"45.5 kg + 2.3 kg/inch >5ft",note:"Most widely used formula in clinical practice",},
        {label:"Robinson (men)",value:"52 kg + 1.9 kg/inch >5ft",note:"Refinement of Devine, 1983",},
        {label:"Miller (men)",value:"56.2 kg + 1.41 kg/inch >5ft",note:"Produces highest estimates of the four formulas",},
        {label:"Frame size adjustment",value:"±10% of Hamwi result",note:"For small and large skeletal frames",},
        {label:"Athlete adjustment",value:"+10-20 lbs",note:"Appropriate for significant additional muscle mass",},],
  didYouKnow: [        'The concept of \'ideal weight\' has a problematic history — early 20th century height-weight tables from Metropolitan Life Insurance were based on actuarial data from life insurance policyholders, a non-representative population that excluded many demographics.',
        'Research shows that the relationship between weight and mortality is U-shaped — both very low and very high BMI are associated with increased mortality, with the nadir (lowest mortality) often observed at BMI 22-24 for younger adults but potentially at BMI 25-27 for adults over 65.',],
  keyStats: [        {stat:"5-20 lbs",source:"Typical spread between four ideal weight formulas at same height",},
        {stat:"5-10%",source:"Minimum weight loss needed for meaningful metabolic health improvement in obese adults",},
        {stat:"0.5-1 lb/week",source:"Safe fat loss rate preserving muscle mass",},
        {stat:"Mid-range of BMI 18.5-24.9",source:"Where ideal weight formulas generally align",},],
  mistakesDetailed: [],
}

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Ideal Weight Calculator', description: 'Calculate your ideal body weight using four major clinical formulas: Hamwi, Devine, Robinson, and Miller. See the range of ideal weight estimates for ', url: 'https://tooltrio.com/calculators/health/ideal-weight-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Ideal Weight Calculator', description: 'Calculate your ideal body weight using four major clinical formulas: Hamwi, Devine, Robinson, and Miller. See the range of ideal weight estimates for ', url: 'https://tooltrio.com/calculators/health/ideal-weight-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Ideal Weight Calculator', url: '/calculators/health/ideal-weight-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
