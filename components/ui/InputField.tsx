'use client'
import { useState, useEffect, useRef } from 'react'

interface InputFieldProps {
  label: string
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  showSlider?: boolean
}

export function InputField({ label, value, onChange, min = 0, max = 100, step = 1, prefix, suffix, showSlider = true }: InputFieldProps) {
  const [raw, setRaw] = useState(String(value))
  const isFocused = useRef(false)

  // Only sync from outside when NOT actively typing
  useEffect(() => {
    if (!isFocused.current) {
      setRaw(String(value))
    }
  }, [value])

  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const sliderBg = `linear-gradient(to right, #16a34a 0%, #16a34a ${pct}%, #d1fae5 ${pct}%, #d1fae5 100%)`

  const handleChange = (str: string) => {
    setRaw(str)
    const parsed = parseFloat(str)
    if (!isNaN(parsed) && str !== '' && str !== '-' && str !== '.') {
      onChange(Math.min(max, Math.max(min, parsed)))
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    isFocused.current = true
    e.target.select()
  }

  const handleBlur = () => {
    isFocused.current = false
    const parsed = parseFloat(raw)
    if (isNaN(parsed) || raw.trim() === '') {
      setRaw(String(value))
    } else {
      const clamped = Math.min(max, Math.max(min, parsed))
      setRaw(String(clamped))
      onChange(clamped)
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-1 bg-white border-2 border-green-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-green-500 transition-all">
          {prefix && <span className="text-green-600 text-sm font-bold">{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={e => handleChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-20 bg-transparent text-gray-900 font-bold text-sm text-right outline-none"
          />
          {suffix && <span className="text-gray-500 text-sm font-medium">{suffix}</span>}
        </div>
      </div>
      {showSlider && (
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => {
            const v = Number(e.target.value)
            setRaw(String(v))
            onChange(v)
          }}
          className="w-full h-1.5 rounded-full cursor-pointer"
          style={{ background: sliderBg }}
        />
      )}
    </div>
  )
}

// ─── HeightField ────────────────────────────────────────────────────────────
// Imperial: two boxes — feet (0–8) + inches (0–11), stored internally as total inches
// Metric:   one box  — cm
// valueIn: total inches (imperial) OR cm (metric)
// onChangeIn: fires with total inches or cm depending on unit

interface HeightFieldProps {
  /** 'imperial' = stored as total inches | 'metric' = stored as cm */
  unit: 'imperial' | 'metric'
  /** total inches when imperial, cm when metric */
  value: number
  onChange: (val: number) => void
  showSlider?: boolean
}

function SingleNumberInput({
  value, onChange, min, max, step, suffix, sliderMin, sliderMax,
  showSlider,
}: {
  value: number; onChange: (v: number) => void
  min: number; max: number; step: number; suffix: string
  sliderMin: number; sliderMax: number; showSlider: boolean
}) {
  const [raw, setRaw] = useState(String(value))
  const focused = useRef(false)

  useEffect(() => {
    if (!focused.current) setRaw(String(value))
  }, [value])

  const pct = Math.min(100, Math.max(0, ((value - sliderMin) / (sliderMax - sliderMin)) * 100))
  const bg = `linear-gradient(to right,#16a34a 0%,#16a34a ${pct}%,#d1fae5 ${pct}%,#d1fae5 100%)`

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 bg-white border-2 border-green-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-green-500 transition-all">
        <input
          type="text"
          inputMode="decimal"
          value={raw}
          onChange={e => {
            setRaw(e.target.value)
            const p = parseFloat(e.target.value)
            if (!isNaN(p) && e.target.value !== '' && e.target.value !== '-') {
              onChange(Math.min(max, Math.max(min, p)))
            }
          }}
          onFocus={e => { focused.current = true; e.target.select() }}
          onBlur={() => {
            focused.current = false
            const p = parseFloat(raw)
            if (isNaN(p) || raw.trim() === '') { setRaw(String(value)); return }
            const c = Math.min(max, Math.max(min, p))
            setRaw(String(c)); onChange(c)
          }}
          className="w-14 bg-transparent text-gray-900 font-bold text-sm text-right outline-none"
        />
        <span className="text-gray-500 text-sm font-medium">{suffix}</span>
      </div>
      {showSlider && (
        <input type="range" value={value} min={sliderMin} max={sliderMax} step={step}
          onChange={e => { const v = Number(e.target.value); setRaw(String(v)); onChange(v) }}
          className="w-full h-1.5 rounded-full cursor-pointer" style={{ background: bg }} />
      )}
    </div>
  )
}

export function HeightField({ unit, value, onChange, showSlider = true }: HeightFieldProps) {
  if (unit === 'metric') {
    // Single cm box
    const pct = Math.min(100, Math.max(0, ((value - 100) / (250 - 100)) * 100))
    const bg = `linear-gradient(to right,#16a34a 0%,#16a34a ${pct}%,#d1fae5 ${pct}%,#d1fae5 100%)`
    const [raw, setRaw] = useState(String(value))
    const focused = useRef(false)
    useEffect(() => { if (!focused.current) setRaw(String(value)) }, [value])
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-700">Height</label>
          <div className="flex items-center gap-1 bg-white border-2 border-green-200 rounded-xl px-3 py-1.5 shadow-sm focus-within:border-green-500 transition-all">
            <input type="text" inputMode="decimal" value={raw}
              onChange={e => { setRaw(e.target.value); const p = parseFloat(e.target.value); if (!isNaN(p)) onChange(Math.min(250, Math.max(100, p))) }}
              onFocus={e => { focused.current = true; e.target.select() }}
              onBlur={() => { focused.current = false; const p = parseFloat(raw); if (isNaN(p)) { setRaw(String(value)) } else { const c = Math.min(250, Math.max(100, p)); setRaw(String(c)); onChange(c) } }}
              className="w-20 bg-transparent text-gray-900 font-bold text-sm text-right outline-none" />
            <span className="text-gray-500 text-sm font-medium">cm</span>
          </div>
        </div>
        {showSlider && <input type="range" value={value} min={100} max={250} step={1}
          onChange={e => { const v = Number(e.target.value); setRaw(String(v)); onChange(v) }}
          className="w-full h-1.5 rounded-full cursor-pointer" style={{ background: bg }} />}
      </div>
    )
  }

  // Imperial: two boxes — feet (4–7) and inches (0–11)
  // value = total inches (e.g. 67 = 5'7")
  const totalIn = Math.round(value)
  const feet = Math.floor(totalIn / 12)
  const inches = totalIn % 12

  const handleFeet = (f: number) => {
    const clamped = Math.min(8, Math.max(4, Math.round(f)))
    onChange(clamped * 12 + inches)
  }
  const handleInches = (i: number) => {
    const clamped = Math.min(11, Math.max(0, Math.round(i)))
    onChange(feet * 12 + clamped)
  }

  const totalPct = Math.min(100, Math.max(0, ((totalIn - 48) / (96 - 48)) * 100))
  const sliderBg = `linear-gradient(to right,#16a34a 0%,#16a34a ${totalPct}%,#d1fae5 ${totalPct}%,#d1fae5 100%)`

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-semibold text-gray-700 shrink-0">Height</label>
        <div className="flex items-center gap-2">
          {/* Feet box */}
          <SingleNumberInput
            value={feet} onChange={handleFeet}
            min={4} max={8} step={1} suffix="ft"
            sliderMin={4} sliderMax={8} showSlider={false}
          />
          {/* Inches box */}
          <SingleNumberInput
            value={inches} onChange={handleInches}
            min={0} max={11} step={1} suffix="in"
            sliderMin={0} sliderMax={11} showSlider={false}
          />
        </div>
      </div>
      {/* Single slider for total inches */}
      {showSlider && (
        <input type="range" value={totalIn} min={48} max={96} step={1}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full cursor-pointer"
          style={{ background: sliderBg }}
        />
      )}
    </div>
  )
}

// ─── SelectField ────────────────────────────────────────────────────────────

interface SelectFieldProps {
  label: string
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 outline-none focus:border-green-500 transition-colors cursor-pointer shadow-sm"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
