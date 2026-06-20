"use client";

import { ComprehensiveResult, RegimeResult } from "@/lib/incomeTax";

function f(n: number, dashZero = false): string {
  if (dashZero && Math.round(n) === 0) return "—";
  const sign = n < 0 ? "(" : "";
  const close = n < 0 ? ")" : "";
  const s = Math.abs(Math.round(n)).toString();
  if (s.length <= 3) return sign + s + close;
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  let out = "";
  while (rest.length > 2) {
    out = "," + rest.slice(-2) + out;
    rest = rest.slice(0, -2);
  }
  return sign + rest + out + "," + last3 + close;
}

type Kind = "section" | "line" | "less" | "subtotal" | "total" | "rate";
interface RowDef {
  label: string;
  old?: number;
  nw?: number;
  kind: Kind;
  show?: boolean;
  oldText?: string;
  nwText?: string;
}

export default function ComputationSheet({
  result,
  ayLabel,
  fyLabel,
  ageLabel,
  print = false,
}: {
  result: ComprehensiveResult;
  ayLabel: string;
  fyLabel: string;
  ageLabel: string;
  print?: boolean;
}) {
  const o = result.old;
  const n = result.new;
  const better = result.betterRegime;

  const hasHP = o.housePropertyIncome !== 0 || n.housePropertyIncome !== 0;
  const hasBiz = o.businessIncome > 0 || n.businessIncome > 0;
  const hasOther = o.otherSourcesIncome > 0 || n.otherSourcesIncome > 0;
  const hasCG = o.taxableSpecialIncome > 0 || n.taxableSpecialIncome > 0;
  const hasStcg = o.stcgTaxable > 0 || n.stcgTaxable > 0;
  const hasLtcg = o.ltcgTaxable > 0 || n.ltcgTaxable > 0;

  const dedLabels = Array.from(
    new Set([...o.deductionLines, ...n.deductionLines].map((d) => d.label))
  );
  const dedOf = (r: RegimeResult, label: string) =>
    r.deductionLines.find((d) => d.label === label)?.allowed ?? 0;
  const hasDed = o.totalDeductions > 0 || n.totalDeductions > 0;

  const rows: RowDef[] = [
    { label: "1.  Income from Salary", kind: "section", show: o.salaryGross > 0 },
    { label: "Gross salary", old: o.salaryGross, nw: n.salaryGross, kind: "line", show: o.salaryGross > 0 },
    { label: "Less: Exempt allowances (HRA/LTA)", old: o.salaryExempt, nw: n.salaryExempt, kind: "less", show: o.salaryGross > 0 && (o.salaryExempt > 0 || n.salaryExempt > 0) },
    { label: "Less: Standard deduction", old: o.salaryStandardDeduction, nw: n.salaryStandardDeduction, kind: "less", show: o.salaryGross > 0 },
    { label: "Income from Salary", old: o.salaryIncome, nw: n.salaryIncome, kind: "subtotal", show: o.salaryGross > 0 },

    { label: "2.  Income from House Property", kind: "section", show: hasHP },
    { label: "Net annual value", old: o.hpAnnualValue, nw: n.hpAnnualValue, kind: "line", show: hasHP && (o.hpAnnualValue > 0 || n.hpAnnualValue > 0) },
    { label: "Less: Standard deduction @ 30%", old: o.hpStandardDeduction, nw: n.hpStandardDeduction, kind: "less", show: hasHP && (o.hpStandardDeduction > 0 || n.hpStandardDeduction > 0) },
    { label: "Less: Interest on housing loan", old: o.hpInterest, nw: n.hpInterest, kind: "less", show: hasHP },
    { label: "Income from House Property", old: o.housePropertyIncome, nw: n.housePropertyIncome, kind: "subtotal", show: hasHP },

    { label: "3.  Profits & Gains of Business / Profession", old: o.businessIncome, nw: n.businessIncome, kind: "subtotal", show: hasBiz },
    { label: "4.  Income from Other Sources", old: o.otherSourcesIncome, nw: n.otherSourcesIncome, kind: "subtotal", show: hasOther },

    { label: "Gross Total Income (normal rate)", old: o.normalIncomeBeforeDeductions, nw: n.normalIncomeBeforeDeductions, kind: "total" },

    { label: "Less: Chapter VI-A Deductions", kind: "section", show: hasDed },
    ...dedLabels.map((label): RowDef => ({
      label,
      old: dedOf(o, label),
      nw: dedOf(n, label),
      kind: "less",
      show: true,
    })),
    { label: "Total Deductions", old: o.totalDeductions, nw: n.totalDeductions, kind: "subtotal", show: hasDed },

    { label: "Total Income at Slab Rates", old: o.taxableNormalIncome, nw: n.taxableNormalIncome, kind: "total" },

    { label: "Add: Capital Gains (special rates)", kind: "section", show: hasCG },
    { label: "STCG u/s 111A (taxable)", old: o.stcgTaxable, nw: n.stcgTaxable, kind: "line", show: hasStcg },
    { label: "LTCG u/s 112A — net of ₹1.25L exemption", old: o.ltcgTaxable, nw: n.ltcgTaxable, kind: "line", show: hasLtcg },

    { label: "Total Income", old: o.totalIncome, nw: n.totalIncome, kind: "total" },
  ];

  const taxRows: RowDef[] = [
    { label: "Tax on slab income", old: o.slabTax, nw: n.slabTax, kind: "line" },
    { label: "Tax on STCG @ 20%", old: o.stcgTax, nw: n.stcgTax, kind: "line", show: hasStcg },
    { label: "Tax on LTCG @ 12.5%", old: o.ltcgTax, nw: n.ltcgTax, kind: "line", show: hasLtcg },
    { label: "Less: Rebate u/s 87A", old: o.rebate87A, nw: n.rebate87A, kind: "less", show: o.rebate87A > 0 || n.rebate87A > 0 },
    { label: "Less: Marginal relief (87A)", old: o.rebateMarginalRelief, nw: n.rebateMarginalRelief, kind: "less", show: o.rebateMarginalRelief > 0 || n.rebateMarginalRelief > 0 },
    { label: "Tax after rebate", old: o.taxAfterRebate, nw: n.taxAfterRebate, kind: "subtotal" },
    { label: "Add: Surcharge (CG portion capped 15%)", old: o.surcharge, nw: n.surcharge, kind: "line", show: o.surcharge > 0 || n.surcharge > 0 },
    { label: "Add: Health & Education Cess @ 4%", old: o.cess, nw: n.cess, kind: "line" },
    { label: "TOTAL TAX PAYABLE", old: o.totalTax, nw: n.totalTax, kind: "total" },
    { label: "Effective tax rate", kind: "rate", oldText: (o.effectiveRate * 100).toFixed(2) + "%", nwText: (n.effectiveRate * 100).toFixed(2) + "%" },
  ];

  const colHead = (label: string, isBetter: boolean) => (
    <th
      className={`px-3 py-2 text-right text-sm font-bold ${
        isBetter ? "text-teal-700" : "text-navy"
      }`}
    >
      {label}
      {isBetter && <span className="block text-[10px] font-semibold text-teal-600">✓ RECOMMENDED</span>}
    </th>
  );

  const renderRow = (r: RowDef, i: number) => {
    if (r.show === false) return null;
    if (r.kind === "section") {
      return (
        <tr key={i}>
          <td colSpan={3} className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-teal-700">
            {r.label}
          </td>
        </tr>
      );
    }
    const isTotal = r.kind === "total";
    const isSub = r.kind === "subtotal";
    const isLess = r.kind === "less";
    const isRate = r.kind === "rate";
    const labelCls = isTotal
      ? "font-bold text-navy"
      : isSub
      ? "font-semibold text-navy"
      : isLess
      ? "text-gray-500 pl-6"
      : isRate
      ? "text-gray-500 italic"
      : "text-gray-700 pl-3";
    const valCls = (isBetter: boolean) =>
      `px-3 py-1.5 text-right tabular-nums ${
        isTotal ? "font-bold " + (isBetter ? "text-teal-700" : "text-navy") : isSub ? "font-semibold text-navy" : "text-gray-700"
      }`;
    const oldVal = isRate ? r.oldText : f(r.old ?? 0, isLess);
    const nwVal = isRate ? r.nwText : f(r.nw ?? 0, isLess);
    return (
      <tr key={i} className={isTotal ? "bg-teal-50/60 border-t-2 border-teal-200" : isSub ? "border-t border-gray-200" : ""}>
        <td className={`px-3 py-1.5 text-sm ${labelCls}`}>{r.label}</td>
        <td className={valCls(better === "old")}>{oldVal}</td>
        <td className={valCls(better === "new")}>{nwVal}</td>
      </tr>
    );
  };

  return (
    <div className={print ? "" : "bg-white rounded-xl border shadow-sm overflow-hidden"}>
      <div className={`px-5 py-3 border-b ${print ? "border-gray-300" : "bg-navy text-white"}`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-bold ${print ? "text-navy text-lg" : "text-white"}`}>
            Computation of Total Income &amp; Tax
          </h3>
          <span className={`text-xs ${print ? "text-gray-500" : "text-white/70"}`}>{ageLabel}</span>
        </div>
        <p className={`text-xs mt-0.5 ${print ? "text-gray-500" : "text-white/70"}`}>
          {ayLabel} · {fyLabel} · Resident Individual · all figures in ₹
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="px-3 py-2 text-left text-sm font-bold text-gray-500">Particulars</th>
              {colHead("Old Regime", better === "old")}
              {colHead("New Regime", better === "new")}
            </tr>
          </thead>
          <tbody>
            {rows.map(renderRow)}
            <tr>
              <td colSpan={3} className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                Tax Computation
              </td>
            </tr>
            {taxRows.map((r, i) => renderRow(r, 1000 + i))}
          </tbody>
        </table>
      </div>

      <div className={`px-5 py-3 text-sm ${print ? "" : "bg-gray-50 border-t"}`}>
        {better === "equal" ? (
          <p className="text-gray-700">
            Both regimes result in the same tax of <strong>₹{f(o.totalTax)}</strong>.
          </p>
        ) : (
          <p className="text-gray-700">
            <strong className="text-teal-700">{better === "old" ? "Old" : "New"} Regime recommended</strong> —
            total tax <strong>₹{f(better === "old" ? o.totalTax : n.totalTax)}</strong>, saving{" "}
            <strong className="text-teal-700">₹{f(result.saving)}</strong> versus the other regime.
          </p>
        )}
      </div>
    </div>
  );
}
