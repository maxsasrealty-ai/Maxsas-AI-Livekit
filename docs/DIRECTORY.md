# Project Directory Structure

This document lists all main files and folders in the Maxsas-AI-Livekit project, with a brief description of each.

---

## Root Level
- `app/` — Expo React Native frontend (screens, navigation)
- `backend/` — Node.js/Express backend (API, business logic)
- `components/` — Shared React Native UI components
- `constants/` — Frontend constants (themes, plans)
- `context/` — React context providers (global state)
- `docs/` — Project documentation
- `hooks/` — Custom React hooks
- `lib/` — Shared frontend libraries (API, Firebase)
- `scripts/` — Utility scripts (e.g., reset-project.js)
- `assets/` — Fonts and images
- `package.json` — Project dependencies and scripts
- `tsconfig.json` — TypeScript configuration
- `README.md` — Project overview

---

## app/
- `_layout.tsx` — Main layout for navigation
- `global.css` — Global styles
- `modal.tsx` — Modal screen
- `(public)/` — Public screens (login, landing)
- `(protected)/` — Protected screens (enterprise, lexus)
- `(tabs)/` — Tabbed navigation screens

### app/(public)/
- `index.tsx` — Landing page
- `login.tsx` — Login screen

### app/(protected)/enterprise/
- `agents/` — Enterprise agent screens
- `analytics/` — Analytics screens
- `dashboard/` — Dashboard
- `integrations/` — Integrations
- `leads/` — Lead management
- `settings/` — Settings
- `white-label/` — White label features

### app/(protected)/lexus/
- `_layout.tsx` — Protected navigation tab system for Basic & Diamond plans
- `index.tsx` — Home / Command Center
- `leads-upload.tsx` — CSV Lead ingestion flow
- `batches/` — In-progress & draft campaign dashboard
- `completed/` — Finished batch results module
  - `index.tsx` — List of completed campaigns
  - `[id].tsx` — Specific campaign results & KPIs
  - `leads/[leadId].tsx` — Individual lead insight detail & premium upsell
- `calls.tsx` — Historical calling log
- `wallet.tsx` — Balance & billing portal
- `profile.tsx` — Account settings summary

---

## backend/src/
- `index.ts` — Entry point for backend server
- `middleware/` — Auth and route guards
- `models/` — Data models (User, Lead, Subscription)
- `routes/` — API route handlers (auth, payment, enterprise, lexus)
- `services/` — Business logic (Firebase, payment, lead services)

---

## components/
- `external-link.tsx` — External link component
- `haptic-tab.tsx` — Haptic tab bar
- `hello-wave.tsx` — Animated hello wave
- `parallax-scroll-view.tsx` — Parallax scroll view
- `themed-text.tsx` — Themed text
- `themed-view.tsx` — Themed view
- `enterprise/` — Enterprise-specific UI
- `landing/` — Landing page UI (Nav, HeroSection, FooterSection, etc.)
- `lexus/` — Core design system & UI primitives for Lexus app space:
  - `theme.ts` — Centralized Lexus color palette (`C`)
  - `GlassCard.tsx` — Translucent frosted-glass generic container
  - `PillButton.tsx` — Reusable contextual CTAs
  - `SectionHeader.tsx` — Semantic layout divider with actions
  - `StatusPill.tsx` — Color-coded badges for metrics & conditions
- `ui/` — Common UI components (Button, Card, Input, etc.)

---

## docs/
- `SETUP.md` — Setup instructions
- `ARCHITECTURE.md` — Architecture overview
- `VOICE_AGENT_SETUP.md` — Remote Server & LiveKit ecosystem deployment guide

---

For more details, see the README.md and docs/ARCHITECTURE.md.
