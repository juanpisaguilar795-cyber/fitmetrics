// app/calculators/tdee/page.tsx
'use client'

import { useState } from 'react'
import { formatNumber } from '@/lib/utils'
import { calculateTDEE, type TDEEResult } from '@/lib/calculators/tdee'

const ACTIVITY_OPTIONS = [
  { value: 'sedentary', label: 'Sedentario', desc: 'Sin ejercicio' },
  { value: 'light', label: 'Ligero', desc: '1-3 días/sem' },
  { value: 'moderate', label: 'Moderado', desc: '3-5 días/sem' },
  { value: 'active', label: 'Activo', desc: '6-7 días/sem' },
  { value: 'very_active', label: 'Muy activo', desc: '2 sesiones/día' },
]

export default function TDEEPage() {
  const [form, setForm] = useState({
    weight_kg: '',
    height_cm: '',
    age: '',
    sex: 'male',
    activity_level: 'moderate',
    goal: 'maintenance',
    formula: 'mifflin',
  })
  const [result, setResult] = useState<TDEEResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const weight = Number(form.weight_kg)
      const height = Number(form.height_cm)
      const age = Number(form.age)

      if (isNaN(weight) || weight <= 0) throw new Error('Ingresa un peso válido.')
      if (isNaN(height) || height <= 0) throw new Error('Ingresa una altura válida.')
      if (isNaN(age) || age <= 0) throw new Error('Ingresa una edad válida.')

      // Cálculo del lado del cliente
      const calculatedResult = calculateTDEE({
        weight_kg: weight,
        height_cm: height,
        age: age,
        sex: form.sex as 'male' | 'female',
        activity_level: form.activity_level as any,
        goal: form.goal as any,
        formula: form.formula as any,
      })

      setResult(calculatedResult)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al calcular')
    } finally {
      setLoading(false)
    }
  }

  const GOAL_LABELS: Record<string, string> = {
    deficit: 'Déficit (−500 kcal)',
    maintenance: 'Mantenimiento',
    surplus: 'Superávit (+300 kcal)',
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Calculadora</p>
        <h1 className="font-black text-4xl uppercase tracking-tight text-white">
          TDEE <span className="text-[#C8FF00]">/ Calorías</span>
        </h1>
        <p className="text-sm text-white/30 font-mono mt-2">
          Total Daily Energy Expenditure — Gasto energético total diario
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-5">

          {/* Fórmula */}
          <div className="flex gap-2">
            {[
              { value: 'mifflin', label: 'Mifflin-St Jeor' },
              { value: 'harris', label: 'Harris-Benedict' },
            ].map(o => (
              <button
                key={o.value}
                type="button"
                onClick={() => update('formula', o.value)}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest rounded-lg border transition-all ${form.formula === o.value
                    ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
                    : 'bg-[#181818] border-white/[0.07] text-white/30 hover:text-white/50'
                  }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {/* Sexo */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Sexo</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ value: 'male', label: 'Masculino' }, { value: 'female', label: 'Femenino' }].map(o => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => update('sex', o.value)}
                  className={`py-2.5 text-sm font-mono rounded-lg border transition-all ${form.sex === o.value
                      ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
                      : 'bg-[#181818] border-white/[0.07] text-white/40 hover:text-white/60'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Datos físicos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { key: 'weight_kg', label: 'Peso (kg)', placeholder: '75' },
              { key: 'height_cm', label: 'Altura (cm)', placeholder: '175' },
              { key: 'age', label: 'Edad', placeholder: '28' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</label>
                <input
                  type="number"
                  value={form[key as keyof typeof form]}
                  onChange={e => update(key, e.target.value)}
                  placeholder={placeholder}
                  required
                  className="bg-[#181818] border border-white/[0.07] rounded-lg px-3 py-2.5 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C8FF00]/40 transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Actividad */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Nivel de actividad</label>
            <div className="flex flex-col gap-1.5">
              {ACTIVITY_OPTIONS.map(o => (
                <label
                  key={o.value}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${form.activity_level === o.value
                      ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30'
                      : 'bg-[#181818] border-white/[0.07] hover:border-white/20'
                    }`}
                >
                  <input
                    type="radio"
                    name="activity_level"
                    value={o.value}
                    checked={form.activity_level === o.value}
                    onChange={() => update('activity_level', o.value)}
                    className="sr-only"
                  />
                  <span className={`text-xs font-mono ${form.activity_level === o.value ? 'text-[#C8FF00]' : 'text-white/60'}`}>
                    {o.label}
                  </span>
                  <span className="text-[10px] font-mono text-white/20">{o.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Objetivo */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Objetivo</label>
            <div className="grid grid-cols-3 gap-2">
              {['deficit', 'maintenance', 'surplus'].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => update('goal', g)}
                  className={`py-2 text-[10px] font-mono uppercase tracking-widest rounded-lg border transition-all ${form.goal === g
                      ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
                      : 'bg-[#181818] border-white/[0.07] text-white/30 hover:text-white/50'
                    }`}
                >
                  {g === 'deficit' ? 'Déficit' : g === 'maintenance' ? 'Manten.' : 'Superávit'}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C8FF00] text-black font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#d4ff26] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Calculando...' : 'Calcular TDEE →'}
          </button>
        </form>

        {/* Result panel */}
        <div className="flex flex-col gap-4">
          {!result ? (
            <div className="bg-[#111] border border-white/[0.07] rounded-xl p-8 flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-xl flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M9 19V13a3 3 0 01-6 0V6m6 13v-6m0 0a3 3 0 016 0v6m-6-6V6m6 13V10m0 0a3 3 0 016 0v9" />
                </svg>
              </div>
              <p className="text-white/20 font-mono text-sm">Completa el formulario</p>
              <p className="text-white/10 font-mono text-xs mt-1">para ver tu resultado</p>
            </div>
          ) : (
            <>
              {/* Main result */}
              <div className="bg-[#111] border border-[#C8FF00]/20 rounded-xl p-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] mb-1">
                  Calorías objetivo · {GOAL_LABELS[form.goal]}
                </p>
                <p className="font-black text-6xl text-[#C8FF00] leading-none">
                  {formatNumber(result.target)}
                </p>
                <p className="text-sm font-mono text-white/30 mt-1">kcal / día</p>
              </div>

              {/* BMR + TDEE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">BMR</p>
                  <p className="font-black text-2xl text-white">{formatNumber(result.bmr)}</p>
                  <p className="text-[10px] font-mono text-white/20">kcal (metabolismo basal)</p>
                </div>
                <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">TDEE</p>
                  <p className="font-black text-2xl text-white">{formatNumber(result.tdee)}</p>
                  <p className="text-[10px] font-mono text-white/20">kcal (con actividad ×{result.activity_multiplier})</p>
                </div>
              </div>

              {/* Fórmula usada */}
              <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-2">Detalle del cálculo</p>
                <div className="flex flex-col gap-1.5 text-xs font-mono text-white/40">
                  <div className="flex justify-between">
                    <span>Fórmula</span>
                    <span className="text-white/60">{result.formula_used === 'mifflin' ? 'Mifflin-St Jeor' : 'Harris-Benedict'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Multiplicador actividad</span>
                    <span className="text-white/60">×{result.activity_multiplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ajuste por objetivo</span>
                    <span className={result.goal_adjustment >= 0 ? 'text-green-400' : 'text-orange-400'}>
                      {result.goal_adjustment >= 0 ? '+' : ''}{result.goal_adjustment} kcal
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
