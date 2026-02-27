import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

const SOURCES = [
  { label: "Income Tax Department of India", url: "https://www.incometax.gov.in" },
  { label: "CBDT (Central Board of Direct Taxes)", url: "https://www.incometax.gov.in/iec/foportal" },
  { label: "EPFO (Employees Provident Fund)", url: "https://www.epfindia.gov.in" },
  { label: "Income Tax Act, 1961", url: "https://www.incometax.gov.in" },
];

export default function SettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={[styles.disclaimerIcon, { backgroundColor: Colors.palette.teal + "15" }]}>
            <Ionicons name="shield-checkmark" size={28} color={Colors.palette.teal} />
          </View>
          <Text style={[styles.cardLabel, { color: colors.tint }]}>Disclaimer</Text>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>
            Taxaltus provides educational information only and does not offer tax advice. For personal tax filing decisions, consult a qualified professional or official government resources.
          </Text>
          <Text style={[styles.bodyTextSmall, { color: colors.textSecondary }]}>
            This app never asks for salary amounts, PAN, Aadhaar, employer details, or Form 16 uploads. It does not compute user-specific tax. All examples use generic, illustrative numbers.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Official Sources</Text>
        {SOURCES.map((source, i) => (
          <Pressable
            key={i}
            onPress={() => Linking.openURL(source.url)}
            style={({ pressed }) => [
              styles.sourceItem,
              { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <View style={styles.sourceContent}>
              <Ionicons name="globe-outline" size={18} color={colors.tint} />
              <Text style={[styles.sourceText, { color: colors.text }]}>{source.label}</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={colors.textSecondary} />
          </Pressable>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>App</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Taxaltus</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Version</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Purpose</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Education Only</Text>
          </View>
          <View style={[styles.aboutRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Content</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Offline-first, no tracking</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  disclaimerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    marginBottom: 10,
  },
  bodyTextSmall: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  sourceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  sourceContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  sourceText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  aboutLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  aboutValue: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
});
