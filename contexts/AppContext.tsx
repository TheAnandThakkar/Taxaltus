import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppContextValue {
  bookmarks: string[];
  recentlyViewed: string[];
  hasSeenDisclaimer: boolean;
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  setDisclaimerSeen: () => void;
  isDark: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const BOOKMARKS_KEY = "@taxaltus_bookmarks";
const RECENT_KEY = "@taxaltus_recent";
const DISCLAIMER_KEY = "@taxaltus_disclaimer";

export function AppProvider({ children, isDark }: { children: ReactNode; isDark: boolean }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hasSeenDisclaimer, setHasSeenDisclaimer] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [bk, rc, ds] = await Promise.all([
          AsyncStorage.getItem(BOOKMARKS_KEY),
          AsyncStorage.getItem(RECENT_KEY),
          AsyncStorage.getItem(DISCLAIMER_KEY),
        ]);
        if (bk) setBookmarks(JSON.parse(bk));
        if (rc) setRecentlyViewed(JSON.parse(rc));
        if (ds === "true") setHasSeenDisclaimer(true);
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

  const value = useMemo(
    () => ({
      bookmarks,
      recentlyViewed,
      hasSeenDisclaimer,
      toggleBookmark,
      isBookmarked,
      addRecentlyViewed,
      setDisclaimerSeen,
      isDark,
    }),
    [bookmarks, recentlyViewed, hasSeenDisclaimer, toggleBookmark, isBookmarked, addRecentlyViewed, setDisclaimerSeen, isDark]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
