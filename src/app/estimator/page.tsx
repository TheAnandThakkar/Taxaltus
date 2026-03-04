"use client";

import { useState, useCallback } from "react";
import { Share2, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

function calcOldRegimeTax(taxableIncome: number): number {
  let tax = 0;
  if (taxableIncome > 1000000) {
    tax += (taxableIncome - 1000000) * 0.3;
    taxableIncome = 1000000;
  }
  if (taxableIncome > 500000) {
    tax += (taxableIncome - 500000) * 0.2;
    taxableIncome = 500000;
  }
  if (taxableIncome > 250000) {
    tax += (taxableIncome - 250000) * 0.05;
  }
  return tax;
}

function calcNewRegimeTax(taxableIncome: number): number {
  let tax = 0;
  const slabs = [
    { limit: 300000, rate: 0 },
    { limit: 700000, rate: 0.05 },
    { limit: 1000000, rate: 0.1 },
    { limit: 1200000, rate: 0.15 },
    { limit: 1500000, rate: 0.2 },
    { limit: Infinity, rate: 0.3 },
  ];
  let prev = 0;
  for (const slab of slabs) {
    if (taxableIncome <= prev) break;
    const taxable = Math.min(taxableIncome, slab.limit) - prev;
    tax += taxable * slab.rate;
    prev = slab.limit;
  }
  return tax;
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
  const [grossIncome, setGrossIncome] = useState("");
  const [sec80c, setSec80c] = useState("");
  const [sec80d, setSec80d] = useState("");
  const [hra, setHra] = useState("");
  const [otherDed, setOtherDed] = useState("");
  const [oldResult, setOldResult] = useState<TaxResult | null>(null);
  const [newResult, setNewResult] = useState<TaxResult | null>(null);

  const handleCompare = () => {
    const income = parseFloat(grossIncome) || 0;
    const c80 = Math.min(parseFloat(sec80c) || 0, 150000);
    const d80 = Math.min(parseFloat(sec80d) || 0, 100000);
    const hraVal = parseFloat(hra) || 0;
    const other = parseFloat(otherDed) || 0;

    const oldStd = 50000;
    const oldOtherDed = c80 + d80 + hraVal + other;
    const oldTaxable = Math.max(0, income - oldStd - oldOtherDed);
    const oldTax = calcOldRegimeTax(oldTaxable);
    const oldCess = oldTax * 0.04;

    const newStd = 75000;
    const newTaxable = Math.max(0, income - newStd);
    const newTax = calcNewRegimeTax(newTaxable);
    const newCess = newTax * 0.04;

    setOldResult({
      grossIncome: income,
      standardDeduction: oldStd,
      otherDeductions: oldOtherDed,
      taxableIncome: oldTaxable,
      tax: oldTax,
      cess: oldCess,
      totalTax: oldTax + oldCess,
    });

    setNewResult({
      grossIncome: income,
      standardDeduction: newStd,
      otherDeductions: 0,
      taxableIncome: newTaxable,
      tax: newTax,
      cess: newCess,
      totalTax: newTax + newCess,
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
  const handleShare = useCallback(() => {
    if (!oldResult || !newResult) return;
    const summary = [
      "📊 Tax Regime Comparison - Taxaltus",
      "",
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
  }, [oldResult, newResult, betterRegime, saving]);

  return (
    <div>
      <PageHeader
        title="Tax Estimator"
        subtitle="Compare your tax liability under Old vs New regime for FY 2024-25"
        breadcrumbs={[{ label: "Tax Estimator" }]}
      />

      <div className="container-main py-8 sm:py-12">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-amber-800">
          <strong>Disclaimer:</strong> This calculator is for educational and
          informational purposes only. It provides an approximate estimate based
          on the tax slabs for FY 2024-25. Consult a qualified tax professional
          for accurate tax planning.
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 mb-10">
          <h2 className="text-xl font-bold text-navy mb-6">Enter Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <strong>Note:</strong> This estimator does not account for rebates
          under Section 87A, surcharge on higher incomes, or other specific
          exemptions. Tax laws are subject to change. Always verify with the
          latest Finance Act and consult a CA for personalised advice.
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
