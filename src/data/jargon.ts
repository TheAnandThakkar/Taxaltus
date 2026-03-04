// Central jargon data store — used by TaxTerm tooltip and Jargon of the Day widget

export const JARGON: Record<string, { short: string; detail?: string }> = {
    "TDS": {
        short: "Tax Deducted at Source. Your employer subtracts tax directly from your salary before paying you.",
        detail: "TDS is advance tax collected by the payer (your employer) on behalf of the government. The amount deducted is credited to your PAN and can be claimed when you file your ITR."
    },
    "ITR": {
        short: "Income Tax Return. A form you file annually to report your income and tax paid.",
        detail: "Filing ITR is mandatory if your gross income exceeds the basic exemption limit. It also enables you to claim refunds if excess TDS was deducted."
    },
    "AIS": {
        short: "Annual Information Statement. A government document showing all income and transactions linked to your PAN.",
        detail: "AIS is more comprehensive than Form 26AS. It includes salary, dividends, interest, securities transactions, and foreign remittances. Available on the IT portal."
    },
    "Form 26AS": {
        short: "A consolidated tax credit statement showing all TDS/TCS credits against your PAN for a financial year.",
        detail: "Think of it as your tax passbook. It shows how much tax your employer, bank, and others have deposited with the government on your behalf."
    },
    "PAN": {
        short: "Permanent Account Number. A 10-digit unique ID issued by the Income Tax Department to every taxpayer.",
        detail: "Required for all financial transactions above specified limits. Format: AAAAA0000A (5 letters, 4 numbers, 1 letter)."
    },
    "Section 80C": {
        short: "A tax law provision allowing deductions up to ₹1.5 lakh per year for investments like PF, LIC, ELSS, PPF.",
        detail: "Only available under the Old Tax Regime. Popular investments: EPF employee contribution, ELSS mutual funds, LIC premium, PPF deposits, NSC, home loan principal."
    },
    "Section 80D": {
        short: "Deduction for health insurance premiums paid — up to ₹25,000 (₹50,000 for senior citizens).",
        detail: "Covers medical insurance for yourself, spouse, children (₹25K), and parents (additional ₹25K/₹50K). Only under Old Regime."
    },
    "Section 87A": {
        short: "A tax rebate available to individuals with taxable income up to ₹7 lakh (New Regime) or ₹5 lakh (Old Regime), making their tax effectively zero.",
        detail: "The rebate equals the tax payable — so if your tax is ₹10,000 and you qualify, your tax becomes ₹0. If income crosses the threshold, NO rebate applies and full tax is charged."
    },
    "HRA": {
        short: "House Rent Allowance. Part of salary provided by employer to cover rent costs. Partially tax-exempt if you pay rent.",
        detail: "Exemption is the minimum of: Actual HRA received, 50%/40% of Basic (metro/non-metro), or Rent paid minus 10% of Basic salary."
    },
    "CTC": {
        short: "Cost to Company. The total annual amount your employer spends on you — including salary, PF, gratuity, and other benefits.",
        detail: "CTC ≠ Take-home pay. Employer PF contribution and gratuity provision are included in CTC but don't reach your bank account monthly."
    },
    "EPF": {
        short: "Employee Provident Fund. 12% of your basic salary is deducted monthly and saved in a government-managed retirement fund.",
        detail: "Both you and your employer contribute 12% of Basic+DA. Your contribution qualifies for 80C. Interest rate is declared annually by EPFO (currently ~8.25%)."
    },
    "Gratuity": {
        short: "A lump-sum payment by employer after 5+ years of service. Included in CTC but paid only when you leave.",
        detail: "Calculated as (Last basic × 15/26 × years of service). Exempt from tax up to ₹20 lakh. Regulated by the Payment of Gratuity Act."
    },
    "Assessment Year": {
        short: "The year in which you file your return for the previous year's income. E.g., AY 2025-26 is for income earned in FY 2024-25.",
        detail: "Always one year ahead of the Financial Year. When someone says 'file ITR for AY 2025-26', they mean for income you earned between April 2024 and March 2025."
    },
    "Financial Year": {
        short: "The 12-month period from April 1 to March 31 during which income is earned.",
        detail: "India's government financial year differs from calendar year. FY 2024-25 = April 1, 2024 to March 31, 2025."
    },
    "Form 16": {
        short: "A certificate issued by your employer showing total salary paid and TDS deducted during the financial year.",
        detail: "Part A: TDS deducted and deposited. Part B: Salary breakup, allowances, and deductions. Essential document for ITR filing."
    },
    "Form 12BB": {
        short: "An investment declaration form submitted to your employer so they can compute correct TDS.",
        detail: "You declare HRA, LTA, home loan interest, and 80C investments at the start of the year. Employer adjusts TDS based on this. Not submitted to IT dept."
    },
    "New Tax Regime": {
        short: "A simplified tax structure with lower slab rates but without most deductions like 80C, 80D, HRA.",
        detail: "Default from FY 2024-25 onwards. Only deductions allowed: Standard Deduction (₹75K), employer NPS contribution (80CCD(2)), and a few others."
    },
    "Old Tax Regime": {
        short: "The traditional tax structure with higher slab rates but allowing deductions like 80C, 80D, HRA, home loan interest.",
        detail: "Beneficial if you have substantial investments and deductions (generally when total deductions exceed ₹3-4 lakh). Must opt-in explicitly."
    },
    "Standard Deduction": {
        short: "A flat deduction of ₹75,000 (New Regime) or ₹50,000 (Old Regime) from your salary income. No proof needed.",
        detail: "Automatically applied to all salaried employees and pensioners. Replaced the earlier transport and medical allowance exemptions."
    },
    "Advance Tax": {
        short: "Tax paid in quarterly instalments during the year if your total tax liability exceeds ₹10,000.",
        detail: "Due dates: 15 Jun (15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (100%). Primarily for individuals with income beyond salary — rent, capital gains, freelance."
    },
    "Taxable Income": {
        short: "The portion of your income on which tax is actually calculated — after subtracting all eligible deductions.",
        detail: "Taxable Income = Gross Income − Standard Deduction − HRA Exemption − 80C/80D/other deductions (under Old Regime)."
    },
    "LTCG": {
        short: "Long-Term Capital Gain. Profit from selling an asset held for more than a specified period (12–36 months depending on asset type).",
        detail: "Taxed at 12.5% for equity/MF (exempt up to ₹1.25L/year). Property & gold: 12.5% without indexation (post-Budget 2024)."
    },
    "STCG": {
        short: "Short-Term Capital Gain. Profit from selling an asset before the long-term holding threshold.",
        detail: "Equity/equity MF: 20% flat. Property, gold, debt MF: at income slab rate. Added to your total income for the year."
    },
    "ITR-1": {
        short: "The simplest ITR form (Sahaj) for individuals with only salary income, one house property, and other income up to ₹50K.",
        detail: "Cannot be used if you have capital gains, more than one house property, income above ₹50 lakh, or are a director in a company."
    },
    "Section 24b": {
        short: "Deduction for home loan interest — up to ₹2 lakh per year for a self-occupied property.",
        detail: "Under Old Regime only. For let-out property, the full interest is deductible but set-off against other income is restricted to ₹2 lakh/year."
    },
    "Cess": {
        short: "An additional 4% surcharge on your income tax, called Health and Education Cess.",
        detail: "Calculated on the base tax amount (not on income). If your base tax is ₹10,000, you pay ₹400 extra as cess = total ₹10,400."
    },
    "Surcharge": {
        short: "An extra tax on high earners — applies to individuals with income exceeding ₹50 lakh.",
        detail: "₹50L–₹1Cr: 10%, ₹1Cr–₹2Cr: 15%, ₹2Cr–₹5Cr: 25%, above ₹5Cr: 37% (37% capped at 25% under New Regime)."
    },
    "LTA": {
        short: "Leave Travel Allowance. Part of salary for domestic travel during leave — 2 journeys exempt per 4-year block.",
        detail: "Current block: 2022–2025. Only economy class air or AC train travel by shortest route qualifies. International trips not eligible."
    },
    "NPS": {
        short: "National Pension System. A government pension scheme — contributions get additional 80CCD deduction beyond 80C limit.",
        detail: "80CCD(1): Up to ₹1.5L (within 80C limit). 80CCD(1B): Additional ₹50K deduction. Employer contribution: 80CCD(2) — no cap under New Regime."
    },
    "PPF": {
        short: "Public Provident Fund. A 15-year government-backed savings scheme with ~7.1% interest. Fully tax-free (EEE).",
        detail: "Contribution qualifies for 80C (max ₹1.5L/year). Interest earned is tax-free. Maturity amount is tax-free. One of the safest investments."
    },
    "ELSS": {
        short: "Equity Linked Savings Scheme. Tax-saving mutual funds with a 3-year lock-in period. Qualifies for 80C.",
        detail: "Shortest lock-in among 80C instruments. Returns are market-linked (equity). LTCG above ₹1.25L taxed at 12.5% post-redemption."
    },
};

export const JARGON_LIST = Object.entries(JARGON).map(([term, data]) => ({
    term,
    ...data,
}));

// Returns a deterministic "jargon of the day" based on the current date
export function getJargonOfDay() {
    const today = new Date();
    const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const keys = Object.keys(JARGON);
    const key = keys[dayOfYear % keys.length];
    return { term: key, ...JARGON[key] };
}
