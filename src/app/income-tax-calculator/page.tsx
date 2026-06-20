"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Check, ChevronDown } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBar from "@/components/ui/TrustBar";
import OfficialSources from "@/components/ui/OfficialSources";
import AssessmentYearSelect from "@/components/ui/AssessmentYearSelect";
import TaxPayableVerdict from "@/components/ui/TaxPayableVerdict";
import { AGE_GROUP_LABELS, AgeGroup, AssessmentYear, DEFAULT_ASSESSMENT_YEAR, getTaxYearRules } from "@/lib/taxYears";
import {
  computeComprehensiveTax,
  ComprehensiveInput,
  HousePropertyType,
  RegimeResult,
} from "@/lib/incomeTax";

function fmt(n: number): string {
  const sign = n < 0 ? "-" : "";
  const s = Math.abs(Math.round(n)).toString();
  if (s.length <= 3) return sign + "₹" + s;
  let last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  let result = "";
  while (rest.length > 2) {
    result = "," + rest.slice(-2) + result;
    rest = rest.slice(0, -2);
  }
  return sign + "₹" + rest + result + "," + last3;
}

const num = (s: string) => parseFloat(s) || 0;

type Fields = {
  grossSalary: string;
  exemptAllowances: string;
  housePropertyType: HousePropertyType;
  rentReceived: string;
  municipalTaxes: string;
  homeLoanInterest: string;
  businessIncome: string;
  otherSourcesIncome: string;
  stcg111A: string;
  ltcg112A: string;
  ded80C: string;
  ded80CCD1B: string;
  ded80CCD2: string;
  ded80D: string;
  ded80TTA_TTB: string;
  ded80G: string;
  dedOther: string;
};

const EMPTY: Fields = {
  grossSalary: "", exemptAllowances: "", housePropertyType: "none", rentReceived: "",
  municipalTaxes: "", homeLoanInterest: "", businessIncome: "", otherSourcesIncome: "",
  stcg111A: "", ltcg112A: "", ded80C: "", ded80CCD1B: "", ded80CCD2: "", ded80D: "",
  ded80TTA_TTB: "", ded80G: "", dedOther: "",
};

function MoneyInput({
  label, value, onChange, cap, hint,
}: {
  label: string; value: string; onChange: (v: string) => void; cap?: number; hint?: string;
}) {
  const v = num(value);
  const over = cap !== undefined && v > cap;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {cap !== undefined && <span className="text-gray-400 ml-1 font-normal">max {fmt(cap)}</span>}
      </label>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className={`w-full border rounded-lg px-4 py-2.5 outline-none transition focus:ring-2 ${
          over ? "border-red-300 focus:ring-red-400 bg-red-50" : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"
        }`}
      />
      {over && <p className="text-xs text-red-500 mt-1">Capped at {fmt(cap!)} in the calculation.</p>}
      {hint && !over && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export default function IncomeTaxCalculator() {
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>(DEFAULT_ASSESSMENT_YEAR);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [f, setF] = useState<Fields>(EMPTY);
  const [copied, setCopied] = useState(false);
  const set = (k: keyof Fields) => (v: string) => setF((prev) => ({ ...prev, [k]: v }));
  const rules = getTaxYearRules(assessmentYear);

  const input: ComprehensiveInput = useMemo(() => ({
    assessmentYear,
    ageGroup,
    residentIndividual: true,
    grossSalary: num(f.grossSalary),
    exemptAllowances: num(f.exemptAllowances),
    housePropertyType: f.housePropertyType,
    rentReceived: num(f.rentReceived),
    municipalTaxes: num(f.municipalTaxes),
    homeLoanInterest: num(f.homeLoanInterest),
    businessIncome: num(f.businessIncome),
    otherSourcesIncome: num(f.otherSourcesIncome),
    stcg111A: num(f.stcg111A),
    ltcg112A: num(f.ltcg112A),
    ded80C: num(f.ded80C),
    ded80CCD1B: num(f.ded80CCD1B),
    ded80CCD2: num(f.ded80CCD2),
    ded80D: num(f.ded80D),
    ded80TTA_TTB: num(f.ded80TTA_TTB),
    ded80G: num(f.ded80G),
    dedOther: num(f.dedOther),
  }), [assessmentYear, ageGroup, f]);

  const hasIncome =
    input.grossSalary || input.businessIncome || input.otherSourcesIncome ||
    input.rentReceived || input.stcg111A || input.ltcg112A ||
    (input.housePropertyType === "self" && input.homeLoanInterest);

  const result = useMemo(() => (hasIncome ? computeComprehensiveTax(input) : null), [input, hasIncome]);

  const summary = useCallback(() => {
    if (!result) return "";
    const line = (r: RegimeResult) => [
      `  Taxable (slab) income: ${fmt(r.taxableNormalIncome)}`,
      r.taxableSpecialIncome ? `  Taxable capital gains: ${fmt(r.taxableSpecialIncome)}` : "",
      `  Tax before rebate: ${fmt(r.taxBeforeRebate)}`,
      r.rebate87A ? `  Less 87A rebate: ${fmt(r.rebate87A)}` : "",
      r.surcharge ? `  Surcharge (${(r.surchargeRate * 100).toFixed(0)}%): ${fmt(r.surcharge)}` : "",
      `  Cess: ${fmt(r.cess)}`,
      `  Total tax: ${fmt(r.totalTax)}`,
    ].filter(Boolean).join("\n");
    return [
      "Taxaltus — Full Income Tax Calculator (educational estimate)",
      `${rules.label} (${rules.fyLabel}) · ${AGE_GROUP_LABELS[ageGroup]}`,
      "", "OLD REGIME", line(result.old), "", "NEW REGIME", line(result.new), "",
      `Better: ${result.betterRegime === "equal" ? "Both equal" : result.betterRegime.toUpperCase() + " regime"}`,
      result.saving ? `Saving: ${fmt(result.saving)}` : "",
      "", "Verify with Form 16, AIS/26AS and a qualified professional.",
      "https://taxaltus.com/income-tax-calculator",
    ].filter(Boolean).join("\n");
  }, [result, rules, ageGroup]);

  const share = () => {
    const s = summary(); if (!s) return;
    navigator.clipboard.writeText(s);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const download = () => {
    const s = summary(); if (!s) return;
    const blob = new Blob([s], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `taxaltus-income-tax-${rules.label.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageHeader
        title="Full Income Tax Calculator"
        subtitle={`All income heads compared across old & new regime for ${rules.fyLabel} (${rules.label})`}
        breadcrumbs={[{ label: "Full Income Tax Calculator" }]}
      />

      <div className="container-main py-8 sm:py-12">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Link>
        </div>
        <TrustBar />

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 my-6 text-sm text-amber-800">
          <strong>Educational estimate for resident individuals.</strong> Covers salary, house property,
          business, other sources and equity capital gains (STCG 111A, LTCG 112A), all deductions, Section 87A,
          surcharge with marginal relief and cess for <strong>{rules.fyLabel} ({rules.label})</strong>. It does not
          model non-residents, AMT, dividends&apos; 15% surcharge cap, clubbing, or inter-year loss carry-forward.
          Verify with your Form 16, AIS/26AS and a qualified professional.
        </div>

        {/* ---- Inputs ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <AssessmentYearSelect value={assessmentYear} onChange={setAssessmentYear} />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age Group</label>
            <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/40 bg-white">
              {Object.entries(AGE_GROUP_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>

          <GroupTitle>Income</GroupTitle>
          <MoneyInput label="Gross Salary (₹)" value={f.grossSalary} onChange={set("grossSalary")} />
          <MoneyInput label="Exempt Allowances — HRA/LTA (₹)" value={f.exemptAllowances} onChange={set("exemptAllowances")} hint="Recognised under old regime only" />
          <MoneyInput label="Business / Profession Income (₹)" value={f.businessIncome} onChange={set("businessIncome")} />
          <MoneyInput label="Other Sources — interest etc. (₹)" value={f.otherSourcesIncome} onChange={set("otherSourcesIncome")} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">House Property</label>
            <select value={f.housePropertyType} onChange={(e) => set("housePropertyType")(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="none">None</option>
              <option value="self">Self-occupied</option>
              <option value="letout">Let-out</option>
            </select>
          </div>
          {f.housePropertyType === "letout" && (
            <>
              <MoneyInput label="Annual Rent Received (₹)" value={f.rentReceived} onChange={set("rentReceived")} />
              <MoneyInput label="Municipal Taxes Paid (₹)" value={f.municipalTaxes} onChange={set("municipalTaxes")} />
            </>
          )}
          {f.housePropertyType !== "none" && (
            <MoneyInput label="Home Loan Interest (₹)" value={f.homeLoanInterest} onChange={set("homeLoanInterest")}
              hint={f.housePropertyType === "self" ? "Self-occupied: capped ₹2L (old regime only)" : "Let-out: full interest, loss set-off capped ₹2L (old)"} />
          )}

          <GroupTitle>Capital Gains (Equity)</GroupTitle>
          <MoneyInput label="Short-Term CG — Sec 111A (₹)" value={f.stcg111A} onChange={set("stcg111A")} hint="Taxed at 20%" />
          <MoneyInput label="Long-Term CG — Sec 112A (₹)" value={f.ltcg112A} onChange={set("ltcg112A")} hint="12.5% after ₹1.25L exemption" />

          <GroupTitle>Deductions <span className="font-normal text-gray-400">(old regime; 80CCD(2) both)</span></GroupTitle>
          <MoneyInput label="80C (PPF, ELSS, LIC…)" value={f.ded80C} onChange={set("ded80C")} cap={150000} />
          <MoneyInput label="80CCD(1B) — NPS self" value={f.ded80CCD1B} onChange={set("ded80CCD1B")} cap={50000} />
          <MoneyInput label="80CCD(2) — Employer NPS" value={f.ded80CCD2} onChange={set("ded80CCD2")} hint="≤10% (old) / 14% (new) of salary" />
          <MoneyInput label="80D — Mediclaim" value={f.ded80D} onChange={set("ded80D")} cap={100000} />
          <MoneyInput label="80TTA / 80TTB — savings interest" value={f.ded80TTA_TTB} onChange={set("ded80TTA_TTB")} cap={ageGroup === "below60" ? 10000 : 50000} />
          <MoneyInput label="80G — Donations" value={f.ded80G} onChange={set("ded80G")} />
          <MoneyInput label="Other deductions" value={f.dedOther} onChange={set("dedOther")} />

          <div className="sm:col-span-2 flex gap-3 pt-2">
            <button onClick={() => setF(EMPTY)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition">Reset</button>
            {result && (
              <>
                <button onClick={download} className="bg-white border-2 border-gray-200 hover:border-teal/50 text-navy font-semibold px-6 py-2.5 rounded-lg transition">Download</button>
                <button onClick={share} className={`font-semibold px-6 py-2.5 rounded-lg transition border-2 inline-flex items-center gap-2 ${copied ? "bg-emerald-50 text-emerald-700 border-emerald-400" : "bg-white text-navy border-gray-200 hover:border-teal/50"}`}>
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}{copied ? "Copied" : "Share"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* ---- Results ---- */}
        {result && (
          <div className="mt-8 space-y-6">
            <VerdictBanner result={result} />
            <ComparisonBar oldR={result.old} newR={result.new} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RegimeCard title="Old Regime" r={result.old} better={result.betterRegime === "old"} />
              <RegimeCard title="New Regime" r={result.new} better={result.betterRegime === "new"} />
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-sm text-gray-600">
              Want to go deeper? See the{" "}
              <Link href="/regime" className="text-teal-700 font-medium hover:underline">regime comparison</Link>,{" "}
              <Link href="/deductions" className="text-teal-700 font-medium hover:underline">deductions guide</Link>, or estimate{" "}
              <Link href="/advance-tax" className="text-teal-700 font-medium hover:underline">advance-tax instalments</Link>.
            </div>
          </div>
        )}

        <div className="mt-8"><OfficialSources note="Surcharge on equity capital-gains tax (111A/112A) is capped at 15%. Section 87A rebate is applied to slab income only, never against capital-gains tax. Verify against the latest official rules." /></div>
      </div>
    </div>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="sm:col-span-2 text-sm font-bold uppercase tracking-wider text-teal-700 border-b border-gray-100 pb-2 mt-2">{children}</h3>;
}

function VerdictBanner({ result }: { result: ReturnType<typeof computeComprehensiveTax> }) {
  const { betterRegime, saving, old, new: nw } = result;
  return (
    <div className={`rounded-xl border-2 p-6 text-center ${betterRegime === "equal" ? "bg-gray-50 border-gray-300" : "bg-teal-50 border-teal-400"}`}>
      <h3 className="text-lg font-bold text-navy mb-2">Recommended Regime</h3>
      {betterRegime === "equal" ? (
        <p className="text-gray-700">Both regimes give the same tax of <strong>{fmt(old.totalTax)}</strong>.</p>
      ) : (
        <p className="text-gray-700">
          The <strong>{betterRegime === "old" ? "Old" : "New"} Regime</strong> is better — total tax{" "}
          <strong>{fmt(betterRegime === "old" ? old.totalTax : nw.totalTax)}</strong>, saving{" "}
          <strong className="text-teal-700">{fmt(saving)}</strong> versus the other regime.
        </p>
      )}
    </div>
  );
}

function ComparisonBar({ oldR, newR }: { oldR: RegimeResult; newR: RegimeResult }) {
  const max = Math.max(oldR.totalTax, newR.totalTax, 1);
  const row = (label: string, r: RegimeResult, color: string) => (
    <div className="flex items-center gap-3">
      <span className="w-24 text-sm font-medium text-gray-600 shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden">
        <div className={`h-full ${color} rounded-full flex items-center justify-end pr-3 transition-all`} style={{ width: `${Math.max((r.totalTax / max) * 100, 8)}%` }}>
          <span className="text-xs font-bold text-white whitespace-nowrap">{fmt(r.totalTax)}</span>
        </div>
      </div>
      <span className="w-14 text-xs text-gray-500 text-right shrink-0">{(r.effectiveRate * 100).toFixed(1)}%</span>
    </div>
  );
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="font-bold text-navy">Total Tax — Old vs New</h3>
        <span className="text-xs text-gray-400">bars = total tax · right = effective rate</span>
      </div>
      <div className="space-y-3">
        {row("Old Regime", oldR, "bg-navy")}
        {row("New Regime", newR, "bg-teal-600")}
      </div>
    </div>
  );
}

function RegimeCard({ title, r, better }: { title: string; r: RegimeResult; better: boolean }) {
  const [open, setOpen] = useState(false);
  const Line = ({ label, value, strong, sub, positive }: { label: string; value: number; strong?: boolean; sub?: boolean; positive?: boolean }) => (
    <div className={`flex justify-between px-5 py-2.5 ${strong ? "bg-gray-50 font-bold text-navy" : sub ? "text-gray-500 text-sm" : "text-gray-700"}`}>
      <span>{label}</span>
      <span className={positive ? "text-emerald-600" : strong ? "text-teal-700" : ""}>{positive && value > 0 ? "-" : ""}{fmt(value)}</span>
    </div>
  );
  return (
    <div className={`rounded-xl border-2 overflow-hidden bg-white ${better ? "border-teal-400 shadow-lg" : "border-gray-200"}`}>
      <div className={`px-5 py-3 font-bold text-white ${better ? "bg-teal-600" : "bg-navy"}`}>
        {title}{better && <span className="ml-2 text-sm font-normal opacity-80">✓ Better</span>}
      </div>
      <div className="divide-y divide-gray-100">
        {r.salaryIncome > 0 && <Line label="Salary income" value={r.salaryIncome} />}
        {r.housePropertyIncome !== 0 && <Line label="House property" value={r.housePropertyIncome} />}
        {r.businessIncome > 0 && <Line label="Business / profession" value={r.businessIncome} />}
        {r.otherSourcesIncome > 0 && <Line label="Other sources" value={r.otherSourcesIncome} />}
        {r.totalDeductions > 0 && <Line label="Less: deductions" value={r.totalDeductions} positive />}
        <Line label="Taxable slab income" value={r.taxableNormalIncome} strong />
        {r.taxableSpecialIncome > 0 && <Line label="Taxable capital gains" value={r.taxableSpecialIncome} strong />}

        <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between px-5 py-2.5 text-sm font-medium text-teal-700 hover:bg-gray-50">
          <span>Slab-wise tax breakdown</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="bg-gray-50/60 px-5 py-2 text-sm">
            {r.slabBreakdown.filter((s) => s.amountTaxed > 0).map((s, i) => (
              <div key={i} className="flex justify-between py-1 text-gray-600">
                <span>{s.range} @ {(s.rate * 100).toFixed(0)}%</span>
                <span>{fmt(s.taxForSlab)}</span>
              </div>
            ))}
            {r.slabBreakdown.filter((s) => s.amountTaxed > 0).length === 0 && (
              <div className="py-1 text-gray-500">No slab tax — income within the nil band.</div>
            )}
          </div>
        )}

        <Line label="Tax on slab income" value={r.slabTax} sub />
        {r.stcgTax > 0 && <Line label="STCG tax @ 20%" value={r.stcgTax} sub />}
        {r.ltcgTax > 0 && <Line label="LTCG tax @ 12.5%" value={r.ltcgTax} sub />}
        {r.rebate87A > 0 && <Line label="Less: Section 87A rebate" value={r.rebate87A} positive sub />}
        {r.rebateMarginalRelief > 0 && <Line label="Less: marginal relief (87A)" value={r.rebateMarginalRelief} positive sub />}
        {r.surcharge > 0 && <Line label={`Surcharge @ ${(r.surchargeRate * 100).toFixed(0)}% (CG capped 15%)`} value={r.surcharge} sub />}
        <Line label="Health & Education Cess (4%)" value={r.cess} sub />
        <Line label="Total Tax Payable" value={r.totalTax} strong />
      </div>
      <div className="px-5 py-3 border-t border-gray-100">
        <TaxPayableVerdict totalTax={r.totalTax} regimeLabel={title} />
        <p className="text-xs text-gray-400 mt-2">Effective rate {(r.effectiveRate * 100).toFixed(2)}% of gross total income.</p>
      </div>
    </div>
  );
}
