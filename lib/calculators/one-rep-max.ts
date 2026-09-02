// lib/calculators/one-rep-max.ts

import type { OneRepMaxInput } from '@/lib/validations/calculators'

export interface OneRepMaxResult {
  one_rm:       number   // 1RM estimado en kg
  formula_used: string
  percentages:  RepPercentage[]
}

export interface RepPercentage {
  pct:    number  // porcentaje del 1RM
  weight: number  // kg para ese %
  reps:   number  // reps típicas en ese %
}

/**
 * Epley (1985) — más usada en powerlifting
 * 1RM = w × (1 + r/30)
 */
function epley(weight: number, reps: number): number {
  if (reps === 1) return weight
  return weight * (1 + reps / 30)
}

/**
 * Brzycki — más precisa para reps bajas (1-10)
 * 1RM = w × 36 / (37 - r)
 */
function brzycki(weight: number, reps: number): number {
  if (reps === 1) return weight
  if (reps >= 37) return 0 // fórmula no válida para reps muy altas
  return weight * (36 / (37 - reps))
}

/**
 * Lombardi — buena para reps altas (> 10)
 * 1RM = w × r^0.10
 */
function lombardi(weight: number, reps: number): number {
  if (reps === 1) return weight
  return weight * Math.pow(reps, 0.10)
}

// Tabla de porcentajes estándar de powerlifting
const PERCENTAGE_TABLE = [
  { pct: 100, reps: 1  },
  { pct: 95,  reps: 2  },
  { pct: 90,  reps: 3  },
  { pct: 85,  reps: 5  },
  { pct: 80,  reps: 6  },
  { pct: 75,  reps: 8  },
  { pct: 70,  reps: 10 },
  { pct: 65,  reps: 12 },
  { pct: 60,  reps: 15 },
]

export function calculateOneRepMax(input: OneRepMaxInput): OneRepMaxResult {
  const { weight_lifted, reps, formula } = input

  const calculators = {
    epley:    epley,
    brzycki:  brzycki,
    lombardi: lombardi,
  }

  const raw1RM    = calculators[formula](weight_lifted, reps)
  const one_rm    = Math.round(raw1RM * 10) / 10  // 1 decimal

  const percentages: RepPercentage[] = PERCENTAGE_TABLE.map(({ pct, reps: r }) => ({
    pct,
    weight: Math.round((one_rm * pct) / 100 * 10) / 10,
    reps:   r,
  }))

  return {
    one_rm,
    formula_used: formula,
    percentages,
  }
}
