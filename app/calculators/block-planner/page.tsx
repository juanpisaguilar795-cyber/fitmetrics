// app/calculators/block-planner/page.tsx
'use client'

import { useState } from 'react'

interface BlockWeekData {
  week: number
  pctMin: number
  pctMax: number
  repsText: string
  note: string
}

// Datos de Press Banca Principal - Lunes (Porcentajes de 1RM con ramp-up progresivo)
const BENCH_PROGRESSION: BlockWeekData[] = [
  { week: 1, pctMin: 0.75, pctMax: 0.75, repsText: '5 x 4', note: 'Adaptación Base' },
  { week: 2, pctMin: 0.785, pctMax: 0.785, repsText: '5 x 4', note: 'Sobrecarga +2.5 kg' },
  { week: 3, pctMin: 0.815, pctMax: 0.815, repsText: '5 x 3', note: 'Semana Pesada CNS' },
  { week: 4, pctMin: 0.845, pctMax: 0.845, repsText: '4 x 3', note: 'Carga Alta +2.5 kg' },
  { week: 5, pctMin: 0.75, pctMax: 0.75, repsText: '4 x 4', note: 'Deload Activo' },
  { week: 6, pctMin: 0.875, pctMax: 0.875, repsText: '4 x 3', note: 'Retorno Fuerte' },
  { week: 7, pctMin: 0.90, pctMax: 0.90, repsText: '3 x 2', note: 'Intensidad Sub-máxima' },
  { week: 8, pctMin: 0.93, pctMax: 0.95, repsText: '2 x 1', note: 'Pico Heavy (Sentir Barra)' },
  { week: 9, pctMin: 1.00, pctMax: 1.025, repsText: '1 x 1', note: 'Test de PR Moderado' },
]

// Martes: Press Banca Fuerza-Hipertrofia Pesada (Progresión Progresiva)
const BENCH_TUESDAY_PROGRESSION: BlockWeekData[] = [
  { week: 1, pctMin: 0.725, pctMax: 0.725, repsText: '4 x 6', note: 'Volumen Base' },
  { week: 2, pctMin: 0.755, pctMax: 0.755, repsText: '4 x 6', note: 'Sobrecarga +2.5 kg' },
  { week: 3, pctMin: 0.785, pctMax: 0.785, repsText: '4 x 5', note: 'Hipertrofia Pesada' },
  { week: 4, pctMin: 0.815, pctMax: 0.815, repsText: '4 x 4', note: 'Carga CNS Alta' },
  { week: 5, pctMin: 0.70, pctMax: 0.70, repsText: '4 x 5', note: 'Descarga Controlada' },
  { week: 6, pctMin: 0.815, pctMax: 0.815, repsText: '4 x 4', note: 'Re-estímulo Pesado' },
  { week: 7, pctMin: 0.845, pctMax: 0.845, repsText: '4 x 3', note: 'Intensidad Alta' },
  { week: 8, pctMin: 0.875, pctMax: 0.875, repsText: '3 x 3', note: 'Carga Heavy Secundaria' },
  { week: 9, pctMin: 0.725, pctMax: 0.725, repsText: '3 x 3', note: 'Tapering pre-test' },
]

// Jueves: Press Banca Pausado (Progresión Progresiva Pausada)
const BENCH_THURSDAY_PROGRESSION: BlockWeekData[] = [
  { week: 1, pctMin: 0.725, pctMax: 0.725, repsText: '4 x 4', note: 'Pausa 2s Base' },
  { week: 2, pctMin: 0.755, pctMax: 0.755, repsText: '4 x 4', note: 'Transferencia Fuerza' },
  { week: 3, pctMin: 0.785, pctMax: 0.785, repsText: '4 x 3', note: 'Tensión Punto Muerto' },
  { week: 4, pctMin: 0.815, pctMax: 0.815, repsText: '4 x 3', note: 'Intensidad Pausada' },
  { week: 5, pctMin: 0.70, pctMax: 0.70, repsText: '3 x 4', note: 'Deload Técnico Pausado' },
  { week: 6, pctMin: 0.845, pctMax: 0.845, repsText: '4 x 3', note: 'Fuerza de Salida' },
  { week: 7, pctMin: 0.875, pctMax: 0.875, repsText: '3 x 2', note: 'Tensión Máxima Pecho' },
  { week: 8, pctMin: 0.90, pctMax: 0.90, repsText: '3 x 1', note: 'Pico Pausado Heavy' },
  { week: 9, pctMin: 0.70, pctMax: 0.70, repsText: '3 x 2', note: 'Activación Suave' },
]

// Viernes: Press Banca Fuerza-Velocidad Pesada (Progresión Progresiva)
const BENCH_FRIDAY_PROGRESSION: BlockWeekData[] = [
  { week: 1, pctMin: 0.725, pctMax: 0.725, repsText: '5 x 3', note: 'Aceleración Base' },
  { week: 2, pctMin: 0.755, pctMax: 0.755, repsText: '5 x 3', note: 'Intención Máxima' },
  { week: 3, pctMin: 0.785, pctMax: 0.785, repsText: '5 x 3', note: 'Carga Neuromuscular' },
  { week: 4, pctMin: 0.815, pctMax: 0.815, repsText: '4 x 2', note: 'Reclutamiento Fibras' },
  { week: 5, pctMin: 0.70, pctMax: 0.70, repsText: '4 x 3', note: 'Deload Dinámico' },
  { week: 6, pctMin: 0.845, pctMax: 0.845, repsText: '4 x 2', note: 'Potencia Pesada' },
  { week: 7, pctMin: 0.875, pctMax: 0.875, repsText: '4 x 2', note: 'Fuerza-Velocidad Alta' },
  { week: 8, pctMin: 0.90, pctMax: 0.90, repsText: '3 x 1', note: 'Ajuste Fibras IIb' },
  { week: 9, pctMin: 0.60, pctMax: 0.60, repsText: '3 x 2', note: 'Descarga pre-PR' },
]

// Datos de Peso Muerto Sumo por Semana (Porcentajes de 1RM)
const DEADLIFT_PROGRESSION: BlockWeekData[] = [
  { week: 1, pctMin: 0.833, pctMax: 0.861, repsText: '4 x 4', note: 'Adaptación' },
  { week: 2, pctMin: 0.875, pctMax: 0.888, repsText: '4 x 4', note: 'Sobrecarga' },
  { week: 3, pctMin: 0.903, pctMax: 0.916, repsText: '4 x 3', note: 'Semana Pesada' },
  { week: 4, pctMin: 0.930, pctMax: 0.944, repsText: '4 x 3', note: 'Pico de Fuerza' },
  { week: 5, pctMin: 0.833, pctMax: 0.861, repsText: '5 x 5', note: 'Deload activo' },
  { week: 6, pctMin: 0.903, pctMax: 0.916, repsText: '4 x 4', note: 'Retorno carga' },
  { week: 7, pctMin: 0.930, pctMax: 0.972, repsText: '4 x 3', note: 'Intensidad Alta' },
  { week: 8, pctMin: 0.958, pctMax: 1.00, repsText: '3 x 2', note: 'Pico de Fuerza' },
  { week: 9, pctMin: 1.027, pctMax: 1.055, repsText: '1 x 1', note: 'Test de PR' }, // PR > 100%
]

// Datos de Sentadilla por Semana (Porcentajes de 1RM)
const SQUAT_PROGRESSION: BlockWeekData[] = [
  { week: 1, pctMin: 0.80, pctMax: 0.825, repsText: '4 x 4', note: 'Adaptación' },
  { week: 2, pctMin: 0.825, pctMax: 0.85, repsText: '4 x 4', note: 'Sobrecarga' },
  { week: 3, pctMin: 0.85, pctMax: 0.875, repsText: '4 x 3', note: 'Semana Pesada' },
  { week: 4, pctMin: 0.875, pctMax: 0.90, repsText: '4 x 3', note: 'Pico de Fuerza' },
  { week: 5, pctMin: 0.80, pctMax: 0.825, repsText: '5 x 5', note: 'Deload activo' },
  { week: 6, pctMin: 0.85, pctMax: 0.875, repsText: '4 x 4', note: 'Retorno carga' },
  { week: 7, pctMin: 0.875, pctMax: 0.90, repsText: '4 x 3', note: 'Intensidad Alta' },
  { week: 8, pctMin: 0.925, pctMax: 0.95, repsText: '3 x 2', note: 'Pico de Fuerza' },
  { week: 9, pctMin: 1.025, pctMax: 1.05, repsText: '1 x 1', note: 'Test de PR' }, // PR > 100%
]

export default function BlockPlannerPage() {
  const [bench1RM, setBench1RM] = useState<number>(86)
  const [deadlift1RM, setDeadlift1RM] = useState<number>(180)
  const [squat1RM, setSquat1RM] = useState<number>(140)
  const [selectedWeek, setSelectedWeek] = useState<number>(3)
  const [activeTab, setActiveTab] = useState<'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes'>('lunes')

  // Cuestionario de Progresión
  const [questionnaire, setQuestionnaire] = useState({
    exercise: 'bench',
    completedAll: 'yes',
    rir: '2',
  })

  // Redondear al 2.5 kg más cercano
  function roundTo25(val: number): number {
    return Math.round(val / 2.5) * 2.5
  }

  // Generar rango de peso calculado
  function getCalculatedWeight(rm: number, minPct: number, maxPct: number): string {
    const minWeight = roundTo25(rm * minPct)
    const maxWeight = roundTo25(rm * maxPct)
    if (minWeight === maxWeight) {
      return `${minWeight} kg`
    }
    return `${minWeight} - ${maxWeight} kg`
  }

  // Obtener pesos para la semana seleccionada
  const benchPlanWeek = BENCH_PROGRESSION.find(w => w.week === selectedWeek) || BENCH_PROGRESSION[2]
  const benchHeavyWeight = getCalculatedWeight(bench1RM, benchPlanWeek.pctMin, benchPlanWeek.pctMax)

  const benchTueWeek = BENCH_TUESDAY_PROGRESSION.find(w => w.week === selectedWeek) || BENCH_TUESDAY_PROGRESSION[2]
  const benchTueWeight = getCalculatedWeight(bench1RM, benchTueWeek.pctMin, benchTueWeek.pctMax)

  const benchThuWeek = BENCH_THURSDAY_PROGRESSION.find(w => w.week === selectedWeek) || BENCH_THURSDAY_PROGRESSION[2]
  const benchThuWeight = getCalculatedWeight(bench1RM, benchThuWeek.pctMin, benchThuWeek.pctMax)

  const benchFriWeek = BENCH_FRIDAY_PROGRESSION.find(w => w.week === selectedWeek) || BENCH_FRIDAY_PROGRESSION[2]
  const benchFriWeight = getCalculatedWeight(bench1RM, benchFriWeek.pctMin, benchFriWeek.pctMax)

  const deadliftPlanWeek = DEADLIFT_PROGRESSION.find(w => w.week === selectedWeek) || DEADLIFT_PROGRESSION[2]
  const deadliftHeavyWeight = getCalculatedWeight(deadlift1RM, deadliftPlanWeek.pctMin, deadliftPlanWeek.pctMax)

  const squatPlanWeek = SQUAT_PROGRESSION.find(w => w.week === selectedWeek) || SQUAT_PROGRESSION[2]
  const squatHeavyWeight = getCalculatedWeight(squat1RM, squatPlanWeek.pctMin, squatPlanWeek.pctMax)


  // Cálculo del veredicto del cuestionario
  function getProgressionVerdict() {
    const isCompleted = questionnaire.completedAll === 'yes'
    const rirVal = Number(questionnaire.rir)
    const exerciseName =
      questionnaire.exercise === 'bench'
        ? 'Press Banca'
        : questionnaire.exercise === 'deadlift'
          ? 'Peso Muerto Sumo'
          : 'Sentadilla'

    if (!isCompleted) {
      return {
        action: 'Mantener peso o descargar 5%',
        color: 'text-orange-400 border-orange-500/20 bg-orange-500/[0.02]',
        desc: `Para la próxima semana de ${exerciseName}, mantén el peso actual o redúcelo un 5% si el fallo fue temprano. Enfócate en tu descanso y técnica.`
      }
    }

    if (rirVal === 0) {
      return {
        action: 'Mantener peso',
        color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/[0.02]',
        desc: `Completaste las series pero alcanzaste el fallo (RIR 0). Mantén el peso para la próxima sesión pesada de ${exerciseName}.`
      }
    }

    if (rirVal === 1 || rirVal === 2) {
      return {
        action: '¡Subir 2.5 kg!',
        color: 'text-[#C8FF00] border-[#C8FF00]/20 bg-[#C8FF00]/[0.02]',
        desc: `¡Excelente técnica y RIR 1-2! Añade 2.5 kg a la barra para tu próximo día pesado de ${exerciseName}.`
      }
    }

    return {
      action: '¡Subir 2.5 kg - 5.0 kg!',
      color: 'text-[#C8FF00] border-[#C8FF00]/30 bg-[#C8FF00]/[0.04]',
      desc: `La carga estuvo muy liviana (RIR 3+). Puedes incrementar de 2.5 kg a 5.0 kg en tu próxima sesión de ${exerciseName}.`
    }
  }

  const verdict = getProgressionVerdict()

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
      {/* Cabecera */}
      <div className="mb-8 sm:mb-10">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Calculadora de Bloques</p>
        <h1 className="font-black text-4xl uppercase tracking-tight text-white leading-none">
          Plan de <span className="text-[#C8FF00]">Bloques</span>
        </h1>
        <p className="text-sm text-white/30 font-mono mt-2">
          Planificación y sobrecarga neuromuscular de 8 Semanas + 1 de Test (Alta Intensidad en Banca)
        </p>
      </div>

      {/* ── SECCIÓN DE CONFIGURACIÓN 1RM ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#111] border border-white/[0.07] p-4 rounded-xl flex flex-col gap-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">1RM Press Banca (kg)</label>
          <input
            type="number"
            value={bench1RM}
            onChange={e => setBench1RM(Math.max(0, Number(e.target.value)))}
            className="bg-[#181818] border border-white/[0.07] rounded-lg px-3 py-2 text-white text-base font-mono focus:outline-none focus:border-[#C8FF00]/40 transition-colors"
          />
          <p className="text-[9px] font-mono text-white/20">Fuerza máxima en banca</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] p-4 rounded-xl flex flex-col gap-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">1RM Sumo Deadlift (kg)</label>
          <input
            type="number"
            value={deadlift1RM}
            onChange={e => setDeadlift1RM(Math.max(0, Number(e.target.value)))}
            className="bg-[#181818] border border-white/[0.07] rounded-lg px-3 py-2 text-white text-base font-mono focus:outline-none focus:border-[#C8FF00]/40 transition-colors"
          />
          <p className="text-[9px] font-mono text-white/20">Fuerza máxima en PM</p>
        </div>

        <div className="bg-[#111] border border-white/[0.07] p-4 rounded-xl flex flex-col gap-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">1RM Sentadilla (kg)</label>
          <input
            type="number"
            value={squat1RM}
            onChange={e => setSquat1RM(Math.max(0, Number(e.target.value)))}
            className="bg-[#181818] border border-white/[0.07] rounded-lg px-3 py-2 text-white text-base font-mono focus:outline-none focus:border-[#C8FF00]/40 transition-colors"
          />
          <p className="text-[9px] font-mono text-white/20">Fuerza máxima en Sentadilla</p>
        </div>

        {/* Selector de Semana Rápido */}
        <div className="bg-[#111] border border-white/[0.07] p-4 rounded-xl flex flex-col gap-1.5">
          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ver Detalle Diario</label>
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(Number(e.target.value))}
            className="bg-[#181818] border border-white/[0.07] rounded-lg px-3 py-2 text-[#C8FF00] text-sm font-mono font-bold focus:outline-none focus:border-[#C8FF00]/40 cursor-pointer appearance-none"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Semana {i + 1} {i + 1 === 5 ? '(Descarga)' : i + 1 === 9 ? '(Test de PR)' : ''}
              </option>
            ))}
          </select>
          <p className="text-[9px] font-mono text-white/20">Elige la semana del bloque</p>
        </div>
      </div>


      {/* ── TABLAS DINÁMICAS DE PROGRESIÓN (CALCULADAS SEMANA A SEMANA) ── */}
      <div className="flex flex-col gap-6 mb-10">

        {/* Encabezado Sección Banca */}
        <div className="border-b border-white/[0.07] pb-2 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00]">Programación Semanal Completa</span>
            <h2 className="font-black text-2xl uppercase tracking-tight text-white mt-0.5">Progresión Frecuencia 4x Press Banca</h2>
          </div>
          <span className="text-xs font-mono text-white/40">1RM Actual: <span className="text-[#C8FF00] font-bold">{bench1RM} kg</span></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tabla Press Banca - Lunes Pesado */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.01] flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white">1. Lun · Fuerza Principal</h3>
                  <p className="text-[10px] font-mono text-white/30">Carga axial máxima y desarrollo de 1RM</p>
                </div>
                <span className="text-[10px] font-mono text-[#C8FF00] bg-[#C8FF00]/10 px-2 py-0.5 rounded">Lunes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      {['Sem', '%1RM', 'Peso (kg)', 'Series', 'Nota'].map(h => (
                        <th key={h} className="text-left text-[9px] font-mono uppercase tracking-widest text-white/30 px-4 py-2.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BENCH_PROGRESSION.map((w) => {
                      const isCurrent = w.week === selectedWeek
                      return (
                        <tr
                          key={w.week}
                          onClick={() => setSelectedWeek(w.week)}
                          className={`border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors ${isCurrent ? 'bg-[#C8FF00]/[0.05] text-[#C8FF00]' : ''
                            }`}
                        >
                          <td className="px-4 py-2 text-xs font-mono font-bold">W{w.week}</td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{(w.pctMin * 100).toFixed(1)}%</td>
                          <td className={`px-4 py-2 text-xs font-bold font-mono ${isCurrent ? 'text-[#C8FF00]' : 'text-white'}`}>
                            {getCalculatedWeight(bench1RM, w.pctMin, w.pctMax)}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{w.repsText}</td>
                          <td className="px-4 py-2 text-[10px] font-mono text-white/20">{w.note}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tabla Press Banca - Martes Hipertrofia Pesada */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.01] flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white">2. Mar · Fuerza-Hipertrofia</h3>
                  <p className="text-[10px] font-mono text-white/30">Carga secundaria pesada para masa de pectoral y tríceps</p>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Martes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      {['Sem', '%1RM', 'Peso (kg)', 'Series', 'Nota'].map(h => (
                        <th key={h} className="text-left text-[9px] font-mono uppercase tracking-widest text-white/30 px-4 py-2.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BENCH_TUESDAY_PROGRESSION.map((w) => {
                      const isCurrent = w.week === selectedWeek
                      return (
                        <tr
                          key={w.week}
                          onClick={() => setSelectedWeek(w.week)}
                          className={`border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors ${isCurrent ? 'bg-blue-500/[0.05] text-blue-400' : ''
                            }`}
                        >
                          <td className="px-4 py-2 text-xs font-mono font-bold">W{w.week}</td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{(w.pctMin * 100).toFixed(1)}%</td>
                          <td className={`px-4 py-2 text-xs font-bold font-mono ${isCurrent ? 'text-blue-400' : 'text-white'}`}>
                            {getCalculatedWeight(bench1RM, w.pctMin, w.pctMax)}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{w.repsText}</td>
                          <td className="px-4 py-2 text-[10px] font-mono text-white/20">{w.note}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tabla Press Banca - Jueves Pausado Pesado */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.01] flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white">3. Jue · Pausado Pesado (2s)</h3>
                  <p className="text-[10px] font-mono text-white/30">Pausa estricta en esternón para fuerza de salida</p>
                </div>
                <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded">Jueves</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      {['Sem', '%1RM', 'Peso (kg)', 'Series', 'Nota'].map(h => (
                        <th key={h} className="text-left text-[9px] font-mono uppercase tracking-widest text-white/30 px-4 py-2.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BENCH_THURSDAY_PROGRESSION.map((w) => {
                      const isCurrent = w.week === selectedWeek
                      return (
                        <tr
                          key={w.week}
                          onClick={() => setSelectedWeek(w.week)}
                          className={`border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors ${isCurrent ? 'bg-green-500/[0.05] text-green-400' : ''
                            }`}
                        >
                          <td className="px-4 py-2 text-xs font-mono font-bold">W{w.week}</td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{(w.pctMin * 100).toFixed(1)}%</td>
                          <td className={`px-4 py-2 text-xs font-bold font-mono ${isCurrent ? 'text-green-400' : 'text-white'}`}>
                            {getCalculatedWeight(bench1RM, w.pctMin, w.pctMax)}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{w.repsText}</td>
                          <td className="px-4 py-2 text-[10px] font-mono text-white/20">{w.note}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Tabla Press Banca - Viernes Fuerza-Velocidad */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col justify-between">
            <div>
              <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.01] flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider text-white">4. Vie · Fuerza-Velocidad Pesada</h3>
                  <p className="text-[10px] font-mono text-white/30">Aceleración concéntrica con carga neuromuscular</p>
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Viernes</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      {['Sem', '%1RM', 'Peso (kg)', 'Series', 'Nota'].map(h => (
                        <th key={h} className="text-left text-[9px] font-mono uppercase tracking-widest text-white/30 px-4 py-2.5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {BENCH_FRIDAY_PROGRESSION.map((w) => {
                      const isCurrent = w.week === selectedWeek
                      return (
                        <tr
                          key={w.week}
                          onClick={() => setSelectedWeek(w.week)}
                          className={`border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors ${isCurrent ? 'bg-purple-500/[0.05] text-purple-400' : ''
                            }`}
                        >
                          <td className="px-4 py-2 text-xs font-mono font-bold">W{w.week}</td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{(w.pctMin * 100).toFixed(1)}%</td>
                          <td className={`px-4 py-2 text-xs font-bold font-mono ${isCurrent ? 'text-purple-400' : 'text-white'}`}>
                            {getCalculatedWeight(bench1RM, w.pctMin, w.pctMax)}
                          </td>
                          <td className="px-4 py-2 text-xs font-mono text-white/40">{w.repsText}</td>
                          <td className="px-4 py-2 text-[10px] font-mono text-white/20">{w.note}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Encabezado Sección Piernas / Lower */}
        <div className="border-b border-white/[0.07] pb-2 mt-4 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400">Día de Pierna & Cadena Posterior</span>
            <h2 className="font-black text-xl uppercase tracking-tight text-white mt-0.5">Progresión Miércoles (Lower Pesado)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tabla Peso Muerto Sumo */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.01] flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-wider text-white">Peso Muerto Sumo (Miércoles)</h3>
              <span className="text-[10px] font-mono text-orange-400">1RM: {deadlift1RM} kg</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['Sem', '%1RM', 'Peso (kg)', 'Series', 'Nota'].map(h => (
                      <th key={h} className="text-left text-[9px] font-mono uppercase tracking-widest text-white/30 px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DEADLIFT_PROGRESSION.map((w) => {
                    const isCurrent = w.week === selectedWeek
                    return (
                      <tr
                        key={w.week}
                        onClick={() => setSelectedWeek(w.week)}
                        className={`border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors ${isCurrent ? 'bg-orange-500/[0.05] text-orange-400' : ''
                          }`}
                      >
                        <td className="px-4 py-2 text-xs font-mono font-bold">W{w.week}</td>
                        <td className="px-4 py-2 text-xs font-mono text-white/40">{(w.pctMin * 100).toFixed(1)}%</td>
                        <td className={`px-4 py-2 text-xs font-bold font-mono ${isCurrent ? 'text-orange-400' : 'text-white'}`}>
                          {getCalculatedWeight(deadlift1RM, w.pctMin, w.pctMax)}
                        </td>
                        <td className="px-4 py-2 text-xs font-mono text-white/40">{w.repsText}</td>
                        <td className="px-4 py-2 text-[10px] font-mono text-white/20">{w.note}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla Sentadilla */}
          <div className="bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.07] bg-white/[0.01] flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-wider text-white">Sentadilla Pesada (Miércoles)</h3>
              <span className="text-[10px] font-mono text-cyan-400">1RM: {squat1RM} kg</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    {['Sem', '%1RM', 'Peso (kg)', 'Series', 'Nota'].map(h => (
                      <th key={h} className="text-left text-[9px] font-mono uppercase tracking-widest text-white/30 px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SQUAT_PROGRESSION.map((w) => {
                    const isCurrent = w.week === selectedWeek
                    return (
                      <tr
                        key={w.week}
                        onClick={() => setSelectedWeek(w.week)}
                        className={`border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors ${isCurrent ? 'bg-cyan-500/[0.05] text-cyan-400' : ''
                          }`}
                      >
                        <td className="px-4 py-2 text-xs font-mono font-bold">W{w.week}</td>
                        <td className="px-4 py-2 text-xs font-mono text-white/40">{(w.pctMin * 100).toFixed(1)}%</td>
                        <td className={`px-4 py-2 text-xs font-bold font-mono ${isCurrent ? 'text-cyan-400' : 'text-white'}`}>
                          {getCalculatedWeight(squat1RM, w.pctMin, w.pctMax)}
                        </td>
                        <td className="px-4 py-2 text-xs font-mono text-white/40">{w.repsText}</td>
                        <td className="px-4 py-2 text-[10px] font-mono text-white/20">{w.note}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* ── SELECTOR DE DÍAS (PESTAÑAS) ── */}
      <div className="flex border-b border-white/[0.07] mb-6 gap-2 overflow-x-auto pb-1">
        {([
          { key: 'lunes', label: 'Lun · Banca Pesada', desc: 'Fuerza Main' },
          { key: 'martes', label: 'Mar · Banca Hipertrofia', desc: 'Volumen 75-80%' },
          { key: 'miercoles', label: 'Mié · Lower Pesado', desc: 'Sentadilla + PM' },
          { key: 'jueves', label: 'Jue · Banca Pausada', desc: 'Salida 75-85%' },
          { key: 'viernes', label: 'Vie · Fuerza-Velocidad', desc: 'Carga SNC 75-85%' },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 min-w-[130px] pb-3 text-center transition-all focus:outline-none border-b-2 ${activeTab === tab.key
                ? 'border-[#C8FF00] text-white font-bold'
                : 'border-transparent text-white/30 hover:text-white/60'
              }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider">{tab.label}</p>
            <p className="text-[9px] font-mono uppercase tracking-widest opacity-60 mt-0.5">{tab.desc}</p>
          </button>
        ))}
      </div>

      {/* ── DETALLE DEL DÍA SELECCIONADO (BÁSICOS) ── */}
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-6 mb-8">
        {activeTab === 'lunes' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] bg-[#C8FF00]/10 px-2 py-0.5 rounded">
                  Press Banca Fuerza Principal
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight text-white mt-2">Día 1: Fuerza Principal Upper</h3>
              </div>
              <p className="text-sm font-mono text-white/30">Semana {selectedWeek} · {(benchPlanWeek.pctMin * 100).toFixed(1)}% 1RM</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Peso Objetivo de Trabajo</p>
                <p className="font-black text-4xl sm:text-5xl text-[#C8FF00]">
                  {benchHeavyWeight}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">Equivalente a: {(roundTo25(bench1RM * benchPlanWeek.pctMin) * 2.20462).toFixed(1)} lb</p>
              </div>

              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04] flex flex-col justify-center">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Series x Repeticiones</p>
                <p className="font-black text-3xl text-white">
                  {benchPlanWeek.repsText}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">RIR Objetivo: 1-2 (Carga Pesada Principal)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'martes' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  Press Banca Fuerza-Hipertrofia Pesada
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight text-white mt-2">Día 2: Hipertrofia & Masa Pesada</h3>
              </div>
              <p className="text-sm font-mono text-white/30">Semana {selectedWeek} · {(benchTueWeek.pctMin * 100).toFixed(1)}% 1RM</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Peso Objetivo de Trabajo</p>
                <p className="font-black text-4xl sm:text-5xl text-blue-400">
                  {benchTueWeight}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">Volumen neuromuscular efectivo</p>
              </div>

              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04] flex flex-col justify-center">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Series x Repeticiones</p>
                <p className="font-black text-3xl text-white">
                  {benchTueWeek.repsText}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">RIR Objetivo: 1-2 ({benchTueWeek.note})</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'miercoles' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                  Fuerza Lower Pesado
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight text-white mt-2">Día 3: Piernas & Cadena Posterior</h3>
              </div>
              <p className="text-sm font-mono text-white/30">Semana {selectedWeek}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#181818] p-4 rounded-lg border border-white/[0.04]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-orange-400 mb-1">Peso Muerto Sumo ({((deadliftPlanWeek.pctMin) * 100).toFixed(1)}%)</p>
                <p className="font-black text-3xl text-white">{deadliftHeavyWeight}</p>
                <p className="text-[10px] font-mono text-white/40 mt-1">{deadliftPlanWeek.repsText} · RIR 1-2</p>
              </div>

              <div className="bg-[#181818] p-4 rounded-lg border border-white/[0.04]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 mb-1">Sentadilla ({((squatPlanWeek.pctMin) * 100).toFixed(1)}%)</p>
                <p className="font-black text-3xl text-white">{squatHeavyWeight}</p>
                <p className="text-[10px] font-mono text-white/40 mt-1">{squatPlanWeek.repsText} · RIR 1-2</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jueves' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                  Press Banca Pausado Pesado
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight text-white mt-2">Día 4: Pausado & Salida Pesada</h3>
              </div>
              <p className="text-sm font-mono text-white/30">Semana {selectedWeek} · {(benchThuWeek.pctMin * 100).toFixed(1)}% 1RM</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Peso Objetivo con Pausa</p>
                <p className="font-black text-4xl sm:text-5xl text-green-400">
                  {benchThuWeight}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">Pausa estricta de 2s sobre esternón</p>
              </div>

              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04] flex flex-col justify-center">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Series x Repeticiones</p>
                <p className="font-black text-3xl text-white">
                  {benchThuWeek.repsText}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">RIR Objetivo: 1-2 ({benchThuWeek.note})</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'viernes' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  Press Banca Fuerza-Velocidad Pesada
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight text-white mt-2">Día 5: Reclutamiento & Potencia Pesada</h3>
              </div>
              <p className="text-sm font-mono text-white/30">Semana {selectedWeek} · {(benchFriWeek.pctMin * 100).toFixed(1)}% 1RM</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04]">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Peso Objetivo Dinámico Pesado</p>
                <p className="font-black text-4xl sm:text-5xl text-purple-400">
                  {benchFriWeight}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">Máxima velocidad concéntrica con peso real</p>
              </div>

              <div className="bg-[#181818] p-5 rounded-lg border border-white/[0.04] flex flex-col justify-center">
                <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">Series x Repeticiones</p>
                <p className="font-black text-3xl text-white">
                  {benchFriWeek.repsText}
                </p>
                <p className="text-xs font-mono text-white/30 mt-1">RIR Objetivo: 1-2 ({benchFriWeek.note})</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CUESTIONARIO DE AUTORREGULACIÓN ── */}
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-6">
        <div className="mb-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#C8FF00] mb-1">Decisión Objetiva de Progresión</p>
          <h2 className="font-black text-2xl uppercase tracking-tight text-white">¿Debo subir de peso la próxima semana?</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6 border-b border-white/[0.04] pb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ejercicio a Evaluar</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'bench', label: 'Press Banca' },
                  { key: 'deadlift', label: 'Peso Muerto' },
                  { key: 'squat', label: 'Sentadilla' }
                ].map(ex => (
                  <button
                    key={ex.key}
                    type="button"
                    onClick={() => setQuestionnaire(q => ({ ...q, exercise: ex.key }))}
                    className={`py-2 text-[10px] font-mono uppercase tracking-widest rounded-lg border transition-all ${questionnaire.exercise === ex.key
                        ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
                        : 'bg-[#181818] border-white/[0.07] text-white/40 hover:text-white/60'
                      }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">¿Completaste todas las series objetivo?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'yes', label: 'Sí, todas' },
                  { key: 'no', label: 'No, fallé' }
                ].map(ans => (
                  <button
                    key={ans.key}
                    type="button"
                    onClick={() => setQuestionnaire(q => ({ ...q, completedAll: ans.key }))}
                    className={`py-2 text-xs font-mono uppercase tracking-widest rounded-lg border transition-all ${questionnaire.completedAll === ans.key
                        ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
                        : 'bg-[#181818] border-white/[0.07] text-white/40 hover:text-white/60'
                      }`}
                  >
                    {ans.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">RIR obtenido en la última serie</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { key: '0', label: '0 (Fallo)' },
                { key: '1', label: '1 rep' },
                { key: '2', label: '2 reps' },
                { key: '3', label: '3+ reps' },
              ].map(r => (
                <button
                  key={r.key}
                  type="button"
                  disabled={questionnaire.completedAll === 'no'}
                  onClick={() => setQuestionnaire(q => ({ ...q, rir: r.key }))}
                  className={`py-3 text-xs font-mono rounded-lg border transition-all flex flex-col items-center justify-center disabled:opacity-30 ${questionnaire.rir === r.key && questionnaire.completedAll === 'yes'
                      ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00] font-bold'
                      : 'bg-[#181818] border-white/[0.07] text-white/40 hover:text-white/60'
                    }`}
                >
                  <span className="text-sm font-black">{r.key}</span>
                  <span className="text-[8px] uppercase tracking-wider opacity-60 mt-0.5">{r.key === '0' ? 'Al Fallo' : 'RIR'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`border rounded-xl p-5 ${verdict.color}`}>
          <p className="font-black text-2xl sm:text-3xl uppercase tracking-tight mb-2">{verdict.action}</p>
          <p className="text-xs font-mono opacity-85">{verdict.desc}</p>
        </div>
      </div>
    </div>
  )
}
