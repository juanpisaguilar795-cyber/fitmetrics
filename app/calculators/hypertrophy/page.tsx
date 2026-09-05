// app/calculators/hypertrophy/page.tsx
'use client'

import { useState } from 'react'

interface HypertrophyExercise {
  name: string
  muscleGroup: string
  sets: string
  rir: string
  youtubeId: string
}

// Datos de Ejercicios por Frecuencia de split (3, 4, 5 días)
const HYPERTROPHY_ROUTINES: Record<number, { title: string; days: { key: string; label: string; exercises: HypertrophyExercise[] }[] }> = {
  3: {
    title: 'Frecuencia 3 — Split Push / Pull / Legs (Empuje / Tirón / Pierna)',
    days: [
      {
        key: 'dia1',
        label: 'Día 1 · Empuje (Pecho/Hombro/Tríceps)',
        exercises: [
          { name: 'Press de Banca Inclinado con Mancuernas', muscleGroup: 'Pecho (Fibras Superiores)', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'qhKStczz27Q' },
          { name: 'Aperturas en Máquina (Pec Dec)', muscleGroup: 'Pecho (Aislamiento)', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'sAeDw6xhFFw' },
          { name: 'Press Militar con Mancuernas Sentado', muscleGroup: 'Hombros (Deltoide Anterior)', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'BaONy7w34-U' },
          { name: 'Elevaciones Laterales con Mancuernas', muscleGroup: 'Hombros (Deltoide Lateral)', sets: '4 series x 12-15 reps', rir: '2', youtubeId: 'hgLpdwMtEEs' },
          { name: 'Extensión de Tríceps con Polea Alta', muscleGroup: 'Tríceps (Aislamiento)', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'YWPIKPdyKhs' }
        ]
      },
      {
        key: 'dia2',
        label: 'Día 2 · Pierna (Cuádriceps/Femoral/Gemelo)',
        exercises: [
          { name: 'Prensa de Piernas Inclinada 45°', muscleGroup: 'Piernas (Cuádriceps y Glúteos)', sets: '4 series x 8-12 reps', rir: '1-2', youtubeId: 'yZ8Zc8V_Z58' },
          { name: 'Hip Thrust con Barra', muscleGroup: 'Glúteos y Femorales', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'LM8XH3vGPgo' },
          { name: 'Curl Femoral Acostado', muscleGroup: 'Femorales (Aislamiento)', sets: '3 series x 10-12 reps', rir: '1-2', youtubeId: '1Tq3QdILRIg' },
          { name: 'Extensión de Cuádriceps en Máquina', muscleGroup: 'Cuádriceps (Aislamiento)', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'm0fo7aU8_p4' },
          { name: 'Elevación de Talones Sentado (Gemelos)', muscleGroup: 'Pantorrillas / Gemelos', sets: '4 series x 15-20 reps', rir: '1-2', youtubeId: '2YV8gK_D_D4' }
        ]
      },
      {
        key: 'dia3',
        label: 'Día 3 · Tirón (Espalda/Bíceps/Posterior)',
        exercises: [
          { name: 'Remo con Barra Prono', muscleGroup: 'Espalda (Densidad general)', sets: '4 series x 6-10 reps', rir: '1-2', youtubeId: 'FsNfvAfLeTw' },
          { name: 'Jalón al Pecho Agarre Abierto', muscleGroup: 'Espalda (Amplitud de Dorsales)', sets: '4 series x 8-12 reps', rir: '1-2', youtubeId: '6JbkTvBkekY' },
          { name: 'Face Pulls en Polea Alta', muscleGroup: 'Hombro Posterior y Trapecio', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'pIP5EKDp88k' },
          { name: 'Curl de Bíceps Alterno con Mancuernas', muscleGroup: 'Bíceps (Supinación)', sets: '3 series x 8-12 reps', rir: '2', youtubeId: 'eSADGjh6Wf8' },
          { name: 'Curl Martillo con Mancuernas', muscleGroup: 'Bíceps y Braquiorradial', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'YuWwvRD5DW4' }
        ]
      }
    ]
  },
  4: {
    title: 'Frecuencia 4 — Split Torso / Pierna (2 Días Torso + 2 Días Piernas)',
    days: [
      {
        key: 'dia1',
        label: 'Día 1 · Torso A (Pecho / Hombro / Tríceps)',
        exercises: [
          { name: 'Press de Banca Inclinado con Mancuernas', muscleGroup: 'Pecho Superior', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'qhKStczz27Q' },
          { name: 'Aperturas en Máquina (Pec Dec)', muscleGroup: 'Pecho (Aislamiento)', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'sAeDw6xhFFw' },
          { name: 'Press Militar Sentado con Mancuernas', muscleGroup: 'Hombros', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'BaONy7w34-U' },
          { name: 'Elevaciones Laterales', muscleGroup: 'Deltoide Lateral', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'hgLpdwMtEEs' },
          { name: 'Extensión de Tríceps con Polea Alta', muscleGroup: 'Tríceps', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'YWPIKPdyKhs' }
        ]
      },
      {
        key: 'dia2',
        label: 'Día 2 · Piernas A (Enfoque Cuádriceps)',
        exercises: [
          { name: 'Prensa de Piernas Inclinada 45°', muscleGroup: 'Cuádriceps y Glúteos', sets: '4 series x 8-12 reps', rir: '1-2', youtubeId: 'yZ8Zc8V_Z58' },
          { name: 'Extensión de Cuádriceps en Máquina', muscleGroup: 'Cuádriceps', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'm0fo7aU8_p4' },
          { name: 'Curl Femoral Sentado', muscleGroup: 'Femorales', sets: '3 series x 8-12 reps', rir: '1-2', youtubeId: '1Tq3QdILRIg' },
          { name: 'Elevación de Talones de Pie (Gemelos)', muscleGroup: 'Gemelos (Gastrocnemio)', sets: '4 series x 12-15 reps', rir: '1-2', youtubeId: '2YV8gK_D_D4' }
        ]
      },
      {
        key: 'dia3',
        label: 'Día 3 · Torso B (Espalda / Bíceps / Posterior)',
        exercises: [
          { name: 'Remo con Barra Prono', muscleGroup: 'Espalda (Densidad y dorsal)', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'FsNfvAfLeTw' },
          { name: 'Jalón al Pecho Agarre Abierto', muscleGroup: 'Dorsales', sets: '4 series x 8-12 reps', rir: '1-2', youtubeId: '6JbkTvBkekY' },
          { name: 'Face Pulls en Polea Alta', muscleGroup: 'Hombro Posterior', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'pIP5EKDp88k' },
          { name: 'Curl de Bíceps con Barra EZ', muscleGroup: 'Bíceps', sets: '3 series x 8-12 reps', rir: '2', youtubeId: 'yKjA00wM0_A' },
          { name: 'Curl de Bíceps Inclinado con Mancuernas', muscleGroup: 'Bíceps (Cabeza larga)', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'zC3nLlEvin4' }
        ]
      },
      {
        key: 'dia4',
        label: 'Día 4 · Piernas B (Enfoque Cadena Posterior)',
        exercises: [
          { name: 'Hip Thrust pesado con Barra', muscleGroup: 'Glúteo Mayor y Cadena Posterior', sets: '4 series x 6-10 reps', rir: '1-2', youtubeId: 'LM8XH3vGPgo' },
          { name: 'Peso Muerto Rumano con Mancuernas', muscleGroup: 'Femorales y Glúteos', sets: '3 series x 8-12 reps', rir: '1-2', youtubeId: '1Tq3QdILRIg' },
          { name: 'Zancadas Dinámicas (Lunges)', muscleGroup: 'Pierna general y balance', sets: '3 series x 10-12 reps/lado', rir: '2', youtubeId: 'yZ8Zc8V_Z58' },
          { name: 'Gemelos Sentado', muscleGroup: 'Sóleo (Aislamiento)', sets: '4 series x 15-20 reps', rir: '1-2', youtubeId: '2YV8gK_D_D4' }
        ]
      }
    ]
  },
  5: {
    title: 'Frecuencia 5 — Split Arnold / Hipertrofia Estética (Pecho/Espalda, Hombros/Brazos, Piernas)',
    days: [
      {
        key: 'dia1',
        label: 'Día 1 · Antagonistas: Pecho & Espalda',
        exercises: [
          { name: 'Remo con Barra Prono', muscleGroup: 'Espalda (Dorsal/Trapecio)', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'FsNfvAfLeTw' },
          { name: 'Press Inclinado con Mancuernas', muscleGroup: 'Pecho Superior', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'qhKStczz27Q' },
          { name: 'Jalón al Pecho Agarre Abierto', muscleGroup: 'Espalda (Amplitud)', sets: '4 series x 10-12 reps', rir: '2', youtubeId: '6JbkTvBkekY' },
          { name: 'Aperturas en Máquina (Pec Dec)', muscleGroup: 'Pecho Aislamiento', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'sAeDw6xhFFw' }
        ]
      },
      {
        key: 'dia2',
        label: 'Día 2 · Aislamiento: Hombros & Brazos',
        exercises: [
          { name: 'Press Militar Sentado con Mancuernas', muscleGroup: 'Deltoides', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'BaONy7w34-U' },
          { name: 'Elevaciones Laterales Mancuernas', muscleGroup: 'Hombro Lateral', sets: '4 series x 12-15 reps', rir: '2', youtubeId: 'hgLpdwMtEEs' },
          { name: 'Curl de Bíceps Alterno Mancuernas', muscleGroup: 'Bíceps', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'eSADGjh6Wf8' },
          { name: 'Extensión de Tríceps con Polea Alta', muscleGroup: 'Tríceps', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'YWPIKPdyKhs' },
          { name: 'Curl Martillo Mancuernas', muscleGroup: 'Braquial/Antebrazo', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'YuWwvRD5DW4' }
        ]
      },
      {
        key: 'dia3',
        label: 'Día 3 · Tren Inferior: Piernas Completas',
        exercises: [
          { name: 'Prensa de Piernas inclinada 45°', muscleGroup: 'Cuádriceps', sets: '4 series x 8-12 reps', rir: '1-2', youtubeId: 'yZ8Zc8V_Z58' },
          { name: 'Hip Thrust Barra', muscleGroup: 'Glúteos', sets: '4 series x 8-10 reps', rir: '1-2', youtubeId: 'LM8XH3vGPgo' },
          { name: 'Curl Femoral Acostado', muscleGroup: 'Isquios', sets: '3 series x 10-12 reps', rir: '1-2', youtubeId: '1Tq3QdILRIg' },
          { name: 'Gemelos Sentado', muscleGroup: 'Sóleo', sets: '4 series x 15-20 reps', rir: '1-2', youtubeId: '2YV8gK_D_D4' }
        ]
      },
      {
        key: 'dia4',
        label: 'Día 4 · Upper general (Enfoque)',
        exercises: [
          { name: 'Remo con Barra Prono', muscleGroup: 'Espalda general', sets: '4 series x 8-12 reps', rir: '1-2', youtubeId: 'FsNfvAfLeTw' },
          { name: 'Press de Banca Inclinado con Mancuernas', muscleGroup: 'Pecho Superior', sets: '3 series x 8-10 reps', rir: '1-2', youtubeId: 'qhKStczz27Q' },
          { name: 'Face Pulls en Polea Alta', muscleGroup: 'Hombro Posterior', sets: '3 series x 12-15 reps', rir: '2', youtubeId: 'pIP5EKDp88k' },
          { name: 'Extensión de Tríceps con Polea Alta', muscleGroup: 'Tríceps (Cabeza larga)', sets: '3 series x 10-12 reps', rir: '2', youtubeId: 'YWPIKPdyKhs' }
        ]
      },
      {
        key: 'dia5',
        label: 'Día 5 · Brazos & Detalles estéticos',
        exercises: [
          { name: 'Curl Martillo con Mancuernas', muscleGroup: 'Bíceps y antebrazos', sets: '4 series x 10-12 reps', rir: '2', youtubeId: 'YuWwvRD5DW4' },
          { name: 'Extensión de Tríceps con Polea Alta', muscleGroup: 'Tríceps', sets: '4 series x 10-12 reps', rir: '2', youtubeId: 'YWPIKPdyKhs' },
          { name: 'Elevaciones Laterales Mancuernas', muscleGroup: 'Hombros Laterales', sets: '4 series x 12-15 reps', rir: '2', youtubeId: 'hgLpdwMtEEs' },
          { name: 'Curl Bíceps con Barra EZ', muscleGroup: 'Bíceps', sets: '3 series x 8-12 reps', rir: '2', youtubeId: 'yKjA00wM0_A' }
        ]
      }
    ]
  }
}

export default function HypertrophyPage() {
  const [splitDays, setSplitDays] = useState<3 | 4 | 5>(4) // 3, 4 o 5 días por defecto 4
  const [activeTabKey, setActiveTabKey] = useState<string>('dia1')
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null) // Modal video

  const currentRoutine = HYPERTROPHY_ROUTINES[splitDays]
  const currentDay = currentRoutine.days.find(d => d.key === activeTabKey) || currentRoutine.days[0]

  // Si cambiamos de split y la pestaña seleccionada ya no existe en el nuevo split, restablecer al primer día
  function handleSplitChange(days: 3 | 4 | 5) {
    setSplitDays(days)
    const newRoutine = HYPERTROPHY_ROUTINES[days]
    // Validar si el activeTabKey existe en el nuevo split
    const exists = newRoutine.days.some(d => d.key === activeTabKey)
    if (!exists) {
      setActiveTabKey(newRoutine.days[0].key)
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
      {/* Cabecera */}
      <div className="mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">Entrenamiento y Técnica</p>
          <h1 className="font-black text-4xl uppercase tracking-tight text-white leading-none">
            Rutinas de <span className="text-[#C8FF00]">Hipertrofia</span>
          </h1>
          <p className="text-sm text-white/30 font-mono mt-2">
            Organiza tus accesorios de aislamiento con guías visuales de ejecución técnica
          </p>
        </div>

        {/* Frecuencia Selector (3, 4, 5 días) */}
        <div className="bg-[#111] border border-white/[0.07] p-2 rounded-xl flex items-center gap-1.5 self-start md:self-auto overflow-x-auto max-w-full">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 px-2 whitespace-nowrap"> Split Frecuencia:</span>
          {([3, 4, 5] as const).map(d => (
            <button
              key={d}
              onClick={() => handleSplitChange(d)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all whitespace-nowrap ${splitDays === d
                  ? 'bg-[#C8FF00] text-black shadow-lg shadow-[#C8FF00]/10'
                  : 'text-white/40 hover:text-white hover:bg-white/[0.03]'
                }`}
            >
              {d} días
            </button>
          ))}
        </div>
      </div>

      {/* Info Split Activo */}
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-[9px] font-mono uppercase tracking-widest text-[#C8FF00] mb-0.5">Esquema Seleccionado</p>
          <p className="font-bold text-sm text-white">{currentRoutine.title}</p>
        </div>
        <div className="bg-[#181818] border border-white/[0.07] px-3 py-1.5 rounded-lg text-xs font-mono text-white/40 sm:whitespace-nowrap whitespace-normal">
          Volumen: 12 - 20 series por grupo muscular / semana
        </div>
      </div>

      {/* ── SELECTOR DE DÍAS (PESTAÑAS - DINÁMICO SEGÚN SPLIT) ── */}
      <div className="flex border-b border-white/[0.07] mb-8 gap-2 overflow-x-auto pb-0.5">
        {currentRoutine.days.map(day => (
          <button
            key={day.key}
            onClick={() => setActiveTabKey(day.key)}
            className={`flex-1 min-w-[140px] pb-3 text-center transition-all focus:outline-none border-b-2 ${activeTabKey === day.key
                ? 'border-[#C8FF00] text-white font-bold'
                : 'border-transparent text-white/30 hover:text-white/60'
              }`}
          >
            <p className="text-xs uppercase tracking-wider">{day.label.split(' · ')[0]}</p>
            <p className="text-[9px] font-mono uppercase tracking-widest opacity-60 mt-0.5">{day.label.split(' · ')[1] || ''}</p>
          </button>
        ))}
      </div>

      {/* ── LISTA DE EJERCICIOS DEL DÍA SELECCIONADO ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {currentDay.exercises.map(acc => (
          <div
            key={acc.name}
            className="bg-[#111] border border-white/[0.07] hover:border-white/15 p-5 rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-white/[0.01]"
          >
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#C8FF00] bg-[#C8FF00]/10 px-2 py-0.5 rounded">
                {acc.muscleGroup}
              </span>
              <h3 className="font-bold text-base text-white mt-2 leading-tight">{acc.name}</h3>
              <p className="text-xs font-mono text-white/30 mt-1">{acc.sets} · RIR Objetivo: {acc.rir}</p>
            </div>
            <button
              onClick={() => setCurrentVideoId(acc.youtubeId)}
              className="flex-shrink-0 px-3 py-2 bg-[#C8FF00]/10 hover:bg-[#C8FF00]/20 border border-[#C8FF00]/30 rounded-lg text-[10px] font-mono text-[#C8FF00] uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>Ver Video</span>
              <span>📹</span>
            </button>
          </div>
        ))}
      </div>

      {/* ── MÉTODOS DE INTENSIFICACIÓN Y NOTAS CLAVE ── */}
      <div className="bg-[#111] border border-white/[0.07] rounded-xl p-4 sm:p-6 text-xs text-white/40 font-mono leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/70 mb-2 font-bold">Concepto Clave: RIR (Reps in Reserve)</p>
          Para maximizar la hipertrofia (crecimiento muscular) sin fundir tu sistema nervioso, mantente en un RIR 1 o RIR 2 en tus series de accesorios. Significa finalizar la serie sintiendo que podías hacer exactamente 1 o 2 repeticiones más con técnica perfecta antes del fallo total.
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#C8FF00] mb-2 font-bold">Consejo de Ejecución</p>
          Haz clic en **"Ver Video"** para abrir el modal interactivo con la demostración en video. Concéntrate en la fase excéntrica (bajada del peso) de forma controlada (2-3 segundos) para causar mayor microrrotura muscular y optimizar el estímulo mecánico.
        </div>
      </div>

      {/* ── MODAL POPUP PARA VIDEO TUTORIAL YOUTUBE ── */}
      {currentVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden relative shadow-2xl">

            {/* Header del modal */}
            <div className="px-5 py-4 border-b border-white/[0.07] flex justify-between items-center bg-[#181818]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8FF00] font-bold flex items-center gap-2">
                <span>📹</span> Tutorial de Técnica de Ejecución
              </span>
              <button
                onClick={() => setCurrentVideoId(null)}
                className="text-white/40 hover:text-white font-mono text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-all"
              >
                Cerrar ×
              </button>
            </div>

            {/* Video Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Pie del modal */}
            <div className="p-4 bg-[#181818] text-[9px] font-mono text-white/30 leading-relaxed text-center">
              *Los videos son demostraciones de técnica provistas públicamente. Mantén un rango de movimiento seguro y no sacrifiques la postura por levantar más carga.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
