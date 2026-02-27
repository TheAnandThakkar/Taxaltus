import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

function TableRow({ label, value, bold, colors }: { label: string; value: string; bold?: boolean; colors: any }) {
  return (
    <View style={[tStyles.row, { borderColor: colors.border }]}>
      <Text style={[tStyles.rowLabel, { color: colors.text }, bold && tStyles.rowBold]}>{label}</Text>
      <Text style={[tStyles.rowValue, { color: colors.text }, bold && tStyles.rowBold]}>{value}</Text>
    </View>
  );
}

function SectionTitle({ text, colors }: { text: string; colors: any }) {
  return (
    <View style={[tStyles.sectionTitle, { backgroundColor: Colors.palette.navy + "08", borderColor: colors.border }]}>
      <Text style={[tStyles.sectionTitleText, { color: Colors.palette.navy }]}>{text}</Text>
    </View>
  );
}

export default function SpecimenScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const [activePart, setActivePart] = useState<"A" | "B">("A");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Form 16 Specimen</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={[styles.tabBar, { backgroundColor: "rgba(255,255,255,0.12)" }]}>
          <Pressable
            onPress={() => setActivePart("A")}
            style={[styles.tab, activePart === "A" && { backgroundColor: Colors.palette.teal }]}
          >
            <Text style={[styles.tabText, activePart === "A" && styles.tabTextActive]}>Part A</Text>
          </Pressable>
          <Pressable
            onPress={() => setActivePart("B")}
            style={[styles.tab, activePart === "B" && { backgroundColor: Colors.palette.teal }]}
          >
            <Text style={[styles.tabText, activePart === "B" && styles.tabTextActive]}>Part B (Annexure)</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.specimenNote, { backgroundColor: Colors.palette.gold + "12", borderColor: Colors.palette.gold + "30" }]}>
          <Ionicons name="information-circle" size={16} color={Colors.palette.gold} />
          <Text style={[styles.specimenNoteText, { color: colors.text }]}>
            This is a specimen with illustrative data. Your actual Form 16 will have your real details from your employer.
          </Text>
        </View>

        {activePart === "A" && (
          <View style={[styles.formContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: Colors.palette.navy }]}>FORM NO. 16</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                [See rule 31(1)(a)]
              </Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary
              </Text>
              <View style={[styles.partBadge, { backgroundColor: Colors.palette.teal + "15" }]}>
                <Text style={[styles.partBadgeText, { color: Colors.palette.teal }]}>PART A</Text>
              </View>
            </View>

            <SectionTitle text="Certificate No. & Assessment Year" colors={colors} />
            <TableRow label="Certificate No." value="ABCDE1234F/2025/001" colors={colors} />
            <TableRow label="Last updated on" value="15-Jun-2025" colors={colors} />
            <TableRow label="Assessment Year" value="2025-26" colors={colors} />

            <SectionTitle text="Employer Details" colors={colors} />
            <TableRow label="Name of Deductor (Employer)" value="XYZ Technologies Pvt. Ltd." colors={colors} />
            <TableRow label="TAN of Deductor" value="DELX12345E" colors={colors} />
            <TableRow label="PAN of Deductor" value="AABCX1234F" colors={colors} />
            <TableRow label="Address" value="123, Tech Park, Sector 62, Noida, UP - 201301" colors={colors} />
            <TableRow label="City" value="Noida" colors={colors} />
            <TableRow label="State" value="Uttar Pradesh" colors={colors} />
            <TableRow label="Pin Code" value="201301" colors={colors} />
            <TableRow label="Email" value="payroll@xyztech.com" colors={colors} />

            <SectionTitle text="Employee Details" colors={colors} />
            <TableRow label="PAN of Employee" value="ABCDE1234F" colors={colors} />
            <TableRow label="Name of Employee" value="RAJESH KUMAR" colors={colors} />
            <TableRow label="Address" value="A-45, Green Valley Apartments, Sector 50, Noida" colors={colors} />
            <TableRow label="City" value="Noida" colors={colors} />
            <TableRow label="State" value="Uttar Pradesh" colors={colors} />
            <TableRow label="Pin Code" value="201301" colors={colors} />
            <TableRow label="Email" value="rajesh.kumar@email.com" colors={colors} />

            <SectionTitle text="Period of Employment" colors={colors} />
            <TableRow label="Period with this employer" value="01-Apr-2024 to 31-Mar-2025" colors={colors} />

            <SectionTitle text="Summary of Tax Deducted at Source" colors={colors} />
            <View style={[tStyles.quarterHeader, { borderColor: colors.border, backgroundColor: Colors.palette.navy + "05" }]}>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>Quarter</Text>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>Receipt No.</Text>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>TDS (₹)</Text>
            </View>
            {[
              { q: "Q1 (Apr-Jun)", receipt: "2024Q1A12345", amount: "45,000" },
              { q: "Q2 (Jul-Sep)", receipt: "2024Q2A12346", amount: "45,000" },
              { q: "Q3 (Oct-Dec)", receipt: "2024Q3A12347", amount: "45,000" },
              { q: "Q4 (Jan-Mar)", receipt: "2024Q4A12348", amount: "45,000" },
            ].map((row, i) => (
              <View key={i} style={[tStyles.quarterRow, { borderColor: colors.border }]}>
                <Text style={[tStyles.qCol, { color: colors.text }]}>{row.q}</Text>
                <Text style={[tStyles.qCol, { color: colors.text }]}>{row.receipt}</Text>
                <Text style={[tStyles.qCol, { color: colors.text }]}>{row.amount}</Text>
              </View>
            ))}
            <TableRow label="Total Tax Deducted" value="₹1,80,000" bold colors={colors} />

            <SectionTitle text="Summary of Tax Deposited (Challan Details)" colors={colors} />
            <View style={[tStyles.quarterHeader, { borderColor: colors.border, backgroundColor: Colors.palette.navy + "05" }]}>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>BSR Code</Text>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>Date</Text>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>Challan No.</Text>
              <Text style={[tStyles.qCol, tStyles.qColHeader, { color: colors.textSecondary }]}>Amount (₹)</Text>
            </View>
            {[
              { bsr: "0510213", date: "07-Jul-24", challan: "10245", amount: "45,000" },
              { bsr: "0510213", date: "07-Oct-24", challan: "20387", amount: "45,000" },
              { bsr: "0510213", date: "07-Jan-25", challan: "30512", amount: "45,000" },
              { bsr: "0510213", date: "07-Apr-25", challan: "40698", amount: "45,000" },
            ].map((row, i) => (
              <View key={i} style={[tStyles.quarterRow, { borderColor: colors.border }]}>
                <Text style={[tStyles.qCol, { color: colors.text, fontSize: 10 }]}>{row.bsr}</Text>
                <Text style={[tStyles.qCol, { color: colors.text, fontSize: 10 }]}>{row.date}</Text>
                <Text style={[tStyles.qCol, { color: colors.text, fontSize: 10 }]}>{row.challan}</Text>
                <Text style={[tStyles.qCol, { color: colors.text, fontSize: 10 }]}>{row.amount}</Text>
              </View>
            ))}
            <TableRow label="Total Tax Deposited" value="₹1,80,000" bold colors={colors} />

            <SectionTitle text="Verification" colors={colors} />
            <Text style={[tStyles.verifyText, { color: colors.textSecondary }]}>
              I, Suresh Mehta, son of Ramesh Mehta, working in the capacity of Finance Manager, do hereby certify that a sum of ₹1,80,000 has been deducted and deposited to the credit of the Central Government.
            </Text>
            <TableRow label="Place" value="Noida" colors={colors} />
            <TableRow label="Date" value="15-Jun-2025" colors={colors} />
            <TableRow label="Designation" value="Finance Manager" colors={colors} />
          </View>
        )}

        {activePart === "B" && (
          <View style={[styles.formContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: Colors.palette.navy }]}>FORM NO. 16</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                Part B (Annexure)
              </Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                Details of Salary paid and any other income and tax deducted
              </Text>
              <View style={[styles.partBadge, { backgroundColor: Colors.palette.gold + "15" }]}>
                <Text style={[styles.partBadgeText, { color: Colors.palette.gold }]}>PART B</Text>
              </View>
            </View>

            <TableRow label="Name of Employee" value="RAJESH KUMAR" colors={colors} />
            <TableRow label="PAN of Employee" value="ABCDE1234F" colors={colors} />
            <TableRow label="Assessment Year" value="2025-26" colors={colors} />
            <TableRow label="Whether opting for taxation u/s 115BAC?" value="No (Old Regime)" colors={colors} />

            <SectionTitle text="1. Gross Salary" colors={colors} />
            <TableRow label="(a) Salary as per section 17(1)" value="₹14,40,000" colors={colors} />
            <TableRow label="(b) Value of perquisites u/s 17(2)" value="₹0" colors={colors} />
            <TableRow label="(c) Profits in lieu of salary u/s 17(3)" value="₹0" colors={colors} />
            <TableRow label="(d) Total Gross Salary (a+b+c)" value="₹14,40,000" bold colors={colors} />

            <SectionTitle text="2. Exemptions under Section 10" colors={colors} />
            <TableRow label="(a) HRA Exemption u/s 10(13A)" value="₹1,44,000" colors={colors} />
            <TableRow label="(b) Leave Travel Allowance u/s 10(5)" value="₹0" colors={colors} />
            <TableRow label="(c) Other exemptions" value="₹0" colors={colors} />
            <TableRow label="(d) Total Exemptions" value="₹1,44,000" bold colors={colors} />

            <SectionTitle text="3. Income Chargeable under head 'Salaries' (1d - 2d)" colors={colors} />
            <TableRow label="Total" value="₹12,96,000" bold colors={colors} />

            <SectionTitle text="4. Deductions under Section 16" colors={colors} />
            <TableRow label="(a) Standard Deduction u/s 16(ia)" value="₹50,000" colors={colors} />
            <TableRow label="(b) Entertainment Allowance u/s 16(ii)" value="₹0" colors={colors} />
            <TableRow label="(c) Professional Tax u/s 16(iii)" value="₹2,400" colors={colors} />
            <TableRow label="Total Deductions u/s 16" value="₹52,400" bold colors={colors} />

            <SectionTitle text="5. Income Chargeable under head 'Salaries' (3 - 4)" colors={colors} />
            <TableRow label="Total" value="₹12,43,600" bold colors={colors} />

            <SectionTitle text="6. Add: Any other income reported by employee" colors={colors} />
            <TableRow label="(a) Income from House Property" value="₹0" colors={colors} />
            <TableRow label="(b) Income from Other Sources" value="₹35,000" colors={colors} />

            <SectionTitle text="7. Gross Total Income (5 + 6)" colors={colors} />
            <TableRow label="Total" value="₹12,78,600" bold colors={colors} />

            <SectionTitle text="8. Deductions under Chapter VI-A" colors={colors} />
            <TableRow label="(a) Section 80C (PPF, ELSS, LIC, EPF)" value="₹1,50,000" colors={colors} />
            <TableRow label="(b) Section 80CCD(1B) — NPS" value="₹50,000" colors={colors} />
            <TableRow label="(c) Section 80D — Health Insurance" value="₹25,000" colors={colors} />
            <TableRow label="(d) Section 80TTA — Savings Interest" value="₹10,000" colors={colors} />
            <TableRow label="(e) Other deductions" value="₹0" colors={colors} />
            <TableRow label="Total Deductions under Chapter VI-A" value="₹2,35,000" bold colors={colors} />

            <SectionTitle text="9. Total Taxable Income (7 - 8)" colors={colors} />
            <TableRow label="Total" value="₹10,43,600" bold colors={colors} />

            <SectionTitle text="10. Tax on Total Income" colors={colors} />
            <TableRow label="Tax as per slab rates" value="₹1,21,220" colors={colors} />
            <TableRow label="Rebate u/s 87A" value="₹0" colors={colors} />
            <TableRow label="Surcharge" value="₹0" colors={colors} />
            <TableRow label="Health & Education Cess (4%)" value="₹4,849" colors={colors} />
            <TableRow label="Total Tax Payable" value="₹1,26,069" bold colors={colors} />

            <SectionTitle text="11. Relief under Section 89" colors={colors} />
            <TableRow label="Amount" value="₹0" colors={colors} />

            <SectionTitle text="12. Net Tax Payable (10 - 11)" colors={colors} />
            <TableRow label="Total" value="₹1,26,069" bold colors={colors} />

            <SectionTitle text="13. TDS Details" colors={colors} />
            <TableRow label="Tax already deducted (TDS)" value="₹1,80,000" colors={colors} />
            <TableRow label="Tax payable / Refundable" value="₹53,931 (Refund)" bold colors={colors} />
          </View>
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
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
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
  specimenNote: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  specimenNoteText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    flex: 1,
  },
  formContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  formHeader: {
    padding: 20,
    alignItems: "center",
    gap: 4,
  },
  formTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  formSubtitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 18,
  },
  partBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
  },
  partBadgeText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
});

const tStyles = StyleSheet.create({
  sectionTitle: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  sectionTitleText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  rowLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    flex: 1.5,
    lineHeight: 18,
  },
  rowValue: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    flex: 1,
    textAlign: "right",
  },
  rowBold: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  quarterHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
  },
  quarterRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
  },
  qCol: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  qColHeader: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  verifyText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontStyle: "italic",
  },
});
