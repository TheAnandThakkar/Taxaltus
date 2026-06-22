import { Metadata } from "next";
import { ASSESSMENT_YEARS_AND } from "@/lib/taxYears";
import JsonLd from "@/components/JsonLd";

const title = "Full Income Tax Calculator India — All Income Heads (Old vs New)";
const description = `Free full income tax calculator for ${ASSESSMENT_YEARS_AND}. Computes salary, house property, business, other sources and capital gains (STCG 111A/196, LTCG 112A/198) across old and new regimes with all deductions, Section 87A/156 rebate, surcharge with marginal relief and cess — now citing the new Income-tax Act, 2025 sections.`;
const url = "https://taxaltus.com/income-tax-calculator";
const ogImage = {
  url: "/og-income-tax-calculator.png",
  width: 2400,
  height: 1260,
  alt: "Taxaltus Full Income Tax Calculator — compare old vs new regime across every income head",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  keywords: [
    "income tax calculator",
    "income tax calculator India",
    "full income tax calculator",
    "comprehensive income tax calculator",
    "online income tax calculator",
    "free income tax calculator",
    "tax calculator",
    "tax calculator India",
    "income tax calculator FY 2026-27",
    "income tax calculator AY 2027-28",
    "new tax regime calculator",
    "old vs new regime calculator",
    "salary income tax calculator",
    "capital gains tax calculator",
    "house property income tax calculator",
    "income tax calculator Income-tax Act 2025",
    "how to calculate income tax",
    "income tax computation sheet",
    "Section 87A rebate calculator",
    "surcharge and cess calculator",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: "Taxaltus",
    locale: "en_IN",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

const SOFTWARE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Full Income Tax Calculator — Taxaltus",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url,
  description,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  featureList: [
    "Computes all income heads: salary, house property, business, other sources, capital gains",
    "Old regime vs new regime side-by-side comparison",
    "Equity STCG (Sec 196/111A) and LTCG (Sec 198/112A) with ₹1.25 lakh exemption",
    "All Chapter VIII / Chapter VI-A deductions (80C/123, 80D/126, 80CCD/124, 80TTA-TTB/153)",
    "Section 156 (87A) rebate, surcharge with marginal relief and 4% cess",
    "Branded printable computation sheet citing Income-tax Act, 2025 sections",
  ],
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate my income tax for FY 2026-27?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your salary, house property, business, other-sources income, capital gains and deductions in the Full Income Tax Calculator. It instantly builds a computation under both the old and new regime, applies the Section 156 (87A) rebate, surcharge and 4% cess, and tells you which regime is cheaper for FY 2026-27 (Tax Year 2026-27).",
      },
    },
    {
      "@type": "Question",
      name: "Is the Taxaltus income tax calculator free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Taxaltus is a non-profit tax-education initiative and the full income tax calculator is completely free, with no sign-up required.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator compare the old and new tax regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It computes both regimes side by side across every income head and recommends the one with lower total tax, showing the exact saving.",
      },
    },
    {
      "@type": "Question",
      name: "Does the calculator use the new Income-tax Act 2025 sections?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For FY 2026-27 (Tax Year 2026-27) it cites the Income-tax Act, 2025 sections (80C→123, 87A→156, 115BAC→202); for FY 2025-26 it uses the Income-tax Act, 1961 sections. Tax amounts are identical — only the citations differ.",
      },
    },
  ],
};

export default function IncomeTaxCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[SOFTWARE_JSONLD, FAQ_JSONLD]} />
      {children}
    </>
  );
}
