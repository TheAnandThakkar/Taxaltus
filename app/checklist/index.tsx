import React, { useMemo } from "react";
import { View, Text, StyleSheet, SectionList, Pressable, Platform, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import Colors from "@/constants/colors";

interface ChecklistItem {
  id: string;
  label: string;
  desc: string;
  tip?: string;
}

interface ChecklistSection {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  data: ChecklistItem[];
}

const CHECKLIST: ChecklistSection[] = [
  {
    title: "Documents to Collect",
    icon: "folder-open-outline",
    data: [
      { id: "cl-form16", label: "Form 16 from Employer", desc: "TDS certificate issued by your employer (Parts A & B)", tip: "Usually available by June 15. Download from your HR portal." },
      { id: "cl-form26as", label: "Form 26AS (Tax Credit)", desc: "Annual tax statement showing all TDS deducted against your PAN", tip: "Download from TRACES or the Income Tax portal." },
      { id: "cl-ais", label: "Annual Information Statement (AIS)", desc: "Comprehensive view of all financial transactions reported against your PAN", tip: "Check AIS on the e-filing portal. Includes interest, dividends, property sales, etc." },
      { id: "cl-form16a", label: "Form 16A (if applicable)", desc: "TDS certificate for non-salary income like bank interest, rent", tip: "Banks and deductors issue this for TDS on interest, commissions, etc." },
      { id: "cl-bankstmt", label: "Bank Statements", desc: "Statements from all savings accounts for interest income verification", tip: "Collect from all banks. Cross-check interest amounts with AIS." },
    ],
  },
  {
    title: "Investment Proofs (Old Regime)",
    icon: "shield-checkmark-outline",
    data: [
      { id: "cl-80c", label: "Section 80C Proofs", desc: "PPF, ELSS, LIC, EPF, tuition fees, home loan principal", tip: "Collect premium receipts, mutual fund statements, EPF passbook." },
      { id: "cl-80d", label: "Section 80D Health Insurance", desc: "Premium receipts for self, spouse, children, and parents", tip: "Include preventive health check-up bills (up to 5,000)." },
      { id: "cl-hra", label: "HRA Rent Receipts", desc: "Monthly rent receipts and landlord PAN (if rent > 1L/year)", tip: "If rent exceeds 1,00,000 per year, landlord's PAN is mandatory." },
      { id: "cl-80ccd", label: "NPS Contribution (80CCD)", desc: "Employer and self contribution statements for NPS", tip: "80CCD(1B) gives extra 50,000 deduction over 80C limit." },
      { id: "cl-homeloan", label: "Home Loan Certificate", desc: "Interest certificate from bank showing principal and interest split", tip: "Needed for Sec 24(b) interest deduction and Sec 80C principal." },
      { id: "cl-80e", label: "Education Loan Interest (80E)", desc: "Interest certificate from bank for higher education loan", tip: "No upper limit on deduction. Available for 8 years from when you start repaying." },
    ],
  },
  {
    title: "Other Income to Declare",
    icon: "cash-outline",
    data: [
      { id: "cl-savings-int", label: "Savings Account Interest", desc: "Interest from all savings accounts (check passbook/statement)", tip: "Deduction u/s 80TTA up to 10,000 (old regime). Sum all accounts." },
      { id: "cl-fd-int", label: "FD/RD Interest", desc: "Fixed deposit and recurring deposit interest from all banks", tip: "Taxable in the year it accrues, not when FD matures. Check AIS." },
      { id: "cl-capital-gains", label: "Capital Gains (if any)", desc: "Gains from sale of stocks, mutual funds, property", tip: "LTCG on equity > 1.25L taxed at 12.5%. STCG at 20%." },
      { id: "cl-other-income", label: "Freelance / Other Income", desc: "Any income outside salary: consulting, rental, gifts over 50K", tip: "Rental income goes under 'House Property'. Gifts above 50,000 are taxable." },
    ],
  },
  {
    title: "Verify & Cross-Check",
    icon: "checkmark-done-outline",
    data: [
      { id: "cl-match-26as", label: "Match Form 16 with 26AS", desc: "Ensure TDS amounts on Form 16 match Form 26AS entries", tip: "Mismatches can cause demand notices from the department." },
      { id: "cl-match-ais", label: "Verify AIS Transactions", desc: "Check AIS for any unknown or incorrect transactions", tip: "Submit feedback on AIS if any transaction is incorrect." },
      { id: "cl-pan-aadhar", label: "PAN-Aadhaar Linked", desc: "Confirm your PAN is linked with Aadhaar (mandatory for filing)", tip: "Check linkage on the Income Tax e-filing portal." },
      { id: "cl-bank-prevalidate", label: "Pre-validate Bank Account", desc: "Ensure your bank account is pre-validated on the e-filing portal for refunds", tip: "Refunds are credited only to pre-validated bank accounts." },
    ],
  },
  {
    title: "Filing Steps",
    icon: "document-text-outline",
    data: [
      { id: "cl-choose-regime", label: "Choose Tax Regime", desc: "Decide between old and new regime based on your deductions", tip: "New regime is default. Compare on the Regime Comparison screen." },
      { id: "cl-choose-itr", label: "Select Correct ITR Form", desc: "Most salaried employees use ITR-1 (Sahaj) or ITR-2", tip: "ITR-1 for salary + one house + interest. ITR-2 if capital gains or multiple properties." },
      { id: "cl-file-return", label: "File ITR on Portal", desc: "File on incometax.gov.in before July 31 deadline", tip: "Keep acknowledgement number safe. Download ITR-V." },
      { id: "cl-e-verify", label: "E-Verify Return", desc: "Verify via Aadhaar OTP, net banking, or DSC within 30 days", tip: "Return is invalid without verification. Aadhaar OTP is fastest." },
    ],
  },
];

const TOTAL_ITEMS = CHECKLIST.reduce((sum, s) => sum + s.data.length, 0);

export default function ChecklistScreen() {
  const { colors } = useTheme();
  const { checkedItems, toggleChecked, resetChecklist } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const completedCount = useMemo(
    () => CHECKLIST.reduce((sum, s) => sum + s.data.filter((item) => checkedItems.includes(item.id)).length, 0),
    [checkedItems]
  );

  const progress = TOTAL_ITEMS > 0 ? completedCount / TOTAL_ITEMS : 0;

  const handleReset = () => {
    Alert.alert("Reset Checklist", "This will uncheck all items. Continue?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          resetChecklist();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Tax Prep Checklist</Text>
          <Pressable onPress={handleReset} hitSlop={12}>
            <Ionicons name="refresh-outline" size={22} color="rgba(255,255,255,0.8)" />
          </Pressable>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>
              {completedCount} of {TOTAL_ITEMS} completed
            </Text>
            <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress * 100}%`,
                  backgroundColor: progress === 1 ? "#22C55E" : Colors.palette.teal,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <SectionList
        sections={CHECKLIST}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
            <View style={[styles.sectionIconWrap, { backgroundColor: Colors.palette.teal + "15" }]}>
              <Ionicons name={section.icon as any} size={16} color={Colors.palette.teal} />
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            <Text style={[styles.sectionCount, { color: colors.textSecondary }]}>
              {section.data.filter((d) => checkedItems.includes(d.id)).length}/{section.data.length}
            </Text>
          </View>
        )}
        renderItem={({ item }) => {
          const checked = checkedItems.includes(item.id);
          return (
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                toggleChecked(item.id);
              }}
              style={({ pressed }) => [
                styles.item,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: checked ? Colors.palette.teal + "40" : colors.border,
                  opacity: pressed ? 0.92 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  checked
                    ? { backgroundColor: Colors.palette.teal, borderColor: Colors.palette.teal }
                    : { borderColor: colors.textSecondary + "60", backgroundColor: "transparent" },
                ]}
              >
                {checked && <Ionicons name="checkmark" size={14} color="#fff" />}
              </View>
              <View style={styles.itemContent}>
                <Text
                  style={[
                    styles.itemLabel,
                    { color: colors.text },
                    checked && { textDecorationLine: "line-through", opacity: 0.6 },
                  ]}
                >
                  {item.label}
                </Text>
                <Text style={[styles.itemDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
                {item.tip && (
                  <View style={[styles.tipWrap, { backgroundColor: Colors.palette.gold + "10" }]}>
                    <Ionicons name="bulb-outline" size={12} color={Colors.palette.gold} />
                    <Text style={[styles.tipText, { color: colors.text }]}>{item.tip}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          );
        }}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
      />
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
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  progressSection: {
    gap: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.7)",
  },
  progressPercent: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  list: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 10,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    flex: 1,
  },
  sectionCount: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  item: {
    flexDirection: "row",
    padding: 14,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 8,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 1,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 3,
  },
  itemDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  tipWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    flex: 1,
  },
});
