import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form 16 Guide for Salaried Employees India",
  description: "Understand Form 16 Part A and Part B, salary income, deductions, TDS, 87A rebate and tax computation before filing ITR.",
  alternates: { canonical: "https://taxaltus.com/form16" },
};

export default function Form16Layout({ children }: { children: React.ReactNode }) {
  return children;
}
