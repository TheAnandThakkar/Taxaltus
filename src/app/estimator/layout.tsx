import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Estimator India AY 2026-27 & AY 2027-28",
  description: "Educational Indian income tax estimator for AY 2026-27 and AY 2027-28. Compare old tax regime vs new tax regime with standard deduction, 87A rebate and cess.",
  alternates: { canonical: "https://taxaltus.com/estimator" },
};

export default function EstimatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
