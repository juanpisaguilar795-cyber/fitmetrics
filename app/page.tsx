// app/page.tsx — Landing page corregida (Pública y Gratis, sin Auth)
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FitMetrics',
  description: 'Plataforma digital de fitness basada en datos. TDEE, macros y 1RM. Optimiza tu entrenamiento con métricas reales.',
}

const FEATURES = [
  { num: '01', tag: 'Disponible', title: 'Calculadora TDEE', desc: 'Calcula tu gasto energético total con Mifflin-St Jeor y Harris-Benedict. Ajusta por actividad y objetivo.' },
  { num: '02', tag: 'Disponible', title: 'Macronutrientes', desc: 'Distribuye proteínas, carbohidratos y grasas. Perfiles: cutting, bulking, recomp y custom con sliders.' },
  { num: '03', tag: 'Disponible', title: 'One Rep Max', desc: 'Estima tu 1RM con Epley, Brzycki o Lombardi. Tabla completa de intensidades por porcentaje.' },
  { num: '04', tag: 'Disponible', title: 'Carga de Barra', desc: 'Visualiza de forma interactiva la distribución de discos y el peso total acumulado en una barra olímpica.' },
  { num: '05', tag: 'Disponible', title: 'Plan de Bloques', desc: 'Calcula tus cargas semanales de Powerbuilding y autorregula el incremento de peso con RIR objetivo.' },
  { num: '06', tag: 'Disponible', title: 'Hipertrofia & Videos', desc: 'Rutinas personalizadas de 3, 4 o 5 días y videotutoriales integrados de técnica para accesorios.' },
]

const TICKER_ITEMS = [
  'TDEE Calculator', 'Macronutrients', 'One Rep Max', 'Barbell Plate Loader',
  '100% Gratis', 'Sin Registro', 'Calculadora Científica',
]

export default function LandingPage() {
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
    <span key={i} style={{ padding: '0 40px', fontSize: 11, fontFamily: 'var(--font-dm-mono)', fontWeight: 500, color: '#000', textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
      {item}
      <span style={{ display: 'inline-block', width: 4, height: 4, background: 'rgba(0,0,0,0.3)', borderRadius: '50%', margin: '0 8px', verticalAlign: 'middle' }} />
    </span>
  ))

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f0f0f0', overflowX: 'hidden', fontFamily: 'var(--font-dm-sans)' }}>

      {/* Grid texture */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)',
        backgroundSize: '48px 48px'
      }}
      />

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px',
        borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(20px)'
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: '#C8FF00', borderRadius: 8, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L5 7L8 9L11 4L14 6" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="14" cy="6" r="1.5" fill="#000" />
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 20, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#f0f0f0' }}>
            FIT<span style={{ color: '#C8FF00' }}>METRICS</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#features" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            Funciones
          </a>
          <Link href="/calculators/tdee" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            Calculadoras
          </Link>
          <Link href="/calculators/tdee" style={{ padding: '9px 18px', background: '#C8FF00', color: '#000', fontFamily: 'var(--font-dm-mono)', fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: 6, textDecoration: 'none' }}>
            Calcular ahora
          </Link>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 40, height: 28, background: '#C8FF00', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', animation: 'ticker 28s linear infinite', whiteSpace: 'nowrap' }}>
          {tickerContent}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '148px 48px 80px', zIndex: 1 }}>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500,
          background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.06) 0%, transparent 70%)', pointerEvents: 'none'
        }} />

        {/* Eyebrow */}
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8FF00', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'block', width: 32, height: 1, background: 'rgba(200,255,0,0.4)' }} />
          Plataforma de fitness basada en datos
          <span style={{ display: 'block', width: 32, height: 1, background: 'rgba(200,255,0,0.4)' }} />
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-barlow)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 8,
          fontSize: 'clamp(68px, 11vw, 144px)'
        }}>
          <span style={{ display: 'block', color: '#f0f0f0' }}>Entrena</span>
          <span style={{ display: 'block', color: '#f0f0f0' }}>con <span style={{ color: '#C8FF00' }}>datos.</span></span>
          <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}>Mejora</span>
          <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.18)' }}>con métricas.</span>
        </h1>

        {/* Slogan */}
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '32px 0 48px' }}>
          Calculadoras · Gasto Energético · Macronutrientes · Fuerza Máxima · Carga de Barra
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/calculators/tdee" style={{
            padding: '17px 44px', background: '#C8FF00', color: '#000',
            fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 17,
            textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 8,
            textDecoration: 'none', boxShadow: '0 8px 32px rgba(200,255,0,0.18)',
          }}>
            Probar calculadoras →
          </Link>
          <a href="#features" style={{
            padding: '17px 44px', background: 'transparent', color: '#f0f0f0',
            fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 17,
            textTransform: 'uppercase', letterSpacing: '0.06em', borderRadius: 8,
            textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
          }}>
            Ver funciones
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          marginTop: 72, width: '100%', maxWidth: 880,
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12,
          overflow: 'hidden', background: '#111',
        }}>
          {[
            { val: '100%', label: 'Gratis y libre' },
            { val: 'Sin registro', label: 'Acceso inmediato' },
            { val: '4', label: 'Calculadoras MVP' },
            { val: '100%', label: 'Basado en evidencia' },
          ].map(({ val, label }, i) => (
            <div key={label} style={{ padding: '24px 28px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <p style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 36, color: '#f0f0f0', lineHeight: 1, marginBottom: 6 }}>{val}</p>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ position: 'relative', zIndex: 1, padding: '96px 48px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C8FF00', marginBottom: 16 }}>Funcionalidades</p>
        <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(42px,6vw,72px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 16, color: '#f0f0f0' }}>
          Todo lo que<br /><span style={{ color: '#C8FF00' }}>necesitas</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: 'rgba(255,255,255,0.3)', maxWidth: 460, lineHeight: 1.7, margin: '0 auto 56px', fontWeight: 300 }}>
          Herramientas de precisión para atletas que toman decisiones basadas en ciencia, no en intuición.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {FEATURES.map(({ num, tag, title, desc }) => (
            <div key={num} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '36px 32px', position: 'relative', overflow: 'hidden', flex: '1 1 280px', maxWidth: '320px' }}>
              <span style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 72, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none' }}>{num}</span>
              <div style={{ width: 40, height: 40, background: 'rgba(200,255,0,0.07)', border: '1px solid rgba(200,255,0,0.15)', borderRadius: 8, display: 'grid', placeItems: 'center', marginBottom: 20 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#f0f0f0', marginBottom: 10 }}>{title}</h3>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 16, fontWeight: 300, minHeight: '68px' }}>{desc}</p>
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#C8FF00', background: 'rgba(200,255,0,0.07)', padding: '3px 10px', borderRadius: 3 }}>{tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── INFO SECCIÓN (REEMPLAZA PRECIOS) ── */}
      <section id="free-access" style={{ position: 'relative', zIndex: 1, padding: '96px 48px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C8FF00', marginBottom: 16 }}>Herramientas libres</p>
          <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 'clamp(42px,6vw,72px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 24, color: '#f0f0f0' }}>
            100% Gratis.<br /><span style={{ color: '#C8FF00' }}>Sin registro.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Creemos que la información y las herramientas basadas en evidencia científica deben estar al alcance de todos. Por eso, hemos liberado completamente nuestras calculadoras. No guardamos tus datos en servidores, no requerimos correos ni tarjetas de crédito. Todo se ejecuta localmente en tu dispositivo de forma ultra rápida.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            {[
              { title: 'TDEE / Calorías', desc: 'Estima tu tasa metabólica y calorías de mantenimiento.', href: '/calculators/tdee' },
              { title: 'Macronutrientes', desc: 'Obtén tu distribución de proteínas, carbohidratos y grasas.', href: '/calculators/macros' },
              { title: 'One Rep Max (1RM)', desc: 'Calcula tu fuerza máxima y zonas de intensidad.', href: '/calculators/one-rep-max' },
              { title: 'Carga de Barra', desc: 'Calcula visualmente la distribución de discos en tu barra.', href: '/calculators/plate-loader' },
              { title: 'Plan de Bloques', desc: 'Planifica tus cargas de Powerbuilding y regula el peso con RIR.', href: '/calculators/block-planner' },
              { title: 'Hipertrofia & Videos', desc: 'Rutinas de hipertrofia de 3, 4 o 5 días y videotutoriales.', href: '/calculators/hypertrophy' },
            ].map(c => (
              <Link key={c.title} href={c.href} className="bg-[#111] border border-white/[0.07] hover:border-[#C8FF00]/20 hover:bg-[#C8FF00]/[0.02] rounded-xl p-6 transition-all flex flex-col items-center gap-2.5" style={{ textDecoration: 'none', borderTop: '2px solid rgba(255,255,255,0.07)', flex: '1 1 240px', maxWidth: '260px' }}>
                <h3 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 700, fontSize: 15, color: '#f0f0f0', textTransform: 'uppercase' }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{c.desc}</p>
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#C8FF00', marginTop: 'auto', textTransform: 'uppercase' }}>Calcular ahora →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '96px 48px', borderTop: '1px solid rgba(255,255,255,0.07)', background: '#111', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-barlow)', fontWeight: 900, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 28, fontSize: 'clamp(56px,8vw,100px)' }}>
          <span style={{ display: 'block', color: '#f0f0f0' }}>Empieza ahora.</span>
          <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Al instante.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 44 }}>
          Sin anuncios · Sin registros · 100% de ejecución en navegador
        </p>
        <Link href="/calculators/tdee" style={{
          display: 'inline-block', padding: '20px 60px', background: '#C8FF00', color: '#000',
          fontFamily: 'var(--font-barlow)', fontWeight: 900, fontSize: 20, textTransform: 'uppercase',
          letterSpacing: '0.06em', borderRadius: 12, textDecoration: 'none',
          boxShadow: '0 12px 40px rgba(200,255,0,0.2)',
        }}>
          Ir a las calculadoras →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '32px 48px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)' }}>
          © 2026 FitMetrics · Entrena con datos.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacidad', 'Términos', 'Contacto'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}
