import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Question {
  id: string;
  text: string;
  subtext: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface ITRResult {
  form: string;
  title: string;
  description: string;
  suitableFor: string[];
  color: string;
}

const QUESTIONS: Question[] = [
  {
    id: "salaried",
    text: "Are you a salaried individual?",
    subtext: "You receive salary/pension from an employer",
    icon: "briefcase-outline",
  },
  {
    id: "capital_gains",
    text: "Do you have capital gains income?",
    subtext: "Gains from selling stocks, mutual funds, or property",
    icon: "trending-up-outline",
  },
  {
    id: "business_income",
    text: "Do you have business or professional income?",
    subtext: "Income from freelancing, consulting, or running a business",
    icon: "storefront-outline",
  },
  {
    id: "foreign_income",
    text: "Do you have foreign income or assets?",
    subtext: "Income earned abroad or assets held outside India",
    icon: "globe-outline",
  },
  {
    id: "multiple_house",
    text: "Do you own more than one house property?",
    subtext: "Income from more than one residential property",
    icon: "home-outline",
  },
];

function getITRResult(answers: Record<string, boolean>): ITRResult {
  if (answers.business_income) {
    if (answers.capital_gains || answers.foreign_income) {
      return {
        form: "ITR-3",
        title: "ITR-3",
        description:
          "For individuals and HUFs having income from business or profession. This form covers all types of income including salary, house property, capital gains, and business income.",
        suitableFor: [
          "Business or professional income",
          "Capital gains from stocks/property",
          "Salary and house property income",
          "Foreign income or assets",
        ],
        color: "#8B5CF6",
      };
    }
    return {
      form: "ITR-4",
      title: "ITR-4 (Sugam)",
      description:
        "For individuals, HUFs, and firms with presumptive business income under Section 44AD, 44ADA, or 44AE. Simplified form for small businesses and professionals.",
      suitableFor: [
        "Presumptive business income (turnover up to 3 Cr)",
        "Presumptive professional income (receipts up to 75L)",
        "Salary and single house property",
        "Total income up to 50 lakhs",
      ],
      color: Colors.palette.gold,
    };
  }

  if (answers.foreign_income) {
    return {
      form: "ITR-2",
      title: "ITR-2",
      description:
        "For individuals and HUFs not having income from business or profession. Required when you have foreign income, foreign assets, or are a director in a company.",
      suitableFor: [
        "Foreign income or foreign assets",
        "Capital gains from investments",
        "Multiple house properties",
        "Salary and pension income",
        "Director in a company",
      ],
      color: "#6366F1",
    };
  }

  if (answers.capital_gains || answers.multiple_house) {
    return {
      form: "ITR-2",
      title: "ITR-2",
      description:
        "For individuals and HUFs not having income from business or profession. Use this when you have capital gains or income from more than one house property.",
      suitableFor: [
        "Capital gains from stocks, mutual funds, property",
        "More than one house property",
        "Salary and pension income",
        "Interest and dividend income",
        "Agricultural income above 5,000",
      ],
      color: "#6366F1",
    };
  }

  return {
    form: "ITR-1",
    title: "ITR-1 (Sahaj)",
    description:
      "The simplest form for resident individuals with total income up to 50 lakhs. Most common form for salaried employees with straightforward income.",
    suitableFor: [
      "Salary or pension income",
      "One house property",
      "Interest income (savings, FD)",
      "Agricultural income up to 5,000",
      "Total income up to 50 lakhs",
    ],
    color: Colors.palette.teal,
  };
}

export default function ITRSelectorScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const progress = (currentStep + 1) / QUESTIONS.length;
  const question = QUESTIONS[currentStep];

  const handleAnswer = (answer: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);

    if (answer && (question.id === "business_income" || question.id === "foreign_income")) {
      setShowResult(true);
      return;
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleRestart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const result = getITRResult(answers);

  if (showResult) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
          <View style={styles.headerRow}>
            <Pressable onPress={handleBack} hitSlop={12}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>Your Result</Text>
            <Pressable onPress={handleRestart} hitSlop={12}>
              <Ionicons name="refresh-outline" size={22} color="rgba(255,255,255,0.8)" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={styles.resultScroll}
          contentContainerStyle={[styles.resultContent, { paddingBottom: bottomPad + 30 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.resultBadge, { backgroundColor: result.color }]}>
            <Ionicons name="document-text" size={28} color="#fff" />
            <Text style={styles.resultForm}>{result.form}</Text>
          </View>

          <Text style={[styles.resultTitle, { color: colors.text }]}>{result.title}</Text>
          <Text style={[styles.resultDesc, { color: colors.textSecondary }]}>{result.description}</Text>

          <View style={[styles.suitableCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.suitableTitle, { color: colors.text }]}>Suitable for</Text>
            {result.suitableFor.map((item, i) => (
              <View key={i} style={styles.suitableRow}>
                <Ionicons name="checkmark-circle" size={18} color={result.color} />
                <Text style={[styles.suitableText, { color: colors.text }]}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.answersCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.answersTitle, { color: colors.text }]}>Your Answers</Text>
            {QUESTIONS.filter((q) => answers[q.id] !== undefined).map((q) => (
              <View key={q.id} style={[styles.answerRow, { borderColor: colors.border }]}>
                <Text style={[styles.answerText, { color: colors.textSecondary }]} numberOfLines={1}>
                  {q.text}
                </Text>
                <View
                  style={[
                    styles.answerBadge,
                    {
                      backgroundColor: answers[q.id]
                        ? Colors.palette.teal + "15"
                        : Colors.palette.danger + "15",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.answerBadgeText,
                      { color: answers[q.id] ? Colors.palette.teal : Colors.palette.danger },
                    ]}
                  >
                    {answers[q.id] ? "Yes" : "No"}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            onPress={handleRestart}
            style={({ pressed }) => [
              styles.restartButton,
              { backgroundColor: Colors.palette.navy, opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Ionicons name="refresh" size={18} color="#fff" />
            <Text style={styles.restartText}>Start Over</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={handleBack} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>ITR Form Selector</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>
            Question {currentStep + 1} of {QUESTIONS.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: Colors.palette.teal }]}
            />
          </View>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Animated.View
          key={question.id}
          entering={FadeInRight.duration(250)}
          exiting={FadeOutLeft.duration(150)}
          style={styles.questionInner}
        >
          <View style={[styles.questionIconWrap, { backgroundColor: Colors.palette.teal + "12" }]}>
            <Ionicons name={question.icon} size={32} color={Colors.palette.teal} />
          </View>

          <Text style={[styles.questionText, { color: colors.text }]}>{question.text}</Text>
          <Text style={[styles.questionSubtext, { color: colors.textSecondary }]}>{question.subtext}</Text>

          <View style={styles.answerButtons}>
            <Pressable
              onPress={() => handleAnswer(true)}
              style={({ pressed }) => [
                styles.answerButton,
                {
                  backgroundColor: Colors.palette.teal,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons name="checkmark" size={22} color="#fff" />
              <Text style={styles.answerButtonText}>Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => handleAnswer(false)}
              style={({ pressed }) => [
                styles.answerButton,
                {
                  backgroundColor: colors.cardBg,
                  borderWidth: 1.5,
                  borderColor: colors.border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons name="close" size={22} color={colors.text} />
              <Text style={[styles.answerButtonText, { color: colors.text }]}>No</Text>
            </Pressable>
          </View>
        </Animated.View>

        <View style={styles.dotsRow}>
          {QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i < currentStep
                      ? Colors.palette.teal
                      : i === currentStep
                      ? Colors.palette.navy
                      : colors.border,
                },
              ]}
            />
          ))}
        </View>
      </View>
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
  progressLabel: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.7)",
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
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  questionInner: {
    alignItems: "center",
  },
  questionIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
  },
  questionText: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 8,
    lineHeight: 30,
  },
  questionSubtext: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 36,
    paddingHorizontal: 12,
  },
  answerButtons: {
    flexDirection: "row",
    gap: 14,
    width: "100%",
  },
  answerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
  },
  answerButtonText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  resultScroll: { flex: 1 },
  resultContent: {
    paddingHorizontal: 20,
    paddingTop: 28,
    alignItems: "center",
  },
  resultBadge: {
    width: 88,
    height: 88,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginBottom: 20,
  },
  resultForm: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  resultDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  suitableCard: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 16,
  },
  suitableTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
  },
  suitableRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  suitableText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    flex: 1,
    lineHeight: 20,
  },
  answersCard: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginBottom: 24,
  },
  answersTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
  },
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 10,
  },
  answerText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  answerBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  answerBadgeText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  restartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  restartText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
});
