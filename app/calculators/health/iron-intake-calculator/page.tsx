import type { Metadata } from 'next'
import { generateCalculatorMetadata, generateFAQStructuredData, generateWebAppStructuredData, generateBreadcrumbStructuredData, generateMedicalWebPageSchema } from '@/lib/seo/metadata'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Iron Intake Calculator — Daily Iron Needs, Deficiency Risk & Absorption Guide 2026',
  description: 'Free Iron Intake Calculator 2026 — Calculate your daily iron intake needs based on age, sex, and health status. Based on NIH Dietary Reference Intakes (DRIs). Instant results, no signup required.',
  slug: 'iron-intake-calculator',
  category: 'health',
  region: 'usa',
  keywords: [
    'iron intake calculator 2026',
    'free iron intake calculator',
    'iron intake calculator usa 2026',
    'iron intake calculator free 2026',
    'iron intake calculator daily needs',
    'how much iron do I need',
    'iron deficiency risk calculator',
    'heme vs non heme iron calculator',
    'iron absorption enhancers inhibitors',
    'iron for vegetarians calculator',
    'women iron needs menstruation',
    'iron supplement need calculator',
    'anemia risk iron calculator',
    'dietary iron tracker',
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
  {question:'Why do women need more iron than men?',answer:`Menstruating women lose iron in blood every month — typical menstrual blood loss averages 30-40 mL per cycle (equivalent to roughly 13-17 mg of iron), with heavier periods causing up to 80-100 mL (35-45 mg of iron) loss. This monthly iron loss explains why the RDA for iron is 18 mg/day for premenopausal women versus 8 mg/day for adult men and postmenopausal women. Pregnancy dramatically increases iron requirements further — the RDA rises to 27 mg/day — because the fetus extracts substantial iron from maternal stores, blood volume expands by 50%, and iron is needed to produce additional hemoglobin. Iron deficiency anemia is the most common nutritional deficiency in the world, affecting approximately 1.2 billion people, with women of reproductive age most affected. After menopause, women's iron needs drop to male levels.`},
  {question:'What is the difference between heme and non-heme iron?',answer:`Heme iron comes from animal sources — hemoglobin and myoglobin in meat, poultry, and fish. It's absorbed at 15-35% efficiency because it's taken up by the intestine as an intact porphyrin ring structure, bypassing the usual iron absorption regulation. Non-heme iron is found in plant foods (beans, lentils, spinach, fortified cereals, tofu) and is absorbed at only 2-20% efficiency because it must first be converted to ferrous (Fe2+) form in the gut, a process affected by multiple dietary factors. Vitamin C dramatically increases non-heme iron absorption (by reducing Fe3+ to the more absorbable Fe2+ form) — consuming vitamin C-rich foods with plant iron sources can triple absorption. Calcium, polyphenols in coffee and tea, and phytates in whole grains inhibit non-heme iron absorption. The Western diet averages roughly 70% non-heme iron, making absorption-enhancing strategies genuinely important.`},
  {question:'How do I know if I am iron deficient?',answer:`Iron deficiency progresses through three stages. First stage (iron depletion): ferritin (stored iron) falls below 12-15 ng/mL; no functional symptoms yet. Second stage (iron-deficient erythropoiesis): iron supply to bone marrow decreases, transferrin saturation falls below 16%, but hemoglobin remains normal. Third stage (iron deficiency anemia): hemoglobin falls below 12 g/dL for women or 13 g/dL for men; symptoms appear. Common symptoms of iron deficiency anemia: fatigue and reduced exercise tolerance; pallor of inner eyelids, nail beds, and palms; cold intolerance; shortness of breath on exertion; difficulty concentrating; pica (craving non-food items like ice, clay, or starch — called pagophagia, geiophagia, or amylophagia respectively); restless leg syndrome; and brittle or spoon-shaped nails (koilonychia). A complete blood count with ferritin is the standard diagnostic test.`},
  {question:'Does eating spinach give you significant iron like Popeye suggests?',answer:`The Popeye association with spinach and iron is based on a persistent myth originating from a decimal point error in a 19th-century analysis that overstated spinach's iron content by 10-fold. When the error was discovered in the 1930s, the spinach-iron association was already culturally embedded. Spinach does contain iron — about 3.6 mg per cooked cup — but it also contains high concentrations of oxalic acid, which binds iron and dramatically reduces absorption. The actual absorbed iron from spinach is quite low despite its iron content. Better non-heme iron sources: lentils (6.6 mg per cup cooked, with better bioavailability), white beans (8 mg per cup), tofu (3.4 mg per half cup), and fortified cereals (which contain highly absorbable iron forms). Pairing any of these with vitamin C-rich foods (tomatoes, citrus, bell peppers) dramatically improves absorption.`},
  {question:'Can I get too much iron from supplements?',answer:`Yes — iron toxicity is a genuine concern, particularly for specific populations. Iron overdose is one of the leading causes of fatal poisoning in children under 6 years — accidental ingestion of adult iron supplements can cause rapid gastrointestinal injury, systemic toxicity, and death. Adults rarely reach toxic levels from dietary iron alone because the intestine tightly regulates absorption via hepcidin. However, supplemental iron above physiological needs can cause: gastrointestinal symptoms (constipation, nausea, black stools at doses above 45 mg/day), oxidative stress from free iron in the gut, and increased susceptibility to certain infections (iron is a growth factor for many bacteria). People with hemochromatosis (a genetic iron overload condition affecting approximately 1 in 200 people of Northern European descent) should not take iron supplements and should limit iron-rich foods.`},
  {question:'What is the connection between iron deficiency and ADHD symptoms?',answer:`Multiple studies have found significantly lower ferritin levels in children with ADHD compared to neurotypical controls — one meta-analysis found average ferritin levels 20-30% lower in children with ADHD. Iron is required for dopamine synthesis (iron is a cofactor for tyrosine hydroxylase, the enzyme that converts tyrosine to L-DOPA) and for myelin synthesis. Dopamine dysregulation is central to ADHD pathophysiology. Several controlled trials have found that iron supplementation in iron-deficient children with ADHD improves ADHD symptom scores, though the effect size is smaller than stimulant medications. This is clinically meaningful because iron deficiency in children is prevalent, often unrecognized, and potentially treatable. Standard ADHD evaluations don't routinely include iron/ferritin testing, but several child psychiatry guidelines now recommend screening for iron deficiency in children with ADHD or ADHD symptoms.`},
  {question:'How does intense exercise affect iron status?',answer:`Athletes — particularly endurance runners — have higher iron requirements than sedentary individuals for multiple reasons. Foot strike hemolysis: the mechanical impact of running ruptures red blood cells in foot capillaries, releasing hemoglobin that gets excreted in urine. This can cause measurable hemoglobinuria after long runs. Exercise-induced hepcidin elevation: high-intensity exercise increases interleukin-6, which triggers hepcidin release; elevated hepcidin reduces intestinal iron absorption for 3-6 hours post-exercise, making post-exercise iron supplementation less effective (taking iron before exercise or the evening before is more effective). Sweat iron loss (minor: approximately 0.3-0.4 mg/hour of intense exercise). GI blood loss in runners from ischemic intestinal injury. Iron deficiency without anemia (depleted ferritin, normal hemoglobin) significantly impairs aerobic performance in athletes — muscle oxygen extraction and mitochondrial function both depend on iron.`},
  {question:'What is anemia of chronic disease and how does it differ from iron deficiency anemia?',answer:`Anemia of chronic disease (now called anemia of inflammation) is the second most common type of anemia after iron deficiency and occurs in the context of chronic infection, autoimmune disease, cancer, chronic kidney disease, or heart failure. In this condition, iron is plentiful in the body but sequestered and unavailable — hepcidin (the master iron regulatory hormone) is chronically elevated by ongoing inflammation, blocking iron release from macrophage stores and reducing intestinal iron absorption. The body effectively has iron deficiency at the functional level despite normal or high total body iron stores. Key differentiating laboratory finding: ferritin is normal or elevated (unlike true iron deficiency where ferritin is low); TIBC is low or normal (unlike true iron deficiency where TIBC is elevated). This distinction matters for treatment: iron supplements worsen anemia of chronic disease by feeding inflammatory processes and don't address the underlying cause.`},
]

const seoContent = {
  title: 'Iron Intake Calculator',
  category: 'health' as const,
  intro: `Iron deficiency is the most common nutritional deficiency worldwide, and in the United States it disproportionately affects women of reproductive age, pregnant women, distance runners, and vegetarians/vegans who rely solely on non-heme iron sources. The symptoms — fatigue, brain fog, reduced exercise tolerance, cold intolerance, brittle nails, and restless legs — develop so gradually that many people adapt to them without recognizing iron status as the cause.

There are two forms of dietary iron with very different absorption rates. Heme iron, found exclusively in animal products, is absorbed at roughly 15-35% efficiency. Non-heme iron, found in plant foods, supplements, and fortified foods, is absorbed at only 2-20% efficiency — and this efficiency is dramatically influenced by what you eat alongside it. Vitamin C consumed in the same meal increases non-heme absorption by 2-3 times. Calcium, tannins (tea, coffee, red wine), and phytates significantly reduce absorption when consumed simultaneously.

The RDA for iron is 8mg for adult men and postmenopausal women, 18mg for premenopausal women, and 27mg during pregnancy. Vegetarians and vegans are recommended to target 1.8x the standard RDA because of lower bioavailability from plant sources.

This calculator estimates your daily iron intake, absorption efficiency given your dietary patterns, and whether you're likely meeting your individual needs.

**Long-tail searches answered here:** daily iron intake calculator free online usa, how much iron do i need per day calculator, iron deficiency risk calculator for women free tool, iron requirements during pregnancy calculator usa, am i getting enough iron from food calculator no signup, iron absorption calculator by food source free, iron needs for vegan and vegetarian women calculator usa, iron rich foods calculator for anemia prevention free, heme vs non heme iron absorption rate calculator free, vitamin c effect on iron absorption calculator usa free, iron requirement during menstruation vs post menopausal, iron for endurance runners anemia risk calculator free, calcium and iron absorption conflict calculator usa, iron supplement dose from deficiency level calculator free, cast iron cooking iron intake contribution calculator usa`,
  howItWorks: `This calculator uses peer-reviewed, clinically validated formulas to estimate iron intake from your inputs. Where multiple validated methods exist, the approach with the strongest evidence base for the general adult population is used as the primary result.

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
  conclusion: `Iron supplementation without confirmed deficiency isn't appropriate — iron overload is harmful. Get a ferritin level (serum ferritin measures stored iron and is more sensitive than hemoglobin for identifying early deficiency) before supplementing, particularly if symptoms are your primary concern.

Dietary strategies to increase iron absorption from plant sources: eat vitamin C-rich foods at every iron-containing meal, separate coffee and tea from iron-containing meals by at least 1 hour, and don't take calcium supplements at the same time as iron-containing foods or supplements.

For vegetarians and vegans, legumes are your highest-iron plant foods, but cooking them and consuming with vitamin C optimizes what you actually absorb. Use [our Magnesium Calculator](/calculators/health/magnesium-calculator) and [our Zinc Calculator](/calculators/health/zinc-calculator) if you're also monitoring other minerals commonly affected by plant-based diets.`,
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
        generateWebAppStructuredData({ name: 'Iron Intake Calculator', description: 'Calculate your daily iron requirements based on age, sex, pregnancy status, and dietary pattern (omnivore vs vegetarian). Assess iron deficiency risk ', url: 'https://tooltrio.com/calculators/health/iron-intake-calculator', category: 'HealthApplication' }),
        generateMedicalWebPageSchema({ name: 'Iron Intake Calculator', description: 'Calculate your daily iron requirements based on age, sex, pregnancy status, and dietary pattern (omnivore vs vegetarian). Assess iron deficiency risk ', url: 'https://tooltrio.com/calculators/health/iron-intake-calculator' }),
        generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }, { name: 'Health Calculators', url: '/calculators/health' }, { name: 'Iron Intake Calculator', url: '/calculators/health/iron-intake-calculator' }]),
      ]}
      relatedCalculators={relatedCalculators}
      seoContent={seoContent}
    />
  )
}
