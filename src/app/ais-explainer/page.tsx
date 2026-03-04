"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, FileText, Eye, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState } from "react";

const AIS_SECTIONS = [
    {
        code: "Part A",
        label: "General Information",
        color: "border-blue-200 bg-blue-50",
        icon: "🪪",
        plain: "Your basic details — Name, PAN, date of birth, and address as per Income Tax records.",
        jargon: "PAN-linked taxpayer identification details.",
        fields: [
            { label: "Name", example: "ANAND THAKKAR", tip: "Appears exactly as registered on your PAN card." },
            { label: "PAN", example: "ABCDE1234F", tip: "Your Permanent Account Number — links all financial activity." },
            { label: "Address", example: "12 MG Road, Bengaluru", tip: "As provided to Income Tax Department. Update via IT portal if wrong." },
        ]
    },
    {
        code: "Part B-1",
        label: "TDS on Salary (Form 16)",
        color: "border-emerald-200 bg-emerald-50",
        icon: "💼",
        plain: "How much tax your employer deducted from your salary and deposited with the government.",
        jargon: "TDS deducted under Section 192 — reported by employer via 24Q quarterly TDS returns.",
        fields: [
            { label: "Name of Employer", example: "ABC Technologies Pvt Ltd", tip: "Should match your Form 16 Part A. If wrong, the TDS won't reflect in your credit." },
            { label: "Amount Paid/Credited", example: "₹12,00,000", tip: "Your gross salary as reported by employer — may differ from your offer letter CTC." },
            { label: "TDS Deducted", example: "₹1,20,000", tip: "Should exactly match total TDS shown in your Form 16 Part A." },
        ]
    },
    {
        code: "Part B-2",
        label: "TDS on Non-Salary (Form 16A)",
        color: "border-amber-200 bg-amber-50",
        icon: "🏦",
        plain: "Tax deducted from interest, rent, commission, or other non-salary payments you received.",
        jargon: "TDS deducted under sections 194A/194H/194I etc., reported via 26Q returns.",
        fields: [
            { label: "Deductor Name", example: "HDFC Bank Ltd", tip: "The institution that paid you and deducted TDS — bank, company, etc." },
            { label: "Nature of Payment", example: "Interest on FD", tip: "Category like: Interest, Rent, Commission, Professional Fees." },
            { label: "TDS Deducted", example: "₹5,000", tip: "Bank deducts 10% TDS on FD interest above ₹40,000/year. Verify against your bank statement." },
        ]
    },
    {
        code: "Part C",
        label: "Taxes Paid (Self-Assessment & Advance Tax)",
        color: "border-purple-200 bg-purple-50",
        icon: "💳",
        plain: "Any tax YOU paid directly — like advance tax or self-assessment tax via Challan 280.",
        jargon: "Self-assessment tax (SAT) and advance tax payments made via Challan ITNS 280.",
        fields: [
            { label: "BSR Code", example: "0240002", tip: "Bank branch code where you paid tax. Used to verify payment." },
            { label: "Challan No.", example: "00123", tip: "Receipt number of your payment. Keep this for your records." },
            { label: "Amount Paid", example: "₹15,000", tip: "Must match what you entered in your ITR under 'Taxes Paid'." },
        ]
    },
    {
        code: "Part D",
        label: "Securities Transactions (Stocks, MFs)",
        color: "border-rose-200 bg-rose-50",
        icon: "📈",
        plain: "All your stock and mutual fund buy/sell transactions — auto-fetched from exchanges.",
        jargon: "SFT (Specified Financial Transaction) data from depositories like CDSL/NSDL and stock exchanges.",
        fields: [
            { label: "Type", example: "Purchase / Sale of Securities", tip: "Whether you bought or sold shares or MF units during the year." },
            { label: "Amount", example: "₹5,00,000", tip: "Total transaction value. Does NOT mean you have a capital gain — that's proceeds minus cost." },
            { label: "Reporting Entity", example: "CDSL / NSDL / NSE", tip: "The depository or exchange that reported this transaction to IT dept." },
        ]
    },
    {
        code: "Part E",
        label: "Savings Account & Deposits",
        color: "border-teal-200 bg-teal-50",
        icon: "🏧",
        plain: "Cash deposits, large bank transfers, and high-value savings transactions flagged by your bank.",
        jargon: "SFT reported under Rule 114E — cash deposits above ₹10L, property registrations, etc.",
        fields: [
            { label: "Type", example: "Cash Deposit in Savings Account", tip: "Cash deposits > ₹10L/year in a single bank are mandatorily reported." },
            { label: "Amount", example: "₹12,00,000", tip: "If unexplained, the IT dept may send a notice. Ensure you have documentation of source." },
        ]
    },
];

export default function AISExplainerPage() {
    const [open, setOpen] = useState<string | null>("Part B-1");

    return (
        <div>
            <PageHeader
                title="AIS / Form 26AS Explained"
                subtitle="Understand every section of your Annual Information Statement in plain English"
                breadcrumbs={[{ label: "AIS Explainer" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                {/* Explainer Banner */}
                <div className="bg-navy text-white rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <FileText className="w-8 h-8 text-teal shrink-0 mt-0.5" />
                        <div>
                            <h2 className="text-xl font-bold mb-2">What is AIS?</h2>
                            <p className="text-white/70 leading-relaxed">
                                The <strong className="text-white">Annual Information Statement (AIS)</strong> is a comprehensive record maintained by the Income Tax Department showing <strong className="text-white">all financial transactions linked to your PAN</strong> — salary, interest, investments, property purchases, and more. It replaced and expanded the older Form 26AS.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Where to find it?", "income tax portal → AIS → Download"].map((t, i) => (
                                    <span key={i} className={`text-xs px-3 py-1.5 rounded-full font-medium ${i === 0 ? "bg-white/10 text-white/70" : "bg-teal/20 text-teal"}`}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AIS vs 26AS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                        { label: "Form 26AS", desc: "Older document. Shows TDS, TCS, and direct tax payments. Still valid but less comprehensive.", icon: "📄", color: "border-gray-200 bg-gray-50" },
                        { label: "AIS", desc: "Newer, comprehensive. Includes everything in 26AS + securities, savings, foreign remittances, and more.", icon: "📊", color: "border-teal/30 bg-teal/5" },
                    ].map(item => (
                        <div key={item.label} className={`rounded-xl border-2 p-5 ${item.color}`}>
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <h3 className="font-bold text-navy mb-1">{item.label}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Why it matters */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3 text-sm text-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                        <strong>Why it matters for you:</strong> If your AIS shows income you didn&apos;t declare in your ITR, you may receive an IT notice. Always cross-verify AIS with your actual income before filing.
                    </div>
                </div>

                {/* Sections */}
                <h2 className="section-title mb-6">Section-by-Section Breakdown</h2>
                <div className="space-y-4">
                    {AIS_SECTIONS.map(section => {
                        const isOpen = open === section.code;
                        return (
                            <div key={section.code} className={`rounded-2xl border-2 overflow-hidden ${section.color.split(" ")[0]}`}>
                                <button onClick={() => setOpen(isOpen ? null : section.code)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-black/5 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{section.icon}</span>
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{section.code}</span>
                                            <h3 className="font-bold text-navy group-hover:text-teal transition-colors">{section.label}</h3>
                                        </div>
                                    </div>
                                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-6 border-t border-gray-100 bg-white">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4">
                                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                                <p className="text-xs font-semibold text-emerald-600 mb-1">🗣 In Plain English</p>
                                                <p className="text-sm text-gray-700 leading-relaxed">{section.plain}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                <p className="text-xs font-semibold text-gray-500 mb-1">📘 Technical</p>
                                                <p className="text-sm text-gray-600 leading-relaxed">{section.jargon}</p>
                                            </div>
                                        </div>
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Fields</h4>
                                        <div className="space-y-3">
                                            {section.fields.map((field, i) => (
                                                <div key={i} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                    <Eye className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                                    <div>
                                                        <p className="font-semibold text-navy text-sm">{field.label}</p>
                                                        <p className="text-xs text-gray-400">Example: <strong className="text-gray-600">{field.example}</strong></p>
                                                        <p className="text-xs text-teal mt-0.5">💡 {field.tip}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
                    <strong>How to access AIS:</strong> Login to <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="underline">incometax.gov.in</a> → Services → Annual Information Statement (AIS) → Download PDF or JSON. Cross-verify it before filing your ITR every year.
                </div>
            </div>
        </div>
    );
}
