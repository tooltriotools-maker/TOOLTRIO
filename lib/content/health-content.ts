/**
 * Health content quality rules.
 *
 * Generic trust/privacy/product copy belongs in UI components, not in the
 * calculator's topical guide. These helpers keep the guide focused on the
 * actual health calculation while preserving the information elsewhere.
 */

const GENERIC_HEALTH_BENEFIT_TITLES = new Set([
  'Evidence-based clinical formulas',
  'Instant real-time results',
  'Complete data privacy',
  'Health context included',
  'Works on all devices',
  'Completely free',
  '100% Free - No Signup, No Subscription, No Ads',
  'Real-Time Plank Time Calculator output as You Type',
  'Complete Privacy - Your Data Stays on Your Device',
  'Works Perfectly on All Devices & Browsers',
])

const GENERIC_HEALTH_USE_CASE_TITLES = new Set([
  'Annual health monitoring',
  'Doctor appointment preparation',
  'Wellness program participation',
  'Health education and research',
])

export function isGenericHealthBenefit(title: string): boolean {
  return GENERIC_HEALTH_BENEFIT_TITLES.has(title.trim())
}

export function isGenericHealthUseCase(title: string): boolean {
  return GENERIC_HEALTH_USE_CASE_TITLES.has(title.trim())
}

/** Remove only repeated product-marketing paragraphs; preserve health-specific text. */
export function cleanHealthGuideText(text: string): string {
  const blocked = [
    /Uses peer-reviewed, validated formulas from major health organizations — the same calculations trusted by healthcare professionals in clinical and research settings\.?/gi,
    /All calculations run entirely in your browser\. No personal health data is transmitted, stored, or shared anywhere — ever\.?/gi,
    /Results update as you type — no button to click\.?/gi,
    /No signup, no subscription, no premium features\.?/gi,
    /Works on all devices\.?/gi,
    /Everything runs locally in your browser\. No personal data is transmitted to any server, stored in any database, or shared with any third party - ever\. When you close the browser tab, your inputs disappear permanently\.?/gi,
    /Arriving at a doctor's appointment, financial planning session, coaching consultation, or any professional meeting with your numbers already calculated and understood enables a more productive conversation\. You take ownership of your health and wellness situation\.?/gi,
    /Beyond just a raw number, this calculator provides detailed context: US population reference ranges, risk category classifications, interpretive guidelines, and practical next steps\. You don't just get a result - you get the knowledge to understand what it means and what to do about it\.?/gi,
    /The formulas underlying this calculator are derived from peer-reviewed research published in major medical and scientific journals\. Reference ranges are drawn from NHANES population survey data — the CDC's nationally representative survey of American adults —[^.]*\.?/gi,
    /Beyond just a raw number, this calculator provides detailed context: calculator-specific interpretation, limitations, and practical next steps\. You don't just get a result - you get the knowledge to understand what it means and what to do about it\.?/gi,
    /Take measurements consistently under the same conditions for meaningful trend comparisons\. Use the same time of day, same equipment, and same protocol each time you recalculate to minimize measurement variability\. Track trends over months rather than reacting to a single reading\.?/gi,
    /The methodology should be interpreted alongside the specific formula and sources described for this calculator; a health result is an estimate and should not be treated as a clinical diagnosis\.?/gi,
    /Read the result together with the inputs and assumptions shown on the page\. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional\.?/gi,
  ]

  let result = text
  for (const pattern of blocked) result = result.replace(pattern, '')
  return result.replace(/\n{3,}/g, '\n\n').trim()
}
