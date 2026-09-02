// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'FitMetrics — Entrena con datos. Mejora con métricas.',
    template: '%s | FitMetrics',
  },
  description:
    'Plataforma digital de fitness basada en datos. Calculadoras de TDEE, macronutrientes y fuerza (1RM). Optimiza tu entrenamiento con métricas inteligentes.',
  keywords: ['fitness', 'TDEE', 'macros', 'calculadora', 'nutrición', 'entrenamiento', '1RM'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title:       'FitMetrics — Entrena con datos.',
    description: 'Optimiza tu entrenamiento con métricas y análisis inteligentes.',
    type:        'website',
    locale:      'es_CO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
