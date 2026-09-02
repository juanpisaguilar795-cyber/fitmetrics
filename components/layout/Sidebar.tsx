// components/layout/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  {
    label: 'Inicio',
    href:  '/',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'TDEE / Calorías',
    href:  '/calculators/tdee',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M9 19V13a3 3 0 01-6 0V6m6 13v-6m0 0a3 3 0 016 0v6m-6-6V6m6 13V10m0 0a3 3 0 016 0v9"/>
      </svg>
    ),
  },
  {
    label: 'Macros',
    href:  '/calculators/macros',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    label: '1RM',
    href:  '/calculators/one-rep-max',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    label: 'Carga de Barra',
    href:  '/calculators/plate-loader',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/>
      </svg>
    ),
  },
  {
    label: 'Plan de Bloques',
    href:  '/calculators/block-planner',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Hipertrofia & Videos',
    href:  '/calculators/hypertrophy',
    icon:  (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M23 7a2 2 0 0 0-2.45-1.45L11 9 1 12v9a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7Z"/>
        <path d="M10 12v6l5-3-5-3Z" fill="currentColor"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#111] border-r border-white/[0.07] flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.07]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#C8FF00] rounded-md flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L5 7L8 9L11 4L14 6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="6" r="1.5" fill="#000"/>
            </svg>
          </div>
          <span className="font-black text-sm tracking-widest uppercase text-white">
            Fit<span className="text-[#C8FF00]">Metrics</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 px-3 mb-2">
          Calculadoras
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-mono transition-all ${
                isActive
                  ? 'bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/20'
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              <span className={isActive ? 'text-[#C8FF00]' : 'text-white/30'}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-white/[0.07] text-center">
        <p className="text-[9px] font-mono uppercase tracking-widest text-white/20">
          Versión Pública Gratis
        </p>
      </div>
    </aside>
  )
}
