"use client";

import { useState } from "react";
import { ChevronDown, Calculator } from "lucide-react";
import type { SlabBreakdownRow } from "@/lib/taxYears";

function fmtINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/**
 * Collapsible "how was this calculated?" panel.
 * Shows the slab-by-slab trace so users learn the maths, not just the result.
 */
export default function TaxBreakdown({
  slabBreakdown,
  rawTax,
  rebate,
  marginalRelief,
  taxAfterRebate,
  surcharge = 0,
  surchargeRate = 0,
  cess,
  cessRate,
  totalTax,
  title = "How was this calculated?",
  defaultOpen = false,
}: {
  slabBreakdown: SlabBreakdownRow[];
  rawTax: number;
  rebate: number;
  marginalRelief: number;
  taxAfterRebate: number;
  surcharge?: number;
  surchargeRate?: number;
  cess: number;
  cessRate: number;
  totalTax: number;
  title?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const taxedRows = slabBreakdown.filter((r) => r.amountTaxed > 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 font-semibold text-navy">
          <Calculator className="w-4 h-4 text-teal-600" />
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 space-y-3">
          {taxedRows.length === 0 ? (
            <p className="text-sm text-gray-600">
              Taxable income falls entirely within the nil-rate slab, so the slab tax is ₹0.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-3 font-semibold">Income slab</th>
                    <th className="py-2 px-3 font-semibold text-right">Amount taxed</th>
                    <th className="py-2 px-3 font-semibold text-right">Rate</th>
                    <th className="py-2 pl-3 font-semibold text-right">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {taxedRows.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2 pr-3 text-gray-700">{r.range}</td>
                      <td className="py-2 px-3 text-right text-gray-700">{fmtINR(r.amountTaxed)}</td>
                      <td className="py-2 px-3 text-right text-gray-700">{(r.rate * 100).toFixed(0)}%</td>
                      <td className="py-2 pl-3 text-right font-medium text-navy">{fmtINR(r.taxForSlab)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="divide-y divide-gray-100 text-sm border-t border-gray-100 pt-1">
            <Row label="Tax on slabs" value={fmtINR(rawTax)} />
            {rebate > 0 && <Row label="Less: Section 87A rebate" value={`- ${fmtINR(rebate)}`} positive />}
            {marginalRelief > 0 && (
              <Row label="Less: Marginal relief" value={`- ${fmtINR(marginalRelief)}`} positive />
            )}
            <Row label="Tax after rebate" value={fmtINR(taxAfterRebate)} />
            {surcharge > 0 && (
              <Row
                label={`Add: Surcharge (${(surchargeRate * 100).toFixed(0)}%, after marginal relief)`}
                value={`+ ${fmtINR(surcharge)}`}
              />
            )}
            <Row label={`Add: Health & Education Cess (${(cessRate * 100).toFixed(0)}%)`} value={`+ ${fmtINR(cess)}`} />
            <Row label="Total tax payable" value={fmtINR(totalTax)} bold />
          </div>

          {marginalRelief > 0 && (
            <p className="text-xs text-gray-500 leading-relaxed">
              Marginal relief caps your tax so it never exceeds the income earned above the rebate
              threshold — preventing the &ldquo;cliff&rdquo; where a tiny rise in income causes a large jump in tax.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  positive,
}: {
  label: string;
  value: string;
  bold?: boolean;
  positive?: boolean;
}) {
  return (
    <div className={`flex justify-between py-2 ${bold ? "font-bold" : ""}`}>
      <span className={bold ? "text-navy" : "text-gray-600"}>{label}</span>
      <span className={bold ? "text-teal-700" : positive ? "text-emerald-600" : "text-navy"}>{value}</span>
    </div>
  );
}
