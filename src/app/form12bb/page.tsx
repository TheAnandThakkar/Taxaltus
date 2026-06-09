"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle2, FileText } from "lucide-react";

interface Section {
    id: string;
    title: string;
    icon: string;
    when: string;
    fields: { label: string; example: string; tip: string }[];
    documents: string[];
    notes: string[];
}

const SECTIONS: Section[] = [
    {
        id: "hra",
        title: "House Rent Allowance (HRA)",
        icon: "🏠",
        when: "If you live in a rented house and your employer provides HRA",
        fields: [
            { label: "Name of Landlord", example: "Ramesh Kumar", tip: "Full name as on rent agreement" },
            { label: "Address of Rented House", example: "12, M.G. Road, Bengaluru - 560001", tip: "Complete address with PIN code" },
            { label: "Rent Paid per Month (₹)", example: "25,000", tip: "If rent exceeds ₹8,333/month (₹1L/year), PAN of landlord is mandatory" },
            { label: "PAN of Landlord", example: "ABCDE1234F", tip: "Mandatory if annual rent > ₹1,00,000. Attach copy." },
        ],
        documents: ["Rent receipts (monthly or quarterly)", "Rent agreement / lease deed", "Landlord's PAN copy (if rent > ₹1L/year)"],
        notes: [
            "Declare rent paying to parents is valid if they actually own the house",
            "Rent must be actually paid — verbal agreements not accepted by most companies",
            "Form 12BB declaration does not exempt you — it only guides TDS. Final exemption computed in ITR",
        ],
    },
    {
        id: "lta",
        title: "Leave Travel Allowance (LTA)",
        icon: "✈️",
        when: "If you have LTA in your CTC and travelled within India in the current FY",
        fields: [
            { label: "Leave availed from", example: "01/12/2024", tip: "Start date of actual travel leave" },
            { label: "Leave availed to", example: "07/12/2024", tip: "End date of actual travel leave" },
            { label: "Journey from", example: "Bengaluru", tip: "Origin city" },
            { label: "Journey to", example: "Shimla", tip: "Destination city" },
            { label: "Mode of Travel", example: "Air / Rail / Road", tip: "Economy air, or first-class rail qualifies" },
            { label: "Amount of LTA claimed (₹)", example: "32,000", tip: "Limited to actual travel cost by shortest route" },
        ],
        documents: ["Flight tickets / railway tickets", "Boarding passes", "Cab receipts if applicable"],
        notes: [
            "Only 2 journeys in a 4-year block (current block: 2026–2029) are exempt",
            "Only domestic travel qualifies — international trips not covered",
            "Exemption is for self + family members. Family = spouse, children (max 2 post-Oct 1998), dependent parents/siblings",
        ],
    },
    {
        id: "homeloan",
        title: "Home Loan Interest (Section 24b)",
        icon: "🏡",
        when: "If you have a home loan on a self-occupied or let-out property",
        fields: [
            { label: "Name of Lender", example: "HDFC Bank Ltd.", tip: "Bank or NBFC name" },
            { label: "Address of Lender", example: "HDFC Bank, MG Road, Bengaluru", tip: "Lending branch address" },
            { label: "PAN of Lender", example: "AAAAH0133E", tip: "PAN of the bank or institution (not loan account number)" },
            { label: "Interest Payable / Paid (₹)", example: "1,50,000", tip: "Get this from annual loan interest certificate provided by bank" },
        ],
        documents: ["Home loan interest certificate from bank", "Loan sanction letter (first time only)", "Property registration documents"],
        notes: [
            "Deduction limit: ₹2 lakh/year for self-occupied property (Section 24b). No limit for let-out (set off restricted to ₹2L)",
            "Principal repayment (not interest) goes under Section 80C",
            "Under-construction property: interest can be claimed in 5 equal instalments after possession",
        ],
    },
    {
        id: "investments",
        title: "Investments Under Chapter VI-A",
        icon: "💰",
        when: "For 80C, 80D, 80CCD, 80E and other Chapter VI-A deductions",
        fields: [
            { label: "Section & Nature of Investment", example: "80C - ELSS (SBI BlueChip Fund)", tip: "Mention section, investment type and provider name" },
            { label: "Amount (₹)", example: "1,50,000", tip: "Total declared amount for the section" },
        ],
        documents: [
            "ELSS / MF investment proof (account statement)",
            "Life insurance premium receipt",
            "PPF deposit receipt / passbook",
            "EPF passbook (auto-included by employer)",
            "NSC certificate",
            "Health insurance premium receipt (for 80D)",
            "NPS contribution proof (for 80CCD)",
            "Education loan interest certificate (for 80E)",
        ],
        notes: [
            "80C has an aggregate limit of ₹1.5 lakh/year. EPF, LIC, ELSS, PPF, NSC etc. all share this limit",
            "80D covers medical insurance premiums: ₹25K self+family, ₹50K senior citizen parents",
            "Only available under the OLD tax regime — most Chapter VI-A deductions not allowed under new regime",
        ],
    },
];

export default function Form12BBPage() {
    const [openSection, setOpenSection] = useState<string | null>("hra");
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div>
            <PageHeader
                title="Form 12BB Guide"
                subtitle="An interactive walkthrough for filling your Investment Declaration form for TDS"
                breadcrumbs={[{ label: "Form 12BB" }]}
            />
            <div className="container-main py-10 sm:py-14">
                <div className="mb-5">
                    <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>

                {/* What is 12BB */}
                <div className="bg-navy text-white rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-6 h-6 text-teal" />
                        <h2 className="text-xl font-bold">What is Form 12BB?</h2>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                        Form 12BB is a statement of tax-saving investments and other claims submitted by a salaried employee to their employer. Your employer uses it to calculate correct TDS. It covers HRA, LTA, home loan interest, and Chapter VI-A investments. It is <strong className="text-white">not filed with the Income Tax Department</strong> — only with your employer.
                    </p>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                        {["HRA", "LTA", "Home Loan", "80C / 80D"].map(item => (
                            <div key={item} className="bg-white/10 rounded-lg py-2 px-3 text-sm font-semibold">{item}</div>
                        ))}
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-4">
                    {SECTIONS.map(section => {
                        const isOpen = openSection === section.id;
                        return (
                            <div key={section.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => setOpenSection(isOpen ? null : section.id)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{section.icon}</span>
                                        <div>
                                            <h3 className="font-bold text-navy group-hover:text-teal transition-colors">{section.title}</h3>
                                            <p className="text-xs text-gray-400 mt-0.5">{section.when}</p>
                                        </div>
                                    </div>
                                    {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                                </button>

                                {isOpen && (
                                    <div className="border-t border-gray-100 px-5 pb-6">
                                        {/* Fields */}
                                        <h4 className="font-semibold text-sm text-gray-700 mt-5 mb-3 uppercase tracking-wider">Fields to Fill</h4>
                                        <div className="space-y-3">
                                            {section.fields.map((field, i) => (
                                                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                                    <p className="font-semibold text-navy text-sm">{field.label}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">Example: <strong className="text-gray-600">{field.example}</strong></p>
                                                    <p className="text-xs text-teal mt-1">💡 {field.tip}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Documents checklist */}
                                        <h4 className="font-semibold text-sm text-gray-700 mt-6 mb-3 uppercase tracking-wider">Documents Checklist</h4>
                                        <div className="space-y-2">
                                            {section.documents.map((doc, i) => {
                                                const key = `${section.id}-${i}`;
                                                return (
                                                    <label key={i} className="flex items-start gap-3 cursor-pointer group py-1">
                                                        <button onClick={() => toggle(key)} className="mt-0.5 flex-shrink-0">
                                                            <CheckCircle2 className={`w-5 h-5 transition-colors ${checked[key] ? "text-teal fill-teal" : "text-gray-300"}`} />
                                                        </button>
                                                        <span className={`text-sm transition-colors ${checked[key] ? "line-through text-gray-400" : "text-gray-700"}`}>{doc}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>

                                        {/* Notes */}
                                        <h4 className="font-semibold text-sm text-gray-700 mt-5 mb-3 uppercase tracking-wider">Important Notes</h4>
                                        <ul className="space-y-2">
                                            {section.notes.map((note, i) => (
                                                <li key={i} className="text-sm text-gray-600 flex gap-2">
                                                    <span className="text-amber-500 mt-0.5">⚠</span>
                                                    <span>{note}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-8 text-sm text-amber-800">
                    <strong>Remember:</strong> Your Form 12BB declaration is a provisional declaration. Your actual tax is calculated when you file your ITR. If you claim more than you are eligible for, you must pay the difference (with interest) when filing your return.
                </div>
            </div>
        </div>
    );
}
