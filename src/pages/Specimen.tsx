import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

function TableRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-3 px-4 py-2.5 border-b border-gray-100">
      <span className={`text-xs sm:text-sm flex-[1.5] leading-relaxed ${bold ? "font-bold text-navy" : "text-gray-700"}`}>
        {label}
      </span>
      <span className={`text-xs sm:text-sm flex-1 text-right ${bold ? "font-bold text-navy" : "text-gray-600 font-medium"}`}>
        {value}
      </span>
    </div>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 bg-navy/5 border-y border-gray-100">
      <p className="text-xs font-bold text-navy uppercase tracking-wide">{text}</p>
    </div>
  );
}

export default function Specimen() {
  const [activePart, setActivePart] = useState<"A" | "B">("A");

  return (
    <div>
      <PageHeader
        title="Form 16 Specimen"
        subtitle="A complete specimen Form 16 with illustrative data"
        breadcrumbs={[
          { label: "Form 16 Explorer", path: "/form16" },
          { label: "Specimen" },
        ]}
      />

      <div className="container-main py-8 sm:py-12">
        <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-start gap-3 mb-8">
          <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-700 leading-relaxed">
            This is a specimen with illustrative data. Your actual Form 16 will have your real details from your employer.
          </p>
        </div>

        <div className="flex gap-1 p-1 bg-navy/10 rounded-xl mb-8 max-w-md">
          <button
            onClick={() => setActivePart("A")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activePart === "A"
                ? "bg-teal text-white"
                : "text-navy/60 hover:text-navy"
            }`}
          >
            Part A
          </button>
          <button
            onClick={() => setActivePart("B")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activePart === "B"
                ? "bg-teal text-white"
                : "text-navy/60 hover:text-navy"
            }`}
          >
            Part B (Annexure)
          </button>
        </div>

        <div className="card overflow-hidden max-w-3xl">
          {activePart === "A" && (
            <>
              <div className="text-center py-6 px-4">
                <h2 className="text-xl font-bold text-navy tracking-widest">FORM NO. 16</h2>
                <p className="text-xs text-gray-500 mt-1">[See rule 31(1)(a)]</p>
                <p className="text-xs text-gray-500 mt-1">
                  Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary
                </p>
                <span className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-teal/10 text-teal text-xs font-bold tracking-wider">
                  PART A
                </span>
              </div>

              <SectionHeading text="Certificate No. & Assessment Year" />
              <TableRow label="Certificate No." value="ABCDE1234F/2025/001" />
              <TableRow label="Last updated on" value="15-Jun-2025" />
              <TableRow label="Assessment Year" value="2025-26" />

              <SectionHeading text="Employer Details" />
              <TableRow label="Name of Deductor (Employer)" value="XYZ Technologies Pvt. Ltd." />
              <TableRow label="TAN of Deductor" value="DELX12345E" />
              <TableRow label="PAN of Deductor" value="AABCX1234F" />
              <TableRow label="Address" value="123, Tech Park, Sector 62, Noida, UP - 201301" />
              <TableRow label="City" value="Noida" />
              <TableRow label="State" value="Uttar Pradesh" />
              <TableRow label="Pin Code" value="201301" />
              <TableRow label="Email" value="payroll@xyztech.com" />

              <SectionHeading text="Employee Details" />
              <TableRow label="PAN of Employee" value="ABCDE1234F" />
              <TableRow label="Name of Employee" value="RAJESH KUMAR" />
              <TableRow label="Address" value="A-45, Green Valley Apartments, Sector 50, Noida" />
              <TableRow label="City" value="Noida" />
              <TableRow label="State" value="Uttar Pradesh" />
              <TableRow label="Pin Code" value="201301" />
              <TableRow label="Email" value="rajesh.kumar@email.com" />

              <SectionHeading text="Period of Employment" />
              <TableRow label="Period with this employer" value="01-Apr-2024 to 31-Mar-2025" />

              <SectionHeading text="Summary of Tax Deducted at Source" />
              <div className="grid grid-cols-3 text-center px-4 py-2 bg-navy/5 border-b border-gray-100">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">Quarter</span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">Receipt No.</span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">TDS (₹)</span>
              </div>
              {[
                { q: "Q1 (Apr-Jun)", receipt: "2024Q1A12345", amount: "45,000" },
                { q: "Q2 (Jul-Sep)", receipt: "2024Q2A12346", amount: "45,000" },
                { q: "Q3 (Oct-Dec)", receipt: "2024Q3A12347", amount: "45,000" },
                { q: "Q4 (Jan-Mar)", receipt: "2024Q4A12348", amount: "45,000" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 text-center px-4 py-2 border-b border-gray-50">
                  <span className="text-xs text-gray-700">{row.q}</span>
                  <span className="text-xs text-gray-700">{row.receipt}</span>
                  <span className="text-xs text-gray-700">{row.amount}</span>
                </div>
              ))}
              <TableRow label="Total Tax Deducted" value="₹1,80,000" bold />

              <SectionHeading text="Summary of Tax Deposited (Challan Details)" />
              <div className="grid grid-cols-4 text-center px-4 py-2 bg-navy/5 border-b border-gray-100">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">BSR Code</span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">Challan No.</span>
                <span className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount (₹)</span>
              </div>
              {[
                { bsr: "0510213", date: "07-Jul-24", challan: "10245", amount: "45,000" },
                { bsr: "0510213", date: "07-Oct-24", challan: "20387", amount: "45,000" },
                { bsr: "0510213", date: "07-Jan-25", challan: "30512", amount: "45,000" },
                { bsr: "0510213", date: "07-Apr-25", challan: "40698", amount: "45,000" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 text-center px-4 py-2 border-b border-gray-50">
                  <span className="text-[10px] sm:text-xs text-gray-700">{row.bsr}</span>
                  <span className="text-[10px] sm:text-xs text-gray-700">{row.date}</span>
                  <span className="text-[10px] sm:text-xs text-gray-700">{row.challan}</span>
                  <span className="text-[10px] sm:text-xs text-gray-700">{row.amount}</span>
                </div>
              ))}
              <TableRow label="Total Tax Deposited" value="₹1,80,000" bold />

              <SectionHeading text="Verification" />
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 italic leading-relaxed">
                  I, Suresh Mehta, son of Ramesh Mehta, working in the capacity of Finance Manager, do hereby certify that a sum of ₹1,80,000 has been deducted and deposited to the credit of the Central Government.
                </p>
              </div>
              <TableRow label="Place" value="Noida" />
              <TableRow label="Date" value="15-Jun-2025" />
              <TableRow label="Designation" value="Finance Manager" />
            </>
          )}

          {activePart === "B" && (
            <>
              <div className="text-center py-6 px-4">
                <h2 className="text-xl font-bold text-navy tracking-widest">FORM NO. 16</h2>
                <p className="text-xs text-gray-500 mt-1">Part B (Annexure)</p>
                <p className="text-xs text-gray-500 mt-1">
                  Details of Salary paid and any other income and tax deducted
                </p>
                <span className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-bold tracking-wider">
                  PART B
                </span>
              </div>

              <TableRow label="Name of Employee" value="RAJESH KUMAR" />
              <TableRow label="PAN of Employee" value="ABCDE1234F" />
              <TableRow label="Assessment Year" value="2025-26" />
              <TableRow label="Whether opting for taxation u/s 115BAC?" value="No (Old Regime)" />

              <SectionHeading text="1. Gross Salary" />
              <TableRow label="(a) Salary as per section 17(1)" value="₹14,40,000" />
              <TableRow label="(b) Value of perquisites u/s 17(2)" value="₹0" />
              <TableRow label="(c) Profits in lieu of salary u/s 17(3)" value="₹0" />
              <TableRow label="(d) Total Gross Salary (a+b+c)" value="₹14,40,000" bold />

              <SectionHeading text="2. Exemptions under Section 10" />
              <TableRow label="(a) HRA Exemption u/s 10(13A)" value="₹1,44,000" />
              <TableRow label="(b) Leave Travel Allowance u/s 10(5)" value="₹0" />
              <TableRow label="(c) Other exemptions" value="₹0" />
              <TableRow label="(d) Total Exemptions" value="₹1,44,000" bold />

              <SectionHeading text="3. Income Chargeable under head 'Salaries' (1d - 2d)" />
              <TableRow label="Total" value="₹12,96,000" bold />

              <SectionHeading text="4. Deductions under Section 16" />
              <TableRow label="(a) Standard Deduction u/s 16(ia)" value="₹50,000" />
              <TableRow label="(b) Entertainment Allowance u/s 16(ii)" value="₹0" />
              <TableRow label="(c) Professional Tax u/s 16(iii)" value="₹2,400" />
              <TableRow label="Total Deductions u/s 16" value="₹52,400" bold />

              <SectionHeading text="5. Income Chargeable under head 'Salaries' (3 - 4)" />
              <TableRow label="Total" value="₹12,43,600" bold />

              <SectionHeading text="6. Add: Any other income reported by employee" />
              <TableRow label="(a) Income from House Property" value="₹0" />
              <TableRow label="(b) Income from Other Sources" value="₹35,000" />

              <SectionHeading text="7. Gross Total Income (5 + 6)" />
              <TableRow label="Total" value="₹12,78,600" bold />

              <SectionHeading text="8. Deductions under Chapter VI-A" />
              <TableRow label="(a) Section 80C (PPF, ELSS, LIC, EPF)" value="₹1,50,000" />
              <TableRow label="(b) Section 80CCD(1B) — NPS" value="₹50,000" />
              <TableRow label="(c) Section 80D — Health Insurance" value="₹25,000" />
              <TableRow label="(d) Section 80TTA — Savings Interest" value="₹10,000" />
              <TableRow label="(e) Other deductions" value="₹0" />
              <TableRow label="Total Deductions under Chapter VI-A" value="₹2,35,000" bold />

              <SectionHeading text="9. Total Taxable Income (7 - 8)" />
              <TableRow label="Total" value="₹10,43,600" bold />

              <SectionHeading text="10. Tax on Total Income" />
              <TableRow label="Tax as per slab rates" value="₹1,21,220" />
              <TableRow label="Rebate u/s 87A" value="₹0" />
              <TableRow label="Surcharge" value="₹0" />
              <TableRow label="Health & Education Cess (4%)" value="₹4,849" />
              <TableRow label="Total Tax Payable" value="₹1,26,069" bold />

              <SectionHeading text="11. Relief under Section 89" />
              <TableRow label="Amount" value="₹0" />

              <SectionHeading text="12. Net Tax Payable (10 - 11)" />
              <TableRow label="Total" value="₹1,26,069" bold />

              <SectionHeading text="13. TDS Details" />
              <TableRow label="Tax already deducted (TDS)" value="₹1,80,000" />
              <TableRow label="Tax payable / Refundable" value="₹53,931 (Refund)" bold />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
