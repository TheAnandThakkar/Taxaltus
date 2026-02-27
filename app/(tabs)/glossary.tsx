import React, { useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, SectionList, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { SearchInput } from "@/components/ui/SearchInput";
import { glossary } from "@/data/content";
import Colors from "@/constants/colors";

const LETTER_COLORS = [
  Colors.palette.teal,
  Colors.palette.indigo,
  Colors.palette.gold,
  Colors.palette.pink,
  Colors.palette.purple,
  Colors.palette.cyan,
  Colors.palette.orange,
  Colors.palette.emerald,
  Colors.palette.rose,
];

export default function GlossaryScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const items = search.trim()
      ? glossary.filter(
          (g) =>
            g.term.toLowerCase().includes(search.toLowerCase()) ||
            g.shortDef.toLowerCase().includes(search.toLowerCase())
        )
      : glossary;
    const sorted = [...items].sort((a, b) => a.term.localeCompare(b.term));
    const grouped: Record<string, typeof glossary> = {};
    sorted.forEach((item) => {
      const letter = item.term[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(item);
    });
    return Object.entries(grouped).map(([title, data]) => ({ title, data }));
  }, [search]);

  const handlePress = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/glossary/[id]", params: { id } });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={Colors.gradients.headerVibrant as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: (Platform.OS === "web" ? 67 : insets.top) + 12 }]}
      >
        <Text style={styles.headerTitle}>Glossary</Text>
        <Text style={styles.headerSubtitle}>Tax terms explained simply</Text>
        <View style={styles.searchWrapper}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search terms (TDS, PAN, HRA...)" />
        </View>
      </LinearGradient>

      <SectionList
        sections={filtered}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => {
          const letterIndex = section.title.charCodeAt(0) % LETTER_COLORS.length;
          const letterColor = LETTER_COLORS[letterIndex];
          return (
            <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
              <View style={[styles.letterBadge, { backgroundColor: letterColor + "15" }]}>
                <Text style={[styles.sectionLetter, { color: letterColor }]}>{section.title}</Text>
              </View>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          const itemColor = LETTER_COLORS[(item.term.charCodeAt(0) + index) % LETTER_COLORS.length];
          return (
            <Pressable
              onPress={() => handlePress(item.id)}
              style={({ pressed }) => [
                styles.item,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                  borderLeftColor: itemColor,
                  borderLeftWidth: 3,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View style={styles.itemContent}>
                <Text style={[styles.term, { color: colors.text }]}>{item.term}</Text>
                <Text style={[styles.shortDef, { color: colors.textSecondary }]} numberOfLines={2}>
                  {item.shortDef}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={itemColor + "80"} />
            </Pressable>
          );
        }}
        contentContainerStyle={[styles.list, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={40} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No terms found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
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
    marginBottom: 16,
  },
  searchWrapper: { marginBottom: 4 },
  list: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionLetter: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 8,
  },
  itemContent: {
    flex: 1,
  },
  term: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 3,
  },
  shortDef: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});
