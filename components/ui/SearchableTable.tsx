'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'

interface TableRow {
  [key: string]: string | number | undefined
}

interface SearchableTableProps {
  title: string
  description?: string
  headers: string[]
  rows: TableRow[]
  searchKey?: string
  searchPlaceholder?: string
  highlightKey?: string
}

export function SearchableTable({
  title, description, headers, rows, searchKey, searchPlaceholder = 'Filter...', highlightKey
}: SearchableTableProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? rows.filter(row =>
        Object.values(row).some(v =>
          String(v).toLowerCase().includes(query.toLowerCase())
        )
      )
    : rows

  return (
    <div className="my-6 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 border-b border-gray-100">
        <h3 className="text-base font-black text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
      </div>

      {searchKey && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {headers.map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((row, i) => (
              <tr key={i} className={`hover:bg-green-50 transition-colors ${highlightKey && row[highlightKey] ? 'bg-green-50/50 font-semibold' : ''}`}>
                {headers.map(h => (
                  <td key={h} className="px-4 py-3 text-gray-700">
                    {row[h] ?? '--'}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-4 py-8 text-center text-gray-400 text-sm">
                  No results for "{query}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-right">
        <span className="text-xs text-gray-400">
          {filtered.length} of {rows.length} entries
        </span>
      </div>
    </div>
  )
}
