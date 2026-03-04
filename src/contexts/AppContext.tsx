import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface AppContextValue {
  bookmarks: string[];
  recentlyViewed: string[];
  checkedItems: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addRecentlyViewed: (id: string) => void;
  toggleChecked: (id: string) => void;
  isChecked: (id: string) => boolean;
  resetChecklist: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const BOOKMARKS_KEY = "taxaltus_bookmarks";
const RECENT_KEY = "taxaltus_recent";
const CHECKLIST_KEY = "taxaltus_checklist";

function loadJson(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    setBookmarks(loadJson(BOOKMARKS_KEY));
    setRecentlyViewed(loadJson(RECENT_KEY));
    setCheckedItems(loadJson(CHECKLIST_KEY));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks, isMounted]);

  useEffect(() => {
    if (isMounted) localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, isMounted]);

  useEffect(() => {
    if (isMounted) localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkedItems));
  }, [checkedItems, isMounted]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  }, []);

  const isBookmarked = useCallback((id: string) => bookmarks.includes(id), [bookmarks]);

  const addRecentlyViewed = useCallback((id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(r => r !== id);
      return [id, ...filtered].slice(0, 20);
    });
  }, []);

  const toggleChecked = useCallback((id: string) => {
    setCheckedItems(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  }, []);

  const isChecked = useCallback((id: string) => checkedItems.includes(id), [checkedItems]);

  const resetChecklist = useCallback(() => { setCheckedItems([]); }, []);

  // Don't render children until mounted to prevent hydration errors from mismatched UI states
  if (!isMounted) return null;

  return (
    <AppContext.Provider value={{
      bookmarks, recentlyViewed, checkedItems,
      toggleBookmark, isBookmarked, addRecentlyViewed,
      toggleChecked, isChecked, resetChecklist,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
