import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { headsOfIncome } from "@/data/content";
import Colors from "@/constants/colors";

const HEAD_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  "h-salary": "briefcase-outline",
  "h-house-property": "home-outline",
  "h-business": "storefront-outline",
  "h-capital-gains": "trending-up-outline",
  "h-other-sources": "layers-outline",
};

const HEAD_COLORS = [
  Colors.palette.teal,
  Colors.palette.gold,
  "#6366F1",
  "#EC4899",
  "#8B5CF6",
];

export default function HeadsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handlePress = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/heads/[id]", params: { id } });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: typeof headsOfIncome[0]; index: number }) => {
      const accentColor = HEAD_COLORS[index % HEAD_COLORS.length];
      return (
        <Pressable
          onPress={() => handlePress(item.id)}
          style={({ pressed }) => [
            styles.card,
            { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: accentColor + "15" }]}>
              <Ionicons
                name={HEAD_ICONS[item.id] || "layers-outline"}
                size={24}
                color={accentColor}
              />
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.cardDesc, { color: colors.textSecondary }]} numberOfLines={3}>
            {item.overview}
          </Text>
          <View style={styles.tagRow}>
            {item.includes.slice(0, 3).map((inc) => (
              <View key={inc} style={[styles.tag, { backgroundColor: accentColor + "10" }]}>
                <Text style={[styles.tagText, { color: accentColor }]} numberOfLines={1}>
                  {inc}
                </Text>
              </View>
            ))}
            {item.includes.length > 3 && (
              <Text style={[styles.moreText, { color: colors.textSecondary }]}>
                +{item.includes.length - 3} more
              </Text>
            )}
          </View>
        </Pressable>
      );
    },
    [colors, handlePress]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 12 }]}>
        <Text style={styles.headerTitle}>Heads of Income</Text>
        <Text style={styles.headerSubtitle}>Five categories under which all income is classified</Text>
      </View>

      <FlatList
        data={headsOfIncome}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: Platform.OS === "web" ? 34 + 84 : insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      />
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 4,
    maxWidth: 140,
  },
  tagText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  moreText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    marginLeft: 4,
  },
});
