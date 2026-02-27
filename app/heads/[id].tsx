import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { headsOfIncome } from "@/data/content";
import Colors from "@/constants/colors";

export default function HeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { addRecentlyViewed } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const head = useMemo(() => headsOfIncome.find((h) => h.id === id), [id]);

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  if (!head) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 100 }}>Head not found</Text>
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
          <BookmarkButton id={head.id} />
        </View>
        <Text style={styles.headerTitle}>{head.name}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.tint }]}>Overview</Text>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{head.overview}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: Colors.palette.teal }]}>What Counts</Text>
          {head.includes.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.palette.teal} />
              <Text style={[styles.listText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: Colors.palette.danger }]}>What Does NOT Count</Text>
          {head.excludes.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Ionicons name="close-circle" size={16} color={Colors.palette.danger} />
              <Text style={[styles.listText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: Colors.palette.gold }]}>Examples</Text>
          {head.examples.map((ex, i) => (
            <View key={i} style={styles.listItem}>
              <Ionicons name="arrow-forward-circle" size={16} color={Colors.palette.gold} />
              <Text style={[styles.listText, { color: colors.text }]}>{ex}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: "#6366F1" }]}>Common Terms</Text>
          <View style={styles.termRow}>
            {head.commonTerms.map((term, i) => (
              <View key={i} style={[styles.termChip, { backgroundColor: colors.chipBg }]}>
                <Text style={[styles.termText, { color: colors.chipText }]}>{term}</Text>
              </View>
            ))}
          </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  listText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    flex: 1,
    lineHeight: 20,
  },
  termRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  termChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  termText: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
});
