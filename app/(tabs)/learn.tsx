import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

const FLOW_STEPS = [
  { label: "Gross Salary", icon: "wallet-outline" as const, desc: "Total salary from employer" },
  { label: "Exemptions", icon: "remove-circle-outline" as const, desc: "HRA, LTA and other exempt allowances" },
  { label: "Standard Deduction", icon: "cut-outline" as const, desc: "Flat 75,000 / 50,000 deduction" },
  { label: "Chapter VI-A", icon: "layers-outline" as const, desc: "80C, 80D, NPS and other deductions" },
  { label: "Taxable Income", icon: "calculator-outline" as const, desc: "Income on which tax is computed" },
  { label: "Tax + Cess", icon: "receipt-outline" as const, desc: "Slab rate tax plus 4% cess" },
  { label: "TDS Adjusted", icon: "checkmark-circle-outline" as const, desc: "Tax already deducted by employer" },
];

const KEY_DATES = [
  { date: "Jun 15", label: "Advance Tax (15%)", desc: "First installment of advance tax due" },
  { date: "Jul 31", label: "ITR Due Date (Salaried)", desc: "Deadline for filing income tax return" },
  { date: "Sep 15", label: "Advance Tax (45%)", desc: "Second installment of advance tax due" },
  { date: "Dec 15", label: "Advance Tax (75%)", desc: "Third installment of advance tax due" },
  { date: "Dec 31", label: "Belated/Revised Return", desc: "Last date for belated or revised return" },
  { date: "Mar 15", label: "Advance Tax (100%)", desc: "Final installment of advance tax due" },
  { date: "Mar 31", label: "FY Ends", desc: "Last day to make tax-saving investments" },
  { date: "Jun 15*", label: "Form 16 Issued", desc: "Employer issues Form 16 by this date" },
];

const TDS_STEPS = [
  { step: "1", title: "Employer Estimates", desc: "At start of FY, employer estimates your annual tax based on declared investments" },
  { step: "2", title: "Monthly Deduction", desc: "Tax is divided equally across 12 months and deducted from salary each month" },
  { step: "3", title: "Proof Submission", desc: "Employee submits investment proofs (usually Jan-Mar). Employer recalculates TDS" },
  { step: "4", title: "Deposit to Govt", desc: "Employer deposits TDS with government by 7th of next month" },
  { step: "5", title: "Form 16 Issued", desc: "After FY ends, employer issues Form 16 certificate by June 15" },
  { step: "6", title: "ITR Filing", desc: "Employee files return, adjusts for any additional income/refund" },
];

export default function LearnScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 12 }]}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>Visual guides and interactive quizzes</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/estimator");
          }}
          style={({ pressed }) => [
            styles.estimatorBanner,
            { opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <View style={styles.estimatorBannerLeft}>
            <Ionicons name="calculator" size={22} color="#fff" />
            <View>
              <Text style={styles.estimatorBannerTitle}>Tax Estimator</Text>
              <Text style={styles.estimatorBannerSub}>Enter income, compare old vs new tax</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.7)" />
        </Pressable>

        <View style={styles.actionCards}>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/learn/quiz");
            }}
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: Colors.palette.teal, opacity: pressed ? 0.92 : 1 },
            ]}
          >
            <Ionicons name="help-circle" size={24} color="#fff" />
            <Text style={styles.actionCardTitle}>Tax Quiz</Text>
            <Text style={styles.actionCardSub}>10 questions</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/regime");
            }}
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: Colors.palette.gold, opacity: pressed ? 0.92 : 1 },
            ]}
          >
            <Ionicons name="git-compare-outline" size={24} color="#fff" />
            <Text style={styles.actionCardTitle}>Old vs New</Text>
            <Text style={styles.actionCardSub}>Regime</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/checklist");
            }}
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: "#6366F1", opacity: pressed ? 0.92 : 1 },
            ]}
          >
            <Ionicons name="checkbox-outline" size={24} color="#fff" />
            <Text style={styles.actionCardTitle}>Checklist</Text>
            <Text style={styles.actionCardSub}>Tax prep</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/itr-selector");
          }}
          style={({ pressed }) => [
            styles.itrBanner,
            { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <View style={[styles.itrBannerIcon, { backgroundColor: "#6366F1" + "15" }]}>
            <Ionicons name="document-text-outline" size={22} color="#6366F1" />
          </View>
          <View style={styles.itrBannerText}>
            <Text style={[styles.itrBannerTitle, { color: colors.text }]}>ITR Form Selector</Text>
            <Text style={[styles.itrBannerSub, { color: colors.textSecondary }]}>
              Find the right ITR form for your income
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/budget-changes");
          }}
          style={({ pressed }) => [
            styles.budgetBanner,
            { opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <View style={styles.budgetBannerLeft}>
            <Ionicons name="newspaper-outline" size={22} color="#fff" />
            <View>
              <Text style={styles.budgetBannerTitle}>What Changed This Year</Text>
              <Text style={styles.budgetBannerSub}>FY 2024-25 Budget highlights</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.7)" />
        </Pressable>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/investment-deadlines");
          }}
          style={({ pressed }) => [
            styles.deadlinesBanner,
            { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <View style={[styles.deadlinesBannerIcon, { backgroundColor: Colors.palette.teal + "15" }]}>
            <Ionicons name="calendar-outline" size={22} color={Colors.palette.teal} />
          </View>
          <View style={styles.deadlinesBannerText}>
            <Text style={[styles.deadlinesBannerTitle, { color: colors.text }]}>Investment Deadlines</Text>
            <Text style={[styles.deadlinesBannerSub, { color: colors.textSecondary }]}>
              Tax-saving deadlines & lock-in periods
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Flow of Salary Taxation</Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          How salary income is processed step by step to arrive at tax payable
        </Text>

        <View style={[styles.flowContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          {FLOW_STEPS.map((step, i) => (
            <View key={step.label}>
              <View style={styles.flowStep}>
                <View style={[styles.flowIcon, { backgroundColor: Colors.palette.teal + "15" }]}>
                  <Ionicons name={step.icon} size={20} color={Colors.palette.teal} />
                </View>
                <View style={styles.flowText}>
                  <Text style={[styles.flowLabel, { color: colors.text }]}>{step.label}</Text>
                  <Text style={[styles.flowDesc, { color: colors.textSecondary }]}>{step.desc}</Text>
                </View>
              </View>
              {i < FLOW_STEPS.length - 1 && (
                <View style={styles.flowConnector}>
                  <View style={[styles.flowLine, { backgroundColor: Colors.palette.teal + "30" }]} />
                  <Ionicons name="arrow-down" size={14} color={Colors.palette.teal + "60"} />
                </View>
              )}
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>TDS Lifecycle</Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          What happens behind the scenes with your tax deduction
        </Text>

        {TDS_STEPS.map((step, i) => (
          <View
            key={step.step}
            style={[styles.tdsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
          >
            <View style={[styles.tdsStep, { backgroundColor: Colors.palette.gold + "15" }]}>
              <Text style={[styles.tdsStepText, { color: Colors.palette.gold }]}>{step.step}</Text>
            </View>
            <View style={styles.tdsContent}>
              <Text style={[styles.tdsTitle, { color: colors.text }]}>{step.title}</Text>
              <Text style={[styles.tdsDesc, { color: colors.textSecondary }]}>{step.desc}</Text>
            </View>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 18 }]}>Key Tax Dates</Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          Important deadlines for salaried taxpayers during a financial year
        </Text>

        <View style={[styles.datesContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          {KEY_DATES.map((d, i) => (
            <View key={i} style={[styles.dateRow, i < KEY_DATES.length - 1 && { borderBottomWidth: 1, borderColor: colors.border }]}>
              <View style={[styles.dateBadge, { backgroundColor: "#6366F1" + "15" }]}>
                <Text style={[styles.dateText, { color: "#6366F1" }]}>{d.date}</Text>
              </View>
              <View style={styles.dateContent}>
                <Text style={[styles.dateLabel, { color: colors.text }]}>{d.label}</Text>
                <Text style={[styles.dateDesc, { color: colors.textSecondary }]}>{d.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  estimatorBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.palette.teal,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  estimatorBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  estimatorBannerTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  estimatorBannerSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    marginTop: 1,
  },
  actionCards: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  budgetBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6366F1",
    borderRadius: 14,
    padding: 16,
    marginBottom: 28,
  },
  budgetBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  budgetBannerTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  budgetBannerSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
    marginTop: 1,
  },
  itrBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 28,
    gap: 12,
  },
  itrBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  itrBannerText: {
    flex: 1,
  },
  itrBannerTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  itrBannerSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  actionCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  actionCardTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    marginTop: 4,
  },
  actionCardSub: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.75)",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    marginBottom: 14,
  },
  flowContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 28,
  },
  flowStep: {
    flexDirection: "row",
    alignItems: "center",
  },
  flowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  flowText: { flex: 1 },
  flowLabel: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  flowDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 1,
  },
  flowConnector: {
    alignItems: "center",
    paddingLeft: 13,
    paddingVertical: 2,
  },
  flowLine: {
    width: 2,
    height: 10,
  },
  tdsCard: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    alignItems: "center",
  },
  tdsStep: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  tdsStepText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  tdsContent: { flex: 1 },
  tdsTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  tdsDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  datesContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 14,
    minWidth: 64,
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
  dateContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 1,
  },
  dateDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  deadlinesBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 28,
    gap: 12,
  },
  deadlinesBannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  deadlinesBannerText: {
    flex: 1,
  },
  deadlinesBannerTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  deadlinesBannerSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
});
