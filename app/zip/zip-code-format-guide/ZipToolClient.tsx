'use client'
export default function ZipFormatGuideClient() {
  const sections = [
    { title: '5-Digit ZIP Code (Standard)', content: 'The standard ZIP code is a 5-digit number (e.g., 10001). Introduced in 1963, ZIP stands for "Zone Improvement Plan." The first digit represents a national area, the next two a sectional center facility, and the final two a local post office or delivery area.', example: '10001', label: 'New York, NY' },
    { title: 'ZIP+4 (Extended ZIP Code)', content: 'The ZIP+4 code adds a hyphen and 4 additional digits after the 5-digit base (e.g., 10001-0001). The +4 identifies a specific city block, floor, or group of mailboxes. Required for bulk mailing and improves delivery speed.', example: '10001-0001', label: 'Specific delivery point' },
    { title: 'Delivery Point Code (11 digits)', content: 'The full 11-digit code includes the 5-digit ZIP, the 4-digit extension, and a 2-digit delivery point code. Used internally by USPS equipment for automated sorting.', example: '10001-0001-01', label: 'Full delivery point barcode' },
  ]
  const rules = [
    'Always use 5 digits — pad with leading zeros if needed (e.g., 01234, not 1234)',
    'ZIP codes run from 00501 (Holtsville, NY) to 99950 (Ketchikan, AK)',
    'Write the city, state, and ZIP on the same line in USPS format',
    'Use UPPERCASE for all address elements in printed mail',
    'Leave two spaces between state abbreviation and ZIP code',
    'USPS prefers the ZIP+4 format for business mail',
    'Never use punctuation within the ZIP code itself',
    'Military ZIP codes (APO/FPO/DPO) follow the same 5-digit format',
  ]
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {sections.map(s=>(
          <div key={s.title} className="rounded-2xl border p-4" style={{background:'rgba(240,253,244,0.7)',borderColor:'rgba(187,247,208,0.5)'}}>
            <div className="font-bold text-gray-800 mb-2">{s.title}</div>
            <p className="text-sm text-gray-600 mb-3">{s.content}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 border border-green-200">
              <span className="font-mono font-bold text-green-700">{s.example}</span>
              <span className="text-xs text-green-600">— {s.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border p-4" style={{background:'rgba(239,246,255,0.7)',borderColor:'rgba(147,197,253,0.5)'}}>
        <div className="font-bold text-blue-800 mb-3">📋 USPS ZIP Code Rules</div>
        <ul className="space-y-2">
          {rules.map((r,i)=>(
            <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
              <span className="text-blue-400 mt-0.5">→</span>{r}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border p-4" style={{background:'rgba(254,252,232,0.7)',borderColor:'rgba(253,224,71,0.5)'}}>
        <div className="font-bold text-yellow-800 mb-2">✉️ Example USPS Address Format</div>
        <div className="font-mono text-sm bg-white/80 rounded-xl p-4 text-gray-800 space-y-1">
          <div>JOHN SMITH</div>
          <div>123 MAIN ST APT 4B</div>
          <div>NEW YORK NY  10001-0001</div>
        </div>
      </div>
    </div>
  )
}