"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function Specimen() {
  const [activePart, setActivePart] = useState<"A" | "B">("A");

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Form 16 Specimen"
        subtitle="An authentic replica of the official Income Tax Department Form 16"
        breadcrumbs={[
          { label: "Form 16 Explorer", path: "/form16" },
          { label: "Specimen" },
        ]}
      />

      <div className="container-main py-8">
        <div className="mb-6 max-w-4xl mx-auto flex flex-wrap gap-4 justify-between items-center">
          <Link href="/form16" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Form 16 Explorer
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white font-medium px-5 py-2 rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print Form / Save PDF
          </button>
        </div>

        <div className="flex gap-2 mb-0 max-w-sm mx-auto justify-center translate-y-[1px] relative z-10">
          <button
            onClick={() => setActivePart("A")}
            className={`px-6 py-2 rounded-t-lg font-bold border-t border-x transition-colors ${activePart === "A"
              ? "bg-white border-gray-300 text-teal-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
              : "bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200"
              }`}
          >
            PART A
          </button>
          <button
            onClick={() => setActivePart("B")}
            className={`px-6 py-2 rounded-t-lg font-bold border-t border-x transition-colors ${activePart === "B"
              ? "bg-white border-gray-300 text-teal-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
              : "bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200"
              }`}
          >
            PART B
          </button>
        </div>

        {/* The Paper Sheet */}
        <div className="max-w-4xl mx-auto bg-white shadow-2xl printable-area font-serif text-[11px] sm:text-[13px] leading-tight text-black p-4 sm:p-8 border border-gray-300">

          <style dangerouslySetInnerHTML={{
            __html: `
            .tax-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1rem;
            }
            .tax-table th, .tax-table td {
              border: 1px solid #000;
              padding: 4px 6px;
              vertical-align: top;
            }
            .tax-table th {
              font-weight: bold;
              text-align: left;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .font-bold { font-weight: bold; }
          `}} />

          {activePart === "A" && (
            <div className="part-a">
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold mb-1">FORM NO. 16</h1>
                <p className="text-sm">[See rule 31(1)(a)]</p>
                <h2 className="text-base font-bold mt-2 uppercase tracking-wide">Part A</h2>
                <p className="mt-2 font-bold max-w-2xl mx-auto">
                  Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary
                </p>
              </div>

              <table className="tax-table">
                <tbody>
                  <tr>
                    <td colSpan={2} className="w-1/2">
                      <div className="font-bold mb-1">Certificate No.</div>
                      <div>ABCDE1234F/2025/001</div>
                    </td>
                    <td colSpan={2} className="w-1/2">
                      <div className="font-bold mb-1">Last updated on</div>
                      <div>15-Jun-2025</div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="font-bold mb-1">Name and address of the Employer</div>
                      <div>XYZ Technologies Pvt. Ltd.</div>
                      <div>123, Tech Park, Sector 62</div>
                      <div>Noida, Uttar Pradesh - 201301</div>
                    </td>
                    <td colSpan={2}>
                      <div className="font-bold mb-1">Name and address of the Employee</div>
                      <div>RAJESH KUMAR</div>
                      <div>A-45, Green Valley Apartments</div>
                      <div>Sector 50, Noida, Uttar Pradesh - 201301</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/4">
                      <div className="font-bold mb-1">PAN of the Deductor</div>
                      <div>AABCX1234F</div>
                    </td>
                    <td className="w-1/4">
                      <div className="font-bold mb-1">TAN of the Deductor</div>
                      <div>DELX12345E</div>
                    </td>
                    <td className="w-1/4">
                      <div className="font-bold mb-1">PAN of the Employee</div>
                      <div>ABCDE1234F</div>
                    </td>
                    <td className="w-1/4">
                      <div className="font-bold mb-1">Employee Reference No.</div>
                      <div>EMP-98765</div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className="font-bold mb-1">CIT (TDS)</div>
                      <div>CIT (TDS), DELHI</div>
                    </td>
                    <td colSpan={2}>
                      <table className="w-full text-center" style={{ margin: '-4px -6px' }}>
                        <tbody>
                          <tr>
                            <td colSpan={2} className="border-b-0 font-bold border-l-0 border-r-0 border-t-0 p-1">Period with the Employer</td>
                            <td rowSpan={2} className="border-t-0 border-b-0 border-r-0 p-1 font-bold">Assessment Year</td>
                          </tr>
                          <tr>
                            <td className="p-1 font-bold border-l-0 border-b-0">From</td>
                            <td className="p-1 font-bold border-b-0">To</td>
                          </tr>
                          <tr>
                            <td className="border-0 p-1">01-Apr-24</td>
                            <td className="border-b-0 border-r-0 p-1">31-Mar-25</td>
                            <td className="border-b-0 border-r-0 p-1">2025-26</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 className="font-bold mb-2">Summary of amount paid/credited and tax deducted at source thereon in respect of the employee</h3>
              <table className="tax-table text-center">
                <thead>
                  <tr>
                    <th>Quarter</th>
                    <th>Receipt Numbers of original statements of TDS under sub-section (3) of Section 200</th>
                    <th>Amount paid / credited<br />(Rs.)</th>
                    <th>Amount of tax deducted<br />(Rs.)</th>
                    <th>Amount of tax deposited / remitted<br />(Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { q: "Q1", r: "2024Q1A12345", pd: "3,60,000", td: "45,000" },
                    { q: "Q2", r: "2024Q2A12346", pd: "3,60,000", td: "45,000" },
                    { q: "Q3", r: "2024Q3A12347", pd: "3,60,000", td: "45,000" },
                    { q: "Q4", r: "2024Q4A12348", pd: "3,60,000", td: "45,000" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row.q}</td>
                      <td>{row.r}</td>
                      <td className="text-right">{row.pd}</td>
                      <td className="text-right">{row.td}</td>
                      <td className="text-right">{row.td}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="text-right font-bold">Total (Rs.)</td>
                    <td className="text-right font-bold">14,40,000</td>
                    <td className="text-right font-bold">1,80,000</td>
                    <td className="text-right font-bold">1,80,000</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="font-bold mb-2 mt-6">I. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH BOOK ADJUSTMENT</h3>
              <p className="mb-4"><i>(The deductor to provide payment wise details of tax deducted and deposited with respect to the deductee)</i></p>
              <table className="tax-table text-center">
                <thead>
                  <tr>
                    <th rowSpan={2} className="w-12">Sl. No.</th>
                    <th rowSpan={2}>Tax Deposited in respect of the deductee (Rs.)</th>
                    <th colSpan={2}>Book Identification Number (BIN)</th>
                  </tr>
                  <tr>
                    <th>Receipt Numbers of Form No. 24G</th>
                    <th>Date of transfer voucher (dd/mm/yyyy)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={4} className="py-4">NA</td></tr>
                </tbody>
              </table>

              <h3 className="font-bold mb-2 mt-6">II. DETAILS OF TAX DEDUCTED AND DEPOSITED IN THE CENTRAL GOVERNMENT ACCOUNT THROUGH CHALLAN</h3>
              <p className="mb-4"><i>(The deductor to provide payment wise details of tax deducted and deposited with respect to the deductee)</i></p>
              <table className="tax-table text-center">
                <thead>
                  <tr>
                    <th rowSpan={2} className="w-12">Sl. No.</th>
                    <th rowSpan={2}>Tax Deposited in respect of the deductee (Rs.)</th>
                    <th colSpan={3}>Challan Identification Number (CIN)</th>
                  </tr>
                  <tr>
                    <th>BSR Code of the Bank Branch</th>
                    <th>Date on which tax deposited (dd/mm/yyyy)</th>
                    <th>Challan Serial Number</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tax: "45,000", bsr: "0510213", date: "07/07/2024", serial: "10245" },
                    { tax: "45,000", bsr: "0510213", date: "07/10/2024", serial: "20387" },
                    { tax: "45,000", bsr: "0510213", date: "07/01/2025", serial: "30512" },
                    { tax: "45,000", bsr: "0510213", date: "07/04/2025", serial: "40698" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="text-right">{row.tax}</td>
                      <td>{row.bsr}</td>
                      <td>{row.date}</td>
                      <td>{row.serial}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="font-bold text-right">Total</td>
                    <td className="text-right font-bold">1,80,000</td>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 border border-black p-4">
                <h3 className="font-bold text-center mb-4">Verification</h3>
                <p className="indent-8 leading-relaxed mb-8">
                  I, <strong>Suresh Mehta</strong>, son/daughter of <strong>Ramesh Mehta</strong> working in the capacity of <strong>Finance Manager</strong> <i>(designation)</i> do hereby certify that a sum of <strong>Rs. 1,80,000</strong> [Rupees <strong>One Lakh Eighty Thousand Only</strong> (in words)] has been deducted and deposited to the credit of the Central Government. I further certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, TDS deposited and other available records.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="mb-2">Place: <strong>Noida</strong></div>
                    <div>Date: <strong>15-Jun-2025</strong></div>
                  </div>
                  <div className="text-center">
                    <div className="mb-8 font-serif italic text-gray-500 text-lg">Digitally Signed by Suresh Mehta</div>
                    <div className="border-t border-black pt-1 px-4">Signature of person responsible for deduction of tax</div>
                    <div>Full Name : <strong>Suresh Mehta</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePart === "B" && (
            <div className="part-b">
              <div className="text-center mb-6 border border-black p-2">
                <h1 className="text-xl font-bold mb-1">FORM NO. 16</h1>
                <p className="text-sm">PART B (Annexure)</p>
                <p className="font-bold mt-2">
                  Details of Salary paid and any other income and tax deducted
                </p>
              </div>

              <table className="tax-table mb-0 border-b-0">
                <tbody>
                  <tr>
                    <td className="border-b-0"><strong>Name of the Employee:</strong> RAJESH KUMAR</td>
                    <td className="border-b-0" rowSpan={2}><strong>PAN of the Employee:</strong> ABCDE1234F</td>
                  </tr>
                  <tr>
                    <td className="border-b-0"><strong>Name of the Employer:</strong> XYZ Technologies Pvt. Ltd.</td>
                  </tr>
                  <tr>
                    <td className="border-0"><strong>TAN of the Employer:</strong> DELX12345E</td>
                    <td className="border-b-0 border-r-0 border-l-0"><strong>Assessment Year:</strong> 2025-26</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="border-t-0 p-2 text-center bg-gray-100 italic">
                      Whether opting for taxation u/s 115BAC? <strong className="ml-2 bg-yellow-200 px-2 not-italic border border-black">NO (Old Regime)</strong>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="tax-table font-mono tabular-nums text-right">
                <tbody>
                  <tr>
                    <td className="w-8 text-center bg-gray-100"><strong>1.</strong></td>
                    <td className="text-left bg-gray-100" colSpan={3}><strong>Gross Salary</strong></td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(a)</td>
                    <td className="text-left">Salary as per provisions contained in section 17(1)</td>
                    <td className="w-32">14,40,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(b)</td>
                    <td className="text-left">Value of perquisites under section 17(2) (as per Form No. 12BA, wherever applicable)</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(c)</td>
                    <td className="text-left">Profits in lieu of salary under section 17(3) (as per Form No. 12BA, wherever applicable)</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(d)</td>
                    <td className="text-left font-bold">Total</td>
                    <td className="font-bold">14,40,000</td>
                  </tr>

                  {/* Exemptions */}
                  <tr>
                    <td className="w-8 text-center bg-gray-100"><strong>2.</strong></td>
                    <td className="text-left bg-gray-100" colSpan={3}><strong>Less: Allowances to the extent exempt under section 10</strong></td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(a)</td>
                    <td className="text-left">Travel concession or assistance under section 10(5)</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(b)</td>
                    <td className="text-left">House rent allowance under section 10(13A)</td>
                    <td>1,44,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(c)</td>
                    <td className="text-left font-bold">Total Amount of Exemption Claimed</td>
                    <td className="font-bold border-t-2 border-black">1,44,000</td>
                  </tr>

                  <tr>
                    <td className="text-center font-bold bg-gray-50">3.</td>
                    <td className="text-left font-bold bg-gray-50" colSpan={2}>Balance (1(d) - 2(c))</td>
                    <td className="font-bold bg-gray-50">12,96,000</td>
                  </tr>

                  {/* Deductions under 16 */}
                  <tr>
                    <td className="w-8 text-center bg-gray-100"><strong>4.</strong></td>
                    <td className="text-left bg-gray-100" colSpan={3}><strong>Deductions under section 16</strong></td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(a)</td>
                    <td className="text-left">Standard deduction under section 16(ia)</td>
                    <td>50,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(b)</td>
                    <td className="text-left">Tax on employment under section 16(iii)</td>
                    <td>2,400</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center"></td>
                    <td className="text-left font-bold border-t border-black italic">Total amount of deductions under section 16</td>
                    <td className="font-bold border-t-2 border-black">52,400</td>
                  </tr>

                  <tr>
                    <td className="text-center font-bold bg-gray-50">5.</td>
                    <td className="text-left font-bold bg-gray-50 uppercase" colSpan={2}>Income chargeable under the head "Salaries" (3 - 4)</td>
                    <td className="font-bold bg-gray-50 text-lg">12,43,600</td>
                  </tr>

                  <tr>
                    <td className="text-center font-bold bg-gray-100">6.</td>
                    <td className="text-left font-bold bg-gray-100" colSpan={3}>Add: Any other income reported by the employee</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(a)</td>
                    <td className="text-left">Income (or admissible loss) from house property reported by employee offered for TDS</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(b)</td>
                    <td className="text-left">Income under the head Other Sources offered for TDS</td>
                    <td>35,000</td>
                  </tr>

                  <tr>
                    <td className="text-center font-bold bg-gray-50">7.</td>
                    <td className="text-left font-bold bg-gray-50 uppercase" colSpan={2}>Gross Total Income (5 + 6)</td>
                    <td className="font-bold bg-gray-50">12,78,600</td>
                  </tr>

                  {/* Chapter VI-A */}
                  <tr>
                    <td className="w-8 text-center bg-gray-100"><strong>8.</strong></td>
                    <td className="text-left bg-gray-100" colSpan={3}><strong>Deductions under Chapter VI-A</strong></td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(a)</td>
                    <td className="text-left">Section 80C (Life Insurance Premium, PPF, ELSS etc.)</td>
                    <td>1,50,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(b)</td>
                    <td className="text-left">Section 80CCD(1B) (National Pension Scheme)</td>
                    <td>50,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(c)</td>
                    <td className="text-left">Section 80D (Health Insurance Premium)</td>
                    <td>25,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center">(d)</td>
                    <td className="text-left">Section 80TTA (Interest on Savings Account)</td>
                    <td>10,000</td>
                  </tr>
                  <tr>
                    <td className="text-center"></td>
                    <td className="text-left w-6 text-center"></td>
                    <td className="text-left font-bold border-t border-black italic pt-2">Total Deductions under Chapter VI-A</td>
                    <td className="font-bold border-t-2 border-black">2,35,000</td>
                  </tr>

                  <tr>
                    <td className="text-center font-bold bg-gray-50">9.</td>
                    <td className="text-left font-bold bg-gray-50 uppercase" colSpan={2}>Total Taxable Income (7 - 8)</td>
                    <td className="font-bold bg-gray-50 text-xl tracking-wider">10,43,600</td>
                  </tr>

                  {/* Tax */}
                  <tr>
                    <td className="text-center font-bold">10.</td>
                    <td className="text-left font-bold" colSpan={2}>Tax on Total Income</td>
                    <td className="font-bold">1,21,220</td>
                  </tr>
                  <tr>
                    <td className="text-center">11.</td>
                    <td className="text-left" colSpan={2}>Rebate under section 87A, if applicable</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center">12.</td>
                    <td className="text-left" colSpan={2}>Surcharge, wherever applicable</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center">13.</td>
                    <td className="text-left" colSpan={2}>Health and education cess (4%)</td>
                    <td>4,849</td>
                  </tr>
                  <tr>
                    <td className="text-center font-bold bg-gray-50">14.</td>
                    <td className="text-left font-bold bg-gray-50" colSpan={2}>Tax Payable (10 + 12 + 13 - 11)</td>
                    <td className="font-bold bg-gray-50">1,26,069</td>
                  </tr>
                  <tr>
                    <td className="text-center">15.</td>
                    <td className="text-left" colSpan={2}>Less: Relief under section 89 (attach details)</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td className="text-center font-bold bg-teal-50">16.</td>
                    <td className="text-left font-bold bg-teal-50" colSpan={2}>Net Tax Payable (14 - 15)</td>
                    <td className="font-bold bg-teal-50 text-xl border-y-2 border-black py-2">1,26,069</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 border border-black p-4">
                <h3 className="font-bold text-center mb-4">Verification</h3>
                <p className="indent-8 leading-relaxed mb-8">
                  I, <strong>Suresh Mehta</strong>, son/daughter of <strong>Ramesh Mehta</strong> working in the capacity of <strong>Finance Manager</strong> <i>(designation)</i> do hereby certify that the information given above is true, complete and correct and is based on the books of account, documents, TDS statements, and other available records.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="mb-2">Place: <strong>Noida</strong></div>
                    <div>Date: <strong>15-Jun-2025</strong></div>
                  </div>
                  <div className="text-center">
                    <div className="mb-8 font-serif italic text-gray-500 text-lg">Digitally Signed by Suresh Mehta</div>
                    <div className="border-t border-black pt-1 px-4">Signature of person responsible for deduction of tax</div>
                    <div>Full Name : <strong>Suresh Mehta</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
