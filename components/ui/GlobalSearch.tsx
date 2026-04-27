'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, X, TrendingUp, Heart, Zap, Smile, BookOpen, BarChart2 } from 'lucide-react'

const ITEMS: { name: string; href: string; cat: string }[] = [
  // -- Finance ----------------------------------------------
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', cat: 'Finance' },
  { name: '401k Early Withdrawal vs Loan Calculator', href: '/calculators/finance/401k-early-withdrawal-vs-loan-calculator', cat: 'Finance' },
  { name: '401k vs Pension Calculator', href: '/calculators/finance/401k-vs-pension-calculator', cat: 'Finance' },
  { name: '401k vs Roth IRA Calculator', href: '/calculators/finance/401k-vs-roth-ira-calculator', cat: 'Finance' },
  { name: '401k vs Taxable Account Calculator', href: '/calculators/finance/401k-vs-taxable-account-calculator', cat: 'Finance' },
  { name: '529 vs Roth IRA Education Calculator', href: '/calculators/finance/529-vs-roth-ira-education-calculator', cat: 'Finance' },
  { name: '529 vs Utma Calculator', href: '/calculators/finance/529-vs-utma-calculator', cat: 'Finance' },
  { name: 'Annual Income Calculator', href: '/calculators/finance/annual-income-calculator', cat: 'Finance' },
  { name: 'Annuity vs Lumpsum Calculator', href: '/calculators/finance/annuity-vs-lumpsum-calculator', cat: 'Finance' },
  { name: 'Auto Loan Calculator', href: '/calculators/finance/auto-loan-calculator', cat: 'Finance' },
  { name: 'Biweekly Mortgage Calculator', href: '/calculators/finance/biweekly-mortgage-calculator', cat: 'Finance' },
  { name: 'Bonds vs Cds USA Calculator', href: '/calculators/finance/bonds-vs-cds-usa-calculator', cat: 'Finance' },
  { name: 'Break Even Calculator', href: '/calculators/finance/break-even-calculator', cat: 'Finance' },
  { name: 'Budget Calculator', href: '/calculators/finance/budget-calculator', cat: 'Finance' },
  { name: 'Budget Planner Calculator', href: '/calculators/finance/budget-planner-calculator', cat: 'Finance' },
  { name: 'Business Loan Calculator', href: '/calculators/finance/business-loan-calculator', cat: 'Finance' },
  { name: 'CAGR Calculator', href: '/calculators/finance/cagr-calculator', cat: 'Finance' },
  { name: 'Car Depreciation Calculator', href: '/calculators/finance/car-depreciation-calculator', cat: 'Finance' },
  { name: 'Car Loan Calculator', href: '/calculators/finance/car-loan-calculator', cat: 'Finance' },
  { name: 'Cash Out Refinance vs HELOC Calculator', href: '/calculators/finance/cash-out-refinance-vs-heloc-calculator', cat: 'Finance' },
  { name: 'CD Ladder Calculator', href: '/calculators/finance/cd-ladder-calculator', cat: 'Finance' },
  { name: 'CD vs HYSA Calculator', href: '/calculators/finance/cd-vs-hysa-calculator', cat: 'Finance' },
  { name: 'Closing Cost Calculator', href: '/calculators/finance/closing-cost-calculator', cat: 'Finance' },
  { name: 'College Cost Calculator', href: '/calculators/finance/college-cost-calculator', cat: 'Finance' },
  { name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator', cat: 'Finance' },
  { name: 'Credit Card Payoff Calculator', href: '/calculators/finance/credit-card-payoff-calculator', cat: 'Finance' },
  { name: 'Crypto Profit Calculator', href: '/calculators/finance/crypto-profit-calculator', cat: 'Finance' },
  { name: 'Currency Converter', href: '/calculators/finance/currency-converter', cat: 'Finance' },
  { name: 'Currency Profit Calculator', href: '/calculators/finance/currency-profit-calculator', cat: 'Finance' },
  { name: 'Debt Payoff Calculator', href: '/calculators/finance/debt-payoff-calculator', cat: 'Finance' },
  { name: 'Dividend Calculator', href: '/calculators/finance/dividend-calculator', cat: 'Finance' },
  { name: 'Dividend Growth vs Growth Stocks Calculator', href: '/calculators/finance/dividend-growth-vs-growth-stocks-calculator', cat: 'Finance' },
  { name: 'Dollar Cost Averaging vs Lumpsum USA Calculator', href: '/calculators/finance/dollar-cost-averaging-vs-lumpsum-usa-calculator', cat: 'Finance' },
  { name: 'Down Payment Calculator', href: '/calculators/finance/down-payment-calculator', cat: 'Finance' },
  { name: 'Education Goal Calculator', href: '/calculators/finance/education-goal-calculator', cat: 'Finance' },
  { name: 'ELSS vs NPS Calculator', href: '/calculators/finance/elss-vs-nps-calculator', cat: 'Finance' },
  { name: 'ELSS vs PPF Calculator', href: '/calculators/finance/elss-vs-ppf-calculator', cat: 'Finance' },
  { name: 'Emergency Fund Calculator', href: '/calculators/finance/emergency-fund-calculator', cat: 'Finance' },
  { name: 'EMI Calculator', href: '/calculators/finance/emi-calculator', cat: 'Finance' },
  { name: 'EMI vs SIP Calculator', href: '/calculators/finance/emi-vs-sip-calculator', cat: 'Finance' },
  { name: 'EPF vs NPS Calculator', href: '/calculators/finance/epf-vs-nps-calculator', cat: 'Finance' },
  { name: 'Euro Auto Loan Calculator', href: '/calculators/finance/euro-auto-loan-calculator', cat: 'Finance' },
  { name: 'Euro Bonds vs ETF Calculator', href: '/calculators/finance/euro-bonds-vs-etf-calculator', cat: 'Finance' },
  { name: 'Europe ETF vs Property Calculator', href: '/calculators/finance/europe-etf-vs-property-calculator', cat: 'Finance' },
  { name: 'Europe Growth vs Value ETF Calculator', href: '/calculators/finance/europe-growth-vs-value-etf-calculator', cat: 'Finance' },
  { name: 'Europe Msci World vs S&P500 Calculator', href: '/calculators/finance/europe-msci-world-vs-sp500-calculator', cat: 'Finance' },
  { name: 'Europe Property vs REIT Calculator', href: '/calculators/finance/europe-property-vs-reit-calculator', cat: 'Finance' },
  { name: 'European Mortgage Calculator', href: '/calculators/finance/european-mortgage-calculator', cat: 'Finance' },
  { name: 'FD Calculator', href: '/calculators/finance/fd-calculator', cat: 'Finance' },
  { name: 'FD Comparison Calculator', href: '/calculators/finance/fd-comparison-calculator', cat: 'Finance' },
  { name: 'FIRE Calculator', href: '/calculators/finance/fire-calculator', cat: 'Finance' },
  { name: 'FIRE Europe Calculator', href: '/calculators/finance/fire-europe-calculator', cat: 'Finance' },
  { name: 'France PEA vs Assurance Vie Calculator', href: '/calculators/finance/france-pea-vs-assurance-vie-calculator', cat: 'Finance' },
  { name: 'Germany ETF vs Tagesgeld Calculator', href: '/calculators/finance/germany-etf-vs-tagesgeld-calculator', cat: 'Finance' },
  { name: 'Government Bond Calculator', href: '/calculators/finance/government-bond-calculator', cat: 'Finance' },
  { name: 'Gratuity Calculator', href: '/calculators/finance/gratuity-calculator', cat: 'Finance' },
  { name: 'Gst Calculator', href: '/calculators/finance/gst-calculator', cat: 'Finance' },
  { name: 'HELOC Calculator', href: '/calculators/finance/heloc-calculator', cat: 'Finance' },
  { name: 'Home Affordability Calculator', href: '/calculators/finance/home-affordability-calculator', cat: 'Finance' },
  { name: 'Home Loan Calculator', href: '/calculators/finance/home-loan-calculator', cat: 'Finance' },
  { name: 'HRA Calculator', href: '/calculators/finance/hra-calculator', cat: 'Finance' },
  { name: 'HSA vs FSA Calculator', href: '/calculators/finance/hsa-vs-fsa-calculator', cat: 'Finance' },
  { name: 'I Bonds vs Tips Calculator', href: '/calculators/finance/i-bonds-vs-tips-calculator', cat: 'Finance' },
  { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', cat: 'Finance' },
  { name: 'Index Fund vs ETF Calculator', href: '/calculators/finance/index-fund-vs-etf-calculator', cat: 'Finance' },
  { name: 'Inflation Calculator', href: '/calculators/finance/inflation-calculator', cat: 'Finance' },
  { name: 'Inflation Protected Bonds vs Stocks Calculator', href: '/calculators/finance/inflation-protected-bonds-vs-stocks-calculator', cat: 'Finance' },
  { name: 'Interest Rate Calculator', href: '/calculators/finance/interest-rate-calculator', cat: 'Finance' },
  { name: 'Invoice Calculator', href: '/calculators/finance/invoice-calculator', cat: 'Finance' },
  { name: 'ISA Calculator', href: '/calculators/finance/isa-calculator', cat: 'Finance' },
  { name: 'ISA vs SIPp UK Calculator', href: '/calculators/finance/isa-vs-sipp-uk-calculator', cat: 'Finance' },
  { name: 'Lease vs Buy Calculator', href: '/calculators/finance/lease-vs-buy-calculator', cat: 'Finance' },
  { name: 'Loan Comparison Calculator', href: '/calculators/finance/loan-comparison-calculator', cat: 'Finance' },
  { name: 'Loan Prepayment Calculator', href: '/calculators/finance/loan-prepayment-calculator', cat: 'Finance' },
  { name: 'Lumpsum Calculator', href: '/calculators/finance/lumpsum-calculator', cat: 'Finance' },
  { name: 'Lumpsum vs Gold Calculator', href: '/calculators/finance/lumpsum-vs-gold-calculator', cat: 'Finance' },
  { name: 'Lumpsum vs SIP Calculator', href: '/calculators/finance/lumpsum-vs-sip-calculator', cat: 'Finance' },
  { name: 'Medicare vs Private Insurance Calculator', href: '/calculators/finance/medicare-vs-private-insurance-calculator', cat: 'Finance' },
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', cat: 'Finance' },
  { name: 'Mortgage Refinance Calculator', href: '/calculators/finance/mortgage-refinance-calculator', cat: 'Finance' },
  { name: 'Mortgage vs Renting USA Calculator', href: '/calculators/finance/mortgage-vs-renting-usa-calculator', cat: 'Finance' },
  { name: 'Municipal Bonds vs Corporate Bonds Calculator', href: '/calculators/finance/municipal-bonds-vs-corporate-bonds-calculator', cat: 'Finance' },
  { name: 'Mutual Fund Calculator', href: '/calculators/finance/mutual-fund-calculator', cat: 'Finance' },
  { name: 'Mutual Fund Return Calculator', href: '/calculators/finance/mutual-fund-return-calculator', cat: 'Finance' },
  { name: 'Mutual Fund vs FD Calculator', href: '/calculators/finance/mutual-fund-vs-fd-calculator', cat: 'Finance' },
  { name: 'Net Worth Calculator', href: '/calculators/finance/net-worth-calculator', cat: 'Finance' },
  { name: 'Netherlands AOW vs Private Pension Calculator', href: '/calculators/finance/netherlands-aow-vs-private-pension-calculator', cat: 'Finance' },
  { name: 'NPS Calculator', href: '/calculators/finance/nps-calculator', cat: 'Finance' },
  { name: 'NSC vs FD Calculator', href: '/calculators/finance/nsc-vs-fd-calculator', cat: 'Finance' },
  { name: 'NSC vs PPF Calculator', href: '/calculators/finance/nsc-vs-ppf-calculator', cat: 'Finance' },
  { name: 'Offset Mortgage vs Savings UK Calculator', href: '/calculators/finance/offset-mortgage-vs-savings-uk-calculator', cat: 'Finance' },
  { name: 'Pay Off Mortgage vs Invest Calculator', href: '/calculators/finance/pay-off-mortgage-vs-invest-calculator', cat: 'Finance' },
  { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', cat: 'Finance' },
  { name: 'Payoff Date Calculator', href: '/calculators/finance/payoff-date-calculator', cat: 'Finance' },
  { name: 'P/E Ratio Calculator', href: '/calculators/finance/pe-ratio-calculator', cat: 'Finance' },
  { name: 'Personal Loan Calculator', href: '/calculators/finance/personal-loan-calculator', cat: 'Finance' },
  { name: 'PPF Calculator', href: '/calculators/finance/ppf-calculator', cat: 'Finance' },
  { name: 'PPF vs FD Calculator', href: '/calculators/finance/ppf-vs-fd-calculator', cat: 'Finance' },
  { name: 'PPF vs NPS Calculator', href: '/calculators/finance/ppf-vs-nps-calculator', cat: 'Finance' },
  { name: 'RD Calculator', href: '/calculators/finance/rd-calculator', cat: 'Finance' },
  { name: 'Real Estate ROI Calculator', href: '/calculators/finance/real-estate-roi-calculator', cat: 'Finance' },
  { name: 'Real Return Calculator', href: '/calculators/finance/real-return-calculator', cat: 'Finance' },
  { name: 'Refinance vs Invest Calculator', href: '/calculators/finance/refinance-vs-invest-calculator', cat: 'Finance' },
  { name: 'REIT vs Direct Property USA Calculator', href: '/calculators/finance/reit-vs-direct-property-usa-calculator', cat: 'Finance' },
  { name: 'Rent vs Buy Calculator', href: '/calculators/finance/rent-vs-buy-calculator', cat: 'Finance' },
  { name: 'Rental Yield Calculator', href: '/calculators/finance/rental-yield-calculator', cat: 'Finance' },
  { name: 'Retirement Calculator', href: '/calculators/finance/retirement-calculator', cat: 'Finance' },
  { name: 'ROI Calculator', href: '/calculators/finance/roi-calculator', cat: 'Finance' },
  { name: 'Roth Conversion Calculator', href: '/calculators/finance/roth-conversion-calculator', cat: 'Finance' },
  { name: 'Roth IRA Calculator', href: '/calculators/finance/roth-ira-calculator', cat: 'Finance' },
  { name: 'Roth IRA vs 401k Employer Match Calculator', href: '/calculators/finance/roth-ira-vs-401k-employer-match-calculator', cat: 'Finance' },
  { name: 'Roth IRA vs HSA Calculator', href: '/calculators/finance/roth-ira-vs-hsa-calculator', cat: 'Finance' },
  { name: 'Roth IRA vs Traditional IRA Calculator', href: '/calculators/finance/roth-ira-vs-traditional-ira-calculator', cat: 'Finance' },
  { name: 'Salary Calculator', href: '/calculators/finance/salary-calculator', cat: 'Finance' },
  { name: 'Salary Hike Calculator', href: '/calculators/finance/salary-hike-calculator', cat: 'Finance' },
  { name: 'Savings Goal Calculator', href: '/calculators/finance/savings-goal-calculator', cat: 'Finance' },
  { name: 'Savings Rate Calculator', href: '/calculators/finance/savings-rate-calculator', cat: 'Finance' },
  { name: 'Senior Citizen Savings vs FD Calculator', href: '/calculators/finance/senior-citizen-savings-vs-fd-calculator', cat: 'Finance' },
  { name: 'Sep IRA vs Solo 401k Calculator', href: '/calculators/finance/sep-ira-vs-solo-401k-calculator', cat: 'Finance' },
  { name: 'Simple Interest Calculator', href: '/calculators/finance/simple-interest-calculator', cat: 'Finance' },
  { name: 'SIP Calculator', href: '/calculators/finance/sip-calculator', cat: 'Finance' },
  { name: 'SIP vs Bonds Calculator', href: '/calculators/finance/sip-vs-bonds-calculator', cat: 'Finance' },
  { name: 'SIP vs Crypto Calculator', href: '/calculators/finance/sip-vs-crypto-calculator', cat: 'Finance' },
  { name: 'SIP vs Endowment Calculator', href: '/calculators/finance/sip-vs-endowment-calculator', cat: 'Finance' },
  { name: 'SIP vs FD Calculator', href: '/calculators/finance/sip-vs-fd-calculator', cat: 'Finance' },
  { name: 'SIP vs Gold Calculator', href: '/calculators/finance/sip-vs-gold-calculator', cat: 'Finance' },
  { name: 'SIP vs Mutual Fund Direct Plan Calculator', href: '/calculators/finance/sip-vs-mutual-fund-direct-plan-calculator', cat: 'Finance' },
  { name: 'SIP vs NPS Calculator', href: '/calculators/finance/sip-vs-nps-calculator', cat: 'Finance' },
  { name: 'SIP vs PPF Calculator', href: '/calculators/finance/sip-vs-ppf-calculator', cat: 'Finance' },
  { name: 'SIP vs RD Calculator', href: '/calculators/finance/sip-vs-rd-calculator', cat: 'Finance' },
  { name: 'SIP vs Real Estate Calculator', href: '/calculators/finance/sip-vs-real-estate-calculator', cat: 'Finance' },
  { name: 'SIP vs Savings Account Calculator', href: '/calculators/finance/sip-vs-savings-account-calculator', cat: 'Finance' },
  { name: 'SIP vs Stocks Calculator', href: '/calculators/finance/sip-vs-stocks-calculator', cat: 'Finance' },
  { name: 'Social Security Calculator', href: '/calculators/finance/social-security-calculator', cat: 'Finance' },
  { name: 'Social Security vs Private Pension Calculator', href: '/calculators/finance/social-security-vs-private-pension-calculator', cat: 'Finance' },
  { name: 'S&P500 vs Bonds Calculator', href: '/calculators/finance/sp500-vs-bonds-calculator', cat: 'Finance' },
  { name: 'S&P500 vs Real Estate USA Calculator', href: '/calculators/finance/sp500-vs-real-estate-usa-calculator', cat: 'Finance' },
  { name: 'Spain Pension vs ETF Calculator', href: '/calculators/finance/spain-pension-vs-etf-calculator', cat: 'Finance' },
  { name: 'Step Up SIP Calculator', href: '/calculators/finance/step-up-sip-calculator', cat: 'Finance' },
  { name: 'Stock Profit Calculator', href: '/calculators/finance/stock-profit-calculator', cat: 'Finance' },
  { name: 'Stocks Shares ISA vs Cash ISA Calculator', href: '/calculators/finance/stocks-shares-isa-vs-cash-isa-calculator', cat: 'Finance' },
  { name: 'Student Loan Calculator', href: '/calculators/finance/student-loan-calculator', cat: 'Finance' },
  { name: 'Sukanya Samriddhi vs PPF Calculator', href: '/calculators/finance/sukanya-samriddhi-vs-ppf-calculator', cat: 'Finance' },
  { name: 'SWP Calculator', href: '/calculators/finance/swp-calculator', cat: 'Finance' },
  { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', cat: 'Finance' },
  { name: 'Term vs Ulip Calculator', href: '/calculators/finance/term-vs-ulip-calculator', cat: 'Finance' },
  { name: 'Term vs Whole Life Calculator', href: '/calculators/finance/term-vs-whole-life-calculator', cat: 'Finance' },
  { name: 'Tip Calculator', href: '/calculators/finance/tip-calculator', cat: 'Finance' },
  { name: 'Traditional IRA vs Taxable Account Calculator', href: '/calculators/finance/traditional-ira-vs-taxable-account-calculator', cat: 'Finance' },
  { name: 'UK Buy to Let vs Stocks Calculator', href: '/calculators/finance/uk-buy-to-let-vs-stocks-calculator', cat: 'Finance' },
  { name: 'UK Fixed Rate vs Tracker Mortgage Calculator', href: '/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator', cat: 'Finance' },
  { name: 'UK Help to Buy vs LISA Calculator', href: '/calculators/finance/uk-help-to-buy-vs-lisa-calculator', cat: 'Finance' },
  { name: 'UK Income Tax Calculator', href: '/calculators/finance/uk-income-tax-calculator', cat: 'Finance' },
  { name: 'UK Lifetime ISA vs SIPp Calculator', href: '/calculators/finance/uk-lifetime-isa-vs-sipp-calculator', cat: 'Finance' },
  { name: 'UK Pension Calculator', href: '/calculators/finance/uk-pension-calculator', cat: 'Finance' },
  { name: 'UK Pension Drawdown vs Annuity Calculator', href: '/calculators/finance/uk-pension-drawdown-vs-annuity-calculator', cat: 'Finance' },
  { name: 'UK Pension vs ISA Calculator', href: '/calculators/finance/uk-pension-vs-isa-calculator', cat: 'Finance' },
  { name: 'UK Premium Bonds vs Cash ISA Calculator', href: '/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator', cat: 'Finance' },
  { name: 'UK Remortgage vs Invest Calculator', href: '/calculators/finance/uk-remortgage-vs-invest-calculator', cat: 'Finance' },
  { name: 'UK Stamp Duty Calculator', href: '/calculators/finance/uk-stamp-duty-calculator', cat: 'Finance' },
  { name: 'UK Stocks vs Bonds Calculator', href: '/calculators/finance/uk-stocks-vs-bonds-calculator', cat: 'Finance' },
  { name: 'Us Real Estate vs REITs Calculator', href: '/calculators/finance/us-real-estate-vs-reits-calculator', cat: 'Finance' },
  { name: 'Vanguard vs Fidelity ETF Calculator', href: '/calculators/finance/vanguard-vs-fidelity-etf-calculator', cat: 'Finance' },
  { name: 'Vat Calculator Europe', href: '/calculators/finance/vat-calculator-europe', cat: 'Finance' },
  { name: 'Wealth Calculator', href: '/calculators/finance/wealth-calculator', cat: 'Finance' },
  { name: 'Weekly Budget Calculator', href: '/calculators/finance/weekly-budget-calculator', cat: 'Finance' },
  { name: 'Whole Market vs S&P500 Calculator', href: '/calculators/finance/whole-market-vs-sp500-calculator', cat: 'Finance' },
  { name: 'XIRR Calculator', href: '/calculators/finance/xirr-calculator', cat: 'Finance' },
  // -- Health ----------------------------------------------
  { name: 'Age Calculator', href: '/calculators/health/age-calculator', cat: 'Health' },
  { name: 'Air Quality Health Calculator', href: '/calculators/health/air-quality-health-calculator', cat: 'Health' },
  { name: 'Alcohol Calorie Calculator', href: '/calculators/health/alcohol-calorie-calculator', cat: 'Health' },
  { name: 'Alcohol Metabolism Calculator', href: '/calculators/health/alcohol-metabolism-calculator', cat: 'Health' },
  { name: 'Altitude Sickness Calculator', href: '/calculators/health/altitude-sickness-calculator', cat: 'Health' },
  { name: 'Army Body Fat Calculator', href: '/calculators/health/army-body-fat-calculator', cat: 'Health' },
  { name: 'Athletic Performance Calculator', href: '/calculators/health/athletic-performance-calculator', cat: 'Health' },
  { name: 'Bac Calculator', href: '/calculators/health/bac-calculator', cat: 'Health' },
  { name: 'Blood Pressure Calculator', href: '/calculators/health/blood-pressure-calculator', cat: 'Health' },
  { name: 'Blue Light Exposure Calculator', href: '/calculators/health/blue-light-exposure-calculator', cat: 'Health' },
  { name: 'Bmi Calculator', href: '/calculators/health/bmi-calculator', cat: 'Health' },
  { name: 'Bmi for Children Calculator', href: '/calculators/health/bmi-for-children-calculator', cat: 'Health' },
  { name: 'Bmr Calculator', href: '/calculators/health/bmr-calculator', cat: 'Health' },
  { name: 'Body Age Calculator', href: '/calculators/health/body-age-calculator', cat: 'Health' },
  { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', cat: 'Health' },
  { name: 'Body Recomposition Calculator', href: '/calculators/health/body-recomposition-calculator', cat: 'Health' },
  { name: 'Body Surface Area Calculator', href: '/calculators/health/body-surface-area-calculator', cat: 'Health' },
  { name: 'Breastfeeding Calorie Calculator', href: '/calculators/health/breastfeeding-calorie-calculator', cat: 'Health' },
  { name: 'Breathing Exercise Calculator', href: '/calculators/health/breathing-exercise-calculator', cat: 'Health' },
  { name: 'Caffeine Half Life Calculator', href: '/calculators/health/caffeine-half-life-calculator', cat: 'Health' },
  { name: 'Calcium Calculator', href: '/calculators/health/calcium-calculator', cat: 'Health' },
  { name: 'Calorie Burned Walking Calculator', href: '/calculators/health/calorie-burned-walking-calculator', cat: 'Health' },
  { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', cat: 'Health' },
  { name: 'Calorie Deficit Calculator', href: '/calculators/health/calorie-deficit-calculator', cat: 'Health' },
  { name: 'Calories Burned Calculator', href: '/calculators/health/calories-burned-calculator', cat: 'Health' },
  { name: 'Cholesterol Calculator', href: '/calculators/health/cholesterol-calculator', cat: 'Health' },
  { name: 'Cold Exposure Calculator', href: '/calculators/health/cold-exposure-calculator', cat: 'Health' },
  { name: 'Cold Shower Benefits Calculator', href: '/calculators/health/cold-shower-benefits-calculator', cat: 'Health' },
  { name: 'Cortisol Stress Calculator', href: '/calculators/health/cortisol-stress-calculator', cat: 'Health' },
  { name: 'Creatine Dosage Calculator', href: '/calculators/health/creatine-dosage-calculator', cat: 'Health' },
  { name: 'Creatinine Clearance Calculator', href: '/calculators/health/creatinine-clearance-calculator', cat: 'Health' },
  { name: 'Cycling Calories Calculator', href: '/calculators/health/cycling-calories-calculator', cat: 'Health' },
  { name: 'Dehydration Calculator', href: '/calculators/health/dehydration-calculator', cat: 'Health' },
  { name: 'Dental Health Calculator', href: '/calculators/health/dental-health-calculator', cat: 'Health' },
  { name: 'Diabetes Risk Calculator', href: '/calculators/health/diabetes-risk-calculator', cat: 'Health' },
  { name: 'Due Date Calculator', href: '/calculators/health/due-date-calculator', cat: 'Health' },
  { name: 'Ergonomics Score Calculator', href: '/calculators/health/ergonomics-score-calculator', cat: 'Health' },
  { name: 'Eye Health Calculator', href: '/calculators/health/eye-health-calculator', cat: 'Health' },
  { name: 'Fasting Window Calculator', href: '/calculators/health/fasting-window-calculator', cat: 'Health' },
  { name: 'Fat Loss Rate Calculator', href: '/calculators/health/fat-loss-rate-calculator', cat: 'Health' },
  { name: 'Fiber Intake Calculator', href: '/calculators/health/fiber-intake-calculator', cat: 'Health' },
  { name: 'Flexibility Calculator', href: '/calculators/health/flexibility-calculator', cat: 'Health' },
  { name: 'Glycemic Load Calculator', href: '/calculators/health/glycemic-load-calculator', cat: 'Health' },
  { name: 'Gratitude Health Calculator', href: '/calculators/health/gratitude-health-calculator', cat: 'Health' },
  { name: 'Grip Strength Calculator', href: '/calculators/health/grip-strength-calculator', cat: 'Health' },
  { name: 'Gut Health Calculator', href: '/calculators/health/gut-health-calculator', cat: 'Health' },
  { name: 'Hangover Recovery Calculator', href: '/calculators/health/hangover-recovery-calculator', cat: 'Health' },
  { name: 'Hearing Age Calculator', href: '/calculators/health/hearing-age-calculator', cat: 'Health' },
  { name: 'Heart Age Calculator', href: '/calculators/health/heart-age-calculator', cat: 'Health' },
  { name: 'Heart Attack Risk Calculator', href: '/calculators/health/heart-attack-risk-calculator', cat: 'Health' },
  { name: 'Heart Rate Calculator', href: '/calculators/health/heart-rate-calculator', cat: 'Health' },
  { name: 'Hiit Calculator', href: '/calculators/health/hiit-calculator', cat: 'Health' },
  { name: 'Hydration Calculator', href: '/calculators/health/hydration-calculator', cat: 'Health' },
  { name: 'Ideal Weight Calculator', href: '/calculators/health/ideal-weight-calculator', cat: 'Health' },
  { name: 'Immune Health Calculator', href: '/calculators/health/immune-health-calculator', cat: 'Health' },
  { name: 'Infant Weight Percentile Calculator', href: '/calculators/health/infant-weight-percentile-calculator', cat: 'Health' },
  { name: 'Inflammation Risk Calculator', href: '/calculators/health/inflammation-risk-calculator', cat: 'Health' },
  { name: 'Injury Recovery Calculator', href: '/calculators/health/injury-recovery-calculator', cat: 'Health' },
  { name: 'Intermittent Fasting Calculator', href: '/calculators/health/intermittent-fasting-calculator', cat: 'Health' },
  { name: 'Iron Intake Calculator', href: '/calculators/health/iron-intake-calculator', cat: 'Health' },
  { name: 'Jet Lag Calculator', href: '/calculators/health/jet-lag-calculator', cat: 'Health' },
  { name: 'Keto Macro Calculator', href: '/calculators/health/keto-macro-calculator', cat: 'Health' },
  { name: 'Kidney Function Calculator', href: '/calculators/health/kidney-function-calculator', cat: 'Health' },
  { name: 'Lean Body Mass Calculator', href: '/calculators/health/lean-body-mass-calculator', cat: 'Health' },
  { name: 'Liver Health Calculator', href: '/calculators/health/liver-health-calculator', cat: 'Health' },
  { name: 'Loneliness Health Calculator', href: '/calculators/health/loneliness-health-calculator', cat: 'Health' },
  { name: 'Longevity Calculator', href: '/calculators/health/longevity-calculator', cat: 'Health' },
  { name: 'Macro Calculator', href: '/calculators/health/macro-calculator', cat: 'Health' },
  { name: 'Magnesium Calculator', href: '/calculators/health/magnesium-calculator', cat: 'Health' },
  { name: 'Marathon Training Calculator', href: '/calculators/health/marathon-training-calculator', cat: 'Health' },
  { name: 'Meal Timing Calculator', href: '/calculators/health/meal-timing-calculator', cat: 'Health' },
  { name: 'Meditation Benefits Calculator', href: '/calculators/health/meditation-benefits-calculator', cat: 'Health' },
  { name: 'Menopause Symptom Calculator', href: '/calculators/health/menopause-symptom-calculator', cat: 'Health' },
  { name: 'Menstrual Cycle Calculator', href: '/calculators/health/menstrual-cycle-calculator', cat: 'Health' },
  { name: 'Mental Health Score Calculator', href: '/calculators/health/mental-health-score-calculator', cat: 'Health' },
  { name: 'Mold Exposure Calculator', href: '/calculators/health/mold-exposure-calculator', cat: 'Health' },
  { name: 'Muscle Gain Calculator', href: '/calculators/health/muscle-gain-calculator', cat: 'Health' },
  { name: 'Nicotine Withdrawal Calculator', href: '/calculators/health/nicotine-withdrawal-calculator', cat: 'Health' },
  { name: 'Omega3 Calculator', href: '/calculators/health/omega3-calculator', cat: 'Health' },
  { name: 'One Rep Max Calculator', href: '/calculators/health/one-rep-max-calculator', cat: 'Health' },
  { name: 'Ovulation Calculator', href: '/calculators/health/ovulation-calculator', cat: 'Health' },
  { name: 'Pace Calculator', href: '/calculators/health/pace-calculator', cat: 'Health' },
  { name: 'Plank Time Calculator', href: '/calculators/health/plank-time-calculator', cat: 'Health' },
  { name: 'Posture Calculator', href: '/calculators/health/posture-calculator', cat: 'Health' },
  { name: 'Pregnancy Calculator', href: '/calculators/health/pregnancy-calculator', cat: 'Health' },
  { name: 'Pregnancy Conception Calculator', href: '/calculators/health/pregnancy-conception-calculator', cat: 'Health' },
  { name: 'Pregnancy Due Date Calculator', href: '/calculators/health/pregnancy-due-date-calculator', cat: 'Health' },
  { name: 'Pregnancy Nutrition Calculator', href: '/calculators/health/pregnancy-nutrition-calculator', cat: 'Health' },
  { name: 'Pregnancy Weight Gain Calculator', href: '/calculators/health/pregnancy-weight-gain-calculator', cat: 'Health' },
  { name: 'Protein Intake Calculator', href: '/calculators/health/protein-intake-calculator', cat: 'Health' },
  { name: 'Protein Per Meal Calculator', href: '/calculators/health/protein-per-meal-calculator', cat: 'Health' },
  { name: 'Pull Up Calculator', href: '/calculators/health/pull-up-calculator', cat: 'Health' },
  { name: 'Pushup Calculator', href: '/calculators/health/pushup-calculator', cat: 'Health' },
  { name: 'Resting Metabolic Rate Calculator', href: '/calculators/health/resting-metabolic-rate-calculator', cat: 'Health' },
  { name: 'Running Pace Calculator', href: '/calculators/health/running-pace-calculator', cat: 'Health' },
  { name: 'Sauna Benefits Calculator', href: '/calculators/health/sauna-benefits-calculator', cat: 'Health' },
  { name: 'Shift Work Health Calculator', href: '/calculators/health/shift-work-health-calculator', cat: 'Health' },
  { name: 'Sit and Reach Calculator', href: '/calculators/health/sit-and-reach-calculator', cat: 'Health' },
  { name: 'Skin Health Calculator', href: '/calculators/health/skin-health-calculator', cat: 'Health' },
  { name: 'Sleep Cycle Calculator', href: '/calculators/health/sleep-cycle-calculator', cat: 'Health' },
  { name: 'Sleep Need Calculator', href: '/calculators/health/sleep-need-calculator', cat: 'Health' },
  { name: 'Sodium Intake Calculator', href: '/calculators/health/sodium-intake-calculator', cat: 'Health' },
  { name: 'Sprint Calculator', href: '/calculators/health/sprint-calculator', cat: 'Health' },
  { name: 'Squat Calculator', href: '/calculators/health/squat-calculator', cat: 'Health' },
  { name: 'Standing Desk Calculator', href: '/calculators/health/standing-desk-calculator', cat: 'Health' },
  { name: 'Steps Calculator', href: '/calculators/health/steps-calculator', cat: 'Health' },
  { name: 'Steps to Calories Calculator', href: '/calculators/health/steps-to-calories-calculator', cat: 'Health' },
  { name: 'Stress Level Calculator', href: '/calculators/health/stress-level-calculator', cat: 'Health' },
  { name: 'Stroke Risk Calculator', href: '/calculators/health/stroke-risk-calculator', cat: 'Health' },
  { name: 'Sugar Intake Calculator', href: '/calculators/health/sugar-intake-calculator', cat: 'Health' },
  { name: 'Sweat Rate Calculator', href: '/calculators/health/sweat-rate-calculator', cat: 'Health' },
  { name: 'Swimming Calories Calculator', href: '/calculators/health/swimming-calories-calculator', cat: 'Health' },
  { name: 'Target Weight Calculator', href: '/calculators/health/target-weight-calculator', cat: 'Health' },
  { name: 'Tdee Calculator', href: '/calculators/health/tdee-calculator', cat: 'Health' },
  { name: 'Testosterone Age Calculator', href: '/calculators/health/testosterone-age-calculator', cat: 'Health' },
  { name: 'Thyroid Calculator', href: '/calculators/health/thyroid-calculator', cat: 'Health' },
  { name: 'Uv Exposure Calculator', href: '/calculators/health/uv-exposure-calculator', cat: 'Health' },
  { name: 'Vitamin C Calculator', href: '/calculators/health/vitamin-c-calculator', cat: 'Health' },
  { name: 'Vitamin D Calculator', href: '/calculators/health/vitamin-d-calculator', cat: 'Health' },
  { name: 'Vo2 Max Calculator', href: '/calculators/health/vo2-max-calculator', cat: 'Health' },
  { name: 'Waist to Height Ratio Calculator', href: '/calculators/health/waist-to-height-ratio-calculator', cat: 'Health' },
  { name: 'Water Intake Calculator', href: '/calculators/health/water-intake-calculator', cat: 'Health' },
  { name: 'Yoga Calories Calculator', href: '/calculators/health/yoga-calories-calculator', cat: 'Health' },
  { name: 'Zinc Calculator', href: '/calculators/health/zinc-calculator', cat: 'Health' },
  // -- Dev ----------------------------------------------
  { name: 'Api Response Time', href: '/calculators/dev/api-response-time', cat: 'Dev' },
  { name: 'Aspect Ratio Tool', href: '/calculators/dev/aspect-ratio-calculator', cat: 'Dev' },
  { name: 'Bandwidth Tool', href: '/calculators/dev/bandwidth-calculator', cat: 'Dev' },
  { name: 'Base Converter', href: '/calculators/dev/base-converter', cat: 'Dev' },
  { name: 'Base64 Encoder', href: '/calculators/dev/base64-encoder', cat: 'Dev' },
  { name: 'Binary Text Converter', href: '/calculators/dev/binary-text-converter', cat: 'Dev' },
  { name: 'Bit Byte Converter', href: '/calculators/dev/bit-byte-converter', cat: 'Dev' },
  { name: 'Bitwise Tool', href: '/calculators/dev/bitwise-calculator', cat: 'Dev' },
  { name: 'Border Radius Gen', href: '/calculators/dev/border-radius-gen', cat: 'Dev' },
  { name: 'Box Shadow Generator', href: '/calculators/dev/box-shadow-generator', cat: 'Dev' },
  { name: 'Character Encoder', href: '/calculators/dev/character-encoder', cat: 'Dev' },
  { name: 'Chmod Tool', href: '/calculators/dev/chmod-calculator', cat: 'Dev' },
  { name: 'Cidr Tool', href: '/calculators/dev/cidr-calculator', cat: 'Dev' },
  { name: 'Code Minifier', href: '/calculators/dev/code-minifier', cat: 'Dev' },
  { name: 'Color Contrast', href: '/calculators/dev/color-contrast', cat: 'Dev' },
  { name: 'Color Converter', href: '/calculators/dev/color-converter', cat: 'Dev' },
  { name: 'Color Palette', href: '/calculators/dev/color-palette', cat: 'Dev' },
  { name: 'Cron Expression', href: '/calculators/dev/cron-expression', cat: 'Dev' },
  { name: 'Css Animation Gen', href: '/calculators/dev/css-animation-gen', cat: 'Dev' },
  { name: 'Css Clip Path', href: '/calculators/dev/css-clip-path', cat: 'Dev' },
  { name: 'Css Filter Gen', href: '/calculators/dev/css-filter-gen', cat: 'Dev' },
  { name: 'Css Gradient Generator', href: '/calculators/dev/css-gradient-generator', cat: 'Dev' },
  { name: 'Css Specificity', href: '/calculators/dev/css-specificity', cat: 'Dev' },
  { name: 'Css Unit Converter', href: '/calculators/dev/css-unit-converter', cat: 'Dev' },
  { name: 'Csv to Json', href: '/calculators/dev/csv-to-json', cat: 'Dev' },
  { name: 'Curl Builder', href: '/calculators/dev/curl-builder', cat: 'Dev' },
  { name: 'Diff Checker', href: '/calculators/dev/diff-checker', cat: 'Dev' },
  { name: 'Docker Compose Gen', href: '/calculators/dev/docker-compose-gen', cat: 'Dev' },
  { name: 'Duplicate Remover', href: '/calculators/dev/duplicate-remover', cat: 'Dev' },
  { name: 'Env File Parser', href: '/calculators/dev/env-file-parser', cat: 'Dev' },
  { name: 'Epoch Converter', href: '/calculators/dev/epoch-converter', cat: 'Dev' },
  { name: 'Fake Data Generator', href: '/calculators/dev/fake-data-generator', cat: 'Dev' },
  { name: 'Favicon Generator', href: '/calculators/dev/favicon-generator', cat: 'Dev' },
  { name: 'Flex Generator', href: '/calculators/dev/flex-generator', cat: 'Dev' },
  { name: 'Font Size Tool', href: '/calculators/dev/font-size-calculator', cat: 'Dev' },
  { name: 'Git Commit Gen', href: '/calculators/dev/git-commit-gen', cat: 'Dev' },
  { name: 'Gitignore Generator', href: '/calculators/dev/gitignore-generator', cat: 'Dev' },
  { name: 'Graphql Formatter', href: '/calculators/dev/graphql-formatter', cat: 'Dev' },
  { name: 'Grid Generator', href: '/calculators/dev/grid-generator', cat: 'Dev' },
  { name: 'Hash Generator', href: '/calculators/dev/hash-generator', cat: 'Dev' },
  { name: 'Htaccess Generator', href: '/calculators/dev/htaccess-generator', cat: 'Dev' },
  { name: 'Html Encoder', href: '/calculators/dev/html-encoder', cat: 'Dev' },
  { name: 'Html Entity Ref', href: '/calculators/dev/html-entity-ref', cat: 'Dev' },
  { name: 'Html to Markdown', href: '/calculators/dev/html-to-markdown', cat: 'Dev' },
  { name: 'Html Validator', href: '/calculators/dev/html-validator', cat: 'Dev' },
  { name: 'Http Headers Analyzer', href: '/calculators/dev/http-headers-analyzer', cat: 'Dev' },
  { name: 'Http Status Codes', href: '/calculators/dev/http-status-codes', cat: 'Dev' },
  { name: 'Image Base64', href: '/calculators/dev/image-base64', cat: 'Dev' },
  { name: 'Ip Subnet Tool', href: '/calculators/dev/ip-subnet-calculator', cat: 'Dev' },
  { name: 'Json Formatter', href: '/calculators/dev/json-formatter', cat: 'Dev' },
  { name: 'Json Path Tester', href: '/calculators/dev/json-path-tester', cat: 'Dev' },
  { name: 'Json Schema Gen', href: '/calculators/dev/json-schema-gen', cat: 'Dev' },
  { name: 'Json to Csv', href: '/calculators/dev/json-to-csv', cat: 'Dev' },
  { name: 'Jwt Decoder', href: '/calculators/dev/jwt-decoder', cat: 'Dev' },
  { name: 'Line Sorter', href: '/calculators/dev/line-sorter', cat: 'Dev' },
  { name: 'Lorem Ipsum Generator', href: '/calculators/dev/lorem-ipsum-generator', cat: 'Dev' },
  { name: 'Markdown Preview', href: '/calculators/dev/markdown-preview', cat: 'Dev' },
  { name: 'Markdown Table Gen', href: '/calculators/dev/markdown-table-gen', cat: 'Dev' },
  { name: 'Meta Tag Generator', href: '/calculators/dev/meta-tag-generator', cat: 'Dev' },
  { name: 'Mime Type Lookup', href: '/calculators/dev/mime-type-lookup', cat: 'Dev' },
  { name: 'Network Speed Test', href: '/calculators/dev/network-speed-test', cat: 'Dev' },
  { name: 'Npm Package Search', href: '/calculators/dev/npm-package-search', cat: 'Dev' },
  { name: 'Number Formatter', href: '/calculators/dev/number-formatter', cat: 'Dev' },
  { name: 'Open Graph Preview', href: '/calculators/dev/open-graph-preview', cat: 'Dev' },
  { name: 'Package Json Gen', href: '/calculators/dev/package-json-gen', cat: 'Dev' },
  { name: 'Password Generator', href: '/calculators/dev/password-generator', cat: 'Dev' },
  { name: 'Pixel Rem Converter', href: '/calculators/dev/pixel-rem-converter', cat: 'Dev' },
  { name: 'Regex Tester', href: '/calculators/dev/regex-tester', cat: 'Dev' },
  { name: 'Responsive Breakpoints', href: '/calculators/dev/responsive-breakpoints', cat: 'Dev' },
  { name: 'Robots Txt Generator', href: '/calculators/dev/robots-txt-generator', cat: 'Dev' },
  { name: 'Rsa Key Info', href: '/calculators/dev/rsa-key-info', cat: 'Dev' },
  { name: 'Semver Tool', href: '/calculators/dev/semver-calculator', cat: 'Dev' },
  { name: 'Sql Formatter', href: '/calculators/dev/sql-formatter', cat: 'Dev' },
  { name: 'Sql Join Visualizer', href: '/calculators/dev/sql-join-visualizer', cat: 'Dev' },
  { name: 'String Hash Calc', href: '/calculators/dev/string-hash-calc', cat: 'Dev' },
  { name: 'String Inspector', href: '/calculators/dev/string-inspector', cat: 'Dev' },
  { name: 'Svg Optimizer', href: '/calculators/dev/svg-optimizer', cat: 'Dev' },
  { name: 'Table Generator', href: '/calculators/dev/table-generator', cat: 'Dev' },
  { name: 'Text Case Converter', href: '/calculators/dev/text-case-converter', cat: 'Dev' },
  { name: 'Text Diff Inline', href: '/calculators/dev/text-diff-inline', cat: 'Dev' },
  { name: 'Timezone Converter', href: '/calculators/dev/timezone-converter', cat: 'Dev' },
  { name: 'Toml Formatter', href: '/calculators/dev/toml-formatter', cat: 'Dev' },
  { name: 'Unix Timestamp', href: '/calculators/dev/unix-timestamp', cat: 'Dev' },
  { name: 'Url Encoder', href: '/calculators/dev/url-encoder', cat: 'Dev' },
  { name: 'Uuid Generator', href: '/calculators/dev/uuid-generator', cat: 'Dev' },
  { name: 'Word Counter', href: '/calculators/dev/word-counter', cat: 'Dev' },
  { name: 'Xml Formatter', href: '/calculators/dev/xml-formatter', cat: 'Dev' },
  { name: 'Xml to Json', href: '/calculators/dev/xml-to-json', cat: 'Dev' },
  { name: 'Yaml Formatter', href: '/calculators/dev/yaml-formatter', cat: 'Dev' },
  { name: 'Z Index Manager', href: '/calculators/dev/z-index-manager', cat: 'Dev' },
  // -- Fun ----------------------------------------------
  { name: 'Age in Days', href: '/calculators/fun/age-in-days', cat: 'Fun' },
  { name: 'Birthday Countdown', href: '/calculators/fun/birthday-countdown', cat: 'Fun' },
  { name: 'Calories in Beer', href: '/calculators/fun/calories-in-beer', cat: 'Fun' },
  { name: 'Coffee Calculator', href: '/calculators/fun/coffee-calculator', cat: 'Fun' },
  { name: 'Compliment Generator', href: '/calculators/fun/compliment-generator', cat: 'Fun' },
  { name: 'Emoji Translator', href: '/calculators/fun/emoji-translator', cat: 'Fun' },
  { name: 'Fantasy Name Generator', href: '/calculators/fun/fantasy-name-generator', cat: 'Fun' },
  { name: 'Fortune Cookie', href: '/calculators/fun/fortune-cookie', cat: 'Fun' },
  { name: 'How Rich Am I', href: '/calculators/fun/how-rich-am-i', cat: 'Fun' },
  { name: 'Insult Generator', href: '/calculators/fun/insult-generator', cat: 'Fun' },
  { name: 'Life Expectancy Fun', href: '/calculators/fun/life-expectancy-fun', cat: 'Fun' },
  { name: 'Love Compatibility', href: '/calculators/fun/love-compatibility', cat: 'Fun' },
  { name: 'Lucky Number', href: '/calculators/fun/lucky-number', cat: 'Fun' },
  { name: 'Personality Quiz', href: '/calculators/fun/personality-quiz', cat: 'Fun' },
  { name: 'Pig Latin Converter', href: '/calculators/fun/pig-latin-converter', cat: 'Fun' },
  { name: 'Pizza Calculator', href: '/calculators/fun/pizza-calculator', cat: 'Fun' },
  { name: 'Procrastination Score', href: '/calculators/fun/procrastination-score', cat: 'Fun' },
  { name: 'Random Fact Generator', href: '/calculators/fun/random-fact-generator', cat: 'Fun' },
  { name: 'Random Name Generator', href: '/calculators/fun/random-name-generator', cat: 'Fun' },
  { name: 'Screen Time Calculator', href: '/calculators/fun/screen-time-calculator', cat: 'Fun' },
  { name: 'Sleep Debt Calculator', href: '/calculators/fun/sleep-debt-calculator', cat: 'Fun' },
  { name: 'Social Media Addiction', href: '/calculators/fun/social-media-addiction', cat: 'Fun' },
  { name: 'Superhero Name', href: '/calculators/fun/superhero-name', cat: 'Fun' },
  { name: 'Text to Morse', href: '/calculators/fun/text-to-morse', cat: 'Fun' },
  { name: 'Trivia Quiz', href: '/calculators/fun/trivia-quiz', cat: 'Fun' },
  { name: 'Uwu Text Generator', href: '/calculators/fun/uwu-text-generator', cat: 'Fun' },
  { name: 'Villain Name', href: '/calculators/fun/villain-name', cat: 'Fun' },
  { name: 'Workout Excuse Generator', href: '/calculators/fun/workout-excuse-generator', cat: 'Fun' },
  { name: 'Would You Rather', href: '/calculators/fun/would-you-rather', cat: 'Fun' },
  { name: 'Zodiac Calculator', href: '/calculators/fun/zodiac-calculator', cat: 'Fun' },
  // -- Blog ----------------------------------------------
  { name: 'Investment', href: '/blog/investment', cat: 'Blog' },
  { name: 'Loans', href: '/blog/loans', cat: 'Blog' },
  { name: 'Tax', href: '/blog/tax', cat: 'Blog' },
  { name: 'Health', href: '/blog/health', cat: 'Blog' },
  { name: 'Property', href: '/blog/property', cat: 'Blog' },
  { name: 'Commodity', href: '/blog/commodity', cat: 'Blog' },
  { name: 'SIP Calculator Guide How to Grow Wealth with Systematic Investment', href: '/blog/sip-calculator-guide-how-to-grow-wealth-with-systematic-investment', cat: 'Blog' },
  { name: 'Compound Interest Guide Eighth Wonder of the World', href: '/blog/compound-interest-guide-eighth-wonder-of-the-world', cat: 'Blog' },
  { name: 'Retirement Planning Guide How Much Do You Need to Retire', href: '/blog/retirement-planning-guide-how-much-do-you-need-to-retire', cat: 'Blog' },
  { name: 'EMI Calculator Complete Guide Understand Home Car Personal Loans', href: '/blog/emi-calculator-complete-guide-understand-home-car-personal-loans', cat: 'Blog' },
  { name: 'Home Loan Mortgage Guide How to Get Best Rate', href: '/blog/home-loan-mortgage-guide-how-to-get-best-rate', cat: 'Blog' },
  { name: 'Gold Investment Guide India 2026', href: '/blog/gold-investment-guide-india-2026', cat: 'Blog' },
  { name: 'FIRE Movement India Guide 2026', href: '/blog/fire-movement-india-guide-2026', cat: 'Blog' },
  { name: 'Debt Payoff Strategies Avalanche vs Snowball Method', href: '/blog/debt-payoff-strategies-avalanche-vs-snowball-method', cat: 'Blog' },
  { name: 'Net Worth Guide How to Calculate and Grow Your Wealth', href: '/blog/net-worth-guide-how-to-calculate-and-grow-your-wealth', cat: 'Blog' },
  { name: 'Index Fund Guide Beginners 2026', href: '/blog/index-fund-guide-beginners-2026', cat: 'Blog' },
  { name: '401k vs Roth IRA Complete Guide 2026', href: '/blog/401k-vs-roth-ira-complete-guide-2026', cat: 'Blog' },
  { name: 'Bmi Calculator Guide Understanding Body Mass Index', href: '/blog/bmi-calculator-guide-understanding-body-mass-index', cat: 'Blog' },
  { name: 'Calorie Calculator Guide Tdee Macros Weight Loss', href: '/blog/calorie-calculator-guide-tdee-macros-weight-loss', cat: 'Blog' },
  { name: 'UK Income Tax Guide Paye National Insurance Take Home Pay 2026', href: '/blog/uk-income-tax-guide-paye-national-insurance-take-home-pay-2026', cat: 'Blog' },
  { name: 'SIP vs FD Which Is Better 2026', href: '/blog/sip-vs-fd-which-is-better-2026', cat: 'Blog' },
  { name: 'SIP vs Real Estate Complete Guide India 2026', href: '/blog/sip-vs-real-estate-complete-guide-india-2026', cat: 'Blog' },
  { name: 'Best Mortgage Calculators USA 2026', href: '/blog/best-mortgage-calculators-usa-2026', cat: 'Blog' },
  { name: 'Best Retirement Calculators USA 2026', href: '/blog/best-retirement-calculators-usa-2026', cat: 'Blog' },
  { name: 'Compound Interest Calculator Guide USA 2026', href: '/blog/compound-interest-calculator-guide-usa-2026', cat: 'Blog' },
  { name: 'How Much Mortgage Can I Afford USA 2026', href: '/blog/how-much-mortgage-can-i-afford-usa-2026', cat: 'Blog' },
  { name: 'How to Pay Off Mortgage Early USA 2026', href: '/blog/how-to-pay-off-mortgage-early-usa-2026', cat: 'Blog' },
  { name: 'Car Loan Calculator USA 2026 Rates By State', href: '/blog/car-loan-calculator-usa-2026-rates-by-state', cat: 'Blog' },
  { name: 'Tax Bracket Guide USA 2026 Marginal vs Effective', href: '/blog/tax-bracket-guide-usa-2026-marginal-vs-effective', cat: 'Blog' },
  { name: 'How Much to Save for Retirement By Age USA', href: '/blog/how-much-to-save-for-retirement-by-age-usa', cat: 'Blog' },
  { name: 'Budget 50 30 20 Rule USA Real Examples 2026', href: '/blog/budget-50-30-20-rule-usa-real-examples-2026', cat: 'Blog' },
  { name: 'Annual Salary By Hourly Rate USA 2026', href: '/blog/annual-salary-by-hourly-rate-usa-2026', cat: 'Blog' },
  { name: 'Down Payment How Much House USA 2026', href: '/blog/down-payment-how-much-house-usa-2026', cat: 'Blog' },
  { name: 'Roth IRA vs 401k Which Is Better 2026', href: '/blog/roth-ira-vs-401k-which-is-better-2026', cat: 'Blog' },
  { name: 'Wealth Building Guide USA 2026 Net Worth By Age', href: '/blog/wealth-building-guide-usa-2026-net-worth-by-age', cat: 'Blog' },
  { name: 'How to Maximize 401k USA 2026', href: '/blog/how-to-maximize-401k-usa-2026', cat: 'Blog' },
  { name: 'Debt Payoff Guide USA 2026', href: '/blog/debt-payoff-guide-usa-2026', cat: 'Blog' },
  { name: 'College Cost Savings Guide USA 2026', href: '/blog/college-cost-savings-guide-usa-2026', cat: 'Blog' },
  { name: 'Small Business Finance Guide USA 2026', href: '/blog/small-business-finance-guide-usa-2026', cat: 'Blog' },
  { name: 'Emergency Fund Calculator Guide USA 2026', href: '/blog/emergency-fund-calculator-usa-2026', cat: 'Blog' },
  { name: 'Compound Interest Guide USA 2026', href: '/blog/compound-interest-guide-usa-how-to-grow-money-2026', cat: 'Blog' },
  { name: 'Social Security Claiming Strategy 2026', href: '/blog/social-security-claiming-strategy-usa-2026', cat: 'Blog' },
  { name: 'Credit Card Payoff Guide USA 2026', href: '/blog/credit-card-payoff-calculator-usa-interest-guide-2026', cat: 'Blog' },
  { name: 'HELOC vs Cash-Out Refinance USA 2026', href: '/blog/home-equity-heloc-vs-cashout-refinance-usa-2026', cat: 'Blog' },
  { name: 'Investment Property Calculator USA 2026', href: '/blog/investment-property-calculator-usa-rental-income-2026', cat: 'Blog' },
  { name: 'Student Loan Payoff Guide USA 2026', href: '/blog/student-loan-payoff-strategies-usa-2026', cat: 'Blog' },
  { name: 'Dividend Investing Guide USA 2026', href: '/blog/dividend-investing-guide-usa-2026-passive-income', cat: 'Blog' },
  { name: 'Inflation Impact Calculator USA 2026', href: '/blog/inflation-impact-calculator-usa-2026-purchasing-power', cat: 'Blog' },
  { name: 'Lease vs Buy Car Guide USA 2026', href: '/blog/lease-vs-buy-car-calculator-usa-2026', cat: 'Blog' },
  { name: 'FIRE Calculator Guide USA 2026', href: '/blog/fire-calculator-guide-usa-retire-early-2026', cat: 'Blog' },
  { name: 'Net Worth by Age USA 2026', href: '/blog/net-worth-by-age-usa-2026-how-do-you-compare', cat: 'Blog' },
  { name: 'HSA Triple Tax Advantage Guide 2026', href: '/blog/hsa-triple-tax-advantage-guide-usa-2026', cat: 'Blog' },
  { name: 'Real Estate vs Stock Market USA 2026', href: '/blog/real-estate-vs-stock-market-usa-2026-which-wins', cat: 'Blog' },
]
const CAT_META: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Finance: { color: 'text-green-700', bg: 'bg-green-100', icon: <TrendingUp className="w-3 h-3" /> },
  Health:  { color: 'text-red-600',   bg: 'bg-red-100',   icon: <Heart className="w-3 h-3" /> },
  Dev:     { color: 'text-blue-600',  bg: 'bg-blue-100',  icon: <Zap className="w-3 h-3" /> },
  Fun:     { color: 'text-purple-600',bg: 'bg-purple-100',icon: <Smile className="w-3 h-3" /> },
  Blog:    { color: 'text-orange-600',bg: 'bg-orange-100',icon: <BookOpen className="w-3 h-3" /> },
}

const TRENDING: { name: string; href: string; cat: string }[] = [
  { name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator', cat: 'Finance' },
  { name: 'Tax Bracket 2026', href: '/calculators/finance/tax-bracket-calculator', cat: 'Finance' },
  { name: 'Budget Planner', href: '/calculators/finance/budget-planner-calculator', cat: 'Finance' },
  { name: '401k Calculator', href: '/calculators/finance/401k-calculator', cat: 'Finance' },
  { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', cat: 'Health' },
  { name: 'Roth IRA vs 401k Guide', href: '/blog/roth-ira-vs-401k-which-is-better-2026', cat: 'Blog' },
]

const FINANCE_COUNT = 168
const HEALTH_COUNT = 124
const DEV_COUNT = 90
const FUN_COUNT = 30
const BLOG_COUNT = 53
const TOTAL = FINANCE_COUNT + HEALTH_COUNT + DEV_COUNT + FUN_COUNT + BLOG_COUNT

export function GlobalSearch({ className }: { className?: string }) {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<string>('All')
  const inputRef          = useRef<HTMLInputElement>(null)
  const containerRef      = useRef<HTMLDivElement>(null)

  const filtered = query.trim().length >= 1
    ? ITEMS.filter(item => {
        const q = query.toLowerCase()
        const matchesText = item.name.toLowerCase().includes(q) ||
          item.cat.toLowerCase().includes(q) ||
          item.href.toLowerCase().includes(q)
        const matchesTab = activeTab === 'All' || item.cat === activeTab
        return matchesText && matchesTab
      })
      .sort((a, b) => {
        const q = query.toLowerCase()
        const aName = a.name.toLowerCase()
        const bName = b.name.toLowerCase()
        // Exact match first
        if (aName === q && bName !== q) return -1
        if (bName === q && aName !== q) return 1
        // Starts with query
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1
        if (bName.startsWith(q) && !aName.startsWith(q)) return 1
        // Calculator category before blog
        if (a.cat !== 'Blog' && b.cat === 'Blog') return -1
        if (b.cat !== 'Blog' && a.cat === 'Blog') return 1
        return aName.localeCompare(bName)
      })
      .slice(0, 20)
    : []

  const openSearch = useCallback(() => {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const closeSearch = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveTab('All')
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) closeSearch()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, closeSearch])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open ? closeSearch() : openSearch() }
      if (e.key === 'Escape') closeSearch()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, openSearch, closeSearch])

  const tabs = ['All', 'Finance', 'Health', 'Dev', 'Fun', 'Blog']

  return (
    <div ref={containerRef} className={`relative ${className || ''}`}>
      {/* Trigger */}
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-white hover:border-green-300 hover:shadow-sm transition-all text-sm text-gray-500 min-w-[160px] group"
        aria-label="Search calculators and guides"
      >
        <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-green-500 flex-shrink-0" />
        <span className="flex-1 text-left hidden sm:block">Search {TOTAL}+ tools...</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-400 border border-gray-200 font-mono">⌘K</kbd>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-[480px] max-w-[calc(100vw-1rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[9999] overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <Search className="w-4 h-4 text-green-500 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={`Search ${TOTAL}+ calculators & guides...`}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <button onClick={query ? () => setQuery('') : closeSearch} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <X className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>

          {/* Category Tabs */}
          {query.trim().length >= 1 && (
            <div className="flex gap-1 px-3 py-2 border-b border-gray-100 overflow-x-auto">
              {tabs.map(tab => {
                const meta = CAT_META[tab]
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === tab
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          )}

          {/* Results */}
          <div className="max-h-[65vh] overflow-y-auto">
            {query.trim().length >= 1 ? (
              filtered.length > 0 ? (
                <div className="p-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-1.5">
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''}{activeTab !== 'All' ? ` in ${activeTab}` : ''}
                  </p>
                  {filtered.map(item => {
                    const meta = CAT_META[item.cat] || CAT_META.Finance
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeSearch}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors group"
                      >
                        <div className={`w-6 h-6 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                          {meta.icon}
                        </div>
                        <span className="flex-1 text-sm font-medium text-gray-800 group-hover:text-green-700 truncate">
                          {item.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${meta.bg} ${meta.color}`}>
                          {item.cat}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-600 mb-1">No results for "{query}"</p>
                  <p className="text-xs text-gray-400">Try "mortgage", "tax bracket", or "BMI"</p>
                </div>
              )
            ) : (
              <div className="p-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1.5">🔥 Trending</p>
                {TRENDING.map(item => {
                  const meta = CAT_META[item.cat] || CAT_META.Finance
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeSearch}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors group"
                    >
                      <BarChart2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-gray-700 group-hover:text-green-700 font-medium">{item.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>{item.cat}</span>
                    </Link>
                  )
                })}
                <div className="mt-3 pt-2 border-t border-gray-100 grid grid-cols-5 gap-1 px-2">
                  {[
                    ['Finance', FINANCE_COUNT, 'text-green-700 bg-green-50'],
                    ['Health', HEALTH_COUNT, 'text-red-600 bg-red-50'],
                    ['Dev', DEV_COUNT, 'text-blue-600 bg-blue-50'],
                    ['Fun', FUN_COUNT, 'text-purple-600 bg-purple-50'],
                    ['Blog', BLOG_COUNT, 'text-orange-600 bg-orange-50'],
                  ].map(([cat, count, cls]) => (
                    <button
                      key={cat as string}
                      onClick={() => { setQuery(cat as string); setActiveTab(cat as string) }}
                      className={`text-center p-2 rounded-xl ${cls} transition-colors hover:opacity-80`}
                    >
                      <p className="text-sm font-black">{count}</p>
                      <p className="text-[10px] font-semibold">{cat}</p>
                    </button>
                  ))}
                </div>
                <p className="text-center text-[11px] text-gray-400 mt-2 pb-1">
                  {TOTAL} total tools -- type to search all
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
