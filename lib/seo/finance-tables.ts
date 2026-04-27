// Type for all table row data - allows any string keys with string/number values
type TR = Record<string, string | number>

// finance-tables.ts
// Searchable data tables for finance calculator pages
// Targets long-tail USA keywords like "home loan EMI Texas" "mortgage rate 700 credit score"

export const mortgageByStateData: TR[] = [
  { 'State': 'Texas', 'Avg Rate (30yr)': '7.12%', 'Median Home Price': '$312,000', 'Monthly PITI (20% down)': '$2,089', 'Property Tax Rate': '1.80%' },
  { 'State': 'California', 'Avg Rate (30yr)': '7.08%', 'Median Home Price': '$756,000', 'Monthly PITI (20% down)': '$4,863', 'Property Tax Rate': '0.75%' },
  { 'State': 'Florida', 'Avg Rate (30yr)': '7.15%', 'Median Home Price': '$398,000', 'Monthly PITI (20% down)': '$2,789', 'Property Tax Rate': '0.98%' },
  { 'State': 'New York', 'Avg Rate (30yr)': '7.10%', 'Median Home Price': '$445,000', 'Monthly PITI (20% down)': '$3,201', 'Property Tax Rate': '1.72%' },
  { 'State': 'Illinois', 'Avg Rate (30yr)': '7.18%', 'Median Home Price': '$267,000', 'Monthly PITI (20% down)': '$2,098', 'Property Tax Rate': '2.27%' },
  { 'State': 'Ohio', 'Avg Rate (30yr)': '7.21%', 'Median Home Price': '$218,000', 'Monthly PITI (20% down)': '$1,592', 'Property Tax Rate': '1.59%' },
  { 'State': 'Georgia', 'Avg Rate (30yr)': '7.09%', 'Median Home Price': '$319,000', 'Monthly PITI (20% down)': '$2,180', 'Property Tax Rate': '0.92%' },
  { 'State': 'North Carolina', 'Avg Rate (30yr)': '7.11%', 'Median Home Price': '$322,000', 'Monthly PITI (20% down)': '$2,207', 'Property Tax Rate': '0.82%' },
  { 'State': 'Arizona', 'Avg Rate (30yr)': '7.14%', 'Median Home Price': '$354,000', 'Monthly PITI (20% down)': '$2,435', 'Property Tax Rate': '0.62%' },
  { 'State': 'Colorado', 'Avg Rate (30yr)': '7.13%', 'Median Home Price': '$522,000', 'Monthly PITI (20% down)': '$3,482', 'Property Tax Rate': '0.54%' },
  { 'State': 'Washington', 'Avg Rate (30yr)': '7.07%', 'Median Home Price': '$561,000', 'Monthly PITI (20% down)': '$3,698', 'Property Tax Rate': '1.07%' },
  { 'State': 'Virginia', 'Avg Rate (30yr)': '7.10%', 'Median Home Price': '$372,000', 'Monthly PITI (20% down)': '$2,531', 'Property Tax Rate': '0.87%' },
  { 'State': 'Nevada', 'Avg Rate (30yr)': '7.16%', 'Median Home Price': '$412,000', 'Monthly PITI (20% down)': '$2,781', 'Property Tax Rate': '0.84%' },
  { 'State': 'Michigan', 'Avg Rate (30yr)': '7.20%', 'Median Home Price': '$218,000', 'Monthly PITI (20% down)': '$1,724', 'Property Tax Rate': '1.61%' },
  { 'State': 'Pennsylvania', 'Avg Rate (30yr)': '7.19%', 'Median Home Price': '$236,000', 'Monthly PITI (20% down)': '$1,876', 'Property Tax Rate': '1.58%' },
]

export const mortgageByCreditScore: TR[] = [
  { 'Credit Score': '760-850 (Excellent)', 'Rate Estimate': '6.75-7.00%', '$300K Payment': '$1,946-$1,996', '$500K Payment': '$3,243-$3,326', 'Annual Savings vs 620': '$4,800+' },
  { 'Credit Score': '720-759 (Very Good)', 'Rate Estimate': '6.90-7.15%', '$300K Payment': '$1,977-$2,028', '$500K Payment': '$3,295-$3,380', 'Annual Savings vs 620': '$3,600+' },
  { 'Credit Score': '680-719 (Good)', 'Rate Estimate': '7.10-7.40%', '$300K Payment': '$2,012-$2,069', '$500K Payment': '$3,353-$3,449', 'Annual Savings vs 620': '$2,000+' },
  { 'Credit Score': '640-679 (Fair)', 'Rate Estimate': '7.50-8.00%', '$300K Payment': '$2,098-$2,201', '$500K Payment': '$3,497-$3,668', 'Annual Savings vs 620': '$600+' },
  { 'Credit Score': '620-639 (Poor)', 'Rate Estimate': '8.10-8.50%', '$300K Payment': '$2,226-$2,305', '$500K Payment': '$3,710-$3,841', 'Annual Savings vs 620': 'Baseline' },
  { 'Credit Score': 'Below 620', 'Rate Estimate': 'FHA/Hard Money', '$300K Payment': '$2,400+', '$500K Payment': '$4,000+', 'Annual Savings vs 620': 'N/A' },
]

export const autoLoanRatesByCredit: TR[] = [
  { 'Credit Score Range': '781-850 (Super Prime)', 'New Car Rate': '5.08%', 'Used Car Rate': '6.82%', '$30K New/60mo': '$569/mo', '$20K Used/48mo': '$471/mo' },
  { 'Credit Score Range': '661-780 (Prime)', 'New Car Rate': '6.89%', 'Used Car Rate': '9.04%', '$30K New/60mo': '$592/mo', '$20K Used/48mo': '$498/mo' },
  { 'Credit Score Range': '601-660 (Non-Prime)', 'New Car Rate': '11.53%', 'Used Car Rate': '13.28%', '$30K New/60mo': '$652/mo', '$20K Used/48mo': '$540/mo' },
  { 'Credit Score Range': '501-600 (Subprime)', 'New Car Rate': '15.77%', 'Used Car Rate': '19.87%', '$30K New/60mo': '$723/mo', '$20K Used/48mo': '$603/mo' },
  { 'Credit Score Range': '300-500 (Deep Sub)', 'New Car Rate': '14.18%+', 'Used Car Rate': '21.38%+', '$30K New/60mo': '$698+', '$20K Used/48mo': '$626+' },
]

export const autoLoanByState: TR[] = [
  { 'State': 'Texas', 'Avg Loan Amount': '$42,800', 'Avg Rate': '7.2%', 'Avg Term': '69 mo', 'Sales Tax': '6.25%', 'Monthly Pmt': '$806' },
  { 'State': 'California', 'Avg Loan Amount': '$44,200', 'Avg Rate': '7.0%', 'Avg Term': '71 mo', 'Sales Tax': '7.25%+', 'Monthly Pmt': '$832' },
  { 'State': 'Florida', 'Avg Loan Amount': '$40,100', 'Avg Rate': '7.4%', 'Avg Term': '68 mo', 'Sales Tax': '6.00%', 'Monthly Pmt': '$754' },
  { 'State': 'New York', 'Avg Loan Amount': '$39,600', 'Avg Rate': '7.1%', 'Avg Term': '67 mo', 'Sales Tax': '4.00%+', 'Monthly Pmt': '$744' },
  { 'State': 'Michigan', 'Avg Loan Amount': '$38,900', 'Avg Rate': '7.6%', 'Avg Term': '66 mo', 'Sales Tax': '6.00%', 'Monthly Pmt': '$736' },
  { 'State': 'Georgia', 'Avg Loan Amount': '$41,200', 'Avg Rate': '7.3%', 'Avg Term': '69 mo', 'Sales Tax': '7.00%', 'Monthly Pmt': '$774' },
  { 'State': 'Ohio', 'Avg Loan Amount': '$37,800', 'Avg Rate': '7.5%', 'Avg Term': '65 mo', 'Sales Tax': '5.75%', 'Monthly Pmt': '$716' },
  { 'State': 'Pennsylvania', 'Avg Loan Amount': '$38,200', 'Avg Rate': '7.4%', 'Avg Term': '66 mo', 'Sales Tax': '6.00%', 'Monthly Pmt': '$722' },
]

export const budgetByIncomeLevel: TR[] = [
  { 'Annual Income': '$30,000', 'Take-Home/mo': '$2,100', 'Housing (50% needs)': '$525', 'Food': '$350', 'Transport': '$300', 'Entertainment (30%)': '$630', 'Savings (20%)': '$420' },
  { 'Annual Income': '$45,000', 'Take-Home/mo': '$3,100', 'Housing (50% needs)': '$775', 'Food': '$450', 'Transport': '$375', 'Entertainment (30%)': '$930', 'Savings (20%)': '$620' },
  { 'Annual Income': '$60,000', 'Take-Home/mo': '$4,050', 'Housing (50% needs)': '$1,013', 'Food': '$550', 'Transport': '$450', 'Entertainment (30%)': '$1,215', 'Savings (20%)': '$810' },
  { 'Annual Income': '$75,000', 'Take-Home/mo': '$4,950', 'Housing (50% needs)': '$1,238', 'Food': '$625', 'Transport': '$500', 'Entertainment (30%)': '$1,485', 'Savings (20%)': '$990' },
  { 'Annual Income': '$90,000', 'Take-Home/mo': '$5,800', 'Housing (50% needs)': '$1,450', 'Food': '$700', 'Transport': '$550', 'Entertainment (30%)': '$1,740', 'Savings (20%)': '$1,160' },
  { 'Annual Income': '$120,000', 'Take-Home/mo': '$7,500', 'Housing (50% needs)': '$1,875', 'Food': '$850', 'Transport': '$650', 'Entertainment (30%)': '$2,250', 'Savings (20%)': '$1,500' },
  { 'Annual Income': '$150,000', 'Take-Home/mo': '$9,100', 'Housing (50% needs)': '$2,275', 'Food': '$1,000', 'Transport': '$750', 'Entertainment (30%)': '$2,730', 'Savings (20%)': '$1,820' },
]

export const taxBracketsByState2026: TR[] = [
  { 'State': 'California', 'State Tax Rate': '1-13.3% (9 brackets)', 'Top Rate': '13.30%', '$80K State Tax': '$5,843', 'No State Tax': 'No' },
  { 'State': 'Texas', 'State Tax Rate': 'None', 'Top Rate': '0%', '$80K State Tax': '$0', 'No State Tax': 'Yes v' },
  { 'State': 'Florida', 'State Tax Rate': 'None', 'Top Rate': '0%', '$80K State Tax': '$0', 'No State Tax': 'Yes v' },
  { 'State': 'New York', 'State Tax Rate': '4-10.9%', 'Top Rate': '10.90%', '$80K State Tax': '$4,560', 'No State Tax': 'No' },
  { 'State': 'Washington', 'State Tax Rate': 'None (7% cap gains only)', 'Top Rate': '0%', '$80K State Tax': '$0', 'No State Tax': 'Yes v' },
  { 'State': 'Illinois', 'State Tax Rate': 'Flat 4.95%', 'Top Rate': '4.95%', '$80K State Tax': '$3,960', 'No State Tax': 'No' },
  { 'State': 'Pennsylvania', 'State Tax Rate': 'Flat 3.07%', 'Top Rate': '3.07%', '$80K State Tax': '$2,456', 'No State Tax': 'No' },
  { 'State': 'Ohio', 'State Tax Rate': '0-3.99%', 'Top Rate': '3.99%', '$80K State Tax': '$2,312', 'No State Tax': 'No' },
  { 'State': 'Georgia', 'State Tax Rate': 'Flat 5.49%', 'Top Rate': '5.49%', '$80K State Tax': '$4,392', 'No State Tax': 'No' },
  { 'State': 'Arizona', 'State Tax Rate': 'Flat 2.5%', 'Top Rate': '2.50%', '$80K State Tax': '$2,000', 'No State Tax': 'No' },
  { 'State': 'Nevada', 'State Tax Rate': 'None', 'Top Rate': '0%', '$80K State Tax': '$0', 'No State Tax': 'Yes v' },
  { 'State': 'Colorado', 'State Tax Rate': 'Flat 4.40%', 'Top Rate': '4.40%', '$80K State Tax': '$3,520', 'No State Tax': 'No' },
]

export const wealthByAgeUSA: TR[] = [
  { 'Age Group': 'Under 35', 'Median Net Worth': '$39,000', 'Mean Net Worth': '$183,000', 'Top 25% Has': '$168,000+', 'Savings Rate Needed': '20%+' },
  { 'Age Group': '35-44', 'Median Net Worth': '$135,000', 'Mean Net Worth': '$549,000', 'Top 25% Has': '$590,000+', 'Savings Rate Needed': '20%+' },
  { 'Age Group': '45-54', 'Median Net Worth': '$247,000', 'Mean Net Worth': '$975,000', 'Top 25% Has': '$1.1M+', 'Savings Rate Needed': '25%+' },
  { 'Age Group': '55-64', 'Median Net Worth': '$364,000', 'Mean Net Worth': '$1,566,000', 'Top 25% Has': '$1.8M+', 'Savings Rate Needed': '30%+' },
  { 'Age Group': '65-74', 'Median Net Worth': '$410,000', 'Mean Net Worth': '$1,795,000', 'Top 25% Has': '$2.2M+', 'Savings Rate Needed': 'In retirement' },
  { 'Age Group': '75+', 'Median Net Worth': '$335,000', 'Mean Net Worth': '$1,624,000', 'Top 25% Has': '$1.9M+', 'Savings Rate Needed': 'In retirement' },
]

export const hourlyToAnnualTable: TR[] = [
  { 'Hourly Rate': '$12/hr', 'Annual (40hr/52wk)': '$24,960', 'Monthly Gross': '$2,080', 'After Tax (est.)': '$1,809/mo', 'State Example': 'Below living wage most cities' },
  { 'Hourly Rate': '$15/hr', 'Annual (40hr/52wk)': '$31,200', 'Monthly Gross': '$2,600', 'After Tax (est.)': '$2,189/mo', 'State Example': 'Min wage CA, NY, WA' },
  { 'Hourly Rate': '$18/hr', 'Annual (40hr/52wk)': '$37,440', 'Monthly Gross': '$3,120', 'After Tax (est.)': '$2,561/mo', 'State Example': 'Median retail worker' },
  { 'Hourly Rate': '$20/hr', 'Annual (40hr/52wk)': '$41,600', 'Monthly Gross': '$3,467', 'After Tax (est.)': '$2,823/mo', 'State Example': 'US median hourly wage' },
  { 'Hourly Rate': '$25/hr', 'Annual (40hr/52wk)': '$52,000', 'Monthly Gross': '$4,333', 'After Tax (est.)': '$3,434/mo', 'State Example': 'Above national median' },
  { 'Hourly Rate': '$30/hr', 'Annual (40hr/52wk)': '$62,400', 'Monthly Gross': '$5,200', 'After Tax (est.)': '$3,990/mo', 'State Example': 'Skilled trades average' },
  { 'Hourly Rate': '$35/hr', 'Annual (40hr/52wk)': '$72,800', 'Monthly Gross': '$6,067', 'After Tax (est.)': '$4,522/mo', 'State Example': 'Tech/finance entry level' },
  { 'Hourly Rate': '$40/hr', 'Annual (40hr/52wk)': '$83,200', 'Monthly Gross': '$6,933', 'After Tax (est.)': '$5,017/mo', 'State Example': 'Nurse, senior skilled trade' },
  { 'Hourly Rate': '$50/hr', 'Annual (40hr/52wk)': '$104,000', 'Monthly Gross': '$8,667', 'After Tax (est.)': '$6,034/mo', 'State Example': 'Six-figure threshold' },
  { 'Hourly Rate': '$75/hr', 'Annual (40hr/52wk)': '$156,000', 'Monthly Gross': '$13,000', 'After Tax (est.)': '$8,551/mo', 'State Example': 'Senior tech, consulting' },
  { 'Hourly Rate': '$100/hr', 'Annual (40hr/52wk)': '$208,000', 'Monthly Gross': '$17,333', 'After Tax (est.)': '$10,847/mo', 'State Example': 'Director/VP level' },
]

export const retirementByAge: TR[] = [
  { 'Current Age': '25', 'Retire at 65': '$500/mo -> $1.3M', 'Retire at 60': '$1,000/mo -> $1.5M', 'FIRE at 45': '$3,000/mo -> $1.2M', 'Assumed Return': '7%' },
  { 'Current Age': '30', 'Retire at 65': '$500/mo -> $911K', 'Retire at 60': '$800/mo -> $887K', 'FIRE at 45': '$2,500/mo -> $758K', 'Assumed Return': '7%' },
  { 'Current Age': '35', 'Retire at 65': '$700/mo -> $876K', 'Retire at 60': '$1,200/mo -> $854K', 'FIRE at 45': '$3,500/mo -> $601K', 'Assumed Return': '7%' },
  { 'Current Age': '40', 'Retire at 65': '$1,000/mo -> $811K', 'Retire at 60': '$2,000/mo -> $791K', 'FIRE at 45': '$5,000/mo -> $351K', 'Assumed Return': '7%' },
  { 'Current Age': '45', 'Retire at 65': '$1,500/mo -> $753K', 'Retire at 60': '$3,500/mo -> $736K', 'FIRE at 45': 'Very difficult', 'Assumed Return': '7%' },
  { 'Current Age': '50', 'Retire at 65': '$2,500/mo -> $743K', 'Retire at 60': '$6,000/mo -> $688K', 'FIRE at 45': 'N/A', 'Assumed Return': '7%' },
]

export const loanPayoffByExtra: TR[] = [
  { 'Loan Balance': '$25,000', 'Rate': '7%', 'Min Payment': '$292/mo', '+$50/mo saves': '$487 / 10 mo', '+$100/mo saves': '$891 / 19 mo', '+$200/mo saves': '$1,487 / 30 mo' },
  { 'Loan Balance': '$50,000', 'Rate': '7%', 'Min Payment': '$584/mo', '+$50/mo saves': '$601 / 9 mo', '+$100/mo saves': '$1,155 / 17 mo', '+$200/mo saves': '$2,058 / 30 mo' },
  { 'Loan Balance': '$150,000', 'Rate': '7%', 'Min Payment': '$1,326/mo', '+$50/mo saves': 'N/A', '+$100/mo saves': '$8,900 / 7 mo', '+$200/mo saves': '$16,800 / 14 mo' },
  { 'Loan Balance': '$300,000', 'Rate': '7%', 'Min Payment': '$1,996/mo', '+$50/mo saves': 'N/A', '+$100/mo saves': '$17,000 / 5 mo', '+$200/mo saves': '$32,000 / 10 mo' },
  { 'Loan Balance': '$400,000', 'Rate': '7%', 'Min Payment': '$2,661/mo', '+$50/mo saves': 'N/A', '+$100/mo saves': 'N/A', '+$200/mo saves': '$51,000 / 10 mo' },
]
