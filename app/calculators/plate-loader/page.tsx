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

// Discos siempre en Libras (lbs)
const LBS_PLATES: PlateType[] = [
  { weight: 45,  color: 'bg-[#2563eb]', borderColor: 'border-blue-400', textColor: 'text-white', height: 'h-28', width: 'w-6', label: '45 lb' },
  { weight: 25,  color: 'bg-[#16a34a]', borderColor: 'border-green-400', textColor: 'text-white', height: 'h-28', width: 'w-5', label: '25 lb' },
  { weight: 10,  color: 'bg-[#eab308]', borderColor: 'border-yellow-400', textColor: 'text-black', height: 'h-28', width: 'w-3.5', label: '10 lb' },
  { weight: 5,   color: 'bg-[#9ca3af]', borderColor: 'border-gray-300', textColor: 'text-black', height: 'h-20', width: 'w-3.5', label: '5 lb' },
  { weight: 2.5, color: 'bg-[#dc2626]', borderColor: 'border-red-400', textColor: 'text-white', height: 'h-14', width: 'w-2.5', label: '2.5 lb' },
]

// Barra seleccionable en lbs y kg
const LBS_BARS = [
  { weight: 45, label: '45 lb - 20.41 kg (Barra Estándar)' },
  { weight: 35, label: '35 lb - 15.88 kg (Barra Liviana)' },
  { weight: 15, label: '15 lb - 6.80 kg (Barra Técnica)' },
  { weight: 5,  label: '5 lb - 2.27 kg (Barra Técnica Junior)' },
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
    <div className="p-8 max-w-4xl">
      {/* Cabecera */}
      <div className="mb-10 flex items-start justify-between">
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
      <div className="bg-[#111] border border-[#C8FF00]/20 rounded-xl p-6 mb-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8FF00]/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex justify-between items-baseline border-b border-white/[0.04] pb-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] mb-1">Carga Actual</p>
            <p className="font-black text-6xl text-[#C8FF00] leading-none">
              {totalWeightKg.toFixed(2)}
              <span className="text-2xl font-mono ml-1">kg</span>
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
        <div className="grid grid-cols-3 gap-4 text-center">
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
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-6 mb-8">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-4 flex justify-between">
          <span>Vista de montaje de barra</span>
          <span className="text-[#C8FF00] font-black">{totalPlatesCount} discos / lado</span>
        </p>

        {/* Contenedor del Gráfico de la barra */}
        <div className="relative h-44 bg-[#0a0a0a] rounded-lg border border-white/[0.04] flex items-center justify-center overflow-x-auto p-4 select-none">
          {/* Eje de la barra (Tubo horizontal) */}
          <div className="absolute w-[85%] h-2 bg-gradient-to-b from-gray-300 to-gray-500 rounded border border-gray-600 z-10" />

          {/* Manga Izquierda de Carga */}
          <div className="absolute left-[8%] w-[25%] h-5 bg-gradient-to-b from-gray-400 to-gray-600 rounded border border-gray-500 z-15 flex flex-row-reverse items-center justify-start pr-1" style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5)' }}>
            {/* Tope interno manga izquierda */}
            <div className="absolute right-0 w-2 h-8 bg-gray-700 border-l border-gray-800 rounded z-20" />
            
            {/* Placas en manga izquierda (ordenadas de adentro hacia afuera) */}
            <div className="flex flex-row-reverse items-center gap-[1px] mr-3 z-30">
              {renderedPlates.map((plate, index) => (
                <div
                  key={`left-${index}`}
                  className={`${plate.color} ${plate.borderColor} ${plate.height} ${plate.width} border rounded-md flex items-center justify-center`}
                  title={plate.label}
                  style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5), 2px 0 5px rgba(0,0,0,0.3)' }}
                >
                  {plate.width !== 'w-2.5' && plate.width !== 'w-3' && (
                    <span className={`text-[8px] font-black font-mono rotate-90 ${plate.textColor} select-none`}>
                      {plate.weight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Centro de la barra (Agarre) */}
          <div className="absolute w-[30%] h-5 bg-gradient-to-b from-gray-600 to-gray-800 rounded border border-gray-700 z-20 flex items-center justify-center">
            <span className="text-[8px] font-black font-mono tracking-widest text-[#C8FF00] uppercase opacity-70">
              FITMETRICS
            </span>
          </div>

          {/* Manga Derecha de Carga */}
          <div className="absolute right-[8%] w-[25%] h-5 bg-gradient-to-b from-gray-400 to-gray-600 rounded border border-gray-500 z-15 flex flex-row items-center justify-start pl-1" style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5)' }}>
            {/* Tope interno manga derecha */}
            <div className="absolute left-0 w-2 h-8 bg-gray-700 border-r border-gray-800 rounded z-20" />
            
            {/* Placas en manga derecha (ordenadas de adentro hacia afuera) */}
            <div className="flex flex-row items-center gap-[1px] ml-3 z-30">
              {renderedPlates.map((plate, index) => (
                <div
                  key={`right-${index}`}
                  className={`${plate.color} ${plate.borderColor} ${plate.height} ${plate.width} border rounded-md flex items-center justify-center`}
                  title={plate.label}
                  style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5), -2px 0 5px rgba(0,0,0,0.3)' }}
                >
                  {plate.width !== 'w-2.5' && plate.width !== 'w-3' && (
                    <span className={`text-[8px] font-black font-mono rotate-90 ${plate.textColor} select-none`}>
                      {plate.weight}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores visuales */}
        <div className="flex justify-between text-[9px] font-mono text-white/20 mt-3 px-10">
          <span>IZQUIERDA</span>
          <span>CENTRO DE BARRA</span>
          <span>DERECHA</span>
        </div>
      </div>

      {/* ── CONTROLES Y DISCOS ── */}
      <div className="grid grid-cols-2 gap-8">
        
        {/* Contadores de Discos */}
        <div className="bg-[#111] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-4">
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
          <div className="bg-[#111] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-4">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40">Peso de la Barra</p>
            <div className="flex flex-col gap-2">
              {LBS_BARS.map(bar => (
                <button
                  key={bar.weight}
                  onClick={() => setBarWeight(bar.weight)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-xs font-mono transition-all flex justify-between items-center ${
                    barWeight === bar.weight
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
          <div className="bg-[#111] border border-white/[0.07] rounded-xl p-6 text-xs text-white/30 font-mono leading-relaxed">
            <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Ayuda de carga</p>
            Los discos se añaden simétricamente en ambos extremos de la barra. Si añades un disco de 45 lb en los controles, se añadirá uno en la manga izquierda y otro en la derecha, sumando 90 lb en discos a la barra.
          </div>
        </div>

      </div>
    </div>
  )
}
