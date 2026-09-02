// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Combina clases de Tailwind sin conflictos */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formatea números con separador de miles */
export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
}

/** Formatea calorías: "2.790 kcal" */
export function formatCalories(kcal: number): string {
  return `${formatNumber(kcal)} kcal`
}

/** Formatea peso: "75.5 kg" */
export function formatWeight(kg: number): string {
  return `${formatNumber(kg, 1)} kg`
}

/** Devuelve iniciales para avatar */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
