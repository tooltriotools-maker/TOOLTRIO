import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import BMICalculatorClient from './BMICalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BMI Calculator — Body Mass Index for Adults (CDC & NIH Standards) 2026',
  description: 'Free BMI Calculator 2026 — Calculate your Body Mass Index using CDC & NIH standards. Instant results for adults with healthy weight range, category classification, and real examples. No signup required.',
  slug: 'bmi-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'bmi calculator 2026',
    'free bmi calculator',
    'bmi calculator usa 2026',
    'bmi calculator 2026',
    'bmi calculator usa 2026',
    'body mass index calculator 2026',
    'bmi calculator pounds and inches',
    'bmi calculator for adults over 40',
    'what is a healthy bmi for a 5 foot 7 male',
    'bmi chart for women by age and height',
    'bmi 27 overweight or normal',
    'how to lower bmi naturally',
    'bmi calculator no app no signup',
    'bmi and visceral fat relationship',
    'bmi cutoffs for Asian Americans',
    'does bmi account for muscle mass',
  ],
})

const relatedCalculators = [
    {"name":"Body Fat Calculator","href":"/calculators/health/body-fat-calculator","icon":"💪","desc":"More precise than BMI for body composition"},
    {"name":"Ideal Weight Calculator","href":"/calculators/health/ideal-weight-calculator","icon":"⚖️","desc":"Multiple formula ideal weight comparison"},
    {"name":"TDEE Calculator","href":"/calculators/health/tdee-calculator","icon":"🔥","desc":"Daily calorie needs based on your stats"},
    {"name":"Calorie Calculator","href":"/calculators/health/calorie-calculator","icon":"🍎","desc":"Calories for weight loss or gain"},
    {"name":"Waist-to-Height Ratio","href":"/calculators/health/waist-to-height-ratio-calculator","icon":"📏","desc":"Better cardiometabolic risk predictor"},
    {"name":"BMR Calculator","href":"/calculators/health/bmr-calculator","icon":"❤️","desc":"Resting metabolic rate at complete rest"},
    {"name":"Body Recomposition Calculator","href":"/calculators/health/body-recomposition-calculator","icon":"🏋️","desc":"Lose fat and gain muscle simultaneously"},
    {"name":"Lean Body Mass Calculator","href":"/calculators/health/lean-body-mass-calculator","icon":"💉","desc":"Your muscle + bone + organ mass"}
]

const faqs = [
  { question: 'What BMI is considered healthy for adults?', answer: 'The CDC and WHO define the healthy adult BMI range as 18.5 to 24.9. Underweight is below 18.5, overweight is 25.0 to 29.9, Obese Class I is 30.0 to 34.9, Class II is 35.0 to 39.9, and Class III (severe obesity) is 40 or above. However these cutoffs were established from predominantly White European populations. For adults of Asian descent the American Diabetes Association and NIH recommend a lower overweight threshold of BMI 23 and obese threshold of BMI 27.5 due to higher metabolic risk at lower BMI values.' },
  { question: 'Why is BMI considered inaccurate for muscular people?', answer: 'BMI only uses height and weight — it cannot distinguish between lean muscle mass and fat mass. A 6-foot male bodybuilder weighing 220 lbs (100 kg) would have a BMI of 29.8 which technically places him in the overweight category despite having under 8% body fat. Conversely, a sedentary person with the same height and weight but 30% body fat would have identical BMI. For anyone who strength trains seriously, body fat percentage measured via DEXA scan or hydrostatic weighing gives a far more meaningful health picture than BMI alone.' },
  { question: 'Does BMI predict cardiovascular disease risk?', answer: 'BMI does correlate with cardiovascular disease risk at the population level — studies consistently show that people with BMI above 30 have roughly twice the risk of heart disease compared to those in the normal range. However the relationship is not linear and BMI combined with waist circumference predicts risk significantly better than either metric alone. A 2016 meta-analysis in the Annals of Internal Medicine found that metabolically healthy obese individuals (high BMI but normal blood pressure, blood sugar, and cholesterol) had similar long-term cardiovascular outcomes to normal-weight metabolically healthy individuals.' },
  { question: 'What is the difference between BMI and body fat percentage?', answer: 'BMI is a proxy — a quick estimate of weight relative to height. Body fat percentage is the actual proportion of your total mass that is adipose (fat) tissue. Healthy body fat ranges are roughly 10-20% for men and 18-28% for women depending on age. You can have normal BMI with high body fat (called \'normal weight obesity\' or being \'skinny fat\') or elevated BMI with low body fat (muscular athletes). For tracking fitness progress, body fat percentage is almost always more informative than BMI.' },
  { question: 'How often should I recalculate my BMI?', answer: 'For most adults tracking weight management, recalculating BMI monthly gives a meaningful trend without the noise of daily fluctuations. Weight normally fluctuates 2-4 pounds (1-2 kg) throughout the day depending on hydration, food, and digestive contents. Morning measurements before eating, after using the bathroom, and in minimal clothing give the most consistent readings. If you are actively working to change your weight, monthly BMI tracking paired with monthly waist circumference measurements provides a more complete picture of progress.' },
  { question: 'Does BMI change as you age?', answer: 'BMI itself is calculated the same way regardless of age for adults, but interpretation does shift slightly. Research suggests that adults over 65 may actually have better longevity outcomes at slightly higher BMIs (25-27) compared to normal weight — a phenomenon called the \'obesity paradox\' in older adults, possibly due to metabolic reserves during illness. Conversely the same BMI at age 35 and age 55 represents very different health risks because body composition tends to shift toward more fat and less muscle with age, even when weight stays constant. This age-related fat gain is called \'sarcopenic obesity.\'' },
  { question: 'Can BMI be used for children and teenagers?', answer: 'No — standard adult BMI cutoffs (18.5, 25, 30) absolutely do NOT apply to children and adolescents under 20. For ages 2-19, the CDC uses BMI-for-age percentile charts that are sex-specific and account for the normal changes in body composition as children grow and develop. A BMI that would be healthy for a 35-year-old adult is not meaningful for a 10-year-old. Use the dedicated BMI-for-children calculator which applies pediatric growth chart standards.' },
  { question: 'What should I do if my BMI shows I am obese?', answer: 'First, understand that BMI is a screening tool, not a diagnosis. If your BMI is 30 or above, the most important next step is scheduling a physical with your doctor to get a complete cardiometabolic assessment — blood pressure, fasting glucose, HbA1c, lipid panel, and waist circumference. This tells you whether your weight is currently affecting your metabolic health. Most evidence supports that losing just 5-10% of body weight through sustained calorie deficit combined with regular physical activity significantly improves metabolic markers even before reaching a \'normal\' BMI.' },
]

export default function Page() {
  return (
    <BMICalculatorClient
      faqs={faqs}
      structuredData={[
        generateFAQStructuredData(faqs),
        generateWebAppStructuredData({ name: 'BMI Calculator', description: 'Calculate your Body Mass Index instantly using CDC and NIH validated formulas. Supports pounds/inches and kg/cm. See your BMI category, healthy weight range, an', url: 'https://tooltrio.com/calculators/health/bmi-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'BMI Calculator', description: 'Calculate your Body Mass Index instantly using CDC and NIH validated formulas. Supports pounds/inches and kg/cm. See your BMI category, healthy weight range, an', url: 'https://tooltrio.com/calculators/health/bmi-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'BMI Calculator', url: '/calculators/health/bmi-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={{
        title: 'BMI Calculator 2026',
        category: 'health',
        intro: `The BMI Calculator on this page uses the same formula applied by the CDC, NIH, and WHO for population health screening — weight in kilograms divided by height in meters squared. For US customary units it multiplies by 703 to convert pounds and inches to the same result. Despite being invented by Belgian mathematician Adolphe Quetelet in the 1830s, BMI remains the most widely used weight-screening metric in clinical medicine because it requires only a scale and a measuring tape, takes seconds to calculate, and produces a number that meaningfully stratifies disease risk across large populations.

Understanding your BMI is one of the simplest ways to assess whether your current weight falls within a range associated with good health or elevated disease risk. The number alone is not enough — context matters enormously — but it gives you a starting point for a conversation with your doctor and a baseline to track as your health habits evolve.

This tool supports both US imperial (pounds and inches) and metric (kilograms and centimeters) inputs and automatically applies the correct conversion formula. Results include your BMI value, your WHO/CDC category, your healthy weight range at your height, and approximately how much weight change would move you into the next category.

Combine your BMI with [our Body Fat Calculator](/calculators/health/body-fat-calculator) and [our Waist-to-Height Ratio Calculator](/calculators/health/waist-to-height-ratio-calculator) for a comprehensive body composition picture that goes well beyond a single number.

**Long-tail searches answered here:** free bmi calculator usa pounds and inches 2026, bmi calculator for women over 40 free online, bmi calculator for men by age and height usa, am i overweight for my height free bmi tool, what is a healthy bmi for a 5 foot 7 female, bmi calculator no app no signup instant results, bmi chart for adults by age and gender usa free, normal bmi range for 50 year old woman calculator, how to calculate bmi without a scale free online, bmi calculator that uses pounds not kilograms free, healthy bmi for a short woman 5 foot 2 calculator, underweight bmi calculator for teenage girls free, obesity class 1 2 3 bmi calculator free usa, bmi calculation formula explained step by step free, is bmi 27 considered overweight calculator usa`,
        howItWorks: `The BMI formula divides your weight (kg) by your height squared (m²). In US units: BMI = (weight in lbs × 703) ÷ (height in inches²). This dimensionless ratio was chosen because it correlates reasonably well with body fatness across different heights — taller people who weigh proportionally more to their height do not get penalized unfairly.

The calculation takes about two seconds. The challenge is interpretation, which is where most people go wrong. A single BMI value is just a snapshot. To extract meaningful health information you need to know your trend over time, your waist circumference (abdominal fat is more metabolically dangerous than fat stored elsewhere), your muscle mass if you exercise regularly, and your cardiometabolic markers like blood glucose and blood pressure.

This calculator also shows your healthy weight range — the minimum and maximum weight at your height that produces a BMI between 18.5 and 24.9. This is a useful target range for weight management goals, though your doctor may set a different personalized target based on your full health picture.`,
        benefits: [
          { title: "Instant category classification", text: "See immediately whether your BMI falls in Underweight, Normal, Overweight, or Obese (Class I/II/III) categories based on WHO and CDC standards. The color-coded display makes the result immediately clear at a glance." },
          { title: "Healthy weight range for your height", text: "The calculator shows the exact weight range (minimum and maximum) that produces a healthy BMI at your specific height — giving you a concrete weight goal rather than just an abstract number." },
          { title: "How much to gain or lose", text: "Instantly see approximately how many pounds or kilograms you would need to gain or lose to reach the healthy BMI range, with weekly rate guidance based on safe, evidence-based weight change rates." },
          { title: "Asian-American adjusted thresholds", text: "The tool notes when BMI falls in a range where Asian-specific thresholds differ from standard WHO cutoffs, since South and East Asian populations face higher metabolic risk at lower BMI values." },
          { title: "Age context for results", text: "Results include age-specific context — the slight upward shift in optimal BMI for adults over 65 is noted because the relationship between BMI and health risk changes as people age." },
          { title: "No data stored, full privacy", text: "Every calculation runs locally in your browser. No weight, height, or any personal health data is ever transmitted to a server or stored anywhere. Your health data is yours alone." },
        ],
        useCases: [
          { title: "Annual health checkup preparation", text: "Calculate your BMI before your yearly physical so you can discuss it with your doctor in context. Coming prepared with your own calculations shows engagement and leads to more productive conversations about weight management goals." },
          { title: "Weight loss progress tracking", text: "Recalculate monthly during a weight loss effort. Tracking BMI alongside waist circumference gives a more complete picture than scale weight alone, since muscle gain can maintain weight while body fat decreases." },
          { title: "Understanding insurance or workplace wellness program requirements", text: "Many employer wellness programs and some insurance policies use BMI thresholds for screening or incentive programs. Knowing your current BMI helps you understand where you stand and what changes, if any, are medically relevant." },
          { title: "Post-pregnancy weight tracking", text: "BMI calculation helps new mothers track return to pre-pregnancy weight over the months following delivery, with the understanding that slow, gradual return (6-12 months) is healthier than rapid weight loss, especially while breastfeeding." },
        ],
        tipsSection: `Take your measurements under consistent conditions for the most meaningful comparisons over time. Weigh yourself in the morning, after using the bathroom, before eating or drinking, wearing minimal clothing. Use the same scale on the same surface every time — scales can vary by up to 2-3 lbs across different surfaces and environments.

Height should be measured standing straight against a wall without shoes. Many adults have not accurately measured their height since high school; use a door frame or tape measure for a proper reading rather than guessing.

Remember that BMI is a screening tool, not a diagnostic one. Use it as one data point among several. Combine it with waist circumference (measured at the narrowest point of the torso, or at the naval if no natural waist is visible) and body fat percentage if you have access to that measurement. Track trends over 3-6 months rather than reacting to any single measurement.`,
        scienceSection: `BMI was formally adopted by the World Health Organization as an international standard for classifying overweight and obesity in 1995, based on analysis of large epidemiological datasets. The cutoffs of 18.5, 25, and 30 were chosen to align with mortality risk inflection points in population studies — they are not arbitrary but are statistical approximations of where health risk increases significantly for most adults.

The NIH's National Heart, Lung, and Blood Institute (NHLBI) recommends that BMI above 25 triggers assessment of additional cardiovascular risk factors including waist circumference, blood pressure, blood glucose, and lipids — not that BMI alone indicates a health problem.

Limitations of BMI as a metric have been extensively documented in peer-reviewed literature. A landmark 2013 study by Flegal et al. in JAMA found that people with BMI 25-29.9 had lower all-cause mortality than those in the normal BMI range, challenging the assumption that any BMI above 25 is necessarily harmful. This paradox highlights why BMI must always be interpreted alongside other health markers rather than in isolation.`,
        conclusion: `Your BMI is a starting number, not a verdict. Millions of Americans with BMIs above 25 have excellent metabolic health, and some with BMIs in the normal range carry significant hidden health risks. The value of calculating your BMI lies not in the number itself but in what you do with it — whether that's scheduling a health check with your doctor, setting a concrete weight management goal, or simply building the habit of tracking your health metrics over time.

For a complete picture of your body composition and health status, use your BMI result alongside [our Body Fat Calculator](/calculators/health/body-fat-calculator), [our Waist-to-Height Ratio Calculator](/calculators/health/waist-to-height-ratio-calculator), and [our TDEE Calculator](/calculators/health/tdee-calculator) to understand both where you are and what changes you can make to improve your long-term health outcomes.`,
        comparisonTable: [
          { label: "Underweight", value: "BMI < 18.5", note: "May indicate malnutrition, hormonal issues, or eating disorder — consult a doctor" },
          { label: "Normal Weight", value: "BMI 18.5–24.9", note: "Associated with lowest all-cause mortality in most adult populations" },
          { label: "Overweight", value: "BMI 25.0–29.9", note: "Elevated risk of type 2 diabetes, hypertension, and cardiovascular disease" },
          { label: "Obese Class I", value: "BMI 30.0–34.9", note: "High risk — clinical intervention typically recommended" },
          { label: "Obese Class II", value: "BMI 35.0–39.9", note: "Very high risk — weight management program with medical supervision" },
          { label: "Obese Class III", value: "BMI ≥ 40.0", note: "Severe risk — bariatric specialist evaluation appropriate" },
          { label: "Asian-American adjusted overweight", value: "BMI ≥ 23.0", note: "ADA and NIH recommend lower cutoffs for South/East Asian adults" },
          { label: "Optimal range for adults 65+", value: "BMI 25–27", note: "Slightly higher BMI may reduce all-cause mortality in older adults" },
        ],
        didYouKnow: [
          'BMI was designed to describe populations, not individuals — Quetelet himself never intended it to be used as a personal health diagnostic tool.',
          'Research from the Women\'s Health Initiative found that waist circumference predicted cardiovascular events more accurately than BMI in post-menopausal women.',
          'The US military uses BMI as an initial screen but follows up with tape measurements of neck and abdomen (for men) or neck, waist, and hips (for women) to estimate body fat percentage for fitness standards.',
          'A 2021 study in Nature Medicine found that genetic variants explain roughly 20% of BMI variance, meaning two people with identical lifestyles can have meaningfully different BMIs purely due to genetics.',
        ],
        keyStats: [
          { stat: "73.6%", source: "Percent of US adults with BMI ≥ 25 (CDC, 2022)" },
          { stat: "41.9%", source: "Percent of US adults with BMI ≥ 30 (CDC, 2022)" },
          { stat: "BMI 18.5–24.9", source: "Associated with lowest all-cause mortality risk (JAMA, 2013)" },
          { stat: "5–10%", source: "Weight loss needed to significantly improve metabolic markers (NIH)" },
        ],
        mistakesDetailed: [

        ],
      }}
    />
  )
}
