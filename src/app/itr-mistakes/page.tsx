"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const MISTAKES = [
    {
        n: 1,
        icon: "❌",
        title: "Choosing the wrong ITR form",
        who: "Extremely common among first-time filers",
        mistake: "Filing ITR-1 (Sahaj) despite having capital gains from selling shares or mutual funds.",
        consequence: "The return is treated as 'Defective' by the IT dept and you get a notice asking you to re-file.",
        fix: "Use ITR-2 if you have any capital gains, more than one house property, or income above ₹50 lakh. When in doubt, use our ITR Form Selector.",
        link: { label: "ITR Form Selector →", href: "/itr-selector" }
    },
    {
        n: 2,
        icon: "💼",
        title: "Not declaring all income sources",
        who: "Very common — especially FD interest, savings interest, rental income",
        mistake: "Only declaring salary and ignoring bank FD interest, savings account interest (above ₹10K), or freelance income from second jobs.",
        consequence: "The IT dept sees all of this in AIS/Form 26AS. Mismatch can trigger an automated notice u/s 143(2).",
        fix: "Download your AIS from the IT portal before filing. Every income source your bank or broker reported is visible to the government.",
        link: { label: "Understand AIS →", href: "/ais-explainer" }
    },
    {
        n: 3,
        icon: "📅",
        title: "Confusing Financial Year (FY) and Assessment Year (AY)",
        who: "Almost universal among first-time filers",
        mistake: "Selecting the wrong Assessment Year when filing, leading to income being reported in wrong year.",
        consequence: "Mismatches, refund delays, and difficulty amending the return later.",
        fix: "Rule of thumb: AY = FY + 1. For income earned Apr 2025–Mar 2026 (FY 2025-26), select AY 2026-27 on the portal.",
    },
    {
        n: 4,
        icon: "🏠",
        title: "Missing HRA exemption when paying rent",
        who: "Very common — especially for employees who didn't submit Form 12BB on time",
        mistake: "Not claiming HRA exemption because rent receipts weren't submitted to employer during the year.",
        consequence: "Paying more tax than necessary — HRA exemption can be worth ₹50,000–₹2,00,000+ per year.",
        fix: "You can still claim HRA exemption directly in your ITR even if the employer didn't give it. Keep rent receipts and landlord's PAN (if rent > ₹1L/year).",
        link: { label: "HRA Calculator →", href: "/hra-calculator" }
    },
    {
        n: 5,
        icon: "🏦",
        title: "Entering wrong bank account for refund",
        who: "Very common",
        mistake: "Entering a bank account that isn't pre-validated on the IT portal, or entering incorrect IFSC/account number.",
        consequence: "Refund gets rejected and re-credited to government account. Recovery process takes 3–6 months.",
        fix: "Always pre-validate your bank account on the IT portal under 'Profile → My Bank Account' before filing.",
    },
    {
        n: 6,
        icon: "✅",
        title: "Filing but not verifying the return",
        who: "Surprisingly common",
        mistake: "Submitting the ITR form online but not completing e-verification via Aadhaar OTP or net banking.",
        consequence: "An unverified return is treated as if NOT filed. You get late filing penalties even though you thought you filed.",
        fix: "Always e-verify immediately after submission using Aadhaar OTP — it takes less than 2 minutes.",
    },
    {
        n: 7,
        icon: "📉",
        title: "Not reporting capital losses",
        who: "Most investors who made losses in stocks or MFs",
        mistake: "Not filing ITR because you made losses (or think losses aren't required to be reported).",
        consequence: "You lose the ability to carry forward losses to offset future gains. Capital losses can be carried forward for 8 years — but only if you filed the ITR.",
        fix: "Always file ITR even in a loss year if you have capital transactions. Report the loss — you'll benefit from it in future years.",
        link: { label: "Capital Gains Calculator →", href: "/capital-gains" }
    },
    {
        n: 8,
        icon: "📋",
        title: "Ignoring Form 26AS / AIS mismatch",
        who: "Common — especially if you changed jobs mid-year",
        mistake: "Filing your ITR based only on Form 16 without cross-checking with Form 26AS. If TDS is shown under wrong PAN, it won't be credited.",
        consequence: "Tax demand notice and possible interest/penalty for unpaid taxes.",
        fix: "Always match your Form 16 Part A TDS against Form 26AS before filing. Discrepancies must be resolved with your employer.",
        link: { label: "AIS Explainer →", href: "/ais-explainer" }
    },
];

export default function ITRMistakesPage() {
    return (
        <div>
            <PageHeader
                title="8 Common ITR Filing Mistakes"
                subtitle="Mistakes salaried employees make every year — and exactly how to avoid them"
                breadcrumbs={[{ label: "ITR Mistakes" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />Back to Home
                    </Link>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3 text-sm text-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    These are mistakes that result in IT notices, delayed refunds, or paying more tax than you owe. Read before you file!
                </div>

                <div className="space-y-6">
                    {MISTAKES.map(m => (
                        <div key={m.n} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start p-6 gap-5">
                                <div className="text-4xl shrink-0">{m.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-0.5 rounded-full">Mistake #{m.n}</span>
                                        <span className="text-xs text-gray-400">{m.who}</span>
                                    </div>
                                    <h3 className="font-bold text-navy text-lg mb-3">{m.title}</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                        <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                                            <p className="text-xs font-bold text-red-500 mb-1 uppercase tracking-wide">❌ The Mistake</p>
                                            <p className="text-red-700 leading-relaxed">{m.mistake}</p>
                                        </div>
                                        <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                                            <p className="text-xs font-bold text-orange-500 mb-1 uppercase tracking-wide">⚡ Consequence</p>
                                            <p className="text-orange-700 leading-relaxed">{m.consequence}</p>
                                        </div>
                                        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                                            <p className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wide">✅ The Fix</p>
                                            <p className="text-emerald-700 leading-relaxed">{m.fix}</p>
                                        </div>
                                    </div>

                                    {m.link && (
                                        <Link href={m.link.href}
                                            className="inline-flex items-center gap-1 mt-3 text-sm text-teal font-semibold hover:underline">
                                            {m.link.label}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 bg-teal/5 border border-teal/20 rounded-2xl p-6 text-center">
                    <CheckCircle2 className="w-8 h-8 text-teal mx-auto mb-3" />
                    <h3 className="font-bold text-navy text-lg mb-2">Ready to file correctly?</h3>
                    <p className="text-gray-500 text-sm mb-4">Use our First-Time Filer Guide for a step-by-step walkthrough.</p>
                    <Link href="/first-time-filer"
                        className="inline-block bg-navy text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy/90 transition-colors text-sm">
                        View First-Time Filer Guide →
                    </Link>
                </div>
            </div>
        </div>
    );
}
