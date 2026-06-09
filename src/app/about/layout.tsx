import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Taxaltus and Anand Thakkar",
  description: "Taxaltus is a non-profit tax education initiative for Indian salaried taxpayers to understand income tax calculators, Form 16, deductions, notices and filing concepts.",
  alternates: { canonical: "https://taxaltus.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
