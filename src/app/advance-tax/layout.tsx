import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advance Tax Calculator India",
  description: "Calculate advance tax instalments for Indian taxpayers with quarterly due dates, TDS adjustment and old vs new tax regime estimates.",
  alternates: { canonical: "https://taxaltus.com/advance-tax" },
};

export default function AdvanceTaxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
