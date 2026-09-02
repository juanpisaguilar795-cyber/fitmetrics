// lib/validations/profile.ts
import { z } from 'zod'

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100)
    .optional()
    .nullable(),
  age: z
    .number()
    .int('La edad debe ser un número entero')
    .min(15, 'Debes tener al menos 15 años')
    .max(100, 'Ingresa una edad válida')
    .optional()
    .nullable(),
  weight_kg: z
    .number()
    .min(30, 'El peso mínimo es 30 kg')
    .max(300, 'Ingresa un peso válido')
    .optional()
    .nullable(),
  height_cm: z
    .number()
    .min(100, 'La altura mínima es 100 cm')
    .max(250, 'Ingresa una altura válida')
    .optional()
    .nullable(),
  activity_level: z
    .enum(['sedentary', 'light', 'moderate', 'active', 'very_active'])
    .optional()
    .nullable(),
  goal: z
    .enum(['deficit', 'maintenance', 'surplus'])
    .optional()
    .nullable(),
  unit_preference: z
    .enum(['metric', 'imperial'])
    .default('metric'),
})

export type ProfileInput = z.infer<typeof profileSchema>
