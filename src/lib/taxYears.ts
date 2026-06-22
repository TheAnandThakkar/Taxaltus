export type AssessmentYear = "AY_2026_27" | "AY_2027_28";
export type TaxRegime = "old" | "new";
export type AgeGroup = "below60" | "senior" | "superSenior";

export interface TaxSlab {
  upTo: number;
  rate: number;
}

// Section citations differ by tax year: the Income-tax Act, 1961 governs income
// up to FY 2025-26, while the new Income-tax Act, 2025 (in force 1 April 2026)
// renumbers every section from FY 2026-27 onward (e.g. 80C → 123, 87A → 156,
// 115BAC → 202). Each value is a display-ready token; the new-Act values keep the
// familiar 1961 number in parentheses for continuity during the transition.
export interface SectionRefs {
  newRegime: string;
  rebate: string;
  standardDeduction: string;
  housePropertyDeduction: string;
  homeLoanInterest: string;
  stcgEquity: string;
  ltcgEquity: string;
  capitalGainsHead: string;
  d80C: string;
  d80CCD1B: string;
  d80CCD2: string;
  d80D: string;
  d80TTA_TTB: string;
  d80G: string;
  chapterVIA: string;
}

// Income-tax Act, 1961 (governs FY 2025-26 and earlier).
const SECTIONS_1961: SectionRefs = {
  newRegime: "115BAC",
  rebate: "87A",
  standardDeduction: "16(ia)",
  housePropertyDeduction: "24(a)",
  homeLoanInterest: "24(b)",
  stcgEquity: "111A",
  ltcgEquity: "112A",
  capitalGainsHead: "45",
  d80C: "80C",
  d80CCD1B: "80CCD(1B)",
  d80CCD2: "80CCD(2)",
  d80D: "80D",
  d80TTA_TTB: "80TTA / 80TTB",
  d80G: "80G",
  chapterVIA: "Chapter VI-A",
};

// Income-tax Act, 2025 (governs FY 2026-27 onward). Numbers verified against the
// Act PDF; familiar 1961 references kept in parentheses for continuity.
const SECTIONS_2025: SectionRefs = {
  newRegime: "202",
  rebate: "156 (87A)",
  standardDeduction: "19",
  housePropertyDeduction: "22(1)(a)",
  homeLoanInterest: "22(1)(b)",
  stcgEquity: "196 (111A)",
  ltcgEquity: "198 (112A)",
  capitalGainsHead: "67",
  d80C: "123 (80C)",
  d80CCD1B: "124 (80CCD 1B)",
  d80CCD2: "124(2) (80CCD 2)",
  d80D: "126 (80D)",
  d80TTA_TTB: "153 (80TTA/TTB)",
  d80G: "133 (80G)",
  chapterVIA: "Chapter VIII",
};

export interface TaxYearRules {
  key: AssessmentYear;
  label: string; // "Tax Year 2026-27" — the Act's term (= the financial year)
  fyLabel: string;
  assessmentYearLabel: string; // legacy "AY 2027-28", for the 1961-Act year
  act: string;
  usesNewAct: boolean;
  sections: SectionRefs;
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
    label: "Tax Year 2025-26",
    fyLabel: "FY 2025-26",
    assessmentYearLabel: "AY 2026-27",
    act: "Income-tax Act, 1961",
    usesNewAct: false,
    sections: SECTIONS_1961,
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
      "Governed by the Income-tax Act, 1961 (the new Income-tax Act, 2025 applies only from FY 2026-27).",
      "New regime is the default regime.",
      "New-regime Section 87A rebate is available only to resident individuals and not against income taxed at special rates.",
      "New-regime marginal relief is applied for resident individuals with normal slab income marginally above Rs 12,00,000.",
    ],
  },
  {
    key: "AY_2027_28",
    label: "Tax Year 2026-27",
    fyLabel: "FY 2026-27",
    assessmentYearLabel: "AY 2027-28",
    act: "Income-tax Act, 2025",
    usesNewAct: true,
    sections: SECTIONS_2025,
    returnDueDate: "31 July 2027",
    lawReference: "Income-tax Act, 2025 [30 of 2025], in force 1 April 2026; rates per the applicable Finance Act — verify with the latest official notification",
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
      "Governed by the new Income-tax Act, 2025 (in force 1 April 2026) — sections are renumbered (e.g. 80C → 123, 87A → 156, 115BAC → 202). Tax figures are unchanged from the Finance Act 2025 values.",
      "New regime is the default regime.",
      "New-regime Section 156 (formerly 87A) rebate is available only to resident individuals and not against income taxed at special rates.",
      "New-regime marginal relief is applied for resident individuals with normal slab income marginally above Rs 12,00,000.",
    ],
  },
];

// FY 2026-27 (Tax Year 2026-27) is the current running year and the first year
// under the Income-tax Act, 2025, so it is the default.
export const DEFAULT_ASSESSMENT_YEAR: AssessmentYear = "AY_2027_28";

// Derived labels for the supported assessment years, so prose/SEO/social text
// never goes stale when the supported set changes — it reads from this engine.
export const ASSESSMENT_YEAR_LABELS: string[] = ASSESSMENT_YEARS.map((year) => year.label);
export const ASSESSMENT_YEARS_AND: string = ASSESSMENT_YEAR_LABELS.join(" and ");
export const ASSESSMENT_YEARS_LIST: string = ASSESSMENT_YEAR_LABELS.join(", ");

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
