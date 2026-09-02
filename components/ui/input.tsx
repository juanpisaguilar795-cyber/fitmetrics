// components/ui/input.tsx
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

// ── Label ────────────────────────────────────────────────────────────────────
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}
export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label
      className={cn('text-[10px] font-mono uppercase tracking-widest text-white/40', className)}
      {...props}
    >
      {children}
      {required && <span className="text-[#C8FF00] ml-1">*</span>}
    </label>
  )
}

// ── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      <input
        ref={ref}
        className={cn(
          'bg-[#181818] border rounded-lg px-4 py-3 text-white text-sm font-mono',
          'placeholder:text-white/20 focus:outline-none transition-colors w-full',
          error
            ? 'border-red-500/40 focus:border-red-500/60'
            : 'border-white/[0.07] focus:border-[#C8FF00]/40',
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-red-400 font-mono">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

// ── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      <select
        ref={ref}
        className={cn(
          'bg-[#181818] border rounded-lg px-4 py-3 text-white text-sm font-mono',
          'focus:outline-none transition-colors appearance-none cursor-pointer w-full',
          error
            ? 'border-red-500/40 focus:border-red-500/60'
            : 'border-white/[0.07] focus:border-[#C8FF00]/40',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-[11px] text-red-400 font-mono">{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'

// ── Field (Label + Input juntos) ──────────────────────────────────────────────
interface FieldProps {
  label:     string
  required?: boolean
  error?:    string
  children:  React.ReactNode
  hint?:     string
}
export function Field({ label, required, error, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label required={required}>{label}</Label>
      {children}
      {hint && !error && <p className="text-[11px] font-mono text-white/20">{hint}</p>}
      {error           && <p className="text-[11px] text-red-400 font-mono">{error}</p>}
    </div>
  )
}
