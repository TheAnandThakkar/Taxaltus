import { Metadata } from "next";
import { ASSESSMENT_YEARS_AND } from "@/lib/taxYears";

export const metadata: Metadata = {
  title: "Full Income Tax Calculator India — All Income Heads",
  description: `Comprehensive Indian income tax calculator for ${ASSESSMENT_YEARS_AND}. Computes salary, house property, business, other sources and capital gains (STCG 111A, LTCG 112A) across old and new regimes with deductions, Section 87A rebate, surcharge with marginal relief and cess.`,
  alternates: { canonical: "https://taxaltus.com/income-tax-calculator" },
};

export default function IncomeTaxCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
