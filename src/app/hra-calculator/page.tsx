"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Calculator, Info } from "lucide-react";

function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function HRACalculator() {
    const [basicSalary, setBasicSalary] = useState<string>("");
    const [da, setDa] = useState<string>("");
    const [hraReceived, setHraReceived] = useState<string>("");
    const [rentPaid, setRentPaid] = useState<string>("");
    const [isMetro, setIsMetro] = useState<boolean>(false);

    // Derived Values
    const basicValue = Number(basicSalary) || 0;
    const daValue = Number(da) || 0;
    const hraValue = Number(hraReceived) || 0;
    const rentValue = Number(rentPaid) || 0;
    const salaryForHRA = basicValue + daValue;

    // The 3 rules of HRA Exemption:
    // 1. Actual HRA Received
    const rule1 = hraValue;
    // 2. 50% of Basic+DA if Metro, else 40%
    const rule2 = salaryForHRA * (isMetro ? 0.5 : 0.4);
    // 3. Rent paid minus 10% of Basic+DA
    const rule3 = Math.max(0, rentValue - (salaryForHRA * 0.1));

    // Exemption is the minimum of the three
    const exemption = Math.max(0, Math.min(rule1, rule2, rule3));
    const taxableHra = Math.max(0, hraValue - exemption);

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title="HRA Exemption Calculator"
                subtitle="Calculate your tax-free House Rent Allowance under Section 10(13A)"
                breadcrumbs={[
                    { label: "Tools" },
                    { label: "HRA Calculator" },
                ]}
            />

            <div className="container-main py-8 sm:py-12">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Inputs Section */}
                    <div className="card p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                            <div className="bg-teal/10 p-2 rounded-lg">
                                <Calculator className="w-5 h-5 text-teal" />
                            </div>
                            <h2 className="text-xl font-bold text-navy">Annual Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Basic Salary (Annual) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-500 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={basicSalary}
                                        onChange={(e) => setBasicSalary(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none"
                                        placeholder="e.g. 600000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Dearness Allowance (Annual)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-500 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={da}
                                        onChange={(e) => setDa(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none"
                                        placeholder="Enter DA (if forms part of salary)"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    HRA Received (Annual) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-500 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={hraReceived}
                                        onChange={(e) => setHraReceived(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none"
                                        placeholder="e.g. 240000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Actual Rent Paid (Annual) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-gray-500 font-medium">₹</span>
                                    <input
                                        type="number"
                                        value={rentPaid}
                                        onChange={(e) => setRentPaid(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all outline-none"
                                        placeholder="e.g. 300000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City of Residence
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex-1 relative cursor-pointer group">
                                        <input
                                            type="radio"
                                            checked={isMetro}
                                            onChange={() => setIsMetro(true)}
                                            className="peer sr-only"
                                        />
                                        <div className="p-3 text-center rounded-xl border-2 transition-all peer-checked:border-teal peer-checked:bg-teal/5 border-gray-200 hover:border-teal/30">
                                            <p className="font-semibold text-gray-900">Metro City</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Delhi, Mumbai, Chennai, Kolkata</p>
                                        </div>
                                    </label>
                                    <label className="flex-1 relative cursor-pointer group">
                                        <input
                                            type="radio"
                                            checked={!isMetro}
                                            onChange={() => setIsMetro(false)}
                                            className="peer sr-only"
                                        />
                                        <div className="p-3 text-center rounded-xl border-2 transition-all peer-checked:border-teal peer-checked:bg-teal/5 border-gray-200 hover:border-teal/30">
                                            <p className="font-semibold text-gray-900">Non-Metro</p>
                                            <p className="text-xs text-gray-500 mt-0.5">All other cities</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        <div className="bg-navy rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal rounded-full opacity-10 blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold rounded-full opacity-10 blur-3xl" />

                            <h2 className="text-xl font-bold mb-8 relative z-10 text-white/90">HRA Calculation Summary</h2>

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <span className="text-white/70">Exempted HRA<br /><span className="text-xs">(Tax-Free)</span></span>
                                    <span className="text-3xl font-bold text-teal-300">{formatCurrency(exemption)}</span>
                                </div>

                                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                    <span className="text-white/70">Taxable HRA<br /><span className="text-xs">(Added to Salary)</span></span>
                                    <span className="text-xl font-bold text-gold">{formatCurrency(taxableHra)}</span>
                                </div>

                                <div className="pt-2">
                                    <p className="text-sm text-white/50 mb-3 flex items-center gap-1.5">
                                        <Info className="w-4 h-4" />
                                        How is this calculated?
                                    </p>
                                    <div className="bg-black/20 rounded-xl p-4 text-xs space-y-3">
                                        <p className="font-medium text-white/80 mb-2">Exemption is the minimum of:</p>
                                        <div className={`flex justify-between ${exemption === rule1 && rule1 > 0 ? "text-teal-300 font-bold" : "text-white/60"}`}>
                                            <span>1. Actual HRA Received:</span>
                                            <span>{formatCurrency(rule1)}</span>
                                        </div>
                                        <div className={`flex justify-between ${exemption === rule2 && rule2 > 0 ? "text-teal-300 font-bold" : "text-white/60"}`}>
                                            <span>2. {isMetro ? "50%" : "40%"} of Basic + DA:</span>
                                            <span>{formatCurrency(rule2)}</span>
                                        </div>
                                        <div className={`flex justify-between ${exemption === rule3 && rule3 > 0 ? "text-teal-300 font-bold" : "text-white/60"}`}>
                                            <span>3. Rent Paid - 10% of (Basic + DA):</span>
                                            <span>{formatCurrency(rule3)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 sm:p-5">
                            <h3 className="text-sm font-bold text-navy mb-2 flex items-center gap-2">
                                <Info className="w-4 h-4 text-gold" />
                                Important Note
                            </h3>
                            <p className="text-xs text-gray-700 leading-relaxed">
                                If you opt for the <strong>New Tax Regime</strong> (default since FY 2023-24), the HRA exemption is <strong>not available</strong>. This calculator is only relevant if you are filing your returns under the Old Tax Regime.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
