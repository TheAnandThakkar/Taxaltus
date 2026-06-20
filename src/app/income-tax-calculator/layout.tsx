import { Metadata } from "next";
import { ASSESSMENT_YEARS_AND } from "@/lib/taxYears";

const title = "Full Income Tax Calculator India — All Income Heads";
const description = `Comprehensive Indian income tax calculator for ${ASSESSMENT_YEARS_AND}. Computes salary, house property, business, other sources and capital gains (STCG 111A, LTCG 112A) across old and new regimes with deductions, Section 87A rebate, surcharge with marginal relief and cess.`;
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

export default function IncomeTaxCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
