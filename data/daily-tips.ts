export const dailyTips = [
  {
    tip: "Under the new regime, the standard deduction is Rs 75,000 — up from 50,000 in the old regime.",
    category: "Deductions",
    emoji: "💡",
  },
  {
    tip: "Section 80CCD(2) employer NPS contribution is available under BOTH old and new tax regimes.",
    category: "NPS",
    emoji: "🏦",
  },
  {
    tip: "You can claim HRA exemption even if you live with your parents — just pay them rent and get receipts.",
    category: "HRA",
    emoji: "🏠",
  },
  {
    tip: "Health insurance premium for parents (80D) gives an additional deduction of up to Rs 50,000 if they are senior citizens.",
    category: "Health",
    emoji: "🏥",
  },
  {
    tip: "Interest on education loan (Section 80E) has NO upper limit on deduction — and it's available for 8 years.",
    category: "Education",
    emoji: "🎓",
  },
  {
    tip: "Filing ITR even with zero tax lets you carry forward losses — useful if you have capital losses from stocks.",
    category: "Filing",
    emoji: "📋",
  },
  {
    tip: "Always check your AIS (Annual Information Statement) before filing — it shows all financial transactions reported against your PAN.",
    category: "Verification",
    emoji: "🔍",
  },
  {
    tip: "Tax-saving FDs under 80C have a 5-year lock-in but the interest earned on them is fully taxable.",
    category: "80C",
    emoji: "🔒",
  },
  {
    tip: "Donations to certain funds like PM-CARES qualify for 100% deduction under Section 80G. Others give 50%.",
    category: "Donations",
    emoji: "🤝",
  },
  {
    tip: "If your total income is under Rs 7 lakh in the new regime, you pay ZERO tax thanks to the Section 87A rebate.",
    category: "Rebate",
    emoji: "🎉",
  },
  {
    tip: "Advance tax is NOT required if your total tax liability for the year is less than Rs 10,000.",
    category: "Advance Tax",
    emoji: "📅",
  },
  {
    tip: "LTCG on equity above Rs 1.25 lakh is taxed at 12.5%. Below that? Completely tax-free!",
    category: "Capital Gains",
    emoji: "📈",
  },
  {
    tip: "Employer EPF contribution up to 12% of basic salary is tax-free for you — it's automatic savings.",
    category: "EPF",
    emoji: "💰",
  },
  {
    tip: "Home loan interest up to Rs 2 lakh (self-occupied) is deductible under Section 24(b) — old regime only.",
    category: "Home Loan",
    emoji: "🏡",
  },
  {
    tip: "Preventive health check-up expenses up to Rs 5,000 are deductible under 80D — even without insurance.",
    category: "Health",
    emoji: "❤️",
  },
  {
    tip: "If you're a first-time home buyer, Section 80EEA gives additional Rs 1.5 lakh interest deduction (old regime).",
    category: "Home Loan",
    emoji: "🗝️",
  },
  {
    tip: "Receipts from savings account interest up to Rs 10,000 are deductible under Section 80TTA (old regime).",
    category: "Interest",
    emoji: "🏧",
  },
  {
    tip: "Form 16 Part A shows TDS details. Part B shows your salary breakdown. Both are essential for filing.",
    category: "Form 16",
    emoji: "📄",
  },
  {
    tip: "E-verify your ITR within 30 days of filing. Aadhaar OTP is the fastest method.",
    category: "Filing",
    emoji: "✅",
  },
  {
    tip: "Salary restructuring to include more allowances like food coupons, LTA can legally reduce your tax burden.",
    category: "Planning",
    emoji: "🧮",
  },
];

export function getTodaysTip() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return dailyTips[dayOfYear % dailyTips.length];
}
