// lib/calculators/tdee.ts
// Lógica pura — sin dependencias externas, fácil de testear

import type { TDEEInput } from '@/lib/validations/calculators'

// Multiplicadores de actividad
export const ACTIVITY_MULTIPLIERS: Record<TDEEInput['activity_level'], number> = {
  sedentary:  1.2,    // Trabajo de escritorio, sin ejercicio
  light:      1.375,  // Ejercicio 1-3 días/semana
  moderate:   1.55,   // Ejercicio 3-5 días/semana
  active:     1.725,  // Ejercicio 6-7 días/semana
  very_active: 1.9,   // Atleta, doble sesión diaria
}

// Ajustes calóricos por objetivo
export const GOAL_ADJUSTMENTS: Record<TDEEInput['goal'], number> = {
  deficit:     -500,  // ~0.5 kg/semana de pérdida
  maintenance:    0,
  surplus:      300,  // Superávit limpio para muscular
}

export interface TDEEResult {
  bmr:          number  // Basal Metabolic Rate
  tdee:         number  // Total Daily Energy Expenditure
  target:       number  // Calorías ajustadas por objetivo
  formula_used: 'mifflin' | 'harris'
  activity_multiplier: number
  goal_adjustment:     number
}

/**
 * Calcula el BMR usando la fórmula Mifflin-St Jeor
 * Más precisa para la mayoría de adultos modernos
 */
function mifflinStJeor(
  weight_kg: number,
  height_cm: number,
  age: number,
  sex: 'male' | 'female'
): number {
  const base = 10 * weight_kg + 6.25 * height_cm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

/**
 * Calcula el BMR usando Harris-Benedict revisada (1984)
 * Útil como referencia o segunda opinión
 */
function harrisBenedict(
  weight_kg: number,
  height_cm: number,
  age: number,
  sex: 'male' | 'female'
): number {
  if (sex === 'male') {
    return 88.362 + 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age
  }
  return 447.593 + 9.247 * weight_kg + 3.098 * height_cm - 4.330 * age
}

export function calculateTDEE(input: TDEEInput): TDEEResult {
  const { weight_kg, height_cm, age, sex, activity_level, goal, formula } = input

  const bmr = formula === 'harris'
    ? harrisBenedict(weight_kg, height_cm, age, sex)
    : mifflinStJeor(weight_kg, height_cm, age, sex)

  const multiplier    = ACTIVITY_MULTIPLIERS[activity_level]
  const adjustment    = GOAL_ADJUSTMENTS[goal]
  const tdee          = Math.round(bmr * multiplier)
  const target        = Math.round(tdee + adjustment)

  return {
    bmr:                 Math.round(bmr),
    tdee,
    target,
    formula_used:        formula ?? 'mifflin',
    activity_multiplier: multiplier,
    goal_adjustment:     adjustment,
  }
}
