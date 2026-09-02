// components/ui/badge.tsx
import { cn } from '@/lib/utils'

// ── Badge ─────────────────────────────────────────────────────────────────────
type BadgeVariant = 'lime' | 'blue' | 'orange' | 'red' | 'gray' | 'green'

const BADGE_STYLES: Record<BadgeVariant, string> = {
  lime:   'bg-[#C8FF00]/10 text-[#C8FF00] border-[#C8FF00]/20',
  blue:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  red:    'bg-red-500/10 text-red-400 border-red-500/20',
  gray:   'bg-white/5 text-white/40 border-white/10',
  green:  'bg-green-500/10 text-green-400 border-green-500/20',
}

interface BadgeProps {
  children:  React.ReactNode
  variant?:  BadgeVariant
  className?: string
}
export function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border',
        BADGE_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

// ── Button ────────────────────────────────────────────────────────────────────
type ButtonVariant = 'lime' | 'ghost' | 'outline'

const BTN_STYLES: Record<ButtonVariant, string> = {
  lime:    'bg-[#C8FF00] text-black hover:bg-[#d4ff26] font-black',
  ghost:   'bg-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.04] border border-white/[0.07]',
  outline: 'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.04] font-bold',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  loading?:  boolean
  fullWidth?: boolean
}
export function Button({
  children, variant = 'lime', loading, fullWidth, className, disabled, ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'px-5 py-3 rounded-lg text-sm uppercase tracking-widest font-mono',
        'transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
        BTN_STYLES[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  )
}

// ── StatCard ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  label:    string
  value:    string | number
  unit?:    string
  sub?:     string
  accent?:  boolean
}
export function StatCard({ label, value, unit, sub, accent }: StatCardProps) {
  return (
    <div className={cn(
      'bg-[#111] border rounded-xl p-5',
      accent ? 'border-[#C8FF00]/20 bg-[#C8FF00]/[0.02]' : 'border-white/[0.07]'
    )}>
      <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-3">{label}</p>
      <p className={cn('font-black leading-none', accent ? 'text-[#C8FF00]' : 'text-white',
        String(value).length > 5 ? 'text-3xl' : 'text-4xl'
      )}>
        {value}
        {unit && (
          <span className={cn('font-mono ml-1', accent ? 'text-[#C8FF00]/60 text-sm' : 'text-white/30 text-base')}>
            {unit}
          </span>
        )}
      </p>
      {sub && <p className="text-[10px] font-mono text-white/20 mt-1.5">{sub}</p>}
    </div>
  )
}

// ── EmptyState ────────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?:    React.ReactNode
  title:    string
  desc?:    string
  action?:  React.ReactNode
}
export function EmptyState({ icon, title, desc, action }: EmptyStateProps) {
  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
      {icon && (
        <div className="w-12 h-12 bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-xl flex items-center justify-center text-[#C8FF00]">
          {icon}
        </div>
      )}
      <div>
        <p className="text-white/30 font-mono text-sm">{title}</p>
        {desc && <p className="text-white/15 font-mono text-xs mt-1">{desc}</p>}
      </div>
      {action}
    </div>
  )
}

// ── SectionLabel ──────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 mb-4">
      {children}
    </p>
  )
}

// ── PageHeader ────────────────────────────────────────────────────────────────
interface PageHeaderProps {
  section?: string
  title:    React.ReactNode
  desc?:    string
}
export function PageHeader({ section, title, desc }: PageHeaderProps) {
  return (
    <div className="mb-10">
      {section && (
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-1">
          {section}
        </p>
      )}
      <h1 className="font-black text-4xl uppercase tracking-tight text-white leading-none">
        {title}
      </h1>
      {desc && <p className="text-sm text-white/30 font-mono mt-2">{desc}</p>}
    </div>
  )
}
