import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const TAX_DEADLINES = [
  { id: "adv1", title: "Advance Tax - 1st Installment", body: "15% of advance tax is due by June 15", month: 6, day: 15 },
  { id: "itr", title: "ITR Filing Deadline", body: "Last date to file Income Tax Return for salaried individuals is July 31", month: 7, day: 31 },
  { id: "adv2", title: "Advance Tax - 2nd Installment", body: "45% of advance tax is due by September 15", month: 9, day: 15 },
  { id: "adv3", title: "Advance Tax - 3rd Installment", body: "75% of advance tax is due by December 15", month: 12, day: 15 },
  { id: "belated", title: "Belated/Revised Return Deadline", body: "Last date to file belated or revised return is December 31", month: 12, day: 31 },
  { id: "adv4", title: "Advance Tax - 4th Installment", body: "100% of advance tax is due by March 15", month: 3, day: 15 },
  { id: "invest", title: "Tax-Saving Investment Deadline", body: "Last date to make tax-saving investments (80C, 80D, NPS) for the financial year is March 31", month: 3, day: 31 },
];

interface AppContextValue {
  bookmarks: string[];
  recentlyViewed: string[];
  hasSeenDisclaimer: boolean;
  checkedItems: string[];
  notificationsEnabled: boolean;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  setDisclaimerSeen: () => void;
  toggleChecked: (id: string) => void;
  isChecked: (id: string) => boolean;
  resetChecklist: () => void;
  toggleNotifications: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const BOOKMARKS_KEY = "@taxaltus_bookmarks";
const RECENT_KEY = "@taxaltus_recent";
const DISCLAIMER_KEY = "@taxaltus_disclaimer";
const CHECKLIST_KEY = "@taxaltus_checklist";
const NOTIF_KEY = "@taxaltus_notifications";

async function scheduleAllNotifications() {
  if (Platform.OS === "web") return;
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("tax-reminders", {
      name: "Tax Deadline Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }
  await Notifications.cancelAllScheduledNotificationsAsync();
  const now = new Date();
  for (const deadline of TAX_DEADLINES) {
    let targetDate = new Date(now.getFullYear(), deadline.month - 1, deadline.day, 9, 0, 0);
    const reminderDate = new Date(targetDate.getTime() - 3 * 24 * 60 * 60 * 1000);
    if (reminderDate <= now) {
      targetDate = new Date(now.getFullYear() + 1, deadline.month - 1, deadline.day, 9, 0, 0);
      const nextReminder = new Date(targetDate.getTime() - 3 * 24 * 60 * 60 * 1000);
      if (nextReminder <= now) continue;
      await Notifications.scheduleNotificationAsync({
        content: { title: deadline.title, body: deadline.body, sound: "default" },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: nextReminder, channelId: Platform.OS === "android" ? "tax-reminders" : undefined },
      });
    } else {
      await Notifications.scheduleNotificationAsync({
        content: { title: deadline.title, body: deadline.body, sound: "default" },
        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: reminderDate, channelId: Platform.OS === "android" ? "tax-reminders" : undefined },
      });
    }
  }
}

async function cancelAllNotifications() {
  if (Platform.OS === "web") return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hasSeenDisclaimer, setHasSeenDisclaimer] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [bk, rc, ds, cl, nf] = await Promise.all([
          AsyncStorage.getItem(BOOKMARKS_KEY),
          AsyncStorage.getItem(RECENT_KEY),
          AsyncStorage.getItem(DISCLAIMER_KEY),
          AsyncStorage.getItem(CHECKLIST_KEY),
          AsyncStorage.getItem(NOTIF_KEY),
        ]);
        if (bk) setBookmarks(JSON.parse(bk));
        if (rc) setRecentlyViewed(JSON.parse(rc));
        if (ds === "true") setHasSeenDisclaimer(true);
        if (cl) setCheckedItems(JSON.parse(cl));
        if (nf === "true") setNotificationsEnabled(true);
      } catch {}
    })();
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((r) => r !== id);
      const next = [id, ...filtered].slice(0, 20);
      AsyncStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setDisclaimerSeen = useCallback(() => {
    setHasSeenDisclaimer(true);
    AsyncStorage.setItem(DISCLAIMER_KEY, "true");
  }, []);

  const toggleChecked = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isChecked = useCallback((id: string) => checkedItems.includes(id), [checkedItems]);

  const resetChecklist = useCallback(() => {
    setCheckedItems([]);
    AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify([]));
  }, []);

  const toggleNotifications = useCallback(async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      AsyncStorage.setItem(NOTIF_KEY, "false");
      await cancelAllNotifications();
    } else {
      if (Platform.OS !== "web") {
        const { status, canAskAgain } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          if (!canAskAgain) {
            Alert.alert(
              "Notifications Disabled",
              "Please enable notifications for Taxaltus in your device settings to receive tax deadline reminders.",
              [{ text: "OK" }]
            );
          }
          return;
        }
      }
      setNotificationsEnabled(true);
      AsyncStorage.setItem(NOTIF_KEY, "true");
      await scheduleAllNotifications();
    }
  }, [notificationsEnabled]);

  const value = useMemo(
    () => ({
      bookmarks,
      recentlyViewed,
      hasSeenDisclaimer,
      checkedItems,
      notificationsEnabled,
      toggleBookmark,
      isBookmarked,
      addRecentlyViewed,
      setDisclaimerSeen,
      toggleChecked,
      isChecked,
      resetChecklist,
      toggleNotifications,
    }),
    [bookmarks, recentlyViewed, hasSeenDisclaimer, checkedItems, notificationsEnabled, toggleBookmark, isBookmarked, addRecentlyViewed, setDisclaimerSeen, toggleChecked, isChecked, resetChecklist, toggleNotifications]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
