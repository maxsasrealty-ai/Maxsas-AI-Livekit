# Maxsas-AI-Livekit: Complete Frontend & System Reference

## Overview
Maxsas Realty AI is a full-stack SaaS platform for AI-powered real estate lead qualification via voice calling. This document provides a comprehensive reference for the frontend (Expo React Native) and its integration with the backend and external services.

---

## 1. Tech Stack
| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | Expo / React Native (TypeScript, web + native)|
| Backend    | Node.js / Express / TypeScript                |
| Database   | SQLite via Prisma ORM                         |
| Voice      | LiveKit + Python Agent (DigitalOcean)         |
| STT        | Sarvam (Hindi)                                |
| LLM        | Groq (llama-3.3-70b-versatile)                |
| TTS        | Cartesia (Hindi voice)                        |
| Payments   | Razorpay                                     |
| Realtime   | Server-Sent Events (SSE)                      |

---

## 2. System Architecture
```
EXPO FRONTEND (web/native)
      |  REST API (x-tenant-id header)
      |  SSE (realtime stream)
      v
EXPRESS BACKEND (port 4000)
      |  Prisma / SQLite
      |  Raised to public internet via ngrok
      v
LIVEKIT + PYTHON AGENT (157.245.108.130:7880)
      ↓ webhooks → /api/webhooks/voice/events
      ↓ outbound SIP calls via SIP trunk
```

---

## 3. Repository Structure
- `app/` — Expo Router pages (file-based routing)
- `components/` — Shared UI primitives, admin/brand-specific screens
- `context/` — App state providers (auth, calls, theming)
- `hooks/` — Custom hooks for API/state
- `lib/` — API clients, adapters, SSE, auth helpers
- `constants/` — Plan/theme constants
- `backend/` — Express server, routes, services, Prisma, middleware
- `shared/contracts/` — TypeScript contracts for request/response/event payloads
- `docs/` — Documentation (setup, architecture, voice, webhook, payment, etc.)

---

## 4. Frontend Implementation
### 4.1 Routing & Layout
- Uses Expo Router file-based routing.
- `app/_layout.tsx` is the root shell.
- `app/(public)/` — Public auth and legal pages.
- `app/(protected)/lexus/` — Lexus workspace (main dashboard, calls, wallet, leads upload, batches, completed, profile).
- `app/(protected)/enterprise/` — Enterprise workspace.
- `app/(protected)/admin/` — Admin workspace.
- `app/(tabs)/` — Base tab layout for the app shell.

### 4.2 Responsive Design
- Use `useResponsive` hook for device detection (`isDesktop`, `isTablet`, `isMobile`).
- For web, constrain dashboards to `maxWidth: 1024, alignSelf: 'center', width: '100%'`.
- Use `.web.tsx` and `.native.tsx` for platform-specific screens; always provide an empty extensionless fallback.

### 4.3 Theming & Design System
- Dark, glassmorphic, premium SaaS look.
- Core palette: `#040c18` (background), `#0d1f38` (card), `#4F8CFF` (blue accent), `#00D084` (green accent), `rgba(79,140,255,0.20)` (borders).
- Aggressive border radii: `22` for cards, `12` for buttons.
- Use system/sans-serif fonts; avoid random colors or hardcoded RGBs.

### 4.4 Auth & Security
- File-based routing only (`expo-router` `<Tabs>`/`<Stack>`).
- Namespace segregation: `(public)` for logged-out, `(protected)` for dashboards.
- Use 'as any' assertion for deep link pushes if strict mode errors.

### 4.5 LiveKit Voice Agent
- Voice STT/TTS/LLM runs on external server (DigitalOcean, LiveKit, Python agent).
- Frontend is a thin WebRTC client; do not build LLM pipelines in JS.

### 4.6 Feature Gating
- Feature-gate premium/enterprise features.
- Show locked UI with overlays and upgrade CTAs; do not remove locked components.

---

## 5. Lead Upload & Contact Flow
- Supports CSV/XLS/XLSX upload (99acres, MagicBricks, CRM, etc.)
- Required: 10-digit Indian mobile (starts 6-9)
- Optional: Name, Email, Company, City, Source
- Auto-detects header, dedupes, normalizes phone to +91XXXXXXXXXX
- Rejects malformed numbers; skips ambiguous fields
- Manual add: only 10-digit Indian mobile, validated
- Contacts are local until calls are triggered

---

## 6. Plans & Workspaces
| Plan Key     | Display Name | Route Group                      |
|--------------|--------------|----------------------------------|
| `basic`      | Lexus        | `/app/(protected)/lexus/`        |
| `pro`        | Prestige     | `/app/(protected)/lexus/`        |
| `enterprise` | Enterprise   | `/app/(protected)/enterprise/`   |

---

## 7. Environment Variables (Backend)
- `DATABASE_URL` — SQLite/Postgres connection
- `VOICE_WEBHOOK_BEARER_TOKEN` — Webhook auth
- `APP_ENV` — `development | staging | production`
- `VOICE_TEST_MODE` — `true | false`
- `BILLING_BYPASS` — `true | false`
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` — Voice infra
- `SIP_OUTBOUND_TRUNK_ID`, `LIVEKIT_OUTBOUND_TRUNK_ID` — SIP config

---

## 8. Setup & Development
1. Install Node.js 20+ and PostgreSQL 14+.
2. `npm install` (frontend)
3. `cd backend && npm install` (backend)
4. Configure `backend/.env` (see above)
5. `npm run prisma:generate` and `npm run prisma:migrate` (backend)
6. Start backend: `npm run dev` (in backend)
7. Start frontend: `npx expo start` (in root)

---

## 9. Testing & Production
- See `docs/TESTING_RUNBOOK.md` for local/integration test flows.
- See `docs/PRODUCTION_ROLLOUT.md` for production rollout steps.
- See `docs/SETUP.md` and `docs/ARCHITECTURE.md` for more details.

---

## 10. References
- For contracts, see `shared/contracts/`.
- For API, see `lib/api/` and `backend/src/routes/`.
- For theming, see `constants/theme.ts` and `components/lexus/theme.ts`.
- For plan logic, see `constants/plans.ts` and `context/PlanContext.tsx`.

---

## 11. Additional Notes
- All business logic is in backend `services/` and models in `models/`.
- Context providers manage global state in frontend.
- Use ngrok for local webhook testing.
- Store secrets securely and rotate regularly.

---

*This document is auto-generated for ultimate reference. For any updates, always check the latest codebase and docs folder.*
