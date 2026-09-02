// app/calculators/macros/page.tsx
'use client'

import { useState } from 'react'
import { MacroBar } from '@/components/ui/macro-bar'
import { ToggleGroup, ToggleTab } from '@/components/ui/toggle-group'
import { Field, Input } from '@/components/ui/input'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, PageHeader, StatCard } from '@/components/ui/badge'
import { calculateMacros, type MacrosResult } from '@/lib/calculators/macros'

const GOAL_OPTIONS = [
  { value: 'deficit',     label: 'Déficit',     desc: '−500 kcal' },
  { value: 'maintenance', label: 'Manten.',     desc: '±0 kcal'   },
  { value: 'surplus',     label: 'Superávit',   desc: '+300 kcal' },
]

const PROFILE_OPTIONS = [
  { value: 'cut',    label: 'Cutting',    desc: 'Alta proteína, bajo carbo' },
  { value: 'bulk',   label: 'Bulking',    desc: 'Alto carbo, proteína mod.' },
  { value: 'recomp', label: 'Recomp',     desc: 'Equilibrado' },
  { value: 'custom', label: 'Custom',     desc: 'Define tu ratio' },
]

// Ratios preconfigurados (protein_ratio en g/kg, fat_ratio en % kcal)
const PRESET_RATIOS: Record<string, { protein_ratio: number; fat_ratio: number }> = {
  cut:    { protein_ratio: 2.5, fat_ratio: 0.25 },
  bulk:   { protein_ratio: 2.0, fat_ratio: 0.25 },
  recomp: { protein_ratio: 2.2, fat_ratio: 0.27 },
  custom: { protein_ratio: 2.2, fat_ratio: 0.27 },
}

export default function MacrosPage() {
  const [form, setForm] = useState({
    tdee:          '',
    weight_kg:     '',
    goal:          'maintenance',
    profile:       'recomp',
    protein_ratio: 2.2,
    fat_ratio:     0.27,
  })
  const [result,  setResult]  = useState<MacrosResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  function update(k: string, v: string | number) {
    setForm(f => ({ ...f, [k]: v }))
    setResult(null)
  }

  function selectProfile(p: string) {
    const ratios = PRESET_RATIOS[p]
    setForm(f => ({ ...f, profile: p, ...ratios }))
    setResult(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.tdee || !form.weight_kg) {
      setError('Ingresa tu TDEE y tu peso para calcular')
      return
    }
    setLoading(true)
    setError(null)

    try {
      const weight = Number(form.weight_kg)
      const tdee = Number(form.tdee)
      if (isNaN(weight) || weight <= 0) throw new Error('Ingresa un peso válido.')
      if (isNaN(tdee) || tdee <= 0) throw new Error('Ingresa un TDEE válido.')

      // protein_ratio viene en g/kg → convertir a g totales antes del cálculo
      const protein_g_total = Math.round(weight * form.protein_ratio)

      const calculatedResult = calculateMacros({
        tdee:          tdee,
        goal:          form.goal as any,
        protein_ratio: protein_g_total,   // g totales
        fat_ratio:     form.fat_ratio,
      })

      setResult(calculatedResult)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al calcular')
    } finally {
      setLoading(false)
    }
  }

  const isCustom = form.profile === 'custom'

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader
        section="Calculadora"
        title={<>Macro<span className="text-[#C8FF00]">nutrientes</span></>}
        desc="Distribuye tus calorías en proteínas, carbohidratos y grasas según tu objetivo"
      />

      <div className="grid grid-cols-2 gap-8">
        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* TDEE + Peso */}
          <Card>
            <CardHeader><CardTitle>Datos base</CardTitle></CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Field
                label="TDEE (kcal/día)"
                required
                hint="Obtén tu TDEE en la calculadora de calorías"
              >
                <Input
                  type="number"
                  placeholder="2500"
                  value={form.tdee}
                  onChange={e => update('tdee', e.target.value)}
                  min={800} max={10000}
                />
              </Field>
              <Field label="Peso corporal (kg)" required>
                <Input
                  type="number"
                  placeholder="75"
                  value={form.weight_kg}
                  onChange={e => update('weight_kg', e.target.value)}
                  min={30} max={300}
                />
              </Field>
            </CardBody>
          </Card>

          {/* Objetivo */}
          <Card>
            <CardHeader><CardTitle>Objetivo</CardTitle></CardHeader>
            <CardBody>
              <ToggleGroup
                options={GOAL_OPTIONS}
                value={form.goal}
                onChange={v => update('goal', v)}
                cols={3}
              />
            </CardBody>
          </Card>

          {/* Perfil de macros */}
          <Card>
            <CardHeader><CardTitle>Perfil de distribución</CardTitle></CardHeader>
            <CardBody className="flex flex-col gap-4">
              <ToggleGroup
                options={PROFILE_OPTIONS}
                value={form.profile}
                onChange={selectProfile}
                cols={4}
              />

              {/* Sliders custom */}
              {isCustom && (
                <div className="flex flex-col gap-4 pt-2 border-t border-white/[0.07]">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                        Proteína
                      </label>
                      <span className="text-[10px] font-mono text-[#C8FF00]">
                        {form.protein_ratio} g/kg
                      </span>
                    </div>
                    <input
                      type="range" min={1.2} max={3.5} step={0.1}
                      value={form.protein_ratio}
                      onChange={e => update('protein_ratio', parseFloat(e.target.value))}
                      className="w-full accent-[#C8FF00]"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-white/20">
                      <span>1.2 g/kg (mínimo)</span>
                      <span>3.5 g/kg (alto)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                        Grasas
                      </label>
                      <span className="text-[10px] font-mono text-orange-400">
                        {Math.round(form.fat_ratio * 100)}% kcal
                      </span>
                    </div>
                    <input
                      type="range" min={0.15} max={0.45} step={0.01}
                      value={form.fat_ratio}
                      onChange={e => update('fat_ratio', parseFloat(e.target.value))}
                      className="w-full accent-orange-400"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-white/20">
                      <span>15% (bajo)</span>
                      <span>45% (keto)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Resumen de ratios */}
              {!isCustom && (
                <div className="flex gap-4 text-[10px] font-mono text-white/30 pt-1">
                  <span>Proteína: <span className="text-[#C8FF00]">{form.protein_ratio} g/kg</span></span>
                  <span>Grasa: <span className="text-orange-400">{Math.round(form.fat_ratio * 100)}% kcal</span></span>
                </div>
              )}
            </CardBody>
          </Card>

          {error && (
            <p className="text-xs text-red-400 font-mono px-1">{error}</p>
          )}

          <Button type="submit" loading={loading} fullWidth>
            Calcular macros →
          </Button>
        </form>

        {/* ── Result panel ── */}
        <div className="flex flex-col gap-4">
          {!result ? (
            <div className="h-full flex flex-col gap-4">
              {/* Placeholder cards */}
              {['Proteína', 'Carbohidratos', 'Grasas'].map(m => (
                <div key={m} className="bg-[#111] border border-white/[0.07] rounded-xl p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.07]" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3 w-16 rounded bg-white/[0.05]" />
                    <div className="h-6 w-24 rounded bg-white/[0.03]" />
                  </div>
                </div>
              ))}
              <p className="text-center text-xs font-mono text-white/20 mt-2">
                Completa el formulario para ver tu distribución
              </p>
            </div>
          ) : (
            <>
              {/* Main result con MacroBar */}
              <Card lime>
                <CardBody>
                  <MacroBar {...result} />
                </CardBody>
              </Card>

              {/* Detalle numérico */}
              <Card>
                <CardHeader><CardTitle>Desglose por comida</CardTitle></CardHeader>
                <CardBody>
                  <p className="text-[10px] font-mono text-white/20 mb-4">
                    Distribuido en 4 comidas iguales
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Proteína',  g: result.protein_g, color: '#C8FF00' },
                      { label: 'Carbos',    g: result.carbs_g,   color: '#60a5fa' },
                      { label: 'Grasas',    g: result.fat_g,     color: '#fb923c' },
                    ].map(({ label, g, color }) => (
                      <div key={label} className="bg-[#181818] border border-white/[0.07] rounded-lg p-3 text-center">
                        <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color }}>
                          {label}
                        </p>
                        <p className="font-black text-xl text-white">
                          {Math.round(g / 4)}<span className="text-xs font-mono text-white/30 ml-1">g</span>
                        </p>
                        <p className="text-[10px] font-mono text-white/20 mt-0.5">por comida</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Tips */}
              <Card>
                <CardBody>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-3">
                    Guía rápida
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      `${result.protein_g}g proteína = ${Math.round(result.protein_g / 25)} porciones de 100g pollo`,
                      `${result.fat_g}g grasa = ${Math.round(result.fat_g / 14)} cucharadas de aceite de oliva`,
                      `${result.carbs_g}g carbos = ${Math.round(result.carbs_g / 45)} tazas de arroz cocido`,
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-2 text-xs text-white/30 font-mono">
                        <span className="text-[#C8FF00]/50 flex-shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
