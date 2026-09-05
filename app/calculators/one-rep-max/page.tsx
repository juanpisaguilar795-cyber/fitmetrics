// app/calculators/one-rep-max/page.tsx
'use client'

import { useState } from 'react'
import { calculateOneRepMax, type OneRepMaxResult } from '@/lib/calculators/one-rep-max'

export default function OneRepMaxPage() {
  const [form, setForm] = useState({ weight_lifted: '', reps: '', formula: 'epley' })
  const [result, setResult] = useState<OneRepMaxResult | null>(null)
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
      const weight = Number(form.weight_lifted)
      const reps = Number(form.reps)

      if (isNaN(weight) || weight <= 0) throw new Error('Ingresa un peso levantado válido.')
      if (isNaN(reps) || reps <= 0) throw new Error('Ingresa repeticiones válidas.')

      // Cálculo del lado del cliente
      const calculatedResult = calculateOneRepMax({
        weight_lifted: weight,
        reps: reps,
        formula: form.formula as any,
      })

      setResult(calculatedResult)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Calculadora</p>
        <h1 className="font-black text-4xl uppercase tracking-tight text-white">
          One Rep <span className="text-[#C8FF00]">Max</span>
        </h1>
        <p className="text-sm text-white/30 font-mono mt-2">Estima tu fuerza máxima en un ejercicio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <form onSubmit={handleSubmit} className="bg-[#111] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-5">
          {/* Fórmula */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Fórmula</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { value: 'epley', label: 'Epley' },
                { value: 'brzycki', label: 'Brzycki' },
                { value: 'lombardi', label: 'Lombardi' },
              ].map(o => (
                <button key={o.value} type="button" onClick={() => update('formula', o.value)}
                  className={`py-2 text-xs font-mono uppercase tracking-widest rounded-lg border transition-all ${form.formula === o.value
                      ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
                      : 'bg-[#181818] border-white/[0.07] text-white/30 hover:text-white/50'
                    }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] font-mono text-white/20">
              {form.formula === 'epley' && 'Mejor para reps 2-12 · más usada en powerlifting'}
              {form.formula === 'brzycki' && 'Más precisa para reps bajas (1-10)'}
              {form.formula === 'lombardi' && 'Recomendada para reps altas (>10)'}
            </p>
          </div>

          {/* Inputs */}
          {[
            { key: 'weight_lifted', label: 'Peso levantado (kg)', placeholder: '100' },
            { key: 'reps', label: 'Repeticiones', placeholder: '5' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</label>
              <input
                type="number" required
                value={form[key as keyof typeof form]}
                onChange={e => update(key, e.target.value)}
                placeholder={placeholder}
                className="bg-[#181818] border border-white/[0.07] rounded-lg px-4 py-3 text-white text-sm font-mono placeholder:text-white/20 focus:outline-none focus:border-[#C8FF00]/40 transition-colors"
              />
            </div>
          ))}

          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-[#C8FF00] text-black font-black text-sm uppercase tracking-widest rounded-lg hover:bg-[#d4ff26] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Calculando...' : 'Calcular 1RM →'}
          </button>
        </form>

        {/* Result */}
        <div className="flex flex-col gap-4">
          {!result ? (
            <div className="bg-[#111] border border-white/[0.07] rounded-xl p-8 flex flex-col items-center justify-center h-full text-center">
              <p className="text-white/20 font-mono text-sm">Ingresa peso y reps</p>
            </div>
          ) : (
            <>
              <div className="bg-[#111] border border-[#C8FF00]/20 rounded-xl p-6">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] mb-1">
                  1RM Estimado · {form.formula}
                </p>
                <p className="font-black text-6xl text-[#C8FF00] leading-none">{result.one_rm}</p>
                <p className="text-sm font-mono text-white/30 mt-1">kg</p>
              </div>

              {/* Percentage table */}
              <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-x-auto">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 px-5 py-3 border-b border-white/[0.07]">
                  Tabla de intensidades
                </p>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      {['%', 'Peso (kg)', 'Reps típicas'].map(h => (
                        <th key={h} className="text-left text-[10px] font-mono uppercase tracking-widest text-white/20 px-5 py-2">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.percentages.map(({ pct, weight, reps }) => (
                      <tr key={pct} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                        <td className={`px-5 py-2 text-sm font-mono font-bold ${pct === 100 ? 'text-[#C8FF00]' : 'text-white/60'}`}>
                          {pct}%
                        </td>
                        <td className="px-5 py-2 text-sm font-black text-white">{weight}</td>
                        <td className="px-5 py-2 text-xs font-mono text-white/30">{reps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
