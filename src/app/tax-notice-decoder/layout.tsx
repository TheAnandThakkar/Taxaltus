import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Income Tax Notice Decoder India",
  description: "Understand Indian income tax notices in simple language, including Section 143(1), 139(9), 245, 148 and common next steps for taxpayers.",
  alternates: { canonical: "https://taxaltus.com/tax-notice-decoder" },
};

export default function TaxNoticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
