"use client";

import PageHeader from "@/components/ui/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ASSESSMENT_YEARS } from "@/lib/taxYears";

const oldSlabs = [
  { range: "Up to ₹2,50,000", rate: "Nil" },
  { range: "₹2,50,001 – ₹5,00,000", rate: "5%" },
  { range: "₹5,00,001 – ₹10,00,000", rate: "20%" },
  { range: "Above ₹10,00,000", rate: "30%" },
];

const newSlabs = [
  { range: "Up to ₹4,00,000", rate: "Nil" },
  { range: "₹4,00,001 – ₹8,00,000", rate: "5%" },
  { range: "₹8,00,001 – ₹12,00,000", rate: "10%" },
  { range: "₹12,00,001 – ₹16,00,000", rate: "15%" },
  { range: "₹16,00,001 – ₹20,00,000", rate: "20%" },
  { range: "₹20,00,001 – ₹24,00,000", rate: "25%" },
  { range: "Above ₹24,00,000", rate: "30%" },
];

const yearLabels = ASSESSMENT_YEARS.map((year) => `${year.fyLabel} (${year.label})`).join(" and ");

const deductions = [
  { name: "Standard Deduction", old: "₹50,000", new: "₹75,000" },
  { name: "Section 80C (PPF, ELSS, LIC etc.)", old: "Up to ₹1,50,000", new: "Not Available" },
  { name: "Section 80D (Health Insurance)", old: "Up to ₹25,000 / ₹50,000", new: "Not Available" },
  { name: "HRA Exemption", old: "Available", new: "Not Available" },
  { name: "LTA Exemption", old: "Available", new: "Not Available" },
  { name: "Home Loan Interest (Sec 24b)", old: "Up to ₹2,00,000", new: "Not Available" },
  { name: "NPS – Employer (Sec 80CCD(2))", old: "Up to 10% of salary", new: "Up to 14% (Central Govt)" },
  { name: "NPS – Self (Sec 80CCD(1B))", old: "Up to ₹50,000", new: "Not Available" },
  { name: "Sec 80E (Education Loan)", old: "Available", new: "Not Available" },
  { name: "Sec 80G (Donations)", old: "Available", new: "Not Available" },
  { name: "Sec 80TTA/80TTB (Savings Interest)", old: "₹10,000 / ₹50,000", new: "Not Available" },
  { name: "Family Pension Deduction", old: "Up to ₹15,000", new: "Up to ₹25,000" },
];

export default function RegimeComparison() {
  return (
    <div>
      <PageHeader
        title="Old vs New Tax Regime"
        subtitle={`A comprehensive side-by-side comparison for ${yearLabels}.`}
        breadcrumbs={[{ label: "Regime Comparison" }]}
      />

      <div className="container-main py-10 sm:py-14 space-y-12">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Tax Slab Comparison – AY 2026-27 and AY 2027-28</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-navy text-white px-6 py-4">
                <h3 className="text-lg font-semibold">Old Regime</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 font-semibold text-gray-600">Income Range</th>
                      <th className="px-6 py-3 font-semibold text-gray-600">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oldSlabs.map((slab, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-6 py-3 text-gray-700">{slab.range}</td>
                        <td className="px-6 py-3 font-semibold text-navy">{slab.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-teal text-white px-6 py-4">
                <h3 className="text-lg font-semibold">New Regime (Default)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-6 py-3 font-semibold text-gray-600">Income Range</th>
                      <th className="px-6 py-3 font-semibold text-gray-600">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newSlabs.map((slab, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-6 py-3 text-gray-700">{slab.range}</td>
                        <td className="px-6 py-3 font-semibold text-teal">{slab.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Deductions & Exemptions Comparison</h2>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 font-semibold text-gray-600">Deduction / Exemption</th>
                    <th className="px-6 py-3 font-semibold text-gray-600">Old Regime</th>
                    <th className="px-6 py-3 font-semibold text-gray-600">New Regime</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((d, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-6 py-3 font-medium text-gray-800">{d.name}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${d.old === "Not Available"
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-700"
                            }`}
                        >
                          {d.old}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${d.new === "Not Available"
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-700"
                            }`}
                        >
                          {d.new}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">The Verdict</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border-2 border-navy/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-navy">Old Regime is Better When</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-1">•</span>
                  <span>You claim HRA exemption and pay significant rent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-1">•</span>
                  <span>You invest heavily in 80C instruments (PPF, ELSS, LIC, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-1">•</span>
                  <span>You pay a home loan with interest exceeding ₹2 lakh</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-1">•</span>
                  <span>You have health insurance premiums under Section 80D</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-navy mt-1">•</span>
                  <span>Your total deductions exceed ₹3.75 lakh approximately</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg border-2 border-teal/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-teal">New Regime is Better When</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  <span>You have fewer deductions or exemptions to claim</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  <span>You are a new employee without major investments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  <span>You prefer simplicity with no documentation hassle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  <span>Your income is up to ₹12 lakh (effectively zero tax with Section 87A rebate)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal mt-1">•</span>
                  <span>You benefit from the higher standard deduction of ₹75,000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-navy/5 rounded-xl p-6 text-center">
            <p className="text-gray-600">
              <span className="font-semibold text-navy">Tip:</span> The New Regime is the default from FY 2023-24 onwards. You must actively opt out to choose the Old Regime. Use the{" "}
              <span className="font-semibold text-teal">Tax Estimator</span> tool to calculate your exact tax under both regimes with your actual numbers.
            </p>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
            Slabs shown here are applicable for AY 2026-27 and are shown as continuing for AY 2027-28 (tax year FY 2026-27); please confirm against the latest Finance Act and official notification before filing. Senior citizen basic exemption differences apply only under the old regime.
          </div>
        </section>
      </div>
    </div>
  );
}
