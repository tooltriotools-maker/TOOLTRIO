'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQAccordion({ faqs, colorText }: { faqs: { q: string; a: string }[]; colorText: string }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="mb-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-black text-gray-900 mb-2">❓ Frequently Asked Questions</h2>
      <p className="text-sm text-gray-500 mb-5">Detailed answers to the most common questions in this category — with real numbers and examples.</p>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open === i ? 'border-green-300 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open === i}
            >
              <span className="font-bold text-gray-900 text-sm leading-snug">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform text-gray-400 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <div className="h-px bg-gray-100 mb-4" />
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
