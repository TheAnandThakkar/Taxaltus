"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AssetType = "equity" | "equity_mf" | "debt_mf" | "property" | "gold";

const ASSET_INFO: Record<AssetType, { label: string; stcgMonths: number; stcgRate: number; ltcgRate: number; ltcgExemption: number; note: string }> = {
    equity: {
        label: "Listed Equity Shares",
        stcgMonths: 12,
        stcgRate: 20,
        ltcgRate: 12.5,
        ltcgExemption: 125000,
        note: "Traded on recognised stock exchange (STT paid). LTCG exempt up to ₹1.25L per year.",
    },
    equity_mf: {
        label: "Equity Mutual Funds",
        stcgMonths: 12,
        stcgRate: 20,
        ltcgRate: 12.5,
        ltcgExemption: 125000,
        note: "Equity-oriented funds (65%+ equity). Same rates as direct equity post-Budget 2024.",
    },
    debt_mf: {
        label: "Debt Mutual Funds",
        stcgMonths: 36,
        stcgRate: 0,
        ltcgRate: 12.5,
        ltcgExemption: 0,
        note: "Purchased after April 2023: gains taxed at slab rates regardless of holding period. Older units: 20% with indexation (pre-2023).",
    },
    property: {
        label: "Immovable Property",
        stcgMonths: 24,
        stcgRate: 0,
        ltcgRate: 12.5,
        ltcgExemption: 0,
        note: "Post-Budget 2024: 12.5% LTCG without indexation. STCG added to income and taxed at slab rates.",
    },
    gold: {
        label: "Physical Gold / Gold ETF",
        stcgMonths: 24,
        stcgRate: 0,
        ltcgRate: 12.5,
        ltcgExemption: 0,
        note: "Holding period reduced to 24 months from FY 2024-25 onwards for physical gold.",
    },
};

function fmt(n: number) {
    return "₹" + n.toLocaleString("en-IN");
}

export default function CapitalGainsPage() {
    const [assetType, setAssetType] = useState<AssetType>("equity");
    const [buyPrice, setBuyPrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [holdingMonths, setHoldingMonths] = useState("");
    const [units, setUnits] = useState("1");

    const info = ASSET_INFO[assetType];

    const result = useMemo(() => {
        const bp = parseFloat(buyPrice) || 0;
        const sp = parseFloat(sellPrice) || 0;
        const u = parseFloat(units) || 1;
        const months = parseFloat(holdingMonths) || 0;

        if (!bp || !sp || !months) return null;

        const totalBuy = bp * u;
        const totalSell = sp * u;
        const gain = totalSell - totalBuy;

        if (gain <= 0) {
            return { gain, isLoss: true, isLTCG: months >= info.stcgMonths, tax: 0, effectiveRate: 0 };
        }

        const isLTCG = months >= info.stcgMonths;
        let taxableGain = gain;
        let tax = 0;
        let rate = 0;

        if (isLTCG) {
            taxableGain = Math.max(0, gain - info.ltcgExemption);
            rate = info.ltcgRate;
            tax = assetType === "debt_mf" ? 0 : (taxableGain * rate) / 100;
        } else {
            rate = info.stcgRate;
            tax = assetType === "debt_mf" || assetType === "property" || assetType === "gold"
                ? 0  // slab rate
                : (gain * rate) / 100;
        }

        const cess: number = tax * 0.04;
        const totalTax: number = tax + cess;

        return {
            gain,
            isLoss: false,
            isLTCG,
            taxableGain,
            tax,
            cess,
            totalTax,
            rate,
            slabRate: (assetType === "debt_mf") || (!isLTCG && (assetType === "property" || assetType === "gold")),
            ltcgExemptionUsed: isLTCG ? Math.min(gain, info.ltcgExemption) : 0,
        };
    }, [assetType, buyPrice, sellPrice, holdingMonths, units, info]);

    return (
        <div>
            <PageHeader
                title="Capital Gains Calculator"
                subtitle="Calculate your STCG and LTCG tax on equity, mutual funds, property and gold"
                breadcrumbs={[{ label: "Capital Gains" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Asset Type</label>
                            <select value={assetType} onChange={e => setAssetType(e.target.value as AssetType)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 bg-white">
                                {Object.entries(ASSET_INFO).map(([key, val]) => (
                                    <option key={key} value={key}>{val.label}</option>
                                ))}
                            </select>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{info.note}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Buy Price (₹ per unit)</label>
                                <input type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} placeholder="e.g. 500"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sell Price (₹ per unit)</label>
                                <input type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder="e.g. 800"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Units / Qty</label>
                                <input type="number" value={units} onChange={e => setUnits(e.target.value)} placeholder="100"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Holding Period (months)</label>
                                <input type="number" value={holdingMonths} onChange={e => setHoldingMonths(e.target.value)} placeholder="e.g. 14"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-sm">
                            <p className="font-semibold text-navy mb-1">Holding Threshold: {info.stcgMonths} months</p>
                            <p className="text-gray-500">Below {info.stcgMonths} months → <strong>STCG @ {info.stcgRate > 0 ? `${info.stcgRate}%` : "Slab Rate"}</strong><br />
                                {info.stcgMonths}+ months → <strong>LTCG @ {info.ltcgRate}%</strong>
                                {info.ltcgExemption > 0 && ` (₹${(info.ltcgExemption / 100000).toFixed(2)}L exempt)`}</p>
                        </div>
                    </div>

                    {/* Results */}
                    <div>
                        {!result ? (
                            <div className="rounded-2xl border-2 border-dashed border-gray-200 h-full flex items-center justify-center min-h-[300px]">
                                <p className="text-gray-400 text-center text-sm px-8">Enter your asset details on the left to see your capital gains tax calculation.</p>
                            </div>
                        ) : result.isLoss ? (
                            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                                <div className="text-4xl mb-3">📉</div>
                                <h3 className="text-xl font-bold text-red-700 mb-2">Capital Loss</h3>
                                <p className="text-red-600 text-sm">Loss of <strong>{fmt(Math.abs(result.gain))}</strong></p>
                                <p className="text-red-500 text-xs mt-3">Losses can be carried forward for 8 years to offset future gains of the same category.</p>
                            </div>
                        ) : (
                            <div className="bg-white border-2 border-teal/30 rounded-2xl overflow-hidden shadow-sm">
                                <div className={`px-6 py-4 ${result.isLTCG ? "bg-teal" : "bg-amber-500"} text-white`}>
                                    <p className="text-sm font-semibold opacity-80">{result.isLTCG ? "Long-Term Capital Gain (LTCG)" : "Short-Term Capital Gain (STCG)"}</p>
                                    <p className="text-3xl font-bold mt-1">{fmt(result.gain)}</p>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {[
                                        { label: "Total Gain", value: fmt(result.gain) },
                                        ...(result.ltcgExemptionUsed ? [{ label: "LTCG Exemption", value: `-${fmt(result.ltcgExemptionUsed)}` }] : []),
                                        { label: "Taxable Gain", value: fmt(result.taxableGain ?? result.gain) },
                                        { label: `Tax Rate`, value: result.slabRate ? "At Income Slab Rate*" : `${result.rate}%` },
                                        ...(result.slabRate ? [] : [
                                            { label: "Tax (before cess)", value: fmt(result.tax ?? 0) },
                                            { label: "Health & Education Cess (4%)", value: fmt(result.cess ?? 0) },
                                            { label: "Total Tax Payable", value: fmt(result.totalTax ?? 0), bold: true },
                                        ]),
                                    ].map((row, i) => (
                                        <div key={i} className={`flex justify-between px-5 py-3 text-sm ${(row as any).bold ? "font-bold text-navy bg-teal/5" : ""}`}>
                                            <span className="text-gray-600">{row.label}</span>
                                            <span className={(row as any).bold ? "text-teal" : "text-navy"}>{row.value}</span>
                                        </div>
                                    ))}
                                    {result.slabRate && (
                                        <div className="px-5 py-3 bg-amber-50 text-xs text-amber-700">
                                            * These gains are added to your total income and taxed at your applicable income tax slab rate. Consult a CA for the exact amount.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8 text-sm text-gray-600">
                    <strong>Disclaimer:</strong> Rates are based on Budget 2024 provisions. Does not account for indexation, surcharge, or state-level taxes. Verify with a tax professional for large transactions.
                </div>
            </div>
        </div>
    );
}
