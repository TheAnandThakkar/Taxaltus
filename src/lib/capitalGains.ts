// Single source of truth for equity capital-gains figures (post 23 Jul 2024
// Budget). Used by both the Capital Gains calculator and the Learn page so the
// rates never drift between them.
export const EQUITY_STCG_RATE = 20; // % — Section 111A
export const EQUITY_LTCG_RATE = 12.5; // % — Section 112A
export const EQUITY_LTCG_EXEMPTION = 125000; // ₹ per financial year

// "₹1.25 Lakhs" style label derived from the exemption amount.
export const EQUITY_LTCG_EXEMPTION_LABEL = `₹${(EQUITY_LTCG_EXEMPTION / 100000)
  .toFixed(2)
  .replace(/\.?0+$/, "")} Lakhs`;
