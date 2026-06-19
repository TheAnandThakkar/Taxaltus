"use client";

import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState, useMemo } from "react";
import AssessmentYearSelect from "@/components/ui/AssessmentYearSelect";
import OfficialSources from "@/components/ui/OfficialSources";
import TrustBar from "@/components/ui/TrustBar";
import TaxPayableVerdict from "@/components/ui/TaxPayableVerdict";
import {
    AssessmentYear,
    DEFAULT_ASSESSMENT_YEAR,
    calculateIncomeTax,
    getTaxYearRules,
} from "@/lib/taxYears";

function fmt(n: number) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function CTCCalculatorPage() {
    const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>(DEFAULT_ASSESSMENT_YEAR);
    const [ctc, setCtc] = useState("");
    const [basicPct, setBasicPct] = useState("40");
    const [hraPct, setHraPct] = useState("50");
    const [pf, setPf] = useState(true);
    const [gratuity, setGratuity] = useState(true);

    const result = useMemo(() => {
        const totalCTC = parseFloat(ctc) || 0;
        if (!totalCTC) return null;

        const monthly = totalCTC / 12;
        const basic = (totalCTC * parseFloat(basicPct || "40") / 100) / 12;
        const hra = (basic * parseFloat(hraPct || "50") / 100);

        // Employer contributions (not in take-home)
        const employerPF = pf ? Math.min(basic * 0.12, 1800) : 0; // capped at ₹15K basic
        const gratuityAmt = gratuity ? basic * 0.0481 : 0; // 4.81% of basic
        const employerContribs = employerPF + gratuityAmt;

        // Gross salary (monthly) = CTC/12 - employer contributions
        const grossMonthly = monthly - employerContribs;

        // Employee deductions
        const employeePF = pf ? Math.min(basic * 0.12, 1800) : 0;
        const pt = 200; // approx Professional Tax
        const specialAllowance = grossMonthly - basic - hra - employeePF;

        // Assume TDS as rough estimate (15% of gross annual as tax)
        const annualGross = grossMonthly * 12;
        const rules = getTaxYearRules(assessmentYear);
        const taxableForTds = Math.max(0, annualGross - rules.standardDeduction.new);
        const estimatedTax = calculateIncomeTax({
            assessmentYear,
            regime: "new",
            taxableIncome: taxableForTds,
        });
        const monthlyTDS = estimatedTax.totalTax / 12;

        const takeHome = grossMonthly - employeePF - pt - monthlyTDS;

        return {
            ctc: totalCTC,
            monthly,
            grossMonthly,
            basic,
            hra,
            specialAllowance: Math.max(0, specialAllowance),
            employeePF,
            employerPF,
            gratuityAmt,
            pt,
            monthlyTDS,
            annualTax: estimatedTax.totalTax,
            takeHome: Math.max(0, takeHome),
            employerContribs,
        };
    }, [assessmentYear, ctc, basicPct, hraPct, pf, gratuity]);

    const rules = getTaxYearRules(assessmentYear);

    return (
        <div>
            <PageHeader
                title="CTC → Take-Home Calculator"
                subtitle={`Estimate CTC to take-home using new-regime TDS for ${rules.fyLabel} (${rules.label})`}
                breadcrumbs={[{ label: "CTC Calculator" }]}
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

                {/* Info Banner */}
                <div className="bg-navy text-white rounded-2xl p-5 mb-8 flex gap-4">
                    <Info className="w-6 h-6 text-teal shrink-0 mt-0.5" />
                    <div>
                        <h2 className="font-bold mb-1">CTC ≠ Take-Home Pay</h2>
                        <p className="text-white/70 text-sm">Your CTC (Cost to Company) includes employer contributions like Provident Fund and Gratuity that never directly reach your bank account. This calculator shows you exactly where every rupee goes.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-5">
                        <AssessmentYearSelect value={assessmentYear} onChange={setAssessmentYear} />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual CTC (₹)</label>
                            <input type="number" value={ctc} onChange={e => setCtc(e.target.value)} placeholder="e.g. 1200000"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40 text-lg font-semibold" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Basic % of CTC</label>
                                <input type="number" value={basicPct} onChange={e => setBasicPct(e.target.value)} min="30" max="60"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                                <p className="text-xs text-gray-400 mt-1">Typically 40–50% of CTC</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">HRA % of Basic</label>
                                <input type="number" value={hraPct} onChange={e => setHraPct(e.target.value)} min="40" max="60"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/40" />
                                <p className="text-xs text-gray-400 mt-1">40% non-metro / 50% metro</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                            <p className="text-sm font-semibold text-gray-700">Include in CTC:</p>
                            {[
                                { label: "Employer PF (12% of Basic)", checked: pf, set: setPf },
                                { label: "Gratuity Provision (~4.81% of Basic)", checked: gratuity, set: setGratuity },
                            ].map(item => (
                                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={item.checked} onChange={e => item.set(e.target.checked)}
                                        className="w-4 h-4 accent-teal" />
                                    <span className="text-sm text-gray-700">{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    {!result ? (
                        <div className="rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center min-h-[300px]">
                            <p className="text-gray-400 text-center text-sm px-8">Enter your CTC to see the complete breakdown.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Take-home highlight */}
                            <div className="bg-teal text-white rounded-2xl p-5 text-center">
                                <p className="text-sm opacity-80">Estimated Monthly Take-Home</p>
                                <p className="text-4xl font-bold mt-1">{fmt(Math.round(result.takeHome))}</p>
                                <p className="text-sm opacity-60 mt-1">vs CTC of {fmt(Math.round(result.monthly))}/month</p>
                            </div>

                            {/* Breakdown */}
                            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100">
                                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">💼 Monthly Earnings</p>
                                </div>
                                {[
                                    { label: "Basic Salary", value: result.basic },
                                    { label: "HRA", value: result.hra },
                                    { label: "Special Allowance", value: result.specialAllowance },
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between px-4 py-2.5 text-sm border-b border-gray-50">
                                        <span className="text-gray-500">{r.label}</span>
                                        <span className="text-navy font-medium">{fmt(Math.round(r.value))}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between px-4 py-2.5 text-sm font-bold bg-emerald-50">
                                    <span>Gross Monthly Salary</span>
                                    <span className="text-emerald-700">{fmt(Math.round(result.grossMonthly))}</span>
                                </div>

                                <div className="bg-red-50 px-4 py-2 border-t border-red-100 mt-1">
                                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider">🔻 Monthly Deductions</p>
                                </div>
                                {[
                                    { label: "Employee PF (12% of Basic)", value: result.employeePF },
                                    { label: "Professional Tax", value: result.pt },
                                    { label: "Income Tax / TDS (est.)", value: result.monthlyTDS },
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between px-4 py-2.5 text-sm border-b border-gray-50">
                                        <span className="text-gray-500">{r.label}</span>
                                        <span className="text-red-600 font-medium">-{fmt(Math.round(r.value))}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between px-4 py-3 text-sm font-bold bg-teal/5 border-t border-teal/20">
                                    <span className="text-navy">🏦 Net Take-Home</span>
                                    <span className="text-teal text-base">{fmt(Math.round(result.takeHome))}</span>
                                </div>

                                <div className="bg-blue-50 px-4 py-2 border-t border-blue-100 mt-1">
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">🏢 Employer Cost (in CTC, not take-home)</p>
                                </div>
                                {[
                                    { label: "Employer PF", value: result.employerPF },
                                    { label: "Gratuity Provision", value: result.gratuityAmt },
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between px-4 py-2.5 text-sm border-b border-gray-50">
                                        <span className="text-gray-500">{r.label}</span>
                                        <span className="text-blue-600">{fmt(Math.round(r.value))}</span>
                                    </div>
                                ))}
                            </div>
                            <TaxPayableVerdict
                                totalTax={result.annualTax}
                                regimeLabel="New Regime"
                                reason={
                                    result.annualTax > 0
                                        ? `Estimated annual income tax of ${fmt(Math.round(result.annualTax))} (about ${fmt(Math.round(result.monthlyTDS))}/month TDS) is built into your take-home above. Actual TDS varies with your investment declarations.`
                                        : "On this CTC the New Regime leaves no income tax payable after the standard deduction and Section 87A rebate, so no TDS is deducted for tax."
                                }
                            />
                            <p className="text-xs text-gray-400 text-center">*TDS estimate based on New Regime. Actual will vary based on investments and declarations.</p>
                        </div>
                    )}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-8 text-sm text-amber-800">
                    <strong>Disclaimer:</strong> This calculator gives an estimate of your CTC breakdown and TDS applicable for <strong>{rules.fyLabel} ({rules.label})</strong>. Actual TDS and take-home salary may vary depending on your employer's policies, investment declarations, and other specific deductions. Consult your HR or a tax professional for precise details.
                </div>
                <div className="mt-6">
                    <OfficialSources note="CTC and take-home calculations vary by employer salary structure. The TDS estimate uses Taxaltus slab rules for education only and should be reconciled with payroll, Form 16 and AIS/Form 26AS." />
                </div>
            </div>
        </div>
    );
}
