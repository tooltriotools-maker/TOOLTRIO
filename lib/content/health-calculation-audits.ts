export type HealthCalculationAudit = {
  status: 'verified_formula' | 'reviewed' | 'custom_estimate' | 'needs_formula_review' | 'critical_logic_issue'
  formula: string
  implementationNotes: string
  limitations: string[]
}

/**
 * Calculation-level QA register for Health Batch 02.
 * A route marked needs_formula_review/custom_estimate must not describe its
 * output as a clinically validated risk prediction.
 */
export const HEALTH_CALCULATION_AUDITS: Record<string, HealthCalculationAudit> = {
  'caloric-needs-calculator': {
    status: 'verified_formula',
    formula: 'Mifflin–St Jeor BMR × activity multiplier, with an explicit goal adjustment.',
    implementationNotes: 'The BMR equation matches the published Mifflin–St Jeor form. Activity multipliers and the 500 kcal loss-rate adjustment are planning assumptions, not clinical prescriptions.',
    limitations: ['TDEE is an estimate and should be calibrated against observed weight/intake trends.', 'Do not present the BMR value as a minimum safe calorie intake for every person.'],
  },
  'calorie-burned-walking-calculator': {
    status: 'needs_formula_review',
    formula: 'MET-based exercise energy expenditure.',
    implementationNotes: 'The page describes ACSM/MET methodology, but the exact implementation and speed/grade mapping must be checked against the current ACSM equations.',
    limitations: ['Energy expenditure is an estimate.', 'Fitness trackers and equations can differ materially for an individual.'],
  },
  'calorie-calculator': {
    status: 'verified_formula',
    formula: 'BMR/TDEE estimation using body measurements, age, sex and activity.',
    implementationNotes: 'The calculator uses the shared health calculation layer; exact activity assumptions should remain visible to users.',
    limitations: ['Estimated energy expenditure is not a measured metabolic rate.', 'Weight change should be monitored over time rather than inferred from one result.'],
  },
  'calorie-deficit-calculator': {
    status: 'custom_estimate',
    formula: 'Estimated maintenance calories minus a selected planning deficit.',
    implementationNotes: 'The deficit is a planning parameter, not a validated prediction of an individual rate of fat loss.',
    limitations: ['Do not label a target as universally safe.', 'Very-low-calorie diets require appropriate clinical supervision.'],
  },
  'calories-burned-calculator': {
    status: 'needs_formula_review',
    formula: 'MET/activity-based energy expenditure.',
    implementationNotes: 'Verify activity MET values, duration units and body-weight conversion against the selected reference table.',
    limitations: ['MET estimates represent population averages.', 'Actual expenditure varies with fitness, terrain and technique.'],
  },
  'cardiac-output-calculator': {
    status: 'needs_formula_review',
    formula: 'Cardiac output = heart rate × stroke volume; cardiac index requires body-surface area.',
    implementationNotes: 'Cardiac output itself is correct, but the current implementation derives cardiac index from fixed sex-specific BSA assumptions and calculates SVR without right-atrial pressure. These outputs require correction before clinical use.',
    limitations: ['A calculated value is not a measured cardiac output.', 'Cardiac index and SVR require appropriate clinical measurements and assumptions.'],
  },
  'cholesterol-calculator': {
    status: 'needs_formula_review',
    formula: 'Friedewald LDL estimate plus lipid reference categories.',
    implementationNotes: 'The LDL implementation uses total cholesterol − HDL − triglycerides/5 when TG <400 mg/dL. The separate cardiovascular “risk” score is a custom point system and must not be described as a validated 10-year risk calculator.',
    limitations: ['Friedewald LDL has limitations at high triglycerides and in some nonfasting contexts.', 'Cardiovascular risk requires a validated model with the model-specific inputs.'],
  },
  'ckd-progression-calculator': {
    status: 'custom_estimate',
    formula: 'Current implementation estimates years to eGFR 15 by dividing the current eGFR gap by a recent annual slope.',
    implementationNotes: 'The tool now presents a transparent eGFR-slope scenario rather than a validated kidney-failure or dialysis prediction.',
    limitations: ['CKD progression is nonlinear and varies by cause, albuminuria, treatment and time.', 'Use a validated kidney-failure risk equation where appropriate instead of a simple linear extrapolation.'],
  },
  'cognitive-load-calculator': {
    status: 'custom_estimate',
    formula: 'Weighted self-report score across task complexity, memory demand, interruptions, multitasking, noise and time without breaks.',
    implementationNotes: 'This is a custom educational score, not a validated clinical or occupational cognitive-load instrument.',
    limitations: ['Thresholds are heuristic.', 'Do not claim that a score predicts errors or impairment with clinical accuracy.'],
  },
  'cold-exposure-calculator': {
    status: 'needs_formula_review',
    formula: 'Cold-exposure planning estimate based on duration, temperature and user factors.',
    implementationNotes: 'Verify every safety threshold against current cold-water/immersion guidance before presenting a “safe” exposure limit.',
    limitations: ['Cold-water immersion can cause cold shock and cardiovascular stress.', 'No consumer calculator can guarantee safe immersion.'],
  },
  'cold-shower-benefits-calculator': {
    status: 'custom_estimate',
    formula: 'Lifestyle score/benefit estimate based on cold-shower routine inputs.',
    implementationNotes: 'Evidence for specific benefits varies by outcome; the score is not a validated clinical benefit prediction.',
    limitations: ['Do not quantify disease-risk reduction from shower duration without outcome-specific evidence.', 'Users with cardiovascular conditions may need clinician guidance.'],
  },
  'cortisol-stress-calculator': {
    status: 'custom_estimate',
    formula: 'Lifestyle-factor stress score; it does not measure cortisol concentration.',
    implementationNotes: 'The name can imply a biochemical cortisol measurement even though the inputs are lifestyle factors. Rename the result concept to a stress-load estimate unless a validated cortisol model is implemented.',
    limitations: ['Cortisol cannot be inferred reliably from a lifestyle score.', 'Stress symptoms have many causes.'],
  },
  'creatine-dosage-calculator': {
    status: 'needs_formula_review',
    formula: 'Creatine intake planning based on body weight and selected protocol.',
    implementationNotes: 'Separate evidence-based maintenance dosing from optional loading protocols and avoid presenting a single dose as medically required.',
    limitations: ['Supplement use can be inappropriate for some people with kidney disease or other conditions.', 'Product quality and formulation can vary.'],
  },
  'creatinine-clearance-calculator': {
    status: 'verified_formula',
    formula: 'Should calculate creatinine clearance using a declared equation such as Cockcroft–Gault from age, serum creatinine, weight and sex.',
    implementationNotes: 'Cockcroft–Gault is implemented directly from age, body weight, serum creatinine and sex; the page explicitly distinguishes this estimate from normalized eGFR.',
    limitations: ['Cockcroft–Gault is an estimate and has known limitations.', 'Medication dosing decisions require the equation and clinical context appropriate to the drug.'],
  },
  'cycling-calories-calculator': {
    status: 'needs_formula_review',
    formula: 'Cycling energy expenditure from activity intensity, body weight and duration.',
    implementationNotes: 'Verify the cycling MET table, speed/intensity mapping and unit conversions.',
    limitations: ['Terrain, wind, cycling efficiency and fitness alter actual energy expenditure.'],
  },
  'dehydration-calculator': {
    status: 'needs_formula_review',
    formula: 'Estimated fluid loss/deficit from body weight and exercise/environment inputs.',
    implementationNotes: 'Avoid combining estimated sweat loss with a user-entered fluid-loss value unless the two inputs are explicitly defined as non-overlapping quantities.',
    limitations: ['Sweat rate varies widely.', 'Symptoms and clinical severity cannot be diagnosed from a percentage alone.'],
  },
  'dehydration-status-calculator': {
    status: 'custom_estimate',
    formula: 'Self-reported dehydration-status estimate.',
    implementationNotes: 'The score must be labeled educational unless validated against a defined clinical assessment method.',
    limitations: ['Dehydration severity can require clinical assessment and vital signs/labs.', 'Severe symptoms need medical evaluation.'],
  },
  'dental-health-calculator': {
    status: 'custom_estimate',
    formula: 'Self-reported oral-health risk score.',
    implementationNotes: 'The current score is a heuristic unless mapped to a validated dental risk instrument.',
    limitations: ['A score cannot diagnose caries, periodontal disease or other oral conditions.', 'Dental examination remains necessary for diagnosis.'],
  },
  'diabetes-risk-calculator': {
    status: 'needs_formula_review',
    formula: 'Current implementation is a custom point score labeled FINDRISC.',
    implementationNotes: 'The current inputs and scoring do not match the official CDC prediabetes risk test or a complete validated FINDRISC implementation. Remove the validated-model claim or implement a documented validated instrument exactly.',
    limitations: ['A risk score cannot diagnose diabetes.', 'CDC notes that blood testing is needed to diagnose prediabetes or diabetes.'],
  },
  'diet-quality-score-calculator': {
    status: 'custom_estimate',
    formula: 'Custom weighted diet-quality score across food groups and dietary exposures.',
    implementationNotes: 'It should not be described as the Healthy Eating Index unless the official HEI scoring methodology is actually implemented.',
    limitations: ['Custom scores are not equivalent to validated dietary assessment instruments.', 'Diet quality is multidimensional and context dependent.'],
  },
  'dietary-inflammatory-index-calculator': {
    status: 'custom_estimate',
    formula: 'Current implementation uses ten simplified food/exposure inputs and arbitrary coefficients, not the published DII/DII® methodology.',
    implementationNotes: 'The simplified ten-input score is explicitly a ToolTrio dietary inflammatory pattern estimate and is not the published DII calculation.',
    limitations: ['Associations between DII and outcomes are largely epidemiologic and do not establish causation.', 'A simplified food score cannot reproduce a validated DII calculation.'],
  },
  'due-date-calculator': {
    status: 'verified_formula',
    formula: 'Estimated due date from LMP uses 280 days for a 28-day cycle; conception-based estimate uses 266 days.',
    implementationNotes: 'The calculation is appropriate as an estimated date. ACOG notes that ultrasound dating may change the selected EDD when clinically indicated.',
    limitations: ['LMP recall and cycle variability affect accuracy.', 'The calculator does not replace prenatal care or clinical dating.'],
  },
  'emf-exposure-calculator': {
    status: 'custom_estimate',
    formula: 'Relative exposure score constructed from device use, distance and behavior inputs.',
    implementationNotes: 'The score is not an RF dosimetry calculation and should not be described as a WHO/ICNIRP health-risk score.',
    limitations: ['Actual RF exposure depends on frequency, power, antenna, duty cycle, distance and environment.', 'WHO states that everyday exposure levels are generally below guideline limits; a custom score should not imply disease risk.'],
  },
  'erectile-dysfunction-risk-calculator': {
    status: 'custom_estimate',
    formula: 'Custom additive risk-factor score across age, BMI, smoking, diabetes, hypertension, CVD, activity, alcohol and mental-health factors.',
    implementationNotes: 'The score is not a validated ED risk model and should not be reported as a percentage probability.',
    limitations: ['ED has vascular, neurologic, hormonal, medication-related and psychological contributors.', 'A risk score cannot diagnose ED or determine its cause.'],
  },
  'ergonomics-score-calculator': {
    status: 'needs_formula_review',
    formula: 'Workstation/posture self-assessment informed by ergonomic frameworks.',
    implementationNotes: 'The page references ROSA/RULA/REBA concepts, but a true validated instrument requires the instrument-specific item scoring and weighting rules.',
    limitations: ['A custom workstation score is not equivalent to a formal RULA/REBA/ROSA assessment.', 'Work-related musculoskeletal risk is multifactorial.'],
  },

  'infant-weight-percentile-calculator': {
    status: 'verified_formula',
    formula: 'WHO weight-for-age LMS z-score transformation for 0–24 completed months.',
    implementationNotes: 'Uses published WHO L, M and S reference parameters for boys and girls and converts the resulting z-score to a percentile.',
    limitations: ['Growth percentiles describe population reference distributions and are not a diagnosis.', 'Clinical growth assessment uses serial measurements and may require additional indicators and corrected age context.'],
  },
  'mental-health-score-calculator': {
    status: 'custom_estimate',
    formula: 'Custom lifestyle/wellbeing score from BMI, age and sex inputs.',
    implementationNotes: 'This is explicitly an educational wellbeing score and does not implement or impersonate PHQ-9, GAD-7, WHO-5 or another validated screening instrument.',
    limitations: ['The score cannot diagnose depression, anxiety, burnout or another mental disorder.', 'Persistent or severe symptoms require assessment by a qualified professional.'],
  },
  'pcos-risk-calculator': {
    status: 'custom_estimate',
    formula: 'Custom feature-count score across cycle pattern, androgen-related symptoms and selected metabolic/family-history inputs.',
    implementationNotes: 'The score is not a diagnostic probability and does not implement Rotterdam/2023 international PCOS diagnostic criteria.',
    limitations: ['PCOS diagnosis requires clinical assessment and exclusion of alternative causes.', 'Fasting insulin alone cannot diagnose insulin resistance.'],
  },
  'stroke-risk-calculator': {
    status: 'custom_estimate',
    formula: 'Custom stroke-risk-factor score across age, blood pressure, cholesterol, atrial fibrillation, diabetes, smoking and prior stroke/TIA.',
    implementationNotes: 'The result is presented as a risk-factor score, not a validated 10-year stroke probability. Validated cardiovascular/stroke models require their exact model-specific inputs and coefficients.',
    limitations: ['The score cannot predict an individual probability of stroke.', 'Acute stroke symptoms require emergency evaluation rather than calculator use.'],
  },
  'testosterone-age-calculator': {
    status: 'custom_estimate',
    formula: 'Lifestyle-support score based on age, exercise, sleep, stress, BMI and alcohol inputs.',
    implementationNotes: 'The page no longer infers or reports a serum testosterone concentration from lifestyle variables.',
    limitations: ['Serum testosterone requires appropriate laboratory testing and clinical interpretation.', 'Diagnosis of hypogonadism requires symptoms/signs plus repeated morning testosterone measurements.'],
  },
  'thyroid-calculator': {
    status: 'reviewed',
    formula: 'TSH/optional free-T4 pattern interpretation using laboratory-contextual thyroid-function concepts.',
    implementationNotes: 'The page treats TSH as an initial test and free T4 as contextual follow-up; it does not diagnose thyroid disease from symptoms alone.',
    limitations: ['Reference ranges vary by laboratory, age, pregnancy and clinical context.', 'Unexpected results should be interpreted with a clinician and the reporting laboratory range.'],
  },
  'vitamin-d-status-calculator': {
    status: 'custom_estimate',
    formula: 'Daily vitamin-D intake/context estimate; serum 25(OH)D is not inferred from sun exposure.',
    implementationNotes: 'The page distinguishes intake guidance from laboratory vitamin-D status and uses NIH reference information for context.',
    limitations: ['Sun exposure cannot reliably predict an individual serum 25(OH)D concentration.', 'Supplement decisions may require consideration of medical conditions, medications and laboratory results.'],
  },
  'wound-healing-calculator': {
    status: 'custom_estimate',
    formula: 'Wound-healing factor score based on wound characteristics and selected systemic risk factors.',
    implementationNotes: 'The output is a structured educational factor assessment; it is not an exact healing-time or infection-probability prediction.',
    limitations: ['Wound severity and infection require clinical assessment when concerning signs are present.', 'Healing depends on local perfusion, infection, wound type, comorbidities and treatment.'],
  },
}
