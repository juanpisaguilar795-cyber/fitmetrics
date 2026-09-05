// components/ui/toggle-group.tsx
'use client'

import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
  desc?: string
}

interface ToggleGroupProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  cols?: 2 | 3 | 4 | 5
}

const COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
}

export function ToggleGroup({ options, value, onChange, cols = 2 }: ToggleGroupProps) {
  return (
    <div className={cn('grid gap-2', COLS[cols])}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg border text-center transition-all',
            value === opt.value
              ? 'bg-[#C8FF00]/10 border-[#C8FF00]/30 text-[#C8FF00]'
              : 'bg-[#181818] border-white/[0.07] text-white/40 hover:text-white/60 hover:border-white/20'
          )}
        >
          <span className={cn('text-xs font-mono uppercase tracking-widest', value === opt.value ? 'text-[#C8FF00]' : '')}>
            {opt.label}
          </span>
          {opt.desc && (
            <span className="text-[10px] font-mono text-white/20 leading-tight">
              {opt.desc}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// Versión inline (horizontal, para 2-3 opciones tipo tab)
export function ToggleTab({ options, value, onChange }: Omit<ToggleGroupProps, 'cols'>) {
  return (
    <div className="flex gap-1 bg-[#181818] border border-white/[0.07] rounded-lg p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex-1 py-2 px-3 rounded-md text-xs font-mono uppercase tracking-widest transition-all',
            value === opt.value
              ? 'bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/20'
              : 'text-white/30 hover:text-white/50'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
