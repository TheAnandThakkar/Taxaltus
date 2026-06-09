import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Old vs New Tax Regime India AY 2026-27 & AY 2027-28",
  description: "Compare old tax regime and new tax regime slabs, standard deduction, exemptions, deductions and Section 87A rebate for Indian taxpayers.",
  alternates: { canonical: "https://taxaltus.com/regime" },
};

export default function RegimeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
