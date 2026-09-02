# FitMetrics 🏋️

> Entrena con datos. Mejora con métricas.

Plataforma digital de fitness basada en datos: TDEE, macros, 1RM, suscripciones premium con Stripe y deploy en Vercel.

---

## Stack

| Capa       | Tecnología                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14 · TypeScript · Tailwind  |
| Backend    | API Routes + Server Actions         |
| Base datos | Supabase (PostgreSQL + RLS)         |
| Auth       | Supabase Auth                       |
| Pagos      | Stripe Subscriptions + Portal       |
| Email      | Resend                              |
| Deploy     | Vercel                              |

---

## Setup local (Semanas 1-3)

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/fitmetrics.git
cd fitmetrics
npm install
cp .env.local.example .env.local
```

### 2. Configurar Supabase

1. Crear proyecto en https://supabase.com
2. Copiar `URL` y `anon key` al `.env.local`
3. En **SQL Editor**, ejecutar en orden:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_stats_and_indexes.sql`
4. En **Authentication → Settings**:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 3. Generar tipos TypeScript

```bash
npx supabase login
npx supabase link --project-ref TU_PROJECT_ID
npm run db:types
```

### 4. Configurar Stripe

```bash
# Instalar Stripe CLI
brew install stripe/stripe-cli/stripe

# Login y escuchar webhooks localmente
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
# → Copia el whsec_... a STRIPE_WEBHOOK_SECRET
```

En Stripe Dashboard:
1. **Products** → Add product → "FitMetrics Premium" → $9/mes recurring
2. Copia el **Price ID** → `STRIPE_PREMIUM_PRICE_ID`

### 5. Configurar Resend

1. Crear cuenta en https://resend.com
2. Verificar tu dominio o usar el sandbox
3. Crear API Key → `RESEND_API_KEY`

### 6. Levantar servidor

```bash
npm run dev
# → http://localhost:3000
```

---

## Deploy a Vercel (Producción)

### Paso 1: Subir a GitHub

```bash
git init
git add .
git commit -m "feat: FitMetrics MVP semanas 1-3"
git remote add origin https://github.com/TU_USUARIO/fitmetrics.git
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ir a https://vercel.com → **New Project**
2. Importar el repositorio de GitHub
3. Framework: **Next.js** (auto-detectado)
4. **NO** hacer deploy aún — primero agregar variables de entorno

### Paso 3: Variables de entorno en Vercel

En Vercel → Settings → Environment Variables, agregar:

```
NEXT_PUBLIC_SUPABASE_URL          → tu URL de Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     → tu anon key
SUPABASE_SERVICE_ROLE_KEY         → tu service role key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY→ pk_live_...
STRIPE_SECRET_KEY                 → sk_live_...
STRIPE_WEBHOOK_SECRET             → whsec_... (configurar después)
STRIPE_PREMIUM_PRICE_ID           → price_...
RESEND_API_KEY                    → re_...
RESEND_FROM_EMAIL                 → noreply@tudominio.com
RESEND_FROM_NAME                  → FitMetrics
NEXT_PUBLIC_APP_URL               → https://tuapp.vercel.app
```

### Paso 4: Hacer deploy

```bash
# En Vercel Dashboard → Deploy
# O automáticamente con cada push a main
git push origin main
```

### Paso 5: Configurar Stripe Webhook en producción

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://tuapp.vercel.app/api/stripe/webhook`
3. Eventos a escuchar:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copiar el **Signing secret** → actualizar `STRIPE_WEBHOOK_SECRET` en Vercel
5. Redeploy

### Paso 6: Actualizar Supabase para producción

En Supabase → Authentication → Settings:
- Site URL: `https://tuapp.vercel.app`
- Redirect URLs: `https://tuapp.vercel.app/auth/callback`

---

## API Endpoints

| Método | Ruta                           | Auth | Descripción                    |
|--------|--------------------------------|------|--------------------------------|
| POST   | `/api/calculators/tdee`        | ✗    | Calcular TDEE                  |
| POST   | `/api/calculators/macros`      | ✗    | Calcular macros                |
| POST   | `/api/calculators/one-rep-max` | ✗    | Calcular 1RM                   |
| GET    | `/api/profile`                 | ✓    | Obtener perfil                 |
| PATCH  | `/api/profile`                 | ✓    | Actualizar perfil              |
| GET    | `/api/calculations`            | ✓    | Historial con filtros/paginas  |
| DELETE | `/api/calculations?id=...`     | ✓    | Eliminar un cálculo            |
| GET    | `/api/subscription`            | ✓    | Estado de suscripción          |
| POST   | `/api/stripe/checkout`         | ✓    | Crear sesión de pago           |
| POST   | `/api/stripe/portal`           | ✓    | Abrir portal de Stripe         |
| POST   | `/api/stripe/webhook`          | —    | Eventos de Stripe (firmados)   |
| POST   | `/api/email/welcome`           | ✓    | Enviar email bienvenida        |

---

## Estructura del proyecto

```
fitmetrics/
├── app/
│   ├── page.tsx                    # Landing page pública
│   ├── auth/                       # Login · Register · Callback
│   ├── dashboard/                  # App protegida
│   │   ├── dashboard/              # Panel principal
│   │   ├── calculators/            # TDEE · Macros · 1RM
│   │   ├── history/                # Historial completo
│   │   ├── profile/                # Perfil del usuario
│   │   └── billing/                # Plan y facturación
│   └── api/
│       ├── calculators/            # 3 endpoints de cálculo
│       ├── calculations/           # Historial (GET+DELETE)
│       ├── profile/                # CRUD perfil
│       ├── subscription/           # Estado de plan
│       ├── stripe/                 # checkout · portal · webhook
│       └── email/                  # welcome email
├── components/
│   ├── layout/Sidebar.tsx
│   ├── premium/PremiumGate.tsx     # Gate + Banner + Badge
│   └── ui/                        # card · input · badge · toggle · macro-bar
├── hooks/
│   ├── useUser.ts
│   ├── useProfile.ts
│   ├── useCalculations.ts
│   └── useSubscription.ts
├── lib/
│   ├── supabase/                   # client + server
│   ├── calculators/                # tdee · macros · 1rm (lógica pura)
│   ├── validations/                # Zod schemas
│   ├── stripe/                     # client + PLANS
│   ├── resend/                     # client + email templates
│   └── utils.ts
├── types/database.ts
├── middleware.ts
├── vercel.json
└── supabase/migrations/
    ├── 001_initial_schema.sql
    └── 002_stats_and_indexes.sql
```

---

## Scripts

```bash
npm run dev        # Desarrollo
npm run build      # Build producción
npm run typecheck  # Verificar TypeScript
npm run lint       # ESLint
npm run db:types   # Regenerar tipos desde Supabase
```

---

## Semana 4 (próxima)

- Tests e2e con Playwright
- Gráficas de progreso (Recharts) — Premium
- Error boundaries y loading UI global
- SEO avanzado: sitemap, robots.txt
- Rate limiting en API Routes
