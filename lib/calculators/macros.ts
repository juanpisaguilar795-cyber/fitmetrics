// lib/calculators/macros.ts

import type { MacrosInput } from '@/lib/validations/calculators'

export interface MacrosResult {
  calories:  number  // calorías objetivo (con ajuste de goal)
  protein_g: number
  carbs_g:   number
  fat_g:     number
  protein_pct: number
  carbs_pct:   number
  fat_pct:     number
}

// Ajuste calórico por objetivo (igual que TDEE)
const GOAL_ADJUSTMENT: Record<MacrosInput['goal'], number> = {
  deficit:     -500,
  maintenance:    0,
  surplus:      300,
}

export function calculateMacros(input: MacrosInput): MacrosResult {
  const { tdee, goal, protein_ratio, fat_ratio } = input

  const calories  = Math.round(tdee + GOAL_ADJUSTMENT[goal])

  // Proteína: ratio en g/kg — se pasa desde el frontend con el peso del usuario
  // fat_ratio: porcentaje de calorías totales (ej: 0.27 = 27%)
  const fat_g     = Math.round((calories * fat_ratio) / 9)
  const protein_g = Math.round(protein_ratio) // ya viene calculado en g totales desde el input

  // Carbos: calorías restantes después de cubrir proteínas y grasas
  const remaining = calories - protein_g * 4 - fat_g * 9
  const carbs_g   = Math.max(0, Math.round(remaining / 4))

  // Porcentajes reales
  const total_cals = protein_g * 4 + carbs_g * 4 + fat_g * 9
  const protein_pct = Math.round((protein_g * 4 / total_cals) * 100)
  const fat_pct     = Math.round((fat_g * 9 / total_cals) * 100)
  const carbs_pct   = 100 - protein_pct - fat_pct

  return {
    calories,
    protein_g,
    carbs_g,
    fat_g,
    protein_pct,
    carbs_pct,
    fat_pct,
  }
}
