'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ { question: string; answer: string }

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="rounded-3xl border overflow-hidden" style={{background:'rgba(255,255,255,0.8)',backdropFilter:'blur(10px)',borderColor:'rgba(255,255,255,0.5)',boxShadow:'0 8px 30px rgba(15,23,42,0.05)'}}>
      <div className="px-6 py-4 border-b border-gray-100 bg-green-50">
        <h2 className="text-lg font-bold text-gray-900" style={{fontFamily:"'Playfair Display', serif"}}>Frequently Asked Questions</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-green-50/50 transition-all"
            >
              <span className="font-semibold text-gray-800 text-sm leading-relaxed">{faq.question}</span>
              <ChevronDown className={`w-4 h-4 text-green-600 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
