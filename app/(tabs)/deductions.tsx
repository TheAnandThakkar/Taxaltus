import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { SearchInput } from "@/components/ui/SearchInput";
import { sections } from "@/data/content";
import Colors from "@/constants/colors";

const CARD_COLORS = [
  Colors.palette.teal,
  Colors.palette.indigo,
  Colors.palette.gold,
  Colors.palette.pink,
  Colors.palette.purple,
  Colors.palette.cyan,
  Colors.palette.orange,
  Colors.palette.emerald,
  Colors.palette.rose,
  Colors.palette.tealLight,
  Colors.palette.indigoLight,
  Colors.palette.goldLight,
];

export default function DeductionsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? sections.filter(
        (s) =>
          s.sectionCode.toLowerCase().includes(search.toLowerCase()) ||
          s.title.toLowerCase().includes(search.toLowerCase())
      )
    : sections;

  const handlePress = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/sections/[id]", params: { id } });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: typeof sections[0]; index: number }) => {
      const accentColor = CARD_COLORS[index % CARD_COLORS.length];
      return (
        <Pressable
          onPress={() => handlePress(item.id)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: colors.cardBg,
              borderColor: colors.border,
              borderLeftColor: accentColor,
              borderLeftWidth: 3,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <View style={styles.cardTop}>
            <View style={[styles.sectionBadge, { backgroundColor: accentColor + "15" }]}>
              <Text style={[styles.sectionCode, { color: accentColor }]}>{item.sectionCode}</Text>
            </View>
            <View style={[styles.limitBadge, { backgroundColor: Colors.palette.gold + "12" }]}>
              <Ionicons name="cash-outline" size={12} color={Colors.palette.gold} />
              <Text style={[styles.limitText, { color: Colors.palette.gold }]}>{item.maxLimit}</Text>
            </View>
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.cardDesc, { color: colors.textSecondary }]} numberOfLines={2}>
            {item.explanation}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.footerLeft}>
              <View style={[styles.countDot, { backgroundColor: accentColor }]} />
              <Text style={[styles.includesCount, { color: colors.textSecondary }]}>
                {item.includes.length} eligible items
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={accentColor + "80"} />
          </View>
        </Pressable>
      );
    },
    [colors, handlePress]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={Colors.gradients.headerVibrant as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: (Platform.OS === "web" ? 67 : insets.top) + 12 }]}
      >
        <Text style={styles.headerTitle}>Deductions</Text>
        <Text style={styles.headerSubtitle}>Tax-saving provisions under the Income Tax Act</Text>
        <View style={styles.searchWrapper}>
          <SearchInput value={search} onChangeText={setSearch} placeholder="Search sections (80C, 80D...)" />
        </View>
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!filtered.length}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={40} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No sections found</Text>
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
    paddingTop: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  sectionCode: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  limitBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  limitText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  includesCount: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
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
