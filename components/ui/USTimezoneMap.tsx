'use client'

import { useEffect, useState } from 'react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from 'react-leaflet'

import L from 'leaflet'

import type {
  Feature,
  FeatureCollection,
  Geometry,
} from 'geojson'


function getTimezoneId(
  feature?: Feature<Geometry, any>
): string {
  return feature?.properties?.tzid ?? ''
}

// Some ZIP records use legacy/deprecated IANA tzids (backward-compat
// "Link" entries) that no longer have their own boundary polygon in the
// tz database — e.g. the Navajo Nation carve-out `America/Shiprock` is a
// link to `America/Denver`. Map those to the tzid that actually has a
// polygon so the correct region still highlights.
const TZID_ALIASES: Record<string, string> = {
  'America/Shiprock': 'America/Denver',
}

function resolveTimezoneId(tzid: string): string {
  return TZID_ALIASES[tzid] ?? tzid
}

// Friendly display name for a tzid, including state-split zones like
// "America/Indiana/Vevay" or territories like "Pacific/Pago_Pago".
function formatTimezoneName(tzid: string): string {
  if (!tzid) return ''
  const parts = tzid.split('/')
  const city = parts[parts.length - 1].replaceAll('_', ' ')
  const region = parts.slice(0, -1).join(' / ')
  return region ? `${region} / ${city}` : city
}

function getTimezoneStyle(
  feature: Feature<Geometry, any> | undefined,
  selectedTimezone: string
): L.PathOptions {

  const tz = getTimezoneId(feature)
  const selected = tz === resolveTimezoneId(selectedTimezone)

  return {
    // Boundary
    color: selected
      ? '#15803d'
      : '#475569',

    weight: selected
      ? 4
      : 1.5,

    // Area
    fillColor: selected
      ? '#22c55e'
      : '#cbd5e1',

    fillOpacity: selected
      ? 0.28
      : 0.10,

    opacity: selected
      ? 1
      : 0.65,
  }
}

function MapLegend({
  timezone,
}: {
  timezone: string
}) {

  return (
    <div
      className="absolute bottom-4 left-4 z-[1000] bg-white/95 border border-gray-200 rounded-xl shadow-lg px-3 py-2"
      style={{
        pointerEvents: 'none',
      }}
    >

      <div className="text-[10px] font-black text-gray-500 uppercase mb-2">
        Timezone Boundaries
      </div>

      <div className="flex items-center gap-2 text-xs mb-1">

        <span
          className="w-4 h-3 rounded-sm"
          style={{
            background: '#22c55e',
            border: '2px solid #15803d',
          }}
        />

        <span className="font-bold text-gray-700">
          Selected
        </span>

      </div>

      <div className="text-[10px] text-green-700 font-semibold mb-2 pl-6">
        {timezone}
      </div>

      <div className="flex items-center gap-2 text-xs">

        <span
          className="w-4 h-3 rounded-sm"
          style={{
            background: '#cbd5e1',
            border: '1px solid #475569',
          }}
        />

        <span className="text-gray-600">
          Other timezones
        </span>

      </div>

    </div>
  )
}

interface USTimezoneMapProps {
  lat: number
  lng: number
  zip: string
  city: string
  stateCode: string
  timezone: string
}


// ── Fix Leaflet marker icons in Next.js ─────────────────────

const markerIcon = L.icon({
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})


// ── Automatically move map when ZIP changes ─────────────────

function MapController({
  lat,
  lng,
  timezoneData,
  timezone,
}: {
  lat: number
  lng: number
  timezoneData: FeatureCollection | null
  timezone: string
}) {

  const map = useMap()

  useEffect(() => {

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng)
    ) {
      return
    }

    // If we have the boundary polygon for this ZIP's timezone, fit the
    // whole region into view (this is what actually makes "highlight
    // entire timezone region" visible/legible — a fixed zoom=7 flyTo
    // crops huge zones like Alaska or Nevada's slice of Pacific time).
    const resolvedTz = resolveTimezoneId(timezone)

    const match = timezoneData?.features?.find(
      (f) => getTimezoneId(f as Feature<Geometry, any>) === resolvedTz
    )

    if (match) {
      try {
        const bounds = L.geoJSON(match as any).getBounds()
        if (bounds.isValid()) {
          map.flyToBounds(bounds, {
            padding: [40, 40],
            duration: 1.2,
            maxZoom: 9,
          })
          return
        }
      } catch {
        // fall through to point flyTo below
      }
    }

    map.flyTo(
      [lat, lng],
      7,
      {
        duration: 1.2,
      }
    )

  }, [lat, lng, map, timezoneData, timezone])


  


  return null
}


// ── Main Map ─────────────────────────────────────────────────

export default function USTimezoneMap({
  lat,
  lng,
  zip,
  city,
  stateCode,
  timezone,
}: USTimezoneMapProps) {


  const [timezoneData, setTimezoneData] =
  useState<FeatureCollection | null>(null)

const [timezoneLoading, setTimezoneLoading] =
  useState(true)

const [timezoneError, setTimezoneError] =
  useState('')

  useEffect(() => {

  let cancelled = false

  async function loadTimezoneData() {

    try {

      setTimezoneLoading(true)
      setTimezoneError('')

    const response = await fetch(
  '/data/us-timezones.json'
)

if (!response.ok) {
  throw new Error(
    `Failed to load timezone data: ${response.status}`
  )
}

const data: FeatureCollection =
  await response.json()

if (!cancelled) {
  setTimezoneData(data)
}
    } catch (error) {

      console.error(
        'Timezone GeoJSON loading error:',
        error
      )

      if (!cancelled) {
        setTimezoneError(
          'Timezone boundaries could not be loaded.'
        )
      }

    } finally {

      if (!cancelled) {
        setTimezoneLoading(false)
      }
    }
  }

  loadTimezoneData()

  return () => {
    cancelled = true
  }

}, [timezone])

function onEachTimezone(
  feature: Feature<Geometry, any>,
  layer: L.Layer
) {

  const tz = getTimezoneId(feature)

  if (!tz) return


const displayName = formatTimezoneName(tz)


  layer.bindTooltip(
    displayName,
    {
      sticky: true,
      direction: 'top',
    }
  )


  layer.on({

  mouseover: (event: any) => {

  const selected =
    tz === resolveTimezoneId(timezone)

  event.target.setStyle({

    weight: selected
      ? 5
      : 3,

    color: selected
      ? '#15803d'
      : '#334155',

    fillOpacity: selected
      ? 0.38
      : 0.22,

    opacity: 1,
  })

  event.target.bringToFront?.()
},


    mouseout: (event: any) => {

      event.target.setStyle(
        getTimezoneStyle(
          feature,
          timezone
        )
      )

    },


    click: (event: any) => {

      const clickedLayer =
        event.target

      if (
        clickedLayer.getBounds &&
        clickedLayer._map
      ) {

        clickedLayer._map.fitBounds(
          clickedLayer.getBounds(),
          {
            padding: [30, 30],
          }
        )
      }

    },

  })
}



  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng)
  ) {
    return null
  }


  return (

    <div className="rounded-2xl overflow-hidden border border-gray-200">

      {/* Header */}

      <div className="bg-white px-4 py-3 border-b">

        <div className="flex items-center justify-between gap-3">

          <div>

            <h3 className="font-black text-gray-900 text-sm">
              🇺🇸 Interactive US Timezone Map
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              ZIP {zip} • {city}, {stateCode}
            </p>

          </div>


          <div className="text-right">

            <div className="text-[10px] text-gray-400">
              Timezone
            </div>

            <div className="font-bold text-xs text-green-700">
              {timezone}
            </div>

          </div>

        </div>

      </div>


      {/* Actual Leaflet map */}

      <div className="relative">


      {timezoneLoading && (

  <div className="absolute z-[1000] top-3 left-1/2 -translate-x-1/2">

    <div className="bg-white shadow-lg border rounded-full px-4 py-2 text-xs font-semibold text-gray-600">

      🌍 Loading timezone boundaries...

    </div>

  </div>

)}

{timezoneError && (

  <div className="absolute z-[1000] top-3 left-1/2 -translate-x-1/2">

    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-xs font-semibold text-red-700">

      {timezoneError}

    </div>

  </div>

)}


<MapLegend
  timezone={timezone}
/>



        <MapContainer
          center={[lat, lng]}
          zoom={7}
          minZoom={2}
          maxZoom={15}
          scrollWheelZoom={true}
          style={{
            height: '430px',
            width: '100%',
          }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {timezoneData && (

  <GeoJSON
    key={`${timezone}-${timezoneData.features.length}`}
    data={timezoneData}

    style={(feature) =>
      getTimezoneStyle(
        feature as Feature<Geometry, any>,
        timezone
      )
    }

    onEachFeature={onEachTimezone}
  />

)}


          <Marker
            position={[lat, lng]}
            icon={markerIcon}
          >

            <Popup>

              <div>

                <div
                  style={{
                    fontWeight: 800,
                    fontSize: '14px',
                  }}
                >
                  📍 ZIP {zip}
                </div>

                <div
                  style={{
                    marginTop: '3px',
                  }}
                >
                  {city}, {stateCode}
                </div>

                <div
                  style={{
                    marginTop: '4px',
                    fontSize: '11px',
                    color: '#6b7280',
                  }}
                >
                  {timezone}
                </div>

              </div>

            </Popup>

          </Marker>


          <MapController
            lat={lat}
            lng={lng}
            timezoneData={timezoneData}
            timezone={timezone}
          />

        </MapContainer>

      </div>


      {/* Footer */}

      <div className="bg-gray-50 px-4 py-2 border-t">

        <p className="text-[10px] text-gray-500">
          Drag to pan • Scroll or use +/− to zoom • Marker shows the ZIP centroid
        </p>

      </div>

    </div>

  )
}