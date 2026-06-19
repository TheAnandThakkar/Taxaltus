"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

function fmtINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/**
 * Plain-English "is income tax payable?" banner.
 * Answers the single question most users actually have, before the numbers.
 */
export default function TaxPayableVerdict({
  totalTax,
  regimeLabel,
  className = "",
  reason,
}: {
  totalTax: number;
  regimeLabel?: string;
  className?: string;
  reason?: string;
}) {
  const payable = Math.round(totalTax) > 0;
  const regimeText = regimeLabel ? ` under the ${regimeLabel}` : "";

  if (!payable) {
    return (
      <div
        className={`flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 ${className}`}
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-bold text-emerald-800">No income tax is payable{regimeText}.</p>
          <p className="text-emerald-700 mt-0.5">
            {reason ??
              "Your liability works out to nil after the standard deduction and the Section 87A rebate. You may still need to file your ITR."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 ${className}`}
    >
      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-sm">
        <p className="font-bold text-amber-800">
          Yes — income tax is payable{regimeText}: {fmtINR(totalTax)}.
        </p>
        <p className="text-amber-700 mt-0.5">
          {reason ??
            "This is your liability after the standard deduction, slab tax, any Section 87A rebate and 4% Health & Education Cess."}
        </p>
      </div>
    </div>
  );
}
