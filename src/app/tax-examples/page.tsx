import PageHeader from "@/components/ui/PageHeader";
import OfficialSources from "@/components/ui/OfficialSources";
import TrustBar from "@/components/ui/TrustBar";
import { calculateIncomeTax } from "@/lib/taxYears";

function fmt(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

const examples = [700000, 1275000, 1650000, 2500000];

export default function TaxExamplesPage() {
  const rows = examples.map((gross) => {
    const taxable = Math.max(0, gross - 75000);
    const result = calculateIncomeTax({
      assessmentYear: "AY_2027_28",
      regime: "new",
      taxableIncome: taxable,
    });
    return { gross, taxable, ...result };
  });

  return (
    <div>
      <PageHeader
        title="Tax Calculation Examples"
        subtitle="Transparent public test cases for common salary levels under the new regime."
        breadcrumbs={[{ label: "Tax Examples" }]}
      />
      <div className="container-main py-10 sm:py-14 space-y-6">
        <TrustBar appliesTo="FY 2026-27 / AY 2027-28" />
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white text-left">
                <tr>
                  <th className="px-4 py-3">Gross Salary</th>
                  <th className="px-4 py-3">Taxable after ₹75,000 SD</th>
                  <th className="px-4 py-3">Tax Before Rebate</th>
                  <th className="px-4 py-3">87A Rebate</th>
                  <th className="px-4 py-3">Cess</th>
                  <th className="px-4 py-3">Total Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.gross}>
                    <td className="px-4 py-3 font-semibold text-navy">{fmt(row.gross)}</td>
                    <td className="px-4 py-3">{fmt(row.taxable)}</td>
                    <td className="px-4 py-3">{fmt(row.rawTax)}</td>
                    <td className="px-4 py-3">{fmt(row.rebate)}</td>
                    <td className="px-4 py-3">{fmt(row.cess)}</td>
                    <td className="px-4 py-3 font-bold text-teal">{fmt(row.totalTax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          These examples assume a resident salaried individual using the new tax regime with salary income only and no special-rate income, surcharge or other adjustments.
        </div>
        <OfficialSources />
      </div>
    </div>
  );
}
