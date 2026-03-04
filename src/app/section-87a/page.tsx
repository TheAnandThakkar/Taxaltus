"use client";

import Link from "next/link";
import { ArrowLeft, Info, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState, useMemo } from "react";

function fmt(n: number) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
}

function calcNewTax(income: number) {
    if (income <= 300000) return 0;
    if (income <= 700000) return (income - 300000) * 0.05;
    if (income <= 1000000) return 20000 + (income - 700000) * 0.1;
    if (income <= 1200000) return 50000 + (income - 1000000) * 0.15;
    if (income <= 1500000) return 80000 + (income - 1200000) * 0.2;
    return 150000 + (income - 1500000) * 0.3;
}

function calcOldTax(income: number) {
    if (income <= 250000) return 0;
    if (income <= 500000) return (income - 250000) * 0.05;
    if (income <= 1000000) return 12500 + (income - 500000) * 0.2;
    return 112500 + (income - 1000000) * 0.3;
}

export default function Section87APage() {
    const [regime, setRegime] = useState<"new" | "old">("new");
    const [income, setIncome] = useState("");

    const result = useMemo(() => {
        const inc = parseFloat(income) || 0;
        if (!inc) return null;

        const stdDed = regime === "new" ? 75000 : 50000;
        const taxable = Math.max(0, inc - stdDed);

        const rawTax = regime === "new" ? calcNewTax(taxable) : calcOldTax(taxable);
        const threshold = regime === "new" ? 700000 : 500000;
        const maxRebate = regime === "new" ? 25000 : 12500;

        const qualifies = taxable <= threshold;
        const rebate = qualifies ? Math.min(rawTax, maxRebate) : 0;
        const taxAfterRebate = Math.max(0, rawTax - rebate);
        const cess = taxAfterRebate * 0.04;
        const totalTax = taxAfterRebate + cess;

        return { inc, taxable, rawTax, qualifies, rebate, taxAfterRebate, cess, totalTax, threshold, stdDed };
    }, [income, regime]);

    return (
        <div>
            <PageHeader
                title="Section 87A Rebate Explained"
                subtitle="The most misunderstood tax benefit — clearly explained with a live calculator"
                breadcrumbs={[{ label: "Section 87A" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                {/* Myth Buster Banner */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">🚫</span>
                        <div>
                            <h2 className="text-lg font-bold text-red-700 mb-1">Common Myth: "If my income is under ₹7L, I pay zero tax"</h2>
                            <p className="text-red-600 text-sm leading-relaxed">
                                <strong>Partially correct — but dangerously oversimplified.</strong> The ₹7L threshold applies to your <strong>taxable income</strong> (after standard deduction), not your gross salary. And if your income exceeds ₹7L by even ₹1, the rebate disappears entirely and you pay full tax on the entire amount.
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
                            <li className="flex gap-2"><span className="text-teal">→</span> <strong>New Regime:</strong> Rebate up to ₹25,000 if taxable income ≤ ₹7 lakh</li>
                            <li className="flex gap-2"><span className="text-teal">→</span> <strong>Old Regime:</strong> Rebate up to ₹12,500 if taxable income ≤ ₹5 lakh</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                        <h3 className="font-bold text-amber-800 mb-3 text-lg">⚠️ The Cliff Effect</h3>
                        <p className="text-sm text-amber-700 leading-relaxed">
                            If your taxable income is ₹7,00,001 under New Regime — you get <strong>zero rebate</strong> and pay full tax (~₹25,010). But if it&apos;s ₹7,00,000 — you pay <strong>₹0</strong>. A ₹1 difference = ₹25,000 more in tax!
                        </p>
                        <p className="text-xs text-amber-600 mt-2">This makes year-end tax planning and investment timing crucial.</p>
                    </div>
                </div>

                {/* Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <h3 className="font-bold text-navy text-xl">Check Your Rebate</h3>
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
            </div>
        </div>
    );
}
