/* Accuracy harness for the comprehensive income-tax engine.
   Run: npx tsx scripts/test-incometax.ts
   Expected values are hand-computed for AY 2026-27 (FY 2025-26). */

import { computeComprehensiveTax, ComprehensiveInput } from "../src/lib/incomeTax";

const base: ComprehensiveInput = {
  assessmentYear: "AY_2026_27",
  ageGroup: "below60",
  residentIndividual: true,
  grossSalary: 0,
  exemptAllowances: 0,
  housePropertyType: "none",
  rentReceived: 0,
  municipalTaxes: 0,
  homeLoanInterest: 0,
  businessIncome: 0,
  otherSourcesIncome: 0,
  stcg111A: 0,
  ltcg112A: 0,
  ded80C: 0,
  ded80CCD1B: 0,
  ded80CCD2: 0,
  ded80D: 0,
  ded80TTA_TTB: 0,
  ded80G: 0,
  dedOther: 0,
};

const I = (o: Partial<ComprehensiveInput>): ComprehensiveInput => ({ ...base, ...o });

let pass = 0;
let fail = 0;
const rupee = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

function check(name: string, actual: number, expected: number) {
  const ok = Math.abs(actual - expected) < 1;
  if (ok) pass++;
  else fail++;
  console.log(
    `${ok ? "✅" : "❌"} ${name.padEnd(48)} got ${rupee(actual).padStart(14)}  exp ${rupee(expected).padStart(14)}`
  );
}

// --- A: pure salary 7L ---
let r = computeComprehensiveTax(I({ grossSalary: 700000 }));
check("A salary 7L — new", r.new.totalTax, 0);
check("A salary 7L — old", r.old.totalTax, 44200);

// --- B: pure salary 12.75L (new rebate edge) ---
r = computeComprehensiveTax(I({ grossSalary: 1275000 }));
check("B salary 12.75L — new", r.new.totalTax, 0);
check("B salary 12.75L — old", r.old.totalTax, 187200);

// --- C: pure salary 13L (new marginal relief) ---
r = computeComprehensiveTax(I({ grossSalary: 1300000 }));
check("C salary 13L — new (marginal relief)", r.new.totalTax, 26000);
check("C salary 13L — old", r.old.totalTax, 195000);

// --- D: salary 15L + 80C 1.5L + 80D 25k ---
r = computeComprehensiveTax(I({ grossSalary: 1500000, ded80C: 150000, ded80D: 25000 }));
check("D salary 15L + deductions — new", r.new.totalTax, 97500);
check("D salary 15L + deductions — old", r.old.totalTax, 202800);

// --- E: salary 60L (surcharge 10%) ---
r = computeComprehensiveTax(I({ grossSalary: 6000000 }));
check("E salary 60L — new", r.new.totalTax, 1552980);
check("E salary 60L — old", r.old.totalTax, 1827540);

// --- F: LTCG 3 Cr only (15% surcharge cap on CG) ---
r = computeComprehensiveTax(I({ ltcg112A: 30000000 }));
check("F LTCG 3Cr — new total", r.new.totalTax, 4406510);
check("F LTCG 3Cr — CG surcharge == 15% of LTCG tax", r.new.surcharge, r.new.ltcgTax * 0.15);

// --- G: salary 12L + self-occupied interest 2L ---
r = computeComprehensiveTax(I({ grossSalary: 1200000, housePropertyType: "self", homeLoanInterest: 200000 }));
check("G salary 12L + SO interest — new", r.new.totalTax, 0);
check("G salary 12L + SO interest — old", r.old.totalTax, 106600);

// --- H: senior citizen, salary 6L ---
r = computeComprehensiveTax(I({ grossSalary: 600000, ageGroup: "senior" }));
check("H senior salary 6L — new", r.new.totalTax, 0);
check("H senior salary 6L — old", r.old.totalTax, 20800);

// --- I: LTCG 5L only, basic exemption absorbs it (new) ---
r = computeComprehensiveTax(I({ ltcg112A: 500000 }));
check("I LTCG 5L — new (basic exemption)", r.new.totalTax, 0);
check("I LTCG 5L — old (no 87A vs 112A)", r.old.totalTax, 16250);

// --- J: let-out property positive income added (new) ---
r = computeComprehensiveTax(I({ grossSalary: 1500000, housePropertyType: "letout", rentReceived: 600000 }));
// NAV 600000, 30% std = 180000 -> HP income 420000. New taxable normal = (1500000-75000)+420000 = 1845000
// slab: 20000+40000+ (12-16@15% on 445000... 1845000-1200000=645000 -> but 12-16 band is 400000@15%=60000, 16-18.45 @20% = 245000*.2=49000) => 20000+40000+60000+49000=169000
check("J salary 15L + let-out rent 6L — new", r.new.totalTax, Math.round((169000 + 169000 * 0.04) / 10) * 10);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
