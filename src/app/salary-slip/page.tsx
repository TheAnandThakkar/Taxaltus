"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, Info } from "lucide-react";

interface SlipItem {
    name: string;
    key: string;
    typical: string;
    description: string;
    taxable: boolean;
    type: "earning" | "deduction" | "employer";
}

const SALARY_COMPONENTS: SlipItem[] = [
    {
        name: "Basic Salary",
        key: "basic",
        typical: "40–50% of CTC",
        description: "The fixed core component of your salary. It is fully taxable. All other components like HRA, PF, and gratuity are calculated as a percentage of Basic.",
        taxable: true,
        type: "earning",
    },
    {
        name: "House Rent Allowance (HRA)",
        key: "hra",
        typical: "40–50% of Basic",
        description: "Provided to cover rental expenses. Partially or fully exempt from tax if you pay rent. Exemption calculated as the minimum of: Actual HRA, 50%/40% of Basic (metro/non-metro), or Rent paid minus 10% of Basic.",
        taxable: false,
        type: "earning",
    },
    {
        name: "Special Allowance",
        key: "special",
        typical: "Balancing figure",
        description: "A flexible, catch-all allowance used to fill the gap between CTC and structured components. Fully taxable. Often the largest variable component in modern pay structures.",
        taxable: true,
        type: "earning",
    },
    {
        name: "Leave Travel Allowance (LTA)",
        key: "lta",
        typical: "1–2 months Basic/year",
        description: "Covers travel expenses during leave. Tax-exempt for 2 journeys in a block of 4 calendar years (current block: 2026–2029). Only domestic travel by shortest route qualifies.",
        taxable: false,
        type: "earning",
    },
    {
        name: "Bonus / Performance Pay",
        key: "bonus",
        typical: "Variable",
        description: "Variable pay linked to individual or company performance. Fully taxable in the year of receipt. Not guaranteed — subject to company policy.",
        taxable: true,
        type: "earning",
    },
    {
        name: "Employee PF Contribution (EPF)",
        key: "epf_emp",
        typical: "12% of Basic",
        description: "12% of your Basic deducted from your take-home salary each month and deposited into your EPF account. Qualifies for 80C deduction — reduces your taxable income by up to ₹1.5 lakh.",
        taxable: false,
        type: "deduction",
    },
    {
        name: "Professional Tax (PT)",
        key: "pt",
        typical: "₹200/month (max ₹2,400/yr)",
        description: "State-levied tax on salaried employees. Maximum ₹2,500 per year (varies by state). Deductible from taxable income under Section 16(iii). Not applicable in all states.",
        taxable: false,
        type: "deduction",
    },
    {
        name: "Income Tax (TDS)",
        key: "tds",
        typical: "Based on salary slab",
        description: "Tax Deducted at Source by your employer on your estimated annual income. Calculated after considering your declared investments and HRA. Shown per month as 1/12th of estimated annual tax.",
        taxable: false,
        type: "deduction",
    },
    {
        name: "Employer PF Contribution",
        key: "epf_emp2",
        typical: "12% of Basic",
        description: "Employer's matching contribution to your EPF account. NOT part of your take-home — it's an additional employer cost. Included in your CTC but does not affect your monthly net pay.",
        taxable: false,
        type: "employer",
    },
    {
        name: "Gratuity",
        key: "gratuity",
        typical: "4.8% of Basic/year",
        description: "Lump-sum paid by employer after 5+ years of service. Included in CTC as an annual provision. Exempt from tax up to ₹20 lakh under the Payment of Gratuity Act.",
        taxable: false,
        type: "employer",
    },
];

const BADGES: Record<SlipItem["type"], { label: string; color: string }> = {
    earning: { label: "Earning", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    deduction: { label: "Deduction", color: "bg-red-50 text-red-600 border-red-200" },
    employer: { label: "Employer Cost", color: "bg-blue-50 text-blue-700 border-blue-200" },
};

export default function SalarySlipPage() {
    const [open, setOpen] = useState<string | null>(null);

    const earnings = SALARY_COMPONENTS.filter(c => c.type === "earning");
    const deductions = SALARY_COMPONENTS.filter(c => c.type === "deduction");
    const employerCosts = SALARY_COMPONENTS.filter(c => c.type === "employer");

    const Section = ({ title, items, borderColor }: { title: string; items: SlipItem[]; borderColor: string }) => (
        <div className={`rounded-xl border-2 ${borderColor} overflow-hidden mb-6`}>
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                <h3 className="font-bold text-navy text-sm uppercase tracking-wider">{title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {items.map(item => {
                    const isOpen = open === item.key;
                    const badge = BADGES[item.type];
                    return (
                        <div key={item.key}>
                            <button
                                onClick={() => setOpen(isOpen ? null : item.key)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <span className="font-semibold text-navy group-hover:text-teal transition-colors">{item.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badge.color}`}>{badge.label}</span>
                                            {item.taxable ? (
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">Taxable</span>
                                            ) : (
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal/5 text-teal border border-teal/20">Tax-Exempt</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-sm text-gray-400 hidden sm:block">{item.typical}</span>
                                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                </div>
                            </button>
                            {isOpen && (
                                <div className="px-5 pb-5 bg-teal/[0.02] border-t border-gray-100">
                                    <div className="flex items-start gap-2 mt-3">
                                        <Info className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                            <p className="text-xs text-gray-400 mt-2">Typical range: <span className="font-medium text-gray-600">{item.typical}</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div>
            <PageHeader
                title="Salary Slip Explained"
                subtitle="Understand every component of your Indian pay slip — from CTC to take-home"
                breadcrumbs={[{ label: "Salary Slip" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* CTC Flow Banner */}
                <div className="bg-navy rounded-2xl p-6 mb-8 text-white">
                    <h2 className="text-lg font-bold mb-4 text-white/80 text-center">How CTC Flows to Your Take-Home</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center flex-wrap">
                        {["CTC (Total Package)", "→", "Gross Salary", "→", "Net Deductions", "→", "Net Take-Home"].map((item, i) => (
                            item === "→"
                                ? <span key={i} className="text-white/30 text-xl font-light hidden sm:block">→</span>
                                : <div key={i} className={`px-4 py-2 rounded-xl text-sm font-semibold ${i === 0 ? "bg-white/10 border border-white/20" : i === 6 ? "bg-teal text-white" : "bg-white/5 border border-white/10"}`}>{item}</div>
                        ))}
                    </div>
                    <p className="text-white/50 text-xs text-center mt-4">CTC ≠ Take-Home. Several deductions and employer contributions are included in CTC but don't reach your bank account.</p>
                </div>

                <Section title="💼 Earnings / Allowances" items={earnings} borderColor="border-emerald-200" />
                <Section title="🔻 Employee Deductions" items={deductions} borderColor="border-red-200" />
                <Section title="🏢 Employer Contributions (part of CTC, not take-home)" items={employerCosts} borderColor="border-blue-200" />

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4 text-sm text-amber-800">
                    <strong>Note:</strong> Actual components vary by employer. This guide shows a typical structure for a salaried employee in India. Always refer to your official offer letter or HR for your exact breakdown.
                </div>
            </div>
        </div>
    );
}
