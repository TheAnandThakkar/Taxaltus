"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import TrustBar from "@/components/ui/TrustBar";

const questions = [
  { q: "Which assessment year should I select for salary earned from April 2025 to March 2026?", a: "Select AY 2026-27 for FY 2025-26 income.", tags: "assessment year FY AY ITR filing" },
  { q: "Is HRA exemption available under the new tax regime?", a: "No. HRA exemption under Section 10(13A) is generally available only under the old tax regime.", tags: "HRA rent new regime old regime" },
  { q: "What is Section 87A rebate in the new regime?", a: "For supported years, resident individuals may get rebate up to ₹60,000 if eligible taxable income under the new regime is up to ₹12 lakh, subject to special-rate income restrictions.", tags: "87A rebate zero tax 12 lakh" },
  { q: "Do I need to pay advance tax if TDS is already deducted?", a: "Usually not if TDS covers your total tax. Advance tax applies when remaining tax liability after TDS exceeds ₹10,000.", tags: "advance tax TDS salaried" },
  { q: "What should I check before filing ITR with Form 16?", a: "Match salary, TDS, deductions, PAN, employer TAN, AIS, Form 26AS, bank interest and any capital gains before filing.", tags: "Form 16 AIS Form 26AS ITR" },
  { q: "What does an income tax notice under Section 143(1) mean?", a: "It is an intimation after return processing. It may confirm your calculation, show a refund, or show a demand/mismatch.", tags: "notice 143(1) tax notice demand refund" },
  { q: "Can I choose old or new regime every year?", a: "Salaried individuals without business or professional income can generally choose each year while filing ITR.", tags: "old regime new regime choose switch" },
];

export default function TaxQuestionsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return questions;
    return questions.filter((item) => `${item.q} ${item.a} ${item.tags}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Search Tax Questions"
        subtitle="Plain-language answers for common salaried taxpayer questions."
        breadcrumbs={[{ label: "Tax Questions" }]}
      />
      <div className="container-main py-10 sm:py-14 space-y-6">
        <TrustBar />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search HRA, Form 16, 87A, notice, advance tax..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40 text-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <article key={item.q} className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-bold text-navy mb-2">{item.q}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
            </article>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          Need a deeper page? Try the <Link href="/tax-notice-decoder" className="font-semibold underline">Tax Notice Decoder</Link>, <Link href="/hra-calculator" className="font-semibold underline">HRA Calculator</Link>, or <Link href="/form16-guided" className="font-semibold underline">Form 16 guided flow</Link>.
        </div>
      </div>
    </div>
  );
}
