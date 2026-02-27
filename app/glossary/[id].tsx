import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Linking, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { Chip } from "@/components/ui/Chip";
import { glossary } from "@/data/content";
import Colors from "@/constants/colors";

export default function TermDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { addRecentlyViewed } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const term = useMemo(() => glossary.find((g) => g.id === id), [id]);
  const relatedTerms = useMemo(
    () => (term ? term.relatedIds.map((rid) => glossary.find((g) => g.id === rid)).filter(Boolean) : []),
    [term]
  );

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  if (!term) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 100 }}>Term not found</Text>
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
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => {
                Share.share({
                  message: `${term.term}\n\n${term.shortDef}\n\n${term.longDef}\n\nLearn more on Taxaltus`,
                });
              }}
              hitSlop={12}
            >
              <Ionicons name="share-outline" size={22} color="#fff" />
            </Pressable>
            <BookmarkButton id={term.id} />
          </View>
        </View>
        <Text style={styles.headerTitle}>{term.term}</Text>
        <Text style={styles.headerShortDef}>{term.shortDef}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.tint }]}>Detailed Explanation</Text>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{term.longDef}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: Colors.palette.gold }]}>Example</Text>
          <View style={[styles.exampleBox, { backgroundColor: colors.searchBg }]}>
            <Text style={[styles.bodyText, { color: colors.text }]}>{term.example}</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: "#6366F1" }]}>Where You See It</Text>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{term.whereYouSeeIt}</Text>
        </View>

        {relatedTerms.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={[styles.subTitle, { color: colors.text }]}>Related Terms</Text>
            <View style={styles.chipRow}>
              {relatedTerms.map(
                (rt) =>
                  rt && (
                    <Chip
                      key={rt.id}
                      label={rt.term}
                      onPress={() => router.push({ pathname: "/glossary/[id]", params: { id: rt.id } })}
                    />
                  )
              )}
            </View>
          </View>
        )}

        {term.officialLinks.length > 0 && (
          <View style={styles.linksSection}>
            {term.officialLinks.map((link, i) => (
              <Pressable
                key={i}
                onPress={() => Linking.openURL(link.url)}
                style={({ pressed }) => [
                  styles.linkBtn,
                  { backgroundColor: colors.chipBg, opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Ionicons name="open-outline" size={16} color={colors.tint} />
                <Text style={[styles.linkText, { color: colors.tint }]}>{link.label}</Text>
              </Pressable>
            ))}
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
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  headerShortDef: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.7)",
    marginTop: 6,
    lineHeight: 20,
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
  exampleBox: {
    borderRadius: 10,
    padding: 14,
  },
  relatedSection: {
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  linksSection: {
    gap: 8,
    marginBottom: 12,
  },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
});
