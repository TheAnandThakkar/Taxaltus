# Taxaltus - Indian Tax Education App

## Overview
A production-ready Indian tax education mobile app for salaried employees built with Expo React Native. Educational only - no personal data collection. Uses AsyncStorage for local persistence (bookmarks, recently viewed, disclaimer state).

## Tech Stack
- **Frontend**: Expo (React Native) with file-based routing (expo-router)
- **Backend**: Express server on port 5000 (serves API + static landing page)
- **State**: React Context + AsyncStorage (no database)
- **Styling**: Inter font family, Navy (#1B2A4A) / Teal (#0D9488) / Gold (#D97706) theme
- **Dark Mode**: Full support via useColorScheme

## App Structure

### Tab Navigation (5 tabs)
- **Form 16 Explorer** (`app/(tabs)/index.tsx`) - Specimen Form 16 with searchable fields, quick action cards
- **Deductions** (`app/(tabs)/deductions.tsx`) - Chapter VI-A sections reference
- **Heads of Income** (`app/(tabs)/heads.tsx`) - 5 heads of income breakdown
- **Glossary** (`app/(tabs)/glossary.tsx`) - 20 tax terms with search
- **Learn** (`app/(tabs)/learn.tsx`) - Visual guides, quiz, TDS lifecycle, key tax dates

### Detail Screens
- `app/form16/[id].tsx` - Form 16 field detail with FAQs
- `app/sections/[id].tsx` - Deduction section detail
- `app/heads/[id].tsx` - Head of income detail
- `app/glossary/[id].tsx` - Glossary term detail
- `app/learn/quiz.tsx` - Interactive 10-question quiz
- `app/regime/index.tsx` - Old vs New tax regime comparison (slabs + feature table)
- `app/bookmarks/index.tsx` - Saved items & recently viewed
- `app/settings/index.tsx` - Disclaimer, sources, about

### Key Files
- `data/content.ts` - All educational content (static, offline-first)
- `contexts/AppContext.tsx` - Bookmarks, recently viewed, disclaimer state
- `constants/colors.ts` - Theme colors
- `lib/useTheme.ts` - Dark mode hook
- `components/ui/BookmarkButton.tsx` - Reusable bookmark toggle

### Layout
- `app/(tabs)/_layout.tsx` - NativeTabs with liquid glass (iOS 26+) + BlurView fallback
- `app/_layout.tsx` - Root Stack with providers (QueryClient, AppProvider, ErrorBoundary)

## Important Notes
- Educational only: Never collects PAN, Aadhaar, salary data
- FY 2024-25: New regime standard deduction = 75,000; old regime = 50,000
- New regime is default from FY 2023-24
- DO NOT use useBottomTabBarHeight() with NativeTabs
- Content is entirely static/offline - no API calls for core features
- Web insets: 67px top, 34px bottom (Platform.OS === "web" only)

## Workflows
- `Start Backend` - Express server (port 5000)
- `Start Frontend` - Expo dev server (port 8081)
