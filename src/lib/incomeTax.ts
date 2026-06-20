// ============================================================================
// Comprehensive resident-individual income-tax engine.
//
// Builds on the slab/rebate/cess primitives in taxYears.ts and adds the full
// multi-head computation: salary, house property, business, other sources, and
// special-rate capital gains (STCG 111A, LTCG 112A), Chapter VI-A deductions,
// the resident basic-exemption set-off against special income, conservative
// Section 87A rebate, "split" surcharge (15% cap on the capital-gains portion)
// with marginal relief, and 4% cess.
//
// SCOPE (disclosed to users): resident individuals only. It does not model
// non-residents, AMT, clubbing of income, inter-year loss carry-forward,
// agricultural-income aggregation, the 15% surcharge cap on dividends, or every
// Chapter VI-A section. Figures are educational estimates.
// ============================================================================

import {
  AssessmentYear,
  TaxRegime,
  AgeGroup,
  TaxSlab,
  SlabBreakdownRow,
  getTaxYearRules,
  calculateSlabTax,
  getSlabBreakdown,
} from "./taxYears";
import {
  EQUITY_STCG_RATE,
  EQUITY_LTCG_RATE,
  EQUITY_LTCG_EXEMPTION,
} from "./capitalGains";

export type HousePropertyType = "none" | "self" | "letout";

export interface ComprehensiveInput {
  assessmentYear: AssessmentYear;
  ageGroup: AgeGroup;
  residentIndividual?: boolean; // default true
  // Income heads
  grossSalary: number;
  exemptAllowances: number; // HRA/LTA etc. — recognised under old regime only
  housePropertyType: HousePropertyType;
  rentReceived: number; // annual, let-out
  municipalTaxes: number; // annual, let-out
  homeLoanInterest: number;
  businessIncome: number;
  otherSourcesIncome: number;
  // Special-rate capital gains (equity, post 23-Jul-2024)
  stcg111A: number;
  ltcg112A: number;
  // Chapter VI-A deductions (old regime, except 80CCD(2))
  ded80C: number;
  ded80CCD1B: number;
  ded80CCD2: number; // employer NPS
  ded80D: number;
  ded80TTA_TTB: number;
  ded80G: number;
  dedOther: number;
}

export interface DeductionLine {
  label: string;
  entered: number;
  allowed: number;
}

export interface RegimeResult {
  regime: TaxRegime;
  // Income build-up
  salaryGross: number;
  salaryExempt: number;
  salaryStandardDeduction: number;
  salaryIncome: number;
  hpAnnualValue: number; // net annual value (let-out) or 0
  hpStandardDeduction: number; // 30% of NAV
  hpInterest: number; // housing-loan interest considered (after caps)
  housePropertyIncome: number; // after set-off rules (can be negative under old)
  businessIncome: number;
  otherSourcesIncome: number;
  normalIncomeBeforeDeductions: number;
  deductionLines: DeductionLine[];
  totalDeductions: number;
  taxableNormalIncome: number;
  // Special income
  stcgTaxable: number; // after basic-exemption set-off
  ltcgTaxable: number; // after ₹1.25L exemption and basic-exemption set-off
  ltcgExemptionUsed: number;
  basicExemptionSetOff: number;
  taxableSpecialIncome: number;
  totalIncome: number; // rounded taxable total income (for thresholds)
  grossTotalIncome: number;
  // Tax build-up
  slabTax: number;
  slabBreakdown: SlabBreakdownRow[];
  stcgTax: number;
  ltcgTax: number;
  taxBeforeRebate: number;
  rebate87A: number;
  rebateMarginalRelief: number;
  taxAfterRebate: number;
  surchargeRate: number;
  surcharge: number;
  surchargeMarginalRelief: number;
  cess: number;
  cessRate: number;
  totalTax: number;
  effectiveRate: number; // totalTax / grossTotalIncome
}

const round10 = (n: number) => Math.round(n / 10) * 10;

function basicExemptionOf(slabs: TaxSlab[]): number {
  // First slab taxed at 0% defines the basic exemption limit.
  const nilSlab = slabs.find((s) => s.rate === 0);
  return nilSlab ? nilSlab.upTo : 0;
}

function computeRegime(input: ComprehensiveInput, regime: TaxRegime): RegimeResult {
  const rules = getTaxYearRules(input.assessmentYear);
  const resident = input.residentIndividual ?? true;
  const slabs = regime === "new" ? rules.newRegimeSlabs : rules.oldRegimeSlabs[input.ageGroup];
  const cessRate = rules.cessRate;

  // ---- 1. Salary ----
  const stdDed = Math.min(input.grossSalary, rules.standardDeduction[regime]);
  const exemptions = regime === "old" ? input.exemptAllowances : 0;
  const salaryIncome = Math.max(0, input.grossSalary - exemptions - stdDed);

  // ---- 2. House property ----
  let housePropertyIncome = 0;
  let hpAnnualValue = 0;
  let hpStandardDeduction = 0;
  let hpInterest = 0;
  if (input.housePropertyType === "self") {
    // Self-occupied: only home-loan interest, capped ₹2L — old regime only.
    hpInterest = regime === "old" ? Math.min(input.homeLoanInterest, 200000) : 0;
    housePropertyIncome = -hpInterest;
  } else if (input.housePropertyType === "letout") {
    hpAnnualValue = Math.max(0, input.rentReceived - input.municipalTaxes);
    hpStandardDeduction = 0.3 * hpAnnualValue;
    hpInterest = input.homeLoanInterest;
    housePropertyIncome = hpAnnualValue - hpStandardDeduction - hpInterest;
  }
  // Set-off rules: old regime caps HP loss set-off at ₹2L; new regime does not
  // allow HP loss to be set off against other heads at all.
  if (housePropertyIncome < 0) {
    housePropertyIncome = regime === "old" ? Math.max(housePropertyIncome, -200000) : 0;
  }

  // ---- 3 & 4. Business and other sources ----
  const businessIncome = Math.max(0, input.businessIncome);
  const otherSourcesIncome = Math.max(0, input.otherSourcesIncome);

  const normalIncomeBeforeDeductions =
    salaryIncome + housePropertyIncome + businessIncome + otherSourcesIncome;

  // ---- 5. Chapter VI-A deductions ----
  const deductionLines: DeductionLine[] = [];
  const add = (label: string, entered: number, allowed: number) => {
    if (entered > 0 || allowed > 0) deductionLines.push({ label, entered, allowed });
    return allowed;
  };

  let deductionsSum = 0;
  if (regime === "new") {
    // Only employer NPS 80CCD(2) (up to 14% of salary) survives in the new regime.
    const cap = 0.14 * input.grossSalary;
    deductionsSum += add("80CCD(2) Employer NPS", input.ded80CCD2, Math.min(input.ded80CCD2, cap));
  } else {
    deductionsSum += add("80C", input.ded80C, Math.min(input.ded80C, 150000));
    deductionsSum += add("80CCD(1B) NPS", input.ded80CCD1B, Math.min(input.ded80CCD1B, 50000));
    deductionsSum += add(
      "80CCD(2) Employer NPS",
      input.ded80CCD2,
      Math.min(input.ded80CCD2, 0.1 * input.grossSalary)
    );
    deductionsSum += add("80D Mediclaim", input.ded80D, Math.min(input.ded80D, 100000));
    const ttaCap = input.ageGroup === "below60" ? 10000 : 50000;
    deductionsSum += add(
      "80TTA / 80TTB",
      input.ded80TTA_TTB,
      Math.min(input.ded80TTA_TTB, ttaCap)
    );
    deductionsSum += add("80G Donations", input.ded80G, Math.max(0, input.ded80G));
    deductionsSum += add("Other deductions", input.dedOther, Math.max(0, input.dedOther));
  }

  // Chapter VI-A deductions cannot exceed gross total income excluding special
  // income, i.e. they cannot create or increase a loss against capital gains.
  const totalDeductions = Math.min(deductionsSum, Math.max(0, normalIncomeBeforeDeductions));
  const taxableNormalIncome = round10(Math.max(0, normalIncomeBeforeDeductions - totalDeductions));

  // ---- Special income (after the ₹1.25L LTCG exemption) ----
  const stcgGross = Math.max(0, input.stcg111A);
  const ltcgGross = Math.max(0, input.ltcg112A);
  const ltcgExemptionUsed = Math.min(ltcgGross, EQUITY_LTCG_EXEMPTION);
  const ltcgAfterExemption = Math.max(0, ltcgGross - EQUITY_LTCG_EXEMPTION);

  // Resident basic-exemption set-off: any basic exemption unused by normal
  // income reduces special income (STCG @20% first, then LTCG @12.5%).
  const basicExemption = basicExemptionOf(slabs);
  let unusedBasic = resident ? Math.max(0, basicExemption - taxableNormalIncome) : 0;
  const stcgTaxable = Math.max(0, stcgGross - unusedBasic);
  const usedOnStcg = stcgGross - stcgTaxable;
  unusedBasic -= usedOnStcg;
  const ltcgTaxable = Math.max(0, ltcgAfterExemption - unusedBasic);
  const usedOnLtcg = ltcgAfterExemption - ltcgTaxable;
  const basicExemptionSetOff = usedOnStcg + usedOnLtcg;

  const taxableSpecialIncome = stcgTaxable + ltcgTaxable;
  const totalIncome = round10(taxableNormalIncome + stcgGross + ltcgAfterExemption);
  const grossTotalIncome =
    normalIncomeBeforeDeductions + stcgGross + ltcgAfterExemption;

  // ---- Tax on each component ----
  const slabTax = calculateSlabTax(taxableNormalIncome, slabs);
  const slabBreakdown = getSlabBreakdown(taxableNormalIncome, slabs);
  const stcgTax = (stcgTaxable * EQUITY_STCG_RATE) / 100;
  const ltcgTax = (ltcgTaxable * EQUITY_LTCG_RATE) / 100;
  const specialTax = stcgTax + ltcgTax;
  const taxBeforeRebate = slabTax + specialTax;

  // ---- Section 87A rebate (conservative: slab income only, never special) ----
  const rebateRule = rules.rebate87A[regime];
  const eligible = resident && totalIncome <= rebateRule.incomeLimit;
  const rebate87A = eligible ? Math.min(slabTax, rebateRule.maxRebate) : 0;
  let normalTaxAfterRebate = Math.max(0, slabTax - rebate87A);

  // New-regime marginal relief just above the ₹12L rebate ceiling: total tax on
  // normal income must not exceed the income earned above the ceiling.
  let rebateMarginalRelief = 0;
  if (regime === "new" && resident && totalIncome > rebateRule.incomeLimit) {
    const aboveCeiling = totalIncome - rebateRule.incomeLimit;
    if (normalTaxAfterRebate > aboveCeiling) {
      rebateMarginalRelief = normalTaxAfterRebate - aboveCeiling;
      normalTaxAfterRebate = aboveCeiling;
    }
  }

  const taxAfterRebate = normalTaxAfterRebate + specialTax;

  // ---- Surcharge (split: full rate on normal tax, capped 15% on CG tax) ----
  const { surchargeRate, surcharge, surchargeMarginalRelief } = computeSurcharge({
    totalIncome,
    taxableSpecialIncome,
    normalTaxAfterRebate,
    specialTax,
    slabs,
    regime,
    stcgRate: EQUITY_STCG_RATE / 100,
    ltcgRate: EQUITY_LTCG_RATE / 100,
    stcgTaxable,
    ltcgTaxable,
  });

  // ---- Cess and total ----
  const cess = (taxAfterRebate + surcharge) * cessRate;
  const totalTax = round10(taxAfterRebate + surcharge + cess);
  const effectiveRate = grossTotalIncome > 0 ? totalTax / grossTotalIncome : 0;

  return {
    regime,
    salaryGross: input.grossSalary,
    salaryExempt: exemptions,
    salaryStandardDeduction: stdDed,
    salaryIncome,
    hpAnnualValue,
    hpStandardDeduction,
    hpInterest,
    housePropertyIncome,
    businessIncome,
    otherSourcesIncome,
    normalIncomeBeforeDeductions,
    deductionLines,
    totalDeductions,
    taxableNormalIncome,
    stcgTaxable,
    ltcgTaxable,
    ltcgExemptionUsed,
    basicExemptionSetOff,
    taxableSpecialIncome,
    totalIncome,
    grossTotalIncome,
    slabTax,
    slabBreakdown,
    stcgTax,
    ltcgTax,
    taxBeforeRebate,
    rebate87A,
    rebateMarginalRelief,
    taxAfterRebate,
    surchargeRate,
    surcharge,
    surchargeMarginalRelief,
    cess,
    cessRate,
    totalTax,
    effectiveRate,
  };
}

const SURCHARGE_BANDS = [
  { floor: 5000000, rate: 0.1 },
  { floor: 10000000, rate: 0.15 },
  { floor: 20000000, rate: 0.25 },
  { floor: 50000000, rate: 0.37 }, // old regime; new regime caps at 25%
];

function surchargeRateFor(totalIncome: number, regime: TaxRegime) {
  let rate = 0;
  let floor = 0;
  let prevRate = 0;
  for (let i = 0; i < SURCHARGE_BANDS.length; i++) {
    if (totalIncome > SURCHARGE_BANDS[i].floor) {
      rate = SURCHARGE_BANDS[i].rate;
      floor = SURCHARGE_BANDS[i].floor;
      prevRate = i === 0 ? 0 : SURCHARGE_BANDS[i - 1].rate;
    }
  }
  if (regime === "new") rate = Math.min(rate, 0.25);
  return { rate, floor, prevRate };
}

function computeSurcharge(p: {
  totalIncome: number;
  taxableSpecialIncome: number;
  normalTaxAfterRebate: number;
  specialTax: number;
  slabs: TaxSlab[];
  regime: TaxRegime;
  stcgRate: number;
  ltcgRate: number;
  stcgTaxable: number;
  ltcgTaxable: number;
}): { surchargeRate: number; surcharge: number; surchargeMarginalRelief: number } {
  const { rate, floor, prevRate } = surchargeRateFor(p.totalIncome, p.regime);
  if (rate === 0) return { surchargeRate: 0, surcharge: 0, surchargeMarginalRelief: 0 };

  // Surcharge on capital-gains tax (111A/112A) is capped at 15%.
  const cgRate = Math.min(rate, 0.15);
  const surchargeRaw = p.normalTaxAfterRebate * rate + p.specialTax * cgRate;

  // Marginal relief: total of (tax + surcharge) must not exceed the tax+surcharge
  // computed at the threshold plus the income earned above the threshold. At the
  // threshold the special income is held fixed and normal income is trimmed.
  const normalTaxableAtFloor = Math.max(0, floor - p.taxableSpecialIncome);
  const slabTaxAtFloor = calculateSlabTax(normalTaxableAtFloor, p.slabs);
  // (At these income levels the 87A rebate is nil, so slab tax == normal tax.)
  const taxBeforeSurchargeAtFloor = slabTaxAtFloor + p.specialTax;
  const surchargeAtFloor = slabTaxAtFloor * prevRate + p.specialTax * Math.min(prevRate, 0.15);
  const allowed = taxBeforeSurchargeAtFloor + surchargeAtFloor + (p.totalIncome - floor);

  const actual = p.normalTaxAfterRebate + p.specialTax + surchargeRaw;
  let surcharge = surchargeRaw;
  let surchargeMarginalRelief = 0;
  if (actual > allowed) {
    surchargeMarginalRelief = actual - allowed;
    surcharge = Math.max(0, surchargeRaw - surchargeMarginalRelief);
  }

  return { surchargeRate: rate, surcharge, surchargeMarginalRelief };
}

export interface ComprehensiveResult {
  old: RegimeResult;
  new: RegimeResult;
  betterRegime: "old" | "new" | "equal";
  saving: number;
}

export function computeComprehensiveTax(input: ComprehensiveInput): ComprehensiveResult {
  const oldR = computeRegime(input, "old");
  const newR = computeRegime(input, "new");
  const betterRegime =
    oldR.totalTax < newR.totalTax ? "old" : newR.totalTax < oldR.totalTax ? "new" : "equal";
  return {
    old: oldR,
    new: newR,
    betterRegime,
    saving: Math.abs(oldR.totalTax - newR.totalTax),
  };
}
