// app/calculators/plate-loader/page.tsx
'use client'

import { useState } from 'react'

interface PlateType {
  weight: number
  color: string // Tailwind bg class
  borderColor: string // Tailwind border class
  textColor: string // Tailwind text class
  height: string // Tailwind height class for diameter
  width: string // Tailwind width class for thickness
  label: string
}

// Discos siempre en Libras (lbs) con tamaños adaptativos para móvil
const LBS_PLATES: PlateType[] = [
  { weight: 45, color: 'bg-[#2563eb]', borderColor: 'border-blue-400', textColor: 'text-white', height: 'h-28 sm:h-34', width: 'w-4 sm:w-5 md:w-6', label: '45 lb' },
  { weight: 25, color: 'bg-[#16a34a]', borderColor: 'border-green-400', textColor: 'text-white', height: 'h-24 sm:h-30', width: 'w-3.5 sm:w-4.5 md:w-5', label: '25 lb' },
  { weight: 10, color: 'bg-[#eab308]', borderColor: 'border-yellow-300', textColor: 'text-black', height: 'h-20 sm:h-26', width: 'w-3 sm:w-3.5 md:w-4', label: '10 lb' },
  { weight: 5, color: 'bg-[#9ca3af]', borderColor: 'border-gray-300', textColor: 'text-black', height: 'h-16 sm:h-20', width: 'w-2.5 sm:w-3 md:w-3.5', label: '5 lb' },
  { weight: 2.5, color: 'bg-[#dc2626]', borderColor: 'border-red-400', textColor: 'text-white', height: 'h-12 sm:h-15', width: 'w-2 sm:w-2.5 md:w-3', label: '2.5 lb' },
]

// Barra seleccionable en lbs y kg
const LBS_BARS = [
  { weight: 45, label: '45 lb - 20.41 kg (Barra Estándar)' },
  { weight: 35, label: '35 lb - 15.88 kg (Barra Liviana)' },
  { weight: 15, label: '15 lb - 6.80 kg (Barra Técnica)' },
  { weight: 5, label: '5 lb - 2.27 kg (Barra Técnica Junior)' },
]

const LBS_TO_KG = 0.45359237

export default function PlateLoaderPage() {
  const [barWeight, setBarWeight] = useState<number>(45) // barra estándar 45 lb
  const [plates, setPlates] = useState<Record<number, number>>({
    45: 0, 25: 0, 10: 0, 5: 0, 2.5: 0
  })

  function adjustPlate(weight: number, amount: number) {
    setPlates(prev => ({
      ...prev,
      [weight]: Math.max(0, (prev[weight] || 0) + amount)
    }))
  }

  function clearPlates() {
    setPlates({
      45: 0, 25: 0, 10: 0, 5: 0, 2.5: 0
    })
  }

  // Cálculos de peso en libras
  const platesWeightPerSideLbs = LBS_PLATES.reduce((sum, plate) => {
    return sum + (plate.weight * (plates[plate.weight] || 0))
  }, 0)

  const totalPlatesWeightLbs = platesWeightPerSideLbs * 2
  const totalWeightLbs = barWeight + totalPlatesWeightLbs

  // Conversiones a Kilogramos para la visualización del panel
  const totalWeightKg = totalWeightLbs * LBS_TO_KG
  const platesWeightPerSideKg = platesWeightPerSideLbs * LBS_TO_KG
  const totalPlatesWeightKg = totalPlatesWeightLbs * LBS_TO_KG
  const barWeightKg = barWeight * LBS_TO_KG

  // Obtener lista ordenada de discos para renderizar visualmente (de mayor a menor peso)
  const renderedPlates: PlateType[] = []
  LBS_PLATES
    .slice()
    .sort((a, b) => b.weight - a.weight)
    .forEach(plate => {
      const count = plates[plate.weight] || 0
      for (let i = 0; i < count; i++) {
        renderedPlates.push(plate)
      }
    })

  const totalPlatesCount = renderedPlates.length

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
      {/* Cabecera */}
      <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Calculadora Visual</p>
          <h1 className="font-black text-4xl uppercase tracking-tight text-white leading-none">
            Carga de <span className="text-[#C8FF00]">Barra</span>
          </h1>
          <p className="text-sm text-white/30 font-mono mt-2">
            Organiza y distribuye los discos en tu barra de entrenamiento (discos en libras, carga en kilogramos)
          </p>
        </div>
      </div>

      {/* ── SECCIÓN DE RESULTADO (CARGA ACTUAL) ── */}
      <div className="bg-[#111] border border-[#C8FF00]/20 rounded-xl p-4 sm:p-6 mb-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8FF00]/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] mb-1">Carga Actual</p>
            <p className="font-black text-5xl sm:text-6xl text-[#C8FF00] leading-none">
              {totalWeightKg.toFixed(2)}
              <span className="text-xl sm:text-2xl font-mono ml-1">kg</span>
            </p>
            <p className="text-xs font-mono text-white/30 mt-1">
              {totalWeightLbs.toFixed(1)} lb
            </p>
          </div>
          <button
            onClick={clearPlates}
            className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-[#C8FF00] border border-white/[0.07] hover:border-[#C8FF00]/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            Limpiar barra
          </button>
        </div>

        {/* Desglose de carga */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          {[
            { label: 'Por lado', val: `${platesWeightPerSideKg.toFixed(2)} kg`, subVal: `${platesWeightPerSideLbs.toFixed(1)} lb` },
            { label: 'Solo discos', val: `${totalPlatesWeightKg.toFixed(2)} kg`, subVal: `${totalPlatesWeightLbs.toFixed(1)} lb` },
            { label: 'Peso barra', val: `${barWeightKg.toFixed(2)} kg`, subVal: `${barWeight} lb` },
          ].map(d => (
            <div key={d.label} className="bg-[#181818] border border-white/[0.07] p-3 rounded-lg">
              <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-1">{d.label}</p>
              <p className="text-sm font-mono font-bold text-white">{d.val}</p>
              <p className="text-[10px] font-mono text-white/30">{d.subVal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── REPRESENTACIÓN VISUAL DE LA BARRA ── */}
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-3 sm:p-6 mb-8 overflow-hidden">
        <div className="flex items-center justify-between mb-3 px-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">
            Vista de montaje de barra
          </p>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] bg-[#C8FF00]/10 px-2 py-0.5 rounded-md border border-[#C8FF00]/20 font-bold">
            {totalPlatesCount} discos / lado
          </span>
        </div>

        {/* Contenedor del Gráfico de la barra (FLUIDO 100% para Celular sin recortar extremos) */}
        <div className="relative min-h-[170px] sm:min-h-[210px] bg-[#0a0a0a] rounded-xl border border-white/[0.06] flex items-center justify-center p-2 sm:p-4 select-none w-full overflow-hidden">
          <div className="w-full relative flex items-center justify-center py-4">

            {/* Tubo de la barra de fondo (Shaft) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-500 rounded border border-gray-400/80 z-0 shadow-md" />

            {/* Estructura Flexbox 100% Fluida */}
            <div className="relative z-10 flex items-center justify-between w-full max-w-full px-1">

              {/* MANGA IZQUIERDA (Discos ordenados de adentro hacia afuera: flex-row-reverse) */}
              <div className="flex flex-row-reverse items-center justify-start gap-[1px] sm:gap-[2px] flex-1 overflow-visible pr-0.5 min-w-[60px]">
                {renderedPlates.map((plate, index) => (
                  <div
                    key={`left-${index}`}
                    className={`${plate.color} ${plate.borderColor} ${plate.height} ${plate.width} border sm:border-2 rounded-sm sm:rounded-md flex items-center justify-center shadow-lg flex-shrink-0 transition-transform hover:scale-105`}
                    title={plate.label}
                    style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6), 1px 0 4px rgba(0,0,0,0.4)' }}
                  >
                    <span className={`text-[7px] sm:text-[9px] font-black font-mono rotate-90 ${plate.textColor} select-none tracking-tighter`}>
                      {plate.weight}
                    </span>
                  </div>
                ))}
              </div>

              {/* TOPE INTERNO IZQUIERDO */}
              <div className="w-2 sm:w-3.5 h-10 sm:h-14 bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900 border border-gray-400 rounded-sm z-20 shadow-md flex-shrink-0" />

              {/* CENTRO DE LA BARRA (AGARRE CENTRAL CON LOGO) */}
              <div className="w-14 sm:w-28 md:w-36 h-5 sm:h-6 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-950 rounded border border-gray-600 flex items-center justify-center z-10 mx-0.5 sm:mx-1 flex-shrink-0 shadow-inner">
                <span className="text-[7px] sm:text-[9px] font-black font-mono tracking-widest text-[#C8FF00] uppercase opacity-90 truncate px-0.5">
                  FITMETRICS
                </span>
              </div>

              {/* TOPE INTERNO DERECHO */}
              <div className="w-2 sm:w-3.5 h-10 sm:h-14 bg-gradient-to-b from-gray-500 via-gray-700 to-gray-900 border border-gray-400 rounded-sm z-20 shadow-md flex-shrink-0" />

              {/* MANGA DERECHA (Discos ordenados de adentro hacia afuera: flex-row) */}
              <div className="flex flex-row items-center justify-start gap-[1px] sm:gap-[2px] flex-1 overflow-visible pl-0.5 min-w-[60px]">
                {renderedPlates.map((plate, index) => (
                  <div
                    key={`right-${index}`}
                    className={`${plate.color} ${plate.borderColor} ${plate.height} ${plate.width} border sm:border-2 rounded-sm sm:rounded-md flex items-center justify-center shadow-lg flex-shrink-0 transition-transform hover:scale-105`}
                    title={plate.label}
                    style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.6), -1px 0 4px rgba(0,0,0,0.4)' }}
                  >
                    <span className={`text-[7px] sm:text-[9px] font-black font-mono rotate-90 ${plate.textColor} select-none tracking-tighter`}>
                      {plate.weight}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Resumen de Discos Cargados (Lista de badges rápida) */}
        <div className="mt-3 pt-3 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
            Resumen por lado:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {totalPlatesCount === 0 ? (
              <span className="text-[11px] font-mono text-white/20 italic">
                Sin discos cargados
              </span>
            ) : (
              LBS_PLATES.filter(p => (plates[p.weight] || 0) > 0).map(p => (
                <span
                  key={p.weight}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#181818] border border-white/[0.08] text-[11px] font-mono font-bold text-white"
                >
                  <span className={`w-2 h-2 rounded-full ${p.color} border ${p.borderColor}`} />
                  <span>{p.weight} lb</span>
                  <span className="text-[#C8FF00]">×{plates[p.weight]}</span>
                </span>
              ))
            )}
          </div>
        </div>

        {/* Indicadores visuales */}
        <div className="flex justify-between text-[9px] font-mono text-white/20 mt-2 px-1">
          <span>◄ MANGA IZQ.</span>
          <span>AGARRE CENTRAL</span>
          <span>MANGA DER. ►</span>
        </div>
      </div>

      {/* ── CONTROLES Y DISCOS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

        {/* Contadores de Discos */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-6 flex flex-col gap-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Discos por lado (se duplican)</p>
          <div className="flex flex-col gap-2.5">
            {LBS_PLATES.map(plate => {
              const count = plates[plate.weight] || 0
              return (
                <div key={plate.weight} className="flex items-center justify-between bg-[#181818] border border-white/[0.04] p-3 rounded-lg transition-colors hover:border-white/[0.08]">
                  {/* Etiqueta color + texto */}
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${plate.color} border ${plate.borderColor} flex items-center justify-center`}>
                      <span className={`text-[9px] font-black font-mono ${plate.textColor}`}>
                        {plate.weight}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold text-white">{plate.weight} lb</p>
                      <p className="text-[9px] font-mono text-white/20">Por cada lado</p>
                    </div>
                  </div>

                  {/* Contadores +/- */}
                  <div className="flex items-center gap-3 bg-[#111] px-2 py-1 rounded-md border border-white/[0.05]">
                    <button
                      onClick={() => adjustPlate(plate.weight, -1)}
                      disabled={count === 0}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-white/40 hover:text-white disabled:opacity-20 transition-colors focus:outline-none"
                    >
                      －
                    </button>
                    <span className="w-6 text-center font-mono font-bold text-xs text-white">
                      {count}
                    </span>
                    <button
                      onClick={() => adjustPlate(plate.weight, 1)}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-white/40 hover:text-[#C8FF00] transition-colors focus:outline-none"
                    >
                      ＋
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Configuración de Peso de Barra */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-6 flex flex-col gap-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Peso de la Barra</p>
            <div className="flex flex-col gap-2">
              {LBS_BARS.map(bar => (
                <button
                  key={bar.weight}
                  onClick={() => setBarWeight(bar.weight)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-xs font-mono transition-all flex justify-between items-center ${barWeight === bar.weight
                    ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00] font-bold'
                    : 'bg-[#181818] border-white/[0.07] text-white/40 hover:text-white hover:border-white/20'
                    }`}
                >
                  <span>{bar.label}</span>
                  {barWeight === bar.weight && <span>✓ Seleccionada</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Tarjeta de ayuda */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-6 text-xs text-white/30 font-mono leading-relaxed">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Ayuda de carga</p>
            Los discos se añaden simétricamente en ambos extremos de la barra. Si añades un disco de 45 lb en los controles, se añadirá uno en la manga izquierda y otro en la derecha, sumando 90 lb en discos a la barra.
          </div>
        </div>

      </div>
    </div>
  )
}
