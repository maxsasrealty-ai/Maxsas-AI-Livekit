## Maxsas-AI-Livekit Setup Guide

**Last updated:** April 2026

### Prerequisites
- Node.js (v20+ recommended — required for `process.loadEnvFile`)
- npm (included with Node.js)
- Expo CLI (`npm install -g expo-cli`)
- ngrok (for local webhook testing)

---

### 1. Frontend (Expo React Native)

```bash
npm install
npx expo start
```

Open in browser: `http://localhost:8081`

---

### 2. Backend (Node.js/Express)

The backend reads env vars from `backend/.env`. Create it before starting:

```bash
cp backend/.env.example backend/.env
# then fill in your real values
```

Start the backend:
```bash
# From repo root (recommended — loads backend/.env automatically):
npx tsx --env-file=backend/.env backend/src/index.ts

# Or from backend/ folder:
cd backend && npm run dev
```

Backend runs on port `4000`. On startup you will see a line like:
```
[TELEPHONY ENV] URL: Set, API_KEY: Set, API_SECRET: Set, TRUNK_ID: Set
```
This confirms that telephony env vars are loaded correctly.

---

### 3. Database (Prisma / SQLite)

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

The SQLite file lives at `backend/prisma/dev.db` (created automatically on first migrate).

---

### 4. Expose Webhooks via ngrok

```bash
ngrok http 4000
```

Copy the `https://xxxx.ngrok-free.app` URL and set it in the remote voice agent's `.env.local`:
```env
BACKEND_WEBHOOK_URL="https://xxxx.ngrok-free.app/api/webhooks/voice/events"
BACKEND_WEBHOOK_AUTH_TOKEN="dev_secret_token_livekit_99"
```

---

### 5. Environment Variables Reference (`backend/.env`)

```env
# Database
DATABASE_URL="file:./prisma/dev.db"

# Webhook Auth
VOICE_WEBHOOK_BEARER_TOKEN="dev_secret_token_livekit_99"

# LiveKit Telephony (all four required for outbound calls)
LIVEKIT_URL=wss://<your-livekit-host>
LIVEKIT_API_KEY=<key>
LIVEKIT_API_SECRET=<secret>
SIP_OUTBOUND_TRUNK_ID=ST_<your-trunk-id>
# LIVEKIT_OUTBOUND_TRUNK_ID is accepted as a fallback for SIP_OUTBOUND_TRUNK_ID

# Razorpay — leave blank for mock/demo mode
# RAZORPAY_KEY_ID=
# RAZORPAY_KEY_SECRET=
# RAZORPAY_WEBHOOK_SECRET=
```

---

### 6. Useful Links
- [Expo documentation](https://docs.expo.dev/)
- [File-based routing](https://docs.expo.dev/router/introduction)
- See `docs/ARCHITECTURE.md` for full project structure
- See `docs/VOICE_AGENT_SETUP.md` for remote LiveKit server setup
- See `docs/WEBHOOK_LOCAL_SETUP.md` for local webhook testing
