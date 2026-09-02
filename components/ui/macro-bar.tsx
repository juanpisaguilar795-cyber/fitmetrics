// components/ui/macro-bar.tsx
'use client'

interface MacroBarProps {
  protein_g:   number
  carbs_g:     number
  fat_g:       number
  protein_pct: number
  carbs_pct:   number
  fat_pct:     number
  calories:    number
}

const MACROS = [
  { key: 'protein', label: 'Proteína', color: '#C8FF00', kcal: 4 },
  { key: 'carbs',   label: 'Carbos',   color: '#60a5fa', kcal: 4 },
  { key: 'fat',     label: 'Grasas',   color: '#fb923c', kcal: 9 },
] as const

export function MacroBar({
  protein_g, carbs_g, fat_g,
  protein_pct, carbs_pct, fat_pct,
  calories,
}: MacroBarProps) {
  const data = [
    { ...MACROS[0], g: protein_g, pct: protein_pct },
    { ...MACROS[1], g: carbs_g,   pct: carbs_pct   },
    { ...MACROS[2], g: fat_g,     pct: fat_pct      },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Calories total */}
      <div className="flex items-baseline gap-2">
        <span className="font-black text-5xl text-[#C8FF00] leading-none">
          {calories.toLocaleString('es-CO')}
        </span>
        <span className="text-sm font-mono text-white/30">kcal / día</span>
      </div>

      {/* Stacked bar */}
      <div className="h-3 rounded-full overflow-hidden flex w-full bg-white/[0.05]">
        {data.map(({ key, color, pct }) => (
          <div
            key={key}
            style={{ width: `${pct}%`, background: color }}
            className="h-full transition-all duration-700"
          />
        ))}
      </div>

      {/* Macro cards */}
      <div className="grid grid-cols-3 gap-3">
        {data.map(({ key, label, color, g, pct, kcal }) => (
          <div
            key={key}
            className="bg-[#181818] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-1"
            style={{ borderTopColor: color, borderTopWidth: 2 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color }}>
              {label}
            </p>
            <p className="font-black text-2xl text-white leading-none">{g}<span className="text-sm font-mono text-white/30 ml-1">g</span></p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-[10px] font-mono text-white/20">{pct}% · {g * kcal} kcal</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
