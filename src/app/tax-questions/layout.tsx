import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Income Tax Questions India",
  description: "Search plain-language income tax questions for Indian salaried employees about HRA, Form 16, Section 87A, notices, TDS and ITR filing.",
  alternates: { canonical: "https://taxaltus.com/tax-questions" },
};

export default function TaxQuestionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
