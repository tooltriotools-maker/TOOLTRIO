'use client'

interface Props {
  onSelect: (zip: string) => void
  label?: string
}

const POPULAR = [
  { zip: '10001', label: 'NYC' },
  { zip: '90210', label: 'Beverly Hills' },
  { zip: '60601', label: 'Chicago' },
  { zip: '77001', label: 'Houston' },
  { zip: '85001', label: 'Phoenix' },
  { zip: '19101', label: 'Philadelphia' },
  { zip: '78201', label: 'San Antonio' },
  { zip: '92101', label: 'San Diego' },
  { zip: '75201', label: 'Dallas' },
  { zip: '98101', label: 'Seattle' },
  { zip: '02108', label: 'Boston' },
  { zip: '30303', label: 'Atlanta' },
]

export function ZipQuickFill({ onSelect, label = 'Popular:' }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      {POPULAR.map(p => (
        <button
          key={p.zip}
          onClick={() => onSelect(p.zip)}
          className="text-xs px-3 py-1.5 rounded-full border border-green-200 text-green-700 bg-white hover:bg-green-50 hover:border-green-400 transition-all font-mono"
        >
          {p.zip} <span className="font-sans text-gray-400">({p.label})</span>
        </button>
      ))}
    </div>
  )
}
