import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { quizzes } from "@/data/content";
import Colors from "@/constants/colors";

type QuizState = "answering" | "reviewed" | "finished";

export default function QuizScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [state, setState] = useState<QuizState>("answering");
  const [score, setScore] = useState(0);

  const quiz = quizzes[currentIndex];
  const isCorrect = selectedOption === quiz?.answerIndex;
  const progress = (currentIndex + 1) / quizzes.length;

  const handleSelect = useCallback(
    (index: number) => {
      if (state !== "answering") return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedOption(index);
      setState("reviewed");
      if (index === quiz.answerIndex) {
        setScore((s) => s + 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    },
    [state, quiz]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setState("answering");
    } else {
      setState("finished");
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setState("answering");
    setScore(0);
  }, []);

  if (state === "finished") {
    const percentage = Math.round((score / quizzes.length) * 100);
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.finishedContent}>
          <View style={[styles.scoreCircle, { borderColor: percentage >= 70 ? Colors.palette.teal : Colors.palette.gold }]}>
            <Text style={[styles.scoreNum, { color: colors.text }]}>{score}/{quizzes.length}</Text>
            <Text style={[styles.scorePct, { color: colors.textSecondary }]}>{percentage}%</Text>
          </View>
          <Text style={[styles.finishedTitle, { color: colors.text }]}>
            {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good job!" : "Keep learning!"}
          </Text>
          <Text style={[styles.finishedDesc, { color: colors.textSecondary }]}>
            {percentage >= 80
              ? "You have a strong grasp of tax concepts."
              : percentage >= 60
              ? "You're on the right track. Review the topics you missed."
              : "Explore the app to strengthen your understanding."}
          </Text>
          <Pressable
            onPress={handleRestart}
            style={({ pressed }) => [
              styles.retryBtn,
              { backgroundColor: Colors.palette.teal, opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Ionicons name="refresh" size={18} color="#fff" />
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backBtn,
              { borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={[styles.backBtnText, { color: colors.text }]}>Back to Learn</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerCounter}>
            {currentIndex + 1} / {quizzes.length}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: Colors.palette.teal }]} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.question, { color: colors.text }]}>{quiz.question}</Text>

        <View style={styles.options}>
          {quiz.options.map((option, i) => {
            let optionBg = colors.cardBg;
            let optionBorder = colors.border;
            let optionIcon: React.ReactNode = null;

            if (state === "reviewed") {
              if (i === quiz.answerIndex) {
                optionBg = Colors.palette.teal + "15";
                optionBorder = Colors.palette.teal;
                optionIcon = <Ionicons name="checkmark-circle" size={22} color={Colors.palette.teal} />;
              } else if (i === selectedOption && !isCorrect) {
                optionBg = Colors.palette.danger + "15";
                optionBorder = Colors.palette.danger;
                optionIcon = <Ionicons name="close-circle" size={22} color={Colors.palette.danger} />;
              }
            } else if (selectedOption === i) {
              optionBorder = colors.tint;
            }

            return (
              <Pressable
                key={i}
                onPress={() => handleSelect(i)}
                style={({ pressed }) => [
                  styles.option,
                  { backgroundColor: optionBg, borderColor: optionBorder, opacity: pressed && state === "answering" ? 0.8 : 1 },
                ]}
              >
                <View style={[styles.optionLetter, { backgroundColor: colors.searchBg }]}>
                  <Text style={[styles.optionLetterText, { color: colors.text }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                {optionIcon && <View style={styles.optionIcon}>{optionIcon}</View>}
              </Pressable>
            );
          })}
        </View>

        {state === "reviewed" && (
          <View style={[styles.explanationCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.explanationLabel, { color: isCorrect ? Colors.palette.teal : Colors.palette.gold }]}>
              {isCorrect ? "Correct!" : "Explanation"}
            </Text>
            <Text style={[styles.explanationText, { color: colors.textSecondary }]}>{quiz.explanation}</Text>
          </View>
        )}

        {state === "reviewed" && (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextBtn,
              { backgroundColor: Colors.palette.teal, opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.nextBtnText}>
              {currentIndex < quizzes.length - 1 ? "Next Question" : "See Results"}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
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
    marginBottom: 14,
  },
  headerCounter: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  question: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    lineHeight: 28,
    marginBottom: 24,
  },
  options: {
    gap: 10,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  optionLetterText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  optionIcon: {
    marginLeft: 8,
  },
  explanationCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  explanationLabel: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  finishedContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  scoreNum: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  scorePct: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  finishedTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  finishedDesc: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
    marginBottom: 12,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  backBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
  },
  backBtnText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});
