import { useCapabilities } from "./useCapabilities";

export function useWorkspaceProfile() {
  const {
    workspaceConfig,
    workspaceType,
    planLabel,
    vocabulary,
    branding,
    voiceAgentDisplay,
    inventoryAwareAi,
  } = useCapabilities();

  return {
    workspaceConfig,
    workspaceType,
    planLabel,
    vocabulary,
    branding,
    voiceAgentDisplay,
    inventoryAwareAi,
  };
}
