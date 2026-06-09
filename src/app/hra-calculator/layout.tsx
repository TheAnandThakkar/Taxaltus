import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HRA Calculator India - HRA Exemption Calculation",
  description: "Calculate HRA exemption under Section 10(13A) for Indian salaried employees. Compare actual HRA, rent paid and metro or non-metro salary rules.",
  alternates: { canonical: "https://taxaltus.com/hra-calculator" },
};

export default function HRALayout({ children }: { children: React.ReactNode }) {
  return children;
}
