"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Check, FileDown, Calculator, ChevronDown } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBar from "@/components/ui/TrustBar";
import OfficialSources from "@/components/ui/OfficialSources";
import AssessmentYearSelect from "@/components/ui/AssessmentYearSelect";
import ComputationSheet from "@/components/ComputationSheet";
import { AGE_GROUP_LABELS, AgeGroup, AssessmentYear, DEFAULT_ASSESSMENT_YEAR, getTaxYearRules } from "@/lib/taxYears";
import { computeComprehensiveTax, ComprehensiveInput, HousePropertyType, RegimeResult } from "@/lib/incomeTax";

function fmt(n: number): string {
  const sign = n < 0 ? "-" : "";
  const s = Math.abs(Math.round(n)).toString();
  if (s.length <= 3) return sign + "₹" + s;
  const last3 = s.slice(-3);
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
  grossSalary: string; exemptAllowances: string; housePropertyType: HousePropertyType;
  rentReceived: string; municipalTaxes: string; homeLoanInterest: string;
  businessIncome: string; otherSourcesIncome: string; stcg111A: string; ltcg112A: string;
  ded80C: string; ded80CCD1B: string; ded80CCD2: string; ded80D: string;
  ded80TTA_TTB: string; ded80G: string; dedOther: string;
};
const EMPTY: Fields = {
  grossSalary: "", exemptAllowances: "", housePropertyType: "none", rentReceived: "",
  municipalTaxes: "", homeLoanInterest: "", businessIncome: "", otherSourcesIncome: "",
  stcg111A: "", ltcg112A: "", ded80C: "", ded80CCD1B: "", ded80CCD2: "", ded80D: "",
  ded80TTA_TTB: "", ded80G: "", dedOther: "",
};

function MoneyInput({ label, value, onChange, cap, hint }: {
  label: string; value: string; onChange: (v: string) => void; cap?: number; hint?: string;
}) {
  const v = num(value);
  const over = cap !== undefined && v > cap;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{cap !== undefined && <span className="text-gray-400 ml-1 font-normal">max {fmt(cap)}</span>}
      </label>
      <input type="number" inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0"
        className={`w-full border rounded-lg px-3 py-2 outline-none transition focus:ring-2 ${over ? "border-red-300 focus:ring-red-400 bg-red-50" : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"}`} />
      {over && <p className="text-xs text-red-500 mt-1">Capped at {fmt(cap!)} in the calculation.</p>}
      {hint && !over && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
function Section({ title, summary, open, onToggle, children }: {
  title: string; summary: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  const hasData = summary.length > 0;
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50/70 transition-colors">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {hasData && <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />}
            <span className="font-semibold text-navy text-sm">{title}</span>
          </div>
          {!open && hasData && <p className="text-xs text-teal-700 mt-0.5 truncate">{summary}</p>}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-4 pt-3 space-y-3 border-t border-gray-100">{children}</div>}
    </div>
  );
}

export default function IncomeTaxCalculator() {
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYear>(DEFAULT_ASSESSMENT_YEAR);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("below60");
  const [f, setF] = useState<Fields>(EMPTY);
  const [copied, setCopied] = useState(false);
  const set = (k: keyof Fields) => (v: string) => setF((p) => ({ ...p, [k]: v }));
  const rules = getTaxYearRules(assessmentYear);

  const input: ComprehensiveInput = useMemo(() => ({
    assessmentYear, ageGroup, residentIndividual: true,
    grossSalary: num(f.grossSalary), exemptAllowances: num(f.exemptAllowances),
    housePropertyType: f.housePropertyType, rentReceived: num(f.rentReceived),
    municipalTaxes: num(f.municipalTaxes), homeLoanInterest: num(f.homeLoanInterest),
    businessIncome: num(f.businessIncome), otherSourcesIncome: num(f.otherSourcesIncome),
    stcg111A: num(f.stcg111A), ltcg112A: num(f.ltcg112A),
    ded80C: num(f.ded80C), ded80CCD1B: num(f.ded80CCD1B), ded80CCD2: num(f.ded80CCD2),
    ded80D: num(f.ded80D), ded80TTA_TTB: num(f.ded80TTA_TTB), ded80G: num(f.ded80G), dedOther: num(f.dedOther),
  }), [assessmentYear, ageGroup, f]);

  const hasIncome = input.grossSalary || input.businessIncome || input.otherSourcesIncome ||
    input.rentReceived || input.stcg111A || input.ltcg112A ||
    (input.housePropertyType === "self" && input.homeLoanInterest);
  const result = useMemo(() => (hasIncome ? computeComprehensiveTax(input) : null), [input, hasIncome]);

  const [open, setOpen] = useState({ salary: true, hp: false, biz: false, cg: false, ded: false });
  const toggle = (k: keyof typeof open) => setOpen((p) => ({ ...p, [k]: !p[k] }));
  const join = (parts: (string | false)[]) => parts.filter(Boolean).join(" · ");
  const sum = {
    salary: join([input.grossSalary > 0 && `Gross ${fmt(input.grossSalary)}`, input.exemptAllowances > 0 && `HRA/LTA ${fmt(input.exemptAllowances)}`]),
    hp: f.housePropertyType === "none" ? "" : join([f.housePropertyType === "self" ? "Self-occupied" : "Let-out", input.rentReceived > 0 && `rent ${fmt(input.rentReceived)}`, input.homeLoanInterest > 0 && `int ${fmt(input.homeLoanInterest)}`]),
    biz: join([input.businessIncome > 0 && `Business ${fmt(input.businessIncome)}`, input.otherSourcesIncome > 0 && `Other ${fmt(input.otherSourcesIncome)}`]),
    cg: join([input.stcg111A > 0 && `STCG ${fmt(input.stcg111A)}`, input.ltcg112A > 0 && `LTCG ${fmt(input.ltcg112A)}`]),
    ded: (() => { const t = input.ded80C + input.ded80CCD1B + input.ded80CCD2 + input.ded80D + input.ded80TTA_TTB + input.ded80G + input.dedOther; return t > 0 ? `Entered ${fmt(t)}` : ""; })(),
  };

  const summary = useCallback(() => {
    if (!result) return "";
    const line = (r: RegimeResult) => `  Total income ${fmt(r.totalIncome)} · Total tax ${fmt(r.totalTax)}`;
    return [
      "Taxaltus — Income Tax Computation (educational estimate)",
      `${rules.label} (${rules.fyLabel}) · ${AGE_GROUP_LABELS[ageGroup]}`,
      "", "OLD REGIME", line(result.old), "NEW REGIME", line(result.new), "",
      `Recommended: ${result.betterRegime === "equal" ? "Both equal" : result.betterRegime.toUpperCase() + " regime"}${result.saving ? ` (saves ${fmt(result.saving)})` : ""}`,
      "", "https://taxaltus.com/income-tax-calculator",
    ].join("\n");
  }, [result, rules, ageGroup]);

  const copy = () => { const s = summary(); if (!s) return; navigator.clipboard.writeText(s); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <div className="print:hidden">
        <PageHeader
          title="Full Income Tax Calculator"
          subtitle={`Enter your details on the left — a live computation builds on the right for ${rules.fyLabel} (${rules.label})`}
          breadcrumbs={[{ label: "Full Income Tax Calculator" }]}
        />

        <div className="container-main py-6 sm:py-10">
          <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
            <Link href="/" className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium bg-teal-50 hover:bg-teal-100 px-4 py-2 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4" />Back to Home
            </Link>
            <TrustBar />
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-8">
            {/* ---- LEFT: inputs ---- */}
            <div className="lg:sticky lg:top-20 lg:self-start space-y-3 mb-8 lg:mb-0">
              {/* Period & taxpayer — always visible */}
              <div className="bg-white rounded-xl border shadow-sm p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-3">Period &amp; Taxpayer</h3>
                <div className="space-y-3">
                  <AssessmentYearSelect value={assessmentYear} onChange={setAssessmentYear} />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age Group</label>
                    <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value as AgeGroup)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:ring-2 focus:ring-teal/40 outline-none bg-white">
                      {Object.entries(AGE_GROUP_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <Section title="Salary & Allowances" summary={sum.salary} open={open.salary} onToggle={() => toggle("salary")}>
                <MoneyInput label="Gross Salary" value={f.grossSalary} onChange={set("grossSalary")} />
                <MoneyInput label="Exempt Allowances (HRA/LTA)" value={f.exemptAllowances} onChange={set("exemptAllowances")} hint="Old regime only" />
              </Section>

              <Section title="House Property" summary={sum.hp} open={open.hp} onToggle={() => toggle("hp")}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property type</label>
                  <select value={f.housePropertyType} onChange={(e) => set("housePropertyType")(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                    <option value="none">None</option><option value="self">Self-occupied</option><option value="letout">Let-out</option>
                  </select>
                </div>
                {f.housePropertyType === "letout" && <>
                  <MoneyInput label="Annual Rent Received" value={f.rentReceived} onChange={set("rentReceived")} />
                  <MoneyInput label="Municipal Taxes Paid" value={f.municipalTaxes} onChange={set("municipalTaxes")} />
                </>}
                {f.housePropertyType !== "none" &&
                  <MoneyInput label="Home Loan Interest" value={f.homeLoanInterest} onChange={set("homeLoanInterest")} hint={f.housePropertyType === "self" ? "Capped ₹2L (old regime only)" : "Loss set-off capped ₹2L (old)"} />}
                {f.housePropertyType === "none" && <p className="text-xs text-gray-400">Choose a property type to add house-property income or interest.</p>}
              </Section>

              <Section title="Business & Other Sources" summary={sum.biz} open={open.biz} onToggle={() => toggle("biz")}>
                <MoneyInput label="Business / Profession Income" value={f.businessIncome} onChange={set("businessIncome")} />
                <MoneyInput label="Other Sources (interest etc.)" value={f.otherSourcesIncome} onChange={set("otherSourcesIncome")} />
              </Section>

              <Section title="Capital Gains (Equity)" summary={sum.cg} open={open.cg} onToggle={() => toggle("cg")}>
                <MoneyInput label="Short-Term — Sec 111A" value={f.stcg111A} onChange={set("stcg111A")} hint="Taxed at 20%" />
                <MoneyInput label="Long-Term — Sec 112A" value={f.ltcg112A} onChange={set("ltcg112A")} hint="12.5% after ₹1.25L exemption" />
              </Section>

              <Section title="Deductions" summary={sum.ded} open={open.ded} onToggle={() => toggle("ded")}>
                <p className="text-xs text-gray-400 -mt-1">Old regime only, except 80CCD(2) which applies to both.</p>
                <MoneyInput label="80C" value={f.ded80C} onChange={set("ded80C")} cap={150000} />
                <MoneyInput label="80CCD(1B) NPS" value={f.ded80CCD1B} onChange={set("ded80CCD1B")} cap={50000} />
                <MoneyInput label="80CCD(2) Employer NPS" value={f.ded80CCD2} onChange={set("ded80CCD2")} hint="≤10% old / 14% new of salary" />
                <MoneyInput label="80D Mediclaim" value={f.ded80D} onChange={set("ded80D")} cap={100000} />
                <MoneyInput label="80TTA / 80TTB" value={f.ded80TTA_TTB} onChange={set("ded80TTA_TTB")} cap={ageGroup === "below60" ? 10000 : 50000} />
                <MoneyInput label="80G Donations" value={f.ded80G} onChange={set("ded80G")} />
                <MoneyInput label="Other deductions" value={f.dedOther} onChange={set("dedOther")} />
              </Section>

              <button onClick={() => setF(EMPTY)} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition">Reset all fields</button>
            </div>

            {/* ---- RIGHT: live computation ---- */}
            <div>
              {!result ? (
                <div className="h-full min-h-[420px] flex flex-col items-center justify-center text-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-10">
                  <Calculator className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">Your computation will appear here</p>
                  <p className="text-gray-400 text-sm mt-1 max-w-sm">Enter at least one income figure on the left. Old and new regime are computed side-by-side as you type.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white font-semibold px-5 py-2.5 rounded-lg transition shadow-sm">
                      <FileDown className="w-4 h-4" />Download PDF
                    </button>
                    <button onClick={copy} className={`inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg transition border-2 ${copied ? "bg-emerald-50 text-emerald-700 border-emerald-400" : "bg-white text-navy border-gray-200 hover:border-teal/50"}`}>
                      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}{copied ? "Copied" : "Copy summary"}
                    </button>
                    <span className="text-xs text-gray-400 self-center">PDF opens your print dialog — choose “Save as PDF”.</span>
                  </div>
                  <ComputationSheet result={result} ayLabel={rules.label} fyLabel={rules.fyLabel} ageLabel={AGE_GROUP_LABELS[ageGroup]} />
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800">
                    <strong>Scope:</strong> educational estimate for resident individuals — covers salary, house property, business, other sources and equity capital gains with all deductions, 87A, surcharge (15% CG cap) with marginal relief and cess. It does not model non-residents, AMT, dividend surcharge cap, clubbing of others’ income, or inter-year loss carry-forward. Verify with Form 16, AIS/26AS and a qualified professional.
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
                    Go deeper: <Link href="/regime" className="text-teal-700 font-medium hover:underline">regime comparison</Link>,{" "}
                    <Link href="/deductions" className="text-teal-700 font-medium hover:underline">deductions guide</Link>,{" "}
                    <Link href="/advance-tax" className="text-teal-700 font-medium hover:underline">advance-tax & 234B/C</Link>.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8"><OfficialSources note="Surcharge on equity capital-gains tax (111A/112A) is capped at 15%. Section 87A rebate applies to slab income only. Verify against the latest official rules." /></div>
        </div>
      </div>

      {/* ---- PRINT-ONLY branded computation document ---- */}
      {result && (
        <div className="hidden print:block print-exact">
          <div className="bg-navy text-white px-8 py-5 flex items-center justify-between">
            <img src="/logo.png" alt="Taxaltus" className="h-9 w-auto object-contain" />
            <div className="text-right text-xs text-white/80">
              <div className="font-semibold text-white text-sm">Income Tax Computation</div>
              <div>Generated {today} · taxaltus.com</div>
            </div>
          </div>
          <div className="px-8 py-6">
            <ComputationSheet result={result} ayLabel={rules.label} fyLabel={rules.fyLabel} ageLabel={AGE_GROUP_LABELS[ageGroup]} print />
          </div>

          {/* Repeating disclaimer — fixed to the bottom of every printed page. */}
          <div className="print-footer">
            <strong>Disclaimer:</strong> Generated by Taxaltus, a non-profit tax-education initiative, for educational purposes
            only — not tax advice. Estimate for a resident individual under {rules.label} ({rules.fyLabel}); does not model
            non-residents, AMT, the 15% surcharge cap on dividends, clubbing of others’ income, or inter-year loss carry-forward.
            Verify against your Form 16, AIS/Form 26AS and the latest rules at incometax.gov.in, and consult a qualified
            Chartered Accountant before filing. © {new Date().getFullYear()} Taxaltus · taxaltus.com
          </div>
        </div>
      )}
    </div>
  );
}
