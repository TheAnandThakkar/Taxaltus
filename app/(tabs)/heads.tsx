import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

const HEAD_GRADIENTS: readonly (readonly string[])[] = [
  Colors.gradients.teal,
  Colors.gradients.gold,
  Colors.gradients.indigo,
  Colors.gradients.pink,
  Colors.gradients.purple,
];

const HEAD_COLORS = [
  Colors.palette.teal,
  Colors.palette.gold,
  Colors.palette.indigo,
  Colors.palette.pink,
  Colors.palette.purple,
];

export default function HeadsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const handlePress = useCallback((id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: "/heads/[id]", params: { id } });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: typeof headsOfIncome[0]; index: number }) => {
      const accentColor = HEAD_COLORS[index % HEAD_COLORS.length];
      const gradient = HEAD_GRADIENTS[index % HEAD_GRADIENTS.length];
      return (
        <Pressable
          onPress={() => handlePress(item.id)}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: colors.cardBg,
              borderColor: colors.border,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <LinearGradient
              colors={gradient as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconCircle}
            >
              <Ionicons
                name={HEAD_ICONS[item.id] || "layers-outline"}
                size={24}
                color="#fff"
              />
            </LinearGradient>
            <Ionicons name="chevron-forward" size={16} color={accentColor + "80"} />
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.cardDesc, { color: colors.textSecondary }]} numberOfLines={3}>
            {item.overview}
          </Text>
          <View style={styles.tagRow}>
            {item.includes.slice(0, 3).map((inc) => (
              <View key={inc} style={[styles.tag, { backgroundColor: accentColor + "12" }]}>
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
      <LinearGradient
        colors={Colors.gradients.headerVibrant as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: (Platform.OS === "web" ? 67 : insets.top) + 12 }]}
      >
        <Text style={styles.headerTitle}>Heads of Income</Text>
        <Text style={styles.headerSubtitle}>Five categories under which all income is classified</Text>
      </LinearGradient>

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
    borderRadius: 10,
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
