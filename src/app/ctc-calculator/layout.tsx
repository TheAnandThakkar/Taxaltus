import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTC to Take Home Salary Calculator India",
  description: "Estimate monthly take-home salary from CTC with basic salary, HRA, PF, gratuity, professional tax and new-regime TDS for India.",
  alternates: { canonical: "https://taxaltus.com/ctc-calculator" },
};

export default function CTCLayout({ children }: { children: React.ReactNode }) {
  return children;
}
