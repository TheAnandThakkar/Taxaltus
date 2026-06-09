"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBar from "@/components/ui/TrustBar";
import OfficialSources from "@/components/ui/OfficialSources";
import { calculateIncomeTax } from "@/lib/taxYears";

function fmt(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

const fields = [
  { key: "salary", label: "Gross salary from Form 16 Part B", hint: "Usually appears under salary received from employer." },
  { key: "standardDeduction", label: "Standard deduction shown in Form 16", hint: "Enter ₹75,000 for new regime or ₹50,000 for old regime if shown." },
  { key: "deductions", label: "Chapter VI-A deductions allowed", hint: "80C, 80D, 80CCD etc. Use only eligible amounts." },
  { key: "tds", label: "TDS deducted by employer", hint: "From Form 16 Part A / TRACES certificate." },
] as const;

export default function Form16GuidedPage() {
  const [values, setValues] = useState<Record<string, string>>({});

  const result = useMemo(() => {
    const salary = Number(values.salary) || 0;
    if (!salary) return null;
    const standardDeduction = Number(values.standardDeduction) || 75000;
    const deductions = Number(values.deductions) || 0;
    const tds = Number(values.tds) || 0;
    const taxableIncome = Math.max(0, salary - standardDeduction - deductions);
    const tax = calculateIncomeTax({
      assessmentYear: "AY_2027_28",
      regime: "new",
      taxableIncome,
    });
    return { salary, standardDeduction, deductions, tds, taxableIncome, tax, payable: Math.max(0, tax.totalTax - tds), refund: Math.max(0, tds - tax.totalTax) };
  }, [values]);

  return (
    <div>
      <PageHeader
        title="I Have Form 16. What Should I Do Next?"
        subtitle="A guided entry flow for salaried employees who want to understand key Form 16 values before filing ITR."
        breadcrumbs={[{ label: "Form 16 Guided Entry" }]}
      />
      <div className="container-main py-10 sm:py-14 space-y-6">
        <TrustBar appliesTo="Form 16 and ITR filing awareness" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
            <h2 className="text-xl font-bold text-navy">Enter Values From Your Form 16</h2>
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                <input
                  type="number"
                  value={values[field.key] || ""}
                  onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40"
                  placeholder="Amount in ₹"
                />
                <p className="text-xs text-gray-500 mt-1">{field.hint}</p>
              </div>
            ))}
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Understanding Summary</h2>
            {!result ? (
              <p className="text-sm text-gray-500">Enter gross salary to see a simple summary.</p>
            ) : (
              <div className="divide-y divide-gray-100 text-sm">
                {[
                  ["Gross Salary", fmt(result.salary)],
                  ["Less: Standard Deduction", `-${fmt(result.standardDeduction)}`],
                  ["Less: Deductions", `-${fmt(result.deductions)}`],
                  ["Taxable Income", fmt(result.taxableIncome)],
                  ["Estimated Tax + Cess", fmt(result.tax.totalTax)],
                  ["TDS Deducted", `-${fmt(result.tds)}`],
                  [result.payable > 0 ? "Approx. Tax Payable" : "Approx. Refund", fmt(result.payable || result.refund)],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-semibold text-navy">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          This guide is not a Form 16 parser and does not file your ITR. Cross-check with AIS, Form 26AS, TIS and the Income Tax portal before submitting a return.
        </div>
        <OfficialSources />
      </div>
    </div>
  );
}
