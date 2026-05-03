import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as XLSX from "xlsx";
import GlassCard from "../../../components/lexus/GlassCard";
import PillButton from "../../../components/lexus/PillButton";
import { LexusThemeColors } from "../../../components/lexus/theme";
import { useLexusTheme } from "../../../context/LexusThemeContext";
import { useCalls } from "../../../hooks/useCalls";
import { useCapabilities } from "../../../hooks/useCapabilities";

type ParsedInputRow = {
  rowIndex: number;
  cells: Record<string, string>;
};

type LocalContact = {
  id: string;
  name: string | null;
  email: string | null;
  phoneNumber: string;
  sourceLabel: string;
  score: number;
  rowIndex: number;
  company: string | null;
};

function normalizeCell(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).replace(/\s+/g, " ").trim();
}

function normalizeHeader(header: string): string {
  return normalizeCell(header)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function makeContactId(scope: string): string {
  return `${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function buildBatchRoomId(): string {
  return `lead-batch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function headerRowScore(row: string[]): number {
  const hints = ["name", "phone", "mobile", "number", "contact", "email", "company", "city", "source"];
  return row.reduce((score, cell) => {
    const header = normalizeHeader(cell);
    if (!header) {
      return score;
    }

    if (hints.some((hint) => header.includes(hint))) {
      return score + 3;
    }

    return /[a-z]/.test(header) ? score + 1 : score;
  }, 0);
}

function pickHeaderRowIndex(table: string[][]): number {
  let bestIndex = 0;
  let bestScore = -1;

  for (let index = 0; index < Math.min(table.length, 8); index += 1) {
    const row = table[index] ?? [];
    const nonEmpty = row.filter((cell) => normalizeCell(cell).length > 0).length;
    if (nonEmpty === 0) {
      continue;
    }

    const score = headerRowScore(row);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  }

  return bestIndex;
}

function detectDelimiter(lines: string[]): string {
  const candidates = [",", ";", "\t", "|"];
  const sample = lines.slice(0, 8);

  let best = ",";
  let bestScore = -1;

  for (const delimiter of candidates) {
    let total = 0;
    for (const line of sample) {
      let inQuotes = false;
      for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        if (char === '"') {
          if (inQuotes && line[index + 1] === '"') {
            index += 1;
            continue;
          }
          inQuotes = !inQuotes;
          continue;
        }

        if (!inQuotes && char === delimiter) {
          total += 1;
        }
      }
    }

    if (total > bestScore) {
      bestScore = total;
      best = delimiter;
    }
  }

  return best;
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function dedupeHeaders(rawHeaders: string[]): string[] {
  const used = new Map<string, number>();

  return rawHeaders.map((header, index) => {
    const normalized = normalizeHeader(normalizeCell(header)) || `column_${index + 1}`;
    const count = (used.get(normalized) ?? 0) + 1;
    used.set(normalized, count);
    return count === 1 ? normalized : `${normalized}_${count}`;
  });
}

function parseCsvText(text: string): ParsedInputRow[] {
  const noBom = text.replace(/^\uFEFF/, "");
  const lines = noBom.split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return [];
  }

  const delimiter = detectDelimiter(lines);
  const table = lines.map((line) => parseCsvLine(line, delimiter));
  const headerRowIndex = pickHeaderRowIndex(table);
  const headers = dedupeHeaders(table[headerRowIndex] ?? []);

  const rows: ParsedInputRow[] = [];
  for (let rowIndex = headerRowIndex + 1; rowIndex < table.length; rowIndex += 1) {
    const values = table[rowIndex];
    const cells: Record<string, string> = {};

    headers.forEach((header, headerIndex) => {
      cells[header] = normalizeCell(values?.[headerIndex] ?? "");
    });

    rows.push({ rowIndex, cells });
  }

  return rows;
}

function parseWorkbookRows(buffer: ArrayBuffer): ParsedInputRow[] {
  const workbook = XLSX.read(buffer, { type: "array", raw: false, dense: true });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    return [];
  }

  const matrix = XLSX.utils.sheet_to_json<(string | number | boolean | null)[]>(workbook.Sheets[sheetName], {
    header: 1,
    defval: "",
    raw: false,
    blankrows: false,
  });

  if (matrix.length === 0) {
    return [];
  }

  const normalizedTable = matrix.map((row) => (row ?? []).map((value) => normalizeCell(value)));
  const headerRowIndex = pickHeaderRowIndex(normalizedTable);
  const headers = dedupeHeaders(normalizedTable[headerRowIndex] ?? []);
  const rows: ParsedInputRow[] = [];

  for (let rowIndex = headerRowIndex + 1; rowIndex < matrix.length; rowIndex += 1) {
    const values = normalizedTable[rowIndex] ?? [];
    const cells: Record<string, string> = {};

    headers.forEach((header, headerIndex) => {
      cells[header] = normalizeCell(values[headerIndex]);
    });

    rows.push({ rowIndex, cells });
  }

  return rows;
}

function parseUploadedRows(buffer: ArrayBuffer, fileName?: string | null, mimeType?: string | null): ParsedInputRow[] {
  const lowerName = String(fileName ?? "").toLowerCase();
  const isCsv = lowerName.endsWith(".csv") || String(mimeType ?? "").includes("csv");

  if (isCsv) {
    return parseCsvText(new TextDecoder().decode(buffer));
  }

  return parseWorkbookRows(buffer);
}

async function readPickedAssetBuffer(asset: DocumentPicker.DocumentPickerAsset): Promise<ArrayBuffer> {
  const fileAsset = asset as DocumentPicker.DocumentPickerAsset & { file?: Blob };

  if (fileAsset.file && typeof fileAsset.file.arrayBuffer === "function") {
    return fileAsset.file.arrayBuffer();
  }

  const response = await fetch(asset.uri);
  if (!response.ok) {
    throw new Error(`Failed to read picked file: ${response.status}`);
  }

  return response.arrayBuffer();
}

function showMessage(title: string, message: string): void {
  Alert.alert(title, message);
}

function hasRepeatingDigitPattern(digits: string): boolean {
  return /^([0-9])\1{9}$/.test(digits);
}

function hasSequentialPattern(digits: string): boolean {
  if (digits.length !== 10) {
    return false;
  }

  let asc = true;
  let desc = true;

  for (let index = 1; index < digits.length; index += 1) {
    const prev = Number(digits[index - 1]);
    const curr = Number(digits[index]);
    if (curr !== (prev + 1) % 10) {
      asc = false;
    }
    if (curr !== (prev + 9) % 10) {
      desc = false;
    }
  }

  return asc || desc;
}

function isLikelyFakeDigitSequence(digits: string): boolean {
  return hasRepeatingDigitPattern(digits) || hasSequentialPattern(digits);
}

function stripExtensionTail(text: string): string {
  const match = text.match(/\b(?:ext|extension|x)\b/i);
  if (!match || match.index === undefined) {
    return text;
  }

  const tail = text.slice(match.index + match[0].length);
  const tailDigits = tail.replace(/\D/g, "");
  if (tailDigits.length <= 4) {
    return text.slice(0, match.index);
  }

  return text;
}

function normalizeStrictIndianMobileDigits(digits: string): string | null {
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    const candidate = digits.slice(1, 11);
    return /^[6-9]\d{9}$/.test(candidate) ? candidate : null;
  }

  if (digits.length >= 12 && digits.startsWith("91")) {
    const candidate = digits.slice(2, 12);
    return /^[6-9]\d{9}$/.test(candidate) ? candidate : null;
  }

  if (digits.length >= 14 && digits.startsWith("0091")) {
    const candidate = digits.slice(4, 14);
    return /^[6-9]\d{9}$/.test(candidate) ? candidate : null;
  }

  return null;
}

function scanValidIndianMobileWindows(digits: string): string[] {
  const candidates = new Set<string>();

  for (let index = 0; index <= digits.length - 10; index += 1) {
    const candidate = digits.slice(index, index + 10);
    if (/^[6-9]\d{9}$/.test(candidate) && !isLikelyFakeDigitSequence(candidate)) {
      candidates.add(candidate);
    }
  }

  return Array.from(candidates);
}

function normalizePhoneText(raw: string): {
  candidates: string[];
  extractedDigits: string | null;
  rawPhone: string | null;
  ambiguousReason?: string;
} {
  const text = stripExtensionTail(raw).replace(/\s+/g, " ").trim();

  if (!text) {
    return {
      candidates: [],
      extractedDigits: null,
      rawPhone: null,
      ambiguousReason: "phone_not_found",
    };
  }

  const digitGroups = text.match(/\d+/g) ?? [];
  if (digitGroups.length === 0) {
    return {
      candidates: [],
      extractedDigits: null,
      rawPhone: text,
      ambiguousReason: "phone_not_found",
    };
  }

  const longGroups = digitGroups.filter((group) => group.length >= 10).length;
  const groupedDigits = digitGroups.join("");

  const collectCandidates = (digits: string): string[] => {
    const exact = normalizeStrictIndianMobileDigits(digits);
    if (exact) {
      return [exact];
    }

    return scanValidIndianMobileWindows(digits);
  };

  if (longGroups <= 1) {
    const combinedCandidates = collectCandidates(groupedDigits);
    if (combinedCandidates.length > 0) {
      return {
        candidates: combinedCandidates,
        extractedDigits: groupedDigits,
        rawPhone: text,
        ambiguousReason: combinedCandidates.length > 1 ? "multiple_valid_phone_candidates_in_field" : undefined,
      };
    }
  }

  const perGroupCandidates = new Set<string>();
  for (const group of digitGroups) {
    const candidates = collectCandidates(group);
    if (candidates.length > 1) {
      return {
        candidates,
        extractedDigits: group,
        rawPhone: text,
        ambiguousReason: "multiple_valid_phone_candidates_in_field",
      };
    }

    if (candidates.length === 1) {
      perGroupCandidates.add(candidates[0]);
    }
  }

  return {
    candidates: Array.from(perGroupCandidates),
    extractedDigits: groupedDigits,
    rawPhone: text,
    ambiguousReason:
      perGroupCandidates.size > 1
        ? "multiple_valid_phone_candidates_in_row"
        : perGroupCandidates.size === 0
          ? "no_valid_indian_mobile_detected"
          : undefined,
  };
}

function readField(row: Record<string, unknown>, aliases: string[]): string | null {
  for (const [header, value] of Object.entries(row)) {
    const normalizedHeader = normalizeHeader(header);
    if (aliases.some((alias) => normalizedHeader === alias || normalizedHeader.includes(alias))) {
      const normalizedValue = normalizeCell(value);
      if (normalizedValue) {
        return normalizedValue;
      }
    }
  }

  return null;
}

function extractPhoneFromRow(row: Record<string, string>): {
  status: "valid" | "invalid" | "ambiguous";
  phoneNumber: string | null;
  rawPhone: string | null;
  extractedDigits: string | null;
} {
  const phoneFields = Object.entries(row).filter(([header, value]) => value && /phone|mobile|contact number|contact|whatsapp|number/i.test(normalizeHeader(header)));
  const sources = phoneFields.length > 0 ? phoneFields.map(([, value]) => value) : [Object.values(row).filter(Boolean).join(" | ")];

  const results = sources.map((source) => normalizePhoneText(source));
  const validCandidates = results.flatMap((result) =>
    result.candidates.map((candidate) => ({
      candidate,
      extractedDigits: result.extractedDigits,
      rawPhone: result.rawPhone,
    }))
  );

  if (validCandidates.length === 0) {
    const firstFailure = results.find((result) => result.ambiguousReason);
    return {
      status: "invalid",
      phoneNumber: null,
      rawPhone: firstFailure?.rawPhone ?? sources[0] ?? null,
      extractedDigits: firstFailure?.extractedDigits ?? null,
    };
  }

  const uniqueCandidates = Array.from(new Set(validCandidates.map((item) => item.candidate)));
  if (uniqueCandidates.length > 1) {
    return {
      status: "ambiguous",
      phoneNumber: null,
      rawPhone: validCandidates[0].rawPhone ?? sources[0] ?? null,
      extractedDigits: validCandidates[0].extractedDigits ?? null,
    };
  }

  const normalizedPhone10d = uniqueCandidates[0];
  return {
    status: "valid",
    phoneNumber: `+91${normalizedPhone10d}`,
    rawPhone: validCandidates[0].rawPhone ?? sources[0] ?? null,
    extractedDigits: validCandidates[0].extractedDigits ?? normalizedPhone10d,
  };
}

function computeRowScore(args: {
  name: string | null;
  email: string | null;
  company: string | null;
  city: string | null;
  source: string | null;
  phoneStatus: "valid" | "invalid" | "ambiguous";
}): number {
  let score = 0;

  if (args.phoneStatus === "valid") {
    score += 40;
  }
  if (args.phoneStatus === "ambiguous") {
    score += 8;
  }
  if (args.name) {
    score += 20;
  }
  if (args.email) {
    score += 20;
  }
  if (args.company) {
    score += 8;
  }
  if (args.city) {
    score += 4;
  }
  if (args.source) {
    score += 4;
  }

  return score;
}

function workbookToRows(buffer: ArrayBuffer, fileName?: string | null, mimeType?: string | null): ParsedInputRow[] {
  return parseUploadedRows(buffer, fileName, mimeType);
}

function buildContactsFromRows(rows: ParsedInputRow[]): LocalContact[] {
  const candidates: LocalContact[] = [];
  const seenPhones = new Map<string, LocalContact>();
  const seenEmails = new Map<string, LocalContact>();

  rows.forEach((row) => {
    const name = readField(row.cells, ["name", "full name", "contact name", "lead name"]);
    const email = readField(row.cells, ["email", "email id", "mail"]);
    const company = readField(row.cells, ["company", "organization", "organisation", "firm", "business"]);
    const city = readField(row.cells, ["city", "town"]);
    const source = readField(row.cells, ["source", "channel", "campaign source", "lead source"]);
    const phone = extractPhoneFromRow(row.cells);

    if (phone.status !== "valid" || !phone.phoneNumber) {
      return;
    }

    const score = computeRowScore({
      name,
      email,
      company,
      city,
      source,
      phoneStatus: phone.status,
    });

    candidates.push({
      id: makeContactId(`upload-${row.rowIndex}`),
      name,
      email,
      phoneNumber: phone.phoneNumber,
      sourceLabel: `Row ${row.rowIndex}`,
      score,
      rowIndex: row.rowIndex,
      company,
    });
  });

  candidates.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    return left.rowIndex - right.rowIndex;
  });

  const deduped: LocalContact[] = [];
  for (const contact of candidates) {
    if (seenPhones.has(contact.phoneNumber)) {
      continue;
    }

    if (contact.email && seenEmails.has(contact.email)) {
      continue;
    }

    seenPhones.set(contact.phoneNumber, contact);
    if (contact.email) {
      seenEmails.set(contact.email, contact);
    }
    deduped.push(contact);
  }

  return deduped;
}

function parseManualContact(name: string, phone: string): LocalContact | null {
  const digits = phone.replace(/\D/g, "");
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return null;
  }

  return {
    id: makeContactId("manual"),
    name: name.trim() || null,
    email: null,
    phoneNumber: `+91${digits}`,
    sourceLabel: "Manual",
    score: computeRowScore({
      name: name.trim() || null,
      email: null,
      company: null,
      city: null,
      source: null,
      phoneStatus: "valid",
    }),
    rowIndex: 0,
    company: null,
  };
}

function mergeContacts(existing: LocalContact[], next: LocalContact): LocalContact[] {
  if (existing.some((contact) => contact.phoneNumber === next.phoneNumber)) {
    return existing;
  }

  return [...existing, next];
}

export default function LexusUploadLeads() {
  const { can, premiumPlanLabel, vocabulary, capabilities } = useCapabilities();
  const { initiateCall } = useCalls();
  const { colors, isDark } = useLexusTheme();
  const S = useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  const [uploadFileName, setUploadFileName] = useState<string | null>(null);
  const [uploadContacts, setUploadContacts] = useState<LocalContact[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDispatchingBatch, setIsDispatchingBatch] = useState(false);

  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualContacts, setManualContacts] = useState<LocalContact[]>([]);
  const [isStartingManual, setIsStartingManual] = useState(false);

  const canStartLiveCall = can("calls.live");

  const dispatchContacts = async (contacts: LocalContact[]) => {
    if (contacts.length === 0) {
      return null;
    }

    const roomId = buildBatchRoomId();
    let successCount = 0;

    for (const contact of contacts) {
      const callId = await initiateCall({
        roomId,
        phoneNumber: contact.phoneNumber,
        agentName: "maxsas-voice-agent-prod",
        direction: "outbound",
      });

      if (callId) {
        successCount += 1;
      }
    }

    if (successCount === 0) {
      showMessage("Dispatch failed", "No contacts were dispatched. Please retry after checking backend connectivity.");
      return null;
    }

    showMessage("Calls started", `${successCount}/${contacts.length} contacts were started successfully.`);
    return roomId;
  };

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "text/csv",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      setUploadFileName(asset.name || "Uploaded file");
      setUploadContacts([]);
      setIsUploading(true);

      const buffer = await readPickedAssetBuffer(asset);
      const rows = workbookToRows(buffer, asset.name, asset.mimeType);
      const contacts = buildContactsFromRows(rows);
      setIsUploading(false);
      setUploadContacts(contacts);

      if (contacts.length === 0) {
        showMessage("No valid contacts", "File read ho gayi, lekin callable Indian mobile contacts nahi mile.");
      }
    } catch (err) {
      setIsUploading(false);
      console.warn("Error picking document:", err);
      showMessage("Upload failed", "File select hui, par parse/read nahi ho paayi. CSV/XLS/XLSX format check karein.");
    }
  };

  const handleRemoveUploadList = () => {
    setUploadFileName(null);
    setUploadContacts([]);
  };

  const handleStartUploadedBatch = async () => {
    if (uploadContacts.length === 0 || isDispatchingBatch) {
      return;
    }

    setIsDispatchingBatch(true);
    const roomId = await dispatchContacts(uploadContacts);
    setIsDispatchingBatch(false);

    if (roomId) {
      router.replace(`/(protected)/lexus/batches/${encodeURIComponent(roomId)}` as any);
    }
  };

  const handleAddAnother = () => {
    const trimmedPhone = manualPhone.trim();
    const trimmedName = manualName.trim();

    if (!trimmedPhone) {
      showMessage("Required", "Please enter a phone number.");
      return;
    }

    const contact = parseManualContact(trimmedName, trimmedPhone);
    if (!contact) {
      showMessage("Invalid contact", "Enter a valid Indian mobile number before adding it.");
      return;
    }

    setManualContacts((current) => mergeContacts(current, contact));
    setManualName("");
    setManualPhone("");
  };

  const handleRemoveManualContact = (contactId: string) => {
    setManualContacts((current) => current.filter((contact) => contact.id !== contactId));
  };

  const handleStartManualCalls = async () => {
    if (isStartingManual) {
      return;
    }

    if (manualContacts.length === 0) {
      showMessage("Add contacts first", "Add at least one contact before starting calls.");
      return;
    }

    setIsStartingManual(true);
    const roomId = await dispatchContacts(manualContacts);
    setIsStartingManual(false);

    if (roomId) {
      router.replace(`/(protected)/lexus/batches/${encodeURIComponent(roomId)}` as any);
    }
  };

  return (
    <SafeAreaView style={S.safe}>
      {(isUploading || isDispatchingBatch || isStartingManual) && (
        <View style={S.loadingOverlay} pointerEvents="auto">
          <View style={S.loadingCard}>
            <ActivityIndicator color={colors.blue} size="large" />
            <Text style={S.loadingTitle}>Starting calls</Text>
            <Text style={S.loadingSubtitle}>Preparing batch details...</Text>
          </View>
        </View>
      )}

      <View style={S.headerRow}>
        <TouchableOpacity style={S.homeBtn} onPress={() => router.push("/(protected)/lexus" as any)}>
          <Text style={S.homeBtnText}>Home</Text>
        </TouchableOpacity>
        <Text style={S.headerTitle}>{`Upload ${vocabulary.leadsLabel}`}</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={S.scroll} showsVerticalScrollIndicator={false}>
        <GlassCard style={S.cardMain} padded={true}>
          <View style={S.iconCircle}>
            <Text style={S.iconMain}>📤</Text>
          </View>
          <Text style={S.cardTitle}>{`Upload ${vocabulary.leadsLabel} CSV from your portal`}</Text>
          <Text style={S.cardSubtitle}>
            {`Import ${vocabulary.leadsLabel.toLowerCase()} from 99acres, MagicBricks or internal CRM to start AI ${vocabulary.callsLabel.toLowerCase()}.`}
          </Text>
          <PillButton
            title={isUploading ? "Preparing List..." : "Choose CSV File"}
            onPress={() => {
              if (isUploading) {
                return;
              }
              void handlePickFile();
            }}
            style={{ width: "100%", marginBottom: 10, zIndex: 10 }}
          />
          <Text style={S.supportedText}>
            Supported: CSV, XLS, XLSX. Required column: Number. Optional column: Name.
          </Text>
        </GlassCard>

        {!!uploadFileName && (
          <GlassCard style={S.cardSecondary} padded={true} radius={14}>
            <View style={S.sectionHeaderRow}>
              <View>
                <Text style={S.cardTitleSmall}>Clean contacts</Text>
                <Text style={S.cardSubtitleSmall}>{uploadFileName}</Text>
              </View>
              <Text style={S.countPill}>{uploadContacts.length} ready</Text>
            </View>

            <View style={S.contactList}>
              {uploadContacts.slice(0, 12).map((contact) => (
                <View key={contact.id} style={S.contactRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={S.contactName}>{contact.name || "Lead"}</Text>
                    <Text style={S.contactMeta}>{contact.phoneNumber}</Text>
                  </View>
                  {!!contact.sourceLabel && <Text style={S.contactSource}>{contact.sourceLabel}</Text>}
                </View>
              ))}
            </View>

            <View style={S.actionRow}>
              <PillButton
                title={isDispatchingBatch ? "Starting..." : "Start Batch Calls"}
                variant={uploadContacts.length === 0 || isDispatchingBatch ? "ghost" : "primary"}
                onPress={() => {
                  if (uploadContacts.length === 0 || isDispatchingBatch) {
                    return;
                  }
                  void handleStartUploadedBatch();
                }}
                style={{ flex: 1, marginRight: 10 }}
              />
              <PillButton title="Remove List" variant="ghost" onPress={handleRemoveUploadList} style={{ flex: 1 }} />
            </View>
          </GlassCard>
        )}

        <GlassCard style={S.cardSecondary} padded={true} radius={14}>
          <View style={S.sectionHeaderRow}>
            <View>
              <Text style={S.cardTitleSmall}>Add Contact</Text>
              <Text style={S.cardSubtitleSmall}>Build a small local list, then start calls in one tap.</Text>
            </View>
            <Text style={S.countPill}>{manualContacts.length} added</Text>
          </View>

          <Text style={S.inputLabel}>Phone Number *</Text>
          <TextInput
            style={S.input}
            placeholder="9876543210"
            placeholderTextColor={colors.textFaint}
            value={manualPhone}
            onChangeText={(value) => setManualPhone(value.replace(/\D/g, "").slice(0, 10))}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Text style={S.inputLabel}>Name (Optional)</Text>
          <TextInput
            style={S.input}
            placeholder="E.g. Rahul"
            placeholderTextColor={colors.textFaint}
            value={manualName}
            onChangeText={setManualName}
          />

          <View style={S.actionRow}>
            <PillButton title="Add Another" variant="ghost" onPress={handleAddAnother} style={{ flex: 1, marginRight: 10 }} />
            <PillButton
              title={isStartingManual ? "Starting..." : "Start Calls"}
              variant={manualContacts.length === 0 || isStartingManual ? "ghost" : "primary"}
              onPress={() => {
                if (manualContacts.length === 0 || isStartingManual) {
                  return;
                }
                void handleStartManualCalls();
              }}
              style={{ flex: 1 }}
            />
          </View>

          {manualContacts.length > 0 && (
            <View style={S.manualList}>
              {manualContacts.map((contact) => (
                <View key={contact.id} style={S.contactRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={S.contactName}>{contact.name || "Lead"}</Text>
                    <Text style={S.contactMeta}>{contact.phoneNumber}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveManualContact(contact.id)} style={S.removeChip}>
                    <Text style={S.removeChipText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </GlassCard>

        {capabilities !== null && !canStartLiveCall && (
          <GlassCard style={S.cardSecondary} padded={true} radius={14}>
            <Text style={S.cardSubtitleSmall}>{`Live ${vocabulary.callsLabel.toLowerCase()} are unavailable on your plan. Upgrade to ${premiumPlanLabel} to start calls from this screen.`}</Text>
          </GlassCard>
        )}

        <Text style={S.tipsText}>Keep the flow short: upload, review the clean list, and start calls when ready.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: LexusThemeColors, isDark: boolean) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.bg },
    headerRow: { flexDirection: "row", alignItems: "center", paddingTop: Platform.OS === "android" ? 18 : 0, paddingHorizontal: 10, marginBottom: 16, height: 56 },
    homeBtn: {
      minWidth: 72,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(13,31,56,0.85)" : "rgba(79,140,255,0.12)",
      borderWidth: 1,
      borderColor: colors.border,
      marginRight: 2,
      paddingHorizontal: 14,
    },
    homeBtnText: { color: colors.blue, fontSize: 13, fontWeight: "700" },
    headerTitle: { flex: 1, textAlign: "center", color: colors.text, fontWeight: "700", fontSize: 18, letterSpacing: 0.5 },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 20,
      backgroundColor: isDark ? "rgba(4,12,24,0.88)" : "rgba(238,243,251,0.88)",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    loadingCard: {
      width: "100%",
      maxWidth: 320,
      borderRadius: 18,
      paddingVertical: 22,
      paddingHorizontal: 18,
      alignItems: "center",
      backgroundColor: isDark ? "rgba(13,31,56,0.95)" : "rgba(255,255,255,0.98)",
      borderWidth: 1,
      borderColor: colors.border,
    },
    loadingTitle: { color: colors.text, fontSize: 16, fontWeight: "800", marginTop: 12 },
    loadingSubtitle: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
    scroll: { paddingHorizontal: 18, paddingBottom: 32 },
    cardMain: { alignItems: "center", marginBottom: 22 },
    iconCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: isDark ? "rgba(79,140,255,0.13)" : "rgba(79,140,255,0.14)", alignItems: "center", justifyContent: "center", marginBottom: 10 },
    iconMain: { fontSize: 28, color: colors.blue },
    cardTitle: { color: colors.text, fontWeight: "700", fontSize: 17, marginBottom: 4, textAlign: "center" },
    cardSubtitle: { color: colors.textMuted, fontSize: 14, marginBottom: 18, textAlign: "center" },
    supportedText: { color: colors.textFaint, fontSize: 12, marginTop: 2, textAlign: "center" },
    cardSecondary: { marginBottom: 18 },
    sectionHeaderRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 },
    countPill: { color: colors.blue, backgroundColor: isDark ? "rgba(79,140,255,0.12)" : "rgba(79,140,255,0.16)", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, fontSize: 12, fontWeight: "700" },
    cardTitleSmall: { color: colors.text, fontWeight: "700", fontSize: 15, marginBottom: 2 },
    cardSubtitleSmall: { color: colors.textMuted, fontSize: 13 },
    contactList: { marginTop: 4 },
    manualList: { marginTop: 10 },
    contactRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "rgba(148,163,184,0.14)" : "rgba(16,33,61,0.1)",
    },
    contactName: { color: colors.text, fontSize: 13, fontWeight: "700" },
    contactMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
    contactSource: { color: colors.textFaint, fontSize: 11, marginLeft: 10 },
    tipsText: { color: colors.textFaint, fontSize: 12, marginTop: 10, textAlign: "center", lineHeight: 16, marginBottom: 12 },
    inputLabel: { color: colors.textMuted, fontSize: 13, marginBottom: 6, fontWeight: "600" },
    input: {
      backgroundColor: isDark ? "#0F172A" : "#F8FAFC",
      color: colors.text,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? "#334155" : "rgba(16,33,61,0.14)",
    },
    actionRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    removeChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: isDark ? "rgba(239,68,68,0.12)" : "rgba(239,68,68,0.1)" },
    removeChipText: { color: isDark ? "#FCA5A5" : "#b91c1c", fontSize: 12, fontWeight: "700" },
  });
}