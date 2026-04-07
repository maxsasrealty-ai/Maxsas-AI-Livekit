import { AgentDispatchClient, RoomServiceClient, SipClient } from "livekit-server-sdk";

import { config, normalizePhoneNumber, serializeLivekitMetadata } from "../lib/config";

/**
 * This service acts as the explicit boundary between the internal Maxsas backend
 * and the external voice system (e.g., LiveKit / VAPI worker node).
 */

export interface TelephonyDispatchRequest {
  callId: string;
  tenantId: string;
  roomId: string;
  phoneNumber: string | null;
  agentName: string | null;
  direction: string | null;
}

export async function dispatchToTelephonyEngine(request: TelephonyDispatchRequest): Promise<void> {
  if (!config.LIVEKIT_URL || !config.LIVEKIT_API_KEY || !config.LIVEKIT_API_SECRET || !config.sipTrunkId) {
    throw new Error(
      `LiveKit Telephony environment variables are incomplete (URL, API_KEY, SECRET, SIP_OUTBOUND_TRUNK_ID). Dispatch aborted.`
    );
  }

  if (!request.phoneNumber) {
    throw new Error(`A valid phone number is required for outbound SIP participant creation.`);
  }

  const roomName = request.roomId || `call-${request.callId}`;
  const formattedPhone = normalizePhoneNumber(request.phoneNumber);
  const resolvedAgentName = config.LIVEKIT_AGENT_NAME;

  const roomClient = new RoomServiceClient(config.LIVEKIT_URL, config.LIVEKIT_API_KEY, config.LIVEKIT_API_SECRET);
  const sipClient = new SipClient(config.LIVEKIT_URL, config.LIVEKIT_API_KEY, config.LIVEKIT_API_SECRET);
  
  // Create the persistent Room
  await roomClient.createRoom({
    name: roomName,
    emptyTimeout: 10 * 60, // 10 minutes
    metadata: serializeLivekitMetadata({
      tenantId: request.tenantId,
      callId: request.callId,
      roomId: roomName,
      phoneNumber: formattedPhone,
      agentName: resolvedAgentName,
      direction: request.direction,
      extras: {
        room_id: roomName,
        phone_number: formattedPhone,
      },
    }),
  });

  try {
    const agentClient = new AgentDispatchClient(config.LIVEKIT_URL, config.LIVEKIT_API_KEY, config.LIVEKIT_API_SECRET);
    await agentClient.createDispatch(roomName, resolvedAgentName, {
      metadata: serializeLivekitMetadata({
        tenantId: request.tenantId,
        callId: request.callId,
        roomId: roomName,
        phoneNumber: formattedPhone,
        agentName: resolvedAgentName,
        direction: request.direction,
        extras: {
          room_id: roomName,
          phone_number: formattedPhone,
        },
      })
    });
  } catch (agentErr) {
    // If agent dispatch fails (e.g. older SDK or no direct explicit dispatch pattern active)
    // we capture but proceed because the explicit Room metadata may already auto-trigger the Agent daemon.
    console.warn("[TELEPHONY] Explicit Agent Dispatch failed or unsupported by cluster. Relying on auto-hook.", agentErr);
  }

  // Create the Outbound SIP Participant bridging the external user into the Room
  await sipClient.createSipParticipant(
    config.sipTrunkId,
    formattedPhone,
    roomName,
    {
      participantIdentity: `sip-${request.callId}`,
      participantName: formattedPhone,
      participantMetadata: JSON.stringify({ callId: request.callId, tenantId: request.tenantId, phone_number: formattedPhone }),
    }
  );
}
