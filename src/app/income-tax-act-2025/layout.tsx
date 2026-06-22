import { Metadata } from "next";

const title = "New Income Tax Act 2025 — What's New, Slabs & Old vs New";
const description =
  "The new Income-tax Act, 2025 replaces the 1961 Act from FY 2026-27. See what's new, the new tax slabs, the 'Tax Year' concept, and the full section renumbering map (80C→123, 80D→126, 87A→156, 115BAC→202) — plus the difference between the old and new income tax act. Tax amounts are unchanged.";
const url = "https://taxaltus.com/income-tax-act-2025";
const ogImage = {
  url: "/og-taxaltus.png",
  width: 2400,
  height: 1260,
  alt: "New Income-tax Act 2025 — what's new, slabs and old vs new comparison",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  keywords: [
    "new income tax act",
    "new income tax act 2025",
    "income tax act 2025",
    "income tax act 2025 India",
    "new income tax bill 2025",
    "Income-tax Act 2025 sections",
    "new income tax act sections list",
    "new tax slabs",
    "new income tax slabs 2025",
    "income tax slabs FY 2026-27",
    "new tax regime slabs",
    "tax year concept income tax act 2025",
    "tax year vs assessment year",
    "difference between old and new income tax act",
    "difference between new income tax and old income tax act",
    "old vs new income tax act 2025",
    "section 80C new section 123",
    "section 87A new section 156",
    "section 115BAC new section 202",
    "income tax act 2025 section mapping",
    "income tax act 2025 effective date",
    "when does new income tax act 2025 apply",
    "income tax act 2025 explained",
    "what's new in income tax act 2025",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: "Taxaltus",
    locale: "en_IN",
    type: "article",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Income Tax Act 2025 — What's New, Slabs & Old vs New",
    description,
    images: [ogImage.url],
  },
};

export default function IncomeTaxAct2025Layout({ children }: { children: React.ReactNode }) {
  return children;
}
