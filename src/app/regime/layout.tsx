import { Metadata } from "next";
import { ASSESSMENT_YEARS_AND } from "@/lib/taxYears";
import JsonLd from "@/components/JsonLd";

const title = "Old vs New Tax Regime — Slabs, Deductions & Difference";
const description = `Difference between the old and new tax regime for ${ASSESSMENT_YEARS_AND}: compare income tax slabs, ₹75,000 standard deduction, exemptions, Chapter VIII/VI-A deductions and the Section 156 (87A) rebate, and find out which regime saves you more tax.`;
const url = "https://taxaltus.com/regime";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  keywords: [
    "old vs new tax regime",
    "difference between old and new tax regime",
    "difference between old and new income tax",
    "new tax regime vs old tax regime",
    "new tax slabs",
    "old regime slabs",
    "new regime slabs FY 2026-27",
    "which tax regime is better",
    "old vs new regime calculator",
    "standard deduction new regime",
    "Section 87A rebate new regime",
    "income tax slabs comparison India",
  ],
  openGraph: {
    title,
    description,
    url,
    siteName: "Taxaltus",
    locale: "en_IN",
    type: "article",
    images: [{ url: "/og-taxaltus.png", width: 2400, height: 1260, alt: "Old vs new tax regime comparison" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-taxaltus.png"] },
};

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between the old and new tax regime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The new regime has lower slab rates and a higher ₹75,000 standard deduction with a rebate making income up to ₹12 lakh tax-free, but disallows most deductions and exemptions. The old regime has higher rates but lets you claim HRA, 80C, 80D and other deductions. The new regime is the default; you can opt for the old regime if your deductions are large.",
      },
    },
    {
      "@type": "Question",
      name: "Which tax regime is better for me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your deductions. If you claim large deductions (HRA, 80C, 80D, home-loan interest), the old regime may be cheaper; otherwise the new regime usually wins. Use the Taxaltus calculator to compare both side by side for your exact numbers.",
      },
    },
    {
      "@type": "Question",
      name: "What are the new tax regime slabs for FY 2026-27?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Up to ₹4 lakh Nil, ₹4–8 lakh 5%, ₹8–12 lakh 10%, ₹12–16 lakh 15%, ₹16–20 lakh 20%, ₹20–24 lakh 25%, and above ₹24 lakh 30%, under Section 202 of the Income-tax Act, 2025.",
      },
    },
  ],
};

export default function RegimeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={FAQ_JSONLD} />
      {children}
    </>
  );
}
