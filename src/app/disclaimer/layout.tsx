import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Disclaimer",
  description: "Taxaltus educational disclaimer: calculators and guides are for tax awareness only and do not replace professional advice or official verification.",
  alternates: { canonical: "https://taxaltus.com/disclaimer" },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
