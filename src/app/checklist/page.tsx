"use client";

import { useApp } from "@/contexts/AppContext";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ChecklistSection {
  title: string;
  icon: string;
  color: string;
  items: { id: string; label: string }[];
}

const CHECKLIST_SECTIONS: ChecklistSection[] = [
  {
    title: "Documents to Collect",
    icon: "📁",
    color: "border-teal/30 bg-teal/5",
    items: [
      { id: "doc-form16", label: "Form 16 from employer" },
      { id: "doc-26as", label: "Form 26AS / AIS from Income Tax portal" },
      { id: "doc-bank", label: "Bank statements (all accounts)" },
      { id: "doc-invest", label: "Investment proofs (PPF, ELSS, LIC, etc.)" },
      { id: "doc-rent", label: "Rent receipts and rental agreement" },
    ],
  },
  {
    title: "Income Details",
    icon: "💼",
    color: "border-blue-300/30 bg-blue-50",
    items: [
      { id: "inc-salary", label: "Salary income (from Form 16)" },
      { id: "inc-house", label: "House property / rental income" },
      { id: "inc-interest", label: "Interest income (FD, savings, bonds)" },
      { id: "inc-capital", label: "Capital gains (shares, mutual funds, property)" },
      { id: "inc-other", label: "Other income (freelance, gifts, dividends)" },
    ],
  },
  {
    title: "Deductions to Claim",
    icon: "💰",
    color: "border-emerald-300/30 bg-emerald-50",
    items: [
      { id: "ded-80c", label: "80C investments (EPF, PPF, ELSS, LIC, NSC)" },
      { id: "ded-80d", label: "80D health insurance premiums" },
      { id: "ded-hra", label: "HRA calculation (if renting)" },
      { id: "ded-homeloan", label: "Home loan interest (Section 24b)" },
      { id: "ded-nps", label: "NPS contribution (80CCD(1B))" },
    ],
  },
  {
    title: "Verification",
    icon: "🔍",
    color: "border-amber-300/30 bg-amber-50",
    items: [
      { id: "ver-26as", label: "Cross-check 26AS with Form 16" },
      { id: "ver-tds", label: "Verify TDS credits match across sources" },
      { id: "ver-ais", label: "Check AIS for unreported income or discrepancies" },
    ],
  },
  {
    title: "Filing",
    icon: "📤",
    color: "border-purple-300/30 bg-purple-50",
    items: [
      { id: "file-itr", label: "Choose the correct ITR form" },
      { id: "file-deadline", label: "File before July 31 deadline" },
      { id: "file-everify", label: "Verify & e-verify the return" },
      { id: "file-ack", label: "Save acknowledgment (ITR-V) for records" },
    ],
  },
];

const ALL_ITEMS = CHECKLIST_SECTIONS.flatMap((s) => s.items);

export default function Checklist() {
  const { toggleChecked, isChecked, resetChecklist } = useApp();

  const checkedCount = ALL_ITEMS.filter((item) => isChecked(item.id)).length;
  const totalCount = ALL_ITEMS.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  return (
    <div>
      <PageHeader
        title="Tax Prep Checklist"
        subtitle="Track all documents and steps needed before filing your income tax return"
        breadcrumbs={[{ label: "Checklist" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Progress</span>
                <span className="ml-2 text-lg font-bold text-navy">
                  {checkedCount}/{totalCount}
                </span>
              </div>
              <button
                onClick={resetChecklist}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors px-3 py-1 rounded-md hover:bg-red-50"
              >
                Reset All
              </button>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background:
                    progress === 100
                      ? "linear-gradient(90deg, #10b981, #059669)"
                      : "linear-gradient(90deg, #0d9488, #14b8a6)",
                }}
              />
            </div>
            {progress === 100 && (
              <p className="mt-3 text-sm text-emerald-600 font-medium">
                All done! You're ready to file your return.
              </p>
            )}
          </div>

          <div className="space-y-6">
            {CHECKLIST_SECTIONS.map((section) => {
              const sectionChecked = section.items.filter((item) =>
                isChecked(item.id)
              ).length;
              const allDone = sectionChecked === section.items.length;

              return (
                <div
                  key={section.title}
                  className={`rounded-xl border p-5 sm:p-6 transition-all ${section.color} ${allDone ? "opacity-75" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-navy flex items-center gap-2">
                      <span>{section.icon}</span>
                      {section.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                      {sectionChecked}/{section.items.length}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item) => {
                      const checked = isChecked(item.id);
                      return (
                        <li key={item.id}>
                          <label className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/50 transition-colors">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleChecked(item.id)}
                              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-teal focus:ring-teal accent-teal cursor-pointer flex-shrink-0"
                            />
                            <span
                              className={`text-sm sm:text-base transition-all ${checked ? "line-through text-gray-400" : "text-gray-700 group-hover:text-navy"}`}
                            >
                              {item.label}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
