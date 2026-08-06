'use client'
import { calculateCryptoTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [saleAmount, setSaleAmount] = useState(50000)
  const [costBasis, setCostBasis] = useState(20000)
  const [yearsHeld, setYearsHeld] = useState(1.5)
  const [otherIncome, setOtherIncome] = useState(90000)

  const result = useMemo(() => {
    try {
      return calculateCryptoTax(saleAmount, costBasis, yearsHeld, otherIncome, 'single')
    } catch(e) { return null }
  }, [saleAmount, costBasis, yearsHeld, otherIncome])

  return (
    <CalculatorLayout
      title="Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins"
      description="Calculate federal capital gains tax on cryptocurrency sales, short vs long-term rates, NIIT, and tax-saving strategies."
      icon="₿"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="crypto-tax-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sale Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={saleAmount} onChange={e => setSaleAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cost Basis ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={costBasis} onChange={e => setCostBasis(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Held</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsHeld} onChange={e => setYearsHeld(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e => setOtherIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Capital Gain" value={result ? `${Number(result.gain).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Tax Type" value={result ? String(result.isLongTerm ? 'Long-Term' : 'Short-Term') : "—"} />
                <ResultCard label="Tax Rate" value={result ? `${Number(result.taxRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Federal Tax" value={result ? `${Number(result.federalTax).toLocaleString()}` : "—"} />
                <ResultCard label="NIIT" value={result ? `${Number(result.niit).toLocaleString()}` : "—"} />
                <ResultCard label="Net Proceeds" value={result ? `${Number(result.netProceeds).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">₿ Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins — How to Use This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Cryptocurrency is taxed as property by the IRS, making every trade, sale, and swap a taxable event. Bitcoin held 366 days and sold is a long-term capital gain (0–20%); held 364 days and sold is a short-term ordinary income tax (up to 37%). The difference can be tens of thousands of dollars on large gains — timing matters enormously.</p>
              </Card>
            </>
          ) : (
            <Card>
              <p className="text-gray-500 text-center py-8">Fill in your details to see results →</p>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-8">
        <SEOContent
          title="Crypto Tax Calculator USA 2026 — Bitcoin, Ethereum & Altcoins"
          category="finance"
          intro="This calculator estimates federal tax on one digital-asset sale using sale proceeds, cost basis, holding period and other income. It first calculates gain = sale amount − basis, classifies the gain as short- or long-term using the entered years held, then applies a simplified federal rate table. It is a single-sale estimator, not a Form 8949 or Schedule D engine."
          howItWorks="Gain = sale amount − cost basis. Holdings of at least one entered year are routed to the calculator's long-term capital-gain rate bands; shorter holdings use a simplified ordinary-income rate table. The model may also add 3.8% NIIT when total modeled income exceeds $200,000 for its single-filer scenario. It does not stack gains through the full federal tax worksheet, handle capital-loss netting, state tax, transaction fees, collectibles treatment or multiple lots."
          tipsSection="Enter adjusted basis, including transaction costs that properly belong in basis under applicable rules. A crypto-for-crypto exchange can also be a taxable disposition; the calculator only accepts a dollar sale amount. The displayed tax rate is an approximation because capital-gain brackets interact with the rest of taxable income."
          conclusion="Use this estimate to understand the effect of basis and holding period, then calculate reportable gain/loss from complete transaction records under current IRS digital-asset guidance."
          benefits={[
            { title: "Methodology", text: "See the exact assumptions and calculation sequence used by this ToolTrio model." },
            { title: "Result interpretation", text: "Understand what the outputs mean and which important factors the model leaves out." },
            { title: "Scenario testing", text: "Change the calculator inputs to see which assumptions materially move the result." },
          ]}
          useCases={[
            { title: "Decision comparison", text: "Compare realistic alternatives while keeping the model's assumptions visible." },
            { title: "Assumption check", text: "Use the worked example to verify how the calculator turns inputs into outputs." },
          ]}
          caseStudy={{
            title: "Single crypto sale",
            scenario: "Selling for $50,000 with $20,000 basis creates a $30,000 modeled gain. With 1.5 years held, the calculator treats it as long-term.",
            result: "The rate then depends on the calculator's income thresholds after adding the gain to other income; NIIT is tested separately.",
            takeaway: "Real tax can differ because taxable income, deductions, loss carryovers and lot identification are outside this simplified function."
          }}
          commonMistakes="Enter adjusted basis, including transaction costs that properly belong in basis under applicable rules. A crypto-for-crypto exchange can also be a taxable disposition; the calculator only accepts a dollar sale amount. The displayed tax rate is an approximation because capital-gain brackets interact with the rest of taxable income."
          inlineLinks={[{ text: "IRS states that digital assets are property and explains federal reporting obligations.", href: "https://www.irs.gov/filing/digital-assets", label: "IRS digital assets" }]}
        />
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={relatedCalculators?.map(r => ({ name: r.name, href: r.href, icon: r.icon, desc: r.desc })) || []}
        />
        <FAQSection faqs={faqs} />
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Keeping transaction records</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>A crypto tax estimate depends on the transaction values entered into the calculator. Keep records of acquisition cost, disposal proceeds, dates, quantities, and transaction fees so the inputs can be checked later.</p>
            <p>Transfers, swaps, rewards, mining income, staking income, gifts, and transactions across multiple wallets can require different tax treatment depending on the applicable jurisdiction and circumstances. This calculator should therefore be used as an estimate based only on the inputs and assumptions it exposes.</p>
            <p>Before filing a tax return, reconcile the calculator inputs with exchange statements and wallet records and apply the tax rules that are actually applicable to the taxpayer and tax year.</p>
          </div>
        </Card>
      </div>
</div>
    </CalculatorLayout>
  )
}
