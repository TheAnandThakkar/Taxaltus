"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState, useMemo } from "react";

function fmt(n: number) {
    return "₹" + Math.round(Math.abs(n)).toLocaleString("en-IN");
}

// FY 2024-25 New Regime slabs (Pre-Budget 2025/2026)
function calcOldTax(income: number) {
    const std = 75000;
    const taxable = Math.max(0, income - std);
    let tax = 0;
    if (taxable <= 300000) tax = 0;
    else if (taxable <= 700000) tax = (taxable - 300000) * 0.05;
    else if (taxable <= 1000000) tax = 20000 + (taxable - 700000) * 0.1;
    else if (taxable <= 1200000) tax = 50000 + (taxable - 1000000) * 0.15;
    else if (taxable <= 1500000) tax = 80000 + (taxable - 1200000) * 0.2;
    else tax = 150000 + (taxable - 1500000) * 0.3;

    const rebate = taxable <= 700000 ? Math.min(tax, 25000) : 0;
    return Math.max(0, tax - rebate);
}

// FY 2026-27 New Regime slabs (Latest Budget)
function calcNewTax(income: number) {
    const std = 75000;
    const taxable = Math.max(0, income - std);
    let tax = 0;
    if (taxable <= 400000) tax = 0;
    else if (taxable <= 800000) tax = (taxable - 400000) * 0.05;
    else if (taxable <= 1200000) tax = 20000 + (taxable - 800000) * 0.10;
    else if (taxable <= 1600000) tax = 60000 + (taxable - 1200000) * 0.15;
    else if (taxable <= 2000000) tax = 120000 + (taxable - 1600000) * 0.20;
    else if (taxable <= 2400000) tax = 200000 + (taxable - 2000000) * 0.25;
    else tax = 300000 + (taxable - 2400000) * 0.30;

    const rebate = taxable <= 1200000 ? Math.min(tax, 60000) : 0;
    return Math.max(0, tax - rebate);
}

const SLAB_CHANGES = [
    { range: "₹0 – ₹4L", old: "Nil up to ₹3L", new: "Nil up to ₹4L", changed: true, note: "Exemption bumped by ₹1L" },
    { range: "₹4L – ₹8L", old: "5%", new: "5%", changed: true, note: "Slab widened by ₹1L" },
    { range: "₹8L – ₹12L", old: "10% / 15%", new: "10%", changed: true, note: "Major savings here" },
    { range: "₹12L – ₹16L", old: "15% / 20% / 30%", new: "15%", changed: true, note: "Huge tax slash" },
    { range: "₹16L – ₹20L", old: "30%", new: "20%", changed: true, note: "Rate dropped by 10%" },
    { range: "₹20L – ₹24L", old: "30%", new: "25%", changed: true, note: "Rate dropped by 5%" },
    { range: "₹24L+", old: "30%", new: "30%", changed: false },
];

const KEY_CHANGES = [
    { emoji: "🏛️", label: "87A Rebate Limit", before: "₹7L taxable (₹25K rebate)", after: "₹12L taxable (₹60K rebate)", impact: "positive", note: "Massive change: zero tax for income up to ₹12.75L gross" },
    { emoji: "🚀", label: "Basic Exemption", before: "₹3,00,000", after: "₹4,00,000", impact: "positive", note: "Basic exemption increased by ₹1 Lakh" },
    { emoji: "📈", label: "Tax Slabs", before: "Steeper progression", after: "Wider, generous slabs", impact: "positive", note: "Saves up to ₹17,500 extra tax purely due to slabs" },
];

export default function BudgetImpactPage() {
    const [salary, setSalary] = useState("");
    const [hasEquity, setHasEquity] = useState(false);
    const [hasProperty, setHasProperty] = useState(false);

    const result = useMemo(() => {
        const inc = parseFloat(salary) || 0;
        if (!inc) return null;

        const oldTaxVal = calcOldTax(inc);
        const newTaxVal = calcNewTax(inc);
        const oldCess = oldTaxVal * 0.04;
        const newCess = newTaxVal * 0.04;
        const saving = (oldTaxVal + oldCess) - (newTaxVal + newCess);

        return {
            oldTax: oldTaxVal + oldCess,
            newTax: newTaxVal + newCess,
            saving,
            inc,
        };
    }, [salary]);

    return (
        <div>
            <PageHeader
                title="Latest Budget Impact Calculator"
                subtitle="See exactly how the latest Budget changed your tax compared to the old FY 2024-25 baseline"
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
                                <p className="text-gray-400 text-sm text-center px-8">Enter your salary to see the latest Budget impact.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className={`rounded-2xl overflow-hidden border-2 ${result.saving > 0 ? "border-teal/30" : "border-red-200"}`}>
                                    <div className={`px-6 py-5 text-white ${result.saving > 0 ? "bg-teal" : "bg-red-500"}`}>
                                        <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
                                            {result.saving > 0 ? <TrendingDown className="w-4 h-4" /> : result.saving < 0 ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                            {result.saving > 0 ? "You Save" : result.saving < 0 ? "You Pay More" : "No Change"} (FY 24-25 vs FY 26-27)
                                        </div>
                                        <p className="text-3xl font-bold">{result.saving !== 0 ? fmt(result.saving) : "₹0"}</p>
                                    </div>
                                    <div className="divide-y divide-gray-100 bg-white text-sm">
                                        {[
                                            { label: "Tax in FY 2024-25 (Old Baseline)", value: fmt(result.oldTax) },
                                            { label: "Tax in FY 2026-27 (Latest Budget)", value: fmt(result.newTax) },
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
                                        {hasEquity && " Keep in mind, LTCG rate on equity is 12.5% and STCG rate is 20% on the latest applicable regime."}
                                        {hasProperty && " LTCG on property is 12.5% without indexation. Check with CA for your specific case."}
                                    </div>
                                )}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                                    <strong>Disclaimer:</strong> This calculator provides an estimate based on the <strong>FY 2026-27</strong> budget. Please consult a qualified CA for accurate guidance.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Key Changes Table */}
                <h2 className="section-title mb-6">Key Upcoming Changes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-navy text-white">
                                <th className="text-left px-4 py-3 rounded-tl-xl">Change</th>
                                <th className="text-center px-4 py-3">Old Baseline</th>
                                <th className="text-center px-4 py-3">FY 2026-27</th>
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

                <p className="text-xs text-gray-400 mt-4">*Estimates based on New Regime only. Surcharge not included.</p>
            </div>
        </div>
    );
}
