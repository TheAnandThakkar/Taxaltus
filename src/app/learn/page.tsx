"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import {
  EQUITY_STCG_RATE,
  EQUITY_LTCG_RATE,
  EQUITY_LTCG_EXEMPTION_LABEL,
} from "@/lib/capitalGains";

const SALARY_FLOW = [
  { label: "Gross Salary", desc: "Total salary before deductions" },
  { label: "Less: Exempt Allowances", desc: "HRA, LTA exemptions" },
  { label: "Income under head Salaries", desc: "After exemptions" },
  { label: "Less: Standard Deduction", desc: "₹50K (old) / ₹75K (new)" },
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

// Key dates derived from the current Indian financial year so the labels never
// go stale. FY runs Apr 1 -> Mar 31; before April we are still in the prior FY.
function getKeyDates() {
  const now = new Date();
  const fyStartYear = now.getMonth() <= 2 ? now.getFullYear() - 1 : now.getFullYear();
  const fyEndYear = fyStartYear + 1;
  const fyLabel = `FY ${fyStartYear}-${String(fyEndYear).slice(-2)}`;
  const ayLabel = `AY ${fyEndYear}-${String(fyEndYear + 1).slice(-2)}`;
  // The return being filed during this FY is for the previous FY.
  const filingAyLabel = `AY ${fyStartYear}-${String(fyStartYear + 1).slice(-2)}`;

  const dates = [
    { date: "Jun 15", label: "Advance Tax Q1 (15%)", period: fyLabel },
    { date: "Jul 31", label: "ITR Filing Deadline", period: filingAyLabel },
    { date: "Sep 15", label: "Advance Tax Q2 (45%)", period: fyLabel },
    { date: "Oct 31", label: "Audit Cases ITR", period: filingAyLabel },
    { date: "Dec 15", label: "Advance Tax Q3 (75%)", period: fyLabel },
    { date: "Dec 31", label: "Belated / Revised Return", period: filingAyLabel },
    { date: "Mar 15", label: "Advance Tax Q4 (100%)", period: fyLabel },
    { date: "Mar 31", label: "Tax-Saving Investments", period: fyLabel },
  ];
  return { dates, fyLabel, ayLabel };
}

const { dates: KEY_DATES, fyLabel: FY_LABEL, ayLabel: AY_LABEL } = getKeyDates();

const EXPLORE_CARDS = [
  { title: "Tax Quiz", desc: "Test your knowledge with 10 questions", path: "/quiz", icon: "🎯", color: "bg-teal/5 border-teal/20" },
  { title: "ITR Form Selector", desc: "Find the right ITR form for you", path: "/itr-selector", icon: "📝", color: "bg-gold/10 border-gold/20" },
  { title: "Old vs New Regime", desc: "Compare tax regimes side by side", path: "/regime", icon: "⚖️", color: "bg-purple-50 border-purple-200" },
  { title: "Tax Prep Checklist", desc: "Track documents needed for filing", path: "/checklist", icon: "✅", color: "bg-emerald-50 border-emerald-200" },
  { title: "Latest Budget Changes", desc: "What changed for salaried employees", path: "/budget-impact", icon: "📈", color: "bg-sky-50 border-sky-200" },
  { title: "Investment Deadlines", desc: "Key dates and lock-in periods", path: "/investment-deadlines", icon: "📅", color: "bg-orange-50 border-orange-200" },
];

const SECTION_NAV = [
  { id: "flow", label: "Salary Flow" },
  { id: "tds", label: "TDS Lifecycle" },
  { id: "capital-gains", label: "Capital Gains" },
  { id: "dates", label: "Key Dates" },
  { id: "tools", label: "Tools & Guides" },
];

// Shared, uniform numbered badge used across every step-based section.
function StepBadge({ n }: { n: number }) {
  return (
    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal/10 text-teal font-bold text-sm flex items-center justify-center border border-teal/20">
      {n}
    </div>
  );
}

// Uniform section heading: always left-aligned, same spacing and colours.
function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <h2 className="section-title mb-2">{title}</h2>
      <p className="text-gray-500 mb-8">{subtitle}</p>
    </>
  );
}

export default function Learn() {
  return (
    <div>
      <PageHeader
        title="Learn"
        subtitle="Understand how salary taxation works in India — step by step"
      />

      {/* Sticky section navigation */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="container-main flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800 whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <span className="w-px h-5 bg-gray-200 mx-1 shrink-0" />
          {SECTION_NAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium text-gray-500 hover:text-teal whitespace-nowrap px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Flow of salary taxation */}
      <section id="flow" className="py-10 sm:py-14 scroll-mt-32">
        <div className="container-main">
          <SectionHeading
            title="Flow of Salary Taxation"
            subtitle="How your salary gets taxed, from CTC to final tax payable"
          />
          <div className="relative">
            <div className="hidden sm:block absolute left-[1.375rem] top-0 bottom-0 w-0.5 bg-teal/20" />
            <div className="space-y-4">
              {SALARY_FLOW.map((step, i) => (
                <div key={i} className="flex items-start gap-4 sm:gap-6">
                  <div className="relative z-10">
                    <StepBadge n={i + 1} />
                  </div>
                  <div className="card p-5 flex-1">
                    <h3 className="font-semibold text-navy">{step.label}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TDS lifecycle */}
      <section id="tds" className="py-10 sm:py-14 bg-white border-y border-gray-100 scroll-mt-32">
        <div className="container-main">
          <SectionHeading
            title="TDS Lifecycle"
            subtitle="How TDS is deducted, deposited, and reported"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TDS_LIFECYCLE.map((item) => (
              <div key={item.step} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <StepBadge n={item.step} />
                  <h3 className="font-semibold text-navy">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capital gains */}
      <section id="capital-gains" className="py-10 sm:py-14 scroll-mt-32">
        <div className="container-main">
          <SectionHeading
            title="Understanding Capital Gains"
            subtitle="Quick overview of taxes on your equity investments (shares & mutual funds) after the latest Budget."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-navy text-xl">Short-Term (STCG)</h3>
                <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 font-bold rounded-full">Holding &lt; 1 Year</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Applicable when you sell equity shares or equity-oriented mutual funds within 12 months of purchase.</p>

              <div className="bg-amber-50 rounded-xl p-4 flex justify-between items-center text-amber-900 border border-amber-100">
                <span className="font-medium">Current Rate</span>
                <span className="text-2xl font-black">{EQUITY_STCG_RATE}%</span>
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">*(Increased from 15%)</p>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-navy text-xl">Long-Term (LTCG)</h3>
                <span className="bg-teal/10 text-teal-800 text-xs px-3 py-1 font-bold rounded-full">Holding &gt; 1 Year</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">Applicable when you sell equity shares or equity-oriented mutual funds after holding for more than 12 months.</p>

              <div className="bg-teal/5 rounded-xl p-4 flex justify-between items-center text-teal-900 border border-teal/10">
                <span className="font-medium">Current Rate</span>
                <span className="text-2xl font-black">{EQUITY_LTCG_RATE}%</span>
              </div>
              <div className="flex gap-2 items-center justify-center text-xs text-teal-700 bg-teal/10 px-3 py-1.5 rounded-lg w-fit mx-auto mt-3 border border-teal/20">
                <strong>Exemption Limit:</strong> {EQUITY_LTCG_EXEMPTION_LABEL} / year
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key dates */}
      <section id="dates" className="py-10 sm:py-14 bg-white border-y border-gray-100 scroll-mt-32">
        <div className="container-main">
          <SectionHeading
            title="Key Tax Dates"
            subtitle={`Important deadlines for ${FY_LABEL} (${AY_LABEL})`}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {KEY_DATES.map((d, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-xl font-bold text-teal">{d.date}</div>
                <div className="text-sm text-gray-700 font-medium mt-1">{d.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{d.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore tools & guides */}
      <section id="tools" className="py-10 sm:py-14 scroll-mt-32">
        <div className="container-main">
          <SectionHeading
            title="Explore Tools & Guides"
            subtitle="Interactive tools to help you understand and plan your taxes"
          />
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
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
