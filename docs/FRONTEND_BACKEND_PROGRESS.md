# FRONTEND / BACKEND IMPLEMENTATION PROGRESS (Single Source of Truth)

**Generated against current repository state only.**

This document captures what is currently implemented across frontend and backend in this codebase. It is intended as a long-lived technical handoff for future continuation work.

## 1) Scope and Ground Rules

### Scope Included
- Frontend (Expo/React Native app): implemented routing, hooks, context state, API/realtime clients, and workspace-specific UI surfaces.
- Backend (Express/TypeScript app): implemented routes, middleware, services, repositories, persistence schema, and realtime streaming.
- Shared frontend/backend contracts in `shared/contracts`.

### Scope Excluded
- Detailed operational setup and runbook of the external voice/telephony server.
- Production infrastructure/deployment implementation details not represented in this repo.

### Accuracy Policy Used
- Statements below are grounded in code currently present in this repository.
- Deferred items are listed explicitly; they are not treated as completed production phases.

---

## 2) Current Architecture Summary (As Implemented)

### High-Level Shape
- Mobile/web app (Expo Router) calls backend REST APIs under `/api/*`.
- Backend persists call/campaign/workspace state via Prisma.
- Backend emits live updates over SSE endpoints.
- Frontend consumes SSE and merges events into call/campaign UI state.

### Data/Control Layers
- **Contracts layer:** `shared/contracts/*` defines DTOs and capability/workspace models consumed by both sides.
- **Backend transport:** Express routes in `backend/src/routes/*`.
- **Backend domain logic:** service layer in `backend/src/services/*`.
- **Backend persistence:** repository layer in `backend/src/repositories/*` plus Prisma schema.
- **Frontend state orchestration:** `context/CallsContext.tsx` + hooks.
- **Frontend integration clients:** `lib/api/*`, `lib/realtime/client.ts`, adapters in `lib/adapters/*`.

### Tenancy / Workspace Model
- Backend uses tenant-aware request context and guards.
- Frontend behavior is capability + workspace-config driven (plan labels, workspace name, voice provider/agent display, vocabulary).
- Lexus/Prestige/Enterprise are represented through capability/workspace data and protected route groups.

---

## 3) Completed Work by Phase (Frontend/Backend)

## Status Key
- [x] Completed and implemented in code
- [~] Present in code but not treated as fully completed production phase
- [ ] Deferred / not implemented as final behavior

### Core Foundation
- [x] Shared contracts created and imported by frontend/backend.
- [x] Backend API envelope + typed DTO usage across call flows.
- [x] Frontend API client with tenant header injection.

### Voice Call Domain (Core)
- [x] Call creation/list/detail/transcript/lead/recording REST endpoints.
- [x] Backend call state machine + call event ingestion path.
- [x] Call persistence models and repositories for sessions/events/transcript/lead extraction.

### Realtime
- [x] Backend SSE stream endpoint for calls.
- [x] Frontend SSE client with reconnect/backoff behavior.
- [x] Frontend event dedupe and live snapshot merge in context state.

### Workspace/Capability Runtime
- [x] Capability route and frontend capability consumption (`useCapabilities`).
- [x] Workspace profile resolution (`useWorkspaceProfile`) and vocabulary-driven UI labels.
- [x] Tenant middleware and capability guard middleware.

### Campaign Domain
- [x] Backend campaign repository/service/routes for create/list/detail/update.
- [x] Campaign SSE stream endpoint exists.

### Workspace UI Surfaces
- [x] Protected Lexus route group with implemented screen files.
- [x] Protected Enterprise route group with implemented screen files.

### Admin Surface
- [~] Admin-related contracts/routes/screens exist in repository, but this document does not classify admin panel as a completed production phase.

---

## 4) Shared Contracts Inventory (Current)

### `shared/contracts/api.ts`
- Defines `ApiEnvelope<T>` response wrapper used by frontend/backend API calls.

### `shared/contracts/plans.ts`
- Defines plan/capability feature model (`PlanCapabilities`, capability feature flags).

### `shared/contracts/voice-events.ts`
- Defines voice webhook/event payload contracts and normalized event structures.

### `shared/contracts/calls.ts`
- Defines call DTOs: summary/detail/transcript/lead/recording and call API request/response types.

### `shared/contracts/realtime.ts`
- Defines realtime SSE event DTOs for calls/campaign updates.

### `shared/contracts/workspace.ts`
- Defines workspace tenant config model and vocabulary/provider display structures.

### `shared/contracts/campaigns.ts`
- Defines campaign domain contracts for campaign CRUD/list/detail structures.

### `shared/contracts/admin.ts`
- Admin contract file exists and is exported, but admin phase is not considered complete in this progress narrative.

### `shared/contracts/index.ts`
- Barrel export for contract modules used by frontend/backend imports.

---

## 5) Backend Summary (Implemented)

### Backend Entrypoint and Route Mounting
- `backend/src/index.ts` boots Express app with middleware and `/api` mounting.
- `backend/src/routes/index.ts` composes route modules including health/access/capabilities/calls/campaigns/realtime/webhooks (and admin currently mounted in code).

### Middleware (Implemented)
- `requestContext` middleware: request-scoped context setup.
- `requireTenant` middleware: tenant requirement/guarding.
- `requireCapability` middleware: plan/capability enforcement.
- `verifyWebhookAuth` middleware: bearer validation for webhook routes.

### Access / Capability Runtime
- `backend/src/routes/access.ts` + `services/accessService.ts`: tenant/workspace access resolution.
- `backend/src/routes/capabilities.ts`: capabilities payload for frontend gating and labels.

### Calls Domain (Routes)
- `POST /api/calls` via `routes/calls/create.ts`: initiates call request path.
- `GET /api/calls` via `routes/calls/list.ts`: paginated/history list.
- `GET /api/calls/:callId` via `routes/calls/detail.ts`: call detail payload.
- `GET /api/calls/:callId/transcript` via `routes/calls/transcript.ts`: transcript segments.
- `GET /api/calls/:callId/recording` and `GET /api/calls/:callId/lead`: recording/lead retrieval.

### Voice Webhook Processing
- `POST /api/webhooks/voice` implemented in `routes/webhooks/voice.ts`.
- Processing pipeline in `services/voiceEventService.ts`:
  - event normalization
  - idempotency checks
  - state transition application
  - persistence writes
  - realtime publish trigger

### Calls Domain Services/Repos
- `services/callService.ts`: call business flow orchestration.
- `services/calls/callStateMachine.ts`: legal state progression logic.
- `repositories/callRepository.ts`: call session CRUD/query.
- `repositories/eventRepository.ts`: call event persistence/query.
- lead/transcript/recording data retrieval integrated into call detail endpoints.

### Realtime Services
- `routes/realtime.ts`: SSE route(s) for calls (and campaigns stream).
- `services/realtimeService.ts`: in-memory tenant listener registry + event fanout.

### Campaign Domain (Backend)
- `repositories/campaignRepository.ts`: campaign and related persistence access.
- `services/campaignService.ts`: campaign domain behavior.
- `routes/campaigns.ts`: campaign CRUD/list/detail style API surface.

### Persistence Model (Prisma)
- `backend/prisma/schema.prisma` includes tenant and call pipeline entities (sessions/events/transcripts/lead extraction) and campaign entities.
- `Tenant` includes workspace configuration JSON used by workspace-specific runtime metadata.

---

## 6) Frontend Summary (Implemented)

### App Routing and Protected Surfaces
- Expo Router layout structure implemented in `app/*` with:
  - public auth/legal routes
  - protected Lexus workspace routes
  - protected Enterprise workspace routes

### API Client Layer
- `lib/api/client.ts`:
  - base URL configuration via `EXPO_PUBLIC_API_BASE_URL`
  - tenant propagation via `x-tenant-id`
  - typed `get/post/patch` methods returning `ApiEnvelope<T>`
- `lib/api/calls.ts`:
  - `createCall`, `fetchCalls`, `fetchCallDetail`, `fetchCallTranscript`, `fetchCallRecording`, `fetchCallLead`, `fetchCapabilities`

### Realtime Client Layer
- `lib/realtime/client.ts`:
  - SSE client (`SseRealtimeClient`) with connect/subscribe/disconnect
  - reconnect backoff
  - state notifications (`connecting`, `connected`, `reconnecting`, etc.)
  - call-event parsing through adapter

### Frontend Adapters/Formatting
- `lib/adapters/liveEvents.ts`: realtime event parsing + stage label/tone mapping + connection labels.
- `lib/adapters/calls.ts`: call formatting helpers, quick stats, room grouping, capability feature helper.

### Runtime State Orchestration
- `context/CallsContext.tsx`:
  - bootstrap of call list + capabilities
  - live snapshots map keyed by call
  - stream event ID dedupe
  - optimistic call creation
  - SSE subscription gating by capability
  - merge strategy for live updates into UI state

### Frontend Hooks
- `hooks/useCalls.ts`: context accessor for calls runtime.
- `hooks/useCallDetail.ts`: detail/lead/transcript fetch, live-version refresh trigger.
- `hooks/useCapabilities.ts`: capability checks + plan/workspace label derivation.
- `hooks/useWorkspaceProfile.ts`: workspace profile helper abstraction.

### Component Surfaces
- Workspace-specific component sets under `components/lexus/*` and `components/enterprise/*` support visual/runtime differentiation.

---

## 7) Workspace/Plan/Capability Model (Current Behavior)

### Implemented Principles
- Workspace identity and vocabulary are contract-driven (not hardcoded everywhere).
- Feature availability is capability-flag driven.
- Frontend uses capability checks to gate realtime/calls UX behavior.
- Backend capability middleware provides route-level enforcement hooks.

### Visible Workspace Outcomes
- `Lexus`, `Prestige`, `Enterprise` labels surfaced from capability/workspace profile logic.
- Voice provider / assistant display text and vocabulary terms are available from workspace config contract.

---

## 8) Realtime and Event-Driven Model (Current)

### Backend Side
- Voice/webhook events are normalized and persisted.
- Derived call state transitions are emitted to in-memory listener sets per tenant.
- SSE endpoints stream typed call/campaign events.

### Frontend Side
- SSE client subscribes by tenant.
- Each inbound event is validated/parsing-guarded.
- Duplicate stream events are ignored via stream event ID memory.
- Live snapshot state drives badges/stages/timestamps in call UI.

### Reliability Characteristics (as currently implemented)
- In-process listener registry (not distributed broker-backed).
- Client reconnect backoff on stream error.
- Malformed event payloads are ignored instead of crashing stream handling.

---

## 9) Campaign Domain Snapshot

### Implemented
- Campaign data models in Prisma and corresponding repository/service layers.
- Campaign REST endpoints for lifecycle operations.
- Campaign SSE stream endpoint available.
- Enterprise route group includes campaign screens (`campaigns/index`, `campaigns/[id]`).

### Notes
- Campaign domain is functionally present in backend and represented in frontend routing, with deeper UX maturity to be validated during product hardening.

---

## 10) Route and Screen Map (Current Repository)

### Backend API Map (High-Level)
- `/api/health`
- `/api/access`
- `/api/capabilities`
- `/api/calls`
- `/api/campaigns`
- `/api/realtime/*` (calls/campaigns stream)
- `/api/webhooks/voice`
- `/api/admin` (mounted in code; excluded from completed-phase claims in this document)

### Frontend Route Groups
- `app/(public)/*`: landing/auth/legal pages.
- `app/(protected)/lexus/*`: Lexus workspace experience (calls, analytics, settings, batches/completed flows, etc.).
- `app/(protected)/enterprise/*`: Enterprise workspace experience (dashboard, campaigns, calls, contacts, teams, settings, billing, etc.).

---

## 11) Deferred / Not Completed as Final Production Phase

The following are either explicitly deferred, partially scaffolded, or not validated as complete production behavior in this handoff:

- Admin panel as a fully completed production phase.
- Payment/billing operational hardening and end-to-end rollout validation.
- Inventory integration and full telephony/provider operationalization beyond integration touchpoints in this repo.
- Multi-instance/distributed realtime fanout architecture (current model is in-memory process-local listeners).
- Comprehensive production non-functional readiness (full observability, scale, disaster recovery, exhaustive security audit).

---

## 12) Practical Next Steps for Continuation

1. Lock this document as the reference baseline and require change updates whenever architecture/routes/contracts evolve.
2. Decide explicit scope for admin phase (if/when to elevate from scaffold/present state to production-complete target) and define acceptance criteria.
3. Harden campaign + call UX parity across workspaces with explicit feature matrix tests.
4. Introduce distributed realtime transport if multi-instance backend deployment is required.
5. Expand integration and regression test coverage for:
   - webhook event ingestion/idempotency
   - call state machine transitions
   - capability guard enforcement
   - frontend realtime merge/dedupe behavior
6. Add architecture decision records for tenancy model, realtime transport strategy, and workspace vocabulary governance.

---

## 13) Source File Reference Map (Used for This Progress Snapshot)

### Core Docs Reviewed
- `docs/ARCHITECTURE.md`
- `docs/SETUP.md`
- `docs/VOICE_BACKEND_CONTRACT.md`

### Shared Contracts Reviewed
- `shared/contracts/api.ts`
- `shared/contracts/plans.ts`
- `shared/contracts/voice-events.ts`
- `shared/contracts/calls.ts`
- `shared/contracts/realtime.ts`
- `shared/contracts/workspace.ts`
- `shared/contracts/campaigns.ts`
- `shared/contracts/admin.ts`
- `shared/contracts/index.ts`

### Backend Files Reviewed (High-Signal)
- `backend/prisma/schema.prisma`
- `backend/src/index.ts`
- `backend/src/routes/index.ts`
- `backend/src/routes/access.ts`
- `backend/src/routes/capabilities.ts`
- `backend/src/routes/calls.ts`
- `backend/src/routes/calls/create.ts`
- `backend/src/routes/calls/list.ts`
- `backend/src/routes/calls/detail.ts`
- `backend/src/routes/calls/transcript.ts`
- `backend/src/routes/campaigns.ts`
- `backend/src/routes/realtime.ts`
- `backend/src/routes/webhooks/voice.ts`
- `backend/src/middleware/requestContext.ts`
- `backend/src/middleware/requireTenant.ts`
- `backend/src/middleware/requireCapability.ts`
- `backend/src/middleware/verifyWebhookAuth.ts`
- `backend/src/services/accessService.ts`
- `backend/src/services/callService.ts`
- `backend/src/services/voiceEventService.ts`
- `backend/src/services/calls/callStateMachine.ts`
- `backend/src/services/realtimeService.ts`
- `backend/src/services/campaignService.ts`
- `backend/src/repositories/callRepository.ts`
- `backend/src/repositories/eventRepository.ts`
- `backend/src/repositories/tenantRepository.ts`
- `backend/src/repositories/campaignRepository.ts`

### Frontend Files Reviewed (High-Signal)
- `context/CallsContext.tsx`
- `hooks/useCalls.ts`
- `hooks/useCallDetail.ts`
- `hooks/useCapabilities.ts`
- `hooks/useWorkspaceProfile.ts`
- `lib/api/client.ts`
- `lib/api/calls.ts`
- `lib/realtime/client.ts`
- `lib/adapters/calls.ts`
- `lib/adapters/liveEvents.ts`
- route/component inventories under:
  - `app/(protected)/lexus/*`
  - `app/(protected)/enterprise/*`
  - `components/lexus/*`
  - `components/enterprise/*`

---

## Final Notes
- This is a frontend/backend implementation progress artifact, not a full product-readiness declaration.
- Voice-server operational details are intentionally excluded except where integration touchpoints affect frontend/backend behavior.
- Admin should be treated as deferred/phase-pending for completion status in this document, even though admin-related artifacts exist in current code.
