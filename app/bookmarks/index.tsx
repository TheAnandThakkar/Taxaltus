import React, { useMemo, useCallback } from "react";
import { View, Text, StyleSheet, SectionList, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { form16Fields, sections, glossary, headsOfIncome } from "@/data/content";
import Colors from "@/constants/colors";

function getItemInfo(id: string): { label: string; sub: string; route: string; params: any } | null {
  const f = form16Fields.find((x) => x.id === id);
  if (f) return { label: f.label, sub: `Form 16 - ${f.partLabel}`, route: "/form16/[id]", params: { id } };
  const s = sections.find((x) => x.id === id);
  if (s) return { label: `${s.sectionCode} - ${s.title}`, sub: `Limit: ${s.maxLimit}`, route: "/sections/[id]", params: { id } };
  const g = glossary.find((x) => x.id === id);
  if (g) return { label: g.term, sub: g.shortDef, route: "/glossary/[id]", params: { id } };
  const h = headsOfIncome.find((x) => x.id === id);
  if (h) return { label: h.name, sub: "Head of Income", route: "/heads/[id]", params: { id } };
  return null;
}

function categorize(id: string): string {
  if (id.startsWith("f-")) return "Form 16 Fields";
  if (id.startsWith("s-")) return "Deductions & Sections";
  if (id.startsWith("g-")) return "Glossary Terms";
  if (id.startsWith("h-")) return "Heads of Income";
  return "Other";
}

export default function BookmarksScreen() {
  const { colors } = useTheme();
  const { bookmarks, recentlyViewed } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const bookmarkSections = useMemo(() => {
    const grouped: Record<string, { id: string; info: ReturnType<typeof getItemInfo> }[]> = {};
    bookmarks.forEach((id) => {
      const info = getItemInfo(id);
      if (!info) return;
      const cat = categorize(id);
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ id, info });
    });
    return Object.entries(grouped).map(([title, data]) => ({ title, data }));
  }, [bookmarks]);

  const recentItems = useMemo(() => {
    return recentlyViewed
      .slice(0, 10)
      .map((id) => ({ id, info: getItemInfo(id) }))
      .filter((x) => x.info !== null);
  }, [recentlyViewed]);

  const handlePress = useCallback((route: string, params: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: route as any, params });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Saved Items</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {bookmarks.length === 0 && recentItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={48} color={colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No saved items yet</Text>
          <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
            Tap the bookmark icon on any item to save it here for quick access
          </Text>
        </View>
      ) : (
        <SectionList
          sections={[
            ...(bookmarkSections.length > 0 ? bookmarkSections : []),
            ...(recentItems.length > 0 ? [{ title: "Recently Viewed", data: recentItems }] : []),
          ]}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
              <Text style={[styles.sectionTitle, { color: colors.tint }]}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => {
            if (!item.info) return null;
            return (
              <Pressable
                onPress={() => handlePress(item.info!.route, item.info!.params)}
                style={({ pressed }) => [
                  styles.item,
                  { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.92 : 1 },
                ]}
              >
                <View style={styles.itemContent}>
                  <Text style={[styles.itemLabel, { color: colors.text }]} numberOfLines={1}>
                    {item.info!.label}
                  </Text>
                  <Text style={[styles.itemSub, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.info!.sub}
                  </Text>
                </View>
                <BookmarkButton id={item.id} size={18} />
              </Pressable>
            );
          }}
          contentContainerStyle={[styles.list, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
        />
      )}
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
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  list: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  itemSub: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 22,
  },
});
