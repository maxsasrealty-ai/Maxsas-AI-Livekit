import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { LiveCallSnapshot } from "../../../context/CallsContext";
import { liveStageLabel, liveStageTone } from "../../../lib/adapters/liveEvents";
import StatusPill from "../StatusPill";
import { C } from "../theme";

interface LiveStageStripProps {
  snapshot: LiveCallSnapshot;
}

export default function LiveStageStrip({ snapshot }: LiveStageStripProps) {
  return (
    <View style={styles.wrap}>
      <StatusPill label={liveStageLabel(snapshot.stage)} tone={liveStageTone(snapshot.stage)} />
      {snapshot.partialTranscript ? (
        <Text style={styles.preview} numberOfLines={2}>
          {snapshot.partialTranscript}
        </Text>
      ) : (
        <Text style={styles.previewMuted}>Waiting for transcript updates...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    gap: 8,
  },
  preview: {
    color: C.text,
    fontSize: 13,
    lineHeight: 18,
  },
  previewMuted: {
    color: C.textMuted,
    fontSize: 13,
  },
});
