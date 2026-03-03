import PageHeader from "@/components/ui/PageHeader";

interface BudgetChange {
  title: string;
  description: string;
  before?: string;
  after?: string;
  impact: "Beneficial" | "Higher Tax" | "Neutral";
}

const changes: BudgetChange[] = [
  {
    title: "Standard Deduction Increased (New Regime)",
    description:
      "The standard deduction for salaried individuals and pensioners under the new tax regime has been increased, reducing taxable income further.",
    before: "₹50,000",
    after: "₹75,000",
    impact: "Beneficial",
  },
  {
    title: "Revised Tax Slabs Under New Regime",
    description:
      "The tax slabs under the new regime have been restructured. The 5% slab now covers income up to ₹7 lakh (from ₹6 lakh). The 10% slab applies to ₹7–10 lakh, 15% to ₹10–12 lakh, 20% to ₹12–15 lakh, and 30% above ₹15 lakh.",
    impact: "Beneficial",
  },
  {
    title: "Family Pension Deduction Increased",
    description:
      "The deduction allowed on family pension income under section 57(iia) has been enhanced under the new tax regime.",
    before: "₹15,000",
    after: "₹25,000",
    impact: "Beneficial",
  },
  {
    title: "LTCG Tax Rate Increased",
    description:
      "Long-Term Capital Gains (LTCG) on all asset classes are now taxed at a higher rate. The exemption limit remains at ₹1.25 lakh for listed equity and equity mutual funds.",
    before: "10%",
    after: "12.5%",
    impact: "Higher Tax",
  },
  {
    title: "STCG on Equity Increased",
    description:
      "Short-Term Capital Gains (STCG) on equity shares and equity-oriented mutual funds has been raised.",
    before: "15%",
    after: "20%",
    impact: "Higher Tax",
  },
  {
    title: "STT on F&O Increased",
    description:
      "Securities Transaction Tax on Futures & Options has been increased to discourage speculative trading in the derivatives market.",
    impact: "Higher Tax",
  },
  {
    title: "NPS Employer Contribution – Central Govt",
    description:
      "The employer contribution limit for NPS for central government employees has been increased from 10% to 14% of salary, making it a more attractive retirement savings option.",
    before: "10% of salary",
    after: "14% of salary",
    impact: "Beneficial",
  },
  {
    title: "Angel Tax Abolished",
    description:
      "The angel tax (Section 56(2)(viib)) on startups receiving funding above fair market value has been completely abolished, boosting the startup ecosystem.",
    impact: "Beneficial",
  },
  {
    title: "Buyback of Shares – Taxed in Shareholder Hands",
    description:
      "Income from buyback of shares will now be taxed in the hands of the shareholder as dividend income, instead of being taxed at the company level. This shifts the tax burden to the investor.",
    impact: "Higher Tax",
  },
];

function ImpactBadge({ impact }: { impact: BudgetChange["impact"] }) {
  const styles = {
    Beneficial: "bg-green-50 text-green-700 border-green-200",
    "Higher Tax": "bg-red-50 text-red-600 border-red-200",
    Neutral: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[impact]}`}
    >
      {impact === "Beneficial" && (
        <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {impact === "Higher Tax" && (
        <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      )}
      {impact}
    </span>
  );
}

export default function BudgetChanges() {
  const beneficial = changes.filter((c) => c.impact === "Beneficial").length;
  const higherTax = changes.filter((c) => c.impact === "Higher Tax").length;

  return (
    <div>
      <PageHeader
        title="Budget 2024-25 Changes"
        subtitle="Key income tax changes from the Union Budget for FY 2024-25 that impact individual taxpayers."
        breadcrumbs={[{ label: "Budget Changes" }]}
      />

      <div className="container-main py-10 sm:py-14">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-green-600 font-medium">Beneficial</p>
              <p className="text-lg font-bold text-green-700">{beneficial} changes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-red-600 font-medium">Higher Tax</p>
              <p className="text-lg font-bold text-red-700">{higherTax} changes</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {changes.map((change, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-bold text-navy leading-snug">{change.title}</h3>
                <ImpactBadge impact={change.impact} />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{change.description}</p>

              {(change.before || change.after) && (
                <div className="mt-4 flex items-center gap-3">
                  {change.before && (
                    <div className="flex-1 bg-red-50 rounded-lg p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wide text-red-400 font-semibold mb-1">
                        Before
                      </p>
                      <p className="text-sm font-bold text-red-600">{change.before}</p>
                    </div>
                  )}
                  <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {change.after && (
                    <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wide text-green-500 font-semibold mb-1">
                        After
                      </p>
                      <p className="text-sm font-bold text-green-700">{change.after}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
