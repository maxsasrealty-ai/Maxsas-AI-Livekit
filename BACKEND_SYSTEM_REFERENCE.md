# NEW BACKEND - COMPLETE UPDATED STATUS

Last Updated: 2026-05-01
Workspace: /root/new-backend
Purpose: Single source of truth for current backend state, admin UI state, API map, runtime checks, and operational notes.

## 1) Current Project Snapshot

- Project name: maxsas-backend
- Runtime: Node.js + Express (TypeScript, ESM)
- Entry: src/index.ts
- Package manager: npm
- ORM: Prisma
- Queue: BullMQ
- Key integrations: LiveKit, SIP flow, webhook ingest, PayU, wallet/billing modules

## 2) Verified NPM Scripts

From package.json:

- npm run dev -> node --import dotenv/config --import tsx src/index.ts
- npm run start -> node --import dotenv/config --import tsx src/index.ts
- npm run ui -> prints Master Control URL
- Prisma scripts:
  - npm run prisma:generate
  - npm run prisma:migrate
  - npm run prisma:pull
- Test/helper scripts also available under scripts and package scripts.

## 3) Server Routing and Exposure

## 3.1 Public and Health

- GET / -> backend running message
- GET /health -> health response
- GET /api/health -> health router response

## 3.2 Static Admin UIs

- GET /admin -> public/admin.html
- GET /admin-panel -> public/admin_panel.html
- GET /admin/master-control -> public/master-control.html
- GET /admin-ui/* -> static files from public/

## 3.3 API Router Mount

Main API mounted at /api with these key route groups:

- /api/health
- /api/admin
- /api/access
- /api/auth
- /api/capabilities
- /api/campaigns
- /api/enterprise/analytics
- /api/calls
- /api/leads
- /api/realtime
- /api/webhooks
- /api/payments and /api/payment
- /api/wallet

## 4) Admin API (Current Working Surface)

Admin endpoints are protected by admin key middleware (x-admin-key or bearer), except SSE stream which accepts query adminKey.

Key available endpoints:

- GET /api/admin/live-events/stream
- GET /api/admin/live-events/recent
- GET /api/admin/users
- GET /api/admin/tenants
- POST /api/admin/tenants
- GET /api/admin/tenants/:id
- PATCH /api/admin/tenants/:id
- GET /api/admin/tenants/:id/usage
- GET /api/admin/tenants/:id/wallet
- GET /api/admin/tenants/:id/campaigns
- GET /api/admin/dev-monitor/calls
- GET /api/admin/dev-monitor/call-events/:call_id
- GET /api/admin/dev-monitor/logs
- GET /api/admin/dev-monitor/livekit-room/:room_name

Legacy browser helpers/redirects also exist:

- /admin/dev-monitor/calls -> redirects to /api/admin/dev-monitor/calls
- /admin/dev-monitor/logs -> redirects to /api/admin/dev-monitor/logs
- /admin/dev-monitor/call-events/:call_id -> redirects to API route

## 5) Master Control UI Status (Latest)

Master control file: public/master-control.html

What is now implemented:

- Clean single valid HTML document (no duplicate/partial DOM corruption)
- Working top tab navigation:
  - Overview
  - Agent Server
  - Backend
  - Frontend
  - Database
  - Tenants
  - Plans
  - Health
  - Settings
- Data wired to real backend routes (not old /api/voice/* paths)
- Admin auth header support included for admin endpoints
- Config persistence in localStorage
- Tenant setting field added for call trigger flow
- Health snapshot blocks included

Current endpoint usage in UI:

- /api/admin/dev-monitor/calls
- /api/admin/live-events/recent
- /api/admin/dev-monitor/logs
- /api/admin/tenants
- /api/health
- /health
- /api/calls (for quick call trigger, with x-tenant-id)

Important note:

- /api/calls requires valid tenant context and capability checks.
- Quick trigger works only when tenant is valid and plan has required call capability.

## 6) Runtime Checks Performed (Verified)

Latest live checks on localhost:4000:

- /health -> success true, status ok
- /api/health -> success true, status ok
- /api/admin/live-events/recent?limit=5 -> success true
- /api/admin/dev-monitor/calls -> success true
- /api/admin/tenants -> success true

Observed counts at check time:

- Recent events count: 5
- Dev monitor calls count: 1
- Tenants count: 2

## 7) Environment Key Inventory (Safe, Keys Only)

Values intentionally omitted. Keys observed in .env include:

- ADMIN_UI_URL
- API_BASE_URL
- APP_ENV
- BACKEND_WEBHOOK_AUTH_TOKEN
- BACKEND_WEBHOOK_TOKEN
- BACKEND_WEBHOOK_URL
- BILLING_BYPASS
- DATABASE_URL
- DEV_AUTH_EMAIL
- DEV_AUTH_FULL_NAME
- DEV_AUTH_PASSWORD
- DEV_AUTH_TENANT_ID
- DEV_AUTH_TENANT_NAME
- LIVEKIT_AGENT_NAME
- LIVEKIT_API_KEY
- LIVEKIT_API_SECRET
- LIVEKIT_OUTBOUND_TRUNK_ID
- LIVEKIT_URL
- MASTER_CONTROL_PATH
- NODE_ENV
- OUTBOUND_QUEUE_CONCURRENCY
- PAYU_FAILURE_URL
- PAYU_KEY
- PAYU_MODE
- PAYU_REDIRECT_URL
- PAYU_SALT
- PAYU_SUCCESS_URL
- PAYU_WEBHOOK_URL
- PORT
- SIP_OUTBOUND_TRUNK_ID
- VOICE_TEST_MODE
- VOICE_WEBHOOK_BEARER_TOKEN
- VOICE_WEBHOOK_PUBLIC_URL
- WEBHOOK_BRIDGE_ENABLED
- WEBHOOK_BRIDGE_POLL_MS
- WEBHOOK_SERVER_BASE_URL

## 8) Known Constraints and Notes

- Admin APIs require admin key; default fallback in middleware is dev-admin-key if env key not set.
- Call creation route (/api/calls) enforces:
  - x-tenant-id
  - plan capability checks
  - required body fields (roomId, phoneNumber, agentName, direction)
- CORS in backend is strict allowlist + localhost dev-port logic.
- Webhook raw-body handling is configured before JSON parser for voice events.

## 9) Recommended Quick Runbook

1. Start backend:
   - npm run dev

2. Open admin UI:
   - http://localhost:4000/admin/master-control

3. In Settings tab, configure:
   - Backend Base URL (normally http://localhost:4000)
   - Admin API Key
   - Default Tenant ID

4. Reload data from UI.

5. Use Overview/Agent tabs for operational checks.

## 10) Change Log (Recent)

- Added and served Master Control UI route.
- Reworked Master Control to use real admin endpoints.
- Fixed blank-tab issue by replacing corrupted HTML with clean, wired build.
- Added tenant-aware quick call trigger path in UI settings.

---

If this file needs daily updates, keep appending dated snapshots under a new section:

- Snapshot Date
- Runtime health
- Event/call counts
- Any route or schema changes
- Incident notes
