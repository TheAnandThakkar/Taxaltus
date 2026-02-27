import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

const FLOW_STEPS = [
  { label: "Gross Salary", icon: "wallet-outline" as const, desc: "Total salary from employer", color: Colors.palette.teal },
  { label: "Exemptions", icon: "remove-circle-outline" as const, desc: "HRA, LTA and other exempt allowances", color: Colors.palette.indigo },
  { label: "Standard Deduction", icon: "cut-outline" as const, desc: "Flat 75,000 / 50,000 deduction", color: Colors.palette.gold },
  { label: "Chapter VI-A", icon: "layers-outline" as const, desc: "80C, 80D, NPS and other deductions", color: Colors.palette.pink },
  { label: "Taxable Income", icon: "calculator-outline" as const, desc: "Income on which tax is computed", color: Colors.palette.purple },
  { label: "Tax + Cess", icon: "receipt-outline" as const, desc: "Slab rate tax plus 4% cess", color: Colors.palette.orange },
  { label: "TDS Adjusted", icon: "checkmark-circle-outline" as const, desc: "Tax already deducted by employer", color: Colors.palette.emerald },
];

const KEY_DATES = [
  { date: "Jun 15", label: "Advance Tax (15%)", desc: "First installment of advance tax due", color: Colors.palette.teal },
  { date: "Jul 31", label: "ITR Due Date (Salaried)", desc: "Deadline for filing income tax return", color: Colors.palette.rose },
  { date: "Sep 15", label: "Advance Tax (45%)", desc: "Second installment of advance tax due", color: Colors.palette.indigo },
  { date: "Dec 15", label: "Advance Tax (75%)", desc: "Third installment of advance tax due", color: Colors.palette.gold },
  { date: "Dec 31", label: "Belated/Revised Return", desc: "Last date for belated or revised return", color: Colors.palette.pink },
  { date: "Mar 15", label: "Advance Tax (100%)", desc: "Final installment of advance tax due", color: Colors.palette.purple },
  { date: "Mar 31", label: "FY Ends", desc: "Last day to make tax-saving investments", color: Colors.palette.orange },
  { date: "Jun 15*", label: "Form 16 Issued", desc: "Employer issues Form 16 by this date", color: Colors.palette.cyan },
];

const TDS_STEPS = [
  { step: "1", title: "Employer Estimates", desc: "At start of FY, employer estimates your annual tax based on declared investments", color: Colors.palette.teal },
  { step: "2", title: "Monthly Deduction", desc: "Tax is divided equally across 12 months and deducted from salary each month", color: Colors.palette.gold },
  { step: "3", title: "Proof Submission", desc: "Employee submits investment proofs (usually Jan-Mar). Employer recalculates TDS", color: Colors.palette.indigo },
  { step: "4", title: "Deposit to Govt", desc: "Employer deposits TDS with government by 7th of next month", color: Colors.palette.pink },
  { step: "5", title: "Form 16 Issued", desc: "After FY ends, employer issues Form 16 certificate by June 15", color: Colors.palette.purple },
  { step: "6", title: "ITR Filing", desc: "Employee files return, adjusts for any additional income/refund", color: Colors.palette.emerald },
];

const ACTION_CARDS = [
  { label: "Tax Quiz", sub: "10 questions", icon: "help-circle" as const, gradient: Colors.gradients.teal, route: "/learn/quiz" },
  { label: "Old vs New", sub: "Regime", icon: "git-compare-outline" as const, gradient: Colors.gradients.sunset, route: "/regime" },
  { label: "Checklist", sub: "Tax prep", icon: "checkbox-outline" as const, gradient: Colors.gradients.candy, route: "/checklist" },
];

export default function LearnScreen() {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={Colors.gradients.headerVibrant as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: (Platform.OS === "web" ? 67 : insets.top) + 12 }]}
      >
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>Visual guides, quizzes & tax calendar</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.actionCards}>
          {ACTION_CARDS.map((card) => (
            <Pressable
              key={card.route}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push(card.route as any);
              }}
              style={({ pressed }) => [{ flex: 1, transform: [{ scale: pressed ? 0.95 : 1 }] }]}
            >
              <LinearGradient
                colors={card.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionCard}
              >
                <Ionicons name={card.icon} size={24} color="#fff" />
                <Text style={styles.actionCardTitle}>{card.label}</Text>
                <Text style={styles.actionCardSub}>{card.sub}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Flow of Salary Taxation</Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          How salary income is processed step by step to arrive at tax payable
        </Text>

        <View style={[styles.flowContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          {FLOW_STEPS.map((step, i) => (
            <View key={step.label}>
              <View style={styles.flowStep}>
                <View style={[styles.flowIcon, { backgroundColor: step.color + "15" }]}>
                  <Ionicons name={step.icon} size={20} color={step.color} />
                </View>
                <View style={styles.flowText}>
                  <Text style={[styles.flowLabel, { color: colors.text }]}>{step.label}</Text>
                  <Text style={[styles.flowDesc, { color: colors.textSecondary }]}>{step.desc}</Text>
                </View>
              </View>
              {i < FLOW_STEPS.length - 1 && (
                <View style={styles.flowConnector}>
                  <View style={[styles.flowLine, { backgroundColor: FLOW_STEPS[i + 1].color + "30" }]} />
                  <Ionicons name="arrow-down" size={14} color={FLOW_STEPS[i + 1].color + "60"} />
                </View>
              )}
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>TDS Lifecycle</Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          What happens behind the scenes with your tax deduction
        </Text>

        {TDS_STEPS.map((step) => (
          <View
            key={step.step}
            style={[styles.tdsCard, { backgroundColor: colors.cardBg, borderColor: colors.border, borderLeftColor: step.color, borderLeftWidth: 3 }]}
          >
            <View style={[styles.tdsStep, { backgroundColor: step.color + "15" }]}>
              <Text style={[styles.tdsStepText, { color: step.color }]}>{step.step}</Text>
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
              <View style={[styles.dateBadge, { backgroundColor: d.color + "15" }]}>
                <Text style={[styles.dateText, { color: d.color }]}>{d.date}</Text>
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
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  actionCards: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 28,
  },
  actionCard: {
    borderRadius: 16,
    padding: 14,
    gap: 4,
    minHeight: 100,
  },
  actionCardTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    marginTop: 6,
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
});
