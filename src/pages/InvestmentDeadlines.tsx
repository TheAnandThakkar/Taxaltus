import PageHeader from "@/components/ui/PageHeader";

interface Deadline {
  date: string;
  month: number;
  title: string;
  description: string;
  category: "advance-tax" | "investment" | "filing";
}

const DEADLINES: Deadline[] = [
  { date: "June 15", month: 6, title: "Advance Tax — 1st Installment", description: "Pay 15% of estimated annual tax liability", category: "advance-tax" },
  { date: "July 31", month: 7, title: "ITR Filing Deadline", description: "Last date to file income tax return without penalty", category: "filing" },
  { date: "September 15", month: 9, title: "Advance Tax — 2nd Installment", description: "Cumulative 45% of estimated annual tax liability", category: "advance-tax" },
  { date: "December 15", month: 12, title: "Advance Tax — 3rd Installment", description: "Cumulative 75% of estimated annual tax liability", category: "advance-tax" },
  { date: "December 31", month: 12, title: "Belated / Revised Return", description: "Last date to file belated or revised return for the AY", category: "filing" },
  { date: "March 15", month: 3, title: "Advance Tax — 4th Installment", description: "100% of estimated annual tax liability", category: "advance-tax" },
  { date: "March 31", month: 3, title: "Investment Cutoff", description: "Last date for 80C, 80D, NPS investments for the financial year", category: "investment" },
];

const LOCK_IN_PERIODS = [
  { instrument: "ELSS (Equity Linked Savings Scheme)", lockIn: "3 years", section: "80C" },
  { instrument: "PPF (Public Provident Fund)", lockIn: "15 years", section: "80C" },
  { instrument: "Tax-Saving Fixed Deposit", lockIn: "5 years", section: "80C" },
  { instrument: "NPS (National Pension System)", lockIn: "Till age 60", section: "80CCD" },
  { instrument: "NSC (National Savings Certificate)", lockIn: "5 years", section: "80C" },
  { instrument: "SCSS (Senior Citizens Savings Scheme)", lockIn: "5 years", section: "80C" },
];

const CATEGORY_STYLES: Record<string, { bg: string; border: string; dot: string; label: string }> = {
  "advance-tax": { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", label: "Advance Tax" },
  investment: { bg: "bg-teal/5", border: "border-teal/20", dot: "bg-teal", label: "Investment" },
  filing: { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500", label: "Filing" },
};

export default function InvestmentDeadlines() {
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div>
      <PageHeader
        title="Investment Deadlines"
        subtitle="Key dates and lock-in periods for tax-saving investments"
        breadcrumbs={[{ label: "Investment Deadlines" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-8">
            {Object.entries(CATEGORY_STYLES).map(([key, style]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className={`w-3 h-3 rounded-full ${style.dot}`} />
                <span className="text-gray-600">{style.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-14">
            {DEADLINES.map((d, i) => {
              const style = CATEGORY_STYLES[d.category];
              const isCurrent = d.month === currentMonth;

              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-4 sm:gap-6 rounded-xl border p-4 sm:p-5 transition-all ${style.bg} ${style.border} ${isCurrent ? "ring-2 ring-teal shadow-md" : ""}`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2.5 right-4 text-xs font-semibold bg-teal text-white px-2.5 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                  <div className="flex flex-col items-center flex-shrink-0 w-16">
                    <span className={`w-3 h-3 rounded-full ${style.dot}`} />
                    <div className="w-px h-full bg-gray-200 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-navy">{d.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{d.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{d.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy mb-6">Lock-in Periods</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="px-4 sm:px-6 py-3 text-sm font-semibold">Instrument</th>
                    <th className="px-4 sm:px-6 py-3 text-sm font-semibold">Lock-in Period</th>
                    <th className="px-4 sm:px-6 py-3 text-sm font-semibold">Section</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {LOCK_IN_PERIODS.map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 text-sm text-gray-800 font-medium">{item.instrument}</td>
                      <td className="px-4 sm:px-6 py-3 text-sm text-gray-600">{item.lockIn}</td>
                      <td className="px-4 sm:px-6 py-3">
                        <span className="inline-block text-xs font-semibold bg-teal/10 text-teal px-2.5 py-1 rounded-full">
                          {item.section}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
