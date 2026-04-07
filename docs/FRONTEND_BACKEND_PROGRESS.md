# FRONTEND / BACKEND IMPLEMENTATION PROGRESS (Single Source of Truth)

**Last updated:** April 2026 — reflects all changes through recent conversations (telephony, payment, admin, UX improvements).

This document captures what is currently implemented across frontend and backend. It is the canonical technical handoff for continuation work and must be updated whenever routes, contracts, or architecture change.

## 1) Scope and Ground Rules

### Scope Included
- Frontend (Expo/React Native app): routing, hooks, context state, API/realtime clients, and workspace-specific UI surfaces.
- Backend (Express/TypeScript): routes, middleware, services, repositories, Prisma schema, and realtime streaming.
- Shared frontend/backend contracts in `shared/contracts`.

### Scope Excluded
- Operational setup and runbook of the external voice/telephony server.
- Production infrastructure and deployment specifics not represented in this repo.

### Accuracy Policy
- All statements are grounded in code present in this repository as of the last audit.
- Deferred items are listed explicitly; they are not treated as completed production phases.

---

## 2) Current Architecture Summary (As Implemented)

### High-Level Shape
- Mobile/web app (Expo Router) calls backend REST APIs under `/api/*`.
- Backend persists call, campaign, and workspace state via Prisma (SQLite).
- Backend emits live updates over SSE endpoints under `/api/realtime/*`.
- Frontend consumes SSE and merges events into call UI state via context.

### Data/Control Layers

| Layer | Location |
|---|---|
| Contracts (DTOs, types) | `shared/contracts/*` |
| Backend transport | `backend/src/routes/*` |
| Backend domain logic | `backend/src/services/*` |
| Backend persistence | `backend/src/repositories/*` + Prisma schema |
| Frontend state orchestration | `context/CallsContext.tsx` + hooks |
| Frontend integration clients | `lib/api/*`, `lib/realtime/client.ts`, `lib/adapters/*` |

### Tenancy / Workspace Model
- Tenant ID is propagated via `x-tenant-id` request header (or query param for SSE).
- Backend resolves tenant config and capability set per request.
- Frontend behavior is capability-flag and workspace-config driven: plan labels, vocabulary, voice provider/agent display, and feature gating are all data-driven, not hardcoded.
- `Lexus` / `Prestige` / `Enterprise` are display labels derived from plan keys `basic` / `pro` / `enterprise` respectively, surfaced through the capability/workspace config contract.

---

## 3) Status Key

- `[x]` Implemented and present in code.
- `[~]` Present in code but not classified as a completed production phase.
- `[ ]` Deferred / not yet implemented as final behavior.

---

## 4) Completed Work by Phase (Frontend/Backend)

### Core Foundation
- [x] Shared contracts created and imported by both frontend and backend.
- [x] Backend API `ApiEnvelope<T>` response wrapper used consistently across routes.
- [x] Frontend `ApiClient` with tenant header injection via `x-tenant-id`.

### Voice Call Domain
- [x] Call REST endpoints: create, list, detail, transcript, recording, lead.
- [x] Backend call state machine (`callStateMachine.ts`) and event ingestion pipeline.
- [x] Call persistence: `CallSession`, `CallEvent`, `TranscriptSegment`, `LeadExtraction` in Prisma.
- [x] Separate repository files: `callRepository.ts`, `eventRepository.ts`, `transcriptRepository.ts`, `leadRepository.ts`.

### Realtime (SSE)
- [x] Backend SSE stream at `GET /api/realtime/calls/stream` for call events.
- [x] Backend SSE stream at `GET /api/realtime/campaigns/stream` for campaign events.
- [x] Both streams gated on `calls.history` capability check.
- [x] Heartbeat (20s interval) and graceful close on request end.
- [x] Frontend `SseRealtimeClient` with connect/subscribe/disconnect, reconnect backoff, and `unsupported` path for environments without `EventSource`.
- [x] Frontend stream event ID deduplication (bounded LRU of 500 IDs) and live snapshot merge in `CallsContext`.

### Workspace / Capability Runtime
- [x] `GET /api/capabilities` route + `accessService.ts` capability resolution.
- [x] `requireCapability` middleware for route-level enforcement (uses `CapabilityKey` from contracts).
- [x] `requireAdminAccess` middleware for admin routes (x-admin-key or Bearer token).
- [x] Workspace-guard middleware: `lexusGuard.ts`, `enterpriseGuard.ts`.
- [x] Frontend `useCapabilities` hook: capability checks, plan tier, plan/upgrade labels, vocabulary, branding, voice agent display.
- [x] Frontend `useWorkspaceProfile` hook: thin wrapper over `useCapabilities` exposing workspace surface fields.

### Campaign Domain
- [x] Campaign Prisma models: `Campaign`, `CampaignCall`, `CampaignContact`.
- [x] `campaignRepository.ts` and `campaignService.ts`.
- [x] `routes/campaigns.ts`: campaign CRUD/list/detail API surface.
- [x] Campaign SSE stream endpoint present and functional.
- [x] Enterprise route group includes campaign screens (`campaigns/index`, `campaigns/[id]`).

### Workspace UI Surfaces
- [x] Protected `app/(protected)/lexus/*` route group with implemented screens: dashboard (`index.tsx`), calls, analytics, agents, batches, completed, leads-upload, profile, settings, wallet.
  - **`leads-upload.tsx`**: "Create Single Call" now opens a **modal** with phone number (required) + name (optional) inputs before dispatching `POST /api/calls`. Web-compatible (uses React Native `Modal`).
- [x] Protected `app/(protected)/enterprise/*` route group with implemented screens: dashboard, calls, campaigns, contacts, agents, analytics, leads, teams, billing, settings, integrations, white-label.

### Admin Panel
- [x] Admin route group restructured:
  - `admin/index.tsx`: Dashboard with usage stats + Provision Workspace form (Tenant list moved out)
  - `admin/tenants/index.tsx`: Tenant list
  - `admin/tenants/[id].tsx`: Tenant details with Campaigns card + `lastProvider` wallet display
  - `admin/_layout.tsx`: Header nav with Dashboard/Tenants pills + Exit Admin button

### Payment & Wallet
- [x] `paymentService.ts`: `processIdempotentDebit` via Prisma `$transaction`
- [x] `voiceEventService.ts`: `call_completed` event triggers automatic wallet debit
- [x] `walletRepository.ts`: `listWalletTransactions` extended for `lastProvider` lookup

### Telephony
- [x] `telephonyService.ts`: Full LiveKit SDK — Room + AgentDispatch + SIP participant
- [x] `callService.ts`: Error → `call_failed` SSE propagation
- [x] Env: `SIP_OUTBOUND_TRUNK_ID` canonical; `LIVEKIT_OUTBOUND_TRUNK_ID` accepted as fallback
- [x] Startup env logger: `[TELEPHONY ENV]` on backend start
- [x] Webhook debug logger: all `/api/webhooks/*` requests logged in terminal

### Admin Surface
- [~] Admin route (`routes/admin.ts`), `adminService.ts`, `requireAdminAccess` middleware, `shared/contracts/admin.ts`, frontend `lib/api/admin.ts`, and `app/(protected)/admin/*` screens exist in the repository.
- [~] Admin is **not classified as a completed production phase** in this document. See §10.

---

## 5) Shared Contracts Inventory

All files under `shared/contracts/` and re-exported via `shared/contracts/index.ts`.

| File | Contents |
|---|---|
| `api.ts` | `ApiEnvelope<T>` response wrapper. |
| `plans.ts` | `PlanKey` (`basic`/`pro`/`enterprise`), `CapabilityKey` union, `PlanCapabilities`, `CapabilityCheckInput`. |
| `workspace.ts` | `PlanName` (`Lexus`/`Prestige`/`Enterprise`), `WorkspaceType` (`lexus`/`enterprise`), `WorkspaceTenantConfig`, vocabulary, branding, voice agent display, inventory AI flags. |
| `calls.ts` | Call DTOs: `CallSummary`, `CallDetail`, `CallState`, transcript/lead/recording request+response types. |
| `realtime.ts` | `RealtimeCallEvent`, `LiveCallStage` union. |
| `voice-events.ts` | Voice webhook payload contracts, `VoiceEventType`, normalized event structures. |
| `campaigns.ts` | Campaign CRUD/list/detail contracts. |
| `admin.ts` | `TenantAdminRecord`, `CreateTenantAdminInput`, `UpdateTenantAdminInput`, `TenantUsageSummary`. |
| `index.ts` | Barrel export for all above modules. |

---

## 6) Backend Summary (Implemented)

### Entrypoint
- `backend/src/index.ts`: Express app with JSON body parsing (2 MB limit, raw body capture), `/api` router mount, and 404/500 fallback handlers.
  - **Webhook debug logger** middleware: logs `[WEBHOOK] METHOD PATH`, headers, and body for all `/api/webhooks/*` requests.
  - **Telephony env startup log**: `[TELEPHONY ENV] URL: Set|Missing, API_KEY: Set|Missing, API_SECRET: Set|Missing, TRUNK_ID: Set|Missing`.
  - Loads `backend/.env` via `process.loadEnvFile` (Node 20.6+) or the `--env-file` CLI flag.

### Route Mounting (`backend/src/routes/index.ts`)

| Mounted path | Route module |
|---|---|
| `/api/health` | `routes/health.ts` |
| `/api/access` | `routes/access.ts` |
| `/api/capabilities` | `routes/capabilities.ts` |
| `/api/calls` | `routes/calls.ts` (sub-routes below) |
| `/api/campaigns` | `routes/campaigns.ts` |
| `/api/realtime` | `routes/realtime.ts` |
| `/api/webhooks/voice` | `routes/webhooks/voice.ts` |
| `/api/admin` | `routes/admin.ts` (deferred phase; mounted in code) |

### Call Sub-Routes (`backend/src/routes/calls/`)

| Method + Pattern | File |
|---|---|
| `POST /api/calls` | `create.ts` |
| `GET /api/calls` | `list.ts` |
| `GET /api/calls/:callId` | `detail.ts` |
| `GET /api/calls/:callId/transcript` | `transcript.ts` |
| `GET /api/calls/:callId/recording` | `recording.ts` |
| `GET /api/calls/:callId/lead` | `lead.ts` |

### Workspace-Scoped Route Subdirectories
- `backend/src/routes/lexus/`: `agents.ts`, `analytics.ts`, `leads.ts`.
- `backend/src/routes/enterprise/`: `agents.ts`, `analytics.ts`, `integrations.ts`, `leads.ts`, `whiteLabel.ts`.

### Middleware (`backend/src/middleware/`)

| File | Role |
|---|---|
| `requestContext.ts` | `attachRequestContext`: injects `requestId` and `tenantId` from header/body into `req.requestContext`. |
| `requireTenant.ts` | Guards routes where tenant ID is mandatory. |
| `requireCapability.ts` | Guards routes by `CapabilityKey`; resolves capability set via `accessService`. |
| `requireAdminAccess.ts` | Guards admin routes via `x-admin-key` header or `Authorization: Bearer` token. |
| `lexusGuard.ts` | Workspace-specific guard for Lexus routes. |
| `enterpriseGuard.ts` | Workspace-specific guard for Enterprise routes. |

### Services (`backend/src/services/`)

| File | Role |
|---|---|
| `accessService.ts` | Tenant capability resolution with caching. |
| `callService.ts` | Call business flow orchestration. Catches telephony errors and publishes `call_failed` SSE event. |
| `calls/callStateMachine.ts` | Legal state transition logic for call lifecycle. |
| `voiceEventService.ts` | Voice webhook pipeline: normalization → idempotency → state transition → persistence → realtime publish → `call_completed` triggers wallet debit. |
| `realtimeService.ts` | In-memory tenant listener registry and event fanout for calls and campaigns. |
| `campaignService.ts` | Campaign domain business logic. |
| `adminService.ts` | Admin tenant management. Includes `lastProvider` from most recent credit transaction. |
| `telephonyService.ts` | **LiveKit SDK integration**: `RoomServiceClient.createRoom` → `AgentDispatchClient.createDispatch` → `SipClient.createSipParticipant`. Reads `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `SIP_OUTBOUND_TRUNK_ID` (fallback: `LIVEKIT_OUTBOUND_TRUNK_ID`). |
| `paymentService.ts` | Razorpay order creation, HMAC webhook verify, `processIdempotentDebit` atomic wallet debit via Prisma `$transaction`. |

### Repositories (`backend/src/repositories/`)
- `callRepository.ts`: `CallSession` CRUD and query.
- `eventRepository.ts`: `CallEvent` persistence and query.
- `transcriptRepository.ts`: `TranscriptSegment` persistence and query.
- `leadRepository.ts`: `LeadExtraction` persistence and query.
- `tenantRepository.ts`: Tenant read/write.
- `campaignRepository.ts`: `Campaign`, `CampaignCall`, `CampaignContact` persistence.

### Prisma Schema (`backend/prisma/schema.prisma`)
- Provider: SQLite.
- Models: `Tenant`, `CallSession`, `CallEvent`, `TranscriptSegment`, `LeadExtraction`, `Campaign`, `CampaignCall`, `CampaignContact`.
- Enums: `PlanKey` (`basic`/`pro`/`enterprise`), `CallLifecycleStatus`, `Speaker`, `CampaignStatus`.
- `Tenant` stores workspace config as JSON string (`workspaceConfigJson`).

---

## 7) Frontend Summary (Implemented)

### App Routing (`app/*`)

| Route Group | Description |
|---|---|
| `app/(public)/*` | Landing (web/native variants), login, signup, privacy, terms, refund pages. |
| `app/(protected)/lexus/*` | Lexus workspace: calls, analytics, agents, batches, completed, leads-upload, profile, settings, wallet. |
| `app/(protected)/enterprise/*` | Enterprise workspace: dashboard, campaigns, calls, contacts, agents, analytics, leads, teams, billing, settings, integrations, white-label. |
| `app/(protected)/admin/*` | Admin panel screens (deferred phase; files exist). |
| `app/(tabs)/*` | Legacy/default tab layout (present but not part of the Lexus/Enterprise workspace flows). |

### API Client Layer

- `lib/api/client.ts`: `ApiClient` class with typed `get`, `post`, `patch` methods returning `ApiEnvelope<T>`. Injects `x-tenant-id` header from `EXPO_PUBLIC_TENANT_ID`. Optional `Authorization` bearer header supported but not wired in default instance.
- `lib/api/calls.ts`: `createCall`, `fetchCalls`, `fetchCallDetail`, `fetchCallTranscript`, `fetchCallRecording`, `fetchCallLead`, `fetchCapabilities`.
- `lib/api/admin.ts`: `fetchAdminTenants`, `createAdminTenant`, `updateAdminTenant`, `fetchAdminTenantUsage` (injects `x-admin-key` header; deferred phase).

### Realtime Client Layer
- `lib/realtime/client.ts`: `SseRealtimeClient` implementing `RealtimeClient` interface.
  - Connects to `GET /api/realtime/calls/stream?tenantId=<id>` via browser `EventSource`.
  - Gracefully returns `unsupported` state if `EventSource` is unavailable.
  - Reconnect with exponential backoff (capped at 15 s).
  - Listens for `call_event` SSE event type; parses via `parseRealtimeCallEvent` adapter.
  - Exported as singleton `realtimeClient`.

### Adapters
- `lib/adapters/liveEvents.ts`: `parseRealtimeCallEvent`, stage label/tone mapping, connection state labels.
- `lib/adapters/calls.ts`: call formatting helpers, quick stats, room grouping, capability feature helper.

### Context
- `context/CallsContext.tsx`: `CallsProvider` and `useCallsContext`.
  - Bootstrap: parallel fetch of call list + capabilities on mount.
  - SSE subscription gated on `calls.history` capability.
  - `LiveCallSnapshot` map keyed by `callId` for live badge/stage/transcript/lead/recording states.
  - Bounded deduplication of stream event IDs (LRU of 500).
  - Optimistic call creation (reverted on failure).
  - `liveVersionByCallId` counter triggers `useCallDetail` refresh on live update.

### Hooks

| Hook | Role |
|---|---|
| `hooks/useCalls.ts` | Context accessor (`useCallsContext` alias). |
| `hooks/useCallDetail.ts` | Fetches call detail, lead, and transcript; refreshes when `liveVersion` increments. |
| `hooks/useCapabilities.ts` | Capability checks, plan tier + label derivation, vocabulary, branding, voice agent display. |
| `hooks/useWorkspaceProfile.ts` | Thin workspace surface: config, type, plan label, vocabulary, branding, voice display, inventory AI flags. |

### Component Sets
- `components/lexus/*`: `GlassCard`, `PillButton`, `SectionHeader`, `StatusPill`, `theme.ts`, plus `live/` and `locks/` subdirectories. Stubs: `AgentCard`, `LeadCard`, `LexusSidebar`.
- `components/enterprise/*`: `EnterpriseStatCard`, `EnterpriseSurface`, `EnterpriseWorkspaceBanner`. Stubs: `EnterpriseSidebar`, `IntegrationCard`, `WhiteLabelPanel`.

---

## 8) Workspace / Plan / Capability Model

### Plan Key → Display Label Mapping

| `PlanKey` (backend/contract) | Display Label (`PlanName`) | `WorkspaceType` |
|---|---|---|
| `basic` | Lexus | `lexus` |
| `pro` | Prestige | `lexus` |
| `enterprise` | Enterprise | `enterprise` |

- `WorkspaceType` (`lexus` vs `enterprise`) drives route group selection and component surface.
- `PlanName` (`Lexus`/`Prestige`/`Enterprise`) is surfaced in upgrade prompts and workspace banners.
- All vocabulary terms (calls label, batches label, etc.) are sourced from `WorkspaceTenantConfig.vocabulary` with a static fallback in `useCapabilities`.

### Capability Feature Keys (`CapabilityKey`)
`calls.live`, `calls.history`, `transcripts.partial`, `transcripts.full`, `recordings.playback`, `analytics.basic`, `analytics.advanced`, `crm.sync`, `whiteLabel.branding`

---

## 9) Realtime and Event-Driven Model

### Backend
- Voice webhook events normalized and persisted via `voiceEventService.ts`.
- Derived call state transitions emitted to in-memory listener sets per tenant via `realtimeService.ts`.
- SSE endpoints forward typed call and campaign events to connected clients.
- SSE streams send a `connected` event on open and a `heartbeat` event every 20 s.
- **In-process only**: listener registry is not distributed (see §10 deferred items).

### Frontend
- SSE subscription activated only when `calls.history` capability is true.
- Inbound `call_event` events are parsed; malformed payloads are silently ignored.
- Duplicate stream events (by `streamEventId`) are discarded before state update.
- Live snapshot state (`LiveCallSnapshot`) drives badges, stage indicators, and transcript/lead/recording states in call UI.

---

## 10) Campaign Domain Snapshot

### Implemented
- Prisma models: `Campaign`, `CampaignCall`, `CampaignContact` with full lifecycle statuses (`draft`/`queued`/`active`/`completed`/`archived`).
- `campaignRepository.ts` and `campaignService.ts` with full CRUD.
- `routes/campaigns.ts`: campaign lifecycle API.
- Campaign SSE stream (`GET /api/realtime/campaigns/stream`) present and functional.
- Enterprise frontend route group includes `campaigns/index` and `campaigns/[id]` screens.

### Note
Campaign backend domain is functionally complete in terms of persistence and API surface. Deeper UX testing and parity validation across workspaces is pending product hardening.

---

## 11) Backend API Route Map

```
GET  /api/health
GET  /api/access
GET  /api/capabilities
POST /api/calls
GET  /api/calls
GET  /api/calls/:callId
GET  /api/calls/:callId/transcript
GET  /api/calls/:callId/recording
GET  /api/calls/:callId/lead
GET  /api/campaigns
POST /api/campaigns
GET  /api/campaigns/:id
PATCH/DELETE /api/campaigns/:id
GET  /api/realtime/calls/stream
GET  /api/realtime/campaigns/stream
POST /api/webhooks/voice/events
POST /api/payment/create-order
POST /api/payment/verify
POST /api/payment/webhook
/api/admin/*    (mounted; accepted criteria pending)
```

---

## 12) Deferred / Not Completed as Final Production Phase

The following are explicitly deferred, partially scaffolded, or not validated as complete production behavior:

- **Admin panel**: Admin routes, service, middleware, frontend screens, and restructured routing (`admin/tenants/index.tsx`, `admin/tenants/[id].tsx`, `admin/index.tsx` as Dashboard) exist and work. Not yet promoted to a completed production phase — acceptance criteria and scope not formally defined.
- **Auth integration**: `hooks/useAuth.ts`, `context/AuthContext.tsx`, and `backend/src/routes/auth.ts` exist as stubs. No auth token is wired into the default `ApiClient` instance.
- **Payment / billing frontend**: `paymentService.ts` is implemented (Razorpay + idempotent debit). The native checkout module (`react-native-razorpay`) for the frontend client is deferred. The web/mock flow is functional.
- **Distributed realtime fanout**: Current `realtimeService.ts` is in-process only. Multi-instance deployments require a distributed broker (Redis pub/sub, etc.).
- **Firebase integration**: `lib/firebase.ts` and `backend/src/services/firebaseService.ts` are stub files. Firebase is not wired into any active flow.
- **Vapi integration**: `backend/src/services/vapiService.ts` is a stub. External voice provider integration is not in this repo.
- **Comprehensive production readiness**: observability, horizontal scale, disaster recovery, security audit.

---

## 13) Next Steps for Continuation (Ordered)

1. **Define admin phase scope**: document acceptance criteria before promoting admin to a completed phase.
2. **Wire auth**: implement `useAuth`, `AuthContext`, and `Authorization` header injection into `ApiClient`; connect to backend `auth.ts` route.
3. **Harden campaign UX**: validate feature parity across workspaces with explicit test matrix.
4. **Expand test coverage**: webhook ingestion/idempotency, call state machine, capability guard enforcement, frontend SSE merge/dedupe.
5. **Distributed realtime**: introduce Redis pub/sub or equivalent if multi-instance backend is required.
6. **ADRs**: write architecture decision records for tenancy model, realtime transport, and workspace vocabulary governance.
7. **Lock this document**: require updates to this file whenever routes, contracts, or workspace model change.

---

## 14) Source File Reference Map

### Shared Contracts
`shared/contracts/api.ts`, `calls.ts`, `campaigns.ts`, `plans.ts`, `realtime.ts`, `voice-events.ts`, `workspace.ts`, `admin.ts`, `index.ts`

### Backend (High-Signal Files)
`backend/src/index.ts` · `routes/index.ts` · `routes/access.ts` · `routes/capabilities.ts` · `routes/calls.ts` · `routes/calls/{create,list,detail,transcript,recording,lead}.ts` · `routes/campaigns.ts` · `routes/realtime.ts` · `routes/webhooks/voice.ts` · `routes/admin.ts` · `routes/lexus/*` · `routes/enterprise/*` · `middleware/{requestContext,requireTenant,requireCapability,requireAdminAccess,lexusGuard,enterpriseGuard,verifyWebhookAuth}.ts` · `services/{accessService,callService,voiceEventService,realtimeService,campaignService,adminService}.ts` · `services/calls/callStateMachine.ts` · `repositories/{callRepository,eventRepository,transcriptRepository,leadRepository,tenantRepository,campaignRepository}.ts` · `prisma/schema.prisma`

### Frontend (High-Signal Files)
`context/CallsContext.tsx` · `hooks/{useCalls,useCallDetail,useCapabilities,useWorkspaceProfile}.ts` · `lib/api/{client,calls,admin}.ts` · `lib/realtime/client.ts` · `lib/adapters/{calls,liveEvents}.ts` · `app/(protected)/lexus/*` · `app/(protected)/enterprise/*` · `app/(protected)/admin/*` · `components/lexus/*` · `components/enterprise/*`

---

## Final Notes
- This is a frontend/backend implementation progress artifact, not a product-readiness declaration.
- Voice-server operational details are intentionally excluded except where integration touchpoints visibly affect this repo's behavior.
- Admin is deferred even though admin artifacts are present in code.
- Stub files (auth, payment, Firebase, Vapi) are noted in §12; they are not counted as implemented features.
