// lib/validations/calculators.ts
import { z } from 'zod'

// ── TDEE ─────────────────────────────────────────────────────────────────────
export const tdeeSchema = z.object({
  weight_kg:      z.number().min(30).max(300),
  height_cm:      z.number().min(100).max(250),
  age:            z.number().int().min(15).max(100),
  sex:            z.enum(['male', 'female']),
  activity_level: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  goal:           z.enum(['deficit', 'maintenance', 'surplus']),
  formula:        z.enum(['mifflin', 'harris']).default('mifflin'),
})

// ── MACROS ───────────────────────────────────────────────────────────────────
export const macrosSchema = z.object({
  tdee:    z.number().min(800).max(10000),
  goal:    z.enum(['deficit', 'maintenance', 'surplus']),
  // Proteína en g/kg de peso corporal (personalizable)
  protein_ratio: z.number().min(1.2).max(3.5).default(2.2),
  fat_ratio:     z.number().min(0.15).max(0.45).default(0.27), // % de calorías
})

// ── ONE REP MAX ───────────────────────────────────────────────────────────────
export const oneRepMaxSchema = z.object({
  weight_lifted: z.number().min(1).max(1000),
  reps:          z.number().int().min(1).max(30),
  formula:       z.enum(['epley', 'brzycki', 'lombardi']).default('epley'),
})

export type TDEEInput       = z.infer<typeof tdeeSchema>
export type MacrosInput     = z.infer<typeof macrosSchema>
export type OneRepMaxInput  = z.infer<typeof oneRepMaxSchema>
