import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { SearchInput } from "@/components/ui/SearchInput";
import { form16Fields } from "@/data/content";
import { getTodaysTip } from "@/data/daily-tips";
import Colors from "@/constants/colors";

const SPECIMEN_FIELDS = form16Fields.map((f, i) => ({
  ...f,
  row: i,
}));

const QUICK_ACTIONS = [
  { label: "Old vs New", icon: "git-compare-outline" as const, route: "/regime", gradient: Colors.gradients.teal },
  { label: "Checklist", icon: "checkbox-outline" as const, route: "/checklist", gradient: Colors.gradients.indigo },
  { label: "Quiz", icon: "help-circle-outline" as const, route: "/learn/quiz", gradient: Colors.gradients.sunset },
  { label: "Saved", icon: "bookmark-outline" as const, route: "/bookmarks", gradient: Colors.gradients.purple },
];

const FIELD_COLORS = [
  Colors.palette.teal,
  Colors.palette.indigo,
  Colors.palette.gold,
  Colors.palette.pink,
  Colors.palette.purple,
  Colors.palette.cyan,
  Colors.palette.orange,
  Colors.palette.emerald,
];

function SpecimenRow({ field, index, onPress, colors }: { field: typeof SPECIMEN_FIELDS[0]; index: number; onPress: () => void; colors: any }) {
  const accentColor = FIELD_COLORS[index % FIELD_COLORS.length];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.specimenRow,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.border,
          borderLeftColor: accentColor,
          borderLeftWidth: 3,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={[styles.specimenKey, { backgroundColor: accentColor }]}>
        <Text style={styles.specimenKeyText}>{field.specimenKey}</Text>
      </View>
      <View style={styles.specimenContent}>
        <Text style={[styles.specimenLabel, { color: colors.text }]} numberOfLines={1}>
          {field.label}
        </Text>
        <Text style={[styles.specimenPart, { color: colors.textSecondary }]}>{field.partLabel}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={accentColor + "80"} />
    </Pressable>
  );
}

export default function Form16ExplorerScreen() {
  const { colors, isDark } = useTheme();
  const { hasSeenDisclaimer, setDisclaimerSeen } = useApp();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const todayTip = getTodaysTip();

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={Colors.gradients.headerVibrant as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: (Platform.OS === "web" ? 67 : insets.top) + 12 }]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>{getGreeting()} 👋</Text>
            <Text style={styles.headerTitle}>Taxaltus</Text>
          </View>
          <Pressable
            onPress={() => router.push("/settings")}
            hitSlop={12}
            style={({ pressed }) => [styles.settingsBtn, { opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons name="settings-outline" size={22} color="rgba(255,255,255,0.85)" />
          </Pressable>
        </View>
        <View style={styles.searchWrapper}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search fields (HRA, 80C, TDS...)" />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          style={styles.tipCardWrapper}
        >
          <LinearGradient
            colors={Colors.gradients.ocean as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tipCard}
          >
            <View style={styles.tipHeader}>
              <Text style={styles.tipEmoji}>{todayTip.emoji}</Text>
              <View style={styles.tipBadge}>
                <Text style={styles.tipBadgeText}>TIP OF THE DAY</Text>
              </View>
            </View>
            <Text style={styles.tipText}>{todayTip.tip}</Text>
            <Text style={styles.tipCategory}>{todayTip.category}</Text>
          </LinearGradient>
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickScroll} contentContainerStyle={styles.quickScrollContent}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.route}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push(action.route as any);
              }}
              style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.95 : 1 }] }]}
            >
              <LinearGradient
                colors={action.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickCard}
              >
                <Ionicons name={action.icon} size={22} color="#fff" />
                <Text style={styles.quickText}>{action.label}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.specimenHeader, { borderColor: colors.border, backgroundColor: colors.cardBg }]}>
          <View style={styles.specimenHeaderRow}>
            <View style={styles.specimenHeaderLeft}>
              <View style={[styles.formBadge, { backgroundColor: Colors.palette.teal }]}>
                <Ionicons name="document-text" size={14} color="#fff" />
              </View>
              <Text style={[styles.specimenHeaderTitle, { color: colors.tint }]}>FORM NO. 16</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: Colors.palette.gold + "15" }]}>
              <Text style={[styles.badgeText, { color: Colors.palette.gold }]}>SPECIMEN</Text>
            </View>
          </View>
          <Text style={[styles.specimenHeaderSub, { color: colors.textSecondary }]}>
            Certificate under section 203 of the Income-tax Act, 1961
          </Text>
        </View>

        {filtered.map((field, index) => (
          <SpecimenRow
            key={field.id}
            field={field}
            index={index}
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
            <LinearGradient
              colors={Colors.gradients.teal as any}
              style={styles.disclaimerIconGradient}
            >
              <Ionicons name="shield-checkmark" size={36} color="#fff" />
            </LinearGradient>
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
              style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.97 : 1 }], width: "100%" }]}
            >
              <LinearGradient
                colors={Colors.gradients.teal as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.disclaimerBtn}
              >
                <Text style={styles.disclaimerBtnText}>I Understand</Text>
              </LinearGradient>
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
  greeting: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.7)",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchWrapper: {
    marginBottom: 4,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tipCardWrapper: {
    marginBottom: 16,
  },
  tipCard: {
    borderRadius: 20,
    padding: 18,
  },
  tipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tipEmoji: {
    fontSize: 28,
  },
  tipBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tipBadgeText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: 1,
  },
  tipText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#fff",
    lineHeight: 22,
    marginBottom: 8,
  },
  tipCategory: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  quickScroll: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  quickScrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  quickCard: {
    width: 90,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  quickText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
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
  specimenHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  formBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  specimenHeaderTitle: {
    fontSize: 16,
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
    marginTop: 8,
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
  disclaimerIconGradient: {
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
