import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Calorie Calculator — TDEE & Daily Calories for Weight Loss, Gain, or Maintenance 2026',
  description: 'Free Calorie Calculator 2026 — Find your daily calorie needs using the Mifflin-St Jeor equation. TDEE, weight loss, and muscle gain targets. Real examples for men and women of all ages. No signup.',
  slug: 'calorie-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'calorie calculator 2026',
    'free calorie calculator',
    'calorie calculator usa 2026',
    'calorie calculator 2026',
    'daily calorie calculator 2026',
    'calorie needs calculator usa 2026',
    'how many calories should I eat a day to lose weight',
    'calorie calculator for weight loss by age',
    'daily calorie intake calculator male 30 years old',
    'how many calories to eat at maintenance',
    'mifflin st jeor calorie calculator',
    'calorie calculator for sedentary office worker',
    'how many calories for 1 pound per week loss',
    'calorie needs for breastfeeding mother',
    'calorie calculator metric kg cm',
    'best way to calculate daily calories',
  ],
})

const relatedCalculators = [
    {"name":"TDEE Calculator","href":"/calculators/health/tdee-calculator","icon":"⚡","desc":"Total daily energy expenditure breakdown"},
    {"name":"BMR Calculator","href":"/calculators/health/bmr-calculator","icon":"❤️","desc":"Basal metabolic rate at complete rest"},
    {"name":"Macro Calculator","href":"/calculators/health/macro-calculator","icon":"🥗","desc":"Protein, carb, fat targets by goal"},
    {"name":"Calorie Deficit Calculator","href":"/calculators/health/calorie-deficit-calculator","icon":"📉","desc":"Safe deficit for your weight loss goal"},
    {"name":"BMI Calculator","href":"/calculators/health/bmi-calculator","icon":"⚖️","desc":"Check if your weight is in healthy range"},
    {"name":"Protein Intake Calculator","href":"/calculators/health/protein-intake-calculator","icon":"💪","desc":"Daily protein targets for muscle preservation"},
    {"name":"Fat Loss Rate Calculator","href":"/calculators/health/fat-loss-rate-calculator","icon":"🔥","desc":"Realistic timeline for your fat loss goal"},
    {"name":"Keto Macro Calculator","href":"/calculators/health/keto-macro-calculator","icon":"🥑","desc":"Macros for ketogenic diet approach"}
]

const faqs = [
  { question: 'What is the most accurate formula for calculating daily calorie needs?', answer: 'The Mifflin-St Jeor equation is currently considered the most accurate for estimating resting metabolic rate in non-athletic adults, outperforming the older Harris-Benedict equation in multiple validation studies. Published in the American Journal of Clinical Nutrition in 1990, it calculates BMR as (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5 for men or − 161 for women. This BMR is then multiplied by an activity factor (1.2 for sedentary up to 1.9 for extremely active) to get TDEE. For lean, athletic individuals the Katch-McArdle formula using lean body mass is more accurate, but it requires knowing body fat percentage.' },
  { question: 'How accurate are calorie calculator estimates compared to actual needs?', answer: 'Population-formula TDEE calculators are accurate within approximately 10-15% for most non-athletic adults. That means if a calculator says 2,100 calories, your actual maintenance calories are likely somewhere between 1,785 and 2,415. Activity multipliers are the biggest source of error because people systematically overestimate how active they are. Studies show most adults\' true activity level is \'sedentary\' or \'lightly active\' even when they think they are moderately active. The best practice is to use the calculator as a starting point, eat at that level for 2 weeks, and adjust based on actual weight change.' },
  { question: 'What calorie deficit is safe for weight loss without losing muscle?', answer: 'A 500-calorie daily deficit below TDEE typically produces roughly 0.5 kg (1 lb) of weight loss per week, though actual fat loss depends on how much of the deficit comes from reducing dietary fat versus carbohydrates and on protein intake. Research consistently shows that keeping protein intake at 1.6-2.2 grams per kilogram of body weight during a caloric deficit significantly reduces muscle loss. Deficits larger than 25% of TDEE — especially combined with low protein intake — risk meaningful muscle loss and metabolic adaptation that can impair long-term weight management.' },
  { question: 'Why am I not losing weight eating at a calorie deficit?', answer: 'Several mechanisms can stall weight loss despite a genuine calorie deficit. First, metabolic adaptation — after several weeks in a deficit, your BMR can decrease by 5-15% as your body down-regulates thyroid hormones, sympathetic nervous system activity, and non-exercise activity thermogenesis (NEAT). Second, water retention from higher cortisol during dieting can mask fat loss on the scale for weeks at a time. Third, most people underestimate calories eaten by 20-30% in self-reported food logs (a finding consistently replicated in metabolic ward research). Fourth, muscle gain from starting a new exercise program can offset fat loss on the scale even while body composition improves.' },
  { question: 'How many calories do I need per day if I work a desk job?', answer: 'A sedentary office worker who does minimal physical activity outside of work typically falls in the 1.2-1.375 activity multiplier range. For an average 35-year-old male at 5\'10\" and 180 lbs, that works out to roughly 2,150-2,350 calories for weight maintenance. For a similar 35-year-old female at 5\'5\" and 140 lbs, maintenance is approximately 1,700-1,850 calories. These are ballpark estimates — individual metabolism varies meaningfully. Adding even 30 minutes of brisk walking daily bumps the activity multiplier to 1.375-1.55 and increases TDEE by 200-350 calories.' },
  { question: 'Should my calorie target change on rest days versus workout days?', answer: 'Yes, technically your calorie needs are slightly lower on rest days because you burn fewer calories from exercise. However most fitness professionals recommend one of two approaches: either eat the same moderate deficit every day (simpler, sustainable, and small daily differences average out over a week) or use a more structured approach with higher calories on training days and lower calories on rest days. The second approach can theoretically preserve muscle better during aggressive cuts, but for most people the added complexity isn\'t worth the marginal benefit. If you\'re eating 200-400 calories more on training days that\'s roughly the difference in activity expenditure, making it nutritionally sound.' },
  { question: 'How does age affect daily calorie needs?', answer: 'Calorie needs decrease with age primarily because of two factors: declining muscle mass (which is metabolically active tissue) and reductions in spontaneous physical activity. Research shows BMR decreases roughly 2-3% per decade after age 20, primarily from loss of lean mass. Between ages 20 and 70, average TDEE can decrease by 300-500 calories for both men and women, even if body weight stays constant. This is why many adults gain weight in middle age eating the same diet they ate in their 20s — the same calorie intake that maintained weight at 25 becomes a surplus at 45.' },
  { question: 'How many calories are needed to gain muscle without excess fat?', answer: 'Building muscle (lean bulking) typically requires a modest calorie surplus of 200-300 calories above maintenance — enough to support muscle protein synthesis without excessive fat accumulation. Drug-free beginners can gain 0.5-1 kg of lean mass per month; intermediate lifters typically gain 0.25-0.5 kg per month. Eating 500+ calories above maintenance in hopes of faster muscle gain mainly adds fat, since muscle synthesis rates are physiologically capped. Tracking both scale weight and body fat percentage (via skinfolds or smart scale) helps confirm that weight gained is predominantly lean mass rather than fat.' },
]

export default function Page() {
  return (
    <CalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'Calorie Calculator', description: 'Find your daily calorie needs using the Mifflin-St Jeor equation. Enter age, weight, height, and activity level to get TDEE plus calorie targets for fat loss, m', url: 'https://tooltrio.com/calculators/health/calorie-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Calorie Calculator', description: 'Find your daily calorie needs using the Mifflin-St Jeor equation. Enter age, weight, height, and activity level to get TDEE plus calorie targets for fat loss, m', url: 'https://tooltrio.com/calculators/health/calorie-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Calorie Calculator', url: '/calculators/health/calorie-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={{
        title: 'Calorie Calculator 2026',
        category: 'health',
        intro: `How many calories do you actually need each day? It is one of the most common and most misunderstood questions in nutrition. The simple answer is: it depends on your metabolism, your body size, and how much you move — and this calculator figures all three out from your age, weight, height, and activity level in seconds.

Your Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in 24 hours including both your resting metabolism and all physical activity. It is the number you need to know whether you are trying to lose weight, maintain weight, or build muscle. Eating below TDEE produces weight loss; eating above it produces weight gain; eating at it keeps your weight stable. The only question is what your personal TDEE actually is — and that is exactly what this calculator determines.

This tool uses the Mifflin-St Jeor equation — validated in multiple head-to-head studies against measured TDEE and consistently shown to outperform the older Harris-Benedict equation for adults who are not extremely lean or athletic. For athletic individuals with known body fat percentage, our [TDEE Calculator](/calculators/health/tdee-calculator) also offers the Katch-McArdle formula which can be more precise.

Combine your TDEE result with [our Macro Calculator](/calculators/health/macro-calculator) to set protein, carbohydrate, and fat targets that match your goal and food preferences.

**Long-tail searches answered here:** free calorie calculator for weight loss usa 2026, how many calories should i eat a day calculator, calorie calculator by age weight height activity free, weight loss calorie calculator female 40 years old, daily calorie needs calculator no signup no account, how many calories to lose 1 pound per week calculator, calorie calculator for 5 foot 4 woman to lose weight, how many calories does a 200 pound man need daily, calorie needs calculator for sedentary office worker free, calorie calculator for nursing mothers usa free online, how many calories per day for a teenage girl calculator, calorie intake calculator to maintain current weight free, low calorie intake minimum safe level calculator usa, calorie calculator for gaining weight and muscle free, net calories vs gross calories calculator explained free`,
        howItWorks: `The Mifflin-St Jeor BMR formula calculates how many calories your body burns at complete rest to maintain essential functions — breathing, circulation, cellular repair, and temperature regulation. For men: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5. For women: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161.

This BMR is then multiplied by an activity factor that accounts for calories burned through physical activity and the thermic effect of food (the energy cost of digesting what you eat). Sedentary individuals use a multiplier of 1.2, lightly active (1-3 days/week exercise) use 1.375, moderately active (3-5 days/week) use 1.55, very active (6-7 days/week hard training) use 1.725, and extremely active (physical job plus daily training) use 1.9.

The resulting number is your estimated TDEE — the maintenance calories you need to hold your current weight steady. From there, the calculator shows adjusted targets for common goals: subtract 500 cal/day for roughly 1 lb/week fat loss, subtract 250 cal/day for slower sustainable loss with better muscle retention, or add 200-300 cal/day for lean muscle building.`,
        benefits: [
          { title: "Science-backed calorie targets", text: "This calculator uses Mifflin-St Jeor — the formula recommended by the Academy of Nutrition and Dietetics as the most accurate for non-athletic adults. You get a reliable starting point for any diet plan, not a guess or a generic chart recommendation." },
          { title: "Goal-specific calorie adjustments", text: "Instantly see calorie targets for fat loss (moderate and aggressive), maintenance, and lean muscle gain. Each target is derived from your personal TDEE rather than generic population averages, making them relevant to your actual metabolism." },
          { title: "Macro breakdown included", text: "Along with total calories, the calculator estimates protein, carbohydrate, and fat targets at each calorie level using scientifically supported macronutrient ratios — making it easy to translate your calorie goal into an actual meal plan." },
          { title: "Activity level transparency", text: "Unlike some apps that hide their formulas, this calculator shows the exact activity multiplier applied so you can understand how different your TDEE is between sedentary and active lifestyles — which is often a 400-600 calorie difference for the same person." },
          { title: "Safe range guidance", text: "The calculator flags if your target calorie intake falls below the minimum safe threshold (generally 1,200 for women and 1,500 for men) where nutrient deficiencies and metabolic adaptation become significant risks without medical supervision." },
          { title: "Both US and metric units", text: "Enter weight in pounds or kilograms, height in feet/inches or centimeters. The formula handles unit conversion automatically so you always get the correct result regardless of which system you prefer." },
        ],
        useCases: [
          { title: "Starting a structured diet plan", text: "Use your TDEE to set a specific daily calorie target before downloading a meal planning app or hiring a nutritionist. Starting with an evidence-based number rather than a generic 1,500 calorie guideline dramatically improves adherence and results." },
          { title: "Breaking a weight loss plateau", text: "If weight loss has stalled after 4-6 weeks, recalculate your TDEE at your current (lower) weight and re-examine whether your actual food intake matches your target. Many plateaus occur because the same calorie target that created a deficit 20 lbs ago is now maintenance at the new weight." },
          { title: "Reverse dieting after a cut", text: "After completing a fat loss phase, calculate maintenance calories at your new weight and gradually increase food intake by 50-100 cal/week over several weeks to allow metabolism to readjust before moving to a bulking phase — a strategy called reverse dieting." },
          { title: "Preparing for athletic competition", text: "Endurance athletes, CrossFit competitors, and team sport athletes use TDEE calculations to ensure adequate fueling during peak training blocks, preventing the performance and hormonal consequences of prolonged energy deficiency (RED-S)." },
        ],
        tipsSection: `Weigh yourself daily for 1-2 weeks and average the results before trusting a single weigh-in as your baseline. Body weight fluctuates by 2-5 lbs throughout the day and week based on water retention, glycogen stores, digestive contents, and hormonal cycle (for women). A weekly average is far more meaningful than any individual measurement.

Be honest about your activity level — most people overestimate. If you sit at a desk most of the day and do 3-4 hours of moderate gym work per week, you are 'lightly active' (1.375), not 'moderately active'. The difference is 150-250 calories per day, which compounds to roughly 10-20 lbs per year of weight change.

Use the two-week test: eat at your calculated TDEE for two full weeks while accurately tracking food intake (using a food scale, not estimating portions). If weight stays stable, your TDEE estimate is accurate. If you gain 1+ lb, reduce by 100 calories. If you lose 1+ lb, increase by 100 calories. This calibration step transforms a population estimate into a personal measurement.`,
        scienceSection: `The Mifflin-St Jeor equation was validated against indirect calorimetry — the gold standard method for measuring actual metabolic rate — in a study of 498 healthy adults published in the American Journal of Clinical Nutrition. It was found to predict resting metabolic rate within 10% in 82% of subjects, outperforming Harris-Benedict (59% accuracy) and WHO equations.

The activity multipliers originate from doubly labeled water (DLW) studies — a method using heavy water isotopes to measure total energy expenditure over 1-2 weeks with high precision. DLW research established that average TDEE/BMR ratios (physical activity levels) are approximately 1.4 for sedentary adults, 1.6 for moderate activity, and 1.8+ for highly active individuals.

It is important to note that metabolic adaptation during caloric restriction can reduce TDEE by more than just the calculated reduction from weight loss. A landmark study by Leibel et al. found that metabolic rate fell by 15% more than expected after 10% body weight loss — an adaptation that persists long term and helps explain why maintaining weight loss is harder than achieving it.`,
        conclusion: `Your TDEE from this calculator is your personal nutrition foundation number — the starting point that makes every diet plan, meal prep strategy, and fitness goal meaningful. Without knowing your maintenance calories, you are essentially navigating nutrition by feel, which research consistently shows leads to systematic underestimation of food intake and overestimation of activity.

Use this number. Track against it for two weeks. Refine it based on what the scale actually tells you. Then use that refined TDEE to set a sustainable calorie target that creates the results you want without the metabolic and psychological downsides of extreme restriction.

For the most complete nutrition picture, combine this result with [our Macro Calculator](/calculators/health/macro-calculator), [our Protein Intake Calculator](/calculators/health/protein-intake-calculator), and [our Calorie Deficit Calculator](/calculators/health/calorie-deficit-calculator).`,
        comparisonTable: [
          { label: "Sedentary (desk job, minimal exercise)", value: "BMR × 1.20", note: "Most office workers fall here even with occasional walks" },
          { label: "Lightly Active (1-3 days/week light exercise)", value: "BMR × 1.375", note: "30-min walks 3x/week qualifies; gym 2x/week also here" },
          { label: "Moderately Active (3-5 days/week moderate exercise)", value: "BMR × 1.550", note: "Gym 4x/week at moderate intensity" },
          { label: "Very Active (hard exercise 6-7 days/week)", value: "BMR × 1.725", note: "Daily intense training, competitive athlete training" },
          { label: "Extremely Active (physical job + daily training)", value: "BMR × 1.900", note: "Construction worker who also trains; endurance athletes" },
          { label: "Weight loss target", value: "TDEE − 500 kcal", note: "~0.5 kg/wk fat loss; sustainable for most adults" },
          { label: "Conservative cut", value: "TDEE − 250 kcal", note: "Slower loss with better muscle retention" },
          { label: "Lean bulk", value: "TDEE + 200–300 kcal", note: "Minimizes fat gain while supporting muscle growth" },
        ],
        didYouKnow: [
          'Thermic effect of food (TEF) — the energy cost of digesting and absorbing nutrients — accounts for approximately 10% of TDEE. Protein has the highest TEF (20-30%) followed by carbohydrates (5-10%) and fat (0-3%), which is one reason high-protein diets support weight management beyond just the satiety effect.',
          'Research from the National Weight Control Registry, which tracks over 10,000 Americans who lost 30+ lbs and kept it off for 1+ year, found that 78% eat breakfast daily, 75% weigh themselves at least weekly, and 90% do about 1 hour of moderate physical activity per day.',
          'A 2021 study in Cell Metabolism found that restricting eating to a 10-hour window (time-restricted eating) reduced calorie intake by approximately 214 calories per day without counting calories — primarily by eliminating late-night eating.',
          'The record for longest scientifically monitored fast is 382 days — an obese Scottish man who consumed only vitamins and electrolytes under medical supervision. His TDEE adapted dramatically downward during this period, illustrating how powerfully the body defends against caloric restriction.',
        ],
        keyStats: [
          { stat: "Mifflin-St Jeor", source: "Most accurate BMR formula for adults — outperforms Harris-Benedict in 82% of subjects" },
          { stat: "~10%", source: "Underestimation error in typical self-reported food diaries (metabolic ward research)" },
          { stat: "5-15%", source: "Metabolic adaptation decrease in TDEE after sustained caloric deficit" },
          { stat: "1.6–2.2 g/kg", source: "Daily protein intake that prevents muscle loss during caloric restriction (ISSN)" },
        ],
        mistakesDetailed: [

        ],
      }}
    />
  )
}
