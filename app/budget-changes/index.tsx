import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

interface BudgetChange {
  title: string;
  category: string;
  categoryColor: string;
  impact: "positive" | "negative" | "neutral";
  before?: string;
  after?: string;
  description: string;
}

const BUDGET_CHANGES: BudgetChange[] = [
  {
    title: "Standard Deduction Increased (New Regime)",
    category: "Deductions",
    categoryColor: Colors.palette.teal,
    impact: "positive",
    before: "₹50,000",
    after: "₹75,000",
    description: "Salaried employees and pensioners under the new regime get a higher standard deduction, reducing taxable income by an additional ₹25,000.",
  },
  {
    title: "Revised Tax Slabs (New Regime)",
    category: "Tax Slabs",
    categoryColor: Colors.palette.teal,
    impact: "positive",
    before: "0-3L: Nil, 3-6L: 5%, 6-9L: 10%, 9-12L: 15%, 12-15L: 20%, 15L+: 30%",
    after: "0-3L: Nil, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, 15L+: 30%",
    description: "The 5% slab extended to ₹7L (from ₹6L) and 10% slab starts at ₹7L. This benefits taxpayers with income between ₹7-10L the most.",
  },
  {
    title: "Family Pension Deduction Increased",
    category: "Deductions",
    categoryColor: Colors.palette.teal,
    impact: "positive",
    before: "₹15,000",
    after: "₹25,000",
    description: "Deduction on family pension under the new regime increased from ₹15,000 to ₹25,000.",
  },
  {
    title: "Long-Term Capital Gains Tax Increased",
    category: "Capital Gains",
    categoryColor: "#6366F1",
    impact: "negative",
    before: "10%",
    after: "12.5%",
    description: "LTCG on equity and equity mutual funds above ₹1.25L (exemption limit also raised from ₹1L) now taxed at 12.5% instead of 10%.",
  },
  {
    title: "Short-Term Capital Gains on Equity Increased",
    category: "Capital Gains",
    categoryColor: "#6366F1",
    impact: "negative",
    before: "15%",
    after: "20%",
    description: "STCG on listed equity shares and equity-oriented mutual funds increased from 15% to 20%.",
  },
  {
    title: "STT on F&O Increased",
    category: "Capital Gains",
    categoryColor: "#6366F1",
    impact: "negative",
    before: "Lower rates",
    after: "Higher rates",
    description: "Securities Transaction Tax on futures and options has been increased to discourage speculative trading in derivatives.",
  },
  {
    title: "NPS Employer Contribution Limit (Central Govt)",
    category: "NPS",
    categoryColor: Colors.palette.gold,
    impact: "positive",
    before: "10% of salary",
    after: "14% of salary",
    description: "Central government employees can now claim deduction on employer NPS contribution up to 14% of salary (basic + DA) under Section 80CCD(2).",
  },
  {
    title: "Angel Tax Abolished",
    category: "Startups",
    categoryColor: Colors.palette.success,
    impact: "positive",
    description: "Angel tax on startups has been abolished for all categories of investors, providing relief to the startup ecosystem.",
  },
  {
    title: "Buyback Tax Changed",
    category: "Capital Gains",
    categoryColor: "#6366F1",
    impact: "negative",
    description: "Share buyback proceeds are now taxed in the hands of shareholders as dividend income, instead of the company paying buyback tax. This could increase tax liability for investors.",
  },
];

function ImpactBadge({ impact }: { impact: "positive" | "negative" | "neutral" }) {
  const config = {
    positive: { icon: "trending-up" as const, color: Colors.palette.success, label: "Beneficial", bg: Colors.palette.success + "15" },
    negative: { icon: "trending-down" as const, color: Colors.palette.danger, label: "Higher Tax", bg: Colors.palette.danger + "15" },
    neutral: { icon: "swap-horizontal" as const, color: Colors.palette.slate, label: "Neutral", bg: Colors.palette.slate + "15" },
  };
  const c = config[impact];
  return (
    <View style={[styles.impactBadge, { backgroundColor: c.bg }]}>
      <Ionicons name={c.icon} size={12} color={c.color} />
      <Text style={[styles.impactText, { color: c.color }]}>{c.label}</Text>
    </View>
  );
}

export default function BudgetChangesScreen() {
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
          <Text style={styles.headerTitle}>Budget 2024 Changes</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerSubtitle}>FY 2024-25 (AY 2025-26) Key Updates</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.summaryBanner, { backgroundColor: Colors.palette.teal + "10", borderColor: Colors.palette.teal + "30" }]}>
          <Ionicons name="newspaper-outline" size={20} color={Colors.palette.teal} />
          <View style={styles.summaryContent}>
            <Text style={[styles.summaryTitle, { color: colors.text }]}>Union Budget 2024 Highlights</Text>
            <Text style={[styles.summaryDesc, { color: colors.textSecondary }]}>
              Key changes affecting salaried taxpayers and investors for FY 2024-25
            </Text>
          </View>
        </View>

        {BUDGET_CHANGES.map((change, index) => (
          <View
            key={index}
            style={[styles.changeCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
          >
            <View style={styles.changeHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: change.categoryColor + "12" }]}>
                <Text style={[styles.categoryText, { color: change.categoryColor }]}>{change.category}</Text>
              </View>
              <ImpactBadge impact={change.impact} />
            </View>

            <Text style={[styles.changeTitle, { color: colors.text }]}>{change.title}</Text>
            <Text style={[styles.changeDesc, { color: colors.textSecondary }]}>{change.description}</Text>

            {change.before && change.after && (
              <View style={[styles.comparisonContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <View style={styles.comparisonSide}>
                  <Text style={[styles.comparisonLabel, { color: Colors.palette.danger }]}>Before</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{change.before}</Text>
                </View>
                <View style={[styles.comparisonArrow, { backgroundColor: Colors.palette.teal + "15" }]}>
                  <Ionicons name="arrow-forward" size={16} color={Colors.palette.teal} />
                </View>
                <View style={styles.comparisonSide}>
                  <Text style={[styles.comparisonLabel, { color: Colors.palette.success }]}>After</Text>
                  <Text style={[styles.comparisonValue, { color: colors.text }]}>{change.after}</Text>
                </View>
              </View>
            )}
          </View>
        ))}

        <View style={[styles.footerNote, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.palette.gold} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            This summary covers major changes from Union Budget 2024 relevant to individual taxpayers. For complete details, refer to the Finance Act 2024 and CBDT notifications.
          </Text>
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
    marginBottom: 4,
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
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryBanner: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  summaryDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  changeCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  changeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
  impactBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  changeTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
    lineHeight: 22,
  },
  changeDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  comparisonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  comparisonSide: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  comparisonLabel: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  comparisonValue: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    lineHeight: 18,
  },
  comparisonArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  footerNote: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    alignItems: "flex-start",
  },
  footerText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    flex: 1,
  },
});
