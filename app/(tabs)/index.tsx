import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { SearchInput } from "@/components/ui/SearchInput";
import { form16Fields } from "@/data/content";
import Colors from "@/constants/colors";

const SPECIMEN_FIELDS = form16Fields.map((f, i) => ({
  ...f,
  row: i,
}));

function SpecimenRow({ field, onPress, colors }: { field: typeof SPECIMEN_FIELDS[0]; onPress: () => void; colors: any }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.specimenRow,
        {
          backgroundColor: pressed ? colors.chipBg : colors.cardBg,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={[styles.specimenKey, { backgroundColor: colors.tint }]}>
        <Text style={styles.specimenKeyText}>{field.specimenKey}</Text>
      </View>
      <View style={styles.specimenContent}>
        <Text style={[styles.specimenLabel, { color: colors.text }]} numberOfLines={1}>
          {field.label}
        </Text>
        <Text style={[styles.specimenPart, { color: colors.textSecondary }]}>{field.partLabel}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
    </Pressable>
  );
}

export default function Form16ExplorerScreen() {
  const { colors, isDark } = useTheme();
  const { hasSeenDisclaimer, setDisclaimerSeen } = useApp();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  useEffect(() => {
    if (!hasSeenDisclaimer) {
      setShowDisclaimer(true);
    }
  }, [hasSeenDisclaimer]);

  const filtered = search.trim()
    ? SPECIMEN_FIELDS.filter(
        (f) =>
          f.label.toLowerCase().includes(search.toLowerCase()) ||
          f.description.toLowerCase().includes(search.toLowerCase())
      )
    : SPECIMEN_FIELDS;

  const handleFieldPress = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/form16/[id]", params: { id } });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 12 }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Form 16 Explorer</Text>
            <Text style={styles.headerSubtitle}>Tap any field to learn more</Text>
          </View>
          <Pressable onPress={() => router.push("/settings")} hitSlop={12}>
            <Ionicons name="settings-outline" size={22} color="rgba(255,255,255,0.8)" />
          </Pressable>
        </View>
        <View style={styles.searchWrapper}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search fields (HRA, 80C, TDS...)" />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quickActions}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/regime");
            }}
            style={({ pressed }) => [
              styles.quickCard,
              { backgroundColor: Colors.palette.teal + "12", borderColor: Colors.palette.teal + "30", opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Ionicons name="git-compare-outline" size={20} color={Colors.palette.teal} />
            <Text style={[styles.quickText, { color: Colors.palette.teal }]}>Old vs New Regime</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push("/bookmarks");
            }}
            style={({ pressed }) => [
              styles.quickCard,
              { backgroundColor: Colors.palette.gold + "12", borderColor: Colors.palette.gold + "30", opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Ionicons name="bookmark-outline" size={20} color={Colors.palette.gold} />
            <Text style={[styles.quickText, { color: Colors.palette.gold }]}>Saved Items</Text>
          </Pressable>
        </View>

        <View style={[styles.specimenHeader, { borderColor: colors.border, backgroundColor: colors.cardBg }]}>
          <View style={styles.specimenHeaderRow}>
            <Text style={[styles.specimenHeaderTitle, { color: colors.tint }]}>FORM NO. 16</Text>
            <View style={[styles.badge, { backgroundColor: colors.chipBg }]}>
              <Text style={[styles.badgeText, { color: colors.tint }]}>SPECIMEN</Text>
            </View>
          </View>
          <Text style={[styles.specimenHeaderSub, { color: colors.textSecondary }]}>
            Certificate under section 203 of the Income-tax Act, 1961
          </Text>
        </View>

        {filtered.map((field) => (
          <SpecimenRow
            key={field.id}
            field={field}
            onPress={() => handleFieldPress(field.id)}
            colors={colors}
          />
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={40} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No fields match your search</Text>
          </View>
        )}
      </ScrollView>

      <Modal visible={showDisclaimer} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={[styles.disclaimerIcon, { backgroundColor: Colors.palette.teal + "15" }]}>
              <Ionicons name="shield-checkmark" size={40} color={Colors.palette.teal} />
            </View>
            <Text style={[styles.disclaimerTitle, { color: colors.text }]}>Welcome to Taxaltus</Text>
            <Text style={[styles.disclaimerBody, { color: colors.textSecondary }]}>
              Taxaltus provides educational information only and does not offer tax advice. For personal tax filing decisions, consult a qualified professional or official government resources.
            </Text>
            <Text style={[styles.disclaimerNote, { color: colors.textSecondary }]}>
              This app never asks for personal financial data, PAN, Aadhaar, or salary details.
            </Text>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setDisclaimerSeen();
                setShowDisclaimer(false);
              }}
              style={({ pressed }) => [
                styles.disclaimerBtn,
                { backgroundColor: Colors.palette.teal, opacity: pressed ? 0.9 : 1 },
              ]}
            >
              <Text style={styles.disclaimerBtnText}>I Understand</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  searchWrapper: {
    marginBottom: 4,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  specimenHeader: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  specimenHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specimenHeaderTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  specimenHeaderSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 6,
  },
  specimenRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 8,
  },
  specimenKey: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  specimenKeyText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  specimenContent: {
    flex: 1,
  },
  specimenLabel: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  specimenPart: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  quickCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  quickText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 24,
    padding: 28,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
  },
  disclaimerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
    textAlign: "center",
  },
  disclaimerBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 12,
  },
  disclaimerNote: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 24,
    fontStyle: "italic",
  },
  disclaimerBtn: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
  },
  disclaimerBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
