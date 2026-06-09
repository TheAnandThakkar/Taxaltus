"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import OfficialSources from "@/components/ui/OfficialSources";
import TrustBar from "@/components/ui/TrustBar";
import AssessmentYearSelect from "@/components/ui/AssessmentYearSelect";
import {
  AGE_GROUP_LABELS,
  AgeGroup,
  AssessmentYear,
  DEFAULT_ASSESSMENT_YEAR,
  calculateIncomeTax,
  getTaxYearRules,
} from "@/lib/taxYears";

function formatIndian(num: number): string {
  const n = Math.round(num);
  const s = n.toString();
  if (s.length <= 3) return "₹" + s;
  let last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  let result = "";
  while (rest.length > 2) {
    result = "," + rest.slice(-2) + result;
    rest = rest.slice(0, -2);
  }
  result = rest + result + "," + last3;
  return "₹" + result;
}

interface TaxResult {
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  tax: number;
  cess: number;
  totalTax: number;
}

export default function Estimator() {
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>(DEFAULT_ASSESSMENT_YEAR);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [grossIncome, setGrossIncome] = useState("");
  const [sec80c, setSec80c] = useState("");
  const [sec80d, setSec80d] = useState("");
  const [hra, setHra] = useState("");
  const [otherDed, setOtherDed] = useState("");
  const [oldResult, setOldResult] = useState<TaxResult | null>(null);
  const [newResult, setNewResult] = useState<TaxResult | null>(null);

  const handleCompare = () => {
    const rules = getTaxYearRules(assessmentYear);
    const income = parseFloat(grossIncome) || 0;
    const c80 = Math.min(parseFloat(sec80c) || 0, 150000);
    const d80 = Math.min(parseFloat(sec80d) || 0, 100000);
    const hraVal = parseFloat(hra) || 0;
    const other = parseFloat(otherDed) || 0;

    const oldStd = rules.standardDeduction.old;
    const oldOtherDed = c80 + d80 + hraVal + other;
    const oldTaxable = Math.max(0, income - oldStd - oldOtherDed);
    const oldTaxCalc = calculateIncomeTax({
      assessmentYear,
      regime: "old",
      taxableIncome: oldTaxable,
      ageGroup,
    });

    const newStd = rules.standardDeduction.new;
    const newTaxable = Math.max(0, income - newStd);
    const newTaxCalc = calculateIncomeTax({
      assessmentYear,
      regime: "new",
      taxableIncome: newTaxable,
      ageGroup,
    });

    setOldResult({
      grossIncome: income,
      standardDeduction: oldStd,
      otherDeductions: oldOtherDed,
      taxableIncome: oldTaxable,
      tax: oldTaxCalc.taxAfterRebate,
      cess: oldTaxCalc.cess,
      totalTax: oldTaxCalc.totalTax,
    });

    setNewResult({
      grossIncome: income,
      standardDeduction: newStd,
      otherDeductions: 0,
      taxableIncome: newTaxable,
      tax: newTaxCalc.taxAfterRebate,
      cess: newTaxCalc.cess,
      totalTax: newTaxCalc.totalTax,
    });
  };

  const handleReset = () => {
    setGrossIncome("");
    setSec80c("");
    setSec80d("");
    setHra("");
    setOtherDed("");
    setOldResult(null);
    setNewResult(null);
  };

  const saving =
    oldResult && newResult
      ? Math.abs(oldResult.totalTax - newResult.totalTax)
      : 0;
  const betterRegime =
    oldResult && newResult
      ? oldResult.totalTax < newResult.totalTax
        ? "Old"
        : newResult.totalTax < oldResult.totalTax
          ? "New"
          : "Both"
      : null;

  const [copied, setCopied] = useState(false);
  const buildSummary = useCallback(() => {
    if (!oldResult || !newResult) return "";
    return [
      "Taxaltus Tax Estimator Summary",
      "Educational estimate only - not professional tax advice.",
      "",
      `Assessment Year: ${getTaxYearRules(assessmentYear).label}`,
      `Financial Year: ${getTaxYearRules(assessmentYear).fyLabel}`,
      `Age Group: ${AGE_GROUP_LABELS[ageGroup]}`,
      "",
      `Gross Income: ${formatIndian(oldResult.grossIncome)}`,
      "",
      "Old Regime",
      `Standard Deduction: ${formatIndian(oldResult.standardDeduction)}`,
      `Other Deductions: ${formatIndian(oldResult.otherDeductions)}`,
      `Taxable Income: ${formatIndian(oldResult.taxableIncome)}`,
      `Tax after rebate: ${formatIndian(oldResult.tax)}`,
      `Cess: ${formatIndian(oldResult.cess)}`,
      `Total Tax: ${formatIndian(oldResult.totalTax)}`,
      "",
      "New Regime",
      `Standard Deduction: ${formatIndian(newResult.standardDeduction)}`,
      `Taxable Income: ${formatIndian(newResult.taxableIncome)}`,
      `Tax after rebate: ${formatIndian(newResult.tax)}`,
      `Cess: ${formatIndian(newResult.cess)}`,
      `Total Tax: ${formatIndian(newResult.totalTax)}`,
      "",
      `Better Regime: ${betterRegime === "Both" ? "Both are equal" : `${betterRegime} Regime`}`,
      saving > 0 ? `Difference: ${formatIndian(saving)}` : "Difference: Nil",
      "",
      "Verify with your Form 16, AIS/Form 26AS, latest official rules, and a qualified professional for personal filing decisions.",
      "https://taxaltus.com/estimator",
    ].join("\n");
  }, [oldResult, newResult, assessmentYear, ageGroup, betterRegime, saving]);

  const handleShare = useCallback(() => {
    if (!oldResult || !newResult) return;
    const summary = [
      "📊 Tax Regime Comparison - Taxaltus",
      "",
      `Assessment Year: ${getTaxYearRules(assessmentYear).label}`,
      `Gross Income: ₹${oldResult.grossIncome.toLocaleString("en-IN")}`,
      `Old Regime Tax: ₹${oldResult.totalTax.toLocaleString("en-IN")}`,
      `New Regime Tax: ₹${newResult.totalTax.toLocaleString("en-IN")}`,
      `Better Regime: ${betterRegime === "Both" ? "Equal" : betterRegime} Regime`,
      saving > 0 ? `Potential Savings: ₹${saving.toLocaleString("en-IN")}` : "",
      "",
      "Compare your tax at taxaltus.com/estimator",
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [oldResult, newResult, betterRegime, saving, assessmentYear]);

  const handleDownload = useCallback(() => {
    const summary = buildSummary();
    if (!summary) return;
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `taxaltus-tax-summary-${getTaxYearRules(assessmentYear).label.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [assessmentYear, buildSummary]);

  const selectedRules = getTaxYearRules(assessmentYear);

  return (
    <div>
      <PageHeader
        title="Tax Estimator"
        subtitle={`Compare Old vs New regime for ${selectedRules.fyLabel} (${selectedRules.label})`}
        breadcrumbs={[{ label: "Tax Estimator" }]}
      />

      <div className="container-main py-8 sm:py-12">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <TrustBar />

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8 text-sm text-amber-800">
          <strong>Disclaimer:</strong> This calculator is for educational and
          informational purposes only. It provides an approximate estimate based
          on the tax laws for <strong>{selectedRules.fyLabel} ({selectedRules.label})</strong>. Please consult a qualified tax professional or Chartered Accountant for personalised tax planning and compliance.
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-navy mb-6">Enter Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AssessmentYearSelect value={assessmentYear} onChange={setAssessmentYear} />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Age Group
              </label>
              <select
                value={ageGroup}
                onChange={(event) => setAgeGroup(event.target.value as AgeGroup)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 bg-white"
              >
                {Object.entries(AGE_GROUP_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gross Annual Income (₹)
              </label>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                placeholder="e.g. 1200000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section 80C Deduction (₹)
                <span className="text-gray-400 ml-1 font-normal">max ₹1,50,000</span>
              </label>
              <input
                type="number"
                value={sec80c}
                onChange={(e) => setSec80c(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section 80D Deduction (₹)
                <span className="text-gray-400 ml-1 font-normal">max ₹1,00,000</span>
              </label>
              <input
                type="number"
                value={sec80d}
                onChange={(e) => setSec80d(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HRA Exemption (₹)
              </label>
              <input
                type="number"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
                placeholder="e.g. 200000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Deductions (₹)
              </label>
              <input
                type="number"
                value={otherDed}
                onChange={(e) => setOtherDed(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleCompare}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
            >
              Compare Tax
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition"
            >
              Reset
            </button>
          </div>
        </div>

        {oldResult && newResult && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ResultCard title="Old Regime" result={oldResult} highlight={betterRegime === "Old"} />
              <ResultCard title="New Regime" result={newResult} highlight={betterRegime === "New"} />
            </div>

            <div
              className={`rounded-xl border-2 p-6 text-center ${betterRegime === "Both"
                ? "bg-gray-50 border-gray-300"
                : "bg-teal-50 border-teal-400"
                }`}
            >
              <h3 className="text-lg font-bold text-navy mb-2">Verdict</h3>
              {betterRegime === "Both" ? (
                <p className="text-gray-700">
                  Both regimes result in the same tax liability of{" "}
                  <strong>{formatIndian(oldResult.totalTax)}</strong>.
                </p>
              ) : (
                <p className="text-gray-700">
                  The <strong>{betterRegime} Regime</strong> saves you{" "}
                  <strong className="text-teal-700">{formatIndian(saving)}</strong> compared
                  to the {betterRegime === "Old" ? "New" : "Old"} Regime.
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={handleDownload}
                className="bg-white hover:bg-gray-50 text-navy font-semibold px-6 py-3 rounded-xl transition shadow-md flex items-center gap-2 border-2 border-gray-200 hover:border-teal/50"
              >
                Download Summary
              </button>
              <button
                onClick={() => window.print()}
                className="bg-navy hover:bg-navy/90 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                Save as PDF / Print Report
              </button>
              <button
                onClick={handleShare}
                className={`font-semibold px-6 py-3 rounded-xl transition shadow-md flex items-center gap-2 border-2 ${copied ? "bg-emerald-50 text-emerald-700 border-emerald-400" : "bg-white text-navy border-gray-200 hover:border-teal/50"
                  }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                {copied ? "Copied to Clipboard!" : "Share Results"}
              </button>
            </div>
          </>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-10 text-sm text-gray-600">
          <strong>Note:</strong> This estimator accounts for standard deduction,
          slab tax, Section 87A rebate, cess, and new-regime marginal relief for
          the supported years. It does not cover every special case such as all
          special-rate income, surcharge, agricultural income integration, or
          non-resident restrictions. Always verify with the latest official rules
          and consult a CA for personalised advice.
        </div>
        <div className="mt-6">
          <OfficialSources />
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  title,
  result,
  highlight,
}: {
  title: string;
  result: TaxResult;
  highlight: boolean;
}) {
  const rows = [
    { label: "Gross Income", value: result.grossIncome },
    { label: "Standard Deduction", value: result.standardDeduction },
    { label: "Other Deductions", value: result.otherDeductions },
    { label: "Taxable Income", value: result.taxableIncome },
    { label: "Tax", value: result.tax },
    { label: "Cess (4%)", value: result.cess },
    { label: "Total Tax Payable", value: result.totalTax, bold: true },
  ];

  return (
    <div
      className={`rounded-xl border-2 overflow-hidden ${highlight ? "border-teal-400 shadow-lg" : "border-gray-200"
        }`}
    >
      <div
        className={`px-5 py-3 font-bold text-white ${highlight ? "bg-teal-600" : "bg-navy"
          }`}
      >
        {title}
        {highlight && <span className="ml-2 text-sm font-normal opacity-80">✓ Better</span>}
      </div>
      <div className="divide-y">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex justify-between px-5 py-3 ${row.bold ? "bg-gray-50 font-bold text-navy" : "text-gray-700"
              }`}
          >
            <span>{row.label}</span>
            <span>{formatIndian(row.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
