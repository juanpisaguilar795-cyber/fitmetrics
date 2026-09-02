// app/privacy/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y manejo de datos de FitMetrics.',
}

const LAST_UPDATED = '20 de marzo de 2025'
const APP_NAME     = 'FitMetrics'
const CONTACT      = 'privacidad@fitmetrics.app'

export default function PrivacyPage() {
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
            Política de<br /><span style={{ color: '#C8FF00' }}>privacidad</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Commitment box */}
        <div style={{ padding: '16px 20px', background: 'rgba(200,255,0,0.04)', border: '1px solid rgba(200,255,0,0.12)', borderRadius: 10, marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: 'rgba(200,255,0,0.7)', lineHeight: 1.7 }}>
            En {APP_NAME} tomamos tu privacidad en serio. Esta política explica qué datos recopilamos, cómo los usamos y cómo los protegemos. No vendemos ni compartimos tus datos personales con terceros para fines comerciales.
          </p>
        </div>

        {/* Data summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 52 }}>
          {[
            { label: 'Datos encriptados', desc: 'Contraseñas con bcrypt, HTTPS en todo momento' },
            { label: 'Sin venta de datos', desc: 'Nunca vendemos tu información a terceros' },
            { label: 'Derecho al olvido', desc: 'Puedes eliminar tu cuenta y todos tus datos' },
          ].map(({ label, desc }) => (
            <div key={label} style={{ padding: '16px', background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}></div>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f0f0f0', marginBottom: 4 }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Sections */}
        {[
          {
            num: '01',
            title: 'Información que recopilamos',
            content: `Recopilamos la siguiente información cuando usas ${APP_NAME}:

Información que nos proporcionas directamente:
• Nombre completo y dirección de email (al registrarte)
• Datos físicos: edad, peso, altura, nivel de actividad y objetivo (al completar tu perfil)
• Resultados de cálculos: TDEE, macronutrientes, 1RM (guardados en tu historial)
• Información de pago: procesada por Stripe (no almacenamos datos de tarjetas)

Información recopilada automáticamente:
• Datos de uso del servicio (páginas visitadas, funciones usadas)
• Dirección IP y tipo de navegador (para seguridad y análisis)
• Cookies de sesión (necesarias para mantener tu sesión activa)`,
          },
          {
            num: '02',
            title: 'Cómo usamos tu información',
            content: `Usamos tu información exclusivamente para:

• Proveer, mantener y mejorar el Servicio
• Personalizar tu experiencia (pre-llenar calculadoras con tus datos)
• Procesar pagos y gestionar tu suscripción Premium
• Enviarte comunicaciones esenciales del servicio (confirmación de cuenta, alertas de pago)
• Detectar y prevenir fraudes y abusos
• Cumplir con obligaciones legales

No usamos tu información para publicidad dirigida ni la compartimos con anunciantes.`,
          },
          {
            num: '03',
            title: 'Compartición de datos con terceros',
            content: `Compartimos información con terceros únicamente en los siguientes casos:

Proveedores de servicios (procesadores de datos):
• Supabase — base de datos y autenticación (servidores en AWS us-east-1)
• Stripe — procesamiento seguro de pagos (certificación PCI DSS nivel 1)
• Resend — envío de emails transaccionales
• Vercel — infraestructura de hosting

Estos proveedores están contractualmente obligados a proteger tu información y solo pueden usarla para prestarte el servicio que contratamos.

No vendemos, alquilamos ni compartimos tu información personal con terceros para marketing o publicidad.`,
          },
          {
            num: '04',
            title: 'Almacenamiento y seguridad de datos',
            content: `Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos:

• Contraseñas: encriptadas con bcrypt (nunca se almacenan en texto plano)
• Transmisión: HTTPS/TLS en todas las comunicaciones
• Base de datos: Row Level Security (RLS) activo — cada usuario solo puede acceder a sus propios datos
• Acceso: autenticación de dos factores para acceso administrativo
• Backups: copias de seguridad diarias con retención de 30 días

Los datos se almacenan en servidores ubicados en Estados Unidos (AWS us-east-1). Si estás en la Unión Europea, ten en cuenta que tus datos pueden ser transferidos internacionalmente.`,
          },
          {
            num: '05',
            title: 'Retención de datos',
            content: `Conservamos tu información durante el tiempo que mantengas una cuenta activa en ${APP_NAME}.

Al eliminar tu cuenta:
• Tus datos personales son eliminados permanentemente en un plazo de 30 días
• Los datos de facturación se conservan por 7 años según requisitos legales y fiscales
• Los logs de seguridad se conservan por 90 días

Puedes solicitar la exportación de tus datos antes de eliminar tu cuenta escribiéndonos a ${CONTACT}.`,
          },
          {
            num: '06',
            title: 'Cookies y tecnologías similares',
            content: `Usamos las siguientes cookies:

Cookies esenciales (no se pueden desactivar):
• Cookie de sesión de Supabase — mantiene tu sesión activa
• Cookie CSRF — protege contra ataques de falsificación de solicitudes

No usamos cookies de seguimiento, cookies de publicidad ni píxeles de seguimiento de terceros.`,
          },
          {
            num: '07',
            title: 'Tus derechos',
            content: `Tienes los siguientes derechos sobre tu información personal:

• Acceso: solicitar una copia de todos los datos que tenemos sobre ti
• Rectificación: corregir información inexacta desde tu perfil en cualquier momento
• Eliminación ("derecho al olvido"): solicitar la eliminación permanente de tu cuenta y datos
• Portabilidad: exportar tus datos en formato CSV
• Oposición: oponerte al procesamiento de tus datos en ciertas circunstancias

Para ejercer cualquiera de estos derechos, contacta a ${CONTACT}. Responderemos en un plazo de 30 días.`,
          },
          {
            num: '08',
            title: 'Privacidad de menores',
            content: `${APP_NAME} no está dirigido a menores de 16 años. No recopilamos intencionalmente información personal de personas menores de 16 años.

Si eres padre o tutor y crees que tu hijo menor de 16 años nos ha proporcionado información personal, contáctanos en ${CONTACT} y eliminaremos esa información de inmediato.`,
          },
          {
            num: '09',
            title: 'Cambios a esta política',
            content: `Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios significativos por email y/o mediante un aviso visible en el Servicio al menos 14 días antes de que los cambios entren en vigor.

Te recomendamos revisar esta política periódicamente. El uso continuado del Servicio después de la entrada en vigor de los cambios constituye tu aceptación de la política actualizada.`,
          },
          {
            num: '10',
            title: 'Contacto y DPO',
            content: `Si tienes preguntas, comentarios o solicitudes relacionadas con tu privacidad, contáctanos:

Email de privacidad: ${CONTACT}
Email general: hola@fitmetrics.app
Sitio web: fitmetrics.app

Nos comprometemos a responder todas las consultas de privacidad dentro de los 5 días hábiles siguientes a su recepción.`,
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
              Tus datos, tu control
            </p>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              Accede a tu cuenta para gestionar tus datos
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/auth/login" style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 8, textDecoration: 'none' }}>
              Entrar
            </Link>
            <Link href="/auth/register" style={{ padding: '12px 20px', background: '#C8FF00', color: '#000', fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 8, textDecoration: 'none' }}>
              Crear cuenta →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
