import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import { useApp } from "@/contexts/AppContext";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { Accordion } from "@/components/ui/Accordion";
import { Chip } from "@/components/ui/Chip";
import { form16Fields, sections, glossary } from "@/data/content";
import Colors from "@/constants/colors";

export default function FieldDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const { addRecentlyViewed } = useApp();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const field = useMemo(() => form16Fields.find((f) => f.id === id), [id]);

  useEffect(() => {
    if (id) addRecentlyViewed(id);
  }, [id]);

  if (!field) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 100 }}>Field not found</Text>
      </View>
    );
  }

  const relatedSectionItems = field.relatedSections
    .map((sid) => sections.find((s) => s.id === sid))
    .filter(Boolean);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <BookmarkButton id={field.id} />
        </View>
        <View style={[styles.specimenKey, { backgroundColor: Colors.palette.teal }]}>
          <Text style={styles.specimenKeyText}>{field.specimenKey}</Text>
        </View>
        <Text style={styles.headerTitle}>{field.label}</Text>
        <View style={styles.headerMeta}>
          <View style={[styles.metaBadge, { backgroundColor: "rgba(255,255,255,0.15)" }]}>
            <Ionicons name="briefcase-outline" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.metaText}>{field.headOfIncome}</Text>
          </View>
          <View style={[styles.metaBadge, { backgroundColor: "rgba(255,255,255,0.15)" }]}>
            <Text style={styles.metaText}>{field.partLabel}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={18} color={Colors.palette.teal} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>What it means</Text>
          </View>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{field.description}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="star" size={18} color={Colors.palette.gold} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Why it matters</Text>
          </View>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{field.whyItMatters}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calculator" size={18} color="#6366F1" />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>How it's calculated</Text>
          </View>
          <View style={[styles.formulaBox, { backgroundColor: colors.searchBg }]}>
            <Text style={[styles.formulaText, { color: colors.text }]}>{field.calculation}</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="receipt" size={18} color="#EC4899" />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Taxability</Text>
          </View>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{field.taxability}</Text>
        </View>

        {field.faqs.length > 0 && (
          <View style={styles.faqSection}>
            <Text style={[styles.subSectionTitle, { color: colors.text }]}>Common Questions</Text>
            {field.faqs.map((faq, i) => (
              <Accordion key={i} title={faq.q}>
                <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{faq.a}</Text>
              </Accordion>
            ))}
          </View>
        )}

        {relatedSectionItems.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={[styles.subSectionTitle, { color: colors.text }]}>Related Sections</Text>
            <View style={styles.chipRow}>
              {relatedSectionItems.map(
                (s) =>
                  s && (
                    <Chip
                      key={s.id}
                      label={s.sectionCode}
                      onPress={() => router.push({ pathname: "/sections/[id]", params: { id: s.id } })}
                    />
                  )
              )}
            </View>
          </View>
        )}

        {field.officialLinks.length > 0 && (
          <View style={styles.linksSection}>
            {field.officialLinks.map((link, i) => (
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
  specimenKey: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  specimenKeyText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  headerMeta: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  metaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  metaText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  formulaBox: {
    borderRadius: 10,
    padding: 14,
  },
  formulaText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    lineHeight: 20,
  },
  faqSection: {
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  relatedSection: {
    marginBottom: 12,
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
