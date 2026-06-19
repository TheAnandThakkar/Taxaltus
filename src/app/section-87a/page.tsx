"use client";

import Link from "next/link";
import { ArrowLeft, Info, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState, useMemo } from "react";
import AssessmentYearSelect from "@/components/ui/AssessmentYearSelect";
import OfficialSources from "@/components/ui/OfficialSources";
import TrustBar from "@/components/ui/TrustBar";
import TaxPayableVerdict from "@/components/ui/TaxPayableVerdict";
import TaxBreakdown from "@/components/ui/TaxBreakdown";
import {
    AssessmentYear,
    DEFAULT_ASSESSMENT_YEAR,
    calculateIncomeTax,
    getTaxYearRules,
} from "@/lib/taxYears";

function fmt(n: number) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function Section87APage() {
    const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>(DEFAULT_ASSESSMENT_YEAR);
    const [regime, setRegime] = useState<"new" | "old">("new");
    const [income, setIncome] = useState("");
    const rules = getTaxYearRules(assessmentYear);

    const result = useMemo(() => {
        const inc = parseFloat(income) || 0;
        if (!inc) return null;

        const stdDed = rules.standardDeduction[regime];
        const taxable = Math.max(0, inc - stdDed);

        const taxCalc = calculateIncomeTax({ assessmentYear, regime, taxableIncome: taxable });
        const threshold = rules.rebate87A[regime].incomeLimit;

        const qualifies = taxable <= threshold;

        return {
            inc,
            taxable,
            rawTax: taxCalc.rawTax,
            qualifies,
            rebate: taxCalc.rebate,
            marginalRelief: taxCalc.marginalRelief,
            surcharge: taxCalc.surcharge,
            surchargeRate: taxCalc.surchargeRate,
            taxAfterRebate: taxCalc.taxAfterRebate,
            cess: taxCalc.cess,
            cessRate: taxCalc.cessRate,
            slabBreakdown: taxCalc.slabBreakdown,
            totalTax: taxCalc.totalTax,
            threshold,
            stdDed,
        };
    }, [income, regime, assessmentYear, rules]);

    return (
        <div>
            <PageHeader
                title="Section 87A Rebate Explained"
                subtitle={`The most misunderstood tax benefit, for ${rules.fyLabel} (${rules.label})`}
                breadcrumbs={[{ label: "Section 87A" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                <div className="mb-6">
                    <TrustBar />
                </div>

                {/* Myth Buster Banner */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">🚫</span>
                        <div>
                            <h2 className="text-lg font-bold text-red-700 mb-1">Common Myth: "If my income is under ₹12L, I pay zero tax"</h2>
                            <p className="text-red-600 text-sm leading-relaxed">
                                <strong>Partially correct — but dangerously oversimplified.</strong> The ₹12L threshold applies to your <strong>taxable income</strong> (after standard deduction), not your gross salary. And if your income exceeds ₹12L by even ₹1, the rebate disappears entirely and you pay full tax on the entire amount.
                            </p>
                        </div>
                    </div>
                </div>

                {/* What is 87A */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-navy mb-3 text-lg">🧾 What is Section 87A?</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Section 87A provides a <strong>tax rebate</strong> — meaning if your tax liability is below a threshold, the government waives it completely. It&apos;s not a deduction from income; it&apos;s a direct reduction in tax payable.
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="flex gap-2"><span className="text-teal">→</span> <strong>New Regime:</strong> Rebate up to ₹60,000 if taxable income ≤ ₹12 lakh</li>
                            <li className="flex gap-2"><span className="text-teal">→</span> <strong>Old Regime:</strong> Rebate up to ₹12,500 if taxable income ≤ ₹5 lakh</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                        <h3 className="font-bold text-amber-800 mb-3 text-lg">⚠️ The Cliff Effect</h3>
                        <p className="text-sm text-amber-700 leading-relaxed">
                            If your taxable income is ₹12,00,001 under New Regime — you get <strong>zero rebate</strong> and pay full tax (~₹60,000). But if it&apos;s ₹12,00,000 — you pay <strong>₹0</strong>. A ₹1 difference = ₹60,000 more in tax!
                        </p>
                        <p className="text-xs text-amber-600 mt-2">This makes year-end tax planning and investment timing crucial.</p>
                    </div>
                </div>

                {/* Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <h3 className="font-bold text-navy text-xl">Check Your Rebate</h3>
                        <AssessmentYearSelect value={assessmentYear} onChange={setAssessmentYear} />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Regime</label>
                            <div className="grid grid-cols-2 gap-3">
                                {(["new", "old"] as const).map(r => (
                                    <button key={r} onClick={() => setRegime(r)}
                                        className={`py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${regime === r ? "bg-navy text-white border-navy" : "bg-white text-gray-600 border-gray-200 hover:border-navy/50"}`}>
                                        {r === "new" ? "New Regime" : "Old Regime"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Gross Salary (₹)</label>
                            <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 750000"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 flex gap-2">
                            <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
                            <span>Standard deduction of {regime === "new" ? "₹75,000" : "₹50,000"} will be automatically subtracted from your gross salary.</span>
                        </div>
                    </div>

                    <div>
                        {!result ? (
                            <div className="rounded-2xl border-2 border-dashed border-gray-200 h-full flex items-center justify-center min-h-[280px]">
                                <p className="text-gray-400 text-center text-sm px-8">Enter your gross salary to see if Section 87A rebate applies.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className={`rounded-2xl border-2 overflow-hidden ${result.qualifies ? "border-teal/30" : "border-red-200"}`}>
                                    <div className={`px-6 py-4 text-white ${result.qualifies ? "bg-teal" : "bg-red-500"}`}>
                                        <p className="text-sm opacity-80">{result.qualifies ? "✅ You Qualify for Section 87A Rebate!" : "❌ No Section 87A Rebate"}</p>
                                        <p className="text-2xl font-bold mt-1">Final Tax: {fmt(result.totalTax)}</p>
                                    </div>
                                    <div className="divide-y divide-gray-100 text-sm bg-white">
                                        {[
                                            { label: "Gross Salary", value: fmt(result.inc) },
                                            { label: `Standard Deduction`, value: `-${fmt(result.stdDed)}` },
                                            { label: "Taxable Income", value: fmt(result.taxable) },
                                            { label: "Tax Before Rebate", value: fmt(result.rawTax) },
                                            { label: "87A Rebate", value: result.rebate > 0 ? `-${fmt(result.rebate)}` : "---" },
                                            { label: "Tax After Rebate", value: fmt(result.taxAfterRebate) },
                                            ...(result.surcharge > 0 ? [{ label: `Surcharge (${(result.surchargeRate * 100).toFixed(0)}%)`, value: `+${fmt(result.surcharge)}` }] : []),
                                            { label: "Health & Education Cess (4%)", value: fmt(result.cess) },
                                            { label: "Total Tax Payable", value: fmt(result.totalTax), bold: true },
                                        ].map((row, i) => (
                                            <div key={i} className={`flex justify-between px-5 py-2.5 ${(row as any).bold ? "font-bold bg-gray-50" : ""}`}>
                                                <span className="text-gray-500">{row.label}</span>
                                                <span className={(row as any).bold ? "text-teal" : "text-navy"}>{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <TaxPayableVerdict
                                    totalTax={result.totalTax}
                                    regimeLabel={regime === "new" ? "New Regime" : "Old Regime"}
                                    reason={
                                        result.totalTax > 0
                                            ? `Your taxable income (${fmt(result.taxable)}) is above the Section 87A limit of ${fmt(result.threshold)}, so the rebate does not fully wipe out your tax.`
                                            : `Your taxable income (${fmt(result.taxable)}) is within the Section 87A limit of ${fmt(result.threshold)}, so the rebate brings your tax down to nil. You may still need to file your ITR.`
                                    }
                                />

                                <TaxBreakdown
                                    slabBreakdown={result.slabBreakdown}
                                    rawTax={result.rawTax}
                                    rebate={result.rebate}
                                    marginalRelief={result.marginalRelief}
                                    taxAfterRebate={result.taxAfterRebate}
                                    surcharge={result.surcharge}
                                    surchargeRate={result.surchargeRate}
                                    cess={result.cess}
                                    cessRate={result.cessRate}
                                    totalTax={result.totalTax}
                                />

                                {!result.qualifies && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex gap-2">
                                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                                        Your taxable income ({fmt(result.taxable)}) exceeds the ₹{(result.threshold / 100000).toFixed(0)}L threshold. Consider investing more in {regime === "old" ? "80C/80D" : "NPS via employer"} to reduce taxable income.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-8 text-sm text-gray-800">
                                <strong>Disclaimer:</strong> This calculator provides an approximate estimate of the Section 87A rebate based on the tax laws for <strong>{rules.fyLabel} ({rules.label})</strong>. Please consult a qualified tax professional or Chartered Accountant for precise calculations and to ensure tax compliance.
                </div>
                <div className="mt-6">
                    <OfficialSources note="Section 87A rebate depends on residential status, total income and income taxed at normal slab rates. Some special-rate incomes may not receive the same rebate treatment." />
                </div>
            </div>
        </div>
    );
}
