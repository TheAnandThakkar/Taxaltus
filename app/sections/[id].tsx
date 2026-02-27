import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { Accordion } from "@/components/ui/Accordion";
import { sections } from "@/data/content";
import Colors from "@/constants/colors";

export default function SectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { addRecentlyViewed } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const section = useMemo(() => sections.find((s) => s.id === id), [id]);

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  if (!section) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 100 }}>Section not found</Text>
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
          <BookmarkButton id={section.id} />
        </View>
        <View style={styles.headerBadges}>
          <View style={[styles.codeBadge, { backgroundColor: Colors.palette.teal }]}>
            <Text style={styles.codeBadgeText}>{section.sectionCode}</Text>
          </View>
          <View style={[styles.limitBadge, { backgroundColor: Colors.palette.gold + "20" }]}>
            <Text style={[styles.limitText, { color: Colors.palette.goldLight }]}>Limit: {section.maxLimit}</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>{section.title}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: colors.tint }]}>Overview</Text>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{section.explanation}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: Colors.palette.gold }]}>Eligible Items</Text>
          {section.includes.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.palette.teal} />
              <Text style={[styles.listText, { color: colors.text }]}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.cardLabel, { color: "#6366F1" }]}>Example</Text>
          <View style={[styles.exampleBox, { backgroundColor: colors.searchBg }]}>
            <Text style={[styles.bodyText, { color: colors.text }]}>{section.example}</Text>
          </View>
        </View>

        {section.faqs.length > 0 && (
          <View style={styles.faqSection}>
            <Text style={[styles.subTitle, { color: colors.text }]}>Common Questions</Text>
            {section.faqs.map((faq, i) => (
              <Accordion key={i} title={faq.q}>
                <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{faq.a}</Text>
              </Accordion>
            ))}
          </View>
        )}

        {section.officialLinks.length > 0 && (
          <View style={styles.linksSection}>
            {section.officialLinks.map((link, i) => (
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
  headerBadges: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  codeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  codeBadgeText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  limitBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  limitText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.3,
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
  exampleBox: {
    borderRadius: 10,
    padding: 14,
  },
  faqSection: {
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
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
