import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

interface Deadline {
  month: string;
  date: string;
  title: string;
  section?: string;
  lockIn?: string;
  category: "advance-tax" | "investment" | "filing";
  urgent?: boolean;
}

const DEADLINES: Deadline[] = [
  {
    month: "Jun",
    date: "Jun 15",
    title: "Advance Tax - 1st Installment (15%)",
    section: "Section 208-211",
    category: "advance-tax",
  },
  {
    month: "Jul",
    date: "Jul 31",
    title: "ITR Filing Deadline (Salaried / Non-audit)",
    section: "Section 139(1)",
    category: "filing",
    urgent: true,
  },
  {
    month: "Sep",
    date: "Sep 15",
    title: "Advance Tax - 2nd Installment (45%)",
    section: "Section 208-211",
    category: "advance-tax",
  },
  {
    month: "Dec",
    date: "Dec 15",
    title: "Advance Tax - 3rd Installment (75%)",
    section: "Section 208-211",
    category: "advance-tax",
  },
  {
    month: "Dec",
    date: "Dec 31",
    title: "Belated / Revised Return Filing",
    section: "Section 139(4) / 139(5)",
    category: "filing",
  },
  {
    month: "Mar",
    date: "Mar 15",
    title: "Advance Tax - Final Installment (100%)",
    section: "Section 208-211",
    category: "advance-tax",
  },
  {
    month: "Mar",
    date: "Mar 31",
    title: "ELSS Investment for Section 80C",
    section: "Section 80C",
    lockIn: "3 years",
    category: "investment",
  },
  {
    month: "Mar",
    date: "Mar 31",
    title: "PPF Contribution Deadline",
    section: "Section 80C",
    lockIn: "15 years",
    category: "investment",
  },
  {
    month: "Mar",
    date: "Mar 31",
    title: "NPS Contribution for 80CCD(1B)",
    section: "Section 80CCD(1B)",
    lockIn: "Till age 60",
    category: "investment",
  },
  {
    month: "Mar",
    date: "Mar 31",
    title: "Tax-Saving Fixed Deposit",
    section: "Section 80C",
    lockIn: "5 years",
    category: "investment",
  },
  {
    month: "Mar",
    date: "Mar 31",
    title: "Health Insurance Premium (80D)",
    section: "Section 80D",
    category: "investment",
  },
];

const CATEGORY_CONFIG = {
  "advance-tax": { color: Colors.palette.gold, label: "Advance Tax", icon: "cash-outline" as const },
  investment: { color: Colors.palette.teal, label: "Investment", icon: "trending-up-outline" as const },
  filing: { color: "#6366F1", label: "Filing", icon: "document-text-outline" as const },
};

const LOCK_IN_DATA = [
  { instrument: "ELSS (Mutual Funds)", period: "3 years", section: "80C", maxLimit: "1,50,000" },
  { instrument: "Tax-Saving FD", period: "5 years", section: "80C", maxLimit: "1,50,000" },
  { instrument: "PPF", period: "15 years", section: "80C", maxLimit: "1,50,000" },
  { instrument: "NPS (Tier-I)", period: "Till age 60", section: "80CCD(1B)", maxLimit: "50,000 (extra)" },
  { instrument: "NSC", period: "5 years", section: "80C", maxLimit: "1,50,000" },
  { instrument: "SSY (Sukanya)", period: "21 years", section: "80C", maxLimit: "1,50,000" },
];

function getCurrentMonth(): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[new Date().getMonth()];
}

export default function InvestmentDeadlinesScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const currentMonth = getCurrentMonth();

  const monthOrder = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const currentMonthIdx = monthOrder.indexOf(currentMonth);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Investment Deadlines</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.headerSubtitle}>Tax-saving deadlines & lock-in periods</Text>

        <View style={styles.monthStrip}>
          {monthOrder.map((m, i) => {
            const isActive = i === currentMonthIdx;
            const isPast = i < currentMonthIdx;
            return (
              <View
                key={m}
                style={[
                  styles.monthDot,
                  isActive && { backgroundColor: Colors.palette.teal },
                  isPast && { backgroundColor: "rgba(255,255,255,0.25)" },
                  !isActive && !isPast && { backgroundColor: "rgba(255,255,255,0.08)" },
                ]}
              >
                <Text
                  style={[
                    styles.monthText,
                    isActive && { color: "#fff", fontFamily: "Inter_700Bold" },
                    isPast && { color: "rgba(255,255,255,0.5)" },
                    !isActive && !isPast && { color: "rgba(255,255,255,0.35)" },
                  ]}
                >
                  {m.charAt(0)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.legendRow}>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <View key={key} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: cfg.color }]} />
              <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>{cfg.label}</Text>
            </View>
          ))}
        </View>

        {DEADLINES.map((d, i) => {
          const cfg = CATEGORY_CONFIG[d.category];
          const deadlineMonthIdx = monthOrder.indexOf(d.month);
          const isPast = deadlineMonthIdx < currentMonthIdx;
          const isCurrent = deadlineMonthIdx === currentMonthIdx;

          return (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLine}>
                <View
                  style={[
                    styles.timelineNode,
                    { borderColor: cfg.color },
                    isPast && { backgroundColor: cfg.color + "40", borderColor: cfg.color + "60" },
                    isCurrent && { backgroundColor: cfg.color, borderColor: cfg.color },
                  ]}
                />
                {i < DEADLINES.length - 1 && (
                  <View style={[styles.timelineConnector, { backgroundColor: colors.border }]} />
                )}
              </View>

              <View
                style={[
                  styles.deadlineCard,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: isCurrent ? cfg.color + "50" : colors.border,
                    borderWidth: isCurrent ? 1.5 : 1,
                  },
                  isPast && { opacity: 0.55 },
                ]}
              >
                <View style={styles.deadlineTop}>
                  <View style={[styles.dateBadge, { backgroundColor: cfg.color + "15" }]}>
                    <Text style={[styles.dateText, { color: cfg.color }]}>{d.date}</Text>
                  </View>
                  {d.urgent && (
                    <View style={[styles.urgentBadge, { backgroundColor: Colors.palette.danger + "15" }]}>
                      <Ionicons name="alert-circle" size={12} color={Colors.palette.danger} />
                      <Text style={[styles.urgentText, { color: Colors.palette.danger }]}>Important</Text>
                    </View>
                  )}
                  {isPast && (
                    <View style={[styles.urgentBadge, { backgroundColor: Colors.palette.success + "15" }]}>
                      <Ionicons name="checkmark-circle" size={12} color={Colors.palette.success} />
                      <Text style={[styles.urgentText, { color: Colors.palette.success }]}>Done</Text>
                    </View>
                  )}
                </View>

                <Text style={[styles.deadlineTitle, { color: colors.text }]}>{d.title}</Text>

                <View style={styles.deadlineMeta}>
                  {d.section && (
                    <View style={[styles.metaChip, { backgroundColor: colors.background }]}>
                      <Ionicons name="book-outline" size={11} color={colors.textSecondary} />
                      <Text style={[styles.metaText, { color: colors.textSecondary }]}>{d.section}</Text>
                    </View>
                  )}
                  {d.lockIn && (
                    <View style={[styles.metaChip, { backgroundColor: Colors.palette.gold + "10" }]}>
                      <Ionicons name="lock-closed-outline" size={11} color={Colors.palette.gold} />
                      <Text style={[styles.metaText, { color: Colors.palette.gold }]}>Lock-in: {d.lockIn}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}

        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 28 }]}>Lock-in Periods</Text>
        <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>
          Minimum holding period for tax-saving instruments under the old regime
        </Text>

        <View style={[styles.lockInTable, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={[styles.lockInHeader, { borderColor: colors.border }]}>
            <Text style={[styles.lockInHeaderText, { color: colors.textSecondary, flex: 2 }]}>Instrument</Text>
            <Text style={[styles.lockInHeaderText, { color: colors.textSecondary, flex: 1, textAlign: "center" }]}>Lock-in</Text>
            <Text style={[styles.lockInHeaderText, { color: colors.textSecondary, flex: 1, textAlign: "right" }]}>Limit</Text>
          </View>
          {LOCK_IN_DATA.map((item, i) => (
            <View
              key={i}
              style={[
                styles.lockInRow,
                i < LOCK_IN_DATA.length - 1 && { borderBottomWidth: 1, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.lockInInstrument, { color: colors.text, flex: 2 }]}>{item.instrument}</Text>
              <View style={[styles.lockInBadge, { backgroundColor: Colors.palette.teal + "12" }]}>
                <Text style={[styles.lockInPeriod, { color: Colors.palette.teal }]}>{item.period}</Text>
              </View>
              <Text style={[styles.lockInLimit, { color: colors.textSecondary, flex: 1, textAlign: "right" }]}>
                {item.maxLimit}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.tipCard, { backgroundColor: Colors.palette.teal + "08", borderColor: Colors.palette.teal + "25" }]}>
          <Ionicons name="bulb-outline" size={18} color={Colors.palette.teal} />
          <Text style={[styles.tipText, { color: colors.text }]}>
            ELSS funds have the shortest lock-in (3 years) among 80C instruments and offer potential for higher returns through equity exposure.
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
  monthStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  monthDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  monthText: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    color: "rgba(255,255,255,0.35)",
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  legendRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 18,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 0,
  },
  timelineLine: {
    width: 28,
    alignItems: "center",
    paddingTop: 18,
  },
  timelineNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginTop: -1,
  },
  deadlineCard: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  deadlineTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
  urgentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgentText: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
  },
  deadlineTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 20,
    marginBottom: 6,
  },
  deadlineMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metaText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
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
  lockInTable: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  lockInHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
  },
  lockInHeaderText: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  lockInRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  lockInInstrument: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  lockInBadge: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignItems: "center",
  },
  lockInPeriod: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
  },
  lockInLimit: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  tipCard: {
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    alignItems: "flex-start",
  },
  tipText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    flex: 1,
  },
});
