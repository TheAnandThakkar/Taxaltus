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

const TDS_STEPS = [
  { step: "1", title: "Employer Estimates", desc: "At start of FY, employer estimates your annual tax based on declared investments" },
  { step: "2", title: "Monthly Deduction", desc: "Tax is divided equally across 12 months and deducted from salary each month" },
  { step: "3", title: "Proof Submission", desc: "Employee submits investment proofs (usually Jan-Mar). Employer recalculates TDS" },
  { step: "4", title: "Deposit to Govt", desc: "Employer deposits TDS with government by 7th of next month" },
  { step: "5", title: "Form 16 Issued", desc: "After FY ends, employer issues Form 16 certificate by June 15" },
  { step: "6", title: "ITR Filing", desc: "Employee files return, adjusts for any additional income/refund" },
];

export default function LearnScreen() {
  const { colors, isDark } = useTheme();
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
            router.push("/learn/quiz");
          }}
          style={({ pressed }) => [
            styles.quizCard,
            { backgroundColor: Colors.palette.teal, opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <View style={styles.quizCardContent}>
            <Ionicons name="help-circle" size={36} color="#fff" />
            <View style={styles.quizCardText}>
              <Text style={styles.quizTitle}>Quick Tax Quiz</Text>
              <Text style={styles.quizSubtitle}>Test your knowledge with 10 questions</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
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
  quizCard: {
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  quizCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  quizCardText: {},
  quizTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  quizSubtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
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
});
