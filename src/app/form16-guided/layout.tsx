import { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Have Form 16. What Should I Do Next?",
  description: "Guided Form 16 entry flow for Indian salaried employees to understand salary, deductions, TDS, tax payable and refund before ITR filing.",
  alternates: { canonical: "https://taxaltus.com/form16-guided" },
};

export default function Form16GuidedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
