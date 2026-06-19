export type AssessmentYear = "AY_2026_27" | "AY_2027_28";
export type TaxRegime = "old" | "new";
export type AgeGroup = "below60" | "senior" | "superSenior";

export interface TaxSlab {
  upTo: number;
  rate: number;
}

export interface TaxYearRules {
  key: AssessmentYear;
  label: string;
  fyLabel: string;
  returnDueDate: string;
  lawReference: string;
  newRegimeSlabs: TaxSlab[];
  oldRegimeSlabs: Record<AgeGroup, TaxSlab[]>;
  standardDeduction: Record<TaxRegime, number>;
  rebate87A: Record<TaxRegime, { incomeLimit: number; maxRebate: number }>;
  cessRate: number;
  notes: string[];
}

export const ASSESSMENT_YEARS: TaxYearRules[] = [
  {
    key: "AY_2026_27",
    label: "AY 2026-27",
    fyLabel: "FY 2025-26",
    returnDueDate: "31 July 2026",
    lawReference: "Income-tax Act, 1961, as amended by Finance Act, 2025",
    newRegimeSlabs: [
      { upTo: 400000, rate: 0 },
      { upTo: 800000, rate: 0.05 },
      { upTo: 1200000, rate: 0.1 },
      { upTo: 1600000, rate: 0.15 },
      { upTo: 2000000, rate: 0.2 },
      { upTo: 2400000, rate: 0.25 },
      { upTo: Infinity, rate: 0.3 },
    ],
    oldRegimeSlabs: {
      below60: [
        { upTo: 250000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      senior: [
        { upTo: 300000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      superSenior: [
        { upTo: 500000, rate: 0 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
    },
    standardDeduction: { old: 50000, new: 75000 },
    rebate87A: {
      old: { incomeLimit: 500000, maxRebate: 12500 },
      new: { incomeLimit: 1200000, maxRebate: 60000 },
    },
    cessRate: 0.04,
    notes: [
      "New regime is the default regime.",
      "New-regime Section 87A rebate is available only to resident individuals and not against income taxed at special rates.",
      "New-regime marginal relief is applied for resident individuals with normal slab income marginally above Rs 12,00,000.",
    ],
  },
  {
    key: "AY_2027_28",
    label: "AY 2027-28",
    fyLabel: "FY 2026-27",
    returnDueDate: "31 July 2027",
    lawReference: "Income-tax Act, 2025 (effective FY 2026-27); rates per the applicable Finance Act — verify with the latest official notification",
    newRegimeSlabs: [
      { upTo: 400000, rate: 0 },
      { upTo: 800000, rate: 0.05 },
      { upTo: 1200000, rate: 0.1 },
      { upTo: 1600000, rate: 0.15 },
      { upTo: 2000000, rate: 0.2 },
      { upTo: 2400000, rate: 0.25 },
      { upTo: Infinity, rate: 0.3 },
    ],
    oldRegimeSlabs: {
      below60: [
        { upTo: 250000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      senior: [
        { upTo: 300000, rate: 0 },
        { upTo: 500000, rate: 0.05 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      superSenior: [
        { upTo: 500000, rate: 0 },
        { upTo: 1000000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
    },
    standardDeduction: { old: 50000, new: 75000 },
    rebate87A: {
      old: { incomeLimit: 500000, maxRebate: 12500 },
      new: { incomeLimit: 1200000, maxRebate: 60000 },
    },
    cessRate: 0.04,
    notes: [
      "New-regime slab rates are shown as continuing from AY 2026-27 for tax year FY 2026-27; confirm against the latest Finance Act before filing.",
      "New-regime Section 87A rebate is available only to resident individuals and not against income taxed at special rates.",
      "New-regime marginal relief is applied for resident individuals with normal slab income marginally above Rs 12,00,000.",
    ],
  },
];

export const DEFAULT_ASSESSMENT_YEAR: AssessmentYear = "AY_2026_27";

export function getTaxYearRules(year: AssessmentYear): TaxYearRules {
  return ASSESSMENT_YEARS.find((rules) => rules.key === year) ?? ASSESSMENT_YEARS[0];
}

export function calculateSlabTax(income: number, slabs: TaxSlab[]): number {
  let tax = 0;
  let previousLimit = 0;

  for (const slab of slabs) {
    if (income <= previousLimit) break;
    const amountInSlab = Math.min(income, slab.upTo) - previousLimit;
    tax += amountInSlab * slab.rate;
    previousLimit = slab.upTo;
  }

  return Math.max(0, tax);
}

export interface SlabBreakdownRow {
  range: string;
  rate: number;
  amountTaxed: number;
  taxForSlab: number;
}

function formatSlabRange(lower: number, upper: number): string {
  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
  if (upper === Infinity) return `Above ${fmt(lower)}`;
  if (lower === 0) return `Up to ${fmt(upper)}`;
  return `${fmt(lower)} – ${fmt(upper)}`;
}

// Returns the same total as calculateSlabTax, plus a slab-by-slab trace
// so calculators can show users exactly how each rupee was taxed.
export function getSlabBreakdown(income: number, slabs: TaxSlab[]): SlabBreakdownRow[] {
  const rows: SlabBreakdownRow[] = [];
  let previousLimit = 0;

  for (const slab of slabs) {
    if (income <= previousLimit) break;
    const amountTaxed = Math.min(income, slab.upTo) - previousLimit;
    rows.push({
      range: formatSlabRange(previousLimit, slab.upTo),
      rate: slab.rate,
      amountTaxed,
      taxForSlab: amountTaxed * slab.rate,
    });
    previousLimit = slab.upTo;
  }

  return rows;
}

// Surcharge on income tax for resident individuals. Rates apply on total
// (taxable) income, with the 37% top rate removed under the new regime (capped
// at 25%). Marginal relief ensures the extra (tax + surcharge) on income just
// above a threshold never exceeds the extra income itself.
// NOTE: special-rate incomes (capital gains u/s 111A/112A, dividends) carry a
// 15% surcharge cap that this engine does not model — it covers normal slab income.
export function calculateSurcharge(
  taxableIncome: number,
  taxAfterRebate: number,
  slabs: TaxSlab[],
  regime: TaxRegime
): { surchargeRate: number; surcharge: number; surchargeMarginalRelief: number } {
  const brackets = [
    { floor: 5000000, rate: 0.1 },
    { floor: 10000000, rate: 0.15 },
    { floor: 20000000, rate: 0.25 },
    { floor: 50000000, rate: regime === "new" ? 0.25 : 0.37 },
  ];

  let rate = 0;
  let floor = 0;
  let prevRate = 0;
  for (let i = 0; i < brackets.length; i++) {
    if (taxableIncome > brackets[i].floor) {
      rate = brackets[i].rate;
      floor = brackets[i].floor;
      prevRate = i === 0 ? 0 : brackets[i - 1].rate;
    }
  }

  if (rate === 0) {
    return { surchargeRate: 0, surcharge: 0, surchargeMarginalRelief: 0 };
  }

  let surcharge = taxAfterRebate * rate;

  // Marginal relief: cap (tax + surcharge) so it does not exceed the tax +
  // surcharge at the threshold plus the income earned above the threshold.
  const taxAtFloor = calculateSlabTax(floor, slabs);
  const allowed = taxAtFloor + taxAtFloor * prevRate + (taxableIncome - floor);
  const actual = taxAfterRebate + surcharge;
  let surchargeMarginalRelief = 0;
  if (actual > allowed) {
    surchargeMarginalRelief = actual - allowed;
    surcharge = Math.max(0, surcharge - surchargeMarginalRelief);
  }

  return { surchargeRate: rate, surcharge, surchargeMarginalRelief };
}

export function calculateIncomeTax(params: {
  assessmentYear: AssessmentYear;
  regime: TaxRegime;
  taxableIncome: number;
  ageGroup?: AgeGroup;
  residentIndividual?: boolean;
}) {
  const rules = getTaxYearRules(params.assessmentYear);
  const ageGroup = params.ageGroup ?? "below60";
  const slabs = params.regime === "new" ? rules.newRegimeSlabs : rules.oldRegimeSlabs[ageGroup];
  const rawTax = calculateSlabTax(params.taxableIncome, slabs);
  const slabBreakdown = getSlabBreakdown(params.taxableIncome, slabs);
  const rebateRule = rules.rebate87A[params.regime];
  const residentIndividual = params.residentIndividual ?? true;
  const rebate =
    residentIndividual && params.taxableIncome <= rebateRule.incomeLimit
      ? Math.min(rawTax, rebateRule.maxRebate)
      : 0;

  let taxAfterRebate = Math.max(0, rawTax - rebate);

  let marginalRelief = 0;
  if (
    residentIndividual &&
    params.regime === "new" &&
    params.taxableIncome > rules.rebate87A.new.incomeLimit
  ) {
    const incomeAboveRebateLimit = params.taxableIncome - rules.rebate87A.new.incomeLimit;
    if (taxAfterRebate > incomeAboveRebateLimit) {
      marginalRelief = taxAfterRebate - incomeAboveRebateLimit;
      taxAfterRebate = incomeAboveRebateLimit;
    }
  }

  const { surchargeRate, surcharge, surchargeMarginalRelief } = calculateSurcharge(
    params.taxableIncome,
    taxAfterRebate,
    slabs,
    params.regime
  );

  const taxPlusSurcharge = taxAfterRebate + surcharge;
  const cess = taxPlusSurcharge * rules.cessRate;

  return {
    rawTax,
    rebate,
    marginalRelief,
    taxAfterRebate,
    surchargeRate,
    surcharge,
    surchargeMarginalRelief,
    cess,
    totalTax: taxPlusSurcharge + cess,
    cessRate: rules.cessRate,
    slabBreakdown,
  };
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  below60: "Below 60 years",
  senior: "60 to 79 years",
  superSenior: "80 years and above",
};
