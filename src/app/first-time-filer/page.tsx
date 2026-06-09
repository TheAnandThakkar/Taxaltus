"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, AlertTriangle, FileText, Clock, Smartphone } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useState } from "react";

const STEPS = [
    {
        step: 1,
        title: "Gather your documents",
        time: "30 min",
        icon: "📦",
        desc: "Before you open the IT portal, collect everything you'll need. Don't start without these.",
        items: [
            { label: "Form 16 (Part A & B)", note: "Get from your employer's HR/payroll portal by June 15th" },
            { label: "PAN card", note: "10-digit alphanumeric — needed to log in" },
            { label: "Aadhaar card", note: "For e-verification at the end" },
            { label: "Bank account details", note: "Account number + IFSC for refund, if any" },
            { label: "Bank interest certificates", note: "From every bank where you have FDs or savings accounts" },
            { label: "Investment proofs", note: "If claiming 80C, 80D under Old Regime" },
        ],
        tip: "Ask HR for Form 16 as soon as it's available — usually by June 15th.",
    },
    {
        step: 2,
        title: "Choose your ITR form",
        time: "5 min",
        icon: "📝",
        desc: "Most salaried employees with only salary income use ITR-1 (Sahaj). But check carefully:",
        items: [
            { label: "Only salary income + one house + interest < ₹50K income → ITR-1", note: "" },
            { label: "Capital gains or >1 house property → ITR-2", note: "" },
            { label: "Business/freelance income → ITR-3 or ITR-4", note: "" },
        ],
        tip: "Not sure which form? Use our ITR Form Selector tool.",
        link: { label: "ITR Form Selector →", href: "/itr-selector" },
    },
    {
        step: 3,
        title: "Log in to the IT Portal",
        time: "10 min",
        icon: "🔐",
        desc: "Create an account or log in at incometax.gov.in using your PAN as the User ID.",
        items: [
            { label: "Go to incometax.gov.in → Register", note: "Use PAN as User ID, create a password" },
            { label: "Verify your mobile/email OTP", note: "You'll need access to your registered phone" },
            { label: "Complete e-filing profile", note: "Add bank account, Aadhaar linkage" },
        ],
        tip: "Link Aadhaar to PAN before filing — it's mandatory. Do this under Profile → Link Aadhaar.",
    },
    {
        step: 4,
        title: "Check your AIS & Form 26AS",
        time: "15 min",
        icon: "👁️",
        desc: "Before filling your ITR, check what the government already knows about your income.",
        items: [
            { label: "Services → Annual Information Statement (AIS)", note: "All income reported to IT dept by your employer, bank, broker" },
            { label: "Verify TDS shown matches your Form 16", note: "Discrepancies must be resolved before filing" },
            { label: "Check for any unexpected entries (interest, dividends)", note: "These need to be declared in your ITR too" },
        ],
        tip: "AIS may show income you forgot — like FD interest. Not declaring it = risk of notice.",
        link: { label: "Learn about AIS →", href: "/ais-explainer" },
    },
    {
        step: 5,
        title: "Fill your ITR",
        time: "45–60 min",
        icon: "✍️",
        desc: "Go to File Income Tax Return → Select AY → Choose ITR-1 → Start filing.",
        items: [
            { label: "Personal Info tab", note: "Verify name, PAN, address, bank account" },
            { label: "Gross Total Income tab", note: "Salary income auto-populates from Form 26AS — verify against Form 16" },
            { label: "Deductions tab", note: "Add 80C, 80D, HRA, home loan interest (Old Regime only)" },
            { label: "Tax Paid tab", note: "Verify TDS shown matches your Form 16 Part A" },
            { label: "Review 'Taxes Payable' or 'Refund Due'", note: "If refund shows, verify bank details are correct" },
        ],
        tip: "If any tax is 'payable', pay it first using Challan 280 before submitting.",
    },
    {
        step: 6,
        title: "Verify & Submit",
        time: "5 min",
        icon: "✅",
        desc: "After submitting the ITR form, you MUST verify it. Unverified returns are treated as not filed.",
        items: [
            { label: "e-Verify using Aadhaar OTP", note: "Fastest option — generates and verifies instantly" },
            { label: "Or via Net Banking", note: "Log in to bank → IT filing → e-verify" },
            { label: "Or send signed ITR-V by post to CPC Bengaluru", note: "Within 30 days — only if e-verify fails" },
        ],
        tip: "e-Verification via Aadhaar OTP is the easiest. Done in under 2 minutes.",
    },
    {
        step: 7,
        title: "Track your refund",
        time: "Ongoing",
        icon: "🔍",
        desc: "After verification, processing takes 15–45 days. Track status on the IT portal.",
        items: [
            { label: "Login → e-File → Income Tax Returns → View Filed Returns", note: "Check status: Processed, Refund Issued, or Defective" },
            { label: "Refund goes directly to your bank account", note: "Make sure bank account in ITR is pre-validated" },
            { label: "Check email/SMS for any intimation u/s 143(1)", note: "This is the automated processing notice — read it carefully" },
        ],
        tip: "Typical refund period: 30–90 days after e-verification.",
    },
];

export default function FirstTimeFilePage() {
    const [done, setDone] = useState<Record<number, boolean>>({});

    const toggleDone = (step: number) => setDone(prev => ({ ...prev, [step]: !prev[step] }));
    const completedCount = Object.values(done).filter(Boolean).length;

    return (
        <div>
            <PageHeader
                title="First-Time ITR Filing Guide"
                subtitle="A step-by-step walkthrough for salaried employees filing income tax return for the first time"
                breadcrumbs={[{ label: "First Time Filer" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                {/* Banner */}
                <div className="bg-navy text-white rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-4">
                        <Smartphone className="w-8 h-8 text-teal shrink-0 mt-0.5" />
                        <div>
                            <h2 className="text-xl font-bold mb-1">Don&apos;t worry — it&apos;s simpler than it sounds</h2>
                            <p className="text-white/70">Filing your first ITR takes about 90 minutes. This guide walks you through every step in plain language — no tax knowledge required.</p>
                            <div className="mt-3 flex items-center gap-2 text-teal text-sm font-semibold">
                                <Clock className="w-4 h-4" />
                                Total estimated time: ~2 hours
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-8 bg-white border-2 border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-navy">Your Progress</h3>
                        <span className="text-sm text-gray-500">{completedCount} of {STEPS.length} steps done</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-teal h-2 rounded-full transition-all duration-500" style={{ width: `${(completedCount / STEPS.length) * 100}%` }} />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-5">
                    {STEPS.map(s => {
                        const isDone = done[s.step];
                        return (
                            <div key={s.step} className={`relative rounded-2xl border-2 overflow-hidden transition-colors ${isDone ? "border-teal/30 bg-teal/[0.02]" : "border-gray-100 bg-white"}`}>
                                <div className="p-5">
                                    <div className="flex items-start gap-4">
                                        <button onClick={() => toggleDone(s.step)} className="mt-0.5 shrink-0">
                                            <CheckCircle2 className={`w-6 h-6 transition-colors ${isDone ? "text-teal fill-teal" : "text-gray-200"}`} />
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="text-2xl">{s.icon}</span>
                                                <div>
                                                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Step {s.step}</span>
                                                    <h3 className={`font-bold text-lg ${isDone ? "line-through text-gray-400" : "text-navy"}`}>{s.title}</h3>
                                                </div>
                                                <span className="ml-auto flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border">
                                                    <Clock className="w-3 h-3" />{s.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
                                            <ul className="space-y-2">
                                                {s.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm">
                                                        <ChevronRight className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                                                        <span><strong className="text-navy">{item.label}</strong>{item.note && <span className="text-gray-400"> — {item.note}</span>}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {s.tip && (
                                                <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                                                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                                                    {s.tip}
                                                </div>
                                            )}
                                            {s.link && (
                                                <Link href={s.link.href} className="inline-flex items-center gap-1 mt-3 text-sm text-teal font-semibold hover:underline">
                                                    {s.link.label} <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-600">
                    <strong>Deadline:</strong> ITR for FY 2025-26 (AY 2026-27) must be filed by <strong>July 31, 2026</strong> for most non-audit individual taxpayers. Late filing (belated return) is generally possible until December 31, 2026 with a late fee of ₹1,000–₹5,000.
                </div>
            </div>
        </div>
    );
}
