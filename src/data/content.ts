export interface GlossaryTerm {
  id: string;
  term: string;
  shortDef: string;
  longDef: string;
  example: string;
  whereYouSeeIt: string;
  relatedIds: string[];
  officialLinks: { label: string; url: string }[];
}

export interface Form16Field {
  id: string;
  label: string;
  specimenKey: string;
  partLabel: string;
  description: string;
  whyItMatters: string;
  calculation: string;
  taxability: string;
  faqs: { q: string; a: string }[];
  relatedSections: string[];
  headOfIncome: string;
  officialLinks: { label: string; url: string }[];
}

export interface Section {
  id: string;
  sectionCode: string;
  title: string;
  maxLimit: string;
  includes: string[];
  explanation: string;
  example: string;
  faqs: { q: string; a: string }[];
  officialLinks: { label: string; url: string }[];
}

export interface HeadOfIncome {
  id: string;
  name: string;
  overview: string;
  includes: string[];
  excludes: string[];
  examples: string[];
  commonTerms: string[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  relatedIds: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    id: "g-gross-salary",
    term: "Gross Salary",
    shortDef: "Total salary before any deductions or exemptions",
    longDef: "Gross Salary is the total amount of salary received by an employee from the employer before any deductions like PF, professional tax, or income tax. It includes basic salary, allowances (HRA, DA, etc.), perquisites, and other benefits.",
    example: "If basic pay is 6,00,000, HRA is 2,40,000, and special allowance is 1,60,000, the gross salary is 10,00,000.",
    whereYouSeeIt: "Form 16 Part B, Salary Slip, AIS",
    relatedIds: ["g-basic-salary", "g-hra", "g-standard-deduction"],
    officialLinks: [{ label: "Income Tax Department", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-basic-salary",
    term: "Basic Salary",
    shortDef: "Fixed component of salary excluding allowances and perks",
    longDef: "Basic Salary is the core fixed component of an employee's compensation. It forms the base for calculating many other components like HRA, PF contributions, and gratuity. Typically constitutes 40-50% of CTC.",
    example: "In a CTC of 12,00,000, the basic salary might be 6,00,000 (50% of CTC).",
    whereYouSeeIt: "Salary Slip, Offer Letter, Form 16 Part B",
    relatedIds: ["g-gross-salary", "g-hra", "g-pf"],
    officialLinks: [{ label: "Income Tax Department", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-hra",
    term: "HRA (House Rent Allowance)",
    shortDef: "Allowance for rental accommodation, partially/fully exempt from tax",
    longDef: "House Rent Allowance is an allowance given by employers to employees to meet rental expenses. HRA can be partially or fully exempt from income tax under Section 10(13A) if the employee lives in rented accommodation and meets certain conditions.",
    example: "If HRA received is 2,40,000, rent paid is 1,80,000, and basic is 6,00,000, the exempt portion is calculated as the minimum of three prescribed amounts.",
    whereYouSeeIt: "Form 16 Part B, Salary Slip",
    relatedIds: ["g-gross-salary", "g-basic-salary", "g-exempt-allowances"],
    officialLinks: [{ label: "Section 10(13A)", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-tds",
    term: "TDS (Tax Deducted at Source)",
    shortDef: "Tax deducted by payer before making a payment",
    longDef: "Tax Deducted at Source is a mechanism where the entity making certain payments (salary, interest, rent, etc.) deducts tax at applicable rates before making the payment. For salaried employees, the employer deducts TDS from salary each month based on estimated annual tax liability.",
    example: "If annual tax liability is 60,000, the employer typically deducts 5,000 per month as TDS from salary.",
    whereYouSeeIt: "Form 16 Part A, 26AS, AIS, Salary Slip",
    relatedIds: ["g-tcs", "g-advance-tax", "g-form16"],
    officialLinks: [{ label: "TDS Provisions", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-tcs",
    term: "TCS (Tax Collected at Source)",
    shortDef: "Tax collected by seller at the time of sale",
    longDef: "Tax Collected at Source is collected by the seller from the buyer at the time of sale of specified goods or services. The seller then deposits this tax with the government. TCS is applicable on sale of specific items like timber, scrap, minerals, cars above a certain value, and foreign remittances above certain limits.",
    example: "On purchase of a car worth more than 10,00,000, the dealer collects 1% TCS, i.e., 10,000 on a car priced at 10,00,000.",
    whereYouSeeIt: "26AS, AIS, Purchase receipts",
    relatedIds: ["g-tds", "g-advance-tax"],
    officialLinks: [{ label: "TCS Provisions", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-advance-tax",
    term: "Advance Tax",
    shortDef: "Tax paid in installments during the financial year",
    longDef: "Advance Tax is income tax that is paid in advance during the financial year instead of a lump sum at the end of the year. It applies when estimated tax liability exceeds 10,000 in a financial year. Salaried employees generally don't need to pay advance tax if TDS covers their tax liability.",
    example: "For a freelancer with estimated tax of 1,00,000, advance tax would be due in quarterly installments: 15% by June 15, 45% by Sep 15, 75% by Dec 15, and 100% by Mar 15.",
    whereYouSeeIt: "26AS, Challan 280",
    relatedIds: ["g-tds", "g-self-assessment-tax"],
    officialLinks: [{ label: "Advance Tax", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-form16",
    term: "Form 16",
    shortDef: "TDS certificate issued by employer to employee",
    longDef: "Form 16 is a certificate issued by the employer to the employee under Section 203 of the Income Tax Act. It has two parts: Part A contains details of TDS deducted and deposited, while Part B contains details of salary, allowances, deductions claimed, and tax computation.",
    example: "After the financial year ends, employers typically issue Form 16 by June 15 of the following year.",
    whereYouSeeIt: "Issued by Employer",
    relatedIds: ["g-tds", "g-pan", "g-tan"],
    officialLinks: [{ label: "Form 16 Info", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-pan",
    term: "PAN (Permanent Account Number)",
    shortDef: "Unique 10-digit alphanumeric identifier for taxpayers",
    longDef: "PAN is a unique identification number issued by the Income Tax Department to every taxpayer in India. It is a 10-character alphanumeric code (e.g., ABCDE1234F) and is essential for filing tax returns, opening bank accounts, and various financial transactions above certain thresholds.",
    example: "A PAN number looks like ABCDE1234F, where the fourth character indicates the type of holder (P for individual).",
    whereYouSeeIt: "Form 16, ITR, 26AS, AIS, Bank Accounts",
    relatedIds: ["g-tan", "g-form16"],
    officialLinks: [{ label: "PAN Services", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-tan",
    term: "TAN (Tax Deduction Account Number)",
    shortDef: "Unique 10-digit number for entities that deduct/collect tax",
    longDef: "TAN is a unique identification number allotted to entities (like employers) who are required to deduct or collect tax at source. It is mandatory to quote TAN in TDS/TCS returns, challans, and certificates. Employees see their employer's TAN on Form 16 Part A.",
    example: "A TAN number looks like MUMB12345A. It appears on your Form 16 under employer details.",
    whereYouSeeIt: "Form 16 Part A, TDS Certificates",
    relatedIds: ["g-pan", "g-tds", "g-form16"],
    officialLinks: [{ label: "TAN Allotment", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-standard-deduction",
    term: "Standard Deduction",
    shortDef: "Flat deduction from salary income for salaried employees",
    longDef: "Standard Deduction is a flat deduction available to salaried individuals and pensioners from their gross salary or pension income. Under the new and old tax regimes, it is 75,000 and 50,000 respectively. This replaced the earlier transport and medical allowance exemptions.",
    example: "If gross salary after exemptions is 10,00,000, standard deduction of 75,000 (new regime) reduces taxable salary to 9,25,000.",
    whereYouSeeIt: "Form 16 Part B, ITR",
    relatedIds: ["g-gross-salary", "g-professional-tax"],
    officialLinks: [{ label: "Standard Deduction", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-professional-tax",
    term: "Professional Tax",
    shortDef: "State-level tax on salaried individuals and professionals",
    longDef: "Professional Tax is a state-level tax levied on salaried employees, professionals, and traders. It is deducted by the employer from salary. The maximum amount is 2,500 per year. It is allowed as a deduction from salary income under the Income Tax Act.",
    example: "In Maharashtra, professional tax is typically 200 per month (2,400 per year). In Karnataka, it is 200 per month for salaries above 15,000.",
    whereYouSeeIt: "Salary Slip, Form 16 Part B",
    relatedIds: ["g-gross-salary", "g-standard-deduction"],
    officialLinks: [{ label: "Professional Tax", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-pf",
    term: "PF (Provident Fund)",
    shortDef: "Retirement savings scheme with employer-employee contributions",
    longDef: "The Employees' Provident Fund (EPF) is a mandatory savings scheme for employees earning up to a certain threshold. Both employer and employee contribute 12% of basic salary. The employee's contribution qualifies for deduction under Section 80C (up to 1,50,000 limit).",
    example: "On a basic salary of 6,00,000, PF contribution is 72,000 per year (12%). This amount can be claimed under 80C.",
    whereYouSeeIt: "Salary Slip, Form 16, EPFO Passbook",
    relatedIds: ["g-basic-salary", "g-80c"],
    officialLinks: [{ label: "EPFO Portal", url: "https://www.epfindia.gov.in" }],
  },
  {
    id: "g-80c",
    term: "Section 80C",
    shortDef: "Deduction for investments and expenses up to 1,50,000",
    longDef: "Section 80C allows deductions of up to 1,50,000 from taxable income for specified investments and expenditures. Common eligible items include EPF, PPF, ELSS mutual funds, life insurance premiums, tuition fees, NSC, tax-saving FDs, and home loan principal repayment.",
    example: "If PF contribution is 72,000, PPF is 50,000, and ELSS is 28,000, total 80C deduction is 1,50,000.",
    whereYouSeeIt: "Form 16 Part B, ITR",
    relatedIds: ["g-pf", "g-80d"],
    officialLinks: [{ label: "Section 80C", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-80d",
    term: "Section 80D",
    shortDef: "Deduction for health insurance premiums",
    longDef: "Section 80D provides deduction for premiums paid towards health insurance. For self and family, up to 25,000 is deductible (50,000 for senior citizens). An additional 25,000-50,000 is available for parents' health insurance. Preventive health check-up expenses up to 5,000 are also covered within the limit.",
    example: "Health insurance premium of 20,000 for self + 30,000 for senior citizen parents = total 80D deduction of 50,000.",
    whereYouSeeIt: "Form 16 Part B, ITR",
    relatedIds: ["g-80c"],
    officialLinks: [{ label: "Section 80D", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-rebate-87a",
    term: "Rebate u/s 87A",
    shortDef: "Tax rebate for individuals with income up to a certain limit",
    longDef: "Section 87A provides a rebate to resident individuals whose total taxable income does not exceed specified limits. Under the new tax regime, a rebate of up to 60,000 is available if total income is up to 12,00,000. Under the old regime, the rebate is up to 12,500 for income up to 5,00,000.",
    example: "If total taxable income under new regime is 11,80,000, the tax calculated might be 58,000 but the rebate of 60,000 reduces effective tax to 0.",
    whereYouSeeIt: "Form 16 Part B, ITR",
    relatedIds: ["g-cess", "g-surcharge"],
    officialLinks: [{ label: "Section 87A", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-cess",
    term: "Health & Education Cess",
    shortDef: "4% cess on income tax and surcharge",
    longDef: "Health and Education Cess is levied at 4% on the total income tax (including surcharge, if applicable). The cess funds health and education initiatives. It is calculated after determining the total tax liability and adding any applicable surcharge.",
    example: "If income tax is 1,00,000 and surcharge is 0, cess is 4% of 1,00,000 = 4,000. Total tax becomes 1,04,000.",
    whereYouSeeIt: "Form 16 Part B, ITR, Tax Computation",
    relatedIds: ["g-surcharge", "g-rebate-87a"],
    officialLinks: [{ label: "Cess Information", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-surcharge",
    term: "Surcharge",
    shortDef: "Additional tax on high-income individuals",
    longDef: "Surcharge is an additional tax levied on individuals whose total income exceeds certain thresholds. The rates vary: 10% for income above 50 lakh, 15% for above 1 crore, 25% for above 2 crore. Under the new regime, the maximum surcharge is capped at 25%. Surcharge is calculated on the income tax amount before cess.",
    example: "For income of 55,00,000, if tax is 12,37,500, surcharge at 10% is 1,23,750. Total before cess becomes 13,61,250.",
    whereYouSeeIt: "Form 16 Part B, ITR, Tax Computation",
    relatedIds: ["g-cess", "g-rebate-87a"],
    officialLinks: [{ label: "Surcharge Rates", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-exempt-allowances",
    term: "Exempt Allowances",
    shortDef: "Salary components that are partially or fully exempt from tax",
    longDef: "Certain allowances received as part of salary are exempt from income tax, either fully or partially. Common exempt allowances include HRA (Section 10(13A)), Leave Travel Allowance (Section 10(5)), and certain other allowances for specific categories of employees.",
    example: "If HRA received is 2,40,000 and exempt HRA calculated is 1,80,000, only 60,000 of HRA is taxable.",
    whereYouSeeIt: "Form 16 Part B, Salary Slip",
    relatedIds: ["g-hra", "g-gross-salary"],
    officialLinks: [{ label: "Exempt Allowances", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-self-assessment-tax",
    term: "Self-Assessment Tax",
    shortDef: "Tax paid by the taxpayer after adjusting TDS and advance tax",
    longDef: "Self-Assessment Tax is the balance tax payable by the taxpayer after accounting for TDS and advance tax already paid. It is calculated while filing the income tax return. If TDS and advance tax are less than the total tax liability, the difference needs to be paid as self-assessment tax before filing.",
    example: "Total tax liability: 1,00,000. TDS deducted: 90,000. Self-assessment tax to pay: 10,000.",
    whereYouSeeIt: "ITR, 26AS, Challan 280",
    relatedIds: ["g-tds", "g-advance-tax"],
    officialLinks: [{ label: "Self-Assessment Tax", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "g-ais",
    term: "AIS (Annual Information Statement)",
    shortDef: "Comprehensive statement of financial transactions reported to IT dept",
    longDef: "The Annual Information Statement is a comprehensive view of financial information collected by the Income Tax Department from various reporting entities. It includes details of salary, interest, dividends, securities transactions, purchases, TDS/TCS, and more. It supersedes the earlier Form 26AS for detailed transaction tracking.",
    example: "AIS shows your salary income from employer, bank interest from all banks, mutual fund transactions, and property purchases during the year.",
    whereYouSeeIt: "Income Tax Portal, Available in compliance section",
    relatedIds: ["g-form16", "g-tds"],
    officialLinks: [{ label: "AIS on IT Portal", url: "https://www.incometax.gov.in" }],
  },
];

export const form16Fields: Form16Field[] = [
  {
    id: "f-gross-salary",
    label: "Gross Salary",
    specimenKey: "1",
    partLabel: "Part B",
    description: "The total salary received from your employer before any deductions or exemptions. It includes basic salary, HRA, special allowances, bonuses, commissions, and all other monetary benefits.",
    whyItMatters: "This is the starting point of your tax calculation. Everything else (exemptions, deductions) is subtracted from this amount to arrive at your taxable income.",
    calculation: "Gross Salary = Basic Salary + HRA + Special Allowance + DA + Bonus + Commission + All Other Allowances + Perquisites value",
    taxability: "Gross salary itself is not directly taxed. After subtracting exemptions and deductions, the remaining amount under 'Income from Salary' head is taxable at applicable slab rates.",
    faqs: [
      { q: "Is Gross Salary the same as CTC?", a: "No. CTC (Cost to Company) typically includes employer PF contribution, gratuity, and other benefits not shown in gross salary." },
      { q: "Does Gross Salary include employer PF?", a: "Usually no. Employer's PF contribution is part of CTC but generally not included in gross salary shown on the pay slip." },
    ],
    relatedSections: ["s-10-13a", "s-standard-deduction"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Salary Income", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-exempt-allowances",
    label: "Allowances Exempt u/s 10",
    specimenKey: "2",
    partLabel: "Part B",
    description: "Certain allowances received as part of salary that are exempt from income tax under various clauses of Section 10. The most common is HRA exemption under Section 10(13A).",
    whyItMatters: "These exemptions directly reduce your taxable salary. Properly claiming eligible exemptions can significantly lower your tax outgo under the old tax regime.",
    calculation: "Total of all allowances that qualify for exemption. For HRA: Minimum of (i) Actual HRA received, (ii) 50%/40% of basic salary (metro/non-metro), (iii) Rent paid minus 10% of basic salary.",
    taxability: "Exempt from tax to the extent of the calculated exemption. Any excess over the exempt amount is taxable as part of salary.",
    faqs: [
      { q: "Can I claim HRA if I live in my own house?", a: "Generally no. HRA exemption requires that the employee actually pays rent for accommodation." },
      { q: "Is HRA exemption available under new regime?", a: "No. HRA exemption under Section 10(13A) is not available under the new tax regime." },
    ],
    relatedSections: ["s-10-13a"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Section 10", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-standard-deduction",
    label: "Standard Deduction u/s 16(ia)",
    specimenKey: "3",
    partLabel: "Part B",
    description: "A flat deduction available to all salaried employees and pensioners. No bills or proof required. Under the new regime, it is 75,000. Under the old regime, it is 50,000.",
    whyItMatters: "This is a straightforward deduction that every salaried person gets. It reduces your salary income before calculating tax and requires no documentation.",
    calculation: "Flat amount: 75,000 (new regime) or 50,000 (old regime). If salary income is less than this amount, deduction is limited to salary income.",
    taxability: "The standard deduction amount is not taxable. It is subtracted from gross salary before arriving at income under the head salary.",
    faqs: [
      { q: "Do I need to submit any proof for standard deduction?", a: "No. Standard deduction is automatically applicable and does not require any proof or bills." },
      { q: "Can both husband and wife claim standard deduction?", a: "Yes. Each salaried individual can claim standard deduction from their own salary income." },
    ],
    relatedSections: ["s-standard-deduction"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Standard Deduction", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-professional-tax",
    label: "Professional Tax u/s 16(iii)",
    specimenKey: "4",
    partLabel: "Part B",
    description: "A state-level tax deducted by the employer, allowed as a deduction from salary income. Maximum is 2,500 per year. Not all states levy professional tax.",
    whyItMatters: "Though a small amount, it further reduces your taxable salary income. It is automatically deducted by the employer in states that levy it.",
    calculation: "Actual professional tax paid during the year. Maximum 2,500 per year across India. Varies by state and salary slab.",
    taxability: "The professional tax amount paid is fully deductible from salary income. It is deducted in addition to the standard deduction.",
    faqs: [
      { q: "Is professional tax applicable in all states?", a: "No. Only some states levy professional tax. States like Maharashtra, Karnataka, West Bengal, and others have it, while some states do not." },
    ],
    relatedSections: ["s-standard-deduction"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Professional Tax", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-income-from-salary",
    label: "Income Chargeable Under Head 'Salary'",
    specimenKey: "5",
    partLabel: "Part B",
    description: "The net salary income after subtracting all allowable exemptions and deductions (like exempt allowances, standard deduction, and professional tax) from gross salary.",
    whyItMatters: "This is the actual amount from salary that becomes part of your Gross Total Income for tax computation purposes.",
    calculation: "Income from Salary = Gross Salary - Exempt Allowances - Standard Deduction - Professional Tax",
    taxability: "This entire amount is included in Gross Total Income and is subject to tax after further deductions under Chapter VI-A.",
    faqs: [
      { q: "Can income from salary be negative?", a: "No. The minimum value of income under the head salary is zero. Loss from salary is not a concept in tax law." },
    ],
    relatedSections: ["s-standard-deduction", "s-80c"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Head of Salary", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-80c",
    label: "Deduction u/s 80C",
    specimenKey: "6a",
    partLabel: "Part B",
    description: "Deduction for specified investments and expenditures up to 1,50,000. Includes EPF, PPF, ELSS, life insurance premiums, home loan principal, tuition fees, NSC, and tax-saving fixed deposits.",
    whyItMatters: "This is the most commonly used deduction section. It can reduce taxable income by up to 1,50,000, potentially saving significant tax.",
    calculation: "Total of all eligible investments and expenditures under 80C, subject to a maximum of 1,50,000. Note: 80C, 80CCC, and 80CCD(1) share the combined limit.",
    taxability: "The deduction reduces Gross Total Income. For example, if GTI is 10,00,000 and 80C deduction is 1,50,000, taxable income becomes 8,50,000.",
    faqs: [
      { q: "Is 80C available under the new tax regime?", a: "No. Section 80C deduction is NOT available under the new tax regime. It is only available under the old tax regime." },
      { q: "Can I invest after the year ends to claim 80C?", a: "No. Investments must be made during the financial year (April 1 to March 31) to claim deduction for that year." },
    ],
    relatedSections: ["s-80c", "s-80ccd1b"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Section 80C", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-80d",
    label: "Deduction u/s 80D",
    specimenKey: "6b",
    partLabel: "Part B",
    description: "Deduction for health insurance premiums paid for self, spouse, children, and parents. Up to 25,000 for self/family and up to 25,000-50,000 for parents.",
    whyItMatters: "Encourages health insurance coverage. Provides additional tax benefit beyond 80C, helping reduce your overall tax burden.",
    calculation: "Self & Family: Up to 25,000 (50,000 if senior citizen). Parents: Up to 25,000 (50,000 if senior citizen). Total max possible: 1,00,000.",
    taxability: "Deducted from Gross Total Income. Does not apply under the new tax regime.",
    faqs: [
      { q: "Can preventive health check-up be claimed?", a: "Yes. Expenses up to 5,000 for preventive health check-ups are included within the overall 80D limit." },
    ],
    relatedSections: ["s-80d"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Section 80D", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-80ccd1b",
    label: "Deduction u/s 80CCD(1B)",
    specimenKey: "6c",
    partLabel: "Part B",
    description: "Additional deduction of up to 50,000 for contributions to the National Pension System (NPS). This is over and above the 80C limit of 1,50,000.",
    whyItMatters: "This provides an additional 50,000 deduction beyond 80C, making NPS an attractive option for additional tax savings.",
    calculation: "Actual NPS contribution or 50,000, whichever is lower. This is in addition to the 80C limit.",
    taxability: "Reduces Gross Total Income by up to 50,000 additionally. Not available under the new tax regime.",
    faqs: [
      { q: "Can employer NPS contribution be claimed here?", a: "No. Employer's NPS contribution is claimed under 80CCD(2), which has a separate limit." },
    ],
    relatedSections: ["s-80ccd1b", "s-80c"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "NPS Deduction", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-80g",
    label: "Deduction u/s 80G",
    specimenKey: "6d",
    partLabel: "Part B",
    description: "Deduction for donations to specified charitable organizations and funds. Deduction ranges from 50% to 100% of the donation amount depending on the organization.",
    whyItMatters: "Encourages charitable giving. Donations to approved funds can provide a tax deduction, making philanthropy tax-efficient.",
    calculation: "Deduction = Eligible donation amount multiplied by applicable rate (50% or 100%). Some donations have a qualifying limit of 10% of adjusted gross total income.",
    taxability: "Reduces taxable income. Available only under the old tax regime.",
    faqs: [
      { q: "Are all donations eligible for 80G?", a: "No. Only donations to approved organizations/funds qualify. Cash donations above 2,000 are not eligible." },
    ],
    relatedSections: ["s-80g"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Section 80G", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-total-deductions",
    label: "Total Deductions Under Chapter VI-A",
    specimenKey: "7",
    partLabel: "Part B",
    description: "The aggregate of all deductions claimed under various sections of Chapter VI-A (80C, 80D, 80CCD(1B), 80G, etc.).",
    whyItMatters: "This total is subtracted from Gross Total Income to arrive at Total Taxable Income. Higher deductions mean lower tax.",
    calculation: "Sum of all individual deductions: 80C + 80D + 80CCD(1B) + 80G + 80E + 80TTA + others.",
    taxability: "Reduces Gross Total Income to arrive at taxable income. Most deductions under Chapter VI-A are not available under the new tax regime.",
    faqs: [
      { q: "Is there an overall cap on Chapter VI-A deductions?", a: "Each section has its own limit but there is no combined overall cap. However, deductions cannot exceed Gross Total Income." },
    ],
    relatedSections: ["s-80c", "s-80d", "s-80ccd1b", "s-80g"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Chapter VI-A", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-total-taxable-income",
    label: "Total Taxable Income",
    specimenKey: "8",
    partLabel: "Part B",
    description: "The final income amount on which tax is calculated. Derived by subtracting all deductions from Gross Total Income.",
    whyItMatters: "This is the single most important number in your tax computation. Your tax slab and rate is applied to this amount.",
    calculation: "Total Taxable Income = Gross Total Income - Total Deductions under Chapter VI-A. Rounded down to nearest 10.",
    taxability: "Tax is computed on this amount using applicable slab rates (old or new regime). This is also the basis for determining eligibility for rebate u/s 87A.",
    faqs: [
      { q: "What if taxable income is negative?", a: "It cannot be negative. The minimum is zero. Any excess deductions do not create a loss from salary." },
    ],
    relatedSections: ["s-80c", "s-80d"],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Tax Computation", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-tax-on-income",
    label: "Tax on Total Income",
    specimenKey: "9",
    partLabel: "Part B",
    description: "The income tax calculated on the Total Taxable Income using the applicable slab rates of either the old or new tax regime.",
    whyItMatters: "This is the base tax amount before any rebate, surcharge, or cess adjustments.",
    calculation: "Under New Regime: 0-4L: Nil, 4-8L: 5%, 8-12L: 10%, 12-16L: 15%, 16-20L: 20%, 20-24L: 25%, Above 24L: 30%.",
    taxability: "This amount may be reduced by rebate u/s 87A if eligible. Surcharge and cess are then added to arrive at total tax payable.",
    faqs: [
      { q: "Which regime should I choose?", a: "This depends on individual circumstances. Generally, if you have significant deductions (80C, 80D, HRA), the old regime may be beneficial. Otherwise, the new regime with lower rates might work better. Consult a professional for your specific case." },
    ],
    relatedSections: [],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Tax Slabs", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-rebate-87a",
    label: "Rebate u/s 87A",
    specimenKey: "10",
    partLabel: "Part B",
    description: "A tax rebate available to resident individuals. Under the new regime, if total income is up to 12,00,000, a rebate of up to 60,000 is available. Under the old regime, it is up to 12,500 for income up to 5,00,000.",
    whyItMatters: "For lower-income earners, this rebate can effectively make their tax liability zero or near-zero.",
    calculation: "Rebate = Lower of (actual tax on total income) or (60,000 under new regime / 12,500 under old regime). Available only if taxable income is within the prescribed limit.",
    taxability: "The rebate directly reduces tax liability. After rebate, surcharge and cess are calculated on the remaining tax.",
    faqs: [
      { q: "Is the 87A rebate available on all types of income?", a: "Under the new regime, the rebate does not apply to certain special rate incomes like short-term capital gains u/s 111A." },
    ],
    relatedSections: [],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Section 87A", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-surcharge-cess",
    label: "Surcharge & Health Education Cess",
    specimenKey: "11",
    partLabel: "Part B",
    description: "Surcharge is an additional tax on high incomes (above 50 lakh). Health & Education Cess of 4% is applied on income tax plus surcharge for all taxpayers.",
    whyItMatters: "These are mandatory additions to your tax. Cess at 4% applies to everyone. Surcharge applies only to higher incomes but can add significantly to tax.",
    calculation: "Cess = 4% of (Income Tax + Surcharge). Surcharge rates: 10% for 50L-1Cr, 15% for 1Cr-2Cr, 25% for above 2Cr (new regime max 25%).",
    taxability: "Added on top of income tax to determine total tax liability.",
    faqs: [
      { q: "Do all taxpayers pay surcharge?", a: "No. Surcharge applies only to individuals with income above 50,00,000. But 4% cess applies to all taxpayers." },
    ],
    relatedSections: [],
    headOfIncome: "Salary",
    officialLinks: [{ label: "Surcharge & Cess", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "f-tds-deducted",
    label: "Tax Deducted at Source (TDS)",
    specimenKey: "12",
    partLabel: "Part A & B",
    description: "The actual tax deducted by your employer from your monthly salary throughout the financial year. Part A of Form 16 shows quarter-wise TDS details.",
    whyItMatters: "TDS is essentially your tax being pre-paid. The amount shown here is adjusted against your total tax liability when filing returns. If TDS exceeds liability, you get a refund.",
    calculation: "Employer estimates annual tax, divides by 12, and deducts monthly. Adjustments happen as investment proofs are submitted.",
    taxability: "TDS is not additional tax. It is advance payment of your income tax liability. It is credited to your account and shown in 26AS/AIS.",
    faqs: [
      { q: "What if TDS deducted is more than my tax liability?", a: "You can claim a refund by filing your income tax return. The excess will be refunded to your bank account." },
    ],
    relatedSections: [],
    headOfIncome: "Salary",
    officialLinks: [{ label: "TDS Provisions", url: "https://www.incometax.gov.in" }],
  },
];

export const sections: Section[] = [
  {
    id: "s-80c",
    sectionCode: "80C",
    title: "Investments & Expenses",
    maxLimit: "1,50,000",
    includes: ["EPF (Employee Provident Fund)", "PPF (Public Provident Fund)", "ELSS Mutual Funds (3-year lock-in)", "Life Insurance Premiums", "National Savings Certificate (NSC)", "Tax Saving Fixed Deposits (5-year)", "Home Loan Principal Repayment", "Tuition Fees (up to 2 children)", "Sukanya Samriddhi Yojana (SSY)", "Senior Citizens Savings Scheme"],
    explanation: "Section 80C is the most popular deduction section for individual taxpayers. It allows deduction from gross total income for specified investments and expenditures up to 1,50,000 per financial year. The combined limit is shared with 80CCC and 80CCD(1).",
    example: "Employee contributes 72,000 to EPF, 50,000 to PPF, and 28,000 to ELSS. Total 80C claim: 1,50,000 (within the limit). Tax saved at 30% slab: 45,000 + cess.",
    faqs: [
      { q: "Can I claim more than 1,50,000 under 80C?", a: "No. The maximum deduction under 80C (combined with 80CCC and 80CCD(1)) is 1,50,000." },
      { q: "Is 80C available under the new regime?", a: "No. Section 80C is not available under the new tax regime introduced from FY 2020-21." },
    ],
    officialLinks: [{ label: "Section 80C Details", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80d",
    sectionCode: "80D",
    title: "Health Insurance Premium",
    maxLimit: "25,000 / 50,000 (senior)",
    includes: ["Health insurance premium for self, spouse, children", "Health insurance premium for parents", "Preventive health check-up (5,000 within limit)", "Medical expenditure for super senior citizens (no insurance)"],
    explanation: "Section 80D provides deduction for premiums paid for health (mediclaim) insurance. The deduction limit is 25,000 for individuals below 60 years and 50,000 for senior citizens (above 60). An additional deduction is available for parents' health insurance.",
    example: "Self & family premium: 20,000. Parents (senior citizen) premium: 35,000. Preventive check-up: 5,000 (within self limit). Total 80D claim: 55,000.",
    faqs: [
      { q: "Can I claim health insurance paid in cash?", a: "Premiums paid in cash are not eligible. However, preventive health check-up expenses up to 5,000 can be paid in cash." },
    ],
    officialLinks: [{ label: "Section 80D Details", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80ccd1b",
    sectionCode: "80CCD(1B)",
    title: "NPS Additional Contribution",
    maxLimit: "50,000",
    includes: ["Voluntary contribution to National Pension System (NPS) Tier-I"],
    explanation: "Section 80CCD(1B) allows an additional deduction of up to 50,000 for contributions made to the National Pension System. This is over and above the 1,50,000 limit available under Section 80C, making NPS one of the few ways to get extra tax benefits.",
    example: "An individual contributes 50,000 to NPS Tier-I under 80CCD(1B) in addition to 1,50,000 under 80C. Total deductions: 2,00,000. Extra tax saved at 30%: 15,000 + cess.",
    faqs: [
      { q: "Is employer NPS contribution covered here?", a: "No. Employer's contribution is covered under 80CCD(2) with a separate limit of 10% of salary (14% for govt employees)." },
    ],
    officialLinks: [{ label: "NPS Tax Benefits", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80g",
    sectionCode: "80G",
    title: "Donations to Charitable Institutions",
    maxLimit: "Varies (50% or 100%)",
    includes: ["Donations to PM National Relief Fund (100%)", "Donations to approved charitable trusts (50%)", "Donations to National Defence Fund (100%)", "Donations to approved institutions (100% or 50% with/without qualifying limit)"],
    explanation: "Section 80G provides deduction for donations made to specified funds and charitable institutions. The deduction can be 100% or 50% of the donated amount. Some donations have a qualifying limit of 10% of adjusted gross total income.",
    example: "Donation of 10,000 to PM Relief Fund: 100% deduction (10,000). Donation of 20,000 to approved trust: 50% deduction (10,000). Total 80G claim: 20,000.",
    faqs: [
      { q: "Can I donate in cash and claim 80G?", a: "Cash donations exceeding 2,000 are NOT eligible for deduction under 80G. Use bank transfer, cheque, or digital payment." },
    ],
    officialLinks: [{ label: "Section 80G", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80e",
    sectionCode: "80E",
    title: "Education Loan Interest",
    maxLimit: "No upper limit",
    includes: ["Interest on education loan for self, spouse, or children", "Loan from approved financial institution or charitable trust", "For higher education (in India or abroad)"],
    explanation: "Section 80E allows deduction for interest paid on education loans. There is no upper limit on the amount of deduction. The deduction is available for a maximum of 8 years starting from the year in which interest payment begins, or until the interest is fully repaid, whichever is earlier.",
    example: "Education loan interest of 2,50,000 paid during the year. Entire 2,50,000 is deductible under 80E (no cap).",
    faqs: [
      { q: "Is principal repayment also deductible?", a: "No. Only the interest component of the education loan is deductible under 80E. Principal can be claimed under 80C if applicable." },
    ],
    officialLinks: [{ label: "Section 80E", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80tta",
    sectionCode: "80TTA",
    title: "Savings Account Interest",
    maxLimit: "10,000",
    includes: ["Interest from savings accounts in banks", "Interest from savings accounts in co-operative societies", "Interest from savings accounts in post offices"],
    explanation: "Section 80TTA allows individuals and HUFs to claim deduction of up to 10,000 on interest earned from savings bank accounts. This does not include interest from fixed deposits, recurring deposits, or any other term deposits.",
    example: "Savings account interest from multiple banks: 12,000. Deduction under 80TTA: 10,000 (maximum). Remaining 2,000 is taxable under 'Other Sources'.",
    faqs: [
      { q: "Does 80TTA cover FD interest?", a: "No. 80TTA covers only savings account interest. FD/RD interest is taxable. Senior citizens can claim 80TTB instead." },
    ],
    officialLinks: [{ label: "Section 80TTA", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80ttb",
    sectionCode: "80TTB",
    title: "Interest Income for Senior Citizens",
    maxLimit: "50,000",
    includes: ["Interest from savings accounts", "Interest from fixed deposits", "Interest from recurring deposits", "Interest from post office deposits"],
    explanation: "Section 80TTB provides a deduction of up to 50,000 for interest income earned by resident senior citizens (60 years and above) from deposits with banks, co-operative societies, and post offices. This replaces 80TTA for senior citizens.",
    example: "Senior citizen earns FD interest of 40,000 and savings interest of 8,000. Total: 48,000. Entire amount is deductible under 80TTB.",
    faqs: [
      { q: "Can I claim both 80TTA and 80TTB?", a: "No. Senior citizens eligible for 80TTB cannot claim 80TTA. They should claim under 80TTB which has a higher limit." },
    ],
    officialLinks: [{ label: "Section 80TTB", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80ccd2",
    sectionCode: "80CCD(2)",
    title: "Employer NPS Contribution",
    maxLimit: "10% of salary (14% for govt)",
    includes: ["Employer contribution to NPS Tier-I on behalf of employee"],
    explanation: "Section 80CCD(2) allows deduction for employer's contribution to the National Pension System (NPS). The limit is 10% of salary (basic + DA) for private sector employees and 14% for central government employees. This is NOT part of the 80C limit.",
    example: "Basic salary: 8,00,000. Employer NPS contribution: 80,000 (10%). Entire 80,000 is deductible under 80CCD(2), separate from the 80C limit.",
    faqs: [
      { q: "Is 80CCD(2) available under the new regime?", a: "Yes. Employer's NPS contribution under 80CCD(2) is one of the few deductions available under the new tax regime." },
    ],
    officialLinks: [{ label: "Employer NPS", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-24b",
    sectionCode: "24(b)",
    title: "Home Loan Interest",
    maxLimit: "2,00,000 (self-occupied)",
    includes: ["Interest on home loan for self-occupied property", "Interest on home loan for let-out property (no limit)", "Pre-construction period interest (in 5 equal installments)"],
    explanation: "Section 24(b) allows deduction for interest paid on a home loan. For a self-occupied property, the maximum deduction is 2,00,000 per year. For a let-out (rented) property, the full interest amount can be claimed without any upper limit.",
    example: "Home loan interest paid: 3,00,000 for self-occupied property. Deduction under 24(b): 2,00,000 (maximum for self-occupied). Loss from house property: 2,00,000.",
    faqs: [
      { q: "Can I claim both 80C (principal) and 24(b) (interest)?", a: "Yes. Home loan principal repayment is claimed under 80C and interest is claimed under 24(b). They are independent deductions." },
    ],
    officialLinks: [{ label: "Home Loan Benefits", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-10-13a",
    sectionCode: "10(13A)",
    title: "HRA Exemption",
    maxLimit: "Calculated amount",
    includes: ["House Rent Allowance received as part of salary"],
    explanation: "Section 10(13A) provides exemption for HRA received by salaried employees. The exempt amount is the minimum of: (1) Actual HRA received, (2) 50% of basic salary for metro cities (40% for non-metro), (3) Rent paid minus 10% of basic salary. The employee must actually live in rented accommodation.",
    example: "Basic: 6,00,000. HRA: 3,00,000. Rent: 2,40,000. Metro city. Exempt HRA = Min(3,00,000; 3,00,000; 1,80,000) = 1,80,000. Taxable HRA = 1,20,000.",
    faqs: [
      { q: "Do I need rent receipts for HRA?", a: "Yes, if annual rent exceeds 1,00,000, you need rent receipts with the landlord's PAN number." },
    ],
    officialLinks: [{ label: "HRA Exemption", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-standard-deduction",
    sectionCode: "16(ia)",
    title: "Standard Deduction",
    maxLimit: "75,000 (new) / 50,000 (old)",
    includes: ["Automatic flat deduction for salaried employees and pensioners"],
    explanation: "Standard deduction is a flat deduction from salary income. It replaces transport and medical allowance exemptions. It is 75,000 under the new tax regime and 50,000 under the old regime. No proof or bills required.",
    example: "Salary after exemptions: 10,00,000. Standard deduction (new regime): 75,000. Salary income: 9,25,000.",
    faqs: [
      { q: "Is standard deduction available for pension income?", a: "Yes. Pensioners receiving pension from a former employer can claim standard deduction." },
    ],
    officialLinks: [{ label: "Standard Deduction", url: "https://www.incometax.gov.in" }],
  },
  {
    id: "s-80ee",
    sectionCode: "80EE/80EEA",
    title: "First-Time Home Buyer Interest",
    maxLimit: "50,000 (80EE) / 1,50,000 (80EEA)",
    includes: ["Additional interest deduction for first-time home buyers", "Property value and loan amount limits apply"],
    explanation: "Section 80EE provides an additional deduction of up to 50,000 for interest on home loans for first-time home buyers (loan sanctioned in FY 2016-17, value up to 50 lakh, loan up to 35 lakh). Section 80EEA provided up to 1,50,000 for affordable housing (stamp duty value up to 45 lakh, loan sanctioned between April 2019 and March 2022).",
    example: "First-time buyer with eligible loan pays 2,80,000 interest. Claim: 2,00,000 under 24(b) + 50,000 under 80EE = total 2,50,000 deduction.",
    faqs: [
      { q: "Can I claim both 24(b) and 80EE?", a: "Yes. 80EE is an additional deduction over and above the 2,00,000 limit under Section 24(b)." },
    ],
    officialLinks: [{ label: "First Home Buyer", url: "https://www.incometax.gov.in" }],
  },
];

export const headsOfIncome: HeadOfIncome[] = [
  {
    id: "h-salary",
    name: "Income from Salary",
    overview: "Income received by an individual from an employer under a contract of employment. This is the most common head for salaried professionals. It includes basic salary, allowances, perquisites, retirement benefits, and any other compensation received from the employer.",
    includes: ["Basic Salary", "Dearness Allowance (DA)", "House Rent Allowance (HRA)", "Special Allowances", "Bonus & Commission", "Perquisites (company car, rent-free accommodation)", "Leave Encashment", "Gratuity", "Pension from former employer"],
    excludes: ["Freelance income (falls under Business/Profession)", "Rental income (falls under House Property)", "Interest and dividend income (Other Sources)", "Income from selling shares (Capital Gains)"],
    examples: ["Monthly salary credited to bank account", "Annual bonus received from employer", "Company-provided accommodation value", "Leave travel allowance"],
    commonTerms: ["Gross Salary", "Net Salary", "CTC", "Take-home Pay", "TDS", "Form 16", "Standard Deduction", "Professional Tax"],
  },
  {
    id: "h-house-property",
    name: "Income from House Property",
    overview: "Income from property that is owned by the taxpayer. This head covers rental income from let-out properties and deemed income from self-occupied properties. Even if a property is not rented out, notional rent may be considered for additional properties beyond the first self-occupied one.",
    includes: ["Rent from let-out residential property", "Rent from let-out commercial property", "Deemed rent for properties held as vacant (beyond first self-occupied)", "Unrealized rent recovered"],
    excludes: ["Rent from sub-let property (taxed under Other Sources or Business)", "Property used for own business (no separate income)"],
    examples: ["Receiving monthly rent from a tenant for a flat", "Owning two houses, one self-occupied and one vacant (notional rent for the second)", "Home loan interest deduction creating loss from house property"],
    commonTerms: ["Municipal Value", "Fair Rent", "Standard Deduction (30%)", "Section 24(b)", "Net Annual Value", "Self-Occupied Property", "Let-Out Property"],
  },
  {
    id: "h-business",
    name: "Profits & Gains of Business or Profession",
    overview: "Income earned from carrying on a business or profession. This head covers self-employed individuals, freelancers, professionals (doctors, lawyers, CAs), and business owners. Business expenses can be deducted from revenue to arrive at taxable profit.",
    includes: ["Revenue from sale of goods or services", "Professional fees earned", "Commission income from business", "Profits from side business", "Income from freelancing"],
    excludes: ["Salary income (even if from own company, taxed under Salary head)", "Rental income from property not used in business (House Property)", "Capital gains from sale of business assets (Capital Gains)"],
    examples: ["A freelance graphic designer's project income", "A doctor's private practice earnings", "Profits from running an e-commerce store", "Consulting fees earned independently"],
    commonTerms: ["Business Income", "Professional Income", "Presumptive Taxation (44AD/44ADA)", "Books of Account", "Tax Audit", "GST"],
  },
  {
    id: "h-capital-gains",
    name: "Capital Gains",
    overview: "Income arising from the transfer (sale) of a capital asset such as property, shares, mutual funds, gold, or any other asset. Capital gains are classified as Short-Term (STCG) or Long-Term (LTCG) based on the holding period of the asset.",
    includes: ["Sale of listed equity shares", "Sale of equity mutual fund units", "Sale of real estate property", "Sale of gold, jewelry", "Sale of debt mutual funds", "Sale of bonds and debentures"],
    excludes: ["Regular business income from trading (if categorized as business income)", "Salary or gifts (no transfer involved)", "Income from letting out assets (House Property or Other Sources)"],
    examples: ["Selling shares held for more than 1 year at a profit (LTCG)", "Selling a flat purchased 3 years ago at a profit", "Redeeming mutual fund units at a gain", "Selling gold jewelry inherited from family"],
    commonTerms: ["STCG (Short-Term Capital Gain)", "LTCG (Long-Term Capital Gain)", "Holding Period", "Indexation", "Section 54 (Capital Gains Exemption)", "Cost of Acquisition"],
  },
  {
    id: "h-other-sources",
    name: "Income from Other Sources",
    overview: "A residual head that covers income not classifiable under any other head. Common items include interest income (from FDs, savings accounts), dividend income, gifts received, lottery winnings, and any other miscellaneous income.",
    includes: ["Interest from fixed deposits and savings accounts", "Dividend income", "Interest from bonds and securities", "Lottery/game show winnings", "Gifts above 50,000 (from non-relatives)", "Family pension", "Interest on income tax refund"],
    excludes: ["Interest earned in business (Business/Profession)", "Rental income from property (House Property)", "Income from employment (Salary)"],
    examples: ["FD interest of 50,000 from a bank", "Dividend of 10,000 from shares", "Gift of 1,00,000 from a friend (taxable)", "Lottery winnings of 10,00,000"],
    commonTerms: ["Interest Income", "Dividend", "Section 56", "Section 80TTA/80TTB", "TDS on Interest"],
  },
];

export const quizzes: Quiz[] = [
  {
    id: "q1",
    question: "What is the maximum deduction available under Section 80C?",
    options: ["1,00,000", "1,50,000", "2,00,000", "2,50,000"],
    answerIndex: 1,
    explanation: "Section 80C allows a maximum deduction of 1,50,000 per financial year. This is a combined limit shared with Sections 80CCC and 80CCD(1).",
    relatedIds: ["s-80c"],
  },
  {
    id: "q2",
    question: "What is the rate of Health & Education Cess on income tax?",
    options: ["2%", "3%", "4%", "5%"],
    answerIndex: 2,
    explanation: "Health & Education Cess is levied at 4% on the total income tax amount (including surcharge, if any). It was introduced at this rate from FY 2018-19.",
    relatedIds: ["g-cess"],
  },
  {
    id: "q3",
    question: "Form 16 is issued by whom?",
    options: ["Income Tax Department", "Bank", "Employer", "CA/Accountant"],
    answerIndex: 2,
    explanation: "Form 16 is a TDS certificate issued by the employer to the employee, certifying the tax deducted from salary and deposited with the government.",
    relatedIds: ["g-form16"],
  },
  {
    id: "q4",
    question: "What does TDS stand for?",
    options: ["Tax Deducted at Source", "Tax Deposited to State", "Total Deduction from Salary", "Tax Distribution System"],
    answerIndex: 0,
    explanation: "TDS stands for Tax Deducted at Source. It is the mechanism where the payer deducts tax at the applicable rate before making a payment.",
    relatedIds: ["g-tds"],
  },
  {
    id: "q5",
    question: "Which of the following is NOT typically covered under Section 80C?",
    options: ["EPF contribution", "Health insurance premium", "PPF investment", "ELSS mutual fund"],
    answerIndex: 1,
    explanation: "Health insurance premium is covered under Section 80D, not 80C. EPF, PPF, and ELSS are all eligible for deduction under Section 80C.",
    relatedIds: ["s-80c", "s-80d"],
  },
  {
    id: "q6",
    question: "What is the Standard Deduction amount under the new tax regime?",
    options: ["50,000", "75,000", "1,00,000", "No standard deduction under new regime"],
    answerIndex: 1,
    explanation: "The standard deduction under the new tax regime is 75,000. Under the old regime, it remains at 50,000.",
    relatedIds: ["g-standard-deduction", "s-standard-deduction"],
  },
  {
    id: "q7",
    question: "Section 24(b) allows deduction for:",
    options: ["Home loan principal", "Home loan interest", "Rent paid", "Property tax"],
    answerIndex: 1,
    explanation: "Section 24(b) specifically allows deduction for interest paid on a home loan. Principal repayment is covered under Section 80C.",
    relatedIds: ["s-24b"],
  },
  {
    id: "q8",
    question: "PAN is a unique identifier with how many characters?",
    options: ["8", "10", "12", "15"],
    answerIndex: 1,
    explanation: "PAN (Permanent Account Number) is a 10-character alphanumeric code (e.g., ABCDE1234F) issued by the Income Tax Department.",
    relatedIds: ["g-pan"],
  },
  {
    id: "q9",
    question: "Under which head of income does rental income from a property fall?",
    options: ["Income from Salary", "Income from House Property", "Capital Gains", "Income from Other Sources"],
    answerIndex: 1,
    explanation: "Rental income from property owned by the taxpayer is taxed under the head 'Income from House Property'.",
    relatedIds: ["h-house-property"],
  },
  {
    id: "q10",
    question: "What is the additional NPS deduction limit under Section 80CCD(1B)?",
    options: ["25,000", "50,000", "75,000", "1,00,000"],
    answerIndex: 1,
    explanation: "Section 80CCD(1B) provides an additional deduction of up to 50,000 for contributions to NPS, over and above the Section 80C limit of 1,50,000.",
    relatedIds: ["s-80ccd1b"],
  },
];
