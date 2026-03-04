"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const SALARY_FLOW = [
  { label: "Gross Salary", desc: "Total salary before deductions" },
  { label: "Less: Exempt Allowances", desc: "HRA, LTA exemptions" },
  { label: "Income under head Salaries", desc: "After exemptions" },
  { label: "Less: Standard Deduction", desc: "\u20B950K (old) / \u20B975K (new)" },
  { label: "Gross Total Income", desc: "Sum of all heads" },
  { label: "Less: Chapter VI-A Deductions", desc: "80C, 80D, NPS, etc." },
  { label: "Taxable Income", desc: "Income on which tax is calculated" },
  { label: "Apply Slab Rates", desc: "As per chosen regime" },
  { label: "Add: Cess 4%", desc: "Health & Education Cess" },
  { label: "Tax Payable", desc: "Total tax liability" },
  { label: "Less: TDS Already Deducted", desc: "By employer monthly" },
  { label: "Tax Due / Refund", desc: "Pay balance or claim refund" },
];

const TDS_LIFECYCLE = [
  { step: 1, title: "Estimate Annual Tax", desc: "Employer estimates your total tax liability for the year" },
  { step: 2, title: "Divide Monthly", desc: "Divides the estimated tax into monthly deductions" },
  { step: 3, title: "Deduct TDS Monthly", desc: "Deducts TDS from your salary every month" },
  { step: 4, title: "Deposit Quarterly", desc: "Deposits collected TDS to the government quarterly" },
  { step: 5, title: "File TDS Returns", desc: "Files quarterly TDS returns with the IT department" },
  { step: 6, title: "Issue Form 16", desc: "Issues Form 16 certificate to you after year-end" },
];

const KEY_DATES = [
  { date: "Jun 15", label: "Advance Tax Q1 (15%)", fy: "FY 2024-25" },
  { date: "Jul 31", label: "ITR Filing Deadline", fy: "AY 2025-26" },
  { date: "Sep 15", label: "Advance Tax Q2 (45%)", fy: "FY 2024-25" },
  { date: "Oct 31", label: "Audit Cases ITR", fy: "AY 2025-26" },
  { date: "Dec 15", label: "Advance Tax Q3 (75%)", fy: "FY 2024-25" },
  { date: "Dec 31", label: "Belated/Revised Return", fy: "AY 2025-26" },
  { date: "Mar 15", label: "Advance Tax Q4 (100%)", fy: "FY 2024-25" },
  { date: "Mar 31", label: "Last Day for Tax-Saving Investments", fy: "FY 2024-25" },
];

const EXPLORE_CARDS = [
  { title: "Tax Quiz", desc: "Test your knowledge with 10 questions", path: "/quiz", icon: "\uD83C\uDFAF", color: "bg-teal/5 border-teal/20" },
  { title: "ITR Form Selector", desc: "Find the right ITR form for you", path: "/itr-selector", icon: "\uD83D\uDCDD", color: "bg-gold/10 border-gold/20" },
  { title: "Old vs New Regime", desc: "Compare tax regimes side by side", path: "/regime", icon: "\u2696\uFE0F", color: "bg-purple-50 border-purple-200" },
  { title: "Tax Prep Checklist", desc: "Track documents needed for filing", path: "/checklist", icon: "\u2705", color: "bg-emerald-50 border-emerald-200" },
  { title: "Budget 2024 Changes", desc: "What changed for salaried employees", path: "/budget-changes", icon: "\uD83D\uDCC8", color: "bg-sky-50 border-sky-200" },
  { title: "Investment Deadlines", desc: "Key dates and lock-in periods", path: "/investment-deadlines", icon: "\uD83D\uDCC5", color: "bg-orange-50 border-orange-200" },
];

export default function Learn() {
  return (
    <div>
      <PageHeader
        title="Learn"
        subtitle="Understand how salary taxation works in India — step by step"
      />

      <section className="py-10 sm:py-14">
        <div className="container-main">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
          <h2 className="section-title mb-2">Flow of Salary Taxation</h2>
          <p className="text-gray-500 mb-8">
            How your salary gets taxed, from CTC to final tax payable
          </p>
          <div className="relative">
            <div className="hidden sm:block absolute left-6 top-0 bottom-0 w-0.5 bg-teal/20" />
            <div className="space-y-4">
              {SALARY_FLOW.map((step, i) => (
                <div key={i} className="flex items-start gap-4 sm:gap-6">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-teal/10 text-teal font-bold text-sm flex items-center justify-center border border-teal/20">
                    {i + 1}
                  </div>
                  <div className="card p-4 sm:p-5 flex-1">
                    <h3 className="font-semibold text-navy">{step.label}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                  {i < SALARY_FLOW.length - 1 && (
                    <div className="sm:hidden absolute left-[1.45rem] mt-12 w-0.5 h-4 bg-teal/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-white border-y border-gray-100">
        <div className="container-main">
          <h2 className="section-title mb-2">TDS Lifecycle</h2>
          <p className="text-gray-500 mb-8">
            How TDS is deducted, deposited, and reported
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TDS_LIFECYCLE.map((item) => (
              <div key={item.step} className="card p-5 border-l-4 border-l-navy transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-navy/10 text-navy font-bold text-sm flex items-center justify-center">
                    {item.step}
                  </span>
                  <h3 className="font-semibold text-navy">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-teal/5">
        <div className="container-main">
          <h2 className="section-title mb-2">Understanding Capital Gains</h2>
          <p className="text-gray-600 mb-8">
            Quick overview of taxes on your investments (Stocks & Mutual Funds) post-Budget 2024.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 border-t-4 border-t-amber-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-navy text-xl">Short-Term (STCG)</h3>
                <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 font-bold rounded-full">Holding &lt; 1 Year</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">Applicable when you sell equity shares or equity-oriented mutual funds within 12 months of purchase.</p>

              <div className="bg-amber-50 rounded-xl p-4 flex justify-between items-center text-amber-900 border border-amber-100">
                <span className="font-medium">New Tax Rate</span>
                <span className="text-2xl font-black">20%</span>
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">*(Increased from 15%)</p>
            </div>

            <div className="card p-6 border-t-4 border-t-teal">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-navy text-xl">Long-Term (LTCG)</h3>
                <span className="bg-teal/10 text-teal-800 text-xs px-3 py-1 font-bold rounded-full">Holding &gt; 1 Year</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">Applicable when you sell equity shares or equity-oriented mutual funds after holding for more than 12 months.</p>

              <div className="bg-teal/5 rounded-xl p-4 flex justify-between items-center text-teal-900 border border-teal/10 mb-2">
                <span className="font-medium">New Tax Rate</span>
                <span className="text-2xl font-black">12.5%</span>
              </div>
              <div className="flex gap-2 items-center justify-center text-xs text-teal-700 bg-teal/10 px-3 py-1.5 rounded-lg w-fit mx-auto mt-3 border border-teal/20">
                <strong>Exemption Limit:</strong> ₹1.25 Lakhs / year
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-main">
          <h2 className="section-title mb-2 text-center">Key Tax Dates</h2>
          <p className="text-gray-500 mb-8 text-center">
            Important deadlines for FY 2024-25 (AY 2025-26)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {KEY_DATES.map((d, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-xl font-bold text-teal">{d.date}</div>
                <div className="text-sm text-gray-700 font-medium mt-1">
                  {d.label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{d.fy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-white border-y border-gray-100">
        <div className="container-main">
          <h2 className="section-title mb-2">Explore Tools & Guides</h2>
          <p className="text-gray-500 mb-8">
            Interactive tools to help you understand and plan your taxes
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXPLORE_CARDS.map((card) => (
              <Link
                key={card.path}
                href={card.path}
                className={`card-hover p-6 border ${card.color} group`}
              >
                <span className="text-3xl mb-3 block">{card.icon}</span>
                <h3 className="font-bold text-navy text-lg mb-1 group-hover:text-teal transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
