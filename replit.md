# Taxaltus - Indian Tax Education Website

## Overview
A responsive Indian tax education website for salaried employees built with Vite + React + TypeScript + Tailwind CSS. Educational only - no personal data collection. Uses localStorage for persistence (bookmarks, recently viewed, checklist progress). Hosted at taxaltus.com.

## Tech Stack
- **Frontend**: Vite + React 19 + TypeScript + React Router v6
- **Styling**: Tailwind CSS v3 + Inter font from Google Fonts
- **State**: React Context + localStorage (no database, no backend)
- **Build**: Vite (dev server port 5000, output to dist/)
- **Theme Colors**: Navy (#1B2A4A), Teal (#0D9488), Gold (#D97706)

## Project Structure
```
src/
  main.tsx           - Entry point (React root with BrowserRouter + AppProvider)
  App.tsx            - All routes declared
  index.css          - Tailwind directives + custom component classes
  contexts/
    AppContext.tsx    - Bookmarks, checklist, recently viewed (localStorage)
  data/
    content.ts       - All educational content (glossary, form16Fields, sections, headsOfIncome, quizzes)
  components/
    Navbar.tsx       - Sticky navbar with desktop nav + mobile hamburger + Tools dropdown
    Footer.tsx       - Footer with links, disclaimer, copyright
    Layout.tsx       - Layout wrapper (Navbar + Outlet + Footer, scroll-to-top on route change)
    ui/
      SearchInput.tsx  - Reusable search input with clear button
      Accordion.tsx    - FAQ accordion (open/close)
      PageHeader.tsx   - Page title + subtitle + breadcrumbs (navy bg)
  pages/
    Home.tsx                - Landing page (hero, feature cards, quick links, tax dates, CTA)
    Form16Explorer.tsx      - Searchable list of Form 16 fields with Part A/B filter
    Form16Detail.tsx        - Individual Form 16 field detail (description, FAQs, related)
    Specimen.tsx            - Form 16 specimen viewer (Part A/B tabs, illustrative data)
    Deductions.tsx          - Chapter VI-A deduction sections (searchable grid)
    SectionDetail.tsx       - Individual deduction section detail
    HeadsOfIncome.tsx       - 5 heads of income overview
    HeadDetail.tsx          - Individual head of income detail
    Glossary.tsx            - A-Z searchable tax glossary
    GlossaryDetail.tsx      - Individual glossary term detail
    Learn.tsx               - Educational hub (salary taxation flow, TDS lifecycle, dates, tool links)
    Quiz.tsx                - 10-question interactive tax quiz with scoring
    Estimator.tsx           - Old vs New regime tax calculator (FY 2024-25)
    ItrSelector.tsx         - Step-by-step ITR form recommendation wizard
    RegimeComparison.tsx    - Side-by-side regime slab/feature comparison
    Checklist.tsx           - Persistent tax prep checklist with progress bar
    InvestmentDeadlines.tsx - Timeline of deadlines + lock-in periods table
    BudgetChanges.tsx       - FY 2024-25 budget changes with before/after
    Bookmarks.tsx           - Saved bookmarks + recently viewed items
    About.tsx               - Disclaimer, official sources, app info
```

## Routes
- `/` - Home
- `/form16` - Form 16 Explorer
- `/form16/:id` - Form 16 Field Detail
- `/form16/specimen` - Specimen Viewer
- `/deductions` - Deductions Guide
- `/deductions/:id` - Section Detail
- `/heads` - Heads of Income
- `/heads/:id` - Head Detail
- `/glossary` - Tax Glossary
- `/glossary/:id` - Term Detail
- `/learn` - Learn Hub
- `/quiz` - Tax Quiz
- `/estimator` - Tax Estimator
- `/itr-selector` - ITR Form Selector
- `/regime` - Regime Comparison
- `/checklist` - Tax Prep Checklist
- `/investment-deadlines` - Investment Deadlines
- `/budget-changes` - Budget Changes
- `/bookmarks` - Bookmarks
- `/about` - About

## Tailwind Custom Classes
- `container-main` - Max-width container with responsive padding
- `card` - White rounded card with border/shadow
- `card-hover` - Card with hover effects
- `btn-primary` - Teal filled button
- `btn-outline` - Teal outline button
- `section-title` - Large navy heading
- `badge` - Small pill badge

## Important Notes
- Educational only: Never collects PAN, Aadhaar, salary data
- FY 2024-25: New regime standard deduction = ₹75,000; old regime = ₹50,000
- New regime is default from FY 2023-24
- Content is entirely static/offline - no API calls needed
- All data in src/data/content.ts (glossary, form16Fields, sections, headsOfIncome, quizzes)

## Workflows
- `Start application` - Vite dev server (port 5000, webview)

## Assets
- public/logo-full.png - Text logo
- public/icon.png - App icon
- public/favicon.png - Favicon
