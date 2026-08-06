'use client'
import { calculateRealEstateCostBasis } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, relatedCalculators }: Props) {
  const [purchasePrice, setPurchasePrice] = useState(300000)
  const [closingCosts, setClosingCosts] = useState(9000)
  const [improvements, setImprovements] = useState(35000)
  const [depreciation, setDepreciation] = useState(0)
  const [salePrice, setSalePrice] = useState(600000)
  const [sellingCosts, setSellingCosts] = useState(36000)
  const [yearsHeld, setYearsHeld] = useState(7)

  const result = useMemo(() => {
    try {
      return calculateRealEstateCostBasis(purchasePrice, closingCosts, improvements, depreciation, salePrice, sellingCosts, yearsHeld)
    } catch(e) { return null }
  }, [purchasePrice, closingCosts, improvements, depreciation, salePrice, sellingCosts, yearsHeld])

  return (
    <CalculatorLayout
      title="Real Estate Cost Basis & Capital Gains Calculator"
      description="Estimate adjusted basis and realized gain from purchase costs, improvements, depreciation and selling costs, with the current ToolTrio tax assumptions shown clearly."
      icon="🏘️"
      category="Finance"
      relatedCalculators={relatedCalculators}
      slug="real-estate-cost-basis-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          {/* Inputs */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Original Purchase Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Closing Costs at Purchase ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Capital Improvements ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={improvements} onChange={e => setImprovements(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Depreciation Taken ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={depreciation} onChange={e => setDepreciation(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sale Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salePrice} onChange={e => setSalePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Selling Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={sellingCosts} onChange={e => setSellingCosts(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Held</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsHeld} onChange={e => setYearsHeld(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Adjusted Cost Basis" value={result ? `${Number(result.adjustedBasis).toLocaleString()}` : "—"} highlight />
                <ResultCard label="Realized Gain" value={result ? `${Number(result.realizedGain).toLocaleString()}` : "—"} />
                <ResultCard label="Section 121 Exclusion" value={result ? `${Number(result.section121Exclusion).toLocaleString()}` : "—"} />
                <ResultCard label="Taxable Gain" value={result ? `${Number(result.taxableGain).toLocaleString()}` : "—"} />
                <ResultCard label="Depreciation Recapture Tax" value={result ? `${Number(result.deprecRecapture).toLocaleString()}` : "—"} />
                <ResultCard label="Net Profit After Tax" value={result ? `${Number(result.netProfit).toLocaleString()}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏘️ What This Real Estate Cost Basis Calculator Models</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This model calculates adjusted basis as purchase price + entered purchase closing costs + capital improvements − depreciation, then compares it with net sale proceeds. It also shows a simplified federal tax scenario. Because the current UI does not ask whether the property is a qualifying main home, filing status, income or prior exclusion history, its tax outputs are planning estimates rather than a tax-return calculation.</p>
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
          title="Real Estate Cost Basis & Capital Gains Calculator"
          category="finance"
          intro="Use this calculator to reconstruct a simplified adjusted basis and compare it with net sale proceeds. It is most useful when you want to see how purchase costs, capital improvements, depreciation and selling costs change the gain before discussing the transaction with a tax professional."
          howItWorks="The model uses Adjusted Basis = Purchase Price + Entered Closing Costs + Capital Improvements − Depreciation. Net Sale Proceeds = Sale Price − Selling Costs. Realized Gain = Net Sale Proceeds − Adjusted Basis. The current ToolTrio tax model then automatically applies up to a $250,000 Section 121 exclusion, taxes the entered depreciation-related amount at 25%, and applies a flat 15% rate to the remaining modeled taxable capital gain. Those last steps are deliberate simplifications, not a complete federal tax calculation."
          tipsSection="Example: with a $300,000 purchase, $9,000 of entered purchase costs, $35,000 of improvements, no depreciation, a $600,000 sale and $36,000 of selling costs, the model produces a $344,000 adjusted basis and $220,000 realized gain. It then applies its $250,000 exclusion assumption, leaving no modeled taxable gain. In real life, qualification for the home-sale exclusion depends on facts such as ownership and use. For a rental, enter cumulative depreciation carefully because it both reduces basis and affects the tax treatment of gain."
          conclusion="Important limitations: the calculator does not determine Section 121 eligibility, does not offer the $500,000 joint-return exclusion, and does not model income-based capital-gain rates, NIIT, state tax, partial exclusions, nonqualified use, 1031 exchanges or every basis adjustment. IRS guidance says gain generally depends on amount realized after selling expenses compared with adjusted basis, and qualifying main-home sellers may be able to exclude up to $250,000 or $500,000 on many joint returns. Use the result as an estimate, not tax advice."
          benefits={[
            { title: "Basis Reconstruction", text: "See how purchase costs, improvements and depreciation change the modeled adjusted basis." },
            { title: "Sale-Proceeds View", text: "Separate selling costs from sale price before comparing proceeds with basis." },
            { title: "Tax Assumptions Exposed", text: "The simplified exclusion and tax-rate assumptions are stated instead of hidden behind the result." },
          ]}
          useCases={[
            { title: "Home-Sale Planning", text: "Estimate the gain before checking whether the IRS ownership and use tests apply to your main-home sale." },
            { title: "Rental Record Review", text: "See why improvements and accumulated depreciation records can materially affect gain on disposition." },
          ]}
        />
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={relatedCalculators?.map(r => ({ name: r.name, href: r.href, icon: r.icon, desc: r.desc })) || []}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
