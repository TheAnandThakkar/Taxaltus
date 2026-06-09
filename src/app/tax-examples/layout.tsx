import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Calculation Examples India",
  description: "Public tax calculation examples for Indian salaried taxpayers, including ₹7 lakh, ₹12.75 lakh, ₹16.5 lakh and ₹25 lakh salary cases.",
  alternates: { canonical: "https://taxaltus.com/tax-examples" },
};

export default function TaxExamplesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
