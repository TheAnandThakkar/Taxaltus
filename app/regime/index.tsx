import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

const OLD_SLABS = [
  { range: "Up to 2,50,000", rate: "Nil" },
  { range: "2,50,001 - 5,00,000", rate: "5%" },
  { range: "5,00,001 - 10,00,000", rate: "20%" },
  { range: "Above 10,00,000", rate: "30%" },
];

const NEW_SLABS = [
  { range: "Up to 3,00,000", rate: "Nil" },
  { range: "3,00,001 - 7,00,000", rate: "5%" },
  { range: "7,00,001 - 10,00,000", rate: "10%" },
  { range: "10,00,001 - 12,00,000", rate: "15%" },
  { range: "12,00,001 - 15,00,000", rate: "20%" },
  { range: "Above 15,00,000", rate: "30%" },
];

const COMPARISON = [
  { feature: "Standard Deduction", old: "50,000", new: "75,000" },
  { feature: "HRA Exemption", old: "Available", new: "Not available" },
  { feature: "Section 80C (1.5L)", old: "Available", new: "Not available" },
  { feature: "Section 80D (Health)", old: "Available", new: "Not available" },
  { feature: "Section 80CCD(1B) NPS", old: "Available", new: "Not available" },
  { feature: "Section 80CCD(2) Employer NPS", old: "Available", new: "Available" },
  { feature: "Section 80G Donations", old: "Available", new: "Not available" },
  { feature: "Section 80E Education Loan", old: "Available", new: "Not available" },
  { feature: "Section 80TTA (10K interest)", old: "Available", new: "Not available" },
  { feature: "Home Loan Interest 24(b)", old: "Up to 2,00,000", new: "Not available (self-occupied)" },
  { feature: "LTA Exemption", old: "Available", new: "Not available" },
  { feature: "Professional Tax", old: "Deductible", new: "Deductible" },
  { feature: "Rebate u/s 87A", old: "Up to 12,500 (income <= 5L)", new: "Up to 25,000 (income <= 7L)" },
  { feature: "Default Regime", old: "Must opt-in", new: "Default from FY 2023-24" },
];

export default function RegimeComparisonScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const [activeTab, setActiveTab] = useState<"comparison" | "slabs">("comparison");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Old vs New Regime</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerSubtitle}>FY 2024-25 (AY 2025-26)</Text>

        <View style={[styles.tabBar, { backgroundColor: "rgba(255,255,255,0.12)" }]}>
          <Pressable
            onPress={() => setActiveTab("comparison")}
            style={[styles.tab, activeTab === "comparison" && { backgroundColor: Colors.palette.teal }]}
          >
            <Text style={[styles.tabText, activeTab === "comparison" && styles.tabTextActive]}>Comparison</Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("slabs")}
            style={[styles.tab, activeTab === "slabs" && { backgroundColor: Colors.palette.teal }]}
          >
            <Text style={[styles.tabText, activeTab === "slabs" && styles.tabTextActive]}>Tax Slabs</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "comparison" && (
          <>
            <View style={[styles.infoCard, { backgroundColor: Colors.palette.gold + "12", borderColor: Colors.palette.gold + "30" }]}>
              <Ionicons name="information-circle" size={18} color={Colors.palette.gold} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                The new tax regime is the default from FY 2023-24. To opt for the old regime, you must explicitly select it when filing your return.
              </Text>
            </View>

            <View style={[styles.tableHeader, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={[styles.colHeader, styles.featureCol, { color: colors.textSecondary }]}>Feature</Text>
              <Text style={[styles.colHeader, styles.regimeCol, { color: Colors.palette.gold }]}>Old</Text>
              <Text style={[styles.colHeader, styles.regimeCol, { color: Colors.palette.teal }]}>New</Text>
            </View>

            {COMPARISON.map((row, i) => (
              <View
                key={i}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor: i % 2 === 0 ? colors.cardBg : colors.background,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.featureText, styles.featureCol, { color: colors.text }]}>{row.feature}</Text>
                <Text style={[styles.valueText, styles.regimeCol, { color: row.old.includes("Not") ? Colors.palette.danger : colors.text }]}>
                  {row.old}
                </Text>
                <Text style={[styles.valueText, styles.regimeCol, { color: row.new.includes("Not") ? Colors.palette.danger : colors.text }]}>
                  {row.new}
                </Text>
              </View>
            ))}
          </>
        )}

        {activeTab === "slabs" && (
          <>
            <Text style={[styles.slabTitle, { color: Colors.palette.teal }]}>New Tax Regime (Default)</Text>
            <Text style={[styles.slabNote, { color: colors.textSecondary }]}>FY 2024-25 onwards</Text>
            <View style={[styles.slabTable, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View style={[styles.slabHeaderRow, { borderColor: colors.border }]}>
                <Text style={[styles.slabHeaderText, { color: colors.textSecondary }]}>Income Range</Text>
                <Text style={[styles.slabHeaderText, { color: colors.textSecondary }]}>Tax Rate</Text>
              </View>
              {NEW_SLABS.map((slab, i) => (
                <View key={i} style={[styles.slabRow, i < NEW_SLABS.length - 1 && { borderBottomWidth: 1, borderColor: colors.border }]}>
                  <Text style={[styles.slabRange, { color: colors.text }]}>{slab.range}</Text>
                  <View style={[styles.rateBadge, { backgroundColor: slab.rate === "Nil" ? Colors.palette.teal + "15" : Colors.palette.gold + "15" }]}>
                    <Text style={[styles.rateText, { color: slab.rate === "Nil" ? Colors.palette.teal : Colors.palette.gold }]}>
                      {slab.rate}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={[styles.slabTitle, { color: Colors.palette.gold, marginTop: 24 }]}>Old Tax Regime</Text>
            <Text style={[styles.slabNote, { color: colors.textSecondary }]}>With deductions & exemptions</Text>
            <View style={[styles.slabTable, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View style={[styles.slabHeaderRow, { borderColor: colors.border }]}>
                <Text style={[styles.slabHeaderText, { color: colors.textSecondary }]}>Income Range</Text>
                <Text style={[styles.slabHeaderText, { color: colors.textSecondary }]}>Tax Rate</Text>
              </View>
              {OLD_SLABS.map((slab, i) => (
                <View key={i} style={[styles.slabRow, i < OLD_SLABS.length - 1 && { borderBottomWidth: 1, borderColor: colors.border }]}>
                  <Text style={[styles.slabRange, { color: colors.text }]}>{slab.range}</Text>
                  <View style={[styles.rateBadge, { backgroundColor: slab.rate === "Nil" ? Colors.palette.teal + "15" : Colors.palette.gold + "15" }]}>
                    <Text style={[styles.rateText, { color: slab.rate === "Nil" ? Colors.palette.teal : Colors.palette.gold }]}>
                      {slab.rate}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={[styles.cessCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={[styles.cessLabel, { color: colors.tint }]}>Plus: Health & Education Cess</Text>
              <Text style={[styles.cessValue, { color: colors.text }]}>4% on total tax (both regimes)</Text>
            </View>

            <View style={[styles.cessCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Text style={[styles.cessLabel, { color: colors.tint }]}>Surcharge (if applicable)</Text>
              <Text style={[styles.cessValue, { color: colors.text }]}>
                10% (50L-1Cr) | 15% (1-2Cr) | 25% (above 2Cr, new regime max)
              </Text>
            </View>
          </>
        )}
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
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginBottom: 14,
  },
  tabBar: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  tabText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "rgba(255,255,255,0.6)",
  },
  tabTextActive: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  infoCard: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 2,
  },
  colHeader: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featureCol: {
    flex: 2,
  },
  regimeCol: {
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    alignItems: "center",
  },
  featureText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    lineHeight: 18,
  },
  valueText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 16,
  },
  slabTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  slabNote: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 12,
  },
  slabTable: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  slabHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  slabHeaderText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  slabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  slabRange: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  rateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rateText: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  cessCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 12,
  },
  cessLabel: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  cessValue: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
});
