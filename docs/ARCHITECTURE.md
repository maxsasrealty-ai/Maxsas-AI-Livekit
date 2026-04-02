## Maxsas-AI-Livekit Architecture

This project is a full-stack application with:

- **Frontend:** Expo React Native (TypeScript), file-based routing
- **Backend:** Node.js, Express, TypeScript

### Directory Structure

- `app/` — Expo React Native app (file-based routing)
- `backend/` — Node.js/Express API server
- `components/` — Shared React Native UI components
- `constants/`, `context/`, `hooks/`, `lib/` — Shared logic/utilities for frontend
- `docs/` — Documentation

#### Frontend (app/ & components/)
- Uses Expo Router for navigation (see [Expo docs](https://docs.expo.dev/router/introduction))
- Screens and modals are organized by route in `app/` mapped accurately reflecting domains like `app/(protected)/lexus/`.
- UI primitives are strictly aggregated under their functional domain (eg. `components/lexus/`) avoiding inline styles and ensuring unified design systems (ie. unified Theme constants like `components/lexus/theme.ts`).
- Global state via React context providers (see `context/`)

#### Backend (backend/)
- Express server with TypeScript
- API routes in `backend/src/routes/`
- Business logic in `backend/src/services/`
- Data models in `backend/src/models/`
- Middleware for auth and guards in `backend/src/middleware/`

#### AI Voice Server (External / External Infra)
- LiveKit + Python Agents run on a separate Ubuntu machine (DigitalOcean)
- Handles Sarvam STT, Groq LLM logic, and Cartesia TTS.
- *For details, refer to `docs/VOICE_AGENT_SETUP.md`.*

### Key Conventions
- TypeScript everywhere
- Keep business logic out of route handlers (use services)
- Use context for global state in frontend
- Reference documentation files instead of duplicating content
