"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState, useMemo } from "react";

function fmt(n: number) {
    return "₹" + Math.round(Math.abs(n)).toLocaleString("en-IN");
}

// Budget 2024 New Regime slabs (used from FY 2024-25)
function calcNewTax2425(income: number) {
    const std = 75000;
    const taxable = Math.max(0, income - std);
    if (taxable <= 300000) return 0;
    if (taxable <= 700000) return (taxable - 300000) * 0.05;
    if (taxable <= 1000000) return 20000 + (taxable - 700000) * 0.1;
    if (taxable <= 1200000) return 50000 + (taxable - 1000000) * 0.15;
    if (taxable <= 1500000) return 80000 + (taxable - 1200000) * 0.2;
    return 150000 + (taxable - 1500000) * 0.3;
}

// Old Budget 2023-24 New Regime slabs (before budget 2024 raised rebate limit)
function calcNewTax2324(income: number) {
    const std = 50000;
    const taxable = Math.max(0, income - std);
    if (taxable <= 300000) return 0;
    if (taxable <= 600000) return (taxable - 300000) * 0.05;
    if (taxable <= 900000) return 15000 + (taxable - 600000) * 0.1;
    if (taxable <= 1200000) return 45000 + (taxable - 900000) * 0.15;
    if (taxable <= 1500000) return 90000 + (taxable - 1200000) * 0.2;
    return 150000 + (taxable - 1500000) * 0.3;
}

const SLAB_CHANGES = [
    { range: "₹0 – ₹3L", fy2324: "0%", fy2425: "0%", changed: false },
    { range: "₹3L – ₹7L", fy2324: "5% (up to ₹6L)", fy2425: "5%", changed: true, note: "Threshold extended from ₹6L to ₹7L" },
    { range: "₹7L – ₹10L", fy2324: "10% (from ₹9L)", fy2425: "10%", changed: true, note: "Slab boundary shifted" },
    { range: "₹10L – ₹12L", fy2324: "15% (from ₹12L)", fy2425: "15%", changed: false },
    { range: "₹12L – ₹15L", fy2324: "20%", fy2425: "20%", changed: false },
    { range: "₹15L+", fy2324: "30%", fy2425: "30%", changed: false },
];

const KEY_CHANGES = [
    { emoji: "⬆️", label: "Standard Deduction", before: "₹50,000", after: "₹75,000", impact: "positive", note: "New Regime only — saves up to ₹7,500 extra tax" },
    { emoji: "🏛️", label: "87A Rebate Limit", before: "₹5L taxable (₹12.5K rebate)", after: "₹7L taxable (₹25K rebate)", impact: "positive", note: "More people get zero-tax benefit" },
    { emoji: "💼", label: "NPS Employer Deduction (80CCD2)", before: "10% of salary", after: "14% of salary", impact: "positive", note: "Available under New Regime — major for govt employees" },
    { emoji: "🏠", label: "LTCG on Property", before: "20% with indexation", after: "12.5% without indexation", impact: "mixed", note: "Lower rate but no inflation adjustment — varies by case" },
    { emoji: "📈", label: "LTCG on Equity/MF", before: "10% above ₹1L exemption", after: "12.5% above ₹1.25L exemption", impact: "negative", note: "Rate increased 2.5%. Exemption limit slightly higher" },
    { emoji: "📉", label: "STCG on Equity/MF", before: "15%", after: "20%", impact: "negative", note: "Rate increased by 5%" },
];

export default function BudgetImpactPage() {
    const [salary, setSalary] = useState("");
    const [hasEquity, setHasEquity] = useState(false);
    const [hasProperty, setHasProperty] = useState(false);

    const result = useMemo(() => {
        const inc = parseFloat(salary) || 0;
        if (!inc) return null;

        const oldTax = calcNewTax2324(inc);
        const newTax = calcNewTax2425(inc);
        const oldCess = oldTax * 0.04;
        const newCess = newTax * 0.04;
        const saving = (oldTax + oldCess) - (newTax + newCess);

        return {
            oldTax: oldTax + oldCess,
            newTax: newTax + newCess,
            saving,
            inc,
        };
    }, [salary]);

    return (
        <div>
            <PageHeader
                title="Budget 2024 Impact Calculator"
                subtitle="See exactly how Budget 2024 changed your tax — and what you save or pay extra this year"
                breadcrumbs={[{ label: "Budget Impact" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                {/* Personalized impact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
                    <div className="space-y-5">
                        <h2 className="font-bold text-navy text-2xl">Your Personal Impact</h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Gross Salary (₹)</label>
                            <input type="number" value={salary} onChange={e => setSalary(e.target.value)} placeholder="e.g. 1500000"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40 text-lg font-semibold" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-700">Additional income sources:</p>
                            <label className="flex items-center gap-3 cursor-pointer text-sm">
                                <input type="checkbox" checked={hasEquity} onChange={e => setHasEquity(e.target.checked)} className="w-4 h-4 accent-teal" />
                                <span>I sold equity shares / mutual funds this year</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer text-sm">
                                <input type="checkbox" checked={hasProperty} onChange={e => setHasProperty(e.target.checked)} className="w-4 h-4 accent-teal" />
                                <span>I sold property this year</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        {!result ? (
                            <div className="rounded-2xl border-2 border-dashed border-gray-200 h-full flex items-center justify-center min-h-[200px]">
                                <p className="text-gray-400 text-sm text-center px-8">Enter your salary to see your Budget 2024 impact.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className={`rounded-2xl overflow-hidden border-2 ${result.saving > 0 ? "border-teal/30" : "border-red-200"}`}>
                                    <div className={`px-6 py-5 text-white ${result.saving > 0 ? "bg-teal" : "bg-red-500"}`}>
                                        <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                                            {result.saving > 0 ? <TrendingDown className="w-4 h-4" /> : result.saving < 0 ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                            {result.saving > 0 ? "You Save" : result.saving < 0 ? "You Pay More" : "No Change"} in FY 2024-25 vs FY 2023-24
                                        </div>
                                        <p className="text-3xl font-bold">{result.saving !== 0 ? fmt(result.saving) : "₹0"}</p>
                                    </div>
                                    <div className="divide-y divide-gray-100 bg-white text-sm">
                                        {[
                                            { label: "Tax in FY 2023-24 (Old Budget)", value: fmt(result.oldTax) },
                                            { label: "Tax in FY 2024-25 (Budget 2024)", value: fmt(result.newTax) },
                                            { label: result.saving > 0 ? "Net Saving" : "Net Extra Tax", value: fmt(result.saving), bold: true },
                                        ].map((row, i) => (
                                            <div key={i} className={`flex justify-between px-5 py-3 ${(row as any).bold ? "font-bold bg-gray-50" : ""}`}>
                                                <span className="text-gray-500">{row.label}</span>
                                                <span className={(row as any).bold ? (result.saving > 0 ? "text-teal" : "text-red-500") : "text-navy"}>{row.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {(hasEquity || hasProperty) && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                                        <strong>Capital Gains Impact:</strong>
                                        {hasEquity && " LTCG rate on equity raised from 10% → 12.5%. STCG rate raised from 15% → 20%."}
                                        {hasProperty && " LTCG on property now 12.5% without indexation (was 20% with indexation). Check with CA for your specific case."}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Changes Table */}
                <h2 className="section-title mb-6">Key Budget 2024 Changes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-navy text-white">
                                <th className="text-left px-4 py-3 rounded-tl-xl">Change</th>
                                <th className="text-center px-4 py-3">FY 2023-24</th>
                                <th className="text-center px-4 py-3">FY 2024-25</th>
                                <th className="text-left px-4 py-3 rounded-tr-xl">Impact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {KEY_CHANGES.map((c, i) => (
                                <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="mr-2">{c.emoji}</span>
                                        <strong>{c.label}</strong>
                                        <p className="text-xs text-gray-400 mt-0.5">{c.note}</p>
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-500">{c.before}</td>
                                    <td className="px-4 py-3 text-center font-semibold text-navy">{c.after}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.impact === "positive" ? "bg-emerald-100 text-emerald-700" :
                                                c.impact === "negative" ? "bg-red-100 text-red-700" :
                                                    "bg-amber-100 text-amber-700"
                                            }`}>
                                            {c.impact === "positive" ? "✅ Better" : c.impact === "negative" ? "❌ Worse" : "⚖️ Mixed"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-xs text-gray-400 mt-4">*Estimates based on New Regime only. Old Regime tax structure unchanged in Budget 2024. Surcharge not included.</p>
            </div>
        </div>
    );
}
