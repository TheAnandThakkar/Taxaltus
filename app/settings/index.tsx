import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Linking, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";
import Colors from "@/constants/colors";
import { useApp } from "@/contexts/AppContext";

const SOURCES = [
  { label: "Income Tax Department of India", url: "https://www.incometax.gov.in" },
  { label: "CBDT (Central Board of Direct Taxes)", url: "https://www.incometax.gov.in/iec/foportal" },
  { label: "EPFO (Employees Provident Fund)", url: "https://www.epfindia.gov.in" },
  { label: "Income Tax Act, 1961", url: "https://www.incometax.gov.in" },
];

const SOCIAL_LINKS = [
  { label: "Twitter / X", icon: "logo-twitter" as const, url: "https://x.com/TheAnandThakkar" },
  { label: "LinkedIn", icon: "logo-linkedin" as const, url: "https://www.linkedin.com/in/theanandthakkar/" },
  { label: "GitHub", icon: "logo-github" as const, url: "https://github.com/TheAnandThakkar" },
  { label: "Website", icon: "globe-outline" as const, url: "https://www.anandthakkar.com/" },
];

export default function SettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const { notificationsEnabled, toggleNotifications } = useApp();
  const isWeb = Platform.OS === "web";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: Colors.palette.navy, paddingTop: topPad + 8 }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: Platform.OS === "web" ? 34 + 40 : insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={[styles.disclaimerIcon, { backgroundColor: Colors.palette.teal + "15" }]}>
            <Ionicons name="shield-checkmark" size={28} color={Colors.palette.teal} />
          </View>
          <Text style={[styles.cardLabel, { color: colors.tint }]}>Disclaimer</Text>
          <Text style={[styles.bodyText, { color: colors.textSecondary }]}>
            Taxaltus provides educational information only and does not offer tax advice. For personal tax filing decisions, consult a qualified professional or official government resources.
          </Text>
          <Text style={[styles.bodyTextSmall, { color: colors.textSecondary }]}>
            This app never asks for salary amounts, PAN, Aadhaar, employer details, or Form 16 uploads. It does not compute user-specific tax. All examples use generic, illustrative numbers.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.notifRow}>
            <View style={styles.notifContent}>
              <View style={[styles.notifIconWrap, { backgroundColor: Colors.palette.teal + "15" }]}>
                <Ionicons name="notifications-outline" size={22} color={Colors.palette.teal} />
              </View>
              <View style={styles.notifTextWrap}>
                <Text style={[styles.notifTitle, { color: colors.text }]}>Tax Deadline Reminders</Text>
                <Text style={[styles.notifDesc, { color: colors.textSecondary }]}>
                  {isWeb
                    ? "Notifications are available on mobile devices only"
                    : "Get reminded 3 days before advance tax, ITR filing, and investment deadlines"}
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              disabled={isWeb}
              trackColor={{ false: "#ccc", true: Colors.palette.teal + "60" }}
              thumbColor={notificationsEnabled ? Colors.palette.teal : "#f4f3f4"}
            />
          </View>
          {notificationsEnabled && !isWeb && (
            <View style={[styles.notifSchedule, { borderTopColor: colors.border }]}>
              <Text style={[styles.notifScheduleTitle, { color: colors.textSecondary }]}>Scheduled reminders:</Text>
              {[
                "Jun 12 — Advance Tax (1st installment)",
                "Jul 28 — ITR Filing Deadline",
                "Sep 12 — Advance Tax (2nd installment)",
                "Dec 12 — Advance Tax (3rd installment)",
                "Dec 28 — Belated/Revised Return",
                "Mar 12 — Advance Tax (4th installment)",
                "Mar 28 — Tax-Saving Investment Deadline",
              ].map((item, i) => (
                <View key={i} style={styles.notifItem}>
                  <Ionicons name="time-outline" size={13} color={colors.textSecondary} />
                  <Text style={[styles.notifItemText, { color: colors.text }]}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Rate & Review</Text>
        <View style={styles.storeCards}>
          <Pressable
            onPress={() => Linking.openURL("https://play.google.com/store/apps")}
            style={({ pressed }) => [
              styles.storeCard,
              { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <View style={[styles.storeIconWrap, { backgroundColor: "#34A853" + "15" }]}>
              <Ionicons name="logo-google-playstore" size={24} color="#34A853" />
            </View>
            <Text style={[styles.storeLabel, { color: colors.text }]}>Google Play</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name="star" size={12} color={Colors.palette.gold} />
              ))}
            </View>
            <Text style={[styles.storeAction, { color: Colors.palette.teal }]}>Rate on Play Store</Text>
          </Pressable>
          <Pressable
            onPress={() => Linking.openURL("https://apps.apple.com")}
            style={({ pressed }) => [
              styles.storeCard,
              { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <View style={[styles.storeIconWrap, { backgroundColor: "#007AFF" + "15" }]}>
              <Ionicons name="logo-apple-appstore" size={24} color="#007AFF" />
            </View>
            <Text style={[styles.storeLabel, { color: colors.text }]}>App Store</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name="star" size={12} color={Colors.palette.gold} />
              ))}
            </View>
            <Text style={[styles.storeAction, { color: Colors.palette.teal }]}>Rate on App Store</Text>
          </Pressable>
        </View>
        <Text style={[styles.rateNote, { color: colors.textSecondary }]}>
          Your ratings and reviews help other salaried employees discover Taxaltus
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Official Sources</Text>
        {SOURCES.map((source, i) => (
          <Pressable
            key={i}
            onPress={() => Linking.openURL(source.url)}
            style={({ pressed }) => [
              styles.sourceItem,
              { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <View style={styles.sourceContent}>
              <Ionicons name="globe-outline" size={18} color={colors.tint} />
              <Text style={[styles.sourceText, { color: colors.text }]}>{source.label}</Text>
            </View>
            <Ionicons name="open-outline" size={16} color={colors.textSecondary} />
          </Pressable>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>App</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Taxaltus</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Version</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Purpose</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Education Only</Text>
          </View>
          <View style={[styles.aboutRow, { borderBottomWidth: 0 }]}>
            <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>Content</Text>
            <Text style={[styles.aboutValue, { color: colors.text }]}>Offline-first, no tracking</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Developer</Text>
        <View style={[styles.devCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={[styles.devAvatarWrap, { backgroundColor: Colors.palette.navy }]}>
            <Text style={styles.devInitials}>AT</Text>
          </View>
          <Text style={[styles.devName, { color: colors.text }]}>Anand Thakkar</Text>
          <Text style={[styles.devRole, { color: colors.textSecondary }]}>Developer & Creator</Text>
          <View style={styles.socialLinks}>
            {SOCIAL_LINKS.map((link, i) => (
              <Pressable
                key={i}
                onPress={() => Linking.openURL(link.url)}
                style={({ pressed }) => [
                  styles.socialBtn,
                  { backgroundColor: colors.background, opacity: pressed ? 0.7 : 1 },
                ]}
                hitSlop={4}
              >
                <Ionicons name={link.icon} size={18} color={Colors.palette.navy} />
                <Text style={[styles.socialLabel, { color: colors.text }]}>{link.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Built With</Text>
        <Pressable
          onPress={() => Linking.openURL("https://replit.com")}
          style={({ pressed }) => [
            styles.replitCard,
            { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <View style={[styles.replitIconWrap, { backgroundColor: "#F26207" + "15" }]}>
            <Ionicons name="code-slash-outline" size={28} color="#F26207" />
          </View>
          <Text style={[styles.replitTitle, { color: colors.text }]}>Replit</Text>
          <Text style={[styles.replitDesc, { color: colors.textSecondary }]}>
            This app was built with the help of Replit — an amazing platform that makes software development accessible to everyone. A huge thanks to the Replit team for making tools that empower creators.
          </Text>
          <View style={[styles.replitLink, { backgroundColor: "#F26207" + "12" }]}>
            <Text style={[styles.replitLinkText, { color: "#F26207" }]}>Visit replit.com</Text>
            <Ionicons name="open-outline" size={14} color="#F26207" />
          </View>
        </Pressable>
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
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
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
    marginBottom: 20,
  },
  disclaimerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    marginBottom: 10,
  },
  bodyTextSmall: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 12,
  },
  storeCards: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  storeCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  storeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  storeLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  storeAction: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  rateNote: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },
  sourceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  sourceContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  sourceText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flex: 1,
  },
  aboutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  aboutLabel: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  aboutValue: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  devCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  devAvatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  devInitials: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  devName: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 2,
  },
  devRole: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  socialLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  replitCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  replitIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  replitTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  replitDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 14,
  },
  replitLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  replitLinkText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  notifRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notifContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 12,
  },
  notifIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  notifTextWrap: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  notifDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
  },
  notifSchedule: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  notifScheduleTitle: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  notifItemText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
