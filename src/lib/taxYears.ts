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
    lawReference: "Income-tax Act, 2025, section 202 and applicable Finance Act provisions",
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
      "New-regime slab rates continue from AY 2026-27 for tax year FY 2026-27.",
      "New-regime Section 87A rebate is available only to resident individuals and not against income taxed at special rates.",
      "New-regime marginal relief is applied for resident individuals with normal slab income marginally above Rs 12,00,000.",
    ],
  },
];

export const DEFAULT_ASSESSMENT_YEAR: AssessmentYear = "AY_2027_28";

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
  const rebateRule = rules.rebate87A[params.regime];
  const residentIndividual = params.residentIndividual ?? true;
  const rebate =
    residentIndividual && params.taxableIncome <= rebateRule.incomeLimit
      ? Math.min(rawTax, rebateRule.maxRebate)
      : 0;

  let taxAfterRebate = Math.max(0, rawTax - rebate);

  if (
    residentIndividual &&
    params.regime === "new" &&
    params.taxableIncome > rules.rebate87A.new.incomeLimit
  ) {
    const incomeAboveRebateLimit = params.taxableIncome - rules.rebate87A.new.incomeLimit;
    taxAfterRebate = Math.min(taxAfterRebate, incomeAboveRebateLimit);
  }

  const cess = taxAfterRebate * rules.cessRate;

  return {
    rawTax,
    rebate,
    taxAfterRebate,
    cess,
    totalTax: taxAfterRebate + cess,
  };
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  below60: "Below 60 years",
  senior: "60 to 79 years",
  superSenior: "80 years and above",
};
