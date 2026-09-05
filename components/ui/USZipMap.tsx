'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet'
import { zipFetch } from '@/lib/data/zip-client'

export interface ZipMapRecord {
  zip: string
  city: string
  state: string
  stateCode: string
  county: string
  lat: number
  lng: number
  population: number
  tzLabel?: string
  nearby?: { zip: string; city: string; stateCode: string; lat: number; lng: number; distance: number }[]
}

interface Props {
  result: ZipMapRecord | null
  loadingClick?: boolean
  onZipSelect: (zip: string) => void
  onMapClick: (lat: number, lng: number) => void
  onReset?: () => void
}

// Continental-US default view (also visible far enough out to see AK/HI on
// the standard web-mercator projection most people expect).
const US_CENTER: [number, number] = [39.8283, -98.5795]
const US_ZOOM = 4

// ── Pin icon (teardrop) built as an inline divIcon — no external image
// assets to fetch, fully themeable, crisp at any zoom. ─────────────────
function pinIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:30px;height:30px;
      border-radius:50% 50% 50% 0;
      background:${color};
      transform:rotate(-45deg);
      border:3px solid #fff;
      box-shadow:0 3px 10px rgba(0,0,0,.4);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  })
}

const mainPin = pinIcon('#16a34a')

// ── Fly the view to the selected ZIP whenever it changes ───────────────
function FlyTo({ lat, lng, zoom, nonce }: { lat: number; lng: number; zoom: number; nonce: number }) {
  const map = useMap()
  useEffect(() => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return
    map.flyTo([lat, lng], zoom, { duration: 1.1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce])
  return null
}

// ── Handle clicks anywhere on the map canvas ────────────────────────────
function ClickCatcher({ onClick, disabled }: { onClick: (lat: number, lng: number) => void; disabled: boolean }) {
  useMapEvents({
    click(e) {
      if (disabled) return
      onClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function ResetControl({ onReset }: { onReset: () => void }) {
  const map = useMap()
  return (
    <button
      onClick={() => { onReset(); map.flyTo(US_CENTER, US_ZOOM, { duration: 1 }) }}
      className="absolute z-[1000] top-3 right-3 bg-white shadow-lg border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
    >
      🇺🇸 Full US View
    </button>
  )
}

function LayerToggle({ satellite, setSatellite }: { satellite: boolean; setSatellite: (v: boolean) => void }) {
  return (
    <div className="absolute z-[1000] bottom-4 right-3 bg-white shadow-lg border border-gray-200 rounded-xl p-1 flex gap-1">
      <button
        onClick={() => setSatellite(false)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!satellite ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
      >
        🗺️ Street
      </button>
      <button
        onClick={() => setSatellite(true)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${satellite ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
      >
        🛰️ Satellite
      </button>
    </div>
  )
}

// ── Floating search box, sits on top of the map itself ─────────────────
function MapSearchBox({ onZipSelect }: { onZipSelect: (zip: string) => void }) {
  const [q, setQ] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const runSearch = useCallback(async (value: string) => {
    const val = value.trim()
    if (!val) { setSuggestions([]); return }
    if (/^\d{1,5}$/.test(val)) {
      if (val.length === 5) {
        setBusy(true)
        const res = await zipFetch(`/api/zip/lookup?zip=${val}`)
        const data = await res.json()
        setBusy(false)
        setSuggestions(res.ok ? [{ zip: data.zip, city: data.city, stateCode: data.stateCode }] : [])
      } else {
        setSuggestions([])
      }
      return
    }
    if (val.length < 2) { setSuggestions([]); return }
    setBusy(true)
    const res = await zipFetch(`/api/zip/search?q=${encodeURIComponent(val)}&limit=8`)
    const data = await res.json()
    setBusy(false)
    setSuggestions(res.ok ? data.results : [])
  }, [])

  function handleChange(v: string) {
    setQ(v)
    setOpen(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => runSearch(v), 250)
  }

  function pick(zip: string) {
    onZipSelect(zip)
    setOpen(false)
    setSuggestions([])
  }

  function submit() {
    const val = q.trim()
    if (/^\d{5}$/.test(val)) { pick(val); return }
    if (suggestions[0]) pick(suggestions[0].zip)
  }

  return (
    <div className="absolute z-[1000] top-3 left-3 right-3 sm:right-auto sm:w-80">
      <div className="bg-white shadow-lg border border-gray-200 rounded-xl flex items-center px-3 py-2 gap-2">
        <span className="text-gray-400">🔍</span>
        <input
          value={q}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          onFocus={() => setOpen(true)}
          placeholder="Search ZIP or city (e.g. 90210 or Austin)"
          className="flex-1 text-sm outline-none bg-transparent min-w-0"
        />
        {busy && <span className="text-[10px] text-gray-400">…</span>}
      </div>
      {open && suggestions.length > 0 && (
        <div className="mt-1 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
          {suggestions.map((s, i) => (
            <button
              key={`${s.zip}-${i}`}
              onClick={() => pick(s.zip)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 flex items-center justify-between gap-2 border-b border-gray-50 last:border-0"
            >
              <span className="font-mono font-bold text-gray-800">{s.zip}</span>
              <span className="text-gray-500 text-xs truncate">{s.city}, {s.stateCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function USZipMap({ result, loadingClick, onZipSelect, onMapClick, onReset }: Props) {
  const [satellite, setSatellite] = useState(false)
  const [flyNonce, setFlyNonce] = useState(0)
  const lastZip = useRef<string | null>(null)

  useEffect(() => {
    if (result?.zip && result.zip !== lastZip.current) {
      lastZip.current = result.zip
      setFlyNonce(n => n + 1)
    }
  }, [result?.zip])

  async function handleMapClick(lat: number, lng: number) {
    onMapClick(lat, lng)
  }

  return (
    <div className="relative rounded-3xl border overflow-hidden mb-5" style={{ borderColor: '#d1fae5', boxShadow: '0 10px 30px rgba(0,0,0,.07)' }}>
      {/* Header */}
      <div className="px-5 py-4 border-b bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-[2px] text-gray-400 font-bold">Fully Interactive Map</div>
          <h3 className="text-lg font-black text-gray-900 mt-1">
            {result ? `📍 ZIP ${result.zip} — ${result.city}, ${result.stateCode}` : '🇺🇸 Click Anywhere on the US Map'}
          </h3>
        </div>
        <div className="text-xs font-semibold text-green-600">
          {loadingClick ? '⏳ Finding ZIP…' : result ? '✓ ZIP located' : 'Click, search, or drop a pin'}
        </div>
      </div>

      <div className="relative" style={{ height: 520 }}>
        <MapContainer
          center={US_CENTER}
          zoom={US_ZOOM}
          minZoom={3}
          maxZoom={17}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          {satellite ? (
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}

          {result && Number.isFinite(result.lat) && Number.isFinite(result.lng) && (
            <Marker position={[result.lat, result.lng]} icon={mainPin}>
              <Popup>
                <div style={{ minWidth: 160 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>📍 ZIP {result.zip}</div>
                  <div style={{ marginTop: 3 }}>{result.city}, {result.stateCode}</div>
                  {result.county && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{result.county}</div>}
                  {result.population > 0 && (
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Pop. {result.population.toLocaleString()}</div>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {result?.nearby?.map(n => (
            <CircleMarker
              key={n.zip}
              center={[n.lat, n.lng]}
              radius={7}
              pathOptions={{ color: '#2563eb', weight: 2, fillColor: '#60a5fa', fillOpacity: 0.85 }}
              eventHandlers={{ click: () => onZipSelect(n.zip) }}
            >
              <Tooltip direction="top" offset={[0, -6]}>
                <span className="text-xs font-semibold">{n.zip} · {n.city}, {n.stateCode}</span>
              </Tooltip>
            </CircleMarker>
          ))}

          {result && <FlyTo lat={result.lat} lng={result.lng} zoom={12} nonce={flyNonce} />}

          <ClickCatcher onClick={handleMapClick} disabled={!!loadingClick} />
          <ResetControl onReset={() => onReset && onReset()} />
          <LayerToggle satellite={satellite} setSatellite={setSatellite} />
        </MapContainer>

        <MapSearchBox onZipSelect={onZipSelect} />

        {loadingClick && (
          <div className="absolute z-[1000] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-gray-700">
            ⏳ Locating nearest ZIP…
          </div>
        )}

        {!result && !loadingClick && (
          <div className="absolute z-[1000] bottom-4 left-3 bg-white/95 shadow-lg border border-gray-200 rounded-xl px-3 py-2 max-w-[240px]">
            <div className="text-[11px] font-bold text-gray-700">🖱️ Click anywhere on the map</div>
            <div className="text-[10px] text-gray-500 mt-0.5">We&apos;ll find the nearest ZIP code and drop a pin — or use the search box above.</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-xs text-gray-500">
          {result ? (
            <><span className="font-semibold text-gray-700">Center:</span> {result.lat.toFixed(5)}, {result.lng.toFixed(5)}</>
          ) : (
            'Drag to pan · Scroll or pinch to zoom · Click a blue dot to jump to a neighboring ZIP'
          )}
        </div>
        {result?.nearby && result.nearby.length > 0 && (
          <div className="text-xs text-gray-400">{result.nearby.length} neighboring ZIPs shown</div>
        )}
      </div>
    </div>
  )
}
