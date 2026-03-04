"use client";

import Link from "next/link";
import { ArrowLeft, Search, Phone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState } from "react";

const NOTICES = [
    {
        code: "143(1)",
        label: "Intimation under Section 143(1)",
        severity: "low",
        plain: "Your ITR has been automatically processed and the government's calculation matches (or slightly differs from) yours.",
        what: "This is a routine automated acknowledgement — NOT a real notice. Around 95% of ITRs get this. If it says 'No Demand, No Refund', you're all good.",
        action: "If it shows a demand: compare with your return, pay if correct, or file a rectification if wrong.",
        timeToAct: "30 days of receipt",
        panic: false,
    },
    {
        code: "139(9)",
        label: "Defective Return",
        severity: "medium",
        plain: "Something is wrong with your filed return — like wrong form, incomplete details, or income mismatch.",
        what: "Common triggers: Filed ITR-1 with capital gains, no bank account details, income/TDS mismatch with 26AS.",
        action: "File a corrected return within 15 days of the notice. Login to IT portal → e-proceedings → respond to notice → file revised return.",
        timeToAct: "15 days",
        panic: false,
    },
    {
        code: "143(2)",
        label: "Scrutiny Notice",
        severity: "high",
        plain: "The IT dept wants to examine your return more closely. They'll ask for documents to verify your income, deductions, or exemptions.",
        what: "Selected manually or via algorithm for high deductions, mismatch with AIS, large refunds, or unusual patterns.",
        action: "Do NOT ignore this. Compile all supporting documents (Form 16, investment proofs, rent receipts). Respond through the IT portal's e-proceedings section. Consider consulting a CA.",
        timeToAct: "Within date mentioned in notice (usually 15–30 days)",
        panic: true,
    },
    {
        code: "148",
        label: "Income Escaping Assessment (Reassessment)",
        severity: "high",
        plain: "The IT dept believes you had income that you didn't declare in your ITR and they want to reassess your return.",
        what: "Usually triggered by information from banks, registrar, or AIS showing transactions not matching declared income.",
        action: "File a response. You may need to submit a revised return or justification documents. Strongly recommend consulting a CA for this notice.",
        timeToAct: "Within date mentioned in notice",
        panic: true,
    },
    {
        code: "245",
        label: "Adjustment of Refund against Demand",
        severity: "medium",
        plain: "You're due a refund, but the department is offsetting it against a past tax demand on your PAN.",
        what: "If you have any outstanding tax from a previous year, the refund for the current year gets adjusted against it instead of being paid out.",
        action: "Login to IT portal → Outstanding Demand section. If demand is wrong, file online rectification or raise a grievance. If correct, pay the demand.",
        timeToAct: "30 days",
        panic: false,
    },
    {
        code: "156",
        label: "Demand Notice",
        severity: "medium",
        plain: "You owe tax money to the Income Tax Department — this is a formal demand to pay it.",
        what: "Generated after assessment confirms tax due. Could be from 143(1) mismatch, disallowed deductions, or interest on late payment.",
        action: "Pay via Challan 280 (Income Tax → Self-Assessment Tax) on IT portal. Or file a rectification if the demand is wrong.",
        timeToAct: "30 days (interest accrues after due date)",
        panic: false,
    },
    {
        code: "271(1)(c)",
        label: "Penalty for Concealment / Inaccurate Particulars",
        severity: "critical",
        plain: "The dept believes you deliberately hid income or gave false information in your return. This is the most serious notice.",
        what: "Can result in a penalty of 100%–300% of tax evaded. Usually comes after scrutiny assessment finds concealed income.",
        action: "Consult a chartered accountant (CA) immediately. Do not try to handle this on your own.",
        timeToAct: "As specified in notice",
        panic: true,
    },
];

const SEVERITY_STYLE = {
    low: { badge: "bg-emerald-100 text-emerald-700", border: "border-emerald-200", label: "Routine" },
    medium: { badge: "bg-amber-100 text-amber-700", border: "border-amber-200", label: "Action Required" },
    high: { badge: "bg-red-100 text-red-700", border: "border-red-200", label: "Urgent" },
    critical: { badge: "bg-red-900/10 text-red-900", border: "border-red-400", label: "Critical" },
};

export default function TaxNoticeDecoderPage() {
    const [search, setSearch] = useState("");
    const filtered = NOTICES.filter(n =>
        n.code.toLowerCase().includes(search.toLowerCase()) ||
        n.label.toLowerCase().includes(search.toLowerCase()) ||
        n.plain.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <PageHeader
                title="Tax Notice Decoder"
                subtitle="Got a notice from the Income Tax Department? Find out what it means and what to do — in plain English"
                breadcrumbs={[{ label: "Tax Notice Decoder" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                {/* Calm-down Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <h2 className="font-bold text-blue-800 text-lg mb-1">😌 First — don&apos;t panic</h2>
                    <p className="text-blue-700 text-sm leading-relaxed">Receiving an IT notice doesn&apos;t mean you did something wrong. Most notices (especially 143(1)) are routine and require little to no action. Read carefully, understand the code, and respond calmly within the deadline.</p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by section (e.g. 143) or keyword..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/40 bg-white"
                    />
                </div>

                <div className="space-y-5">
                    {filtered.map(notice => {
                        const style = SEVERITY_STYLE[notice.severity as keyof typeof SEVERITY_STYLE];
                        return (
                            <div key={notice.code} className={`bg-white border-2 rounded-2xl overflow-hidden ${style.border}`}>
                                <div className="p-6">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="bg-navy text-white font-bold text-sm px-3 py-1 rounded-lg">Section {notice.code}</span>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}>{style.label}</span>
                                        {notice.panic && (
                                            <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full font-semibold">⚠️ Consult CA</span>
                                        )}
                                        <span className="ml-auto text-xs text-gray-400 font-medium">Act within: <strong className="text-gray-700">{notice.timeToAct}</strong></span>
                                    </div>

                                    <h3 className="font-bold text-navy text-lg mb-3">{notice.label}</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                            <p className="text-xs font-bold text-blue-500 mb-1.5">🗣 In Plain English</p>
                                            <p className="text-blue-800 leading-relaxed">{notice.plain}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <p className="text-xs font-bold text-gray-500 mb-1.5">📘 What it means</p>
                                            <p className="text-gray-700 leading-relaxed">{notice.what}</p>
                                        </div>
                                        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                            <p className="text-xs font-bold text-emerald-600 mb-1.5">✅ What to do</p>
                                            <p className="text-emerald-700 leading-relaxed">{notice.action}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start">
                    <Phone className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-600">
                        <strong className="text-navy">Didn&apos;t find your notice?</strong> You can call the Income Tax Helpline at <strong>1800-103-0025</strong> (toll-free) or raise a grievance on the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-teal underline">IT portal</a> under &apos;Grievance&apos; section.
                    </div>
                </div>
            </div>
        </div>
    );
}
