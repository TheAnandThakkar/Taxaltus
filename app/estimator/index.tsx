import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, Platform, TextInput } from "react-native";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";

function calcOldRegimeTax(income: number, deductions80c: number, deductions80d: number, otherDeductions: number, hra: number): { taxable: number; tax: number; cess: number; total: number; standardDeduction: number; totalDeductions: number } {
  const standardDeduction = 50000;
  const total80c = Math.min(deductions80c, 150000);
  const total80d = Math.min(deductions80d, 100000);
  const totalDeductions = total80c + total80d + otherDeductions + hra + standardDeduction;
  const taxable = Math.max(0, income - totalDeductions);

  let tax = 0;
  if (taxable <= 250000) {
    tax = 0;
  } else if (taxable <= 500000) {
    tax = (taxable - 250000) * 0.05;
  } else if (taxable <= 1000000) {
    tax = 12500 + (taxable - 500000) * 0.20;
  } else {
    tax = 12500 + 100000 + (taxable - 1000000) * 0.30;
  }

  if (taxable <= 500000) {
    tax = Math.max(0, tax - Math.min(tax, 12500));
  }

  const cess = tax * 0.04;
  return { taxable, tax, cess, total: tax + cess, standardDeduction, totalDeductions };
}

function calcNewRegimeTax(income: number): { taxable: number; tax: number; cess: number; total: number; standardDeduction: number } {
  const standardDeduction = 75000;
  const taxable = Math.max(0, income - standardDeduction);

  let tax = 0;
  if (taxable <= 300000) {
    tax = 0;
  } else if (taxable <= 700000) {
    tax = (taxable - 300000) * 0.05;
  } else if (taxable <= 1000000) {
    tax = 20000 + (taxable - 700000) * 0.10;
  } else if (taxable <= 1200000) {
    tax = 20000 + 30000 + (taxable - 1000000) * 0.15;
  } else if (taxable <= 1500000) {
    tax = 20000 + 30000 + 30000 + (taxable - 1200000) * 0.20;
  } else {
    tax = 20000 + 30000 + 30000 + 60000 + (taxable - 1500000) * 0.30;
  }

  if (taxable <= 700000) {
    tax = Math.max(0, tax - Math.min(tax, 25000));
  }

  const cess = tax * 0.04;
  return { taxable, tax, cess, total: tax + cess, standardDeduction };
}

function formatCurrency(num: number): string {
  if (num === 0) return "0";
  return num.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function parseAmount(text: string): number {
  const cleaned = text.replace(/[^0-9]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

export default function EstimatorScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const [grossIncome, setGrossIncome] = useState("");
  const [deductions80c, setDeductions80c] = useState("");
  const [deductions80d, setDeductions80d] = useState("");
  const [hra, setHra] = useState("");
  const [otherDeductions, setOtherDeductions] = useState("");
  const [showResults, setShowResults] = useState(false);

  const income = parseAmount(grossIncome);
  const d80c = parseAmount(deductions80c);
  const d80d = parseAmount(deductions80d);
  const hraVal = parseAmount(hra);
  const otherVal = parseAmount(otherDeductions);

  const oldResult = useMemo(() => calcOldRegimeTax(income, d80c, d80d, otherVal, hraVal), [income, d80c, d80d, otherVal, hraVal]);
  const newResult = useMemo(() => calcNewRegimeTax(income), [income]);

  const savings = oldResult.total - newResult.total;
  const betterRegime = savings > 0 ? "New" : savings < 0 ? "Old" : "Same";

  const handleCalculate = useCallback(() => {
    if (income <= 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowResults(true);
  }, [income]);

  const handleReset = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setGrossIncome("");
    setDeductions80c("");
    setDeductions80d("");
    setHra("");
    setOtherDeductions("");
    setShowResults(false);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Tax Estimator</Text>
          <Pressable onPress={handleReset} hitSlop={12}>
            <Ionicons name="refresh-outline" size={22} color="rgba(255,255,255,0.8)" />
          </Pressable>
        </View>
        <Text style={styles.headerSubtitle}>FY 2024-25 (AY 2025-26)</Text>
      </View>

      <KeyboardAwareScrollViewCompat
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
      >
        <View style={[styles.disclaimerBanner, { backgroundColor: Colors.palette.gold + "12", borderColor: Colors.palette.gold + "30" }]}>
          <Ionicons name="information-circle" size={18} color={Colors.palette.gold} />
          <Text style={[styles.disclaimerText, { color: colors.text }]}>
            This is for educational purposes only. Actual tax liability may differ based on exemptions, surcharge, and other factors. Consult a tax professional for filing decisions.
          </Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.tint }]}>Gross Annual Income</Text>
        <View style={[styles.inputWrap, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.rupee, { color: colors.textSecondary }]}>₹</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="e.g. 12,00,000"
            placeholderTextColor={colors.textSecondary + "80"}
            keyboardType="number-pad"
            value={grossIncome}
            onChangeText={(t) => { setGrossIncome(t); setShowResults(false); }}
            returnKeyType="next"
            testID="gross-income-input"
          />
        </View>
        <Text style={[styles.inputHint, { color: colors.textSecondary }]}>
          Total salary before any deductions (CTC or gross salary from Form 16)
        </Text>

        <Text style={[styles.sectionLabel, { color: colors.tint, marginTop: 20 }]}>Deductions (Old Regime Only)</Text>
        <Text style={[styles.sectionHint, { color: colors.textSecondary }]}>
          These deductions apply only under the old regime. The new regime has limited deductions.
        </Text>

        <Text style={[styles.fieldLabel, { color: colors.text }]}>Section 80C (PPF, ELSS, LIC, EPF)</Text>
        <View style={[styles.inputWrap, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.rupee, { color: colors.textSecondary }]}>₹</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Max 1,50,000"
            placeholderTextColor={colors.textSecondary + "80"}
            keyboardType="number-pad"
            value={deductions80c}
            onChangeText={(t) => { setDeductions80c(t); setShowResults(false); }}
            returnKeyType="next"
            testID="80c-input"
          />
        </View>

        <Text style={[styles.fieldLabel, { color: colors.text }]}>Section 80D (Health Insurance)</Text>
        <View style={[styles.inputWrap, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.rupee, { color: colors.textSecondary }]}>₹</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Up to 1,00,000 (self + parents)"
            placeholderTextColor={colors.textSecondary + "80"}
            keyboardType="number-pad"
            value={deductions80d}
            onChangeText={(t) => { setDeductions80d(t); setShowResults(false); }}
            returnKeyType="next"
            testID="80d-input"
          />
        </View>

        <Text style={[styles.fieldLabel, { color: colors.text }]}>HRA Exemption Claimed</Text>
        <View style={[styles.inputWrap, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.rupee, { color: colors.textSecondary }]}>₹</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="e.g. 1,20,000"
            placeholderTextColor={colors.textSecondary + "80"}
            keyboardType="number-pad"
            value={hra}
            onChangeText={(t) => { setHra(t); setShowResults(false); }}
            returnKeyType="next"
            testID="hra-input"
          />
        </View>

        <Text style={[styles.fieldLabel, { color: colors.text }]}>Other Deductions (80E, 80G, 24b, etc.)</Text>
        <View style={[styles.inputWrap, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.rupee, { color: colors.textSecondary }]}>₹</Text>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="e.g. 50,000"
            placeholderTextColor={colors.textSecondary + "80"}
            keyboardType="number-pad"
            value={otherDeductions}
            onChangeText={(t) => { setOtherDeductions(t); setShowResults(false); }}
            returnKeyType="done"
            testID="other-input"
          />
        </View>

        <Pressable
          onPress={handleCalculate}
          disabled={income <= 0}
          style={({ pressed }) => [
            styles.calculateBtn,
            {
              backgroundColor: income > 0 ? Colors.palette.teal : colors.textSecondary + "40",
              opacity: pressed ? 0.9 : 1,
            },
          ]}
          testID="calculate-btn"
        >
          <Ionicons name="calculator-outline" size={20} color="#fff" />
          <Text style={styles.calculateBtnText}>Compare Tax</Text>
        </Pressable>

        {showResults && income > 0 && (
          <View style={styles.resultsSection}>
            {betterRegime !== "Same" && (
              <View style={[styles.verdictCard, { backgroundColor: Colors.palette.teal + "10", borderColor: Colors.palette.teal + "30" }]}>
                <Ionicons name="checkmark-circle" size={22} color={Colors.palette.teal} />
                <View style={styles.verdictContent}>
                  <Text style={[styles.verdictTitle, { color: Colors.palette.teal }]}>
                    {betterRegime} Regime saves you more
                  </Text>
                  <Text style={[styles.verdictAmount, { color: colors.text }]}>
                    You save ₹{formatCurrency(Math.abs(savings))} with the {betterRegime} Regime
                  </Text>
                </View>
              </View>
            )}
            {betterRegime === "Same" && (
              <View style={[styles.verdictCard, { backgroundColor: Colors.palette.gold + "10", borderColor: Colors.palette.gold + "30" }]}>
                <Ionicons name="swap-horizontal" size={22} color={Colors.palette.gold} />
                <View style={styles.verdictContent}>
                  <Text style={[styles.verdictTitle, { color: Colors.palette.gold }]}>
                    Both regimes result in the same tax
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.comparisonRow}>
              <View style={[styles.regimeCard, { backgroundColor: colors.cardBg, borderColor: Colors.palette.gold + "40" }]}>
                <View style={[styles.regimeBadge, { backgroundColor: Colors.palette.gold + "15" }]}>
                  <Text style={[styles.regimeBadgeText, { color: Colors.palette.gold }]}>OLD REGIME</Text>
                </View>
                <Text style={[styles.regimeTaxLabel, { color: colors.textSecondary }]}>Tax Payable</Text>
                <Text style={[styles.regimeTaxAmount, { color: colors.text }]}>₹{formatCurrency(oldResult.total)}</Text>

                <View style={[styles.breakdownDivider, { backgroundColor: colors.border }]} />

                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Gross Income</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₹{formatCurrency(income)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Std Deduction</Text>
                  <Text style={[styles.breakdownValue, { color: Colors.palette.teal }]}>-₹{formatCurrency(oldResult.standardDeduction)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Other Deductions</Text>
                  <Text style={[styles.breakdownValue, { color: Colors.palette.teal }]}>-₹{formatCurrency(oldResult.totalDeductions - oldResult.standardDeduction)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Taxable Income</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text, fontFamily: "Inter_600SemiBold" }]}>₹{formatCurrency(oldResult.taxable)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Tax</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₹{formatCurrency(oldResult.tax)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Cess (4%)</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₹{formatCurrency(oldResult.cess)}</Text>
                </View>
              </View>

              <View style={[styles.regimeCard, { backgroundColor: colors.cardBg, borderColor: Colors.palette.teal + "40" }]}>
                <View style={[styles.regimeBadge, { backgroundColor: Colors.palette.teal + "15" }]}>
                  <Text style={[styles.regimeBadgeText, { color: Colors.palette.teal }]}>NEW REGIME</Text>
                </View>
                <Text style={[styles.regimeTaxLabel, { color: colors.textSecondary }]}>Tax Payable</Text>
                <Text style={[styles.regimeTaxAmount, { color: colors.text }]}>₹{formatCurrency(newResult.total)}</Text>

                <View style={[styles.breakdownDivider, { backgroundColor: colors.border }]} />

                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Gross Income</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₹{formatCurrency(income)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Std Deduction</Text>
                  <Text style={[styles.breakdownValue, { color: Colors.palette.teal }]}>-₹{formatCurrency(newResult.standardDeduction)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Taxable Income</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text, fontFamily: "Inter_600SemiBold" }]}>₹{formatCurrency(newResult.taxable)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Tax</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₹{formatCurrency(newResult.tax)}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.textSecondary }]}>Cess (4%)</Text>
                  <Text style={[styles.breakdownValue, { color: colors.text }]}>₹{formatCurrency(newResult.cess)}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.footerDisclaimer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <Ionicons name="warning-outline" size={16} color={Colors.palette.gold} />
              <Text style={[styles.footerDisclaimerText, { color: colors.textSecondary }]}>
                This estimate does not include surcharge (for income above 50L), employer NPS contribution (80CCD(2)), or other special exemptions. It is meant to give you a general idea — not to be used as tax filing advice.
              </Text>
            </View>
          </View>
        )}
      </KeyboardAwareScrollViewCompat>
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
  disclaimerBanner: {
    flexDirection: "row",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  disclaimerText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    flex: 1,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionHint: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    marginBottom: 6,
    marginTop: 12,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  rupee: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    paddingVertical: 14,
  },
  inputHint: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    marginTop: 4,
    lineHeight: 16,
  },
  calculateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
  },
  calculateBtnText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  resultsSection: {
    marginTop: 24,
  },
  verdictCard: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: "center",
  },
  verdictContent: {
    flex: 1,
  },
  verdictTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  verdictAmount: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  comparisonRow: {
    gap: 10,
  },
  regimeCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
  },
  regimeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  regimeBadgeText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  regimeTaxLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 2,
  },
  regimeTaxAmount: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
  },
  breakdownDivider: {
    height: 1,
    marginVertical: 12,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  breakdownValue: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  footerDisclaimer: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    alignItems: "flex-start",
  },
  footerDisclaimerText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    flex: 1,
  },
});
