"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

type FAQItem = {
    question: string;
    answer: string | React.ReactNode;
    category: string;
};

const FAQS: FAQItem[] = [
    {
        category: "General",
        question: "Do I need to file an ITR if my income is below ₹2.5 Lakhs?",
        answer: "Generally, no. If your gross total income is below the basic exemption limit (₹2.5L for Old Regime / ₹3L for New Regime), filing is not mandatory. However, you MUST file if you have deposited over ₹1 crore in a current account, spent over ₹2 Lakhs on foreign travel, paid over ₹1 Lakh in electricity bills, or if you want to claim a TDS refund."
    },
    {
        category: "General",
        question: "What is the deadline for filing Income Tax Returns?",
        answer: "For individuals (salaried employees) whose accounts are not required to be audited, the deadline is generally July 31st of the Assessment Year (e.g., July 31, 2025, for FY 2024-25). Missing the deadline may result in a belated return with a penalty u/s 234F (up to ₹5,000)."
    },
    {
        category: "Regimes",
        question: "Can I switch between the New and Old Tax Regimes every year?",
        answer: "If you have salaried income (no business/professional income), you can choose between the regimes every single year when filing your ITR. However, if you have business/professional income, you get only one chance in your lifetime to switch back to the Old Regime once you have opted for the New Regime."
    },
    {
        category: "Regimes",
        question: "Does the New Tax Regime support Section 80C deductions?",
        answer: "No. The New Tax Regime removes about 70 exemptions and deductions, including Section 80C (PPF, ELSS, LIC), Section 80D (Health Insurance), and HRA. However, it recently retained the Standard Deduction of ₹50,000 (increased to ₹75,000 from FY 2024-25)."
    },
    {
        category: "Documents & Forms",
        question: "What is the difference between Form 16, Form 26AS, and AIS?",
        answer: (
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Form 16:</strong> A certificate from your employer confirming the TDS deducted from your salary.</li>
                <li><strong>Form 26AS:</strong> A consolidated annual tax statement showing all TDS deducted against your PAN by anyone (employers, banks, clients).</li>
                <li><strong>AIS (Annual Information Statement):</strong> A comprehensive view of all your financial transactions, including interests, dividends, mutual fund purchases, and GST data, regardless of whether tax was deducted.</li>
            </ul>
        )
    },
    {
        category: "Documents & Forms",
        question: "Which ITR Form should I submit?",
        answer: "If you earn income mainly from Salary, one House Property, and other sources (interest) up to ₹50 Lakhs, use ITR-1 (Sahaj). If you have capital gains (from stocks/MFs) or multiple house properties, you must use ITR-2."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const categories = Array.from(new Set(FAQS.map(f => f.category)));

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title="Frequently Asked Questions"
                subtitle="Clear answers to common Indian Income Tax queries"
                breadcrumbs={[{ label: "FAQ" }]}
            />

            <div className="container-main py-10 sm:py-14">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
                <div className="bg-navy rounded-2xl p-8 sm:p-12 text-white text-center mb-10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <MessageCircleQuestion className="w-12 h-12 text-teal-300 mb-4" />
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Got Tax Questions?</h2>
                        <p className="text-white/80 max-w-lg mx-auto">
                            Tax rules can be complex. We've compiled the most common questions from salaried employees about forms, regimes, and deadlines.
                        </p>
                    </div>
                </div>

                <div className="space-y-10">
                    {categories.map(category => (
                        <div key={category} className="space-y-4">
                            <h3 className="text-xl font-bold text-navy border-b border-gray-200 pb-2">{category}</h3>
                            <div className="space-y-3">
                                {FAQS.filter(f => f.category === category).map((faq, i) => {
                                    const globalIndex = FAQS.indexOf(faq);
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div
                                            key={globalIndex}
                                            className={`card transition-all duration-300 overflow-hidden ${isOpen ? 'ring-2 ring-teal/20 border-teal/30' : 'hover:border-gray-200'}`}
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                                            >
                                                <span className={`font-semibold pr-4 transition-colors ${isOpen ? 'text-teal-800' : 'text-navy'}`}>
                                                    {faq.question}
                                                </span>
                                                <ChevronDown
                                                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal' : 'text-gray-400'}`}
                                                />
                                            </button>

                                            <div
                                                className={`px-5 sm:px-6 text-sm text-gray-600 leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'pb-6 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0 pb-0'}`}
                                            >
                                                <div className="pt-2 border-t border-gray-100/50">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
