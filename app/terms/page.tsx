// app/terms/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de FitMetrics.',
}

const LAST_UPDATED = '20 de marzo de 2025'
const APP_NAME     = 'FitMetrics'
const CONTACT      = 'legal@fitmetrics.app'

export default function TermsPage() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: 'var(--font-dm-sans)', color: '#f0f0f0' }}>

      {/* Grid texture */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
      }}/>

      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#C8FF00', borderRadius: 6, display: 'grid', placeItems: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L5 7L8 9L11 4L14 6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="14" cy="6" r="1.5" fill="#000"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 18, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#f0f0f0' }}>
            FIT<span style={{ color: '#C8FF00' }}>METRICS</span>
          </span>
        </Link>
        <Link href="/auth/register" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
          ← Volver al registro
        </Link>
      </nav>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', padding: '64px 32px 96px' }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#C8FF00', marginBottom: 12 }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 52, lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#f0f0f0', marginBottom: 16 }}>
            Términos y<br /><span style={{ color: '#C8FF00' }}>condiciones</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Intro box */}
        <div style={{ padding: '16px 20px', background: 'rgba(200,255,0,0.04)', border: '1px solid rgba(200,255,0,0.12)', borderRadius: 10, marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: 'rgba(200,255,0,0.7)', lineHeight: 1.7 }}>
            Al crear una cuenta o usar {APP_NAME}, aceptas estos términos. Léelos con atención. Si no estás de acuerdo, no uses el servicio.
          </p>
        </div>

        {/* Sections */}
        {[
          {
            num: '01',
            title: 'Aceptación de los términos',
            content: `Al acceder o usar ${APP_NAME} (el "Servicio"), confirmas que has leído, entendido y aceptado quedar vinculado por estos Términos y Condiciones. Si usas el Servicio en nombre de una organización, confirmas que tienes autoridad para vincular a dicha organización.

Estos términos aplican a todos los usuarios del Servicio, incluyendo visitantes, usuarios registrados y usuarios con suscripción premium.`,
          },
          {
            num: '02',
            title: 'Descripción del servicio',
            content: `${APP_NAME} es una plataforma digital de fitness que proporciona herramientas de análisis y seguimiento de entrenamiento, incluyendo:

• Calculadoras de gasto energético (TDEE) basadas en fórmulas científicas validadas
• Calculadoras de distribución de macronutrientes
• Calculadoras de fuerza máxima (1RM)
• Historial de cálculos y métricas personales
• Funciones premium adicionales mediante suscripción

El Servicio es de naturaleza informativa y educativa. Los resultados de las calculadoras son estimaciones basadas en fórmulas científicas estandarizadas y no reemplazan el consejo médico profesional.`,
          },
          {
            num: '03',
            title: 'Cuentas de usuario',
            content: `Para acceder a ciertas funciones del Servicio, debes crear una cuenta. Al registrarte, te comprometes a:

• Proporcionar información precisa, completa y actualizada
• Mantener la confidencialidad de tu contraseña
• Notificarnos de inmediato cualquier uso no autorizado de tu cuenta
• Ser responsable de todas las actividades que ocurran bajo tu cuenta

Debes tener al menos 16 años para crear una cuenta. Nos reservamos el derecho de cancelar cuentas que violen estos términos.`,
          },
          {
            num: '04',
            title: 'Suscripción premium y pagos',
            content: `${APP_NAME} ofrece un plan gratuito y un plan Premium de pago. Al suscribirte al plan Premium:

• El pago se procesa de forma segura a través de Stripe
• La suscripción se renueva automáticamente cada mes por $9 USD
• Puedes cancelar en cualquier momento desde el portal de facturación
• Al cancelar, mantienes acceso Premium hasta el final del período pagado
• No se realizan reembolsos por períodos parciales salvo cuando la ley lo exija
• Los precios pueden cambiar con 30 días de aviso previo

No almacenamos datos de tarjetas de crédito. Stripe maneja todos los pagos con certificación PCI DSS.`,
          },
          {
            num: '05',
            title: 'Uso aceptable',
            content: `Al usar ${APP_NAME}, te comprometes a NO:

• Usar el Servicio para cualquier propósito ilegal o no autorizado
• Intentar acceder a cuentas de otros usuarios
• Realizar ingeniería inversa, descompilar o desensamblar el Servicio
• Transmitir malware, virus o código dañino
• Usar bots o medios automatizados para acceder al Servicio sin permiso
• Revender o redistribuir el Servicio sin autorización
• Publicar contenido falso, engañoso o que viole derechos de terceros

Nos reservamos el derecho de suspender o terminar el acceso de cualquier usuario que viole estas condiciones.`,
          },
          {
            num: '06',
            title: 'Propiedad intelectual',
            content: `Todo el contenido del Servicio, incluyendo pero no limitado a textos, gráficos, logotipos, íconos, imágenes, código fuente y software, es propiedad de ${APP_NAME} o de sus proveedores de contenido y está protegido por leyes de propiedad intelectual.

Se te otorga una licencia limitada, no exclusiva y no transferible para usar el Servicio según estos términos. No puedes reproducir, distribuir, modificar o crear trabajos derivados sin nuestro consentimiento expreso por escrito.`,
          },
          {
            num: '07',
            title: 'Aviso de salud y responsabilidad médica',
            content: `Las calculadoras y herramientas de ${APP_NAME} están diseñadas para fines informativos y educativos únicamente. Los resultados son estimaciones basadas en fórmulas científicas estandarizadas.

El uso del Servicio no reemplaza la consulta con profesionales de la salud, médicos, nutricionistas o entrenadores certificados. Antes de realizar cambios significativos en tu dieta o rutina de ejercicio, consulta con un profesional de la salud.

${APP_NAME} no se hace responsable de lesiones, problemas de salud o cualquier otro daño derivado del uso o mal uso de la información proporcionada por el Servicio.`,
          },
          {
            num: '08',
            title: 'Limitación de responsabilidad',
            content: `En la máxima medida permitida por la ley aplicable, ${APP_NAME} y sus directores, empleados, socios y agentes no serán responsables por:

• Daños indirectos, incidentales, especiales, consecuentes o punitivos
• Pérdida de datos, ganancias, reputación u otras pérdidas intangibles
• Cualquier daño resultante del uso o la imposibilidad de usar el Servicio

Nuestra responsabilidad total ante ti por cualquier reclamación no excederá el monto que hayas pagado por el Servicio en los últimos 12 meses.`,
          },
          {
            num: '09',
            title: 'Modificaciones del servicio y los términos',
            content: `Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte de él) en cualquier momento, con o sin previo aviso.

Podemos actualizar estos Términos periódicamente. Te notificaremos sobre cambios significativos por email o mediante un aviso prominente en el Servicio. El uso continuado después de la notificación constituye aceptación de los nuevos términos.`,
          },
          {
            num: '10',
            title: 'Ley aplicable y resolución de disputas',
            content: `Estos Términos se rigen por las leyes de Colombia, sin consideración de sus principios de conflicto de leyes.

Cualquier disputa que surja de o esté relacionada con estos Términos o el uso del Servicio se resolverá primero mediante negociación de buena fe. Si no se llega a un acuerdo en 30 días, las partes acuerdan someterse a la jurisdicción de los tribunales competentes de Bogotá, Colombia.`,
          },
          {
            num: '11',
            title: 'Contacto',
            content: `Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos en:

Email: ${CONTACT}
Sitio web: fitmetrics.app

Responderemos a tu consulta en un plazo máximo de 5 días hábiles.`,
          },
        ].map(({ num, title, content }) => (
          <section key={num} style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 13, color: '#C8FF00', letterSpacing: '0.1em', flexShrink: 0 }}>
                {num}
              </span>
              <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#f0f0f0' }}>
                {title}
              </h2>
            </div>
            <div style={{ paddingLeft: 28, borderLeft: '2px solid rgba(255,255,255,0.06)' }}>
              {content.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 12, fontWeight: 300 }}>
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* Footer CTA */}
        <div style={{ marginTop: 64, padding: '24px 28px', background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: '#f0f0f0', marginBottom: 4 }}>
              ¿Listo para empezar?
            </p>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              Crea tu cuenta gratis — sin tarjeta de crédito
            </p>
          </div>
          <Link href="/auth/register" style={{ padding: '12px 28px', background: '#C8FF00', color: '#000', fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 8, textDecoration: 'none', flexShrink: 0 }}>
            Crear cuenta →
          </Link>
        </div>
      </main>
    </div>
  )
}
