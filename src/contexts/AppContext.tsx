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
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>(() => loadJson(BOOKMARKS_KEY));
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => loadJson(RECENT_KEY));
  const [checkedItems, setCheckedItems] = useState<string[]>(() => loadJson(CHECKLIST_KEY));

  useEffect(() => { localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem(RECENT_KEY, JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
  useEffect(() => { localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checkedItems)); }, [checkedItems]);

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
