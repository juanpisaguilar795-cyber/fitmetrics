// components/ui/card.tsx
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
  lime?: boolean
}

export function Card({ children, className, hover, lime, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#111] border border-white/[0.07] rounded-xl',
        hover && 'transition-all hover:border-white/20 hover:bg-[#151515]',
        lime  && 'border-[#C8FF00]/20 bg-[#C8FF00]/[0.02]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-6 py-4 border-b border-white/[0.07]', className)} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-black text-sm uppercase tracking-wide text-white', className)}
      {...props}
    >
      {children}
    </h3>
  )
}
