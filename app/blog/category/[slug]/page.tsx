import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allBlogPosts as blogPosts, blogCategories } from '@/lib/blog/posts'
import { Clock, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return blogCategories.map(c => ({ slug: c.slug }))
}

/* ─── Per-category SEO metadata ──────────────────────────────────────────── */
const CAT_META: Record<string, { title: string; description: string; keywords: string[]; h1: string; intro: string }> = {
  investment: {
    title: 'Investment Guides for Beginners 2026 — SIP, Mutual Funds & Stock Market Tips',
    description: 'Step-by-step investment guides for beginners in India. Learn how SIP works, how to start investing in mutual funds with ₹500/month, which index funds beat FDs, and how to build a portfolio. Free calculators included.',
    keywords: ['how to start investing in mutual funds with 500 rupees per month','SIP calculator guide for beginners India 2026','difference between SIP and lumpsum investment','best index funds for beginners India 2026','how to invest in stock market for beginners step by step','SIP vs FD which is better for long term','how mutual funds work in India simple explanation','what is CAGR and how to calculate it','how to build investment portfolio from scratch India','compound interest calculator explained with examples'],
    h1: '📈 Investment Guides — SIP, Mutual Funds & Stock Market for Beginners',
    intro: `Starting to invest is one of the most impactful financial decisions you can make — but most first-time investors don't know where to begin. Should you start with SIP or a lumpsum? Mutual funds or stocks? Index funds or actively managed funds? These guides answer each question with real numbers, worked examples, and free calculators so you can immediately put the advice into practice.\n\nThe key insight most beginners miss: ₹5,000/month invested in an index fund from age 25 grows to approximately ₹3.5 crore by age 60 at 12% CAGR — the same amount invested from age 35 grows to only ₹1.2 crore. Time in the market is the single biggest variable, and it costs nothing except starting today.\n\nEvery guide links directly to the relevant calculator so you can run your own numbers rather than relying on generic estimates.`,
  },
  retirement: {
    title: 'Retirement Planning Guides 2026 — 401k, NPS, PPF, FIRE & Pension Calculator',
    description: 'Complete retirement planning guides for India (NPS, PPF, EPF), USA (401k, Roth IRA, Social Security), and UK (SIPP, ISA). How much do you need to retire? FIRE calculator guides with real numbers. Free retirement calculators.',
    keywords: ['how much money do I need to retire in India 2026','NPS vs PPF which is better for retirement India','how to calculate retirement corpus step by step','FIRE movement India how to retire at 40','401k vs Roth IRA which is better for young investors','how much to save per month to retire at 50 India','EPF vs NPS difference which gives better returns','UK pension SIPP vs ISA which is better 2026','what is the 4 percent rule for retirement','how to calculate FIRE number for India'],
    h1: '🌅 Retirement Planning — 401k, NPS, PPF, SIPP & FIRE Guides',
    intro: `Most people overestimate how much they need to retire and underestimate how early they could do it. The truth is that retirement planning is entirely a math problem: corpus needed = annual expenses × (1 / safe withdrawal rate). At the 4% rule, ₹1 lakh/month expenses requires ₹3 crore.\n\nThese guides cover retirement planning for India (NPS, PPF, EPF), USA (401k, Roth IRA, Social Security), and UK (SIPP, workplace pension, ISA). Each guide includes worked examples with specific numbers and links to the calculator so you can model your own scenario.\n\nThe FIRE movement (Financial Independence, Retire Early) has a dedicated section because retiring at 40–50 is increasingly achievable for people who start early and optimize savings rate.`,
  },
  loans: {
    title: 'Loan & EMI Guides 2026 — Home Loan, Personal Loan, Mortgage & Debt Payoff Tips',
    description: 'Practical loan guides for India and globally. How to calculate EMI, reduce home loan interest by ₹10–20 lakh, compare personal loan vs gold loan, and pay off debt faster. Free EMI calculator and prepayment tools.',
    keywords: ['how to reduce home loan interest by prepayment India','EMI calculator explained step by step formula','personal loan vs gold loan which is better','how to pay off debt faster avalanche vs snowball method','home loan vs rent which is better 2026 India','student loan repayment strategies USA 2026','how to calculate total interest paid on home loan','debt to income ratio calculator explained','what happens if you prepay home loan in India','how to get lowest interest rate on personal loan India'],
    h1: '🏦 Loan & EMI Guides — Home Loan, EMI, Debt Payoff & Mortgage Tips',
    intro: `A home loan is the largest financial commitment most people make — and a personal loan is often the most expensive. Yet most borrowers never calculate how much they are actually paying in total interest. On a ₹50 lakh home loan at 9% for 20 years, the total interest paid is ₹62 lakhs — more than the principal itself.\n\nThese guides show you the numbers: how EMI is calculated, how to save 10–20 lakhs on your home loan through strategic prepayment, how to choose between personal loan and gold loan, and how to become debt-free years earlier using proven payoff strategies.\n\nEvery guide includes the formula, a worked example with real numbers, and a link to the relevant calculator.`,
  },
  'personal-finance': {
    title: 'Personal Finance 101 Guides 2026 — Budgeting, Savings, Emergency Fund & Net Worth',
    description: 'Beginner personal finance guides covering the 50/30/20 budget rule, how to build a 6-month emergency fund, how to calculate net worth, and how to save ₹1 lakh per year on a middle-class salary. Free budget and savings calculators.',
    keywords: ['how to save money on middle class salary India 2026','50 30 20 budget rule explained with Indian salary example','how to build emergency fund step by step India','how to calculate net worth with calculator','budgeting tips for young professionals India','how much emergency fund do I need India','personal finance basics for beginners India 2026','how to track monthly expenses and save more money','zero based budgeting vs envelope budgeting which is better','how to achieve financial independence on average income India'],
    h1: '💡 Personal Finance 101 — Budgeting, Savings & Emergency Fund Guides',
    intro: `Personal finance is 80% behaviour and 20% maths — but you still need to know the maths. Most financial problems trace back to three gaps: no budget (not knowing where money goes), no emergency fund (one crisis away from debt), and no investment habit (money sitting in savings accounts earning 3.5% while inflation runs at 5–6%).\n\nThese guides fix all three gaps with practical, India-relevant advice. You will find the 50/30/20 budget rule worked out on a ₹60,000/month salary, a step-by-step emergency fund building plan, and concrete methods to save ₹1–2 lakh more per year without feeling deprived.\n\nEvery concept has a free calculator linked so you can calculate your specific numbers rather than using averages that may not apply to your situation.`,
  },
  tax: {
    title: 'Tax Guides 2026 — Income Tax India, UK Income Tax, GST, VAT & National Insurance',
    description: 'Clear tax guides for India (new vs old tax regime, GST, HRA), UK (income tax, National Insurance), and Europe (VAT). How to save maximum tax legally, calculate GST, and understand your tax slab. Free tax calculators.',
    keywords: ['new tax regime vs old tax regime India 2026 which is better','how to save income tax legally in India 2026','how to calculate HRA exemption step by step','UK income tax personal allowance 2026 explained','GST calculator India how to calculate GST on invoice','national insurance contributions UK 2026 how much to pay','income tax slab rates India 2026 AY 2026 27','how to file ITR online India step by step beginners','section 80C deductions list India maximum limit','VAT calculator Europe how VAT works explained'],
    h1: '📋 Tax Guides — Income Tax India, UK Tax, GST & VAT Explained',
    intro: `Tax is one of the largest drains on income — yet most people either overpay (missing deductions they are entitled to) or underpay (risking penalties). In India alone, Section 80C, 80D, HRA, and the new vs old tax regime choice can collectively save ₹50,000–₹1,50,000 per year for a salaried employee.\n\nThese guides cut through the jargon. The India tax guides explain the new vs old tax regime comparison with actual numbers on a ₹10 lakh salary, how to maximise 80C deductions, how HRA exemption is calculated, and how to calculate your final tax liability. The UK guides cover income tax bands, National Insurance, and self-assessment.\n\nEvery guide links to the relevant free calculator so you can enter your actual income and see your exact tax position.`,
  },
  health: {
    title: 'Health & Fitness Calculator Guides 2026 — BMI, Calories, BMR, TDEE & Body Fat',
    description: 'Science-based health guides covering how to calculate BMI correctly, what TDEE means for weight loss, body fat percentage, and how many calories you need. Free health calculators for BMI, TDEE, calories, and macros.',
    keywords: ['how to calculate BMI accurately with formula and example','what is TDEE and how to use it for weight loss','how many calories should I eat per day for my weight','BMR vs TDEE difference explained simply','body fat percentage calculator how to measure accurately','how to calculate ideal weight for height India','calorie deficit for weight loss how to calculate safely','macros calculator how to calculate protein carbs fat','how to calculate calories burned during exercise','sleep calculator how many hours do I need by age'],
    h1: '💪 Health & Fitness Guides — BMI, Calories, TDEE & Body Composition',
    intro: `Health metrics like BMI, TDEE, BMR, and body fat percentage are more useful than most people realise — but only when calculated correctly and interpreted in context. BMI alone can misclassify muscular people as overweight. TDEE without activity factor underestimates caloric needs.\n\nThese guides explain each metric correctly: the formula, how to calculate it, what the result means, and what to do with it. The calorie guides are particularly important — most people underestimate their maintenance calories by 200–400 kcal/day, which is why eating less often does not produce expected weight loss.\n\nEvery guide links to the free calculator so you can compute your exact numbers based on your age, height, weight, and activity level.`,
  },
  property: {
    title: 'Property & Real Estate Guides 2026 — UK Stamp Duty, Mortgage, Buy-to-Let & Rental Yield',
    description: 'Property investment guides for UK (stamp duty, buy-to-let, rental yield, help-to-buy) and India (home loan, property ROI, rent vs buy). How to calculate rental yield, stamp duty, and whether buying beats renting. Free calculators.',
    keywords: ['how to calculate rental yield property UK 2026','UK stamp duty calculator 2026 how much will I pay','buy to let mortgage vs residential mortgage UK difference','rent vs buy calculator which is better UK 2026','how to calculate property ROI UK investment','home loan vs rent which is better India 2026','UK help to buy scheme vs lifetime ISA which is better','how much deposit do I need to buy a house UK 2026','property investment India how to calculate returns','UK stamp duty first time buyer exemption 2026'],
    h1: '🏠 Property Guides — UK Stamp Duty, Buy-to-Let, Rental Yield & Mortgage Tips',
    intro: `Property is simultaneously the most popular and most misunderstood investment. Most people focus on capital appreciation and ignore rental yield, running costs, stamp duty, and the opportunity cost of a large deposit. A buy-to-let property yielding 4.5% gross sounds good until you subtract mortgage interest, agent fees, maintenance, and void periods — leaving a net yield closer to 2–3%.\n\nThese guides give you the numbers you need to make an informed property decision. The UK guides cover stamp duty, buy-to-let vs residential mortgage differences, Help to Buy vs LISA comparison, and how to calculate true rental yield after all costs. The India guides cover home loan vs rent analysis and property ROI calculation.\n\nAll guides link to free calculators so you can model your specific situation.`,
  },
  commodity: {
    title: 'Gold & Commodity Guides 2026 — How to Invest in Gold, Silver, Crude Oil & Precious Metals',
    description: 'Complete guides to investing in gold, silver, platinum, and crude oil. Physical gold vs Gold ETF vs Sovereign Gold Bond comparison. How gold loan works. Gold price per gram India. Live commodity price calculators.',
    keywords: ['physical gold vs gold ETF vs sovereign gold bond which is better 2026','how to invest in gold in India for beginners 2026','gold price per gram 22 karat today India calculator','how gold loan works in India eligibility and interest rate','silver investment India is silver better than gold 2026','crude oil price impact on Indian economy explained','how to calculate gold making charges in jewellery','sovereign gold bond interest rate 2026 India','gold silver ratio explained when to buy silver vs gold','commodity investing for beginners India 2026'],
    h1: '🥇 Commodity & Gold Guides — Physical Gold, ETF, SGB & Silver Investment',
    intro: `Gold is India's most culturally significant investment — and one of its most misunderstood. Most people hold physical jewellery thinking of it as investment, without accounting for the 8–25% making charges that are lost on resale. Meanwhile, Sovereign Gold Bonds offer the same gold price exposure plus 2.5% annual interest, zero making charges, and capital gains tax exemption at maturity.\n\nThese guides clarify the choices: physical gold vs Gold ETF vs Sovereign Gold Bonds (with actual numbers on a ₹1 lakh investment over 8 years), how gold loans work and when they beat personal loans, how the gold-silver ratio signals buying opportunities, and what crude oil price movements mean for your household and investments.\n\nEvery guide links to the relevant live-price calculator so you can check current gold prices, calculate jewellery value, or model your P&L in real time.`,
  },
}

const CAT_FAQS: Record<string, { q: string; a: string }[]> = {
  investment: [
    { q: 'How much money do I need to start investing in mutual funds in India?', a: 'You can start a SIP in most mutual funds with as little as ₹500 per month. Direct plans through Zerodha Coin, Groww, or Kuvera have ₹500 minimums. The amount you start with matters far less than starting early — ₹1,000/month from age 22 beats ₹5,000/month from age 32 at equivalent returns due to compounding.' },
    { q: 'What is the difference between SIP and lumpsum investment?', a: 'SIP (Systematic Investment Plan) invests a fixed amount at regular intervals, averaging out purchase cost through market cycles. Lumpsum means investing a large amount at once. SIP reduces timing risk and suits regular salaried investors. Lumpsum makes more sense when markets have corrected significantly. Use our SIP vs Lumpsum calculator to compare both for your specific amount and period.' },
    { q: 'Is it better to invest in index funds or actively managed mutual funds?', a: 'Data shows 80–90% of actively managed large-cap funds underperform their benchmark index over 10+ years, largely due to higher expense ratios (1–2% vs 0.1–0.2% for index funds). A 1.5% expense ratio difference on a 20-year ₹10,000/month SIP costs approximately ₹15–20 lakhs in lost compounding. Index funds are recommended for most investors as the primary holding.' },
    { q: 'What is CAGR and how do I calculate my investment returns?', a: 'CAGR = (Ending Value / Beginning Value)^(1/Years) - 1. Example: ₹1 lakh grew to ₹2.5 lakh in 7 years. CAGR = (2.5)^(1/7) - 1 = 14.0%. This lets you compare investments across different time periods on an equal basis. Use our CAGR calculator for any investment.' },
    { q: 'How do I compare SIP returns vs FD to decide which is better?', a: 'FD returns are typically 6–7.5% p.a. pre-tax — interest is taxed at your income slab (30% for high earners, making real return ~5%). Equity mutual fund SIP 15-year rolling returns: 12–14% CAGR for large-cap index funds. Long-term capital gains on equity: 12.5% after ₹1 lakh exemption. For 10+ year horizon, equity SIP has consistently outperformed FD after tax. For under-3-year horizon, FD is more appropriate. Use our SIP vs FD calculator for exact numbers.' },
    { q: 'How does compound interest work in mutual funds with an example?', a: 'Compound interest means earning returns on your returns. ₹1 lakh at 12% CAGR: Year 10 = ₹3.1 lakh, Year 20 = ₹9.6 lakh, Year 30 = ₹30 lakh. The rule of 72: divide 72 by your annual return to get years to double. At 12%, money doubles every 6 years. Starting 10 years earlier effectively triples your final corpus — the most powerful financial decision you can make.' },
  ],
  retirement: [
    { q: 'How much do I need to retire comfortably in India in 2026?', a: 'Use the formula: Retirement Corpus = Annual Expenses at Retirement ÷ Withdrawal Rate. Using 4% safe withdrawal rate: ₹1 lakh/month = ₹12 lakh/year requires ₹3 crore corpus. Adjust for inflation: retiring in 20 years means today\'s ₹1 lakh/month becomes ₹2.7 lakh/month at 5% inflation, requiring ~₹8 crore. Use our retirement calculator to model your specific scenario.' },
    { q: 'What is the difference between NPS and PPF for retirement in India?', a: 'PPF: 7.1% p.a. tax-free (government-set), 15-year lock-in, max ₹1.5 lakh/year, guaranteed returns. NPS: market-linked (historically 10–12% equity option), ₹2 lakh/year tax benefit, 60% tax-free at 60, 40% must buy annuity. For 20+ year horizon, NPS\'s higher expected return typically beats PPF. Use our NPS vs PPF calculator to compare your specific numbers.' },
    { q: 'What is FIRE and how do I calculate my FIRE number for India?', a: 'FIRE number = annual expenses × 25 (inverse of 4% withdrawal rule). If retirement expenses are ₹10 lakh/year, FIRE number = ₹2.5 crore. India-specific note: a 3.5% withdrawal rate (corpus = expenses × 28.6) is more conservative given healthcare costs and lack of social security. Use our FIRE calculator to find your specific number and timeline.' },
    { q: 'When should I start saving for retirement and how much should I save?', a: 'The answer is always: now. Starting at 25 vs 35 is not 10 extra years of contributions — it is 10 extra years of compounding on 35 years of contributions. ₹5,000/month at 12% CAGR from age 25 = ₹3.2 crore at 60. Same from age 35 = ₹1.1 crore — the 10 extra years of contribution (₹6 lakh) became ₹2.1 crore extra. Aim for 15–20% savings rate minimum; 25–30% for early retirement options.' },
    { q: 'What is the 401k employer match and why is it called free money?', a: '401k employer matching means your employer contributes to your retirement account based on your contributions — typically 50–100% match up to 3–6% of salary. On a $70,000 salary with 100% match up to 4%: employer adds $2,800 if you add $2,800 — that is an instant 100% guaranteed return. Always contribute enough to capture the full employer match before any other investment decision.' },
  ],
  loans: [
    { q: 'How is EMI calculated? What is the formula?', a: 'EMI = P × r × (1+r)^n ÷ [(1+r)^n - 1] where P = principal, r = monthly interest rate (annual ÷ 12), n = number of months. Example: ₹30 lakh at 9% for 20 years. r = 0.75%, n = 240. EMI = ₹26,992. Total paid = ₹64.78 lakh. Interest = ₹34.78 lakh on a ₹30 lakh loan — more than the principal. Use our EMI calculator to instantly model any loan.' },
    { q: 'How much can I save by prepaying my home loan in India?', a: 'Example: ₹50 lakh home loan at 9%, 20-year tenure. Making one extra EMI per year saves approximately ₹15–18 lakh in interest and shortens tenure by 3–4 years. A ₹5 lakh lumpsum prepayment in year 3 saves ₹14 lakh. Key rule: prepay early when interest component of EMI is highest. Use our loan prepayment calculator to see exact savings for your specific loan.' },
    { q: 'What is the difference between personal loan and gold loan in India?', a: 'Personal loan: no collateral, 2–5 day processing, 12–24% p.a., needs credit score. Gold loan: gold as collateral, same-day processing, 8–18% p.a., no credit check. Gold loan is almost always cheaper for those who have idle gold. Key downside: you surrender physical possession. For amounts above ₹5 lakh with available gold, gold loan wins on cost every time.' },
    { q: 'What is the debt avalanche vs debt snowball method?', a: 'Debt avalanche: pay minimum on all debts, extra money to highest-interest debt first. Mathematically optimal — saves the most total interest. Debt snowball: extra money to smallest balance first. Psychologically motivating — quick wins maintain momentum. Mathematically: avalanche saves more. Practically: if you need motivation to stay on track, snowball works better. Use our debt payoff calculator to compare both strategies for your specific debts.' },
    { q: 'Should I rent or buy a home in India in 2026?', a: 'Check the price-to-rent ratio: property price ÷ annual rent. Above 20 = renting likely smarter. Above 25 = renting clearly better. In Mumbai/Delhi, ratios reach 35–50, meaning renting and investing the difference typically outperforms buying. In tier-2 cities, ratios of 15–20 make buying more competitive. The key variable: what do you do with the down payment if you rent? Use our rent vs buy calculator with your specific numbers.' },
  ],
  'personal-finance': [
    { q: 'How does the 50/30/20 budget rule work with a ₹60,000/month salary?', a: '50% needs (₹30,000): rent, groceries, utilities, transport, loan minimums. 30% wants (₹18,000): dining, entertainment, shopping, subscriptions. 20% savings (₹12,000): SIP, emergency fund, debt prepayment. If your rent alone is ₹25,000, the needs bucket is 83% consumed before other necessities — this signals you need higher income or lower rent. Use our budget calculator to map your actual spending against the framework.' },
    { q: 'How much emergency fund should I have and how do I build it?', a: 'Target: 6 months of essential monthly expenses (rent + groceries + utilities + minimum loan payments + insurance). On ₹60,000 income with ₹35,000 essential expenses: target = ₹2.1 lakh. Where to keep it: liquid fund (6–7% return, withdrawable in 1 day) or high-yield savings account. How to build: dedicate 10–15% of income until the target is hit. Do NOT invest your emergency fund in equity — it must be immediately accessible.' },
    { q: 'What is net worth and how do I calculate mine?', a: 'Net worth = Total Assets – Total Liabilities. Assets: cash + bank balance + investments (mutual funds, stocks, PPF, EPF) + gold at current market price + property at market value. Liabilities: home loan outstanding + car loan + personal loan + credit card balance. Track quarterly — the trend matters more than the absolute number. Common benchmarks: age 30 = 1× annual salary; age 40 = 3×; age 50 = 7×. Use our net worth calculator for a complete picture.' },
    { q: 'What is the best way to save money on a middle-class salary in India?', a: 'Highest-impact actions in order: (1) Pay yourself first — SIP auto-debit on salary day. (2) Cancel unused subscriptions — average household pays ₹3,000–₹5,000/month on forgotten services. (3) Cook more — restaurants cost 5–10× home cooking. (4) Compare insurance annually — switching saves ₹5,000–₹20,000 on same coverage. (5) Reduce credit card interest — average user pays ₹8,000–₹15,000/year in interest. (6) Tax-harvest investments annually to reduce LTCG.' },
    { q: 'How do I start budgeting if I have never tracked expenses before?', a: 'Use the simplest possible system: three accounts. Account 1 (bills): fixed costs auto-debit (rent, EMIs, utilities, insurance). Account 2 (spending): fixed amount for variable spending — when empty, spending stops. Account 3 (savings): everything else. This eliminates the need to track every transaction. Review your UPI app spending summary monthly for category breakdowns. Do this for 3 months before building a detailed budget.' },
  ],
  tax: [
    { q: 'New tax regime vs old tax regime — which should I choose in India 2026?', a: 'New regime (default): lower rates but no deductions. Old regime: higher base rates but allows 80C (₹1.5L), 80D (₹25K), HRA, home loan interest (₹2L), LTA. Break-even: if total deductions exceed ₹3.75 lakh, old regime saves more. For most salaried employees in 20–30% bracket with a home loan, old regime wins. Without home loan, new regime often wins. Use our income tax calculator to compare both regimes with your specific numbers.' },
    { q: 'How do I maximise Section 80C deductions to save tax in India?', a: 'Section 80C limit: ₹1,50,000/year. Best options by return: ELSS mutual funds (3-year lock-in, 12–15% potential returns — best among 80C); PPF (7.1% guaranteed, 15-year lock-in); EPF (employer auto-deducts, 8.25%); home loan principal (counted automatically); life insurance premium. If EPF + home loan principal already exceeds ₹1.5L, you\'ve exhausted 80C without extra effort. If not, ELSS fills the gap most effectively.' },
    { q: 'How is HRA exemption calculated in India?', a: 'HRA exemption = minimum of: (a) Actual HRA received. (b) Rent paid – 10% of basic salary. (c) 50% of basic salary (metro) or 40% (non-metro). Example: Basic ₹50K/month, HRA ₹20K, rent ₹18K in Delhi. (a)=₹20K, (b)=₹18K–₹5K=₹13K, (c)=₹25K. Exemption = minimum = ₹13K/month = ₹1,56,000/year. Rent receipts required; PAN of landlord needed if annual rent exceeds ₹1 lakh.' },
    { q: 'How does UK income tax work and what is the 2026 personal allowance?', a: 'UK 2026/27: £12,570 personal allowance (tax-free). Basic rate 20%: £12,571–£50,270. Higher rate 40%: £50,271–£125,140. Additional rate 45%: above £125,140. Add National Insurance: 8% on £12,570–£50,270, 2% above. Total marginal rate at £50,270: 42%. Effective ways to reduce: pension contributions, salary sacrifice, ISA for savings/investment income.' },
    { q: 'What is GST and how do I calculate it on an invoice in India?', a: 'GST rates: 0% (essentials), 5% (household necessities), 12% (processed food), 18% (most services, electronics), 28% (luxury). Calculation: Amount × (1 + rate). ₹10,000 + 18% GST = ₹11,800. Reverse: GST in a GST-inclusive price = Total × rate ÷ (100 + rate). Use our GST calculator for both. B2B transactions require registration above ₹20 lakh annual turnover.' },
  ],
  health: [
    { q: 'How do I calculate my BMI and what does it mean?', a: 'BMI = weight (kg) ÷ height² (m). Example: 70kg, 1.75m → BMI = 70 ÷ 3.0625 = 22.9. WHO ranges: Under 18.5 = Underweight, 18.5–24.9 = Normal, 25–29.9 = Overweight, 30+ = Obese. Important: BMI does not distinguish muscle from fat — a bodybuilder may have BMI 28 with very low body fat. For Asian populations, the Indian guideline uses 23+ as overweight threshold. Use BMI alongside waist circumference for context.' },
    { q: 'What is TDEE and how do I use it for weight loss?', a: 'TDEE = BMR × activity factor. Activity factors: Sedentary = ×1.2, Light activity = ×1.375, Moderate (3–5 days exercise) = ×1.55, Very active = ×1.725. For weight loss: eat 300–500 kcal below TDEE to lose 0.3–0.5 kg/week. More than 500 kcal deficit risks muscle loss. Use our TDEE calculator to get your specific maintenance calories before setting a target.' },
    { q: 'How many calories should I eat per day to lose weight safely?', a: 'Safe deficit: 300–500 kcal/day below TDEE, producing 0.3–0.5 kg/week. Never go below 1,200 kcal/day (women) or 1,500 kcal/day (men) without medical supervision. Prioritise protein at 1.6–2.2g per kg body weight during deficit — it protects muscle mass. The common advice to eat 1,200 calories is insufficient for most adults. Use our calorie calculator to find your specific target.' },
    { q: 'What is the difference between BMR and TDEE?', a: 'BMR (Basal Metabolic Rate) = calories burned at complete rest — heartbeat, breathing, organ function. TDEE = BMR × activity factor = actual daily calorie burn. Common mistake: using BMR as a calorie target. If your BMR is 1,500 kcal and you eat 1,500 while exercising, you are in a significant calorie deficit. Always use TDEE (not BMR) as your maintenance calorie reference point.' },
  ],
  property: [
    { q: 'How do I calculate rental yield on a property in the UK?', a: 'Gross yield = (Annual rent ÷ Property price) × 100. Example: £250,000 property, £1,200/month rent (£14,400/year). Gross yield = 5.76%. Net yield: subtract mortgage interest, agent fees (10–15%), maintenance (1%/year), insurance, void periods. Net yield on this example: ~3.5–4%. Above 6% gross (4%+ net) is considered good in the UK. Use our rental yield calculator for complete net yield breakdown.' },
    { q: 'How much is UK stamp duty in 2026?', a: 'Standard SDLT rates 2026: 0% on first £250,000, 5% on £250,001–£925,000, 10% on £925,001–£1.5M, 12% above. First-time buyers: 0% up to £425,000, 5% on £425,001–£625,000. Second homes: +3% surcharge. Example first-time buyer at £400,000 = £0 stamp duty. Owner-occupier at £500,000 = (£250,000 × 0%) + (£250,000 × 5%) = £12,500. Use our stamp duty calculator for any scenario.' },
    { q: 'Is it better to rent or buy in the UK in 2026?', a: 'UK price-to-rent ratio: 22–28 in most cities (30+ in London). At 5% mortgage rate on 90% LTV, monthly ownership cost typically exceeds rent by 15–25% for the same property. Under 5 years planned stay: renting almost always wins due to transaction costs. Over 7 years in a stable area: buying builds equity. Use our rent vs buy calculator with your specific numbers for a definitive answer.' },
    { q: 'How much deposit do I need to buy a house in the UK in 2026?', a: 'Minimum: 5% (higher rates, limited lenders). Standard: 10% (broader choice, better rates). Optimal: 15–25% (best rates). On £300,000: 5% = £15,000; 10% = £30,000; 25% = £75,000. Additional costs: stamp duty, solicitor £1,000–£3,000, survey £500–£1,500, mortgage arrangement £0–£2,000. Total cash for a £300,000 first-time buyer purchase with 10% deposit: approximately £33,000–£38,000 including all costs.' },
    { q: 'What is the difference between buy-to-let and residential mortgages?', a: 'Buy-to-let: 25% deposit minimum, higher rates (+0.5–1.5%), assessed on rental income (must cover 125–145% of payments), usually interest-only. Residential: 5% deposit possible, lower rates, assessed on personal income. Key tax: Section 24 means buy-to-let mortgage interest is not fully deductible — landlords get 20% tax credit, significantly disadvantaging higher-rate taxpayers. Use our buy-to-let calculator to model post-tax returns before committing.' },
  ],
  commodity: [
    { q: 'Physical gold vs Gold ETF vs Sovereign Gold Bond — which is best in India 2026?', a: 'Physical gold: full ownership but 8–25% making charges lost on resale, storage cost. Gold ETF: tracks 24K spot, no making charges, sell instantly, 0.5% expense ratio. Sovereign Gold Bond: gold price + 2.5% annual interest, capital gains tax-free at maturity (8 years), no storage. Best for investment: SGBs clearly win for 8-year hold. For shorter periods, Gold ETF. Physical gold only if you need jewellery. Use our calculators to model each option with your specific amount.' },
    { q: 'How do I calculate the value of my gold jewellery in India?', a: 'Step 1: Note karat marking (22K, 18K). Step 2: Weigh the piece. Step 3: Check live 24K price per gram on our calculator. Step 4: Multiply by purity factor (22K = 0.9167, 18K = 0.75). Example: 20g of 22K gold at ₹7,800/g (24K) = 20 × (₹7,800 × 0.9167) = ₹1,43,000 metal value. Dealer buyback typically pays 90–95% = ₹1,28,000–₹1,35,000.' },
    { q: 'How does a gold loan work in India?', a: 'Process: pledge gold jewellery at NBFC (Muthoot, Manappuram) or bank, get loan in 30 minutes. Maximum LTV: 75% of gold value (RBI regulation). Rates: banks 8–11% p.a., NBFCs 12–24% p.a. Gold loan vs personal loan: gold loan is always cheaper if you have idle gold. Repay and get gold back. Use our gold loan calculator to compute eligible amount, EMI, and total interest for your specific gold weight and karat.' },
    { q: 'Is silver a better investment than gold in India right now?', a: 'The gold-silver ratio (gold ÷ silver price) currently sits at ~85–90:1 vs a 30-year average of ~65:1. When above 80, silver is historically undervalued relative to gold. Silver also has industrial demand (solar panels, EVs, electronics) that gold lacks. However, silver is significantly more volatile. For conservative investors: 5–10% silver within precious metals. For aggressive: up to 20–25% given current ratio. Track both with our live price calculators.' },
    { q: 'What does crude oil price do to everyday expenses in India?', a: 'India imports ~85% of crude oil. A $10/barrel rise increases petrol pump prices by approximately ₹2–4/litre, depending on government pass-through decisions. Beyond fuel: crude oil impacts fertiliser prices (correlated with natural gas), plastic products, paints, cosmetics, and air travel. When oil rises, inflation typically follows 6–8 weeks later across these categories. Watch our live crude oil calculator for real-time WTI and Brent prices.' },
  ],
}

const CAT_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  investment:        { bg:'bg-green-50',  border:'border-green-200',  text:'text-green-700',  badge:'bg-green-100 text-green-700'  },
  retirement:        { bg:'bg-blue-50',   border:'border-blue-200',   text:'text-blue-700',   badge:'bg-blue-100 text-blue-700'    },
  loans:             { bg:'bg-yellow-50', border:'border-yellow-200', text:'text-yellow-700', badge:'bg-yellow-100 text-yellow-700' },
  'personal-finance':{ bg:'bg-purple-50', border:'border-purple-200', text:'text-purple-700', badge:'bg-purple-100 text-purple-700' },
  tax:               { bg:'bg-red-50',    border:'border-red-200',    text:'text-red-700',    badge:'bg-red-100 text-red-700'      },
  health:            { bg:'bg-rose-50',   border:'border-rose-200',   text:'text-rose-700',   badge:'bg-rose-100 text-rose-700'    },
  property:          { bg:'bg-orange-50', border:'border-orange-200', text:'text-orange-700', badge:'bg-orange-100 text-orange-700' },
  commodity:         { bg:'bg-amber-50',  border:'border-amber-200',  text:'text-amber-700',  badge:'bg-amber-100 text-amber-700'  },
}

const CAT_CALCS: Record<string, { emoji:string; name:string; href:string; desc:string }[]> = {
  investment: [
    {emoji:'📈',name:'SIP Calculator',       href:'/calculators/finance/sip-calculator',              desc:'Monthly SIP returns over any period'},
    {emoji:'💰',name:'Lumpsum Calculator',   href:'/calculators/finance/lumpsum-calculator',          desc:'One-time investment growth at any CAGR'},
    {emoji:'📊',name:'CAGR Calculator',      href:'/calculators/finance/cagr-calculator',             desc:'Actual annual return on any investment'},
    {emoji:'🚀',name:'Step-Up SIP',          href:'/calculators/finance/step-up-sip-calculator',      desc:'SIP with annual increase — real wealth builder'},
    {emoji:'⚖️',name:'SIP vs Gold',          href:'/calculators/finance/sip-vs-gold-calculator',      desc:'Has SIP beaten gold over your period?'},
    {emoji:'📉',name:'Compound Interest',    href:'/calculators/finance/compound-interest-calculator', desc:'Power of compounding over decades'},
  ],
  retirement: [
    {emoji:'🌅',name:'Retirement Calculator',href:'/calculators/finance/retirement-calculator',     desc:'How much corpus to retire comfortably'},
    {emoji:'🔥',name:'FIRE Calculator',      href:'/calculators/finance/fire-calculator',           desc:'FIRE number and early retirement timeline'},
    {emoji:'🏛️',name:'NPS Calculator',       href:'/calculators/finance/nps-calculator',            desc:'National Pension System corpus estimator'},
    {emoji:'💎',name:'PPF Calculator',       href:'/calculators/finance/ppf-calculator',            desc:'PPF maturity and tax benefit calculator'},
    {emoji:'🇺🇸',name:'401k Calculator',    href:'/calculators/finance/401k-calculator',           desc:'US retirement savings growth estimator'},
    {emoji:'🇬🇧',name:'UK Pension',         href:'/calculators/finance/uk-pension-calculator',     desc:'SIPP and workplace pension calculator'},
  ],
  loans: [
    {emoji:'🏦',name:'EMI Calculator',       href:'/calculators/finance/emi-calculator',            desc:'Monthly EMI for any loan instantly'},
    {emoji:'🏠',name:'Home Loan Calculator', href:'/calculators/finance/home-loan-calculator',      desc:'Home loan EMI, total interest & amortization'},
    {emoji:'⚡',name:'Loan Prepayment',      href:'/calculators/finance/loan-prepayment-calculator',desc:'How much prepayment saves you'},
    {emoji:'💳',name:'Debt Payoff',          href:'/calculators/finance/debt-payoff-calculator',    desc:'Fastest debt-free path — avalanche vs snowball'},
    {emoji:'🪙',name:'Gold Loan',            href:'/commodities/gold-loan-calculator',              desc:'Eligible loan amount against your gold'},
    {emoji:'📊',name:'Loan Comparison',      href:'/calculators/finance/loan-comparison-calculator',desc:'Compare 2 loan offers side by side'},
  ],
  'personal-finance': [
    {emoji:'💡',name:'Budget Calculator',    href:'/calculators/finance/budget-calculator',         desc:'50/30/20 budget — map your spending'},
    {emoji:'🏦',name:'Emergency Fund',       href:'/calculators/finance/emergency-fund-calculator', desc:'How much emergency fund you need'},
    {emoji:'💎',name:'Net Worth Calculator', href:'/calculators/finance/net-worth-calculator',      desc:'Total assets minus liabilities — your real number'},
    {emoji:'💰',name:'Savings Rate',         href:'/calculators/finance/savings-rate-calculator',   desc:'What % of income are you saving?'},
    {emoji:'📈',name:'Savings Goal',         href:'/calculators/finance/savings-goal-calculator',   desc:'How long to reach any savings target'},
    {emoji:'📊',name:'Budget Planner',       href:'/calculators/finance/budget-planner-calculator', desc:'Detailed monthly budget planner'},
  ],
  tax: [
    {emoji:'📋',name:'Income Tax Calculator',href:'/calculators/finance/income-tax-calculator',    desc:'New vs old regime — India 2026 comparison'},
    {emoji:'🏠',name:'HRA Calculator',       href:'/calculators/finance/hra-calculator',           desc:'Exact HRA exemption tax saving on rent'},
    {emoji:'📊',name:'GST Calculator',       href:'/calculators/finance/gst-calculator',           desc:'Add or remove GST from any amount'},
    {emoji:'🇬🇧',name:'UK Tax Calculator',  href:'/calculators/finance/uk-income-tax-calculator', desc:'UK income tax + NI for any salary 2026'},
    {emoji:'🇪🇺',name:'VAT Calculator',     href:'/calculators/finance/vat-calculator-europe',    desc:'European VAT calculation any rate'},
    {emoji:'💰',name:'Tax Bracket',          href:'/calculators/finance/tax-bracket-calculator',   desc:'Which tax bracket? USA tax brackets 2026'},
  ],
  health: [
    {emoji:'⚖️',name:'BMI Calculator',       href:'/calculators/health/bmi-calculator',            desc:'Body mass index with health range context'},
    {emoji:'🔥',name:'Calorie Calculator',   href:'/calculators/health/calorie-calculator',        desc:'Daily calories by age, weight, activity level'},
    {emoji:'💪',name:'TDEE Calculator',      href:'/calculators/health/tdee-calculator',           desc:'Total daily energy expenditure for your body'},
    {emoji:'🧠',name:'BMR Calculator',       href:'/calculators/health/bmr-calculator',            desc:'Calories burned at complete rest'},
    {emoji:'📏',name:'Body Fat Calculator',  href:'/calculators/health/body-fat-calculator',       desc:'Estimate body fat % from measurements'},
    {emoji:'🥩',name:'Macro Calculator',     href:'/calculators/health/macro-calculator',          desc:'Protein, carbs, fat targets for your goal'},
  ],
  property: [
    {emoji:'🏠',name:'Rental Yield',         href:'/calculators/finance/rental-yield-calculator',  desc:'Gross and net rental yield calculator'},
    {emoji:'🇬🇧',name:'Stamp Duty',          href:'/calculators/finance/uk-stamp-duty-calculator', desc:'UK stamp duty for any property price 2026'},
    {emoji:'🏦',name:'UK Mortgage',          href:'/calculators/finance/mortgage-calculator',      desc:'Monthly mortgage payment and total cost'},
    {emoji:'🏡',name:'Rent vs Buy',          href:'/calculators/finance/rent-vs-buy-calculator',   desc:'Which is cheaper over your time horizon?'},
    {emoji:'📊',name:'Buy-to-Let Analysis',  href:'/calculators/finance/uk-buy-to-let-vs-stocks-calculator',desc:'BTL vs stock market returns'},
    {emoji:'💰',name:'Property ROI',         href:'/calculators/finance/real-estate-roi-calculator',desc:'Total return on any property investment'},
  ],
  commodity: [
    {emoji:'🥇',name:'Gold Price Calculator',href:'/commodities/gold-price-calculator',            desc:'Live gold — 24K to 10K per gram & tola'},
    {emoji:'🥈',name:'Silver Calculator',    href:'/commodities/silver-price-calculator',          desc:'Live silver by purity — 999, 925, 900, 800'},
    {emoji:'💰',name:'Precious Metals P&L',  href:'/commodities/precious-metals-profit-calculator',desc:'ROI & break-even on any metal trade'},
    {emoji:'🏦',name:'Gold Loan Calculator', href:'/commodities/gold-loan-calculator',             desc:'Loan amount against your gold at 75% LTV'},
    {emoji:'⚖️',name:'SIP vs Gold',          href:'/calculators/finance/sip-vs-gold-calculator',  desc:'Has equity SIP beaten gold over your period?'},
    {emoji:'🗂️',name:'Portfolio Tracker',    href:'/commodities/commodity-portfolio-tracker',      desc:'All 4 metals at live prices — total P&L'},
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = blogCategories.find(c => c.slug === params.slug)
  if (!cat) return {}
  const meta = CAT_META[params.slug]
  if (!meta) return {
    title: `${cat.name} Articles — Financial Calculator Blog 2026`,
    description: `Expert guides on ${cat.name.toLowerCase()}. ${cat.desc}. Free calculators included.`,
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `https://tooltrio.app/blog/category/${params.slug}` },
    openGraph: { title: meta.title, description: meta.description, type: 'website' },
  }
}

/* ─── FAQ client component lives separately to avoid 'use client' mixing ── */
function FAQItem({ faq, index, isOpen, onToggle }: { faq:{q:string;a:string}; index:number; isOpen:boolean; onToggle:()=>void }) {
  return (
    <div className={`bg-white rounded-2xl border transition-all ${isOpen ? 'border-green-300 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
      <button onClick={onToggle} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left" aria-expanded={isOpen}>
        <span className="font-bold text-gray-900 text-sm leading-snug">{faq.q}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <div className="h-px bg-gray-100 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

import { FAQAccordion } from './FAQAccordion'

export default function CategoryPage({ params }: Props) {
  const cat = blogCategories.find(c => c.slug === params.slug)
  if (!cat) notFound()

  const posts = blogPosts.filter(p => p.categorySlug === params.slug)
  const meta  = CAT_META[params.slug]
  const faqs  = CAT_FAQS[params.slug] ?? []
  const colors = CAT_COLORS[params.slug] ?? CAT_COLORS['investment']
  const calcs  = CAT_CALCS[params.slug] ?? []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm" aria-label="breadcrumb">
          <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/blog" className="text-gray-500 hover:text-green-600">Blog</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">{cat!.name}</span>
        </nav>

        {/* Hero */}
        <div className={`${colors.bg} ${colors.border} border-2 rounded-3xl p-8 mb-10`}>
          <div className="flex items-start gap-4 mb-4 flex-wrap">
            <span className="text-5xl">{cat!.icon}</span>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                {meta ? meta.h1 : cat!.name}
              </h1>
              <p className={`${colors.text} font-bold text-sm mt-1`}>{posts.length} expert guides · Free calculators included</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {[{label:'Articles',val:String(posts.length)},{label:'Free Calculators',val:String(calcs.length)},{label:'Reading Time',val:'5–15 min'},{label:'Updated',val:'2026'}].map(s=>(
              <div key={s.label} className="bg-white rounded-xl px-4 py-2 border border-gray-100">
                <p className={`text-lg font-black ${colors.text}`}>{s.val}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm max-w-3xl">{cat!.desc}. Step-by-step guides with worked examples and free calculators.</p>
        </div>

        {/* SEO Intro */}
        {meta && (
          <section className="mb-10 max-w-4xl">
            <h2 className="text-2xl font-black text-gray-900 mb-4">What You Will Learn in {cat!.name}</h2>
            <div className="space-y-4">
              {meta.intro.split('\n\n').filter(Boolean).map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed text-sm">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Related Calculators */}
        {calcs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-black text-gray-900 mb-2">🧮 Free Calculators in This Category</h2>
            <p className="text-sm text-gray-500 mb-4">Every guide links to one of these — run your own numbers.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {calcs.map(c => (
                <Link key={c.href} href={c.href} className={`group bg-white rounded-2xl border border-gray-100 hover:${colors.border} hover:shadow-md transition-all p-4 flex flex-col gap-2`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.emoji}</span>
                    <p className={`font-black text-gray-900 text-sm group-hover:${colors.text} leading-tight`}>{c.name}</p>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed flex-1">{c.desc}</p>
                  <span className={`text-xs font-bold ${colors.text} flex items-center gap-1 mt-auto`}>Open <ArrowRight className="w-3 h-3" /></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-5">📚 All {cat!.name} Articles ({posts.length})</h2>
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-lg mb-4">No articles yet. Check back soon!</p>
              <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700">
                <ArrowLeft className="w-4 h-4" /> All Articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-green-400 hover:shadow-xl transition-all p-6 flex flex-col shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-black text-gray-900 group-hover:text-green-700 transition-colors mb-2 leading-snug text-sm">{post.title}</h3>
                  <p className="text-xs text-gray-500 flex-1 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                    <span className="text-xs font-bold text-green-600 flex items-center gap-0.5 group-hover:gap-1 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <FAQAccordion faqs={faqs} colorText={colors.text} />
        )}

        {/* Long-tail keyword signals block */}
        {meta && (
          <section className={`${colors.bg} ${colors.border} border rounded-2xl p-6 mb-10 max-w-4xl`}>
            <h2 className={`text-xl font-black ${colors.text} mb-4`}>📖 Topics Covered in {cat!.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {meta.keywords.map((kw, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-sm font-bold ${colors.text} flex-shrink-0`}>✓</span>
                  <p className="text-sm text-gray-700 capitalize">{kw}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">All topics above are covered in the guides in this category, with free calculators for each.</p>
          </section>
        )}

        {/* Bottom nav */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-100">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-green-300 text-green-700 font-bold hover:bg-green-50">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex flex-wrap gap-2">
            {blogCategories.filter(c => c.slug !== params.slug).slice(0, 4).map(c => (
              <Link key={c.slug} href={`/blog/category/${c.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm">
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
