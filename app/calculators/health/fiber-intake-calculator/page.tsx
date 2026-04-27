import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Fiber Intake Calculator — Daily Fiber Needs by Age, Sex & Health Goals 2026',
  description: 'Calculate your optimal daily fiber intake based on age, sex, and health goals including heart health, blood sugar management, and digestive health. Track fiber from food sources and assess whether supplementation is needed. Free online fiber intake calculator 2026. No signup required.',
  slug: 'fiber-intake-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'fiber intake calculator 2026',
    'free fiber intake calculator',
    'fiber intake calculator usa 2026',
    'fiber intake calculator free 2026',
    'daily fiber intake calculator',
    'how much fiber per day',
    'fiber needs by age and sex',
    'soluble vs insoluble fiber calculator',
    'fiber for cholesterol reduction',
    'fiber and blood sugar management',
    'dietary fiber tracker',
    'fiber supplement guide',
    'high fiber foods calculator',
    'fiber intake for weight loss',
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
  {question:'What is the difference between soluble and insoluble fiber, and do I need both?',answer:`Soluble fiber dissolves in water to form a viscous gel in the digestive tract. It slows gastric emptying, reduces the glycemic response to carbohydrates, lowers LDL cholesterol (by binding bile acids), and feeds beneficial gut bacteria. Sources: oats, barley, beans, lentils, apples, psyllium. Insoluble fiber does not dissolve — it adds bulk to stool, speeds intestinal transit time, and reduces constipation risk. Sources: wheat bran, vegetables, nuts, many whole grains. Both types are important and typically coexist in whole plant foods. The target is roughly 25-38 grams of total daily fiber with a mix of both types — most fiber-rich whole foods provide both. Fiber supplements like psyllium provide predominantly soluble fiber; wheat bran supplements provide predominantly insoluble.`},
  {question:'How much fiber does the average American actually eat, and why does it matter?',answer:`Americans average only 15 grams of dietary fiber per day — less than half the recommended 25-38 grams. This is the largest single nutrient gap in the American diet by margin. The consequences: constipation is the most common gastrointestinal complaint in the US, affecting 16% of adults. Cardiovascular disease risk is higher: each 7 grams of additional daily fiber is associated with a 9% reduction in cardiovascular disease risk in large cohort studies. Colon cancer risk is meaningfully elevated by low fiber intake — fiber fermentation produces short-chain fatty acids (butyrate especially) that nourish colonocytes and have anti-tumor properties. Type 2 diabetes risk is substantially higher: soluble fiber blunts postprandial glucose spikes and reduces long-term insulin resistance.`},
  {question:'Can eating too much fiber cause problems?',answer:`Yes — dramatically increasing fiber intake too quickly causes gas, bloating, cramping, and diarrhea in most people. The gut microbiome needs 3-6 weeks to adapt to significantly higher fiber loads by increasing populations of fiber-fermenting bacteria. The practical guidance: increase fiber intake by 3-5 grams per week rather than all at once, and increase water intake simultaneously (fiber draws water into the colon — inadequate hydration with high fiber can paradoxically worsen constipation). Extremely high fiber intake — above 70-80 grams daily — can impair absorption of minerals including iron, zinc, and calcium by binding them in the digestive tract. People with inflammatory bowel disease may need individualized guidance, as high-fiber diets aren't universally appropriate during flares.`},
  {question:'Which foods have the most fiber per serving?',answer:`Highest fiber per serving: legumes are the most fiber-dense food category — a cup of cooked black beans contains 15g of fiber, lentils 16g, chickpeas 12g. Split peas provide 16g per cup. Among vegetables, artichokes (10g per medium artichoke) and peas (9g per cup) stand out. Avocado provides 10g per cup. Raspberries and blackberries deliver 8g per cup — highest of any common fruit. Among grains, bulgur wheat provides 8g per cup cooked; pearled barley 6g; oats 4g per cup. The most efficient fiber-per-calorie source is non-starchy vegetables, though legumes are the most practical high-fiber staple for most people. Ultra-processed foods provide almost no fiber regardless of calorie content — this is the primary reason the American diet is fiber-deficient despite adequate caloric intake.`},
  {question:'Does cooking or processing affect fiber content in foods?',answer:`Cooking generally has modest effects on total fiber content — vegetables lose some fiber when cooked, but not dramatically. However, cooking significantly changes fiber structure and fermentability. Raw vegetables have intact cell walls that resist digestion more than cooked vegetables. Canning vegetables causes some soluble fiber loss into the canning liquid (which can be consumed with the vegetables to recover it). Processing that removes bran — white flour from wheat, white rice from brown rice — removes 60-80% of the fiber. Juicing removes virtually all fiber, leaving only the water and sugars from fruit. Blending retains all fiber from whole fruits and vegetables. For processed grain products, 'whole grain' on the label indicates fiber-containing bran is present, though the fiber content varies significantly between products.`},
  {question:'How does fiber affect gut bacteria and the microbiome?',answer:`Dietary fiber is the primary fuel source for the trillions of bacteria inhabiting your colon. Fiber that reaches the large intestine undigested (prebiotic fiber) is fermented by bacteria, producing short-chain fatty acids (SCFAs) — butyrate, propionate, and acetate — that nourish colon cells, regulate inflammation, maintain gut barrier integrity, and influence metabolism throughout the body. Different fiber types selectively feed different bacterial species: inulin (from chicory, onions, garlic) feeds Bifidobacterium; resistant starch (from cooked-then-cooled potatoes and rice) feeds Akkermansia muciniphila, a species associated with gut barrier health. Dietary fiber diversity feeds microbiome diversity — the most consistent association in microbiome research is that more diverse fiber intake predicts more diverse, health-associated gut microbiomes.`},
  {question:'Why do low-carb and keto diets make it hard to get enough fiber?',answer:`Low-carbohydrate and ketogenic diets restrict many of the best fiber sources: grains, legumes, most fruits, and root vegetables. A person strictly following a keto diet (under 20-30g carbs daily) cannot eat oatmeal, beans, lentils, most fruit, or many high-fiber vegetables. The fiber sources compatible with keto include: leafy greens (spinach, kale, lettuce), broccoli, cauliflower, avocado, nuts and seeds, and coconut. Getting 25+ grams of fiber from only these sources requires deliberate planning and high vegetable volume. Most keto dieters fall significantly short of fiber recommendations. Psyllium husk supplementation is often recommended for keto dieters specifically to address this gap — it's essentially pure fiber with minimal carbohydrate impact.`},
  {question:'What is resistant starch and how is it different from regular fiber?',answer:`Resistant starch is a type of starch that resists digestion in the small intestine and reaches the colon intact, where it's fermented like fiber. It functions as a prebiotic and produces butyrate in particularly high amounts. The interesting property of resistant starch: cooking and cooling carbohydrates increases their resistant starch content. Cooked-then-cooled potatoes, rice, and pasta contain meaningfully more resistant starch than the same food eaten hot. Repeatedly reheating and cooling increases resistant starch further. Bananas contain high resistant starch when unripe (before the starch converts to sugar as the banana ripens). This means meal prepping rice or eating slightly underripe bananas can provide fiber benefits that the same foods prepared differently would not.`},
]

const seoContent = {
  title: 'Fiber Intake Calculator',
  category: 'health' as const,
  intro: `Most Americans consume about half the fiber they need. The average adult gets 15-17 grams per day; recommendations are 25 grams for women and 38 grams for men. This fiber gap has real health consequences: dietary fiber intake is one of the most consistently associated dietary factors with cardiovascular risk, blood glucose management, colorectal cancer prevention, and gut microbiome diversity.

Fiber isn't one thing — it's a category of plant compounds that share the property of resisting digestion in the small intestine. Soluble fiber (found in oats, legumes, apples, psyllium) dissolves in water, forms a gel, slows glucose absorption, and is fermented by gut bacteria producing short-chain fatty acids that feed colonocytes. Insoluble fiber (found in wheat bran, vegetables, whole grains) adds bulk to stool and speeds transit time.

You need both types, and both contribute to the total fiber target. The fastest way to substantially increase fiber intake is through legumes (15g per cup of cooked lentils), which outpace virtually every other food in fiber density. Replacing refined grains with whole grains at every meal adds 3-5g per serving.

This calculator estimates your current fiber intake, compares it against age- and sex-specific targets, and gives you specific food additions needed to close the gap without major dietary overhaul.

**Long-tail searches answered here:** daily fiber intake calculator free online usa, how much fiber should i eat per day calculator, fiber needs calculator by age weight activity free, dietary fiber requirement calculator no signup, am i getting enough fiber calculator usa, fiber deficiency risk calculator free tool online, soluble vs insoluble fiber needs calculator free usa, fiber intake for cholesterol reduction calculator free, daily fiber from food vs supplement calculator usa, fiber intake for ibs management calculator free, constipation relief fiber amount calculator usa free, high fiber diet transition plan calculator free online, fiber calculator for diabetics and blood sugar control, weight management fiber daily needs calculator usa free, fiber adequacy from typical american diet calculator`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate fiber intake from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Increase fiber intake gradually. Adding 10-15g of fiber per day suddenly when you're adapted to low fiber intake causes significant bloating, gas, and discomfort as your gut microbiome adjusts to the new substrate availability. Increasing by 3-5g per week over several weeks allows your microbiome to adapt.

Hydration is the other key variable: soluble fiber absorbs water, and inadequate fluid intake when increasing fiber can actually worsen constipation rather than help it.

The gut microbiome diversity benefits of fiber accumulate over months and depend on variety — diverse plant foods feed different bacterial species. Use [our Gut Health Calculator](/calculators/health/gut-health-calculator) if you want to assess your overall microbiome support habits more comprehensively.`,
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
        generateWebAppStructuredData({ name: 'Fiber Intake Calculator', description: 'Calculate your optimal daily fiber intake based on age, sex, and health goals including heart health, blood sugar management, and digestive health. Tr', url: 'https://tooltrio.com/calculators/health/fiber-intake-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Fiber Intake Calculator', description: 'Calculate your optimal daily fiber intake based on age, sex, and health goals including heart health, blood sugar management, and digestive health. Tr', url: 'https://tooltrio.com/calculators/health/fiber-intake-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Fiber Intake Calculator', url: '/calculators/health/fiber-intake-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
