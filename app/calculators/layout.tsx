// app/calculators/layout.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '@/components/layout/Sidebar'

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Mobile Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#111]/90 backdrop-blur-md border-b border-white/[0.07] px-4 flex items-center justify-between z-40">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-[#C8FF00] rounded-md flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L5 7L8 9L11 4L14 6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="6" r="1.5" fill="#000"/>
            </svg>
          </div>
          <span className="font-black text-xs tracking-widest uppercase text-white">
            Fit<span className="text-[#C8FF00]">Metrics</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-white/60 hover:text-white rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center gap-1.5 text-xs font-mono"
          aria-label="Abrir menú"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <span className="uppercase">Menú</span>
        </button>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen bg-[#0a0a0a] pt-14 lg:pt-0 [&>*]:mx-auto w-full max-w-full">
        {children}
      </main>
    </div>
  )
}

