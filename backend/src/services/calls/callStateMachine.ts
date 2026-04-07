import { VoiceEventType } from "../../../../shared/contracts";
import { CallLifecycleStatus } from "../../generated/prisma";

const transitionMap: Record<CallLifecycleStatus, CallLifecycleStatus[]> = {
  queued: ["initiated", "dispatching"],
  initiated: ["dispatching"],
  dispatching: ["ringing", "connected", "failed"],
  ringing: ["connected", "failed"],
  connected: ["active", "completed", "failed"],
  active: ["completed", "failed"],
  completed: [],
  failed: [],
};

export function canTransition(from: CallLifecycleStatus, to: CallLifecycleStatus): boolean {
  return transitionMap[from].includes(to);
}

export function transitionOrStay(
  from: CallLifecycleStatus,
  to: CallLifecycleStatus
): CallLifecycleStatus {
  return canTransition(from, to) ? to : from;
}

export function deriveStateFromEvent(eventType: VoiceEventType): CallLifecycleStatus | null {
  switch (eventType) {
    case "call_started":
      return "connected";
    case "transcript_partial":
    case "transcript_final":
      return "active";
    case "call_completed":
      return "completed";
    case "call_failed":
      return "failed";
    case "lead_extracted":
      return null;
    default:
      return null;
  }
}
