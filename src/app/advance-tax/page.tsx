"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Info } from "lucide-react";
import AssessmentYearSelect from "@/components/ui/AssessmentYearSelect";
import OfficialSources from "@/components/ui/OfficialSources";
import TrustBar from "@/components/ui/TrustBar";
import TaxPayableVerdict from "@/components/ui/TaxPayableVerdict";
import {
    AGE_GROUP_LABELS,
    AgeGroup,
    AssessmentYear,
    DEFAULT_ASSESSMENT_YEAR,
    calculateIncomeTax,
    getTaxYearRules,
} from "@/lib/taxYears";

function fmt(n: number) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
}

function getInstallments(annualTax: number, assessmentYear: AssessmentYear) {
    const rules = getTaxYearRules(assessmentYear);
    const fyStartYear = Number(rules.fyLabel.slice(3, 7));
    const fyEndYear = fyStartYear + 1;

    return [
        { label: "1st Instalment", dueDate: `15 Jun ${fyStartYear}`, pct: 15, cumPct: 15 },
        { label: "2nd Instalment", dueDate: `15 Sep ${fyStartYear}`, pct: 30, cumPct: 45 },
        { label: "3rd Instalment", dueDate: `15 Dec ${fyStartYear}`, pct: 30, cumPct: 75 },
        { label: "4th Instalment", dueDate: `15 Mar ${fyEndYear}`, pct: 25, cumPct: 100 },
    ].map(inst => ({
        ...inst,
        amount: Math.round((annualTax * inst.pct) / 100),
        cumAmount: Math.round((annualTax * inst.cumPct) / 100),
    }));
}

export default function AdvanceTaxPage() {
    const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>(DEFAULT_ASSESSMENT_YEAR);
    const [regime, setRegime] = useState<"new" | "old">("new");
    const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
    const [income, setIncome] = useState("");
    const [deductions80c, setDeductions80c] = useState("");
    const [otherDeductions, setOtherDeductions] = useState("");
    const [tdsAlreadyDeducted, setTdsAlreadyDeducted] = useState("");

    const result = useMemo(() => {
        const rules = getTaxYearRules(assessmentYear);
        const gross = parseFloat(income) || 0;
        if (!gross) return null;

        const stdDed = rules.standardDeduction[regime];
        const ded80c = regime === "old" ? Math.min(parseFloat(deductions80c) || 0, 150000) : 0;
        const otherDed = regime === "old" ? Math.min(parseFloat(otherDeductions) || 0, 100000) : 0;
        const tds = parseFloat(tdsAlreadyDeducted) || 0;

        const taxableIncome = Math.max(0, gross - stdDed - ded80c - otherDed);

        const taxCalc = calculateIncomeTax({ assessmentYear, regime, taxableIncome, ageGroup });
        const annualTax = taxCalc.totalTax;
        const advanceTaxPayable = Math.max(0, annualTax - tds);

        // Educational interest estimate under s.234C (deferment) and s.234B
        // (short payment), assuming NO advance tax is paid during the year and
        // the dues are cleared when filing by 31 July of the assessment year.
        // 234C @1%/month on the cumulative shortfall at each quarter
        // (15%×3 + 45%×3 + 75%×3 + 100%×1) = 5.05% of the assessed shortfall.
        // 234B @1%/month for ~4 months (Apr–Jul) when < 90% is paid = 4%.
        const interest234C = Math.round(advanceTaxPayable * 0.0505);
        const interest234B = Math.round(advanceTaxPayable * 0.04);

        return {
            gross, taxableIncome, rawTax: taxCalc.rawTax, rebate: taxCalc.rebate, taxAfterRebate: taxCalc.taxAfterRebate, cess: taxCalc.cess, annualTax, tds,
            advanceTaxPayable,
            installments: getInstallments(advanceTaxPayable, assessmentYear),
            needsAdvanceTax: advanceTaxPayable > 10000,
            interest234B,
            interest234C,
        };
    }, [assessmentYear, regime, ageGroup, income, deductions80c, otherDeductions, tdsAlreadyDeducted]);

    const rules = getTaxYearRules(assessmentYear);

    return (
        <div>
            <PageHeader
                title="Advance Tax Calculator"
                subtitle={`Calculate quarterly advance tax installments for ${rules.fyLabel} (${rules.label})`}
                breadcrumbs={[{ label: "Advance Tax" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                <div className="mb-6">
                    <TrustBar />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-800 flex gap-3">
                    <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                    <div>
                        <strong>Who needs to pay Advance Tax?</strong> Any individual with tax liability exceeding ₹10,000 after TDS must pay advance tax in quarterly instalments. This includes salaried employees with significant non-salary income (capital gains, rent, interest, freelance, etc).
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-5">
                        <AssessmentYearSelect value={assessmentYear} onChange={setAssessmentYear} />
                        {/* Regime */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Regime</label>
                            <div className="grid grid-cols-2 gap-3">
                                {(["new", "old"] as const).map(r => (
                                    <button key={r} onClick={() => setRegime(r)}
                                        className={`py-3 rounded-xl text-sm font-semibold border-2 transition-colors ${regime === r ? "bg-navy text-white border-navy" : "bg-white text-gray-600 border-gray-200 hover:border-navy/50"}`}>
                                        {r === "new" ? "New (Default)" : "Old (Deductions)"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {regime === "old" && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age Group</label>
                                <select value={ageGroup} onChange={event => setAgeGroup(event.target.value as AgeGroup)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 bg-white">
                                    {Object.entries(AGE_GROUP_LABELS).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estimated Annual Gross Income (₹)</label>
                            <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 1200000"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                        </div>

                        {regime === "old" && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">80C Investments (₹, max ₹1.5L)</label>
                                    <input type="number" value={deductions80c} onChange={e => setDeductions80c(e.target.value)} placeholder="150000"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Other Deductions (HRA, 80D, etc.) (₹)</label>
                                    <input type="number" value={otherDeductions} onChange={e => setOtherDeductions(e.target.value)} placeholder="e.g. 50000"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">TDS Already Deducted (₹)</label>
                            <input type="number" value={tdsAlreadyDeducted} onChange={e => setTdsAlreadyDeducted(e.target.value)} placeholder="e.g. 80000"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                        {result && (
                            <TaxPayableVerdict
                                totalTax={result.annualTax}
                                regimeLabel={regime === "new" ? "New Regime" : "Old Regime"}
                                reason={
                                    result.annualTax > 0
                                        ? `Your estimated annual income tax (incl. cess) is ${fmt(result.annualTax)}. After TDS of ${fmt(result.tds)}, advance tax of ${fmt(result.advanceTaxPayable)} ${result.needsAdvanceTax ? "is due in instalments below." : "remains — below the ₹10,000 advance-tax threshold."}`
                                        : "On this income no income tax is payable after the standard deduction and Section 87A rebate, so no advance tax arises."
                                }
                            />
                        )}
                        {!result ? (
                            <div className="rounded-2xl border-2 border-dashed border-gray-200 h-full flex items-center justify-center min-h-[300px]">
                                <p className="text-gray-400 text-sm text-center px-8">Enter your projected income details to see your advance tax installment schedule.</p>
                            </div>
                        ) : !result.needsAdvanceTax ? (
                            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 text-center">
                                <div className="text-4xl mb-3">✅</div>
                                <h3 className="text-xl font-bold text-emerald-700 mb-2">No Advance Tax Required</h3>
                                <p className="text-emerald-600 text-sm">Your estimated advance tax payable after TDS is <strong>{fmt(result.advanceTaxPayable)}</strong>, which is below the ₹10,000 threshold.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-white border-2 border-teal/30 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="bg-navy text-white px-5 py-3">
                                        <p className="text-sm opacity-70">Total Advance Tax Payable This Year</p>
                                        <p className="text-3xl font-bold">{fmt(result.advanceTaxPayable)}</p>
                                    </div>
                                    <div className="divide-y divide-gray-100 text-sm">
                                        {[
                                            { label: "Gross Income", value: fmt(result.gross) },
                                            { label: "Taxable Income", value: fmt(result.taxableIncome) },
                                            { label: "Annual Tax (incl. surcharge + cess)", value: fmt(result.annualTax) },
                                            { label: "Less: TDS Deducted", value: `-${fmt(result.tds)}` },
                                        ].map((r, i) => (
                                            <div key={i} className="flex justify-between px-5 py-2.5">
                                                <span className="text-gray-500">{r.label}</span>
                                                <span className="font-medium text-navy">{r.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="font-bold text-navy flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-teal" />
                                    Quarterly Payment Schedule
                                </h3>
                                {result.installments.map((inst, i) => (
                                    <div key={i} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
                                        <div>
                                            <p className="font-semibold text-navy text-sm">{inst.label}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">Due: {inst.dueDate} ({inst.pct}% of total)</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-teal">{fmt(inst.amount)}</p>
                                            <p className="text-xs text-gray-400">Cumulative: {fmt(inst.cumAmount)}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Interest under Section 234B / 234C */}
                                <div className="bg-white border-2 border-amber-200 rounded-2xl overflow-hidden">
                                    <div className="bg-amber-500/10 px-5 py-3 border-b border-amber-200">
                                        <p className="font-bold text-amber-800 text-sm">If you skip advance tax — estimated interest</p>
                                    </div>
                                    <div className="divide-y divide-gray-100 text-sm">
                                        <div className="flex justify-between px-5 py-2.5">
                                            <span className="text-gray-500">Section 234C (deferment, ~1%/mo)</span>
                                            <span className="font-medium text-navy">{fmt(result.interest234C)}</span>
                                        </div>
                                        <div className="flex justify-between px-5 py-2.5">
                                            <span className="text-gray-500">Section 234B (short payment, ~1%/mo to 31 Jul)</span>
                                            <span className="font-medium text-navy">{fmt(result.interest234B)}</span>
                                        </div>
                                        <div className="flex justify-between px-5 py-2.5 bg-amber-50 font-bold">
                                            <span className="text-amber-800">Total interest if fully deferred</span>
                                            <span className="text-amber-800">{fmt(result.interest234B + result.interest234C)}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 px-5 py-3">
                                        Worst-case estimate assuming nil advance tax paid and dues cleared on filing by 31 July. Actual 234B/234C interest depends on the exact dates and amounts you pay.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8 text-sm text-gray-600">
                    <strong>Note:</strong> For purely salaried employees where all tax is deducted via TDS, advance tax is generally not required. This tool is most useful for those with income from freelancing, rent, capital gains, or business.
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-6 text-sm text-amber-800">
                    <strong>Disclaimer:</strong> This calculator provides an educational estimate of advance tax instalments based on the tax laws for <strong>{rules.fyLabel} ({rules.label})</strong>. Please consult a qualified tax professional or Chartered Accountant for personalised advice and compliance.
                </div>
                <div className="mt-6">
                    <OfficialSources />
                </div>
            </div>
        </div>
    );
}
