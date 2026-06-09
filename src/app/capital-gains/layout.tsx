import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator India",
  description: "Calculate STCG and LTCG tax on listed equity, equity mutual funds, debt mutual funds, property and gold under Indian tax rules.",
  alternates: { canonical: "https://taxaltus.com/capital-gains" },
};

export default function CapitalGainsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
